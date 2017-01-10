import { Promise } from 'es6-promise';

function normalizeName(oldName) {
  const name = typeof oldName === 'string' ? oldName : String(oldName);
  if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
    throw new TypeError('Invalid character in header field name');
  }
  return name.toLowerCase();
}

function normalizeValue(value) {
  if (typeof value !== 'string') {
    return String(value);
  }
  return value;
}

function decode(body) {
  const form = new FormData();
  body.trim().split('&').forEach((bytes) => {
    if (bytes) {
      const split = bytes.split('=');
      const name = split.shift().replace(/\+/g, ' ');
      const value = split.join('=').replace(/\+/g, ' ');
      form.append(decodeURIComponent(name), decodeURIComponent(value));
    }
  });
  return form;
}

function Headers(headers) {
  this.map = {};
  if (headers instanceof Headers) {
    headers.forEach(function(value, name) {
      this.append(name, value);
    }, this);
  } else if (headers) {
    Object.getOwnPropertyNames(headers).forEach(function(name) {
      this.append(name, headers[name]);
    }, this);
  }
}
Headers.prototype.append = function(name, value) {
  let list = this.map[normalizeName(name)];
  if (!list) {
    list = [];
    this.map[normalizeName(name)] = list;
  }
  list.push(normalizeValue(value));
};

// Headers.prototype['delete'] = function(name) {
Headers.prototype.delete = function(name) {
  delete this.map[normalizeName(name)];
};

Headers.prototype.get = function(name) {
  const values = this.map[normalizeName(name)];
  return values ? values[0] : null;
};

Headers.prototype.getAll = function(name) {
  return this.map[normalizeName(name)] || [];
};

Headers.prototype.has = function(name) {
  return this.map.hasOwnProperty(normalizeName(name));
};

Headers.prototype.set = function(name, value) {
  this.map[normalizeName(name)] = [normalizeValue(value)];
};

Headers.prototype.forEach = function(callback, thisArg) {
  Object.getOwnPropertyNames(this.map).forEach(function(name) {
    this.map[name].forEach(function(value) {
      callback.call(thisArg, value, name, this);
    }, this);
  }, this);
};

function consumed(body) {
  if (body.bodyUsed) {
    return Promise.reject(new TypeError('Already read'));
  }
  body.bodyUsed = true;
  return null;
}

function fileReaderReady(reader) {
  return new Promise((resolve, reject) => {
    reader.onload = function() {
      resolve(reader.result);
    };
    reader.onerror = function() {
      reject(reader.error);
    };
  });
}

function readBlobAsArrayBuffer(blob) {
  const reader = new FileReader();
  reader.readAsArrayBuffer(blob);
  return fileReaderReady(reader);
}

function readBlobAsText(blob) {
  const reader = new FileReader();
  reader.readAsText(blob);
  return fileReaderReady(reader);
}

const support = {
  blob: 'FileReader' in self && 'Blob' in self && (function() {
    try {
      new Blob();
      // const blob = new Blob();
      // Blob();
      return true;
    } catch (e) {
      return false;
    }
  })(),
  formData: 'FormData' in self
};

function Body() {
  this.bodyUsed = false;
  this._initBody = function(body) {
    this._bodyInit = body;
    if (typeof body === 'string') {
      this._bodyText = body;
    } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
      this._bodyBlob = body;
    } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
      this._bodyFormData = body;
    } else if (body) {
      throw new Error('unsupported BodyInit type');
    } else {
      this._bodyText = '';
    }
  };

  if (support.blob) {
    this.blob = function() {
      const rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return Promise.resolve(this._bodyBlob);
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as blob');
      } else {
        return Promise.resolve(new Blob([this._bodyText]));
      }
    };

    this.arrayBuffer = function() {
      return this.blob().then(readBlobAsArrayBuffer);
    };

    this.text = function() {
      const rejected = consumed(this);
      if (rejected) {
        return rejected;
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob);
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text');
      } else {
        return Promise.resolve(this._bodyText);
      }
    };
  } else {
    this.text = function() {
      const rejected = consumed(this);
      return rejected || Promise.resolve(this._bodyText);
    };
  }

  if (support.formData) {
    this.formData = function() {
      return this.text().then(decode);
    };
  }

  this.json = function() {
    return this.text().then(JSON.parse);
  };

  return this;
}

// HTTP methods whose capitalization should be normalized
const methods = [ 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT' ];

function normalizeMethod(method) {
  const upcased = method.toUpperCase();
  return (methods.indexOf(upcased) > -1) ? upcased : method;
}


function Request(input, initOptions) {
  const options = initOptions || {};
  let body = options.body;
  if (Request.prototype.isPrototypeOf(input)) {
    if (input.bodyUsed) {
      throw new TypeError('Already read');
    }
    this.url = input.url;
    this.credentials = input.credentials;
    if (!options.headers) {
      this.headers = new Headers(input.headers);
    }
    this.method = input.method;
    this.mode = input.mode;
    if (!body) {
      body = input._bodyInit;
      input.bodyUsed = true;
    }
  } else {
    this.url = input;
  }

  this.credentials = options.credentials || this.credentials || 'omit';
  if (options.headers || !this.headers) {
    this.headers = new Headers(options.headers);
  }
  this.method = normalizeMethod(options.method || this.method || 'GET');
  this.mode = options.mode || this.mode || null;
  this.referrer = null;

  if ((this.method === 'GET' || this.method === 'HEAD') && body) {
    throw new TypeError('Body not allowed for GET or HEAD requests');
  }
  this._initBody(body);
}

function headers(xhr) {
  const head = new Headers();
  const pairs = xhr.getAllResponseHeaders().trim().split('\n');
  pairs.forEach((header) => {
    const split = header.trim().split(':');
    const key = split.shift().trim();
    const value = split.join(':').trim();
    head.append(key, value);
  });
  return head;
}

Body.call(Request.prototype);

function Response(bodyInit, initOptions) {
  // if (!options) {
  //   options = {};
  // }
  const options = initOptions || {};
  this._initBody(bodyInit);
  this.type = 'default';
  this.url = null;
  this.status = options.status;
  this.ok = this.status >= 200 && this.status < 300;
  this.statusText = options.statusText;
  this.headers = options.headers instanceof Headers ? options.headers : new Headers(options.headers);
  this.url = options.url || '';
}

Body.call(Response.prototype);
self.Headers = Headers;
self.Request = Request;
self.Response = Response;

export default function(input, init, onProgress) {
  let request;
  if (Request.prototype.isPrototypeOf(input) && !init) {
    request = input;
  } else {
    request = new Request(input, init);
  }

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    function responseURL() {
      if ('responseURL' in xhr) {
        return xhr.responseURL;
      }
      // Avoid security warnings on getResponseHeader when not allowed by CORS
      if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
        return xhr.getResponseHeader('X-Request-URL');
      }
      return null;
    }
    xhr.onload = function() {
      const status = (xhr.status === 1223) ? 204 : xhr.status;
      if (status < 100 || status > 599) {
        reject(new TypeError('Network request failed'));
        return;
      }
      const options = {
        status: status,
        statusText: xhr.statusText,
        headers: headers(xhr),
        url: responseURL()
      };
      const body = 'response' in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, options));
    };
    xhr.onerror = function() {
      reject(new TypeError('Network request failed'));
    };

    xhr.open(request.method, request.url, true);
    
    if (request.credentials === 'include') {
      xhr.withCredentials = true;
    }
    if ('responseType' in xhr && support.blob) {
      xhr.responseType = 'blob';
    }
    request.headers.forEach((value, name) => {
      xhr.setRequestHeader(name, value);
    });
    xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    function updateProgress(event) {
      if (event.lengthComputable) {
        const percentComplete = event.loaded / event.total;
        onProgress && onProgress(percentComplete);
      }
    }
    xhr.onprogress = updateProgress;
    xhr.upload.onprogress = updateProgress;
  });
}
