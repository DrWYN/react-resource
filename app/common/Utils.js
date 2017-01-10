
export default {
    //序列化对象
    serialize: function (obj, prefix) {
      var str = [];
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          var k = prefix ? prefix + "[" + p + "]" : p, v = obj[p];
          str.push(
            //  typeof v === "object" ?
            //serialize(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
      }
      return str.join("&");
    },
    /**
     * 基于 fetch 封装的 GET请求
     * @param url
     * @returns {Promise}
     */
    fetchGet: function(url, params) {
        if (params) {
            let paramsArray = []
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + encodeURIComponent(params[key])))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        return new Promise(function (resolve, reject) {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json()
                    } else {
                        reject('服务器繁忙，请稍后再试；\r\nCode:' + response.status)
                    }
                })
                .then((response) => {
                  resolve(response)
                    // if (response && response.error_code === 0) {
                    //     resolve(response)//response.error_code 是与服务器端的约定，非0就是错误
                    // } else {
                    //     reject(response.message)//response.message也是与服务器端的约定，error_code !==0 就需要返回message
                    // }
                })
                .catch((err)=> {
                    reject(_parseErrorMsg(err))
                })
        })
    },
      // 校验是否有重复key
      keysDupliCheck: function(combinedObject, ...args){
          // let chips = Array.prototype.slice.call(arguments, 1);
          // 合并前总数
          let chipsTotalLength = 0;
          for(let i=0; i<args.length; i++){
              chipsTotalLength += Object.keys(args[i]).length;
          }

          if(chipsTotalLength == Object.keys(combinedObject).length){
              return true;
          }

          return false;
      },
      getCookie: function(name) {
        let value = "; " + document.cookie;
        let parts = value.split("; " + name + "=");
        if (parts.length == 2) return parts.pop().split(";").shift();
      }
}
