(function(t){function e(e){for(var r,c,a=e[0],i=e[1],l=e[2],d=0,s=[];d<a.length;d++)c=a[d],Object.prototype.hasOwnProperty.call(o,c)&&o[c]&&s.push(o[c][0]),o[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(t[r]=i[r]);f&&f(e);while(s.length)s.shift()();return u.push.apply(u,l||[]),n()}function n(){for(var t,e=0;e<u.length;e++){for(var n=u[e],r=!0,c=1;c<n.length;c++){var i=n[c];0!==o[i]&&(r=!1)}r&&(u.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={app:0},u=[];function c(t){return a.p+"js/"+({Products:"Products"}[t]||t)+"."+{Products:"d746eb96","chunk-2d0ab4cc":"40d1753a","chunk-2d0e9571":"1bb111e5"}[t]+".js"}function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(t){var e=[],n=o[t];if(0!==n)if(n)e.push(n[2]);else{var r=new Promise((function(e,r){n=o[t]=[e,r]}));e.push(n[2]=r);var u,i=document.createElement("script");i.charset="utf-8",i.timeout=120,a.nc&&i.setAttribute("nonce",a.nc),i.src=c(t);var l=new Error;u=function(e){i.onerror=i.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),u=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+r+": "+u+")",l.name="ChunkLoadError",l.type=r,l.request=u,n[1](l)}o[t]=void 0}};var d=setTimeout((function(){u({type:"timeout",target:i})}),12e4);i.onerror=i.onload=u,document.head.appendChild(i)}return Promise.all(e)},a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/",a.oe=function(t){throw console.error(t),t};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var d=0;d<i.length;d++)e(i[d]);var f=l;u.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("7a23"),o=Object(r["g"])("admin-layout"),u=Object(r["g"])("products page"),c=Object(r["g"])("client-layout");function a(t,e,n,a,i,l){var d=Object(r["w"])("router-view"),f=Object(r["w"])("router-link");return Object(r["r"])(),Object(r["d"])(Object(r["x"])(a.layout),null,{default:Object(r["B"])((function(){return[Object(r["h"])(d),Object(r["h"])(f,{to:"/admin/dashbroad"},{default:Object(r["B"])((function(){return[o]})),_:1}),Object(r["h"])(f,{to:"/products"},{default:Object(r["B"])((function(){return[u]})),_:1}),Object(r["h"])(f,{to:"/"},{default:Object(r["B"])((function(){return[c]})),_:1})]})),_:1})}var i=n("6c02"),l="client",d={name:"App",setup:function(){var t=Object(i["c"])();return{layout:Object(r["b"])((function(){return(t.meta.layout||l)+"-layout"}))}}},f=n("6b0d"),s=n.n(f);const p=s()(d,[["render",a]]);var b=p,h=(n("d3b7"),n("3ca3"),n("ddb0"),{class:"client-layout"}),m=Object(r["f"])("h1",null,"this is home page of perfume shop!",-1),j=[m];function O(t,e,n,o,u,c){return Object(r["r"])(),Object(r["e"])("div",h,j)}var v={setup:function(){},data:function(){return{}}};const y=s()(v,[["render",O]]);var g=y,w={class:"admin-layout"},P=Object(r["f"])("h1",null,"this is admin dashbroad of perfume shop!",-1),k=[P];function _(t,e,n,o,u,c){return Object(r["r"])(),Object(r["e"])("div",w,k)}var x={setup:function(){},data:function(){return{}}};const S=s()(x,[["render",_]]);var B=S,M=[{path:"/",name:"Home",component:g,meta:{layout:"client"}},{path:"/products",name:"Products",component:function(){return n.e("Products").then(n.bind(null,"7ef2"))},meta:{layout:"client"}},{path:"/admin/dashbroad",name:"Dashbroad",component:B,meta:{layout:"admin"}}],T=Object(i["a"])({history:Object(i["b"])("/"),routes:M}),E=T;n("ba8c");function A(t){t.component("admin-layout",Object(r["i"])((function(){return n.e("chunk-2d0e9571").then(n.bind(null,"8cb2"))}))),t.component("client-layout",Object(r["i"])((function(){return n.e("chunk-2d0ab4cc").then(n.bind(null,"154f"))})))}var C=Object(r["c"])(b);C.use(E),A(C),C.mount("#app")},ba8c:function(t,e,n){}});
//# sourceMappingURL=app.173fe954.js.map