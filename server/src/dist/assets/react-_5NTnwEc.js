import{c as J}from"./@babel-CwQs3Sys.js";function M(e,t){for(var r=0;r<t.length;r++){const u=t[r];if(typeof u!="string"&&!Array.isArray(u)){for(const o in u)if(o!=="default"&&!(o in e)){const c=Object.getOwnPropertyDescriptor(u,o);c&&Object.defineProperty(e,o,c.get?c:{enumerable:!0,get:()=>u[o]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}var q={exports:{}},n={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var _=Symbol.for("react.element"),z=Symbol.for("react.portal"),B=Symbol.for("react.fragment"),H=Symbol.for("react.strict_mode"),W=Symbol.for("react.profiler"),Y=Symbol.for("react.provider"),G=Symbol.for("react.context"),K=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),X=Symbol.for("react.memo"),Z=Symbol.for("react.lazy"),g=Symbol.iterator;function ee(e){return e===null||typeof e!="object"?null:(e=g&&e[g]||e["@@iterator"],typeof e=="function"?e:null)}var D={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,F={};function y(e,t,r){this.props=e,this.context=t,this.refs=F,this.updater=r||D}y.prototype.isReactComponent={};y.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function L(){}L.prototype=y.prototype;function b(e,t,r){this.props=e,this.context=t,this.refs=F,this.updater=r||D}var k=b.prototype=new L;k.constructor=b;A(k,y.prototype);k.isPureReactComponent=!0;var C=Array.isArray,N=Object.prototype.hasOwnProperty,w={current:null},U={key:!0,ref:!0,__self:!0,__source:!0};function V(e,t,r){var u,o={},c=null,f=null;if(t!=null)for(u in t.ref!==void 0&&(f=t.ref),t.key!==void 0&&(c=""+t.key),t)N.call(t,u)&&!U.hasOwnProperty(u)&&(o[u]=t[u]);var s=arguments.length-2;if(s===1)o.children=r;else if(1<s){for(var i=Array(s),a=0;a<s;a++)i[a]=arguments[a+2];o.children=i}if(e&&e.defaultProps)for(u in s=e.defaultProps,s)o[u]===void 0&&(o[u]=s[u]);return{$$typeof:_,type:e,key:c,ref:f,props:o,_owner:w.current}}function te(e,t){return{$$typeof:_,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function j(e){return typeof e=="object"&&e!==null&&e.$$typeof===_}function re(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var P=/\/+/g;function E(e,t){return typeof e=="object"&&e!==null&&e.key!=null?re(""+e.key):t.toString(36)}function h(e,t,r,u,o){var c=typeof e;(c==="undefined"||c==="boolean")&&(e=null);var f=!1;if(e===null)f=!0;else switch(c){case"string":case"number":f=!0;break;case"object":switch(e.$$typeof){case _:case z:f=!0}}if(f)return f=e,o=o(f),e=u===""?"."+E(f,0):u,C(o)?(r="",e!=null&&(r=e.replace(P,"$&/")+"/"),h(o,t,r,"",function(a){return a})):o!=null&&(j(o)&&(o=te(o,r+(!o.key||f&&f.key===o.key?"":(""+o.key).replace(P,"$&/")+"/")+e)),t.push(o)),1;if(f=0,u=u===""?".":u+":",C(e))for(var s=0;s<e.length;s++){c=e[s];var i=u+E(c,s);f+=h(c,t,r,i,o)}else if(i=ee(e),typeof i=="function")for(e=i.call(e),s=0;!(c=e.next()).done;)c=c.value,i=u+E(c,s++),f+=h(c,t,r,i,o);else if(c==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return f}function v(e,t,r){if(e==null)return e;var u=[],o=0;return h(e,u,"","",function(c){return t.call(r,c,o++)}),u}function ne(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var l={current:null},R={transition:null},oe={ReactCurrentDispatcher:l,ReactCurrentBatchConfig:R,ReactCurrentOwner:w};n.Children={map:v,forEach:function(e,t,r){v(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return v(e,function(){t++}),t},toArray:function(e){return v(e,function(t){return t})||[]},only:function(e){if(!j(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};n.Component=y;n.Fragment=B;n.Profiler=W;n.PureComponent=b;n.StrictMode=H;n.Suspense=Q;n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=oe;n.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var u=A({},e.props),o=e.key,c=e.ref,f=e._owner;if(t!=null){if(t.ref!==void 0&&(c=t.ref,f=w.current),t.key!==void 0&&(o=""+t.key),e.type&&e.type.defaultProps)var s=e.type.defaultProps;for(i in t)N.call(t,i)&&!U.hasOwnProperty(i)&&(u[i]=t[i]===void 0&&s!==void 0?s[i]:t[i])}var i=arguments.length-2;if(i===1)u.children=r;else if(1<i){s=Array(i);for(var a=0;a<i;a++)s[a]=arguments[a+2];u.children=s}return{$$typeof:_,type:e.type,key:o,ref:c,props:u,_owner:f}};n.createContext=function(e){return e={$$typeof:G,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Y,_context:e},e.Consumer=e};n.createElement=V;n.createFactory=function(e){var t=V.bind(null,e);return t.type=e,t};n.createRef=function(){return{current:null}};n.forwardRef=function(e){return{$$typeof:K,render:e}};n.isValidElement=j;n.lazy=function(e){return{$$typeof:Z,_payload:{_status:-1,_result:e},_init:ne}};n.memo=function(e,t){return{$$typeof:X,type:e,compare:t===void 0?null:t}};n.startTransition=function(e){var t=R.transition;R.transition={};try{e()}finally{R.transition=t}};n.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")};n.useCallback=function(e,t){return l.current.useCallback(e,t)};n.useContext=function(e){return l.current.useContext(e)};n.useDebugValue=function(){};n.useDeferredValue=function(e){return l.current.useDeferredValue(e)};n.useEffect=function(e,t){return l.current.useEffect(e,t)};n.useId=function(){return l.current.useId()};n.useImperativeHandle=function(e,t,r){return l.current.useImperativeHandle(e,t,r)};n.useInsertionEffect=function(e,t){return l.current.useInsertionEffect(e,t)};n.useLayoutEffect=function(e,t){return l.current.useLayoutEffect(e,t)};n.useMemo=function(e,t){return l.current.useMemo(e,t)};n.useReducer=function(e,t,r){return l.current.useReducer(e,t,r)};n.useRef=function(e){return l.current.useRef(e)};n.useState=function(e){return l.current.useState(e)};n.useSyncExternalStore=function(e,t,r){return l.current.useSyncExternalStore(e,t,r)};n.useTransition=function(){return l.current.useTransition()};n.version="18.2.0";q.exports=n;var O=q.exports;const ue=J(O),fe=M({__proto__:null,default:ue},[O]);var x={exports:{}},d={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var I;function ie(){if(I)return d;I=1;var e=O,t=Symbol.for("react.element"),r=Symbol.for("react.fragment"),u=Object.prototype.hasOwnProperty,o=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function f(s,i,a){var p,m={},S=null,$=null;a!==void 0&&(S=""+a),i.key!==void 0&&(S=""+i.key),i.ref!==void 0&&($=i.ref);for(p in i)u.call(i,p)&&!c.hasOwnProperty(p)&&(m[p]=i[p]);if(s&&s.defaultProps)for(p in i=s.defaultProps,i)m[p]===void 0&&(m[p]=i[p]);return{$$typeof:t,type:s,key:S,ref:$,props:m,_owner:o.current}}return d.Fragment=r,d.jsx=f,d.jsxs=f,d}var T;function ce(){return T||(T=1,x.exports=ie()),x.exports}var le=ce();export{fe as R,ce as a,ue as b,le as j,O as r};
