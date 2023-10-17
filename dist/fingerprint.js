!function(){let e,t;function n(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}var r,o,i,a,s,u,l,c,d,f,p,h,m,g,v,y,b,w,_,k,S,x,E,C,T="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{};function O(e){return e&&e.__esModule?e.default:e}var R={},P={},I=T.parcelRequire34af;null==I&&((I=function(e){if(e in R)return R[e].exports;if(e in P){var t=P[e];delete P[e];var n={id:e,exports:{}};return R[e]=n,t.call(n.exports,n,n.exports),n.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){P[e]=t},T.parcelRequire34af=I),I.register("exYeM",function(e,t){e.exports=I("7Ykon")}),I.register("7Ykon",function(e,t){!function(){"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var n,r,o,i,a,s,u,l,c,d,f,p,h,m,g=Symbol.for("react.element"),v=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),b=Symbol.for("react.strict_mode"),w=Symbol.for("react.profiler"),_=Symbol.for("react.provider"),k=Symbol.for("react.context"),S=Symbol.for("react.forward_ref"),x=Symbol.for("react.suspense"),E=Symbol.for("react.suspense_list"),C=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),O=Symbol.for("react.offscreen"),R=Symbol.iterator;function P(e){if(null===e||"object"!=typeof e)return null;var t=R&&e[R]||e["@@iterator"];return"function"==typeof t?t:null}/**
 * Keeps track of the current dispatcher.
 */var I={/**
   * @internal
   * @type {ReactComponent}
   */current:null},D={transition:null},M={current:null,// Used to reproduce behavior of `batchedUpdates` in legacy mode.
isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},N={/**
   * @internal
   * @type {ReactComponent}
   */current:null},L={},A=null;L.setExtraStackFrame=function(e){A=e},L.getCurrentStack=null,L.getStackAddendum=function(){var e="";// Add an extra top frame while an element is being validated
A&&(e+=A);// Delegate to the injected renderer-specific implementation
var t=L.getCurrentStack;return t&&(e+=t()||""),e};var U={ReactCurrentDispatcher:I,ReactCurrentBatchConfig:D,ReactCurrentOwner:N};// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.
function j(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];z("warn",e,n)}function F(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];z("error",e,n)}function z(e,t,n){var r=U.ReactDebugCurrentFrame.getStackAddendum();""!==r&&(t+="%s",n=n.concat([r]));var o=n.map(function(e){return String(e)});// Careful: RN currently depends on this prefix
o.unshift("Warning: "+t),// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console[e],console,o)}U.ReactDebugCurrentFrame=L,U.ReactCurrentActQueue=M;var q={};function B(e,t){var n=e.constructor,r=n&&(n.displayName||n.name)||"ReactClass",o=r+"."+t;q[o]||(F("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",t,r),q[o]=!0)}/**
 * This is the abstract API for an update queue.
 */var V={/**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */isMounted:function(e){return!1},/**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */enqueueForceUpdate:function(e,t,n){B(e,"forceUpdate")},/**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} callerName name of the calling function in the public API.
   * @internal
   */enqueueReplaceState:function(e,t,n,r){B(e,"replaceState")},/**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @param {?function} callback Called after component is updated.
   * @param {?string} Name of the calling function in the public API.
   * @internal
   */enqueueSetState:function(e,t,n,r){B(e,"setState")}},$=Object.assign,W={};/**
 * Base class helpers for the updating state of a component.
 */function H(e,t,n){this.props=e,this.context=t,this.refs=W,// renderer.
this.updater=n||V}Object.freeze(W),H.prototype.isReactComponent={},/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */H.prototype.setState=function(e,t){if("object"!=typeof e&&"function"!=typeof e&&null!=e)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */H.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};var Y={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},Q=function(e,t){Object.defineProperty(H.prototype,e,{get:function(){j("%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})};for(var K in Y)Y.hasOwnProperty(K)&&Q(K,Y[K]);function G(){}/**
 * Convenience component with default shallow equality check for sCU.
 */function X(e,t,n){this.props=e,this.context=t,this.refs=W,this.updater=n||V}G.prototype=H.prototype;var J=X.prototype=new G;J.constructor=X,$(J,H.prototype),J.isPureReactComponent=!0;var Z=Array.isArray;// eslint-disable-next-line no-redeclare
function ee(e){if(function(e){try{return!1}catch(e){return!0}}(e))return F("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.","function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"),""+e;// throw (to help callers find troubleshooting comments)
}function et(e){return e.displayName||"Context"}// Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
function en(e){if(null==e)return null;if("number"==typeof e.tag&&F("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),"function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case y:return"Fragment";case v:return"Portal";case w:return"Profiler";case b:return"StrictMode";case x:return"Suspense";case E:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case k:return et(e)+".Consumer";case _:return et(e._context)+".Provider";case S:return function(e,t,n){var r=e.displayName;if(r)return r;var o=t.displayName||t.name||"";return""!==o?n+"("+o+")":n}// Keep in sync with react-reconciler/getComponentNameFromFiber
(e,e.render,"ForwardRef");case C:var t=e.displayName||null;if(null!==t)return t;return en(e.type)||"Memo";case T:var n=e._payload,r=e._init;try{return en(r(n))}catch(e){}}return null}var er=Object.prototype.hasOwnProperty,eo={key:!0,ref:!0,__self:!0,__source:!0};function ei(e){if(er.call(e,"ref")){var t=Object.getOwnPropertyDescriptor(e,"ref").get;if(t&&t.isReactWarning)return!1}return void 0!==e.ref}function ea(e){if(er.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return void 0!==e.key}o={};/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */var es=function(e,t,n,r,o,i,a){var s={// This tag allows us to uniquely identify this as a React Element
$$typeof:g,// Built-in properties that belong on the element
type:e,key:t,ref:n,props:a,// Record the component responsible for creating this element.
_owner:i};return(// The validation flag is currently mutative. We put it on
// an external backing store so that we can freeze the whole object.
// This can be replaced with a WeakMap once they are implemented in
// commonly used development environments.
s._store={},// the validation flag non-enumerable (where possible, which should
// include every environment we run tests in), so the test framework
// ignores it.
Object.defineProperty(s._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(s,"_self",{configurable:!1,enumerable:!1,writable:!1,value:r}),// equal for testing purposes and therefore we hide it from enumeration.
Object.defineProperty(s,"_source",{configurable:!1,enumerable:!1,writable:!1,value:o}),Object.freeze&&(Object.freeze(s.props),Object.freeze(s)),s)};/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */function eu(e,t,i){var a,s={},u=null,l=null,c=null,d=null;if(null!=t)for(a in ei(t)&&(l=t.ref,function(e){if("string"==typeof e.ref&&N.current&&e.__self&&N.current.stateNode!==e.__self){var t=en(N.current.type);o[t]||(F('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',t,e.ref),o[t]=!0)}}(t)),ea(t)&&(ee(t.key),u=""+t.key),c=void 0===t.__self?null:t.__self,d=void 0===t.__source?null:t.__source,t)er.call(t,a)&&!eo.hasOwnProperty(a)&&(s[a]=t[a]);// Children can be more than one argument, and those are transferred onto
// the newly allocated props object.
var f=arguments.length-2;if(1===f)s.children=i;else if(f>1){for(var p=Array(f),h=0;h<f;h++)p[h]=arguments[h+2];Object.freeze&&Object.freeze(p),s.children=p}// Resolve default props
if(e&&e.defaultProps){var m=e.defaultProps;for(a in m)void 0===s[a]&&(s[a]=m[a])}if(u||l){var g,v,y="function"==typeof e?e.displayName||e.name||"Unknown":e;u&&((g=function(){n||(n=!0,F("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",y))}).isReactWarning=!0,Object.defineProperty(s,"key",{get:g,configurable:!0})),l&&((v=function(){r||(r=!0,F("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",y))}).isReactWarning=!0,Object.defineProperty(s,"ref",{get:v,configurable:!0}))}return es(e,u,l,c,d,N.current,s)}/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */function el(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r,o,i=$({},e.props),a=e.key,s=e.ref,u=e._self,l=e._source,c=e._owner;// Reserved names are extracted
if(null!=t)for(r in ei(t)&&(// Silently steal the ref from the parent.
s=t.ref,c=N.current),ea(t)&&(ee(t.key),a=""+t.key),e.type&&e.type.defaultProps&&(o=e.type.defaultProps),t)er.call(t,r)&&!eo.hasOwnProperty(r)&&(void 0===t[r]&&void 0!==o?i[r]=o[r]:i[r]=t[r]);// Children can be more than one argument, and those are transferred onto
// the newly allocated props object.
var d=arguments.length-2;if(1===d)i.children=n;else if(d>1){for(var f=Array(d),p=0;p<d;p++)f[p]=arguments[p+2];i.children=f}return es(e.type,a,s,u,l,c,i)}/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */function ec(e){return"object"==typeof e&&null!==e&&e.$$typeof===g}/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */var ed=!1,ef=/\/+/g;function ep(e){return e.replace(ef,"$&/")}/**
 * Generate a key string that identifies a element within a set.
 *
 * @param {*} element A element that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */function eh(e,t){// Do some typechecking here since we call this blindly. We want to ensure
// that we don't block potential future ES APIs.
if("object"==typeof e&&null!==e&&null!=e.key){var n,r;return ee(e.key),n=""+e.key,r={"=":"=0",":":"=2"},"$"+n.replace(/[=:]/g,function(e){return r[e]})}// Implicit key determined by the index in the set
return t.toString(36)}/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenmap
 *
 * The provided mapFunction(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */function em(e,t,n){if(null==e)return e;var r=[],o=0;return function e(t,n,r,o,i){var a=typeof t;("undefined"===a||"boolean"===a)&&(t=null);var s=!1;if(null===t)s=!0;else switch(a){case"string":case"number":s=!0;break;case"object":switch(t.$$typeof){case g:case v:s=!0}}if(s){var u,l,c=t,d=i(c),f=""===o?"."+eh(c,0):o;if(Z(d)){var p="";null!=f&&(p=ep(f)+"/"),e(d,n,p,"",function(e){return e})}else null!=d&&(ec(d)&&(d.key&&(!c||c.key!==d.key)&&ee(d.key),u=d,l=r+(d.key&&(!c||c.key!==d.key)?ep(""+d.key)+"/":"")+f,d=es(u.type,l,u.ref,u._self,u._source,u._owner,u.props)),n.push(d));return 1}var h=0,m=""===o?".":o+":";// Count of children found in the current subtree.
if(Z(t))for(var y=0;y<t.length;y++)_=m+eh(w=t[y],y),h+=e(w,n,r,_,i);else{var b=P(t);if("function"==typeof b){var w,_,k,S=t;// Warn about using Maps as children
b===S.entries&&(ed||j("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ed=!0);for(var x=b.call(S),E=0;!(k=x.next()).done;)_=m+eh(w=k.value,E++),h+=e(w,n,r,_,i)}else if("object"===a){// eslint-disable-next-line react-internal/safe-string-coercion
var C=String(t);throw Error("Objects are not valid as a React child (found: "+("[object Object]"===C?"object with keys {"+Object.keys(t).join(", ")+"}":C)+"). If you meant to render a collection of children, use an array instead.")}}return h}(e,r,"","",function(e){return t.call(n,e,o++)}),r}function eg(e){if(-1===e._status){var t=(0,e._result)();// Transition to the next state.
// This might throw either because it's missing or throws. If so, we treat it
// as still uninitialized and try again next time. Which is the same as what
// happens if the ctor or any wrappers processing the ctor throws. This might
// end up fixing it if the resolution was a concurrency bug.
t.then(function(t){(0===e._status||-1===e._status)&&(e._status=1,e._result=t)},function(t){(0===e._status||-1===e._status)&&(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status){var n=e._result;return void 0===n&&F("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",n),"default"in n||F("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",n),n.default}throw e._result}function ev(e){return"string"==typeof e||"function"==typeof e||e===y||e===w||e===b||e===x||e===E||e===O||"object"==typeof e&&null!==e&&(e.$$typeof===T||e.$$typeof===C||e.$$typeof===_||e.$$typeof===k||e.$$typeof===S||// This needs to include all possible module reference object
// types supported by any Flight configuration anywhere since
// we don't know which Flight build this will end up being used
// with.
e.$$typeof===i||void 0!==e.getModuleId)}function ey(){var e=I.current;// intentionally don't throw our own error because this is in a hot path.
// Also helps ensure this is inlined.
return null===e&&F("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem."),e}i=Symbol.for("react.module.reference");// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var eb=0;function ew(){}ew.__reactDisabledLog=!0;var e_=U.ReactCurrentDispatcher;function ek(e,t,n){if(void 0===p)try{throw Error()}catch(e){var r=e.stack.trim().match(/\n( *(at )?)/);p=r&&r[1]||""}// We use the prefix to ensure our stacks line up with native stack frames.
return"\n"+p+e}var eS=!1;function ex(e,t){// If something asked for a stack inside a fake render, it should get ignored.
if(!e||eS)return"";var n,r,o=h.get(e);if(void 0!==o)return o;eS=!0;var i=Error.prepareStackTrace;// $FlowFixMe It does accept undefined.
Error.prepareStackTrace=void 0,r=e_.current,// for warnings.
e_.current=null,function(){if(0===eb){/* eslint-disable react-internal/no-production-logging */a=console.log,s=console.info,u=console.warn,l=console.error,c=console.group,d=console.groupCollapsed,f=console.groupEnd;var e={configurable:!0,enumerable:!0,value:ew,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e});/* eslint-enable react-internal/no-production-logging */}eb++}();try{// This should throw.
if(t){// Something should be setting the props in the constructor.
var p=function(){throw Error()};// $FlowFixMe
if(Object.defineProperty(p.prototype,"props",{set:function(){// We use a throwing setter instead of frozen or non-writable props
// because that won't throw in a non-strict mode function.
throw Error()}}),"object"==typeof Reflect&&Reflect.construct){// We construct a different control for this case to include any extra
// frames added by the construct call.
try{Reflect.construct(p,[])}catch(e){n=e}Reflect.construct(e,[],p)}else{try{p.call()}catch(e){n=e}e.call(p.prototype)}}else{try{throw Error()}catch(e){n=e}e()}}catch(t){// This is inlined manually because closure doesn't do it for us.
if(t&&n&&"string"==typeof t.stack){for(// This extracts the first frame from the sample that isn't also in the control.
// Skipping one frame that we assume is the frame that calls the two.
var m=t.stack.split("\n"),g=n.stack.split("\n"),v=m.length-1,y=g.length-1;v>=1&&y>=0&&m[v]!==g[y];)// Typically this will be the root most one. However, stack frames may be
// cut off due to maximum stack limits. In this case, one maybe cut off
// earlier than the other. We assume that the sample is longer or the same
// and there for cut off earlier. So we should find the root most frame in
// the sample somewhere in the control.
y--;for(;v>=1&&y>=0;v--,y--)// frame that called our sample function and the control.
if(m[v]!==g[y]){// In V8, the first line is describing the message but other VMs don't.
// If we're about to return the first line, and the control is also on the same
// line, that's a pretty good indicator that our sample threw at same line as
// the control. I.e. before we entered the sample frame. So we ignore this result.
// This can happen if you passed a class to function component, or non-function.
if(1!==v||1!==y)do // The next one that isn't the same should be our match though.
if(v--,--y<0||m[v]!==g[y]){// V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
var b="\n"+m[v].replace(" at new "," at ");// If our component frame is labeled "<anonymous>"
return e.displayName&&b.includes("<anonymous>")&&(b=b.replace("<anonymous>",e.displayName)),"function"==typeof e&&h.set(e,b),b}while(v>=1&&y>=0)break}}}finally{eS=!1,e_.current=r,function(){if(0==--eb){/* eslint-disable react-internal/no-production-logging */var e={configurable:!0,enumerable:!0,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{log:$({},e,{value:a}),info:$({},e,{value:s}),warn:$({},e,{value:u}),error:$({},e,{value:l}),group:$({},e,{value:c}),groupCollapsed:$({},e,{value:d}),groupEnd:$({},e,{value:f})});/* eslint-enable react-internal/no-production-logging */}eb<0&&F("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=i}// Fallback to just using the name if we couldn't make it throw.
var w=e?e.displayName||e.name:"",_=w?ek(w):"";return"function"==typeof e&&h.set(e,_),_}function eE(e,t,n){if(null==e)return"";if("function"==typeof e)return ex(e,!!((r=e.prototype)&&r.isReactComponent));if("string"==typeof e)return ek(e);switch(e){case x:return ek("Suspense");case E:return ek("SuspenseList")}if("object"==typeof e)switch(e.$$typeof){case S:return ex(e.render,!1);case C:// Memo may contain any component type so we recursively resolve it.
return eE(e.type,t,n);case T:var r,o=e._payload,i=e._init;try{// Lazy may contain any component type so we recursively resolve it.
return eE(i(o),t,n)}catch(e){}}return""}h=new("function"==typeof WeakMap?WeakMap:Map);var eC={},eT=U.ReactDebugCurrentFrame;function eO(e){if(e){var t=e._owner,n=eE(e.type,e._source,t?t.type:null);eT.setExtraStackFrame(n)}else eT.setExtraStackFrame(null)}function eR(e){if(e){var t=e._owner;A=eE(e.type,e._source,t?t.type:null)}else A=null}function eP(){if(N.current){var e=en(N.current.type);if(e)return"\n\nCheck the render method of `"+e+"`."}return""}m=!1;/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */var eI={};/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */function eD(e,t){if(e._store&&!e._store.validated&&null==e.key){e._store.validated=!0;var n=function(e){var t=eP();if(!t){var n="string"==typeof e?e:e.displayName||e.name;n&&(t="\n\nCheck the top-level render call using <"+n+">.")}return t}(t);if(!eI[n]){eI[n]=!0;// property, it may be the creator of the child that's responsible for
// assigning it a key.
var r="";e&&e._owner&&e._owner!==N.current&&(r=" It was passed a child from "+en(e._owner.type)+"."),eR(e),F('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',n,r),eR(null)}}}/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */function eM(e,t){if("object"==typeof e){if(Z(e))for(var n=0;n<e.length;n++){var r=e[n];ec(r)&&eD(r,t)}else if(ec(e))e._store&&(e._store.validated=!0);else if(e){var o=P(e);if("function"==typeof o&&o!==e.entries)for(var i,a=o.call(e);!(i=a.next()).done;)ec(i.value)&&eD(i.value,t)}}}/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */function eN(e){var t,n=e.type;if(null!=n&&"string"!=typeof n){if("function"==typeof n)t=n.propTypes;else{if("object"!=typeof n||n.$$typeof!==S&&// Note: Memo only checks outer props here.
// Inner props are checked in the reconciler.
n.$$typeof!==C)return;t=n.propTypes}if(t){// Intentionally inside to avoid triggering lazy initializers:
var r=en(n);!function(e,t,n,r,o){// $FlowFixMe This is okay but Flow doesn't know it.
var i=Function.call.bind(er);for(var a in e)if(i(e,a)){var s=void 0;// Prop type validation may throw. In case they do, we don't want to
// fail the render phase where it didn't fail before. So we log it.
// After these have been cleaned up, we'll let them throw.
try{// This is intentionally an invariant that gets caught. It's the same
// behavior as without this statement except with a better message.
if("function"!=typeof e[a]){// eslint-disable-next-line react-internal/prod-error-codes
var u=Error((r||"React class")+": "+n+" type `"+a+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[a]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw u.name="Invariant Violation",u}s=e[a](t,a,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(e){s=e}!s||s instanceof Error||(eO(o),F("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,a,typeof s),eO(null)),s instanceof Error&&!(s.message in eC)&&(// Only monitor this failure once because there tends to be a lot of the
// same error.
eC[s.message]=!0,eO(o),F("Failed %s type: %s",n,s.message),eO(null))}}(t,e.props,"prop",r,e)}else void 0===n.PropTypes||m||(m=!0,F("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",en(n)||"Unknown"));"function"!=typeof n.getDefaultProps||n.getDefaultProps.isReactClassApproved||F("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function eL(e,t,n){var r=ev(e);// We warn in this case but don't throw. We expect the element creation to
// succeed and there will likely be errors in render.
if(!r){var o,i="";(void 0===e||"object"==typeof e&&null!==e&&0===Object.keys(e).length)&&(i+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var a=function(e){if(null!=e){var t;return void 0!==(t=e.__source)?"\n\nCheck your code at "+t.fileName.replace(/^.*[\\\/]/,"")+":"+t.lineNumber+".":""}return""}(t);(a?i+=a:i+=eP(),null===e)?o="null":Z(e)?o="array":void 0!==e&&e.$$typeof===g?(o="<"+(en(e.type)||"Unknown")+" />",i=" Did you accidentally export a JSX literal instead of a component?"):o=typeof e,F("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",o,i)}var s=eu.apply(this,arguments);// The result can be nullish if a mock or a custom function is used.
// TODO: Drop this when these are no longer allowed as the type argument.
if(null==s)return s;// Skip key warning if the type isn't valid since our key validation logic
// doesn't expect a non-string/function type and can throw confusing errors.
// We don't want exception behavior to differ between dev and prod.
// (Rendering will throw with a helpful message and as soon as the type is
// fixed, the key warnings will appear.)
if(r)for(var u=2;u<arguments.length;u++)eM(arguments[u],e);return e===y?/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */function(e){for(var t=Object.keys(e.props),n=0;n<t.length;n++){var r=t[n];if("children"!==r&&"key"!==r){eR(e),F("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",r),eR(null);break}}null!==e.ref&&(eR(e),F("Invalid attribute `ref` supplied to `React.Fragment`."),eR(null))}(s):eN(s),s}var eA=!1,eU=!1,ej=null,eF=0,ez=!1;function eq(e){e!==eF-1&&F("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),eF=e}function eB(t,n,r){var o=M.current;if(null!==o)try{e$(o),function(t){if(null===ej)try{// read require off the module object to get around the bundlers.
// we don't want them to detect a require and bundle a Node polyfill.
var n=("require"+Math.random()).slice(0,7);// version of setImmediate, bypassing fake timers if any.
ej=(e&&e[n]).call(e,"timers").setImmediate}catch(e){// we're in a browser
// we can't use regular timers because they may still be faked
// so we try MessageChannel+postMessage instead
ej=function(e){!1===eU&&(eU=!0,"undefined"==typeof MessageChannel&&F("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var t=new MessageChannel;t.port1.onmessage=e,t.port2.postMessage(void 0)}}ej(t)}(function(){0===o.length?(// No additional work was scheduled. Finish.
M.current=null,n(t)):eB(t,n,r)})}catch(e){r(e)}else n(t)}var eV=!1;function e$(e){if(!eV){// Prevent re-entrance.
eV=!0;var t=0;try{for(;t<e.length;t++){var n=e[t];do n=n(!0);while(null!==n)}e.length=0}catch(n){throw(// If something throws, leave the remaining callbacks on the queue.
e=e.slice(t+1),n)}finally{eV=!1}}}t.Children={map:em,forEach:/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenforeach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */function(e,t,n){em(e,function(){t.apply(this,arguments);// Don't return anything.
},n)},count:/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrencount
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */function(e){var t=0;return em(e,function(){t++;// Don't return anything
}),t},toArray:/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrentoarray
 */function(e){return em(e,function(e){return e})||[]},only:/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://reactjs.org/docs/react-api.html#reactchildrenonly
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */function(e){if(!ec(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=H,t.Fragment=y,t.Profiler=w,t.PureComponent=X,t.StrictMode=b,t.Suspense=x,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U,t.cloneElement=function(e,t,n){for(var r=el.apply(this,arguments),o=2;o<arguments.length;o++)eM(arguments[o],r.type);return eN(r),r},t.createContext=function(e){// TODO: Second argument used to be an optional `calculateChangedBits`
// function. Warn to reserve for future use?
var t={$$typeof:k,// As a workaround to support multiple concurrent renderers, we categorize
// some renderers as primary and others as secondary. We only expect
// there to be two concurrent renderers at most: React Native (primary) and
// Fabric (secondary); React DOM (primary) and React ART (secondary).
// Secondary renderers store their context values on separate fields.
_currentValue:e,_currentValue2:e,// Used to track how many concurrent renderers this context currently
// supports within in a single renderer. Such as parallel server rendering.
_threadCount:0,// These are circular
Provider:null,Consumer:null,// Add these to use same hidden class in VM as ServerContext
_defaultValue:null,_globalName:null};t.Provider={$$typeof:_,_context:t};var n=!1,r=!1,o=!1,i={$$typeof:k,_context:t};return Object.defineProperties(i,{Provider:{get:function(){return r||(r=!0,F("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),t.Provider},set:function(e){t.Provider=e}},_currentValue:{get:function(){return t._currentValue},set:function(e){t._currentValue=e}},_currentValue2:{get:function(){return t._currentValue2},set:function(e){t._currentValue2=e}},_threadCount:{get:function(){return t._threadCount},set:function(e){t._threadCount=e}},Consumer:{get:function(){return n||(n=!0,F("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),t.Consumer}},displayName:{get:function(){return t.displayName},set:function(e){o||(j("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",e),o=!0)}}}),t.Consumer=i,t._currentRenderer=null,t._currentRenderer2=null,t},t.createElement=eL,t.createFactory=function(e){var t=eL.bind(null,e);return t.type=e,eA||(eA=!0,j("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(t,"type",{enumerable:!1,get:function(){return j("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:e}),e}}),t},t.createRef=// an immutable object with a single mutable value
function(){var e={current:null};return Object.seal(e),e},t.forwardRef=function(e){null!=e&&e.$$typeof===C?F("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):"function"!=typeof e?F("forwardRef requires a render function but was given %s.",null===e?"null":typeof e):0!==e.length&&2!==e.length&&F("forwardRef render functions accept exactly two parameters: props and ref. %s",1===e.length?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),null!=e&&(null!=e.defaultProps||null!=e.propTypes)&&F("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var t,n={$$typeof:S,render:e};return Object.defineProperty(n,"displayName",{enumerable:!1,configurable:!0,get:function(){return t},set:function(n){t=n,e.name||e.displayName||(e.displayName=n)}}),n},t.isValidElement=ec,t.lazy=function(e){var t,n,r={$$typeof:T,_payload:{// We use these fields to store the result.
_status:-1,_result:e},_init:eg};return Object.defineProperties(r,{defaultProps:{configurable:!0,get:function(){return t},set:function(e){F("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),t=e,// $FlowFixMe
Object.defineProperty(r,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return n},set:function(e){F("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),n=e,// $FlowFixMe
Object.defineProperty(r,"propTypes",{enumerable:!0})}}}),r},t.memo=function(e,t){ev(e)||F("memo: The first argument must be a component. Instead received: %s",null===e?"null":typeof e);var n,r={$$typeof:C,type:e,compare:void 0===t?null:t};return Object.defineProperty(r,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(t){n=t,e.name||e.displayName||(e.displayName=t)}}),r},t.startTransition=function(e,t){var n=D.transition;D.transition={};var r=D.transition;D.transition._updatedFibers=new Set;try{e()}finally{D.transition=n,null===n&&r._updatedFibers&&(r._updatedFibers.size>10&&j("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),r._updatedFibers.clear())}},t.unstable_act=function(e){// `act` calls can be nested, so we track the depth. This represents the
// number of `act` scopes on the stack.
var t,n=eF;eF++,null===M.current&&// will detect the queue and use it instead of Scheduler.
(M.current=[]);var r=M.isBatchingLegacy;try{// which flushed updates immediately after the scope function exits, even
// if it's an async function.
if(// Used to reproduce behavior of `batchedUpdates` in legacy mode. Only
// set to `true` while the given callback is executed, not for updates
// triggered during an async event, because this is how the legacy
// implementation of `act` behaved.
M.isBatchingLegacy=!0,t=e(),!r&&M.didScheduleLegacyUpdate){var o=M.current;null!==o&&(M.didScheduleLegacyUpdate=!1,e$(o))}}catch(e){throw eq(n),e}finally{M.isBatchingLegacy=r}if(null!==t&&"object"==typeof t&&"function"==typeof t.then){var i=t,a=!1;// The callback is an async function (i.e. returned a promise). Wait
return ez||"undefined"==typeof Promise||Promise.resolve().then(function(){}).then(function(){a||(ez=!0,F("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(e,t){a=!0,i.then(function(r){eq(n),0===eF?// queue until there's no remaining work.
eB(r,e,t):e(r)},function(e){// The callback threw an error.
eq(n),t(e)})}}}var s=t;// The callback is not an async function. Exit the current scope
if(// immediately, without awaiting.
eq(n),0!==eF)return{then:function(e,t){e(s)}};// Exiting the outermost act scope. Flush the queue.
var u=M.current;return null!==u&&(e$(u),M.current=null),{then:function(e,t){// Confirm we haven't re-entered another `act` scope, in case
// the user does something weird like await the thenable
// multiple times.
null===M.current?(// Recursively flush the queue until there's no remaining work.
M.current=[],eB(s,e,t)):e(s)}}},t.useCallback=function(e,t){return ey().useCallback(e,t)},t.useContext=function(e){var t=ey();// TODO: add a more generic warning for invalid values.
if(void 0!==e._context){var n=e._context;// Don't deduplicate because this legitimately causes bugs
// and nobody should be using this in existing code.
n.Consumer===e?F("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):n.Provider===e&&F("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return t.useContext(e)},t.useDebugValue=function(e,t){return ey().useDebugValue(e,t)},t.useDeferredValue=function(e){return ey().useDeferredValue(e)},t.useEffect=function(e,t){return ey().useEffect(e,t)},t.useId=function(){return ey().useId()},t.useImperativeHandle=function(e,t,n){return ey().useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return ey().useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return ey().useLayoutEffect(e,t)},t.useMemo=function(e,t){return ey().useMemo(e,t)},t.useReducer=function(e,t,n){return ey().useReducer(e,t,n)},t.useRef=function(e){return ey().useRef(e)},t.useState=function(e){return ey().useState(e)},t.useSyncExternalStore=function(e,t,n){return ey().useSyncExternalStore(e,t,n)},t.useTransition=function(){return ey().useTransition()},t.version="18.2.0","undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}),I.register("crBKy",function(e,t){var r,o,i,a,s,u,l,c,d,f,p,h;n(e.exports,"__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",function(){return r},function(e){return r=e}),n(e.exports,"createPortal",function(){return o},function(e){return o=e}),n(e.exports,"createRoot",function(){return i},function(e){return i=e}),n(e.exports,"findDOMNode",function(){return a},function(e){return a=e}),n(e.exports,"flushSync",function(){return s},function(e){return s=e}),n(e.exports,"hydrate",function(){return u},function(e){return u=e}),n(e.exports,"hydrateRoot",function(){return l},function(e){return l=e}),n(e.exports,"render",function(){return c},function(e){return c=e}),n(e.exports,"unmountComponentAtNode",function(){return d},function(e){return d=e}),n(e.exports,"unstable_batchedUpdates",function(){return f},function(e){return f=e}),n(e.exports,"unstable_renderSubtreeIntoContainer",function(){return p},function(e){return p=e}),n(e.exports,"version",function(){return h},function(e){return h=e}),function(){"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var e,t,n,m,g,v,y,b,w,_,k,S,x,E,C,T,O,R,P,D,M,N,L,A,U,j,F,z,q,B,V,$,W,H,Y,Q,K,G,X,J,Z,ee,et,en,er,eo,ei,ea,es,eu,el,ec,ed,ef,ep,eh,em,eg,ev,ey,eb,ew,e_,ek,eS,ex,eE,eC,eT,eO,eR=I("exYeM"),eP=I("ibqfJ"),eI=eR.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,eD=!1;// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.
function eM(e){if(!eD){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];eL("warn",e,n)}}function eN(e){if(!eD){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];eL("error",e,n)}}function eL(e,t,n){var r=eI.ReactDebugCurrentFrame.getStackAddendum();""!==r&&(t+="%s",n=n.concat([r]));var o=n.map(function(e){return String(e)});// Careful: RN currently depends on this prefix
o.unshift("Warning: "+t),// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console[e],console,o)}var eA=new Set,eU={},ej={};function eF(e,t){ez(e,t),ez(e+"Capture",t)}function ez(e,t){eU[e]&&eN("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",e),eU[e]=t,ej[e.toLowerCase()]=e,"onDoubleClick"===e&&(ej.ondblclick=e);for(var n=0;n<t.length;n++)eA.add(t[n])}var eq=!!("undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement),eB=Object.prototype.hasOwnProperty;/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */// $FlowFixMe only called in DEV, so void return is not possible.
function eV(e){return"function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"}// $FlowFixMe only called in DEV, so void return is not possible.
function e$(e){try{return!1}catch(e){return!0}}function eW(e,t){if(e$(e))return eN("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.",t,eV(e)),""+e;// throw (to help callers find troubleshooting comments)
}function eH(e){if(e$(e))return eN("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.",eV(e)),""+e;// throw (to help callers find troubleshooting comments)
}/* eslint-disable max-len */var eY=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-퟿\\uF900-\\uFDCF\\uFDF0-\\uFFFD",eQ=eY+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",eK=RegExp("^["+eY+"]["+eQ+"]*$"),eG={},eX={};function eJ(e){return!!eB.call(eX,e)||!eB.call(eG,e)&&(eK.test(e)?(eX[e]=!0,!0):(eG[e]=!0,eN("Invalid attribute name: `%s`",e),!1))}function eZ(e,t,n){return null!==t?0===t.type:!n&&e.length>2&&("o"===e[0]||"O"===e[0])&&("n"===e[1]||"N"===e[1])}function e0(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":// eslint-disable-line
return!0;case"boolean":if(r)return!1;if(null!==n)return!n.acceptsBooleans;var o=e.toLowerCase().slice(0,5);return"data-"!==o&&"aria-"!==o;default:return!1}}function e1(e,t,n,r){if(null==t||e0(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||t<1}return!1}function e2(e){return e4.hasOwnProperty(e)?e4[e]:null}function e3(e,t,n,r,o,i,a){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=o,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=a}// When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.
var e4={};// These props are reserved by React. They shouldn't be written to the DOM.
["children","dangerouslySetInnerHTML",// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
"defaultValue","defaultChecked","innerHTML","suppressContentEditableWarning","suppressHydrationWarning","style"].forEach(function(e){e4[e]=new e3(e,0,!1,e,null,!1,!1)}),// This is a mapping from React prop names to the attribute names.
[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0],n=e[1];e4[t]=new e3(t,1,!1,n,null,!1,!1)}),// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
["contentEditable","draggable","spellCheck","value"].forEach(function(e){e4[e]=new e3(e,2,!1,e.toLowerCase(),null,!1,!1)}),// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){e4[e]=new e3(e,2,!1,e,null,!1,!1)}),["allowFullScreen","async",// on the client side because the browsers are inconsistent. Instead we call focus().
"autoFocus","autoPlay","controls","default","defer","disabled","disablePictureInPicture","disableRemotePlayback","formNoValidate","hidden","loop","noModule","noValidate","open","playsInline","readOnly","required","reversed","scoped","seamless","itemScope"].forEach(function(e){e4[e]=new e3(e,3,!1,e.toLowerCase(),null,!1,!1)}),// rather than attributes. These are all booleans.
["checked",// disabled with `removeAttribute`. We have special logic for handling this.
"multiple","muted","selected"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){e4[e]=new e3(e,3,!0,e,null,!1,!1)}),// booleans, but can also accept a string value.
["capture","download"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){e4[e]=new e3(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){e4[e]=new e3(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){e4[e]=new e3(e,5,!1,e.toLowerCase(),null,!1,!1)});var e6=/[\-\:]([a-z])/g,e5=function(e){return e[1].toUpperCase()};// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML attribute filter.
// Some of these attributes can be hard to find. This list was created by
// scraping the MDN documentation.
["accent-height","alignment-baseline","arabic-form","baseline-shift","cap-height","clip-path","clip-rule","color-interpolation","color-interpolation-filters","color-profile","color-rendering","dominant-baseline","enable-background","fill-opacity","fill-rule","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-name","glyph-orientation-horizontal","glyph-orientation-vertical","horiz-adv-x","horiz-origin-x","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","overline-position","overline-thickness","paint-order","panose-1","pointer-events","rendering-intent","shape-rendering","stop-color","stop-opacity","strikethrough-position","strikethrough-thickness","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","underline-position","underline-thickness","unicode-bidi","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","vector-effect","vert-adv-y","vert-origin-x","vert-origin-y","word-spacing","writing-mode","xmlns:xlink","x-height"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){var t=e.replace(e6,e5);e4[t]=new e3(t,1,!1,e,null,!1,!1)}),["xlink:actuate","xlink:arcrole","xlink:role","xlink:show","xlink:title","xlink:type"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){var t=e.replace(e6,e5);e4[t]=new e3(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){var t=e.replace(e6,e5);e4[t]=new e3(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),// The attribute name is case-sensitive in SVG so we can't just use
// the React name like we do for attributes that exist only in HTML.
["tabIndex","crossOrigin"].forEach(function(e){e4[e]=new e3(e,1,!1,e.toLowerCase(),null,!1,!1)}),e4.xlinkHref=new e3("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){e4[e]=new e3(e,1,!1,e.toLowerCase(),null,!0,!0)});// and any newline or tab are filtered out as if they're not part of the URL.
// https://url.spec.whatwg.org/#url-parsing
// Tab or newline are defined as \r\n\t:
// https://infra.spec.whatwg.org/#ascii-tab-or-newline
// A C0 control is a code point in the range \u0000 NULL to \u001F
// INFORMATION SEPARATOR ONE, inclusive:
// https://infra.spec.whatwg.org/#c0-control-or-space
/* eslint-disable max-len */var e8=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i,e7=!1;function e9(e){!e7&&e8.test(e)&&(e7=!0,eN("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.",JSON.stringify(e)))}/**
 * Get the value for a attribute on a node. Only used in DEV for SSR validation.
 * The third argument is used as a hint of what the expected value is. Some
 * attributes have multiple equivalent values.
 */function te(e,t,n,r){if(eJ(t)){if(!e.hasAttribute(t))return void 0===n?void 0:null;var o=e.getAttribute(t);return(eW(n,t),o===""+n)?n:o}}/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */function tt(e,t,n,r){var o=e2(t);if(!eZ(t,o,r)){if(e1(t,n,o,r)&&(n=null),r||null===o){eJ(t)&&(null===n?e.removeAttribute(t):(eW(n,t),e.setAttribute(t,""+n)));return}if(o.mustUseProperty){var i=o.propertyName;if(null===n){var a=o.type;e[i]=3!==a&&""}else // `toString`ed by IE8/9.
e[i]=n;return}// The rest are treated as attributes with special cases.
var s=o.attributeName,u=o.attributeNamespace;if(null===n)e.removeAttribute(s);else{var l,c=o.type;3===c||4===c&&!0===n?// and we won't require Trusted Type here.
l="":(eW(n,s),l=""+n,o.sanitizeURL&&e9(l.toString())),u?e.setAttributeNS(u,s,l):e.setAttribute(s,l)}}}// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var tn=Symbol.for("react.element"),tr=Symbol.for("react.portal"),to=Symbol.for("react.fragment"),ti=Symbol.for("react.strict_mode"),ta=Symbol.for("react.profiler"),ts=Symbol.for("react.provider"),tu=Symbol.for("react.context"),tl=Symbol.for("react.forward_ref"),tc=Symbol.for("react.suspense"),td=Symbol.for("react.suspense_list"),tf=Symbol.for("react.memo"),tp=Symbol.for("react.lazy"),th=(Symbol.for("react.scope"),Symbol.for("react.debug_trace_mode"),Symbol.for("react.offscreen")),tm=(Symbol.for("react.legacy_hidden"),Symbol.for("react.cache"),Symbol.for("react.tracing_marker"),Symbol.iterator);function tg(e){if(null===e||"object"!=typeof e)return null;var t=tm&&e[tm]||e["@@iterator"];return"function"==typeof t?t:null}var tv=Object.assign,ty=0;function tb(){}tb.__reactDisabledLog=!0;var tw=eI.ReactCurrentDispatcher;function t_(e,t,n){if(void 0===S)try{throw Error()}catch(e){var r=e.stack.trim().match(/\n( *(at )?)/);S=r&&r[1]||""}// We use the prefix to ensure our stacks line up with native stack frames.
return"\n"+S+e}var tk=!1;function tS(e,t){// If something asked for a stack inside a fake render, it should get ignored.
if(!e||tk)return"";var n,r,o=x.get(e);if(void 0!==o)return o;tk=!0;var i=Error.prepareStackTrace;// $FlowFixMe It does accept undefined.
Error.prepareStackTrace=void 0,r=tw.current,// for warnings.
tw.current=null,function(){if(0===ty){/* eslint-disable react-internal/no-production-logging */g=console.log,v=console.info,y=console.warn,b=console.error,w=console.group,_=console.groupCollapsed,k=console.groupEnd;var e={configurable:!0,enumerable:!0,value:tb,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e});/* eslint-enable react-internal/no-production-logging */}ty++}();try{// This should throw.
if(t){// Something should be setting the props in the constructor.
var a=function(){throw Error()};// $FlowFixMe
if(Object.defineProperty(a.prototype,"props",{set:function(){// We use a throwing setter instead of frozen or non-writable props
// because that won't throw in a non-strict mode function.
throw Error()}}),"object"==typeof Reflect&&Reflect.construct){// We construct a different control for this case to include any extra
// frames added by the construct call.
try{Reflect.construct(a,[])}catch(e){n=e}Reflect.construct(e,[],a)}else{try{a.call()}catch(e){n=e}e.call(a.prototype)}}else{try{throw Error()}catch(e){n=e}e()}}catch(t){// This is inlined manually because closure doesn't do it for us.
if(t&&n&&"string"==typeof t.stack){for(// This extracts the first frame from the sample that isn't also in the control.
// Skipping one frame that we assume is the frame that calls the two.
var s=t.stack.split("\n"),u=n.stack.split("\n"),l=s.length-1,c=u.length-1;l>=1&&c>=0&&s[l]!==u[c];)// Typically this will be the root most one. However, stack frames may be
// cut off due to maximum stack limits. In this case, one maybe cut off
// earlier than the other. We assume that the sample is longer or the same
// and there for cut off earlier. So we should find the root most frame in
// the sample somewhere in the control.
c--;for(;l>=1&&c>=0;l--,c--)// frame that called our sample function and the control.
if(s[l]!==u[c]){// In V8, the first line is describing the message but other VMs don't.
// If we're about to return the first line, and the control is also on the same
// line, that's a pretty good indicator that our sample threw at same line as
// the control. I.e. before we entered the sample frame. So we ignore this result.
// This can happen if you passed a class to function component, or non-function.
if(1!==l||1!==c)do // The next one that isn't the same should be our match though.
if(l--,--c<0||s[l]!==u[c]){// V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
var d="\n"+s[l].replace(" at new "," at ");// If our component frame is labeled "<anonymous>"
return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),"function"==typeof e&&x.set(e,d),d}while(l>=1&&c>=0)break}}}finally{tk=!1,tw.current=r,function(){if(0==--ty){/* eslint-disable react-internal/no-production-logging */var e={configurable:!0,enumerable:!0,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{log:tv({},e,{value:g}),info:tv({},e,{value:v}),warn:tv({},e,{value:y}),error:tv({},e,{value:b}),group:tv({},e,{value:w}),groupCollapsed:tv({},e,{value:_}),groupEnd:tv({},e,{value:k})});/* eslint-enable react-internal/no-production-logging */}ty<0&&eN("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=i}// Fallback to just using the name if we couldn't make it throw.
var f=e?e.displayName||e.name:"",p=f?t_(f):"";return"function"==typeof e&&x.set(e,p),p}function tx(e){try{var t="",n=e;do t+=function(e){switch(e._debugOwner&&e._debugOwner.type,e._debugSource,e.tag){case 5:return t_(e.type);case 16:return t_("Lazy");case 13:return t_("Suspense");case 19:return t_("SuspenseList");case 0:case 2:case 15:return tS(e.type,!1);case 11:return tS(e.type.render,!1);case 1:return tS(e.type,!0);default:return""}}(n),n=n.return;while(n)return t}catch(e){return"\nError generating stack: "+e.message+"\n"+e.stack}}function tE(e){return e.displayName||"Context"}// Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
function tC(e){if(null==e)return null;if("number"==typeof e.tag&&eN("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),"function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case to:return"Fragment";case tr:return"Portal";case ta:return"Profiler";case ti:return"StrictMode";case tc:return"Suspense";case td:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case tu:return tE(e)+".Consumer";case ts:return tE(e._context)+".Provider";case tl:return function(e,t,n){var r=e.displayName;if(r)return r;var o=t.displayName||t.name||"";return""!==o?n+"("+o+")":n}// Keep in sync with react-reconciler/getComponentNameFromFiber
(e,e.render,"ForwardRef");case tf:var t=e.displayName||null;if(null!==t)return t;return tC(e.type)||"Memo";case tp:var n=e._payload,r=e._init;try{return tC(r(n))}catch(e){}}return null}function tT(e){return e.displayName||"Context"}function tO(e){var t,n,r,o=e.tag,i=e.type;switch(o){case 24:return"Cache";case 9:return tT(i)+".Consumer";case 10:return tT(i._context)+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,n="ForwardRef",r=t.displayName||t.name||"",i.displayName||(""!==r?n+"("+r+")":n);case 7:return"Fragment";case 5:// Host component type is the display name (e.g. "div", "View")
return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:// Name comes from the type in this case; we don't have a tag.
return tC(i);case 8:if(i===ti)return"StrictMode";return"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";// The display name for this tags come from the user-provided type:
case 1:case 0:case 17:case 2:case 14:case 15:if("function"==typeof i)return i.displayName||i.name||null;if("string"==typeof i)return i}return null}x=new("function"==typeof WeakMap?WeakMap:Map);var tR=eI.ReactDebugCurrentFrame,tP=null,tI=!1;function tD(){if(null===tP)return null;var e=tP._debugOwner;return null!=e?tO(e):null}function tM(){return null===tP?"":tx(tP)}function tN(){tR.getCurrentStack=null,tP=null,tI=!1}function tL(e){tR.getCurrentStack=null===e?null:tM,tP=e,tI=!1}function tA(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return eH(e),e;default:// function, symbol are assigned as empty strings
return""}}var tU={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0};function tj(e,t){tU[t.type]||t.onChange||t.onInput||t.readOnly||t.disabled||null==t.value||eN("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."),t.onChange||t.readOnly||t.disabled||null==t.checked||eN("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")}function tF(e){var t=e.type,n=e.nodeName;return n&&"input"===n.toLowerCase()&&("checkbox"===t||"radio"===t)}function tz(e){return e._valueTracker}function tq(e){tz(e)||// TODO: Once it's just Fiber we can move this to node._wrapperState
(e._valueTracker=function(e){var t=tF(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);eH(e[t]);var r=""+e[t];// if someone has already defined a value or Safari, then bail
// and don't track value will cause over reporting of changes,
// but it's better then a hard failure
// (needed for certain tests that spyOn input values and Safari)
if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var o=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return o.call(this)},set:function(e){eH(e),r=""+e,i.call(this,e)}}),// but it triggers a bug in IE11 and Edge 14/15.
// Calling defineProperty() again should be equivalent.
// https://github.com/facebook/react/issues/11768
Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){eH(e),r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function tB(e){if(!e)return!1;var t,n=tz(e);// if there is no tracker at this point it's unlikely
// that trying again will succeed
if(!n)return!0;var r=n.getValue(),o=(t="",e?t=tF(e)?e.checked?"true":"false":e.value:t);return o!==r&&(n.setValue(o),!0)}function tV(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var t$=!1,tW=!1,tH=!1,tY=!1;function tQ(e){return"checkbox"===e.type||"radio"===e.type?null!=e.checked:null!=e.value}/**
 * Implements an <input> host component that allows setting these optional
 * props: `checked`, `value`, `defaultChecked`, and `defaultValue`.
 *
 * If `checked` or `value` are not supplied (or null/undefined), user actions
 * that affect the checked state or value will trigger updates to the element.
 *
 * If they are supplied (and not null/undefined), the rendered element will not
 * trigger updates to the element. Instead, the props must change in order for
 * the rendered element to be updated.
 *
 * The rendered element will be initialized as unchecked (or `defaultChecked`)
 * with an empty value (or `defaultValue`).
 *
 * See http://www.w3.org/TR/2012/WD-html5-20121025/the-input-element.html
 */function tK(e,t){var n=t.checked;return tv({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function tG(e,t){tj("input",t),void 0===t.checked||void 0===t.defaultChecked||tW||(eN("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",tD()||"A component",t.type),tW=!0),void 0===t.value||void 0===t.defaultValue||t$||(eN("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",tD()||"A component",t.type),t$=!0);var n=null==t.defaultValue?"":t.defaultValue;e._wrapperState={initialChecked:null!=t.checked?t.checked:t.defaultChecked,initialValue:tA(null!=t.value?t.value:n),controlled:tQ(t)}}function tX(e,t){var n=t.checked;null!=n&&tt(e,"checked",n,!1)}function tJ(e,t){var n=tQ(t);e._wrapperState.controlled||!n||tY||(eN("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),tY=!0),!e._wrapperState.controlled||n||tH||(eN("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),tH=!0),tX(e,t);var r=tA(t.value),o=t.type;if(null!=r)"number"===o?(0===r&&""===e.value||// We explicitly want to coerce to number here if possible.
// eslint-disable-next-line
e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if("submit"===o||"reset"===o){// Submit/reset inputs need the attribute removed completely to avoid
// blank-text buttons.
e.removeAttribute("value");return}t.hasOwnProperty("value")?t0(e,t.type,r):t.hasOwnProperty("defaultValue")&&t0(e,t.type,tA(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function tZ(e,t,n){// from being lost during SSR hydration.
if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;// default value provided by the browser. See: #12872
if(("submit"===r||"reset"===r)&&(void 0===t.value||null===t.value))return;var o=""+e._wrapperState.initialValue;// Do not assign value if it is already set. This prevents user text input
n||o===e.value||(e.value=o),// Otherwise, the value attribute is synchronized to the property,
// so we assign defaultValue to the same thing as the value property
// assignment step above.
e.defaultValue=o}// Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
// this is needed to work around a chrome bug where setting defaultChecked
// will sometimes influence the value of checked (even after detachment).
// Reference: https://bugs.chromium.org/p/chromium/issues/detail?id=608416
// We need to temporarily unset name to avoid disrupting radio button groups.
var i=e.name;""!==i&&(e.name=""),// When syncing the checked attribute, both the checked property and
// attribute are assigned at the same time using defaultChecked. This uses:
//
//   1. The checked React property when present
//   2. The defaultChecked React property when present
//   3. Otherwise, false
e.defaultChecked=!e.defaultChecked,e.defaultChecked=!!e._wrapperState.initialChecked,""!==i&&(e.name=i)}// For number inputs, the display value loses trailing decimal points. For email inputs,
// Chrome raises "The specified value <x> is not a valid email address".
//
// Here we check to see if the defaultValue has actually changed, avoiding these problems
// when the user is inputting text
//
// https://github.com/facebook/react/issues/7253
function t0(e,t,n){("number"!==t||tV(e.ownerDocument)!==e)&&(null==n?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var t1=!1,t2=!1,t3=!1;/**
 * Implements an <option> host component that warns when `selected` is set.
 */function t4(e,t){null!=t.value||("object"==typeof t.children&&null!==t.children?eR.Children.forEach(t.children,function(e){null!=e&&("string"==typeof e||"number"==typeof e||t2||(t2=!0,eN("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")))}):null==t.dangerouslySetInnerHTML||t3||(t3=!0,eN("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))),null==t.selected||t1||(eN("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."),t1=!0)}var t6=Array.isArray;// eslint-disable-next-line no-redeclare
function t5(){var e=tD();return e?"\n\nCheck the render method of `"+e+"`.":""}E=!1;var t8=["value","defaultValue"];function t7(e,t,n,r){var o=e.options;if(t){for(var i={},a=0;a<n.length;a++)i["$"+n[a]]=!0;for(var s=0;s<o.length;s++){var u=i.hasOwnProperty("$"+o[s].value);o[s].selected!==u&&(o[s].selected=u),u&&r&&(o[s].defaultSelected=!0)}}else{for(var l=""+tA(n),c=null,d=0;d<o.length;d++){if(o[d].value===l){o[d].selected=!0,r&&(o[d].defaultSelected=!0);return}null!==c||o[d].disabled||(c=o[d])}null!==c&&(c.selected=!0)}}/**
 * Implements a <select> host component that allows optionally setting the
 * props `value` and `defaultValue`. If `multiple` is false, the prop must be a
 * stringable. If `multiple` is true, the prop must be an array of stringables.
 *
 * If `value` is not supplied (or null/undefined), user actions that change the
 * selected option will trigger updates to the rendered options.
 *
 * If it is supplied (and not null/undefined), the rendered options will not
 * update in response to user actions. Instead, the `value` prop must change in
 * order for the rendered options to update.
 *
 * If `defaultValue` is provided, any options with the supplied values will be
 * selected.
 */function t9(e,t){return tv({},t,{value:void 0})}function ne(e,t){/**
 * Validation function for `value` and `defaultValue`.
 */(function(e){tj("select",e);for(var t=0;t<t8.length;t++){var n=t8[t];if(null!=e[n]){var r=t6(e[n]);e.multiple&&!r?eN("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",n,t5()):!e.multiple&&r&&eN("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",n,t5())}}})(t),e._wrapperState={wasMultiple:!!t.multiple},void 0===t.value||void 0===t.defaultValue||E||(eN("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"),E=!0)}var nt=!1;/**
 * Implements a <textarea> host component that allows setting `value`, and
 * `defaultValue`. This differs from the traditional DOM API because value is
 * usually set as PCDATA children.
 *
 * If `value` is not supplied (or null/undefined), user actions that affect the
 * value will trigger updates to the element.
 *
 * If `value` is supplied (and not null/undefined), the rendered element will
 * not trigger updates to the element. Instead, the `value` prop must change in
 * order for the rendered element to be updated.
 *
 * The rendered element will be initialized with an empty value, the prop
 * `defaultValue` if specified, or the children content (deprecated).
 */function nn(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");return tv({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function nr(e,t){tj("textarea",t),void 0===t.value||void 0===t.defaultValue||nt||(eN("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components",tD()||"A component"),nt=!0);var n=t.value;// Only bother fetching default value if we're going to use it
if(null==n){var r=t.children,o=t.defaultValue;if(null!=r){if(eN("Use the `defaultValue` or `value` props instead of setting children on <textarea>."),null!=o)throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");if(t6(r)){if(r.length>1)throw Error("<textarea> can only have at most one child.");r=r[0]}o=r}null==o&&(o=""),n=o}e._wrapperState={initialValue:tA(n)}}function no(e,t){var n=tA(t.value),r=tA(t.defaultValue);if(null!=n){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
var o=""+n;// To avoid side effects (such as losing text selection), only set value if changed
o!==e.value&&(e.value=o),null==t.defaultValue&&e.defaultValue!==o&&(e.defaultValue=o)}null!=r&&(e.defaultValue=""+r)}function ni(e,t){// available until after the component has mounted.
var n=e.textContent;// Only set node.value if textContent is equal to the expected
// initial value. In IE10/IE11 there is a bug where the placeholder attribute
// will populate textContent as well.
// https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
n===e._wrapperState.initialValue&&""!==n&&null!==n&&(e.value=n)}var na="http://www.w3.org/1999/xhtml",ns="http://www.w3.org/2000/svg";function nu(e){switch(e){case"svg":return ns;case"math":return"http://www.w3.org/1998/Math/MathML";default:return na}}function nl(e,t){return null==e||e===na?nu(t):e===ns&&"foreignObject"===t?na:e}/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */var nc=(e=function(e,t){if(e.namespaceURI===ns&&!("innerHTML"in e)){// IE does not have innerHTML for SVG nodes, so instead we inject the
// new markup in a temp node and then move the child nodes across into
// the target node
(C=C||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>";for(var n=C.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild);return}e.innerHTML=t},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,r,o){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,o)})}:e),nd=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType){n.nodeValue=t;return}}e.textContent=t},nf={animation:["animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationTimingFunction"],background:["backgroundAttachment","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundSize"],backgroundPosition:["backgroundPositionX","backgroundPositionY"],border:["borderBottomColor","borderBottomStyle","borderBottomWidth","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRightColor","borderRightStyle","borderRightWidth","borderTopColor","borderTopStyle","borderTopWidth"],borderBlockEnd:["borderBlockEndColor","borderBlockEndStyle","borderBlockEndWidth"],borderBlockStart:["borderBlockStartColor","borderBlockStartStyle","borderBlockStartWidth"],borderBottom:["borderBottomColor","borderBottomStyle","borderBottomWidth"],borderColor:["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"],borderImage:["borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth"],borderInlineEnd:["borderInlineEndColor","borderInlineEndStyle","borderInlineEndWidth"],borderInlineStart:["borderInlineStartColor","borderInlineStartStyle","borderInlineStartWidth"],borderLeft:["borderLeftColor","borderLeftStyle","borderLeftWidth"],borderRadius:["borderBottomLeftRadius","borderBottomRightRadius","borderTopLeftRadius","borderTopRightRadius"],borderRight:["borderRightColor","borderRightStyle","borderRightWidth"],borderStyle:["borderBottomStyle","borderLeftStyle","borderRightStyle","borderTopStyle"],borderTop:["borderTopColor","borderTopStyle","borderTopWidth"],borderWidth:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],columnRule:["columnRuleColor","columnRuleStyle","columnRuleWidth"],columns:["columnCount","columnWidth"],flex:["flexBasis","flexGrow","flexShrink"],flexFlow:["flexDirection","flexWrap"],font:["fontFamily","fontFeatureSettings","fontKerning","fontLanguageOverride","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition","fontWeight","lineHeight"],fontVariant:["fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition"],gap:["columnGap","rowGap"],grid:["gridAutoColumns","gridAutoFlow","gridAutoRows","gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],gridArea:["gridColumnEnd","gridColumnStart","gridRowEnd","gridRowStart"],gridColumn:["gridColumnEnd","gridColumnStart"],gridColumnGap:["columnGap"],gridGap:["columnGap","rowGap"],gridRow:["gridRowEnd","gridRowStart"],gridRowGap:["rowGap"],gridTemplate:["gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],listStyle:["listStyleImage","listStylePosition","listStyleType"],margin:["marginBottom","marginLeft","marginRight","marginTop"],marker:["markerEnd","markerMid","markerStart"],mask:["maskClip","maskComposite","maskImage","maskMode","maskOrigin","maskPositionX","maskPositionY","maskRepeat","maskSize"],maskPosition:["maskPositionX","maskPositionY"],outline:["outlineColor","outlineStyle","outlineWidth"],overflow:["overflowX","overflowY"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"],placeContent:["alignContent","justifyContent"],placeItems:["alignItems","justifyItems"],placeSelf:["alignSelf","justifySelf"],textDecoration:["textDecorationColor","textDecorationLine","textDecorationStyle"],textEmphasis:["textEmphasisColor","textEmphasisStyle"],transition:["transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction"],wordWrap:["overflowWrap"]},np={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,// SVG-related properties
fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},nh=["Webkit","ms","Moz","O"];/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */function nm(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||np.hasOwnProperty(e)&&np[e]?(e$(t)&&eN("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.",e,eV(t)),(""+t).trim()):t+"px"}// infinite loop, because it iterates over the newly added props too.
Object.keys(np).forEach(function(e){nh.forEach(function(t){np[t+e.charAt(0).toUpperCase()+e.substring(1)]=np[e]})});var ng=/([A-Z])/g,nv=/^ms-/,ny=/^(?:webkit|moz|o)[A-Z]/,nb=/^-ms-/,nw=/-(.)/g,n_=/;\s*$/,nk={},nS={},nx=!1,nE=!1,nC=function(e){nk.hasOwnProperty(e)&&nk[e]||(nk[e]=!0,eN("Unsupported style property %s. Did you mean %s?",e,e.replace(nb,"ms-").replace(nw,function(e,t){return t.toUpperCase()})))},nT=function(e){nk.hasOwnProperty(e)&&nk[e]||(nk[e]=!0,eN("Unsupported vendor-prefixed style property %s. Did you mean %s?",e,e.charAt(0).toUpperCase()+e.slice(1)))},nO=function(e,t){nS.hasOwnProperty(t)&&nS[t]||(nS[t]=!0,eN('Style property values shouldn\'t contain a semicolon. Try "%s: %s" instead.',e,t.replace(n_,"")))},nR=function(e,t){nx||(nx=!0,eN("`NaN` is an invalid value for the `%s` css style property.",e))},nP=function(e,t){nE||(nE=!0,eN("`Infinity` is an invalid value for the `%s` css style property.",e))},nI=function(e,t){e.indexOf("-")>-1?nC(e):ny.test(e)?nT(e):n_.test(t)&&nO(e,t),"number"!=typeof t||(isNaN(t)?nR(e,t):isFinite(t)||nP(e,t))};/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */function nD(e,t){var n=e.style;for(var r in t)if(t.hasOwnProperty(r)){var o=0===r.indexOf("--");o||nI(r,t[r]);var i=nm(r,t[r],o);"float"===r&&(r="cssFloat"),o?n.setProperty(r,i):n[r]=i}}/**
 * Given {color: 'red', overflow: 'hidden'} returns {
 *   color: 'color',
 *   overflowX: 'overflow',
 *   overflowY: 'overflow',
 * }. This can be read as "the overflowY property was set by the overflow
 * shorthand". That is, the values are the property that each was derived from.
 */function nM(e){var t={};for(var n in e)for(var r=nf[n]||[n],o=0;o<r.length;o++)t[r[o]]=n;return t}// `omittedCloseTags` except that `menuitem` should still have its closing tag.
var nN=tv({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0// NOTE: menuitem's close tag should be omitted, but that causes problems.
});function nL(e,t){if(t){// Note the use of `==` which checks for null or undefined.
if(nN[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(e+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");if("object"!=typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.")}if(!t.suppressContentEditableWarning&&t.contentEditable&&null!=t.children&&eN("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."),null!=t.style&&"object"!=typeof t.style)throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.")}}function nA(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){// These are reserved SVG and MathML elements.
// We don't mind this list too much because we expect it to never grow.
// The alternative is to track the namespace in a few places which is convoluted.
// https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}// When adding attributes to the HTML or SVG allowed attribute list, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var nU={// HTML
accept:"accept",acceptcharset:"acceptCharset","accept-charset":"acceptCharset",accesskey:"accessKey",action:"action",allowfullscreen:"allowFullScreen",alt:"alt",as:"as",async:"async",autocapitalize:"autoCapitalize",autocomplete:"autoComplete",autocorrect:"autoCorrect",autofocus:"autoFocus",autoplay:"autoPlay",autosave:"autoSave",capture:"capture",cellpadding:"cellPadding",cellspacing:"cellSpacing",challenge:"challenge",charset:"charSet",checked:"checked",children:"children",cite:"cite",class:"className",classid:"classID",classname:"className",cols:"cols",colspan:"colSpan",content:"content",contenteditable:"contentEditable",contextmenu:"contextMenu",controls:"controls",controlslist:"controlsList",coords:"coords",crossorigin:"crossOrigin",dangerouslysetinnerhtml:"dangerouslySetInnerHTML",data:"data",datetime:"dateTime",default:"default",defaultchecked:"defaultChecked",defaultvalue:"defaultValue",defer:"defer",dir:"dir",disabled:"disabled",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback",download:"download",draggable:"draggable",enctype:"encType",enterkeyhint:"enterKeyHint",for:"htmlFor",form:"form",formmethod:"formMethod",formaction:"formAction",formenctype:"formEncType",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",headers:"headers",height:"height",hidden:"hidden",high:"high",href:"href",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv","http-equiv":"httpEquiv",icon:"icon",id:"id",imagesizes:"imageSizes",imagesrcset:"imageSrcSet",innerhtml:"innerHTML",inputmode:"inputMode",integrity:"integrity",is:"is",itemid:"itemID",itemprop:"itemProp",itemref:"itemRef",itemscope:"itemScope",itemtype:"itemType",keyparams:"keyParams",keytype:"keyType",kind:"kind",label:"label",lang:"lang",list:"list",loop:"loop",low:"low",manifest:"manifest",marginwidth:"marginWidth",marginheight:"marginHeight",max:"max",maxlength:"maxLength",media:"media",mediagroup:"mediaGroup",method:"method",min:"min",minlength:"minLength",multiple:"multiple",muted:"muted",name:"name",nomodule:"noModule",nonce:"nonce",novalidate:"noValidate",open:"open",optimum:"optimum",pattern:"pattern",placeholder:"placeholder",playsinline:"playsInline",poster:"poster",preload:"preload",profile:"profile",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rel:"rel",required:"required",reversed:"reversed",role:"role",rows:"rows",rowspan:"rowSpan",sandbox:"sandbox",scope:"scope",scoped:"scoped",scrolling:"scrolling",seamless:"seamless",selected:"selected",shape:"shape",size:"size",sizes:"sizes",span:"span",spellcheck:"spellCheck",src:"src",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",start:"start",step:"step",style:"style",summary:"summary",tabindex:"tabIndex",target:"target",title:"title",type:"type",usemap:"useMap",value:"value",width:"width",wmode:"wmode",wrap:"wrap",// SVG
about:"about",accentheight:"accentHeight","accent-height":"accentHeight",accumulate:"accumulate",additive:"additive",alignmentbaseline:"alignmentBaseline","alignment-baseline":"alignmentBaseline",allowreorder:"allowReorder",alphabetic:"alphabetic",amplitude:"amplitude",arabicform:"arabicForm","arabic-form":"arabicForm",ascent:"ascent",attributename:"attributeName",attributetype:"attributeType",autoreverse:"autoReverse",azimuth:"azimuth",basefrequency:"baseFrequency",baselineshift:"baselineShift","baseline-shift":"baselineShift",baseprofile:"baseProfile",bbox:"bbox",begin:"begin",bias:"bias",by:"by",calcmode:"calcMode",capheight:"capHeight","cap-height":"capHeight",clip:"clip",clippath:"clipPath","clip-path":"clipPath",clippathunits:"clipPathUnits",cliprule:"clipRule","clip-rule":"clipRule",color:"color",colorinterpolation:"colorInterpolation","color-interpolation":"colorInterpolation",colorinterpolationfilters:"colorInterpolationFilters","color-interpolation-filters":"colorInterpolationFilters",colorprofile:"colorProfile","color-profile":"colorProfile",colorrendering:"colorRendering","color-rendering":"colorRendering",contentscripttype:"contentScriptType",contentstyletype:"contentStyleType",cursor:"cursor",cx:"cx",cy:"cy",d:"d",datatype:"datatype",decelerate:"decelerate",descent:"descent",diffuseconstant:"diffuseConstant",direction:"direction",display:"display",divisor:"divisor",dominantbaseline:"dominantBaseline","dominant-baseline":"dominantBaseline",dur:"dur",dx:"dx",dy:"dy",edgemode:"edgeMode",elevation:"elevation",enablebackground:"enableBackground","enable-background":"enableBackground",end:"end",exponent:"exponent",externalresourcesrequired:"externalResourcesRequired",fill:"fill",fillopacity:"fillOpacity","fill-opacity":"fillOpacity",fillrule:"fillRule","fill-rule":"fillRule",filter:"filter",filterres:"filterRes",filterunits:"filterUnits",floodopacity:"floodOpacity","flood-opacity":"floodOpacity",floodcolor:"floodColor","flood-color":"floodColor",focusable:"focusable",fontfamily:"fontFamily","font-family":"fontFamily",fontsize:"fontSize","font-size":"fontSize",fontsizeadjust:"fontSizeAdjust","font-size-adjust":"fontSizeAdjust",fontstretch:"fontStretch","font-stretch":"fontStretch",fontstyle:"fontStyle","font-style":"fontStyle",fontvariant:"fontVariant","font-variant":"fontVariant",fontweight:"fontWeight","font-weight":"fontWeight",format:"format",from:"from",fx:"fx",fy:"fy",g1:"g1",g2:"g2",glyphname:"glyphName","glyph-name":"glyphName",glyphorientationhorizontal:"glyphOrientationHorizontal","glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphorientationvertical:"glyphOrientationVertical","glyph-orientation-vertical":"glyphOrientationVertical",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",hanging:"hanging",horizadvx:"horizAdvX","horiz-adv-x":"horizAdvX",horizoriginx:"horizOriginX","horiz-origin-x":"horizOriginX",ideographic:"ideographic",imagerendering:"imageRendering","image-rendering":"imageRendering",in2:"in2",in:"in",inlist:"inlist",intercept:"intercept",k1:"k1",k2:"k2",k3:"k3",k4:"k4",k:"k",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",kerning:"kerning",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",letterspacing:"letterSpacing","letter-spacing":"letterSpacing",lightingcolor:"lightingColor","lighting-color":"lightingColor",limitingconeangle:"limitingConeAngle",local:"local",markerend:"markerEnd","marker-end":"markerEnd",markerheight:"markerHeight",markermid:"markerMid","marker-mid":"markerMid",markerstart:"markerStart","marker-start":"markerStart",markerunits:"markerUnits",markerwidth:"markerWidth",mask:"mask",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",mathematical:"mathematical",mode:"mode",numoctaves:"numOctaves",offset:"offset",opacity:"opacity",operator:"operator",order:"order",orient:"orient",orientation:"orientation",origin:"origin",overflow:"overflow",overlineposition:"overlinePosition","overline-position":"overlinePosition",overlinethickness:"overlineThickness","overline-thickness":"overlineThickness",paintorder:"paintOrder","paint-order":"paintOrder",panose1:"panose1","panose-1":"panose1",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointerevents:"pointerEvents","pointer-events":"pointerEvents",points:"points",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",prefix:"prefix",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",property:"property",r:"r",radius:"radius",refx:"refX",refy:"refY",renderingintent:"renderingIntent","rendering-intent":"renderingIntent",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",resource:"resource",restart:"restart",result:"result",results:"results",rotate:"rotate",rx:"rx",ry:"ry",scale:"scale",security:"security",seed:"seed",shaperendering:"shapeRendering","shape-rendering":"shapeRendering",slope:"slope",spacing:"spacing",specularconstant:"specularConstant",specularexponent:"specularExponent",speed:"speed",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stemh:"stemh",stemv:"stemv",stitchtiles:"stitchTiles",stopcolor:"stopColor","stop-color":"stopColor",stopopacity:"stopOpacity","stop-opacity":"stopOpacity",strikethroughposition:"strikethroughPosition","strikethrough-position":"strikethroughPosition",strikethroughthickness:"strikethroughThickness","strikethrough-thickness":"strikethroughThickness",string:"string",stroke:"stroke",strokedasharray:"strokeDasharray","stroke-dasharray":"strokeDasharray",strokedashoffset:"strokeDashoffset","stroke-dashoffset":"strokeDashoffset",strokelinecap:"strokeLinecap","stroke-linecap":"strokeLinecap",strokelinejoin:"strokeLinejoin","stroke-linejoin":"strokeLinejoin",strokemiterlimit:"strokeMiterlimit","stroke-miterlimit":"strokeMiterlimit",strokewidth:"strokeWidth","stroke-width":"strokeWidth",strokeopacity:"strokeOpacity","stroke-opacity":"strokeOpacity",suppresscontenteditablewarning:"suppressContentEditableWarning",suppresshydrationwarning:"suppressHydrationWarning",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textanchor:"textAnchor","text-anchor":"textAnchor",textdecoration:"textDecoration","text-decoration":"textDecoration",textlength:"textLength",textrendering:"textRendering","text-rendering":"textRendering",to:"to",transform:"transform",typeof:"typeof",u1:"u1",u2:"u2",underlineposition:"underlinePosition","underline-position":"underlinePosition",underlinethickness:"underlineThickness","underline-thickness":"underlineThickness",unicode:"unicode",unicodebidi:"unicodeBidi","unicode-bidi":"unicodeBidi",unicoderange:"unicodeRange","unicode-range":"unicodeRange",unitsperem:"unitsPerEm","units-per-em":"unitsPerEm",unselectable:"unselectable",valphabetic:"vAlphabetic","v-alphabetic":"vAlphabetic",values:"values",vectoreffect:"vectorEffect","vector-effect":"vectorEffect",version:"version",vertadvy:"vertAdvY","vert-adv-y":"vertAdvY",vertoriginx:"vertOriginX","vert-origin-x":"vertOriginX",vertoriginy:"vertOriginY","vert-origin-y":"vertOriginY",vhanging:"vHanging","v-hanging":"vHanging",videographic:"vIdeographic","v-ideographic":"vIdeographic",viewbox:"viewBox",viewtarget:"viewTarget",visibility:"visibility",vmathematical:"vMathematical","v-mathematical":"vMathematical",vocab:"vocab",widths:"widths",wordspacing:"wordSpacing","word-spacing":"wordSpacing",writingmode:"writingMode","writing-mode":"writingMode",x1:"x1",x2:"x2",x:"x",xchannelselector:"xChannelSelector",xheight:"xHeight","x-height":"xHeight",xlinkactuate:"xlinkActuate","xlink:actuate":"xlinkActuate",xlinkarcrole:"xlinkArcrole","xlink:arcrole":"xlinkArcrole",xlinkhref:"xlinkHref","xlink:href":"xlinkHref",xlinkrole:"xlinkRole","xlink:role":"xlinkRole",xlinkshow:"xlinkShow","xlink:show":"xlinkShow",xlinktitle:"xlinkTitle","xlink:title":"xlinkTitle",xlinktype:"xlinkType","xlink:type":"xlinkType",xmlbase:"xmlBase","xml:base":"xmlBase",xmllang:"xmlLang","xml:lang":"xmlLang",xmlns:"xmlns","xml:space":"xmlSpace",xmlnsxlink:"xmlnsXlink","xmlns:xlink":"xmlnsXlink",xmlspace:"xmlSpace",y1:"y1",y2:"y2",y:"y",ychannelselector:"yChannelSelector",z:"z",zoomandpan:"zoomAndPan"},nj={"aria-current":0,// state
"aria-description":0,"aria-details":0,"aria-disabled":0,// state
"aria-hidden":0,// state
"aria-invalid":0,// state
"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,// Widget Attributes
"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,// Live Region Attributes
"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,// Drag-and-Drop Attributes
"aria-dropeffect":0,"aria-grabbed":0,// Relationship Attributes
"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},nF={},nz=RegExp("^(aria)-["+eQ+"]*$"),nq=RegExp("^(aria)[A-Z]["+eQ+"]*$"),nB=!1,nV=function(){},n$={},nW=/^on./,nH=/^on[^A-Z]/,nY=RegExp("^(aria)-["+eQ+"]*$"),nQ=RegExp("^(aria)[A-Z]["+eQ+"]*$");nV=function(e,t,n,r){if(eB.call(n$,t)&&n$[t])return!0;var o=t.toLowerCase();if("onfocusin"===o||"onfocusout"===o)return eN("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."),n$[t]=!0,!0;// We can't rely on the event system being injected on the server.
if(null!=r){var i=r.registrationNameDependencies,a=r.possibleRegistrationNames;if(i.hasOwnProperty(t))return!0;var s=a.hasOwnProperty(o)?a[o]:null;if(null!=s)return eN("Invalid event handler property `%s`. Did you mean `%s`?",t,s),n$[t]=!0,!0;if(nW.test(t))return eN("Unknown event handler property `%s`. It will be ignored.",t),n$[t]=!0,!0}else if(nW.test(t))return nH.test(t)&&eN("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",t),n$[t]=!0,!0;// Let the ARIA attribute hook validate ARIA attributes
if(nY.test(t)||nQ.test(t))return!0;if("innerhtml"===o)return eN("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."),n$[t]=!0,!0;if("aria"===o)return eN("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."),n$[t]=!0,!0;if("is"===o&&null!=n&&"string"!=typeof n)return eN("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",typeof n),n$[t]=!0,!0;if("number"==typeof n&&isNaN(n))return eN("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",t),n$[t]=!0,!0;var u=e2(t),l=null!==u&&0===u.type;if(nU.hasOwnProperty(o)){var c=nU[o];if(c!==t)return eN("Invalid DOM property `%s`. Did you mean `%s`?",t,c),n$[t]=!0,!0}else if(!l&&t!==o)return(// Unknown attributes should have lowercase casing since that's how they
// will be cased anyway with server rendering.
eN("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",t,o),n$[t]=!0,!0);return"boolean"==typeof n&&e0(t,n,u,!1)?(n?eN('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',n,t,t,n,t):eN('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',n,t,t,n,t,t,t),n$[t]=!0,!0):!!l||(e0(t,n,u,!1)?(n$[t]=!0,!1):(("false"===n||"true"===n)&&null!==u&&3===u.type&&(eN("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",n,t,"false"===n?"The browser will interpret it as a truthy value.":'Although this works, it will not work as expected if you pass the string "false".',t,n),n$[t]=!0),!0))// Now that we've validated casing, do not validate
};var nK=function(e,t,n){var r=[];for(var o in t)nV(e,o,t[o],n)||r.push(o);var i=r.map(function(e){return"`"+e+"`"}).join(", ");1===r.length?eN("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",i,e):r.length>1&&eN("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",i,e)},nG=null;/**
 * Gets the target node from a native browser event by accounting for
 * inconsistencies in browser DOM APIs.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {DOMEventTarget} Target node.
 */function nX(e){// Fallback to nativeEvent.srcElement for IE9
// https://github.com/facebook/react/issues/12506
var t=e.target||e.srcElement||window;// Normalize SVG <use> element events #4963
// Safari may fire events on text nodes (Node.TEXT_NODE is 3).
// @see http://www.quirksmode.org/js/events_properties.html
return t.correspondingUseElement&&(t=t.correspondingUseElement),3===t.nodeType?t.parentNode:t}var nJ=null,nZ=null,n0=null;function n1(e){// We perform this translation at the end of the event loop so that we
// always receive the correct fiber here
var t=a1(e);if(t){if("function"!=typeof nJ)throw Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");var n=t.stateNode;// Guard against Fiber being unmounted.
if(n){var r=a3(n);nJ(t.stateNode,t.type,r)}}}function n2(e){nZ?n0?n0.push(e):n0=[e]:nZ=e}function n3(){if(nZ){var e=nZ,t=n0;if(nZ=null,n0=null,n1(e),t)for(var n=0;n<t.length;n++)n1(t[n])}}// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.
// Defaults
var n4=function(e,t){return e(t)},n6=function(){},n5=!1;function n8(e,t,n){if(n5)// fully completes before restoring state.
return e(t,n);n5=!0;try{return n4(e,t,n)}finally{n5=!1,(null!==nZ||null!==n0)&&(// If a controlled event was fired, we may need to restore the state of
// the DOM node back to the controlled value. This is necessary when React
// bails out of the update without touching the DOM.
// TODO: Restore state in the microtask, after the discrete updates flush,
// instead of early flushing them here.
n6(),n3())}}// TODO: Replace with flushSync
/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */function n7(e,t){var n=e.stateNode;if(null===n)return null;var r=a3(n);if(null===r)return null;var o=r[t];if(function(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":return!!(n.disabled&&("button"===t||"input"===t||"select"===t||"textarea"===t));default:return!1}}(t,e.type,r))return null;if(o&&"function"!=typeof o)throw Error("Expected `"+t+"` listener to be a function, instead got a value of `"+typeof o+"` type.");return o}var n9=!1;// Check if browser support events with passive listeners
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
if(eq)try{var re={};// $FlowFixMe: Ignore Flow complaining about needing a value
Object.defineProperty(re,"passive",{get:function(){n9=!0}}),window.addEventListener("test",re,re),window.removeEventListener("test",re,re)}catch(e){n9=!1}function rt(e,t,n,r,o,i,a,s,u){var l=Array.prototype.slice.call(arguments,3);try{t.apply(n,l)}catch(e){this.onError(e)}}var rn=rt;// In DEV mode, we swap out invokeGuardedCallback for a special version
// that plays more nicely with the browser's DevTools. The idea is to preserve
// "Pause on exceptions" behavior. Because React wraps all user-provided
// functions in invokeGuardedCallback, and the production version of
// invokeGuardedCallback uses a try-catch, all user exceptions are treated
// like caught exceptions, and the DevTools won't pause unless the developer
// takes the extra step of enabling pause on caught exceptions. This is
// unintuitive, though, because even though React has caught the error, from
// the developer's perspective, the error is uncaught.
//
// To preserve the expected "Pause on exceptions" behavior, we don't use a
// try-catch in DEV. Instead, we synchronously dispatch a fake event to a fake
// DOM node, and call the user-provided callback from inside an event handler
// for that fake event. If the callback throws, the error is "captured" using
// a global event handler. But because the error happens in a different
// event loop context, it does not interrupt the normal program flow.
// Effectively, this gives us try-catch behavior without actually using
// try-catch. Neat!
// Check that the browser supports the APIs we need to implement our special
// DEV version of invokeGuardedCallback
if("undefined"!=typeof window&&"function"==typeof window.dispatchEvent&&"undefined"!=typeof document&&"function"==typeof document.createEvent){var rr=document.createElement("react");rn=function(e,t,n,r,o,i,a,s,u){// If document doesn't exist we know for sure we will crash in this method
// when we call document.createEvent(). However this can cause confusing
// errors: https://github.com/facebook/create-react-app/issues/3482
// So we preemptively throw with a better message instead.
if("undefined"==typeof document||null===document)throw Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");var l,c=document.createEvent("Event"),d=!1,f=!0,p=window.event,h=Object.getOwnPropertyDescriptor(window,"event");function m(){// We immediately remove the callback from event listeners so that
// nested `invokeGuardedCallback` calls do not clash. Otherwise, a
// nested call would trigger the fake event handlers of any call higher
// in the stack.
rr.removeEventListener(_,v,!1),void 0!==window.event&&window.hasOwnProperty("event")&&(window.event=p)}// Create an event handler for our fake event. We will synchronously
// dispatch our fake event using `dispatchEvent`. Inside the handler, we
// call the user-provided callback.
var g=Array.prototype.slice.call(arguments,3);function v(){d=!0,m(),t.apply(n,g),f=!1}// Create a global error event handler. We use this to capture the value
var y=!1,b=!1;function w(e){if(l=e.error,y=!0,null===l&&0===e.colno&&0===e.lineno&&(b=!0),e.defaultPrevented&&null!=l&&"object"==typeof l)try{l._suppressLogging=!0}catch(e){}}// Create a fake event type.
var _="react-"+(e||"invokeguardedcallback");// Attach our event handlers
if(window.addEventListener("error",w),rr.addEventListener(_,v,!1),// errors, it will trigger our global error handler.
c.initEvent(_,!1,!1),rr.dispatchEvent(c),h&&Object.defineProperty(window,"event",h),d&&f&&(y?b&&(l=Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")):// eslint-disable-next-line react-internal/prod-error-codes
l=Error("An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the \"Pause on exceptions\" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue."),this.onError(l)),window.removeEventListener("error",w),!d)return(// Something went really wrong, and our event was not dispatched.
// https://github.com/facebook/react/issues/16734
// https://github.com/facebook/react/issues/16585
// Fall back to the production implementation.
m(),rt.apply(this,arguments))}}var ro=rn,ri=!1,ra=null,rs=!1,ru=null,rl={onError:function(e){ri=!0,ra=e}};/**
 * Call a function while guarding against errors that happens within it.
 * Returns an error if it throws, otherwise null.
 *
 * In production, this is implemented using a try-catch. The reason we don't
 * use a try-catch directly is so that we can swap out a different
 * implementation in DEV mode.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */function rc(e,t,n,r,o,i,a,s,u){ri=!1,ra=null,ro.apply(rl,arguments)}function rd(){if(ri){var e=ra;return ri=!1,ra=null,e}throw Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.")}/**
 * `ReactInstanceMap` maintains a mapping from a public facing stateful
 * instance (key) and the internal representation (value). This allows public
 * methods to accept the user facing instance as an argument and map them back
 * to internal methods.
 *
 * Note that this module is currently shared and assumed to be stateless.
 * If this becomes an actual Map, that will break.
 */function rf(e){return e._reactInternals}var rp=eI.ReactCurrentOwner;// Union of all commit flags (flags with the lifetime of a particular commit)
function rh(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{// If there is no alternate, this might be a new tree that isn't inserted
// yet. If it is, then it will have a pending insertion effect on it.
var r=t;do(4098&(t=r).flags)!=/*                      */0&&// mounted fiber is the parent but we need to continue to figure out
// if that one is still mounted.
(n=t.return),r=t.return;while(r)}return 3===t.tag?n:null}function rm(e){if(13===e.tag){var t=e.memoizedState;if(null===t){var n=e.alternate;null!==n&&(t=n.memoizedState)}if(null!==t)return t.dehydrated}return null}function rg(e){return 3===e.tag?e.stateNode.containerInfo:null}function rv(e){if(rh(e)!==e)throw Error("Unable to find node on an unmounted component.")}function ry(e){var t=e.alternate;if(!t){// If there is no alternate, then we only need to check if it is mounted.
var n=rh(e);if(null===n)throw Error("Unable to find node on an unmounted component.");return n!==e?null:e}// If we have two possible branches, we'll walk backwards up to the root
for(// to see what path the root points to. On the way we may hit one of the
// special cases and we'll deal with them.
var r=e,o=t;;){var i=r.return;if(null===i)break;var a=i.alternate;if(null===a){// There is no alternate. This is an unusual case. Currently, it only
// happens when a Suspense component is hidden. An extra fragment fiber
// is inserted in between the Suspense fiber and its children. Skip
// over this extra fragment fiber and proceed to the next parent.
var s=i.return;if(null!==s){r=o=s;continue}// If there's no parent, we're at the root.
break}// If both copies of the parent fiber point to the same child, we can
// assume that the child is current. This happens when we bailout on low
// priority: the bailed out fiber's child reuses the current child.
if(i.child===a.child){for(var u=i.child;u;){if(u===r)return(// We've determined that A is the current branch.
rv(i),e);if(u===o)return(// We've determined that B is the current branch.
rv(i),t);u=u.sibling}// We should never have an alternate for any mounting node. So the only
// way this could possibly happen is if this was unmounted, if at all.
throw Error("Unable to find node on an unmounted component.")}if(r.return!==o.return)// The return pointer of A and the return pointer of B point to different
// fibers. We assume that return pointers never criss-cross, so A must
// belong to the child set of A.return, and B must belong to the child
// set of B.return.
r=i,o=a;else{for(// The return pointers point to the same fiber. We'll have to use the
// default, slow path: scan the child sets of each parent alternate to see
// which child belongs to which set.
//
// Search parent A's child set
var l=!1,c=i.child;c;){if(c===r){l=!0,r=i,o=a;break}if(c===o){l=!0,o=i,r=a;break}c=c.sibling}if(!l){for(// Search parent B's child set
c=a.child;c;){if(c===r){l=!0,r=a,o=i;break}if(c===o){l=!0,o=a,r=i;break}c=c.sibling}if(!l)throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(r.alternate!==o)throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}// If the root is not a host container, we're in a disconnected tree. I.e.
// unmounted.
if(3!==r.tag)throw Error("Unable to find node on an unmounted component.");return r.stateNode.current===r?e:t}function rb(e){var t=ry(e);return null!==t?function e(t){// Next we'll drill down this component to find the first HostComponent/Text.
if(5===t.tag||6===t.tag)return t;for(var n=t.child;null!==n;){var r=e(n);if(null!==r)return r;n=n.sibling}return null}(t):null}// This module only exists as an ESM wrapper around the external CommonJS
var rw=eP.unstable_scheduleCallback,r_=eP.unstable_cancelCallback,rk=eP.unstable_shouldYield,rS=eP.unstable_requestPaint,rx=eP.unstable_now,rE=eP.unstable_getCurrentPriorityLevel,rC=eP.unstable_ImmediatePriority,rT=eP.unstable_UserBlockingPriority,rO=eP.unstable_NormalPriority,rR=eP.unstable_LowPriority,rP=eP.unstable_IdlePriority,rI=eP.unstable_yieldValue,rD=eP.unstable_setDisableYieldValue,rM=null,rN=null,rL=null,rA=!1,rU="undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__;function rj(e){if("function"==typeof rI&&(// We're in a test because Scheduler.unstable_yieldValue only exists
// in SchedulerMock. To reduce the noise in strict mode tests,
// suppress warnings and disable scheduler yielding during the double render
rD(e),eD=e),rN&&"function"==typeof rN.setStrictMode)try{rN.setStrictMode(rM,e)}catch(e){rA||(rA=!0,eN("React instrumentation encountered an error: %s",e))}}// Profiler API hooks
function rF(e){rL=e}function rz(){for(var e=new Map,t=1,n=0;n<rJ;n++){var r,o=/*                        */1&(r=t)?"Sync":/*    */2&r?"InputContinuousHydration":/*             */4&r?"InputContinuous":/*            */8&r?"DefaultHydration":/*                     */16&r?"Default":/*                */32&r?"TransitionHydration":/*                       */4194240&r?"Transition":/*                            */130023424&r?"Retry":/*          */134217728&r?"SelectiveHydration":/*               */268435456&r?"IdleHydration":/*                        */536870912&r?"Idle":/*                   */1073741824&r?"Offscreen":void 0;e.set(t,o),t*=2}return e}function rq(){null!==rL&&"function"==typeof rL.markCommitStopped&&rL.markCommitStopped()}function rB(e){null!==rL&&"function"==typeof rL.markComponentRenderStarted&&rL.markComponentRenderStarted(e)}function rV(){null!==rL&&"function"==typeof rL.markComponentRenderStopped&&rL.markComponentRenderStopped()}function r$(e){null!==rL&&"function"==typeof rL.markComponentLayoutEffectUnmountStarted&&rL.markComponentLayoutEffectUnmountStarted(e)}function rW(){null!==rL&&"function"==typeof rL.markComponentLayoutEffectUnmountStopped&&rL.markComponentLayoutEffectUnmountStopped()}function rH(e){null!==rL&&"function"==typeof rL.markRenderStarted&&rL.markRenderStarted(e)}function rY(){null!==rL&&"function"==typeof rL.markRenderStopped&&rL.markRenderStopped()}function rQ(e,t){null!==rL&&"function"==typeof rL.markStateUpdateScheduled&&rL.markStateUpdateScheduled(e,t)}// TODO: This is pretty well supported by browsers. Maybe we can drop it.
var rK=Math.clz32?Math.clz32:function(e){var t=e>>>0;return 0===t?32:31-(rG(t)/rX|0)|0},rG=Math.log,rX=Math.LN2,rJ=31,rZ=/*                        */64,r0=/*                             */4194304;// Count leading zeros.
function r1(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case /*                        */128:case /*                        */256:case /*                        */512:case /*                        */1024:case /*                        */2048:case /*                        */4096:case /*                        */8192:case /*                        */16384:case /*                       */32768:case /*                       */65536:case /*                       */131072:case /*                       */262144:case /*                       */524288:case /*                       */1048576:case /*                       */2097152:return 4194240&e;case 4194304:case /*                             */8388608:case /*                             */16777216:case /*                             */33554432:case /*                             */67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return eN("Should have found matching lanes. This is a bug in React."),e}}function r2(e,t){// Early bailout if there's no pending work left.
var n=e.pendingLanes;if(/*                        */0===n)return 0;var r=0,o=e.suspendedLanes,i=e.pingedLanes,a=/*                          */268435455&n;if(0!==a){var s=a&~o;if(0!==s)r=r1(s);else{var u=a&i;0!==u&&(r=r1(u))}}else{// The only remaining work is Idle.
var l=n&~o;0!==l?r=r1(l):0!==i&&(r=r1(i))}if(0===r)// TODO: Consider warning in this path if a fallback timer is not scheduled.
return 0;// If we're already in the middle of a render, switching lanes will interrupt
// it and we'll lose our progress. We should only do this if the new lanes are
// higher priority.
if(0!==t&&t!==r&&// If we already suspended with a delay, then interrupting is fine. Don't
// bother waiting until the root is complete.
(t&o)==0){var c,d=(c=r)&-c,f=t&-t;if(d>=f||// Default priority updates should not interrupt transition updates. The
// only difference between default updates and transition updates is that
// default updates do not support refresh transitions.
16===d&&(4194240&f)!=0)return t}(4&r)!=0&&// and default updates, so they render in the same batch. The only reason
// they use separate lanes is because continuous updates should interrupt
// transitions, but default updates should not.
(r|=16&n);// Check for entangled lanes and add them to the batch.
//
// A lane is said to be entangled with another when it's not allowed to render
// in a batch that does not also include the other lane. Typically we do this
// when multiple updates have the same source, and we only want to respond to
// the most recent event from that source.
//
// Note that we apply entanglements *after* checking for partial work above.
// This means that if a lane is entangled during an interleaved event while
// it's already rendering, we won't interrupt it. This is intentional, since
// entanglement is usually "best effort": we'll try our best to render the
// lanes in the same batch, but it's not worth throwing out partially
// completed work in order to do it.
// TODO: Reconsider this. The counter-argument is that the partial work
// represents an intermediate state, which we don't want to show to the user.
// And by spending extra time finishing it, we're increasing the amount of
// time it takes to show the final state, which is what they are actually
// waiting for.
//
// For those exceptions where entanglement is semantically important, like
// useMutableSource, we should ensure that there is no partial work at the
// time we apply the entanglement.
var p=e.entangledLanes;if(0!==p)for(var h=e.entanglements,m=r&p;m>0;){var g=r9(m),v=1<<g;r|=h[g],m&=~v}return r}function r3(e){var t=-1073741825&e.pendingLanes;return 0!==t?t:1073741824&t?1073741824:0}function r4(e){return(268435455&e)!=0}function r6(e){return(130023424&e)===e}function r5(e){return(4194240&e)!=0}function r8(){// Cycle through the lanes, assigning each new transition to the next lane.
// In most cases, this means every transition gets its own lane, until we
// run out of lanes and cycle back to the beginning.
var e=rZ;return(4194240&(rZ<<=1))==0&&(rZ=64),e}function r7(e){// This wrapper function gets inlined. Only exists so to communicate that it
// doesn't matter which bit is selected; you can pick any bit without
// affecting the algorithms where its used. Here I'm using
// getHighestPriorityLane because it requires the fewest operations.
return e&-e}function r9(e){return 31-rK(e)}function oe(e){for(var t=[],n=0;n<rJ;n++)t.push(e);return t}function ot(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),// recent event, and we assume time is monotonically increasing.
e.eventTimes[r9(t)]=n}function on(e,t,n){e.pingedLanes|=e.suspendedLanes&t}function or(e,t){for(// In addition to entangling each of the given lanes with each other, we also
// have to consider _transitive_ entanglements. For each lane that is already
// entangled with *any* of the given lanes, that lane is now transitively
// entangled with *all* the given lanes.
//
// Translated: If C is entangled with A, then entangling A with B also
// entangles C with B.
//
// If this is hard to grasp, it might help to intentionally break this
// function and look at the tests that fail in ReactTransition-test.js. Try
// commenting out one of the conditions below.
var n=e.entangledLanes|=t,r=e.entanglements,o=n;o;){var i=r9(o),a=1<<i;a&t|// Is this lane transitively entangled with the newly entangled lanes?
r[i]&t&&(r[i]|=t),o&=~a}}function oo(e,t,n){if(rU)for(var r=e.pendingUpdatersLaneMap;n>0;){var o=r9(n),i=1<<o;r[o].add(t),n&=~i}}function oi(e,t){if(rU)for(var n=e.pendingUpdatersLaneMap,r=e.memoizedUpdaters;t>0;){var o=r9(t),i=1<<o,a=n[o];a.size>0&&(a.forEach(function(e){var t=e.alternate;null!==t&&r.has(t)||r.add(e)}),a.clear()),t&=~i}}var oa=/*                          */0;function os(e){var t=e&-e;return 1<t?4<t?r4(t)?16:536870912:4:1}// This is imported by the event replaying implementation in React DOM. It's
// in a separate file to break a circular dependency between the renderer and
// the reconciler.
function ou(e){return e.current.memoizedState.isDehydrated}// has this definition built-in.
var ol=!1,oc=[],od=null,of=null,op=null,oh=new Map,om=new Map,og=[],ov=["mousedown","mouseup","touchcancel","touchend","touchstart","auxclick","dblclick","pointercancel","pointerdown","pointerup","dragend","dragstart","drop","compositionend","compositionstart","keydown","keypress","keyup","input","textInput","copy","cut","paste","click","change","contextmenu","reset","submit"];// The queue of discrete events to be replayed.
function oy(e,t){switch(e){case"focusin":case"focusout":od=null;break;case"dragenter":case"dragleave":of=null;break;case"mouseover":case"mouseout":op=null;break;case"pointerover":case"pointerout":var n=t.pointerId;oh.delete(n);break;case"gotpointercapture":case"lostpointercapture":var r=t.pointerId;om.delete(r)}}function ob(e,t,n,r,o,i){if(null===e||e.nativeEvent!==i){if(null!==t){var a=a1(t);null!==a&&O(a)}return{blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[o]}}// If we have already queued this exact event, then it's because
// the different event systems have different DOM event listeners.
// We can accumulate the flags, and the targetContainers, and
// store a single event to be replayed.
e.eventSystemFlags|=r;var s=e.targetContainers;return null!==o&&-1===s.indexOf(o)&&s.push(o),e}function ow(e){// TODO: This function shares a lot of logic with findInstanceBlockingEvent.
// Try to unify them. It's a bit tricky since it would require two return
// values.
var t=a0(e.target);if(null!==t){var n=rh(t);if(null!==n){var r=n.tag;if(13===r){var o=rm(n);if(null!==o){// We're blocked on hydrating this boundary.
// Increase its priority.
e.blockedOn=o,D(e.priority,function(){R(n)});return}}else if(3===r&&ou(n.stateNode)){e.blockedOn=rg(n);// We don't currently have a way to increase the priority of
// a root other than sync.
return}}}e.blockedOn=null}function o_(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;t.length>0;){var n=t[0],r=oD(e.domEventName,e.eventSystemFlags,n,e.nativeEvent);if(null===r){var o=e.nativeEvent,i=new o.constructor(o.type,o);null!==nG&&eN("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."),nG=i,o.target.dispatchEvent(i),null===nG&&eN("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."),nG=null}else{// We're still blocked. Try again later.
var a=a1(r);return null!==a&&O(a),e.blockedOn=r,!1}// This target container was successfully dispatched. Try the next.
t.shift()}return!0}function ok(e,t,n){o_(e)&&n.delete(t)}function oS(){ol=!1,null!==od&&o_(od)&&(od=null),null!==of&&o_(of)&&(of=null),null!==op&&o_(op)&&(op=null),oh.forEach(ok),om.forEach(ok)}function ox(e,t){e.blockedOn!==t||(e.blockedOn=null,ol||(ol=!0,// now unblocked. This first might not actually be unblocked yet.
// We could check it early to avoid scheduling an unnecessary callback.
eP.unstable_scheduleCallback(eP.unstable_NormalPriority,oS)))}function oE(e){// Mark anything that was blocked on this as no longer blocked
// and eligible for a replay.
if(oc.length>0){ox(oc[0],e);// This is a exponential search for each boundary that commits. I think it's
// worth it because we expect very few discrete events to queue up and once
// we are actually fully unblocked it will be fast to replay them.
for(var t=1;t<oc.length;t++){var n=oc[t];n.blockedOn===e&&(n.blockedOn=null)}}null!==od&&ox(od,e),null!==of&&ox(of,e),null!==op&&ox(op,e);var r=function(t){return ox(t,e)};oh.forEach(r),om.forEach(r);for(var o=0;o<og.length;o++){var i=og[o];i.blockedOn===e&&(i.blockedOn=null)}for(;og.length>0;){var a=og[0];if(null!==a.blockedOn)break;ow(a),null===a.blockedOn&&og.shift()}}var oC=eI.ReactCurrentBatchConfig,oT=!0;// TODO: can we stop exporting these?
function oO(e,t,n,r){var o=oa,i=oC.transition;oC.transition=null;try{oa=1,oP(e,t,n,r)}finally{oa=o,oC.transition=i}}function oR(e,t,n,r){var o=oa,i=oC.transition;oC.transition=null;try{oa=4,oP(e,t,n,r)}finally{oa=o,oC.transition=i}}function oP(e,t,n,r){oT&&function(e,t,n,r){var o=oD(e,t,n,r);if(null===o){i7(e,t,r,oI,n),oy(e,r);return}if(function(e,t,n,r,o){// These set relatedTarget to null because the replayed event will be treated as if we
// moved from outside the window (no target) onto the target once it hydrates.
// Instead of mutating we could clone the event.
switch(t){case"focusin":return od=ob(od,e,t,n,r,o),!0;case"dragenter":return of=ob(of,e,t,n,r,o),!0;case"mouseover":return op=ob(op,e,t,n,r,o),!0;case"pointerover":var i=o.pointerId;return oh.set(i,ob(oh.get(i)||null,e,t,n,r,o)),!0;case"gotpointercapture":var a=o.pointerId;return om.set(a,ob(om.get(a)||null,e,t,n,r,o)),!0}return!1}// Check if this target is unblocked. Returns true if it's unblocked.
(o,e,t,n,r)){r.stopPropagation();return}// We need to clear only if we didn't queue because
if(// queueing is accumulative.
oy(e,r),4&t&&ov.indexOf(e)>-1){for(;null!==o;){var i=a1(o);null!==i&&T(i);var a=oD(e,t,n,r);if(null===a&&i7(e,t,r,oI,n),a===o)break;o=a}null!==o&&r.stopPropagation();return}// This is not replayable so we'll invoke it but without a target,
// in case the event system needs to trace it.
i7(e,t,r,null,n)}(e,t,n,r)}var oI=null;// Returns a SuspenseInstance or Container if it's blocked.
// The return_targetInst field above is conceptually part of the return value.
function oD(e,t,n,r){// TODO: Warn if _enabled is false.
oI=null;var o=a0(nX(r));if(null!==o){var i=rh(o);if(null===i)o=null;else{var a=i.tag;if(13===a){var s=rm(i);if(null!==s)// don't want this event dispatched twice through the event system.
// TODO: If this is the first discrete event in the queue. Schedule an increased
// priority for this boundary.
return s;// This shouldn't happen, something went wrong but to avoid blocking
// the whole system, dispatch the event without a target.
// TODO: Warn.
o=null}else if(3===a){if(ou(i.stateNode))// the whole system.
return rg(i);o=null}else i!==o&&// component's mount, ignore it for now (that is, treat it as if it was an
// event on a non-React tree). We might also consider queueing events and
// dispatching them after the mount.
(o=null)}}return oI=o,null}function oM(e){switch(e){// Used by SimpleEventPlugin:
case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":// eslint-disable-next-line no-fallthrough
case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":// eslint-disable-next-line no-fallthrough
case"beforeblur":case"afterblur":// eslint-disable-next-line no-fallthrough
case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":// eslint-disable-next-line no-fallthrough
case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(rE()){case rC:return 1;case rT:return 4;case rO:case rR:// TODO: Handle LowSchedulerPriority, somehow. Maybe the same lane as hydration.
return 16;case rP:return 536870912;default:return 16}default:return 16}}/**
 * These variables store information about text content of a target node,
 * allowing comparison of content before and after a given event.
 *
 * Identify the node where selection currently begins, then observe
 * both its text content and its current position in the DOM. Since the
 * browser may natively replace the target node during composition, we can
 * use its position to find its replacement.
 *
 *
 */var oN=null,oL=null,oA=null;function oU(){if(oA)return oA;var e,t,n=oL,r=n.length,o=oj(),i=o.length;for(e=0;e<r&&n[e]===o[e];e++);var a=r-e;for(t=1;t<=a&&n[r-t]===o[i-t];t++);var s=t>1?1-t:void 0;return oA=o.slice(e,s)}function oj(){return"value"in oN?oN.value:oN.textContent}/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */function oF(e){var t,n=e.keyCode;return(// Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
// Must not discard the (non-)printable Enter-key.
("charCode"in e?0===(t=e.charCode)&&13===n&&(t=13):t=n,10===t&&(t=13),t>=32||13===t)?t:0)}function oz(){return!0}function oq(){return!1}// This is intentionally a factory so that we have different returned constructors.
// If we had a single constructor, it would be megamorphic and engines would deopt.
function oB(e){/**
   * Synthetic events are dispatched by event plugins, typically in response to a
   * top-level event delegation handler.
   *
   * These systems should generally use pooling to reduce the frequency of garbage
   * collection. The system should check `isPersistent` to determine whether the
   * event should be released into the pool after being dispatched. Users that
   * need a persisted event should invoke `persist`.
   *
   * Synthetic events (and subclasses) implement the DOM Level 3 Events API by
   * normalizing browser quirks. Subclasses do not necessarily have to implement a
   * DOM interface; custom application-specific events can also subclass this.
   */function t(t,n,r,o,i){for(var a in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=o,this.target=i,this.currentTarget=null,e)if(e.hasOwnProperty(a)){var s=e[a];s?this[a]=s(o):this[a]=o[a]}return(null!=o.defaultPrevented?o.defaultPrevented:!1===o.returnValue)?this.isDefaultPrevented=oz:this.isDefaultPrevented=oq,this.isPropagationStopped=oq,this}return tv(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=oz)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&// IE. This event does not support bubbling or cancelling, and
// any references to cancelBubble throw "Member not found".  A
// typeof check of "unknown" circumvents this issue (and is also
// IE specific).
(e.cancelBubble=!0),this.isPropagationStopped=oz)},/**
     * We release all dispatched `SyntheticEvent`s after each event loop, adding
     * them back into the pool. This allows a way to hold onto a reference that
     * won't be added back into the pool.
     */persist:function(){},/**
     * Checks if this event should be released back into the pool.
     *
     * @return {boolean} True if this should not be released, false otherwise.
     */isPersistent:oz}),t}/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var oV={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},o$=oB(oV),oW=tv({},oV,{view:0,detail:0}),oH=oB(oW),oY=tv({},oW,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:o4,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==L&&(L&&"mousemove"===e.type?(M=e.screenX-L.screenX,N=e.screenY-L.screenY):(M=0,N=0),L=e),M)},movementY:function(e){return"movementY"in e?e.movementY:N}}),oQ=oB(oY),oK=oB(tv({},oY,{dataTransfer:0})),oG=oB(tv({},oW,{relatedTarget:0})),oX=oB(tv({},oV,{animationName:0,elapsedTime:0,pseudoElement:0})),oJ=oB(tv({},oV,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),oZ=oB(tv({},oV,{data:0})),o0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},o1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},o2={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};// getModifierState. If getModifierState is not supported, we map it to a set of
// modifier keys exposed by the event. In this case, Lock-keys are not supported.
function o3(e){var t=this.nativeEvent;if(t.getModifierState)return t.getModifierState(e);var n=o2[e];return!!n&&!!t[n]}function o4(e){return o3}var o6=oB(tv({},oW,{key:/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */function(e){if(e.key){// Normalize inconsistent values reported by browsers due to
// implementations of a working draft specification.
// FireFox implements `key` but returns `MozPrintableKey` for all
// printable characters (normalized to `Unidentified`), ignore it.
var t=o0[e.key]||e.key;if("Unidentified"!==t)return t}// Browser does not implement `key`, polyfill as much of it as we can.
if("keypress"===e.type){var n=oF(e);// The enter-key is technically both printable and non-printable and can
// thus be captured by `keypress`, no other non-printable key should.
return 13===n?"Enter":String.fromCharCode(n)}return"keydown"===e.type||"keyup"===e.type?o1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:o4,// Legacy Interface
charCode:function(e){return(// `charCode` is the result of a KeyPress event and represents the value of
// the actual printable character.
// KeyPress is deprecated, but its replacement is not yet final and not
// implemented in any major browser. Only KeyPress has charCode.
"keypress"===e.type?oF(e):0)},keyCode:function(e){return(// `keyCode` is the result of a KeyDown/Up event and represents the value of
// physical keyboard key.
// The actual meaning of the value depends on the users' keyboard layout
// which cannot be detected. Assuming that it is a US keyboard layout
// provides a surprisingly accurate mapping for US and European users.
// Due to this, it is left to the user to implement at this time.
"keydown"===e.type||"keyup"===e.type?e.keyCode:0)},which:function(e){return(// `which` is an alias for either `keyCode` or `charCode` depending on the
// type of the event.
"keypress"===e.type?oF(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0)}})),o5=oB(tv({},oY,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),o8=oB(tv({},oW,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:o4})),o7=oB(tv({},oV,{propertyName:0,elapsedTime:0,pseudoElement:0})),o9=oB(tv({},oY,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,// Browsers without "deltaMode" is reporting in raw wheel delta where one
// notch on the scroll is always +/- 120, roughly equivalent to pixels.
// A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
// ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
deltaMode:0})),ie=[9,13,27,32],it=eq&&"CompositionEvent"in window,ir=null;eq&&"documentMode"in document&&(ir=document.documentMode);// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var io=eq&&"TextEvent"in window&&!ir,ii=eq&&(!it||ir&&ir>8&&ir<=11),ia=!1;// In IE9+, we have access to composition events, but the data supplied
/**
 * Does our fallback mode think that this event is the end of composition?
 */function is(e,t){switch(e){case"keyup":// Command keys insert or clear IME input.
return -1!==ie.indexOf(t.keyCode);case"keydown":// Expect IME keyCode on each keydown. If we get any other
// code we must have exited earlier.
return 229!==t.keyCode;case"keypress":case"mousedown":case"focusout":// Events are not possible without cancelling IME.
return!0;default:return!1}}/**
 * Google Input Tools provides composition data via a CustomEvent,
 * with the `data` property populated in the `detail` object. If this
 * is available on the event object, use it. If not, this is a plain
 * composition event and we have nothing special to extract.
 *
 * @param {object} nativeEvent
 * @return {?string}
 */function iu(e){var t=e.detail;return"object"==typeof t&&"data"in t?t.data:null}/**
 * Check if a composition event was triggered by Korean IME.
 * Our fallback mode does not work well with IE's Korean IME,
 * so just use native composition events when Korean IME is used.
 * Although CompositionEvent.locale property is deprecated,
 * it is available in IE, where our fallback mode is enabled.
 *
 * @param {object} nativeEvent
 * @return {boolean}
 */function il(e){return"ko"===e.locale}// Track the current IME composition status, if any.
var ic=!1,id={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ip(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!id[e.type]:"textarea"===t}function ih(e,t,n,r){// Flag this event loop as needing state restore.
n2(r);var o=ae(t,"onChange");if(o.length>0){var i=new o$("onChange","change",null,n,r);e.push({event:i,listeners:o})}}/**
 * For IE shims
 */var im=null,ig=null;function iv(e){i1(e,0)}function iy(e){if(tB(a2(e)))return e}function ib(e,t){if("change"===e)return t}/**
 * SECTION: handle `input` event
 */var iw=!1;/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */function i_(){im&&(im.detachEvent("onpropertychange",ik),im=null,ig=null)}/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */function ik(e){if("value"===e.propertyName&&iy(ig)){var t;ih(t=[],ig,e,nX(e)),// other events and have it go through ReactBrowserEventEmitter. Since it
// doesn't, we manually listen for the events and so we have to enqueue and
// process the abstract event manually.
//
// Batching is necessary here in order to ensure that all event handlers run
// before the next rerender (including event handlers attached to ancestor
// elements instead of directly on the input). Without this, controlled
// components don't work properly in conjunction with event bubbling because
// the component is rerendered and the value reverted before all the event
// handlers can run. See https://github.com/facebook/react/issues/708.
n8(iv,t)}}function iS(e,t,n){"focusin"===e?(// In IE9, propertychange fires for most input events but is buggy and
// doesn't fire when text is deleted, but conveniently, selectionchange
// appears to fire in all of the remaining cases so we catch those and
// forward the event if the value has changed
// In either case, we don't want to call the event handler if the value
// is changed from JS so we redefine a setter for `.value` that updates
// our activeElementValue variable, allowing us to ignore those changes
//
// stopWatching() should be a noop here but we call it just in case we
// missed a blur event somehow.
i_(),im=t,ig=n,im.attachEvent("onpropertychange",ik)):"focusout"===e&&i_()}// For IE8 and IE9.
function ix(e,t){if("selectionchange"===e||"keyup"===e||"keydown"===e)// helpful for us so just check activeElement instead.
//
// 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
// propertychange on the first input event after setting `value` from a
// script and fires only keydown, keypress, keyup. Catching keyup usually
// gets it and catching keydown lets us fire an event for the first
// keystroke if user does a key repeat (it'll be a little delayed: right
// before the second keystroke). Other input methods (e.g., paste) seem to
// fire selectionchange normally.
return iy(ig)}function iE(e,t){if("click"===e)return iy(t)}function iC(e,t){if("input"===e||"change"===e)return iy(t)}eq&&// deleting text, so we ignore its input events.
(iw=/**
 * Checks if an event is supported in the current execution environment.
 *
 * NOTE: This will not work correctly for non-generic events such as `change`,
 * `reset`, `load`, `error`, and `select`.
 *
 * Borrows from Modernizr.
 *
 * @param {string} eventNameSuffix Event name, e.g. "click".
 * @return {boolean} True if the event is supported.
 * @internal
 * @license Modernizr 3.0.0pre (Custom Build) | MIT
 */function(e){if(!eq)return!1;var t="on"+e,n=t in document;if(!n){var r=document.createElement("div");r.setAttribute(t,"return;"),n="function"==typeof r[t]}return n}("input")&&(!document.documentMode||document.documentMode>9));var iT="function"==typeof Object.is?Object.is:/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t// eslint-disable-line no-self-compare
};/**
 * Performs equality by iterating through keys on an object and returning false
 * when any key has values which are not strictly equal between the arguments.
 * Returns true when the values of all keys are strictly equal.
 */function iO(e,t){if(iT(e,t))return!0;if("object"!=typeof e||null===e||"object"!=typeof t||null===t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;// Test for A's keys different from B.
for(var o=0;o<n.length;o++){var i=n[o];if(!eB.call(t,i)||!iT(e[i],t[i]))return!1}return!0}/**
 * Given any node return the first leaf node without children.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {DOMElement|DOMTextNode}
 */function iR(e){for(;e&&e.firstChild;)e=e.firstChild;return e}/**
 * Get object describing the nodes which contain characters at offset.
 *
 * @param {DOMElement|DOMTextNode} root
 * @param {number} offset
 * @return {?object}
 */function iP(e,t){for(var n=iR(e),r=0,o=0;n;){if(3===n.nodeType){if(o=r+n.textContent.length,r<=t&&o>=t)return{node:n,offset:t-r};r=o}n=iR(/**
 * Get the next sibling within a container. This will walk up the
 * DOM if a node's siblings have been exhausted.
 *
 * @param {DOMElement|DOMTextNode} node
 * @return {?DOMElement|DOMTextNode}
 */function(e){for(;e;){if(e.nextSibling)return e.nextSibling;e=e.parentNode}}(n))}}function iI(e){return e&&3===e.nodeType}function iD(){for(var e=window,t=tV();t instanceof e.HTMLIFrameElement&&function(e){try{// Accessing the contentDocument of a HTMLIframeElement can cause the browser
// to throw, e.g. if it has a cross-origin src attribute.
// Safari will show an error in the console when the access results in "Blocked a frame with origin". e.g:
// iframe.contentDocument.defaultView;
// A safety way is to access one of the cross origin properties: Window or Location
// Which might result in "SecurityError" DOM Exception and it is compatible to Safari.
// https://html.spec.whatwg.org/multipage/browsers.html#integration-with-idl
return"string"==typeof e.contentWindow.location.href}catch(e){return!1}}(t);)t=tV((e=t.contentWindow).document);return t}/**
 * @ReactInputSelection: React input selection module. Based on Selection.js,
 * but modified to be suitable for react and has a couple of bug fixes (doesn't
 * assume buttons have range selections allowed).
 * Input selection module for React.
 *//**
 * @hasSelectionCapabilities: we get the element types that support selection
 * from https://html.spec.whatwg.org/#do-not-apply, looking at `selectionStart`
 * and `selectionEnd` rows.
 */function iM(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var iN=eq&&"documentMode"in document&&document.documentMode<=11,iL=null,iA=null,iU=null,ij=!1;/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @param {object} nativeEventTarget
 * @return {?SyntheticEvent}
 */function iF(e,t,n){// Ensure we have the right element, and that the user is not dragging a
// selection (this matches native `select` event behavior). In HTML5, select
// fires only on input and textarea thus if there's no focused element we
// won't dispatch.
var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;if(!ij&&null!=iL&&iL===tV(r)){// Only fire when selection has actually changed.
var o=/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 */function(e){if("selectionStart"in e&&iM(e))return{start:e.selectionStart,end:e.selectionEnd};var t=(e.ownerDocument&&e.ownerDocument.defaultView||window).getSelection();return{anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}}(iL);if(!iU||!iO(iU,o)){iU=o;var i=ae(iA,"onSelect");if(i.length>0){var a=new o$("onSelect","select",null,t,n);e.push({event:a,listeners:i}),a.target=iL}}}}/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */function iz(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}/**
 * A list of event names to a configurable list of vendor prefixes.
 */var iq={animationend:iz("Animation","AnimationEnd"),animationiteration:iz("Animation","AnimationIteration"),animationstart:iz("Animation","AnimationStart"),transitionend:iz("Transition","TransitionEnd")},iB={},iV={};/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */function i$(e){if(iB[e])return iB[e];if(!iq[e])return e;var t=iq[e];for(var n in t)if(t.hasOwnProperty(n)&&n in iV)return iB[e]=t[n];return e}!eq||(iV=document.createElement("div").style,"AnimationEvent"in window||(delete iq.animationend.animation,delete iq.animationiteration.animation,delete iq.animationstart.animation),"TransitionEvent"in window||delete iq.transitionend.transition);var iW=i$("animationend"),iH=i$("animationiteration"),iY=i$("animationstart"),iQ=i$("transitionend"),iK=new Map,iG=["abort","auxClick","cancel","canPlay","canPlayThrough","click","close","contextMenu","copy","cut","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","gotPointerCapture","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","lostPointerCapture","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","pointerCancel","pointerDown","pointerMove","pointerOut","pointerOver","pointerUp","progress","rateChange","reset","resize","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchStart","volumeChange","scroll","toggle","touchMove","waiting","wheel"];function iX(e,t){iK.set(e,t),eF(t,[e])}// TODO: remove top-level side effect.
(function(){for(var e=0;e<iG.length;e++){var t=iG[e];iX(t.toLowerCase(),"on"+(t[0].toUpperCase()+t.slice(1)))}// Special cases where event names don't match.
iX(iW,"onAnimationEnd"),iX(iH,"onAnimationIteration"),iX(iY,"onAnimationStart"),iX("dblclick","onDoubleClick"),iX("focusin","onFocus"),iX("focusout","onBlur"),iX(iQ,"onTransitionEnd")})(),ez("onMouseEnter",["mouseout","mouseover"]),ez("onMouseLeave",["mouseout","mouseover"]),ez("onPointerEnter",["pointerout","pointerover"]),ez("onPointerLeave",["pointerout","pointerover"]),eF("onChange",["change","click","focusin","focusout","input","keydown","keyup","selectionchange"]),eF("onSelect",["focusout","contextmenu","dragend","focusin","keydown","keyup","mousedown","mouseup","selectionchange"]),eF("onBeforeInput",["compositionend","keypress","textInput","paste"]),eF("onCompositionEnd",["compositionend","focusout","keydown","keypress","keyup","mousedown"]),eF("onCompositionStart",["compositionstart","focusout","keydown","keypress","keyup","mousedown"]),eF("onCompositionUpdate",["compositionupdate","focusout","keydown","keypress","keyup","mousedown"]);var iJ=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","resize","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],iZ=new Set(["cancel","close","invalid","load","scroll","toggle"].concat(iJ));// We should not delegate these events to the container, but rather
function i0(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,/**
 * Same as invokeGuardedCallback, but instead of returning an error, it stores
 * it in a global so it can be rethrown by `rethrowCaughtError` later.
 * TODO: See if caughtError and rethrowError can be unified.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */function(e,t,n,r,o,i,a,s,u){if(rc.apply(this,arguments),ri){var l=rd();rs||(rs=!0,ru=l)}}(r,t,void 0,e),e.currentTarget=null}function i1(e,t){for(var n=(4&t)!=0,r=0;r<e.length;r++){var o=e[r];!function(e,t,n){var r;if(n)for(var o=t.length-1;o>=0;o--){var i=t[o],a=i.instance,s=i.currentTarget,u=i.listener;if(a!==r&&e.isPropagationStopped())return;i0(e,u,s),r=a}else for(var l=0;l<t.length;l++){var c=t[l],d=c.instance,f=c.currentTarget,p=c.listener;if(d!==r&&e.isPropagationStopped())return;i0(e,p,f),r=d}}(o.event,o.listeners,n);//  event system doesn't use pooling.
}// This would be a good time to rethrow if any of the event handlers threw.
!/**
 * During execution of guarded functions we will capture the first error which
 * we will rethrow to be handled by the top level error handler.
 */function(){if(rs){var e=ru;throw rs=!1,ru=null,e}}()}function i2(e,t){iZ.has(e)||eN('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',e);var n,r=(void 0===(n=t[aX])&&(n=t[aX]=new Set),n),o=e+"__bubble";r.has(o)||(i5(t,e,2,!1),r.add(o))}function i3(e,t,n){iZ.has(e)&&!t&&eN('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',e);var r=0;t&&(r|=4),i5(n,e,r,t)}// This is only used by createEventHandle when the
var i4="_reactListening"+Math.random().toString(36).slice(2);function i6(e){if(!e[i4]){e[i4]=!0,eA.forEach(function(t){// We handle selectionchange separately because it
// doesn't bubble and needs to be on the document.
"selectionchange"!==t&&(iZ.has(t)||i3(t,!1,e),i3(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[i4]||(t[i4]=!0,i3("selectionchange",!1,t))}}function i5(e,t,n,r,o){var i,a,s=function(e,t,n){var r;switch(oM(t)){case 1:r=oO;break;case 4:r=oR;break;default:r=oP}return r.bind(null,t,n,e)}(e,t,n),u=void 0;// If passive option is not supported, then the event will be
(n9&&("touchstart"===t||"touchmove"===t||"wheel"===t)&&(u=!0),r)?void 0!==u?(i=u,e.addEventListener(t,s,{capture:!0,passive:i})):e.addEventListener(t,s,!0):void 0!==u?(a=u,e.addEventListener(t,s,{passive:a})):e.addEventListener(t,s,!1)}function i8(e,t){return e===t||8===e.nodeType&&e.parentNode===t}function i7(e,t,n,r,o){var i=r;if((1&t)==0&&(2&t)==0&&null!==r){// The below logic attempts to work out if we need to change
// the target fiber to a different ancestor. We had similar logic
// in the legacy event system, except the big difference between
// systems is that the modern event system now has an event listener
// attached to each React Root and React Portal Root. Together,
// the DOM nodes representing these roots are the "rootContainer".
// To figure out which ancestor instance we should use, we traverse
// up the fiber tree from the target instance and attempt to find
// root boundaries that match that of our current "rootContainer".
// If we find that "rootContainer", we find the parent fiber
// sub-tree for that root and make that our ancestor instance.
var a=r;e:for(;;){if(null===a)return;var s=a.tag;if(3===s||4===s){var u=a.stateNode.containerInfo;if(i8(u,o))break;if(4===s)for(// The target is a portal, but it's not the rootContainer we're looking for.
// Normally portals handle their own events all the way down to the root.
// So we should be able to stop now. However, we don't know if this portal
// was part of *our* root.
var l=a.return;null!==l;){var c=l.tag;if((3===c||4===c)&&i8(l.stateNode.containerInfo,o))// a parent of the Portal. That means we can ignore it because the
// Portal will bubble through to us.
return;l=l.return}// Now we need to find it's corresponding host fiber in the other
// tree. To do this we can use getClosestInstanceFromNode, but we
// need to validate that the fiber is a host instance, otherwise
// we need to traverse up through the DOM till we find the correct
// node that is from the other tree.
for(;null!==u;){var d=a0(u);if(null===d)return;var f=d.tag;if(5===f||6===f){a=i=d;continue e}u=u.parentNode}}a=a.return}}n8(function(){var r,o,a,s,u,l,c,d,f,p;return r=i,o=nX(n),void(// TODO: we should remove the concept of a "SimpleEventPlugin".
// This is the basic functionality of the event system. All
// the other plugins are essentially polyfills. So the plugin
// should probably be inlined somewhere and have its logic
// be core the to event system. This would potentially allow
// us to ship builds of React without the polyfilled plugins below.
function(e,t,n,r,o,i,a){var s=iK.get(t);if(void 0!==s){var u=o$,l=t;switch(t){case"keypress":// Firefox creates a keypress event for function keys too. This removes
// the unwanted keypress events. Enter is however both printable and
// non-printable. One would expect Tab to be as well (but it isn't).
if(0===oF(r))return;/* falls through */case"keydown":case"keyup":u=o6;break;case"focusin":l="focus",u=oG;break;case"focusout":l="blur",u=oG;break;case"beforeblur":case"afterblur":u=oG;break;case"click":// Firefox creates a click event on right mouse clicks. This removes the
// unwanted click events.
if(2===r.button)return;/* falls through */case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":/* falls through */case"mouseout":case"mouseover":case"contextmenu":u=oQ;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":u=oK;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":u=o8;break;case iW:case iH:case iY:u=oX;break;case iQ:u=o7;break;case"scroll":u=oH;break;case"wheel":u=o9;break;case"copy":case"cut":case"paste":u=oJ;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":u=o5}var c=(4&i)!=0,d=!c&&// TODO: ideally, we'd eventually add all events from
// nonDelegatedEvents list in DOMPluginEventSystem.
// Then we can remove this special list.
// This is a breaking change that can wait until React 18.
"scroll"===t,f=function(e,t,n,r,o,i){for(var a=r?null!==t?t+"Capture":null:t,s=[],u=e,l=null;null!==u;){var c=u,d=c.stateNode;// Handle listeners that are on HostComponents (i.e. <div>)
if(5===c.tag&&null!==d&&(l=d,null!==a)){var f=n7(u,a);null!=f&&s.push(i9(u,f,l))}// If we are only accumulating events for the target, then we don't
// continue to propagate through the React fiber tree to find other
// listeners.
if(o)break;// If we are processing the onBeforeBlur event, then we need to take
u=u.return}return s}// We should only use this function for:
(n,s,r.type,c,d);if(f.length>0){// Intentionally create event lazily.
var p=new u(s,l,null,r,o);e.push({event:p,listeners:f})}}}(s=a=[],u=e,l=r,c=n,d=o,f=t),(7&f)==0&&(/**
 * For almost every interaction we care about, there will be both a top-level
 * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
 * we do not extract duplicate events. However, moving the mouse into the
 * browser from outside will not fire a `mouseout` event. In this case, we use
 * the `mouseover` top-level event.
 */function(e,t,n,r,o,i,a){var s,u,l,c="mouseover"===t||"pointerover"===t,d="mouseout"===t||"pointerout"===t;if(c&&r!==nG){// If this is an over event with a target, we might have already dispatched
// the event in the out event of the other target. If this is replayed,
// then it's because we couldn't dispatch against this target previously
// so we have to do it now instead.
var f=r.relatedTarget||r.fromElement;if(f&&(a0(f)||f[aG]))return}if(d||c){if(o.window===o)s=o;else{// TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
var p=o.ownerDocument;s=p?p.defaultView||p.parentWindow:window}if(d){var h=r.relatedTarget||r.toElement;if(u=n,null!==(l=h?a0(h):null)){var m=rh(l);(l!==m||5!==l.tag&&6!==l.tag)&&(l=null)}}else // Moving to a node from outside the window.
u=null,l=n;if(u!==l){var g,v,y,b,w=oQ,_="onMouseLeave",k="onMouseEnter",S="mouse";("pointerout"===t||"pointerover"===t)&&(w=o5,_="onPointerLeave",k="onPointerEnter",S="pointer");var x=null==u?s:a2(u),E=null==l?s:a2(l),C=new w(_,S+"leave",u,r,o);C.target=x,C.relatedTarget=E;var T=null;// We should only process this nativeEvent if we are processing
if(a0(o)===n){var O=new w(k,S+"enter",l,r,o);O.target=E,O.relatedTarget=x,T=O}g=T,v=u,y=l,b=v&&y?/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */function(e,t){for(var n=e,r=t,o=0,i=n;i;i=at(i))o++;for(var a=0,s=r;s;s=at(s))a++;// If A is deeper, crawl up.
for(;o-a>0;)n=at(n),o--;// If B is deeper, crawl up.
for(;a-o>0;)r=at(r),a--;// Walk in lockstep until we find a match.
for(var u=o;u--;){if(n===r||null!==r&&n===r.alternate)return n;n=at(n),r=at(r)}return null}(v,y):null,null!==v&&an(e,C,v,b,!1),null!==y&&null!==g&&an(e,g,y,b,!0)}}}(s,u,l,c,d),/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */function(e,t,n,r,o,i,a){var s,u,l,c,d,f=n?a2(n):window;if("select"===(s=f.nodeName&&f.nodeName.toLowerCase())||"input"===s&&"file"===f.type?c=ib:ip(f)?iw?c=iC:(c=ix,d=iS):(u=f.nodeName)&&"input"===u.toLowerCase()&&("checkbox"===f.type||"radio"===f.type)&&(c=iE),c){var p=c(t,n);if(p){ih(e,p,r,o);return}}d&&d(t,f,n),"focusout"===t&&(l=f._wrapperState)&&l.controlled&&"number"===f.type&&// If controlled, assign the value attribute to the current value on blur
t0(f,"number",f.value)}(s,u,l,c,d),/**
 * This plugin creates an `onSelect` event that normalizes select events
 * across form elements.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - contentEditable
 *
 * This differs from native browser implementations in the following ways:
 * - Fires on contentEditable fields as well as inputs.
 * - Fires for collapsed selection.
 * - Fires after user input.
 */function(e,t,n,r,o,i,a){var s=n?a2(n):window;switch(t){// Track the input node that has focus.
case"focusin":(ip(s)||"true"===s.contentEditable)&&(iL=s,iA=n,iU=null);break;case"focusout":iL=null,iA=null,iU=null;break;// Don't fire the event while the user is dragging. This matches the
// semantics of the native select event.
case"mousedown":ij=!0;break;case"contextmenu":case"mouseup":case"dragend":ij=!1,iF(e,r,o);break;// Chrome and IE fire non-standard event when selection is changed (and
// sometimes when it hasn't). IE's event fires out of order with respect
// to key and input events on deletion, so we discard it.
//
// Firefox doesn't support selectionchange, so check selection status
// after each key entry. The selection changes after keydown and before
// keyup, but we check on keydown as well in the case of holding down a
// key, when multiple keydown events are fired but only one keyup is.
// This is also our approach for IE handling, for the reason above.
case"selectionchange":if(iN)break;// falls through
case"keydown":case"keyup":iF(e,r,o)}}(s,u,l,c,d),/**
 * @return {?object} A SyntheticCompositionEvent.
 */function(e,t,n,r,o){if(it?i=/**
 * Translate native top level events into event types.
 */function(e){switch(e){case"compositionstart":return"onCompositionStart";case"compositionend":return"onCompositionEnd";case"compositionupdate":return"onCompositionUpdate"}}(t):ic?is(t,r)&&(i="onCompositionEnd"):"keydown"===t&&229===r.keyCode&&(i="onCompositionStart"),i){ii&&!il(r)&&(ic||"onCompositionStart"!==i?"onCompositionEnd"===i&&ic&&(a=oU()):(oN=o,oL=oj(),ic=!0));var i,a,s=ae(n,i);if(s.length>0){var u=new oZ(i,t,null,r,o);if(e.push({event:u,listeners:s}),a)// This matches the property of native CompositionEventInterface.
u.data=a;else{var l=iu(r);null!==l&&(u.data=l)}}}}(s,u,l,c,d),/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */function(e,t,n,r,o){// If no characters are being inserted, no BeforeInput event should
// be fired.
if(i=io?function(e,t){switch(e){case"compositionend":return iu(t);case"keypress":if(32!==t.which)return null;return ia=!0," ";case"textInput":// Record the characters to be added to the DOM.
var n=t.data;// If it's a spacebar character, assume that we have already handled
// it at the keypress level and bail immediately. Android Chrome
// doesn't give us keycodes, so we need to ignore it.
if(" "===n&&ia)return null;return n;default:// For other native event types, do nothing.
return null}}(t,r):/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 */function(e,t){// If we are currently composing (IME) and using a fallback to do so,
// try to extract the composed characters from the fallback object.
// If composition event is available, we extract a string only at
// compositionevent, otherwise extract it at fallback events.
if(ic){if("compositionend"===e||!it&&is(e,t)){var n=oU();return oN=null,oL=null,oA=null,ic=!1,n}return null}switch(e){case"paste":default:// If a paste event occurs after a keypress, throw out the input
// chars. Paste events should not lead to BeforeInput events.
return null;case"keypress":/**
       * As of v27, Firefox may fire keypress events even when no character
       * will be inserted. A few possibilities:
       *
       * - `which` is `0`. Arrow keys, Esc key, etc.
       *
       * - `which` is the pressed key code, but no char is available.
       *   Ex: 'AltGr + d` in Polish. There is no modified character for
       *   this key combination and no character is inserted into the
       *   document, but FF fires the keypress for char code `100` anyway.
       *   No `input` event will occur.
       *
       * - `which` is the pressed key code, but a command combination is
       *   being used. Ex: `Cmd+C`. No character is inserted, and no
       *   `input` event will occur.
       */if(!((t.ctrlKey||t.altKey||t.metaKey)&&// ctrlKey && altKey is equivalent to AltGr, and is not a command.
!(t.ctrlKey&&t.altKey))){// IE fires the `keypress` event when a user types an emoji via
// Touch keyboard of Windows.  In such a case, the `char` property
// holds an emoji character like `\uD83D\uDE0A`.  Because its length
// is 2, the property `which` does not represent an emoji correctly.
// In such a case, we directly return the `char` property instead of
// using `which`.
if(t.char&&t.char.length>1)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ii&&!il(t)?null:t.data}}(t,r)){var i,a=ae(n,"onBeforeInput");if(a.length>0){var s=new oZ("onBeforeInput","beforeinput",null,r,o);e.push({event:s,listeners:a}),s.data=i}}}(s,u,l,c,d)),i1(a,t))})}function i9(e,t,n){return{instance:e,listener:t,currentTarget:n}}// - BeforeInputEventPlugin
// - ChangeEventPlugin
// - SelectEventPlugin
// This is because we only process these plugins
// in the bubble phase, so we need to accumulate two
// phase event listeners (via emulation).
function ae(e,t){for(var n=t+"Capture",r=[],o=e;null!==o;){var i=o,a=i.stateNode;// Handle listeners that are on HostComponents (i.e. <div>)
if(5===i.tag&&null!==a){var s=n7(o,n);null!=s&&r.unshift(i9(o,s,a));var u=n7(o,t);null!=u&&r.push(i9(o,u,a))}o=o.return}return r}function at(e){if(null===e)return null;do e=e.return;// TODO: If this is a HostRoot we might want to bail out.
while(e&&5!==e.tag)return e||null}function an(e,t,n,r,o){for(var i=t._reactName,a=[],s=n;null!==s&&s!==r;){var u=s,l=u.alternate,c=u.stateNode,d=u.tag;if(null!==l&&l===r)break;if(5===d&&null!==c){if(o){var f=n7(s,i);null!=f&&a.unshift(i9(s,f,c))}else if(!o){var p=n7(s,i);null!=p&&a.push(i9(s,p,c))}}s=s.return}0!==a.length&&e.push({event:t,listeners:a})}// We should only use this function for:
var ar=!1,ao="dangerouslySetInnerHTML",ai="suppressContentEditableWarning",aa="suppressHydrationWarning",as="autoFocus",au="children",al="style",ac="__html";A={// There are working polyfills for <dialog>. Let people use it.
dialog:!0,// Electron ships a custom <webview> tag to display external web content in
// an isolated frame and process.
// This tag is not present in non Electron environments such as JSDom which
// is often used for testing purposes.
// @see https://electronjs.org/docs/api/webview-tag
webview:!0},U=function(e,t){nA(e,t)||function(e,t){var n=[];for(var r in t)!function(e,t){if(eB.call(nF,t)&&nF[t])return!0;if(nq.test(t)){var n="aria-"+t.slice(4).toLowerCase(),r=nj.hasOwnProperty(n)?n:null;// DOM properties, then it is an invalid aria-* attribute.
if(null==r)return eN("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",t),nF[t]=!0,!0;// aria-* attributes should be lowercase; suggest the lowercase version.
if(t!==r)return eN("Invalid ARIA attribute `%s`. Did you mean `%s`?",t,r),nF[t]=!0,!0}if(nz.test(t)){var o=t.toLowerCase(),i=nj.hasOwnProperty(o)?o:null;// DOM properties, then it is an invalid aria-* attribute.
if(null==i)return nF[t]=!0,!1;// aria-* attributes should be lowercase; suggest the lowercase version.
t!==i&&(eN("Unknown ARIA attribute `%s`. Did you mean `%s`?",t,i),nF[t]=!0)}return!0}(0,r)&&n.push(r);var o=n.map(function(e){return"`"+e+"`"}).join(", ");1===n.length?eN("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",o,e):n.length>1&&eN("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",o,e)}(e,t),"input"!==e&&"textarea"!==e&&"select"!==e||null==t||null!==t.value||nB||(nB=!0,"select"===e&&t.multiple?eN("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",e):eN("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",e)),nA(e,t)||nK(e,t,{registrationNameDependencies:eU,possibleRegistrationNames:ej})},// browsers. It adds spaces and sorts the properties in some
// non-alphabetical order. Handling that would require sorting CSS
// properties in the client & server versions or applying
// `expectedStyle` to a temporary DOM node to read its `style` attribute
// normalized. Since it only affects IE, we're skipping style warnings
// in that browser completely in favor of doing all that work.
// See https://github.com/facebook/react/issues/11807
q=eq&&!document.documentMode,j=function(e,t,n){if(!ar){var r=ap(n),o=ap(t);o!==r&&(ar=!0,eN("Prop `%s` did not match. Server: %s Client: %s",e,JSON.stringify(o),JSON.stringify(r)))}},F=function(e){if(!ar){ar=!0;var t=[];e.forEach(function(e){t.push(e)}),eN("Extra attributes from the server: %s",t)}},z=function(e,t){!1===t?eN("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",e,e,e):eN("Expected `%s` listener to be a function, instead got a value of `%s` type.",e,typeof t)},// can be used for comparison.
B=function(e,t){// We could have created a separate document here to avoid
// re-initializing custom elements if they exist. But this breaks
// how <noscript> is being handled. So we use the same document.
// See the discussion in https://github.com/facebook/react/pull/11157.
var n=e.namespaceURI===na?e.ownerDocument.createElement(e.tagName):e.ownerDocument.createElementNS(e.namespaceURI,e.tagName);return n.innerHTML=t,n.innerHTML};// It also can turn \u0000 into \uFFFD inside attributes.
// https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
// If we have a mismatch, it might be caused by that.
// We will still patch up in this case but not fire the warning.
var ad=/\r\n?/g,af=/\u0000|\uFFFD/g;function ap(e){return e$(e)&&eN("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.",eV(e)),("string"==typeof e?e:""+e).replace(ad,"\n").replace(af,"")}function ah(e,t,n,r){var o=ap(t),i=ap(e);if(i!==o&&(r&&!ar&&(ar=!0,eN('Text content did not match. Server: "%s" Client: "%s"',i,o)),n))// client rendering, up to the nearest Suspense boundary.
throw Error("Text content does not match server-rendered HTML.")}function am(e){return 9===e.nodeType?e:e.ownerDocument}function ag(){}function av(e){// Mobile Safari does not fire properly bubble click events on
// non-interactive elements, which means delegated click listeners do not
// fire. The workaround for this bug involves attaching an empty click
// listener on the target node.
// https://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
// Just set it using the onclick property so that we don't have to manage any
// bookkeeping for it. Not sure if we need to clear it when the listener is
// removed.
// TODO: Only do this for the relevant Safaris maybe?
e.onclick=ag}function ay(e,t){ar||(ar=!0,eN("Did not expect server HTML to contain a <%s> in <%s>.",t.nodeName.toLowerCase(),e.nodeName.toLowerCase()))}function ab(e,t){ar||(ar=!0,eN('Did not expect server HTML to contain the text node "%s" in <%s>.',t.nodeValue,e.nodeName.toLowerCase()))}function aw(e,t,n){ar||(ar=!0,eN("Expected server HTML to contain a matching <%s> in <%s>.",t,e.nodeName.toLowerCase()))}function a_(e,t){""!==t&&(ar||(ar=!0,eN('Expected server HTML to contain a matching text node for "%s" in <%s>.',t,e.nodeName.toLowerCase())))}var ak=function(){},aS=function(){},ax=["address","applet","area","article","aside","base","basefont","bgsound","blockquote","body","br","button","caption","center","col","colgroup","dd","details","dir","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","img","input","isindex","li","link","listing","main","marquee","menu","menuitem","meta","nav","noembed","noframes","noscript","object","ol","p","param","plaintext","pre","script","section","select","source","style","summary","table","tbody","td","template","textarea","tfoot","th","thead","title","tr","track","ul","wbr","xmp"],aE=["applet","caption","html","table","td","th","marquee","object","template",// TODO: Distinguish by namespace here -- for <title>, including it here
// errs on the side of fewer warnings
"foreignObject","desc","title"],aC=aE.concat(["button"]),aT=["dd","dt","li","option","optgroup","p","rp","rt"],aO={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};aS=function(e,t){var n=tv({},e||aO),r={tag:t};return -1!==aE.indexOf(t)&&(n.aTagInScope=null,n.buttonTagInScope=null,n.nobrTagInScope=null),-1!==aC.indexOf(t)&&(n.pTagInButtonScope=null),-1!==ax.indexOf(t)&&"address"!==t&&"div"!==t&&"p"!==t&&(n.listItemTagAutoclosing=null,n.dlItemTagAutoclosing=null),n.current=r,"form"===t&&(n.formTag=r),"a"===t&&(n.aTagInScope=r),"button"===t&&(n.buttonTagInScope=r),"nobr"===t&&(n.nobrTagInScope=r),"p"===t&&(n.pTagInButtonScope=r),"li"===t&&(n.listItemTagAutoclosing=r),("dd"===t||"dt"===t)&&(n.dlItemTagAutoclosing=r),n};/**
   * Returns whether
   */var aR=function(e,t){// First, let's check if we're in an unusual parsing mode...
switch(t){// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inselect
case"select":return"option"===e||"optgroup"===e||"#text"===e;case"optgroup":return"option"===e||"#text"===e;// Strictly speaking, seeing an <option> doesn't mean we're in a <select>
// but
case"option":return"#text"===e;// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intd
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incaption
// No special behavior since these rules fall back to "in body" mode for
// all except special table nodes which cause bad parsing behavior anyway.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intr
case"tr":return"th"===e||"td"===e||"style"===e||"script"===e||"template"===e;// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intbody
case"tbody":case"thead":case"tfoot":return"tr"===e||"style"===e||"script"===e||"template"===e;// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-incolgroup
case"colgroup":return"col"===e||"template"===e;// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-intable
case"table":return"caption"===e||"colgroup"===e||"tbody"===e||"tfoot"===e||"thead"===e||"style"===e||"script"===e||"template"===e;// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inhead
case"head":return"base"===e||"basefont"===e||"bgsound"===e||"link"===e||"meta"===e||"title"===e||"noscript"===e||"noframes"===e||"style"===e||"script"===e||"template"===e;// https://html.spec.whatwg.org/multipage/semantics.html#the-html-element
case"html":return"head"===e||"body"===e||"frameset"===e;case"frameset":return"frame"===e;case"#document":return"html"===e}// Probably in the "in body" parsing mode, so we outlaw only tag combos
// where the parsing rules cause implicit opens or closes to be added.
// https://html.spec.whatwg.org/multipage/syntax.html#parsing-main-inbody
switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return"h1"!==t&&"h2"!==t&&"h3"!==t&&"h4"!==t&&"h5"!==t&&"h6"!==t;case"rp":case"rt":return -1===aT.indexOf(t);case"body":case"caption":case"col":case"colgroup":case"frameset":case"frame":case"head":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":// These tags are only valid with a few parents that have special child
// parsing rules -- if we're down here, then none of those matched and
// so we allow it only if we don't know what the parent is, as all other
// cases are invalid.
return null==t}return!0},aP=function(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":// Spec says something about storing a list of markers, but it sounds
// equivalent to this check.
return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null},aI={};ak=function(e,t,n){var r=(n=n||aO).current,o=r&&r.tag;null!=t&&(null!=e&&eN("validateDOMNesting: when childText is passed, childTag should be null"),e="#text");var i=aR(e,o)?null:r,a=i?null:aP(e,n),s=i||a;if(s){var u=s.tag,l=!!i+"|"+e+"|"+u;if(!aI[l]){aI[l]=!0;var c=e,d="";if("#text"===e?/\S/.test(t)?c="Text nodes":(c="Whitespace text nodes",d=" Make sure you don't have any extra whitespace between tags on each line of your source code."):c="<"+e+">",i){var f="";"table"===u&&"tr"===e&&(f+=" Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."),eN("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s",c,u,d,f)}else eN("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.",c,u)}}};var aD="suppressHydrationWarning",aM=null,aN=null;function aL(e,t){return"textarea"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}// if a component just imports ReactDOM (e.g. for findDOMNode).
// Some environments might not have setTimeout or clearTimeout.
var aA="function"==typeof setTimeout?setTimeout:void 0,aU="function"==typeof clearTimeout?clearTimeout:void 0,aj="function"==typeof Promise?Promise:void 0,aF="function"==typeof queueMicrotask?queueMicrotask:void 0!==aj?function(e){return aj.resolve(null).then(e).catch(az)}:aA;function az(e){setTimeout(function(){throw e})}// -------------------
function aq(e,t){var n=t,r=0;// Delete all nodes within this suspense boundary.
do{var o=n.nextSibling;if(e.removeChild(n),o&&8===o.nodeType){var i=o.data;if("/$"===i){if(0===r){e.removeChild(o),oE(t);return}r--}else("$"===i||"$?"===i||"$!"===i)&&r++}n=o}while(n)// TODO: Warn, we didn't find the end comment boundary.
// Retry if any event replaying was blocked on this.
oE(t)}function aB(e){return"$?"===e.data}function aV(e){return"$!"===e.data}function a$(e){// Skip non-hydratable nodes.
for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){var n=e.data;if("$"===n||"$!"===n||"$?"===n)break;if("/$"===n)return null}}return e}function aW(e){return a$(e.nextSibling)}// SuspenseInstance. I.e. if its previous sibling is a Comment with
// SUSPENSE_x_START_DATA. Otherwise, null.
function aH(e){for(var t=e.previousSibling,n=0;t;){if(8===t.nodeType){var r=t.data;if("$"===r||"$!"===r||"$?"===r){if(0===n)return t;n--}else"/$"===r&&n++}t=t.previousSibling}return null}var aY=Math.random().toString(36).slice(2),aQ="__reactFiber$"+aY,aK="__reactProps$"+aY,aG="__reactContainer$"+aY,aX="__reactEvents$"+aY,aJ="__reactListeners$"+aY,aZ="__reactHandles$"+aY;// If the target node is part of a hydrated or not yet rendered subtree, then
// this may also return a SuspenseComponent or HostRoot to indicate that.
// Conceptually the HostRoot fiber is a child of the Container node. So if you
// pass the Container node as the targetNode, you will not actually get the
// HostRoot back. To get to the HostRoot, you need to pass a child of it.
// The same thing applies to Suspense boundaries.
function a0(e){var t=e[aQ];if(t)return t;for(// If the direct event target isn't a React owned DOM node, we need to look
// to see if one of its parents is a React owned DOM node.
var n=e.parentNode;n;){if(// We'll check if this is a container root that could include
// React nodes in the future. We need to check this first because
// if we're a child of a dehydrated container, we need to first
// find that inner container before moving on to finding the parent
// instance. Note that we don't check this field on  the targetNode
// itself because the fibers are conceptually between the container
// node and the first child. It isn't surrounding the container node.
// If it's not a container, we check if it's an instance.
t=n[aG]||n[aQ]){// Since this wasn't the direct target of the event, we might have
// stepped past dehydrated DOM nodes to get here. However they could
// also have been non-React nodes. We need to answer which one.
// If we the instance doesn't have any children, then there can't be
// a nested suspense boundary within it. So we can use this as a fast
// bailout. Most of the time, when people add non-React children to
// the tree, it is using a ref to a child-less DOM node.
// Normally we'd only need to check one of the fibers because if it
// has ever gone from having children to deleting them or vice versa
// it would have deleted the dehydrated boundary nested inside already.
// However, since the HostRoot starts out with an alternate it might
// have one on the alternate so we need to check in case this was a
// root.
var r=t.alternate;if(null!==t.child||null!==r&&null!==r.child)for(// Next we need to figure out if the node that skipped past is
// nested within a dehydrated boundary and if so, which one.
var o=aH(e);null!==o;){// We found a suspense instance. That means that we haven't
// hydrated it yet. Even though we leave the comments in the
// DOM after hydrating, and there are boundaries in the DOM
// that could already be hydrated, we wouldn't have found them
// through this pass since if the target is hydrated it would
// have had an internalInstanceKey on it.
// Let's get the fiber associated with the SuspenseComponent
// as the deepest instance.
var i=o[aQ];if(i)return i;// If we don't find a Fiber on the comment, it might be because
// we haven't gotten to hydrate it yet. There might still be a
// parent boundary that hasn't above this one so we need to find
// the outer most that is known.
o=aH(o);// If we don't find one, then that should mean that the parent
// host component also hasn't hydrated yet. We can return it
// below since it will bail out on the isMounted check later.
}return t}n=(e=n).parentNode}return null}/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */function a1(e){var t=e[aQ]||e[aG];return t&&(5===t.tag||6===t.tag||13===t.tag||3===t.tag)?t:null}/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */function a2(e){if(5===e.tag||6===e.tag)// a host component or host text.
return e.stateNode;// Without this first invariant, passing a non-DOM-component triggers the next
// invariant for a missing parent, which is super confusing.
throw Error("getNodeFromInstance: Invalid argument.")}function a3(e){return e[aK]||null}var a4={},a6=eI.ReactDebugCurrentFrame;function a5(e){if(e){var t=e._owner,n=function e(t,n,r){if(null==t)return"";if("function"==typeof t)return tS(t,!!((o=t.prototype)&&o.isReactComponent));if("string"==typeof t)return t_(t);switch(t){case tc:return t_("Suspense");case td:return t_("SuspenseList")}if("object"==typeof t)switch(t.$$typeof){case tl:return tS(t.render,!1);case tf:// Memo may contain any component type so we recursively resolve it.
return e(t.type,n,r);case tp:var o,i=t._payload,a=t._init;try{// Lazy may contain any component type so we recursively resolve it.
return e(a(i),n,r)}catch(e){}}return""}(e.type,e._source,t?t.type:null);a6.setExtraStackFrame(n)}else a6.setExtraStackFrame(null)}function a8(e,t,n,r,o){// $FlowFixMe This is okay but Flow doesn't know it.
var i=Function.call.bind(eB);for(var a in e)if(i(e,a)){var s=void 0;// Prop type validation may throw. In case they do, we don't want to
// fail the render phase where it didn't fail before. So we log it.
// After these have been cleaned up, we'll let them throw.
try{// This is intentionally an invariant that gets caught. It's the same
// behavior as without this statement except with a better message.
if("function"!=typeof e[a]){// eslint-disable-next-line react-internal/prod-error-codes
var u=Error((r||"React class")+": "+n+" type `"+a+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[a]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw u.name="Invariant Violation",u}s=e[a](t,a,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(e){s=e}!s||s instanceof Error||(a5(o),eN("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,a,typeof s),a5(null)),s instanceof Error&&!(s.message in a4)&&(// Only monitor this failure once because there tends to be a lot of the
// same error.
a4[s.message]=!0,a5(o),eN("Failed %s type: %s",n,s.message),a5(null))}}var a7=[];V=[];var a9=-1;function se(e){return{current:e}}function st(e,t){if(a9<0){eN("Unexpected pop.");return}t!==V[a9]&&eN("Unexpected Fiber popped."),e.current=a7[a9],a7[a9]=null,V[a9]=null,a9--}function sn(e,t,n){a7[++a9]=e.current,V[a9]=n,e.current=t}$={};var sr={};Object.freeze(sr);var so=se(sr),si=se(!1),sa=sr;// A cursor to a boolean indicating whether the context has changed.
function ss(e,t,n){return n&&sd(t)?sa:so.current}function su(e,t,n){var r=e.stateNode;r.__reactInternalMemoizedUnmaskedChildContext=t,r.__reactInternalMemoizedMaskedChildContext=n}function sl(e,t){var n=e.type.contextTypes;if(!n)return sr;// Avoid recreating masked context unless unmasked context has changed.
// Failing to do this will result in unnecessary calls to componentWillReceiveProps.
// This may trigger infinite loops if componentWillReceiveProps calls setState.
var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var o={};for(var i in n)o[i]=t[i];return a8(n,o,"context",tO(e)||"Unknown"),r&&su(e,t,o),o}function sc(){return si.current}function sd(e){return null!=e.childContextTypes}function sf(e){st(si,e),st(so,e)}function sp(e){st(si,e),st(so,e)}function sh(e,t,n){if(so.current!==sr)throw Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");sn(so,t,e),sn(si,n,e)}function sm(e,t,n){var r=e.stateNode,o=t.childContextTypes;// It has only been added in Fiber to match the (unintentional) behavior in Stack.
if("function"!=typeof r.getChildContext){var i=tO(e)||"Unknown";return $[i]||($[i]=!0,eN("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.",i,i)),n}var a=r.getChildContext();for(var s in a)if(!(s in o))throw Error((tO(e)||"Unknown")+'.getChildContext(): key "'+s+'" is not defined in childContextTypes.');return a8(o,a,"child context",tO(e)||"Unknown"),tv({},n,a)}function sg(e){var t=e.stateNode,n=t&&t.__reactInternalMemoizedMergedChildContext||sr;// We push the context as early as possible to ensure stack integrity.
return(// Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
sa=so.current,sn(so,n,e),sn(si,si.current,e),!0)}function sv(e,t,n){var r=e.stateNode;if(!r)throw Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");if(n){// Merge parent and own context.
// Skip this if we're not updating due to sCU.
// This avoids unnecessarily recomputing memoized values.
var o=sm(e,t,sa);r.__reactInternalMemoizedMergedChildContext=o,// It is important to unwind the context in the reverse order.
st(si,e),st(so,e),sn(so,o,e),sn(si,n,e)}else st(si,e),sn(si,n,e)}var sy=null,sb=!1,sw=!1;function s_(e){// Push this callback into an internal queue. We'll flush these either in
// the next tick, or earlier if something calls `flushSyncCallbackQueue`.
null===sy?sy=[e]:// we already scheduled one when we created the queue.
sy.push(e)}function sk(){if(!sw&&null!==sy){// Prevent re-entrance.
sw=!0;var e=0,t=oa;try{var n=sy;// TODO: Is this necessary anymore? The only user code that runs in this
for(oa=1;e<n.length;e++){var r=n[e];do r=r(!0);while(null!==r)}sy=null,sb=!1}catch(t){throw null!==sy&&(sy=sy.slice(e+1)),// Resume flushing in the next tick
rw(rC,sk),t}finally{oa=t,sw=!1}}return null}// TODO: Use the unified fiber stack module instead of this local one?
// Intentionally not using it yet to derisk the initial implementation, because
// the way we push/pop these values is a bit unusual. If there's a mistake, I'd
// rather the ids be wrong than crash the whole reconciler.
var sS=[],sx=0,sE=null,sC=0,sT=[],sO=0,sR=null,sP=1,sI="";function sD(e,t){// This is called right after we reconcile an array (or iterator) of child
// fibers, because that's the only place where we know how many children in
// the whole set without doing extra work later, or storing addtional
// information on the fiber.
//
// That's why this function is separate from pushTreeId — it's called during
// the render phase of the fork parent, not the child, which is where we push
// the other context values.
//
// In the Fizz implementation this is much simpler because the child is
// rendered in the same callstack as the parent.
//
// It might be better to just add a `forks` field to the Fiber type. It would
// make this module simpler.
sU(),sS[sx++]=sC,sS[sx++]=sE,sE=e,sC=t}function sM(e,t,n){sU(),sT[sO++]=sP,sT[sO++]=sI,sT[sO++]=sR,sR=e;var r=sP,o=sI,i=sL(r)-1,a=r&~(1<<i),s=n+1,u=sL(t)+i;// consideration the leading 1 we use to mark the end of the sequence.
if(u>30){// We overflowed the bitwise-safe range. Fall back to slower algorithm.
// This branch assumes the length of the base id is greater than 5; it won't
// work for smaller ids, because you need 5 bits per character.
//
// We encode the id in multiple steps: first the base id, then the
// remaining digits.
//
// Each 5 bit sequence corresponds to a single base 32 character. So for
// example, if the current id is 23 bits long, we can convert 20 of those
// bits into a string of 4 characters, with 3 bits left over.
//
// First calculate how many bits in the base id represent a complete
// sequence of characters.
var l=i-i%5,c=(a&(1<<l)-1).toString(32),d=i-l;// Then create a bitmask that selects only those bits.
sP=1<<sL(t)+d|(s<<d|a>>l),sI=c+o}else sP=1<<u|(s<<i|a),sI=o}function sN(e){sU(),null!==e.return&&(sD(e,1),sM(e,1,0))}function sL(e){return 32-rK(e)}function sA(e){// Restore the previous values.
// This is a bit more complicated than other context-like modules in Fiber
// because the same Fiber may appear on the stack multiple times and for
// different reasons. We have to keep popping until the work-in-progress is
// no longer at the top of the stack.
for(;e===sE;)sE=sS[--sx],sS[sx]=null,sC=sS[--sx],sS[sx]=null;for(;e===sR;)sR=sT[--sO],sT[sO]=null,sI=sT[--sO],sT[sO]=null,sP=sT[--sO],sT[sO]=null}function sU(){sz||eN("Expected to be hydrating. This is a bug in React. Please file an issue.")}// This may have been an insertion or a hydration.
var sj=null,sF=null,sz=!1,sq=!1,sB=null;function sV(e,t){switch(e.tag){case 3:var n;n=e.stateNode.containerInfo,1===t.nodeType?ay(n,t):8===t.nodeType||ab(n,t);break;case 5:var r,o,i=(/*                 */1&e.mode)!=/*                         */0;e.type,r=e.memoizedProps,o=e.stateNode,(i||!0!==r[aD])&&(1===t.nodeType?ay(o,t):8===t.nodeType||ab(o,t));break;case 13:var a,s=e.memoizedState;null!==s.dehydrated&&null!==(a=s.dehydrated.parentNode)&&(1===t.nodeType?ay(a,t):8===t.nodeType||ab(a,t))}}function s$(e,t){sV(e,t);var n,r=((n=ph(5,null,null,0)).elementType="DELETED",n);r.stateNode=t,r.return=e;var o=e.deletions;null===o?(e.deletions=[r],e.flags|=/*                */16):o.push(r)}function sW(e,t){if(!sq)switch(e.tag){case 3:var n=e.stateNode.containerInfo;switch(t.tag){case 5:var r=t.type;t.pendingProps,aw(n,r);break;case 6:a_(n,t.pendingProps)}break;case 5:e.type;var o=e.memoizedProps,i=e.stateNode;switch(t.tag){case 5:var a=t.type;t.pendingProps,((1&e.mode)!=0||!0!==o[aD])&&aw(i,a);break;case 6:var s=t.pendingProps;((1&e.mode)!=0||!0!==o[aD])&&a_(i,s)}break;case 13:var u=e.memoizedState.dehydrated;if(null!==u)switch(t.tag){case 5:var l,c=t.type;t.pendingProps,null!==(l=u.parentNode)&&aw(l,c);break;case 6:var d,f=t.pendingProps;null!==(d=u.parentNode)&&a_(d,f)}break;default:return}}function sH(e,t){t.flags=-4097&t.flags|/*                    */2,sW(e,t)}function sY(e,t){switch(e.tag){case 5:var n=e.type;e.pendingProps;var r=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t;if(null!==r)return e.stateNode=r,sj=e,sF=a$(r.firstChild),!0;return!1;case 6:var o=""===e.pendingProps||3!==t.nodeType?null:t;if(null!==o)return e.stateNode=o,sj=e,sF=null,!0;return!1;case 13:var i=8!==t.nodeType?null:t;if(null!==i){var a,s={dehydrated:i,treeContext:(sU(),null!==sR)?{id:sP,overflow:sI}:null,retryLane:1073741824};e.memoizedState=s;// This simplifies the code for getHostSibling and deleting nodes,
// since it doesn't have to consider all Suspense boundaries and
// check if they're dehydrated ones or not.
var u=((a=ph(18,null,null,0)).stateNode=i,a);return u.return=e,e.child=u,sj=e,// it during the first pass. Instead, we'll reenter it later.
sF=null,!0}return!1;default:return!1}}function sQ(e){return(1&e.mode)!=0&&(/*                   */128&e.flags)==0}function sK(e){throw Error("Hydration failed because the initial UI does not match what was rendered on the server.")}function sG(e){if(sz){var t=sF;if(!t){sQ(e)&&(sW(sj,e),sK()),sH(sj,e),sz=!1,sj=e;return}var n=t;if(!sY(e,t)){sQ(e)&&(sW(sj,e),sK()),// We use this as a heuristic. It's based on intuition and not data so it
// might be flawed or unnecessary.
t=aW(n);var r=sj;if(!t||!sY(e,t)){// Nothing to hydrate. Make it an insertion.
sH(sj,e),sz=!1,sj=e;return}// We matched the next one, we'll now assume that the first one was
// superfluous and we'll delete it. Since we can't eagerly delete it
// we'll have to schedule a deletion. To do that, this node needs a dummy
// fiber associated with it.
s$(r,n)}}}function sX(e){for(var t=e.return;null!==t&&5!==t.tag&&3!==t.tag&&13!==t.tag;)t=t.return;sj=t}function sJ(e){if(e!==sj)// tree.
return!1;if(!sz)return(// If we're not currently hydrating but we're in a hydration context, then
// we were an insertion and now need to pop up reenter hydration of our
// siblings.
sX(e),sz=!0,!1);// If we have any remaining hydratable nodes, we need to delete them now.
// We only do this deeper than head and body since they tend to have random
// other nodes in them. We also ignore components with pure text content in
// side of them. We also don't delete anything inside the root container.
if(3!==e.tag&&(5!==e.tag||"head"!==(t=e.type)&&"body"!==t&&!aL(e.type,e.memoizedProps))){var t,n=sF;if(n){if(sQ(e))sZ(e),sK();else for(;n;)s$(e,n),n=aW(n)}}return sX(e),sF=13===e.tag?function(e){var t=e.memoizedState,n=null!==t?t.dehydrated:null;if(!n)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");return function(e){for(var t=e.nextSibling,n=0;t;){if(8===t.nodeType){var r=t.data;if("/$"===r){if(0===n)return aW(t);n--}else("$"===r||"$!"===r||"$?"===r)&&n++}t=t.nextSibling}// TODO: Warn, we didn't find the end comment boundary.
return null}// Returns the SuspenseInstance if this node is a direct child of a
(n)}(e):sj?aW(e.stateNode):null,!0}function sZ(e){for(var t=sF;t;)sV(e,t),t=aW(t)}function s0(){sj=null,sF=null,sz=!1,sq=!1}function s1(){null!==sB&&(// Successfully completed a forced client render. The errors that occurred
// during the hydration attempt are now recovered. We will log them in
// commit phase, once the entire tree has finished.
fU(sB),sB=null)}function s2(e){null===sB?sB=[e]:sB.push(e)}var s3=eI.ReactCurrentBatchConfig,s4={recordUnsafeLifecycleWarnings:function(e,t){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(e,t){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}},s6=function(e){for(var t=null,n=e;null!==n;)/*               */8&n.mode&&(t=n),n=n.return;return t},s5=function(e){var t=[];return e.forEach(function(e){t.push(e)}),t.sort().join(", ")},s8=[],s7=[],s9=[],ue=[],ut=[],un=[],ur=new Set;s4.recordUnsafeLifecycleWarnings=function(e,t){// Dedupe strategy: Warn once per component.
!ur.has(e.type)&&("function"==typeof t.componentWillMount&&// Don't warn about react-lifecycles-compat polyfilled components.
!0!==t.componentWillMount.__suppressDeprecationWarning&&s8.push(e),8&e.mode&&"function"==typeof t.UNSAFE_componentWillMount&&s7.push(e),"function"==typeof t.componentWillReceiveProps&&!0!==t.componentWillReceiveProps.__suppressDeprecationWarning&&s9.push(e),8&e.mode&&"function"==typeof t.UNSAFE_componentWillReceiveProps&&ue.push(e),"function"==typeof t.componentWillUpdate&&!0!==t.componentWillUpdate.__suppressDeprecationWarning&&ut.push(e),8&e.mode&&"function"==typeof t.UNSAFE_componentWillUpdate&&un.push(e))},s4.flushPendingUnsafeLifecycleWarnings=function(){// We do an initial pass to gather component names
var e=new Set;s8.length>0&&(s8.forEach(function(t){e.add(tO(t)||"Component"),ur.add(t.type)}),s8=[]);var t=new Set;s7.length>0&&(s7.forEach(function(e){t.add(tO(e)||"Component"),ur.add(e.type)}),s7=[]);var n=new Set;s9.length>0&&(s9.forEach(function(e){n.add(tO(e)||"Component"),ur.add(e.type)}),s9=[]);var r=new Set;ue.length>0&&(ue.forEach(function(e){r.add(tO(e)||"Component"),ur.add(e.type)}),ue=[]);var o=new Set;ut.length>0&&(ut.forEach(function(e){o.add(tO(e)||"Component"),ur.add(e.type)}),ut=[]);var i=new Set;un.length>0&&(un.forEach(function(e){i.add(tO(e)||"Component"),ur.add(e.type)}),un=[]),t.size>0&&eN("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s",s5(t)),r.size>0&&eN("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n\nPlease update the following components: %s",s5(r)),i.size>0&&eN("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s",s5(i)),e.size>0&&eM("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",s5(e)),n.size>0&&eM("componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",s5(n)),o.size>0&&eM("componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",s5(o))};var uo=new Map,ui=new Set;// Tracks components we have already warned about.
function ua(e,t){if(e&&e.defaultProps){// Resolve default props. Taken from ReactElement
var n=tv({},t),r=e.defaultProps;for(var o in r)void 0===n[o]&&(n[o]=r[o]);return n}return t}s4.recordLegacyContextWarning=function(e,t){var n=s6(e);if(null===n){eN("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");return}// Dedup strategy: Warn once per component.
if(!ui.has(e.type)){var r=uo.get(n);(null!=e.type.contextTypes||null!=e.type.childContextTypes||null!==t&&"function"==typeof t.getChildContext)&&(void 0===r&&(r=[],uo.set(n,r)),r.push(e))}},s4.flushLegacyContextWarning=function(){uo.forEach(function(e,t){if(0!==e.length){var n=e[0],r=new Set;e.forEach(function(e){r.add(tO(e)||"Component"),ui.add(e.type)});var o=s5(r);try{tL(n),eN("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://reactjs.org/link/legacy-context",o)}finally{tN()}}})},s4.discardPendingWarnings=function(){s8=[],s7=[],s9=[],ue=[],ut=[],un=[],uo=new Map};var us=se(null);// Use this to detect multiple renderers using the same context
W={};var uu=null,ul=null,uc=null,ud=!1;function uf(){// This is called right before React yields execution, to ensure `readContext`
// cannot be called outside the render phase.
uu=null,ul=null,uc=null,ud=!1}function up(e,t,n){sn(us,t._currentValue,e),t._currentValue=n,void 0!==t._currentRenderer&&null!==t._currentRenderer&&t._currentRenderer!==W&&eN("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=W}function uh(e,t){var n=us.current;st(us,t),e._currentValue=n}function um(e,t,n){for(// Update the child lanes of all the ancestors, including the alternates.
var r=e;null!==r;){var o=r.alternate;if((r.childLanes&t)===t?null!==o&&(o.childLanes&t)!==t&&(o.childLanes=o.childLanes|t):(r.childLanes=r.childLanes|t,null!==o&&(o.childLanes=o.childLanes|t)),r===n)break;r=r.return}r!==n&&eN("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function ug(e,t){uu=e,ul=null,uc=null;var n=e.dependencies;null!==n&&null!==n.firstContext&&((n.lanes&t)!=0&&(cW=!0),// Reset the work-in-progress list
n.firstContext=null)}function uv(e){// This warning would fire if you read context inside a Hook like useMemo.
// Unlike the class check below, it's not enforced in production for perf.
ud&&eN("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");var t=e._currentValue;if(uc===e);else{var n={context:e,memoizedValue:t,next:null};if(null===ul){if(null===uu)throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");// This is the first dependency for this component. Create a new list.
ul=n,uu.dependencies={lanes:0,firstContext:n}}else ul=ul.next=n}return t}// render. When this render exits, either because it finishes or because it is
// interrupted, the interleaved updates will be transferred onto the main part
// of the queue.
var uy=null;function ub(e){null===uy?uy=[e]:uy.push(e)}function uw(e,t,n,r){var o=t.interleaved;return null===o?(// This is the first update. Create a circular list.
n.next=n,// be transferred to the pending queue.
ub(t)):(n.next=o.next,o.next=n),t.interleaved=n,u_(e,r)}function u_(e,t){// Update the source fiber's lanes
e.lanes=e.lanes|t;var n=e.alternate;null!==n&&(n.lanes=n.lanes|t),null===n&&(4098&e.flags)!=0&&pe(e);for(var r=e,o=e.return;null!==o;)(o.childLanes=o.childLanes|t,null!==(n=o.alternate))?n.childLanes=n.childLanes|t:(4098&o.flags)!=0&&pe(e),r=o,o=o.return;return 3===r.tag?r.stateNode:null}var uk=!1;function uS(e){var t={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null};e.updateQueue=t}function ux(e,t){// Clone the update queue from current. Unless it's already a clone.
var n=t.updateQueue,r=e.updateQueue;if(n===r){var o={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects};t.updateQueue=o}}function uE(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function uC(e,t,n){var r,o=e.updateQueue;if(null===o)return null;var i=o.shared;if(Y!==i||H||(eN("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."),H=!0),(/*                */2&d5)!=/*             */0){// This is an unsafe render phase update. Add directly to the update
// queue so we can process it immediately during the current render.
var a=i.pending;// this fiber. This is for backwards compatibility in the case where you
// update a different component during render phase than the one that is
// currently renderings (a pattern that is accompanied by a warning).
return null===a?t.next=t:(t.next=a.next,a.next=t),i.pending=t,u_(e,n)}return null===(r=i.interleaved)?(// This is the first update. Create a circular list.
t.next=t,// be transferred to the pending queue.
ub(i)):(t.next=r.next,r.next=t),i.interleaved=t,u_(e,n)}function uT(e,t,n){var r=t.updateQueue;if(null!==r){var o=r.shared;if(r5(n)){var i=o.lanes,a=// have finished. We can remove them from the shared queue, which represents
// a superset of the actually pending lanes. In some cases we may entangle
// more than we need to, but that's OK. In fact it's worse if we *don't*
// entangle when we should.
(i&=e.pendingLanes)|n;// If any entangled lanes are no longer pending on the root, then they must
o.lanes=a,// the lane finished since the last time we entangled it. So we need to
// entangle it again, just to be sure.
or(e,a)}}}function uO(e,t){// Captured updates are updates that are thrown by a child during the render
// phase. They should be discarded if the render is aborted. Therefore,
// we should only put them on the work-in-progress queue, not the current one.
var n=e.updateQueue,r=e.alternate;// Check if the work-in-progress queue is a clone.
if(null!==r){var o=r.updateQueue;if(n===o){// The work-in-progress queue is the same as current. This happens when
// we bail out on a parent fiber that then captures an error thrown by
// a child. Since we want to append the update only to the work-in
// -progress queue, we need to clone the updates. We usually clone during
// processUpdateQueue, but that didn't happen in this case because we
// skipped over the parent when we bailed out.
var i=null,a=null,s=n.firstBaseUpdate;if(null!==s){// Loop through the updates and clone them.
var u=s;do{var l={eventTime:u.eventTime,lane:u.lane,tag:u.tag,payload:u.payload,callback:u.callback,next:null};null===a?i=a=l:(a.next=l,a=l),u=u.next}while(null!==u)// Append the captured update the end of the cloned list.
null===a?i=a=t:(a.next=t,a=t)}else i=a=t;n={baseState:o.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:o.shared,effects:o.effects},e.updateQueue=n;return}}// Append the update to the end of the list.
var c=n.lastBaseUpdate;null===c?n.firstBaseUpdate=t:c.next=t,n.lastBaseUpdate=t}function uR(e,t,n,r){// This is always non-null on a ClassComponent or HostRoot
var o=e.updateQueue;uk=!1,Y=o.shared;var i=o.firstBaseUpdate,a=o.lastBaseUpdate,s=o.shared.pending;if(null!==s){o.shared.pending=null;// and last so that it's non-circular.
var u=s,l=u.next;u.next=null,null===a?i=l:a.next=l,a=u;// we need to transfer the updates to that queue, too. Because the base
// queue is a singly-linked list with no cycles, we can append to both
// lists and take advantage of structural sharing.
// TODO: Pass `current` as argument
var c=e.alternate;if(null!==c){// This is always non-null on a ClassComponent or HostRoot
var d=c.updateQueue,f=d.lastBaseUpdate;f!==a&&(null===f?d.firstBaseUpdate=l:f.next=l,d.lastBaseUpdate=u)}}// These values may change as we process the queue.
if(null!==i){for(// Iterate through the list of updates to compute the result.
var p,h=o.baseState,m=0,g=null,v=null,y=null,b=i;;){var w=b.lane,_=b.eventTime;if((r&w)===w){// This update does have sufficient priority.
if(null!==y){var k={eventTime:_,// This update is going to be committed so we never want uncommit
// it. Using NoLane works because 0 is a subset of all bitmasks, so
// this will never be skipped by the check above.
lane:0,tag:b.tag,payload:b.payload,callback:b.callback,next:null};y=y.next=k}// Process this update.
if(h=function(e,t,n,r,o,i){switch(n.tag){case 1:var a=n.payload;if("function"==typeof a){ud=!0;var s=a.call(i,r,o);if(8&e.mode){rj(!0);try{a.call(i,r,o)}finally{rj(!1)}}return ud=!1,s}// State object
return a;case 3:e.flags=-65537&e.flags|128;// Intentional fallthrough
case 0:var u,l=n.payload;if("function"==typeof l){if(ud=!0,u=l.call(i,r,o),8&e.mode){rj(!0);try{l.call(i,r,o)}finally{rj(!1)}}ud=!1}else u=l;if(null==u)break;// Merge the partial state and the previous state.
return tv({},r,u);case 2:uk=!0}return r}(e,0,b,h,t,n),null!==b.callback&&// If the update was already committed, we should not queue its
// callback again.
0!==b.lane){e.flags|=/*                     */64;var S=o.effects;null===S?o.effects=[b]:S.push(b)}}else{// Priority is insufficient. Skip this update. If this is the first
// skipped update, the previous update/state is the new base
// update/state.
var x={eventTime:_,lane:w,tag:b.tag,payload:b.payload,callback:b.callback,next:null};null===y?(v=y=x,g=h):y=y.next=x,// Update the remaining priority in the queue.
m|=w}if(null===(b=b.next)){if(null===(s=o.shared.pending))break;// An update was scheduled from inside a reducer. Add the new
// pending updates to the end of the list and keep processing.
var E=s,C=E.next;// Intentionally unsound. Pending updates form a circular list, but we
E.next=null,b=C,o.lastBaseUpdate=E,o.shared.pending=null}}null===y&&(g=h),o.baseState=g,o.firstBaseUpdate=v,o.lastBaseUpdate=y;// process them during this render, but we do need to track which lanes
// are remaining.
var T=o.shared.interleaved;if(null!==T){var O=T;do m|=O.lane,O=O.next;while(O!==T)}else null===i&&// zero once the queue is empty.
(o.shared.lanes=0);fi|=p=m,e.lanes=m,e.memoizedState=h}Y=null}function uP(e,t,n){// Commit the effects
var r=t.effects;if(t.effects=null,null!==r)for(var o=0;o<r.length;o++){var i=r[o],a=i.callback;null!==a&&(i.callback=null,function(e,t){if("function"!=typeof e)throw Error("Invalid argument passed as callback. Expected a function. Instead received: "+e);e.call(t)}(a,n))}}H=!1,Y=null;var uI={},uD=new eR.Component().refs;// React.Component uses a shared frozen object by default.
Q=new Set,K=new Set,G=new Set,X=new Set,et=new Set,J=new Set,en=new Set,er=new Set;var uM=new Set;function uN(e,t,n,r){var o=e.memoizedState,i=n(r,o);if(8&e.mode){rj(!0);try{// Invoke the function an extra time to help detect side-effects.
i=n(r,o)}finally{rj(!1)}}Z(t,i);var a=null==i?o:tv({},o,i);e.memoizedState=a,0===e.lanes&&(e.updateQueue.baseState=a)}ee=function(e,t){if(null!==e&&"function"!=typeof e){var n=t+"_"+e;uM.has(n)||(uM.add(n),eN("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e))}},Z=function(e,t){if(void 0===t){var n=tC(e)||"Component";J.has(n)||(J.add(n),eN("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",n))}},// it causes problems. This is meant to give a nicer error message for
// ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
// ...)) which otherwise throws a "_processChildContext is not a function"
// exception.
Object.defineProperty(uI,"_processChildContext",{enumerable:!1,value:function(){throw Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).")}}),Object.freeze(uI);var uL={isMounted:function(e){var t=rp.current;if(null!==t&&1===t.tag){var n=t.stateNode;n._warnedAboutRefsInRender||eN("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",tO(t)||"A component"),n._warnedAboutRefsInRender=!0}var r=rf(e);return!!r&&rh(r)===r},enqueueSetState:function(e,t,n){var r=rf(e),o=fI(),i=fD(r),a=uE(o,i);a.payload=t,null!=n&&(ee(n,"setState"),a.callback=n);var s=uC(r,a,i);null!==s&&(fM(s,r,i,o),uT(s,r,i)),rQ(r,i)},enqueueReplaceState:function(e,t,n){var r=rf(e),o=fI(),i=fD(r),a=uE(o,i);a.tag=1,a.payload=t,null!=n&&(ee(n,"replaceState"),a.callback=n);var s=uC(r,a,i);null!==s&&(fM(s,r,i,o),uT(s,r,i)),rQ(r,i)},enqueueForceUpdate:function(e,t){var n=rf(e),r=fI(),o=fD(n),i=uE(r,o);i.tag=2,null!=t&&(ee(t,"forceUpdate"),i.callback=t);var a=uC(n,i,o);null!==a&&(fM(a,n,o,r),uT(a,n,o)),null!==rL&&"function"==typeof rL.markForceUpdateScheduled&&rL.markForceUpdateScheduled(n,o)}};function uA(e,t,n,r,o,i,a){var s=e.stateNode;if("function"==typeof s.shouldComponentUpdate){var u=s.shouldComponentUpdate(r,i,a);if(8&e.mode){rj(!0);try{// Invoke the function an extra time to help detect side-effects.
u=s.shouldComponentUpdate(r,i,a)}finally{rj(!1)}}return void 0===u&&eN("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",tC(t)||"Component"),u}return!t.prototype||!t.prototype.isPureReactComponent||!iO(n,r)||!iO(o,i)}function uU(e,t){t.updater=uL,e.stateNode=t,t._reactInternals=e,t._reactInternalInstance=uI}function uj(e,t,n){var r=!1,o=sr,i=sr,a=t.contextType;if("contextType"in t&&!(null===a||void 0!==a&&a.$$typeof===tu&&void 0===a._context)&&!er.has(t)){er.add(t);var s="";s=void 0===a?" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":"object"!=typeof a?" However, it is set to a "+typeof a+".":a.$$typeof===ts?" Did you accidentally pass the Context.Provider instead?":void 0!==a._context?" Did you accidentally pass the Context.Consumer instead?":" However, it is set to an object with keys {"+Object.keys(a).join(", ")+"}.",eN("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",tC(t)||"Component",s)}"object"==typeof a&&null!==a?i=uv(a):(o=ss(e,t,!0),i=(r=null!=t.contextTypes)?sl(e,o):sr);var u=new t(n,i);// Instantiate twice to help detect side-effects.
if(8&e.mode){rj(!0);try{u=new t(n,i);// eslint-disable-line no-new
}finally{rj(!1)}}var l=e.memoizedState=null!==u.state&&void 0!==u.state?u.state:null;if(uU(e,u),"function"==typeof t.getDerivedStateFromProps&&null===l){var c=tC(t)||"Component";K.has(c)||(K.add(c),eN("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",c,null===u.state?"null":"undefined",c))}// If new component APIs are defined, "unsafe" lifecycles won't be called.
// Warn about these lifecycles if they are present.
// Don't warn about react-lifecycles-compat polyfilled methods though.
if("function"==typeof t.getDerivedStateFromProps||"function"==typeof u.getSnapshotBeforeUpdate){var d=null,f=null,p=null;if("function"==typeof u.componentWillMount&&!0!==u.componentWillMount.__suppressDeprecationWarning?d="componentWillMount":"function"==typeof u.UNSAFE_componentWillMount&&(d="UNSAFE_componentWillMount"),"function"==typeof u.componentWillReceiveProps&&!0!==u.componentWillReceiveProps.__suppressDeprecationWarning?f="componentWillReceiveProps":"function"==typeof u.UNSAFE_componentWillReceiveProps&&(f="UNSAFE_componentWillReceiveProps"),"function"==typeof u.componentWillUpdate&&!0!==u.componentWillUpdate.__suppressDeprecationWarning?p="componentWillUpdate":"function"==typeof u.UNSAFE_componentWillUpdate&&(p="UNSAFE_componentWillUpdate"),null!==d||null!==f||null!==p){var h=tC(t)||"Component",m="function"==typeof t.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";X.has(h)||(X.add(h),eN("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles",h,m,null!==d?"\n  "+d:"",null!==f?"\n  "+f:"",null!==p?"\n  "+p:""))}}return r&&su(e,o,i),u}function uF(e,t,n,r){var o=t.state;if("function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==o){var i=tO(e)||"Component";Q.has(i)||(Q.add(i),eN("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",i)),uL.enqueueReplaceState(t,t.state,null)}}// Invokes the mount life-cycles on a previously never rendered instance.
function uz(e,t,n,r){o=e.stateNode,i=tC(t)||"Component",o.render||(t.prototype&&"function"==typeof t.prototype.render?eN("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?",i):eN("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",i)),!o.getInitialState||o.getInitialState.isReactClassApproved||o.state||eN("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",i),o.getDefaultProps&&!o.getDefaultProps.isReactClassApproved&&eN("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",i),o.propTypes&&eN("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",i),o.contextType&&eN("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",i),o.contextTypes&&eN("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",i),t.contextType&&t.contextTypes&&!en.has(t)&&(en.add(t),eN("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.",i)),"function"==typeof o.componentShouldUpdate&&eN("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",i),t.prototype&&t.prototype.isPureReactComponent&&void 0!==o.shouldComponentUpdate&&eN("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",tC(t)||"A pure component"),"function"==typeof o.componentDidUnmount&&eN("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",i),"function"==typeof o.componentDidReceiveProps&&eN("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",i),"function"==typeof o.componentWillRecieveProps&&eN("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",i),"function"==typeof o.UNSAFE_componentWillRecieveProps&&eN("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",i),a=o.props!==n,void 0!==o.props&&a&&eN("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",i,i),o.defaultProps&&eN("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",i,i),"function"!=typeof o.getSnapshotBeforeUpdate||"function"==typeof o.componentDidUpdate||G.has(t)||(G.add(t),eN("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",tC(t))),"function"==typeof o.getDerivedStateFromProps&&eN("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",i),"function"==typeof o.getDerivedStateFromError&&eN("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",i),"function"==typeof t.getSnapshotBeforeUpdate&&eN("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",i),(s=o.state)&&("object"!=typeof s||t6(s))&&eN("%s.state: must be set to an object or null",i),"function"==typeof o.getChildContext&&"object"!=typeof t.childContextTypes&&eN("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",i);var o,i,a,s,u,l,c=e.stateNode;c.props=n,c.state=e.memoizedState,c.refs=uD,uS(e);var d=t.contextType;if("object"==typeof d&&null!==d)c.context=uv(d);else{var f=ss(e,t,!0);c.context=sl(e,f)}if(c.state===n){var p=tC(t)||"Component";et.has(p)||(et.add(p),eN("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",p))}8&e.mode&&s4.recordLegacyContextWarning(e,c),s4.recordUnsafeLifecycleWarnings(e,c),c.state=e.memoizedState;var h=t.getDerivedStateFromProps;"function"==typeof h&&(uN(e,t,h,n),c.state=e.memoizedState),"function"!=typeof t.getDerivedStateFromProps&&"function"!=typeof c.getSnapshotBeforeUpdate&&("function"==typeof c.UNSAFE_componentWillMount||"function"==typeof c.componentWillMount)&&(u=c.state,"function"==typeof c.componentWillMount&&c.componentWillMount(),"function"==typeof c.UNSAFE_componentWillMount&&c.UNSAFE_componentWillMount(),u!==c.state&&(eN("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",tO(e)||"Component"),uL.enqueueReplaceState(c,c.state,null)),// process them now.
uR(e,n,c,r),c.state=e.memoizedState),"function"==typeof c.componentDidMount&&(l=4194308,(/*              */16&e.mode)!=0&&(l|=/*               */16777216),e.flags|=l)}var uq=function(e,t){};function uB(e,t,n){var r=n.ref;if(null!==r&&"function"!=typeof r&&"object"!=typeof r){// TODO: Clean this up once we turn on the string ref warning for
// everyone, because the strict mode case will no longer be relevant
if(8&e.mode&&// We warn in ReactElement.js if owner and self are equal for string refs
// because these cannot be automatically converted to an arrow function
// using a codemod. Therefore, we don't have to warn about string refs again.
!(n._owner&&n._self&&n._owner.stateNode!==n._self)){var o=tO(e)||"Component";ea[o]||(eN('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',r),ea[o]=!0)}if(n._owner){var i,a=n._owner;if(a){if(1!==a.tag)throw Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");i=a.stateNode}if(!i)throw Error("Missing owner for string ref "+r+". This error is likely caused by a bug in React. Please file an issue.");// Assigning this to a const so Flow knows it won't change in the closure
var s=i;e$(r)&&eN("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.","ref",eV(r));var u=""+r;// Check if previous string ref matches new string ref
if(null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===u)return t.ref;var l=function(e){var t=s.refs;t===uD&&(t=s.refs={}),null===e?delete t[u]:t[u]=e};return l._stringRef=u,l}if("string"!=typeof r)throw Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");if(!n._owner)throw Error("Element ref was specified as a string ("+r+") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://reactjs.org/link/refs-must-have-owner for more information.")}return r}function uV(e,t){var n=Object.prototype.toString.call(t);throw Error("Objects are not valid as a React child (found: "+("[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}function u$(e){var t=tO(e)||"Component";eu[t]||(eu[t]=!0,eN("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it."))}function uW(e){var t=e._payload;return(0,e._init)(t)}// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function uH(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(// TODO: For the shouldClone case, this could be micro-optimized a bit by
// assuming that after the first child we've already added everything.
var o=r;null!==o;)t(n,o),o=o.sibling;return null}function r(e,t){for(// Add the remaining children to a temporary map so that we can find them by
// keys quickly. Implicit (null) keys get added to this set with their index
// instead.
var n=new Map,r=t;null!==r;)null!==r.key?n.set(r.key,r):n.set(r.index,r),r=r.sibling;return n}function o(e,t){// We currently set sibling to null and index to 0 here because it is easy
// to forget to do before returning it. E.g. for the single child case.
var n=pg(e,t);return n.index=0,n.sibling=null,n}function i(t,n,r){if(t.index=r,!e)return(// During hydration, the useId algorithm needs to know which fibers are
// part of a list of children (arrays, iterators).
t.flags|=/*                       */1048576,n);var o=t.alternate;if(null===o)return(// This is an insertion.
t.flags|=2,n);var i=o.index;return i<n?(// This is a move.
t.flags|=2,n):i}function a(t){return e&&null===t.alternate&&(t.flags|=2),t}function s(e,t,n,r){if(null===t||6!==t.tag){// Insert
var i=p_(n,e.mode,r);return i.return=e,i}// Update
var a=o(t,n);return a.return=e,a}function u(e,t,n,r){var i=n.type;if(i===to)return c(e,t,n.props.children,r,n.key);if(null!==t&&(t.elementType===i||pd(t,n)||// Lazy types should reconcile their resolved type.
// We need to do this after the Hot Reloading check above,
// because hot reloading has different semantics than prod because
// it doesn't resuspend. So we can't let the call below suspend.
"object"==typeof i&&null!==i&&i.$$typeof===tp&&uW(i)===t.type)){// Move based on index
var a=o(t,n.props);return a.ref=uB(e,t,n),a.return=e,a._debugSource=n._source,a._debugOwner=n._owner,a}// Insert
var s=py(n,e.mode,r);return s.ref=uB(e,t,n),s.return=e,s}function l(e,t,n,r){if(null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation){// Insert
var i=pk(n,e.mode,r);return i.return=e,i}// Update
var a=o(t,n.children||[]);return a.return=e,a}function c(e,t,n,r,i){if(null===t||7!==t.tag){// Insert
var a=pb(n,e.mode,r,i);return a.return=e,a}// Update
var s=o(t,n);return s.return=e,s}function d(e,t,n){if("string"==typeof t&&""!==t||"number"==typeof t){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
var r=p_(""+t,e.mode,n);return r.return=e,r}if("object"==typeof t&&null!==t){switch(t.$$typeof){case tn:var o=py(t,e.mode,n);return o.ref=uB(e,null,t),o.return=e,o;case tr:var i=pk(t,e.mode,n);return i.return=e,i;case tp:var a=t._payload;return d(e,(0,t._init)(a),n)}if(t6(t)||tg(t)){var s=pb(t,e.mode,n,null);return s.return=e,s}uV(e,t)}return"function"==typeof t&&u$(e),null}function f(e,t,n,r){// Update the fiber if the keys match, otherwise return null.
var o=null!==t?t.key:null;if("string"==typeof n&&""!==n||"number"==typeof n)return(// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
null!==o?null:s(e,t,""+n,r));if("object"==typeof n&&null!==n){switch(n.$$typeof){case tn:if(n.key===o)return u(e,t,n,r);return null;case tr:if(n.key===o)return l(e,t,n,r);return null;case tp:var i=n._payload;return f(e,t,(0,n._init)(i),r)}if(t6(n)||tg(n))return null!==o?null:c(e,t,n,r,null);uV(e,n)}return"function"==typeof n&&u$(e),null}function p(e,t,n,r,o){if("string"==typeof r&&""!==r||"number"==typeof r)return s(t,e.get(n)||null,""+r,o);if("object"==typeof r&&null!==r){switch(r.$$typeof){case tn:return u(t,e.get(null===r.key?n:r.key)||null,r,o);case tr:return l(t,e.get(null===r.key?n:r.key)||null,r,o);case tp:var i=r._payload;return p(e,t,n,(0,r._init)(i),o)}if(t6(r)||tg(r))return c(t,e.get(n)||null,r,o,null);uV(t,r)}return"function"==typeof r&&u$(t),null}/**
   * Warns if there is a duplicate or missing key
   */function h(e,t,n){if("object"!=typeof e||null===e)return t;switch(e.$$typeof){case tn:case tr:uq(e,n);var r=e.key;if("string"!=typeof r)break;if(null===t){(t=new Set).add(r);break}if(!t.has(r)){t.add(r);break}eN("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",r);break;case tp:var o=e._payload;h((0,e._init)(o),t,n)}return t}return(// itself. They will be added to the side-effect list as we pass through the
// children and the parent.
function s(u,l,c,m){// Handle object types
if("object"==typeof c&&null!==c&&c.type===to&&null===c.key&&(c=c.props.children),"object"==typeof c&&null!==c){switch(c.$$typeof){case tn:return a(function(e,r,i,a){for(var s=i.key,u=r;null!==u;){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(u.key===s){var l=i.type;if(l===to){if(7===u.tag){n(e,u.sibling);var c=o(u,i.props.children);return c.return=e,c._debugSource=i._source,c._debugOwner=i._owner,c}}else if(u.elementType===l||pd(u,i)||// Lazy types should reconcile their resolved type.
// We need to do this after the Hot Reloading check above,
// because hot reloading has different semantics than prod because
// it doesn't resuspend. So we can't let the call below suspend.
"object"==typeof l&&null!==l&&l.$$typeof===tp&&uW(l)===u.type){n(e,u.sibling);var d=o(u,i.props);return d.ref=uB(e,u,i),d.return=e,d._debugSource=i._source,d._debugOwner=i._owner,d}// Didn't match.
n(e,u);break}t(e,u),u=u.sibling}if(i.type===to){var f=pb(i.props.children,e.mode,a,i.key);return f.return=e,f}var p=py(i,e.mode,a);return p.ref=uB(e,r,i),p.return=e,p}(u,l,c,m));case tr:return a(function(e,r,i,a){for(var s=i.key,u=r;null!==u;){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(u.key===s){if(4===u.tag&&u.stateNode.containerInfo===i.containerInfo&&u.stateNode.implementation===i.implementation){n(e,u.sibling);var l=o(u,i.children||[]);return l.return=e,l}n(e,u);break}t(e,u),u=u.sibling}var c=pk(i,e.mode,a);return c.return=e,c}// This API will tag the children with the side-effect of the reconciliation
(u,l,c,m));case tp:var g=c._payload;return s(u,l,(0,c._init)(g),m)}if(t6(c))return function(o,a,s,u){for(var l=null,c=0;c<s.length;c++)l=h(s[c],l,o);for(// First, validate keys.
var m=null,g=null,v=a,y=0,b=0,w=null;null!==v&&b<s.length;b++){v.index>b?(w=v,v=null):w=v.sibling;var _=f(o,v,s[b],u);if(null===_){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
null===v&&(v=w);break}e&&v&&null===_.alternate&&// need to delete the existing child.
t(o,v),y=i(_,y,b),null===g?m=_:// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
g.sibling=_,g=_,v=w}if(b===s.length)return(// We've reached the end of the new children. We can delete the rest.
n(o,v),sz&&sD(o,b),m);if(null===v){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;b<s.length;b++){var k=d(o,s[b],u);null!==k&&(y=i(k,y,b),null===g?m=k:g.sibling=k,g=k)}return sz&&sD(o,b),m}// Add all children to a key map for quick lookups.
for(var S=r(o,v);b<s.length;b++){var x=p(S,o,b,s[b],u);null!==x&&(e&&null!==x.alternate&&// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
S.delete(null===x.key?b:x.key),y=i(x,y,b),null===g?m=x:g.sibling=x,g=x)}return e&&// to add them to the deletion list.
S.forEach(function(e){return t(o,e)}),sz&&sD(o,b),m}(u,l,c,m);if(tg(c))return function(o,a,s,u){// This is the same implementation as reconcileChildrenArray(),
// but using the iterator instead.
var l=tg(s);if("function"!=typeof l)throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");"function"==typeof Symbol&&// $FlowFixMe Flow doesn't know about toStringTag
"Generator"===s[Symbol.toStringTag]&&(ei||eN("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."),ei=!0),s.entries===l&&(eo||eN("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),eo=!0);// We'll get a different iterator later for the main pass.
var c=l.call(s);if(c)for(var m=null,g=c.next();!g.done;g=c.next())m=h(g.value,m,o);var v=l.call(s);if(null==v)throw Error("An iterable object provided no iterator.");for(var y=null,b=null,w=a,_=0,k=0,S=null,x=v.next();null!==w&&!x.done;k++,x=v.next()){w.index>k?(S=w,w=null):S=w.sibling;var E=f(o,w,x.value,u);if(null===E){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
null===w&&(w=S);break}e&&w&&null===E.alternate&&// need to delete the existing child.
t(o,w),_=i(E,_,k),null===b?y=E:// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
b.sibling=E,b=E,w=S}if(x.done)return(// We've reached the end of the new children. We can delete the rest.
n(o,w),sz&&sD(o,k),y);if(null===w){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;!x.done;k++,x=v.next()){var C=d(o,x.value,u);null!==C&&(_=i(C,_,k),null===b?y=C:b.sibling=C,b=C)}return sz&&sD(o,k),y}// Add all children to a key map for quick lookups.
for(var T=r(o,w);!x.done;k++,x=v.next()){var O=p(T,o,k,x.value,u);null!==O&&(e&&null!==O.alternate&&// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
T.delete(null===O.key?k:O.key),_=i(O,_,k),null===b?y=O:b.sibling=O,b=O)}return e&&// to add them to the deletion list.
T.forEach(function(e){return t(o,e)}),sz&&sD(o,k),y}(u,l,c,m);uV(u,c)}return"string"==typeof c&&""!==c||"number"==typeof c?a(function(e,t,r,i){// There's no need to check for keys on text nodes since we don't have a
// way to define them.
if(null!==t&&6===t.tag){// We already have an existing node so let's just update it and delete
// the rest.
n(e,t.sibling);var a=o(t,r);return a.return=e,a}// The existing first child is not a text node so we need to create one
// and delete the existing ones.
n(e,t);var s=p_(r,e.mode,i);return s.return=e,s}(u,l,""+c,m)):("function"==typeof c&&u$(u),n(u,l))})}eo=!1,ei=!1,ea={},/**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */es={},eu={},uq=function(e,t){if(null!==e&&"object"==typeof e&&e._store&&!e._store.validated&&null==e.key){if("object"!=typeof e._store)throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");e._store.validated=!0;var n=tO(t)||"Component";es[n]||(es[n]=!0,eN('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'))}};var uY=uH(!0),uQ=uH(!1),uK={},uG=se(uK),uX=se(uK),uJ=se(uK);function uZ(e){if(e===uK)throw Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");return e}function u0(){return uZ(uJ.current)}function u1(e,t){// Push current root instance onto the stack;
// This allows us to reset root when portals are popped.
sn(uJ,t,e),// This enables us to pop only Fibers that provide unique contexts.
sn(uX,e,e),// However, we can't just call getRootHostContext() and push it because
// we'd have a different number of entries on the stack depending on
// whether getRootHostContext() throws somewhere in renderer code or not.
// So we push an empty value first. This lets us safely unwind on errors.
sn(uG,uK,e);var n=function(e){var t,n,r=e.nodeType;switch(r){case 9:case 11:t=9===r?"#document":"#fragment";var o=e.documentElement;n=o?o.namespaceURI:nl(null,"");break;default:var i=8===r?e.parentNode:e;n=nl(i.namespaceURI||null,t=i.tagName)}var a=t.toLowerCase();return{namespace:n,ancestorInfo:aS(null,a)}}(t);// Now that we know this function doesn't throw, replace it.
st(uG,e),sn(uG,n,e)}function u2(e){st(uG,e),st(uX,e),st(uJ,e)}function u3(){return uZ(uG.current)}function u4(e){uZ(uJ.current);var t,n=uZ(uG.current),r=(t=e.type,{namespace:nl(n.namespace,t),ancestorInfo:aS(n.ancestorInfo,t)});n!==r&&(// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
sn(uX,e,e),sn(uG,r,e))}function u6(e){// Do not pop unless this Fiber provided the current context.
// pushHostContext() only pushes Fibers that provide unique contexts.
uX.current===e&&(st(uG,e),st(uX,e))}var u5=se(0);function u8(e,t){sn(u5,t,e)}function u7(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n){var r=n.dehydrated;if(null===r||aB(r)||aV(r))return t}}else if(19===t.tag&&// revealOrder undefined can't be trusted because it don't
// keep track of whether it suspended or not.
void 0!==t.memoizedProps.revealOrder){if((128&t.flags)!=0)return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}// and should be reset before starting a new render.
// This tracks which mutable sources need to be reset after a render.
var u9=[];function le(){for(var e=0;e<u9.length;e++)u9[e]._workInProgressVersionPrimary=null;u9.length=0}var lt=eI.ReactCurrentDispatcher,ln=eI.ReactCurrentBatchConfig;el=new Set;// These are set right before calling the component.
var lr=0,lo=null,li=null,la=null,ls=!1,lu=!1,ll=0,lc=0,ld=null,lf=null,lp=-1,lh=!1;// The work-in-progress fiber. I've named it differently to distinguish it from
function lm(){var e=ld;null===lf?lf=[e]:lf.push(e)}function lg(){var e=ld;null!==lf&&lf[++lp]!==e&&function(e){var t=tO(lo);if(!el.has(t)&&(el.add(t),null!==lf)){for(var n="",r=0;r<=lp;r++){// lol @ IE not supporting String#repeat
for(var o=lf[r],i=r===lp?e:o,a=r+1+". "+o;a.length<30;)a+=" ";a+=i+"\n",n+=a}eN("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n",t,n)}}(e)}function lv(e){null==e||t6(e)||// It's unlikely their type would change as usually you define them inline.
eN("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",ld,typeof e)}function ly(){throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.")}function lb(e,t){if(lh)return!1;if(null===t)return eN("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",ld),!1;// Don't bother comparing lengths in prod because these arrays should be
// passed inline.
e.length!==t.length&&eN("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s",ld,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!iT(e[n],t[n]))return!1;return!0}function lw(e,t,n,r,o,i){lr=i,lo=t,lf=null!==e?e._debugHookTypes:null,lp=-1,lh=null!==e&&e.type!==t.type,t.memoizedState=null,t.updateQueue=null,t.lanes=0,null!==e&&null!==e.memoizedState?lt.current=cm:null!==lf?// but no stateful hooks have been used.
// We want to match the production code behavior (which will use HooksDispatcherOnMount),
// but with the extra DEV validation to ensure hooks ordering hasn't changed.
// This dispatcher does that.
lt.current=ch:lt.current=cp;var a=n(r,o);// Check if there was a render phase update
if(lu){// Keep rendering in a loop for as long as render phase updates continue to
// be scheduled. Use a counter to prevent infinite loops.
var s=0;do{if(lu=!1,ll=0,s>=25)throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");s+=1,// Even when hot reloading, allow dependencies to stabilize
// after first render to prevent infinite render phase updates.
lh=!1,li=null,la=null,t.updateQueue=null,// Also validate hook order for cascading updates.
lp=-1,lt.current=cg,a=n(r,o)}while(lu)}// We can assume the previous dispatcher is always this one, since we set it
// at the beginning of the render phase and there's no re-entrance.
lt.current=cf,t._debugHookTypes=lf;// hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.
var u=null!==li&&null!==li.next;// localIdCounter = 0;
if(lr=0,lo=null,li=null,la=null,ld=null,lf=null,lp=-1,null!==e&&(14680064&e.flags)!=(14680064&t.flags)&&// Disable this warning in legacy mode, because legacy Suspense is weird
// and creates false positives. To make this work in legacy mode, we'd
// need to mark fibers that commit in an incomplete state, somehow. For
// now I'll disable the warning that most of the bugs that would trigger
// it are either exclusive to concurrent mode or exist in both.
(1&e.mode)!=0&&eN("Internal React error: Expected static flag was missing. Please notify the React team."),ls=!1,u)throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return a}function l_(){// This should be called immediately after every renderWithHooks call.
// Conceptually, it's part of the return value of renderWithHooks; it's only a
// separate function to avoid using an array tuple.
var e=0!==ll;return ll=0,e}function lk(e,t,n){t.updateQueue=e.updateQueue,(16&t.mode)!=0?t.flags&=-50333701:t.flags&=-2053,e.lanes=e.lanes&~n}function lS(){if(// We can assume the previous dispatcher is always this one, since we set it
// at the beginning of the render phase and there's no re-entrance.
lt.current=cf,ls){for(// There were render phase updates. These are only valid for this render
// phase, which we are now aborting. Remove the updates from the queues so
// they do not persist to the next render. Do not remove updates from hooks
// that weren't processed.
//
// Only reset the updates from the queue if it has a clone. If it does
// not have a clone, that means it wasn't processed, and the updates were
// scheduled before we entered the render phase.
var e=lo.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}ls=!1}lr=0,lo=null,li=null,la=null,lf=null,lp=-1,ld=null,co=!1,lu=!1,ll=0}function lx(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===la?lo.memoizedState=la=e:la=la.next=e,la}function lE(){if(null===li){var e,t,n=lo.alternate;e=null!==n?n.memoizedState:null}else e=li.next;if(null!==(t=null===la?lo.memoizedState:la.next))t=// There's already a work-in-progress. Reuse it.
(la=t).next,li=e;else{// Clone from the current hook.
if(null===e)throw Error("Rendered more hooks than during the previous render.");var r={memoizedState:(li=e).memoizedState,baseState:li.baseState,baseQueue:li.baseQueue,queue:li.queue,next:null};null===la?lo.memoizedState=la=r:la=la.next=r}return la}function lC(){return{lastEffect:null,stores:null}}function lT(e,t){// $FlowFixMe: Flow doesn't like mixed types
return"function"==typeof t?t(e):t}function lO(e,t,n){var r,o=lx();r=void 0!==n?n(t):t,o.memoizedState=o.baseState=r;var i={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r};o.queue=i;var a=i.dispatch=cs.bind(null,lo,i);return[o.memoizedState,a]}function lR(e,t,n){var r=lE(),o=r.queue;if(null===o)throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");o.lastRenderedReducer=e;var i=li,a=i.baseQueue,s=o.pending;// The last rebase update that is NOT part of the base state.
if(null!==s){// We have new updates that haven't been processed yet.
// We'll add them to the base queue.
if(null!==a){// Merge the pending queue and the base queue.
var u=a.next,l=s.next;a.next=l,s.next=u}i.baseQueue!==a&&// the future if we implement resuming, or some form of that.
eN("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),i.baseQueue=a=s,o.pending=null}if(null!==a){// We have a queue to process.
var c=a.next,d=i.baseState,f=null,p=null,h=null,m=c;do{var g=m.lane;if((lr&g)===g){// This update does have sufficient priority.
if(null!==h){var v={// This update is going to be committed so we never want uncommit
// it. Using NoLane works because 0 is a subset of all bitmasks, so
// this will never be skipped by the check above.
lane:0,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};h=h.next=v}// Process this update.
// we can use the eagerly computed state
d=m.hasEagerState?m.eagerState:e(d,m.action)}else{// Priority is insufficient. Skip this update. If this is the first
// skipped update, the previous update/state is the new base
// update/state.
var y,b={lane:g,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};null===h?(p=h=b,f=d):h=h.next=b,// Update the remaining priority in the queue.
// TODO: Don't need to accumulate this. Instead, we can remove
// renderLanes from the original lanes.
lo.lanes=lo.lanes|g,fi|=y=g}m=m.next}while(null!==m&&m!==c)null===h?f=d:h.next=p,iT(d,r.memoizedState)||(cW=!0),r.memoizedState=d,r.baseState=f,r.baseQueue=h,o.lastRenderedState=d}// Interleaved updates are stored on a separate queue. We aren't going to
// process them during this render, but we do need to track which lanes
// are remaining.
var w=o.interleaved;if(null!==w){var _=w;do{var k,S=_.lane;lo.lanes=lo.lanes|S,fi|=k=S,_=_.next}while(_!==w)}else null===a&&// zero once the queue is empty.
(o.lanes=0);var x=o.dispatch;return[r.memoizedState,x]}function lP(e,t,n){var r=lE(),o=r.queue;if(null===o)throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");o.lastRenderedReducer=e;// This is a re-render. Apply the new render phase updates to the previous
// work-in-progress hook.
var i=o.dispatch,a=o.pending,s=r.memoizedState;if(null!==a){// The queue doesn't persist past this render pass.
o.pending=null;var u=a.next,l=u;do s=e(s,l.action),l=l.next;while(l!==u)// Mark that the fiber performed work, but only if the new state is
iT(s,r.memoizedState)||(cW=!0),r.memoizedState=s,null===r.baseQueue&&(r.baseState=s),o.lastRenderedState=s}return[s,i]}function lI(e,t,n){}function lD(e,t,n){}function lM(e,t,n){var r,o=lo,i=lx();if(sz){if(void 0===n)throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");r=n(),ec||r===n()||(eN("The result of getServerSnapshot should be cached to avoid an infinite loop"),ec=!0)}else{if(r=t(),ec||iT(r,t())||(eN("The result of getSnapshot should be cached to avoid an infinite loop"),ec=!0),null===d8)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");(30&lr)!=0||lL(o,t,r)}// Read the current snapshot from the store on every render. This breaks the
// normal rules of React, and only works because store updates are
// always synchronous.
i.memoizedState=r;var a={value:r,getSnapshot:t};return i.queue=a,lH(lU.bind(null,o,a,e),[e]),// this whenever subscribe, getSnapshot, or value changes. Because there's no
// clean-up function, and we track the deps correctly, we can call pushEffect
// directly, without storing any additional state. For the same reason, we
// don't need to set a static flag, either.
// TODO: We can move this to the passive phase once we add a pre-commit
// consistency check. See the next comment.
o.flags|=/*                      */2048,lq(9,lA.bind(null,o,a,r,t),void 0,null),r}function lN(e,t,n){var r=lo,o=lE(),i=t();ec||iT(i,t())||(eN("The result of getSnapshot should be cached to avoid an infinite loop"),ec=!0);var a=!iT(o.memoizedState,i);a&&(o.memoizedState=i,cW=!0);var s=o.queue;// commit phase if there was an interleaved mutation. In concurrent mode
// this can happen all the time, but even in synchronous mode, an earlier
// effect may have mutated the store.
if(lY(lU.bind(null,r,s,e),[e]),s.getSnapshot!==t||a||// Check if the susbcribe function changed. We can save some memory by
// checking whether we scheduled a subscription effect above.
null!==la&&/* */1&la.memoizedState.tag){if(r.flags|=2048,lq(9,lA.bind(null,r,s,i,t),void 0,null),null===d8)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");(30&lr)!=0||lL(r,t,i)}return i}function lL(e,t,n){e.flags|=/*             */16384;var r={getSnapshot:t,value:n},o=lo.updateQueue;if(null===o)o=lC(),lo.updateQueue=o,o.stores=[r];else{var i=o.stores;null===i?o.stores=[r]:i.push(r)}}function lA(e,t,n,r){// These are updated in the passive phase
t.value=n,t.getSnapshot=r,lj(t)&&lF(e)}function lU(e,t,n){return n(function(){// The store changed. Check if the snapshot changed since the last time we
// read from the store.
lj(t)&&lF(e)})}function lj(e){var t=e.getSnapshot,n=e.value;try{var r=t();return!iT(n,r)}catch(e){return!0}}function lF(e){var t=u_(e,1);null!==t&&fM(t,e,1,-1)}function lz(e){var t=lx();"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e;var n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:lT,lastRenderedState:e};t.queue=n;var r=n.dispatch=cu.bind(null,lo,n);return[t.memoizedState,r]}function lq(e,t,n,r){var o={tag:e,create:t,destroy:n,deps:r,// Circular
next:null},i=lo.updateQueue;if(null===i)i=lC(),lo.updateQueue=i,i.lastEffect=o.next=o;else{var a=i.lastEffect;if(null===a)i.lastEffect=o.next=o;else{var s=a.next;a.next=o,o.next=s,i.lastEffect=o}}return o}function lB(e){var t=lx(),n={current:e};return t.memoizedState=n,n}function lV(e){return lE().memoizedState}function l$(e,t,n,r){var o=lx(),i=void 0===r?null:r;lo.flags|=e,o.memoizedState=lq(1|t,n,void 0,i)}function lW(e,t,n,r){var o=lE(),i=void 0===r?null:r,a=void 0;if(null!==li){var s=li.memoizedState;if(a=s.destroy,null!==i&&lb(i,s.deps)){o.memoizedState=lq(t,n,a,i);return}}lo.flags|=e,o.memoizedState=lq(1|t,n,a,i)}function lH(e,t){return(16&lo.mode)!=0?l$(41945088,/*   */8,e,t):l$(8390656,8,e,t)}function lY(e,t){return lW(2048,8,e,t)}function lQ(e,t){return l$(/*                       */4,/*  */2,e,t)}function lK(e,t){return lW(4,2,e,t)}function lG(e,t){var n;return n=4194308,(16&lo.mode)!=0&&(n|=16777216),l$(n,/*    */4,e,t)}function lX(e,t){return lW(4,4,e,t)}function lJ(e,t){if("function"==typeof t)return t(e()),function(){t(null)};if(null!=t){t.hasOwnProperty("current")||eN("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(t).join(", ")+"}");var n=e();return t.current=n,function(){t.current=null}}}function lZ(e,t,n){"function"!=typeof t&&eN("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",null!==t?typeof t:"null");var r,o=null!=n?n.concat([e]):null;return r=4194308,(16&lo.mode)!=0&&(r|=16777216),l$(r,4,lJ.bind(null,t,e),o)}function l0(e,t,n){"function"!=typeof t&&eN("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",null!==t?typeof t:"null");var r=null!=n?n.concat([e]):null;return lW(4,4,lJ.bind(null,t,e),r)}function l1(e,t){// The react-debug-hooks package injects its own implementation
// so that e.g. DevTools can display custom hook values.
}function l2(e,t){return lx().memoizedState=[e,void 0===t?null:t],e}function l3(e,t){var n=lE(),r=void 0===t?null:t,o=n.memoizedState;return null!==o&&null!==r&&lb(r,o[1])?o[0]:(n.memoizedState=[e,r],e)}function l4(e,t){var n=lx(),r=e();return n.memoizedState=[r,void 0===t?null:t],r}function l6(e,t){var n=lE(),r=void 0===t?null:t,o=n.memoizedState;if(null!==o&&null!==r&&lb(r,o[1]))return o[0];var i=e();return n.memoizedState=[i,r],i}function l5(e){return lx().memoizedState=e,e}function l8(e){return l9(lE(),li.memoizedState,e)}function l7(e){var t=lE();return null===li?(// This is a rerender during a mount.
t.memoizedState=e,e):l9(t,li.memoizedState,e)}function l9(e,t,n){if(!((21&lr)!=0))return e.baseState&&(// Flip this back to false.
e.baseState=!1,cW=!0),e.memoizedState=n,n;// This is an urgent update. If the value has changed, keep using the
// previous value and spawn a deferred render to update it later.
if(!iT(n,t)){// Schedule a deferred render
var r,o=r8();lo.lanes=lo.lanes|o,fi|=r=o,// from the latest value. The name "baseState" doesn't really match how we
// use it because we're reusing a state hook field instead of creating a
// new one.
e.baseState=!0}// Reuse the previous value
return t}function ce(e,t,n){var r=oa;oa=0!==r&&r<4?r:4,e(!0);var o=ln.transition;ln.transition={};var i=ln.transition;ln.transition._updatedFibers=new Set;try{e(!1),t()}finally{oa=r,ln.transition=o,null===o&&i._updatedFibers&&(i._updatedFibers.size>10&&eM("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),i._updatedFibers.clear())}}function ct(){var e=lz(!1),t=e[0],n=e[1],r=ce.bind(null,n);// The `start` method never changes.
return lx().memoizedState=r,[t,r]}function cn(){return[lR(lT)[0],lE().memoizedState]}function cr(){return[lP(lT)[0],lE().memoizedState]}var co=!1;function ci(){var e,t=lx(),n=d8.identifierPrefix;if(sz){e=":"+n+"R"+(r=sI,((o=sP)&~(1<<sL(o)-1)).toString(32)+r);// that represents the position of this useId hook among all the useId
// hooks for this fiber.
var r,o,i=ll++;i>0&&(e+="H"+i.toString(32)),e+=":"}else e=":"+n+"r"+(lc++).toString(32)+":";return t.memoizedState=e,e}function ca(){return lE().memoizedState}function cs(e,t,n){"function"==typeof arguments[3]&&eN("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=fD(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(cl(e))cc(t,o);else{var i=uw(e,t,o,r);null!==i&&(fM(i,e,r,fI()),cd(i,t,r))}rQ(e,r)}function cu(e,t,n){"function"==typeof arguments[3]&&eN("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=fD(e),o={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(cl(e))cc(t,o);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)){// The queue is currently empty, which means we can eagerly compute the
// next state before entering the render phase. If the new state is the
// same as the current state, we may be able to bail out entirely.
var a,s=t.lastRenderedReducer;if(null!==s){a=lt.current,lt.current=cy;try{var u,l=t.lastRenderedState,c=s(l,n);if(// it, on the update object. If the reducer hasn't changed by the
// time we enter the render phase, then the eager state can be used
// without calling the reducer again.
o.hasEagerState=!0,o.eagerState=c,iT(c,l)){// Fast path. We can bail out without scheduling React to re-render.
// It's still possible that we'll need to rebase this update later,
// if the component re-renders for a different reason and by that
// time the reducer has changed.
// TODO: Do we still need to entangle transitions in this case?
u=t.interleaved,null===u?(// This is the first update. Create a circular list.
o.next=o,// be transferred to the pending queue.
ub(t)):(o.next=u.next,u.next=o),t.interleaved=o;return}}catch(e){}finally{lt.current=a}}}var d=uw(e,t,o,r);null!==d&&(fM(d,e,r,fI()),cd(d,t,r))}rQ(e,r)}function cl(e){var t=e.alternate;return e===lo||null!==t&&t===lo}function cc(e,t){// This is a render phase update. Stash it in a lazily-created map of
// queue -> linked list of updates. After this render pass, we'll restart
// and apply the stashed updates on top of the work-in-progress hook.
lu=ls=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}// TODO: Move to ReactFiberConcurrentUpdates?
function cd(e,t,n){if(r5(n)){var r=t.lanes,o=// must have finished. We can remove them from the shared queue, which
// represents a superset of the actually pending lanes. In some cases we
// may entangle more than we need to, but that's OK. In fact it's worse if
// we *don't* entangle when we should.
(r&=e.pendingLanes)|n;// If any entangled lanes are no longer pending on the root, then they
t.lanes=o,// the lane finished since the last time we entangled it. So we need to
// entangle it again, just to be sure.
or(e,o)}}var cf={readContext:uv,useCallback:ly,useContext:ly,useEffect:ly,useImperativeHandle:ly,useInsertionEffect:ly,useLayoutEffect:ly,useMemo:ly,useReducer:ly,useRef:ly,useState:ly,useDebugValue:ly,useDeferredValue:ly,useTransition:ly,useMutableSource:ly,useSyncExternalStore:ly,useId:ly,unstable_isNewReconciler:!1},cp=null,ch=null,cm=null,cg=null,cv=null,cy=null,cb=null,cw=function(){eN("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")},c_=function(){eN("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks")};cp={readContext:function(e){return uv(e)},useCallback:function(e,t){return ld="useCallback",lm(),lv(t),l2(e,t)},useContext:function(e){return ld="useContext",lm(),uv(e)},useEffect:function(e,t){return ld="useEffect",lm(),lv(t),lH(e,t)},useImperativeHandle:function(e,t,n){return ld="useImperativeHandle",lm(),lv(n),lZ(e,t,n)},useInsertionEffect:function(e,t){return ld="useInsertionEffect",lm(),lv(t),lQ(e,t)},useLayoutEffect:function(e,t){return ld="useLayoutEffect",lm(),lv(t),lG(e,t)},useMemo:function(e,t){ld="useMemo",lm(),lv(t);var n=lt.current;lt.current=cv;try{return l4(e,t)}finally{lt.current=n}},useReducer:function(e,t,n){ld="useReducer",lm();var r=lt.current;lt.current=cv;try{return lO(e,t,n)}finally{lt.current=r}},useRef:function(e){return ld="useRef",lm(),lB(e)},useState:function(e){ld="useState",lm();var t=lt.current;lt.current=cv;try{return lz(e)}finally{lt.current=t}},useDebugValue:function(e,t){return ld="useDebugValue",lm(),l1()},useDeferredValue:function(e){return ld="useDeferredValue",lm(),l5(e)},useTransition:function(){return ld="useTransition",lm(),ct()},useMutableSource:function(e,t,n){return ld="useMutableSource",lm(),lI()},useSyncExternalStore:function(e,t,n){return ld="useSyncExternalStore",lm(),lM(e,t,n)},useId:function(){return ld="useId",lm(),ci()},unstable_isNewReconciler:!1},ch={readContext:function(e){return uv(e)},useCallback:function(e,t){return ld="useCallback",lg(),l2(e,t)},useContext:function(e){return ld="useContext",lg(),uv(e)},useEffect:function(e,t){return ld="useEffect",lg(),lH(e,t)},useImperativeHandle:function(e,t,n){return ld="useImperativeHandle",lg(),lZ(e,t,n)},useInsertionEffect:function(e,t){return ld="useInsertionEffect",lg(),lQ(e,t)},useLayoutEffect:function(e,t){return ld="useLayoutEffect",lg(),lG(e,t)},useMemo:function(e,t){ld="useMemo",lg();var n=lt.current;lt.current=cv;try{return l4(e,t)}finally{lt.current=n}},useReducer:function(e,t,n){ld="useReducer",lg();var r=lt.current;lt.current=cv;try{return lO(e,t,n)}finally{lt.current=r}},useRef:function(e){return ld="useRef",lg(),lB(e)},useState:function(e){ld="useState",lg();var t=lt.current;lt.current=cv;try{return lz(e)}finally{lt.current=t}},useDebugValue:function(e,t){return ld="useDebugValue",lg(),l1()},useDeferredValue:function(e){return ld="useDeferredValue",lg(),l5(e)},useTransition:function(){return ld="useTransition",lg(),ct()},useMutableSource:function(e,t,n){return ld="useMutableSource",lg(),lI()},useSyncExternalStore:function(e,t,n){return ld="useSyncExternalStore",lg(),lM(e,t,n)},useId:function(){return ld="useId",lg(),ci()},unstable_isNewReconciler:!1},cm={readContext:function(e){return uv(e)},useCallback:function(e,t){return ld="useCallback",lg(),l3(e,t)},useContext:function(e){return ld="useContext",lg(),uv(e)},useEffect:function(e,t){return ld="useEffect",lg(),lY(e,t)},useImperativeHandle:function(e,t,n){return ld="useImperativeHandle",lg(),l0(e,t,n)},useInsertionEffect:function(e,t){return ld="useInsertionEffect",lg(),lK(e,t)},useLayoutEffect:function(e,t){return ld="useLayoutEffect",lg(),lX(e,t)},useMemo:function(e,t){ld="useMemo",lg();var n=lt.current;lt.current=cy;try{return l6(e,t)}finally{lt.current=n}},useReducer:function(e,t,n){ld="useReducer",lg();var r=lt.current;lt.current=cy;try{return lR(e,t,n)}finally{lt.current=r}},useRef:function(e){return ld="useRef",lg(),lV()},useState:function(e){ld="useState",lg();var t=lt.current;lt.current=cy;try{return lR(lT)}finally{lt.current=t}},useDebugValue:function(e,t){return ld="useDebugValue",lg(),l1()},useDeferredValue:function(e){return ld="useDeferredValue",lg(),l8(e)},useTransition:function(){return ld="useTransition",lg(),cn()},useMutableSource:function(e,t,n){return ld="useMutableSource",lg(),lD()},useSyncExternalStore:function(e,t,n){return ld="useSyncExternalStore",lg(),lN(e,t)},useId:function(){return ld="useId",lg(),ca()},unstable_isNewReconciler:!1},cg={readContext:function(e){return uv(e)},useCallback:function(e,t){return ld="useCallback",lg(),l3(e,t)},useContext:function(e){return ld="useContext",lg(),uv(e)},useEffect:function(e,t){return ld="useEffect",lg(),lY(e,t)},useImperativeHandle:function(e,t,n){return ld="useImperativeHandle",lg(),l0(e,t,n)},useInsertionEffect:function(e,t){return ld="useInsertionEffect",lg(),lK(e,t)},useLayoutEffect:function(e,t){return ld="useLayoutEffect",lg(),lX(e,t)},useMemo:function(e,t){ld="useMemo",lg();var n=lt.current;lt.current=cb;try{return l6(e,t)}finally{lt.current=n}},useReducer:function(e,t,n){ld="useReducer",lg();var r=lt.current;lt.current=cb;try{return lP(e,t,n)}finally{lt.current=r}},useRef:function(e){return ld="useRef",lg(),lV()},useState:function(e){ld="useState",lg();var t=lt.current;lt.current=cb;try{return lP(lT)}finally{lt.current=t}},useDebugValue:function(e,t){return ld="useDebugValue",lg(),l1()},useDeferredValue:function(e){return ld="useDeferredValue",lg(),l7(e)},useTransition:function(){return ld="useTransition",lg(),cr()},useMutableSource:function(e,t,n){return ld="useMutableSource",lg(),lD()},useSyncExternalStore:function(e,t,n){return ld="useSyncExternalStore",lg(),lN(e,t)},useId:function(){return ld="useId",lg(),ca()},unstable_isNewReconciler:!1},cv={readContext:function(e){return cw(),uv(e)},useCallback:function(e,t){return ld="useCallback",c_(),lm(),l2(e,t)},useContext:function(e){return ld="useContext",c_(),lm(),uv(e)},useEffect:function(e,t){return ld="useEffect",c_(),lm(),lH(e,t)},useImperativeHandle:function(e,t,n){return ld="useImperativeHandle",c_(),lm(),lZ(e,t,n)},useInsertionEffect:function(e,t){return ld="useInsertionEffect",c_(),lm(),lQ(e,t)},useLayoutEffect:function(e,t){return ld="useLayoutEffect",c_(),lm(),lG(e,t)},useMemo:function(e,t){ld="useMemo",c_(),lm();var n=lt.current;lt.current=cv;try{return l4(e,t)}finally{lt.current=n}},useReducer:function(e,t,n){ld="useReducer",c_(),lm();var r=lt.current;lt.current=cv;try{return lO(e,t,n)}finally{lt.current=r}},useRef:function(e){return ld="useRef",c_(),lm(),lB(e)},useState:function(e){ld="useState",c_(),lm();var t=lt.current;lt.current=cv;try{return lz(e)}finally{lt.current=t}},useDebugValue:function(e,t){return ld="useDebugValue",c_(),lm(),l1()},useDeferredValue:function(e){return ld="useDeferredValue",c_(),lm(),l5(e)},useTransition:function(){return ld="useTransition",c_(),lm(),ct()},useMutableSource:function(e,t,n){return ld="useMutableSource",c_(),lm(),lI()},useSyncExternalStore:function(e,t,n){return ld="useSyncExternalStore",c_(),lm(),lM(e,t,n)},useId:function(){return ld="useId",c_(),lm(),ci()},unstable_isNewReconciler:!1},cy={readContext:function(e){return cw(),uv(e)},useCallback:function(e,t){return ld="useCallback",c_(),lg(),l3(e,t)},useContext:function(e){return ld="useContext",c_(),lg(),uv(e)},useEffect:function(e,t){return ld="useEffect",c_(),lg(),lY(e,t)},useImperativeHandle:function(e,t,n){return ld="useImperativeHandle",c_(),lg(),l0(e,t,n)},useInsertionEffect:function(e,t){return ld="useInsertionEffect",c_(),lg(),lK(e,t)},useLayoutEffect:function(e,t){return ld="useLayoutEffect",c_(),lg(),lX(e,t)},useMemo:function(e,t){ld="useMemo",c_(),lg();var n=lt.current;lt.current=cy;try{return l6(e,t)}finally{lt.current=n}},useReducer:function(e,t,n){ld="useReducer",c_(),lg();var r=lt.current;lt.current=cy;try{return lR(e,t,n)}finally{lt.current=r}},useRef:function(e){return ld="useRef",c_(),lg(),lV()},useState:function(e){ld="useState",c_(),lg();var t=lt.current;lt.current=cy;try{return lR(lT)}finally{lt.current=t}},useDebugValue:function(e,t){return ld="useDebugValue",c_(),lg(),l1()},useDeferredValue:function(e){return ld="useDeferredValue",c_(),lg(),l8(e)},useTransition:function(){return ld="useTransition",c_(),lg(),cn()},useMutableSource:function(e,t,n){return ld="useMutableSource",c_(),lg(),lD()},useSyncExternalStore:function(e,t,n){return ld="useSyncExternalStore",c_(),lg(),lN(e,t)},useId:function(){return ld="useId",c_(),lg(),ca()},unstable_isNewReconciler:!1},cb={readContext:function(e){return cw(),uv(e)},useCallback:function(e,t){return ld="useCallback",c_(),lg(),l3(e,t)},useContext:function(e){return ld="useContext",c_(),lg(),uv(e)},useEffect:function(e,t){return ld="useEffect",c_(),lg(),lY(e,t)},useImperativeHandle:function(e,t,n){return ld="useImperativeHandle",c_(),lg(),l0(e,t,n)},useInsertionEffect:function(e,t){return ld="useInsertionEffect",c_(),lg(),lK(e,t)},useLayoutEffect:function(e,t){return ld="useLayoutEffect",c_(),lg(),lX(e,t)},useMemo:function(e,t){ld="useMemo",c_(),lg();var n=lt.current;lt.current=cy;try{return l6(e,t)}finally{lt.current=n}},useReducer:function(e,t,n){ld="useReducer",c_(),lg();var r=lt.current;lt.current=cy;try{return lP(e,t,n)}finally{lt.current=r}},useRef:function(e){return ld="useRef",c_(),lg(),lV()},useState:function(e){ld="useState",c_(),lg();var t=lt.current;lt.current=cy;try{return lP(lT)}finally{lt.current=t}},useDebugValue:function(e,t){return ld="useDebugValue",c_(),lg(),l1()},useDeferredValue:function(e){return ld="useDeferredValue",c_(),lg(),l7(e)},useTransition:function(){return ld="useTransition",c_(),lg(),cr()},useMutableSource:function(e,t,n){return ld="useMutableSource",c_(),lg(),lD()},useSyncExternalStore:function(e,t,n){return ld="useSyncExternalStore",c_(),lg(),lN(e,t)},useId:function(){return ld="useId",c_(),lg(),ca()},unstable_isNewReconciler:!1};var ck=eP.unstable_now,cS=0,cx=-1,cE=-1,cC=-1,cT=!1,cO=!1;function cR(e){cE=ck(),e.actualStartTime<0&&(e.actualStartTime=ck())}function cP(e,t){if(cE>=0){var n=ck()-cE;e.actualDuration+=n,t&&(e.selfBaseDuration=n),cE=-1}}function cI(e){if(cx>=0){var t=ck()-cx;cx=-1;// Store duration on the next nearest Profiler ancestor
for(// Or the root (for the DevTools Profiler to read)
var n=e.return;null!==n;){switch(n.tag){case 3:var r=n.stateNode;r.effectDuration+=t;return;case 12:var o=n.stateNode;o.effectDuration+=t;return}n=n.return}}}function cD(e){if(cC>=0){var t=ck()-cC;cC=-1;// Store duration on the next nearest Profiler ancestor
for(// Or the root (for the DevTools Profiler to read)
var n=e.return;null!==n;){switch(n.tag){case 3:var r=n.stateNode;null!==r&&(r.passiveEffectDuration+=t);return;case 12:var o=n.stateNode;null!==o&&// In this case, the return pointer is also cleared out,
// so we won't be able to report the time spent in this Profiler's subtree.
(o.passiveEffectDuration+=t);return}n=n.return}}}function cM(){cx=ck()}function cN(e){for(// Transfer time spent rendering these children so we don't lose it
// after we rerender. This is used as a helper in special cases
// where we should count the work of multiple passes.
var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function cL(e,t){// If the value is an error, call this function immediately after it is thrown
// so the stack is accurate.
return{value:e,source:t,stack:tx(t),digest:null}}function cA(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function cU(e,t){try{var n,r=t.value,o=t.source,i=t.stack;// `preventDefault()` in window `error` handler.
// We record this information as an expando on the error.
if(null!=r&&r._suppressLogging){if(1===e.tag)// Ignore it and don't print the stack addendum.
// This is handy for testing error boundaries without noise.
return;// The error is fatal. Since the silencing might have
// been accidental, we'll surface it anyway.
// However, the browser would have silenced the original error
// so we'll print it first, and then print the stack addendum.
console.error(r);// Don't transform to our wrapper
// For a more detailed description of this block, see:
// https://github.com/facebook/react/pull/13384
}var a=o?tO(o):null;if(3===e.tag)n="Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://reactjs.org/link/error-boundaries to learn more about error boundaries.";else{var s=tO(e)||"Anonymous";n="React will try to recreate this component tree from scratch using the error boundary you provided, "+s+"."}var u=(a?"The above error occurred in the <"+a+"> component:":"The above error occurred in one of your React components:")+"\n"+(null!==i?i:"")+"\n\n"+n;// In development, we provide our own message with just the component stack.
// We don't include the original error message and JS stack because the browser
// has already printed it. Even if the application swallows the error, it is still
// displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
console.error(u);// Don't transform to our wrapper
}catch(e){// This method must not throw, or React internal state will get messed up.
// If console.error is overridden, or logCapturedError() shows a dialog that throws,
// we want to report this error outside of the normal stack as a last resort.
// https://github.com/facebook/react/issues/13188
setTimeout(function(){throw e})}}var cj="function"==typeof WeakMap?WeakMap:Map;function cF(e,t,n){var r=uE(-1,n);// Unmount the root by rendering null.
r.tag=3,// being called "element".
r.payload={element:null};var o=t.value;return r.callback=function(){f0(o),cU(e,t)},r}function cz(e,t,n){var r=uE(-1,n);r.tag=3;var o=e.type.getDerivedStateFromError;if("function"==typeof o){var i=t.value;r.payload=function(){return o(i)},r.callback=function(){pf(e),cU(e,t)}}var a=e.stateNode;return null!==a&&"function"==typeof a.componentDidCatch&&(r.callback=function(){pf(e),cU(e,t),"function"!=typeof o&&(null===fg?fg=new Set([this]):fg.add(this));var n=t.value,r=t.stack;this.componentDidCatch(n,{componentStack:null!==r?r:""}),"function"==typeof o||(1&e.lanes)!=0||eN("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",tO(e)||"Unknown")}),r}function cq(e,t,n){// Attach a ping listener
//
// The data might resolve before we have a chance to commit the fallback. Or,
// in the case of a refresh, we'll never commit a fallback. So we need to
// attach a listener now. When it resolves ("pings"), we can decide whether to
// try rendering the tree again.
//
// Only attach a listener if one does not already exist for the lanes
// we're currently rendering (which acts like a "thread ID" here).
//
// We only need to do this in concurrent mode. Legacy Suspense always
// commits fallbacks synchronously, so there are no pings.
var r,o=e.pingCache;if(null===o?(o=e.pingCache=new cj,r=new Set,o.set(t,r)):void 0===(r=o.get(t))&&(r=new Set,o.set(t,r)),!r.has(n)){// Memoize using the thread ID to prevent redundant listeners.
r.add(n);var i=f3.bind(null,e,t,n);rU&&pn(e,n),t.then(i,i)}}function cB(e){var t=e;do{if(13===t.tag&&function(e,t){// If it was the primary children that just suspended, capture and render the
// fallback. Otherwise, don't capture and bubble to the next boundary.
var n=e.memoizedState;return null!==n?null!==n.dehydrated:(e.memoizedProps,!0)}(t))return t;// This boundary already captured during this render. Continue to the next
// boundary.
t=t.return}while(null!==t)return null}function cV(e,t,n,r,o){// This marks a Suspense boundary so that when we're unwinding the stack,
// it captures the suspended "exception" and does a second (fallback) pass.
if((1&e.mode)==0){// Legacy Mode Suspense
//
// If the boundary is in legacy mode, we should *not*
// suspend the commit. Pretend as if the suspended component rendered
// null and keep rendering. When the Suspense boundary completes,
// we'll do a second pass to render the fallback.
if(e===t)// a Suspense boundary's inner Offscreen wrapper fiber. This happens
// when a React.lazy component is a direct child of a
// Suspense boundary.
//
// Suspense boundaries are implemented as multiple fibers, but they
// are a single conceptual unit. The legacy mode behavior where we
// pretend the suspended fiber committed as `null` won't work,
// because in this case the "suspended" fiber is the inner
// Offscreen wrapper.
//
// Because the contents of the boundary haven't started rendering
// yet (i.e. nothing in the tree has partially rendered) we can
// switch to the regular, concurrent mode behavior: mark the
// boundary with ShouldCapture and enter the unwind phase.
e.flags|=/*                */65536;else{if(e.flags|=128,n.flags|=/* */131072,// But we shouldn't call any lifecycle methods or callbacks. Remove
// all lifecycle effect tags.
n.flags&=-52805,1===n.tag){if(null===n.alternate)// completed class component. For example, we should not call
// componentWillUnmount if it is deleted.
n.tag=17;else{// When we try rendering again, we should not reuse the current fiber,
// since it's known to be in an inconsistent state. Use a force update to
// prevent a bail out.
var i=uE(-1,1);i.tag=2,uC(n,i,1)}}// The source fiber did not complete. Mark it with Sync priority to
// indicate that it still has pending work.
n.lanes=1|n.lanes}return e}// Confirmed that the boundary is in a concurrent mode tree. Continue
return(// with the normal suspend path.
//
// After this we'll use a set of heuristics to determine whether this
// render pass will run to completion or restart or "suspend" the commit.
// The actual logic for this is spread out in different places.
//
// This first principle is that if we're going to suspend when we complete
// a root, then we should also restart if we get an update or ping that
// might unsuspend it, and vice versa. The only reason to suspend is
// because you think you might want to restart before committing. However,
// it doesn't make sense to restart only while in the period we're suspended.
//
// Restarting too aggressively is also not good because it starves out any
// intermediate loading state. So we use heuristics to determine when.
// Suspense Heuristics
//
// If nothing threw a Promise or all the same fallbacks are already showing,
// then don't suspend/restart.
//
// If this is an initial render of a new tree of Suspense boundaries and
// those trigger a fallback, then don't suspend/restart. We want to ensure
// that we can show the initial loading state as quickly as possible.
//
// If we hit a "Delayed" case, such as when we'd switch from content back into
// a fallback, then we should always suspend/restart. Transitions apply
// to this case. If none is defined, JND is used instead.
//
// If we're already showing a fallback and it gets "retried", allowing us to show
// another level, but there's still an inner boundary that would show a fallback,
// then we suspend/restart for 500ms since the last time we showed a fallback
// anywhere in the tree. This effectively throttles progressive loading into a
// consistent train of commits. This also gives us an opportunity to restart to
// get to the completed state slightly earlier.
//
// If there's ambiguity due to batching it's resolved in preference of:
// 1) "delayed", 2) "initial render", 3) "retry".
//
// We want to ensure that a "busy" state doesn't get force committed. We want to
// ensure that new initial loading states can commit as soon as possible.
e.flags|=65536,// the begin phase to prevent an early bailout.
e.lanes=o,e)}var c$=eI.ReactCurrentOwner,cW=!1;function cH(e,t,n,r){null===e?// won't update its child set by applying minimal side-effects. Instead,
// we will add them all to the child before it gets rendered. That means
// we can optimize this reconciliation pass by not tracking side-effects.
t.child=uQ(t,null,n,r):// we haven't yet started any work on these children. Therefore, we use
// the clone algorithm to create a copy of all the current children.
// If we had any progressed work already, that is invalid at this point so
// let's throw it out.
t.child=uY(t,e.child,n,r)}function cY(e,t,n,r,o){if(t.type!==t.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var i,a,s=n.propTypes;s&&a8(s,r,"prop",tC(n))}var u=n.render,l=t.ref;if(ug(t,o),rB(t),c$.current=t,tI=!0,i=lw(e,t,u,r,l,o),a=l_(),8&t.mode){rj(!0);try{i=lw(e,t,u,r,l,o),a=l_()}finally{rj(!1)}}return(tI=!1,rV(),null===e||cW)?(sz&&a&&sN(t),// React DevTools reads this flag.
t.flags|=/*                */1,cH(e,t,i,o),t.child):(lk(e,t,o),du(e,t,o))}function cQ(e,t,n,r,o){if(null===e){var i=n.type;if("function"==typeof i&&!pm(i)&&void 0===i.defaultProps&&null===n.compare&&// SimpleMemoComponent codepath doesn't resolve outer props either.
void 0===n.defaultProps){var a=i;return a=pl(i),// and with only the default shallow comparison, we upgrade it
// to a SimpleMemoComponent to allow fast path updates.
t.tag=15,t.type=a,c3(t,i),cK(e,t,a,r,o)}var s=i.propTypes;s&&// We could move it there, but we'd still need this for lazy code path.
a8(s,r,"prop",tC(i));var u=pv(n.type,null,r,t,t.mode,o);return u.ref=t.ref,u.return=t,t.child=u,u}var l=n.type,c=l.propTypes;c&&// We could move it there, but we'd still need this for lazy code path.
a8(c,r,"prop",tC(l));var d=e.child;// This is always exactly one child
if(!dl(e,o)){// This will be the props with resolved defaultProps,
// unlike current.memoizedProps which will be the unresolved ones.
var f=d.memoizedProps,p=n.compare;// Default to shallow comparison
if((p=null!==p?p:iO)(f,r)&&e.ref===t.ref)return du(e,t,o)}// React DevTools reads this flag.
t.flags|=1;var h=pg(d,r);return h.ref=t.ref,h.return=t,t.child=h,h}function cK(e,t,n,r,o){if(t.type!==t.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var i=t.elementType;if(i.$$typeof===tp){// We warn when you define propTypes on lazy()
// so let's just skip over it to find memo() outer wrapper.
// Inner props for memo are validated later.
var a=i,s=a._payload,u=a._init;try{i=u(s)}catch(e){i=null}// Inner propTypes will be validated in the function component path.
var l=i&&i.propTypes;l&&a8(l,r,"prop",tC(i))}}if(null!==e){var c=e.memoizedProps;if(iO(c,r)&&e.ref===t.ref&&t.type===e.type){if(cW=!1,// would during a normal fiber bailout.
//
// We don't have strong guarantees that the props object is referentially
// equal during updates where we can't bail out anyway — like if the props
// are shallowly equal, but there's a local state or context update in the
// same batch.
//
// However, as a principle, we should aim to make the behavior consistent
// across different ways of memoizing a component. For example, React.memo
// has a different internal Fiber layout if you pass a normal function
// component (SimpleMemoComponent) versus if you pass a different type
// like forwardRef (MemoComponent). But this is an implementation detail.
// Wrapping a component in forwardRef (or React.lazy, etc) shouldn't
// affect whether the props object is reused during a bailout.
t.pendingProps=r=c,!dl(e,o))return(// The pending lanes were cleared at the beginning of beginWork. We're
// about to bail out, but there might be other lanes that weren't
// included in the current render. Usually, the priority level of the
// remaining updates is accumulated during the evaluation of the
// component (i.e. when processing the update queue). But since since
// we're bailing out early *without* evaluating the component, we need
// to account for it here, too. Reset to the value of the current fiber.
// NOTE: This only applies to SimpleMemoComponent, not MemoComponent,
// because a MemoComponent fiber does not have hooks or an update queue;
// rather, it wraps around an inner component, which may or may not
// contains hooks.
// TODO: Move the reset at in beginWork out of the common path so that
// this is no longer necessary.
t.lanes=e.lanes,du(e,t,o));(131072&e.flags)!=0&&// See https://github.com/facebook/react/pull/19216.
(cW=!0)}}return cJ(e,t,n,r,o)}function cG(e,t,n){var r,o,i=t.pendingProps,a=i.children,s=null!==e?e.memoizedState:null;if("hidden"===i.mode){// Rendering a hidden tree.
if((1&t.mode)==0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},fB(t,n);else if((1073741824&n)!=0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},fB(t,null!==s?s.baseLanes:n);else{return r=null!==s?s.baseLanes|n:n,// Schedule this fiber to re-render at offscreen priority. Then bailout.
t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:r,cachePool:null,transitions:null},t.updateQueue=null,// to avoid a push/pop misalignment.
fB(t,r),null}}else null!==s?(// We're going from hidden -> visible.
o=s.baseLanes|n,t.memoizedState=null):// special to do. Need to push to the stack regardless, though, to avoid
// a push/pop misalignment.
o=n,fB(t,o);return cH(e,t,a,n),t.child}// Note: These happen to have identical begin phases, for now. We shouldn't hold
function cX(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(// Schedule a Ref effect
t.flags|=/*                          */512,t.flags|=/*                    */2097152)}function cJ(e,t,n,r,o){if(t.type!==t.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var i,a,s,u=n.propTypes;u&&a8(u,r,"prop",tC(n))}var l=ss(t,n,!0);if(i=sl(t,l),ug(t,o),rB(t),c$.current=t,tI=!0,a=lw(e,t,n,r,i,o),s=l_(),8&t.mode){rj(!0);try{a=lw(e,t,n,r,i,o),s=l_()}finally{rj(!1)}}return(tI=!1,rV(),null===e||cW)?(sz&&s&&sN(t),// React DevTools reads this flag.
t.flags|=1,cH(e,t,a,o),t.child):(lk(e,t,o),du(e,t,o))}function cZ(e,t,n,r,o){// This is used by DevTools to force a boundary to error.
switch(pN(t)){case!1:var i,a,s=t.stateNode,u=new t.type(t.memoizedProps,s.context).state;s.updater.enqueueSetState(s,u,null);break;case!0:t.flags|=128,t.flags|=65536;var l,c=Error("Simulated error coming from DevTools"),d=(l=o)&-l;t.lanes=t.lanes|d;var f=cz(t,cL(c,t),d);uO(t,f)}if(t.type!==t.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var p=n.propTypes;p&&a8(p,r,"prop",tC(n))}sd(n)?(i=!0,sg(t)):i=!1,ug(t,o),null===t.stateNode?(ds(e,t),uj(t,n,r),uz(t,n,r,o),a=!0):a=null===e?function(e,t,n,r){var o,i,a,s=e.stateNode,u=e.memoizedProps;s.props=u;var l=s.context,c=t.contextType,d=sr;if("object"==typeof c&&null!==c)d=uv(c);else{var f=ss(e,t,!0);d=sl(e,f)}var p=t.getDerivedStateFromProps,h="function"==typeof p||"function"==typeof s.getSnapshotBeforeUpdate;h||"function"!=typeof s.UNSAFE_componentWillReceiveProps&&"function"!=typeof s.componentWillReceiveProps||u===n&&l===d||uF(e,s,n,d),uk=!1;var m=e.memoizedState,g=s.state=m;if(uR(e,n,s,r),g=e.memoizedState,u===n&&m===g&&!sc()&&!uk)return"function"==typeof s.componentDidMount&&(o=4194308,(16&e.mode)!=0&&(o|=16777216),e.flags|=o),!1;"function"==typeof p&&(uN(e,t,p,n),g=e.memoizedState);var v=uk||uA(e,t,u,n,m,g,d);return v?(h||"function"!=typeof s.UNSAFE_componentWillMount&&"function"!=typeof s.componentWillMount||("function"==typeof s.componentWillMount&&s.componentWillMount(),"function"==typeof s.UNSAFE_componentWillMount&&s.UNSAFE_componentWillMount()),"function"==typeof s.componentDidMount&&(i=4194308,(16&e.mode)!=0&&(i|=16777216),e.flags|=i)):("function"==typeof s.componentDidMount&&(a=4194308,(16&e.mode)!=0&&(a|=16777216),e.flags|=a),// memoized state to indicate that this work can be reused.
e.memoizedProps=n,e.memoizedState=g),// if shouldComponentUpdate returns false.
s.props=n,s.state=g,s.context=d,v}// Invokes the update life-cycles and returns false if it shouldn't rerender.
(t,n,r,o):function(e,t,n,r,o){var i=t.stateNode;ux(e,t);var a=t.memoizedProps,s=t.type===t.elementType?a:ua(t.type,a);i.props=s;var u=t.pendingProps,l=i.context,c=n.contextType,d=sr;if("object"==typeof c&&null!==c)d=uv(c);else{var f=ss(t,n,!0);d=sl(t,f)}var p=n.getDerivedStateFromProps,h="function"==typeof p||"function"==typeof i.getSnapshotBeforeUpdate;h||"function"!=typeof i.UNSAFE_componentWillReceiveProps&&"function"!=typeof i.componentWillReceiveProps||a===u&&l===d||uF(t,i,r,d),uk=!1;var m=t.memoizedState,g=i.state=m;if(uR(t,r,i,o),g=t.memoizedState,a===u&&m===g&&!sc()&&!uk)return"function"==typeof i.componentDidUpdate&&(a!==e.memoizedProps||m!==e.memoizedState)&&(t.flags|=4),"function"==typeof i.getSnapshotBeforeUpdate&&(a!==e.memoizedProps||m!==e.memoizedState)&&(t.flags|=/*                     */1024),!1;"function"==typeof p&&(uN(t,n,p,r),g=t.memoizedState);var v=uk||uA(t,n,s,r,m,g,d)||!1;return v?(h||"function"!=typeof i.UNSAFE_componentWillUpdate&&"function"!=typeof i.componentWillUpdate||("function"==typeof i.componentWillUpdate&&i.componentWillUpdate(r,g,d),"function"==typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(r,g,d)),"function"==typeof i.componentDidUpdate&&(t.flags|=4),"function"==typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"==typeof i.componentDidUpdate&&(a!==e.memoizedProps||m!==e.memoizedState)&&(t.flags|=4),"function"==typeof i.getSnapshotBeforeUpdate&&(a!==e.memoizedProps||m!==e.memoizedState)&&(t.flags|=1024),// memoized props/state to indicate that this work can be reused.
t.memoizedProps=r,t.memoizedState=g),// if shouldComponentUpdate returns false.
i.props=r,i.state=g,i.context=d,v}(e,t,n,r,o);var h=c0(e,t,n,a,i,o),m=t.stateNode;return a&&m.props!==r&&(eg||eN("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",tO(t)||"a component"),eg=!0),h}function c0(e,t,n,r,o,i){// Refs should update even if shouldComponentUpdate returns false
cX(e,t);var a,s,u=(128&t.flags)!=0;if(!r&&!u)return o&&sv(t,n,!1),du(e,t,i);var l=t.stateNode;// Rerender
if(c$.current=t,u&&"function"!=typeof n.getDerivedStateFromError)// If we captured an error, but getDerivedStateFromError is not defined,
// unmount all the children. componentDidCatch will schedule an update to
// re-render a fallback. This is temporary until we migrate everyone to
// the new API.
// TODO: Warn in a future release.
s=null,cE=-1;else{if(rB(t),tI=!0,s=l.render(),8&t.mode){rj(!0);try{l.render()}finally{rj(!1)}}tI=!1,rV()}// React DevTools reads this flag.
return(t.flags|=1,null!==e&&u)?(a=s,// This function is fork of reconcileChildren. It's used in cases where we
// want to reconcile without matching against the existing set. This has the
// effect of all current children being unmounted; even if the type and key
// are the same, the old child is unmounted and a new child is created.
//
// To do this, we're going to go through the reconcile algorithm twice. In
// the first pass, we schedule a deletion for all the current children by
// passing null.
t.child=uY(t,e.child,null,i),// pass null in place of where we usually pass the current child set. This has
// the effect of remounting all children regardless of whether their
// identities match.
t.child=uY(t,null,a,i)):cH(e,t,s,i),// Memoize state using the values we just used to render.
// TODO: Restructure so we never read values from the instance.
t.memoizedState=l.state,o&&sv(t,n,!0),t.child}function c1(e){var t=e.stateNode;t.pendingContext?sh(e,t.pendingContext,t.pendingContext!==t.context):t.context&&sh(e,t.context,!1),u1(e,t.containerInfo)}function c2(e,t,n,r,o){return(// Revert to client rendering.
s0(),s2(o),t.flags|=/*            */256,cH(e,t,n,r),t.child)}function c3(e,t){if(t&&t.childContextTypes&&eN("%s(...): childContextTypes cannot be defined on a function component.",t.displayName||t.name||"Component"),null!==e.ref){var n="",r=tD();r&&(n+="\n\nCheck the render method of `"+r+"`.");var o=r||"",i=e._debugSource;i&&(o=i.fileName+":"+i.lineNumber),em[o]||(em[o]=!0,eN("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s",n))}if("function"==typeof t.getDerivedStateFromProps){var a=tC(t)||"Unknown";eh[a]||(eN("%s: Function components do not support getDerivedStateFromProps.",a),eh[a]=!0)}if("object"==typeof t.contextType&&null!==t.contextType){var s=tC(t)||"Unknown";ep[s]||(eN("%s: Function components do not support contextType.",s),ep[s]=!0)}}ed={},ef={},ep={},eh={},em={},eg=!1,ev={},ey={};var c4={dehydrated:null,treeContext:null,retryLane:0};function c6(e){return{baseLanes:e,cachePool:null,transitions:null}}function c5(e,t,n){var r=t.pendingProps;// This is used by DevTools to force a boundary to suspend.
pL(t)&&(t.flags|=128);var o=u5.current,i=!1,a=(128&t.flags)!=0;// boundary's children. This involves some custom reconciliation logic. Two
// main reasons this is so complicated.
//
// First, Legacy Mode has different semantics for backwards compatibility. The
// primary tree will commit in an inconsistent state, so when we do the
// second pass to render the fallback, we do some exceedingly, uh, clever
// hacks to make that not totally break. Like transferring effects and
// deletions from hidden tree. In Concurrent Mode, it's much simpler,
// because we bailout on the primary tree completely and leave it in its old
// state, no effects. Same as what we do for Offscreen (except that
// Offscreen doesn't have the first render pass).
//
// Second is hydration. During hydration, the Suspense fiber has a slightly
// different layout, where the child points to a dehydrated fragment, which
// contains the DOM rendered by the server.
//
// Third, even if you set all that aside, Suspense is like error boundaries in
// that we first we try to render one tree, and if that fails, we render again
// and switch to a different tree. Like a try/catch block. So we have to track
// which branch we're currently rendering. Ideally we would model this using
// a stack.
if(a||(s=o,// If we're already showing a fallback, there are cases where we need to
// remain on that fallback regardless of whether the content has resolved.
// For example, SuspenseList coordinates when nested content appears.
(null===e||null!==e.memoizedState)&&(2&s)!=0// Not currently showing content. Consult the Suspense context.
)?(// Something in this boundary's subtree already suspended. Switch to
// rendering the fallback children.
i=!0,t.flags&=-129):(null===e||null!==e.memoizedState)&&(o|=1),u8(t,o&=1),null===e){// Initial mount
// Special path for hydration
// If we're currently hydrating, try to hydrate this boundary.
sG(t);// This could've been a dehydrated suspense component.
var s,u,l,c,d,f,p=t.memoizedState;if(null!==p){var h=p.dehydrated;if(null!==h)return(1&t.mode)==0?(eN("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."),t.lanes=1):aV(h)?// for this, we need to schedule that at a higher priority based on when it would
// have timed out. In theory we could render it in this pass but it would have the
// wrong priority associated with it and will prevent hydration of parent path.
// Instead, we'll leave work left on it to render it in a separate commit.
// TODO This time should be the time at which the server rendered response that is
// a parent to this boundary was displayed. However, since we currently don't have
// a protocol to transfer that time, we'll just estimate it by using the current
// time. This will mean that Suspense timeouts are slightly shifted to later than
// they should be.
// Schedule a normal pri update to render this content.
t.lanes=8:// be showing the right content coming from the server, it is no rush.
t.lanes=1073741824,null}var m=r.children,g=r.fallback;if(!i)return c8(t,m);var v=(c=t.mode,d=t.child,f={mode:"hidden",children:m},(1&c)==0&&null!==d?(// In legacy mode, we commit the primary tree as if it successfully
// completed, even though it's in an inconsistent state.
(u=d).childLanes=0,u.pendingProps=f,/*                    */2&t.mode&&(// Reset the durations from the first pass so they aren't included in the
// final amounts. This seems counterintuitive, since we're intentionally
// not measuring part of the render phase, but this makes it match what we
// do in Concurrent Mode.
u.actualDuration=0,u.actualStartTime=-1,u.selfBaseDuration=0,u.treeBaseDuration=0)):u=c7(f,c),l=pb(g,c,n,null),u.return=t,l.return=t,u.sibling=l,t.child=u,l);return t.child.memoizedState=c6(n),t.memoizedState=c4,v}// This is an update.
// Special path for hydration
var y=e.memoizedState;if(null!==y){var b=y.dehydrated;if(null!==b)return function(e,t,n,r,o,i,a){if(n){// This is the second render pass. We already attempted to hydrated, but
// something either suspended or errored.
if(256&t.flags)return(// Something errored during hydration. Try again without hydrating.
t.flags&=-257,c9(e,t,a,cA(Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."))));if(null!==t.memoizedState)return(// Something suspended and we should still be in dehydrated mode.
// Leave the existing child in place.
t.child=e.child,// but the normal suspense pass doesn't.
t.flags|=128,null);// Suspended but we should no longer be in dehydrated mode.
// Therefore we now have to render the fallback.
var s,u,l,c,d,f,p=r.children,h=r.fallback,m=(d=c7({mode:"visible",children:p},c=t.mode),f=pb(h,c,a,null),// boundary) already mounted but this is a new fiber.
f.flags|=2,d.return=t,f.return=t,d.sibling=f,t.child=d,(1&t.mode)!=0&&// deletion. We need to reconcile to delete the current child.
uY(t,e.child,null,a),f);return t.child.memoizedState=c6(a),t.memoizedState=c4,m}if(sz&&eN("We should not be hydrating here. This is a bug in React. Please file a bug."),(1&t.mode)==0)return c9(e,t,a,// de-opt to client rendering should have an error message.
null);if(aV(o)){var g,v,y,b,w,_,k,S=((b=o.nextSibling&&o.nextSibling.dataset)&&(g=b.dgst,v=b.msg,y=b.stck),{message:v,digest:g,stack:y});return w=S.digest,_=S.message,k=S.stack,c9(e,t,a,cA(_?Error(_):Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."),w,k))}// any context has changed, we need to treat is as if the input might have changed.
var x=(a&e.childLanes)!=0;if(cW||x){// This boundary has changed since the first render. This means that we are now unable to
// hydrate it. We might still be able to hydrate it using a higher priority lane.
var E=d8;if(null!==E){var C=function(e,t){var n;switch(t&-t){case 4:n=2;break;case 16:n=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:n=32;break;case 536870912:n=268435456;break;default:// Everything else is already either a hydration lane, or shouldn't
// be retried at a hydration lane.
n=0}// Check if the lane we chose is suspended. If so, that indicates that we
return(// already attempted and failed to hydrate at that level. Also check if we're
// already rendering that lane, which is rare but could happen.
(n&(e.suspendedLanes|t))!=0?0:n)}(E,a);0!==C&&C!==i.retryLane&&(// Intentionally mutating since this render will get interrupted. This
// is one of the very rare times where we mutate the current tree
// during the render phase.
i.retryLane=C,u_(e,C),fM(E,e,C,-1))}// If we have scheduled higher pri work above, this will probably just abort the render
return(// since we now have higher priority work, but in case it doesn't, we need to prepare to
// render something, if we time out. Even if that requires us to delete everything and
// skip hydration.
// Delay having to do this as long as the suspense timeout allows us.
fY(),c9(e,t,a,cA(Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."))))}if(aB(o)){// This component is still pending more data from the server, so we can't hydrate its
// content. We treat it as if this component suspended itself. It might seem as if
// we could just try to render it client-side instead. However, this will perform a
// lot of unnecessary work and is unlikely to complete since it often will suspend
// on missing data anyway. Additionally, the server might be able to render more
// than we can on the client yet. In that case we'd end up with more fallback states
// on the client than if we just leave it alone. If the server times out or errors
// these should update this boundary to the permanent Fallback state instead.
// Mark it as having captured (i.e. suspended).
t.flags|=128,t.child=e.child;var T=f6.bind(null,e);return o._reactRetry=T,null}s=t,u=o,l=i.treeContext,sF=a$(u.nextSibling),sj=s,sz=!0,sB=null,sq=!1,null!==l&&(sU(),sT[sO++]=sP,sT[sO++]=sI,sT[sO++]=sR,sP=l.id,sI=l.overflow,sR=s);var O=c8(t,r.children);// Mark the children as hydrating. This is a fast path to know whether this
return(// tree is part of a hydrating tree. This is used to determine if a child
// node has fully mounted yet, and for scheduling event replaying.
// Conceptually this is similar to Placement in that a new subtree is
// inserted into the React tree here. It just happens to not need DOM
// mutations because it already exists.
O.flags|=/*                    */4096,O)}(e,t,a,r,b,y,n)}if(i){var w,_,k,S,x,E,C,T=r.fallback,O=(w=r.children,S=t.mode,E=(x=e.child).sibling,C={mode:"hidden",children:w},(1&S)==0&&// Make sure we're on the second pass, i.e. the primary child fragment was
// already cloned. In legacy mode, the only case where this isn't true is
// when DevTools forces us to display a fallback; we skip the first render
// pass entirely and go straight to rendering the fallback. (In Concurrent
// Mode, SuspenseList can also trigger this scenario, but this is a legacy-
// only codepath.)
t.child!==x?((_=t.child).childLanes=0,_.pendingProps=C,2&t.mode&&(// Reset the durations from the first pass so they aren't included in the
// final amounts. This seems counterintuitive, since we're intentionally
// not measuring part of the render phase, but this makes it match what we
// do in Concurrent Mode.
_.actualDuration=0,_.actualStartTime=-1,_.selfBaseDuration=x.selfBaseDuration,_.treeBaseDuration=x.treeBaseDuration),// However, since we're going to remain on the fallback, we no longer want
// to delete it.
t.deletions=null):// (We don't do this in legacy mode, because in legacy mode we don't re-use
// the current tree; see previous branch.)
(_=pg(x,C)).subtreeFlags=14680064&x.subtreeFlags,null!==E?k=pg(E,T):(k=pb(T,S,n,null),// mounted but this is a new fiber.
k.flags|=2),k.return=t,_.return=t,_.sibling=k,t.child=_,k),R=t.child,P=e.child.memoizedState;return R.memoizedState=null===P?c6(n):{baseLanes:P.baseLanes|n,cachePool:null,transitions:P.transitions},R.childLanes=e.childLanes&~n,t.memoizedState=c4,O}var I=function(e,t,n,r){var o=e.child,i=o.sibling,a=pg(o,{mode:"visible",children:n});if((1&t.mode)==0&&(a.lanes=r),a.return=t,a.sibling=null,null!==i){// Delete the fallback child fragment
var s=t.deletions;null===s?(t.deletions=[i],t.flags|=16):s.push(i)}return t.child=a,a}(e,t,r.children,n);return t.memoizedState=null,I}function c8(e,t,n){var r=c7({mode:"visible",children:t},e.mode);return r.return=e,e.child=r,r}function c7(e,t,n){// The props argument to `createFiberFromOffscreen` is `any` typed, so we use
// this wrapper function to constrain it.
return pw(e,t,0,null)}function c9(e,t,n,r){null!==r&&s2(r),// This will add the old fiber to the deletion list
uY(t,e.child,null,n);var o=t.pendingProps.children,i=c8(t,o);return(// mounted but this is a new fiber.
i.flags|=2,t.memoizedState=null,i)}function de(e,t,n){e.lanes=e.lanes|t;var r=e.alternate;null!==r&&(r.lanes=r.lanes|t),um(e.return,t,n)}function dt(e,t){var n=t6(e),r=!n&&"function"==typeof tg(e);if(n||r){var o=n?"array":"iterable";return eN("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",o,t,o),!1}return!0}function dn(e,t,n,r,o){var i=e.memoizedState;null===i?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:o}:(// We can reuse the existing object from previous renders.
i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=o)}// This can end up rendering this component multiple passes.
// The first pass splits the children fibers into two sets. A head and tail.
// We first render the head. If anything is in fallback state, we do another
// pass through beginWork to rerender all children (including the tail) with
// the force suspend context. If the first render didn't have anything in
// in fallback state. Then we render each row in the tail one-by-one.
// That happens in the completeWork phase without going back to beginWork.
function dr(e,t,n){var r=t.pendingProps,o=r.revealOrder,i=r.tail,a=r.children;(function(e){if(void 0!==e&&"forwards"!==e&&"backwards"!==e&&"together"!==e&&!ev[e]){if(ev[e]=!0,"string"==typeof e)switch(e.toLowerCase()){case"together":case"forwards":case"backwards":eN('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',e,e.toLowerCase());break;case"forward":case"backward":eN('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',e,e.toLowerCase());break;default:eN('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}else eN('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}})(o),void 0===i||ey[i]||("collapsed"!==i&&"hidden"!==i?(ey[i]=!0,eN('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',i)):"forwards"!==o&&"backwards"!==o&&(ey[i]=!0,eN('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',i))),function(e,t){if(("forwards"===t||"backwards"===t)&&null!=e&&!1!==e){if(t6(e)){for(var n=0;n<e.length;n++)if(!dt(e[n],n))return}else{var r=tg(e);if("function"==typeof r){var o=r.call(e);if(o)for(var i=o.next(),a=0;!i.done;i=o.next()){if(!dt(i.value,a))return;a++}}else eN('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',t)}}}(a,o),cH(e,t,a,n);var s=u5.current;if((2&s)!=0?(s=1&s|2,t.flags|=128):(null!==e&&(128&e.flags)!=0&&// on any nested boundaries to let them know to try to render
// again. This is the same as context updating.
function(e,t,n){for(// Mark any Suspense boundaries with fallbacks as having work to do.
// If they were previously forced into fallbacks, they may now be able
// to unblock.
var r=t;null!==r;){if(13===r.tag)null!==r.memoizedState&&de(r,n,e);else if(19===r.tag)// to schedule work on. In this case we have to schedule it on the
// list itself.
// We don't have to traverse to the children of the list since
// the list will propagate the change when it rerenders.
de(r,n,e);else if(null!==r.child){r.child.return=r,r=r.child;continue}if(r===e)return;for(;null===r.sibling;){if(null===r.return||r.return===e)return;r=r.return}r.sibling.return=r.return,r=r.sibling}}(t,t.child,n),s&=1),u8(t,s),(1&t.mode)==0)// use make it a noop by treating it as the default revealOrder.
t.memoizedState=null;else switch(o){case"forwards":var u,l=function(e){for(// This is going to find the last row among these children that is already
// showing content on the screen, as opposed to being in fallback state or
// new. If a row has multiple Suspense boundaries, any of them being in the
// fallback state, counts as the whole row being in a fallback state.
// Note that the "rows" will be workInProgress, but any nested children
// will still be current since we haven't rendered them yet. The mounted
// order may not be the same as the new order. We use the new order.
var t=e,n=null;null!==t;){var r=t.alternate;// New rows can't be content rows.
null!==r&&null===u7(r)&&(n=t),t=t.sibling}return n}(t.child);null===l?(// The whole list is part of the tail.
// TODO: We could fast path by just rendering the tail now.
u=t.child,t.child=null):(// Disconnect the tail rows after the content row.
// We're going to render them separately later.
u=l.sibling,l.sibling=null),dn(t,!1,u,l,i);break;case"backwards":// We're going to find the first row that has existing content.
// At the same time we're going to reverse the list of everything
// we pass in the meantime. That's going to be our tail in reverse
// order.
var c=null,d=t.child;for(t.child=null;null!==d;){var f=d.alternate;// New rows can't be content rows.
if(null!==f&&null===u7(f)){// This is the beginning of the main content.
t.child=d;break}var p=d.sibling;d.sibling=c,c=d,d=p}// TODO: If workInProgress.child is null, we can continue on the tail immediately.
dn(t,!0,c,null,i);break;case"together":dn(t,!1,null,null,void 0);break;default:// The default reveal order is the same as not having
// a boundary.
t.memoizedState=null}return t.child}var di=!1,da=!1;function ds(e,t){(1&t.mode)==0&&null!==e&&(// A lazy component only mounts if it suspended inside a non-
// concurrent tree, in an inconsistent state. We want to treat it like
// a new mount, even though an empty version of it already committed.
// Disconnect the alternate pointers.
e.alternate=null,t.alternate=null,t.flags|=2)}function du(e,t,n){var r;return(null!==e&&(t.dependencies=e.dependencies),cE=-1,r=t.lanes,fi|=r,(n&t.childLanes)!=0)?(// This fiber doesn't have work, but its subtree does. Clone the child
// fibers and continue.
function(e,t){if(null!==e&&t.child!==e.child)throw Error("Resuming work not yet implemented.");if(null!==t.child){var n=t.child,r=pg(n,n.pendingProps);for(t.child=r,r.return=t;null!==n.sibling;)n=n.sibling,(r=r.sibling=pg(n,n.pendingProps)).return=t;r.sibling=null}}// Reset a workInProgress child set to prepare it for a second pass.
(e,t),t.child):null}function dl(e,t){return(e.lanes&t)!=0}function dc(e,t,n){if(t._debugNeedsRemount&&null!==e)return function(e,t,n){var r=t.return;if(null===r)throw Error("Cannot swap the root fiber.");if(// Disconnect from the old current.
// It will get deleted.
e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,t===r.child)r.child=n;else{var o=r.child;if(null===o)throw Error("Expected parent to have a child.");for(;o.sibling!==t;)if(null===(o=o.sibling))throw Error("Expected to find the previous sibling.");o.sibling=n}// Delete the old fiber and place the new one.
// Since the old fiber is disconnected, we have to schedule it manually.
var i=r.deletions;return null===i?(r.deletions=[e],r.flags|=16):i.push(e),n.flags|=2,n}(e,t,pv(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes));if(null!==e){if(e.memoizedProps!==t.pendingProps||sc()||t.type!==e.type)// This may be unset if the props are determined to be equal later (memo).
cW=!0;else{if(!dl(e,n)&&// If this is the second pass of an error or suspense boundary, there
// may not be work scheduled on `current`, so we check for this flag.
(128&t.flags)==0)return(// No pending updates or context. Bail out now.
cW=!1,function(e,t,n){// This fiber does not have any pending work. Bailout without entering
// the begin phase. There's still some bookkeeping we that needs to be done
// in this optimized path, mostly pushing stuff onto the stack.
switch(t.tag){case 3:c1(t),t.stateNode,s0();break;case 5:u4(t);break;case 1:sd(t.type)&&sg(t);break;case 4:u1(t,t.stateNode.containerInfo);break;case 10:var r=t.memoizedProps.value,o=t.type._context;up(t,o,r);break;case 12:(n&t.childLanes)!=0&&(t.flags|=4);// Reset effect durations for the next eventual effect phase.
// These are reset during render to allow the DevTools commit hook a chance to read them,
var i=t.stateNode;i.effectDuration=0,i.passiveEffectDuration=0;break;case 13:var a=t.memoizedState;if(null!==a){if(null!==a.dehydrated)// upgrade it. We return null instead of bailoutOnAlreadyFinishedWork.
return u8(t,1&u5.current),// been unsuspended it has committed as a resolved Suspense component.
// If it needs to be retried, it should have work scheduled on it.
t.flags|=128,null;// If this boundary is currently timed out, we need to decide
if((n&t.child.childLanes)!=0)// to attempt to render the primary children again.
return c5(e,t,n);// The primary child fragment does not have pending work marked
// on it
u8(t,1&u5.current);// The primary children do not have pending work with sufficient
// priority. Bailout.
var s=du(e,t,n);if(null!==s)// primary children and work on the fallback.
return s.sibling;// whether there were nested context consumers, via the call to
// `bailoutOnAlreadyFinishedWork` above.
return null}u8(t,1&u5.current);break;case 19:var u=(128&e.flags)!=0,l=(n&t.childLanes)!=0;if(u){if(l)// same children then we're still in progressive loading state.
// Something might get unblocked by state updates or retries in the
// tree which will affect the tail. So we need to use the normal
// path to compute the correct tail.
return dr(e,t,n);// If none of the children had any work, that means that none of
// them got retried so they'll still be blocked in the same way
// as before. We can fast bail out.
t.flags|=128}// If nothing suspended before and we're rendering the same children,
// then the tail doesn't matter. Anything new that suspends will work
// in the "together" mode, so we can continue from the state we had.
var c=t.memoizedState;if(null!==c&&(// Reset to the "together" mode in case we've started a different
// update in the past but didn't complete it.
c.rendering=null,c.tail=null,c.lastEffect=null),u8(t,u5.current),!l)// them got retried so they'll still be blocked in the same way
// as before. We can fast bail out.
return null;break;case 22:case 23:return(// Need to check if the tree still needs to be deferred. This is
// almost identical to the logic used in the normal update path,
// so we'll just enter that. The only difference is we'll bail out
// at the next level instead of this one, because the child props
// have not changed. Which is fine.
// TODO: Probably should refactor `beginWork` to split the bailout
// path from the normal path. I'm tempted to do a labeled break here
// but I won't :)
t.lanes=0,cG(e,t,n))}return du(e,t,n)}(e,t,n));// See https://github.com/facebook/react/pull/19216.
cW=(131072&e.flags)!=0}}else if(cW=!1,sz&&(sU(),(1048576&t.flags)!=0)){// Check if this child belongs to a list of muliple children in
// its parent.
//
// In a true multi-threaded implementation, we would render children on
// parallel threads. This would represent the beginning of a new render
// thread for this subtree.
//
// We only use this for id generation during hydration, which is why the
// logic is located in this special branch.
var r=t.index;sM(t,(sU(),sC),r)}// Before entering the begin phase, clear pending update priority.
switch(// TODO: This assumes that we're about to evaluate the component and process
// the update queue. However, there's an exception: SimpleMemoComponent
// sometimes bails out later in the begin phase. This indicates that we should
// move this assignment out of the common path and into each branch.
t.lanes=0,t.tag){case 2:return function(e,t,n,r){ds(e,t);var o,i,a,s=t.pendingProps,u=ss(t,n,!1);if(o=sl(t,u),ug(t,r),rB(t),n.prototype&&"function"==typeof n.prototype.render){var l=tC(n)||"Unknown";ed[l]||(eN("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",l,l),ed[l]=!0)}// Support for module components is deprecated and is removed behind a flag.
// Whether or not it would crash later, we want to show a good message in DEV first.
if(8&t.mode&&s4.recordLegacyContextWarning(t,null),tI=!0,c$.current=t,i=lw(null,t,n,s,o,r),a=l_(),tI=!1,rV(),t.flags|=1,"object"==typeof i&&null!==i&&"function"==typeof i.render&&void 0===i.$$typeof){var c=tC(n)||"Unknown";ef[c]||(eN("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",c,c,c),ef[c]=!0)}if("object"==typeof i&&null!==i&&"function"==typeof i.render&&void 0===i.$$typeof){var d=tC(n)||"Unknown";ef[d]||(eN("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",d,d,d),ef[d]=!0),t.tag=1,t.memoizedState=null,t.updateQueue=null;// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var f=!1;return sd(n)?(f=!0,sg(t)):f=!1,t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,uS(t),uU(t,i),uz(t,n,s,r),c0(null,t,n,!0,f,r)}if(// Proceed under the assumption that this is a function component
t.tag=0,8&t.mode){rj(!0);try{i=lw(null,t,n,s,o,r),a=l_()}finally{rj(!1)}}return sz&&a&&sN(t),cH(null,t,i,r),c3(t,n),t.child}(e,t,t.type,n);case 16:var o=t.elementType;return function(e,t,n,r){ds(e,t);var o,i=t.pendingProps,a=n._payload,s=(0,n._init)(a);t.type=s;var u=t.tag=function(e){if("function"==typeof e)return pm(e)?1:0;if(null!=e){var t=e.$$typeof;if(t===tl)return 11;if(t===tf)return 14}return 2}// This is used to create an alternate fiber to do work on.
(s),l=ua(s,i);switch(u){case 0:return c3(t,s),t.type=s=pl(s),cJ(null,t,s,l,r);case 1:return t.type=s=pl(s),cZ(null,t,s,l,r);case 11:return t.type=s=pc(s),cY(null,t,s,l,r);case 14:if(t.type!==t.elementType){var c=s.propTypes;c&&a8(c,l,"prop",tC(s))}return cQ(null,t,s,ua(s.type,l),r)}var d="";// because the fact that it's a separate type of work is an
// implementation detail.
throw null!==s&&"object"==typeof s&&s.$$typeof===tp&&(d=" Did you wrap a component in React.lazy() more than once?"),Error("Element type is invalid. Received a promise that resolves to: "+s+". Lazy element type must resolve to a class or function."+d)}(e,t,o,n);case 0:var i=t.type,a=t.pendingProps,s=t.elementType===i?a:ua(i,a);return cJ(e,t,i,s,n);case 1:var u=t.type,l=t.pendingProps,c=t.elementType===u?l:ua(u,l);return cZ(e,t,u,c,n);case 3:return function(e,t,n){if(c1(t),null===e)throw Error("Should have a current fiber. This is a bug in React.");var r=t.pendingProps,o=t.memoizedState,i=o.element;ux(e,t),uR(t,r,null,n);var a=t.memoizedState;t.stateNode;// being called "element".
var s=a.element;if(o.isDehydrated){// This is a hydration root whose shell has not yet hydrated. We should
// attempt to hydrate.
// Flip isDehydrated to false to indicate that when this render
// finishes, the root will no longer be dehydrated.
var u={element:s,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions};if(// have reducer functions so it doesn't need rebasing.
t.updateQueue.baseState=u,t.memoizedState=u,256&t.flags){// Something errored during a previous attempt to hydrate the shell, so we
// forced a client render.
var l=cL(Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."),t);return c2(e,t,s,n,l)}if(s!==i){var c=cL(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t);return c2(e,t,s,n,c)}// The outermost shell has not hydrated yet. Start hydrating.
sF=a$(t.stateNode.containerInfo.firstChild),sj=t,sz=!0,sB=null,sq=!1;var d=uQ(t,null,s,n);t.child=d;for(var f=d;f;)// Mark each child as hydrating. This is a fast path to know whether this
// tree is part of a hydrating tree. This is used to determine if a child
// node has fully mounted yet, and for scheduling event replaying.
// Conceptually this is similar to Placement in that a new subtree is
// inserted into the React tree here. It just happens to not need DOM
// mutations because it already exists.
f.flags=-3&f.flags|4096,f=f.sibling}else{if(// Root is not dehydrated. Either this is a client-only root, or it
// already hydrated.
s0(),s===i)return du(e,t,n);cH(e,t,s,n)}return t.child}(e,t,n);case 5:return u4(t),null===e&&sG(t),_=t.type,k=t.pendingProps,S=null!==e?e.memoizedProps:null,x=k.children,aL(_,k)?// case. We won't handle it as a reified child. We will instead handle
// this in the host environment that also has access to this prop. That
// avoids allocating another HostText fiber and traversing it.
x=null:null!==S&&aL(_,S)&&// empty, we need to schedule the text content to be reset.
(t.flags|=/*                 */32),cX(e,t),cH(e,t,x,n),t.child;case 6:return null===e&&sG(t),null;case 13:return c5(e,t,n);case 4:return u1(t,t.stateNode.containerInfo),E=t.pendingProps,null===e?// but at commit. Therefore we need to track insertions which the normal
// flow doesn't do during mount. This doesn't happen at the root because
// the root always starts with a "current" with a null child.
// TODO: Consider unifying this with how the root works.
t.child=uY(t,null,E,n):cH(e,t,E,n),t.child;case 11:var d=t.type,f=t.pendingProps,p=t.elementType===d?f:ua(d,f);return cY(e,t,d,p,n);case 7:return C=t.pendingProps,cH(e,t,C,n),t.child;case 8:return T=t.pendingProps.children,cH(e,t,T,n),t.child;case 12:return t.flags|=4,(O=t.stateNode).effectDuration=0,O.passiveEffectDuration=0,R=t.pendingProps.children,cH(e,t,R,n),t.child;case 10:return function(e,t,n){var r=t.type._context,o=t.pendingProps,i=t.memoizedProps,a=o.value;"value"in o||di||(di=!0,eN("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));var s=t.type.propTypes;if(s&&a8(s,o,"prop","Context.Provider"),up(t,r,a),null!==i){if(iT(i.value,a))// No change. Bailout early if children are the same.
{if(i.children===o.children&&!sc())return du(e,t,n)}else// them to update.
(function(e,t,n){var r=e.child;for(null!==r&&(r.return=e);null!==r;){var o=void 0,i=r.dependencies;// Visit this fiber.
if(null!==i){o=r.child;for(var a=i.firstContext;null!==a;){// Check if the context matches.
if(a.context===t){// Match! Schedule an update on this fiber.
if(1===r.tag){var s,u=uE(-1,(s=n)&-s);u.tag=2;// TODO: Because we don't have a work-in-progress, this will add the
// update to the current fiber, too, which means it will persist even if
// this render is thrown away. Since it's a race condition, not sure it's
// worth fixing.
// Inlined `enqueueUpdate` to remove interleaved update check
var l=r.updateQueue;if(null===l);else{var c=l.shared,d=c.pending;null===d?u.next=u:(u.next=d.next,d.next=u),c.pending=u}}r.lanes=r.lanes|n;var f=r.alternate;null!==f&&(f.lanes=f.lanes|n),um(r.return,n,e),i.lanes=i.lanes|n;break}a=a.next}}else if(10===r.tag)o=r.type===e.type?null:r.child;else if(18===r.tag){// If a dehydrated suspense boundary is in this subtree, we don't know
// if it will have any context consumers in it. The best we can do is
// mark it as having updates.
var p=r.return;if(null===p)throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");p.lanes=p.lanes|n;var h=p.alternate;null!==h&&(h.lanes=h.lanes|n),// This is intentionally passing this fiber as the parent
// because we want to schedule this fiber as having work
// on its children. We'll use the childLanes on
// this fiber to indicate that a context has changed.
um(p,n,e),o=r.sibling}else o=r.child;if(null!==o)o.return=r;else for(// No child. Traverse to next sibling.
o=r;null!==o;){if(o===e){// We're back to the root of this subtree. Exit.
o=null;break}var m=o.sibling;if(null!==m){// Set the return pointer of the sibling to the work-in-progress fiber.
m.return=o.return,o=m;break}// No more siblings. Traverse up.
o=o.return}r=o}})(t,r,n)}return cH(e,t,o.children,n),t.child}(e,t,n);case 9:return void 0===(y=t.type)._context?y===y.Consumer||da||(da=!0,eN("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")):y=y._context,"function"!=typeof(b=t.pendingProps.children)&&eN("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),ug(t,n),w=uv(y),rB(t),c$.current=t,tI=!0,v=b(w),tI=!1,rV(),t.flags|=1,cH(e,t,v,n),t.child;case 14:var h=t.type,m=ua(h,t.pendingProps);if(t.type!==t.elementType){var g=h.propTypes;g&&a8(g,m,"prop",tC(h))}return m=ua(h.type,m),cQ(e,t,h,m,n);case 15:return cK(e,t,t.type,t.pendingProps,n);case 17:var v,y,b,w,_,k,S,x,E,C,T,O,R,P,I=t.type,D=t.pendingProps,M=t.elementType===I?D:ua(I,D);return ds(e,t),t.tag=1,sd(I)?(P=!0,sg(t)):P=!1,ug(t,n),uj(t,I,M),uz(t,I,M,n),c0(null,t,I,!0,P,n);case 19:return dr(e,t,n);case 21:break;case 22:return cG(e,t,n)}throw Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function dd(e){// Tag the fiber with an update effect. This turns a Placement into
// a PlacementAndUpdate.
e.flags|=4}function df(e){e.flags|=512,e.flags|=2097152}function dp(e,t){if(!sz)switch(e.tailMode){case"hidden":for(// Any insertions at the end of the tail list after this point
// should be invisible. If there are already mounted boundaries
// anything before them are not considered for collapsing.
// Therefore we need to go through the whole tail to find if
// there are any.
var n=e.tail,r=null;null!==n;)null!==n.alternate&&(r=n),n=n.sibling;// Next we're simply going to delete all insertions after the
// last rendered item.
null===r?e.tail=null:// inserted.
r.sibling=null;break;case"collapsed":for(// Any insertions at the end of the tail list after this point
// should be invisible. If there are already mounted boundaries
// anything before them are not considered for collapsing.
// Therefore we need to go through the whole tail to find if
// there are any.
var o=e.tail,i=null;null!==o;)null!==o.alternate&&(i=o),o=o.sibling;// Next we're simply going to delete all insertions after the
// last rendered item.
null===i?t||null===e.tail?e.tail=null:// row at the tail. So we'll keep on and cut off the rest.
e.tail.sibling=null:// inserted.
i.sibling=null}}function dh(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t){// Bubble up the earliest expiration time.
if((2&e.mode)!=0){for(// In profiling mode, resetChildExpirationTime is also used to reset
// profiler durations.
var o=e.selfBaseDuration,i=e.child;null!==i;)n|=i.lanes|i.childLanes,// so we should bubble those up even during a bailout. All the other
// flags have a lifetime only of a single render + commit, so we should
// ignore them.
r|=14680064&i.subtreeFlags,r|=14680064&i.flags,o+=i.treeBaseDuration,i=i.sibling;e.treeBaseDuration=o}else for(var a=e.child;null!==a;)n|=a.lanes|a.childLanes,// so we should bubble those up even during a bailout. All the other
// flags have a lifetime only of a single render + commit, so we should
// ignore them.
r|=14680064&a.subtreeFlags,r|=14680064&a.flags,// smell because it assumes the commit phase is never concurrent with
// the render phase. Will address during refactor to alternate model.
a.return=e,a=a.sibling;e.subtreeFlags|=r}else{// Bubble up the earliest expiration time.
if((2&e.mode)!=0){for(// In profiling mode, resetChildExpirationTime is also used to reset
// profiler durations.
var s=e.actualDuration,u=e.selfBaseDuration,l=e.child;null!==l;)n|=l.lanes|l.childLanes,r|=l.subtreeFlags,r|=l.flags,// only be updated if work is done on the fiber (i.e. it doesn't bailout).
// When work is done, it should bubble to the parent's actualDuration. If
// the fiber has not been cloned though, (meaning no work was done), then
// this value will reflect the amount of time spent working on a previous
// render. In that case it should not bubble. We determine whether it was
// cloned by comparing the child pointer.
s+=l.actualDuration,u+=l.treeBaseDuration,l=l.sibling;e.actualDuration=s,e.treeBaseDuration=u}else for(var c=e.child;null!==c;)n|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,// smell because it assumes the commit phase is never concurrent with
// the render phase. Will address during refactor to alternate model.
c.return=e,c=c.sibling;e.subtreeFlags|=r}return e.childLanes=n,t}function dm(e,t,n){var r=t.pendingProps;// Note: This intentionally doesn't check if we're hydrating because comparing
switch(// to the current tree provider fiber is just as fast and less error-prone.
// Ideally we would have a special version of the work loop only
// for hydration.
sA(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return dh(t),null;case 1:case 17:return sd(t.type)&&sf(t),dh(t),null;case 3:var o=t.stateNode;return u2(t),sp(t),le(),o.pendingContext&&(o.context=o.pendingContext,o.pendingContext=null),null!==e&&null!==e.child||(sJ(t)?// the commit side-effects on the root.
dd(t):null===e||e.memoizedState.isDehydrated&&// Check if we reverted to client rendering (e.g. due to an error)
(256&t.flags)==0||(// Schedule an effect to clear this container at the start of the
// next commit. This handles the case of React rendering into a
// container with previous children. It's also safe to do for
// updates too, because current.child would only be null if the
// previous render was null (so the container would already
// be empty).
t.flags|=1024,// recoverable errors during first hydration attempt. If so, add
// them to a queue so we can log them in the commit phase.
s1())),ew(e,t),dh(t),null;case 5:u6(t);var i=u0(),a=t.type;if(null!==e&&null!=t.stateNode)e_(e,t,a,r,i),e.ref!==t.ref&&df(t);else{if(!r){if(null===t.stateNode)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return(// This can happen when we abort work.
dh(t),null)}var s,u,l,c,d,f=u3();// TODO: Move createInstance to beginWork and keep it on a context
if(sJ(t))l=t.stateNode,c=!sq,s=t.type,u=t.memoizedProps,l[aQ]=t,l[aK]=u,d=function(e,t,n,r,o,i,a){switch(s=nA(t,n),U(t,n),t){case"dialog":i2("cancel",e),i2("close",e);break;case"iframe":case"object":case"embed":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the load event.
i2("load",e);break;case"video":case"audio":// We listen to these events in case to ensure emulated bubble
// listeners still fire for all the media events.
for(var s,u,l=0;l<iJ.length;l++)i2(iJ[l],e);break;case"source":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the error event.
i2("error",e);break;case"img":case"image":case"link":// We listen to these events in case to ensure emulated bubble
// listeners still fire for error and load events.
i2("error",e),i2("load",e);break;case"details":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the toggle event.
i2("toggle",e);break;case"input":tG(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;case"option":t4(e,n);break;case"select":ne(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;case"textarea":nr(e,n),// listeners still fire for the invalid event.
i2("invalid",e)}nL(t,n),u=new Set;for(var c=e.attributes,d=0;d<c.length;d++)switch(c[d].name.toLowerCase()){// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
case"value":case"checked":case"selected":break;default:// Intentionally use the original name.
// See discussion in https://github.com/facebook/react/pull/10676.
u.add(c[d].name)}var f=null;for(var p in n)if(n.hasOwnProperty(p)){var h=n[p];if(p===au)// For text content children we compare against textContent. This
// might match additional HTML that is hidden when we read it using
// textContent. E.g. "foo" will match "f<span>oo</span>" but that still
// satisfies our requirement. Our requirement is not to produce perfect
// HTML and attributes. Ideally we should preserve structure but it's
// ok not to if the visible content is still enough to indicate what
// even listeners these nodes might be wired up to.
// TODO: Warn if there is more than a single textNode as a child.
// TODO: Should we use domElement.firstChild.nodeValue to compare?
"string"==typeof h?e.textContent!==h&&(!0!==n[aa]&&ah(e.textContent,h,i,a),f=[au,h]):"number"==typeof h&&e.textContent!==""+h&&(!0!==n[aa]&&ah(e.textContent,h,i,a),f=[au,""+h]);else if(eU.hasOwnProperty(p))null!=h&&("function"!=typeof h&&z(p,h),"onScroll"===p&&i2("scroll",e));else if(a&&// Convince Flow we've calculated it (it's DEV-only in this method.)
"boolean"==typeof s){// Validate that the properties correspond to their expected values.
var m=void 0,g=e2(p);if(!0===n[aa]);else if(p===ai||p===aa||// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
"value"===p||"checked"===p||"selected"===p);else if(p===ao){var v=e.innerHTML,y=h?h[ac]:void 0;if(null!=y){var b=B(e,y);b!==v&&j(p,v,b)}}else if(p===al){if(// $FlowFixMe - Should be inferred as not undefined.
u.delete(p),q){var w=/**
 * Operations for dealing with CSS properties.
 *//**
 * This creates a string that is expected to be equivalent to the style
 * attribute generated by server-side rendering. It by-passes warnings and
 * security checks so it's not safe to use this value for anything other than
 * comparison. It is only used in DEV for SSR validation.
 */function(e){var t="",n="";for(var r in e)if(e.hasOwnProperty(r)){var o=e[r];if(null!=o){var i=0===r.indexOf("--");t+=n+(i?r:r.replace(ng,"-$1").toLowerCase().replace(nv,"-ms-"))+":"+nm(r,o,i),n=";"}}return t||null}(h);w!==(m=e.getAttribute("style"))&&j(p,m,w)}}else if(s)// $FlowFixMe - Should be inferred as not undefined.
u.delete(p.toLowerCase()),m=te(e,p,h),h!==m&&j(p,m,h);else if(!eZ(p,g,s)&&!e1(p,h,g,s)){var _=!1;if(null!==g)// $FlowFixMe - Should be inferred as not undefined.
u.delete(g.attributeName),m=/**
 * Get the value for a property on a node. Only used in DEV for SSR validation.
 * The "expected" argument is used as a hint of what the expected value is.
 * Some properties have multiple equivalent values.
 */function(e,t,n,r){if(r.mustUseProperty)return e[r.propertyName];eW(n,t),r.sanitizeURL&&// the hydration is successful of a javascript: URL, we
// still want to warn on the client.
// eslint-disable-next-line react-internal/safe-string-coercion
e9(""+n);var o=r.attributeName,i=null;if(4===r.type){if(e.hasAttribute(o)){var a=e.getAttribute(o);return""===a||(e1(t,n,r,!1)?a:a===""+n?n:a)}}else if(e.hasAttribute(o)){if(e1(t,n,r,!1))// for the error message.
return e.getAttribute(o);if(3===r.type)// the fact that we have it is the same as the expected.
return n;// Even if this property uses a namespace we use getAttribute
// because we assume its namespaced name is the same as our config.
// To use getAttributeNS we need the local name which we don't have
// in our config atm.
i=e.getAttribute(o)}return e1(t,n,r,!1)?null===i?n:i:i===""+n?n:i}(e,p,h,g);else{var k=r;if(k===na&&(k=nu(t)),k===na)u.delete(p.toLowerCase());else{var S=function(e){var t=e.toLowerCase();return nU.hasOwnProperty(t)&&nU[t]||null}(p);null!==S&&S!==p&&(// If an SVG prop is supplied with bad casing, it will
// be successfully parsed from HTML, but will produce a mismatch
// (and would be incorrectly rendered on the client).
// However, we already warn about bad casing elsewhere.
// So we'll skip the misleading extra mismatch warning in this case.
_=!0,u.delete(S)),u.delete(p)}m=te(e,p,h)}h===m||_||j(p,m,h)}}}switch(a&&u.size>0&&!0!==n[aa]&&F(u),t){case"input":// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
tq(e),tZ(e,n,!0);break;case"textarea":// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
tq(e),ni(e);break;case"select":case"option":break;default:"function"==typeof n.onClick&&av(e)}return f}(l,s,u,f.namespace,0,(1&t.mode)!=0,c),t.updateQueue=d,null!==d&&// commit-phase we mark this as such.
dd(t);else{var p=function(e,t,n,r,o){if(ak(e,null,r.ancestorInfo),"string"==typeof t.children||"number"==typeof t.children){var i=""+t.children,a=aS(r.ancestorInfo,e);ak(null,i,a)}var s=function(e,t,n,r){// tags get no namespace.
var o,i,a=am(n),s=r;if(s===na&&(s=nu(e)),s===na){if((o=nA(e,t))||e===e.toLowerCase()||eN("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",e),"script"===e){// Create the script via .innerHTML so its "parser-inserted" flag is
// set to true and it does not execute
var u=a.createElement("div");u.innerHTML="<script></script>";// eslint-disable-line
// This is guaranteed to yield a script element.
var l=u.firstChild;i=u.removeChild(l)}else if("string"==typeof t.is)i=a.createElement(e,{is:t.is});else // attributes on `select`s needs to be added before `option`s are inserted.
// This prevents:
// - a bug where the `select` does not scroll to the correct option because singular
//  `select` elements automatically pick the first item #13222
// - a bug where the `select` set the first item as selected despite the `size` attribute #14239
// See https://github.com/facebook/react/issues/13222
// and https://github.com/facebook/react/issues/14239
if(// Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
// See discussion in https://github.com/facebook/react/pull/6896
// and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
i=a.createElement(e),"select"===e){var c=i;t.multiple?c.multiple=!0:t.size&&// it is possible that no option is selected.
//
// This is only necessary when a select in "single selection mode".
(c.size=t.size)}}else i=a.createElementNS(s,e);return s!==na||o||"[object HTMLUnknownElement]"!==Object.prototype.toString.call(i)||eB.call(A,e)||(A[e]=!0,eN("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",e)),i}(e,t,n,r.namespace);return s[aQ]=o,s[aK]=t,s}(a,r,i,f,t);eb(p,t,!1,!1),t.stateNode=p,function(e,t,n,r,o){switch(function(e,t,n,r){var o,i,a=nA(t,n);switch(U(t,n),t){case"dialog":i2("cancel",e),i2("close",e),i=n;break;case"iframe":case"object":case"embed":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the load event.
i2("load",e),i=n;break;case"video":case"audio":// We listen to these events in case to ensure emulated bubble
// listeners still fire for all the media events.
for(var s=0;s<iJ.length;s++)i2(iJ[s],e);i=n;break;case"source":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the error event.
i2("error",e),i=n;break;case"img":case"image":case"link":// We listen to these events in case to ensure emulated bubble
// listeners still fire for error and load events.
i2("error",e),i2("load",e),i=n;break;case"details":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the toggle event.
i2("toggle",e),i=n;break;case"input":tG(e,n),i=tK(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;case"option":t4(e,n),i=n;break;case"select":ne(e,n),i=t9(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;case"textarea":nr(e,n),i=nn(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;default:i=n}switch(nL(t,i),function(e,t,n,r,o){for(var i in r)if(r.hasOwnProperty(i)){var a=r[i];if(i===al)a&&// mutated. We have already warned for this in the past.
Object.freeze(a),nD(t,a);else if(i===ao){var s=a?a[ac]:void 0;null!=s&&nc(t,s)}else i===au?"string"==typeof a?("textarea"!==e||""!==a)&&nd(t,a):"number"==typeof a&&nd(t,""+a):i===ai||i===aa||i===as||(eU.hasOwnProperty(i)?null!=a&&("function"!=typeof a&&z(i,a),"onScroll"===i&&i2("scroll",t)):null!=a&&tt(t,i,a,o))}}(t,e,0,i,a),t){case"input":// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
tq(e),tZ(e,n,!1);break;case"textarea":// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
tq(e),ni(e);break;case"option":null!=n.value&&e.setAttribute("value",""+tA(n.value));break;case"select":e.multiple=!!n.multiple,null!=(o=n.value)?t7(e,!!n.multiple,o,!1):null!=n.defaultValue&&t7(e,!!n.multiple,n.defaultValue,!0);break;default:"function"==typeof i.onClick&&av(e)}}// Calculate the diff between the two objects.
(e,t,n,0),t){case"button":case"input":case"select":case"textarea":return!!n.autoFocus;case"img":return!0;default:return!1}}(p,a,r,0)&&dd(t)}null!==t.ref&&df(t)}return dh(t),null;case 6:if(e&&null!=t.stateNode){var h=e.memoizedProps;// If we have an alternate, that means this is an update and we need
// to schedule a side-effect to do the updates.
ek(e,t,h,r)}else{if("string"!=typeof r&&null===t.stateNode)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");var m,g,v=u0(),y=u3();sJ(t)?function(e){var t=e.stateNode,n=e.memoizedProps,r=(t[aQ]=e,e.mode,t.nodeValue!==n);if(r){// We assume that prepareToHydrateHostTextInstance is called in a context where the
// hydration parent is the parent host component of this host text.
var o=sj;if(null!==o)switch(o.tag){case 3:o.stateNode.containerInfo;var i=(1&o.mode)!=0;ah(t.nodeValue,n,i,!0);break;case 5:o.type;var a=o.memoizedProps,s=(o.stateNode,(1&o.mode)!=0);!0!==a[aD]&&ah(t.nodeValue,n,s,!0)}}return r}(t)&&dd(t):t.stateNode=(ak(null,r,y.ancestorInfo),(g=am(v).createTextNode(r))[aQ]=t,g)}return dh(t),null;case 13:st(u5,t);var b=t.memoizedState;// Special path for dehydrated boundaries. We may eventually move this
// to its own fiber type so that we can add other kinds of hydration
// boundaries that aren't associated with a Suspense tree. In anticipation
// of such a refactor, all the hydration logic is contained in
// this branch.
if((null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated)&&!function(e,t,n){if(sz&&null!==sF&&(1&t.mode)!=0&&(128&t.flags)==0)return sZ(t),s0(),t.flags|=98560,!1;var r=sJ(t);if(null===n||null===n.dehydrated)return(// Successfully completed this tree. If this was a forced client render,
// there may have been recoverable errors during first hydration
// attempt. If so, add them to a queue so we can log them in the
// commit phase.
s1(),!0);// We might be inside a hydration state the first time we're picking up this
// Suspense boundary, and also after we've reentered it for further hydration.
if(null===e){if(!r)throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(function(e){var t=e.memoizedState,n=null!==t?t.dehydrated:null;if(!n)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");n[aQ]=e}(t),dh(t),(2&t.mode)!=0&&null!==n){// Don't count time spent in a timed out Suspense subtree as part of the base duration.
var o=t.child;null!==o&&(t.treeBaseDuration-=o.treeBaseDuration)}return!1}if(// We might have reentered this boundary to hydrate it. If so, we need to reset the hydration
// state since we're now exiting out of it. popHydrationState doesn't do that for us.
s0(),(128&t.flags)==0&&(t.memoizedState=null),// If nothing suspended, we need to schedule an effect to mark this boundary
// as having hydrated so events know that they're free to be invoked.
// It's also a signal to replay events and the suspense callback.
// If something suspended, schedule an effect to attach retry listeners.
// So we might as well always mark this.
t.flags|=4,dh(t),(2&t.mode)!=0&&null!==n){// Don't count time spent in a timed out Suspense subtree as part of the base duration.
var i=t.child;null!==i&&(t.treeBaseDuration-=i.treeBaseDuration)}return!1}(e,t,b)){if(65536&t.flags)// this as a mismatch. Revert to client rendering.
return t;// render or because something suspended.
return null}if((128&t.flags)!=0)// Don't bubble properties in this case.
return(// Something suspended. Re-render with the fallback children.
t.lanes=n,(2&t.mode)!=0&&cN(t),t);var w=null!==b;// a passive effect, which is when we process the transitions
if(w!==(null!==e&&null!==e.memoizedState)&&w){var _=t.child;// in the concurrent tree already suspended during this render.
// This is a known bug.
_.flags|=/*                   */8192,(1&t.mode)!=0&&((null!==e||(t.memoizedProps.unstable_avoidThisFallback,0))&&(1&u5.current)==0?// suspend for longer if possible.
fY():0===fn&&(fn=3))}if(null!==t.updateQueue&&// TODO: Move to passive phase
(t.flags|=4),dh(t),(2&t.mode)!=0&&w){// Don't count time spent in a timed out Suspense subtree as part of the base duration.
var k=t.child;null!==k&&(t.treeBaseDuration-=k.treeBaseDuration)}return null;case 4:return u2(t),ew(e,t),null===e&&i6(t.stateNode.containerInfo),dh(t),null;case 10:return uh(t.type._context,t),dh(t),null;case 19:st(u5,t);var S=t.memoizedState;if(null===S)return(// We're running in the default, "independent" mode.
// We don't do anything in this mode.
dh(t),null);var x=(128&t.flags)!=0,E=S.rendering;if(null===E){// We just rendered the head.
if(x)dp(S,!1);else{if(!(0===fn&&(null===e||(128&e.flags)==0)))for(var C=t.child;null!==C;){var T=u7(C);if(null!==T){x=!0,t.flags|=128,dp(S,!1);// part of the second pass. In that case nothing will subscribe to
// its thenables. Instead, we'll transfer its thenables to the
// SuspenseList so that it can retry if they resolve.
// There might be multiple of these in the list but since we're
// going to wait for all of them anyway, it doesn't really matter
// which ones gets to ping. In theory we could get clever and keep
// track of how many dependencies remain but it gets tricky because
// in the meantime, we can add/remove/change items and dependencies.
// We might bail out of the loop before finding any but that
// doesn't matter since that means that the other boundaries that
// we did find already has their listeners attached.
var O=T.updateQueue;return null!==O&&(t.updateQueue=O,t.flags|=4),// to stay in place.
// Reset the effect flags before doing the second pass since that's now invalid.
// Reset the child fibers to their original state.
t.subtreeFlags=0,function(e,t){for(var n=e.child;null!==n;)(function(e,t){// This resets the Fiber to what createFiber or createWorkInProgress would
// have set the values to before during the first pass. Ideally this wouldn't
// be necessary but unfortunately many code paths reads from the workInProgress
// when they should be reading from current and writing to workInProgress.
// We assume pendingProps, index, key, ref, return are still untouched to
// avoid doing another reconciliation.
// Reset the effect flags but keep any Placement tags, since that's something
// that child fiber is setting, not the reconciliation.
e.flags&=14680066;// The effects are no longer valid.
var n=e.alternate;if(null===n)// Reset to createFiber's initial values.
e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null,// Note: We don't reset the actualTime counts. It's useful to accumulate
// actual time across multiple render passes.
e.selfBaseDuration=0,e.treeBaseDuration=0;else{// Reset to the cloned values that createWorkInProgress would've.
e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type;// it cannot be shared with the current fiber.
var r=n.dependencies;e.dependencies=null===r?null:{lanes:r.lanes,firstContext:r.firstContext},// Note: We don't reset the actualTime counts. It's useful to accumulate
// actual time across multiple render passes.
e.selfBaseDuration=n.selfBaseDuration,e.treeBaseDuration=n.treeBaseDuration}})(n,t),n=n.sibling}(t,n),// rerender the children.
u8(t,1&u5.current|2),t.child}C=C.sibling}null!==S.tail&&rx()>fd&&(// We have already passed our CPU deadline but we still have rows
// left in the tail. We'll just give up further attempts to render
// the main content and only render fallbacks.
t.flags|=128,x=!0,dp(S,!1),// to get it started back up to attempt the next item. While in terms
// of priority this work has the same priority as this current render,
// it's not part of the same transition once the transition has
// committed. If it's sync, we still want to yield so that it can be
// painted. Conceptually, this is really the same as pinging.
// We can use any RetryLane even if it's the one currently rendering
// since we're leaving it behind on this node.
t.lanes=4194304)}}else{// Append the rendered row to the child list.
if(!x){var R=u7(E);if(null!==R){t.flags|=128,x=!0;// get lost if this row ends up dropped during a second pass.
var P=R.updateQueue;if(null!==P&&(t.updateQueue=P,t.flags|=4),dp(S,!0),null===S.tail&&"hidden"===S.tailMode&&!E.alternate&&!sz// We don't cut it if we're hydrating.
)return(// We're done.
dh(t),null)}else 2*// exceed it.
rx()-S.renderingStartTime>fd&&1073741824!==n&&(// We have now passed our CPU deadline and we'll just give up further
// attempts to render the main content and only render fallbacks.
// The assumption is that this is usually faster.
t.flags|=128,x=!0,dp(S,!1),// to get it started back up to attempt the next item. While in terms
// of priority this work has the same priority as this current render,
// it's not part of the same transition once the transition has
// committed. If it's sync, we still want to yield so that it can be
// painted. Conceptually, this is really the same as pinging.
// We can use any RetryLane even if it's the one currently rendering
// since we're leaving it behind on this node.
t.lanes=4194304)}if(S.isBackwards)// The effect list of the backwards tail will have been added
// to the end. This breaks the guarantee that life-cycles fire in
// sibling order but that isn't a strong guarantee promised by React.
// Especially since these might also just pop in during future commits.
// Append to the beginning of the list.
E.sibling=t.child,t.child=E;else{var I=S.last;null!==I?I.sibling=E:t.child=E,S.last=E}}if(null!==S.tail){// We still have tail rows to render.
// Pop a row.
var D=S.tail;S.rendering=D,S.tail=D.sibling,S.renderingStartTime=rx(),D.sibling=null;// TODO: We can probably just avoid popping it instead and only
// setting it the first time we go from not suspended to suspended.
var M=u5.current;// Don't bubble properties in this case.
return x?M=1&M|2:M&=1,u8(t,M),D}return dh(t),null;case 21:break;case 22:case 23:fV(t);var N=null!==t.memoizedState;return null!==e&&null!==e.memoizedState!==N&&(t.flags|=8192),N&&(1&t.mode)!=0?(1073741824&fe)!=0&&(dh(t),6&t.subtreeFlags&&(t.flags|=8192)):dh(t),null;case 24:case 25:return null}throw Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function dg(e,t,n){switch(// Note: This intentionally doesn't check if we're hydrating because comparing
// to the current tree provider fiber is just as fast and less error-prone.
// Ideally we would have a special version of the work loop only
// for hydration.
sA(t),t.tag){case 1:null!=t.type.childContextTypes&&sf(t);break;case 3:t.stateNode,u2(t),sp(t),le();break;case 5:u6(t);break;case 4:u2(t);break;case 13:case 19:st(u5,t);break;case 10:uh(t.type._context,t);break;case 22:case 23:fV(t)}}// Mutation mode
eb=function(e,t,n,r){for(// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var o=t.child;null!==o;){if(5===o.tag||6===o.tag)!function(e,t){e.appendChild(t)}(e,o.stateNode);else if(4===o.tag);else if(null!==o.child){o.child.return=o,o=o.child;continue}if(o===t)return;for(;null===o.sibling;){if(null===o.return||o.return===t)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},ew=function(e,t){},e_=function(e,t,n,r,o){// If we have an alternate, that means this is an update and we need to
// schedule a side-effect to do the updates.
var i=e.memoizedProps;if(i!==r){// component is hitting the resume path. Figure out why. Possibly
// related to `hidden`.
var a=function(e,t,n,r,o,i){if(typeof r.children!=typeof n.children&&("string"==typeof r.children||"number"==typeof r.children)){var a=""+r.children,s=aS(i.ancestorInfo,t);ak(null,a,s)}return function(e,t,n,r,o){U(t,r);var i,a,s,u,l=null;switch(t){case"input":i=tK(e,n),a=tK(e,r),l=[];break;case"select":i=t9(e,n),a=t9(e,r),l=[];break;case"textarea":i=nn(e,n),a=nn(e,r),l=[];break;default:i=n,a=r,"function"!=typeof i.onClick&&"function"==typeof a.onClick&&av(e)}nL(t,a);var c=null;for(s in i)if(!a.hasOwnProperty(s)&&i.hasOwnProperty(s)&&null!=i[s]){if(s===al){var d=i[s];for(u in d)d.hasOwnProperty(u)&&(c||(c={}),c[u]="")}else s!==ao&&s!==au&&s!==ai&&s!==aa&&s!==as&&(eU.hasOwnProperty(s)?l||(l=[]):// the allowed property list in the commit phase instead.
(l=l||[]).push(s,null))}for(s in a){var f=a[s],p=null!=i?i[s]:void 0;if(a.hasOwnProperty(s)&&f!==p&&(null!=f||null!=p)){if(s===al){if(f&&// mutated. We have already warned for this in the past.
Object.freeze(f),p){// Unset styles on `lastProp` but not on `nextProp`.
for(u in p)!p.hasOwnProperty(u)||f&&f.hasOwnProperty(u)||(c||(c={}),c[u]="");// Update styles that changed since `lastProp`.
for(u in f)f.hasOwnProperty(u)&&p[u]!==f[u]&&(c||(c={}),c[u]=f[u])}else c||(l||(l=[]),l.push(s,c)),c=f}else if(s===ao){var h=f?f[ac]:void 0,m=p?p[ac]:void 0;null!=h&&m!==h&&(l=l||[]).push(s,h)}else s===au?("string"==typeof f||"number"==typeof f)&&(l=l||[]).push(s,""+f):s!==ai&&s!==aa&&(eU.hasOwnProperty(s)?(null!=f&&("function"!=typeof f&&z(s,f),"onScroll"===s&&i2("scroll",e)),l||p===f||// that the "current" props pointer gets updated so we need a commit
// to update this element.
(l=[])):// filter it out using the allowed property list during the commit.
(l=l||[]).push(s,f))}}return c&&(/**
 * When mixing shorthand and longhand property names, we warn during updates if
 * we expect an incorrect result to occur. In particular, we warn for:
 *
 * Updating a shorthand property (longhand gets overwritten):
 *   {font: 'foo', fontVariant: 'bar'} -> {font: 'baz', fontVariant: 'bar'}
 *   becomes .style.font = 'baz'
 * Removing a shorthand property (longhand gets lost too):
 *   {font: 'foo', fontVariant: 'bar'} -> {fontVariant: 'bar'}
 *   becomes .style.font = ''
 * Removing a longhand property (should revert to shorthand; doesn't):
 *   {font: 'foo', fontVariant: 'bar'} -> {font: 'foo'}
 *   becomes .style.fontVariant = ''
 */function(e,t){if(t){var n=nM(e),r=nM(t),o={};for(var i in n){var a=n[i],s=r[i];if(s&&a!==s){var u,l=a+","+s;if(o[l])continue;o[l]=!0,eN("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",null==(u=e[a])||"boolean"==typeof u||""===u?"Removing":"Updating",a,s)}}}}(c,a[al]),(l=l||[]).push(al,c)),l}// Apply the diff.
(e,t,n,r)}(t.stateNode,n,i,r,0,u3());// TODO: Type this specific to this type of component.
t.updateQueue=a,a&&dd(t)}},ek=function(e,t,n,r){// If the text differs, mark it as an update. All the work in done in commitWork.
n!==r&&dd(t)};var dv=null;dv=new Set;// Allows us to avoid traversing the return path to find the nearest Offscreen ancestor.
// Only used when enableSuspenseLayoutEffectSemantics is enabled.
var dy=!1,db=!1,dw="function"==typeof WeakSet?WeakSet:Set,d_=null,dk=null,dS=null,dx=function(e,t){if(t.props=e.memoizedProps,t.state=e.memoizedState,2&e.mode)try{cM(),t.componentWillUnmount()}finally{cI(e)}else t.componentWillUnmount()};function dE(e,t){try{dD(4,e)}catch(n){f2(e,t,n)}}// Capture errors so they don't interrupt unmounting.
function dC(e,t,n){try{dx(e,n)}catch(n){f2(e,t,n)}}// Capture errors so they don't interrupt mounting.
function dT(e,t){try{dM(e)}catch(n){f2(e,t,n)}}function dO(e,t){var n,r=e.ref;if(null!==r){if("function"==typeof r){try{if(2&e.mode)try{cM(),n=r(null)}finally{cI(e)}else n=r(null)}catch(n){f2(e,t,n)}"function"==typeof n&&eN("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",tO(e))}else r.current=null}}function dR(e,t,n){try{n()}catch(n){f2(e,t,n)}}var dP=!1;function dI(e,t,n){var r=t.updateQueue,o=null!==r?r.lastEffect:null;if(null!==o){var i=o.next,a=i;do{if((a.tag&e)===e){// Unmount
var s=a.destroy;a.destroy=void 0,void 0!==s&&((8&e)!=/*   */0?null!==rL&&"function"==typeof rL.markComponentPassiveEffectUnmountStarted&&rL.markComponentPassiveEffectUnmountStarted(t):(4&e)!=0&&r$(t),(2&e)!=0&&(fP=!0),dR(t,n,s),(2&e)!=0&&(fP=!1),(8&e)!=0?null!==rL&&"function"==typeof rL.markComponentPassiveEffectUnmountStopped&&rL.markComponentPassiveEffectUnmountStopped():(4&e)!=0&&rW())}a=a.next}while(a!==i)}}function dD(e,t){var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var o=r.next,i=o;do{if((i.tag&e)===e){(8&e)!=0?null!==rL&&"function"==typeof rL.markComponentPassiveEffectMountStarted&&rL.markComponentPassiveEffectMountStarted(t):(4&e)!=0&&null!==rL&&"function"==typeof rL.markComponentLayoutEffectMountStarted&&rL.markComponentLayoutEffectMountStarted(t);var a=i.create;(2&e)!=0&&(fP=!0),i.destroy=a(),(2&e)!=0&&(fP=!1),(8&e)!=0?null!==rL&&"function"==typeof rL.markComponentPassiveEffectMountStopped&&rL.markComponentPassiveEffectMountStopped():(4&e)!=0&&null!==rL&&"function"==typeof rL.markComponentLayoutEffectMountStopped&&rL.markComponentLayoutEffectMountStopped();var s=i.destroy;if(void 0!==s&&"function"!=typeof s){var u=void 0;u=(4&i.tag)!=0?"useLayoutEffect":(2&i.tag)!=0?"useInsertionEffect":"useEffect";var l=void 0;l=null===s?" You returned null. If your effect does not require clean up, return undefined (or nothing).":"function"==typeof s.then?"\n\nIt looks like you wrote "+u+"(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n"+u+"(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching":" You returned: "+s,eN("%s must not return anything besides a function, which is used for clean-up.%s",u,l)}}i=i.next}while(i!==o)}}function dM(e){var t=e.ref;if(null!==t){var n,r=e.stateNode;if(e.tag,"function"==typeof t){if(2&e.mode)try{cM(),n=t(r)}finally{cI(e)}else n=t(r);"function"==typeof n&&eN("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",tO(e))}else t.hasOwnProperty("current")||eN("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",tO(e)),t.current=r}}function dN(e){return 5===e.tag||3===e.tag||4===e.tag}function dL(e){// We're going to search forward into the tree until we find a sibling host
// node. Unfortunately, if multiple insertions are done in a row we have to
// search past them. This leads to exponential search for the next sibling.
// TODO: Find a more efficient way to do this.
var t=e;t:for(;;){// If we didn't find anything, let's try the next sibling.
for(;null===t.sibling;){if(null===t.return||dN(t.return))// last sibling.
return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;5!==t.tag&&6!==t.tag&&18!==t.tag;){// If it is not host node and, we might have a host node inside it.
// Try to search down until we find one.
if(2&t.flags||null===t.child||4===t.tag)continue t;t.child.return=t,t=t.child}// Check if this host node is stable or about to be placed.
if(!(2&t.flags))return t.stateNode}}// deleted subtree.
// TODO: Update these during the whole mutation phase, not just during
// a deletion.
var dA=null,dU=!1;function dj(e,t,n){for(// TODO: Use a static flag to skip trees that don't have unmount effects
var r=n.child;null!==r;)dF(e,t,r),r=r.sibling}function dF(e,t,n){// into their subtree. There are simpler cases in the inner switch
// that don't modify the stack.
switch(function(e){if(rN&&"function"==typeof rN.onCommitFiberUnmount)try{rN.onCommitFiberUnmount(rM,e)}catch(e){rA||(rA=!0,eN("React instrumentation encountered an error: %s",e))}}(n),n.tag){case 5:db||dO(n,t);// Intentional fallthrough to next branch
// eslint-disable-next-line-no-fallthrough
case 6:var r,o,i,a,s=dA,u=dU;dA=null,dj(e,t,n),dA=s,dU=u,null!==dA&&(dU?(i=dA,a=n.stateNode,8===i.nodeType?i.parentNode.removeChild(a):i.removeChild(a)):function(e,t){e.removeChild(t)}(dA,n.stateNode));return;case 18:null!==dA&&(dU?(r=dA,o=n.stateNode,8===r.nodeType?aq(r.parentNode,o):1===r.nodeType&&aq(r,o),// Retry if any event replaying was blocked on this.
oE(r)):aq(dA,n.stateNode));return;case 4:// When we go into a portal, it becomes the parent to remove from.
var l=dA,c=dU;dA=n.stateNode.containerInfo,dU=!0,dj(e,t,n),dA=l,dU=c;return;case 0:case 11:case 14:case 15:if(!db){var d=n.updateQueue;if(null!==d){var f=d.lastEffect;if(null!==f){var p=f.next,h=p;do{var m=h,g=m.destroy,v=m.tag;void 0!==g&&((2&v)!=0?dR(n,t,g):(4&v)!=0&&(r$(n),2&n.mode?(cM(),dR(n,t,g),cI(n)):dR(n,t,g),rW())),h=h.next}while(h!==p)}}}dj(e,t,n);return;case 1:if(!db){dO(n,t);var y=n.stateNode;"function"==typeof y.componentWillUnmount&&dC(n,t,y)}dj(e,t,n);return;case 21:default:dj(e,t,n);return;case 22:if(1&n.mode){// If this offscreen component is hidden, we already unmounted it. Before
// deleting the children, track that it's already unmounted so that we
// don't attempt to unmount the effects again.
// TODO: If the tree is hidden, in most cases we should be able to skip
// over the nested children entirely. An exception is we haven't yet found
// the topmost host node to delete, which we already track on the stack.
// But the other case is portals, which need to be detached no matter how
// deeply they are nested. We should use a subtree flag to track whether a
// subtree includes a nested portal.
var b=db;db=b||null!==n.memoizedState,dj(e,t,n),db=b}else dj(e,t,n)}}function dz(e){// If this boundary just timed out, then it will have a set of wakeables.
// For each wakeable, attach a listener so that when it resolves, React
// attempts to re-render the boundary in the primary (pre-timeout) state.
var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new dw),t.forEach(function(t){// Memoize using the boundary fiber to prevent redundant listeners.
var r=f5.bind(null,e,t);if(!n.has(t)){if(n.add(t),rU){if(null!==dk&&null!==dS)pn(dS,dk);else throw Error("Expected finished root and lanes to be set. This is a bug in React.")}t.then(r,r)}})}}// This function detects when a Suspense boundary goes from visible to hidden.
function dq(e,t,n){// Deletions effects can be scheduled on any fiber type. They need to happen
// before the children effects hae fired.
var r=t.deletions;if(null!==r)for(var o=0;o<r.length;o++){var i=r[o];try{!function(e,t,n){// We only have the top Fiber that was deleted but we need to recurse down its
// children to find all the terminal nodes.
// Recursively delete all host nodes from the parent, detach refs, clean
// up mounted layout effects, and call componentWillUnmount.
// We only need to remove the topmost host child in each branch. But then we
// still need to keep traversing to unmount effects, refs, and cWU. TODO: We
// could split this into two separate traversals functions, where the second
// one doesn't include any removeChild logic. This is maybe the same
// function as "disappearLayoutEffects" (or whatever that turns into after
// the layout phase is refactored to use recursion).
// Before starting, find the nearest host parent on the stack so we know
// which instance/container to remove the children from.
// TODO: Instead of searching up the fiber return path on every deletion, we
// can track the nearest host component on the JS stack as we traverse the
// tree during the commit phase. This would make insertions faster, too.
var r,o=t;n:for(;null!==o;){switch(o.tag){case 5:dA=o.stateNode,dU=!1;break n;case 3:case 4:dA=o.stateNode.containerInfo,dU=!0;break n}o=o.return}if(null===dA)throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");dF(e,t,n),dA=null,dU=!1,null!==(r=n.alternate)&&(r.return=null),n.return=null}(e,t,i)}catch(e){f2(i,t,e)}}var a=tP;if(12854&t.subtreeFlags)for(var s=t.child;null!==s;)tL(s),dB(s,e),s=s.sibling;tL(a)}function dB(e,t,n){var r,o=e.alternate,i=e.flags;// because the fiber tag is more specific. An exception is any flag related
// to reconcilation, because those can be set on all fiber types.
switch(e.tag){case 0:case 11:case 14:case 15:if(dq(t,e),dV(e),4&i){try{dI(3,e,e.return),dD(3,e)}catch(t){f2(e,e.return,t)}// Layout effects are destroyed during the mutation phase so that all
// destroy functions for all fibers are called before any create functions.
// This prevents sibling component effects from interfering with each other,
// e.g. a destroy function in one component should never override a ref set
// by a create function in another component during the same commit.
if(2&e.mode){try{cM(),dI(5,e,e.return)}catch(t){f2(e,e.return,t)}cI(e)}else try{dI(5,e,e.return)}catch(t){f2(e,e.return,t)}}return;case 1:dq(t,e),dV(e),512&i&&null!==o&&dO(o,o.return);return;case 5:// TODO: ContentReset gets cleared by the children during the commit
// phase. This is a refactor hazard because it means we must read
// flags the flags after `commitReconciliationEffects` has already run;
// the order matters. We should refactor so that ContentReset does not
// rely on mutating the flag during commit. Like by setting a flag
// during the render phase instead.
if(dq(t,e),dV(e),512&i&&null!==o&&dO(o,o.return),32&e.flags){var a=e.stateNode;try{nd(a,"")}catch(t){f2(e,e.return,t)}}if(4&i){var s=e.stateNode;if(null!=s){// Commit the work prepared earlier.
var u=e.memoizedProps,l=null!==o?o.memoizedProps:u,c=e.type,d=e.updateQueue;// For hydration we reuse the update path but we treat the oldProps
if(e.updateQueue=null,null!==d)try{// Apply the diff to the DOM node.
(function(e,t,n,r,o){var i,a;// changed.
switch("input"===n&&"radio"===o.type&&null!=o.name&&tX(e,o),nA(n,r),function(e,t,n,r){// TODO: Handle wasCustomComponentTag
for(var o=0;o<t.length;o+=2){var i=t[o],a=t[o+1];i===al?nD(e,a):i===ao?nc(e,a):i===au?nd(e,a):tt(e,i,a,r)}}(e,t,0,nA(n,o)),n){case"input":// Update the wrapper around inputs *after* updating props. This has to
// happen after `updateDOMProperties`. Otherwise HTML5 input validations
// raise warnings and prevent the new value from being assigned.
tJ(e,o);break;case"textarea":no(e,o);break;case"select":// <select> value update needs to occur after <option> children
// reconciliation
i=e._wrapperState.wasMultiple,e._wrapperState.wasMultiple=!!o.multiple,null!=(a=o.value)?t7(e,!!o.multiple,a,!1):!!o.multiple!==i&&(null!=o.defaultValue?t7(e,!!o.multiple,o.defaultValue,!0):t7(e,!!o.multiple,o.multiple?[]:"",!1))}})(s,d,c,l,u),s[aK]=u}catch(t){f2(e,e.return,t)}}}return;case 6:if(dq(t,e),dV(e),4&i){if(null===e.stateNode)throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");var f=e.stateNode,p=e.memoizedProps;null!==o&&o.memoizedProps;try{f.nodeValue=p}catch(t){f2(e,e.return,t)}}return;case 3:if(dq(t,e),dV(e),4&i&&null!==o&&o.memoizedState.isDehydrated)try{r=t.containerInfo,// Retry if any event replaying was blocked on this.
oE(r)}catch(t){f2(e,e.return,t)}return;case 4:default:dq(t,e),dV(e);return;case 13:dq(t,e),dV(e);var h=e.child;if(8192&h.flags){var m=h.stateNode,g=null!==h.memoizedState;// read it during an event
m.isHidden=g,g&&!(null!==h.alternate&&null!==h.alternate.memoizedState)&&(fc=rx())}if(4&i){try{e.memoizedState}catch(t){f2(e,e.return,t)}dz(e)}return;case 22:var v=null!==o&&null!==o.memoizedState;if(1&e.mode){// Before committing the children, track on the stack whether this
// offscreen subtree was already hidden, so that we don't unmount the
// effects again.
var y=db;db=y||v,dq(t,e),db=y}else dq(t,e);if(dV(e),8192&i){var b=e.stateNode,w=null!==e.memoizedState;if(// read it during an event
b.isHidden=w,w&&!v&&(1&e.mode)!=0){d_=e;for(var _=e.child;null!==_;)d_=_,function(e){for(;null!==d_;){var t=d_,n=t.child;switch(t.tag){case 0:case 11:case 14:case 15:if(2&t.mode)try{cM(),dI(4,t,t.return)}finally{cI(t)}else dI(4,t,t.return);break;case 1:// TODO (Offscreen) Check: flags & RefStatic
dO(t,t.return);var r=t.stateNode;"function"==typeof r.componentWillUnmount&&dC(t,t.return,r);break;case 5:dO(t,t.return);break;case 22:if(null!==t.memoizedState){// Nested Offscreen tree is already hidden. Don't disappear
// its effects.
dW(e);continue}}// TODO (Offscreen) Check: subtreeFlags & LayoutStatic
null!==n?(n.return=t,d_=n):dW(e)}}(_),_=_.sibling}!// TODO: This needs to run whenever there's an insertion or update
// inside a hidden Offscreen tree.
function(e,t){for(// Only hide or unhide the top-most host nodes.
var n=null,r=e;;){if(5===r.tag){if(null===n){n=r;try{var o=r.stateNode;t?function(e){var t=e.style;"function"==typeof t.setProperty?t.setProperty("display","none","important"):t.display="none"}(o):function(e,t){var n=t.style,r=null!=n&&n.hasOwnProperty("display")?n.display:null;e.style.display=nm("display",r)}(r.stateNode,r.memoizedProps)}catch(t){f2(e,e.return,t)}}}else if(6===r.tag){if(null===n)try{var i,a=r.stateNode;t?a.nodeValue="":(i=r.memoizedProps,a.nodeValue=i)}catch(t){f2(e,e.return,t)}}else if((22===r.tag||23===r.tag)&&null!==r.memoizedState&&r!==e);else if(null!==r.child){r.child.return=r,r=r.child;continue}if(r===e)return;for(;null===r.sibling;){if(null===r.return||r.return===e)return;n===r&&(n=null),r=r.return}n===r&&(n=null),r.sibling.return=r.return,r=r.sibling}}(e,w)}return;case 19:dq(t,e),dV(e),4&i&&dz(e);return;case 21:return}}function dV(e){// Placement effects (insertions, reorders) can be scheduled on any fiber
// type. They needs to happen after the children effects have fired, but
// before the effects on this fiber have fired.
var t=e.flags;if(2&t){try{!function(e){var t=function(e){for(var t=e.return;null!==t;){if(dN(t))return t;t=t.return}throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.")}(e);// Note: these two variables *must* always be updated together.
switch(t.tag){case 5:var n=t.stateNode;32&t.flags&&(nd(n,""),t.flags&=-33);var r=dL(e);// We only have the top Fiber that was inserted but we need to recurse down its
// children to find all the terminal nodes.
(function e(t,n,r){var o=t.tag;if(5===o||6===o){var i=t.stateNode;n?function(e,t,n){e.insertBefore(t,n)}(r,i,n):function(e,t){e.appendChild(t)}(r,i)}else if(4===o);else{var a=t.child;if(null!==a){e(a,n,r);for(var s=a.sibling;null!==s;)e(s,n,r),s=s.sibling}}}// These are tracked on the stack as we recursively traverse a
)(e,r,n);break;case 3:case 4:var o=t.stateNode.containerInfo,i=dL(e);(function e(t,n,r){var o=t.tag;if(5===o||6===o){var i,a=t.stateNode;n?8===r.nodeType?r.parentNode.insertBefore(a,n):r.insertBefore(a,n):(8===r.nodeType?(i=r.parentNode).insertBefore(a,r):(i=r).appendChild(a),null==r._reactRootContainer&&null===i.onclick&&av(i))}else if(4===o);else{var s=t.child;if(null!==s){e(s,n,r);for(var u=s.sibling;null!==u;)e(u,n,r),u=u.sibling}}})(e,i,o);break;// eslint-disable-next-line-no-fallthrough
default:throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}(e)}catch(t){f2(e,e.return,t)}// Clear the "placement" from effect tag so that we know that this is
// inserted, before any life-cycles like componentDidMount gets called.
// TODO: findDOMNode doesn't rely on this any more but isMounted does
// and isMounted is deprecated anyway so we should be able to kill this.
e.flags&=-3}4096&t&&(e.flags&=-4097)}function d$(e,t,n){for(;null!==d_;){var r=d_;if((8772&r.flags)!=0){var o=r.alternate;tL(r);try{!function(e,t,n,r){if((8772&n.flags)!=0)switch(n.tag){case 0:case 11:case 15:if(!db){// At this point layout effects have already been destroyed (during mutation phase).
// This is done to prevent sibling component effects from interfering with each other,
// e.g. a destroy function in one component should never override a ref set
// by a create function in another component during the same commit.
if(2&n.mode)try{cM(),dD(5,n)}finally{cI(n)}else dD(5,n)}break;case 1:var o=n.stateNode;if(4&n.flags&&!db){if(null===t){if(n.type!==n.elementType||eg||(o.props!==n.memoizedProps&&eN("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",tO(n)||"instance"),o.state!==n.memoizedState&&eN("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",tO(n)||"instance")),2&n.mode)try{cM(),o.componentDidMount()}finally{cI(n)}else o.componentDidMount()}else{var i=n.elementType===n.type?t.memoizedProps:ua(n.type,t.memoizedProps),a=t.memoizedState;if(n.type!==n.elementType||eg||(o.props!==n.memoizedProps&&eN("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",tO(n)||"instance"),o.state!==n.memoizedState&&eN("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",tO(n)||"instance")),2&n.mode)try{cM(),o.componentDidUpdate(i,a,o.__reactInternalSnapshotBeforeUpdate)}finally{cI(n)}else o.componentDidUpdate(i,a,o.__reactInternalSnapshotBeforeUpdate)}}// TODO: I think this is now always non-null by the time it reaches the
// commit phase. Consider removing the type check.
var s=n.updateQueue;null!==s&&(n.type!==n.elementType||eg||(o.props!==n.memoizedProps&&eN("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",tO(n)||"instance"),o.state!==n.memoizedState&&eN("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",tO(n)||"instance")),// but instead we rely on them being set during last render.
// TODO: revisit this when we implement resuming.
uP(n,s,o));break;case 3:// TODO: I think this is now always non-null by the time it reaches the
// commit phase. Consider removing the type check.
var u=n.updateQueue;if(null!==u){var l=null;if(null!==n.child)switch(n.child.tag){case 5:case 1:l=n.child.stateNode}uP(n,u,l)}break;case 5:var c=n.stateNode;// Renderers may schedule work to be done after host components are mounted
// (eg DOM renderer may schedule auto-focus for inputs and form controls).
// These effects should only be committed when components are first mounted,
// aka when there is no current/alternate.
null===t&&4&n.flags&&function(e,t,n,r){// Despite the naming that might imply otherwise, this method only
// fires if there is an `Update` effect scheduled during mounting.
// This happens if `finalizeInitialChildren` returns `true` (which it
// does to implement the `autoFocus` attribute on the client). But
// there are also other cases when this might happen (such as patching
// up text content during hydration mismatch). So we'll check this again.
switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&e.focus();return;case"img":n.src&&(e.src=n.src);return}}(c,n.type,n.memoizedProps);break;case 6:case 4:case 19:case 17:case 21:case 22:case 23:case 25:break;case 12:var d=n.memoizedProps,f=d.onCommit,p=d.onRender,h=n.stateNode.effectDuration,m=cS,g=null===t?"mount":"update";cT&&(g="nested-update"),"function"==typeof p&&p(n.memoizedProps.id,g,n.actualDuration,n.treeBaseDuration,n.actualStartTime,m),"function"==typeof f&&f(n.memoizedProps.id,g,h,m),fw.push(n),fv||(fv=!0,po(rO,function(){return fJ(),null}));// Do not reset these values until the next render so DevTools has a chance to read them first.
var v=n.return;r:for(;null!==v;){switch(v.tag){case 3:var y=v.stateNode;y.effectDuration+=h;break r;case 12:var b=v.stateNode;b.effectDuration+=h;break r}v=v.return}break;case 13:(function(e,t){if(null===t.memoizedState){var n=t.alternate;if(null!==n){var r=n.memoizedState;if(null!==r){var o=r.dehydrated;null!==o&&// Retry if any event replaying was blocked on this.
oE(o)}}}})(0,n);break;default:throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}!db&&512&n.flags&&dM(n)}(0,o,r,0)}catch(e){f2(r,r.return,e)}tN()}if(r===e){d_=null;return}var i=r.sibling;if(null!==i){i.return=r.return,d_=i;return}d_=r.return}}function dW(e){for(;null!==d_;){var t=d_;if(t===e){d_=null;return}var n=t.sibling;if(null!==n){n.return=t.return,d_=n;return}d_=t.return}}function dH(e){for(;null!==d_;){var t=d_;// TODO (Offscreen) Check: flags & LayoutStatic
tL(t);try{!function(e){// Turn on layout effects in a tree that previously disappeared.
// TODO (Offscreen) Check: flags & LayoutStatic
switch(e.tag){case 0:case 11:case 15:if(2&e.mode)try{cM(),dE(e,e.return)}finally{cI(e)}else dE(e,e.return);break;case 1:var t=e.stateNode;"function"==typeof t.componentDidMount&&function(e,t,n){try{n.componentDidMount()}catch(n){f2(e,t,n)}}// Capture errors so they don't interrupt mounting.
(e,e.return,t),dT(e,e.return);break;case 5:dT(e,e.return)}}(t)}catch(e){f2(t,t.return,e)}if(tN(),t===e){d_=null;return}var n=t.sibling;if(null!==n){// This node may have been reused from a previous render, so we can't
// assume its return pointer is correct.
n.return=t.return,d_=n;return}d_=t.return}}function dY(e){// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
switch(e.tag){case 0:case 11:case 15:try{dD(5,e)}catch(t){f2(e,e.return,t)}break;case 1:var t=e.stateNode;try{t.componentDidMount()}catch(t){f2(e,e.return,t)}}}function dQ(e){// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
switch(e.tag){case 0:case 11:case 15:try{dD(9,e)}catch(t){f2(e,e.return,t)}}}function dK(e){// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
switch(e.tag){case 0:case 11:case 15:try{dI(5,e,e.return)}catch(t){f2(e,e.return,t)}break;case 1:var t=e.stateNode;"function"==typeof t.componentWillUnmount&&dC(e,e.return,t)}}function dG(e){// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
switch(e.tag){case 0:case 11:case 15:try{dI(9,e,e.return)}catch(t){f2(e,e.return,t)}}}if("function"==typeof Symbol&&Symbol.for){var dX=Symbol.for;dX("selector.component"),dX("selector.has_pseudo_class"),dX("selector.role"),dX("selector.test_id"),dX("selector.text")}var dJ=[],dZ=eI.ReactCurrentActQueue;function d0(){var e="undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?IS_REACT_ACT_ENVIRONMENT:void 0;return e||null===dZ.current||eN("The current testing environment is not configured to support act(...)"),e}var d1=Math.ceil,d2=eI.ReactCurrentDispatcher,d3=eI.ReactCurrentOwner,d4=eI.ReactCurrentBatchConfig,d6=eI.ReactCurrentActQueue,d5=0,d8=null,d7=null,d9=0,fe=0,ft=se(0),fn=0,fr=null,fo=0,fi=0,fa=0,fs=0,fu=null,fl=null,fc=0,fd=1/0,ff=null;function fp(){fd=rx()+500}var fh=!1,fm=null,fg=null,fv=!1,fy=null,fb=0,fw=[],f_=null,fk=0,fS=null,fx=!1,fE=!1,fC=0,fT=null,fO=-1,fR=0,fP=!1;function fI(){return(6&d5)!=0?rx():-1!==fO?fO:// This is the first update since React yielded. Compute a new start time.
fO=rx()}function fD(e){if((1&e.mode)==0)return 1;if((2&d5)!=0&&0!==d9)// old behavior is to give this the same "thread" (lanes) as
// whatever is currently rendering. So if you call `setState` on a component
// that happens later in the same render, it will flush. Ideally, we want to
// remove the special case and treat them as if they came from an
// interleaved event. Regardless, this pattern is not officially supported.
// This behavior is only a fallback. The flag only exists until we can roll
// out the setState warning, since existing code might accidentally rely on
// the current behavior.
{var t;return(t=d9)&-t}if(null!==s3.transition){if(null!==d4.transition){var n,r=d4.transition;r._updatedFibers||(r._updatedFibers=new Set),r._updatedFibers.add(e)}// The algorithm for assigning an update to a lane should be stable for all
return 0===fR&&(fR=r8()),fR}// Updates originating inside certain React methods, like flushSync, have
// their priority set by tracking it with a context variable.
//
// The opaque type returned by the host config is internally a lane, so we can
// use that directly.
// TODO: Move this type conversion to the event priority module.
var o=oa;return 0!==o?o:void 0===(n=window.event)?16:oM(n.type)}function fM(e,t,n,r){((function(){if(fk>50)throw fk=0,fS=null,Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");fC>50&&(fC=0,fT=null,eN("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."))})(),fP&&eN("useInsertionEffect must not schedule updates."),fx&&(fE=!0),ot(e,n,r),(2&d5)!=0&&e===d8)?// if the update originates from user space (with the exception of local
// hook updates, which are handled differently and don't reach this
// function), but there are some internal React features that use this as
// an implementation detail, like selective hydration.
function(e){if(tI&&!co)switch(e.tag){case 0:case 11:case 15:var t=d7&&tO(d7)||"Unknown";// Dedupe by the rendering component because it's the one that needs to be fixed.
ex.has(t)||(ex.add(t),eN("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",tO(e)||"Unknown",t,t));break;case 1:pt||(eN("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),pt=!0)}}(t):(rU&&oo(e,t,n),function(e){if(1&e.mode){if(!d0())return}else{var t;// Legacy mode has additional cases where we suppress a warning.
if(t="undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?IS_REACT_ACT_ENVIRONMENT:void 0,"undefined"==typeof jest||!1===t||0!==d5||0!==e.tag&&11!==e.tag&&15!==e.tag)return}if(null===d6.current){var n=tP;try{tL(e),eN("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act",tO(e))}finally{n?tL(e):tN()}}}(t),e===d8&&((2&d5)==0&&(fa|=n),4===fn&&// definitely won't finish. Since we have a new update, let's mark it as
// suspended now, right before marking the incoming update. This has the
// effect of interrupting the current render and switching to the update.
// TODO: Make sure this doesn't override pings that happen while we've
// already started rendering.
fj(e,d9)),fN(e,r),1===n&&0===d5&&(1&t.mode)==0&&// Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
!d6.isBatchingLegacy&&(// Flush the synchronous work now, unless we're already working or inside
// a batch. This is intentionally inside scheduleUpdateOnFiber instead of
// scheduleCallbackForFiber to preserve the ability to schedule a callback
// without immediately flushing it. We only do this for user-initiated
// updates, to preserve historical behavior of legacy mode.
fp(),sb&&sk()))}// root; if a task was already scheduled, we'll check to make sure the priority
// of the existing task is the same as the priority of the next level that the
// root has work on. This function is called on every update, and right before
// exiting a task.
function fN(e,t){var n,r,o,i=e.callbackNode;// Check if any lanes are being starved by other work. If so, mark them as
!// expired so we know to work on those next.
function(e,t){for(// TODO: This gets called every time we yield. We can optimize by storing
// the earliest expiration time on the root. Then use that to quickly bail out
// of this function.
var n=e.pendingLanes,r=e.suspendedLanes,o=e.pingedLanes,i=e.expirationTimes,a=n;a>0;){var s=r9(a),u=1<<s,l=i[s];-1===l?((u&r)==0||(u&o)!=0)&&(i[s]=function(e,t){switch(e){case 1:case 2:case 4:// User interactions should expire slightly more quickly.
//
// NOTE: This is set to the corresponding constant as in Scheduler.js.
// When we made it larger, a product metric in www regressed, suggesting
// there's a user interaction that's being starved by a series of
// synchronous updates. If that theory is correct, the proper solution is
// to fix the starvation. However, this scenario supports the idea that
// expiration times are an important safeguard when starvation
// does happen.
return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:// TODO: Retries should be allowed to expire if they are CPU bound for
// too long, but when I made this change it caused a spike in browser
// crashes. There must be some other underlying bug; not super urgent but
// ideally should figure out why and fix it. Unfortunately we don't have
// a repro for the crashes, only detected via production metrics.
return -1;default:return eN("Should have found matching lanes. This is a bug in React."),-1}}(u,t)):l<=t&&(e.expiredLanes|=u),a&=~u}}// This returns the highest priority pending lanes regardless of whether they
(e,t);var a=r2(e,e===d8?d9:0);if(0===a){null!==i&&pi(i),e.callbackNode=null,e.callbackPriority=0;return}// We use the highest priority lane to represent the priority of the callback.
var s=a&-a,u=e.callbackPriority;// Check if there's an existing task. We may be able to reuse it.
if(u===s&&// Special case related to `act`. If the currently scheduled task is a
// Scheduler task, rather than an `act` task, cancel it and re-scheduled
// on the `act` queue.
!(null!==d6.current&&i!==pr)){// If we're going to re-use an existing task, it needs to exist.
// Assume that discrete update microtasks are non-cancellable and null.
// TODO: Temporary until we confirm this warning is not fired.
null==i&&1!==u&&eN("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");return}if(null!=i&&pi(i),1===s)0===e.tag?(null!==d6.isBatchingLegacy&&(d6.didScheduleLegacyUpdate=!0),n=fF.bind(null,e),sb=!0,s_(n)):s_(fF.bind(null,e)),null!==d6.current?// at the end of the current scope even when using the sync version
// of `act`.
d6.current.push(sk):aF(function(){// In Safari, appending an iframe forces microtasks to run.
// https://github.com/facebook/react/issues/22459
// We don't support running callbacks in the middle of render
// or commit so we need to check against that.
(6&d5)==0&&// if this happens outside render or commit phase (e.g. in an event).
sk()}),r=null;else{switch(os(a)){case 1:o=rC;break;case 4:o=rT;break;case 16:default:o=rO;break;case 536870912:o=rP}r=po(o,fL.bind(null,e))}e.callbackPriority=s,e.callbackNode=r}// This is the entry point for every concurrent task, i.e. anything that
// goes through Scheduler.
function fL(e,t){if(cT=!1,cO=!1,// event time. The next update will compute a new event time.
fO=-1,fR=0,(6&d5)!=0)throw Error("Should not already be working.");// Flush any pending passive effects before deciding which lanes to work on,
// in case they schedule additional work.
var n=e.callbackNode;if(fJ()&&e.callbackNode!==n)// `ensureRootIsScheduled` because the check above implies either that
// there's a new task, or that there's no remaining work on this root.
return null;// Determine the next lanes to work on, using the fields stored
// on the root.
var r=r2(e,e===d8?d9:0);if(0===r)return null;var o=(30&r)!=0||(r&e.expiredLanes)!=0||t?fQ(e,r):function(e,t){var n=d5;d5|=2;var r=fH();// If the root or lanes have changed, throw out the existing stack
// and prepare a fresh one. Otherwise we'll continue where we left off.
if(d8!==e||d9!==t){if(rU){var o=e.memoizedUpdaters;o.size>0&&(pn(e,d9),o.clear()),// If we bailout on this work, we'll move them back (like above).
// It's important to move them now in case the work spawns more work at the same priority with different updaters.
// That way we can keep the current update and future updates separate.
oi(e,t)}ff=null,fp(),f$(e,t)}for(rH(t);;)try{/** @noinline */(function(){// Perform work until Scheduler asks us to yield
for(;null!==d7&&!rk();)fK(d7)})();break}catch(t){fW(e,t)}return(uf(),d2.current=r,d5=n,null!==d7)?(null!==rL&&"function"==typeof rL.markRenderYielded&&rL.markRenderYielded(),0):(rY(),d8=null,d9=0,fn)}(e,r);if(0!==o){if(2===o){// If something threw an error, try rendering one more time. We'll
// render synchronously to block concurrent data mutations, and we'll
// includes all pending updates are included. If it still fails after
// the second attempt, we'll give up and commit the resulting tree.
var i=r3(e);0!==i&&(r=i,o=fA(e,i))}if(1===o){var a=fr;throw f$(e,0),fj(e,r),fN(e,rx()),a}if(6===o)// cases where need to exit the current render without producing a
// consistent tree or committing.
//
// This should only happen during a concurrent render, not a discrete or
// synchronous update. We should have already checked for this when we
// unwound the stack.
fj(e,r);else{// The render completed.
// Check if this render may have yielded to a concurrent event, and if so,
// confirm that any newly rendered stores are consistent.
// TODO: It's possible that even a concurrent render may never have yielded
// to the main thread, if it was fast enough, or if it expired. We could
// skip the consistency check in that case, too.
var s=(30&r)==0,u=e.current.alternate;if(s&&!function(e){for(// Search the rendered tree for external store reads, and check whether the
// stores were mutated in a concurrent event. Intentionally using an iterative
// loop instead of recursion so we can exit early.
var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n){var r=n.stores;if(null!==r)for(var o=0;o<r.length;o++){var i=r[o],a=i.getSnapshot,s=i.value;try{if(!iT(a(),s))return!1}catch(e){// If `getSnapshot` throws, return `false`. This will schedule
// a re-render, and the error will be rethrown during render.
return!1}}}}var u=t.child;if(16384&t.subtreeFlags&&null!==u){u.return=t,t=u;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}// Flow doesn't know this is unreachable, but eslint does
// eslint-disable-next-line no-unreachable
return!0}(u)){if(2===// A store was mutated in an interleaved event. Render again,
// synchronously, to block further mutations.
(o=fQ(e,r))){var l=r3(e);0!==l&&(r=l,o=fA(e,l))}if(1===o){var c=fr;throw f$(e,0),fj(e,r),fN(e,rx()),c}}// We now have a consistent tree. The next step is either to commit it,
// or, if something suspended, wait to commit it after a timeout.
e.finishedWork=u,e.finishedLanes=r,function(e,t,n){switch(t){case 0:case 1:throw Error("Root did not complete. This is a bug in React.");// Flow knows about invariant, so it complains if I add a break
// statement, but eslint doesn't know about invariant, so it complains
// if I do. eslint-disable-next-line no-fallthrough
case 2:case 5:// We should have already attempted to retry this tree. If we reached
// this point, it errored again. Commit it.
fX(e,fl,ff);break;case 3:// should immediately commit it or wait a bit.
if(fj(e,n),r6(n)&&// do not delay if we're inside an act() scope
!pa()){// This render only included retries, no updates. Throttle committing
// retries so that we don't show too many loading states too quickly.
var r=fc+500-rx();// Don't bother with a very short suspense time.
if(r>10){if(0!==r2(e,0))break;var o=e.suspendedLanes;if((o&n)!==n){fI(),on(e,o);break}// The render is suspended, it hasn't timed out, and there's no
// lower priority work to do. Instead of committing the fallback
// immediately, wait for more data to arrive.
e.timeoutHandle=aA(fX.bind(null,e,fl,ff),r);break}}// The work expired. Commit immediately.
fX(e,fl,ff);break;case 4:if(fj(e,n),(4194240&n)===n)break;if(!pa()){// This is not a transition, but we did trigger an avoided state.
// Schedule a placeholder to display after a short delay, using the Just
// Noticeable Difference.
// TODO: Is the JND optimization worth the added complexity? If this is
// the only reason we track the event time, then probably not.
// Consider removing.
var i=function(e,t){for(var n=e.eventTimes,r=-1;t>0;){var o=r9(t),i=1<<o,a=n[o];a>r&&(r=a),t&=~i}return r}(e,n),a=rx()-i,s=(a<120?120:a<480?480:a<1080?1080:a<1920?1920:a<3e3?3e3:a<4320?4320:1960*d1(a/1960))-a;if(s>10){// Instead of committing the fallback immediately, wait for more data
// to arrive.
e.timeoutHandle=aA(fX.bind(null,e,fl,ff),s);break}}// Commit the placeholder.
fX(e,fl,ff);break;default:throw Error("Unknown root exit status.")}}(e,o,r)}}return(fN(e,rx()),e.callbackNode===n)?fL.bind(null,e):null}function fA(e,t){// If an error occurred during hydration, discard server response and fall
// back to client side render.
// Before rendering again, save the errors from the previous attempt.
var n=fu;if(ou(e)){// The shell failed to hydrate. Set a flag to force a client rendering
// during the next attempt. To do this, we call prepareFreshStack now
// to create the root work-in-progress fiber. This is a bit weird in terms
// of factoring, because it relies on renderRootSync not calling
// prepareFreshStack again in the call below, which happens because the
// root and lanes haven't changed.
//
// TODO: I think what we should do is set ForceClientRender inside
// throwException, like we do for nested Suspense boundaries. The reason
// it's here instead is so we can switch to the synchronous work loop, too.
// Something to consider for a future refactor.
var r=f$(e,t);r.flags|=256,// TODO: This gets logged by onRecoverableError, too, so we should be
// able to remove it.
eN("An error occurred during hydration. The server HTML was replaced with client content in <%s>.",e.containerInfo.nodeName.toLowerCase())}var o=fQ(e,t);if(2!==o){// Successfully finished rendering on retry
// The errors from the failed first attempt have been recovered. Add
// them to the collection of recoverable errors. We'll log them in the
// commit phase.
var i=fl;fl=n,null!==i&&fU(i)}return o}function fU(e){null===fl?fl=e:fl.push.apply(fl,e)}function fj(e,t){// When suspending, we should always exclude lanes that were pinged or (more
// rarely, since we try to avoid it) updated during the render phase.
// TODO: Lol maybe there's a better way to factor this besides this
// obnoxiously named function :)
t&=~fs,function(e,t){e.suspendedLanes|=t,e.pingedLanes&=~t;for(var n=e.expirationTimes,r=t;r>0;){var o=r9(r),i=1<<o;n[o]=-1,r&=~i}}(e,t&=~fa)}// This is the entry point for synchronous tasks that don't go
// through Scheduler
function fF(e){if(cT=cO,cO=!1,(6&d5)!=0)throw Error("Should not already be working.");fJ();var t=r2(e,0);if(!((1&t)!=0))return(// There's no remaining sync work left.
fN(e,rx()),null);var n=fQ(e,t);if(0!==e.tag&&2===n){// If something threw an error, try rendering one more time. We'll render
// synchronously to block concurrent data mutations, and we'll includes
// all pending updates are included. If it still fails after the second
// attempt, we'll give up and commit the resulting tree.
var r=r3(e);0!==r&&(t=r,n=fA(e,r))}if(1===n){var o=fr;throw f$(e,0),fj(e,t),fN(e,rx()),o}if(6===n)throw Error("Root did not complete. This is a bug in React.");// We now have a consistent tree. Because this is a sync render, we
// will commit it even if something suspended.
var i=e.current.alternate;return e.finishedWork=i,e.finishedLanes=t,fX(e,fl,ff),// pending level.
fN(e,rx()),null}function fz(e,t){var n=d5;d5|=/*               */1;try{return e(t)}finally{// most batchedUpdates-like method.
0===(d5=n)&&// Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
!d6.isBatchingLegacy&&(fp(),sb&&sk())}}// Warning, this opts-out of checking the function body.
// eslint-disable-next-line no-redeclare
function fq(e){// In legacy mode, we flush pending passive effects at the beginning of the
// next event, not at the end of the previous one.
null!==fy&&0===fy.tag&&(6&d5)==0&&fJ();var t=d5;d5|=1;var n=d4.transition,r=oa;try{if(d4.transition=null,oa=1,e)return e();return}finally{oa=r,d4.transition=n,(6&(d5=t))==0&&sk()}}function fB(e,t){sn(ft,fe,e),fe|=t,fo|=t}function fV(e){fe=ft.current,st(ft,e)}function f$(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(// The root previous suspended and scheduled a timeout to commit a fallback
// state. Now that we have additional work, cancel the timeout.
e.timeoutHandle=-1,aU(n)),null!==d7)for(var r=d7.return;null!==r;)dg(r.alternate,r),r=r.return;d8=e;var o=pg(e.current,null);return d7=o,d9=fe=fo=t,fn=0,fr=null,fi=0,fa=0,fs=0,fu=null,fl=null,function(){// Transfer the interleaved updates onto the main queue. Each queue has a
// `pending` field and an `interleaved` field. When they are not null, they
// point to the last node in a circular linked list. We need to append the
// interleaved list to the end of the pending list by joining them into a
// single, circular list.
if(null!==uy){for(var e=0;e<uy.length;e++){var t=uy[e],n=t.interleaved;if(null!==n){t.interleaved=null;var r=n.next,o=t.pending;if(null!==o){var i=o.next;o.next=r,n.next=i}t.pending=n}}uy=null}}(),s4.discardPendingWarnings(),o}function fW(e,t){for(;;){var n=d7;try{if(// Reset module-level state that was set during the render phase.
uf(),lS(),tN(),// separate issue. Write a regression test using string refs.
d3.current=null,null===n||null===n.return){// Expected to be working on a non-root fiber. This is a fatal error
// because there's no ancestor that can handle it; the root is
// supposed to capture all errors that weren't caught by an error
// boundary.
fn=1,fr=t,// sibling, or the parent if there are no siblings. But since the root
// has no siblings nor a parent, we set it to null. Usually this is
// handled by `completeUnitOfWork` or `unwindWork`, but since we're
// intentionally not calling those, we need set it here.
// TODO: Consider calling `unwindWork` to pop the contexts.
d7=null;return}if(2&n.mode&&// avoids inaccurate Profiler durations in the case of a
// suspended render.
cP(n,!0),rV(),null!==t&&"object"==typeof t&&"function"==typeof t.then){var r,o,i,a,s,u=t;a=n,s=d9,null!==rL&&"function"==typeof rL.markComponentSuspended&&rL.markComponentSuspended(a,u,s)}else r=n,o=t,i=d9,null!==rL&&"function"==typeof rL.markComponentErrored&&rL.markComponentErrored(r,o,i);(function(e,t,n,r,o){if(// The source fiber did not complete.
n.flags|=/*                   */32768,rU&&pn(e,o),null!==r&&"object"==typeof r&&"function"==typeof r.then){// This is a wakeable. The component suspended.
var i,a=r;(function(e,t){// A legacy mode Suspense quirk, only relevant to hook components.
var n=e.tag;if((1&e.mode)==0&&(0===n||11===n||15===n)){var r=e.alternate;r?(e.updateQueue=r.updateQueue,e.memoizedState=r.memoizedState,e.lanes=r.lanes):(e.updateQueue=null,e.memoizedState=null)}})(n),sz&&1&n.mode&&(sq=!0);var s=cB(t);if(null!==s){s.flags&=-257,cV(s,t,n,e,o),1&s.mode&&cq(e,a,o),function(e,t,n,r){// Retry listener
//
// If the fallback does commit, we need to attach a different type of
// listener. This one schedules an update on the Suspense boundary to turn
// the fallback state off.
//
// Stash the wakeable on the boundary fiber so we can access it in the
// commit phase.
//
// When the wakeable resolves, we'll attempt to render the boundary
// again ("retry").
var o=e.updateQueue;if(null===o){var i=new Set;i.add(n),e.updateQueue=i}else o.add(n)}(s,0,a);return}// No boundary was found. Unless this is a sync update, this is OK.
// We can suspend and wait for more data to arrive.
if(!((1&o)!=0)){// This is not a sync update. Suspend. Since we're not activating a
// Suspense boundary, this will unwind all the way to the root without
// performing a second pass to render a fallback. (This is arguably how
// refresh transitions should work, too, since we're not going to commit
// the fallbacks anyway.)
//
// This case also applies to initial hydration.
cq(e,a,o),fY();return}// This is a sync/discrete update. We treat this case like an error
// The error will be caught by the nearest suspense boundary.
r=Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.")}else if(sz&&1&n.mode){sq=!0;var u=cB(t);// If the error was thrown during hydration, we may be able to recover by
// discarding the dehydrated content and switching to a client render.
// Instead of surfacing the error, find the nearest Suspense boundary
// and render it again without hydration.
if(null!==u){(65536&u.flags)==0&&// children again, not the fallback.
(u.flags|=256),cV(u,t,n,e,o),// still log it so it can be fixed.
s2(cL(r,n));return}}i=r=cL(r,n),4!==fn&&(fn=2),null===fu?fu=[i]:fu.push(i);// over and traverse parent path again, this time treating the exception
// as an error.
var l=t;do{switch(l.tag){case 3:var c,d=r;l.flags|=65536;var f=(c=o)&-c;l.lanes=l.lanes|f;var p=cF(l,d,f);uO(l,p);return;case 1:// Capture and retry
var h=r,m=l.type,g=l.stateNode;if((128&l.flags)==0&&("function"==typeof m.getDerivedStateFromError||null!==g&&"function"==typeof g.componentDidCatch&&!fZ(g))){l.flags|=65536;var v,y=(v=o)&-v;l.lanes=l.lanes|y;var b=cz(l,h,y);uO(l,b);return}}l=l.return}while(null!==l)})(e,n.return,n,t,d9),fG(n)}catch(e){// Something in the return path also threw.
t=e,d7===n&&null!==n?d7=// If this boundary has already errored, then we had trouble processing
// the error. Bubble it to the next boundary.
n=n.return:n=d7;continue}// Return to the normal work loop.
return}}function fH(){var e=d2.current;return(d2.current=cf,null===e)?cf:e}function fY(){(0===fn||3===fn||2===fn)&&(fn=4),null!==d8&&(r4(fi)||r4(fa))&&// the updates that were skipped. Usually we only suspend at the end of
// the render phase.
// TODO: We should probably always mark the root as suspended immediately
// (inside this function), since by suspending at the end of the render
// phase introduces a potential mistake where we suspend lanes that were
// pinged or updated while we were rendering.
fj(d8,d9)}function fQ(e,t){var n=d5;d5|=2;var r=fH();// If the root or lanes have changed, throw out the existing stack
// and prepare a fresh one. Otherwise we'll continue where we left off.
if(d8!==e||d9!==t){if(rU){var o=e.memoizedUpdaters;o.size>0&&(pn(e,d9),o.clear()),// If we bailout on this work, we'll move them back (like above).
// It's important to move them now in case the work spawns more work at the same priority with different updaters.
// That way we can keep the current update and future updates separate.
oi(e,t)}ff=null,f$(e,t)}for(rH(t);;)try{/** @noinline */(function(){// Already timed out, so perform work without checking if we need to yield.
for(;null!==d7;)fK(d7)})();break}catch(t){fW(e,t)}if(uf(),d5=n,d2.current=r,null!==d7)throw Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");return rY(),d8=null,d9=0,fn}// The work loop is an extremely hot path. Tell Closure not to inline it.
function fK(e){// The current, flushed, state of this fiber is the alternate. Ideally
// nothing should rely on this, but relying on it here means that we don't
// need an additional field on the work in progress.
var t,n=e.alternate;tL(e),(2&e.mode)!=0?(cR(e),t=eS(n,e,fe),cP(e,!0)):t=eS(n,e,fe),tN(),e.memoizedProps=e.pendingProps,null===t?fG(e):d7=t,d3.current=null}function fG(e){// Attempt to complete the current unit of work, then move to the next
// sibling. If there are no more siblings, return to the parent fiber.
var t=e;do{// The current, flushed, state of this fiber is the alternate. Ideally
// nothing should rely on this, but relying on it here means that we don't
// need an additional field on the work in progress.
var n=t.alternate,r=t.return;if((32768&t.flags)==0){tL(t);var o=void 0;if((2&t.mode)==0?o=dm(n,t,fe):(cR(t),o=dm(n,t,fe),cP(t,!1)),tN(),null!==o){// Completing this fiber spawned new work. Work on that next.
d7=o;return}}else{// This fiber did not complete because something threw. Pop values off
// the stack without entering the complete phase. If this is a boundary,
// capture values if possible.
var i=function(e,t,n){switch(// Note: This intentionally doesn't check if we're hydrating because comparing
// to the current tree provider fiber is just as fast and less error-prone.
// Ideally we would have a special version of the work loop only
// for hydration.
sA(t),t.tag){case 1:sd(t.type)&&sf(t);var r=t.flags;if(65536&r)return t.flags=-65537&r|128,(2&t.mode)!=0&&cN(t),t;return null;case 3:t.stateNode,u2(t),sp(t),le();var o=t.flags;if((65536&o)!=0&&(128&o)==0)return(// There was an error during render that wasn't captured by a suspense
// boundary. Do a second pass on the root to unmount the children.
t.flags=-65537&o|128,t);// We unwound to the root without completing it. Exit.
return null;case 5:return(// TODO: popHydrationState
u6(t),null);case 13:st(u5,t);var i=t.memoizedState;if(null!==i&&null!==i.dehydrated){if(null===t.alternate)throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");s0()}var a=t.flags;if(65536&a)return t.flags=-65537&a|128,(2&t.mode)!=0&&cN(t),t;return null;case 19:// caught by a nested boundary. If not, it should bubble through.
return st(u5,t),null;case 4:return u2(t),null;case 10:return uh(t.type._context,t),null;case 22:case 23:return fV(t),null;default:return null}}(0,t);// Because this fiber did not complete, don't reset its lanes.
if(null!==i){// If completing this work spawned new work, do that next. We'll come
// back here again.
// Since we're restarting, remove anything that is not a host effect
// from the effect tag.
i.flags&=/*               */32767,d7=i;return}if((2&t.mode)!=0){// Record the render duration for the fiber that errored.
cP(t,!1);// Include the time spent working on failed children before continuing.
for(var a=t.actualDuration,s=t.child;null!==s;)a+=s.actualDuration,s=s.sibling;t.actualDuration=a}if(null!==r)// Mark the parent fiber as incomplete and clear its subtree flags.
r.flags|=32768,r.subtreeFlags=0,r.deletions=null;else{// We've unwound all the way to the root.
fn=6,d7=null;return}}var u=t.sibling;if(null!==u){// If there is more work to do in this returnFiber, do that next.
d7=u;return}// Otherwise, return to the parent
d7=t=r}while(null!==t)// We've reached the root.
0===fn&&(fn=5)}function fX(e,t,n){// TODO: This no longer makes any sense. We already wrap the mutation and
// layout phases. Should be able to remove.
var r=oa,o=d4.transition;try{d4.transition=null,oa=1,function(e,t,n,r){do // means `flushPassiveEffects` will sometimes result in additional
// passive effects. So we need to keep flushing in a loop until there are
// no more pending effects.
// TODO: Might be better if `flushPassiveEffects` did not automatically
// flush synchronous work at the end, to avoid factoring hazards like this.
fJ();while(null!==fy)if(s4.flushLegacyContextWarning(),s4.flushPendingUnsafeLifecycleWarnings(),(6&d5)!=0)throw Error("Should not already be working.");var o=e.finishedWork,i=e.finishedLanes;if(null!==rL&&"function"==typeof rL.markCommitStarted&&rL.markCommitStarted(i),null===o)return rq();if(0===i&&eN("root.finishedLanes should not be empty during a commit. This is a bug in React."),e.finishedWork=null,e.finishedLanes=0,o===e.current)throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");// commitRoot never returns a continuation; it always finishes synchronously.
// So we can clear these now to allow a new callback to be scheduled.
e.callbackNode=null,e.callbackPriority=0;// pending time is whatever is left on the root fiber.
var a=o.lanes|o.childLanes;(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t;for(var r=e.entanglements,o=e.eventTimes,i=e.expirationTimes,a=n;a>0;){var s=r9(a),u=1<<s;r[s]=0,o[s]=-1,i[s]=-1,a&=~u}})(e,a),e===d8&&(// We can reset these now that they are finished.
d8=null,d7=null,d9=0),(2064&o.subtreeFlags)==0&&(2064&o.flags)==0||fv||(fv=!0,// to store it in pendingPassiveTransitions until they get processed
// We need to pass this through as an argument to commitRoot
// because workInProgressTransitions might have changed between
// the previous render and commit if we throttle the commit
// with setTimeout
f_=n,po(rO,function(){// *after* passive effects fire to avoid freeing a cache pool that may
// be referenced by a node in the tree (HostRoot, Cache boundary etc)
return fJ(),null}));// TODO: This is left over from the effect list implementation, where we had
// to check for the existence of `firstEffect` to satisfy Flow. I think the
// only other reason this optimization exists is because it affects profiling.
// Reconsider whether this is necessary.
var s=(15990&o.subtreeFlags)!=0,u=(15990&o.flags)!=0;if(s||u){var l,c,d,f=d4.transition;d4.transition=null;var p=oa;oa=1;var h=d5;d5|=/*                */4,d3.current=null,e.containerInfo,aM=oT,aN={focusedElem:c=iD(),selectionRange:iM(c)?("selectionStart"in c?{start:c.selectionStart,end:c.selectionEnd}:/**
 * @param {DOMElement} outerNode
 * @return {?object}
 */function(e){var t=e.ownerDocument,n=t&&t.defaultView||window,r=n.getSelection&&n.getSelection();if(!r||0===r.rangeCount)return null;var o=r.anchorNode,i=r.anchorOffset,a=r.focusNode,s=r.focusOffset;// In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
// up/down buttons on an <input type="number">. Anonymous divs do not seem to
// expose properties, triggering a "Permission denied error" if any of its
// properties are accessed. The only seemingly possible way to avoid erroring
// is to access a property that typically works for non-anonymous divs and
// catch any error that may otherwise arise. See
// https://bugzilla.mozilla.org/show_bug.cgi?id=208427
try{/* eslint-disable no-unused-expressions */o.nodeType,a.nodeType;/* eslint-enable no-unused-expressions */}catch(e){return null}return(/**
 * Returns {start, end} where `start` is the character/codepoint index of
 * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
 * `end` is the index of (focusNode, focusOffset).
 *
 * Returns null if you pass in garbage input but we should probably just crash.
 *
 * Exported only for testing.
 */function(e,t,n,r,o){var i=0,a=-1,s=-1,u=0,l=0,c=e,d=null;r:for(;;){for(var f=null;c===t&&(0===n||3===c.nodeType)&&(a=i+n),c===r&&(0===o||3===c.nodeType)&&(s=i+o),3===c.nodeType&&(i+=c.nodeValue.length),null!==(f=c.firstChild);)// Moving from `node` to its first child `next`.
d=c,c=f;for(;;){if(c===e)break r;if(d===t&&++u===n&&(a=i),d===r&&++l===o&&(s=i),null!==(f=c.nextSibling))break;d=(c=d).parentNode}// Moving from `node` to its next sibling `next`.
c=f}return -1===a||-1===s?null:{start:a,end:s}}(e,o,i,a,s))}(c))||{start:0,end:0}:null},oT=!1,d_=o,function(){for(;null!==d_;){var e=d_,t=e.child;// This phase is only used for beforeActiveInstanceBlur.
(1028&e.subtreeFlags)!=0&&null!==t?(t.return=e,d_=t):function(){for(;null!==d_;){var e=d_;tL(e);try{(function(e){var t=e.alternate;if((1024&e.flags)!=0){switch(tL(e),e.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==t){var n,r=t.memoizedProps,o=t.memoizedState,i=e.stateNode;e.type!==e.elementType||eg||(i.props!==e.memoizedProps&&eN("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",tO(e)||"instance"),i.state!==e.memoizedState&&eN("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",tO(e)||"instance"));var a=i.getSnapshotBeforeUpdate(e.elementType===e.type?r:ua(e.type,r),o),s=dv;void 0!==a||s.has(e.type)||(s.add(e.type),eN("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",tO(e))),i.__reactInternalSnapshotBeforeUpdate=a}break;case 3:1===(n=e.stateNode.containerInfo).nodeType?n.textContent="":9===n.nodeType&&n.documentElement&&n.removeChild(n.documentElement);break;default:throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}tN()}})(e)}catch(t){f2(e,e.return,t)}tN();var t=e.sibling;if(null!==t){t.return=e.return,d_=t;return}d_=e.return}}()}}(),cS=ck(),dk=i,dS=e,tL(o),dB(o,e),tL(o),dk=null,dS=null,e.containerInfo,/**
 * @restoreSelection: If any selection information was potentially lost,
 * restore it. This is useful when performing operations that could remove dom
 * nodes and place them back in, resulting in focus being lost.
 */function(e){var t,n=iD(),r=e.focusedElem,o=e.selectionRange;if(n!==r&&(t=r)&&t.ownerDocument&&function e(t,n){return!!t&&!!n&&(t===n||!iI(t)&&(iI(n)?e(t,n.parentNode):"contains"in t?t.contains(n):!!t.compareDocumentPosition&&!!(16&t.compareDocumentPosition(n))))}(t.ownerDocument.documentElement,t)){null!==o&&iM(r)&&(i=o.start,a=o.end,void 0===a&&(a=i),"selectionStart"in r?(r.selectionStart=i,r.selectionEnd=Math.min(a,r.value.length)):/**
 * In modern non-IE browsers, we can support both forward and backward
 * selections.
 *
 * Note: IE10+ supports the Selection object, but it does not support
 * the `extend` method, which means that even in modern IE, it's not possible
 * to programmatically create a backward selection. Thus, for all IE
 * versions, we use the old IE API to create our selections.
 *
 * @param {DOMElement|DOMTextNode} node
 * @param {object} offsets
 */function(e,t){var n=e.ownerDocument||document,r=n&&n.defaultView||window;// (For instance: TinyMCE editor used in a list component that supports pasting to add more,
// fails when pasting 100+ items)
if(r.getSelection){var o=r.getSelection(),i=e.textContent.length,a=Math.min(t.start,i),s=void 0===t.end?a:Math.min(t.end,i);// Flip backward selections, so we can set with a single range.
if(!o.extend&&a>s){var u=s;s=a,a=u}var l=iP(e,a),c=iP(e,s);if(l&&c){if(1===o.rangeCount&&o.anchorNode===l.node&&o.anchorOffset===l.offset&&o.focusNode===c.node&&o.focusOffset===c.offset)return;var d=n.createRange();d.setStart(l.node,l.offset),o.removeAllRanges(),a>s?(o.addRange(d),o.extend(c.node,c.offset)):(d.setEnd(c.node,c.offset),o.addRange(d))}}}(r,o));for(// Focusing a node can change the scroll position, which is undesirable
var i,a,s=[],u=r;u=u.parentNode;)1===u.nodeType&&s.push({element:u,left:u.scrollLeft,top:u.scrollTop});"function"==typeof r.focus&&r.focus();for(var l=0;l<s.length;l++){var c=s[l];c.element.scrollLeft=c.left,c.element.scrollTop=c.top}}}(aN),oT=!!aM,aM=null,aN=null,// the mutation phase, so that the previous tree is still current during
// componentWillUnmount, but before the layout phase, so that the finished
// work is current during componentDidMount/Update.
e.current=o,null!==rL&&"function"==typeof rL.markLayoutEffectsStarted&&rL.markLayoutEffectsStarted(i),dk=i,dS=e,d_=o,function e(t,n,r){for(// Suspense layout effects semantics don't change for legacy roots.
var o=(1&t.mode)!=0;null!==d_;){var i=d_,a=i.child;if(22===i.tag&&o){var s=null!==i.memoizedState||dy;if(s){// The Offscreen tree is hidden. Skip over its layout effects.
d$(t,n,r);continue}// TODO (Offscreen) Also check: subtreeFlags & LayoutMask
var u=i.alternate,l=null!==u&&null!==u.memoizedState||db,c=dy,d=db;dy=s,(db=l)&&!d&&(// This is the root of a reappearing boundary. Turn its layout effects
// back on.
d_=i,function(e){for(;null!==d_;){var t=d_,n=t.child;if(22===t.tag&&null!==t.memoizedState){// Nested Offscreen tree is still hidden. Don't re-appear its effects.
dH(e);continue}// TODO (Offscreen) Check: subtreeFlags & LayoutStatic
null!==n?(// This node may have been reused from a previous render, so we can't
// assume its return pointer is correct.
n.return=t,d_=n):dH(e)}}(i));for(var f=a;null!==f;)d_=f,e(f,n,r),f=f.sibling;// Restore Offscreen state and resume in our-progress traversal.
d_=i,dy=c,db=d,d$(t,n,r);continue}(8772&i.subtreeFlags)!=0&&null!==a?(a.return=i,d_=a):d$(t,n,r)}}(o,e,i),dk=null,dS=null,null!==rL&&"function"==typeof rL.markLayoutEffectsStopped&&rL.markLayoutEffectsStopped(),// opportunity to paint.
rS(),d5=h,oa=p,d4.transition=f}else // No effects.
e.current=o,cS=ck();var m=fv;if(fv?(// This commit has passive effects. Stash a reference to them. But don't
// schedule a callback until after flushing layout work.
fv=!1,fy=e,fb=i):(fC=0,fT=null),0===(a=e.pendingLanes)&&// error boundaries.
(fg=null),m||f8(e.current,!1),function(e,t){if(rN&&"function"==typeof rN.onCommitFiberRoot)try{var n,r=(128&e.current.flags)==128;switch(t){case 1:n=rC;break;case 4:n=rT;break;case 16:default:n=rO;break;case 536870912:n=rP}rN.onCommitFiberRoot(rM,e,n,r)}catch(e){rA||(rA=!0,eN("React instrumentation encountered an error: %s",e))}}(o.stateNode,r),rU&&e.memoizedUpdaters.clear(),dJ.forEach(function(e){return e()}),// additional work on this root is scheduled.
fN(e,rx()),null!==t)for(var g=e.onRecoverableError,v=0;v<t.length;v++){var y=t[v],b=y.stack,w=y.digest;g(y.value,{componentStack:b,digest:w})}if(fh){fh=!1;var _=fm;throw fm=null,_}// If the passive effects are the result of a discrete render, flush them
(1&fb)!=0&&0!==e.tag&&fJ(),(1&// Read this again, since a passive effect might have updated it
(a=e.pendingLanes))!=0?(cO=!0,e===fS?fk++:(fk=0,fS=e)):fk=0,// If layout work was scheduled, flush it now.
sk(),rq()}(e,t,n,r)}finally{d4.transition=o,oa=r}return null}function fJ(){// Returns whether passive effects were flushed.
// TODO: Combine this check with the one in flushPassiveEFfectsImpl. We should
// probably just combine the two functions. I believe they were only separate
// in the first place because we used to wrap it with
// `Scheduler.runWithPriority`, which accepts a function. But now we track the
// priority within React itself, so we can mutate the variable directly.
if(null!==fy){var e=os(fb),t=d4.transition,n=oa;try{return d4.transition=null,oa=16>e?16:e,function(){if(null===fy)return!1;// Cache and clear the transitions flag
var e,t=f_;f_=null;var n=fy,r=fb;if(fy=null,// Figure out why and fix it. It's not causing any known issues (probably
// because it's only used for profiling), but it's a refactor hazard.
fb=0,(6&d5)!=0)throw Error("Cannot flush passive effects while already rendering.");fx=!0,fE=!1,null!==rL&&"function"==typeof rL.markPassiveEffectsStarted&&rL.markPassiveEffectsStarted(r);var o=d5;d5|=4,d_=n.current,function(){for(;null!==d_;){var e=d_,t=e.child;if((16&d_.flags)!=0){var n=e.deletions;if(null!==n){for(var r=0;r<n.length;r++){var o=n[r];d_=o,function(e,t){for(;null!==d_;){var n=d_;// Deletion effects fire in parent -> child order
// TODO: Check if fiber has a PassiveStatic flag
tL(n),function(e,t){switch(e.tag){case 0:case 11:case 15:2&e.mode?(cC=ck(),dI(8,e,t),cD(e)):dI(8,e,t)}}// TODO: Reuse reappearLayoutEffects traversal here?
(n,t),tN();var r=n.child;// TODO: Only traverse subtree if it has a PassiveStatic flag. (But, if we
null!==r?(r.return=n,d_=r):function(e){for(;null!==d_;){var t=d_,n=t.sibling,r=t.return;if(// Recursively traverse the entire deleted tree and clean up fiber fields.
// This is more aggressive than ideal, and the long term goal is to only
// have to detach the deleted tree at the root.
function e(t){var n=t.alternate;// tree, which has its own pointers to children, parents, and siblings.
// The other host nodes also point back to fibers, so we should detach that
// one, too.
if(null!==n&&(t.alternate=null,e(n)),// Clear cyclical Fiber fields. This level alone is designed to roughly
// approximate the planned Fiber refactor. In that world, `setState` will be
// bound to a special "instance" object instead of a Fiber. The Instance
// object will not have any of these fields. It will only be connected to
// the fiber tree via a single link at the root. So if this level alone is
// sufficient to fix memory issues, that bodes well for our plans.
t.child=null,t.deletions=null,t.sibling=null,5===t.tag){var r=t.stateNode;null!==r&&(// TODO: This function is only called on host components. I don't think all of
// these fields are relevant.
delete r[aQ],delete r[aK],delete r[aX],delete r[aJ],delete r[aZ])}t.stateNode=null,t._debugOwner=null,// Theoretically, nothing in here should be necessary, because we already
// disconnected the fiber from the tree. So even if something leaks this
// particular fiber, it won't leak anything else
//
// The purpose of this branch is to be super aggressive so we can measure
// if there's any difference in memory impact. If there is, that could
// indicate a React leak we don't know about.
t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}(t),t===e){d_=null;return}if(null!==n){n.return=r,d_=n;return}d_=r}}(e)}}(o,e)}// A fiber was deleted from this parent fiber, but it's still part of
// the previous (alternate) parent fiber's list of children. Because
// children are a linked list, an earlier sibling that's still alive
// will be connected to the deleted fiber via its `alternate`:
//
//   live fiber
//   --alternate--> previous live fiber
//   --sibling--> deleted fiber
//
// We can't disconnect `alternate` on nodes that haven't been deleted
// yet, but we can disconnect the `sibling` and `child` pointers.
var i=e.alternate;if(null!==i){var a=i.child;if(null!==a){i.child=null;do{var s=a.sibling;a.sibling=null,a=s}while(null!==a)}}d_=e}}(2064&e.subtreeFlags)!=0&&null!==t?(t.return=e,d_=t):function(){for(;null!==d_;){var e=d_;(2048&e.flags)!=0&&(tL(e),function(e){switch(e.tag){case 0:case 11:case 15:2&e.mode?(cC=ck(),dI(9,e,e.return),cD(e)):dI(9,e,e.return)}}(e),tN());var t=e.sibling;if(null!==t){t.return=e.return,d_=t;return}d_=e.return}}()}}(),d_=e=n.current,function(e,t,n,r){for(;null!==d_;){var o=d_,i=o.child;(2064&o.subtreeFlags)!=0&&null!==i?(i.return=o,d_=i):function(e,t,n,r){for(;null!==d_;){var o=d_;if((2048&o.flags)!=0){tL(o);try{(function(e,t,n,r){switch(t.tag){case 0:case 11:case 15:if(2&t.mode){cC=ck();try{dD(9,t)}finally{cD(t)}}else dD(9,t)}})(0,o,0,0)}catch(e){f2(o,o.return,e)}tN()}if(o===e){d_=null;return}var i=o.sibling;if(null!==i){i.return=o.return,d_=i;return}d_=o.return}}(e,0,0,0)}}(e,n,r,t);var i=fw;fw=[];for(var a=0;a<i.length;a++)!function(e,t){// Only Profilers with work in their subtree will have an Update effect scheduled.
if((4&t.flags)!=0&&12===t.tag){var n=t.stateNode.passiveEffectDuration,r=t.memoizedProps,o=r.id,i=r.onPostCommit,a=cS,s=null===t.alternate?"mount":"update";cT&&(s="nested-update"),"function"==typeof i&&i(o,s,n,a);// Bubble times to the next nearest ancestor Profiler.
// After we process that Profiler, we'll bubble further up.
var u=t.return;r:for(;null!==u;){switch(u.tag){case 3:var l=u.stateNode;l.passiveEffectDuration+=n;break r;case 12:var c=u.stateNode;c.passiveEffectDuration+=n;break r}u=u.return}}}(0,i[a]);null!==rL&&"function"==typeof rL.markPassiveEffectsStopped&&rL.markPassiveEffectsStopped(),f8(n.current,!0),d5=o,sk(),fE?n===fT?fC++:(fC=0,fT=n):fC=0,fx=!1,fE=!1,function(e){if(rN&&"function"==typeof rN.onPostCommitFiberRoot)try{rN.onPostCommitFiberRoot(rM,e)}catch(e){rA||(rA=!0,eN("React instrumentation encountered an error: %s",e))}}(n);var s=n.current.stateNode;return s.effectDuration=0,s.passiveEffectDuration=0,!0}()}finally{oa=n,d4.transition=t}}return!1}function fZ(e){return null!==fg&&fg.has(e)}var f0=function(e){fh||(fh=!0,fm=e)};function f1(e,t,n){var r=cF(e,cL(n,t),1),o=uC(e,r,1),i=fI();null!==o&&(ot(o,1,i),fN(o,i))}function f2(e,t,n){if(rc(null,function(){throw n}),rd(),fP=!1,3===e.tag){// Error was thrown at the root. There is no parent, so the root
// itself should capture it.
f1(e,e,n);return}var r=null;for(r=t;null!==r;){if(3===r.tag){f1(r,e,n);return}if(1===r.tag){var o=r.type,i=r.stateNode;if("function"==typeof o.getDerivedStateFromError||"function"==typeof i.componentDidCatch&&!fZ(i)){var a=cz(r,cL(n,e),1),s=uC(r,a,1),u=fI();null!==s&&(ot(s,1,u),fN(s,u));return}}r=r.return}// TODO: Until we re-land skipUnmountedBoundaries (see #20147), this warning
// will fire for errors that are thrown by destroy functions inside deleted
// trees. What it should instead do is propagate the error to the parent of
// the deleted tree. In the meantime, do not add this warning to the
// allowlist; this is only for our internal use.
eN("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s",n)}function f3(e,t,n){var r=e.pingCache;null!==r&&// never be thrown again.
r.delete(t);var o=fI();on(e,n),0!==e.tag&&d0()&&null===d6.current&&eN("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act"),d8===e&&(d9&n)===n&&(4===fn||3===fn&&r6(d9)&&rx()-fc<500?f$(e,0):// opportunity later. So we mark this render as having a ping.
fs|=n),fN(e,o)}function f4(e,t){// The boundary fiber (a Suspense component or SuspenseList component)
// previously was rendered in its fallback state. One of the promises that
// suspended it has resolved, which means at least part of the tree was
// likely unblocked. Try rendering again, at a new lanes.
0===t&&// unnecessary entanglement?
(t=(1&e.mode)==0?1:(n=r0,(130023424&(r0<<=1))==0&&(r0=4194304),n));// TODO: Special case idle priority?
var n,r=fI(),o=u_(e,t);null!==o&&(ot(o,t,r),fN(o,r))}function f6(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),f4(e,n)}function f5(e,t){var n,r=0;// Default
switch(e.tag){case 13:n=e.stateNode;var o=e.memoizedState;null!==o&&(r=o.retryLane);break;case 19:n=e.stateNode;break;default:throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}null!==n&&// never be thrown again.
n.delete(t),f4(e,r)}// Computes the next Just Noticeable Difference (JND) boundary.
function f8(e,t){// TODO (StrictEffects) Should we set a marker on the root if it contains strict effects
// so we don't traverse unnecessarily? similar to subtreeFlags but just at the root level.
// Maybe not a big deal since this is DEV only behavior.
tL(e),f7(e,16777216,dK),t&&f7(e,/*              */33554432,dG),f7(e,16777216,dY),t&&f7(e,33554432,dQ),tN()}function f7(e,t,n){for(// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
var r=e,o=null;null!==r;){var i=r.subtreeFlags&t;r!==o&&null!==r.child&&0!==i?r=r.child:((r.flags&t)!=0&&n(r),r=null!==r.sibling?r.sibling:o=r.return)}}var f9=null;function pe(e){if((2&d5)==0&&1&e.mode){var t=e.tag;if(2===t||3===t||1===t||0===t||11===t||14===t||15===t){// We show the whole stack but dedupe on the top component's name because
// the problematic code almost always lies inside that component.
var n=tO(e)||"ReactComponent";if(null!==f9){if(f9.has(n))return;f9.add(n)}else f9=new Set([n]);var r=tP;try{tL(e),eN("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.")}finally{r?tL(e):tN()}}}}eS=function(e,t,n){// If a component throws an error, we replay it again in a synchronously
// dispatched event, so that the debugger will treat it as an uncaught
// error See ReactErrorUtils for more information.
// Before entering the begin phase, copy the work-in-progress onto a dummy
// fiber. If beginWork throws, we'll use this to reset the state.
var r=pS(null,t);try{return dc(e,t,n)}catch(i){if(sq||null!==i&&"object"==typeof i&&"function"==typeof i.then)// Don't replay errors if we are hydrating and have already suspended or handled an error
throw i;if(// Keep this code in sync with handleError; any changes here must have
// corresponding changes there.
uf(),lS(),// same fiber again.
// Unwind the failed stack frame
dg(e,t),pS(t,r),2&t.mode&&cR(t),// Run beginWork again.
rc(null,dc,null,e,t,n),ri){var o=rd();"object"==typeof o&&null!==o&&o._suppressLogging&&"object"==typeof i&&null!==i&&!i._suppressLogging&&(i._suppressLogging=!0)}// We always throw the original error in case the second render pass is not idempotent.
// This can happen if a memoized function or CommonJS module doesn't throw after first invocation.
throw i}};var pt=!1;function pn(e,t){rU&&e.memoizedUpdaters.forEach(function(n){oo(e,n,t)})}ex=new Set;var pr={};function po(e,t){// If we're currently inside an `act` scope, bypass Scheduler and push to
// the `act` queue instead.
var n=d6.current;return null!==n?(n.push(t),pr):rw(e,t)}function pi(e){if(e!==pr)// In production, always call Scheduler. This function will be stripped out.
return r_(e)}function pa(){// Never force flush in production. This function should get stripped out.
return null!==d6.current}/* eslint-disable react-internal/prod-error-codes */var ps=null,pu=null;// $FlowFixMe Flow gets confused by a WeakSet feature check below.
function pl(e){if(null===ps)return e;var t=ps(e);return void 0===t?e:t.current}function pc(e){if(null===ps)return e;var t=ps(e);if(void 0===t){// Check if we're dealing with a real forwardRef. Don't want to crash early.
if(null!=e&&"function"==typeof e.render){// ForwardRef is special because its resolved .type is an object,
// but it's possible that we only have its inner render function in the map.
// If that inner render function is different, we'll build a new forwardRef type.
var n=pl(e.render);if(e.render!==n){var r={$$typeof:tl,render:n};return void 0!==e.displayName&&(r.displayName=e.displayName),r}}return e}// Use the latest known implementation.
return t.current}function pd(e,t){if(null===ps)return!1;var n=e.elementType,r=t.type,o=!1,i="object"==typeof r&&null!==r?r.$$typeof:null;switch(e.tag){case 1:"function"==typeof r&&(o=!0);break;case 0:"function"==typeof r?o=!0:i===tp&&// We're going to assume that the lazy inner type is stable,
// and so it is sufficient to avoid reconciling it away.
// We're not going to unwrap or actually use the new lazy type.
(o=!0);break;case 11:i===tl?o=!0:i===tp&&(o=!0);break;case 14:case 15:i===tf?// we shouldn't set this.
o=!0:i===tp&&(o=!0);break;default:return!1}// Check if both types have a family and it's the same one.
if(o){// Note: memo() and forwardRef() we'll compare outer rather than inner type.
// This means both of them need to be registered to preserve state.
// If we unwrapped and compared the inner types for wrappers instead,
// then we would risk falsely saying two separate memo(Foo)
// calls are equivalent because they wrap the same Foo function.
var a=ps(n);if(void 0!==a&&a===ps(r))return!0}return!1}function pf(e){null!==ps&&"function"==typeof WeakSet&&(null===pu&&(pu=new WeakSet),pu.add(e))}eE=!1;try{Object.preventExtensions({});/* eslint-enable no-new */}catch(e){// TODO: Consider warning about bad polyfills
eE=!0}function pp(e,t,n,r){// Instance
this.tag=e,this.key=n,this.elementType=null,this.type=null,this.stateNode=null,this.return=null,this.child=null,this.sibling=null,this.index=0,this.ref=null,this.pendingProps=t,this.memoizedProps=null,this.updateQueue=null,this.memoizedState=null,this.dependencies=null,this.mode=r,this.flags=0,this.subtreeFlags=0,this.deletions=null,this.lanes=0,this.childLanes=0,this.alternate=null,// Note: The following is done to avoid a v8 performance cliff.
//
// Initializing the fields below to smis and later updating them with
// double values will cause Fibers to end up having separate shapes.
// This behavior/bug has something to do with Object.preventExtension().
// Fortunately this only impacts DEV builds.
// Unfortunately it makes React unusably slow for some applications.
// To work around this, initialize the fields below with doubles.
//
// Learn more about this here:
// https://github.com/facebook/react/issues/14365
// https://bugs.chromium.org/p/v8/issues/detail?id=8538
this.actualDuration=Number.NaN,this.actualStartTime=Number.NaN,this.selfBaseDuration=Number.NaN,this.treeBaseDuration=Number.NaN,// This won't trigger the performance cliff mentioned above,
// and it simplifies other profiler code (including DevTools).
this.actualDuration=0,this.actualStartTime=-1,this.selfBaseDuration=0,this.treeBaseDuration=0,// This isn't directly used but is handy for debugging internals:
this._debugSource=null,this._debugOwner=null,this._debugNeedsRemount=!1,this._debugHookTypes=null,eE||"function"!=typeof Object.preventExtensions||Object.preventExtensions(this)}// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
var ph=function(e,t,n,r){// $FlowFixMe: the shapes are exact here but Flow doesn't like constructors
return new pp(e,t,n,r)};function pm(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function pg(e,t){var n=e.alternate;null===n?(// We use a double buffering pooling technique because we know that we'll
// only ever need at most two versions of a tree. We pool the "other" unused
// node that we're free to reuse. This is lazily created to avoid allocating
// extra objects for things that are never updated. It also allow us to
// reclaim the extra memory if needed.
(n=ph(e.tag,t,e.key,e.mode)).elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,// DEV-only fields
n._debugSource=e._debugSource,n._debugOwner=e._debugOwner,n._debugHookTypes=e._debugHookTypes,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,// Reset the effect tag.
n.flags=0,n.subtreeFlags=0,n.deletions=null,// We intentionally reset, rather than copy, actualDuration & actualStartTime.
// This prevents time from endlessly accumulating in new commits.
// This has the downside of resetting values for different priority renders,
// But works for yielding (the common case) and should support resuming.
n.actualDuration=0,n.actualStartTime=-1),// Static effects are not specific to a render.
n.flags=14680064&e.flags,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue;// it cannot be shared with the current fiber.
var r=e.dependencies;switch(n.dependencies=null===r?null:{lanes:r.lanes,firstContext:r.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case 2:case 0:case 15:case 1:n.type=pl(e.type);break;case 11:n.type=pc(e.type)}return n}// Used to reuse a Fiber for a second pass.
function pv(e,t,n,r,o,i){var a,s,u,l,c=2,d=e;// The resolved type is set if we know what the final type will be. I.e. it's not lazy.
if("function"==typeof e)pm(e)&&(c=1),d=pl(d);else if("string"==typeof e)c=5;else o:switch(e){case to:return pb(n.children,o,i,t);case ti:c=8,(1&(o|=8))!=0&&(o|=16);break;case ta:return a=o,"string"!=typeof n.id&&eN('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof n.id),(s=ph(12,n,t,2|a)).elementType=ta,s.lanes=i,s.stateNode={effectDuration:0,passiveEffectDuration:0},s;case tc:return(u=ph(13,n,t,o)).elementType=tc,u.lanes=i,u;case td:return(l=ph(19,n,t,o)).elementType=td,l.lanes=i,l;case th:return pw(n,o,i,t);default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case ts:c=10;break o;case tu:// This is a consumer
c=9;break o;case tl:c=11,d=pc(d);break o;case tf:c=14;break o;case tp:c=16,d=null;break o}var f="";(void 0===e||"object"==typeof e&&null!==e&&0===Object.keys(e).length)&&(f+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var p=r?tO(r):null;throw p&&(f+="\n\nCheck the render method of `"+p+"`."),Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: "+(null==e?e:typeof e)+"."+f)}var h=ph(c,n,t,o);return h.elementType=e,h.type=d,h.lanes=i,h._debugOwner=r,h}function py(e,t,n){var r=null;r=e._owner;var o=pv(e.type,e.key,e.props,r,t,n);return o._debugSource=e._source,o._debugOwner=e._owner,o}function pb(e,t,n,r){var o=ph(7,e,r,t);return o.lanes=n,o}function pw(e,t,n,r){var o=ph(22,e,r,t);return o.elementType=th,o.lanes=n,o.stateNode={isHidden:!1},o}function p_(e,t,n){var r=ph(6,e,null,t);return r.lanes=n,r}function pk(e,t,n){var r=ph(4,null!==e.children?e.children:[],e.key,t);return r.lanes=n,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,// Used by persistent updates
implementation:e.implementation},r}// Used for stashing WIP properties to replay failed work in DEV.
function pS(e,t){return null===e&&// We only use a Fiber to ensure the same hidden class so DEV isn't slow.
(e=ph(2,null,null,0)),// This is intentionally written as a list of all properties.
// We tried to use Object.assign() instead but this is called in
// the hottest path, and Object.assign() was too slow:
// https://github.com/facebook/react/issues/12502
// This code is DEV-only so size is not a concern.
e.tag=t.tag,e.key=t.key,e.elementType=t.elementType,e.type=t.type,e.stateNode=t.stateNode,e.return=t.return,e.child=t.child,e.sibling=t.sibling,e.index=t.index,e.ref=t.ref,e.pendingProps=t.pendingProps,e.memoizedProps=t.memoizedProps,e.updateQueue=t.updateQueue,e.memoizedState=t.memoizedState,e.dependencies=t.dependencies,e.mode=t.mode,e.flags=t.flags,e.subtreeFlags=t.subtreeFlags,e.deletions=t.deletions,e.lanes=t.lanes,e.childLanes=t.childLanes,e.alternate=t.alternate,e.actualDuration=t.actualDuration,e.actualStartTime=t.actualStartTime,e.selfBaseDuration=t.selfBaseDuration,e.treeBaseDuration=t.treeBaseDuration,e._debugSource=t._debugSource,e._debugOwner=t._debugOwner,e._debugNeedsRemount=t._debugNeedsRemount,e._debugHookTypes=t._debugHookTypes,e}function px(e,t,n,r,o){this.tag=t,this.containerInfo=e,this.pendingChildren=null,this.current=null,this.pingCache=null,this.finishedWork=null,this.timeoutHandle=-1,this.context=null,this.pendingContext=null,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=oe(0),this.expirationTimes=oe(-1),this.pendingLanes=0,this.suspendedLanes=0,this.pingedLanes=0,this.expiredLanes=0,this.mutableReadLanes=0,this.finishedLanes=0,this.entangledLanes=0,this.entanglements=oe(0),this.identifierPrefix=r,this.onRecoverableError=o,this.mutableSourceEagerHydrationData=null,this.effectDuration=0,this.passiveEffectDuration=0,this.memoizedUpdaters=new Set;for(var i=this.pendingUpdatersLaneMap=[],a=0;a<rJ;a++)i.push(new Set);switch(t){case 1:this._debugRootType=n?"hydrateRoot()":"createRoot()";break;case 0:this._debugRootType=n?"hydrate()":"render()"}}function pE(e,t,n,r,o,i,a,// them through the root constructor. Perhaps we should put them all into a
// single type, like a DynamicHostConfig that is defined by the renderer.
s,u,l){var c,d=new px(e,t,n,s,u),f=(1===t?(c=1,!0===i&&(c|=8,c|=16)):c=0,rU&&// This enables DevTools to start capturing timing at any point–
// Without some nodes in the tree having empty base times.
(c|=2),ph(3,null,null,c));return d.current=f,f.stateNode=d,f.memoizedState={element:r,isDehydrated:n,cache:null,// not enabled yet
transitions:null,pendingSuspenseBoundaries:null},uS(f),d}var pC="18.2.0";function pT(e){if(!e)return sr;var t=rf(e),n=function(e){// Currently this is only used with renderSubtreeIntoContainer; not sure if it
// makes sense elsewhere
if(rh(e)!==e||1!==e.tag)throw Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");var t=e;do{switch(t.tag){case 3:return t.stateNode.context;case 1:if(sd(t.type))return t.stateNode.__reactInternalMemoizedMergedChildContext}t=t.return}while(null!==t)throw Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.")}(t);if(1===t.tag){var r=t.type;if(sd(r))return sm(t,r,n)}return n}function pO(e,t,n,r,o,i,a,s,u,l){var c=pE(n,r,!0,e,o,i,a,s,u);// TODO: Move this to FiberRoot constructor
c.context=pT(null);// a regular update because the initial render must match was was rendered
// on the server.
// NOTE: This update intentionally doesn't have a payload. We're only using
// the update to schedule work on the root fiber (and, for legacy roots, to
// enqueue the callback if one is provided).
var d=c.current,f=fI(),p=fD(d),h=uE(f,p);return h.callback=null!=t?t:null,uC(d,h,p),c.current.lanes=p,ot(c,p,f),fN(c,f),c}function pR(e,t,n,r){!function(e,t){if(rN&&"function"==typeof rN.onScheduleFiberRoot)try{rN.onScheduleFiberRoot(rM,e,t)}catch(e){rA||(rA=!0,eN("React instrumentation encountered an error: %s",e))}}(t,e);var o=t.current,i=fI(),a=fD(o);null!==rL&&"function"==typeof rL.markRenderScheduled&&rL.markRenderScheduled(a);var s=pT(n);null===t.context?t.context=s:t.pendingContext=s,tI&&null!==tP&&!eC&&(eC=!0,eN("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.",tO(tP)||"Unknown"));var u=uE(i,a);// Caution: React DevTools currently depends on this property
// being called "element".
u.payload={element:e},null!==(r=void 0===r?null:r)&&("function"!=typeof r&&eN("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",r),u.callback=r);var l=uC(o,u,a);return null!==l&&(fM(l,o,a,i),uT(l,o,a)),a}function pP(e){var t=e.current;return t.child?(t.child.tag,t.child.stateNode):null}function pI(e,t){var n,r=e.memoizedState;null!==r&&null!==r.dehydrated&&(r.retryLane=0!==(n=r.retryLane)&&n<t?n:t)}// Increases the priority of thenables when they resolve within this boundary.
function pD(e,t){pI(e,t);var n=e.alternate;n&&pI(n,t)}function pM(e){var t,n=null!==(t=ry(e))?function e(t){// Next we'll drill down this component to find the first HostComponent/Text.
if(5===t.tag||6===t.tag)return t;for(var n=t.child;null!==n;){if(4!==n.tag){var r=e(n);if(null!==r)return r}n=n.sibling}return null}(t):null;return null===n?null:n.stateNode}eC=!1,eT={};var pN=function(e){return null},pL=function(e){return!1},pA=null,pU=null,pj=null,pF=null,pz=null,pq=null,pB=null,pV=null,p$=null,pW=function(e,t,n){var r=t[n],o=t6(e)?e.slice():tv({},e);return n+1===t.length?t6(o)?o.splice(r,1):delete o[r]:o[r]=pW(e[r],t,n+1),o},pH=function(e,t){return pW(e,t,0)},pY=function(e,t,n,r){var o=t[r],i=t6(e)?e.slice():tv({},e);return r+1===t.length?(i[n[r]]=i[o],t6(i))?i.splice(o,1):delete i[o]:i[o]=pY(e[o],t,n,r+1),i},pQ=function(e,t,n){if(t.length!==n.length){eM("copyWithRename() expects paths of the same length");return}for(var r=0;r<n.length-1;r++)if(t[r]!==n[r]){eM("copyWithRename() expects paths to be the same except for the deepest key");return}return pY(e,t,n,0)},pK=function(e,t,n,r){if(n>=t.length)return r;var o=t[n],i=t6(e)?e.slice():tv({},e);return i[o]=pK(e[o],t,n+1,r),i},pG=function(e,t,n){return pK(e,t,0,n)},pX=function(e,t){for(// For now, the "id" of stateful hooks is just the stateful hook index.
// This may change in the future with e.g. nested hooks.
var n=e.memoizedState;null!==n&&t>0;)n=n.next,t--;return n};pA=function(e,t,n,r){var o=pX(e,t);if(null!==o){var i=pG(o.memoizedState,n,r);o.memoizedState=i,o.baseState=i,// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
e.memoizedProps=tv({},e.memoizedProps);var a=u_(e,1);null!==a&&fM(a,e,1,-1)}},pU=function(e,t,n){var r=pX(e,t);if(null!==r){var o=pH(r.memoizedState,n);r.memoizedState=o,r.baseState=o,// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
e.memoizedProps=tv({},e.memoizedProps);var i=u_(e,1);null!==i&&fM(i,e,1,-1)}},pj=function(e,t,n,r){var o=pX(e,t);if(null!==o){var i=pQ(o.memoizedState,n,r);o.memoizedState=i,o.baseState=i,// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
e.memoizedProps=tv({},e.memoizedProps);var a=u_(e,1);null!==a&&fM(a,e,1,-1)}},pF=function(e,t,n){e.pendingProps=pG(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=u_(e,1);null!==r&&fM(r,e,1,-1)},pz=function(e,t){e.pendingProps=pH(e.memoizedProps,t),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var n=u_(e,1);null!==n&&fM(n,e,1,-1)},pq=function(e,t,n){e.pendingProps=pQ(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=u_(e,1);null!==r&&fM(r,e,1,-1)},pB=function(e){var t=u_(e,1);null!==t&&fM(t,e,1,-1)},pV=function(e){pN=e},p$=function(e){pL=e};/* global reportError */var pJ="function"==typeof reportError?reportError:function(e){// In older browsers and test environments, fallback to console.error.
// eslint-disable-next-line react-internal/no-production-logging
console.error(e)};function pZ(e){this._internalRoot=e}function p0(e){this._internalRoot=e}function p1(e){return!!(e&&(1===e.nodeType||9===e.nodeType||11===e.nodeType))}// TODO: Remove this function which also includes comment nodes.
// We only use it in places that are currently more relaxed.
function p2(e){return!!(e&&(1===e.nodeType||9===e.nodeType||11===e.nodeType||8===e.nodeType&&" react-mount-point-unstable "===e.nodeValue))}function p3(e){1===e.nodeType&&e.tagName&&"BODY"===e.tagName.toUpperCase()&&eN("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."),e[aG]&&(e._reactRootContainer?eN("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."):eN("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."))}p0.prototype.render=pZ.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error("Cannot update an unmounted root.");"function"==typeof arguments[1]?eN("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."):p1(arguments[1])?eN("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."):void 0!==arguments[1]&&eN("You passed a second argument to root.render(...) but it only accepts one argument.");var n=t.containerInfo;if(8!==n.nodeType){var r=pM(t.current);r&&r.parentNode!==n&&eN("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.")}pR(e,t,null,null)},p0.prototype.unmount=pZ.prototype.unmount=function(){"function"==typeof arguments[0]&&eN("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;(6&d5)!=0&&eN("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."),fq(function(){pR(null,e,null,null)}),t[aG]=null}},p0.prototype.unstable_scheduleHydration=function(e){e&&function(e){for(// TODO: This will read the priority if it's dispatched by the React
// event system but not native events. Should read window.event.type, like
// we do for updates (getCurrentEventPriority).
var t,n=P(),r={blockedOn:null,target:e,priority:n},o=0;// Stop once we hit the first target with lower priority than
o<og.length&&(t=og[o].priority,0!==n&&n<t);o++);og.splice(o,0,r),0===o&&ow(r)}(e)};var p4=eI.ReactCurrentOwner;function p6(e){return e?9===e.nodeType?e.documentElement:e.firstChild:null}function p5(){// legacy API.
}function p8(e,t,n,r,o){eO(n),null!==(i=void 0===o?null:o)&&"function"!=typeof i&&eN("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.","render",i);var i,a,s=n._reactRootContainer;if(s){if(a=s,"function"==typeof o){var u=o;o=function(){var e=pP(a);u.call(e)}}// Update
pR(t,a,e,o)}else a=function(e,t,n,r,o){if(o){if("function"==typeof r){var i,a,s=r;r=function(){var e=pP(u);s.call(e)}}var u=pO(t,r,e,0,null,!1,!1,"",p5);return e._reactRootContainer=u,a=u.current,e[aG]=a,i6(8===e.nodeType?e.parentNode:e),fq(),u}for(;l=e.lastChild;)e.removeChild(l);if("function"==typeof r){var l,c=r;r=function(){var e=pP(d);c.call(e)}}var d=pE(e,0,!1,null,null,!1,!1,"",p5);return e._reactRootContainer=d,i=d.current,e[aG]=i,i6(8===e.nodeType?e.parentNode:e),fq(function(){pR(t,d,n,r)}),d}(n,t,e,o,r);return pP(a)}eO=function(e){if(e._reactRootContainer&&8!==e.nodeType){var t=pM(e._reactRootContainer.current);t&&t.parentNode!==e&&eN("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.")}var n=!!e._reactRootContainer,r=p6(e);r&&a1(r)&&!n&&eN("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."),1===e.nodeType&&e.tagName&&"BODY"===e.tagName.toUpperCase()&&eN("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.")},T=function(e){switch(e.tag){case 3:var t=e.stateNode;if(ou(t)){// Flush the first scheduled "update".
var n=r1(t.pendingLanes);0!==n&&(or(t,1|n),fN(t,rx()),(6&d5)==0&&(fp(),sk()))}break;case 13:fq(function(){var t=u_(e,1);null!==t&&fM(t,e,1,fI())}),pD(e,1)}},O=function(e){if(13===e.tag){var t=u_(e,134217728);null!==t&&fM(t,e,134217728,fI()),pD(e,134217728)}},R=function(e){if(13===e.tag){var t=fD(e),n=u_(e,t);null!==n&&fM(n,e,t,fI()),pD(e,t)}},P=function(){return oa},D=function(e,t){var n=oa;try{return oa=e,t()}finally{oa=n}},("function"!=typeof Map||// $FlowIssue Flow incorrectly thinks Map has no prototype
null==Map.prototype||"function"!=typeof Map.prototype.forEach||"function"!=typeof Set||// $FlowIssue Flow incorrectly thinks Set has no prototype
null==Set.prototype||"function"!=typeof Set.prototype.clear||"function"!=typeof Set.prototype.forEach)&&eN("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),nJ=function(e,t,n){var r;switch(t){case"input":tJ(e,n),function(e,t){var n=t.name;if("radio"===t.type&&null!=n){for(var r=e;r.parentNode;)r=r.parentNode;// If `rootNode.form` was non-null, then we could try `form.elements`,
eW(n,"name");for(var o=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),i=0;i<o.length;i++){var a=o[i];if(a!==e&&a.form===e.form){// This will throw if radio buttons rendered by different copies of React
// and the same name are rendered into the same form (same as #1939).
// That's probably okay; we don't support it just as we don't support
// mixing React radio buttons with non-React ones.
var s=a3(a);if(!s)throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");// We need update the tracked value on the named cousin since the value
// was changed but the input saw no event or value set
tB(a),// was previously checked to update will cause it to be come re-checked
// as appropriate.
tJ(a,s)}}}}// In Chrome, assigning defaultValue to certain input types triggers input validation.
(e,n);return;case"textarea":// DOM component is still mounted; update
no(e,n);return;case"select":null!=(r=n.value)&&t7(e,!!n.multiple,r,!1);return}},n4=fz,n6=fq;var p7={usingClientEntryPoint:!1,// Keep in sync with ReactTestUtils.js.
// This is an array for better minification.
Events:[a1,a2,a3,n2,n3,fz]};if(n=(t={findFiberByHostInstance:a0,bundleType:1,version:pC,rendererPackageName:"react-dom"}).findFiberByHostInstance,m=eI.ReactCurrentDispatcher,!function(e){if("undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)// of DevTools integration and associated warnings and logs.
// https://github.com/facebook/react/issues/3877
return!0;if(!t.supportsFiber)return eN("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"),!0;try{// This gives DevTools a way to feature detect that isn't tied to version number
// (since profiling and timeline are controlled by different feature flags).
e=tv({},e,{getLaneLabelMap:rz,injectProfilingHooks:rF}),rM=t.inject(e),rN=t}catch(e){eN("React instrumentation encountered an error: %s.",e)}return!!t.checkDCE}({bundleType:t.bundleType,version:t.version,rendererPackageName:t.rendererPackageName,rendererConfig:t.rendererConfig,overrideHookState:pA,overrideHookStateDeletePath:pU,overrideHookStateRenamePath:pj,overrideProps:pF,overridePropsDeletePath:pz,overridePropsRenamePath:pq,setErrorHandler:pV,setSuspenseHandler:p$,scheduleUpdate:pB,currentDispatcherRef:m,findHostInstanceByFiber:function(e){var t=rb(e);return null===t?null:t.stateNode},findFiberByHostInstance:n||function(e){return null},// React Refresh
findHostInstancesForRefresh:function(e,t){var n=new Set,r=new Set(t.map(function(e){return e.current}));return function e(t,n,r){var o=t.child,i=t.sibling,a=t.tag,s=t.type,u=null;switch(a){case 0:case 15:case 1:u=s;break;case 11:u=s.render}var l=!1;null!==u&&n.has(u)&&(l=!0),l?// There's no need to search deeper because for the purpose of giving
// visual feedback, "flashing" outermost parent rectangles is sufficient.
function(e,t){if(!function(e,t){for(var n=e,r=!1;;){if(5===n.tag)// We got a match.
r=!0,t.add(n.stateNode);else if(null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)return r;for(;null===n.sibling;){if(null===n.return||n.return===e)return r;n=n.return}n.sibling.return=n.return,n=n.sibling}return!1}(e,t))for(// If we didn't find any host children, fallback to closest host parent.
var n=e;;){switch(n.tag){case 5:t.add(n.stateNode);return;case 4:case 3:t.add(n.stateNode.containerInfo);return}if(null===n.return)throw Error("Expected to reach root first.");n=n.return}}(t,r):null!==o&&e(o,n,r),null!==i&&e(i,n,r)}(e.current,r,n),n},scheduleRefresh:function(e,t){if(null!==ps){var n=t.staleFamilies,r=t.updatedFamilies;fJ(),fq(function(){(function e(t,n,r){var o=t.alternate,i=t.child,a=t.sibling,s=t.tag,u=t.type,l=null;switch(s){case 0:case 15:case 1:l=u;break;case 11:l=u.render}if(null===ps)throw Error("Expected resolveFamily to be set during hot reload.");var c=!1,d=!1;if(null!==l){var f=ps(l);void 0!==f&&(r.has(f)?d=!0:n.has(f)&&(1===s?d=!0:c=!0))}if(null!==pu&&(pu.has(t)||null!==o&&pu.has(o))&&(d=!0),d&&(t._debugNeedsRemount=!0),d||c){var p=u_(t,1);null!==p&&fM(p,t,1,-1)}null===i||d||e(i,n,r),null!==a&&e(a,n,r)})(e.current,r,n)})}},scheduleRoot:function(e,t){e.context===sr&&(fJ(),fq(function(){pR(t,e,null,null)}))},setRefreshHandler:function(e){ps=e},// Enables DevTools to append owner stacks to error messages in DEV mode.
getCurrentFiber:function(){return tP},// Enables DevTools to detect reconciler version rather than renderer version
// which may not match for third party renderers.
reconcilerVersion:pC})&&eq&&window.top===window.self&&(navigator.userAgent.indexOf("Chrome")>-1&&-1===navigator.userAgent.indexOf("Edge")||navigator.userAgent.indexOf("Firefox")>-1)){var p9=window.location.protocol;// Don't warn in exotic cases like chrome-extension://.
/^(https?|file):$/.test(p9)&&console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools"+("file:"===p9?"\nYou might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq":""),"font-weight:bold")}r=p7,o=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(!p1(t))throw Error("Target container is not a DOM element.");// TODO: pass ReactDOM portal implementation as third argument
// $FlowFixMe The Flow type is opaque but there's no way to actually create it.
return function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return e$(r)&&eN("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",eV(r)),{// This tag allow us to uniquely identify this as a React Portal
$$typeof:tr,key:null==r?null:""+r,children:e,containerInfo:t,implementation:null}}(e,t,null,n)},i=function(e,t){return p7.usingClientEntryPoint||eN('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),function(e,t){if(!p1(e))throw Error("createRoot(...): Target container is not a DOM element.");p3(e);var n,r=!1,o="",i=pJ;null!=t&&(t.hydrate?eM("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."):"object"==typeof t&&null!==t&&t.$$typeof===tn&&eN("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"),!0===t.unstable_strictMode&&(r=!0),void 0!==t.identifierPrefix&&(o=t.identifierPrefix),void 0!==t.onRecoverableError&&(i=t.onRecoverableError),void 0!==t.transitionCallbacks&&t.transitionCallbacks);var a=pE(e,1,!1,null,null,r,!1,o,i);return n=a.current,e[aG]=n,i6(8===e.nodeType?e.parentNode:e),new pZ(a)}(e,t)},a=function(e){var t=p4.current;return(null!==t&&null!==t.stateNode&&(t.stateNode._warnedAboutRefsInRender||eN("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",tC(t.type)||"A component"),t.stateNode._warnedAboutRefsInRender=!0),null==e)?null:1===e.nodeType?e:function(e,t){var n=rf(e);if(void 0===n){if("function"==typeof e.render)throw Error("Unable to find node on an unmounted component.");throw Error("Argument appears to not be a ReactComponent. Keys: "+Object.keys(e).join(","))}var r=rb(n);if(null===r)return null;if(8&r.mode){var o=tO(n)||"Component";if(!eT[o]){eT[o]=!0;var i=tP;try{tL(r),8&n.mode?eN("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,o):eN("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,o)}finally{// Ideally this should reset to previous but this shouldn't be called in
// render and there's another warning for that anyway.
i?tL(i):tN()}}}return r.stateNode}(e,"findDOMNode")},s=// Warning, this opts-out of checking the function body.
// eslint-disable-next-line no-redeclare
function(e){return(6&d5)!=0&&eN("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."),fq(e)},u=function(e,t,n){if(eN("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!p2(t))throw Error("Target container is not a DOM element.");return t[aG]&&void 0===t._reactRootContainer&&eN("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?"),p8(null,e,t,!0,n)},l=function(e,t,n){return p7.usingClientEntryPoint||eN('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),function(e,t,n){if(!p1(e))throw Error("hydrateRoot(...): Target container is not a DOM element.");p3(e),void 0===t&&eN("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");// the hydration callbacks.
var r,o=null!=n?n:null,i=null!=n&&n.hydratedSources||null,a=!1,s="",u=pJ;// TODO: Delete this option
null!=n&&(!0===n.unstable_strictMode&&(a=!0),void 0!==n.identifierPrefix&&(s=n.identifierPrefix),void 0!==n.onRecoverableError&&(u=n.onRecoverableError));var l=pO(t,null,e,1,o,a,!1,s,u);if(r=l.current,e[aG]=r,i6(e),i)for(var c=0;c<i.length;c++)!// This ensures that the version used for server rendering matches the one
// that is eventually read during hydration.
// If they don't match there's a potential tear and a full deopt render is required.
function(e,t){var n=(0,t._getVersion)(t._source);// TODO Clear this data once all pending hydration work is finished.
// Retaining it forever may interfere with GC.
null==e.mutableSourceEagerHydrationData?e.mutableSourceEagerHydrationData=[t,n]:e.mutableSourceEagerHydrationData.push(t,n)}(l,i[c]);return new p0(l)}(e,t,n)}// Overload the definition to the two valid signatures.
,c=function(e,t,n){if(eN("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!p2(t))throw Error("Target container is not a DOM element.");return t[aG]&&void 0===t._reactRootContainer&&eN("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?"),p8(null,e,t,!1,n)},d=function(e){if(!p2(e))throw Error("unmountComponentAtNode(...): Target container is not a DOM element.");if(e[aG]&&void 0===e._reactRootContainer&&eN("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?"),e._reactRootContainer){var t=p6(e);// get `true` twice. That's probably fine?
return t&&!a1(t)&&eN("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React."),fq(function(){p8(null,null,e,!1,function(){// $FlowFixMe This should probably use `delete container._reactRootContainer`
e._reactRootContainer=null,e[aG]=null})}),!0}var n=p6(e),r=!!(n&&a1(n)),o=1===e.nodeType&&p2(e.parentNode)&&!!e.parentNode._reactRootContainer;return r&&eN("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s",o?"You may have accidentally passed in a React root node instead of its container.":"Instead, have the parent component update its state and rerender in order to remove this component."),!1},f=fz,p=function(e,t,n,r){return function(e,t,n,r){if(eN("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!p2(n))throw Error("Target container is not a DOM element.");if(null==e||!(void 0!==e._reactInternals))throw Error("parentComponent must be a valid React Component");return p8(e,t,n,!1,r)}(e,t,n,r)},h=pC,"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}),I.register("ibqfJ",function(e,t){e.exports=I("947eH")}),I.register("947eH",function(e,t){var r,o,i,a,s,u,l,c,d,f,p,h,m,g,v,y,b,w,_;n(e.exports,"unstable_now",function(){return r},function(e){return r=e}),n(e.exports,"unstable_IdlePriority",function(){return o},function(e){return o=e}),n(e.exports,"unstable_ImmediatePriority",function(){return i},function(e){return i=e}),n(e.exports,"unstable_LowPriority",function(){return a},function(e){return a=e}),n(e.exports,"unstable_NormalPriority",function(){return s},function(e){return s=e}),n(e.exports,"unstable_Profiling",function(){return u},function(e){return u=e}),n(e.exports,"unstable_UserBlockingPriority",function(){return l},function(e){return l=e}),n(e.exports,"unstable_cancelCallback",function(){return c},function(e){return c=e}),n(e.exports,"unstable_continueExecution",function(){return d},function(e){return d=e}),n(e.exports,"unstable_forceFrameRate",function(){return f},function(e){return f=e}),n(e.exports,"unstable_getCurrentPriorityLevel",function(){return p},function(e){return p=e}),n(e.exports,"unstable_getFirstCallbackNode",function(){return h},function(e){return h=e}),n(e.exports,"unstable_next",function(){return m},function(e){return m=e}),n(e.exports,"unstable_pauseExecution",function(){return g},function(e){return g=e}),n(e.exports,"unstable_requestPaint",function(){return v},function(e){return v=e}),n(e.exports,"unstable_runWithPriority",function(){return y},function(e){return y=e}),n(e.exports,"unstable_scheduleCallback",function(){return b},function(e){return b=e}),n(e.exports,"unstable_shouldYield",function(){return w},function(e){return w=e}),n(e.exports,"unstable_wrapCallback",function(){return _},function(e){return _=e}),function(){function e(e,t){var n=e.length;e.push(t),function(e,t,n){for(var r=n;r>0;){var o=r-1>>>1,i=e[o];if(!(k(i,t)>0))return;// The parent is larger. Swap positions.
e[o]=t,e[r]=i,r=o}}(e,t,n)}function t(e){return 0===e.length?null:e[0]}function n(e){if(0===e.length)return null;var t=e[0],n=e.pop();return n!==t&&(e[0]=n,function(e,t,n){for(var r=0,o=e.length,i=o>>>1;r<i;){var a=(r+1)*2-1,s=e[a],u=a+1,l=e[u];if(0>k(s,t))u<o&&0>k(l,s)?(e[r]=l,e[u]=t,r=u):(e[r]=s,e[a]=t,r=a);else{if(!(u<o&&0>k(l,t)))return;e[r]=l,e[u]=t,r=u}}}(e,n,0)),t}function k(e,t){// Compare sort index first, then task id.
var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()),"object"==typeof performance&&"function"==typeof performance.now){var S,x=performance;r=function(){return x.now()}}else{var E=Date,C=E.now();r=function(){return E.now()-C}}// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
var T=[],O=[],R=1,P=null,I=3,D=!1,M=!1,N=!1,L="function"==typeof setTimeout?setTimeout:null,A="function"==typeof clearTimeout?clearTimeout:null,U="undefined"!=typeof setImmediate?setImmediate:null;function j(r){for(// Check for tasks that are no longer delayed and add them to the queue.
var o=t(O);null!==o;){if(null===o.callback)n(O);else{if(!(o.startTime<=r))return;// Timer fired. Transfer to the task queue.
n(O),o.sortIndex=o.expirationTime,e(T,o)}o=t(O)}}function F(e){if(N=!1,j(e),!M){if(null!==t(T))M=!0,G(z);else{var n=t(O);null!==n&&X(F,n.startTime-e)}}}function z(e,o){M=!1,N&&(// We scheduled a timeout but it's no longer needed. Cancel it.
N=!1,A(V),V=-1),D=!0;var i=I;try{return function(e,o){var i=o;for(j(i),P=t(T);null!==P&&!(P.expirationTime>i&&(!e||H()));){var a=P.callback;if("function"==typeof a){P.callback=null,I=P.priorityLevel;var s=a(P.expirationTime<=i);i=r(),"function"==typeof s?P.callback=s:P===t(T)&&n(T),j(i)}else n(T);P=t(T)}// Return whether there's additional work
if(null!==P)return!0;var u=t(O);return null!==u&&X(F,u.startTime-i),!1}(e,o)}finally{P=null,I=i,D=!1}}"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var q=!1,B=null,V=-1,$=5,W=-1;function H(){return!(r()-W<$)}var Y=function(){if(null!==B){var e=r();// Keep track of the start time so we can measure how long the main thread
// has been blocked.
W=e;// error can be observed.
//
// Intentionally not using a try-catch, since that makes some debugging
// techniques harder. Instead, if `scheduledHostCallback` errors, then
// `hasMoreWork` will remain true, and we'll continue the work loop.
var t=!0;try{t=B(!0,e)}finally{t?// of the preceding one.
S():(q=!1,B=null)}}else q=!1;// Yielding to the browser will give it a chance to paint, so we can
};if("function"==typeof U)// There's a few reasons for why we prefer setImmediate.
//
// Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
// (Even though this is a DOM fork of the Scheduler, you could get here
// with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
// https://github.com/facebook/react/issues/20756
//
// But also, it runs earlier which is the semantic we want.
// If other browsers ever implement it, it's better to use it.
// Although both of these would be inferior to native scheduling.
S=function(){U(Y)};else if("undefined"!=typeof MessageChannel){// DOM and Worker environments.
// We prefer MessageChannel because of the 4ms setTimeout clamping.
var Q=new MessageChannel,K=Q.port2;Q.port1.onmessage=Y,S=function(){K.postMessage(null)}}else S=function(){L(Y,0)};function G(e){B=e,q||(q=!0,S())}function X(e,t){V=L(function(){e(r())},t)}o=5,i=1,a=4,s=3,u=null,l=2,c=function(e){// remove from the queue because you can't remove arbitrary nodes from an
// array based heap, only the first one.)
e.callback=null},d=function(){M||D||(M=!0,G(z))},f=function(e){if(e<0||e>125){// Using console['error'] to evade Babel and ESLint
console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");return}$=e>0?Math.floor(1e3/e):5},p=function(){return I},h=function(){return t(T)},m=function(e){switch(I){case 1:case 2:case 3:// Shift down to normal priority
t=3;break;default:// Anything lower than normal priority should remain at the current level.
t=I}var t,n=I;I=t;try{return e()}finally{I=n}},g=function(){},v=function(){},y=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=I;I=e;try{return t()}finally{I=n}},b=function(n,o,i){var a,s,u=r();if("object"==typeof i&&null!==i){var l=i.delay;a="number"==typeof l&&l>0?u+l:u}else a=u;switch(n){case 1:s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}var c=a+s,d={id:R++,callback:o,priorityLevel:n,startTime:a,expirationTime:c,sortIndex:-1};return a>u?(// This is a delayed task.
d.sortIndex=a,e(O,d),null===t(T)&&d===t(O)&&(N?(A(V),V=-1):N=!0,// Schedule a timeout.
X(F,a-u))):(d.sortIndex=c,e(T,d),M||D||(M=!0,G(z))),d},w=H,_=function(e){var t=I;return function(){// This is a fork of runWithPriority, inlined for performance.
var n=I;I=t;try{return e.apply(this,arguments)}finally{I=n}}},"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}),I.register("fCSDZ",function(e,t){/** Used to stand-in for `undefined` hash values. */var n,r,o,i="__lodash_hash_undefined__",a=1/0,s="[object Arguments]",u="[object Array]",l="[object Boolean]",c="[object Date]",d="[object Error]",f="[object Function]",p="[object Map]",h="[object Number]",m="[object Object]",g="[object Promise]",v="[object RegExp]",y="[object Set]",b="[object String]",w="[object Symbol]",_="[object WeakMap]",k="[object ArrayBuffer]",S="[object DataView]",x=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,E=/^\w*$/,C=/^\./,O=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,R=/\\(\\)?/g,P=/^\[object .+?Constructor\]$/,I=/^(?:0|[1-9]\d*)$/,D={};D["[object Float32Array]"]=D["[object Float64Array]"]=D["[object Int8Array]"]=D["[object Int16Array]"]=D["[object Int32Array]"]=D["[object Uint8Array]"]=D["[object Uint8ClampedArray]"]=D["[object Uint16Array]"]=D["[object Uint32Array]"]=!0,D[s]=D[u]=D[k]=D[l]=D[S]=D[c]=D[d]=D[f]=D[p]=D[h]=D[m]=D[v]=D[y]=D[b]=D[_]=!1;/** Detect free variable `global` from Node.js. */var M="object"==typeof T&&T&&T.Object===Object&&T,N="object"==typeof self&&self&&self.Object===Object&&self,L=M||N||Function("return this")(),A=t&&!t.nodeType&&t,U=A&&e&&!e.nodeType&&e,j=U&&U.exports===A&&M.process,F=function(){try{return j&&j.binding("util")}catch(e){}}(),z=F&&F.isTypedArray;/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */function q(e,t){return!!(e?e.length:0)&&/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function(e,t,n){if(t!=t)return(/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function(e,t,n,r){for(var o=e.length,i=n+(r?1:-1);r?i--:++i<o;)if(t(e[i],i,e))return i;return -1}(e,V,n));for(var r=n-1,o=e.length;++r<o;)if(e[r]===t)return r;return -1}(e,t,0)>-1}/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */function B(e,t,n){for(var r=-1,o=e?e.length:0;++r<o;)if(n(t,e[r]))return!0;return!1}/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */function V(e){return e!=e}/**
 * Checks if a cache value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function $(e,t){return e.has(t)}/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */function W(e){// Many host objects are `Object` objects that can coerce to strings
// despite having improperly defined `toString` methods.
var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */function H(e){var t=-1,n=Array(e.size);return e.forEach(function(e,r){n[++t]=[r,e]}),n}/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */function Y(e){var t=-1,n=Array(e.size);return e.forEach(function(e){n[++t]=e}),n}/** Used for built-in method references. */var Q=Array.prototype,K=Function.prototype,G=Object.prototype,X=L["__core-js_shared__"],J=(n=/[^.]+$/.exec(X&&X.keys&&X.keys.IE_PROTO||""))?"Symbol(src)_1."+n:"",Z=K.toString,ee=G.hasOwnProperty,et=G.toString,en=RegExp("^"+Z.call(ee).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),er=L.Symbol,eo=L.Uint8Array,ei=G.propertyIsEnumerable,ea=Q.splice,es=(r=Object.keys,o=Object,function(e){return r(o(e))}),eu=eN(L,"DataView"),el=eN(L,"Map"),ec=eN(L,"Promise"),ed=eN(L,"Set"),ef=eN(L,"WeakMap"),ep=eN(Object,"create"),eh=eq(eu),em=eq(el),eg=eq(ec),ev=eq(ed),ey=eq(ef),eb=er?er.prototype:void 0,ew=eb?eb.valueOf:void 0,e_=eb?eb.toString:void 0;/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function ek(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function eS(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function ex(e){var t=-1,n=e?e.length:0;for(this.clear();++t<n;){var r=e[t];this.set(r[0],r[1])}}/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */function eE(e){var t=-1,n=e?e.length:0;for(this.__data__=new ex;++t<n;)this.add(e[t])}/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */function eC(e){this.__data__=new eS(e)}/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */function eT(e,t){for(var n=e.length;n--;)if(eV(e[n][0],t))return n;return -1}/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */function eO(e,t){var n;t=eU(t,e)?[t]:eW(n=t)?n:eF(n);for(var r=0,o=t.length;null!=e&&r<o;)e=e[ez(t[r++])];return r&&r==o?e:void 0}/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */function eR(e,t){return null!=e&&t in Object(e)}/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */function eP(e,t,n,r,o){return e===t||(null!=e&&null!=t&&(eK(e)||eG(t))?/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function(e,t,n,r,o,i){var a=eW(e),f=eW(t),g=u,_=u;a||(g=(g=eL(e))==s?m:g),f||(_=(_=eL(t))==s?m:_);var x=g==m&&!W(e),E=_==m&&!W(t),C=g==_;if(C&&!x)return i||(i=new eC),a||eJ(e)?eD(e,t,n,r,o,i):/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function(e,t,n,r,o,i,a){switch(n){case S:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)break;e=e.buffer,t=t.buffer;case k:if(e.byteLength!=t.byteLength||!r(new eo(e),new eo(t)))break;return!0;case l:case c:case h:// Coerce booleans to `1` or `0` and dates to milliseconds.
// Invalid dates are coerced to `NaN`.
return eV(+e,+t);case d:return e.name==t.name&&e.message==t.message;case v:case b:// Coerce regexes to strings and treat strings, primitives and objects,
// as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
// for more details.
return e==t+"";case p:var s=H;case y:var u=2&i;if(s||(s=Y),e.size!=t.size&&!u)break;// Assume cyclic values are equal.
var f=a.get(e);if(f)return f==t;i|=1,// Recursively compare objects (susceptible to call stack limits).
a.set(e,t);var m=eD(s(e),s(t),r,o,i,a);return a.delete(e),m;case w:if(ew)return ew.call(e)==ew.call(t)}return!1}(e,t,g,n,r,o,i);if(!(2&o)){var T=x&&ee.call(e,"__wrapped__"),O=E&&ee.call(t,"__wrapped__");if(T||O){var R=T?e.value():e,P=O?t.value():t;return i||(i=new eC),n(R,P,r,o,i)}}return!!C&&(i||(i=new eC),/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */function(e,t,n,r,o,i){var a=2&o,s=eZ(e),u=s.length;if(u!=eZ(t).length&&!a)return!1;for(var l=u;l--;){var c=s[l];if(!(a?c in t:ee.call(t,c)))return!1}// Assume cyclic values are equal.
var d=i.get(e);if(d&&i.get(t))return d==t;var f=!0;i.set(e,t),i.set(t,e);for(var p=a;++l<u;){var h=e[c=s[l]],m=t[c];if(r)var g=a?r(m,h,c,t,e,i):r(h,m,c,e,t,i);// Recursively compare objects (susceptible to call stack limits).
if(!(void 0===g?h===m||n(h,m,r,o,i):g)){f=!1;break}p||(p="constructor"==c)}if(f&&!p){var v=e.constructor,y=t.constructor;// Non `Object` object instances with different constructors are not equal.
v!=y&&"constructor"in e&&"constructor"in t&&!("function"==typeof v&&v instanceof v&&"function"==typeof y&&y instanceof y)&&(f=!1)}return i.delete(e),i.delete(t),f}(e,t,n,r,o,i))}(e,t,eP,n,r,o):e!=e&&t!=t)}// Add methods to `Hash`.
ek.prototype.clear=/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */function(){this.__data__=ep?ep(null):{}},ek.prototype.delete=/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function(e){return this.has(e)&&delete this.__data__[e]},ek.prototype.get=/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function(e){var t=this.__data__;if(ep){var n=t[e];return n===i?void 0:n}return ee.call(t,e)?t[e]:void 0},ek.prototype.has=/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function(e){var t=this.__data__;return ep?void 0!==t[e]:ee.call(t,e)},ek.prototype.set=/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */function(e,t){return this.__data__[e]=ep&&void 0===t?i:t,this},// Add methods to `ListCache`.
eS.prototype.clear=/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */function(){this.__data__=[]},eS.prototype.delete=/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function(e){var t=this.__data__,n=eT(t,e);return!(n<0)&&(n==t.length-1?t.pop():ea.call(t,n,1),!0)},eS.prototype.get=/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function(e){var t=this.__data__,n=eT(t,e);return n<0?void 0:t[n][1]},eS.prototype.has=/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function(e){return eT(this.__data__,e)>-1},eS.prototype.set=/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */function(e,t){var n=this.__data__,r=eT(n,e);return r<0?n.push([e,t]):n[r][1]=t,this},// Add methods to `MapCache`.
ex.prototype.clear=/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */function(){this.__data__={hash:new ek,map:new(el||eS),string:new ek}},ex.prototype.delete=/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function(e){return eM(this,e).delete(e)},ex.prototype.get=/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function(e){return eM(this,e).get(e)},ex.prototype.has=/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function(e){return eM(this,e).has(e)},ex.prototype.set=/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */function(e,t){return eM(this,e).set(e,t),this},// Add methods to `SetCache`.
eE.prototype.add=eE.prototype.push=/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */function(e){return this.__data__.set(e,i),this},eE.prototype.has=/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */function(e){return this.__data__.has(e)},// Add methods to `Stack`.
eC.prototype.clear=/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */function(){this.__data__=new eS},eC.prototype.delete=/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */function(e){return this.__data__.delete(e)},eC.prototype.get=/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */function(e){return this.__data__.get(e)},eC.prototype.has=/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */function(e){return this.__data__.has(e)},eC.prototype.set=/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */function(e,t){var n=this.__data__;if(n instanceof eS){var r=n.__data__;if(!el||r.length<199)return r.push([e,t]),this;n=this.__data__=new ex(r)}return n.set(e,t),this};/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */var eI=ed&&1/Y(new ed([,-0]))[1]==a?function(e){return new ed(e)}:/**
 * This method returns `undefined`.
 *
 * @static
 * @memberOf _
 * @since 2.3.0
 * @category Util
 * @example
 *
 * _.times(2, _.noop);
 * // => [undefined, undefined]
 */function(){// No operation performed.
};/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */function eD(e,t,n,r,o,i){var a=2&o,s=e.length,u=t.length;if(s!=u&&!(a&&u>s))return!1;// Assume cyclic values are equal.
var l=i.get(e);if(l&&i.get(t))return l==t;var c=-1,d=!0,f=1&o?new eE:void 0;// Ignore non-index properties.
for(i.set(e,t),i.set(t,e);++c<s;){var p=e[c],h=t[c];if(r)var m=a?r(h,p,c,t,e,i):r(p,h,c,e,t,i);if(void 0!==m){if(m)continue;d=!1;break}// Recursively compare arrays (susceptible to call stack limits).
if(f){if(!/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */function(e,t){for(var n=-1,r=e?e.length:0;++n<r;)if(t(e[n],n,e))return!0;return!1}(t,function(e,t){if(!f.has(t)&&(p===e||n(p,e,r,o,i)))return f.add(t)})){d=!1;break}}else if(!(p===h||n(p,h,r,o,i))){d=!1;break}}return i.delete(e),i.delete(t),d}/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */function eM(e,t){var n,r=e.__data__;return("string"==(n=typeof t)||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==t:null===t)?r["string"==typeof t?"string":"hash"]:r.map}/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */function eN(e,t){var n=null==e?void 0:e[t];return!(!eK(n)||J&&J in n)&&(eY(n)||W(n)?en:P).test(eq(n))?n:void 0}/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */var eL=/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */function(e){return et.call(e)};/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */function eA(e,t){return!!(t=null==t?9007199254740991:t)&&("number"==typeof e||I.test(e))&&e>-1&&e%1==0&&e<t}/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */function eU(e,t){if(eW(e))return!1;var n=typeof e;return!!("number"==n||"symbol"==n||"boolean"==n||null==e||eX(e))||E.test(e)||!x.test(e)||null!=t&&e in Object(t)}/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */function ej(e,t){return function(n){return null!=n&&n[e]===t&&(void 0!==t||e in Object(n))}}(eu&&eL(new eu(new ArrayBuffer(1)))!=S||el&&eL(new el)!=p||ec&&eL(ec.resolve())!=g||ed&&eL(new ed)!=y||ef&&eL(new ef)!=_)&&(eL=function(e){var t=et.call(e),n=t==m?e.constructor:void 0,r=n?eq(n):void 0;if(r)switch(r){case eh:return S;case em:return p;case eg:return g;case ev:return y;case ey:return _}return t});/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */var eF=eB(function(e){e=null==(t=e)?"":/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */function(e){// Exit early for strings to avoid a performance hit in some environments.
if("string"==typeof e)return e;if(eX(e))return e_?e_.call(e):"";var t=e+"";return"0"==t&&1/e==-a?"-0":t}(t);var t,n=[];return C.test(e)&&n.push(""),e.replace(O,function(e,t,r,o){n.push(r?o.replace(R,"$1"):t||e)}),n});/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */function ez(e){if("string"==typeof e||eX(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */function eq(e){if(null!=e){try{return Z.call(e)}catch(e){}try{return e+""}catch(e){}}return""}/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */function eB(e,t){if("function"!=typeof e||t&&"function"!=typeof t)throw TypeError("Expected a function");var n=function(){var r=arguments,o=t?t.apply(this,r):r[0],i=n.cache;if(i.has(o))return i.get(o);var a=e.apply(this,r);return n.cache=i.set(o,a),a};return n.cache=new(eB.Cache||ex),n}/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */function eV(e,t){return e===t||e!=e&&t!=t}/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */function e$(e){// Safari 8.1 makes `arguments.callee` enumerable in strict mode.
return eG(e)&&eH(e)&&ee.call(e,"callee")&&(!ei.call(e,"callee")||et.call(e)==s)}// Assign cache to `_.memoize`.
eB.Cache=ex;/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */var eW=Array.isArray;/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */function eH(e){return null!=e&&eQ(e.length)&&!eY(e)}/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */function eY(e){// The use of `Object#toString` avoids issues with the `typeof` operator
// in Safari 8-9 which returns 'object' for typed array and other constructors.
var t=eK(e)?et.call(e):"";return t==f||"[object GeneratorFunction]"==t}/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */function eQ(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=9007199254740991}/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */function eK(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */function eG(e){return!!e&&"object"==typeof e}/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */function eX(e){return"symbol"==typeof e||eG(e)&&et.call(e)==w}/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */var eJ=z?function(e){return z(e)}:/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */function(e){return eG(e)&&eQ(e.length)&&!!D[et.call(e)]};/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */function eZ(e){return eH(e)?/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */function(e,t){// Safari 8.1 makes `arguments.callee` enumerable in strict mode.
// Safari 9 makes `arguments.length` enumerable in strict mode.
var n=eW(e)||e$(e)?/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */function(e,t){for(var n=-1,r=Array(e);++n<e;)r[n]=t(n);return r}(e.length,String):[],r=n.length,o=!!r;for(var i in e)ee.call(e,i)&&!(o&&("length"==i||eA(i,r)))&&n.push(i);return n}(e):/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */function(e){if(t=e&&e.constructor,e!==("function"==typeof t&&t.prototype||G))return es(e);var t,n=[];for(var r in Object(e))ee.call(e,r)&&"constructor"!=r&&n.push(r);return n}(e)}/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */function e0(e){return e}e.exports=/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The iteratee is invoked with one argument: (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity]
 *  The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */function(e,t){var n,r,o,i,a,s;return e&&e.length?/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */function(e,t,n){var r=-1,o=q,i=e.length,a=!0,s=[],u=s;if(n)a=!1,o=B;else if(i>=200){var l=t?null:eI(e);if(l)return Y(l);a=!1,o=$,u=new eE}else u=t?[]:s;r:for(;++r<i;){var c=e[r],d=t?t(c):c;if(c=n||0!==c?c:0,a&&d==d){for(var f=u.length;f--;)if(u[f]===d)continue r;t&&u.push(d),s.push(c)}else o(u,d,n)||(u!==s&&u.push(d),s.push(c))}return s}(e,// Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
// See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
"function"==typeof t?t:null==t?e0:"object"==typeof t?eW(t)?(n=t[0],r=t[1],eU(n)&&(o=r)==o&&!eK(o)?ej(ez(n),r):function(e){var t,o=void 0===(t=null==e?void 0:eO(e,n))?void 0:t;return void 0===o&&o===r?null!=e&&/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */function(e,t,n){t=eU(t,e)?[t]:eW(r=t)?r:eF(r);for(var r,o,i=-1,a=t.length;++i<a;){var s=ez(t[i]);if(!(o=null!=e&&n(e,s)))break;e=e[s]}if(o)return o;var a=e?e.length:0;return!!a&&eQ(a)&&eA(s,a)&&(eW(e)||e$(e))}(e,n,eR):eP(r,o,void 0,3)}):1==(i=/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */function(e){for(var t=eZ(e),n=t.length;n--;){var r=t[n],o=e[r];t[n]=[r,o,o==o&&!eK(o)]}return t}(t)).length&&i[0][2]?ej(i[0][0],i[0][1]):function(e){return e===t||/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */function(e,t,n,r){var o=n.length,i=o,a=!r;if(null==e)return!i;for(e=Object(e);o--;){var s=n[o];if(a&&s[2]?s[1]!==e[s[0]]:!(s[0]in e))return!1}for(;++o<i;){var u=(s=n[o])[0],l=e[u],c=s[1];if(a&&s[2]){if(void 0===l&&!(u in e))return!1}else{var d=new eC;if(r)var f=r(l,c,u,e,t,d);if(!(void 0===f?eP(c,l,r,3,d):f))return!1}}return!0}(e,t,i)}:eU(a=t)?(s=ez(a),function(e){return null==e?void 0:e[s]}):function(e){return eO(e,a)}):[]}}),I.register("cV6nb",function(e,t){!/* UAParser.js v1.0.36
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License */function(n,r){var o="function",i="undefined",a="object",s="string",u="major",l="model",c="name",d="type",f="vendor",p="version",h="architecture",m="console",g="mobile",v="tablet",y="smarttv",b="wearable",w="embedded",_="Amazon",k="Apple",S="ASUS",x="BlackBerry",E="Browser",C="Chrome",T="Firefox",O="Google",R="Huawei",P="Microsoft",I="Motorola",D="Opera",M="Samsung",N="Sharp",L="Sony",A="Xiaomi",U="Zebra",j="Facebook",F="Chromium OS",z="Mac OS",q=function(e,t){var n={};for(var r in e)t[r]&&t[r].length%2==0?n[r]=t[r].concat(e[r]):n[r]=e[r];return n},B=function(e){for(var t={},n=0;n<e.length;n++)t[e[n].toUpperCase()]=e[n];return t},V=function(e,t){return typeof e===s&&-1!==$(t).indexOf($(e))},$=function(e){return e.toLowerCase()},W=function(e,t){if(typeof e===s)return e=e.replace(/^\s\s*/,""),typeof t===i?e:e.substring(0,350)},H=function(e,t){for(var n,i,s,u,l,c,d=0;d<t.length&&!l;){var f=t[d],p=t[d+1];for(n=i=0;n<f.length&&!l&&f[n];)if(l=f[n++].exec(e))for(s=0;s<p.length;s++)c=l[++i],typeof(u=p[s])===a&&u.length>0?2===u.length?typeof u[1]==o?this[u[0]]=u[1].call(this,c):this[u[0]]=u[1]:3===u.length?typeof u[1]!==o||u[1].exec&&u[1].test?this[u[0]]=c?c.replace(u[1],u[2]):r:this[u[0]]=c?u[1].call(this,c,u[2]):r:4===u.length&&(this[u[0]]=c?u[3].call(this,c.replace(u[1],u[2])):r):this[u]=c||r;d+=2}},Y=function(e,t){for(var n in t)if(typeof t[n]===a&&t[n].length>0){for(var o=0;o<t[n].length;o++)if(V(t[n][o],e))return"?"===n?r:n}else if(V(t[n],e))return"?"===n?r:n;return e},Q={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},K={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[p,[c,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[p,[c,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[c,p],[/opios[\/ ]+([\w\.]+)/i],[p,[c,D+" Mini"]],[/\bopr\/([\w\.]+)/i],[p,[c,D]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[c,p],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[p,[c,"UC"+E]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[p,[c,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[p,[c,"WeChat"]],[/konqueror\/([\w\.]+)/i],[p,[c,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[p,[c,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[p,[c,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[c,/(.+)/,"$1 Secure "+E],p],[/\bfocus\/([\w\.]+)/i],[p,[c,T+" Focus"]],[/\bopt\/([\w\.]+)/i],[p,[c,D+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[p,[c,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[p,[c,"Dolphin"]],[/coast\/([\w\.]+)/i],[p,[c,D+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[p,[c,"MIUI "+E]],[/fxios\/([-\w\.]+)/i],[p,[c,T]],[/\bqihu|(qi?ho?o?|360)browser/i],[[c,"360 "+E]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[c,/(.+)/,"$1 "+E],p],[/(comodo_dragon)\/([\w\.]+)/i],[[c,/_/g," "],p],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[c,p],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[c],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[c,j],p],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[c,p],[/\bgsa\/([\w\.]+) .*safari\//i],[p,[c,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[p,[c,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[p,[c,C+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[c,C+" WebView"],p],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[p,[c,"Android "+E]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[c,p],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[p,[c,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[p,c],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[c,[p,Y,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[c,p],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[c,"Netscape"],p],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[p,[c,T+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[c,p],[/(cobalt)\/([\w\.]+)/i],[c,[p,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[h,"amd64"]],[/(ia32(?=;))/i],[[h,$]],[/((?:i[346]|x)86)[;\)]/i],[[h,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[h,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[h,"armhf"]],[/windows (ce|mobile); ppc;/i],[[h,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[h,/ower/,"",$]],[/(sun4\w)[;\)]/i],[[h,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[h,$]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[l,[f,M],[d,v]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[l,[f,M],[d,g]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[l,[f,k],[d,g]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[l,[f,k],[d,v]],[/(macintosh);/i],[l,[f,k]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[l,[f,N],[d,g]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[l,[f,R],[d,v]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[l,[f,R],[d,g]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[l,/_/g," "],[f,A],[d,g]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[l,/_/g," "],[f,A],[d,v]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[l,[f,"OPPO"],[d,g]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[l,[f,"Vivo"],[d,g]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[l,[f,"Realme"],[d,g]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[l,[f,I],[d,g]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[l,[f,I],[d,v]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[l,[f,"LG"],[d,v]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[l,[f,"LG"],[d,g]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[l,[f,"Lenovo"],[d,v]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[l,/_/g," "],[f,"Nokia"],[d,g]],[/(pixel c)\b/i],[l,[f,O],[d,v]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[l,[f,O],[d,g]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[l,[f,L],[d,g]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[l,"Xperia Tablet"],[f,L],[d,v]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[l,[f,"OnePlus"],[d,g]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[l,[f,_],[d,v]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[l,/(.+)/g,"Fire Phone $1"],[f,_],[d,g]],[/(playbook);[-\w\),; ]+(rim)/i],[l,f,[d,v]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[l,[f,x],[d,g]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[l,[f,S],[d,v]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[l,[f,S],[d,g]],[/(nexus 9)/i],[l,[f,"HTC"],[d,v]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[f,[l,/_/g," "],[d,g]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[l,[f,"Acer"],[d,v]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[l,[f,"Meizu"],[d,g]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[f,l,[d,g]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[f,l,[d,v]],[/(surface duo)/i],[l,[f,P],[d,v]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[l,[f,"Fairphone"],[d,g]],[/(u304aa)/i],[l,[f,"AT&T"],[d,g]],[/\bsie-(\w*)/i],[l,[f,"Siemens"],[d,g]],[/\b(rct\w+) b/i],[l,[f,"RCA"],[d,v]],[/\b(venue[\d ]{2,7}) b/i],[l,[f,"Dell"],[d,v]],[/\b(q(?:mv|ta)\w+) b/i],[l,[f,"Verizon"],[d,v]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[l,[f,"Barnes & Noble"],[d,v]],[/\b(tm\d{3}\w+) b/i],[l,[f,"NuVision"],[d,v]],[/\b(k88) b/i],[l,[f,"ZTE"],[d,v]],[/\b(nx\d{3}j) b/i],[l,[f,"ZTE"],[d,g]],[/\b(gen\d{3}) b.+49h/i],[l,[f,"Swiss"],[d,g]],[/\b(zur\d{3}) b/i],[l,[f,"Swiss"],[d,v]],[/\b((zeki)?tb.*\b) b/i],[l,[f,"Zeki"],[d,v]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[f,"Dragon Touch"],l,[d,v]],[/\b(ns-?\w{0,9}) b/i],[l,[f,"Insignia"],[d,v]],[/\b((nxa|next)-?\w{0,9}) b/i],[l,[f,"NextBook"],[d,v]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[f,"Voice"],l,[d,g]],[/\b(lvtel\-)?(v1[12]) b/i],[[f,"LvTel"],l,[d,g]],[/\b(ph-1) /i],[l,[f,"Essential"],[d,g]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[l,[f,"Envizen"],[d,v]],[/\b(trio[-\w\. ]+) b/i],[l,[f,"MachSpeed"],[d,v]],[/\btu_(1491) b/i],[l,[f,"Rotor"],[d,v]],[/(shield[\w ]+) b/i],[l,[f,"Nvidia"],[d,v]],[/(sprint) (\w+)/i],[f,l,[d,g]],[/(kin\.[onetw]{3})/i],[[l,/\./g," "],[f,P],[d,g]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[l,[f,U],[d,v]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[l,[f,U],[d,g]],[/smart-tv.+(samsung)/i],[f,[d,y]],[/hbbtv.+maple;(\d+)/i],[[l,/^/,"SmartTV"],[f,M],[d,y]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[f,"LG"],[d,y]],[/(apple) ?tv/i],[f,[l,k+" TV"],[d,y]],[/crkey/i],[[l,C+"cast"],[f,O],[d,y]],[/droid.+aft(\w+)( bui|\))/i],[l,[f,_],[d,y]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[l,[f,N],[d,y]],[/(bravia[\w ]+)( bui|\))/i],[l,[f,L],[d,y]],[/(mitv-\w{5}) bui/i],[l,[f,A],[d,y]],[/Hbbtv.*(technisat) (.*);/i],[f,l,[d,y]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[f,W],[l,W],[d,y]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[d,y]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[f,l,[d,m]],[/droid.+; (shield) bui/i],[l,[f,"Nvidia"],[d,m]],[/(playstation [345portablevi]+)/i],[l,[f,L],[d,m]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[l,[f,P],[d,m]],[/((pebble))app/i],[f,l,[d,b]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[l,[f,k],[d,b]],[/droid.+; (glass) \d/i],[l,[f,O],[d,b]],[/droid.+; (wt63?0{2,3})\)/i],[l,[f,U],[d,b]],[/(quest( 2| pro)?)/i],[l,[f,j],[d,b]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[f,[d,w]],[/(aeobc)\b/i],[l,[f,_],[d,w]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[l,[d,g]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[l,[d,v]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[d,v]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[d,g]],[/(android[-\w\. ]{0,9});.+buil/i],[l,[f,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[p,[c,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[p,[c,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[c,p],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[p,c]],os:[[/microsoft (windows) (vista|xp)/i],[c,p],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[c,[p,Y,Q]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[c,"Windows"],[p,Y,Q]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[p,/_/g,"."],[c,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[c,z],[p,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[p,c],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[c,p],[/\(bb(10);/i],[p,[c,x]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[p,[c,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[p,[c,T+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[p,[c,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[p,[c,"watchOS"]],[/crkey\/([\d\.]+)/i],[p,[c,C+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[c,F],p],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[c,p],[/(sunos) ?([\w\.\d]*)/i],[[c,"Solaris"],p],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[c,p]]},G=function(e,t){if(typeof e===a&&(t=e,e=r),!(this instanceof G))return new G(e,t).getResult();var m=typeof n!==i&&n.navigator?n.navigator:r,y=e||(m&&m.userAgent?m.userAgent:""),b=m&&m.userAgentData?m.userAgentData:r,w=t?q(K,t):K,_=m&&m.userAgent==y;return this.getBrowser=function(){var e,t={};return t[c]=r,t[p]=r,H.call(t,y,w.browser),t[u]=typeof(e=t[p])===s?e.replace(/[^\d\.]/g,"").split(".")[0]:r,_&&m&&m.brave&&typeof m.brave.isBrave==o&&(t[c]="Brave"),t},this.getCPU=function(){var e={};return e[h]=r,H.call(e,y,w.cpu),e},this.getDevice=function(){var e={};return e[f]=r,e[l]=r,e[d]=r,H.call(e,y,w.device),_&&!e[d]&&b&&b.mobile&&(e[d]=g),_&&"Macintosh"==e[l]&&m&&typeof m.standalone!==i&&m.maxTouchPoints&&m.maxTouchPoints>2&&(e[l]="iPad",e[d]=v),e},this.getEngine=function(){var e={};return e[c]=r,e[p]=r,H.call(e,y,w.engine),e},this.getOS=function(){var e={};return e[c]=r,e[p]=r,H.call(e,y,w.os),_&&!e[c]&&b&&"Unknown"!=b.platform&&(e[c]=b.platform.replace(/chrome os/i,F).replace(/macos/i,z)),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return y},this.setUA=function(e){return y=typeof e===s&&e.length>350?W(e,350):e,this},this.setUA(y),this};G.VERSION="1.0.36",G.BROWSER=B([c,p,u]),G.CPU=B([h]),G.DEVICE=B([l,f,d,m,g,y,v,b,w]),G.ENGINE=G.OS=B([c,p]),e.exports&&(t=e.exports=G),t.UAParser=G;var X=typeof n!==i&&(n.jQuery||n.Zepto);if(X&&!X.ua){var J=new G;X.ua=J.getResult(),X.ua.get=function(){return J.getUA()},X.ua.set=function(e){J.setUA(e);var t=J.getResult();for(var n in t)X.ua[n]=t[n]}}}("object"==typeof window?window:this)}),I.register("bd4iG",function(e,t){var r,o,i;n(e.exports,"Fragment",function(){return r},function(e){return r=e}),n(e.exports,"jsx",function(){return o},function(e){return o=e}),n(e.exports,"jsxs",function(){return i},function(e){return i=e}),function(){var e,t,n,a,s,u,l,c,d,f,p,h,m,g,v=I("exYeM"),y=Symbol.for("react.element"),b=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),k=Symbol.for("react.profiler"),S=Symbol.for("react.provider"),x=Symbol.for("react.context"),E=Symbol.for("react.forward_ref"),C=Symbol.for("react.suspense"),T=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),R=Symbol.for("react.lazy"),P=Symbol.for("react.offscreen"),D=Symbol.iterator,M=v.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function N(e){for(var t,n,r,o,i=arguments.length,a=Array(i>1?i-1:0),s=1;s<i;s++)a[s-1]=arguments[s];t=e,n=a,""!==(r=M.ReactDebugCurrentFrame.getStackAddendum())&&(t+="%s",n=n.concat([r])),(o=n.map(function(e){return String(e)})).unshift("Warning: "+t),// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console.error,console,o)}function L(e){return e.displayName||"Context"}// Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
function A(e){if(null==e)return null;if("number"==typeof e.tag&&N("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),"function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case w:return"Fragment";case b:return"Portal";case k:return"Profiler";case _:return"StrictMode";case C:return"Suspense";case T:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case x:return L(e)+".Consumer";case S:return L(e._context)+".Provider";case E:return function(e,t,n){var r=e.displayName;if(r)return r;var o=t.displayName||t.name||"";return""!==o?n+"("+o+")":n}// Keep in sync with react-reconciler/getComponentNameFromFiber
(e,e.render,"ForwardRef");case O:var t=e.displayName||null;if(null!==t)return t;return A(e.type)||"Memo";case R:var n=e._payload,r=e._init;try{return A(r(n))}catch(e){}}return null}e=Symbol.for("react.module.reference");var U=Object.assign,j=0;function F(){}F.__reactDisabledLog=!0;var z=M.ReactCurrentDispatcher;function q(e,t,n){if(void 0===d)try{throw Error()}catch(e){var r=e.stack.trim().match(/\n( *(at )?)/);d=r&&r[1]||""}// We use the prefix to ensure our stacks line up with native stack frames.
return"\n"+d+e}var B=!1;function V(e,r){// If something asked for a stack inside a fake render, it should get ignored.
if(!e||B)return"";var o,i,d=f.get(e);if(void 0!==d)return d;B=!0;var p=Error.prepareStackTrace;// $FlowFixMe It does accept undefined.
Error.prepareStackTrace=void 0,i=z.current,// for warnings.
z.current=null,function(){if(0===j){/* eslint-disable react-internal/no-production-logging */t=console.log,n=console.info,a=console.warn,s=console.error,u=console.group,l=console.groupCollapsed,c=console.groupEnd;var e={configurable:!0,enumerable:!0,value:F,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e});/* eslint-enable react-internal/no-production-logging */}j++}();try{// This should throw.
if(r){// Something should be setting the props in the constructor.
var h=function(){throw Error()};// $FlowFixMe
if(Object.defineProperty(h.prototype,"props",{set:function(){// We use a throwing setter instead of frozen or non-writable props
// because that won't throw in a non-strict mode function.
throw Error()}}),"object"==typeof Reflect&&Reflect.construct){// We construct a different control for this case to include any extra
// frames added by the construct call.
try{Reflect.construct(h,[])}catch(e){o=e}Reflect.construct(e,[],h)}else{try{h.call()}catch(e){o=e}e.call(h.prototype)}}else{try{throw Error()}catch(e){o=e}e()}}catch(t){// This is inlined manually because closure doesn't do it for us.
if(t&&o&&"string"==typeof t.stack){for(// This extracts the first frame from the sample that isn't also in the control.
// Skipping one frame that we assume is the frame that calls the two.
var m=t.stack.split("\n"),g=o.stack.split("\n"),v=m.length-1,y=g.length-1;v>=1&&y>=0&&m[v]!==g[y];)// Typically this will be the root most one. However, stack frames may be
// cut off due to maximum stack limits. In this case, one maybe cut off
// earlier than the other. We assume that the sample is longer or the same
// and there for cut off earlier. So we should find the root most frame in
// the sample somewhere in the control.
y--;for(;v>=1&&y>=0;v--,y--)// frame that called our sample function and the control.
if(m[v]!==g[y]){// In V8, the first line is describing the message but other VMs don't.
// If we're about to return the first line, and the control is also on the same
// line, that's a pretty good indicator that our sample threw at same line as
// the control. I.e. before we entered the sample frame. So we ignore this result.
// This can happen if you passed a class to function component, or non-function.
if(1!==v||1!==y)do // The next one that isn't the same should be our match though.
if(v--,--y<0||m[v]!==g[y]){// V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
var b="\n"+m[v].replace(" at new "," at ");// If our component frame is labeled "<anonymous>"
return e.displayName&&b.includes("<anonymous>")&&(b=b.replace("<anonymous>",e.displayName)),"function"==typeof e&&f.set(e,b),b}while(v>=1&&y>=0)break}}}finally{B=!1,z.current=i,function(){if(0==--j){/* eslint-disable react-internal/no-production-logging */var e={configurable:!0,enumerable:!0,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{log:U({},e,{value:t}),info:U({},e,{value:n}),warn:U({},e,{value:a}),error:U({},e,{value:s}),group:U({},e,{value:u}),groupCollapsed:U({},e,{value:l}),groupEnd:U({},e,{value:c})});/* eslint-enable react-internal/no-production-logging */}j<0&&N("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=p}// Fallback to just using the name if we couldn't make it throw.
var w=e?e.displayName||e.name:"",_=w?q(w):"";return"function"==typeof e&&f.set(e,_),_}function $(e,t,n){if(null==e)return"";if("function"==typeof e)return V(e,!!((r=e.prototype)&&r.isReactComponent));if("string"==typeof e)return q(e);switch(e){case C:return q("Suspense");case T:return q("SuspenseList")}if("object"==typeof e)switch(e.$$typeof){case E:return V(e.render,!1);case O:// Memo may contain any component type so we recursively resolve it.
return $(e.type,t,n);case R:var r,o=e._payload,i=e._init;try{// Lazy may contain any component type so we recursively resolve it.
return $(i(o),t,n)}catch(e){}}return""}f=new("function"==typeof WeakMap?WeakMap:Map);var W=Object.prototype.hasOwnProperty,H={},Y=M.ReactDebugCurrentFrame;function Q(e){if(e){var t=e._owner,n=$(e.type,e._source,t?t.type:null);Y.setExtraStackFrame(n)}else Y.setExtraStackFrame(null)}var K=Array.isArray;// eslint-disable-next-line no-redeclare
function G(e){if(function(e){try{return!1}catch(e){return!0}}(e))return N("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.","function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"),""+e;// throw (to help callers find troubleshooting comments)
}var X=M.ReactCurrentOwner,J={key:!0,ref:!0,__self:!0,__source:!0};m={};/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */var Z=function(e,t,n,r,o,i,a){var s={// This tag allows us to uniquely identify this as a React Element
$$typeof:y,// Built-in properties that belong on the element
type:e,key:t,ref:n,props:a,// Record the component responsible for creating this element.
_owner:i};return(// The validation flag is currently mutative. We put it on
// an external backing store so that we can freeze the whole object.
// This can be replaced with a WeakMap once they are implemented in
// commonly used development environments.
s._store={},// the validation flag non-enumerable (where possible, which should
// include every environment we run tests in), so the test framework
// ignores it.
Object.defineProperty(s._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(s,"_self",{configurable:!1,enumerable:!1,writable:!1,value:r}),// equal for testing purposes and therefore we hide it from enumeration.
Object.defineProperty(s,"_source",{configurable:!1,enumerable:!1,writable:!1,value:o}),Object.freeze&&(Object.freeze(s.props),Object.freeze(s)),s)},ee=M.ReactCurrentOwner,et=M.ReactDebugCurrentFrame;function en(e){if(e){var t=e._owner,n=$(e.type,e._source,t?t.type:null);et.setExtraStackFrame(n)}else et.setExtraStackFrame(null)}/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */function er(e){return"object"==typeof e&&null!==e&&e.$$typeof===y}function eo(){if(ee.current){var e=A(ee.current.type);if(e)return"\n\nCheck the render method of `"+e+"`."}return""}g=!1;/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */var ei={};/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */function ea(e,t){if(e._store&&!e._store.validated&&null==e.key){e._store.validated=!0;var n=function(e){var t=eo();if(!t){var n="string"==typeof e?e:e.displayName||e.name;n&&(t="\n\nCheck the top-level render call using <"+n+">.")}return t}(t);if(!ei[n]){ei[n]=!0;// property, it may be the creator of the child that's responsible for
// assigning it a key.
var r="";e&&e._owner&&e._owner!==ee.current&&(r=" It was passed a child from "+A(e._owner.type)+"."),en(e),N('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',n,r),en(null)}}}/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */function es(e,t){if("object"==typeof e){if(K(e))for(var n=0;n<e.length;n++){var r=e[n];er(r)&&ea(r,t)}else if(er(e))e._store&&(e._store.validated=!0);else if(e){var o=function(e){if(null===e||"object"!=typeof e)return null;var t=D&&e[D]||e["@@iterator"];return"function"==typeof t?t:null}(e);if("function"==typeof o&&o!==e.entries)for(var i,a=o.call(e);!(i=a.next()).done;)er(i.value)&&ea(i.value,t)}}}function eu(t,n,r,o,i,a){var s="string"==typeof t||"function"==typeof t||t===w||t===k||t===_||t===C||t===T||t===P||"object"==typeof t&&null!==t&&(t.$$typeof===R||t.$$typeof===O||t.$$typeof===S||t.$$typeof===x||t.$$typeof===E||// This needs to include all possible module reference object
// types supported by any Flight configuration anywhere since
// we don't know which Flight build this will end up being used
// with.
t.$$typeof===e||void 0!==t.getModuleId);// We warn in this case but don't throw. We expect the element creation to
// succeed and there will likely be errors in render.
if(!s){var u,l="";(void 0===t||"object"==typeof t&&null!==t&&0===Object.keys(t).length)&&(l+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var c=void 0!==i?"\n\nCheck your code at "+i.fileName.replace(/^.*[\\\/]/,"")+":"+i.lineNumber+".":"";(c?l+=c:l+=eo(),null===t)?u="null":K(t)?u="array":void 0!==t&&t.$$typeof===y?(u="<"+(A(t.type)||"Unknown")+" />",l=" Did you accidentally export a JSX literal instead of a component?"):u=typeof t,N("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",u,l)}var d=/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */function(e,t,n,r,o){var i,a={},s=null,u=null;for(i in void 0!==n&&(G(n),s=""+n),function(e){if(W.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return void 0!==e.key}(t)&&(G(t.key),s=""+t.key),function(e){if(W.call(e,"ref")){var t=Object.getOwnPropertyDescriptor(e,"ref").get;if(t&&t.isReactWarning)return!1}return void 0!==e.ref}(t)&&(u=t.ref,function(e,t){if("string"==typeof e.ref&&X.current&&t&&X.current.stateNode!==t){var n=A(X.current.type);m[n]||(N('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',A(X.current.type),e.ref),m[n]=!0)}}(t,o)),t)W.call(t,i)&&!J.hasOwnProperty(i)&&(a[i]=t[i]);// Resolve default props
if(e&&e.defaultProps){var l=e.defaultProps;for(i in l)void 0===a[i]&&(a[i]=l[i])}if(s||u){var c,d,f="function"==typeof e?e.displayName||e.name||"Unknown":e;s&&((c=function(){p||(p=!0,N("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",f))}).isReactWarning=!0,Object.defineProperty(a,"key",{get:c,configurable:!0})),u&&((d=function(){h||(h=!0,N("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",f))}).isReactWarning=!0,Object.defineProperty(a,"ref",{get:d,configurable:!0}))}return Z(e,s,u,o,r,X.current,a)}(t,n,r,i,a);// The result can be nullish if a mock or a custom function is used.
// TODO: Drop this when these are no longer allowed as the type argument.
if(null==d)return d;// Skip key warning if the type isn't valid since our key validation logic
// doesn't expect a non-string/function type and can throw confusing errors.
// We don't want exception behavior to differ between dev and prod.
// (Rendering will throw with a helpful message and as soon as the type is
// fixed, the key warnings will appear.)
if(s){var f=n.children;if(void 0!==f){if(o){if(K(f)){for(var v=0;v<f.length;v++)es(f[v],t);Object.freeze&&Object.freeze(f)}else N("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.")}else es(f,t)}}return t===w?/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */function(e){for(var t=Object.keys(e.props),n=0;n<t.length;n++){var r=t[n];if("children"!==r&&"key"!==r){en(e),N("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",r),en(null);break}}null!==e.ref&&(en(e),N("Invalid attribute `ref` supplied to `React.Fragment`."),en(null))}(d):/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */function(e){var t,n=e.type;if(null!=n&&"string"!=typeof n){if("function"==typeof n)t=n.propTypes;else{if("object"!=typeof n||n.$$typeof!==E&&// Note: Memo only checks outer props here.
// Inner props are checked in the reconciler.
n.$$typeof!==O)return;t=n.propTypes}if(t){// Intentionally inside to avoid triggering lazy initializers:
var r=A(n);!function(e,t,n,r,o){// $FlowFixMe This is okay but Flow doesn't know it.
var i=Function.call.bind(W);for(var a in e)if(i(e,a)){var s=void 0;// Prop type validation may throw. In case they do, we don't want to
// fail the render phase where it didn't fail before. So we log it.
// After these have been cleaned up, we'll let them throw.
try{// This is intentionally an invariant that gets caught. It's the same
// behavior as without this statement except with a better message.
if("function"!=typeof e[a]){// eslint-disable-next-line react-internal/prod-error-codes
var u=Error((r||"React class")+": "+n+" type `"+a+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[a]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw u.name="Invariant Violation",u}s=e[a](t,a,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(e){s=e}!s||s instanceof Error||(Q(o),N("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,a,typeof s),Q(null)),s instanceof Error&&!(s.message in H)&&(// Only monitor this failure once because there tends to be a lot of the
// same error.
H[s.message]=!0,Q(o),N("Failed %s type: %s",n,s.message),Q(null))}}(t,e.props,"prop",r,e)}else void 0===n.PropTypes||g||(g=!0,N("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",A(n)||"Unknown"));"function"!=typeof n.getDefaultProps||n.getDefaultProps.isReactClassApproved||N("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}(d),d}// These two functions exist to still get child warnings in dev
r=w,o=function(e,t,n){return eu(e,t,n,!1)},i=// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.
function(e,t,n){return eu(e,t,n,!0)}}()}),I.register("lrVh9",function(e,t){var r;n(e.exports,"useSyncExternalStore",function(){return r},function(e){return r=e}),function(){"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var e=I("exYeM"),t=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function n(e){for(var n,r,o,i,a=arguments.length,s=Array(a>1?a-1:0),u=1;u<a;u++)s[u-1]=arguments[u];n=e,r=s,""!==(o=t.ReactDebugCurrentFrame.getStackAddendum())&&(n+="%s",r=r.concat([o])),(i=r.map(function(e){return String(e)})).unshift("Warning: "+n),// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console.error,console,i)}var o="function"==typeof Object.is?Object.is:/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t// eslint-disable-line no-self-compare
},i=e.useState,a=e.useEffect,s=e.useLayoutEffect,u=e.useDebugValue,l=!1,c=!1;function d(e){var t=e.getSnapshot,n=e.value;try{var r=t();return!o(n,r)}catch(e){return!0}}var f="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?// because of a very particular set of implementation details and assumptions
// -- change any one of them and it will break. The most important assumption
// is that updates are always synchronous, because concurrent rendering is
// only available in versions of React that also have a built-in
// useSyncExternalStore API. And we only use this shim when the built-in API
// does not exist.
//
// Do not assume that the clever hacks used by this hook also work in general.
// The point of this shim is to replace the need for hacks by other libraries.
function(t,r,// will need to track that themselves and return the correct value
// from `getSnapshot`.
f){l||void 0===e.startTransition||(l=!0,n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));// breaks the rules of React, and only works here because of specific
// implementation details, most importantly that updates are
// always synchronous.
var p=r();c||o(p,r())||(n("The result of getSnapshot should be cached to avoid an infinite loop"),c=!0);// re-render whenever the subscribed state changes by updating an some
// arbitrary useState hook. Then, during render, we call getSnapshot to read
// the current value.
//
// Because we don't actually use the state returned by the useState hook, we
// can save a bit of memory by storing other stuff in that slot.
//
// To implement the early bailout, we need to track some things on a mutable
// object. Usually, we would put that in a useRef hook, but we can stash it in
// our useState hook instead.
//
// To force a re-render, we call forceUpdate({inst}). That works because the
// new object always fails an equality check.
var h=i({inst:{value:p,getSnapshot:r}}),m=h[0].inst,g=h[1];// Track the latest getSnapshot function with a ref. This needs to be updated
return(// in the layout phase so we can access it during the tearing check that
// happens on subscribe.
s(function(){m.value=p,m.getSnapshot=r,d(m)&&g({inst:m})},[t,p,r]),a(function(){return d(m)&&g({inst:m}),t(function(){// TODO: Because there is no cross-renderer API for batching updates, it's
// up to the consumer of this library to wrap their subscription event
// with unstable_batchedUpdates. Should we try to detect when this isn't
// the case and print a warning in development?
// The store changed. Check if the snapshot changed since the last time we
// read from the store.
d(m)&&g({inst:m})})},[t]),u(p),p)}:function(e,t,n){// Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
return t()};r=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:f,"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()});var D=I("exYeM"),M={};M=I("crBKy");var D=I("exYeM");// TYPES
// UTILS
let N="undefined"==typeof window||"Deno"in window;function L(){}function A(e,t,n){return H(e)?"function"==typeof t?{...n,queryKey:e,queryFn:t}:{...t,queryKey:e}:e}function U(e,t,n){return H(e)?[{...t,queryKey:e},n]:[e||{},t]}function j(e,t){let{type:n="all",exact:r,fetchStatus:o,predicate:i,queryKey:a,stale:s}=e;if(H(a)){if(r){if(t.queryHash!==z(a,t.options))return!1}else{if(!B(t.queryKey,a))return!1}}if("all"!==n){let e=t.isActive();if("active"===n&&!e||"inactive"===n&&e)return!1}return("boolean"!=typeof s||t.isStale()===s)&&(void 0===o||o===t.state.fetchStatus)&&(!i||!!i(t))}function F(e,t){let{exact:n,fetching:r,predicate:o,mutationKey:i}=e;if(H(i)){if(!t.options.mutationKey)return!1;if(n){if(q(t.options.mutationKey)!==q(i))return!1}else{if(!B(t.options.mutationKey,i))return!1}}return("boolean"!=typeof r||"loading"===t.state.status===r)&&(!o||!!o(t))}function z(e,t){let n=(null==t?void 0:t.queryKeyHashFn)||q;return n(e)}/**
 * Default query keys hash function.
 * Hashes the value into a stable hash.
 */function q(e){return JSON.stringify(e,(e,t)=>$(t)?Object.keys(t).sort().reduce((e,n)=>(e[n]=t[n],e),{}):t)}/**
 * Checks if `b` partially matches with `a`.
 */function B(e,t){return e===t||typeof e==typeof t&&!!e&&!!t&&"object"==typeof e&&"object"==typeof t&&!Object.keys(t).some(n=>!B(e[n],t[n]))}function V(e){return Array.isArray(e)&&e.length===Object.keys(e).length}// Copied from: https://github.com/jonschlinkert/is-plain-object
function $(e){if(!W(e))return!1;// If has modified constructor
let t=e.constructor;if(void 0===t)return!0;// If has modified prototype
let n=t.prototype;return!!(W(n)&&n.hasOwnProperty("isPrototypeOf"))}function W(e){return"[object Object]"===Object.prototype.toString.call(e)}function H(e){return Array.isArray(e)}function Y(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * Schedules a microtask.
 * This can be useful to schedule state updates after rendering.
 */function Q(e){Y(0).then(e)}let K=console,G=function(){let e=[],t=0,n=e=>{e()},r=e=>{e()},o=r=>{t?e.push(r):Q(()=>{n(r)})},i=()=>{let t=e;e=[],t.length&&Q(()=>{r(()=>{t.forEach(e=>{n(e)})})})};return{batch:e=>{let n;t++;try{n=e()}finally{--t||i()}return n},batchCalls:e=>(...t)=>{o(()=>{e(...t)})},schedule:o,setNotifyFunction:e=>{n=e},setBatchNotifyFunction:e=>{r=e}}}// SINGLETON
();class X{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){let t={listener:e};return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}let J=new class extends X{constructor(){super(),this.setup=e=>{// addEventListener does not exist in React Native, but window does
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if(!N&&window.addEventListener){let t=()=>e();// Listen to visibillitychange and focus
return window.addEventListener("visibilitychange",t,!1),window.addEventListener("focus",t,!1),()=>{// Be sure to unsubscribe if a new handler is set
window.removeEventListener("visibilitychange",t),window.removeEventListener("focus",t)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.cleanup)||e.call(this),this.cleanup=void 0}}setEventListener(e){var t;this.setup=e,null==(t=this.cleanup)||t.call(this),this.cleanup=e(e=>{"boolean"==typeof e?this.setFocused(e):this.onFocus()})}setFocused(e){let t=this.focused!==e;t&&(this.focused=e,this.onFocus())}onFocus(){this.listeners.forEach(({listener:e})=>{e()})}isFocused(){return"boolean"==typeof this.focused?this.focused:"undefined"==typeof document||[void 0,"visible","prerender"].includes(document.visibilityState)}},Z=["online","offline"],ee=new class extends X{constructor(){super(),this.setup=e=>{// addEventListener does not exist in React Native, but window does
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if(!N&&window.addEventListener){let t=()=>e();// Listen to online
return Z.forEach(e=>{window.addEventListener(e,t,!1)}),()=>{// Be sure to unsubscribe if a new handler is set
Z.forEach(e=>{window.removeEventListener(e,t)})}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.cleanup)||e.call(this),this.cleanup=void 0}}setEventListener(e){var t;this.setup=e,null==(t=this.cleanup)||t.call(this),this.cleanup=e(e=>{"boolean"==typeof e?this.setOnline(e):this.onOnline()})}setOnline(e){let t=this.online!==e;t&&(this.online=e,this.onOnline())}onOnline(){this.listeners.forEach(({listener:e})=>{e()})}isOnline(){return"boolean"==typeof this.online?this.online:"undefined"==typeof navigator||void 0===navigator.onLine||navigator.onLine}};function et(e){return Math.min(1e3*2**e,3e4)}function en(e){return(null!=e?e:"online")!=="online"||ee.isOnline()}class er{constructor(e){this.revert=null==e?void 0:e.revert,this.silent=null==e?void 0:e.silent}}function eo(e){return e instanceof er}function ei(e){let t,n,r,o=!1,i=0,a=!1,s=new Promise((e,t)=>{n=e,r=t}),u=()=>!J.isFocused()||"always"!==e.networkMode&&!ee.isOnline(),l=r=>{a||(a=!0,null==e.onSuccess||e.onSuccess(r),null==t||t(),n(r))},c=n=>{a||(a=!0,null==e.onError||e.onError(n),null==t||t(),r(n))},d=()=>new Promise(n=>{t=e=>{let t=a||!u();return t&&n(e),t},null==e.onPause||e.onPause()}).then(()=>{t=void 0,a||null==e.onContinue||e.onContinue()}),f=()=>{let t;// Do nothing if already resolved
if(!a){try{t=e.fn()}catch(e){t=Promise.reject(e)}Promise.resolve(t).then(l).catch(t=>{var n,r;// Stop if the fetch is already resolved
if(a)return;// Do we need to retry the request?
let s=null!=(n=e.retry)?n:3,l=null!=(r=e.retryDelay)?r:et,p="function"==typeof l?l(i,t):l,h=!0===s||"number"==typeof s&&i<s||"function"==typeof s&&s(i,t);if(o||!h){// We are done if the query does not need to be retried
c(t);return}i++,null==e.onFail||e.onFail(i,t),Y(p)// Pause if the document is not visible or when the device is offline
.then(()=>{if(u())return d()}).then(()=>{o?c(t):f()})})}};return en(e.networkMode)?f():d().then(f),{promise:s,cancel:t=>{a||(c(new er(t)),null==e.abort||e.abort())},continue:()=>{let e=null==t?void 0:t();return e?s:Promise.resolve()},cancelRetry:()=>{o=!0},continueRetry:()=>{o=!1}}}class ea{destroy(){this.clearGcTimeout()}scheduleGc(){var e;this.clearGcTimeout(),"number"==typeof(e=this.cacheTime)&&e>=0&&e!==1/0&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}updateCacheTime(e){// Default to 5 minutes (Infinity for server-side) if no cache time is set
this.cacheTime=Math.max(this.cacheTime||0,null!=e?e:N?1/0:3e5)}clearGcTimeout(){this.gcTimeout&&(clearTimeout(this.gcTimeout),this.gcTimeout=void 0)}}// CLASS
class es extends ea{constructor(e){super(),this.abortSignalConsumed=!1,this.defaultOptions=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.cache=e.cache,this.logger=e.logger||K,this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.initialState=e.state||function(e){let t="function"==typeof e.initialData?e.initialData():e.initialData,n=void 0!==t,r=n?"function"==typeof e.initialDataUpdatedAt?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:n?null!=r?r:Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"loading",fetchStatus:"idle"}}(this.options),this.state=this.initialState,this.scheduleGc()}get meta(){return this.options.meta}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.cache.remove(this)}setData(e,t){var n,r;let o=(n=this.state.data,// Use prev data if an isDataEqual function is defined and returns `true`
null!=(r=this.options).isDataEqual&&r.isDataEqual(n,e)?n:"function"==typeof r.structuralSharing?r.structuralSharing(n,e):!1!==r.structuralSharing?/**
 * This function returns `a` if `b` is deeply equal.
 * If not, it will replace any deeply equal children of `b` with those of `a`.
 * This can be used for structural sharing between JSON values for example.
 */function e(t,n){if(t===n)return t;let r=V(t)&&V(n);if(r||$(t)&&$(n)){let o=r?t.length:Object.keys(t).length,i=r?n:Object.keys(n),a=i.length,s=r?[]:{},u=0;for(let o=0;o<a;o++){let a=r?o:i[o];s[a]=e(t[a],n[a]),s[a]===t[a]&&u++}return o===a&&u===o?t:s}return n}(n,e):e);// Set data and mark it as cached
return this.dispatch({data:o,type:"success",dataUpdatedAt:null==t?void 0:t.updatedAt,manual:null==t?void 0:t.manual}),o}setState(e,t){this.dispatch({type:"setState",state:e,setStateOptions:t})}cancel(e){var t;let n=this.promise;return null==(t=this.retryer)||t.cancel(e),n?n.then(L).catch(L):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(e=>!1!==e.options.enabled)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(e=>e.getCurrentResult().isStale)}isStaleByTime(e=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!Math.max(this.state.dataUpdatedAt+(e||0)-Date.now(),0)}onFocus(){var e;let t=this.observers.find(e=>e.shouldFetchOnWindowFocus());t&&t.refetch({cancelRefetch:!1}),null==// Continue fetch if currently paused
(e=this.retryer)||e.continue()}onOnline(){var e;let t=this.observers.find(e=>e.shouldFetchOnReconnect());t&&t.refetch({cancelRefetch:!1}),null==// Continue fetch if currently paused
(e=this.retryer)||e.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.includes(e)&&(this.observers=this.observers.filter(t=>t!==e),this.observers.length||(this.retryer&&(this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.scheduleGc()),this.cache.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(e,t){var n,r,o,i;if("idle"!==this.state.fetchStatus){if(this.state.dataUpdatedAt&&null!=t&&t.cancelRefetch)this.cancel({silent:!0});else if(this.promise)return null==// make sure that retries that were potentially cancelled due to unmounts can continue
(o=this.retryer)||o.continueRetry(),this.promise}// Update config if passed, otherwise the config from the last execution is used
// Use the options from the first observer with a query function if no function is found.
// This can happen when the query is hydrated or created with setQueryData.
if(e&&this.setOptions(e),!this.options.queryFn){let e=this.observers.find(e=>e.options.queryFn);e&&this.setOptions(e.options)}Array.isArray(this.options.queryKey)||this.logger.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']");let a=function(){if("function"==typeof AbortController)return new AbortController}(),s={queryKey:this.queryKey,pageParam:void 0,meta:this.meta},u=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>{if(a)return this.abortSignalConsumed=!0,a.signal}})};// Create query function context
u(s);let l={fetchOptions:t,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(s)):Promise.reject("Missing queryFn for queryKey '"+this.options.queryHash+"'")};u(l),null==(n=this.options.behavior)||n.onFetch(l),this.revertState=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==(null==(r=l.fetchOptions)?void 0:r.meta))&&this.dispatch({type:"fetch",meta:null==(i=l.fetchOptions)?void 0:i.meta});let c=e=>{if(eo(e)&&e.silent||this.dispatch({type:"error",error:e}),!eo(e)){var t,n,r,o;null==// Notify cache callback
(t=(n=this.cache.config).onError)||t.call(n,e,this),null==(r=(o=this.cache.config).onSettled)||r.call(o,this.state.data,e,this),this.logger.error(e)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};// Try to fetch the data
return this.retryer=ei({fn:l.fetchFn,abort:null==a?void 0:a.abort.bind(a),onSuccess:e=>{var t,n,r,o;if(void 0===e){this.logger.error("Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: "+this.queryHash),c(Error(this.queryHash+" data is undefined"));return}this.setData(e),null==(t=(n=this.cache.config).onSuccess)||t.call(n,e,this),null==(r=(o=this.cache.config).onSettled)||r.call(o,e,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:c,onFail:(e,t)=>{this.dispatch({type:"failed",failureCount:e,error:t})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:l.options.retry,retryDelay:l.options.retryDelay,networkMode:l.options.networkMode}),this.promise=this.retryer.promise,this.promise}dispatch(e){this.state=(t=>{var n,r;switch(e.type){case"failed":return{...t,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...t,fetchStatus:"paused"};case"continue":return{...t,fetchStatus:"fetching"};case"fetch":return{...t,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null!=(n=e.meta)?n:null,fetchStatus:en(this.options.networkMode)?"fetching":"paused",...!t.dataUpdatedAt&&{error:null,status:"loading"}};case"success":return{...t,data:e.data,dataUpdateCount:t.dataUpdateCount+1,dataUpdatedAt:null!=(r=e.dataUpdatedAt)?r:Date.now(),error:null,isInvalidated:!1,status:"success",...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":let o=e.error;if(eo(o)&&o.revert&&this.revertState)return{...this.revertState,fetchStatus:"idle"};return{...t,error:o,errorUpdateCount:t.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:t.fetchFailureCount+1,fetchFailureReason:o,fetchStatus:"idle",status:"error"};case"invalidate":return{...t,isInvalidated:!0};case"setState":return{...t,...e.state}}})(this.state),G.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate(e)}),this.cache.notify({query:this,type:"updated",action:e})})}}// CLASS
class eu extends X{constructor(e){super(),this.config=e||{},this.queries=[],this.queriesMap={}}build(e,t,n){var r;let o=t.queryKey,i=null!=(r=t.queryHash)?r:z(o,t),a=this.get(i);return a||(a=new es({cache:this,logger:e.getLogger(),queryKey:o,queryHash:i,options:e.defaultQueryOptions(t),state:n,defaultOptions:e.getQueryDefaults(o)}),this.add(a)),a}add(e){this.queriesMap[e.queryHash]||(this.queriesMap[e.queryHash]=e,this.queries.push(e),this.notify({type:"added",query:e}))}remove(e){let t=this.queriesMap[e.queryHash];t&&(e.destroy(),this.queries=this.queries.filter(t=>t!==e),t===e&&delete this.queriesMap[e.queryHash],this.notify({type:"removed",query:e}))}clear(){G.batch(()=>{this.queries.forEach(e=>{this.remove(e)})})}get(e){return this.queriesMap[e]}getAll(){return this.queries}find(e,t){let[n]=U(e,t);return void 0===n.exact&&(n.exact=!0),this.queries.find(e=>j(n,e))}findAll(e,t){let[n]=U(e,t);return Object.keys(n).length>0?this.queries.filter(e=>j(n,e)):this.queries}notify(e){G.batch(()=>{this.listeners.forEach(({listener:t})=>{t(e)})})}onFocus(){G.batch(()=>{this.queries.forEach(e=>{e.onFocus()})})}onOnline(){G.batch(()=>{this.queries.forEach(e=>{e.onOnline()})})}}// CLASS
class el extends ea{constructor(e){super(),this.defaultOptions=e.defaultOptions,this.mutationId=e.mutationId,this.mutationCache=e.mutationCache,this.logger=e.logger||K,this.observers=[],this.state=e.state||ec(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}get meta(){return this.options.meta}setState(e){this.dispatch({type:"setState",state:e})}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),this.mutationCache.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.observers=this.observers.filter(t=>t!==e),this.scheduleGc(),this.mutationCache.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.observers.length||("loading"===this.state.status?this.scheduleGc():this.mutationCache.remove(this))}continue(){var e,t;return null!=(e=null==(t=this.retryer)?void 0:t.continue())?e:this.execute()}async execute(){var e,t,n,r,o,i,a,s,u,l,c,d,f,p,h,m,g,v,y,b;let w="loading"===this.state.status;try{if(!w){this.dispatch({type:"loading",variables:this.options.variables}),await (null==(u=(l=this.mutationCache.config).onMutate)?void 0:u.call(l,this.state.variables,this));let e=await (null==(c=(d=this.options).onMutate)?void 0:c.call(d,this.state.variables));e!==this.state.context&&this.dispatch({type:"loading",context:e,variables:this.state.variables})}let f=await (()=>{var e;return this.retryer=ei({fn:()=>this.options.mutationFn?this.options.mutationFn(this.state.variables):Promise.reject("No mutationFn found"),onFail:(e,t)=>{this.dispatch({type:"failed",failureCount:e,error:t})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:null!=(e=this.options.retry)?e:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode}),this.retryer.promise})();// Notify cache callback
return await (null==(e=(t=this.mutationCache.config).onSuccess)?void 0:e.call(t,f,this.state.variables,this.state.context,this)),await (null==(n=(r=this.options).onSuccess)?void 0:n.call(r,f,this.state.variables,this.state.context)),await (null==(o=(i=this.mutationCache.config).onSettled)?void 0:o.call(i,f,null,this.state.variables,this.state.context,this)),await (null==(a=(s=this.options).onSettled)?void 0:a.call(s,f,null,this.state.variables,this.state.context)),this.dispatch({type:"success",data:f}),f}catch(e){try{throw(// Notify cache callback
await (null==(f=(p=this.mutationCache.config).onError)?void 0:f.call(p,e,this.state.variables,this.state.context,this)),this.logger.error(e),await (null==(h=(m=this.options).onError)?void 0:h.call(m,e,this.state.variables,this.state.context)),await (null==(g=(v=this.mutationCache.config).onSettled)?void 0:g.call(v,void 0,e,this.state.variables,this.state.context,this)),await (null==(y=(b=this.options).onSettled)?void 0:y.call(b,void 0,e,this.state.variables,this.state.context)),e)}finally{this.dispatch({type:"error",error:e})}}}dispatch(e){this.state=(t=>{switch(e.type){case"failed":return{...t,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...t,isPaused:!0};case"continue":return{...t,isPaused:!1};case"loading":return{...t,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:!en(this.options.networkMode),status:"loading",variables:e.variables};case"success":return{...t,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...t,data:void 0,error:e.error,failureCount:t.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"};case"setState":return{...t,...e.state}}})(this.state),G.batch(()=>{this.observers.forEach(t=>{t.onMutationUpdate(e)}),this.mutationCache.notify({mutation:this,type:"updated",action:e})})}}function ec(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0}}// CLASS
class ed extends X{constructor(e){super(),this.config=e||{},this.mutations=[],this.mutationId=0}build(e,t,n){let r=new el({mutationCache:this,logger:e.getLogger(),mutationId:++this.mutationId,options:e.defaultMutationOptions(t),state:n,defaultOptions:t.mutationKey?e.getMutationDefaults(t.mutationKey):void 0});return this.add(r),r}add(e){this.mutations.push(e),this.notify({type:"added",mutation:e})}remove(e){this.mutations=this.mutations.filter(t=>t!==e),this.notify({type:"removed",mutation:e})}clear(){G.batch(()=>{this.mutations.forEach(e=>{this.remove(e)})})}getAll(){return this.mutations}find(e){return void 0===e.exact&&(e.exact=!0),this.mutations.find(t=>F(e,t))}findAll(e){return this.mutations.filter(t=>F(e,t))}notify(e){G.batch(()=>{this.listeners.forEach(({listener:t})=>{t(e)})})}resumePausedMutations(){var e;return this.resuming=(null!=(e=this.resuming)?e:Promise.resolve()).then(()=>{let e=this.mutations.filter(e=>e.state.isPaused);return G.batch(()=>e.reduce((e,t)=>e.then(()=>t.continue().catch(L)),Promise.resolve()))}).then(()=>{this.resuming=void 0}),this.resuming}}function ef(e,t){return null==e.getNextPageParam?void 0:e.getNextPageParam(t[t.length-1],t)}var D=I("exYeM");let ep=/*#__PURE__*/D.createContext(void 0),eh=/*#__PURE__*/D.createContext(!1);// Otherwise, if contextSharing is on, we share the first and at least one
// instance of the context across the window
// to ensure that if React Query is used across
// different bundles or microfrontends they will
// all use the same **instance** of context, regardless
// of module scoping.
function em(e,t){return e||(t&&"undefined"!=typeof window?(window.ReactQueryClientContext||(window.ReactQueryClientContext=ep),window.ReactQueryClientContext):ep)}let eg=({context:e}={})=>{let t=D.useContext(em(e,D.useContext(eh)));if(!t)throw Error("No QueryClient set, use QueryClientProvider to set one");return t},ev=({client:e,children:t,context:n,contextSharing:r=!1})=>{D.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),r&&e.getLogger().error("The contextSharing option has been deprecated and will be removed in the next major version");let o=em(n,r);return /*#__PURE__*/D.createElement(eh.Provider,{value:!n&&r},/*#__PURE__*/D.createElement(o.Provider,{value:e},t))};var D=(I("exYeM"),I("exYeM"));let ey=(0,D.createContext)(null),eb={didCatch:!1,error:null};class ew extends D.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=eb}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){let{error:e}=this.state;if(null!==e){for(var t,n,r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];null===(t=(n=this.props).onReset)||void 0===t||t.call(n,{args:o,reason:"imperative-api"}),this.setState(eb)}}componentDidCatch(e,t){var n,r;null===(n=(r=this.props).onError)||void 0===n||n.call(r,e,t)}componentDidUpdate(e,t){let{didCatch:n}=this.state,{resetKeys:r}=this.props;// There's an edge case where if the thing that triggered the error happens to *also* be in the resetKeys array,
// we'd end up resetting the error boundary immediately.
// This would likely trigger a second error to be thrown.
// So we make sure that we don't check the resetKeys on the first call of cDU after the error is set.
if(n&&null!==t.error&&function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.length!==t.length||e.some((e,n)=>!Object.is(e,t[n]))}(e.resetKeys,r)){var o,i;null===(o=(i=this.props).onReset)||void 0===o||o.call(i,{next:r,prev:e.resetKeys,reason:"keys"}),this.setState(eb)}}render(){let{children:e,fallbackRender:t,FallbackComponent:n,fallback:r}=this.props,{didCatch:o,error:i}=this.state,a=e;if(o){let e={error:i,resetErrorBoundary:this.resetErrorBoundary};if((0,D.isValidElement)(r))a=r;else if("function"==typeof t)a=t(e);else if(n)a=(0,D.createElement)(n,e);else throw i}return(0,D.createElement)(ey.Provider,{value:{didCatch:o,error:i,resetErrorBoundary:this.resetErrorBoundary}},a)}}var D=(I("exYeM"),I("exYeM"),I("exYeM")),e_=e=>"checkbox"===e.type,ek=e=>e instanceof Date,eS=e=>null==e;let ex=e=>"object"==typeof e;var eE=e=>!eS(e)&&!Array.isArray(e)&&ex(e)&&!ek(e),eC=e=>eE(e)&&e.target?e_(e.target)?e.target.checked:e.target.value:e,eT=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,eO=(e,t)=>e.has(eT(t)),eR=e=>{let t=e.constructor&&e.constructor.prototype;return eE(t)&&t.hasOwnProperty("isPrototypeOf")},eP="undefined"!=typeof window&&void 0!==window.HTMLElement&&"undefined"!=typeof document;function eI(e){let t;let n=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(!(eP&&(e instanceof Blob||e instanceof FileList))&&(n||eE(e))))return e;else if(t=n?[]:{},n||eR(e))for(let n in e)e.hasOwnProperty(n)&&(t[n]=eI(e[n]));else t=e;return t}var eD=e=>Array.isArray(e)?e.filter(Boolean):[],eM=e=>void 0===e,eN=(e,t,n)=>{if(!t||!eE(e))return n;let r=eD(t.split(/[,[\].]+?/)).reduce((e,t)=>eS(e)?e:e[t],e);return eM(r)||r===e?eM(e[t])?n:e[t]:r},eL=e=>"boolean"==typeof e;let eA={BLUR:"blur",FOCUS_OUT:"focusout"},eU={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},ej={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};/*@__PURE__*/O(D).createContext(null);var eF=(e,t,n,r=!0)=>{let o={defaultValues:t._defaultValues};for(let i in e)Object.defineProperty(o,i,{get:()=>(t._proxyFormState[i]!==eU.all&&(t._proxyFormState[i]=!r||eU.all),n&&(n[i]=!0),e[i])});return o},ez=e=>eE(e)&&!Object.keys(e).length,eq=(e,t,n,r)=>{n(e);let{name:o,...i}=e;return ez(i)||Object.keys(i).length>=Object.keys(t).length||Object.keys(i).find(e=>t[e]===(!r||eU.all))},eB=e=>Array.isArray(e)?e:[e],eV=e=>"string"==typeof e,e$=(e,t,n,r,o)=>eV(e)?(r&&t.watch.add(e),eN(n,e,o)):Array.isArray(e)?e.map(e=>(r&&t.watch.add(e),eN(n,e))):(r&&(t.watchAll=!0),n),eW=e=>/^\w*$/.test(e),eH=e=>eD(e.replace(/["|']|\]/g,"").split(/\.|\[/));function eY(e,t,n){let r=-1,o=eW(t)?[t]:eH(t),i=o.length,a=i-1;for(;++r<i;){let t=o[r],i=n;if(r!==a){let n=e[t];i=eE(n)||Array.isArray(n)?n:isNaN(+o[r+1])?{}:[]}e[t]=i,e=e[t]}return e}var eQ=(e,t,n,r,o)=>t?{...n[e],types:{...n[e]&&n[e].types?n[e].types:{},[r]:o||!0}}:{};let eK=(e,t,n)=>{for(let r of n||Object.keys(e)){let n=eN(e,r);if(n){let{_f:e,...r}=n;if(e&&t(e.name)){if(e.ref.focus){e.ref.focus();break}if(e.refs&&e.refs[0].focus){e.refs[0].focus();break}}else eE(r)&&eK(r,t)}}};var eG=e=>({isOnSubmit:!e||e===eU.onSubmit,isOnBlur:e===eU.onBlur,isOnChange:e===eU.onChange,isOnAll:e===eU.all,isOnTouch:e===eU.onTouched}),eX=(e,t,n)=>!n&&(t.watchAll||t.watch.has(e)||[...t.watch].some(t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length)))),eJ=(e,t,n)=>{let r=eD(eN(e,n));return eY(r,"root",t[n]),eY(e,n,r),e},eZ=e=>"file"===e.type,e0=e=>"function"==typeof e,e1=e=>{if(!eP)return!1;let t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},e2=e=>eV(e),e3=e=>"radio"===e.type,e4=e=>e instanceof RegExp;let e6={value:!1,isValid:!1},e5={value:!0,isValid:!0};var e8=e=>{if(Array.isArray(e)){if(e.length>1){let t=e.filter(e=>e&&e.checked&&!e.disabled).map(e=>e.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!eM(e[0].attributes.value)?eM(e[0].value)||""===e[0].value?e5:{value:e[0].value,isValid:!0}:e5:e6}return e6};let e7={isValid:!1,value:null};var e9=e=>Array.isArray(e)?e.reduce((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e,e7):e7;function te(e,t,n="validate"){if(e2(e)||Array.isArray(e)&&e.every(e2)||eL(e)&&!e)return{type:n,message:e2(e)?e:"",ref:t}}var tt=e=>eE(e)&&!e4(e)?e:{value:e,message:""},tn=async(e,t,n,r,o)=>{let{ref:i,refs:a,required:s,maxLength:u,minLength:l,min:c,max:d,pattern:f,validate:p,name:h,valueAsNumber:m,mount:g,disabled:v}=e._f,y=eN(t,h);if(!g||v)return{};let b=a?a[0]:i,w=e=>{r&&b.reportValidity&&(b.setCustomValidity(eL(e)?"":e||""),b.reportValidity())},_={},k=e3(i),S=e_(i),x=(m||eZ(i))&&eM(i.value)&&eM(y)||e1(i)&&""===i.value||""===y||Array.isArray(y)&&!y.length,E=eQ.bind(null,h,n,_),C=(e,t,n,r=ej.maxLength,o=ej.minLength)=>{let a=e?t:n;_[h]={type:e?r:o,message:a,ref:i,...E(e?r:o,a)}};if(o?!Array.isArray(y)||!y.length:s&&(!(k||S)&&(x||eS(y))||eL(y)&&!y||S&&!e8(a).isValid||k&&!e9(a).isValid)){let{value:e,message:t}=e2(s)?{value:!!s,message:s}:tt(s);if(e&&(_[h]={type:ej.required,message:t,ref:b,...E(ej.required,t)},!n))return w(t),_}if(!x&&(!eS(c)||!eS(d))){let e,t;let r=tt(d),o=tt(c);if(eS(y)||isNaN(y)){let n=i.valueAsDate||new Date(y),a=e=>new Date(new Date().toDateString()+" "+e),s="time"==i.type,u="week"==i.type;eV(r.value)&&y&&(e=s?a(y)>a(r.value):u?y>r.value:n>new Date(r.value)),eV(o.value)&&y&&(t=s?a(y)<a(o.value):u?y<o.value:n<new Date(o.value))}else{let n=i.valueAsNumber||(y?+y:y);eS(r.value)||(e=n>r.value),eS(o.value)||(t=n<o.value)}if((e||t)&&(C(!!e,r.message,o.message,ej.max,ej.min),!n))return w(_[h].message),_}if((u||l)&&!x&&(eV(y)||o&&Array.isArray(y))){let e=tt(u),t=tt(l),r=!eS(e.value)&&y.length>+e.value,o=!eS(t.value)&&y.length<+t.value;if((r||o)&&(C(r,e.message,t.message),!n))return w(_[h].message),_}if(f&&!x&&eV(y)){let{value:e,message:t}=tt(f);if(e4(e)&&!y.match(e)&&(_[h]={type:ej.pattern,message:t,ref:i,...E(ej.pattern,t)},!n))return w(t),_}if(p){if(e0(p)){let e=await p(y,t),r=te(e,b);if(r&&(_[h]={...r,...E(ej.validate,r.message)},!n))return w(r.message),_}else if(eE(p)){let e={};for(let r in p){if(!ez(e)&&!n)break;let o=te(await p[r](y,t),b,r);o&&(e={...o,...E(r,o.message)},w(o.message),n&&(_[h]=e))}if(!ez(e)&&(_[h]={ref:b,...e},!n))return _}}return w(!0),_};function tr(e,t){let n=Array.isArray(t)?t:eW(t)?[t]:eH(t),r=1===n.length?e:function(e,t){let n=t.slice(0,-1).length,r=0;for(;r<n;)e=eM(e)?r++:e[t[r++]];return e}(e,n),o=n.length-1,i=n[o];return r&&delete r[i],0!==o&&(eE(r)&&ez(r)||Array.isArray(r)&&function(e){for(let t in e)if(e.hasOwnProperty(t)&&!eM(e[t]))return!1;return!0}(r))&&tr(e,n.slice(0,-1)),e}function to(){let e=[];return{get observers(){return e},next:t=>{for(let n of e)n.next&&n.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter(e=>e!==t)}}),unsubscribe:()=>{e=[]}}}var ti=e=>eS(e)||!ex(e);function ta(e,t){if(ti(e)||ti(t))return e===t;if(ek(e)&&ek(t))return e.getTime()===t.getTime();let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let o of n){let n=e[o];if(!r.includes(o))return!1;if("ref"!==o){let e=t[o];if(ek(n)&&ek(e)||eE(n)&&eE(e)||Array.isArray(n)&&Array.isArray(e)?!ta(n,e):n!==e)return!1}}return!0}var ts=e=>"select-multiple"===e.type,tu=e=>e3(e)||e_(e),tl=e=>e1(e)&&e.isConnected,tc=e=>{for(let t in e)if(e0(e[t]))return!0;return!1};function td(e,t={}){let n=Array.isArray(e);if(eE(e)||n)for(let n in e)Array.isArray(e[n])||eE(e[n])&&!tc(e[n])?(t[n]=Array.isArray(e[n])?[]:{},td(e[n],t[n])):eS(e[n])||(t[n]=!0);return t}var tf=(e,t)=>(function e(t,n,r){let o=Array.isArray(t);if(eE(t)||o)for(let o in t)Array.isArray(t[o])||eE(t[o])&&!tc(t[o])?eM(n)||ti(r[o])?r[o]=Array.isArray(t[o])?td(t[o],[]):{...td(t[o])}:e(t[o],eS(n)?{}:n[o],r[o]):r[o]=!ta(t[o],n[o]);return r})(e,t,td(t)),tp=(e,{valueAsNumber:t,valueAsDate:n,setValueAs:r})=>eM(e)?e:t?""===e?NaN:e?+e:e:n&&eV(e)?new Date(e):r?r(e):e;function th(e){let t=e.ref;if(e.refs?!e.refs.every(e=>e.disabled):!t.disabled)return eZ(t)?t.files:e3(t)?e9(e.refs).value:ts(t)?[...t.selectedOptions].map(({value:e})=>e):e_(t)?e8(e.refs).value:tp(eM(t.value)?e.ref.value:t.value,e)}var tm=(e,t,n,r)=>{let o={};for(let n of e){let e=eN(t,n);e&&eY(o,n,e._f)}return{criteriaMode:n,names:[...e],fields:o,shouldUseNativeValidation:r}},tg=e=>eM(e)?e:e4(e)?e.source:eE(e)?e4(e.value)?e.value.source:e.value:e,tv=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function ty(e,t,n){let r=eN(e,n);if(r||eW(n))return{error:r,name:n};let o=n.split(".");for(;o.length;){let r=o.join("."),i=eN(t,r),a=eN(e,r);if(i&&!Array.isArray(i)&&n!==r)break;if(a&&a.type)return{name:r,error:a};o.pop()}return{name:n}}var tb=(e,t,n,r,o)=>!o.isOnAll&&(!n&&o.isOnTouch?!(t||e):(n?r.isOnBlur:o.isOnBlur)?!e:(n?!r.isOnChange:!o.isOnChange)||e),tw=(e,t)=>!eD(eN(e,t)).length&&tr(e,t);let t_={mode:eU.onSubmit,reValidateMode:eU.onChange,shouldFocusError:!0},tk=(e,t={})=>{e.startsWith("/")&&(e=e.substring(1));let n=`https://bookings-bff.starship-staging.com/${e}`;return 0===Object.keys(t).length?n:`${n}?${new URLSearchParams(t).toString()}`},tS=({children:e,className:t,onClick:n,disabled:r,colour:o="primary"})=>{let i=`btn step-button bg-${o} border-${o} text-white hover:bg-${o}/80 disabled:text-${o}/50 disabled:border-${o}/50`+(t?" "+t:"");return r&&(i+=" disabled"),/*#__PURE__*/D.createElement("button",{disabled:r,className:i,onClick:n},e)},tx=({details:e})=>/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("h3",null,"Terms of Voucher"),/*#__PURE__*/D.createElement("p",{className:"text-sm"},e.termsAndConditions));var tE=({})=>{let e={},t={},n={},[r,o]=D.useState(!0);if(!r)return null;let{register:i,handleSubmit:a,formState:{isSubmitting:s}}=/**
 * Custom hook to manage the entire form.
 *
 * @remarks
 * [API](https://react-hook-form.com/docs/useform) • [Demo](https://codesandbox.io/s/react-hook-form-get-started-ts-5ksmm) • [Video](https://www.youtube.com/watch?v=RkXv4AXXC_4)
 *
 * @param props - form configuration and validation parameters.
 *
 * @returns methods - individual functions to manage the form state. {@link UseFormReturn}
 *
 * @example
 * ```tsx
 * function App() {
 *   const { register, handleSubmit, watch, formState: { errors } } = useForm();
 *   const onSubmit = data => console.log(data);
 *
 *   console.log(watch("example"));
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input defaultValue="test" {...register("example")} />
 *       <input {...register("exampleRequired", { required: true })} />
 *       {errors.exampleRequired && <span>This field is required</span>}
 *       <button>Submit</button>
 *     </form>
 *   );
 * }
 * ```
 */function(e={}){let t=/*@__PURE__*/O(D).useRef(),n=/*@__PURE__*/O(D).useRef(),[r,o]=/*@__PURE__*/O(D).useState({isDirty:!1,isValidating:!1,isLoading:e0(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:e0(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...function(e={},t){let n,r={...t_,...e},o={submitCount:0,isDirty:!1,isLoading:e0(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},i={},a=(eE(r.defaultValues)||eE(r.values))&&eI(r.defaultValues||r.values)||{},s=r.shouldUnregister?{}:eI(a),u={action:!1,mount:!1,watch:!1},l={mount:new Set,unMount:new Set,array:new Set,watch:new Set},c=0,d={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},f={values:to(),array:to(),state:to()},p=e.resetOptions&&e.resetOptions.keepDirtyValues,h=eG(r.mode),m=eG(r.reValidateMode),g=r.criteriaMode===eU.all,v=e=>t=>{clearTimeout(c),c=setTimeout(e,t)},y=async e=>{if(d.isValid||e){let e=r.resolver?ez((await x()).errors):await C(i,!0);e!==o.isValid&&f.state.next({isValid:e})}},b=e=>d.isValidating&&f.state.next({isValidating:e}),w=(e,t)=>{eY(o.errors,e,t),f.state.next({errors:o.errors})},_=(e,t,n,r)=>{let o=eN(i,e);if(o){let i=eN(s,e,eM(n)?eN(a,e):n);eM(i)||r&&r.defaultChecked||t?eY(s,e,t?i:th(o._f)):R(e,i),u.mount&&y()}},k=(e,t,n,r,i)=>{let s=!1,u=!1,l={name:e};if(!n||r){d.isDirty&&(u=o.isDirty,o.isDirty=l.isDirty=T(),s=u!==l.isDirty);let n=ta(eN(a,e),t);u=eN(o.dirtyFields,e),n?tr(o.dirtyFields,e):eY(o.dirtyFields,e,!0),l.dirtyFields=o.dirtyFields,s=s||d.dirtyFields&&!n!==u}if(n){let t=eN(o.touchedFields,e);t||(eY(o.touchedFields,e,n),l.touchedFields=o.touchedFields,s=s||d.touchedFields&&t!==n)}return s&&i&&f.state.next(l),s?l:{}},S=(t,r,i,a)=>{let s=eN(o.errors,t),u=d.isValid&&eL(r)&&o.isValid!==r;if(e.delayError&&i?(n=v(()=>w(t,i)))(e.delayError):(clearTimeout(c),n=null,i?eY(o.errors,t,i):tr(o.errors,t)),(i?!ta(s,i):s)||!ez(a)||u){let e={...a,...u&&eL(r)?{isValid:r}:{},errors:o.errors,name:t};o={...o,...e},f.state.next(e)}b(!1)},x=async e=>r.resolver(s,r.context,tm(e||l.mount,i,r.criteriaMode,r.shouldUseNativeValidation)),E=async e=>{let{errors:t}=await x(e);if(e)for(let n of e){let e=eN(t,n);e?eY(o.errors,n,e):tr(o.errors,n)}else o.errors=t;return t},C=async(e,t,n={valid:!0})=>{for(let i in e){let a=e[i];if(a){let{_f:e,...i}=a;if(e){let i=l.array.has(e.name),u=await tn(a,s,g,r.shouldUseNativeValidation&&!t,i);if(u[e.name]&&(n.valid=!1,t))break;t||(eN(u,e.name)?i?eJ(o.errors,u,e.name):eY(o.errors,e.name,u[e.name]):tr(o.errors,e.name))}i&&await C(i,t,n)}}return n.valid},T=(e,t)=>(e&&t&&eY(s,e,t),!ta(N(),a)),O=(e,t,n)=>e$(e,l,{...u.mount?s:eM(t)?a:eV(e)?{[e]:t}:t},n,t),R=(e,t,n={})=>{let r=eN(i,e),o=t;if(r){let n=r._f;n&&(n.disabled||eY(s,e,tp(t,n)),o=e1(n.ref)&&eS(t)?"":t,ts(n.ref)?[...n.ref.options].forEach(e=>e.selected=o.includes(e.value)):n.refs?e_(n.ref)?n.refs.length>1?n.refs.forEach(e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(o)?!!o.find(t=>t===e.value):o===e.value)):n.refs[0]&&(n.refs[0].checked=!!o):n.refs.forEach(e=>e.checked=e.value===o):eZ(n.ref)?n.ref.value="":(n.ref.value=o,n.ref.type||f.values.next({name:e,values:{...s}})))}(n.shouldDirty||n.shouldTouch)&&k(e,o,n.shouldTouch,n.shouldDirty,!0),n.shouldValidate&&M(e)},P=(e,t,n)=>{for(let r in t){let o=t[r],a=`${e}.${r}`,s=eN(i,a);!l.array.has(e)&&ti(o)&&(!s||s._f)||ek(o)?R(a,o,n):P(a,o,n)}},I=(e,n,r={})=>{let c=eN(i,e),p=l.array.has(e),h=eI(n);eY(s,e,h),p?(f.array.next({name:e,values:{...s}}),(d.isDirty||d.dirtyFields)&&r.shouldDirty&&f.state.next({name:e,dirtyFields:tf(a,s),isDirty:T(e,h)})):!c||c._f||eS(h)?R(e,h,r):P(e,h,r),eX(e,l)&&f.state.next({...o}),f.values.next({name:e,values:{...s}}),u.mount||t()},D=async e=>{let t=e.target,a=t.name,u=!0,c=eN(i,a);if(c){let p,v;let w=t.type?th(c._f):eC(e),_=e.type===eA.BLUR||e.type===eA.FOCUS_OUT,E=!tv(c._f)&&!r.resolver&&!eN(o.errors,a)&&!c._f.deps||tb(_,eN(o.touchedFields,a),o.isSubmitted,m,h),T=eX(a,l,_);eY(s,a,w),_?(c._f.onBlur&&c._f.onBlur(e),n&&n(0)):c._f.onChange&&c._f.onChange(e);let O=k(a,w,_,!1),R=!ez(O)||T;if(_||f.values.next({name:a,type:e.type,values:{...s}}),E)return d.isValid&&y(),R&&f.state.next({name:a,...T?{}:O});if(!_&&T&&f.state.next({...o}),b(!0),r.resolver){let{errors:e}=await x([a]),t=ty(o.errors,i,a),n=ty(e,i,t.name||a);p=n.error,a=n.name,v=ez(e)}else p=(await tn(c,s,g,r.shouldUseNativeValidation))[a],(u=Number.isNaN(w)||w===eN(s,a,w))&&(p?v=!1:d.isValid&&(v=await C(i,!0)));u&&(c._f.deps&&M(c._f.deps),S(a,v,p,O))}},M=async(e,t={})=>{let n,a;let s=eB(e);if(b(!0),r.resolver){let t=await E(eM(e)?e:s);n=ez(t),a=e?!s.some(e=>eN(t,e)):n}else e?((a=(await Promise.all(s.map(async e=>{let t=eN(i,e);return await C(t&&t._f?{[e]:t}:t)}))).every(Boolean))||o.isValid)&&y():a=n=await C(i);return f.state.next({...!eV(e)||d.isValid&&n!==o.isValid?{}:{name:e},...r.resolver||!e?{isValid:n}:{},errors:o.errors,isValidating:!1}),t.shouldFocus&&!a&&eK(i,e=>e&&eN(o.errors,e),e?s:l.mount),a},N=e=>{let t={...a,...u.mount?s:{}};return eM(e)?t:eV(e)?eN(t,e):e.map(e=>eN(t,e))},L=(e,t)=>({invalid:!!eN((t||o).errors,e),isDirty:!!eN((t||o).dirtyFields,e),isTouched:!!eN((t||o).touchedFields,e),error:eN((t||o).errors,e)}),A=(e,t,n)=>{let r=(eN(i,e,{_f:{}})._f||{}).ref;eY(o.errors,e,{...t,ref:r}),f.state.next({name:e,errors:o.errors,isValid:!1}),n&&n.shouldFocus&&r&&r.focus&&r.focus()},U=(e,t={})=>{for(let n of e?eB(e):l.mount)l.mount.delete(n),l.array.delete(n),t.keepValue||(tr(i,n),tr(s,n)),t.keepError||tr(o.errors,n),t.keepDirty||tr(o.dirtyFields,n),t.keepTouched||tr(o.touchedFields,n),r.shouldUnregister||t.keepDefaultValue||tr(a,n);f.values.next({values:{...s}}),f.state.next({...o,...t.keepDirty?{isDirty:T()}:{}}),t.keepIsValid||y()},j=({disabled:e,name:t,field:n,fields:r})=>{if(eL(e)){let o=e?void 0:eN(s,t,th(n?n._f:eN(r,t)._f));eY(s,t,o),k(t,o,!1,!1,!0)}},F=(e,t={})=>{let n=eN(i,e),o=eL(t.disabled);return eY(i,e,{...n||{},_f:{...n&&n._f?n._f:{ref:{name:e}},name:e,mount:!0,...t}}),l.mount.add(e),n?j({field:n,disabled:t.disabled,name:e}):_(e,!0,t.value),{...o?{disabled:t.disabled}:{},...r.progressive?{required:!!t.required,min:tg(t.min),max:tg(t.max),minLength:tg(t.minLength),maxLength:tg(t.maxLength),pattern:tg(t.pattern)}:{},name:e,onChange:D,onBlur:D,ref:o=>{if(o){F(e,t),n=eN(i,e);let r=eM(o.value)&&o.querySelectorAll&&o.querySelectorAll("input,select,textarea")[0]||o,s=tu(r),u=n._f.refs||[];(s?u.find(e=>e===r):r===n._f.ref)||(eY(i,e,{_f:{...n._f,...s?{refs:[...u.filter(tl),r,...Array.isArray(eN(a,e))?[{}]:[]],ref:{type:r.type,name:e}}:{ref:r}}}),_(e,!1,void 0,r))}else(n=eN(i,e,{}))._f&&(n._f.mount=!1),(r.shouldUnregister||t.shouldUnregister)&&!(eO(l.array,e)&&u.action)&&l.unMount.add(e)}}},z=()=>r.shouldFocusError&&eK(i,e=>e&&eN(o.errors,e),l.mount),q=(e,t)=>async n=>{n&&(n.preventDefault&&n.preventDefault(),n.persist&&n.persist());let a=eI(s);if(f.state.next({isSubmitting:!0}),r.resolver){let{errors:e,values:t}=await x();o.errors=e,a=t}else await C(i);tr(o.errors,"root"),ez(o.errors)?(f.state.next({errors:{}}),await e(a,n)):(t&&await t({...o.errors},n),z(),setTimeout(z)),f.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:ez(o.errors),submitCount:o.submitCount+1,errors:o.errors})},B=(n,r={})=>{let c=n?eI(n):a,h=eI(c),m=n&&!ez(n)?h:a;if(r.keepDefaultValues||(a=c),!r.keepValues){if(r.keepDirtyValues||p)for(let e of l.mount)eN(o.dirtyFields,e)?eY(m,e,eN(s,e)):I(e,eN(m,e));else{if(eP&&eM(n))for(let e of l.mount){let t=eN(i,e);if(t&&t._f){let e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(e1(e)){let t=e.closest("form");if(t){t.reset();break}}}}i={}}s=e.shouldUnregister?r.keepDefaultValues?eI(a):{}:eI(m),f.array.next({values:{...m}}),f.values.next({values:{...m}})}l={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},u.mount||t(),u.mount=!d.isValid||!!r.keepIsValid,u.watch=!!e.shouldUnregister,f.state.next({submitCount:r.keepSubmitCount?o.submitCount:0,isDirty:r.keepDirty?o.isDirty:!!(r.keepDefaultValues&&!ta(n,a)),isSubmitted:!!r.keepIsSubmitted&&o.isSubmitted,dirtyFields:r.keepDirtyValues?o.dirtyFields:r.keepDefaultValues&&n?tf(a,n):{},touchedFields:r.keepTouched?o.touchedFields:{},errors:r.keepErrors?o.errors:{},isSubmitSuccessful:!!r.keepIsSubmitSuccessful&&o.isSubmitSuccessful,isSubmitting:!1})},V=(e,t)=>B(e0(e)?e(s):e,t);return{control:{register:F,unregister:U,getFieldState:L,handleSubmit:q,setError:A,_executeSchema:x,_getWatch:O,_getDirty:T,_updateValid:y,_removeUnmounted:()=>{for(let e of l.unMount){let t=eN(i,e);t&&(t._f.refs?t._f.refs.every(e=>!tl(e)):!tl(t._f.ref))&&U(e)}l.unMount=new Set},_updateFieldArray:(e,t=[],n,r,l=!0,c=!0)=>{if(r&&n){if(u.action=!0,c&&Array.isArray(eN(i,e))){let t=n(eN(i,e),r.argA,r.argB);l&&eY(i,e,t)}if(c&&Array.isArray(eN(o.errors,e))){let t=n(eN(o.errors,e),r.argA,r.argB);l&&eY(o.errors,e,t),tw(o.errors,e)}if(d.touchedFields&&c&&Array.isArray(eN(o.touchedFields,e))){let t=n(eN(o.touchedFields,e),r.argA,r.argB);l&&eY(o.touchedFields,e,t)}d.dirtyFields&&(o.dirtyFields=tf(a,s)),f.state.next({name:e,isDirty:T(e,t),dirtyFields:o.dirtyFields,errors:o.errors,isValid:o.isValid})}else eY(s,e,t)},_updateDisabledField:j,_getFieldArray:t=>eD(eN(u.mount?s:a,t,e.shouldUnregister?eN(a,t,[]):[])),_reset:B,_resetDefaultValues:()=>e0(r.defaultValues)&&r.defaultValues().then(e=>{V(e,r.resetOptions),f.state.next({isLoading:!1})}),_updateFormState:e=>{o={...o,...e}},_subjects:f,_proxyFormState:d,get _fields(){return i},get _formValues(){return s},get _state(){return u},set _state(value){u=value},get _defaultValues(){return a},get _names(){return l},set _names(value){l=value},get _formState(){return o},set _formState(value){o=value},get _options(){return r},set _options(value){r={...r,...value}}},trigger:M,register:F,handleSubmit:q,watch:(e,t)=>e0(e)?f.values.subscribe({next:n=>e(O(void 0,t),n)}):O(e,t,!0),setValue:I,getValues:N,reset:V,resetField:(e,t={})=>{eN(i,e)&&(eM(t.defaultValue)?I(e,eN(a,e)):(I(e,t.defaultValue),eY(a,e,t.defaultValue)),t.keepTouched||tr(o.touchedFields,e),t.keepDirty||(tr(o.dirtyFields,e),o.isDirty=t.defaultValue?T(e,eN(a,e)):T()),!t.keepError&&(tr(o.errors,e),d.isValid&&y()),f.state.next({...o}))},clearErrors:e=>{e&&eB(e).forEach(e=>tr(o.errors,e)),f.state.next({errors:e?o.errors:{}})},unregister:U,setError:A,setFocus:(e,t={})=>{let n=eN(i,e),r=n&&n._f;if(r){let e=r.refs?r.refs[0]:r.ref;e.focus&&(e.focus(),t.shouldSelect&&e.select())}},getFieldState:L}}(e,()=>o(e=>({...e}))),formState:r});let i=t.current.control;return i._options=e,!function(e){let t=/*@__PURE__*/O(D).useRef(e);t.current=e,/*@__PURE__*/O(D).useEffect(()=>{let n=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{n&&n.unsubscribe()}},[e.disabled])}({subject:i._subjects.state,next:e=>{eq(e,i._proxyFormState,i._updateFormState,!0)&&o({...i._formState})}}),/*@__PURE__*/O(D).useEffect(()=>{e.values&&!ta(e.values,n.current)?(i._reset(e.values,i._options.resetOptions),n.current=e.values):i._resetDefaultValues()},[e.values,i]),/*@__PURE__*/O(D).useEffect(()=>{i._state.mount||(i._updateValid(),i._state.mount=!0),i._state.watch&&(i._state.watch=!1,i._subjects.state.next({...i._formState})),i._removeUnmounted()}),t.current.formState=eF(r,i),t.current}(),[u,l]=D.useState({busy:!1,complete:!1,voucher:null,error:null,responseStatusCode:0});async function c(r){let o={...r,bookingLink:`${n?.origin}/${e?.slug}`},i=await fetch(tk(`campaigns/${t?.campaign}/voucher?locationID=${e?.identifier}`),{method:"POST",headers:{Accept:"application/json","Content-type":"application/json"},body:JSON.stringify(o)});i.json().then(e=>{i.ok?l({busy:!1,complete:!0,voucher:e.voucher}):l({busy:!1,error:e,responseStatusCode:i.status})})}async function d(n){// @ts-ignore
l({busy:!0});try{""!==t.campaign&&c(n).then(()=>{let t={item_name:e?.name,affiliation:"Booking Flow"};console.log(t);// navigate(`/${landingPage?.slug}`)
})}catch(e){}}return!0===u.complete?/*#__PURE__*/D.createElement("div",{className:"container"},/*#__PURE__*/D.createElement("h2",null,"Voucher Sent!"),/*#__PURE__*/D.createElement("p",{className:"text-md"},"Good news! We've sent your voucher to the email provided!"),u.voucher&&/*#__PURE__*/D.createElement("div",{className:"col-12 mt-3"},/*#__PURE__*/D.createElement(tx,{details:u.voucher}))):409===u.responseStatusCode?/*#__PURE__*/D.createElement("div",{className:"container"},/*#__PURE__*/D.createElement("h2",{className:"mt-3"},"Uh-oh!"),/*#__PURE__*/D.createElement("p",null,"It seems that you already received this voucher. Please get in touch if this doesn't seem right:\xa0",/*#__PURE__*/D.createElement("a",{href:"/help",className:"underline font-serif tracking-wide",onClick:()=>o(!1)},"contact us"))):/*#__PURE__*/D.createElement("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.5)",zIndex:9999}},/*#__PURE__*/D.createElement("main",{className:"flex-grow flex flex-col justify-center container relative"},/*#__PURE__*/D.createElement("div",{className:"w-full"},/*#__PURE__*/D.createElement("div",{className:"cms-content text-center md:text-left"},/*#__PURE__*/D.createElement("h2",null,"Get Your Voucher"),/*#__PURE__*/D.createElement("p",null,"To receive your voucher, we just need a few details from you."),/*#__PURE__*/D.createElement("h3",{className:`bar-title border-l-4 border-solid border-${e?.colour}`},"Contact Info"),/*#__PURE__*/D.createElement("form",{onSubmit:a(d)},/*#__PURE__*/D.createElement("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2"},/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("label",{htmlFor:"first_name"},"First Name*"),/*#__PURE__*/D.createElement("input",{...i("firstName",{required:!0,minLength:2,maxLength:30,validate:e=>e.trim().length>=2}),type:"text",className:"form-input",id:"firstName"})),/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("label",{htmlFor:"last_name"},"Last Name*"),/*#__PURE__*/D.createElement("input",{...i("lastName",{required:!0,minLength:2,maxLength:30,validate:e=>e.trim().length>=2}),type:"text",className:"form-input",id:"lastName"})),/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("label",{htmlFor:"email"},"Email*"),/*#__PURE__*/D.createElement("input",{...i("emailAddress",{required:!0}),type:"email",className:"form-input",id:"email"}))),/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("p",null,"* Required Field")),/*#__PURE__*/D.createElement("div",{className:"flex gap-x-6 gap-y-2 items-center flex-wrap justify-center lg:justify-start"},/*#__PURE__*/D.createElement("div",{className:"form-check"},/*#__PURE__*/D.createElement("input",{type:"checkbox",...i("terms",{required:!0}),className:"form-check-input",id:"terms"})," ",/*#__PURE__*/D.createElement("label",{htmlFor:"terms",className:"form-check-label"},"I confirm that I have read & agreed with the"," ",/*#__PURE__*/D.createElement("a",{href:e?.privacyPolicy,target:"_blank",rel:"noreferrer"},"Privacy Policy"),"*")),/*#__PURE__*/D.createElement(tS,{className:"btn mt-2 md:mt-0",type:"submit",colour:e?.colour,disabled:u.busy||s},s||u.busy?"Sending Voucher...":"Get My Voucher")),u.error&&409!==u.responseStatusCode&&/*#__PURE__*/D.createElement("div",{className:`alert mt-5 bg-${e?.colour}/20`},"There was a problem sending your voucher. Please check your details and try again."))))))},D=I("exYeM");let tC="undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var tT={randomUUID:tC};let tO=new Uint8Array(16);var tR=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,tP=function(e){return"string"==typeof e&&tR.test(e)};/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */let tI=[];for(let e=0;e<256;++e)tI.push((e+256).toString(16).slice(1));var tD=function(t,n,r){if(tT.randomUUID&&!n&&!t)return tT.randomUUID();t=t||{};let o=t.random||(t.rng||function(){// lazy load so that environments that need to polyfill have a chance to do so
if(!e&&!// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(tO)})();// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=o[e];return n}return function(e,t=0){// Note: Be careful editing this code!  It's been tuned for performance
// and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
return tI[e[t+0]]+tI[e[t+1]]+tI[e[t+2]]+tI[e[t+3]]+"-"+tI[e[t+4]]+tI[e[t+5]]+"-"+tI[e[t+6]]+tI[e[t+7]]+"-"+tI[e[t+8]]+tI[e[t+9]]+"-"+tI[e[t+10]]+tI[e[t+11]]+tI[e[t+12]]+tI[e[t+13]]+tI[e[t+14]]+tI[e[t+15]]}(o)},D=I("exYeM");let tM=({debug:e,children:t})=>{let n=(...t)=>{e&&console.log(...t)};return(0,D.useEffect)(()=>{e&&n("LoggingProvider: In Debug Mode")}),/*@__PURE__*/O(D).createElement(tN.Provider,{value:{log:n,warn:(...t)=>{e&&console.warn(...t)},error:(...t)=>{e&&console.error(...t);// throw new Error(...message)
},info:(...t)=>{e&&console.info(...t)}}},t)},tN=/*#__PURE__*/(0,D.createContext)({log:()=>{},warn:()=>{},error:()=>{},info:()=>{}}),tL=()=>(0,D.useContext)(tN);var tA={},tU={DEBUG:!1,LIB_VERSION:"2.47.0"};if("undefined"==typeof window){var tj={hostname:""};x={navigator:{userAgent:""},document:{location:tj,referrer:""},screen:{width:0,height:0},location:tj}}else x=window;/*
 * Saved references to long variable names, so that closure compiler can
 * minimize file size.
 */var tF=Array.prototype,tz=Function.prototype,tq=Object.prototype,tB=tF.slice,tV=tq.toString,t$=tq.hasOwnProperty,tW=x.console,tH=x.navigator,tY=x.document,tQ=x.opera,tK=x.screen,tG=tH.userAgent,tX=tz.bind,tJ=tF.forEach,tZ=tF.indexOf,t0=tF.map,t1=Array.isArray,t2={},t3={trim:function(e){// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}},t4={/** @type {function(...*)} */log:function(){if(tU.DEBUG&&!t3.isUndefined(tW)&&tW)try{tW.log.apply(tW,arguments)}catch(e){t3.each(arguments,function(e){tW.log(e)})}},/** @type {function(...*)} */warn:function(){if(tU.DEBUG&&!t3.isUndefined(tW)&&tW){var e=["Mixpanel warning:"].concat(t3.toArray(arguments));try{tW.warn.apply(tW,e)}catch(t){t3.each(e,function(e){tW.warn(e)})}}},/** @type {function(...*)} */error:function(){if(tU.DEBUG&&!t3.isUndefined(tW)&&tW){var e=["Mixpanel error:"].concat(t3.toArray(arguments));try{tW.error.apply(tW,e)}catch(t){t3.each(e,function(e){tW.error(e)})}}},/** @type {function(...*)} */critical:function(){if(!t3.isUndefined(tW)&&tW){var e=["Mixpanel error:"].concat(t3.toArray(arguments));try{tW.error.apply(tW,e)}catch(t){t3.each(e,function(e){tW.error(e)})}}}},t6=function(e,t){return function(){return arguments[0]="["+t+"] "+arguments[0],e.apply(t4,arguments)}},t5=function(e){return{log:t6(t4.log,e),error:t6(t4.error,e),critical:t6(t4.critical,e)}};// UNDERSCORE
// Embed part of the Underscore Library
t3.bind=function(e,t){var n,r;if(tX&&e.bind===tX)return tX.apply(e,tB.call(arguments,1));if(!t3.isFunction(e))throw TypeError();return n=tB.call(arguments,2),r=function(){if(!(this instanceof r))return e.apply(t,n.concat(tB.call(arguments)));var o={};o.prototype=e.prototype;var i=new o;o.prototype=null;var a=e.apply(i,n.concat(tB.call(arguments)));return Object(a)===a?a:i}},/**
 * @param {*=} obj
 * @param {function(...*)=} iterator
 * @param {Object=} context
 */t3.each=function(e,t,n){if(null!=e){if(tJ&&e.forEach===tJ)e.forEach(t,n);else if(e.length===+e.length){for(var r=0,o=e.length;r<o;r++)if(r in e&&t.call(n,e[r],r,e)===t2)return}else for(var i in e)if(t$.call(e,i)&&t.call(n,e[i],i,e)===t2)return}},t3.extend=function(e){return t3.each(tB.call(arguments,1),function(t){for(var n in t)void 0!==t[n]&&(e[n]=t[n])}),e},t3.isArray=t1||function(e){return"[object Array]"===tV.call(e)},// from a comment on http://dbj.org/dbj/?p=286
// fails on only one very rare and deliberate custom object:
// var bomb = { toString : undefined, valueOf: function(o) { return "function BOMBA!"; }};
t3.isFunction=function(e){try{return/^\s*\bfunction\b/.test(e)}catch(e){return!1}},t3.isArguments=function(e){return!!(e&&t$.call(e,"callee"))},t3.toArray=function(e){return e?e.toArray?e.toArray():t3.isArray(e)||t3.isArguments(e)?tB.call(e):t3.values(e):[]},t3.map=function(e,t,n){if(t0&&e.map===t0)return e.map(t,n);var r=[];return t3.each(e,function(e){r.push(t.call(n,e))}),r},t3.keys=function(e){var t=[];return null===e||t3.each(e,function(e,n){t[t.length]=n}),t},t3.values=function(e){var t=[];return null===e||t3.each(e,function(e){t[t.length]=e}),t},t3.include=function(e,t){var n=!1;return null===e?n:tZ&&e.indexOf===tZ?-1!=e.indexOf(t):(t3.each(e,function(e){if(n||(n=e===t))return t2}),n)},t3.includes=function(e,t){return -1!==e.indexOf(t)},// Underscore Addons
t3.inherit=function(e,t){return e.prototype=new t,e.prototype.constructor=e,e.superclass=t.prototype,e},t3.isObject=function(e){return e===Object(e)&&!t3.isArray(e)},t3.isEmptyObject=function(e){if(t3.isObject(e)){for(var t in e)if(t$.call(e,t))return!1;return!0}return!1},t3.isUndefined=function(e){return void 0===e},t3.isString=function(e){return"[object String]"==tV.call(e)},t3.isDate=function(e){return"[object Date]"==tV.call(e)},t3.isNumber=function(e){return"[object Number]"==tV.call(e)},t3.isElement=function(e){return!!(e&&1===e.nodeType)},t3.encodeDates=function(e){return t3.each(e,function(t,n){t3.isDate(t)?e[n]=t3.formatDate(t):t3.isObject(t)&&(e[n]=t3.encodeDates(t));// recurse
}),e},t3.timestamp=function(){return Date.now=Date.now||function(){return+new Date},Date.now()},t3.formatDate=function(e){// YYYY-MM-DDTHH:MM:SS in UTC
function t(e){return e<10?"0"+e:e}return e.getUTCFullYear()+"-"+t(e.getUTCMonth()+1)+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+":"+t(e.getUTCMinutes())+":"+t(e.getUTCSeconds())},t3.strip_empty_properties=function(e){var t={};return t3.each(e,function(e,n){t3.isString(e)&&e.length>0&&(t[n]=e)}),t},/*
 * this function returns a copy of object after truncating it.  If
 * passed an Array or Object it will iterate through obj and
 * truncate all the values recursively.
 */t3.truncate=function(e,t){var n;return"string"==typeof e?n=e.slice(0,t):t3.isArray(e)?(n=[],t3.each(e,function(e){n.push(t3.truncate(e,t))})):t3.isObject(e)?(n={},t3.each(e,function(e,r){n[r]=t3.truncate(e,t)})):n=e,n},t3.JSONEncode=function(e){var t=function(e){var t=/[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};// eslint-disable-line no-control-regex
return t.lastIndex=0,t.test(e)?'"'+e.replace(t,function(e){var t=n[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'},n=function(e,r){var o="",i=0,a="",s="",u=0,l=o,c=[],d=r[e];// What happens next depends on the value's type.
switch(d&&"object"==typeof d&&"function"==typeof d.toJSON&&(d=d.toJSON(e)),typeof d){case"string":return t(d);case"number":// JSON numbers must be finite. Encode non-finite numbers as null.
return isFinite(d)?String(d):"null";case"boolean":case"null":// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.
return String(d);case"object":// If the type is 'object', we might be dealing with an object or an array or
// null.
// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.
if(!d)return"null";// Is the value an array?
if(// Make an array to hold the partial results of stringifying this object value.
o+="    ",c=[],"[object Array]"===tV.apply(d)){for(i=0,// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.
u=d.length;i<u;i+=1)c[i]=n(i,d)||"null";return(// Join all of the elements together, separated with commas, and wrap them in
// brackets.
s=0===c.length?"[]":o?"[\n"+o+c.join(",\n"+o)+"\n"+l+"]":"["+c.join(",")+"]",o=l,s)}// Iterate through all of the keys in the object.
for(a in d)t$.call(d,a)&&(s=n(a,d))&&c.push(t(a)+(o?": ":":")+s);return(// Join all of the member texts together, separated with commas,
// and wrap them in braces.
s=0===c.length?"{}":o?"{"+c.join(",")+l+"}":"{"+c.join(",")+"}",o=l,s)}};// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.
return n("",{"":e})},/**
 * From https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
 * Slightly modified to throw a real Error rather than a POJO
 */t3.JSONDecode=(s={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"	"},u=function(e){var t=SyntaxError(e);throw t.at=r,t.text=i,t},l=function(e){return e&&e!==o&&u("Expected '"+e+"' instead of '"+o+"'"),// Get the next character. When there are no more characters,
// return the empty string.
o=i.charAt(r),r+=1,o},c=function(){// Parse a number value.
var e,t="";for("-"===o&&(t="-",l("-"));o>="0"&&o<="9";)t+=o,l();if("."===o)for(t+=".";l()&&o>="0"&&o<="9";)t+=o;if("e"===o||"E"===o)for(t+=o,l(),("-"===o||"+"===o)&&(t+=o,l());o>="0"&&o<="9";)t+=o,l();if(isFinite(e=+t))return e;u("Bad number")},d=function(){// Parse a string value.
var e,t,n,r="";// When parsing for string values, we must look for " and \ characters.
if('"'===o)for(;l();){if('"'===o)return l(),r;if("\\"===o){if(l(),"u"===o){for(t=0,n=0;t<4&&isFinite(e=parseInt(l(),16));t+=1)n=16*n+e;r+=String.fromCharCode(n)}else if("string"==typeof s[o])r+=s[o];else break}else r+=o}u("Bad string")},f=function(){// Skip whitespace.
for(;o&&o<=" ";)l()},p=function(){// true, false, or null.
switch(o){case"t":return l("t"),l("r"),l("u"),l("e"),!0;case"f":return l("f"),l("a"),l("l"),l("s"),l("e"),!1;case"n":return l("n"),l("u"),l("l"),l("l"),null}u('Unexpected "'+o+'"')},h=function(){// Parse an array value.
var e=[];if("["===o){if(l("["),f(),"]"===o)return l("]"),e;// empty array
for(;o;){if(e.push(a()),f(),"]"===o)return l("]"),e;l(","),f()}}u("Bad array")},m=function(){// Parse an object value.
var e,t={};if("{"===o){if(l("{"),f(),"}"===o)return l("}"),t;// empty object
for(;o;){if(e=d(),f(),l(":"),Object.hasOwnProperty.call(t,e)&&u('Duplicate key "'+e+'"'),t[e]=a(),f(),"}"===o)return l("}"),t;l(","),f()}}u("Bad object")},a=function(){switch(// Parse a JSON value. It could be an object, an array, a string,
// a number, or a word.
f(),o){case"{":return m();case"[":return h();case'"':return d();case"-":return c();default:return o>="0"&&o<="9"?c():p()}},function(e){var t;return i=e,r=0,o=" ",t=a(),f(),o&&u("Syntax error"),t}),t3.base64Encode=function(e){var t,n,r,o,i,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s=0,u=0,l="",c=[];if(!e)return e;e=t3.utf8Encode(e);do t=(i=e.charCodeAt(s++)<<16|e.charCodeAt(s++)<<8|e.charCodeAt(s++))>>18&63,n=i>>12&63,r=i>>6&63,o=63&i,// use hexets to index into b64, and append result to encoded string
c[u++]=a.charAt(t)+a.charAt(n)+a.charAt(r)+a.charAt(o);while(s<e.length)switch(l=c.join(""),e.length%3){case 1:l=l.slice(0,-2)+"==";break;case 2:l=l.slice(0,-1)+"="}return l},t3.utf8Encode=function(e){e=(e+"").replace(/\r\n/g,"\n").replace(/\r/g,"\n");var t,n,r,o="",i=0;for(r=0,t=n=0,i=e.length;r<i;r++){var a=e.charCodeAt(r),s=null;a<128?n++:s=a>127&&a<2048?String.fromCharCode(a>>6|192,63&a|128):String.fromCharCode(a>>12|224,a>>6&63|128,63&a|128),null!==s&&(n>t&&(o+=e.substring(t,n)),o+=s,t=n=r+1)}return n>t&&(o+=e.substring(t,e.length)),o},t3.UUID=(g=function(){var e,t=1*new Date;// cross-browser version of Date.now()
if(x.performance&&x.performance.now)e=x.performance.now();else // this while loop figures how many browser ticks go by
// before 1*new Date() returns a new number, ie the amount
// of ticks that go by per millisecond
for(// fall back to busy loop
e=0;t==1*new Date;)e++;return t.toString(16)+Math.floor(e).toString(16)},v=function(){var e,t,n=[],r=0;function o(e,t){var r,o=0;for(r=0;r<t.length;r++)o|=n[r]<<8*r;return e^o}for(e=0;e<tG.length;e++)t=tG.charCodeAt(e),n.unshift(255&t),n.length>=4&&(r=o(r,n),n=[]);return n.length>0&&(r=o(r,n)),r.toString(16)},function(){var e=(tK.height*tK.width).toString(16);return g()+"-"+Math.random().toString(16).replace(".","")+"-"+v()+"-"+e+"-"+g()});// _.isBlockedUA()
// This is to block various web spiders from executing our JS and
// sending false tracking data
var t8=["ahrefsbot","baiduspider","bingbot","bingpreview","facebookexternal","petalbot","pinterest","screaming frog","yahoo! slurp","yandexbot",// a whole bunch of goog-specific crawlers
// https://developers.google.com/search/docs/advanced/crawling/overview-google-crawlers
"adsbot-google","apis-google","duplexweb-google","feedfetcher-google","google favicon","google web preview","google-read-aloud","googlebot","googleweblight","mediapartners-google","storebot-google"];t3.isBlockedUA=function(e){var t;for(t=0,e=e.toLowerCase();t<t8.length;t++)if(-1!==e.indexOf(t8[t]))return!0;return!1},/**
 * @param {Object=} formdata
 * @param {string=} arg_separator
 */t3.HTTPBuildQuery=function(e,t){var n,r,o=[];return t3.isUndefined(t)&&(t="&"),t3.each(e,function(e,t){n=encodeURIComponent(e.toString()),r=encodeURIComponent(t),o[o.length]=r+"="+n}),o.join(t)},t3.getQueryParam=function(e,t){var n="[\\?&]"+// Expects a raw URL
(t=t.replace(/[[]/,"\\[").replace(/[\]]/,"\\]"))+"=([^&#]*)",r=new RegExp(n).exec(e);if(null===r||r&&"string"!=typeof r[1]&&r[1].length)return"";var o=r[1];try{o=decodeURIComponent(o)}catch(e){t4.error("Skipping decoding for malformed query param: "+o)}return o.replace(/\+/g," ")},// _.cookie
// Methods partially borrowed from quirksmode.org/js/cookies.html
t3.cookie={get:function(e){for(var t=e+"=",n=tY.cookie.split(";"),r=0;r<n.length;r++){for(var o=n[r];" "==o.charAt(0);)o=o.substring(1,o.length);if(0===o.indexOf(t))return decodeURIComponent(o.substring(t.length,o.length))}return null},parse:function(e){var t;try{t=t3.JSONDecode(t3.cookie.get(e))||{}}catch(e){// noop
}return t},set_seconds:function(e,t,n,r,o,i,a){var s="",u="",l="";if(a)s="; domain="+a;else if(r){var c=na(tY.location.hostname);s=c?"; domain=."+c:""}if(n){var d=new Date;d.setTime(d.getTime()+1e3*n),u="; expires="+d.toGMTString()}i&&(o=!0,l="; SameSite=None"),o&&(l+="; secure"),tY.cookie=e+"="+encodeURIComponent(t)+u+"; path=/"+s+l},set:function(e,t,n,r,o,i,a){var s="",u="",l="";if(a)s="; domain="+a;else if(r){var c=na(tY.location.hostname);s=c?"; domain=."+c:""}if(n){var d=new Date;d.setTime(d.getTime()+864e5*n),u="; expires="+d.toGMTString()}i&&(o=!0,l="; SameSite=None"),o&&(l+="; secure");var f=e+"="+encodeURIComponent(t)+u+"; path=/"+s+l;return tY.cookie=f,f},remove:function(e,t,n){t3.cookie.set(e,"",-1,t,!1,!1,n)}};var t7=null,t9=function(e,t){if(null!==t7&&!t)return t7;var n=!0;try{e=e||window.localStorage;var r="__mplss_"+nr(8);e.setItem(r,"xyz"),"xyz"!==e.getItem(r)&&(n=!1),e.removeItem(r)}catch(e){n=!1}return t7=n,n};// _.localStorage
t3.localStorage={is_supported:function(e){var t=t9(null,e);return t||t4.error("localStorage unsupported; falling back to cookie store"),t},error:function(e){t4.error("localStorage error: "+e)},get:function(e){try{return window.localStorage.getItem(e)}catch(e){t3.localStorage.error(e)}return null},parse:function(e){try{return t3.JSONDecode(t3.localStorage.get(e))||{}}catch(e){// noop
}return null},set:function(e,t){try{window.localStorage.setItem(e,t)}catch(e){t3.localStorage.error(e)}},remove:function(e){try{window.localStorage.removeItem(e)}catch(e){t3.localStorage.error(e)}}},t3.register_event=function(){function e(t){return t&&(t.preventDefault=e.preventDefault,t.stopPropagation=e.stopPropagation),t}return e.preventDefault=function(){this.returnValue=!1},e.stopPropagation=function(){this.cancelBubble=!0},function(t,n,r,o,i){if(!t){t4.error("No valid element provided to register_event");return}if(t.addEventListener&&!o)t.addEventListener(n,r,!!i);else{var a="on"+n,s=t[a];t[a]=function(n){// this basically happens in firefox whenever another script
// overwrites the onload callback and doesn't pass the event
// object to previously defined callbacks.  All the browsers
// that don't define window.event implement addEventListener
// so the dom_loaded handler will still be fired as usual.
if(n=n||e(window.event)){var o,i,a=!0;return t3.isFunction(s)&&(o=s(n)),i=r.call(t,n),(!1===o||!1===i)&&(a=!1),a}}}}}();var ne=RegExp('^(\\w*)\\[(\\w+)([=~\\|\\^\\$\\*]?)=?"?([^\\]"]*)"?\\]$');t3.dom_query=function(){/* document.getElementsBySelector(selector)
    - returns an array of element objects from the current document
    matching the CSS selector. Selectors can contain element names,
    class names and ids and can be nested. For example:

    elements = document.getElementsBySelector('div#main p a.external')

    Will return an array of all 'a' elements with 'external' in their
    class attribute that are contained inside 'p' elements that are
    contained inside the 'div' element which has id="main"

    New in version 0.4: Support for CSS2 and CSS3 attribute selectors:
    See http://www.w3.org/TR/css3-selectors/#attribute-selectors

    Version 0.4 - Simon Willison, March 25th 2003
    -- Works in Phoenix 0.5, Mozilla 1.3, Opera 7, Internet Explorer 6, Internet Explorer 5 on Windows
    -- Opera 7 fails

    Version 0.5 - Carl Sverre, Jan 7th 2013
    -- Now uses jQuery-esque `hasClass` for testing class name
    equality.  This fixes a bug related to '-' characters being
    considered not part of a 'word' in regex.
    */function e(e){// Returns all children of element. Workaround required for IE5/Windows. Ugh.
return e.all?e.all:e.getElementsByTagName("*")}var t=/[\t\r\n]/g;function n(n){// Attempt to fail gracefully in lesser browsers
if(!tY.getElementsByTagName)return[];// Split selector in to tokens
var r=n.split(" "),o=[tY];for(h=0;h<r.length;h++){if((l=r[h].replace(/^\s+/,"").replace(/\s+$/,"")).indexOf("#")>-1){d=// Token is an ID selector
(c=l.split("#"))[0];var i=c[1],a=tY.getElementById(i);if(!a||d&&a.nodeName.toLowerCase()!=d)return[];// Set currentContext to contain just this element
o=[a];continue;// Skip to next token
}if(l.indexOf(".")>-1){d=// Token contains a class selector
(c=l.split("."))[0];var s=c[1];for(d||(d="*"),// Get elements matching tag, filter them for class selector
f=[],p=0,m=0;m<o.length;m++)for(g=0,v="*"==d?e(o[m]):o[m].getElementsByTagName(d);g<v.length;g++)f[p++]=v[g];for(m=0,o=[],y=0;m<f.length;m++)f[m].className&&t3.isString(f[m].className)&&(" "+f[m].className+" ").replace(t," ").indexOf(" "+s+" ")>=0&&(o[y++]=f[m]);continue;// Skip to next token
}// Code to deal with attribute selectors
var u=l.match(ne);if(u){d=u[1];var l,c,d,f,p,h,m,g,v,y,b,w=u[2],_=u[3],k=u[4];for(d||(d="*"),// Grab all of the tagName elements within current context
f=[],p=0,m=0;m<o.length;m++)for(g=0,v="*"==d?e(o[m]):o[m].getElementsByTagName(d);g<v.length;g++)f[p++]=v[g];switch(o=[],y=0,_){case"=":b=function(e){return e.getAttribute(w)==k};break;case"~":b=function(e){return e.getAttribute(w).match(RegExp("\\b"+k+"\\b"))};break;case"|":b=function(e){return e.getAttribute(w).match(RegExp("^"+k+"-?"))};break;case"^":b=function(e){return 0===e.getAttribute(w).indexOf(k)};break;case"$":b=function(e){return e.getAttribute(w).lastIndexOf(k)==e.getAttribute(w).length-k.length};break;case"*":b=function(e){return e.getAttribute(w).indexOf(k)>-1};break;default:// Just test for existence of attribute
b=function(e){return e.getAttribute(w)}}for(m=0,o=[],y=0;m<f.length;m++)b(f[m])&&(o[y++]=f[m]);continue;// Skip to next token
}for(m=0,// If we get here, token is JUST an element (not a class or ID selector)
d=l,f=[],p=0;m<o.length;m++)for(g=0,v=o[m].getElementsByTagName(d);g<v.length;g++)f[p++]=v[g];o=f}return o}return function(e){return t3.isElement(e)?[e]:t3.isObject(e)&&!t3.isUndefined(e.length)?e:n.call(this,e)}}();var nt=["utm_source","utm_medium","utm_campaign","utm_content","utm_term"],nn=["dclid","fbclid","gclid","ko_click_id","li_fat_id","msclkid","ttclid","twclid","wbraid"];t3.info={campaignParams:function(e){var t="",n={};return t3.each(nt,function(r){(t=t3.getQueryParam(tY.URL,r)).length?n[r]=t:void 0!==e&&(n[r]=e)}),n},clickParams:function(){var e="",t={};return t3.each(nn,function(n){(e=t3.getQueryParam(tY.URL,n)).length&&(t[n]=e)}),t},marketingParams:function(){return t3.extend(t3.info.campaignParams(),t3.info.clickParams())},searchEngine:function(e){return 0===e.search("https?://(.*)google.([^/?]*)")?"google":0===e.search("https?://(.*)bing.com")?"bing":0===e.search("https?://(.*)yahoo.com")?"yahoo":0===e.search("https?://(.*)duckduckgo.com")?"duckduckgo":null},searchInfo:function(e){var t=t3.info.searchEngine(e),n="yahoo"!=t?"q":"p",r={};if(null!==t){r.$search_engine=t;var o=t3.getQueryParam(e,n);o.length&&(r.mp_keyword=o)}return r},/**
     * This function detects which browser is running this script.
     * The order of the checks are important since many user agents
     * include key words used in later checks.
     */browser:function(e,t,n){if(t=t||"",n||t3.includes(e," OPR/"))return t3.includes(e,"Mini")?"Opera Mini":"Opera";if(/(BlackBerry|PlayBook|BB10)/i.test(e))return"BlackBerry";if(t3.includes(e,"IEMobile")||t3.includes(e,"WPDesktop"))return"Internet Explorer Mobile";if(t3.includes(e,"SamsungBrowser/"))return"Samsung Internet";if(t3.includes(e,"Edge")||t3.includes(e,"Edg/"))return"Microsoft Edge";if(t3.includes(e,"FBIOS"))return"Facebook Mobile";if(t3.includes(e,"Chrome"))return"Chrome";else if(t3.includes(e,"CriOS"))return"Chrome iOS";else if(t3.includes(e,"UCWEB")||t3.includes(e,"UCBrowser"))return"UC Browser";else if(t3.includes(e,"FxiOS"))return"Firefox iOS";else if(t3.includes(t,"Apple"))return t3.includes(e,"Mobile")?"Mobile Safari":"Safari";else if(t3.includes(e,"Android"))return"Android Mobile";else if(t3.includes(e,"Konqueror"))return"Konqueror";else if(t3.includes(e,"Firefox"))return"Firefox";else if(t3.includes(e,"MSIE")||t3.includes(e,"Trident/"))return"Internet Explorer";else if(t3.includes(e,"Gecko"))return"Mozilla";else return""},/**
     * This function detects which browser version is running this script,
     * parsing major and minor version (e.g., 42.1). User agent strings from:
     * http://www.useragentstring.com/pages/useragentstring.php
     */browserVersion:function(e,t,n){var r={"Internet Explorer Mobile":/rv:(\d+(\.\d+)?)/,"Microsoft Edge":/Edge?\/(\d+(\.\d+)?)/,Chrome:/Chrome\/(\d+(\.\d+)?)/,"Chrome iOS":/CriOS\/(\d+(\.\d+)?)/,"UC Browser":/(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,Safari:/Version\/(\d+(\.\d+)?)/,"Mobile Safari":/Version\/(\d+(\.\d+)?)/,Opera:/(Opera|OPR)\/(\d+(\.\d+)?)/,Firefox:/Firefox\/(\d+(\.\d+)?)/,"Firefox iOS":/FxiOS\/(\d+(\.\d+)?)/,Konqueror:/Konqueror:(\d+(\.\d+)?)/,BlackBerry:/BlackBerry (\d+(\.\d+)?)/,"Android Mobile":/android\s(\d+(\.\d+)?)/,"Samsung Internet":/SamsungBrowser\/(\d+(\.\d+)?)/,"Internet Explorer":/(rv:|MSIE )(\d+(\.\d+)?)/,Mozilla:/rv:(\d+(\.\d+)?)/}[t3.info.browser(e,t,n)];if(void 0===r)return null;var o=e.match(r);return o?parseFloat(o[o.length-2]):null},os:function(){if(/Windows/i.test(tG))return/Phone/.test(tG)||/WPDesktop/.test(tG)?"Windows Phone":"Windows";if(/(iPhone|iPad|iPod)/.test(tG))return"iOS";if(/Android/.test(tG))return"Android";if(/(BlackBerry|PlayBook|BB10)/i.test(tG))return"BlackBerry";if(/Mac/i.test(tG))return"Mac OS X";if(/Linux/.test(tG))return"Linux";if(/CrOS/.test(tG))return"Chrome OS";else return""},device:function(e){return/Windows Phone/i.test(e)||/WPDesktop/.test(e)?"Windows Phone":/iPad/.test(e)?"iPad":/iPod/.test(e)?"iPod Touch":/iPhone/.test(e)?"iPhone":/(BlackBerry|PlayBook|BB10)/i.test(e)?"BlackBerry":/Android/.test(e)?"Android":""},referringDomain:function(e){var t=e.split("/");return t.length>=3?t[2]:""},properties:function(){return t3.extend(t3.strip_empty_properties({$os:t3.info.os(),$browser:t3.info.browser(tG,tH.vendor,tQ),$referrer:tY.referrer,$referring_domain:t3.info.referringDomain(tY.referrer),$device:t3.info.device(tG)}),{$current_url:x.location.href,$browser_version:t3.info.browserVersion(tG,tH.vendor,tQ),$screen_height:tK.height,$screen_width:tK.width,mp_lib:"web",$lib_version:tU.LIB_VERSION,$insert_id:nr(),time:t3.timestamp()/1e3// epoch time in seconds
})},people_properties:function(){return t3.extend(t3.strip_empty_properties({$os:t3.info.os(),$browser:t3.info.browser(tG,tH.vendor,tQ)}),{$browser_version:t3.info.browserVersion(tG,tH.vendor,tQ)})},mpPageViewProperties:function(){return t3.strip_empty_properties({current_page_title:tY.title,current_domain:x.location.hostname,current_url_path:x.location.pathname,current_url_protocol:x.location.protocol,current_url_search:x.location.search})}};var nr=function(e){var t=Math.random().toString(36).substring(2,10)+Math.random().toString(36).substring(2,10);return e?t.substring(0,e):t},no=/[a-z0-9][a-z0-9-]*\.[a-z]+$/i,ni=/[a-z0-9][a-z0-9-]+\.[a-z.]{2,6}$/i,na=function(e){var t=ni,n=e.split("."),r=n[n.length-1];(r.length>4||"com"===r||"org"===r)&&(t=no);var o=e.match(t);return o?o[0]:""},ns=null,nu=null;"undefined"!=typeof JSON&&(ns=JSON.stringify,nu=JSON.parse),ns=ns||t3.JSONEncode,nu=nu||t3.JSONDecode,// EXPORTS (for closure compiler)
t3.toArray=t3.toArray,t3.isObject=t3.isObject,t3.JSONEncode=t3.JSONEncode,t3.JSONDecode=t3.JSONDecode,t3.isBlockedUA=t3.isBlockedUA,t3.isEmptyObject=t3.isEmptyObject,t3.info=t3.info,t3.info.device=t3.info.device,t3.info.browser=t3.info.browser,t3.info.browserVersion=t3.info.browserVersion,t3.info.properties=t3.info.properties;/**
 * DomTracker Object
 * @constructor
 */var nl=function(){};// interface
nl.prototype.create_properties=function(){},nl.prototype.event_handler=function(){},nl.prototype.after_track_handler=function(){},nl.prototype.init=function(e){return this.mp=e,this},/**
 * @param {Object|string} query
 * @param {string} event_name
 * @param {Object=} properties
 * @param {function=} user_callback
 */nl.prototype.track=function(e,t,n,r){var o=this,i=t3.dom_query(e);if(0===i.length){t4.error("The DOM query ("+e+") returned 0 elements");return}return t3.each(i,function(e){t3.register_event(e,this.override_event,function(e){var i={},a=o.create_properties(n,this),s=o.mp.get_config("track_links_timeout");o.event_handler(e,this,i),// in case the mixpanel servers don't get back to us in time
window.setTimeout(o.track_callback(r,a,i,!0),s),// fire the tracking event
o.mp.track(t,a,o.track_callback(r,a,i))})},this),!0},/**
 * @param {function} user_callback
 * @param {Object} props
 * @param {boolean=} timeout_occured
 */nl.prototype.track_callback=function(e,t,n,r){r=r||!1;var o=this;return function(){// options is referenced from both callbacks, so we can have
// a 'lock' of sorts to ensure only one fires
!n.callback_fired&&(n.callback_fired=!0,e&&!1===e(r,t)||o.after_track_handler(t,n,r))}},nl.prototype.create_properties=function(e,t){return"function"==typeof e?e(t):t3.extend({},e)};/**
 * LinkTracker Object
 * @constructor
 * @extends DomTracker
 */var nc=function(){this.override_event="click"};t3.inherit(nc,nl),nc.prototype.create_properties=function(e,t){var n=nc.superclass.create_properties.apply(this,arguments);return t.href&&(n.url=t.href),n},nc.prototype.event_handler=function(e,t,n){n.new_tab=2===e.which||e.metaKey||e.ctrlKey||"_blank"===t.target,n.href=t.href,n.new_tab||e.preventDefault()},nc.prototype.after_track_handler=function(e,t){t.new_tab||setTimeout(function(){window.location=t.href},0)};/**
 * FormTracker Object
 * @constructor
 * @extends DomTracker
 */var nd=function(){this.override_event="submit"};t3.inherit(nd,nl),nd.prototype.event_handler=function(e,t,n){n.element=t,e.preventDefault()},nd.prototype.after_track_handler=function(e,t){setTimeout(function(){t.element.submit()},0)};// eslint-disable-line camelcase
var nf=t5("lock"),np=function(e,t){t=t||{},this.storageKey=e,this.storage=t.storage||window.localStorage,this.pollIntervalMS=t.pollIntervalMS||100,this.timeoutMS=t.timeoutMS||2e3};// pass in a specific pid to test contention scenarios; otherwise
// it is chosen randomly for each acquisition attempt
np.prototype.withLock=function(e,t,n){n||"function"==typeof t||(n=t,t=null);var r=n||new Date().getTime()+"|"+Math.random(),o=new Date().getTime(),i=this.storageKey,a=this.pollIntervalMS,s=this.timeoutMS,u=this.storage,l=i+":X",c=i+":Y",d=i+":Z",f=function(e){t&&t(e)},p=function(e){if(new Date().getTime()-o>s){nf.error("Timeout waiting for mutex on "+i+"; clearing lock. ["+r+"]"),u.removeItem(d),u.removeItem(c),g();return}setTimeout(function(){try{e()}catch(e){f(e)}},a*(Math.random()+.1))},h=function(e,t){e()?t():p(function(){h(e,t)})},m=function(){var e=u.getItem(c);if(e&&e!==r)return!1;if(u.setItem(c,r),u.getItem(c)===r)return!0;if(!t9(u,!0))throw Error("localStorage support dropped while acquiring lock");return!1},g=function(){u.setItem(l,r),h(m,function(){if(u.getItem(l)===r){v();return}p(function(){if(u.getItem(c)!==r){g();return}h(function(){return!u.getItem(d)},v)})})},v=function(){u.setItem(d,"1");try{e()}finally{u.removeItem(d),u.getItem(c)===r&&u.removeItem(c),u.getItem(l)===r&&u.removeItem(l)}};try{if(t9(u,!0))g();else throw Error("localStorage support check failed")}catch(e){f(e)}};// eslint-disable-line camelcase
var nh=t5("batch"),nm=function(e,t){t=t||{},this.storageKey=e,this.storage=t.storage||window.localStorage,this.reportError=t.errorReporter||t3.bind(nh.error,nh),this.lock=new np(e,{storage:this.storage}),this.pid=t.pid||null,this.memQueue=[]};/**
 * Add one item to queues (memory and localStorage). The queued entry includes
 * the given item along with an auto-generated ID and a "flush-after" timestamp.
 * It is expected that the item will be sent over the network and dequeued
 * before the flush-after time; if this doesn't happen it is considered orphaned
 * (e.g., the original tab where it was enqueued got closed before it could be
 * sent) and the item can be sent by any tab that finds it in localStorage.
 *
 * The final callback param is called with a param indicating success or
 * failure of the enqueue operation; it is asynchronous because the localStorage
 * lock is asynchronous.
 */nm.prototype.enqueue=function(e,t,n){var r={id:nr(),flushAfter:new Date().getTime()+2*t,payload:e};this.lock.withLock(t3.bind(function(){var t;try{var o=this.readFromStorage();o.push(r),(t=this.saveToStorage(o))&&this.memQueue.push(r)}catch(n){this.reportError("Error enqueueing item",e),t=!1}n&&n(t)},this),t3.bind(function(e){this.reportError("Error acquiring storage lock",e),n&&n(!1)},this),this.pid)},/**
 * Read out the given number of queue entries. If this.memQueue
 * has fewer than batchSize items, then look for "orphaned" items
 * in the persisted queue (items where the 'flushAfter' time has
 * already passed).
 */nm.prototype.fillBatch=function(e){var t=this.memQueue.slice(0,e);if(t.length<e){// don't need lock just to read events; localStorage is thread-safe
// and the worst that could happen is a duplicate send of some
// orphaned events, which will be deduplicated on the server side
var n=this.readFromStorage();if(n.length){// item IDs already in batch; don't duplicate out of storage
var r={};// poor man's Set
t3.each(t,function(e){r[e.id]=!0});for(var o=0;o<n.length;o++){var i=n[o];if(new Date().getTime()>i.flushAfter&&!r[i.id]&&(i.orphaned=!0,t.push(i),t.length>=e))break}}}return t};/**
 * Remove items with matching 'id' from array (immutably)
 * also remove any item without a valid id (e.g., malformed
 * storage entries).
 */var ng=function(e,t){var n=[];return t3.each(e,function(e){e.id&&!t[e.id]&&n.push(e)}),n};/**
 * Remove items with matching IDs from both in-memory queue
 * and persisted queue
 */nm.prototype.removeItemsByID=function(e,t){var n={};// poor man's Set
t3.each(e,function(e){n[e]=!0}),this.memQueue=ng(this.memQueue,n);var r=t3.bind(function(){var t;try{var r=this.readFromStorage();// an extra check: did storage report success but somehow
// the items are still there?
if(r=ng(r,n),t=this.saveToStorage(r)){r=this.readFromStorage();for(var o=0;o<r.length;o++){var i=r[o];if(i.id&&n[i.id])return this.reportError("Item not removed from storage"),!1}}}catch(n){this.reportError("Error removing items",e),t=!1}return t},this);this.lock.withLock(function(){var e=r();t&&t(e)},t3.bind(function(e){var n=!1;if(this.reportError("Error acquiring storage lock",e),!t9(this.storage,!0)&&!// Looks like localStorage writes have stopped working sometime after
// initialization (probably full), and so nobody can acquire locks
// anymore. Consider it temporarily safe to remove items without the
// lock, since nobody's writing successfully anyway.
(n=r()))// entirely.
try{this.storage.removeItem(this.storageKey)}catch(e){this.reportError("Error clearing queue",e)}t&&t(n)},this),this.pid)};// internal helper for RequestQueue.updatePayloads
var nv=function(e,t){var n=[];return t3.each(e,function(e){var r=e.id;if(r in t){var o=t[r];null!==o&&(e.payload=o,n.push(e))}else n.push(e)}),n};/**
 * Update payloads of given items in both in-memory queue and
 * persisted queue. Items set to null are removed from queues.
 */nm.prototype.updatePayloads=function(e,t){this.memQueue=nv(this.memQueue,e),this.lock.withLock(t3.bind(function(){var n;try{var r=this.readFromStorage();r=nv(r,e),n=this.saveToStorage(r)}catch(t){this.reportError("Error updating items",e),n=!1}t&&t(n)},this),t3.bind(function(e){this.reportError("Error acquiring storage lock",e),t&&t(!1)},this),this.pid)},/**
 * Read and parse items array from localStorage entry, handling
 * malformed/missing data if necessary.
 */nm.prototype.readFromStorage=function(){var e;try{(e=this.storage.getItem(this.storageKey))&&(e=nu(e),t3.isArray(e)||(this.reportError("Invalid storage entry:",e),e=null))}catch(t){this.reportError("Error retrieving queue",t),e=null}return e||[]},/**
 * Serialize the given items array to localStorage.
 */nm.prototype.saveToStorage=function(e){try{return this.storage.setItem(this.storageKey,ns(e)),!0}catch(e){return this.reportError("Error saving queue",e),!1}},/**
 * Clear out queues (memory and localStorage).
 */nm.prototype.clear=function(){this.memQueue=[],this.storage.removeItem(this.storageKey)};var ny=t5("batch"),nb=function(e,t){this.errorReporter=t.errorReporter,this.queue=new nm(e,{errorReporter:t3.bind(this.reportError,this),storage:t.storage}),this.libConfig=t.libConfig,this.sendRequest=t.sendRequestFunc,this.beforeSendHook=t.beforeSendHook,this.stopAllBatching=t.stopAllBatchingFunc,// seed variable batch size + flush interval with configured values
this.batchSize=this.libConfig.batch_size,this.flushInterval=this.libConfig.batch_flush_interval_ms,this.stopped=!this.libConfig.batch_autostart,this.consecutiveRemovalFailures=0,// extra client-side dedupe
this.itemIdsSentSuccessfully={}};/**
 * Opt the user in to data tracking and cookies/localstorage for the given token
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {trackFunction} [options.track] - function used for tracking a Mixpanel event to record the opt-in action
 * @param {string} [options.trackEventName] - event name to be used for tracking the opt-in action
 * @param {Object} [options.trackProperties] - set of properties to be tracked along with the opt-in action
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {string} [options.cookieDomain] - custom cookie domain
 * @param {boolean} [options.crossSiteCookie] - whether the opt-in cookie is set as cross-site-enabled
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */function nw(e,t){nI(!0,e,t)}/**
 * Opt the user out of data tracking and cookies/localstorage for the given token
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-out cookie expires
 * @param {string} [options.cookieDomain] - custom cookie domain
 * @param {boolean} [options.crossSiteCookie] - whether the opt-in cookie is set as cross-site-enabled
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-out cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-out cookie is set as secure or not
 */function n_(e,t){nI(!1,e,t)}/**
 * Check whether the user has opted in to data tracking and cookies/localstorage for the given token
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} whether the user has opted in to the given opt type
 */function nk(e,t){return"1"===nP(e,t)}/**
 * Check whether the user has opted out of data tracking and cookies/localstorage for the given token
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {boolean} [options.ignoreDnt] - flag to ignore browser DNT settings and always return false
 * @returns {boolean} whether the user has opted out of the given opt type
 */function nS(e,t){if(/**
 * Check whether the user has set the DNT/doNotTrack setting to true in their browser
 * @param {Object} [options]
 * @param {string} [options.window] - alternate window object to check; used to force various DNT settings in browser tests
 * @param {boolean} [options.ignoreDnt] - flag to ignore browser DNT settings and always return false
 * @returns {boolean} whether the DNT setting is true
 */function(e){if(e&&e.ignoreDnt)return!1;var t=e&&e.window||x,n=t.navigator||{},r=!1;return t3.each([n.doNotTrack,n.msDoNotTrack,t.doNotTrack],function(e){t3.includes([!0,1,"1","yes"],e)&&(r=!0)}),r}(t))return t4.warn('This browser has "Do Not Track" enabled. This will prevent the Mixpanel SDK from sending any data. To ignore the "Do Not Track" browser setting, initialize the Mixpanel instance with the config "ignore_dnt: true"'),!0;var n="0"===nP(e,t);return n&&t4.warn("You are opted out of Mixpanel tracking. This will prevent the Mixpanel SDK from sending any data."),n}/**
 * Wrap a MixpanelLib method with a check for whether the user is opted out of data tracking and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */function nx(e){return nD(e,function(e){return this.get_config(e)})}/**
 * Wrap a MixpanelPeople method with a check for whether the user is opted out of data tracking and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */function nE(e){return nD(e,function(e){return this._get_config(e)})}/**
 * Wrap a MixpanelGroup method with a check for whether the user is opted out of data tracking and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */function nC(e){return nD(e,function(e){return this._get_config(e)})}/**
 * Clear the user's opt in/out status of data tracking and cookies/localstorage for the given token
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {string} [options.cookieDomain] - custom cookie domain
 * @param {boolean} [options.crossSiteCookie] - whether the opt-in cookie is set as cross-site-enabled
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */function nT(e,t){nO(t=t||{}).remove(nR(e,t),!!t.crossSubdomainCookie,t.cookieDomain)}/** Private **//**
 * Get storage util
 * @param {Object} [options]
 * @param {string} [options.persistenceType]
 * @returns {object} either _.cookie or _.localstorage
 */function nO(e){return"localStorage"===(e=e||{}).persistenceType?t3.localStorage:t3.cookie}/**
 * Get the name of the cookie that is used for the given opt type (tracking, cookie, etc.)
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {string} the name of the cookie for the given opt type
 */function nR(e,t){return((t=t||{}).persistencePrefix||"__mp_opt_in_out_")+e}/**
 * Get the value of the cookie that is used for the given opt type (tracking, cookie, etc.)
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {string} the value of the cookie for the given opt type
 */function nP(e,t){return nO(t).get(nR(e,t))}/**
 * Set cookie/localstorage for the user indicating that they are opted in or out for the given opt type
 * @param {boolean} optValue - whether to opt the user in or out for the given opt type
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {trackFunction} [options.track] - function used for tracking a Mixpanel event to record the opt-in action
 * @param {string} [options.trackEventName] - event name to be used for tracking the opt-in action
 * @param {Object} [options.trackProperties] - set of properties to be tracked along with the opt-in action
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookieExpiration] - number of days until the opt-in cookie expires
 * @param {string} [options.cookieDomain] - custom cookie domain
 * @param {boolean} [options.crossSiteCookie] - whether the opt-in cookie is set as cross-site-enabled
 * @param {boolean} [options.crossSubdomainCookie] - whether the opt-in cookie is set as cross-subdomain or not
 * @param {boolean} [options.secureCookie] - whether the opt-in cookie is set as secure or not
 */function nI(e,t,n){if(!t3.isString(t)||!t.length){t4.error("gdpr."+(e?"optIn":"optOut")+" called with an invalid token");return}nO(n=n||{}).set(nR(t,n),e?1:0,t3.isNumber(n.cookieExpiration)?n.cookieExpiration:null,!!n.crossSubdomainCookie,!!n.secureCookie,!!n.crossSiteCookie,n.cookieDomain),n.track&&e&&n.track(n.trackEventName||"$opt_in",n.trackProperties,{send_immediately:!0})}/**
 * Wrap a method with a check for whether the user is opted out of data tracking and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @param {function} getConfigValue - getter function for the Mixpanel API token and other options to be used with opt-out check
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */function nD(e,t){return function(){var n=!1;try{var r=t.call(this,"token"),o=t.call(this,"ignore_dnt"),i=t.call(this,"opt_out_tracking_persistence_type"),a=t.call(this,"opt_out_tracking_cookie_prefix"),s=t.call(this,"window");r&&(n=nS(r,{ignoreDnt:o,persistenceType:i,persistencePrefix:a,window:s}))}catch(e){t4.error("Unexpected error when checking tracking opt-out status: "+e)}if(!n)return e.apply(this,arguments);var u=arguments[arguments.length-1];"function"==typeof u&&u(0)}}/**
 * Add one item to queue.
 */nb.prototype.enqueue=function(e,t){this.queue.enqueue(e,this.flushInterval,t)},/**
 * Start flushing batches at the configured time interval. Must call
 * this method upon SDK init in order to send anything over the network.
 */nb.prototype.start=function(){this.stopped=!1,this.consecutiveRemovalFailures=0,this.flush()},/**
 * Stop flushing batches. Can be restarted by calling start().
 */nb.prototype.stop=function(){this.stopped=!0,this.timeoutID&&(clearTimeout(this.timeoutID),this.timeoutID=null)},/**
 * Clear out queue.
 */nb.prototype.clear=function(){this.queue.clear()},/**
 * Restore batch size configuration to whatever is set in the main SDK.
 */nb.prototype.resetBatchSize=function(){this.batchSize=this.libConfig.batch_size},/**
 * Restore flush interval time configuration to whatever is set in the main SDK.
 */nb.prototype.resetFlush=function(){this.scheduleFlush(this.libConfig.batch_flush_interval_ms)},/**
 * Schedule the next flush in the given number of milliseconds.
 */nb.prototype.scheduleFlush=function(e){this.flushInterval=e,this.stopped||(this.timeoutID=setTimeout(t3.bind(this.flush,this),this.flushInterval))},/**
 * Flush one batch to network. Depending on success/failure modes, it will either
 * remove the batch from the queue or leave it in for retry, and schedule the next
 * flush. In cases of most network or API failures, it will back off exponentially
 * when retrying.
 * @param {Object} [options]
 * @param {boolean} [options.sendBeacon] - whether to send batch with
 * navigator.sendBeacon (only useful for sending batches before page unloads, as
 * sendBeacon offers no callbacks or status indications)
 */nb.prototype.flush=function(e){try{if(this.requestInProgress){ny.log("Flush: Request already in progress");return}e=e||{};var t=this.libConfig.batch_request_timeout_ms,n=new Date().getTime(),r=this.batchSize,o=this.queue.fillBatch(r),i=[],a={};if(t3.each(o,function(e){var t=e.payload;if(this.beforeSendHook&&!e.orphaned&&(t=this.beforeSendHook(t)),t){t.event&&t.properties&&(t.properties=t3.extend({},t.properties,{mp_sent_by_lib_version:tU.LIB_VERSION}));var n=!0,r=e.id;r?(this.itemIdsSentSuccessfully[r]||0)>5&&(this.reportError("[dupe] item ID sent too many times, not sending",{item:e,batchSize:o.length,timesSent:this.itemIdsSentSuccessfully[r]}),n=!1):this.reportError("[dupe] found item with no ID",{item:e}),n&&i.push(t)}a[e.id]=t},this),i.length<1){this.resetFlush();return;// nothing to do
}this.requestInProgress=!0;var s=t3.bind(function(i){this.requestInProgress=!1;try{// handle API response in a try-catch to make sure we can reset the
// flush operation if something goes wrong
var s=!1;if(e.unloading)this.queue.updatePayloads(a);else if(t3.isObject(i)&&"timeout"===i.error&&new Date().getTime()-n>=t)this.reportError("Network timeout; retrying"),this.flush();else if(t3.isObject(i)&&i.xhr_req&&(i.xhr_req.status>=500||429===i.xhr_req.status||"timeout"===i.error)){// network or API error, or 429 Too Many Requests, retry
var u=2*this.flushInterval,l=i.xhr_req.responseHeaders;if(l){var c=l["Retry-After"];c&&(u=1e3*parseInt(c,10)||u)}u=Math.min(6e5,u),this.reportError("Error; retry in "+u+" ms"),this.scheduleFlush(u)}else if(t3.isObject(i)&&i.xhr_req&&413===i.xhr_req.status){// 413 Payload Too Large
if(o.length>1){var d=Math.max(1,Math.floor(r/2));this.batchSize=Math.min(this.batchSize,d,o.length-1),this.reportError("413 response; reducing batch size to "+this.batchSize),this.resetFlush()}else this.reportError("Single-event request too large; dropping",o),this.resetBatchSize(),s=!0}else // (even if it was e.g. a 400, in which case retrying won't help)
s=!0;s&&(this.queue.removeItemsByID(t3.map(o,function(e){return e.id}),t3.bind(function(e){e?(this.consecutiveRemovalFailures=0,this.flush()):(this.reportError("Failed to remove items from queue"),++this.consecutiveRemovalFailures>5?(this.reportError("Too many queue failures; disabling batching system."),this.stopAllBatching()):this.resetFlush())},this)),// client-side dedupe
t3.each(o,t3.bind(function(e){var t=e.id;t?(this.itemIdsSentSuccessfully[t]=this.itemIdsSentSuccessfully[t]||0,this.itemIdsSentSuccessfully[t]++,this.itemIdsSentSuccessfully[t]>5&&this.reportError("[dupe] item ID sent too many times",{item:e,batchSize:o.length,timesSent:this.itemIdsSentSuccessfully[t]})):this.reportError("[dupe] found item with no ID while removing",{item:e})},this)))}catch(e){this.reportError("Error handling API response",e),this.resetFlush()}},this),u={method:"POST",verbose:!0,ignore_json_errors:!0,timeout_ms:t// eslint-disable-line camelcase
};e.unloading&&(u.transport="sendBeacon"),ny.log("MIXPANEL REQUEST:",i),this.sendRequest(i,u,s)}catch(e){this.reportError("Error flushing request queue",e),this.resetFlush()}},/**
 * Log error to global logger and optional user-defined logger.
 */nb.prototype.reportError=function(e,t){if(ny.error.apply(ny.error,arguments),this.errorReporter)try{t instanceof Error||(t=Error(e)),this.errorReporter(e,t)}catch(e){ny.error(e)}};/** @const */var nM="$set",nN="$set_once",nL="$unset",nA="$add",nU="$append",nj="$union",nF="$remove",nz={set_action:function(e,t){var n={},r={};return t3.isObject(e)?t3.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=e)},this):r[e]=t,n[nM]=r,n},unset_action:function(e){var t={},n=[];return t3.isArray(e)||(e=[e]),t3.each(e,function(e){this._is_reserved_property(e)||n.push(e)},this),t[nL]=n,t},set_once_action:function(e,t){var n={},r={};return t3.isObject(e)?t3.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=e)},this):r[e]=t,n[nN]=r,n},union_action:function(e,t){var n={},r={};return t3.isObject(e)?t3.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=t3.isArray(e)?e:[e])},this):r[e]=t3.isArray(t)?t:[t],n[nj]=r,n},append_action:function(e,t){var n={},r={};return t3.isObject(e)?t3.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=e)},this):r[e]=t,n[nU]=r,n},remove_action:function(e,t){var n={},r={};return t3.isObject(e)?t3.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=e)},this):r[e]=t,n[nF]=r,n},delete_action:function(){var e={};return e.$delete="",e}},nq=function(){};t3.extend(nq.prototype,nz),nq.prototype._init=function(e,t,n){this._mixpanel=e,this._group_key=t,this._group_id=n},/**
 * Set properties on a group.
 *
 * ### Usage:
 *
 *     mixpanel.get_group('company', 'mixpanel').set('Location', '405 Howard');
 *
 *     // or set multiple properties at once
 *     mixpanel.get_group('company', 'mixpanel').set({
 *          'Location': '405 Howard',
 *          'Founded' : 2009,
 *     });
 *     // properties can be strings, integers, dates, or lists
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */nq.prototype.set=nC(function(e,t,n){var r=this.set_action(e,t);return t3.isObject(e)&&(n=t),this._send_request(r,n)}),/**
 * Set properties on a group, only if they do not yet exist.
 * This will not overwrite previous group property values, unlike
 * group.set().
 *
 * ### Usage:
 *
 *     mixpanel.get_group('company', 'mixpanel').set_once('Location', '405 Howard');
 *
 *     // or set multiple properties at once
 *     mixpanel.get_group('company', 'mixpanel').set_once({
 *          'Location': '405 Howard',
 *          'Founded' : 2009,
 *     });
 *     // properties can be strings, integers, lists or dates
 *
 * @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
 * @param {*} [to] A value to set on the given property name
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */nq.prototype.set_once=nC(function(e,t,n){var r=this.set_once_action(e,t);return t3.isObject(e)&&(n=t),this._send_request(r,n)}),/**
 * Unset properties on a group permanently.
 *
 * ### Usage:
 *
 *     mixpanel.get_group('company', 'mixpanel').unset('Founded');
 *
 * @param {String} prop The name of the property.
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */nq.prototype.unset=nC(function(e,t){var n=this.unset_action(e);return this._send_request(n,t)}),/**
 * Merge a given list with a list-valued group property, excluding duplicate values.
 *
 * ### Usage:
 *
 *     // merge a value to a list, creating it if needed
 *     mixpanel.get_group('company', 'mixpanel').union('Location', ['San Francisco', 'London']);
 *
 * @param {String} list_name Name of the property.
 * @param {Array} values Values to merge with the given property
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */nq.prototype.union=nC(function(e,t,n){t3.isObject(e)&&(n=t);var r=this.union_action(e,t);return this._send_request(r,n)}),/**
 * Permanently delete a group.
 *
 * ### Usage:
 *
 *     mixpanel.get_group('company', 'mixpanel').delete();
 *
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */nq.prototype.delete=nC(function(e){// bracket notation above prevents a minification error related to reserved words
var t=this.delete_action();return this._send_request(t,e)}),/**
 * Remove a property from a group. The value will be ignored if doesn't exist.
 *
 * ### Usage:
 *
 *     mixpanel.get_group('company', 'mixpanel').remove('Location', 'London');
 *
 * @param {String} list_name Name of the property.
 * @param {Object} value Value to remove from the given group property
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */nq.prototype.remove=nC(function(e,t,n){var r=this.remove_action(e,t);return this._send_request(r,n)}),nq.prototype._send_request=function(e,t){e.$group_key=this._group_key,e.$group_id=this._group_id,e.$token=this._get_config("token");var n=t3.encodeDates(e);return this._mixpanel._track_or_batch({type:"groups",data:n,endpoint:this._get_config("api_host")+"/groups/",batcher:this._mixpanel.request_batchers.groups},t)},nq.prototype._is_reserved_property=function(e){return"$group_key"===e||"$group_id"===e},nq.prototype._get_config=function(e){return this._mixpanel.get_config(e)},nq.prototype.toString=function(){return this._mixpanel.toString()+".group."+this._group_key+"."+this._group_id},// MixpanelGroup Exports
nq.prototype.remove=nq.prototype.remove,nq.prototype.set=nq.prototype.set,nq.prototype.set_once=nq.prototype.set_once,nq.prototype.union=nq.prototype.union,nq.prototype.unset=nq.prototype.unset,nq.prototype.toString=nq.prototype.toString;/**
 * Mixpanel People Object
 * @constructor
 */var nB=function(){};t3.extend(nB.prototype,nz),nB.prototype._init=function(e){this._mixpanel=e},/*
* Set properties on a user record.
*
* ### Usage:
*
*     mixpanel.people.set('gender', 'm');
*
*     // or set multiple properties at once
*     mixpanel.people.set({
*         'Company': 'Acme',
*         'Plan': 'Premium',
*         'Upgrade date': new Date()
*     });
*     // properties can be strings, integers, dates, or lists
*
* @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [to] A value to set on the given property name
* @param {Function} [callback] If provided, the callback will be called after tracking the event.
*/nB.prototype.set=nE(function(e,t,n){var r=this.set_action(e,t);return t3.isObject(e)&&(n=t),this._get_config("save_referrer")&&this._mixpanel.persistence.update_referrer_info(document.referrer),// update $set object with default people properties
r[nM]=t3.extend({},t3.info.people_properties(),this._mixpanel.persistence.get_referrer_info(),r[nM]),this._send_request(r,n)}),/*
* Set properties on a user record, only if they do not yet exist.
* This will not overwrite previous people property values, unlike
* people.set().
*
* ### Usage:
*
*     mixpanel.people.set_once('First Login Date', new Date());
*
*     // or set multiple properties at once
*     mixpanel.people.set_once({
*         'First Login Date': new Date(),
*         'Starting Plan': 'Premium'
*     });
*
*     // properties can be strings, integers or dates
*
* @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [to] A value to set on the given property name
* @param {Function} [callback] If provided, the callback will be called after tracking the event.
*/nB.prototype.set_once=nE(function(e,t,n){var r=this.set_once_action(e,t);return t3.isObject(e)&&(n=t),this._send_request(r,n)}),/*
* Unset properties on a user record (permanently removes the properties and their values from a profile).
*
* ### Usage:
*
*     mixpanel.people.unset('gender');
*
*     // or unset multiple properties at once
*     mixpanel.people.unset(['gender', 'Company']);
*
* @param {Array|String} prop If a string, this is the name of the property. If an array, this is a list of property names.
* @param {Function} [callback] If provided, the callback will be called after tracking the event.
*/nB.prototype.unset=nE(function(e,t){var n=this.unset_action(e);return this._send_request(n,t)}),/*
* Increment/decrement numeric people analytics properties.
*
* ### Usage:
*
*     mixpanel.people.increment('page_views', 1);
*
*     // or, for convenience, if you're just incrementing a counter by
*     // 1, you can simply do
*     mixpanel.people.increment('page_views');
*
*     // to decrement a counter, pass a negative number
*     mixpanel.people.increment('credits_left', -1);
*
*     // like mixpanel.people.set(), you can increment multiple
*     // properties at once:
*     mixpanel.people.increment({
*         counter1: 1,
*         counter2: 6
*     });
*
* @param {Object|String} prop If a string, this is the name of the property. If an object, this is an associative array of names and numeric values.
* @param {Number} [by] An amount to increment the given property
* @param {Function} [callback] If provided, the callback will be called after tracking the event.
*/nB.prototype.increment=nE(function(e,t,n){var r={},o={};return t3.isObject(e)?(t3.each(e,function(e,t){if(!this._is_reserved_property(t)){if(isNaN(parseFloat(e))){t4.error("Invalid increment value passed to mixpanel.people.increment - must be a number");return}o[t]=e}},this),n=t):(t3.isUndefined(t)&&(t=1),o[e]=t),r[nA]=o,this._send_request(r,n)}),/*
* Append a value to a list-valued people analytics property.
*
* ### Usage:
*
*     // append a value to a list, creating it if needed
*     mixpanel.people.append('pages_visited', 'homepage');
*
*     // like mixpanel.people.set(), you can append multiple
*     // properties at once:
*     mixpanel.people.append({
*         list1: 'bob',
*         list2: 123
*     });
*
* @param {Object|String} list_name If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [value] value An item to append to the list
* @param {Function} [callback] If provided, the callback will be called after tracking the event.
*/nB.prototype.append=nE(function(e,t,n){t3.isObject(e)&&(n=t);var r=this.append_action(e,t);return this._send_request(r,n)}),/*
* Remove a value from a list-valued people analytics property.
*
* ### Usage:
*
*     mixpanel.people.remove('School', 'UCB');
*
* @param {Object|String} list_name If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [value] value Item to remove from the list
* @param {Function} [callback] If provided, the callback will be called after tracking the event.
*/nB.prototype.remove=nE(function(e,t,n){t3.isObject(e)&&(n=t);var r=this.remove_action(e,t);return this._send_request(r,n)}),/*
* Merge a given list with a list-valued people analytics property,
* excluding duplicate values.
*
* ### Usage:
*
*     // merge a value to a list, creating it if needed
*     mixpanel.people.union('pages_visited', 'homepage');
*
*     // like mixpanel.people.set(), you can append multiple
*     // properties at once:
*     mixpanel.people.union({
*         list1: 'bob',
*         list2: 123
*     });
*
*     // like mixpanel.people.append(), you can append multiple
*     // values to the same list:
*     mixpanel.people.union({
*         list1: ['bob', 'billy']
*     });
*
* @param {Object|String} list_name If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [value] Value / values to merge with the given property
* @param {Function} [callback] If provided, the callback will be called after tracking the event.
*/nB.prototype.union=nE(function(e,t,n){t3.isObject(e)&&(n=t);var r=this.union_action(e,t);return this._send_request(r,n)}),/*
 * Record that you have charged the current user a certain amount
 * of money. Charges recorded with track_charge() will appear in the
 * Mixpanel revenue report.
 *
 * ### Usage:
 *
 *     // charge a user $50
 *     mixpanel.people.track_charge(50);
 *
 *     // charge a user $30.50 on the 2nd of january
 *     mixpanel.people.track_charge(30.50, {
 *         '$time': new Date('jan 1 2012')
 *     });
 *
 * @param {Number} amount The amount of money charged to the current user
 * @param {Object} [properties] An associative array of properties associated with the charge
 * @param {Function} [callback] If provided, the callback will be called when the server responds
 * @deprecated
 */nB.prototype.track_charge=nE(function(e,t,n){if(!t3.isNumber(e)&&isNaN(e=parseFloat(e))){t4.error("Invalid value passed to mixpanel.people.track_charge - must be a number");return}return this.append("$transactions",t3.extend({$amount:e},t),n)}),/*
 * Permanently clear all revenue report transactions from the
 * current user's people analytics profile.
 *
 * ### Usage:
 *
 *     mixpanel.people.clear_charges();
 *
 * @param {Function} [callback] If provided, the callback will be called after tracking the event.
 * @deprecated
 */nB.prototype.clear_charges=function(e){return this.set("$transactions",[],e)},/*
* Permanently deletes the current people analytics profile from
* Mixpanel (using the current distinct_id).
*
* ### Usage:
*
*     // remove the all data you have stored about the current user
*     mixpanel.people.delete_user();
*
*/nB.prototype.delete_user=function(){if(!this._identify_called()){t4.error("mixpanel.people.delete_user() requires you to call identify() first");return}var e={$delete:this._mixpanel.get_distinct_id()};return this._send_request(e)},nB.prototype.toString=function(){return this._mixpanel.toString()+".people"},nB.prototype._send_request=function(e,t){e.$token=this._get_config("token"),e.$distinct_id=this._mixpanel.get_distinct_id();var n=this._mixpanel.get_property("$device_id"),r=this._mixpanel.get_property("$user_id"),o=this._mixpanel.get_property("$had_persisted_distinct_id");n&&(e.$device_id=n),r&&(e.$user_id=r),o&&(e.$had_persisted_distinct_id=o);var i=t3.encodeDates(e);return this._identify_called()?this._mixpanel._track_or_batch({type:"people",data:i,endpoint:this._get_config("api_host")+"/engage/",batcher:this._mixpanel.request_batchers.people},t):(this._enqueue(e),t3.isUndefined(t)||t(this._get_config("verbose")?{status:-1,error:null}:-1),t3.truncate(i,255))},nB.prototype._get_config=function(e){return this._mixpanel.get_config(e)},nB.prototype._identify_called=function(){return!0===this._mixpanel._flags.identify_called},// Queue up engage operations if identify hasn't been called yet.
nB.prototype._enqueue=function(e){nM in e?this._mixpanel.persistence._add_to_people_queue(nM,e):nN in e?this._mixpanel.persistence._add_to_people_queue(nN,e):nL in e?this._mixpanel.persistence._add_to_people_queue(nL,e):nA in e?this._mixpanel.persistence._add_to_people_queue(nA,e):nU in e?this._mixpanel.persistence._add_to_people_queue(nU,e):nF in e?this._mixpanel.persistence._add_to_people_queue(nF,e):nj in e?this._mixpanel.persistence._add_to_people_queue(nj,e):t4.error("Invalid call to _enqueue():",e)},nB.prototype._flush_one_queue=function(e,t,n,r){var o=this,i=t3.extend({},this._mixpanel.persistence._get_queue(e)),a=i;!t3.isUndefined(i)&&t3.isObject(i)&&!t3.isEmptyObject(i)&&(o._mixpanel.persistence._pop_from_people_queue(e,i),r&&(a=r(i)),t.call(o,a,function(t,r){0===t&&o._mixpanel.persistence._add_to_people_queue(e,i),t3.isUndefined(n)||n(t,r)}))},// Flush queued engage operations - order does not matter,
// and there are network level race conditions anyway
nB.prototype._flush=function(e,t,n,r,o,i,a){var s=this,u=this._mixpanel.persistence._get_queue(nU),l=this._mixpanel.persistence._get_queue(nF);// we have to fire off each $append individually since there is
// no concat method server side
if(this._flush_one_queue(nM,this.set,e),this._flush_one_queue(nN,this.set_once,r),this._flush_one_queue(nL,this.unset,i,function(e){return t3.keys(e)}),this._flush_one_queue(nA,this.increment,t),this._flush_one_queue(nj,this.union,o),!t3.isUndefined(u)&&t3.isArray(u)&&u.length){for(var c,d=function(e,t){0===e&&s._mixpanel.persistence._add_to_people_queue(nU,c),t3.isUndefined(n)||n(e,t)},f=u.length-1;f>=0;f--)c=u.pop(),t3.isEmptyObject(c)||s.append(c,d);// Save the shortened append queue
s._mixpanel.persistence.save()}// same for $remove
if(!t3.isUndefined(l)&&t3.isArray(l)&&l.length){for(var p,h=function(e,t){0===e&&s._mixpanel.persistence._add_to_people_queue(nF,p),t3.isUndefined(a)||a(e,t)},m=l.length-1;m>=0;m--)p=l.pop(),t3.isEmptyObject(p)||s.remove(p,h);s._mixpanel.persistence.save()}},nB.prototype._is_reserved_property=function(e){return"$distinct_id"===e||"$token"===e||"$device_id"===e||"$user_id"===e||"$had_persisted_distinct_id"===e},// MixpanelPeople Exports
nB.prototype.set=nB.prototype.set,nB.prototype.set_once=nB.prototype.set_once,nB.prototype.unset=nB.prototype.unset,nB.prototype.increment=nB.prototype.increment,nB.prototype.append=nB.prototype.append,nB.prototype.remove=nB.prototype.remove,nB.prototype.union=nB.prototype.union,nB.prototype.track_charge=nB.prototype.track_charge,nB.prototype.clear_charges=nB.prototype.clear_charges,nB.prototype.delete_user=nB.prototype.delete_user,nB.prototype.toString=nB.prototype.toString;/*
 * Constants
 *//** @const */var nV="__mps",n$="__mpso",nW="__mpus",nH="__mpa",nY="__mpap",nQ="__mpr",nK="__mpu",nG="$people_distinct_id",nX="__alias",nJ="__timers",nZ=[nV,n$,nW,nH,nY,nQ,nK,nG,nX,nJ],n0=function(e){this.props={},this.campaign_params_saved=!1,e.persistence_name?this.name="mp_"+e.persistence_name:this.name="mp_"+e.token+"_mixpanel";var t=e.persistence;"cookie"!==t&&"localStorage"!==t&&(t4.critical("Unknown persistence type "+t+"; falling back to cookie"),t=e.persistence="cookie"),"localStorage"===t&&t3.localStorage.is_supported()?this.storage=t3.localStorage:this.storage=t3.cookie,this.load(),this.update_config(e),this.upgrade(e),this.save()};n0.prototype.properties=function(){var e={};return(// Filter out reserved properties
t3.each(this.props,function(t,n){t3.include(nZ,n)||(e[n]=t)}),e)},n0.prototype.load=function(){if(!this.disabled){var e=this.storage.parse(this.name);e&&(this.props=t3.extend({},e))}},n0.prototype.upgrade=function(e){var t,n,r=e.upgrade;r&&(t="mp_super_properties","string"==typeof r&&(t=r),n=this.storage.parse(t),// remove the cookie
this.storage.remove(t),this.storage.remove(t,!0),n&&(this.props=t3.extend(this.props,n.all,n.events))),!e.cookie_name&&"mixpanel"!==e.name&&(// special case to handle people with cookies of the form
// mp_TOKEN_INSTANCENAME from the first release of this library
t="mp_"+e.token+"_"+e.name,(n=this.storage.parse(t))&&(this.storage.remove(t),this.storage.remove(t,!0),// Save the prop values that were in the cookie from before -
// this should only happen once as we delete the old one.
this.register_once(n))),this.storage===t3.localStorage&&(n=t3.cookie.parse(this.name),t3.cookie.remove(this.name),t3.cookie.remove(this.name,!0),n&&this.register_once(n))},n0.prototype.save=function(){this.disabled||this.storage.set(this.name,t3.JSONEncode(this.props),this.expire_days,this.cross_subdomain,this.secure,this.cross_site,this.cookie_domain)},n0.prototype.remove=function(){// remove both domain and subdomain cookies
this.storage.remove(this.name,!1,this.cookie_domain),this.storage.remove(this.name,!0,this.cookie_domain)},// removes the storage entry and deletes all loaded data
// forced name for tests
n0.prototype.clear=function(){this.remove(),this.props={}},/**
* @param {Object} props
* @param {*=} default_value
* @param {number=} days
*/n0.prototype.register_once=function(e,t,n){return!!t3.isObject(e)&&(void 0===t&&(t="None"),this.expire_days=void 0===n?this.default_expiry:n,t3.each(e,function(e,n){this.props.hasOwnProperty(n)&&this.props[n]!==t||(this.props[n]=e)},this),this.save(),!0)},/**
* @param {Object} props
* @param {number=} days
*/n0.prototype.register=function(e,t){return!!t3.isObject(e)&&(this.expire_days=void 0===t?this.default_expiry:t,t3.extend(this.props,e),this.save(),!0)},n0.prototype.unregister=function(e){e in this.props&&(delete this.props[e],this.save())},n0.prototype.update_search_keyword=function(e){this.register(t3.info.searchInfo(e))},// EXPORTED METHOD, we test this directly.
n0.prototype.update_referrer_info=function(e){// If referrer doesn't exist, we want to note the fact that it was type-in traffic.
this.register_once({$initial_referrer:e||"$direct",$initial_referring_domain:t3.info.referringDomain(e)||"$direct"},"")},n0.prototype.get_referrer_info=function(){return t3.strip_empty_properties({$initial_referrer:this.props.$initial_referrer,$initial_referring_domain:this.props.$initial_referring_domain})},// safely fills the passed in object with stored properties,
// does not override any properties defined in both
// returns the passed in object
n0.prototype.safe_merge=function(e){return t3.each(this.props,function(t,n){n in e||(e[n]=t)}),e},n0.prototype.update_config=function(e){this.default_expiry=this.expire_days=e.cookie_expiration,this.set_disabled(e.disable_persistence),this.set_cookie_domain(e.cookie_domain),this.set_cross_site(e.cross_site_cookie),this.set_cross_subdomain(e.cross_subdomain_cookie),this.set_secure(e.secure_cookie)},n0.prototype.set_disabled=function(e){this.disabled=e,this.disabled?this.remove():this.save()},n0.prototype.set_cookie_domain=function(e){e!==this.cookie_domain&&(this.remove(),this.cookie_domain=e,this.save())},n0.prototype.set_cross_site=function(e){e!==this.cross_site&&(this.cross_site=e,this.remove(),this.save())},n0.prototype.set_cross_subdomain=function(e){e!==this.cross_subdomain&&(this.cross_subdomain=e,this.remove(),this.save())},n0.prototype.get_cross_subdomain=function(){return this.cross_subdomain},n0.prototype.set_secure=function(e){e!==this.secure&&(this.secure=!!e,this.remove(),this.save())},n0.prototype._add_to_people_queue=function(e,t){var n=this._get_queue_key(e),r=t[e],o=this._get_or_create_queue(nM),i=this._get_or_create_queue(nN),a=this._get_or_create_queue(nL),s=this._get_or_create_queue(nA),u=this._get_or_create_queue(nj),l=this._get_or_create_queue(nF,[]),c=this._get_or_create_queue(nU,[]);n===nV?(// Update the set queue - we can override any existing values
t3.extend(o,r),// if there was a pending increment, override it
// with the set.
this._pop_from_people_queue(nA,r),// if there was a pending union, override it
// with the set.
this._pop_from_people_queue(nj,r),this._pop_from_people_queue(nL,r)):n===n$?(// only queue the data if there is not already a set_once call for it.
t3.each(r,function(e,t){t in i||(i[t]=e)}),this._pop_from_people_queue(nL,r)):n===nW?t3.each(r,function(e){// undo previously-queued actions on this key
t3.each([o,i,s,u],function(t){e in t&&delete t[e]}),t3.each(c,function(t){e in t&&delete t[e]}),a[e]=!0}):n===nH?(t3.each(r,function(e,t){// If it exists in the set queue, increment
// the value
t in o?o[t]+=e:(t in s||(s[t]=0),s[t]+=e)},this),this._pop_from_people_queue(nL,r)):n===nK?(t3.each(r,function(e,t){t3.isArray(e)&&(t in u||(u[t]=[]),// We may send duplicates, the server will dedup them.
u[t]=u[t].concat(e))}),this._pop_from_people_queue(nL,r)):n===nQ?(l.push(r),this._pop_from_people_queue(nU,r)):n===nY&&(c.push(r),this._pop_from_people_queue(nL,r)),t4.log("MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):"),t4.log(t),this.save()},n0.prototype._pop_from_people_queue=function(e,t){var n=this._get_queue(e);t3.isUndefined(n)||(t3.each(t,function(t,r){e===nU||e===nF?// e.g. remove should not override append in a case like
// append({foo: 'bar'}); remove({foo: 'qux'})
t3.each(n,function(e){e[r]===t&&delete e[r]}):delete n[r]},this),this.save())},n0.prototype._get_queue_key=function(e){return e===nM?nV:e===nN?n$:e===nL?nW:e===nA?nH:e===nU?nY:e===nF?nQ:e===nj?nK:void t4.error("Invalid queue:",e)},n0.prototype._get_queue=function(e){return this.props[this._get_queue_key(e)]},n0.prototype._get_or_create_queue=function(e,t){var n=this._get_queue_key(e);return t=t3.isUndefined(t)?{}:t,this.props[n]||(this.props[n]=t)},n0.prototype.set_event_timer=function(e,t){var n=this.props[nJ]||{};n[e]=t,this.props[nJ]=n,this.save()},n0.prototype.remove_event_timer=function(e){var t=(this.props[nJ]||{})[e];return t3.isUndefined(t)||(delete this.props[nJ][e],this.save()),t};var n1=function(e){return e},n2=function(){},n3="mixpanel",n4="base64",n6="$device:",n5=x.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest,n8=!n5&&-1===tG.indexOf("MSIE")&&-1===tG.indexOf("Mozilla"),n7=null;tH.sendBeacon&&(n7=function(){// late reference to navigator.sendBeacon to allow patching/spying
return tH.sendBeacon.apply(tH,arguments)});/*
 * Module-level globals
 */var n9={api_host:"https://api-js.mixpanel.com",api_method:"POST",api_transport:"XHR",api_payload_format:n4,app_host:"https://mixpanel.com",cdn:"https://cdn.mxpnl.com",cross_site_cookie:!1,cross_subdomain_cookie:!0,error_reporter:n2,persistence:"cookie",persistence_name:"",cookie_domain:"",cookie_name:"",loaded:n2,track_marketing:!0,track_pageview:!1,skip_first_touch_marketing:!1,store_google:!0,save_referrer:!0,test:!1,verbose:!1,img:!1,debug:!1,track_links_timeout:300,cookie_expiration:365,upgrade:!1,disable_persistence:!1,disable_cookie:!1,secure_cookie:!1,ip:!0,opt_out_tracking_by_default:!1,opt_out_persistence_by_default:!1,opt_out_tracking_persistence_type:"localStorage",opt_out_tracking_cookie_prefix:null,property_blacklist:[],xhr_headers:{},ignore_dnt:!1,batch_requests:!0,batch_size:50,batch_flush_interval_ms:5e3,batch_request_timeout_ms:9e4,batch_autostart:!0,hooks:{}},re=!1,rt=function(){},rn=function(e,t,n){var r,o=n===n3?C:C[n];if(o&&0===E)r=o;else{if(o&&!t3.isArray(o)){t4.error("You have already initialized "+n);return}r=new rt}if(r._cached_groups={},r._init(e,t,n),r.people=new nB,r.people._init(r),!r.get_config("skip_first_touch_marketing")){// We need null UTM params in the object because
// UTM parameters act as a tuple. If any UTM param
// is present, then we set all UTM params including
// empty ones together
var i=t3.info.campaignParams(null),a={},s=!1;t3.each(i,function(e,t){a["initial_"+t]=e,e&&(s=!0)}),s&&r.people.set_once(a)}return(// if any instance on the page has debug = true, we set the
// global debug to be true
tU.DEBUG=tU.DEBUG||r.get_config("debug"),!t3.isUndefined(o)&&t3.isArray(o)&&(// Crunch through the people queue first - we queue this data up &
// flush on identify, so it's better to do all these operations first
r._execute_array.call(r.people,o.people),r._execute_array(o)),r)};// Initialization methods
/**
 * This function initializes a new instance of the Mixpanel tracking object.
 * All new instances are added to the main mixpanel object as sub properties (such as
 * mixpanel.library_name) and also returned by this function. To define a
 * second instance on the page, you would call:
 *
 *     mixpanel.init('new token', { your: 'config' }, 'library_name');
 *
 * and use it like so:
 *
 *     mixpanel.library_name.track(...);
 *
 * @param {String} token   Your Mixpanel API token
 * @param {Object} [config]  A dictionary of config options to override. <a href="https://github.com/mixpanel/mixpanel-js/blob/v2.46.0/src/mixpanel-core.js#L88-L127">See a list of default config options</a>.
 * @param {String} [name]    The name for the new mixpanel instance that you want created
 */rt.prototype.init=function(e,t,n){if(t3.isUndefined(n)){this.report_error("You must name your new library: init(token, config, name)");return}if(n===n3){this.report_error("You must initialize the main mixpanel object right after you include the Mixpanel js snippet");return}var r=rn(e,t,n);return C[n]=r,r._loaded(),r},// mixpanel._init(token:string, config:object, name:string)
//
// This function sets up the current instance of the mixpanel
// library.  The difference between this method and the init(...)
// method is this one initializes the actual instance, whereas the
// init(...) method sets up a new library and calls _init on it.
//
rt.prototype._init=function(e,t,n){t=t||{},this.__loaded=!0,this.config={};var r={};if(!("api_payload_format"in t)&&(t.api_host||n9.api_host).match(/\.mixpanel\.com/)&&(r.api_payload_format="json"),this.set_config(t3.extend({},n9,r,t,{name:n,token:e,callback_fn:(n===n3?n:n3+"."+n)+"._jsc"})),this._jsc=n2,this.__dom_loaded_queue=[],this.__request_queue=[],this.__disabled_events=[],this._flags={disable_all_events:!1,identify_called:!1},// set up request queueing/batching
this.request_batchers={},this._batch_requests=this.get_config("batch_requests"),this._batch_requests){if(t3.localStorage.is_supported(!0)&&n5){if(this.init_batchers(),n7&&x.addEventListener){// Before page closes or hides (user tabs away etc), attempt to flush any events
// queued up via navigator.sendBeacon. Since sendBeacon doesn't report success/failure,
// events will not be removed from the persistent store; if the site is loaded again,
// the events will be flushed again on startup and deduplicated on the Mixpanel server
// side.
// There is no reliable way to capture only page close events, so we lean on the
// visibilitychange and pagehide events as recommended at
// https://developer.mozilla.org/en-US/docs/Web/API/Window/unload_event#usage_notes.
// These events fire when the user clicks away from the current page/tab, so will occur
// more frequently than page unload, but are the only mechanism currently for capturing
// this scenario somewhat reliably.
var o=t3.bind(function(){this.request_batchers.events.stopped||this.request_batchers.events.flush({unloading:!0})},this);x.addEventListener("pagehide",function(e){e.persisted&&o()}),x.addEventListener("visibilitychange",function(){"hidden"===tY.visibilityState&&o()})}}else this._batch_requests=!1,t4.log("Turning off Mixpanel request-queueing; needs XHR and localStorage support")}this.persistence=this.cookie=new n0(this.config),this.unpersisted_superprops={},this._gdpr_init();var i=t3.UUID();this.get_distinct_id()||// or the device id if something was already stored
// in the persitence
this.register_once({distinct_id:n6+i,$device_id:i},""),this.get_config("track_pageview")&&this.track_pageview()},// Private methods
rt.prototype._loaded=function(){this.get_config("loaded")(this),this._set_default_superprops()},// update persistence with info on referrer, UTM params, etc
rt.prototype._set_default_superprops=function(){this.persistence.update_search_keyword(tY.referrer),this.get_config("store_google")&&this.register(t3.info.campaignParams(),{persistent:!1}),this.get_config("save_referrer")&&this.persistence.update_referrer_info(tY.referrer)},rt.prototype._dom_loaded=function(){t3.each(this.__dom_loaded_queue,function(e){this._track_dom.apply(this,e)},this),this.has_opted_out_tracking()||t3.each(this.__request_queue,function(e){this._send_request.apply(this,e)},this),delete this.__dom_loaded_queue,delete this.__request_queue},rt.prototype._track_dom=function(e,t){if(this.get_config("img"))return this.report_error("You can't use DOM tracking functions with img = true."),!1;if(!re)return this.__dom_loaded_queue.push([e,t]),!1;var n=new e().init(this);return n.track.apply(n,t)},/**
 * _prepare_callback() should be called by callers of _send_request for use
 * as the callback argument.
 *
 * If there is no callback, this returns null.
 * If we are going to make XHR/XDR requests, this returns a function.
 * If we are going to use script tags, this returns a string to use as the
 * callback GET param.
 */rt.prototype._prepare_callback=function(e,t){if(t3.isUndefined(e))return null;if(n5)return function(n){e(n,t)};// if the user gives us a callback, we store as a random
// property on this instances jsc function and update our
// callback string to reflect that.
var n=this._jsc,r=""+Math.floor(1e8*Math.random()),o=this.get_config("callback_fn")+"["+r+"]";return n[r]=function(o){delete n[r],e(o,t)},o},rt.prototype._send_request=function(e,t,n,r){var o=!0;if(n8)return this.__request_queue.push(arguments),o;var i={method:this.get_config("api_method"),transport:this.get_config("api_transport"),verbose:this.get_config("verbose")},a=null;!r&&(t3.isFunction(n)||"string"==typeof n)&&(r=n,n=null),n=t3.extend(i,n||{}),n5||(n.method="GET");var s="POST"===n.method,u=n7&&s&&"sendbeacon"===n.transport.toLowerCase(),l=n.verbose;t.verbose&&(l=!0),this.get_config("test")&&(t.test=1),l&&(t.verbose=1),this.get_config("img")&&(t.img=1),!n5&&(r?t.callback=r:(l||this.get_config("test"))&&// which by itself is not valid javascript. Without a callback, this verbose output will
// cause an error when returned via jsonp, so we force a no-op callback param.
// See the ECMA script spec: http://www.ecma-international.org/ecma-262/5.1/#sec-12.4
(t.callback="(function(){})")),t.ip=this.get_config("ip")?1:0,t._=new Date().getTime().toString(),s&&(a="data="+encodeURIComponent(t.data),delete t.data),e+="?"+t3.HTTPBuildQuery(t);var c=this;if("img"in t){var d=tY.createElement("img");d.src=e,tY.body.appendChild(d)}else if(u){try{o=n7(e,a)}catch(e){c.report_error(e),o=!1}try{r&&r(o?1:0)}catch(e){c.report_error(e)}}else if(n5)try{var f=new XMLHttpRequest;f.open(n.method,e,!0);var p=this.get_config("xhr_headers");if(s&&(p["Content-Type"]="application/x-www-form-urlencoded"),t3.each(p,function(e,t){f.setRequestHeader(t,e)}),n.timeout_ms&&void 0!==f.timeout){f.timeout=n.timeout_ms;var h=new Date().getTime()}// send the mp_optout cookie
// withCredentials cannot be modified until after calling .open on Android and Mobile Safari
f.withCredentials=!0,f.onreadystatechange=function(){if(4===f.readyState){var e,t;if(200===f.status){if(r){if(l){try{e=t3.JSONDecode(f.responseText)}catch(t){if(c.report_error(t),!n.ignore_json_errors)return;e=f.responseText}r(e)}else r(Number(f.responseText))}}else t=f.timeout&&!f.status&&new Date().getTime()-h>=f.timeout?"timeout":"Bad HTTP status: "+f.status+" "+f.statusText,c.report_error(t),r&&(l?r({status:0,error:t,xhr_req:f}):r(0))}},f.send(a)}catch(e){c.report_error(e),o=!1}else{var m=tY.createElement("script");m.type="text/javascript",m.async=!0,m.defer=!0,m.src=e;var g=tY.getElementsByTagName("script")[0];g.parentNode.insertBefore(m,g)}return o},/**
 * _execute_array() deals with processing any mixpanel function
 * calls that were called before the Mixpanel library were loaded
 * (and are thus stored in an array so they can be called later)
 *
 * Note: we fire off all the mixpanel function calls && user defined
 * functions BEFORE we fire off mixpanel tracking calls. This is so
 * identify/register/set_config calls can properly modify early
 * tracking calls.
 *
 * @param {Array} array
 */rt.prototype._execute_array=function(e){var t,n=[],r=[],o=[];t3.each(e,function(e){e&&(t=e[0],t3.isArray(t)?o.push(e):"function"==typeof e?e.call(this):t3.isArray(e)&&"alias"===t?n.push(e):t3.isArray(e)&&-1!==t.indexOf("track")&&"function"==typeof this[t]?o.push(e):r.push(e))},this);var i=function(e,t){t3.each(e,function(e){if(t3.isArray(e[0])){// chained call
var n=t;t3.each(e,function(e){n=n[e[0]].apply(n,e.slice(1))})}else this[e[0]].apply(this,e.slice(1))},t)};i(n,this),i(r,this),i(o,this)},// request queueing utils
rt.prototype.are_batchers_initialized=function(){return!!this.request_batchers.events},rt.prototype.init_batchers=function(){var e=this.get_config("token");if(!this.are_batchers_initialized()){var t=t3.bind(function(t){return new nb("__mpq_"+e+t.queue_suffix,{libConfig:this.config,sendRequestFunc:t3.bind(function(e,n,r){this._send_request(this.get_config("api_host")+t.endpoint,this._encode_data_for_request(e),n,this._prepare_callback(r,e))},this),beforeSendHook:t3.bind(function(e){return this._run_hook("before_send_"+t.type,e)},this),errorReporter:this.get_config("error_reporter"),stopAllBatchingFunc:t3.bind(this.stop_batch_senders,this)})},this);this.request_batchers={events:t({type:"events",endpoint:"/track/",queue_suffix:"_ev"}),people:t({type:"people",endpoint:"/engage/",queue_suffix:"_pp"}),groups:t({type:"groups",endpoint:"/groups/",queue_suffix:"_gr"})}}this.get_config("batch_autostart")&&this.start_batch_senders()},rt.prototype.start_batch_senders=function(){this.are_batchers_initialized()&&(this._batch_requests=!0,t3.each(this.request_batchers,function(e){e.start()}))},rt.prototype.stop_batch_senders=function(){this._batch_requests=!1,t3.each(this.request_batchers,function(e){e.stop(),e.clear()})},/**
 * push() keeps the standard async-array-push
 * behavior around after the lib is loaded.
 * This is only useful for external integrations that
 * do not wish to rely on our convenience methods
 * (created in the snippet).
 *
 * ### Usage:
 *     mixpanel.push(['register', { a: 'b' }]);
 *
 * @param {Array} item A [function_name, args...] array to be executed
 */rt.prototype.push=function(e){this._execute_array([e])},/**
 * Disable events on the Mixpanel object. If passed no arguments,
 * this function disables tracking of any event. If passed an
 * array of event names, those events will be disabled, but other
 * events will continue to be tracked.
 *
 * Note: this function does not stop other mixpanel functions from
 * firing, such as register() or people.set().
 *
 * @param {Array} [events] An array of event names to disable
 */rt.prototype.disable=function(e){void 0===e?this._flags.disable_all_events=!0:this.__disabled_events=this.__disabled_events.concat(e)},rt.prototype._encode_data_for_request=function(e){var t=t3.JSONEncode(e);return this.get_config("api_payload_format")===n4&&(t=t3.base64Encode(t)),{data:t}},// internal method for handling track vs batch-enqueue logic
rt.prototype._track_or_batch=function(e,t){var n=t3.truncate(e.data,255),r=e.endpoint,o=e.batcher,i=e.should_send_immediately,a=e.send_request_options||{};t=t||n2;var s=!0,u=t3.bind(function(){return(a.skip_hooks||(n=this._run_hook("before_send_"+e.type,n)),n)?(t4.log("MIXPANEL REQUEST:"),t4.log(n),this._send_request(r,this._encode_data_for_request(n),a,this._prepare_callback(t,n))):null},this);return this._batch_requests&&!i?o.enqueue(n,function(e){e?t(1,n):u()}):s=u(),s&&n},/**
 * Track an event. This is the most important and
 * frequently used Mixpanel function.
 *
 * ### Usage:
 *
 *     // track an event named 'Registered'
 *     mixpanel.track('Registered', {'Gender': 'Male', 'Age': 21});
 *
 *     // track an event using navigator.sendBeacon
 *     mixpanel.track('Left page', {'duration_seconds': 35}, {transport: 'sendBeacon'});
 *
 * To track link clicks or form submissions, see track_links() or track_forms().
 *
 * @param {String} event_name The name of the event. This can be anything the user does - 'Button Click', 'Sign Up', 'Item Purchased', etc.
 * @param {Object} [properties] A set of properties to include with the event you're sending. These describe the user who did the event or details about the event itself.
 * @param {Object} [options] Optional configuration for this track request.
 * @param {String} [options.transport] Transport method for network request ('xhr' or 'sendBeacon').
 * @param {Boolean} [options.send_immediately] Whether to bypass batching/queueing and send track request immediately.
 * @param {Function} [callback] If provided, the callback function will be called after tracking the event.
 * @returns {Boolean|Object} If the tracking request was successfully initiated/queued, an object
 * with the tracking payload sent to the API server is returned; otherwise false.
 */rt.prototype.track=nx(function(e,t,n,r){r||"function"!=typeof n||(r=n,n=null);var o=(n=n||{}).transport;// external API, don't minify 'transport' prop
o&&(n.transport=o);var i=n.send_immediately;if("function"!=typeof r&&(r=n2),t3.isUndefined(e)){this.report_error("No event name provided to mixpanel.track");return}if(this._event_is_disabled(e)){r(0);return}// set defaults
(t=t||{}).token=this.get_config("token");// set $duration if time_event was previously called for this event
var a=this.persistence.remove_event_timer(e);if(!t3.isUndefined(a)){var s=new Date().getTime()-a;t.$duration=parseFloat((s/1e3).toFixed(3))}this._set_default_superprops();var u=this.get_config("track_marketing")?t3.info.marketingParams():{};// note: extend writes to the first object, so lets make sure we
// don't write to the persistence properties object and info
// properties object by passing in a new object
// update properties with pageview info and super-properties
t=t3.extend({},t3.info.properties(),u,this.persistence.properties(),this.unpersisted_superprops,t);var l=this.get_config("property_blacklist");t3.isArray(l)?t3.each(l,function(e){delete t[e]}):this.report_error("Invalid value for property_blacklist config: "+l);var c={event:e,properties:t};return this._track_or_batch({type:"events",data:c,endpoint:this.get_config("api_host")+"/track/",batcher:this.request_batchers.events,should_send_immediately:i,send_request_options:n},r)}),/**
 * Register the current user into one/many groups.
 *
 * ### Usage:
 *
 *      mixpanel.set_group('company', ['mixpanel', 'google']) // an array of IDs
 *      mixpanel.set_group('company', 'mixpanel')
 *      mixpanel.set_group('company', 128746312)
 *
 * @param {String} group_key Group key
 * @param {Array|String|Number} group_ids An array of group IDs, or a singular group ID
 * @param {Function} [callback] If provided, the callback will be called after tracking the event.
 *
 */rt.prototype.set_group=nx(function(e,t,n){t3.isArray(t)||(t=[t]);var r={};return r[e]=t,this.register(r),this.people.set(e,t,n)}),/**
 * Add a new group for this user.
 *
 * ### Usage:
 *
 *      mixpanel.add_group('company', 'mixpanel')
 *
 * @param {String} group_key Group key
 * @param {*} group_id A valid Mixpanel property type
 * @param {Function} [callback] If provided, the callback will be called after tracking the event.
 */rt.prototype.add_group=nx(function(e,t,n){var r=this.get_property(e);if(void 0===r){var o={};o[e]=[t],this.register(o)}else -1===r.indexOf(t)&&(r.push(t),this.register(o));return this.people.union(e,t,n)}),/**
 * Remove a group from this user.
 *
 * ### Usage:
 *
 *      mixpanel.remove_group('company', 'mixpanel')
 *
 * @param {String} group_key Group key
 * @param {*} group_id A valid Mixpanel property type
 * @param {Function} [callback] If provided, the callback will be called after tracking the event.
 */rt.prototype.remove_group=nx(function(e,t,n){var r=this.get_property(e);// if the value doesn't exist, the persistent store is unchanged
if(void 0!==r){var o=r.indexOf(t);o>-1&&(r.splice(o,1),this.register({group_key:r})),0===r.length&&this.unregister(e)}return this.people.remove(e,t,n)}),/**
 * Track an event with specific groups.
 *
 * ### Usage:
 *
 *      mixpanel.track_with_groups('purchase', {'product': 'iphone'}, {'University': ['UCB', 'UCLA']})
 *
 * @param {String} event_name The name of the event (see `mixpanel.track()`)
 * @param {Object=} properties A set of properties to include with the event you're sending (see `mixpanel.track()`)
 * @param {Object=} groups An object mapping group name keys to one or more values
 * @param {Function} [callback] If provided, the callback will be called after tracking the event.
 */rt.prototype.track_with_groups=nx(function(e,t,n,r){var o=t3.extend({},t||{});return t3.each(n,function(e,t){null!=e&&(o[t]=e)}),this.track(e,o,r)}),rt.prototype._create_map_key=function(e,t){return e+"_"+JSON.stringify(t)},rt.prototype._remove_group_from_cache=function(e,t){delete this._cached_groups[this._create_map_key(e,t)]},/**
 * Look up reference to a Mixpanel group
 *
 * ### Usage:
 *
 *       mixpanel.get_group(group_key, group_id)
 *
 * @param {String} group_key Group key
 * @param {Object} group_id A valid Mixpanel property type
 * @returns {Object} A MixpanelGroup identifier
 */rt.prototype.get_group=function(e,t){var n=this._create_map_key(e,t),r=this._cached_groups[n];return(void 0===r||r._group_key!==e||r._group_id!==t)&&((r=new nq)._init(this,e,t),this._cached_groups[n]=r),r},/**
 * Track a default Mixpanel page view event, which includes extra default event properties to
 * improve page view data. The `config.track_pageview` option for <a href="#mixpanelinit">mixpanel.init()</a>
 * may be turned on for tracking page loads automatically.
 *
 * ### Usage
 *
 *     // track a default $mp_web_page_view event
 *     mixpanel.track_pageview();
 *
 *     // track a page view event with additional event properties
 *     mixpanel.track_pageview({'ab_test_variant': 'card-layout-b'});
 *
 *     // example approach to track page views on different page types as event properties
 *     mixpanel.track_pageview({'page': 'pricing'});
 *     mixpanel.track_pageview({'page': 'homepage'});
 *
 *     // UNCOMMON: Tracking a page view event with a custom event_name option. NOT expected to be used for
 *     // individual pages on the same site or product. Use cases for custom event_name may be page
 *     // views on different products or internal applications that are considered completely separate
 *     mixpanel.track_pageview({'page': 'customer-search'}, {'event_name': '[internal] Admin Page View'});
 *
 * @param {Object} [properties] An optional set of additional properties to send with the page view event
 * @param {Object} [options] Page view tracking options
 * @param {String} [options.event_name] - Alternate name for the tracking event
 * @returns {Boolean|Object} If the tracking request was successfully initiated/queued, an object
 * with the tracking payload sent to the API server is returned; otherwise false.
 */rt.prototype.track_pageview=nx(function(e,t){"object"!=typeof e&&(e={});var n=(t=t||{}).event_name||"$mp_web_page_view",r=t3.extend(t3.info.mpPageViewProperties(),t3.info.campaignParams(),t3.info.clickParams()),o=t3.extend({},r,e);return this.track(n,o)}),/**
 * Track clicks on a set of document elements. Selector must be a
 * valid query. Elements must exist on the page at the time track_links is called.
 *
 * ### Usage:
 *
 *     // track click for link id #nav
 *     mixpanel.track_links('#nav', 'Clicked Nav Link');
 *
 * ### Notes:
 *
 * This function will wait up to 300 ms for the Mixpanel
 * servers to respond. If they have not responded by that time
 * it will head to the link without ensuring that your event
 * has been tracked.  To configure this timeout please see the
 * set_config() documentation below.
 *
 * If you pass a function in as the properties argument, the
 * function will receive the DOMElement that triggered the
 * event as an argument.  You are expected to return an object
 * from the function; any properties defined on this object
 * will be sent to mixpanel as event properties.
 *
 * @type {Function}
 * @param {Object|String} query A valid DOM query, element or jQuery-esque list
 * @param {String} event_name The name of the event to track
 * @param {Object|Function} [properties] A properties object or function that returns a dictionary of properties when passed a DOMElement
 */rt.prototype.track_links=function(){return this._track_dom.call(this,nc,arguments)},/**
 * Track form submissions. Selector must be a valid query.
 *
 * ### Usage:
 *
 *     // track submission for form id 'register'
 *     mixpanel.track_forms('#register', 'Created Account');
 *
 * ### Notes:
 *
 * This function will wait up to 300 ms for the mixpanel
 * servers to respond, if they have not responded by that time
 * it will head to the link without ensuring that your event
 * has been tracked.  To configure this timeout please see the
 * set_config() documentation below.
 *
 * If you pass a function in as the properties argument, the
 * function will receive the DOMElement that triggered the
 * event as an argument.  You are expected to return an object
 * from the function; any properties defined on this object
 * will be sent to mixpanel as event properties.
 *
 * @type {Function}
 * @param {Object|String} query A valid DOM query, element or jQuery-esque list
 * @param {String} event_name The name of the event to track
 * @param {Object|Function} [properties] This can be a set of properties, or a function that returns a set of properties after being passed a DOMElement
 */rt.prototype.track_forms=function(){return this._track_dom.call(this,nd,arguments)},/**
 * Time an event by including the time between this call and a
 * later 'track' call for the same event in the properties sent
 * with the event.
 *
 * ### Usage:
 *
 *     // time an event named 'Registered'
 *     mixpanel.time_event('Registered');
 *     mixpanel.track('Registered', {'Gender': 'Male', 'Age': 21});
 *
 * When called for a particular event name, the next track call for that event
 * name will include the elapsed time between the 'time_event' and 'track'
 * calls. This value is stored as seconds in the '$duration' property.
 *
 * @param {String} event_name The name of the event.
 */rt.prototype.time_event=function(e){if(t3.isUndefined(e)){this.report_error("No event name provided to mixpanel.time_event");return}this._event_is_disabled(e)||this.persistence.set_event_timer(e,new Date().getTime())};var rr={persistent:!0},ro=function(e){var t;return t=t3.isObject(e)?e:t3.isUndefined(e)?{}:{days:e},t3.extend({},rr,t)};/**
 * Register a set of super properties, which are included with all
 * events. This will overwrite previous super property values.
 *
 * ### Usage:
 *
 *     // register 'Gender' as a super property
 *     mixpanel.register({'Gender': 'Female'});
 *
 *     // register several super properties when a user signs up
 *     mixpanel.register({
 *         'Email': 'jdoe@example.com',
 *         'Account Type': 'Free'
 *     });
 *
 *     // register only for the current pageload
 *     mixpanel.register({'Name': 'Pat'}, {persistent: false});
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {Number|Object} [days_or_options] Options object or number of days since the user's last visit to store the super properties (only valid for persisted props)
 * @param {boolean} [days_or_options.days] - number of days since the user's last visit to store the super properties (only valid for persisted props)
 * @param {boolean} [days_or_options.persistent=true] - whether to put in persistent storage (cookie/localStorage)
 */rt.prototype.register=function(e,t){var n=ro(t);n.persistent?this.persistence.register(e,n.days):t3.extend(this.unpersisted_superprops,e)},/**
 * Register a set of super properties only once. This will not
 * overwrite previous super property values, unlike register().
 *
 * ### Usage:
 *
 *     // register a super property for the first time only
 *     mixpanel.register_once({
 *         'First Login Date': new Date().toISOString()
 *     });
 *
 *     // register once, only for the current pageload
 *     mixpanel.register_once({
 *         'First interaction time': new Date().toISOString()
 *     }, 'None', {persistent: false});
 *
 * ### Notes:
 *
 * If default_value is specified, current super properties
 * with that value will be overwritten.
 *
 * @param {Object} properties An associative array of properties to store about the user
 * @param {*} [default_value] Value to override if already set in super properties (ex: 'False') Default: 'None'
 * @param {Number|Object} [days_or_options] Options object or number of days since the user's last visit to store the super properties (only valid for persisted props)
 * @param {boolean} [days_or_options.days] - number of days since the user's last visit to store the super properties (only valid for persisted props)
 * @param {boolean} [days_or_options.persistent=true] - whether to put in persistent storage (cookie/localStorage)
 */rt.prototype.register_once=function(e,t,n){var r=ro(n);r.persistent?this.persistence.register_once(e,t,r.days):(void 0===t&&(t="None"),t3.each(e,function(e,n){this.unpersisted_superprops.hasOwnProperty(n)&&this.unpersisted_superprops[n]!==t||(this.unpersisted_superprops[n]=e)},this))},/**
 * Delete a super property stored with the current user.
 *
 * @param {String} property The name of the super property to remove
 * @param {Object} [options]
 * @param {boolean} [options.persistent=true] - whether to look in persistent storage (cookie/localStorage)
 */rt.prototype.unregister=function(e,t){(t=ro(t)).persistent?this.persistence.unregister(e):delete this.unpersisted_superprops[e]},rt.prototype._register_single=function(e,t){var n={};n[e]=t,this.register(n)},/**
 * Identify a user with a unique ID to track user activity across
 * devices, tie a user to their events, and create a user profile.
 * If you never call this method, unique visitors are tracked using
 * a UUID generated the first time they visit the site.
 *
 * Call identify when you know the identity of the current user,
 * typically after login or signup. We recommend against using
 * identify for anonymous visitors to your site.
 *
 * ### Notes:
 * If your project has
 * <a href="https://help.mixpanel.com/hc/en-us/articles/360039133851">ID Merge</a>
 * enabled, the identify method will connect pre- and
 * post-authentication events when appropriate.
 *
 * If your project does not have ID Merge enabled, identify will
 * change the user's local distinct_id to the unique ID you pass.
 * Events tracked prior to authentication will not be connected
 * to the same user identity. If ID Merge is disabled, alias can
 * be used to connect pre- and post-registration events.
 *
 * @param {String} [unique_id] A string that uniquely identifies a user. If not provided, the distinct_id currently in the persistent store (cookie or localStorage) will be used.
 */rt.prototype.identify=function(e,t,n,r,o,i,a,s){// Optional Parameters
//  _set_callback:function  A callback to be run if and when the People set queue is flushed
//  _add_callback:function  A callback to be run if and when the People add queue is flushed
//  _append_callback:function  A callback to be run if and when the People append queue is flushed
//  _set_once_callback:function  A callback to be run if and when the People set_once queue is flushed
//  _union_callback:function  A callback to be run if and when the People union queue is flushed
//  _unset_callback:function  A callback to be run if and when the People unset queue is flushed
var u=this.get_distinct_id();if(e&&u!==e){// we allow the following condition if previous distinct_id is same as new_distinct_id
// so that you can force flush people updates for anonymous profiles.
if("string"==typeof e&&0===e.indexOf(n6))return this.report_error("distinct_id cannot have $device: prefix"),-1;this.register({$user_id:e})}this.get_property("$device_id")||this.register_once({$had_persisted_distinct_id:!0,$device_id:u},""),e!==u&&e!==this.get_property(nX)&&(this.unregister(nX),this.register({distinct_id:e})),this._flags.identify_called=!0,// Flush any queued up people requests
this.people._flush(t,n,r,o,i,a,s),e!==u&&this.track("$identify",{distinct_id:e,$anon_distinct_id:u},{skip_hooks:!0})},/**
 * Clears super properties and generates a new random distinct_id for this instance.
 * Useful for clearing data when a user logs out.
 */rt.prototype.reset=function(){this.persistence.clear(),this._flags.identify_called=!1;var e=t3.UUID();this.register_once({distinct_id:n6+e,$device_id:e},"")},/**
 * Returns the current distinct id of the user. This is either the id automatically
 * generated by the library or the id that has been passed by a call to identify().
 *
 * ### Notes:
 *
 * get_distinct_id() can only be called after the Mixpanel library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // set distinct_id after the mixpanel library has loaded
 *     mixpanel.init('YOUR PROJECT TOKEN', {
 *         loaded: function(mixpanel) {
 *             distinct_id = mixpanel.get_distinct_id();
 *         }
 *     });
 */rt.prototype.get_distinct_id=function(){return this.get_property("distinct_id")},/**
 * The alias method creates an alias which Mixpanel will use to
 * remap one id to another. Multiple aliases can point to the
 * same identifier.
 *
 * The following is a valid use of alias:
 *
 *     mixpanel.alias('new_id', 'existing_id');
 *     // You can add multiple id aliases to the existing ID
 *     mixpanel.alias('newer_id', 'existing_id');
 *
 * Aliases can also be chained - the following is a valid example:
 *
 *     mixpanel.alias('new_id', 'existing_id');
 *     // chain newer_id - new_id - existing_id
 *     mixpanel.alias('newer_id', 'new_id');
 *
 * Aliases cannot point to multiple identifiers - the following
 * example will not work:
 *
 *     mixpanel.alias('new_id', 'existing_id');
 *     // this is invalid as 'new_id' already points to 'existing_id'
 *     mixpanel.alias('new_id', 'newer_id');
 *
 * ### Notes:
 *
 * If your project does not have
 * <a href="https://help.mixpanel.com/hc/en-us/articles/360039133851">ID Merge</a>
 * enabled, the best practice is to call alias once when a unique
 * ID is first created for a user (e.g., when a user first registers
 * for an account). Do not use alias multiple times for a single
 * user without ID Merge enabled.
 *
 * @param {String} alias A unique identifier that you want to use for this user in the future.
 * @param {String} [original] The current identifier being used for this user.
 */rt.prototype.alias=function(e,t){// If the $people_distinct_id key exists in persistence, there has been a previous
// mixpanel.people.identify() call made for this user. It is VERY BAD to make an alias with
// this ID, as it will duplicate users.
if(e===this.get_property(nG))return this.report_error("Attempting to create alias for existing People user - aborting."),-2;var n=this;return(t3.isUndefined(t)&&(t=this.get_distinct_id()),e!==t)?(this._register_single(nX,e),this.track("$create_alias",{alias:e,distinct_id:t},{skip_hooks:!0},function(){// Flush the people queue
n.identify(e)})):(this.report_error("alias matches current distinct_id - skipping api call."),this.identify(e),-1)},/**
 * Provide a string to recognize the user by. The string passed to
 * this method will appear in the Mixpanel Streams product rather
 * than an automatically generated name. Name tags do not have to
 * be unique.
 *
 * This value will only be included in Streams data.
 *
 * @param {String} name_tag A human readable name for the user
 * @deprecated
 */rt.prototype.name_tag=function(e){this._register_single("mp_name_tag",e)},/**
 * Update the configuration of a mixpanel library instance.
 *
 * The default config is:
 *
 *     {
 *       // HTTP method for tracking requests
 *       api_method: 'POST'
 *
 *       // transport for sending requests ('XHR' or 'sendBeacon')
 *       // NB: sendBeacon should only be used for scenarios such as
 *       // page unload where a "best-effort" attempt to send is
 *       // acceptable; the sendBeacon API does not support callbacks
 *       // or any way to know the result of the request. Mixpanel
 *       // tracking via sendBeacon will not support any event-
 *       // batching or retry mechanisms.
 *       api_transport: 'XHR'
 *
 *       // request-batching/queueing/retry
 *       batch_requests: true,
 *
 *       // maximum number of events/updates to send in a single
 *       // network request
 *       batch_size: 50,
 *
 *       // milliseconds to wait between sending batch requests
 *       batch_flush_interval_ms: 5000,
 *
 *       // milliseconds to wait for network responses to batch requests
 *       // before they are considered timed-out and retried
 *       batch_request_timeout_ms: 90000,
 *
 *       // override value for cookie domain, only useful for ensuring
 *       // correct cross-subdomain cookies on unusual domains like
 *       // subdomain.mainsite.avocat.fr; NB this cannot be used to
 *       // set cookies on a different domain than the current origin
 *       cookie_domain: ''
 *
 *       // super properties cookie expiration (in days)
 *       cookie_expiration: 365
 *
 *       // if true, cookie will be set with SameSite=None; Secure
 *       // this is only useful in special situations, like embedded
 *       // 3rd-party iframes that set up a Mixpanel instance
 *       cross_site_cookie: false
 *
 *       // super properties span subdomains
 *       cross_subdomain_cookie: true
 *
 *       // debug mode
 *       debug: false
 *
 *       // if this is true, the mixpanel cookie or localStorage entry
 *       // will be deleted, and no user persistence will take place
 *       disable_persistence: false
 *
 *       // if this is true, Mixpanel will automatically determine
 *       // City, Region and Country data using the IP address of
 *       //the client
 *       ip: true
 *
 *       // opt users out of tracking by this Mixpanel instance by default
 *       opt_out_tracking_by_default: false
 *
 *       // opt users out of browser data storage by this Mixpanel instance by default
 *       opt_out_persistence_by_default: false
 *
 *       // persistence mechanism used by opt-in/opt-out methods - cookie
 *       // or localStorage - falls back to cookie if localStorage is unavailable
 *       opt_out_tracking_persistence_type: 'localStorage'
 *
 *       // customize the name of cookie/localStorage set by opt-in/opt-out methods
 *       opt_out_tracking_cookie_prefix: null
 *
 *       // type of persistent store for super properties (cookie/
 *       // localStorage) if set to 'localStorage', any existing
 *       // mixpanel cookie value with the same persistence_name
 *       // will be transferred to localStorage and deleted
 *       persistence: 'cookie'
 *
 *       // name for super properties persistent store
 *       persistence_name: ''
 *
 *       // names of properties/superproperties which should never
 *       // be sent with track() calls
 *       property_blacklist: []
 *
 *       // if this is true, mixpanel cookies will be marked as
 *       // secure, meaning they will only be transmitted over https
 *       secure_cookie: false
 *
 *       // disables enriching user profiles with first touch marketing data
 *       skip_first_touch_marketing: false
 *
 *       // the amount of time track_links will
 *       // wait for Mixpanel's servers to respond
 *       track_links_timeout: 300
 *
 *       // adds any UTM parameters and click IDs present on the page to any events fired
 *       track_marketing: true
 *
 *       // enables automatic page view tracking using default page view events through
 *       // the track_pageview() method
 *       track_pageview: false
 *
 *       // if you set upgrade to be true, the library will check for
 *       // a cookie from our old js library and import super
 *       // properties from it, then the old cookie is deleted
 *       // The upgrade config option only works in the initialization,
 *       // so make sure you set it when you create the library.
 *       upgrade: false
 *
 *       // extra HTTP request headers to set for each API request, in
 *       // the format {'Header-Name': value}
 *       xhr_headers: {}
 *
 *       // whether to ignore or respect the web browser's Do Not Track setting
 *       ignore_dnt: false
 *     }
 *
 *
 * @param {Object} config A dictionary of new configuration values to update
 */rt.prototype.set_config=function(e){t3.isObject(e)&&(t3.extend(this.config,e),e.batch_size&&t3.each(this.request_batchers,function(e){e.resetBatchSize()}),this.get_config("persistence_name")||(this.config.persistence_name=this.config.cookie_name),this.get_config("disable_persistence")||(this.config.disable_persistence=this.config.disable_cookie),this.persistence&&this.persistence.update_config(this.config),tU.DEBUG=tU.DEBUG||this.get_config("debug"))},/**
 * returns the current config object for the library.
 */rt.prototype.get_config=function(e){return this.config[e]},/**
 * Fetch a hook function from config, with safe default, and run it
 * against the given arguments
 * @param {string} hook_name which hook to retrieve
 * @returns {any|null} return value of user-provided hook, or null if nothing was returned
 */rt.prototype._run_hook=function(e){var t=(this.config.hooks[e]||n1).apply(this,tB.call(arguments,1));return void 0===t&&(this.report_error(e+" hook did not return a value"),t=null),t},/**
 * Returns the value of the super property named property_name. If no such
 * property is set, get_property() will return the undefined value.
 *
 * ### Notes:
 *
 * get_property() can only be called after the Mixpanel library has finished loading.
 * init() has a loaded function available to handle this automatically. For example:
 *
 *     // grab value for 'user_id' after the mixpanel library has loaded
 *     mixpanel.init('YOUR PROJECT TOKEN', {
 *         loaded: function(mixpanel) {
 *             user_id = mixpanel.get_property('user_id');
 *         }
 *     });
 *
 * @param {String} property_name The name of the super property you want to retrieve
 */rt.prototype.get_property=function(e){return this.persistence.props[e]},rt.prototype.toString=function(){var e=this.get_config("name");return e!==n3&&(e=n3+"."+e),e},rt.prototype._event_is_disabled=function(e){return t3.isBlockedUA(tG)||this._flags.disable_all_events||t3.include(this.__disabled_events,e)},// perform some housekeeping around GDPR opt-in/out state
rt.prototype._gdpr_init=function(){"localStorage"===this.get_config("opt_out_tracking_persistence_type")&&t3.localStorage.is_supported()&&(!this.has_opted_in_tracking()&&this.has_opted_in_tracking({persistence_type:"cookie"})&&this.opt_in_tracking({enable_persistence:!1}),!this.has_opted_out_tracking()&&this.has_opted_out_tracking({persistence_type:"cookie"})&&this.opt_out_tracking({clear_persistence:!1}),this.clear_opt_in_out_tracking({persistence_type:"cookie",enable_persistence:!1})),this.has_opted_out_tracking()?this._gdpr_update_persistence({clear_persistence:!0}):!this.has_opted_in_tracking()&&(this.get_config("opt_out_tracking_by_default")||t3.cookie.get("mp_optout"))&&(t3.cookie.remove("mp_optout"),this.opt_out_tracking({clear_persistence:this.get_config("opt_out_persistence_by_default")}))},/**
 * Enable or disable persistence based on options
 * only enable/disable if persistence is not already in this state
 * @param {boolean} [options.clear_persistence] If true, will delete all data stored by the sdk in persistence and disable it
 * @param {boolean} [options.enable_persistence] If true, will re-enable sdk persistence
 */rt.prototype._gdpr_update_persistence=function(e){var t;if(e&&e.clear_persistence)t=!0;else{if(!e||!e.enable_persistence)return;t=!1}this.get_config("disable_persistence")||this.persistence.disabled===t||this.persistence.set_disabled(t),t&&t3.each(this.request_batchers,function(e){e.clear()})},// call a base gdpr function after constructing the appropriate token and options args
rt.prototype._gdpr_call_func=function(e,t){return t=t3.extend({track:t3.bind(this.track,this),persistence_type:this.get_config("opt_out_tracking_persistence_type"),cookie_prefix:this.get_config("opt_out_tracking_cookie_prefix"),cookie_expiration:this.get_config("cookie_expiration"),cross_site_cookie:this.get_config("cross_site_cookie"),cross_subdomain_cookie:this.get_config("cross_subdomain_cookie"),cookie_domain:this.get_config("cookie_domain"),secure_cookie:this.get_config("secure_cookie"),ignore_dnt:this.get_config("ignore_dnt")},t),t3.localStorage.is_supported()||(t.persistence_type="cookie"),e(this.get_config("token"),{track:t.track,trackEventName:t.track_event_name,trackProperties:t.track_properties,persistenceType:t.persistence_type,persistencePrefix:t.cookie_prefix,cookieDomain:t.cookie_domain,cookieExpiration:t.cookie_expiration,crossSiteCookie:t.cross_site_cookie,crossSubdomainCookie:t.cross_subdomain_cookie,secureCookie:t.secure_cookie,ignoreDnt:t.ignore_dnt})},/**
 * Opt the user in to data tracking and cookies/localstorage for this Mixpanel instance
 *
 * ### Usage
 *
 *     // opt user in
 *     mixpanel.opt_in_tracking();
 *
 *     // opt user in with specific event name, properties, cookie configuration
 *     mixpanel.opt_in_tracking({
 *         track_event_name: 'User opted in',
 *         track_event_properties: {
 *             'Email': 'jdoe@example.com'
 *         },
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {function} [options.track] Function used for tracking a Mixpanel event to record the opt-in action (default is this Mixpanel instance's track method)
 * @param {string} [options.track_event_name=$opt_in] Event name to be used for tracking the opt-in action
 * @param {Object} [options.track_properties] Set of properties to be tracked along with the opt-in action
 * @param {boolean} [options.enable_persistence=true] If true, will re-enable sdk persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__mp_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this Mixpanel instance's config)
 * @param {string} [options.cookie_domain] Custom cookie domain (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.cross_site_cookie] Whether the opt-in cookie is set as cross-site-enabled (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this Mixpanel instance's config)
 */rt.prototype.opt_in_tracking=function(e){e=t3.extend({enable_persistence:!0},e),this._gdpr_call_func(nw,e),this._gdpr_update_persistence(e)},/**
 * Opt the user out of data tracking and cookies/localstorage for this Mixpanel instance
 *
 * ### Usage
 *
 *     // opt user out
 *     mixpanel.opt_out_tracking();
 *
 *     // opt user out with different cookie configuration from Mixpanel instance
 *     mixpanel.opt_out_tracking({
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {boolean} [options.delete_user=true] If true, will delete the currently identified user's profile and clear all charges after opting the user out
 * @param {boolean} [options.clear_persistence=true] If true, will delete all data stored by the sdk in persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__mp_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this Mixpanel instance's config)
 * @param {string} [options.cookie_domain] Custom cookie domain (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.cross_site_cookie] Whether the opt-in cookie is set as cross-site-enabled (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this Mixpanel instance's config)
 */rt.prototype.opt_out_tracking=function(e){(e=t3.extend({clear_persistence:!0,delete_user:!0},e)).delete_user&&this.people&&this.people._identify_called()&&(this.people.delete_user(),this.people.clear_charges()),this._gdpr_call_func(n_,e),this._gdpr_update_persistence(e)},/**
 * Check whether the user has opted in to data tracking and cookies/localstorage for this Mixpanel instance
 *
 * ### Usage
 *
 *     var has_opted_in = mixpanel.has_opted_in_tracking();
 *     // use has_opted_in value
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__mp_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} current opt-in status
 */rt.prototype.has_opted_in_tracking=function(e){return this._gdpr_call_func(nk,e)},/**
 * Check whether the user has opted out of data tracking and cookies/localstorage for this Mixpanel instance
 *
 * ### Usage
 *
 *     var has_opted_out = mixpanel.has_opted_out_tracking();
 *     // use has_opted_out value
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__mp_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} current opt-out status
 */rt.prototype.has_opted_out_tracking=function(e){return this._gdpr_call_func(nS,e)},/**
 * Clear the user's opt in/out status of data tracking and cookies/localstorage for this Mixpanel instance
 *
 * ### Usage
 *
 *     // clear user's opt-in/out status
 *     mixpanel.clear_opt_in_out_tracking();
 *
 *     // clear user's opt-in/out status with specific cookie configuration - should match
 *     // configuration used when opt_in_tracking/opt_out_tracking methods were called.
 *     mixpanel.clear_opt_in_out_tracking({
 *         cookie_expiration: 30,
 *         secure_cookie: true
 *     });
 *
 * @param {Object} [options] A dictionary of config options to override
 * @param {boolean} [options.enable_persistence=true] If true, will re-enable sdk persistence
 * @param {string} [options.persistence_type=localStorage] Persistence mechanism used - cookie or localStorage - falls back to cookie if localStorage is unavailable
 * @param {string} [options.cookie_prefix=__mp_opt_in_out] Custom prefix to be used in the cookie/localstorage name
 * @param {Number} [options.cookie_expiration] Number of days until the opt-in cookie expires (overrides value specified in this Mixpanel instance's config)
 * @param {string} [options.cookie_domain] Custom cookie domain (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.cross_site_cookie] Whether the opt-in cookie is set as cross-site-enabled (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.cross_subdomain_cookie] Whether the opt-in cookie is set as cross-subdomain or not (overrides value specified in this Mixpanel instance's config)
 * @param {boolean} [options.secure_cookie] Whether the opt-in cookie is set as secure or not (overrides value specified in this Mixpanel instance's config)
 */rt.prototype.clear_opt_in_out_tracking=function(e){e=t3.extend({enable_persistence:!0},e),this._gdpr_call_func(nT,e),this._gdpr_update_persistence(e)},rt.prototype.report_error=function(e,t){t4.error.apply(t4.error,arguments);try{t||e instanceof Error||(e=Error(e)),this.get_config("error_reporter")(e,t)}catch(e){t4.error(e)}},// EXPORTS (for closure compiler)
// MixpanelLib Exports
rt.prototype.init=rt.prototype.init,rt.prototype.reset=rt.prototype.reset,rt.prototype.disable=rt.prototype.disable,rt.prototype.time_event=rt.prototype.time_event,rt.prototype.track=rt.prototype.track,rt.prototype.track_links=rt.prototype.track_links,rt.prototype.track_forms=rt.prototype.track_forms,rt.prototype.track_pageview=rt.prototype.track_pageview,rt.prototype.register=rt.prototype.register,rt.prototype.register_once=rt.prototype.register_once,rt.prototype.unregister=rt.prototype.unregister,rt.prototype.identify=rt.prototype.identify,rt.prototype.alias=rt.prototype.alias,rt.prototype.name_tag=rt.prototype.name_tag,rt.prototype.set_config=rt.prototype.set_config,rt.prototype.get_config=rt.prototype.get_config,rt.prototype.get_property=rt.prototype.get_property,rt.prototype.get_distinct_id=rt.prototype.get_distinct_id,rt.prototype.toString=rt.prototype.toString,rt.prototype.opt_out_tracking=rt.prototype.opt_out_tracking,rt.prototype.opt_in_tracking=rt.prototype.opt_in_tracking,rt.prototype.has_opted_out_tracking=rt.prototype.has_opted_out_tracking,rt.prototype.has_opted_in_tracking=rt.prototype.has_opted_in_tracking,rt.prototype.clear_opt_in_out_tracking=rt.prototype.clear_opt_in_out_tracking,rt.prototype.get_group=rt.prototype.get_group,rt.prototype.set_group=rt.prototype.set_group,rt.prototype.add_group=rt.prototype.add_group,rt.prototype.remove_group=rt.prototype.remove_group,rt.prototype.track_with_groups=rt.prototype.track_with_groups,rt.prototype.start_batch_senders=rt.prototype.start_batch_senders,rt.prototype.stop_batch_senders=rt.prototype.stop_batch_senders,// MixpanelPersistence Exports
n0.prototype.properties=n0.prototype.properties,n0.prototype.update_search_keyword=n0.prototype.update_search_keyword,n0.prototype.update_referrer_info=n0.prototype.update_referrer_info,n0.prototype.get_cross_subdomain=n0.prototype.get_cross_subdomain,n0.prototype.clear=n0.prototype.clear;var ri={},ra=function(){// add all the sub mixpanel instances
t3.each(ri,function(e,t){t!==n3&&(C[t]=e)}),// add private functions as _
C._=t3};E=0,// we override the snippets init function to handle the case where a
// user initializes the mixpanel library after the script loads & runs
(C=new rt).init=function(e,t,n){if(n)return C[n]||(C[n]=ri[n]=rn(e,t,n),C[n]._loaded()),C[n];var r=C;ri[n3]?r=ri[n3]:e&&(// intialize the main mixpanel lib
(r=rn(e,t,n3))._loaded(),ri[n3]=r),C=r,1===E&&(x[n3]=C),ra()},C.init(),function(){// Cross browser DOM Loaded support
function e(){// function flag since we only want to execute this once
e.done||(e.done=!0,re=!0,n8=!1,t3.each(ri,function(e){e._dom_loaded()}))}if(tY.addEventListener)"complete"===tY.readyState?// external JS (including this file). you will see some copypasta
// on the internet that checks for 'complete' and 'loaded', but
// 'loaded' is an IE thing
e():tY.addEventListener("DOMContentLoaded",e,!1);else if(tY.attachEvent){// IE
tY.attachEvent("onreadystatechange",e);// check to make sure we arn't in a frame
var t=!1;try{t=null===x.frameElement}catch(e){// noop
}tY.documentElement.doScroll&&t&&function t(){try{tY.documentElement.doScroll("left")}catch(e){setTimeout(t,1);return}e()}()}// fallback handler, always will work
t3.register_event(x,"load",e,!0)}(),tA=C;var D=(I("exYeM"),I("exYeM"));let rs=()=>(0,D.useContext)(ax);function ru(){// TODO: temp hack for managing prod and dev env.
let e=!1;return("undefined"==typeof window?e=!0:(window?.location?.host?.includes("localhost")&&(e=!0),window?.location?.host==="stage65-az.harvester.co.uk"&&(e=!0)),e)?{FINGERPRINT_API_HOSTNAME:"https://target-engine-api.starship-staging.com",MIXPANEL_TOKEN:"d122fa924e1ea97d6b98569440c65a95"}:{FINGERPRINT_API_HOSTNAME:"https://target-engine-api.starship-production.com",MIXPANEL_TOKEN:"cfca3a93becd5735a4f04dc8e10ede27"}}// when we're ready to add it back, Sentry is setup with
// SENTRY_DSN:
//     'https://129339f9b28f958328e76d62fb3f0b2b@o1282674.ingest.sentry.io/4505641419014144'
var D=I("exYeM"),rl={};rl=function(){/* eslint-disable no-var */function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}/* eslint-enable no-var */return /* eslint-enable no-var *//* eslint-disable no-var */function t(n,r){function o(t,o,i){if("undefined"!=typeof document){"number"==typeof(i=e({},r,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var a="";for(var s in i)i[s]&&(a+="; "+s,!0!==i[s]&&// Considers RFC 6265 section 5.2:
// ...
// 3.  If the remaining unparsed-attributes contains a %x3B (";")
//     character:
// Consume the characters of the unparsed-attributes up to,
// not including, the first %x3B (";") character.
// ...
(a+="="+i[s].split(";")[0]));return document.cookie=t+"="+n.write(o,t)+a}}return Object.create({set:o,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],r={},o=0;o<t.length;o++){var i=t[o].split("="),a=i.slice(1).join("=");try{var s=decodeURIComponent(i[0]);if(r[s]=n.read(a,s),e===s)break}catch(e){}}return e?r[e]:r}},remove:function(t,n){o(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}();let rc=(e,t,n)=>/*@__PURE__*/O(rl).set(e,t,{expires:n,sameSite:"strict"}),rd=e=>/*@__PURE__*/O(rl).get(e),rf=({appId:e,setSession:t})=>{let n={firstVisit:void 0};if(!rd("_cm")||rd("_cm")!==e){rc("_cm",e,365),t(n);return}rd("_cm")&&rd("_cm")===e&&(n.firstVisit=!1,t(n))};var rp=function(e){if(!tP(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)};let rh=e=>tP(e)&&4===rp(e),rm=e=>{let t=e.split("|");return rh(t[0])},rg=({setVisitor:e,session:t,setSession:n})=>{let r={id:void 0};if(rd(ak)&&(r.jwt=rd(ak)),!rd("_cm_id")||!rm(rd("_cm_id"))){let o=tD(),{sessionId:i,endTime:a}=rv(rd("_cm_id"));rc("_cm_id",`${o}|${i}|${a.toISOString()}`,365),r.id=o,t.id=i,t.endTime=a,n(t),e(r);return}if(rd("_cm_id")){let o=rd("_cm_id"),[i]=o.split("|"),{sessionId:a,endTime:s}=rv(rd("_cm_id"));rc("_cm_id",`${i}|${a}|${s.toISOString()}`,365),r.id=i,t.id=a,t.endTime=s,n(t),e(r)}},rv=e=>{let t;let n=new Date;// Handle session cookie pices
if(n.setMinutes(n.getMinutes()+30),!e||ry(e))t=tD();else{let[,n]=e.split("|");("undefined"===n||void 0===n)&&(n=tD()),t=n}return{sessionId:t,endTime:n}},ry=e=>{if(!e)return!0;let t=e.split("|");if(t.length>1){let e=t[t.length-1],n=Date.parse(e),r=new Date;r.setTime(n);let o=new Date;if(o>r)return!0}return!1},rb=({children:e})=>{let{appId:t,booted:n}=rs(),{log:r}=tL(),[o,i]=(0,D.useState)({}),[a,s]=(0,D.useState)({});return(0,D.useEffect)(()=>{if(!n){r("VisitorProvider: not booted");return}r("VisitorProvider: booting");let e=async()=>{await rf({appId:t,setSession:i}),await rg({setVisitor:s,session:o,setSession:i})};e(),r("VisitorProvider: booted",o,a)},[t,n]),/*@__PURE__*/O(D).createElement(rw.Provider,{value:{session:o,visitor:a}},e)},rw=/*#__PURE__*/(0,D.createContext)({session:{},visitor:{}}),r_=()=>(0,D.useContext)(rw),rk=e=>{/*@__PURE__*/O(tA).init(ru().MIXPANEL_TOKEN,{debug:e.debug,track_pageview:!0,persistence:"localStorage"})},rS=(e,t,n)=>/*@__PURE__*/O(tA).track(e,t,n),rx=({children:e})=>{let{appId:t}=rs(),{visitor:n}=r_(),{log:r}=tL();return(0,D.useEffect)(()=>{t&&n.id&&(r("MixpanelProvider: booting"),rk({debug:!0}),r("MixpanelProvider: registering visitor "+n.id+" to mixpanel"),/*@__PURE__*/O(tA).identify(n.id))},[t,n?.id]),/*@__PURE__*/O(D).createElement(rE.Provider,{value:{trackEvent:rS}},e)},rE=/*#__PURE__*/(0,D.createContext)({trackEvent:()=>{}}),rC=()=>(0,D.useContext)(rE);var D=I("exYeM"),rT=I("fCSDZ"),D=I("exYeM"),rO={};Object.defineProperty(rO,"__esModule",{value:!0});var D=I("exYeM"),rR=(y=D)&&"object"==typeof y&&"default"in y?y.default:y,rP=I("cV6nb"),rI=new rP,rD=rI.getBrowser(),rM=rI.getCPU(),rN=rI.getDevice(),rL=rI.getEngine(),rA=rI.getOS(),rU=rI.getUA(),rj=function(e){return rI.setUA(e)},rF=function(e){if(!e){console.error("No userAgent string was provided");return}var t=new rP(e);return{UA:t,browser:t.getBrowser(),cpu:t.getCPU(),device:t.getDevice(),engine:t.getEngine(),os:t.getOS(),ua:t.getUA(),setUserAgent:function(e){return t.setUA(e)}}},rz=/*#__PURE__*/Object.freeze({ClientUAInstance:rI,browser:rD,cpu:rM,device:rN,engine:rL,os:rA,ua:rU,setUa:rj,parseUserAgent:rF});function rq(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function rB(e){return(rB="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function rV(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r$(){return(r$=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function rW(e){return(rW=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function rH(e,t){return(rH=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function rY(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}function rQ(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function rK(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var rG={Mobile:"mobile",Tablet:"tablet",SmartTv:"smarttv",Console:"console",Wearable:"wearable",Embedded:"embedded",Browser:void 0},rX={Chrome:"Chrome",Firefox:"Firefox",Opera:"Opera",Yandex:"Yandex",Safari:"Safari",InternetExplorer:"Internet Explorer",Edge:"Edge",Chromium:"Chromium",Ie:"IE",MobileSafari:"Mobile Safari",EdgeChromium:"Edge Chromium",MIUI:"MIUI Browser",SamsungBrowser:"Samsung Browser"},rJ={IOS:"iOS",Android:"Android",WindowsPhone:"Windows Phone",Windows:"Windows",MAC_OS:"Mac OS"},rZ={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},r0=function(e){switch(e){case rG.Mobile:return{isMobile:!0};case rG.Tablet:return{isTablet:!0};case rG.SmartTv:return{isSmartTV:!0};case rG.Console:return{isConsole:!0};case rG.Wearable:return{isWearable:!0};case rG.Browser:return{isBrowser:!0};case rG.Embedded:return{isEmbedded:!0};default:return rZ}},r1=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none";return e||t},r2=function(){return!!("undefined"!=typeof window&&(window.navigator||navigator))&&(window.navigator||navigator)},r3=function(e){var t=r2();return t&&t.platform&&(-1!==t.platform.indexOf(e)||"MacIntel"===t.platform&&t.maxTouchPoints>1&&!window.MSStream)},r4=function(e){return e.type===rG.Mobile},r6=function(e){return e.type===rG.Tablet},r5=function(e){var t=e.type;return t===rG.Mobile||t===rG.Tablet},r8=function(e){return e.type===rG.SmartTv},r7=function(e){return e.type===rG.Browser},r9=function(e){return e.type===rG.Wearable},oe=function(e){return e.type===rG.Console},ot=function(e){return e.type===rG.Embedded},on=function(e){return r1(e.vendor)},or=function(e){return r1(e.model)},oo=function(e){return r1(e.type,"browser")},oi=function(e){return e.name===rJ.Android},oa=function(e){return e.name===rJ.Windows},os=function(e){return e.name===rJ.MAC_OS},ou=function(e){return e.name===rJ.WindowsPhone},ol=function(e){return e.name===rJ.IOS},oc=function(e){return r1(e.version)},od=function(e){return r1(e.name)},of=function(e){return e.name===rX.Chrome},op=function(e){return e.name===rX.Firefox},oh=function(e){return e.name===rX.Chromium},om=function(e){return e.name===rX.Edge},og=function(e){return e.name===rX.Yandex},ov=function(e){var t=e.name;return t===rX.Safari||t===rX.MobileSafari},oy=function(e){return e.name===rX.MobileSafari},ob=function(e){return e.name===rX.Opera},ow=function(e){var t=e.name;return t===rX.InternetExplorer||t===rX.Ie},o_=function(e){return e.name===rX.MIUI},ok=function(e){return e.name===rX.SamsungBrowser},oS=function(e){return r1(e.version)},ox=function(e){return r1(e.major)},oE=function(e){return r1(e.name)},oC=function(e){return r1(e.name)},oT=function(e){return r1(e.version)},oO=function(){var e=r2(),t=e&&e.userAgent&&e.userAgent.toLowerCase();return"string"==typeof t&&/electron/.test(t)},oR=function(e){return"string"==typeof e&&-1!==e.indexOf("Edg/")},oP=function(){var e=r2();return e&&(/iPad|iPhone|iPod/.test(e.platform)||"MacIntel"===e.platform&&e.maxTouchPoints>1)&&!window.MSStream},oI=function(){return r3("iPad")},oD=function(){return r3("iPhone")},oM=function(){return r3("iPod")},oN=function(e){return r1(e)};function oL(e){var t=e||rz,n=t.device,r=t.browser,o=t.os,i=t.engine,a=t.ua;return{isSmartTV:r8(n),isConsole:oe(n),isWearable:r9(n),isEmbedded:ot(n),isMobileSafari:oy(r)||oI(),isChromium:oh(r),isMobile:r5(n)||oI(),isMobileOnly:r4(n),isTablet:r6(n)||oI(),isBrowser:r7(n),isDesktop:r7(n),isAndroid:oi(o),isWinPhone:ou(o),isIOS:ol(o)||oI(),isChrome:of(r),isFirefox:op(r),isSafari:ov(r),isOpera:ob(r),isIE:ow(r),osVersion:oc(o),osName:od(o),fullBrowserVersion:oS(r),browserVersion:ox(r),browserName:oE(r),mobileVendor:on(n),mobileModel:or(n),engineName:oC(i),engineVersion:oT(i),getUA:oN(a),isEdge:om(r)||oR(a),isYandex:og(r),deviceType:oo(n),isIOS13:oP(),isIPad13:oI(),isIPhone13:oD(),isIPod13:oM(),isElectron:oO(),isEdgeChromium:oR(a),isLegacyEdge:om(r)&&!oR(a),isWindows:oa(o),isMacOs:os(o),isMIUI:o_(r),isSamsungBrowser:ok(r)}}var oA=r8(rN),oU=oe(rN),oj=r9(rN),oF=ot(rN),oz=oy(rD)||oI(),oq=oh(rD),oB=r5(rN)||oI(),oV=r4(rN),o$=r6(rN)||oI(),oW=r7(rN),oH=r7(rN),oY=oi(rA),oQ=ou(rA),oK=ol(rA)||oI(),oG=of(rD),oX=op(rD),oJ=ov(rD),oZ=ob(rD),o0=ow(rD),o1=oc(rA),o2=od(rA),o3=oS(rD),o4=ox(rD),o6=oE(rD),o5=on(rN),o8=or(rN),o7=oC(rL),o9=oT(rL),ie=oN(rU),it=om(rD)||oR(rU),ir=og(rD),io=oo(rN),ii=oP(),ia=oI(),is=oD(),iu=oM(),il=oO(),ic=oR(rU),id=om(rD)&&!oR(rU),ip=oa(rA),ih=os(rA),im=o_(rD),ig=ok(rD);function iv(e){return rF(e||window.navigator.userAgent)}rO.AndroidView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return oY?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.BrowserTypes=rX,rO.BrowserView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return oW?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.ConsoleView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return oU?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.CustomView=function(e){var t=e.renderWithFragment,n=e.children,r=(e.viewClassName,e.style,e.condition),o=rY(e,["renderWithFragment","children","viewClassName","style","condition"]);return r?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",o,n):null},rO.IEView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return o0?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.IOSView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return oK?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.MobileOnlyView=function(e){var t=e.renderWithFragment,n=e.children,r=(e.viewClassName,e.style,rY(e,["renderWithFragment","children","viewClassName","style"]));return oV?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.MobileView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return oB?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.OsTypes=rJ,rO.SmartTVView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return oA?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.TabletView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return o$?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.WearableView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return oj?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.WinPhoneView=function(e){var t=e.renderWithFragment,n=e.children,r=rY(e,["renderWithFragment","children"]);return oQ?t?rR.createElement(D.Fragment,null,n):rR.createElement("div",r,n):null},rO.browserName=o6,rO.browserVersion=o4,rO.deviceDetect=function(e){var t=e?rF(e):rz,n=t.device,r=t.browser,o=t.engine,i=t.os,a=t.ua,s=r0(n.type),u=s.isBrowser,l=s.isMobile,c=s.isTablet,d=s.isSmartTV,f=s.isConsole,p=s.isWearable,h=s.isEmbedded;return u?{isBrowser:u,browserMajorVersion:r1(r.major),browserFullVersion:r1(r.version),browserName:r1(r.name),engineName:r1(o.name),engineVersion:r1(o.version),osName:r1(i.name),osVersion:r1(i.version),userAgent:r1(a)}:d?{isSmartTV:d,engineName:r1(o.name),engineVersion:r1(o.version),osName:r1(i.name),osVersion:r1(i.version),userAgent:r1(a)}:f?{isConsole:f,engineName:r1(o.name),engineVersion:r1(o.version),osName:r1(i.name),osVersion:r1(i.version),userAgent:r1(a)}:l||c?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?rq(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):rq(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},s,{vendor:r1(n.vendor),model:r1(n.model),os:r1(i.name),osVersion:r1(i.version),ua:r1(a)}):p?{isWearable:p,engineName:r1(o.name),engineVersion:r1(o.version),osName:r1(i.name),osVersion:r1(i.version),userAgent:r1(a)}:h?{isEmbedded:h,vendor:r1(n.vendor),model:r1(n.model),engineName:r1(o.name),engineVersion:r1(o.version),osName:r1(i.name),osVersion:r1(i.version),userAgent:r1(a)}:void 0},rO.deviceType=io,rO.engineName=o7,rO.engineVersion=o9,rO.fullBrowserVersion=o3,rO.getSelectorsByUserAgent=function(e){if(!e||"string"!=typeof e){console.error("No valid user agent string was provided");return}var t=rF(e);return oL({device:t.device,browser:t.browser,os:t.os,engine:t.engine,ua:t.ua})},rO.getUA=ie,rO.isAndroid=oY,rO.isBrowser=oW,rO.isChrome=oG,rO.isChromium=oq,rO.isConsole=oU,rO.isDesktop=oH,rO.isEdge=it,rO.isEdgeChromium=ic,rO.isElectron=il,rO.isEmbedded=oF,rO.isFirefox=oX,rO.isIE=o0,rO.isIOS=oK,rO.isIOS13=ii,rO.isIPad13=ia,rO.isIPhone13=is,rO.isIPod13=iu,rO.isLegacyEdge=id,rO.isMIUI=im,rO.isMacOs=ih,rO.isMobile=oB,rO.isMobileOnly=oV,rO.isMobileSafari=oz,rO.isOpera=oZ,rO.isSafari=oJ,rO.isSamsungBrowser=ig,rO.isSmartTV=oA,rO.isTablet=o$,rO.isWearable=oj,rO.isWinPhone=oQ,rO.isWindows=ip,rO.isYandex=ir,rO.mobileModel=o8,rO.mobileVendor=o5,rO.osName=o2,rO.osVersion=o1,rO.parseUserAgent=rF,rO.setUserAgent=function(e){return rj(e)},rO.useDeviceData=iv,rO.useDeviceSelectors=function(e){var t=iv(e||window.navigator.userAgent);return[oL(t),t]},rO.useMobileOrientation=function(){var e,t=function(e){if(Array.isArray(e))return e}(e=D.useState(function(){var e=window.innerWidth>window.innerHeight?90:0;return{isPortrait:0===e,isLandscape:90===e,orientation:0===e?"portrait":"landscape"}}))||function(e,t){var n,r,o=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=o){var i=[],a=!0,s=!1;try{for(o=o.call(e);!(a=(n=o.next()).done)&&(i.push(n.value),!t||i.length!==t);a=!0);}catch(e){s=!0,r=e}finally{try{a||null==o.return||o.return()}finally{if(s)throw r}}return i}}(e,2)||function(e,t){if(e){if("string"==typeof e)return rK(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return rK(e,t)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),n=t[0],r=t[1],o=D.useCallback(function(){var e=window.innerWidth>window.innerHeight?90:0,t={isPortrait:0===e,isLandscape:90===e,orientation:0===e?"portrait":"landscape"};n.orientation!==t.orientation&&r(t)},[n.orientation]);return D.useEffect(function(){return("undefined"==typeof window?"undefined":rB(window))!==void 0&&oB&&(o(),window.addEventListener("load",o,!1),window.addEventListener("resize",o,!1)),function(){window.removeEventListener("resize",o,!1),window.removeEventListener("load",o,!1)}},[o]),n},rO.withOrientationChange=function(e){return /*#__PURE__*/function(t){var n,r;function o(e){var t;return function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,o),(t=function(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return rQ(e)}(this,rW(o).call(this,e))).isEventListenerAdded=!1,t.handleOrientationChange=t.handleOrientationChange.bind(rQ(t)),t.onOrientationChange=t.onOrientationChange.bind(rQ(t)),t.onPageLoad=t.onPageLoad.bind(rQ(t)),t.state={isLandscape:!1,isPortrait:!1},t}return function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&rH(e,t)}(o,t),n=[{key:"handleOrientationChange",value:function(){this.isEventListenerAdded||(this.isEventListenerAdded=!0);var e=window.innerWidth>window.innerHeight?90:0;this.setState({isPortrait:0===e,isLandscape:90===e})}},{key:"onOrientationChange",value:function(){this.handleOrientationChange()}},{key:"onPageLoad",value:function(){this.handleOrientationChange()}},{key:"componentDidMount",value:function(){("undefined"==typeof window?"undefined":rB(window))!==void 0&&oB&&(this.isEventListenerAdded?window.removeEventListener("load",this.onPageLoad,!1):(this.handleOrientationChange(),window.addEventListener("load",this.onPageLoad,!1)),window.addEventListener("resize",this.onOrientationChange,!1))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onOrientationChange,!1)}},{key:"render",value:function(){return rR.createElement(e,r$({},this.props,{isLandscape:this.state.isLandscape,isPortrait:this.state.isPortrait}))}}],rV(o.prototype,n),r&&rV(o,r),o}(rR.Component)};var D=I("exYeM"),iy={};iy=I("bd4iG");var ib=Object.create,iw=Object.defineProperty,i_=Object.getOwnPropertyDescriptor,ik=Object.getOwnPropertyNames,iS=Object.getPrototypeOf,ix=Object.prototype.hasOwnProperty,iE=(b=(e,t)=>{var n,r;n=e,r=function(e){var t,n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,r=new WeakMap,o=(t=function(e,t){return r.set(e,t),t},function(e){var o=r.get(e),i=void 0===o?e.size:o<1073741824?o+1:0;if(!e.has(i))return t(e,i);if(e.size<536870912){for(;e.has(i);)i=Math.floor(1073741824*Math.random());return t(e,i)}if(e.size>n)throw Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;e.has(i);)i=Math.floor(Math.random()*n);return t(e,i)});e.addUniqueNumber=function(e){var t=o(e);return e.add(t),t},e.generateUniqueNumber=o},"object"==typeof e&&"u">typeof t?r(e):"function"==typeof define&&define.amd?define(["exports"],r):r((n="u">typeof globalThis?globalThis:n||self).fastUniqueNumbers={})},()=>(w||b((w={exports:{}}).exports,w),w.exports));D.Component;var iC=(k=null!=(_=iE())?ib(iS(_)):{},((e,t,n,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let n of ik(t))ix.call(e,n)||void 0===n||iw(e,n,{get:()=>t[n],enumerable:!(r=i_(t,n))||r.enumerable});return e})(_&&_.__esModule?k:iw(k,"default",{value:_,enumerable:!0}),_)),iT=e=>void 0!==e.method&&"call"===e.method,iO=e=>null===e.error&&"number"==typeof e.id;S=e=>{let t=new Map([[0,()=>{}]]),n=new Map([[0,()=>{}]]),r=new Map,o=new Worker(e);return o.addEventListener("message",({data:e})=>{if(iT(e)){let{params:{timerId:o,timerType:i}}=e;if("interval"===i){let e=t.get(o);if("number"==typeof e){let t=r.get(e);if(void 0===t||t.timerId!==o||t.timerType!==i)throw Error("The timer is in an undefined state.")}else if("u">typeof e)e();else throw Error("The timer is in an undefined state.")}else if("timeout"===i){let e=n.get(o);if("number"==typeof e){let t=r.get(e);if(void 0===t||t.timerId!==o||t.timerType!==i)throw Error("The timer is in an undefined state.")}else if("u">typeof e)e(),n.delete(o);else throw Error("The timer is in an undefined state.")}}else if(iO(e)){let{id:o}=e,i=r.get(o);if(void 0===i)throw Error("The timer is in an undefined state.");let{timerId:a,timerType:s}=i;r.delete(o),"interval"===s?t.delete(a):n.delete(a)}else{let{error:{message:t}}=e;throw Error(t)}}),{clearInterval:e=>{let n=(0,iC.generateUniqueNumber)(r);r.set(n,{timerId:e,timerType:"interval"}),t.set(e,n),o.postMessage({id:n,method:"clear",params:{timerId:e,timerType:"interval"}})},clearTimeout:e=>{let t=(0,iC.generateUniqueNumber)(r);r.set(t,{timerId:e,timerType:"timeout"}),n.set(e,t),o.postMessage({id:t,method:"clear",params:{timerId:e,timerType:"timeout"}})},setInterval:(e,n)=>{let r=(0,iC.generateUniqueNumber)(t);return t.set(r,()=>{e(),"function"==typeof t.get(r)&&o.postMessage({id:null,method:"set",params:{delay:n,now:performance.now(),timerId:r,timerType:"interval"}})}),o.postMessage({id:null,method:"set",params:{delay:n,now:performance.now(),timerId:r,timerType:"interval"}}),r},setTimeout:(e,t)=>{let r=(0,iC.generateUniqueNumber)(n);return n.set(r,e),o.postMessage({id:null,method:"set",params:{delay:t,now:performance.now(),timerId:r,timerType:"timeout"}}),r}}},t=null,()=>{if(null!==t)return t;let e=new Blob(['(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error(\'The given type "\'.concat(i,\'" is not supported\'));(e=>{const r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error(\'The given method "\'.concat(s.method,\'" is not supported\'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error(\'The given type "\'.concat(d,\'" is not supported\'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();'],{type:"application/javascript; charset=utf-8"}),n=URL.createObjectURL(e);return t=S(n),setTimeout(()=>URL.revokeObjectURL(n)),t};var iR=(typeof window>"u"?"undefined":typeof window)=="object",iP={setTimeout:iR?setTimeout.bind(window):setTimeout,clearTimeout:iR?clearTimeout.bind(window):clearTimeout,setInterval:iR?setInterval.bind(window):setInterval,clearInterval:iR?clearInterval.bind(window):clearInterval},iI={},iD=class{name;closed=!1;mc=new MessageChannel;constructor(e){this.name=e,iI[e]=iI[e]||[],iI[e].push(this),this.mc.port1.start(),this.mc.port2.start(),this.onStorage=this.onStorage.bind(this),window.addEventListener("storage",this.onStorage)}onStorage(e){if(e.storageArea!==window.localStorage||e.key.substring(0,this.name.length)!==this.name||null===e.newValue)return;let t=JSON.parse(e.newValue);this.mc.port2.postMessage(t)}postMessage(e){if(this.closed)throw Error("InvalidStateError");let t=JSON.stringify(e),n=`${this.name}:${String(Date.now())}${String(Math.random())}`;window.localStorage.setItem(n,t),iP.setTimeout(()=>{window.localStorage.removeItem(n)},500),iI[this.name].forEach(e=>{e!==this&&e.mc.port2.postMessage(JSON.parse(t))})}close(){if(this.closed)return;this.closed=!0,this.mc.port1.close(),this.mc.port2.close(),window.removeEventListener("storage",this.onStorage);let e=iI[this.name].indexOf(this);iI[this.name].splice(e,1)}get onmessage(){return this.mc.port1.onmessage}set onmessage(e){this.mc.port1.onmessage=e}get onmessageerror(){return this.mc.port1.onmessageerror}set onmessageerror(e){this.mc.port1.onmessageerror=e}addEventListener(e,t){return this.mc.port1.addEventListener(e,t)}removeEventListener(e,t){return this.mc.port1.removeEventListener(e,t)}dispatchEvent(e){return this.mc.port1.dispatchEvent(e)}},iM=typeof window>"u"?void 0:"function"==typeof window.BroadcastChannel?window.BroadcastChannel:iD;function iN(){return Math.random().toString(36).substring(2)}var iL=class{options;channel;token=iN();isLeader=!1;isDead=!1;isApplying=!1;reApply=!1;intervals=[];listeners=[];deferred;constructor(e,t){this.channel=e,this.options=t,this.apply=this.apply.bind(this),this.awaitLeadership=this.awaitLeadership.bind(this),this.sendAction=this.sendAction.bind(this)}async apply(){if(this.isLeader||this.isDead)return!1;if(this.isApplying)return this.reApply=!0,!1;this.isApplying=!0;let e=!1,t=t=>{let{token:n,action:r}=t.data;n!==this.token&&(0===r&&n>this.token&&(e=!0),1===r&&(e=!0))};this.channel.addEventListener("message",t);try{return this.sendAction(0),await function(e=0){return new Promise(t=>iP.setTimeout(t,e))}(this.options.responseTime),this.channel.removeEventListener("message",t),this.isApplying=!1,e?!!this.reApply&&this.apply():(this.assumeLead(),!0)}catch{return!1}}awaitLeadership(){if(this.isLeader)return Promise.resolve();let e=!1,t=null;return new Promise(n=>{let r=()=>{if(e)return;e=!0;try{iP.clearInterval(t)}catch{}let r=this.intervals.indexOf(t);r>=0&&this.intervals.splice(r,1),this.channel.removeEventListener("message",o),n()};t=iP.setInterval(()=>{this.apply().then(()=>{this.isLeader&&r()})},this.options.fallbackInterval),this.intervals.push(t);let o=e=>{let{action:t}=e.data;2===t&&this.apply().then(()=>{this.isLeader&&r()})};this.channel.addEventListener("message",o)})}sendAction(e){this.channel.postMessage({action:e,token:this.token})}assumeLead(){this.isLeader=!0;let e=e=>{let{action:t}=e.data;0===t&&this.sendAction(1)};return this.channel.addEventListener("message",e),this.listeners.push(e),this.sendAction(1)}waitForLeadership(){return this.deferred||(this.deferred=this.awaitLeadership()),this.deferred}close(){if(!this.isDead){this.isDead=!0,this.isLeader=!1,this.sendAction(2);try{this.listeners.forEach(e=>this.channel.removeEventListener("message",e)),this.intervals.forEach(e=>iP.clearInterval(e))}catch{}}}},iA=class{channel;options;elector;token=iN();registry=new Map;allIdle=!1;isLastActive=!1;constructor(e){let{channelName:t}=e;this.options=e,this.channel=new iM(t),this.registry.set(this.token,1),e.leaderElection&&(this.elector=new iL(this.channel,{fallbackInterval:2e3,responseTime:100}),this.elector.waitForLeadership()),this.channel.addEventListener("message",e=>{let{action:t,token:n,data:r}=e.data;switch(t){case 3:this.registry.set(n,2);break;case 4:this.registry.delete(n);break;case 5:this.idle(n);break;case 6:this.active(n);break;case 7:this.prompt(n);break;case 8:this.start(n);break;case 9:this.reset(n);break;case 10:this.activate(n);break;case 11:this.pause(n);break;case 12:this.resume(n);break;case 13:this.options.onMessage(r)}}),this.send(3)}get isLeader(){if(!this.elector)throw Error('❌ Leader election is not enabled. To Enable it set the "leaderElection" property to true.');return this.elector.isLeader}prompt(e=this.token){this.registry.set(e,0);let t=[...this.registry.values()].every(e=>0===e);e===this.token&&this.send(7),t&&this.options.onPrompt()}idle(e=this.token){this.registry.set(e,2);let t=[...this.registry.values()].every(e=>2===e);e===this.token&&this.send(5),!this.allIdle&&t&&(this.allIdle=!0,this.options.onIdle())}active(e=this.token){this.allIdle=!1,this.registry.set(e,1);let t=[...this.registry.values()].some(e=>1===e);e===this.token&&this.send(6),t&&this.options.onActive(),this.isLastActive=e===this.token}start(e=this.token){this.allIdle=!1,this.registry.set(e,1),e===this.token?this.send(8):this.options.start(!0),this.isLastActive=e===this.token}reset(e=this.token){this.allIdle=!1,this.registry.set(e,1),e===this.token?this.send(9):this.options.reset(!0),this.isLastActive=e===this.token}activate(e=this.token){this.allIdle=!1,this.registry.set(e,1),e===this.token?this.send(10):this.options.activate(!0),this.isLastActive=e===this.token}pause(e=this.token){e===this.token?this.send(11):this.options.pause(!0)}resume(e=this.token){e===this.token?this.send(12):this.options.resume(!0)}message(e){try{this.channel.postMessage({action:13,token:this.token,data:e})}catch{}}send(e){try{this.channel.postMessage({action:e,token:this.token})}catch{}}close(){this.options.leaderElection&&this.elector.close(),this.send(4),this.channel.close()}},iU=iR?document:null,ij=["mousemove","keydown","wheel","DOMMouseScroll","mousewheel","mousedown","touchstart","touchmove","MSPointerDown","MSPointerMove","visibilitychange","focus"];function iF(e,t){let n=0;return function(...r){let o=new Date().getTime();if(!(o-n<t))return n=o,e(...r)}}var iz=()=>Date.now(),iq=(0,D.createContext)(null);function iB(e){let t=function({timeout:e=12e5,promptTimeout:t=0,promptBeforeIdle:n=0,element:r=iU,events:o=ij,timers:i,immediateEvents:a=[],onPresenceChange:s=()=>{},onPrompt:u=()=>{},onIdle:l=()=>{},onActive:c=()=>{},onAction:d=()=>{},onMessage:f=()=>{},debounce:p=0,throttle:h=0,eventsThrottle:m=200,startOnMount:g=!0,startManually:v=!1,stopOnIdle:y=!1,crossTab:b=!1,name:w="idle-timer",syncTimers:_=0,leaderElection:k=!1,disabled:S=!1}={}){let x=(0,D.useRef)(iz()),E=(0,D.useRef)(iz()),C=(0,D.useRef)(null),T=(0,D.useRef)(null),O=(0,D.useRef)(0),R=(0,D.useRef)(0),P=(0,D.useRef)(0),I=(0,D.useRef)(0),M=(0,D.useRef)(!1),N=(0,D.useRef)(!1),L=(0,D.useRef)(!1),A=(0,D.useRef)(!0),U=(0,D.useRef)(!1),j=(0,D.useRef)(null),F=(0,D.useRef)(null),z=(0,D.useRef)(e),q=(0,D.useRef)(0);(0,D.useEffect)(()=>{if(t&&console.warn("⚠️ IdleTimer -- The `promptTimeout` property has been deprecated in favor of `promptBeforeIdle`. It will be removed in the next major release."),n&&t)throw Error("❌ Both promptTimeout and promptBeforeIdle can not be set. The promptTimeout property will be deprecated in a future version.");if(e>=2147483647)throw Error(`\u274C The value for the timeout property must fit in a 32 bit signed integer, 2147483647.`);if(t>=2147483647)throw Error(`\u274C The value for the promptTimeout property must fit in a 32 bit signed integer, 2147483647.`);if(n>=2147483647)throw Error(`\u274C The value for the promptBeforeIdle property must fit in a 32 bit signed integer, 2147483647.`);if(n>=e)throw Error(`\u274C The value for the promptBeforeIdle property must be less than the timeout property, ${e}.`);if(n?(z.current=e-n,q.current=n):(z.current=e,q.current=t),!A.current){if(v||S)return;M.current&&(G.current(null,eI),F.current&&F.current.active()),ed()}},[e,t,n,v,S]);let B=(0,D.useRef)(y);(0,D.useEffect)(()=>{B.current=y},[y]);let V=(0,D.useRef)(a),$=(0,D.useRef)(r),W=(0,D.useRef)([...new Set([...o,...a]).values()]),H=(0,D.useRef)(S);(0,D.useEffect)(()=>{H.current=S,!A.current&&(S?eh():v||ed())},[S]);let Y=(0,D.useRef)(s);(0,D.useEffect)(()=>{Y.current=s},[s]);let Q=(0,D.useRef)(u);(0,D.useEffect)(()=>{Q.current=u},[u]);let K=(0,D.useRef)(l);(0,D.useEffect)(()=>{K.current=l},[l]);let G=(0,D.useRef)(c);(0,D.useEffect)(()=>{G.current=c},[c]);let X=(0,D.useRef)(d);(0,D.useEffect)(()=>{X.current=d},[d]);let J=(0,D.useRef)(f);(0,D.useEffect)(()=>{J.current=f},[f]);let Z=(0,D.useMemo)(()=>{let e=(e,t)=>X.current(e,t);return p>0?function(e,t){let n;function r(...o){n&&clearTimeout(n),n=setTimeout(()=>{e(...o),n=null},t)}return r.cancel=function(){clearTimeout(n)},r}(e,p):h>0?iF(e,h):e},[h,p]),ee=(0,D.useRef)();(0,D.useEffect)(()=>{b&&_&&(ee.current=iF(()=>{F.current.active()},_))},[b,_]);let et=()=>{null!==j.current&&(iP.clearTimeout(j.current),j.current=null)},en=(e,t=!0)=>{et(),j.current=iP.setTimeout(ea,e||z.current),t&&(T.current=iz())},er=e=>{N.current||M.current||(Q.current(e,eI),Y.current({type:"active",prompted:!0},eI)),I.current=0,P.current=iz(),N.current=!0,en(q.current,!1)},eo=()=>{et(),M.current||(K.current(null,eI),Y.current({type:"idle"},eI)),M.current=!0,C.current=iz(),B.current?ec():N.current&&(P.current=0,N.current=!1)},ei=e=>{et(),(M.current||N.current)&&(G.current(e,eI),Y.current({type:"active",prompted:!1},eI)),N.current=!1,P.current=0,M.current=!1,O.current+=iz()-C.current,R.current+=iz()-C.current,el(),en()},ea=e=>{if(!M.current){Z.cancel&&Z.cancel();let t=iz()-T.current;if(!(z.current+q.current<t)&&q.current>0&&!N.current){F.current?F.current.prompt():er(e);return}F.current?F.current.idle():eo();return}F.current?F.current.active():ei(e)},es=e=>{if(g||T.current||(T.current=iz(),G.current(null,eI)),Z(e,eI),N.current)return;if(et(),!M.current&&V.current.includes(e.type)){ea(e);return}let t=iz()-T.current;if(M.current&&!y||!M.current&&t>=z.current){ea(e);return}L.current=!1,I.current=0,P.current=0,en(),b&&_&&ee.current()},eu=(0,D.useRef)(es);(0,D.useEffect)(()=>{let e=U.current;e&&ec(),m>0?eu.current=iF(es,m):eu.current=es,e&&el()},[m,h,p,X,b,_]);let el=()=>{iR&&$.current&&(U.current||(W.current.forEach(e=>{$.current.addEventListener(e,eu.current,{capture:!0,passive:!0})}),U.current=!0))},ec=(e=!1)=>{iR&&$.current&&(U.current||e)&&(W.current.forEach(e=>{$.current.removeEventListener(e,eu.current,{capture:!0})}),U.current=!1)},ed=(0,D.useCallback)(e=>!H.current&&(et(),el(),M.current=!1,N.current=!1,L.current=!1,I.current=0,P.current=0,F.current&&!e&&F.current.start(),en(),!0),[j,M,H,z,F]),ef=(0,D.useCallback)(e=>!H.current&&(et(),el(),E.current=iz(),O.current+=iz()-C.current,R.current+=iz()-C.current,O.current=0,M.current=!1,N.current=!1,L.current=!1,I.current=0,P.current=0,F.current&&!e&&F.current.reset(),v||en(),!0),[j,M,z,v,H,F]),ep=(0,D.useCallback)(e=>!H.current&&(et(),el(),(M.current||N.current)&&ei(),M.current=!1,N.current=!1,L.current=!1,I.current=0,P.current=0,E.current=iz(),F.current&&!e&&F.current.activate(),en(),!0),[j,M,N,H,z,F]),eh=(0,D.useCallback)((e=!1)=>!H.current&&!L.current&&(I.current=ek(),L.current=!0,ec(),et(),F.current&&!e&&F.current.pause(),!0),[j,H,F]),em=(0,D.useCallback)((e=!1)=>!H.current&&!!L.current&&(L.current=!1,N.current||el(),M.current||en(I.current),P.current&&(P.current=iz()),F.current&&!e&&F.current.resume(),!0),[j,z,H,I,F]),eg=(0,D.useCallback)((e,t)=>(F.current?(t&&J.current(e,eI),F.current.message(e)):t&&J.current(e,eI),!0),[f]),ev=(0,D.useCallback)(()=>M.current,[M]),ey=(0,D.useCallback)(()=>N.current,[N]),eb=(0,D.useCallback)(()=>F.current?F.current.isLeader:null,[F]),ew=(0,D.useCallback)(()=>F.current?F.current.isLastActive:null,[F]),e_=(0,D.useCallback)(()=>F.current?F.current.token:null,[F]),ek=(0,D.useCallback)(()=>{if(L.current)return I.current;let e=Math.floor((I.current?I.current:q.current+z.current)-(T.current?iz()-T.current:0));return e<0?0:Math.abs(e)},[z,q,N,I,T]),eS=(0,D.useCallback)(()=>Math.round(iz()-E.current),[E]),ex=(0,D.useCallback)(()=>Math.round(iz()-x.current),[x]),eE=(0,D.useCallback)(()=>C.current?new Date(C.current):null,[C]),eC=(0,D.useCallback)(()=>T.current?new Date(T.current):null,[T]),eT=(0,D.useCallback)(()=>M.current?Math.round(iz()-C.current+O.current):Math.round(O.current),[C,O]),eO=(0,D.useCallback)(()=>M.current?Math.round(iz()-C.current+R.current):Math.round(R.current),[C,R]),eR=(0,D.useCallback)(()=>{let e=Math.round(eS()-eT());return e>=0?e:0},[C,O]),eP=(0,D.useCallback)(()=>{let e=Math.round(ex()-eO());return e>=0?e:0},[C,O]);(0,D.useEffect)(()=>{if(p>0&&h>0)throw Error("❌ onAction can either be throttled or debounced, not both.");i&&(iP.setTimeout=i.setTimeout,iP.clearTimeout=i.clearTimeout,iP.setInterval=i.setInterval,iP.clearInterval=i.clearInterval);let e=()=>{F.current&&F.current.close(),Z.cancel&&Z.cancel(),et(),ec(!0)};return iR&&window.addEventListener("beforeunload",e),()=>{iR&&window.removeEventListener("beforeunload",e),F.current&&F.current.close(),Z.cancel&&Z.cancel(),et(),ec(!0)}},[]),(0,D.useEffect)(()=>{F.current&&F.current.close(),b?F.current=new iA({channelName:w,leaderElection:k,onPrompt:()=>{er()},onIdle:()=>{eo()},onActive:()=>{ei()},onMessage:e=>{J.current(e,eI)},start:ed,reset:ef,activate:ep,pause:eh,resume:em}):F.current=null},[b,w,k,Q,K,G,J,ed,ef,eh,em]),(0,D.useEffect)(()=>{A.current||(et(),ec(!0)),v||S||(g?ed():el())},[v,g,S,A]),(0,D.useEffect)(()=>{if(!A.current){let e=[...new Set([...o,...a]).values()];ec(),W.current=e,$.current=r,V.current=a,v||S||(g?ed():el())}},[r,JSON.stringify(o),JSON.stringify(a),A,S,v,g]),(0,D.useEffect)(()=>{A.current&&(A.current=!1)},[A]);let eI={message:eg,start:ed,reset:ef,activate:ep,pause:eh,resume:em,isIdle:ev,isPrompted:ey,isLeader:eb,isLastActiveTab:ew,getTabId:e_,getRemainingTime:ek,getElapsedTime:eS,getTotalElapsedTime:ex,getLastIdleTime:eE,getLastActiveTime:eC,getIdleTime:eT,getTotalIdleTime:eO,getActiveTime:eR,getTotalActiveTime:eP,setOnPresenceChange:e=>{s=e,Y.current=e},setOnPrompt:e=>{u=e,Q.current=e},setOnIdle:e=>{l=e,K.current=e},setOnActive:e=>{c=e,G.current=e},setOnAction:e=>{d=e,X.current=e},setOnMessage:e=>{f=e,J.current=e}};return eI}(e);return(0,iy.jsx)(iq.Provider,{value:t,children:e.children})}iq.Consumer;var D=I("exYeM");function iV(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var i$=function e(t,n){function r(e,r,o){if(!(typeof document>"u")){"number"==typeof(o=iV({},n,o)).expires&&(o.expires=new Date(Date.now()+864e5*o.expires)),o.expires&&(o.expires=o.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var i="";for(var a in o)o[a]&&(i+="; "+a,!0===o[a]||(i+="="+o[a].split(";")[0]));return document.cookie=e+"="+t.write(r,e)+i}}return Object.create({set:r,get:function(e){if(!(typeof document>"u"||arguments.length&&!e)){for(var n=document.cookie?document.cookie.split("; "):[],r={},o=0;o<n.length;o++){var i=n[o].split("="),a=i.slice(1).join("=");try{var s=decodeURIComponent(i[0]);if(r[s]=t.read(a,s),e===s)break}catch{}}return e?r[e]:r}},remove:function(e,t){r(e,"",iV({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,iV({},this.attributes,t))},withConverter:function(t){return e(iV({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(n)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"});function iW(){return"u">typeof window}function iH(){if(iW())return window.matchMedia("(hover: none)").matches||navigator.userAgent.toLowerCase().includes("mobile")}function iY(){if(iW())return!iH()}function iQ(e){var t,n;let r=null==(t=e.context)?void 0:t.includes("onDesktop"),o=null==(n=e.context)?void 0:n.includes("onMobile");r||o||e.handler(),r&&iY()&&e.handler(),o&&iH()&&e.handler()}function iK(e){iG(e),window.addEventListener("load",e,!0),window.addEventListener("mousemove",e,!0),window.addEventListener("mousedown",e,!0),window.addEventListener("keydown",e,!0),window.addEventListener("touchstart",e,!0),window.addEventListener("click",e,!0),window.addEventListener("scroll",e,!0)}function iG(e){window.removeEventListener("load",e,!0),window.removeEventListener("mousemove",e,!0),window.removeEventListener("mousedown",e,!0),window.removeEventListener("keydown",e,!0),window.removeEventListener("touchstart",e,!0),window.removeEventListener("click",e,!0),window.removeEventListener("scroll",e,!0)}function iX(e,t=200){let n;return{execute(r){clearTimeout(n),n=setTimeout(()=>e(r),t)},abort(){clearTimeout(n)}}}let iJ={onMobile:"onMobile",onTrigger:"onTrigger",onDesktop:"onDesktop",onUnsubscribe:"onUnsubscribe"},iZ={cookie:{daysToExpire:30,key:"exit-intent"},desktop:{triggerOnIdle:!1,useBeforeUnload:!1,triggerOnMouseLeave:!0,delayInSecondsToTrigger:10},mobile:{triggerOnIdle:!0,delayInSecondsToTrigger:10}};var i0=Object.defineProperty,i1=Object.defineProperties,i2=Object.getOwnPropertyDescriptors,i3=Object.getOwnPropertySymbols,i4=Object.prototype.hasOwnProperty,i6=Object.prototype.propertyIsEnumerable,i5=(e,t,n)=>t in e?i0(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,i8=(e,t)=>{for(var n in t||(t={}))i4.call(t,n)&&i5(e,n,t[n]);if(i3)for(var n of i3(t))i6.call(t,n)&&i5(e,n,t[n]);return e},i7=(e,t)=>i1(e,i2(t)),D=I("exYeM");// CLASS
class i9 extends X{constructor(e,t){super(),this.client=e,this.setOptions(t),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var t;let n=this.options;this.options=this.client.defaultMutationOptions(e),!/**
 * Shallow compare objects. Only works with objects that always have the same properties.
 */function(e,t){if(e&&!t||t&&!e)return!1;for(let n in e)if(e[n]!==t[n])return!1;return!0}(n,this.options)&&this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(t=this.currentMutation)||t.setOptions(this.options)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.currentMutation)||e.removeObserver(this)}}onMutationUpdate(e){this.updateResult();let t={listeners:!0};"success"===e.type?t.onSuccess=!0:"error"===e.type&&(t.onError=!0),this.notify(t)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(e,t){return this.mutateOptions=t,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==e?e:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){let e=this.currentMutation?this.currentMutation.state:ec(),t={...e,isLoading:"loading"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset};this.currentResult=t}notify(e){G.batch(()=>{// First trigger the mutate callbacks
if(this.mutateOptions&&this.hasListeners()){var t,n,r,o,i,a,s,u;e.onSuccess?(null==(t=(n=this.mutateOptions).onSuccess)||t.call(n,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(r=(o=this.mutateOptions).onSettled)||r.call(o,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context)):e.onError&&(null==(i=(a=this.mutateOptions).onError)||i.call(a,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(s=(u=this.mutateOptions).onSettled)||s.call(u,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context))}// Then trigger the listeners
e.listeners&&this.listeners.forEach(({listener:e})=>{e(this.currentResult)})})}}var ae={};ae=I("lrVh9");let at=ae.useSyncExternalStore;function an(){}let ar={"Content-Type":"application/json"},ao=ru().FINGERPRINT_API_HOSTNAME,ai={get:async(e,t)=>await fetch(e+"?"+new URLSearchParams(t),{method:"GET",headers:ar}),post:async(e,t)=>await fetch(e,{method:"POST",headers:ar,body:JSON.stringify(t)}),patch:async(e,t)=>await fetch(e,{method:"PATCH",headers:ar,body:JSON.stringify(t)}),put:async(e,t)=>await fetch(e,{method:"PUT",headers:ar,body:JSON.stringify(t)}),delete:async e=>await fetch(e,{method:"DELETE",headers:ar})},aa=()=>{let{log:e,error:t}=tL();return function(e,t,n){var r,o;let i=H(e)?"function"==typeof t?{mutationKey:e,mutationFn:t}:{...t,mutationKey:e}:"function"==typeof e?{...t,mutationFn:e}:{...e},a=eg({context:i.context}),[s]=D.useState(()=>new i9(a,i));D.useEffect(()=>{s.setOptions(i)},[s,i]);let u=at(D.useCallback(e=>s.subscribe(G.batchCalls(e)),[s]),()=>s.getCurrentResult(),()=>s.getCurrentResult()),l=D.useCallback((e,t)=>{s.mutate(e,t).catch(an)},[s]);if(u.error&&(r=s.options.useErrorBoundary,o=[u.error],// Allow useErrorBoundary function to override throwing behavior on a per-error basis
"function"==typeof r?r(...o):!!r))throw u.error;return{...u,mutate:l,mutateAsync:u.mutate}}// eslint-disable-next-line @typescript-eslint/no-empty-function
(n=>ai.post(ao+"/collector/"+n?.visitor?.id,n).then(t=>(e("Collector API response",t),t)).catch(e=>(t("Collector API error",e),e)),{onSuccess:()=>{}})};function as({children:e,handlers:t=[]}){let{log:n,error:r}=tL(),{appId:o,booted:i,initialDelay:a,exitIntentTriggers:s,idleTriggers:u,config:l}=rs(),{visitor:c,session:d}=r_(),{trackEvent:f}=rC(),{mutateAsync:p}=aa(),{registerHandler:h}=function(e={}){let t=i7(i8({},iZ),{cookie:i8(i8({},iZ.cookie),e?.cookie),desktop:i8(i8({},iZ.desktop),e?.desktop),mobile:i8(i8({},iZ.mobile),e?.mobile)}),[n,r]=(0,D.useState)(t),[o,i]=(0,D.useState)(!1),[a,s]=(0,D.useState)(!1),u=(0,D.useRef)([]).current,l=(0,D.useRef)(!1),{mobile:c,desktop:d,cookie:f}=n;l.current=a||o;let p=(0,D.useCallback)(()=>{l.current||(i(!0),u.filter(e=>{var t,n;return(null==(t=e.context)?void 0:t.filter(e=>e!==iJ.onDesktop&&e!==iJ.onMobile).length)===0||(null==(n=e.context)?void 0:n.includes(iJ.onTrigger))}).forEach(iQ))},[]),h=(0,D.useCallback)(()=>{i$.set(f.key,"true",{expires:f.daysToExpire,sameSite:"Strict"}),u.filter(e=>{var t;return null==(t=e.context)?void 0:t.includes(iJ.onUnsubscribe)}).forEach(iQ),s(!0)},[f?.key]),m=(0,D.useCallback)(()=>{i$.remove(f?.key,{sameSite:"Strict"}),window.onbeforeunload=null,i(!1),s(!1)},[f?.key]),g=(0,D.useCallback)(()=>{m(),r(t)},[]),v=(0,D.useCallback)(e=>{let t=u.find(t=>t.id===e.id),n=i7(i8({},e),{context:e?.context||[]});if(t){u[u.indexOf(t)]=n;return}u.push(n)},[]),y=(0,D.useCallback)((e=iZ)=>{m(),r(t=>i7(i8(i8({},t||{}),e||{}),{cookie:i8(i8({},t?.cookie||{}),e?.cookie||{}),desktop:i8(i8({},t?.desktop||{}),e?.desktop||{}),mobile:i8(i8({},t?.mobile||{}),e?.mobile||{})}))},[n]);return(0,D.useEffect)(()=>{s("true"===i$.get(f.key))},[]),(0,D.useEffect)(()=>{if(iH()){let{execute:e,abort:t}=iX(p,1e3*c?.delayInSecondsToTrigger);if(l.current){iG(e);return}return iH()&&c?.triggerOnIdle&&(iG(e),iK(e)),()=>{t(),iG(e)}}if(iY()){let{execute:e,abort:t}=iX(p,1e3*d?.delayInSecondsToTrigger);return null!=d&&d.triggerOnIdle&&iK(e),null!=d&&d.triggerOnMouseLeave&&document.body.addEventListener("mouseleave",p),null!=d&&d.useBeforeUnload&&(window.onbeforeunload=()=>{if(!l.current)return p(),""}),()=>{t(),iG(e),document.body.removeEventListener("mouseleave",p)}}}),{settings:n,resetState:m,isTriggered:o,unsubscribe:h,resetSettings:g,updateSettings:y,isUnsubscribed:a,registerHandler:v,willBeTriggered:!(a||o)}}({cookie:{key:"_cm_exit",daysToExpire:0}}),[m,g]=(0,D.useState)(l?.idleDelay||5e3),[v,y]=(0,D.useState)([]),[b,w]=(0,D.useState)(void 0),[_,k]=(0,D.useState)(!1),[S,x]=(0,D.useState)(new Map),E=e=>{y(t=>/*@__PURE__*/O(rT)([...t,...e||[]],"id"))};n("CollectorProvider: user is on mobile?",rO.isMobile);let C=rO.isMobile;// Removes the intently overlay, if intently is false
(0,D.useEffect)(()=>{if(_)return;n("CollectorProvider: removing intently overlay");let e=setInterval(()=>{let t=document.querySelectorAll("div[id^=smc-v5-overlay-]");Array.prototype.forEach.call(t,t=>{t.parentNode.removeChild(t),n("CollectorProvider: successfully removed intently overlay"),clearInterval(e)})},100);return()=>{clearInterval(e)}},[_,n]);let T=/*@__PURE__*/O(D).useCallback(()=>{let e;if(!b)return null;// TODO: UNDO
let o=v.find(n=>{let r=n.invocation===b,o=t?.find(e=>e.behaviour===n.behaviour);return e=o,r&&o});if(n("CollectorProvider: available triggers include: ",v),n("CollectorProvider: attempting to show displayTrigger",b,o),!o)return r("No trigger found for displayTrigger",b),null;if(n("CollectorProvider: available handlers include: ",t),n("CollectorProvider: trigger to match is: ",o),n("CollectorProvider: attempting to show trigger",o,e),!e)return n("No handler found for trigger",o),null;if(!e.invoke)return n("No invoke method found for handler",e),null;let i=e.invoke?.(o);return i&&/*@__PURE__*/O(D).isValidElement(i)?i:null},[b,r,t,n,v,t]),R=(0,D.useCallback)(()=>{u&&C&&(n("CollectorProvider: attempting to fire idle trigger"),w("INVOCATION_IDLE_TIME"))},[u,n,C]),P=(0,D.useCallback)(()=>{n("CollectorProvider: attempting to fire exit trigger"),w("INVOCATION_EXIT_INTENT")},[n,s,w]);(0,D.useEffect)(()=>{s&&(n("CollectorProvider: attempting to register exit trigger"),h({id:"clientTrigger",handler:P}))},[s,P,n,h]);let I=(0,D.useCallback)(()=>{n("CollectorProvider: resetting displayTrigger"),w(void 0)},[n]);// @todo this should be invoked when booted
// and then on any window page URL changes.
(0,D.useEffect)(()=>{if(!i){n("CollectorProvider: Not yet collecting, awaiting boot");return}let e=setTimeout(()=>{if(!c.id){n("CollectorProvider: Not yet collecting, awaiting visitor ID");return}n("CollectorProvider: collecting data");let e=new URLSearchParams(window.location.search).toString().split("&").reduce((e,t)=>{let[n,r]=t.split("=");return n&&(e[n]=r),e},{}),t=window.location.hash.substring(3);var i=t.split("&").reduce(function(e,t){var n=t.split("=");return e[n[0]]=n[1],e},{});i.id_token&&(n("CollectorProvider: user logged in event fired"),f("user_logged_in",{}),p({appId:o,visitor:c,sessionId:d?.id,account:{token:i.id_token}}).then(async e=>{let t=await e.json();n("Sent login collector data, retrieved:",t)}).catch(e=>{r("failed to store collected data",e)})),p({appId:o,visitor:c,sessionId:d?.id,page:{url:window.location.href,path:window.location.pathname,title:document.title,params:e},referrer:{url:document.referrer,title:"",utm:{// eslint-disable-next-line camelcase
source:e?.utm_source,// eslint-disable-next-line camelcase
medium:e?.utm_medium,// eslint-disable-next-line camelcase
campaign:e?.utm_campaign,// eslint-disable-next-line camelcase
term:e?.utm_term,// eslint-disable-next-line camelcase
content:e?.utm_content}}}).then(async e=>{if(204===e.status){k(!0);return}let t=await e.json();n("Sent collector data, retrieved:",t),// Set IdleTimer
// @todo turn this into the dynamic value
g(l?.idleDelay||5e3),E(t?.pageTriggers),t.intently?(// show intently overlay here
n("CollectorProvider: user is in Intently cohort"),k(!0),f("user_cohort",{cohort:"intently"})):(// remove intently overlay here
n("CollectorProvider: user is in Fingerprint cohort"),k(!1),f("user_cohort",{cohort:"fingerprint"}))}).catch(e=>{r("failed to store collected data",e)}),n("CollectorProvider: collected data")},a);return()=>{clearTimeout(e)}},[o,i,p,r,t,a,n,f,c]);let M=(e,t)=>{let i=setInterval(()=>{let a=document.querySelectorAll(e),s=!1;a.forEach(function(a){""===t&&"none"!==window.getComputedStyle(a).display?s=!0:a.textContent===t&&(s=!0),s&&!S[e]&&(f("booking_complete",{}),S[e]=!0,x(S),p({appId:o,visitor:c,sessionId:d?.id,elements:[{path:window.location.pathname,selector:e}]}).then(async e=>{let t=await e.json();n("Sent collector data, retrieved:",t),// Set IdleTimer
// @todo turn this into the dynamic value
g(l?.idleDelay||5e3),E(t?.pageTriggers)}).catch(e=>{r("failed to store collected data",e)}),// unregister the watcher when the element is found
clearInterval(i))})},500);return i};(0,D.useEffect)(()=>{if(!c.id)return;let e=[M(".stage-5","")];// Cleanup all the watchers
return()=>{e.forEach(e=>clearInterval(e))}},[c]);let N=/*@__PURE__*/O(D).useCallback(e=>{n("CollectorProvider: manually setting trigger",e),E([e]),w(e.invocation)},[n,v,w,E]),L=/*@__PURE__*/O(D).useMemo(()=>({resetDisplayTrigger:I,setTrigger:N,trackEvent:f}),[I,N,f]);return /*@__PURE__*/O(D).createElement(iB,{timeout:m,onPresenceChange:e=>{n("presence changed",e)},onIdle:R},/*@__PURE__*/O(D).createElement(au.Provider,{value:L},e),/*@__PURE__*/O(D).createElement(T,null))}let au=/*#__PURE__*/(0,D.createContext)({resetDisplayTrigger:()=>{},setTrigger:()=>{},trackEvent:()=>{}}),al=()=>(0,D.useContext)(au),ac=()=>"undefined"==typeof window?null:"localhost:3000"===window.location.host||"www.stonehouserestaurants.co.uk"===window.location.host?"Stonehouse":"www.browns-restaurants.co.uk"===window.location.host?"Browns":null;// @todo: Kill this with fire 🔥
var D=I("exYeM");let ad="f"+tD().split("-")[0],af=e=>`f${ad}-${e}`;var ap=({trigger:e,handleClickCallToAction:t,handleCloseModal:n})=>{let[r,o]=(0,D.useState)(!1);return((0,D.useEffect)(()=>{// @todo: note that because of the font being screwed up a bit on all of these host urls,
// I had to apply some negative margins to make it look passable. Apologies if you have to maintain it.
// The other alternatives were either CORS-blocked, or would require a diff packager (in case of local file)
let e=`
      @font-face{
        font-family: "Gotham Bold";
        src: url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.eot?#iefix") format("embedded-opentype"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff") format("woff"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.woff2") format("woff2"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.ttf") format("truetype"),
            url("https://db.onlinewebfonts.com/t/db33e70bc9dee9fa9ae9737ad83d77ba.svg#Gotham-Bold") format("svg");
            font-display: auto;
            font-style: normal;
            font-weight: 500;
            font-stretch: normal;
    }
     

      :root {
        --primary: white;
        --secondary: #e0aa00;
        --text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
      }
      h1, h2, h3, h4, h5, h6, p, a, span {
        line-height: 1.2;
      }

      .${af("overlay")} {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-style: normal;
      }

      .${af("modal")} {
        width: 80%;
        height: 500px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-repeat: no-repeat;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        box-shadow: var(--text-shadow);
      }

      .${af("gotham-bold")} {
        font-family: 'Gotham Bold';
      }

      .${af("text-center")} {
        text-align: center;
      }

      @media screen and (min-width: 768px) {
        .${af("modal")} {
          max-width: 600px;
        }
      }

      @media screen and (max-width: 768px) {
        .${af("modal")} {
          width: 95vw;
          max-width: 600px;
        }
      }

      .${af("main-text")} {
        flex: 1;
        font-family: 'Gotham Bold';
        font-weight: 500;
        font-size: 3rem;
        font-style: normal;
        text-transform: uppercase;
        text-align: center;
        letter-spacing: 2pt;
        fill: var(--secondary);
        text-shadow: var(--text-shadow);
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: -10px;
      }

      .${af("text-container")} {
        display: flex;
        justify-content: center;
        flex-direction: column;
        text-shadow: var(--text-shadow);
      }

      .${af("sub-text")} {
        margin: auto;
        font-weight: 600;
        font-family: 'Gotham Bold';
        font-size: 0.6rem;
        letter-spacing: 2pt;

        display: inline-block;
        text-align: center;
        text-transform: uppercase;
      }

      .${af("cta")} {
        font-family: 'Gotham Bold';
        cursor: pointer;
        background-color: var(--secondary);
        padding: 0.75rem 1rem 0 1rem;
        border-radius: 2px;
        display: block;
        font-size: 1.3rem;
        color: var(--primary);
        text-align: center;
        text-transform: uppercase;
        max-width: 400px;
        margin: 0 auto;
        text-decoration: none;
        box-shadow: 0.3rem 0.3rem white;
      }

      .${af("cta:hover")} {
        transition: all 0.3s;
        filter: brightness(0.95);
      }

      .${af("close-button")} {
        border-radius: 100%;
        background-color: white;
        width: 2rem;
        border: none;
        height: 2rem;
        position: absolute;
        margin: 10px;
        top: 0px;
        right: 0px;
        color: black;
        font-size: 1.2rem;
        font-weight: 300;
        cursor: pointer;
        display: grid;
        place-content: center;
      }

      .${af("image-darken")} {
        background: rgba(0, 0, 0, 0.1);
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        padding: 2rem 1.5rem 1.5rem 1.5rem;
      }

      .${af("text-shadow")} {
        text-shadow: var(--text-shadow);
      }

      .${af("box-shadow")} {
        box-shadow: var(--text-shadow);
      }
    `,t=document.createElement("style");t.type="text/css",t.appendChild(document.createTextNode(e)),document.head.appendChild(t),setTimeout(()=>{o(!0)},500)},[ad]),r)?/*@__PURE__*/O(D).createElement("div",{className:af("overlay")},/*@__PURE__*/O(D).createElement("div",{className:af("modal"),style:{background:`url(${e?.data?.backgroundURL})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover",position:"relative"}},/*@__PURE__*/O(D).createElement("div",{className:af("image-darken")},/*@__PURE__*/O(D).createElement("button",{className:af("close-button"),onClick:n},/*@__PURE__*/O(D).createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 16 16"},/*@__PURE__*/O(D).createElement("path",{fill:"#000",fillRule:"evenodd",d:"M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z"}))),/*@__PURE__*/O(D).createElement("div",{className:af("text-container")},/*@__PURE__*/O(D).createElement("h1",{className:af("main-text")},e?.data?.heading),/*@__PURE__*/O(D).createElement("span",{className:af("sub-text")},e?.data?.paragraph)),/*@__PURE__*/O(D).createElement("div",null,/*@__PURE__*/O(D).createElement(()=>/*@__PURE__*/O(D).createElement("div",{style:{position:"absolute",left:"10%",top:250}},/*@__PURE__*/O(D).createElement("div",{className:af("box-shadow"),style:{borderRadius:"100%",height:100,width:100,border:"2px solid white",display:"grid",placeContent:"center",transform:"rotate(-10deg)"}},/*@__PURE__*/O(D).createElement("h4",{className:`${af("gotham-bold")} ${af("text-center")} ${af("text-shadow")}`},"2 for"),/*@__PURE__*/O(D).createElement("h1",{className:`${af("gotham-bold")} ${af("text-center")} ${af("text-shadow")}`,style:{marginLeft:15,marginBottom:-10}},"10*"),/*@__PURE__*/O(D).createElement("h6",{className:`${af("gotham-bold")} ${af("text-center")} ${af("text-shadow")}`},"COCKTAILS"))),null)),/*@__PURE__*/O(D).createElement("div",{style:{display:"flex",justifyContent:"flex-end"}},/*@__PURE__*/O(D).createElement("div",null,/*@__PURE__*/O(D).createElement("a",{href:e?.data?.buttonURL,className:af("cta"),onClick:t},e?.data?.buttonText)))))):null},D=I("exYeM");let ah=({randomHash:e,text:t})=>/*@__PURE__*/O(D).createElement("svg",{xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",version:"1.1",viewBox:"0 0 500 500",className:"f"+e+"-curlyText"},/*@__PURE__*/O(D).createElement("defs",null,/*@__PURE__*/O(D).createElement("path",{id:"textPath",d:"M 0 500 A 175,100 0 0 1 500,500"})),/*@__PURE__*/O(D).createElement("text",{x:"0",y:"0",textAnchor:"middle"},/*@__PURE__*/O(D).createElement("textPath",{xlinkHref:"#textPath",fill:"white",startOffset:"50%"},t))),am=({trigger:e,handleClickCallToAction:t,handleCloseModal:n})=>{let[r,o]=(0,D.useState)(!1),i=(0,D.useMemo)(()=>tD().split("-")[0],[]);return((0,D.useEffect)(()=>{let e=`
      @import url("https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css");

@font-face {
  font-family: "proxima-nova";
  src: url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 500;
  font-stretch: normal;
}

:root {
  --primary: #b6833f;
  --secondary: white;
  --text-shadow: 1px 1px 10px rgba(0,0,0,1);
}

.tk-proxima-nova {
  font-family: "proxima-nova", sans-serif;
}

.f`+i+`-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "proxima-nova", sans-serif !important;
  font-weight: 500;
  font-style: normal;
}

.f`+i+`-modal {
  width: 80%;
  max-width: 400px;
  height: 500px;
  overflow: hidden;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
}

@media screen and (min-width: 768px) {
  .f`+i+`-modal {
    width: 50%;
    max-width: 600px;
  }
}

.f`+i+`-modalImage {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}


@media screen and (max-width:768px) {
  .f`+i+`-modal {
    width: 100vw;
  }
}


.f`+i+`-curlyText {
  font-family: "proxima-nova", sans-serif;
  font-weight: 500;
  font-style: normal;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2pt;
  fill: var(--secondary);
  text-shadow: var(--text-shadow);
  margin-top: -150px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.f`+i+`-curlyText text {
  font-size: 1.3rem;
}


.f`+i+`-mainText {
  font-weight: 200;
  font-family: "proxima-nova", sans-serif;
  color: var(--secondary);
  font-size: 2.1rem;
  text-shadow: var(--text-shadow);
  display: inline-block;
  text-align: center;
  margin-top: -4.5rem;
}


@media screen and (min-width: 768px) {
  .f`+i+`-curlyText {
    margin-top: -200px;
  }
}

@media screen and (min-width: 1024px) {
  .f`+i+`-curlyText {
    margin-top: -200px;
  }

  .f`+i+`-mainText {
    font-size: 2.4rem;
  }
}

@media screen and (min-width: 1150px) {
  .f`+i+`-mainText {
    font-size: 2.7rem;
  }
}

.f`+i+`-cta {
  font-family: "proxima-nova", sans-serif;
  cursor: pointer;
  background-color: var(--secondary);
  padding: 0.75rem 3rem;
  border-radius: 8px;
  display: block;
  font-size: 1.3rem;
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;
  max-width: 400px;
  margin: 0 auto;
  text-decoration: none;
}

.f`+i+`-cta:hover {
  transition: all 0.3s;
  filter: brightness(0.95);
}

.f`+i+`-close-button {
  border-radius: 100%;
  background-color: var(--secondary);
  width: 2rem;
  height: 2rem;
  position: absolute;
  margin: 10px;
  top: 0px;
  right: 0px;
  color: black;
  font-size: 1.2rem;
  font-weight: 300;
  cursor: pointer;
}

.f`+i+`-button-container {
  flex: 1;
  display: grid;
  place-content: center;
}

.f`+i+`-image-darken {
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
    `,t=document.createElement("style");t.type="text/css",t.appendChild(document.createTextNode(e)),document.head.appendChild(t),o(!0)}),r)?/*@__PURE__*/O(D).createElement("div",{className:"f"+i+"-overlay"},/*@__PURE__*/O(D).createElement("div",{className:"f"+i+"-modal",style:{background:`url(${e?.data?.backgroundURL})`,backgroundPosition:"center",backgroundRepeat:"no-repeat",backgroundSize:"cover",position:"relative",height:500}},/*@__PURE__*/O(D).createElement("div",{className:"f"+i+"-image-darken"},/*@__PURE__*/O(D).createElement("button",{className:"f"+i+"-close-button",onClick:n},/*@__PURE__*/O(D).createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",viewBox:"0 0 16 16"},/*@__PURE__*/O(D).createElement("path",{fill:"#000",fillRule:"evenodd",d:"M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z"}))),/*@__PURE__*/O(D).createElement(ah,{text:e?.data?.heading,randomHash:i}),/*@__PURE__*/O(D).createElement("div",{style:{flex:1},className:"f"+i+"--spacer"}),/*@__PURE__*/O(D).createElement("div",{style:{flex:1,marginTop:-150,textTransform:"uppercase",textAlign:"center",letterSpacing:"2pt"}},/*@__PURE__*/O(D).createElement("span",{className:"f"+i+"-mainText"},e?.data?.paragraph)),/*@__PURE__*/O(D).createElement("div",{className:"f"+i+"-buttonContainer"},/*@__PURE__*/O(D).createElement("a",{href:e?.data?.buttonURL,className:"f"+i+"-cta",onClick:t},e?.data?.buttonText))))):null},ag=({trigger:e})=>{let{log:t,error:n}=tL(),{resetDisplayTrigger:r}=al(),{trackEvent:o}=rC(),{appId:i}=rs(),{visitor:a}=r_(),[s,u]=(0,D.useState)(!0),[l,c]=(0,D.useState)(!1),d=/*@__PURE__*/O(D).useMemo(()=>ac(),[]),f=(0,D.useMemo)(()=>tD().split("-")[0],[]);if((0,D.useEffect)(()=>{if(s){try{ai.put(`${ao}/triggers/${i}/${a.id}/seen`,{seenTriggerIDs:[e.id]}).then(t)}catch(e){n(e)}o("trigger_displayed",{triggerId:e.id,triggerType:e.invocation,triggerBehaviour:e.behaviour,brand:d})}},[s]),(0,D.useEffect)(()=>{let e=`
      @import url("https://p.typekit.net/p.css?s=1&k=olr0pvp&ht=tk&f=25136&a=50913812&app=typekit&e=css");

@font-face {
  font-family: "proxima-nova";
  src: url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff2"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("woff"), url("https://use.typekit.net/af/23e139/00000000000000007735e605/30/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n5&v=3") format("opentype");
  font-display: auto;
  font-style: normal;
  font-weight: 500;
  font-stretch: normal;
}

:root {
  --primary: #b6833f;
  --secondary: white;
  --text-shadow: 1px 1px 10px rgba(0,0,0,1);
}

.tk-proxima-nova {
  font-family: "proxima-nova", sans-serif;
}

.f`+f+`-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "proxima-nova", sans-serif !important;
  font-weight: 500;
  font-style: normal;
}

.f`+f+`-modal {
  width: 80%;
  max-width: 400px;
  height: 500px;
  overflow: hidden;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.5);
}

@media screen and (min-width: 768px) {
  .f`+f+`-modal {
    width: 50%;
    max-width: 600px;
  }
}

.f`+f+`-modalImage {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}


@media screen and (max-width:768px) {
  .f`+f+`-modal {
    width: 100vw;
  }
}


.f`+f+`-curlyText {
  font-family: "proxima-nova", sans-serif;
  font-weight: 500;
  font-style: normal;
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 2pt;
  fill: var(--secondary);
  text-shadow: var(--text-shadow);
  margin-top: -150px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.f`+f+`-curlyText text {
  font-size: 1.3rem;
}


.f`+f+`-mainText {
  font-weight: 200;
  font-family: "proxima-nova", sans-serif;
  color: var(--secondary);
  font-size: 2.1rem;
  text-shadow: var(--text-shadow);
  display: inline-block;
  text-align: center;
  margin-top: -4.5rem;
}


@media screen and (min-width: 768px) {
  .f`+f+`-curlyText {
    margin-top: -200px;
  }
}

@media screen and (min-width: 1024px) {
  .f`+f+`-curlyText {
    margin-top: -200px;
  }

  .f`+f+`-mainText {
    font-size: 2.4rem;
  }
}

@media screen and (min-width: 1150px) {
  .f`+f+`-mainText {
    font-size: 2.7rem;
  }
}

.f`+f+`-cta {
  font-family: "proxima-nova", sans-serif;
  cursor: pointer;
  background-color: var(--secondary);
  padding: 0.75rem 3rem;
  border-radius: 8px;
  display: block;
  font-size: 1.3rem;
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;
  max-width: 400px;
  margin: 0 auto;
  text-decoration: none;
}

.f`+f+`-cta:hover {
  transition: all 0.3s;
  filter: brightness(0.95);
}

.f`+f+`-close-button {
  border-radius: 100%;
  background-color: var(--secondary);
  width: 2rem;
  height: 2rem;
  position: absolute;
  margin: 10px;
  top: 0px;
  right: 0px;
  color: black;
  font-size: 1.2rem;
  font-weight: 300;
  cursor: pointer;
}

.f`+f+`-button-container {
  flex: 1;
  display: grid;
  place-content: center;
}

.f`+f+`-image-darken {
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
    `,t=document.createElement("style");t.type="text/css",t.appendChild(document.createTextNode(e)),document.head.appendChild(t),c(!0)}),!l||!s)return null;let p=t=>{t.preventDefault(),o("user_clicked_button",e),e?.data?.buttonURL&&window.open(e?.data?.buttonURL,"_self")},h=()=>{o("user_closed_trigger",e),r(),u(!1)};return"Stonehouse"===d?/*@__PURE__*/O(D).createElement(ap,{trigger:e,handleClickCallToAction:p,handleCloseModal:h}):"Browns"===d?/*@__PURE__*/O(D).createElement(am,{trigger:e,handleClickCallToAction:p,handleCloseModal:h}):null},av=({trigger:e})=>/*@__PURE__*/O(M).createPortal(/*@__PURE__*/O(D).createElement(ag,{trigger:e}),document.body);var D=I("exYeM");let ay=({trigger:e})=>{let[t,n]=(0,D.useState)(!0);return t?/*@__PURE__*/O(D).createElement("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.5)",zIndex:9999}},/*@__PURE__*/O(D).createElement("div",{style:{background:"#fff url('"+e?.brand?.backgroundImage+"') no-repeat center center",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",backgroundColor:"#fff",borderRadius:"0.5rem",padding:0,boxShadow:"0 0 1rem rgba(0,0,0,0.5)",border:"3px solid white",zIndex:9999}},/*@__PURE__*/O(D).createElement("div",{style:{backgroundColor:e?.brand?.overlayColor,maxWidth:"600px",padding:"2rem",borderRadius:"0.5rem"}},/*@__PURE__*/O(D).createElement("button",{onClick:()=>{n(!1)},style:{position:"absolute",top:"0.5rem",right:"0.5rem",fontSize:"2rem",backgroundColor:e?.brand?.fontColor,color:e?.brand?.primaryColor,border:"none",borderRadius:"0.5rem",padding:"0 1rem"}},"\xd7"),/*@__PURE__*/O(D).createElement("iframe",{src:e?.data?.url,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",style:{width:"500px",height:"260px",marginTop:"1rem"}})))):null},ab=({trigger:e})=>/*@__PURE__*/O(M).createPortal(/*@__PURE__*/O(D).createElement(ay,{trigger:e}),document.body),aw=[{id:"modal_v1",behaviour:"BEHAVIOUR_MODAL",invoke:e=>/*@__PURE__*/O(D).createElement(av,{trigger:e})},{id:"youtube_v1",behaviour:"BEHAVIOUR_YOUTUBE",invoke:e=>/*@__PURE__*/O(D).createElement(ab,{trigger:e})},{id:"inverse_v1",behaviour:"BEHAVIOUR_INVERSE_FLOW",invoke:e=>/*@__PURE__*/O(D).createElement(tE,{trigger:e})}],a_=new // CLASS
class{constructor(e={}){this.queryCache=e.queryCache||new eu,this.mutationCache=e.mutationCache||new ed,this.logger=e.logger||K,this.defaultOptions=e.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[],this.mountCount=0,e.logger&&this.logger.error("Passing a custom logger has been deprecated and will be removed in the next major version.")}mount(){this.mountCount++,1===this.mountCount&&(this.unsubscribeFocus=J.subscribe(()=>{J.isFocused()&&(this.resumePausedMutations(),this.queryCache.onFocus())}),this.unsubscribeOnline=ee.subscribe(()=>{ee.isOnline()&&(this.resumePausedMutations(),this.queryCache.onOnline())}))}unmount(){var e,t;this.mountCount--,0===this.mountCount&&(null==(e=this.unsubscribeFocus)||e.call(this),this.unsubscribeFocus=void 0,null==(t=this.unsubscribeOnline)||t.call(this),this.unsubscribeOnline=void 0)}isFetching(e,t){let[n]=U(e,t);return n.fetchStatus="fetching",this.queryCache.findAll(n).length}isMutating(e){return this.mutationCache.findAll({...e,fetching:!0}).length}getQueryData(e,t){var n;return null==(n=this.queryCache.find(e,t))?void 0:n.state.data}ensureQueryData(e,t,n){let r=A(e,t,n),o=this.getQueryData(r.queryKey);return o?Promise.resolve(o):this.fetchQuery(r)}getQueriesData(e){return this.getQueryCache().findAll(e).map(({queryKey:e,state:t})=>{let n=t.data;return[e,n]})}setQueryData(e,t,n){let r=this.queryCache.find(e),o=null==r?void 0:r.state.data,i="function"==typeof t?t(o):t;if(void 0===i)return;let a=A(e),s=this.defaultQueryOptions(a);return this.queryCache.build(this,s).setData(i,{...n,manual:!0})}setQueriesData(e,t,n){return G.batch(()=>this.getQueryCache().findAll(e).map(({queryKey:e})=>[e,this.setQueryData(e,t,n)]))}getQueryState(e,t){var n;return null==(n=this.queryCache.find(e,t))?void 0:n.state}removeQueries(e,t){let[n]=U(e,t),r=this.queryCache;G.batch(()=>{r.findAll(n).forEach(e=>{r.remove(e)})})}resetQueries(e,t,n){let[r,o]=U(e,t,n),i=this.queryCache,a={type:"active",...r};return G.batch(()=>(i.findAll(r).forEach(e=>{e.reset()}),this.refetchQueries(a,o)))}cancelQueries(e,t,n){let[r,o={}]=U(e,t,n);void 0===o.revert&&(o.revert=!0);let i=G.batch(()=>this.queryCache.findAll(r).map(e=>e.cancel(o)));return Promise.all(i).then(L).catch(L)}invalidateQueries(e,t,n){let[r,o]=U(e,t,n);return G.batch(()=>{var e,t;if(this.queryCache.findAll(r).forEach(e=>{e.invalidate()}),"none"===r.refetchType)return Promise.resolve();let n={...r,type:null!=(e=null!=(t=r.refetchType)?t:r.type)?e:"active"};return this.refetchQueries(n,o)})}refetchQueries(e,t,n){let[r,o]=U(e,t,n),i=G.batch(()=>this.queryCache.findAll(r).filter(e=>!e.isDisabled()).map(e=>{var t;return e.fetch(void 0,{...o,cancelRefetch:null==(t=null==o?void 0:o.cancelRefetch)||t,meta:{refetchPage:r.refetchPage}})})),a=Promise.all(i).then(L);return null!=o&&o.throwOnError||(a=a.catch(L)),a}fetchQuery(e,t,n){let r=A(e,t,n),o=this.defaultQueryOptions(r);void 0===o.retry&&(o.retry=!1);let i=this.queryCache.build(this,o);return i.isStaleByTime(o.staleTime)?i.fetch(o):Promise.resolve(i.state.data)}prefetchQuery(e,t,n){return this.fetchQuery(e,t,n).then(L).catch(L)}fetchInfiniteQuery(e,t,n){let r=A(e,t,n);return r.behavior={onFetch:e=>{e.fetchFn=()=>{var t,n,r,o,i,a,s;let u;let l=null==(t=e.fetchOptions)?void 0:null==(n=t.meta)?void 0:n.refetchPage,c=null==(r=e.fetchOptions)?void 0:null==(o=r.meta)?void 0:o.fetchMore,d=null==c?void 0:c.pageParam,f=(null==c?void 0:c.direction)==="forward",p=(null==c?void 0:c.direction)==="backward",h=(null==(i=e.state.data)?void 0:i.pages)||[],m=(null==(a=e.state.data)?void 0:a.pageParams)||[],g=m,v=!1,y=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>{var t,n;return null!=(t=e.signal)&&t.aborted?v=!0:null==(n=e.signal)||n.addEventListener("abort",()=>{v=!0}),e.signal}})},b=e.options.queryFn||(()=>Promise.reject("Missing queryFn for queryKey '"+e.options.queryHash+"'")),w=(e,t,n,r)=>(g=r?[t,...g]:[...g,t],r?[n,...e]:[...e,n]),_=(t,n,r,o)=>{if(v)return Promise.reject("Cancelled");if(void 0===r&&!n&&t.length)return Promise.resolve(t);let i={queryKey:e.queryKey,pageParam:r,meta:e.options.meta};y(i);let a=b(i),s=Promise.resolve(a).then(e=>w(t,r,e,o));return s};if(h.length){if(f){let t=void 0!==d,n=t?d:ef(e.options,h);u=_(h,t,n)}else if(p){let t=void 0!==d,n=t?d:null==(s=e.options).getPreviousPageParam?void 0:s.getPreviousPageParam(h[0],h);u=_(h,t,n,!0)}else{g=[];let t=void 0===e.options.getNextPageParam,n=!l||!h[0]||l(h[0],0,h);u=n?_([],t,m[0]):Promise.resolve(w([],m[0],h[0]));// Fetch remaining pages
for(let n=1;n<h.length;n++)u=u.then(r=>{let o=!l||!h[n]||l(h[n],n,h);if(o){let o=t?m[n]:ef(e.options,r);return _(r,t,o)}return Promise.resolve(w(r,m[n],h[n]))})}}else u=_([]);let k=u.then(e=>({pages:e,pageParams:g}));return k}}},this.fetchQuery(r)}prefetchInfiniteQuery(e,t,n){return this.fetchInfiniteQuery(e,t,n).then(L).catch(L)}resumePausedMutations(){return this.mutationCache.resumePausedMutations()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getLogger(){return this.logger}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(e){this.defaultOptions=e}setQueryDefaults(e,t){let n=this.queryDefaults.find(t=>q(e)===q(t.queryKey));n?n.defaultOptions=t:this.queryDefaults.push({queryKey:e,defaultOptions:t})}getQueryDefaults(e){if(!e)return;// Get the first matching defaults
let t=this.queryDefaults.find(t=>B(e,t.queryKey));// Additional checks and error in dev mode
{// Retrieve all matching defaults for the given key
let t=this.queryDefaults.filter(t=>B(e,t.queryKey));// It is ok not having defaults, but it is error prone to have more than 1 default for a given key
t.length>1&&this.logger.error("[QueryClient] Several query defaults match with key '"+JSON.stringify(e)+"'. The first matching query defaults are used. Please check how query defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults.")}return null==t?void 0:t.defaultOptions}setMutationDefaults(e,t){let n=this.mutationDefaults.find(t=>q(e)===q(t.mutationKey));n?n.defaultOptions=t:this.mutationDefaults.push({mutationKey:e,defaultOptions:t})}getMutationDefaults(e){if(!e)return;// Get the first matching defaults
let t=this.mutationDefaults.find(t=>B(e,t.mutationKey));// Additional checks and error in dev mode
{// Retrieve all matching defaults for the given key
let t=this.mutationDefaults.filter(t=>B(e,t.mutationKey));// It is ok not having defaults, but it is error prone to have more than 1 default for a given key
t.length>1&&this.logger.error("[QueryClient] Several mutation defaults match with key '"+JSON.stringify(e)+"'. The first matching mutation defaults are used. Please check how mutation defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetmutationdefaults.")}return null==t?void 0:t.defaultOptions}defaultQueryOptions(e){if(null!=e&&e._defaulted)return e;let t={...this.defaultOptions.queries,...this.getQueryDefaults(null==e?void 0:e.queryKey),...e,_defaulted:!0};return!t.queryHash&&t.queryKey&&(t.queryHash=z(t.queryKey,t)),void 0===t.refetchOnReconnect&&(t.refetchOnReconnect="always"!==t.networkMode),void 0===t.useErrorBoundary&&(t.useErrorBoundary=!!t.suspense),t}defaultMutationOptions(e){return null!=e&&e._defaulted?e:{...this.defaultOptions.mutations,...this.getMutationDefaults(null==e?void 0:e.mutationKey),...e,_defaulted:!0}}clear(){this.queryCache.clear(),this.mutationCache.clear()}},ak="b2c_token",aS=({appId:e,children:t,consent:n=!1,consentCallback:r,debug:o,defaultHandlers:i,initialDelay:a=0,exitIntentTriggers:s=!0,idleTriggers:u=!0,config:l})=>{let[c,d]=(0,D.useState)(n),[f,p]=(0,D.useState)(!1),[h,m]=(0,D.useState)(i||aw),g=/*@__PURE__*/O(D).useCallback(e=>{m(t=>[...t,e])},[m]);return(/**
   * Effect checks for user consent either via direct variable or a callback.
   * in any case, once one of the conditions is met, the single state gets set to true, allowing the logic to flow.
   * TODO: Think if it makes sense to memoize / derive that state instead? Gonna be tricky with an interval involved.
   */(0,D.useEffect)(()=>{if(n){d(n);return}if(console.log("Fingerprint Widget Consent: ",n),!r)return;let e=r(),t=setInterval(()=>{d(n)},1e3);// clear on onmount
return e&&clearInterval(t),()=>clearInterval(t)},[r,n]),(0,D.useEffect)(()=>{if(!e)throw Error("C&M Fingerprint: appId is required");if(f||!c)return;let t=async()=>{// @todo this should be invoked when booted.
// It will call out to the API to confirm the
// appId is valid and return the app configuration.
p(!0)};t()},[c]),e)?c?/*@__PURE__*/O(D).createElement(tM,{debug:o},/*@__PURE__*/O(D).createElement(ev,{client:a_},/*@__PURE__*/O(D).createElement(ax.Provider,{value:{appId:e,booted:f,currentTrigger:{},registerHandler:g,trackEvent:()=>{alert("trackEvent not implemented")},trackPageView:()=>{alert("trackPageView not implemented")},unregisterHandler:()=>{alert("unregisterHandler not implemented")},initialDelay:a,idleTriggers:u,exitIntentTriggers:s,config:l}},/*@__PURE__*/O(D).createElement(rb,null,/*@__PURE__*/O(D).createElement(rx,null,/*@__PURE__*/O(D).createElement(as,{handlers:h},/*@__PURE__*/O(D).createElement(ew,{onError:(e,t)=>console.error(e,t),fallback:/*@__PURE__*/O(D).createElement("div",null,"An application error occurred.")},t))))))):t:null},ax=/*#__PURE__*/(0,D.createContext)({appId:"",booted:!1,consent:!1,currentTrigger:{},exitIntentTriggers:!1,idleTriggers:!1,initialDelay:0,registerHandler:()=>{},trackEvent:()=>{},trackPageView:()=>{},unregisterHandler:()=>{},config:{idleDelay:void 0,trackIdleOnDesktop:!1}}),aE=document.createElement("div");aE.id="fingerprint-widget",document.body.appendChild(aE),// Embeds widget styles
// @todo this should be provided by CDN
// const styles = document.createElement('link')
// styles.rel = 'stylesheet'
// // @todo update parcel to use the hashed styles
// // @todo automatically strip any non-namespaced styles
// styles.href = '../dist/fingerprint.css'
// document.head.appendChild(styles)
console.log("Fingerprint Widget Loaded"),/*@__PURE__*/O(M).render(/*@__PURE__*/O(D).createElement(/*@__PURE__*/O(D).StrictMode,null,/*@__PURE__*/O(D).createElement(({appId:e,consent:t,debug:n})=>/*@__PURE__*/O(D).createElement(aS,{appId:e,consent:t,debug:n}),{appId:document?.currentScript?.getAttribute("id")||"",consent:document?.currentScript?.getAttribute("data-consent")==="true",debug:document?.currentScript?.getAttribute("data-debug")==="false"})),document.getElementById("fingerprint-widget"))}();//# sourceMappingURL=fingerprint.js.map

//# sourceMappingURL=fingerprint.js.map
