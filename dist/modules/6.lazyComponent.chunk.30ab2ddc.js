webpackJsonp([6],{44:function(e,t,o){(function(e,n){!function(){var t=o(5),n=o(6),a=o(3),r=o(1);e.makeHot=e.hot.data?e.hot.data.makeHot:t(function(){return n.getRootInstances(a)},r)}();try{(function(){"use strict";function e(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.forceCheck=t.lazyload=void 0;var s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(1),c=e(l),u=o(22),f=e(u),p=o(84),d=o(85),h=e(d),y=o(83),m=e(y),v=o(86),b=e(v),w=o(82),g=e(w),_="data-lazyload-listened",k=[],O=[],P=function(e,t){var o=f.default.findDOMNode(e),n=t.getBoundingClientRect(),a=n.top,r=n.height,i=window.innerHeight||document.documentElement.clientHeight,s=Math.max(a,0),l=Math.min(i,s+r)-s,c=o.getBoundingClientRect(),u=c.top,p=c.height,d=u-s,h=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return d-h[0]<=l&&d+p+h[1]>=0},E=function(e){var t=f.default.findDOMNode(e),o=t.getBoundingClientRect(),n=o.top,a=o.height,r=window.innerHeight||document.documentElement.clientHeight,i=Array.isArray(e.props.offset)?e.props.offset:[e.props.offset,e.props.offset];return n-i[0]<=r&&n+a+i[1]>=0},H=function(e){var t=f.default.findDOMNode(e);if(t){var o=(0,h.default)(t),n=o!==t.ownerDocument&&o!==document&&o!==document.documentElement,a=n?P(e,o):E(e);a?e.visible||(e.props.once&&O.push(e),e.visible=!0,e.forceUpdate()):e.props.once&&e.visible||(e.visible=!1)}},C=function(){O.forEach(function(e){var t=k.indexOf(e);t!==-1&&k.splice(t,1)}),O=[]},j=function(){for(var e=0;e<k.length;++e){var t=k[e];H(t)}C()},z=void 0,T=null,R=function(e){function t(e){a(this,t);var o=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.visible=!1,o}return i(t,e),s(t,[{key:"componentDidMount",value:function(){"undefined"!=typeof n&&"production"!==n.env.NODE_ENV&&(c.default.Children.count(this.props.children)>1&&console.warn("[react-lazyload] Only one child is allowed to be passed to `LazyLoad`."),this.props.wheel&&console.warn("[react-lazyload] Props `wheel` is not supported anymore, try set `overflow` for lazy loading in overflow containers."),this.props.placeholder||void 0!==this.props.height||0!==f.default.findDOMNode(this).offsetHeight||console.warn("[react-lazyload] Please add `height` props to <LazyLoad> for better performance."));var e=!1;if(void 0!==this.props.debounce&&"throttle"===z?(console.warn("[react-lazyload] Previous delay function is `throttle`, now switching to `debounce`, try setting them unanimously"),e=!0):"debounce"===z&&void 0===this.props.debounce&&(console.warn("[react-lazyload] Previous delay function is `debounce`, now switching to `throttle`, try setting them unanimously"),e=!0),e&&((0,p.off)(window,"scroll",T),(0,p.off)(window,"resize",T),T=null),T||(void 0!==this.props.debounce?(T=(0,m.default)(j,"number"==typeof this.props.debounce?this.props.debounce:300),z="debounce"):(T=(0,b.default)(j,"number"==typeof this.props.throttle?this.props.throttle:300),z="throttle")),this.props.overflow){var t=(0,h.default)(f.default.findDOMNode(this));if(t){var o=1+ +t.getAttribute(_);1===o&&t.addEventListener("scroll",T),t.setAttribute(_,o)}}else if(0===k.length||e){var a=this.props,r=a.scroll,i=a.resize;r&&(0,p.on)(window,"scroll",T),i&&(0,p.on)(window,"resize",T)}k.push(this),H(this)}},{key:"shouldComponentUpdate",value:function(){return this.visible}},{key:"componentWillUnmount",value:function(){if(this.props.overflow){var e=(0,h.default)(f.default.findDOMNode(this));if(e){var t=+e.getAttribute(_)-1;0===t?(e.removeEventListener("scroll",T),e.removeAttribute(_)):e.setAttribute(_,t)}}var o=k.indexOf(this);o!==-1&&k.splice(o,1),0===k.length&&((0,p.off)(window,"resize",T),(0,p.off)(window,"scroll",T))}},{key:"render",value:function(){return this.visible?this.props.children:this.props.placeholder?this.props.placeholder:c.default.createElement("div",{style:{height:this.props.height},className:"lazyload-placeholder"})}}]),t}(l.Component);R.propTypes={once:l.PropTypes.bool,height:l.PropTypes.oneOfType([l.PropTypes.number,l.PropTypes.string]),offset:l.PropTypes.oneOfType([l.PropTypes.number,l.PropTypes.arrayOf(l.PropTypes.number)]),overflow:l.PropTypes.bool,resize:l.PropTypes.bool,scroll:l.PropTypes.bool,children:l.PropTypes.node,throttle:l.PropTypes.oneOfType([l.PropTypes.number,l.PropTypes.bool]),debounce:l.PropTypes.oneOfType([l.PropTypes.number,l.PropTypes.bool]),placeholder:l.PropTypes.node},R.defaultProps={once:!1,offset:0,overflow:!1,resize:!1,scroll:!0};t.lazyload=g.default;t.default=R,t.forceCheck=j}).call(this)}finally{!function(){var t=e.hot.data&&e.hot.data.foundReactClasses||!1;if(e.exports&&e.makeHot){var n=o(7);n(e,o(1))&&(t=!0);var a=t;a&&e.hot.accept(function(e){e&&console.error("Cannot apply hot update to index.js: "+e.message)})}e.hot.dispose(function(o){o.makeHot=e.makeHot,o.foundReactClasses=t})}()}}).call(t,o(4)(e),o(2))},60:function(e,t){e.exports={"lazy-img-page-container":"app-modules-reactLazy-style__lazy-img-page-container","img-container":"app-modules-reactLazy-style__img-container","place-holder":"app-modules-reactLazy-style__place-holder","lazy-component-page-container":"app-modules-reactLazy-style__lazy-component-page-container",placeholder:"app-modules-reactLazy-style__placeholder",spinner:"app-modules-reactLazy-style__spinner","sk-stretchdelay":"app-modules-reactLazy-style__sk-stretchdelay",react2:"app-modules-reactLazy-style__react2",react3:"app-modules-reactLazy-style__react3",react4:"app-modules-reactLazy-style__react4",react5:"app-modules-reactLazy-style__react5","widget-container":"app-modules-reactLazy-style__widget-container"}},82:function(e,t,o){(function(e){!function(){var t=o(5),n=o(6),a=o(3),r=o(1);e.makeHot=e.hot.data?e.hot.data.makeHot:t(function(){return n.getRootInstances(a)},r)}();try{(function(){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}(),l=o(44),c=n(l),u=o(1),f=n(u),p=function(e){return e.displayName||e.name||"Component"};t.default=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return function(t){return function(o){function n(){a(this,n);var e=r(this,(n.__proto__||Object.getPrototypeOf(n)).call(this));return e.displayName="LazyLoad"+p(t),e}return i(n,o),s(n,[{key:"render",value:function(){return f.default.createElement(c.default,e,f.default.createElement(t,this.props))}}]),n}(u.Component)}},e.exports=t.default}).call(this)}finally{!function(){var t=e.hot.data&&e.hot.data.foundReactClasses||!1;if(e.exports&&e.makeHot){var n=o(7);n(e,o(1))&&(t=!0);var a=t;a&&e.hot.accept(function(e){e&&console.error("Cannot apply hot update to decorator.js: "+e.message)})}e.hot.dispose(function(o){o.makeHot=e.makeHot,o.foundReactClasses=t})}()}}).call(t,o(4)(e))},83:function(e,t,o){(function(e){!function(){var t=o(5),n=o(6),a=o(3),r=o(1);e.makeHot=e.hot.data?e.hot.data.makeHot:t(function(){return n.getRootInstances(a)},r)}();try{(function(){"use strict";function o(e,t,o){var n=void 0,a=void 0,r=void 0,i=void 0,s=void 0,l=function l(){var c=+new Date-i;c<t&&c>=0?n=setTimeout(l,t-c):(n=null,o||(s=e.apply(r,a),n||(r=a=null)))};return function(){r=this,a=arguments,i=+new Date;var c=o&&!n;return n||(n=setTimeout(l,t)),c&&(s=e.apply(r,a),r=a=null),s}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o,e.exports=t.default}).call(this)}finally{!function(){var t=e.hot.data&&e.hot.data.foundReactClasses||!1;if(e.exports&&e.makeHot){var n=o(7);n(e,o(1))&&(t=!0);var a=t;a&&e.hot.accept(function(e){e&&console.error("Cannot apply hot update to debounce.js: "+e.message)})}e.hot.dispose(function(o){o.makeHot=e.makeHot,o.foundReactClasses=t})}()}}).call(t,o(4)(e))},84:function(e,t,o){(function(e){!function(){var t=o(5),n=o(6),a=o(3),r=o(1);e.makeHot=e.hot.data?e.hot.data.makeHot:t(function(){return n.getRootInstances(a)},r)}();try{(function(){"use strict";function e(e,t,o){e.addEventListener?e.addEventListener(t,o,!1):e.attachEvent&&e.attachEvent("on"+t,function(t){o.call(e,t||window.event)})}function o(e,t,o){e.removeEventListener?e.removeEventListener(t,o):e.detachEvent&&e.detachEvent("on"+t,o)}Object.defineProperty(t,"__esModule",{value:!0}),t.on=e,t.off=o}).call(this)}finally{!function(){var t=e.hot.data&&e.hot.data.foundReactClasses||!1;if(e.exports&&e.makeHot){var n=o(7);n(e,o(1))&&(t=!0);var a=t;a&&e.hot.accept(function(e){e&&console.error("Cannot apply hot update to event.js: "+e.message)})}e.hot.dispose(function(o){o.makeHot=e.makeHot,o.foundReactClasses=t})}()}}).call(t,o(4)(e))},85:function(e,t,o){(function(e){!function(){var t=o(5),n=o(6),a=o(3),r=o(1);e.makeHot=e.hot.data?e.hot.data.makeHot:t(function(){return n.getRootInstances(a)},r)}();try{(function(){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){if(!e)return document;for(var t="absolute"===e.style.position,o=/(scroll|auto)/,n=e;n;){if(!n.parentNode)return e.ownerDocument||document;var a=window.getComputedStyle(n),r=a.position,i=a.overflow,s=a["overflow-x"],l=a["overflow-y"];if("static"!==r||!t){if(o.test(i+s+l))return n;n=n.parentNode}}return e.ownerDocument||e.documentElement||document},e.exports=t.default}).call(this)}finally{!function(){var t=e.hot.data&&e.hot.data.foundReactClasses||!1;if(e.exports&&e.makeHot){var n=o(7);n(e,o(1))&&(t=!0);var a=t;a&&e.hot.accept(function(e){e&&console.error("Cannot apply hot update to scrollParent.js: "+e.message)})}e.hot.dispose(function(o){o.makeHot=e.makeHot,o.foundReactClasses=t})}()}}).call(t,o(4)(e))},86:function(e,t,o){(function(e){!function(){var t=o(5),n=o(6),a=o(3),r=o(1);e.makeHot=e.hot.data?e.hot.data.makeHot:t(function(){return n.getRootInstances(a)},r)}();try{(function(){"use strict";function o(e,t,o){t||(t=250);var n,a;return function(){var r=o||this,i=+new Date,s=arguments;n&&i<n+t?(clearTimeout(a),a=setTimeout(function(){n=i,e.apply(r,s)},t)):(n=i,e.apply(r,s))}}Object.defineProperty(t,"__esModule",{value:!0}),t.default=o,e.exports=t.default}).call(this)}finally{!function(){var t=e.hot.data&&e.hot.data.foundReactClasses||!1;if(e.exports&&e.makeHot){var n=o(7);n(e,o(1))&&(t=!0);var a=t;a&&e.hot.accept(function(e){e&&console.error("Cannot apply hot update to throttle.js: "+e.message)})}e.hot.dispose(function(o){o.makeHot=e.makeHot,o.foundReactClasses=t})}()}}).call(t,o(4)(e))},302:function(e,t,o){(function(e,n){!function(){var t=o(5),n=o(6),a=o(3),r=o(1);e.makeHot=e.hot.data?e.hot.data.makeHot:t(function(){return n.getRootInstances(a)},r)}();try{(function(){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});for(var l=(function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,o,n){return o&&e(t.prototype,o),n&&e(t,n),t}}()),c=o(1),u=o(44),f=a(u),p=o(60),d=a(p),h=[],y=100;y>0;y--)h.push("http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxw0e1mlj20u01hcgvs.jpg");var m=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),l(t,[{key:"render",value:function(){return n.createElement("div",{className:d.default.placeholder},n.createElement("div",{className:d.default.spinner},n.createElement("div",{className:d.default.react1}),n.createElement("div",{className:d.default.react2}),n.createElement("div",{className:d.default.react3}),n.createElement("div",{className:d.default.react4}),n.createElement("div",{className:d.default.react5})))}}]),t}(c.Component),v=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),l(t,[{key:"componentDidMount",value:function(){console.log("Widget componentDidMount")}},{key:"render",value:function(){return n.createElement("div",{className:d.default["widget-container"]},"Widget")}}]),t}(c.Component),b=function(e){function t(){return r(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),l(t,[{key:"render",value:function(){return n.createElement("div",{className:d.default["lazy-component-page-container"]},h.map(function(e,t){return n.createElement(f.default,{once:!0,key:t,offset:[-200,0],placeholder:n.createElement(m,null),debounce:100},n.createElement(v,null))}))}}]),t}(c.Component);t.default=b,e.exports=t.default}).call(this)}finally{!function(){var t=e.hot.data&&e.hot.data.foundReactClasses||!1;if(e.exports&&e.makeHot){var n=o(7);n(e,o(1))&&(t=!0);var a=t;a&&e.hot.accept(function(e){e&&console.error("Cannot apply hot update to lazyComponent.js: "+e.message)})}e.hot.dispose(function(o){o.makeHot=e.makeHot,o.foundReactClasses=t})}()}}).call(t,o(4)(e),o(1))}});
//# sourceMappingURL=6.lazyComponent.chunk.30ab2ddc.js.map