import { Promise } from 'es6-promise';
// import Global from './global';


export const getMobileOS = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
    return 'iOS';
  } else if (userAgent.match(/Android/i)) {
    return 'Android';
  } else { // 默认为iOS,方便桌面端调试
    return 'iOS';
  }
};
export const isArray = (obj) => Object.prototype.toString.call(obj) === '[object Array]';

export const getTfsImg = (img, width, height, defaultImg) => {
  // if (!img || img === '') {
  //   return defaultImg || '';
  //   // img.indexOf('data:image/png;base64')

  // } else if (img.indexOf('/images/') !== -1 || (/^data:image\/.*;base64/).test(img)) {
  //   return img;
  // }
  // let url = img.indexOf('http') === -1 ? Global.TFS_URL + img : img;
  // url += (width && img.indexOf('http') === -1) ? (`_${width}x${height}.jpg`) : '';
  // return url;
};
// 获取计算后的样式
export const getComputedStyle = (el) => {
  if (!el) return null;
  if (window.getComputedStyle) {
    return window.getComputedStyle(el, null);  // 非IE
  } else {
    return el.currentStyle;  // IE
  }
};
// 获取指定的样式属性
export const getStyle = (el, prop) => {
  const style = getComputedStyle(el);
   return prop ? style[prop] || style.getPropertyValue(prop) : null;
};

export const getScrollTop = () => window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
// , i = this.config.scrollEl === window ? window.pageYOffset : this.config.scrollEl.scrollTop

// 获取requestAnimationFrame
export const getRAF = (func) => {
  const w = window;
  const prefixs = [ 'r', 'webkitR', 'mozR', 'msR', 'oR' ];
  // for(let i = 0; i < prefixs.length; i++){
  for (let prefix of prefixs) {
    prefix = `${prefix}equestAnimationFrame`;
    if (prefix in w) return w[prefix](func);
  }
  return setTimeout(func, 16);
};
export const cancelRAF = (func) => {
  const win = window;
  const prefixs = [ 'c', 'webkitC', 'mozC', 'msC', 'oC' ];
  // for(let i = 0; i < prefixs.length; i++){
  for (const prefix of prefixs) {
    // let prefix = prefixs[i];
		const cancel0prefix = `${prefix}equestAnimationFrame`;
		const cancel1prefix = `${prefix}ancelRequestAnimationFrame`;
		if (cancel0prefix in win || cancel1prefix in win) {
			return win[cancel0prefix] || win[cancel1prefix];
		}
  }
  return () => {
    clearTimeout(func);
  };
};
// 获取CSS前缀
export const getStylePrefix = (style) => {
    const prefixs = [ 'webkit', 'Moz', 'ms', 'O' ];
    const dom = document.createElement('div').style;
    if (style in dom) return '';
    const newStyle = style.replace('-', ' ').replace(/(^|\s+)\w/g, s => s.toUpperCase()).replace(' ', '');
    // for (let i = 0; i < prefixs.length; i++) {
    for (const prefix of prefixs) {
        if ((prefix + newStyle) in dom) {
            return prefix;
        }
    }
    return null;
};
// 是否支持Sticky
export const isSupportSticky = () => {
  const sticky = '-webkit-sticky';
  let iEl = document.createElement('i');
  iEl.style.position = sticky;
  const iElPos = iEl.style.position;
  iEl = null ;
  return iElPos === sticky;
};
// 是否支持
// 判断是否支持 transforms3d
export const isSupportTransform3D = () =>
  window.Modernizr && window.Modernizr.csstransforms3d === true || (() => {
                  const e = document.createElement('div').style;
                  return 'webkitPerspective' in e || 'MozPerspective' in e || 'OPerspective' in e || 'MsPerspective' in e || 'perspective' in e;
              })();

// 获取距离Body顶部的高度
export const getOffsetTop = (element) => {
  if (!element) return 0;
  let offsetTop = 0;
  let el = element;
  while (el.offsetParent) {
    offsetTop += el.offsetTop;
    el = el.offsetParent;
  }
  return offsetTop;
};
// 获取所有子元素的高度和（目前用在针对scroll的元素）
export const getChildrenHeight = (parent) => {
  let height = 0;
  const childNodes = [...parent.childNodes];
  for (const childNode of childNodes) {
    height += childNode.clientHeight;
  }
  return height;
};
// export function getTransform() {
//     var prefixs = ["t", "webkitT", "MozT", "msT", "OT"], dom = document.createElement("div").style;
//     for(let prefix of prefixs){
//         prefix = prefix + "ransform";
//         if (prefix in dom) {
//             return prefix
//         }
//     }
//     return null
// };

// 获取第一个指定class的节点
export const getParentNode = (node, className) => {
  if (!node) return document;
  if (!className) return node;
  let parent = node;
  while (parent) {
    if (!parent.parentNode || (parent.parentNode === (node.ownerDocument || document))) {
      return node.ownerDocument || document;
    }
    if (parent.classList.contains(className)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return node.ownerDocument || document;
};

// 获取第一个滚动父节点
// 为了更精确计算请使用 getComputedStyle 获取计算后的样式
export const getScrollParent = (node) => {
  if (!node) {
    return document;
  }
  const excludeStaticParent = node.style.position === 'absolute';
  const overflowRegex = /(scroll|auto)/;
  let parent = node;
  while (parent) {
    if (!parent.parentNode || (parent.parentNode === (node.ownerDocument || document))) {
      return node.ownerDocument || document;
    }
    // const { position, overflow, overflowX, overflowY } = parent.style;
    const { position, overflow, overflowX, overflowY } = getComputedStyle(parent);
    if (position === 'static' && excludeStaticParent) {
      continue;
    }
    if (overflowRegex.test(overflow + overflowX + overflowY)) {
      return parent;
    }
    parent = parent.parentNode;
  }
  return node.ownerDocument || document;
};

// 判断是否进入手机显示区域
const checkInScreen = (node, offsetX, offsetY) => {
  const { top, left, right, bottom } = node.getBoundingClientRect();
  return bottom > -offsetY && top < window.innerHeight + offsetY
    && left < window.innerWidth + offsetX && right > -offsetX;
};
// 在滚动区域内的是否进入可视区域
export const checkVisible = (node, parent, xOffset, yOffset) => {
  if (!node) return false;
  const offsetX = xOffset || 0;
  const offsetY = yOffset || 100;
  // 直接判断是否在屏幕范围内
  if (!parent || parent === document || parent === document.body) {
    return checkInScreen(node, offsetX, offsetY);
  }
  // 判断当前元素是否在屏幕范围
  if (!checkInScreen(node, offsetX, offsetY)) return false;
  // 判断父元素是否在屏幕范围内
  if (!checkInScreen(parent, offsetX, offsetY)) return false;
  // 当前元素和父元素都在屏幕范围内时，判断当前元素是否在父元素中显示
  const { top, left, right, bottom } = node.getBoundingClientRect();
  const parentRect = parent.getBoundingClientRect();
  return top < parentRect.bottom + offsetY && bottom > parentRect.top - offsetY && left < parentRect.right + offsetX && right > parentRect.left - offsetX;
};
// 触发可监听事件
export const trigger = (e, detail) => {
    let event = null;
    try {
        event = new window.CustomEvent(e, {
            detail,
            bubbles: true,
            cancelable: true
        });
    } catch (err) {
        event = document.createEvent('Event');
        event.initEvent(e, true, true);
        event.detail = detail;
    }
    document.dispatchEvent(event);
};

// 加载图片
export const loadImg = (imgDom) =>
new Promise((resolve, reject) => {
		if (imgDom && (!imgDom.dataset.lazyloadflag || imgDom.src !== imgDom.dataset.src || !imgDom.src)) {
			const img = new Image();
			img.onload = () => {
				imgDom.classList.remove('img-beforeload');
				imgDom.classList.add('img-lazyload');
				imgDom.src = imgDom.dataset.src;
				imgDom.dataset.lazyloadflag = 1;
				imgDom.onload = null;
				resolve();
			};
			img.onerror = () => {
				imgDom.classList.remove('img-beforeload');
				reject();
			};
			img.src = imgDom.dataset.src;
			imgDom.classList.add('img-beforeload');
		} else {
      resolve();
    }
  });

// 平滑滚动效果
export const scrollAnim = (offset, duration, callback) => {
  if (duration < 0) return;
  const diff = (offset - document.body.scrollTop) / duration * 10;
  getRAF(() => {
      if (isNaN(parseInt(diff))) {
        callback && callback();
      } else {
        window.scrollTo(0, document.body.scrollTop + diff);
        scrollAnim(offset, duration - 10, callback);
      }
  });
};

function isFunction(obj) {
	return typeof obj == 'function' || false;
}
function has(obj, key) {
	return obj != null && hasOwnProperty.call(obj, key);
}

const eq = (a, b, aStack, bStack) => {
	if (a === b) return a !== 0 || 1 / a === 1 / b;
	if (a == null || b == null) return a === b;
	const className = toString.call(a);
	if (className !== toString.call(b)) return false;
	switch (className) {
		case '[object RegExp]':
      return `${a}` === `${b}`;
		case '[object String]':
      return `${a}` === `${b}`;
		case '[object Number]':
      if (Number(a) !== Number(a)) return Number(b) !== Number(b);
      return Number(a) === 0 ? 1 / Number(a) === 1 / b : Number(a) !== Number(b);
		case '[object Date]':
		case '[object Boolean]':
      return Number(a) === Number(b);
	}
	const areArrays = className === '[object Array]';
	if (!areArrays) {
		if (typeof a != 'object' || typeof b != 'object') return false;
		const aCtor = a.constructor;
		const bCtor = b.constructor;
		if (aCtor !== bCtor && !(isFunction(aCtor) && aCtor instanceof aCtor &&
				isFunction(bCtor) && bCtor instanceof bCtor) && ('constructor' in a && 'constructor' in b)) {
			return false;
		}
	}
	let length = aStack.length;
	while (length--) {
		if (aStack[length] === a) return bStack[length] === b;
	}

	aStack.push(a);
	bStack.push(b);

	if (areArrays) {
		length = a.length;
		if (length !== b.length) return false;
		while (length--) {
			if (!eq(a[length], b[length], aStack, bStack)) return false;
		}
	} else {
		const keys = Object.keys(a);
		let	key = null;
		length = keys.length;
		if (Object.keys(b).length !== length) return false;
		while (length--) {
			key = keys[length];
			if (!(has(b, key) && eq(a[key], b[key], aStack, bStack))) return false;
		}
	}
	aStack.pop();
	bStack.pop();
	return true;
};

export const isEqual = (a, b) => eq(a, b, [], []);
