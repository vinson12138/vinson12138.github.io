window.__require=function t(e,r,n){function o(i,u){if(!r[i]){if(!e[i]){var f=i.split("/");if(f=f[f.length-1],!e[f]){var p="function"==typeof __require&&__require;if(!u&&p)return p(f,!0);if(c)return c(f,!0);throw new Error("Cannot find module '"+i+"'")}i=f}var a=r[i]={exports:{}};e[i][0].call(a.exports,function(t){return o(e[i][1][t]||t)},a,a.exports,t,e,r,n)}return r[i].exports}for(var c="function"==typeof __require&&__require,i=0;i<n.length;i++)o(n[i]);return o}({Main:[function(t,e,r){"use strict";cc._RF.push(e,"3630fMnJkNK26MTVPeIk32F","Main");var n,o=this&&this.__extends||(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)}),c=this&&this.__decorate||function(t,e,r,n){var o,c=arguments.length,i=c<3?e:null===n?n=Object.getOwnPropertyDescriptor(e,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)i=Reflect.decorate(t,e,r,n);else for(var u=t.length-1;u>=0;u--)(o=t[u])&&(i=(c<3?o(i):c>3?o(e,r,i):o(e,r))||i);return c>3&&i&&Object.defineProperty(e,r,i),i};Object.defineProperty(r,"__esModule",{value:!0});var i=cc._decorator,u=i.ccclass,f=(i.property,function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.start=function(){},e.prototype.onClickBtnBack=function(){cc.director.loadScene("Startup")},c([u],e)}(cc.Component));r.default=f,cc._RF.pop()},{}]},{},["Main"]);