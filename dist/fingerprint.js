!function(){let e,t;function n(e,t,n,r){Object.defineProperty(e,t,{get:n,set:r,enumerable:!0,configurable:!0})}function r(e){return e&&e.__esModule?e.default:e}var a,i,o,s,l,u,c,d,f,p,h,m,v,g,y,b,w,_,k,x,S,E,C,T,O="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},R={},P={},I=O.parcelRequire34af;null==I&&((I=function(e){if(e in R)return R[e].exports;if(e in P){var t=P[e];delete P[e];var n={id:e,exports:{}};return R[e]=n,t.call(n.exports,n,n.exports),n.exports}var r=Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){P[e]=t},O.parcelRequire34af=I),I.register("exYeM",function(e,t){e.exports=I("7Ykon")}),I.register("7Ykon",function(e,t){!function(){"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var n,r,a,i,o,s,l,u,c,d,f,p,h,m,v=Symbol.for("react.element"),g=Symbol.for("react.portal"),y=Symbol.for("react.fragment"),b=Symbol.for("react.strict_mode"),w=Symbol.for("react.profiler"),_=Symbol.for("react.provider"),k=Symbol.for("react.context"),x=Symbol.for("react.forward_ref"),S=Symbol.for("react.suspense"),E=Symbol.for("react.suspense_list"),C=Symbol.for("react.memo"),T=Symbol.for("react.lazy"),O=Symbol.for("react.offscreen"),R=Symbol.iterator;function P(e){if(null===e||"object"!=typeof e)return null;var t=R&&e[R]||e["@@iterator"];return"function"==typeof t?t:null}/**
 * Keeps track of the current dispatcher.
 */var I={/**
   * @internal
   * @type {ReactComponent}
   */current:null},D={transition:null},N={current:null,// Used to reproduce behavior of `batchedUpdates` in legacy mode.
isBatchingLegacy:!1,didScheduleLegacyUpdate:!1},L={/**
   * @internal
   * @type {ReactComponent}
   */current:null},M={},A=null;M.setExtraStackFrame=function(e){A=e},M.getCurrentStack=null,M.getStackAddendum=function(){var e="";// Add an extra top frame while an element is being validated
A&&(e+=A);// Delegate to the injected renderer-specific implementation
var t=M.getCurrentStack;return t&&(e+=t()||""),e};var U={ReactCurrentDispatcher:I,ReactCurrentBatchConfig:D,ReactCurrentOwner:L};// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.
function z(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];j("warn",e,n)}function F(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];j("error",e,n)}function j(e,t,n){var r=U.ReactDebugCurrentFrame.getStackAddendum();""!==r&&(t+="%s",n=n.concat([r]));var a=n.map(function(e){return String(e)});// Careful: RN currently depends on this prefix
a.unshift("Warning: "+t),// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console[e],console,a)}U.ReactDebugCurrentFrame=M,U.ReactCurrentActQueue=N;var q={};function B(e,t){var n=e.constructor,r=n&&(n.displayName||n.name)||"ReactClass",a=r+"."+t;q[a]||(F("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",t,r),q[a]=!0)}/**
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
   */enqueueSetState:function(e,t,n,r){B(e,"setState")}},W=Object.assign,$={};/**
 * Base class helpers for the updating state of a component.
 */function H(e,t,n){this.props=e,this.context=t,this.refs=$,// renderer.
this.updater=n||V}Object.freeze($),H.prototype.isReactComponent={},/**
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
 */H.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};var Y={isMounted:["isMounted","Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],replaceState:["replaceState","Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]},Q=function(e,t){Object.defineProperty(H.prototype,e,{get:function(){z("%s(...) is deprecated in plain JavaScript React classes. %s",t[0],t[1])}})};for(var K in Y)Y.hasOwnProperty(K)&&Q(K,Y[K]);function G(){}/**
 * Convenience component with default shallow equality check for sCU.
 */function X(e,t,n){this.props=e,this.context=t,this.refs=$,this.updater=n||V}G.prototype=H.prototype;var J=X.prototype=new G;J.constructor=X,W(J,H.prototype),J.isPureReactComponent=!0;var Z=Array.isArray;// eslint-disable-next-line no-redeclare
function ee(e){if(function(e){try{return!1}catch(e){return!0}}(e))return F("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.","function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"),""+e;// throw (to help callers find troubleshooting comments)
}function et(e){return e.displayName||"Context"}// Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
function en(e){if(null==e)return null;if("number"==typeof e.tag&&F("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),"function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case y:return"Fragment";case g:return"Portal";case w:return"Profiler";case b:return"StrictMode";case S:return"Suspense";case E:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case k:return et(e)+".Consumer";case _:return et(e._context)+".Provider";case x:return function(e,t,n){var r=e.displayName;if(r)return r;var a=t.displayName||t.name||"";return""!==a?n+"("+a+")":n}// Keep in sync with react-reconciler/getComponentNameFromFiber
(e,e.render,"ForwardRef");case C:var t=e.displayName||null;if(null!==t)return t;return en(e.type)||"Memo";case T:var n=e._payload,r=e._init;try{return en(r(n))}catch(e){}}return null}var er=Object.prototype.hasOwnProperty,ea={key:!0,ref:!0,__self:!0,__source:!0};function ei(e){if(er.call(e,"ref")){var t=Object.getOwnPropertyDescriptor(e,"ref").get;if(t&&t.isReactWarning)return!1}return void 0!==e.ref}function eo(e){if(er.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return void 0!==e.key}a={};/**
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
 */var es=function(e,t,n,r,a,i,o){var s={// This tag allows us to uniquely identify this as a React Element
$$typeof:v,// Built-in properties that belong on the element
type:e,key:t,ref:n,props:o,// Record the component responsible for creating this element.
_owner:i};return(// The validation flag is currently mutative. We put it on
// an external backing store so that we can freeze the whole object.
// This can be replaced with a WeakMap once they are implemented in
// commonly used development environments.
s._store={},// the validation flag non-enumerable (where possible, which should
// include every environment we run tests in), so the test framework
// ignores it.
Object.defineProperty(s._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(s,"_self",{configurable:!1,enumerable:!1,writable:!1,value:r}),// equal for testing purposes and therefore we hide it from enumeration.
Object.defineProperty(s,"_source",{configurable:!1,enumerable:!1,writable:!1,value:a}),Object.freeze&&(Object.freeze(s.props),Object.freeze(s)),s)};/**
 * Create and return a new ReactElement of the given type.
 * See https://reactjs.org/docs/react-api.html#createelement
 */function el(e,t,i){var o,s={},l=null,u=null,c=null,d=null;if(null!=t)for(o in ei(t)&&(u=t.ref,function(e){if("string"==typeof e.ref&&L.current&&e.__self&&L.current.stateNode!==e.__self){var t=en(L.current.type);a[t]||(F('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',t,e.ref),a[t]=!0)}}(t)),eo(t)&&(ee(t.key),l=""+t.key),c=void 0===t.__self?null:t.__self,d=void 0===t.__source?null:t.__source,t)er.call(t,o)&&!ea.hasOwnProperty(o)&&(s[o]=t[o]);// Children can be more than one argument, and those are transferred onto
// the newly allocated props object.
var f=arguments.length-2;if(1===f)s.children=i;else if(f>1){for(var p=Array(f),h=0;h<f;h++)p[h]=arguments[h+2];Object.freeze&&Object.freeze(p),s.children=p}// Resolve default props
if(e&&e.defaultProps){var m=e.defaultProps;for(o in m)void 0===s[o]&&(s[o]=m[o])}if(l||u){var v,g,y="function"==typeof e?e.displayName||e.name||"Unknown":e;l&&((v=function(){n||(n=!0,F("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",y))}).isReactWarning=!0,Object.defineProperty(s,"key",{get:v,configurable:!0})),u&&((g=function(){r||(r=!0,F("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",y))}).isReactWarning=!0,Object.defineProperty(s,"ref",{get:g,configurable:!0}))}return es(e,l,u,c,d,L.current,s)}/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://reactjs.org/docs/react-api.html#cloneelement
 */function eu(e,t,n){if(null==e)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r,a,i=W({},e.props),o=e.key,s=e.ref,l=e._self,u=e._source,c=e._owner;// Reserved names are extracted
if(null!=t)for(r in ei(t)&&(// Silently steal the ref from the parent.
s=t.ref,c=L.current),eo(t)&&(ee(t.key),o=""+t.key),e.type&&e.type.defaultProps&&(a=e.type.defaultProps),t)er.call(t,r)&&!ea.hasOwnProperty(r)&&(void 0===t[r]&&void 0!==a?i[r]=a[r]:i[r]=t[r]);// Children can be more than one argument, and those are transferred onto
// the newly allocated props object.
var d=arguments.length-2;if(1===d)i.children=n;else if(d>1){for(var f=Array(d),p=0;p<d;p++)f[p]=arguments[p+2];i.children=f}return es(e.type,o,s,l,u,c,i)}/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */function ec(e){return"object"==typeof e&&null!==e&&e.$$typeof===v}/**
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
 */function em(e,t,n){if(null==e)return e;var r=[],a=0;return function e(t,n,r,a,i){var o=typeof t;("undefined"===o||"boolean"===o)&&(t=null);var s=!1;if(null===t)s=!0;else switch(o){case"string":case"number":s=!0;break;case"object":switch(t.$$typeof){case v:case g:s=!0}}if(s){var l,u,c=t,d=i(c),f=""===a?"."+eh(c,0):a;if(Z(d)){var p="";null!=f&&(p=ep(f)+"/"),e(d,n,p,"",function(e){return e})}else null!=d&&(ec(d)&&(d.key&&(!c||c.key!==d.key)&&ee(d.key),l=d,u=r+(d.key&&(!c||c.key!==d.key)?ep(""+d.key)+"/":"")+f,d=es(l.type,u,l.ref,l._self,l._source,l._owner,l.props)),n.push(d));return 1}var h=0,m=""===a?".":a+":";// Count of children found in the current subtree.
if(Z(t))for(var y=0;y<t.length;y++)_=m+eh(w=t[y],y),h+=e(w,n,r,_,i);else{var b=P(t);if("function"==typeof b){var w,_,k,x=t;// Warn about using Maps as children
b===x.entries&&(ed||z("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ed=!0);for(var S=b.call(x),E=0;!(k=S.next()).done;)_=m+eh(w=k.value,E++),h+=e(w,n,r,_,i)}else if("object"===o){// eslint-disable-next-line react-internal/safe-string-coercion
var C=String(t);throw Error("Objects are not valid as a React child (found: "+("[object Object]"===C?"object with keys {"+Object.keys(t).join(", ")+"}":C)+"). If you meant to render a collection of children, use an array instead.")}}return h}(e,r,"","",function(e){return t.call(n,e,a++)}),r}function ev(e){if(-1===e._status){var t=(0,e._result)();// Transition to the next state.
// This might throw either because it's missing or throws. If so, we treat it
// as still uninitialized and try again next time. Which is the same as what
// happens if the ctor or any wrappers processing the ctor throws. This might
// end up fixing it if the resolution was a concurrency bug.
t.then(function(t){(0===e._status||-1===e._status)&&(e._status=1,e._result=t)},function(t){(0===e._status||-1===e._status)&&(e._status=2,e._result=t)}),-1===e._status&&(e._status=0,e._result=t)}if(1===e._status){var n=e._result;return void 0===n&&F("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",n),"default"in n||F("lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",n),n.default}throw e._result}function eg(e){return"string"==typeof e||"function"==typeof e||e===y||e===w||e===b||e===S||e===E||e===O||"object"==typeof e&&null!==e&&(e.$$typeof===T||e.$$typeof===C||e.$$typeof===_||e.$$typeof===k||e.$$typeof===x||// This needs to include all possible module reference object
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
return"\n"+p+e}var ex=!1;function eS(e,t){// If something asked for a stack inside a fake render, it should get ignored.
if(!e||ex)return"";var n,r,a=h.get(e);if(void 0!==a)return a;ex=!0;var i=Error.prepareStackTrace;// $FlowFixMe It does accept undefined.
Error.prepareStackTrace=void 0,r=e_.current,// for warnings.
e_.current=null,function(){if(0===eb){/* eslint-disable react-internal/no-production-logging */o=console.log,s=console.info,l=console.warn,u=console.error,c=console.group,d=console.groupCollapsed,f=console.groupEnd;var e={configurable:!0,enumerable:!0,value:ew,writable:!0};// $FlowFixMe Flow thinks console is immutable.
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
var m=t.stack.split("\n"),v=n.stack.split("\n"),g=m.length-1,y=v.length-1;g>=1&&y>=0&&m[g]!==v[y];)// Typically this will be the root most one. However, stack frames may be
// cut off due to maximum stack limits. In this case, one maybe cut off
// earlier than the other. We assume that the sample is longer or the same
// and there for cut off earlier. So we should find the root most frame in
// the sample somewhere in the control.
y--;for(;g>=1&&y>=0;g--,y--)// frame that called our sample function and the control.
if(m[g]!==v[y]){// In V8, the first line is describing the message but other VMs don't.
// If we're about to return the first line, and the control is also on the same
// line, that's a pretty good indicator that our sample threw at same line as
// the control. I.e. before we entered the sample frame. So we ignore this result.
// This can happen if you passed a class to function component, or non-function.
if(1!==g||1!==y)do // The next one that isn't the same should be our match though.
if(g--,--y<0||m[g]!==v[y]){// V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
var b="\n"+m[g].replace(" at new "," at ");// If our component frame is labeled "<anonymous>"
return e.displayName&&b.includes("<anonymous>")&&(b=b.replace("<anonymous>",e.displayName)),"function"==typeof e&&h.set(e,b),b}while(g>=1&&y>=0)break}}}finally{ex=!1,e_.current=r,function(){if(0==--eb){/* eslint-disable react-internal/no-production-logging */var e={configurable:!0,enumerable:!0,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{log:W({},e,{value:o}),info:W({},e,{value:s}),warn:W({},e,{value:l}),error:W({},e,{value:u}),group:W({},e,{value:c}),groupCollapsed:W({},e,{value:d}),groupEnd:W({},e,{value:f})});/* eslint-enable react-internal/no-production-logging */}eb<0&&F("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=i}// Fallback to just using the name if we couldn't make it throw.
var w=e?e.displayName||e.name:"",_=w?ek(w):"";return"function"==typeof e&&h.set(e,_),_}function eE(e,t,n){if(null==e)return"";if("function"==typeof e)return eS(e,!!((r=e.prototype)&&r.isReactComponent));if("string"==typeof e)return ek(e);switch(e){case S:return ek("Suspense");case E:return ek("SuspenseList")}if("object"==typeof e)switch(e.$$typeof){case x:return eS(e.render,!1);case C:// Memo may contain any component type so we recursively resolve it.
return eE(e.type,t,n);case T:var r,a=e._payload,i=e._init;try{// Lazy may contain any component type so we recursively resolve it.
return eE(i(a),t,n)}catch(e){}}return""}h=new("function"==typeof WeakMap?WeakMap:Map);var eC={},eT=U.ReactDebugCurrentFrame;function eO(e){if(e){var t=e._owner,n=eE(e.type,e._source,t?t.type:null);eT.setExtraStackFrame(n)}else eT.setExtraStackFrame(null)}function eR(e){if(e){var t=e._owner;A=eE(e.type,e._source,t?t.type:null)}else A=null}function eP(){if(L.current){var e=en(L.current.type);if(e)return"\n\nCheck the render method of `"+e+"`."}return""}m=!1;/**
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
var r="";e&&e._owner&&e._owner!==L.current&&(r=" It was passed a child from "+en(e._owner.type)+"."),eR(e),F('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',n,r),eR(null)}}}/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */function eN(e,t){if("object"==typeof e){if(Z(e))for(var n=0;n<e.length;n++){var r=e[n];ec(r)&&eD(r,t)}else if(ec(e))e._store&&(e._store.validated=!0);else if(e){var a=P(e);if("function"==typeof a&&a!==e.entries)for(var i,o=a.call(e);!(i=o.next()).done;)ec(i.value)&&eD(i.value,t)}}}/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */function eL(e){var t,n=e.type;if(null!=n&&"string"!=typeof n){if("function"==typeof n)t=n.propTypes;else{if("object"!=typeof n||n.$$typeof!==x&&// Note: Memo only checks outer props here.
// Inner props are checked in the reconciler.
n.$$typeof!==C)return;t=n.propTypes}if(t){// Intentionally inside to avoid triggering lazy initializers:
var r=en(n);!function(e,t,n,r,a){// $FlowFixMe This is okay but Flow doesn't know it.
var i=Function.call.bind(er);for(var o in e)if(i(e,o)){var s=void 0;// Prop type validation may throw. In case they do, we don't want to
// fail the render phase where it didn't fail before. So we log it.
// After these have been cleaned up, we'll let them throw.
try{// This is intentionally an invariant that gets caught. It's the same
// behavior as without this statement except with a better message.
if("function"!=typeof e[o]){// eslint-disable-next-line react-internal/prod-error-codes
var l=Error((r||"React class")+": "+n+" type `"+o+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[o]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw l.name="Invariant Violation",l}s=e[o](t,o,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(e){s=e}!s||s instanceof Error||(eO(a),F("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,o,typeof s),eO(null)),s instanceof Error&&!(s.message in eC)&&(// Only monitor this failure once because there tends to be a lot of the
// same error.
eC[s.message]=!0,eO(a),F("Failed %s type: %s",n,s.message),eO(null))}}(t,e.props,"prop",r,e)}else void 0===n.PropTypes||m||(m=!0,F("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",en(n)||"Unknown"));"function"!=typeof n.getDefaultProps||n.getDefaultProps.isReactClassApproved||F("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}function eM(e,t,n){var r=eg(e);// We warn in this case but don't throw. We expect the element creation to
// succeed and there will likely be errors in render.
if(!r){var a,i="";(void 0===e||"object"==typeof e&&null!==e&&0===Object.keys(e).length)&&(i+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var o=function(e){if(null!=e){var t;return void 0!==(t=e.__source)?"\n\nCheck your code at "+t.fileName.replace(/^.*[\\\/]/,"")+":"+t.lineNumber+".":""}return""}(t);(o?i+=o:i+=eP(),null===e)?a="null":Z(e)?a="array":void 0!==e&&e.$$typeof===v?(a="<"+(en(e.type)||"Unknown")+" />",i=" Did you accidentally export a JSX literal instead of a component?"):a=typeof e,F("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",a,i)}var s=el.apply(this,arguments);// The result can be nullish if a mock or a custom function is used.
// TODO: Drop this when these are no longer allowed as the type argument.
if(null==s)return s;// Skip key warning if the type isn't valid since our key validation logic
// doesn't expect a non-string/function type and can throw confusing errors.
// We don't want exception behavior to differ between dev and prod.
// (Rendering will throw with a helpful message and as soon as the type is
// fixed, the key warnings will appear.)
if(r)for(var l=2;l<arguments.length;l++)eN(arguments[l],e);return e===y?/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */function(e){for(var t=Object.keys(e.props),n=0;n<t.length;n++){var r=t[n];if("children"!==r&&"key"!==r){eR(e),F("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",r),eR(null);break}}null!==e.ref&&(eR(e),F("Invalid attribute `ref` supplied to `React.Fragment`."),eR(null))}(s):eL(s),s}var eA=!1,eU=!1,ez=null,eF=0,ej=!1;function eq(e){e!==eF-1&&F("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "),eF=e}function eB(t,n,r){var a=N.current;if(null!==a)try{eW(a),function(t){if(null===ez)try{// read require off the module object to get around the bundlers.
// we don't want them to detect a require and bundle a Node polyfill.
var n=("require"+Math.random()).slice(0,7);// version of setImmediate, bypassing fake timers if any.
ez=(e&&e[n]).call(e,"timers").setImmediate}catch(e){// we're in a browser
// we can't use regular timers because they may still be faked
// so we try MessageChannel+postMessage instead
ez=function(e){!1===eU&&(eU=!0,"undefined"==typeof MessageChannel&&F("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));var t=new MessageChannel;t.port1.onmessage=e,t.port2.postMessage(void 0)}}ez(t)}(function(){0===a.length?(// No additional work was scheduled. Finish.
N.current=null,n(t)):eB(t,n,r)})}catch(e){r(e)}else n(t)}var eV=!1;function eW(e){if(!eV){// Prevent re-entrance.
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
 */function(e){if(!ec(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},t.Component=H,t.Fragment=y,t.Profiler=w,t.PureComponent=X,t.StrictMode=b,t.Suspense=S,t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=U,t.cloneElement=function(e,t,n){for(var r=eu.apply(this,arguments),a=2;a<arguments.length;a++)eN(arguments[a],r.type);return eL(r),r},t.createContext=function(e){// TODO: Second argument used to be an optional `calculateChangedBits`
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
_defaultValue:null,_globalName:null};t.Provider={$$typeof:_,_context:t};var n=!1,r=!1,a=!1,i={$$typeof:k,_context:t};return Object.defineProperties(i,{Provider:{get:function(){return r||(r=!0,F("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")),t.Provider},set:function(e){t.Provider=e}},_currentValue:{get:function(){return t._currentValue},set:function(e){t._currentValue=e}},_currentValue2:{get:function(){return t._currentValue2},set:function(e){t._currentValue2=e}},_threadCount:{get:function(){return t._threadCount},set:function(e){t._threadCount=e}},Consumer:{get:function(){return n||(n=!0,F("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")),t.Consumer}},displayName:{get:function(){return t.displayName},set:function(e){a||(z("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.",e),a=!0)}}}),t.Consumer=i,t._currentRenderer=null,t._currentRenderer2=null,t},t.createElement=eM,t.createFactory=function(e){var t=eM.bind(null,e);return t.type=e,eA||(eA=!0,z("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")),Object.defineProperty(t,"type",{enumerable:!1,get:function(){return z("Factory.type is deprecated. Access the class directly before passing it to createFactory."),Object.defineProperty(this,"type",{value:e}),e}}),t},t.createRef=// an immutable object with a single mutable value
function(){var e={current:null};return Object.seal(e),e},t.forwardRef=function(e){null!=e&&e.$$typeof===C?F("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."):"function"!=typeof e?F("forwardRef requires a render function but was given %s.",null===e?"null":typeof e):0!==e.length&&2!==e.length&&F("forwardRef render functions accept exactly two parameters: props and ref. %s",1===e.length?"Did you forget to use the ref parameter?":"Any additional parameter will be undefined."),null!=e&&(null!=e.defaultProps||null!=e.propTypes)&&F("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");var t,n={$$typeof:x,render:e};return Object.defineProperty(n,"displayName",{enumerable:!1,configurable:!0,get:function(){return t},set:function(n){t=n,e.name||e.displayName||(e.displayName=n)}}),n},t.isValidElement=ec,t.lazy=function(e){var t,n,r={$$typeof:T,_payload:{// We use these fields to store the result.
_status:-1,_result:e},_init:ev};return Object.defineProperties(r,{defaultProps:{configurable:!0,get:function(){return t},set:function(e){F("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),t=e,// $FlowFixMe
Object.defineProperty(r,"defaultProps",{enumerable:!0})}},propTypes:{configurable:!0,get:function(){return n},set:function(e){F("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."),n=e,// $FlowFixMe
Object.defineProperty(r,"propTypes",{enumerable:!0})}}}),r},t.memo=function(e,t){eg(e)||F("memo: The first argument must be a component. Instead received: %s",null===e?"null":typeof e);var n,r={$$typeof:C,type:e,compare:void 0===t?null:t};return Object.defineProperty(r,"displayName",{enumerable:!1,configurable:!0,get:function(){return n},set:function(t){n=t,e.name||e.displayName||(e.displayName=t)}}),r},t.startTransition=function(e,t){var n=D.transition;D.transition={};var r=D.transition;D.transition._updatedFibers=new Set;try{e()}finally{D.transition=n,null===n&&r._updatedFibers&&(r._updatedFibers.size>10&&z("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),r._updatedFibers.clear())}},t.unstable_act=function(e){// `act` calls can be nested, so we track the depth. This represents the
// number of `act` scopes on the stack.
var t,n=eF;eF++,null===N.current&&// will detect the queue and use it instead of Scheduler.
(N.current=[]);var r=N.isBatchingLegacy;try{// which flushed updates immediately after the scope function exits, even
// if it's an async function.
if(// Used to reproduce behavior of `batchedUpdates` in legacy mode. Only
// set to `true` while the given callback is executed, not for updates
// triggered during an async event, because this is how the legacy
// implementation of `act` behaved.
N.isBatchingLegacy=!0,t=e(),!r&&N.didScheduleLegacyUpdate){var a=N.current;null!==a&&(N.didScheduleLegacyUpdate=!1,eW(a))}}catch(e){throw eq(n),e}finally{N.isBatchingLegacy=r}if(null!==t&&"object"==typeof t&&"function"==typeof t.then){var i=t,o=!1;// The callback is an async function (i.e. returned a promise). Wait
return ej||"undefined"==typeof Promise||Promise.resolve().then(function(){}).then(function(){o||(ej=!0,F("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"))}),{then:function(e,t){o=!0,i.then(function(r){eq(n),0===eF?// queue until there's no remaining work.
eB(r,e,t):e(r)},function(e){// The callback threw an error.
eq(n),t(e)})}}}var s=t;// The callback is not an async function. Exit the current scope
if(// immediately, without awaiting.
eq(n),0!==eF)return{then:function(e,t){e(s)}};// Exiting the outermost act scope. Flush the queue.
var l=N.current;return null!==l&&(eW(l),N.current=null),{then:function(e,t){// Confirm we haven't re-entered another `act` scope, in case
// the user does something weird like await the thenable
// multiple times.
null===N.current?(// Recursively flush the queue until there's no remaining work.
N.current=[],eB(s,e,t)):e(s)}}},t.useCallback=function(e,t){return ey().useCallback(e,t)},t.useContext=function(e){var t=ey();// TODO: add a more generic warning for invalid values.
if(void 0!==e._context){var n=e._context;// Don't deduplicate because this legitimately causes bugs
// and nobody should be using this in existing code.
n.Consumer===e?F("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?"):n.Provider===e&&F("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?")}return t.useContext(e)},t.useDebugValue=function(e,t){return ey().useDebugValue(e,t)},t.useDeferredValue=function(e){return ey().useDeferredValue(e)},t.useEffect=function(e,t){return ey().useEffect(e,t)},t.useId=function(){return ey().useId()},t.useImperativeHandle=function(e,t,n){return ey().useImperativeHandle(e,t,n)},t.useInsertionEffect=function(e,t){return ey().useInsertionEffect(e,t)},t.useLayoutEffect=function(e,t){return ey().useLayoutEffect(e,t)},t.useMemo=function(e,t){return ey().useMemo(e,t)},t.useReducer=function(e,t,n){return ey().useReducer(e,t,n)},t.useRef=function(e){return ey().useRef(e)},t.useState=function(e){return ey().useState(e)},t.useSyncExternalStore=function(e,t,n){return ey().useSyncExternalStore(e,t,n)},t.useTransition=function(){return ey().useTransition()},t.version="18.2.0","undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}),I.register("crBKy",function(e,t){var r,a,i,o,s,l,u,c,d,f,p,h;n(e.exports,"__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED",function(){return r},function(e){return r=e}),n(e.exports,"createPortal",function(){return a},function(e){return a=e}),n(e.exports,"createRoot",function(){return i},function(e){return i=e}),n(e.exports,"findDOMNode",function(){return o},function(e){return o=e}),n(e.exports,"flushSync",function(){return s},function(e){return s=e}),n(e.exports,"hydrate",function(){return l},function(e){return l=e}),n(e.exports,"hydrateRoot",function(){return u},function(e){return u=e}),n(e.exports,"render",function(){return c},function(e){return c=e}),n(e.exports,"unmountComponentAtNode",function(){return d},function(e){return d=e}),n(e.exports,"unstable_batchedUpdates",function(){return f},function(e){return f=e}),n(e.exports,"unstable_renderSubtreeIntoContainer",function(){return p},function(e){return p=e}),n(e.exports,"version",function(){return h},function(e){return h=e}),function(){"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var e,t,n,m,v,g,y,b,w,_,k,x,S,E,C,T,O,R,P,D,N,L,M,A,U,z,F,j,q,B,V,W,$,H,Y,Q,K,G,X,J,Z,ee,et,en,er,ea,ei,eo,es,el,eu,ec,ed,ef,ep,eh,em,ev,eg,ey,eb,ew,e_,ek,ex,eS,eE,eC,eT,eO,eR=I("exYeM"),eP=I("ibqfJ"),eI=eR.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,eD=!1;// by calls to these methods by a Babel plugin.
//
// In PROD (or in packages without access to React internals),
// they are left as they are instead.
function eN(e){if(!eD){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];eM("warn",e,n)}}function eL(e){if(!eD){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];eM("error",e,n)}}function eM(e,t,n){var r=eI.ReactDebugCurrentFrame.getStackAddendum();""!==r&&(t+="%s",n=n.concat([r]));var a=n.map(function(e){return String(e)});// Careful: RN currently depends on this prefix
a.unshift("Warning: "+t),// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console[e],console,a)}var eA=new Set,eU={},ez={};function eF(e,t){ej(e,t),ej(e+"Capture",t)}function ej(e,t){eU[e]&&eL("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.",e),eU[e]=t,ez[e.toLowerCase()]=e,"onDoubleClick"===e&&(ez.ondblclick=e);for(var n=0;n<t.length;n++)eA.add(t[n])}var eq=!!("undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement),eB=Object.prototype.hasOwnProperty;/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */// $FlowFixMe only called in DEV, so void return is not possible.
function eV(e){return"function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"}// $FlowFixMe only called in DEV, so void return is not possible.
function eW(e){try{return!1}catch(e){return!0}}function e$(e,t){if(eW(e))return eL("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.",t,eV(e)),""+e;// throw (to help callers find troubleshooting comments)
}function eH(e){if(eW(e))return eL("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.",eV(e)),""+e;// throw (to help callers find troubleshooting comments)
}/* eslint-disable max-len */var eY=":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-퟿\\uF900-\\uFDCF\\uFDF0-\\uFFFD",eQ=eY+"\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040",eK=RegExp("^["+eY+"]["+eQ+"]*$"),eG={},eX={};function eJ(e){return!!eB.call(eX,e)||!eB.call(eG,e)&&(eK.test(e)?(eX[e]=!0,!0):(eG[e]=!0,eL("Invalid attribute name: `%s`",e),!1))}function eZ(e,t,n){return null!==t?0===t.type:!n&&e.length>2&&("o"===e[0]||"O"===e[0])&&("n"===e[1]||"N"===e[1])}function e0(e,t,n,r){if(null!==n&&0===n.type)return!1;switch(typeof t){case"function":case"symbol":// eslint-disable-line
return!0;case"boolean":if(r)return!1;if(null!==n)return!n.acceptsBooleans;var a=e.toLowerCase().slice(0,5);return"data-"!==a&&"aria-"!==a;default:return!1}}function e1(e,t,n,r){if(null==t||e0(e,t,n,r))return!0;if(r)return!1;if(null!==n)switch(n.type){case 3:return!t;case 4:return!1===t;case 5:return isNaN(t);case 6:return isNaN(t)||t<1}return!1}function e2(e){return e5.hasOwnProperty(e)?e5[e]:null}function e3(e,t,n,r,a,i,o){this.acceptsBooleans=2===t||3===t||4===t,this.attributeName=r,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=i,this.removeEmptyString=o}// When adding attributes to this list, be sure to also add them to
// the `possibleStandardNames` module to ensure casing and incorrect
// name warnings.
var e5={};// These props are reserved by React. They shouldn't be written to the DOM.
["children","dangerouslySetInnerHTML",// elements (not just inputs). Now that ReactDOMInput assigns to the
// defaultValue property -- do we need this?
"defaultValue","defaultChecked","innerHTML","suppressContentEditableWarning","suppressHydrationWarning","style"].forEach(function(e){e5[e]=new e3(e,0,!1,e,null,!1,!1)}),// This is a mapping from React prop names to the attribute names.
[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0],n=e[1];e5[t]=new e3(t,1,!1,n,null,!1,!1)}),// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
["contentEditable","draggable","spellCheck","value"].forEach(function(e){e5[e]=new e3(e,2,!1,e.toLowerCase(),null,!1,!1)}),// In React, we let users pass `true` and `false` even though technically
// these aren't boolean attributes (they are coerced to strings).
// Since these are SVG attributes, their attribute names are case-sensitive.
["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){e5[e]=new e3(e,2,!1,e,null,!1,!1)}),["allowFullScreen","async",// on the client side because the browsers are inconsistent. Instead we call focus().
"autoFocus","autoPlay","controls","default","defer","disabled","disablePictureInPicture","disableRemotePlayback","formNoValidate","hidden","loop","noModule","noValidate","open","playsInline","readOnly","required","reversed","scoped","seamless","itemScope"].forEach(function(e){e5[e]=new e3(e,3,!1,e.toLowerCase(),null,!1,!1)}),// rather than attributes. These are all booleans.
["checked",// disabled with `removeAttribute`. We have special logic for handling this.
"multiple","muted","selected"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){e5[e]=new e3(e,3,!0,e,null,!1,!1)}),// booleans, but can also accept a string value.
["capture","download"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){e5[e]=new e3(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){e5[e]=new e3(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){e5[e]=new e3(e,5,!1,e.toLowerCase(),null,!1,!1)});var e4=/[\-\:]([a-z])/g,e6=function(e){return e[1].toUpperCase()};// or boolean value assignment. Regular attributes that just accept strings
// and have the same names are omitted, just like in the HTML attribute filter.
// Some of these attributes can be hard to find. This list was created by
// scraping the MDN documentation.
["accent-height","alignment-baseline","arabic-form","baseline-shift","cap-height","clip-path","clip-rule","color-interpolation","color-interpolation-filters","color-profile","color-rendering","dominant-baseline","enable-background","fill-opacity","fill-rule","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","glyph-name","glyph-orientation-horizontal","glyph-orientation-vertical","horiz-adv-x","horiz-origin-x","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","overline-position","overline-thickness","paint-order","panose-1","pointer-events","rendering-intent","shape-rendering","stop-color","stop-opacity","strikethrough-position","strikethrough-thickness","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-anchor","text-decoration","text-rendering","underline-position","underline-thickness","unicode-bidi","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","vector-effect","vert-adv-y","vert-origin-x","vert-origin-y","word-spacing","writing-mode","xmlns:xlink","x-height"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){var t=e.replace(e4,e6);e5[t]=new e3(t,1,!1,e,null,!1,!1)}),["xlink:actuate","xlink:arcrole","xlink:role","xlink:show","xlink:title","xlink:type"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){var t=e.replace(e4,e6);e5[t]=new e3(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"// NOTE: if you add a camelCased prop to this list,
].forEach(function(e){var t=e.replace(e4,e6);e5[t]=new e3(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),// The attribute name is case-sensitive in SVG so we can't just use
// the React name like we do for attributes that exist only in HTML.
["tabIndex","crossOrigin"].forEach(function(e){e5[e]=new e3(e,1,!1,e.toLowerCase(),null,!1,!1)}),e5.xlinkHref=new e3("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){e5[e]=new e3(e,1,!1,e.toLowerCase(),null,!0,!0)});// and any newline or tab are filtered out as if they're not part of the URL.
// https://url.spec.whatwg.org/#url-parsing
// Tab or newline are defined as \r\n\t:
// https://infra.spec.whatwg.org/#ascii-tab-or-newline
// A C0 control is a code point in the range \u0000 NULL to \u001F
// INFORMATION SEPARATOR ONE, inclusive:
// https://infra.spec.whatwg.org/#c0-control-or-space
/* eslint-disable max-len */var e8=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i,e7=!1;function e9(e){!e7&&e8.test(e)&&(e7=!0,eL("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.",JSON.stringify(e)))}/**
 * Get the value for a attribute on a node. Only used in DEV for SSR validation.
 * The third argument is used as a hint of what the expected value is. Some
 * attributes have multiple equivalent values.
 */function te(e,t,n,r){if(eJ(t)){if(!e.hasAttribute(t))return void 0===n?void 0:null;var a=e.getAttribute(t);return(e$(n,t),a===""+n)?n:a}}/**
 * Sets the value for a property on a node.
 *
 * @param {DOMElement} node
 * @param {string} name
 * @param {*} value
 */function tt(e,t,n,r){var a=e2(t);if(!eZ(t,a,r)){if(e1(t,n,a,r)&&(n=null),r||null===a){eJ(t)&&(null===n?e.removeAttribute(t):(e$(n,t),e.setAttribute(t,""+n)));return}if(a.mustUseProperty){var i=a.propertyName;if(null===n){var o=a.type;e[i]=3!==o&&""}else // `toString`ed by IE8/9.
e[i]=n;return}// The rest are treated as attributes with special cases.
var s=a.attributeName,l=a.attributeNamespace;if(null===n)e.removeAttribute(s);else{var u,c=a.type;3===c||4===c&&!0===n?// and we won't require Trusted Type here.
u="":(e$(n,s),u=""+n,a.sanitizeURL&&e9(u.toString())),l?e.setAttributeNS(l,s,u):e.setAttribute(s,u)}}}// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var tn=Symbol.for("react.element"),tr=Symbol.for("react.portal"),ta=Symbol.for("react.fragment"),ti=Symbol.for("react.strict_mode"),to=Symbol.for("react.profiler"),ts=Symbol.for("react.provider"),tl=Symbol.for("react.context"),tu=Symbol.for("react.forward_ref"),tc=Symbol.for("react.suspense"),td=Symbol.for("react.suspense_list"),tf=Symbol.for("react.memo"),tp=Symbol.for("react.lazy"),th=(Symbol.for("react.scope"),Symbol.for("react.debug_trace_mode"),Symbol.for("react.offscreen")),tm=(Symbol.for("react.legacy_hidden"),Symbol.for("react.cache"),Symbol.for("react.tracing_marker"),Symbol.iterator);function tv(e){if(null===e||"object"!=typeof e)return null;var t=tm&&e[tm]||e["@@iterator"];return"function"==typeof t?t:null}var tg=Object.assign,ty=0;function tb(){}tb.__reactDisabledLog=!0;var tw=eI.ReactCurrentDispatcher;function t_(e,t,n){if(void 0===x)try{throw Error()}catch(e){var r=e.stack.trim().match(/\n( *(at )?)/);x=r&&r[1]||""}// We use the prefix to ensure our stacks line up with native stack frames.
return"\n"+x+e}var tk=!1;function tx(e,t){// If something asked for a stack inside a fake render, it should get ignored.
if(!e||tk)return"";var n,r,a=S.get(e);if(void 0!==a)return a;tk=!0;var i=Error.prepareStackTrace;// $FlowFixMe It does accept undefined.
Error.prepareStackTrace=void 0,r=tw.current,// for warnings.
tw.current=null,function(){if(0===ty){/* eslint-disable react-internal/no-production-logging */v=console.log,g=console.info,y=console.warn,b=console.error,w=console.group,_=console.groupCollapsed,k=console.groupEnd;var e={configurable:!0,enumerable:!0,value:tb,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e});/* eslint-enable react-internal/no-production-logging */}ty++}();try{// This should throw.
if(t){// Something should be setting the props in the constructor.
var o=function(){throw Error()};// $FlowFixMe
if(Object.defineProperty(o.prototype,"props",{set:function(){// We use a throwing setter instead of frozen or non-writable props
// because that won't throw in a non-strict mode function.
throw Error()}}),"object"==typeof Reflect&&Reflect.construct){// We construct a different control for this case to include any extra
// frames added by the construct call.
try{Reflect.construct(o,[])}catch(e){n=e}Reflect.construct(e,[],o)}else{try{o.call()}catch(e){n=e}e.call(o.prototype)}}else{try{throw Error()}catch(e){n=e}e()}}catch(t){// This is inlined manually because closure doesn't do it for us.
if(t&&n&&"string"==typeof t.stack){for(// This extracts the first frame from the sample that isn't also in the control.
// Skipping one frame that we assume is the frame that calls the two.
var s=t.stack.split("\n"),l=n.stack.split("\n"),u=s.length-1,c=l.length-1;u>=1&&c>=0&&s[u]!==l[c];)// Typically this will be the root most one. However, stack frames may be
// cut off due to maximum stack limits. In this case, one maybe cut off
// earlier than the other. We assume that the sample is longer or the same
// and there for cut off earlier. So we should find the root most frame in
// the sample somewhere in the control.
c--;for(;u>=1&&c>=0;u--,c--)// frame that called our sample function and the control.
if(s[u]!==l[c]){// In V8, the first line is describing the message but other VMs don't.
// If we're about to return the first line, and the control is also on the same
// line, that's a pretty good indicator that our sample threw at same line as
// the control. I.e. before we entered the sample frame. So we ignore this result.
// This can happen if you passed a class to function component, or non-function.
if(1!==u||1!==c)do // The next one that isn't the same should be our match though.
if(u--,--c<0||s[u]!==l[c]){// V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
var d="\n"+s[u].replace(" at new "," at ");// If our component frame is labeled "<anonymous>"
return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),"function"==typeof e&&S.set(e,d),d}while(u>=1&&c>=0)break}}}finally{tk=!1,tw.current=r,function(){if(0==--ty){/* eslint-disable react-internal/no-production-logging */var e={configurable:!0,enumerable:!0,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{log:tg({},e,{value:v}),info:tg({},e,{value:g}),warn:tg({},e,{value:y}),error:tg({},e,{value:b}),group:tg({},e,{value:w}),groupCollapsed:tg({},e,{value:_}),groupEnd:tg({},e,{value:k})});/* eslint-enable react-internal/no-production-logging */}ty<0&&eL("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=i}// Fallback to just using the name if we couldn't make it throw.
var f=e?e.displayName||e.name:"",p=f?t_(f):"";return"function"==typeof e&&S.set(e,p),p}function tS(e){try{var t="",n=e;do t+=function(e){switch(e._debugOwner&&e._debugOwner.type,e._debugSource,e.tag){case 5:return t_(e.type);case 16:return t_("Lazy");case 13:return t_("Suspense");case 19:return t_("SuspenseList");case 0:case 2:case 15:return tx(e.type,!1);case 11:return tx(e.type.render,!1);case 1:return tx(e.type,!0);default:return""}}(n),n=n.return;while(n)return t}catch(e){return"\nError generating stack: "+e.message+"\n"+e.stack}}function tE(e){return e.displayName||"Context"}// Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
function tC(e){if(null==e)return null;if("number"==typeof e.tag&&eL("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),"function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case ta:return"Fragment";case tr:return"Portal";case to:return"Profiler";case ti:return"StrictMode";case tc:return"Suspense";case td:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case tl:return tE(e)+".Consumer";case ts:return tE(e._context)+".Provider";case tu:return function(e,t,n){var r=e.displayName;if(r)return r;var a=t.displayName||t.name||"";return""!==a?n+"("+a+")":n}// Keep in sync with react-reconciler/getComponentNameFromFiber
(e,e.render,"ForwardRef");case tf:var t=e.displayName||null;if(null!==t)return t;return tC(e.type)||"Memo";case tp:var n=e._payload,r=e._init;try{return tC(r(n))}catch(e){}}return null}function tT(e){return e.displayName||"Context"}function tO(e){var t,n,r,a=e.tag,i=e.type;switch(a){case 24:return"Cache";case 9:return tT(i)+".Consumer";case 10:return tT(i._context)+".Provider";case 18:return"DehydratedFragment";case 11:return t=i.render,n="ForwardRef",r=t.displayName||t.name||"",i.displayName||(""!==r?n+"("+r+")":n);case 7:return"Fragment";case 5:// Host component type is the display name (e.g. "div", "View")
return i;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:// Name comes from the type in this case; we don't have a tag.
return tC(i);case 8:if(i===ti)return"StrictMode";return"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";// The display name for this tags come from the user-provided type:
case 1:case 0:case 17:case 2:case 14:case 15:if("function"==typeof i)return i.displayName||i.name||null;if("string"==typeof i)return i}return null}S=new("function"==typeof WeakMap?WeakMap:Map);var tR=eI.ReactDebugCurrentFrame,tP=null,tI=!1;function tD(){if(null===tP)return null;var e=tP._debugOwner;return null!=e?tO(e):null}function tN(){return null===tP?"":tS(tP)}function tL(){tR.getCurrentStack=null,tP=null,tI=!1}function tM(e){tR.getCurrentStack=null===e?null:tN,tP=e,tI=!1}function tA(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return eH(e),e;default:// function, symbol are assigned as empty strings
return""}}var tU={button:!0,checkbox:!0,image:!0,hidden:!0,radio:!0,reset:!0,submit:!0};function tz(e,t){tU[t.type]||t.onChange||t.onInput||t.readOnly||t.disabled||null==t.value||eL("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."),t.onChange||t.readOnly||t.disabled||null==t.checked||eL("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.")}function tF(e){var t=e.type,n=e.nodeName;return n&&"input"===n.toLowerCase()&&("checkbox"===t||"radio"===t)}function tj(e){return e._valueTracker}function tq(e){tj(e)||// TODO: Once it's just Fiber we can move this to node._wrapperState
(e._valueTracker=function(e){var t=tF(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);eH(e[t]);var r=""+e[t];// if someone has already defined a value or Safari, then bail
// and don't track value will cause over reporting of changes,
// but it's better then a hard failure
// (needed for certain tests that spyOn input values and Safari)
if(!e.hasOwnProperty(t)&&void 0!==n&&"function"==typeof n.get&&"function"==typeof n.set){var a=n.get,i=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(e){eH(e),r=""+e,i.call(this,e)}}),// but it triggers a bug in IE11 and Edge 14/15.
// Calling defineProperty() again should be equivalent.
// https://github.com/facebook/react/issues/11768
Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(e){eH(e),r=""+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}(e))}function tB(e){if(!e)return!1;var t,n=tj(e);// if there is no tracker at this point it's unlikely
// that trying again will succeed
if(!n)return!0;var r=n.getValue(),a=(t="",e?t=tF(e)?e.checked?"true":"false":e.value:t);return a!==r&&(n.setValue(a),!0)}function tV(e){if(void 0===(e=e||("undefined"!=typeof document?document:void 0)))return null;try{return e.activeElement||e.body}catch(t){return e.body}}var tW=!1,t$=!1,tH=!1,tY=!1;function tQ(e){return"checkbox"===e.type||"radio"===e.type?null!=e.checked:null!=e.value}/**
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
 */function tK(e,t){var n=t.checked;return tg({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:null!=n?n:e._wrapperState.initialChecked})}function tG(e,t){tz("input",t),void 0===t.checked||void 0===t.defaultChecked||t$||(eL("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",tD()||"A component",t.type),t$=!0),void 0===t.value||void 0===t.defaultValue||tW||(eL("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components",tD()||"A component",t.type),tW=!0);var n=null==t.defaultValue?"":t.defaultValue;e._wrapperState={initialChecked:null!=t.checked?t.checked:t.defaultChecked,initialValue:tA(null!=t.value?t.value:n),controlled:tQ(t)}}function tX(e,t){var n=t.checked;null!=n&&tt(e,"checked",n,!1)}function tJ(e,t){var n=tQ(t);e._wrapperState.controlled||!n||tY||(eL("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),tY=!0),!e._wrapperState.controlled||n||tH||(eL("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"),tH=!0),tX(e,t);var r=tA(t.value),a=t.type;if(null!=r)"number"===a?(0===r&&""===e.value||// We explicitly want to coerce to number here if possible.
// eslint-disable-next-line
e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if("submit"===a||"reset"===a){// Submit/reset inputs need the attribute removed completely to avoid
// blank-text buttons.
e.removeAttribute("value");return}t.hasOwnProperty("value")?t0(e,t.type,r):t.hasOwnProperty("defaultValue")&&t0(e,t.type,tA(t.defaultValue)),null==t.checked&&null!=t.defaultChecked&&(e.defaultChecked=!!t.defaultChecked)}function tZ(e,t,n){// from being lost during SSR hydration.
if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;// default value provided by the browser. See: #12872
if(("submit"===r||"reset"===r)&&(void 0===t.value||null===t.value))return;var a=""+e._wrapperState.initialValue;// Do not assign value if it is already set. This prevents user text input
n||a===e.value||(e.value=a),// Otherwise, the value attribute is synchronized to the property,
// so we assign defaultValue to the same thing as the value property
// assignment step above.
e.defaultValue=a}// Normally, we'd just do `node.checked = node.checked` upon initial mount, less this bug
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
 */function t5(e,t){null!=t.value||("object"==typeof t.children&&null!==t.children?eR.Children.forEach(t.children,function(e){null!=e&&("string"==typeof e||"number"==typeof e||t2||(t2=!0,eL("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")))}):null==t.dangerouslySetInnerHTML||t3||(t3=!0,eL("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected."))),null==t.selected||t1||(eL("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."),t1=!0)}var t4=Array.isArray;// eslint-disable-next-line no-redeclare
function t6(){var e=tD();return e?"\n\nCheck the render method of `"+e+"`.":""}E=!1;var t8=["value","defaultValue"];function t7(e,t,n,r){var a=e.options;if(t){for(var i={},o=0;o<n.length;o++)i["$"+n[o]]=!0;for(var s=0;s<a.length;s++){var l=i.hasOwnProperty("$"+a[s].value);a[s].selected!==l&&(a[s].selected=l),l&&r&&(a[s].defaultSelected=!0)}}else{for(var u=""+tA(n),c=null,d=0;d<a.length;d++){if(a[d].value===u){a[d].selected=!0,r&&(a[d].defaultSelected=!0);return}null!==c||a[d].disabled||(c=a[d])}null!==c&&(c.selected=!0)}}/**
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
 */function t9(e,t){return tg({},t,{value:void 0})}function ne(e,t){/**
 * Validation function for `value` and `defaultValue`.
 */(function(e){tz("select",e);for(var t=0;t<t8.length;t++){var n=t8[t];if(null!=e[n]){var r=t4(e[n]);e.multiple&&!r?eL("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s",n,t6()):!e.multiple&&r&&eL("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s",n,t6())}}})(t),e._wrapperState={wasMultiple:!!t.multiple},void 0===t.value||void 0===t.defaultValue||E||(eL("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"),E=!0)}var nt=!1;/**
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
 */function nn(e,t){if(null!=t.dangerouslySetInnerHTML)throw Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");return tg({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function nr(e,t){tz("textarea",t),void 0===t.value||void 0===t.defaultValue||nt||(eL("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components",tD()||"A component"),nt=!0);var n=t.value;// Only bother fetching default value if we're going to use it
if(null==n){var r=t.children,a=t.defaultValue;if(null!=r){if(eL("Use the `defaultValue` or `value` props instead of setting children on <textarea>."),null!=a)throw Error("If you supply `defaultValue` on a <textarea>, do not pass children.");if(t4(r)){if(r.length>1)throw Error("<textarea> can only have at most one child.");r=r[0]}a=r}null==a&&(a=""),n=a}e._wrapperState={initialValue:tA(n)}}function na(e,t){var n=tA(t.value),r=tA(t.defaultValue);if(null!=n){// Cast `value` to a string to ensure the value is set correctly. While
// browsers typically do this as necessary, jsdom doesn't.
var a=""+n;// To avoid side effects (such as losing text selection), only set value if changed
a!==e.value&&(e.value=a),null==t.defaultValue&&e.defaultValue!==a&&(e.defaultValue=a)}null!=r&&(e.defaultValue=""+r)}function ni(e,t){// available until after the component has mounted.
var n=e.textContent;// Only set node.value if textContent is equal to the expected
// initial value. In IE10/IE11 there is a bug where the placeholder attribute
// will populate textContent as well.
// https://developer.microsoft.com/microsoft-edge/platform/issues/101525/
n===e._wrapperState.initialValue&&""!==n&&null!==n&&(e.value=n)}var no="http://www.w3.org/1999/xhtml",ns="http://www.w3.org/2000/svg";function nl(e){switch(e){case"svg":return ns;case"math":return"http://www.w3.org/1998/Math/MathML";default:return no}}function nu(e,t){return null==e||e===no?nl(t):e===ns&&"foreignObject"===t?no:e}/**
 * Set the innerHTML property of a node
 *
 * @param {DOMElement} node
 * @param {string} html
 * @internal
 */var nc=(e=function(e,t){if(e.namespaceURI===ns&&!("innerHTML"in e)){// IE does not have innerHTML for SVG nodes, so instead we inject the
// new markup in a temp node and then move the child nodes across into
// the target node
(C=C||document.createElement("div")).innerHTML="<svg>"+t.valueOf().toString()+"</svg>";for(var n=C.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild);return}e.innerHTML=t},"undefined"!=typeof MSApp&&MSApp.execUnsafeLocalFunction?function(t,n,r,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,a)})}:e),nd=function(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&3===n.nodeType){n.nodeValue=t;return}}e.textContent=t},nf={animation:["animationDelay","animationDirection","animationDuration","animationFillMode","animationIterationCount","animationName","animationPlayState","animationTimingFunction"],background:["backgroundAttachment","backgroundClip","backgroundColor","backgroundImage","backgroundOrigin","backgroundPositionX","backgroundPositionY","backgroundRepeat","backgroundSize"],backgroundPosition:["backgroundPositionX","backgroundPositionY"],border:["borderBottomColor","borderBottomStyle","borderBottomWidth","borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth","borderLeftColor","borderLeftStyle","borderLeftWidth","borderRightColor","borderRightStyle","borderRightWidth","borderTopColor","borderTopStyle","borderTopWidth"],borderBlockEnd:["borderBlockEndColor","borderBlockEndStyle","borderBlockEndWidth"],borderBlockStart:["borderBlockStartColor","borderBlockStartStyle","borderBlockStartWidth"],borderBottom:["borderBottomColor","borderBottomStyle","borderBottomWidth"],borderColor:["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"],borderImage:["borderImageOutset","borderImageRepeat","borderImageSlice","borderImageSource","borderImageWidth"],borderInlineEnd:["borderInlineEndColor","borderInlineEndStyle","borderInlineEndWidth"],borderInlineStart:["borderInlineStartColor","borderInlineStartStyle","borderInlineStartWidth"],borderLeft:["borderLeftColor","borderLeftStyle","borderLeftWidth"],borderRadius:["borderBottomLeftRadius","borderBottomRightRadius","borderTopLeftRadius","borderTopRightRadius"],borderRight:["borderRightColor","borderRightStyle","borderRightWidth"],borderStyle:["borderBottomStyle","borderLeftStyle","borderRightStyle","borderTopStyle"],borderTop:["borderTopColor","borderTopStyle","borderTopWidth"],borderWidth:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],columnRule:["columnRuleColor","columnRuleStyle","columnRuleWidth"],columns:["columnCount","columnWidth"],flex:["flexBasis","flexGrow","flexShrink"],flexFlow:["flexDirection","flexWrap"],font:["fontFamily","fontFeatureSettings","fontKerning","fontLanguageOverride","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition","fontWeight","lineHeight"],fontVariant:["fontVariantAlternates","fontVariantCaps","fontVariantEastAsian","fontVariantLigatures","fontVariantNumeric","fontVariantPosition"],gap:["columnGap","rowGap"],grid:["gridAutoColumns","gridAutoFlow","gridAutoRows","gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],gridArea:["gridColumnEnd","gridColumnStart","gridRowEnd","gridRowStart"],gridColumn:["gridColumnEnd","gridColumnStart"],gridColumnGap:["columnGap"],gridGap:["columnGap","rowGap"],gridRow:["gridRowEnd","gridRowStart"],gridRowGap:["rowGap"],gridTemplate:["gridTemplateAreas","gridTemplateColumns","gridTemplateRows"],listStyle:["listStyleImage","listStylePosition","listStyleType"],margin:["marginBottom","marginLeft","marginRight","marginTop"],marker:["markerEnd","markerMid","markerStart"],mask:["maskClip","maskComposite","maskImage","maskMode","maskOrigin","maskPositionX","maskPositionY","maskRepeat","maskSize"],maskPosition:["maskPositionX","maskPositionY"],outline:["outlineColor","outlineStyle","outlineWidth"],overflow:["overflowX","overflowY"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"],placeContent:["alignContent","justifyContent"],placeItems:["alignItems","justifyItems"],placeSelf:["alignSelf","justifySelf"],textDecoration:["textDecorationColor","textDecorationLine","textDecorationStyle"],textEmphasis:["textEmphasisColor","textEmphasisStyle"],transition:["transitionDelay","transitionDuration","transitionProperty","transitionTimingFunction"],wordWrap:["overflowWrap"]},np={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,// SVG-related properties
fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},nh=["Webkit","ms","Moz","O"];/**
 * Convert a value into the proper css writable value. The style name `name`
 * should be logical (no hyphens), as specified
 * in `CSSProperty.isUnitlessNumber`.
 *
 * @param {string} name CSS property name such as `topMargin`.
 * @param {*} value CSS property value such as `10px`.
 * @return {string} Normalized style value with dimensions applied.
 */function nm(e,t,n){return null==t||"boolean"==typeof t||""===t?"":n||"number"!=typeof t||0===t||np.hasOwnProperty(e)&&np[e]?(eW(t)&&eL("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.",e,eV(t)),(""+t).trim()):t+"px"}// infinite loop, because it iterates over the newly added props too.
Object.keys(np).forEach(function(e){nh.forEach(function(t){np[t+e.charAt(0).toUpperCase()+e.substring(1)]=np[e]})});var nv=/([A-Z])/g,ng=/^ms-/,ny=/^(?:webkit|moz|o)[A-Z]/,nb=/^-ms-/,nw=/-(.)/g,n_=/;\s*$/,nk={},nx={},nS=!1,nE=!1,nC=function(e){nk.hasOwnProperty(e)&&nk[e]||(nk[e]=!0,eL("Unsupported style property %s. Did you mean %s?",e,e.replace(nb,"ms-").replace(nw,function(e,t){return t.toUpperCase()})))},nT=function(e){nk.hasOwnProperty(e)&&nk[e]||(nk[e]=!0,eL("Unsupported vendor-prefixed style property %s. Did you mean %s?",e,e.charAt(0).toUpperCase()+e.slice(1)))},nO=function(e,t){nx.hasOwnProperty(t)&&nx[t]||(nx[t]=!0,eL('Style property values shouldn\'t contain a semicolon. Try "%s: %s" instead.',e,t.replace(n_,"")))},nR=function(e,t){nS||(nS=!0,eL("`NaN` is an invalid value for the `%s` css style property.",e))},nP=function(e,t){nE||(nE=!0,eL("`Infinity` is an invalid value for the `%s` css style property.",e))},nI=function(e,t){e.indexOf("-")>-1?nC(e):ny.test(e)?nT(e):n_.test(t)&&nO(e,t),"number"!=typeof t||(isNaN(t)?nR(e,t):isFinite(t)||nP(e,t))};/**
 * Sets the value for multiple styles on a node.  If a value is specified as
 * '' (empty string), the corresponding style property will be unset.
 *
 * @param {DOMElement} node
 * @param {object} styles
 */function nD(e,t){var n=e.style;for(var r in t)if(t.hasOwnProperty(r)){var a=0===r.indexOf("--");a||nI(r,t[r]);var i=nm(r,t[r],a);"float"===r&&(r="cssFloat"),a?n.setProperty(r,i):n[r]=i}}/**
 * Given {color: 'red', overflow: 'hidden'} returns {
 *   color: 'color',
 *   overflowX: 'overflow',
 *   overflowY: 'overflow',
 * }. This can be read as "the overflowY property was set by the overflow
 * shorthand". That is, the values are the property that each was derived from.
 */function nN(e){var t={};for(var n in e)for(var r=nf[n]||[n],a=0;a<r.length;a++)t[r[a]]=n;return t}// `omittedCloseTags` except that `menuitem` should still have its closing tag.
var nL=tg({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0// NOTE: menuitem's close tag should be omitted, but that causes problems.
});function nM(e,t){if(t){// Note the use of `==` which checks for null or undefined.
if(nL[e]&&(null!=t.children||null!=t.dangerouslySetInnerHTML))throw Error(e+" is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");if(null!=t.dangerouslySetInnerHTML){if(null!=t.children)throw Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");if("object"!=typeof t.dangerouslySetInnerHTML||!("__html"in t.dangerouslySetInnerHTML))throw Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.")}if(!t.suppressContentEditableWarning&&t.contentEditable&&null!=t.children&&eL("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."),null!=t.style&&"object"!=typeof t.style)throw Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.")}}function nA(e,t){if(-1===e.indexOf("-"))return"string"==typeof t.is;switch(e){// These are reserved SVG and MathML elements.
// We don't mind this list too much because we expect it to never grow.
// The alternative is to track the namespace in a few places which is convoluted.
// https://w3c.github.io/webcomponents/spec/custom/#custom-elements-core-concepts
case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}// When adding attributes to the HTML or SVG allowed attribute list, be sure to
// also add them to this module to ensure casing and incorrect name
// warnings.
var nU={// HTML
accept:"accept",acceptcharset:"acceptCharset","accept-charset":"acceptCharset",accesskey:"accessKey",action:"action",allowfullscreen:"allowFullScreen",alt:"alt",as:"as",async:"async",autocapitalize:"autoCapitalize",autocomplete:"autoComplete",autocorrect:"autoCorrect",autofocus:"autoFocus",autoplay:"autoPlay",autosave:"autoSave",capture:"capture",cellpadding:"cellPadding",cellspacing:"cellSpacing",challenge:"challenge",charset:"charSet",checked:"checked",children:"children",cite:"cite",class:"className",classid:"classID",classname:"className",cols:"cols",colspan:"colSpan",content:"content",contenteditable:"contentEditable",contextmenu:"contextMenu",controls:"controls",controlslist:"controlsList",coords:"coords",crossorigin:"crossOrigin",dangerouslysetinnerhtml:"dangerouslySetInnerHTML",data:"data",datetime:"dateTime",default:"default",defaultchecked:"defaultChecked",defaultvalue:"defaultValue",defer:"defer",dir:"dir",disabled:"disabled",disablepictureinpicture:"disablePictureInPicture",disableremoteplayback:"disableRemotePlayback",download:"download",draggable:"draggable",enctype:"encType",enterkeyhint:"enterKeyHint",for:"htmlFor",form:"form",formmethod:"formMethod",formaction:"formAction",formenctype:"formEncType",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",headers:"headers",height:"height",hidden:"hidden",high:"high",href:"href",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv","http-equiv":"httpEquiv",icon:"icon",id:"id",imagesizes:"imageSizes",imagesrcset:"imageSrcSet",innerhtml:"innerHTML",inputmode:"inputMode",integrity:"integrity",is:"is",itemid:"itemID",itemprop:"itemProp",itemref:"itemRef",itemscope:"itemScope",itemtype:"itemType",keyparams:"keyParams",keytype:"keyType",kind:"kind",label:"label",lang:"lang",list:"list",loop:"loop",low:"low",manifest:"manifest",marginwidth:"marginWidth",marginheight:"marginHeight",max:"max",maxlength:"maxLength",media:"media",mediagroup:"mediaGroup",method:"method",min:"min",minlength:"minLength",multiple:"multiple",muted:"muted",name:"name",nomodule:"noModule",nonce:"nonce",novalidate:"noValidate",open:"open",optimum:"optimum",pattern:"pattern",placeholder:"placeholder",playsinline:"playsInline",poster:"poster",preload:"preload",profile:"profile",radiogroup:"radioGroup",readonly:"readOnly",referrerpolicy:"referrerPolicy",rel:"rel",required:"required",reversed:"reversed",role:"role",rows:"rows",rowspan:"rowSpan",sandbox:"sandbox",scope:"scope",scoped:"scoped",scrolling:"scrolling",seamless:"seamless",selected:"selected",shape:"shape",size:"size",sizes:"sizes",span:"span",spellcheck:"spellCheck",src:"src",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",start:"start",step:"step",style:"style",summary:"summary",tabindex:"tabIndex",target:"target",title:"title",type:"type",usemap:"useMap",value:"value",width:"width",wmode:"wmode",wrap:"wrap",// SVG
about:"about",accentheight:"accentHeight","accent-height":"accentHeight",accumulate:"accumulate",additive:"additive",alignmentbaseline:"alignmentBaseline","alignment-baseline":"alignmentBaseline",allowreorder:"allowReorder",alphabetic:"alphabetic",amplitude:"amplitude",arabicform:"arabicForm","arabic-form":"arabicForm",ascent:"ascent",attributename:"attributeName",attributetype:"attributeType",autoreverse:"autoReverse",azimuth:"azimuth",basefrequency:"baseFrequency",baselineshift:"baselineShift","baseline-shift":"baselineShift",baseprofile:"baseProfile",bbox:"bbox",begin:"begin",bias:"bias",by:"by",calcmode:"calcMode",capheight:"capHeight","cap-height":"capHeight",clip:"clip",clippath:"clipPath","clip-path":"clipPath",clippathunits:"clipPathUnits",cliprule:"clipRule","clip-rule":"clipRule",color:"color",colorinterpolation:"colorInterpolation","color-interpolation":"colorInterpolation",colorinterpolationfilters:"colorInterpolationFilters","color-interpolation-filters":"colorInterpolationFilters",colorprofile:"colorProfile","color-profile":"colorProfile",colorrendering:"colorRendering","color-rendering":"colorRendering",contentscripttype:"contentScriptType",contentstyletype:"contentStyleType",cursor:"cursor",cx:"cx",cy:"cy",d:"d",datatype:"datatype",decelerate:"decelerate",descent:"descent",diffuseconstant:"diffuseConstant",direction:"direction",display:"display",divisor:"divisor",dominantbaseline:"dominantBaseline","dominant-baseline":"dominantBaseline",dur:"dur",dx:"dx",dy:"dy",edgemode:"edgeMode",elevation:"elevation",enablebackground:"enableBackground","enable-background":"enableBackground",end:"end",exponent:"exponent",externalresourcesrequired:"externalResourcesRequired",fill:"fill",fillopacity:"fillOpacity","fill-opacity":"fillOpacity",fillrule:"fillRule","fill-rule":"fillRule",filter:"filter",filterres:"filterRes",filterunits:"filterUnits",floodopacity:"floodOpacity","flood-opacity":"floodOpacity",floodcolor:"floodColor","flood-color":"floodColor",focusable:"focusable",fontfamily:"fontFamily","font-family":"fontFamily",fontsize:"fontSize","font-size":"fontSize",fontsizeadjust:"fontSizeAdjust","font-size-adjust":"fontSizeAdjust",fontstretch:"fontStretch","font-stretch":"fontStretch",fontstyle:"fontStyle","font-style":"fontStyle",fontvariant:"fontVariant","font-variant":"fontVariant",fontweight:"fontWeight","font-weight":"fontWeight",format:"format",from:"from",fx:"fx",fy:"fy",g1:"g1",g2:"g2",glyphname:"glyphName","glyph-name":"glyphName",glyphorientationhorizontal:"glyphOrientationHorizontal","glyph-orientation-horizontal":"glyphOrientationHorizontal",glyphorientationvertical:"glyphOrientationVertical","glyph-orientation-vertical":"glyphOrientationVertical",glyphref:"glyphRef",gradienttransform:"gradientTransform",gradientunits:"gradientUnits",hanging:"hanging",horizadvx:"horizAdvX","horiz-adv-x":"horizAdvX",horizoriginx:"horizOriginX","horiz-origin-x":"horizOriginX",ideographic:"ideographic",imagerendering:"imageRendering","image-rendering":"imageRendering",in2:"in2",in:"in",inlist:"inlist",intercept:"intercept",k1:"k1",k2:"k2",k3:"k3",k4:"k4",k:"k",kernelmatrix:"kernelMatrix",kernelunitlength:"kernelUnitLength",kerning:"kerning",keypoints:"keyPoints",keysplines:"keySplines",keytimes:"keyTimes",lengthadjust:"lengthAdjust",letterspacing:"letterSpacing","letter-spacing":"letterSpacing",lightingcolor:"lightingColor","lighting-color":"lightingColor",limitingconeangle:"limitingConeAngle",local:"local",markerend:"markerEnd","marker-end":"markerEnd",markerheight:"markerHeight",markermid:"markerMid","marker-mid":"markerMid",markerstart:"markerStart","marker-start":"markerStart",markerunits:"markerUnits",markerwidth:"markerWidth",mask:"mask",maskcontentunits:"maskContentUnits",maskunits:"maskUnits",mathematical:"mathematical",mode:"mode",numoctaves:"numOctaves",offset:"offset",opacity:"opacity",operator:"operator",order:"order",orient:"orient",orientation:"orientation",origin:"origin",overflow:"overflow",overlineposition:"overlinePosition","overline-position":"overlinePosition",overlinethickness:"overlineThickness","overline-thickness":"overlineThickness",paintorder:"paintOrder","paint-order":"paintOrder",panose1:"panose1","panose-1":"panose1",pathlength:"pathLength",patterncontentunits:"patternContentUnits",patterntransform:"patternTransform",patternunits:"patternUnits",pointerevents:"pointerEvents","pointer-events":"pointerEvents",points:"points",pointsatx:"pointsAtX",pointsaty:"pointsAtY",pointsatz:"pointsAtZ",prefix:"prefix",preservealpha:"preserveAlpha",preserveaspectratio:"preserveAspectRatio",primitiveunits:"primitiveUnits",property:"property",r:"r",radius:"radius",refx:"refX",refy:"refY",renderingintent:"renderingIntent","rendering-intent":"renderingIntent",repeatcount:"repeatCount",repeatdur:"repeatDur",requiredextensions:"requiredExtensions",requiredfeatures:"requiredFeatures",resource:"resource",restart:"restart",result:"result",results:"results",rotate:"rotate",rx:"rx",ry:"ry",scale:"scale",security:"security",seed:"seed",shaperendering:"shapeRendering","shape-rendering":"shapeRendering",slope:"slope",spacing:"spacing",specularconstant:"specularConstant",specularexponent:"specularExponent",speed:"speed",spreadmethod:"spreadMethod",startoffset:"startOffset",stddeviation:"stdDeviation",stemh:"stemh",stemv:"stemv",stitchtiles:"stitchTiles",stopcolor:"stopColor","stop-color":"stopColor",stopopacity:"stopOpacity","stop-opacity":"stopOpacity",strikethroughposition:"strikethroughPosition","strikethrough-position":"strikethroughPosition",strikethroughthickness:"strikethroughThickness","strikethrough-thickness":"strikethroughThickness",string:"string",stroke:"stroke",strokedasharray:"strokeDasharray","stroke-dasharray":"strokeDasharray",strokedashoffset:"strokeDashoffset","stroke-dashoffset":"strokeDashoffset",strokelinecap:"strokeLinecap","stroke-linecap":"strokeLinecap",strokelinejoin:"strokeLinejoin","stroke-linejoin":"strokeLinejoin",strokemiterlimit:"strokeMiterlimit","stroke-miterlimit":"strokeMiterlimit",strokewidth:"strokeWidth","stroke-width":"strokeWidth",strokeopacity:"strokeOpacity","stroke-opacity":"strokeOpacity",suppresscontenteditablewarning:"suppressContentEditableWarning",suppresshydrationwarning:"suppressHydrationWarning",surfacescale:"surfaceScale",systemlanguage:"systemLanguage",tablevalues:"tableValues",targetx:"targetX",targety:"targetY",textanchor:"textAnchor","text-anchor":"textAnchor",textdecoration:"textDecoration","text-decoration":"textDecoration",textlength:"textLength",textrendering:"textRendering","text-rendering":"textRendering",to:"to",transform:"transform",typeof:"typeof",u1:"u1",u2:"u2",underlineposition:"underlinePosition","underline-position":"underlinePosition",underlinethickness:"underlineThickness","underline-thickness":"underlineThickness",unicode:"unicode",unicodebidi:"unicodeBidi","unicode-bidi":"unicodeBidi",unicoderange:"unicodeRange","unicode-range":"unicodeRange",unitsperem:"unitsPerEm","units-per-em":"unitsPerEm",unselectable:"unselectable",valphabetic:"vAlphabetic","v-alphabetic":"vAlphabetic",values:"values",vectoreffect:"vectorEffect","vector-effect":"vectorEffect",version:"version",vertadvy:"vertAdvY","vert-adv-y":"vertAdvY",vertoriginx:"vertOriginX","vert-origin-x":"vertOriginX",vertoriginy:"vertOriginY","vert-origin-y":"vertOriginY",vhanging:"vHanging","v-hanging":"vHanging",videographic:"vIdeographic","v-ideographic":"vIdeographic",viewbox:"viewBox",viewtarget:"viewTarget",visibility:"visibility",vmathematical:"vMathematical","v-mathematical":"vMathematical",vocab:"vocab",widths:"widths",wordspacing:"wordSpacing","word-spacing":"wordSpacing",writingmode:"writingMode","writing-mode":"writingMode",x1:"x1",x2:"x2",x:"x",xchannelselector:"xChannelSelector",xheight:"xHeight","x-height":"xHeight",xlinkactuate:"xlinkActuate","xlink:actuate":"xlinkActuate",xlinkarcrole:"xlinkArcrole","xlink:arcrole":"xlinkArcrole",xlinkhref:"xlinkHref","xlink:href":"xlinkHref",xlinkrole:"xlinkRole","xlink:role":"xlinkRole",xlinkshow:"xlinkShow","xlink:show":"xlinkShow",xlinktitle:"xlinkTitle","xlink:title":"xlinkTitle",xlinktype:"xlinkType","xlink:type":"xlinkType",xmlbase:"xmlBase","xml:base":"xmlBase",xmllang:"xmlLang","xml:lang":"xmlLang",xmlns:"xmlns","xml:space":"xmlSpace",xmlnsxlink:"xmlnsXlink","xmlns:xlink":"xmlnsXlink",xmlspace:"xmlSpace",y1:"y1",y2:"y2",y:"y",ychannelselector:"yChannelSelector",z:"z",zoomandpan:"zoomAndPan"},nz={"aria-current":0,// state
"aria-description":0,"aria-details":0,"aria-disabled":0,// state
"aria-hidden":0,// state
"aria-invalid":0,// state
"aria-keyshortcuts":0,"aria-label":0,"aria-roledescription":0,// Widget Attributes
"aria-autocomplete":0,"aria-checked":0,"aria-expanded":0,"aria-haspopup":0,"aria-level":0,"aria-modal":0,"aria-multiline":0,"aria-multiselectable":0,"aria-orientation":0,"aria-placeholder":0,"aria-pressed":0,"aria-readonly":0,"aria-required":0,"aria-selected":0,"aria-sort":0,"aria-valuemax":0,"aria-valuemin":0,"aria-valuenow":0,"aria-valuetext":0,// Live Region Attributes
"aria-atomic":0,"aria-busy":0,"aria-live":0,"aria-relevant":0,// Drag-and-Drop Attributes
"aria-dropeffect":0,"aria-grabbed":0,// Relationship Attributes
"aria-activedescendant":0,"aria-colcount":0,"aria-colindex":0,"aria-colspan":0,"aria-controls":0,"aria-describedby":0,"aria-errormessage":0,"aria-flowto":0,"aria-labelledby":0,"aria-owns":0,"aria-posinset":0,"aria-rowcount":0,"aria-rowindex":0,"aria-rowspan":0,"aria-setsize":0},nF={},nj=RegExp("^(aria)-["+eQ+"]*$"),nq=RegExp("^(aria)[A-Z]["+eQ+"]*$"),nB=!1,nV=function(){},nW={},n$=/^on./,nH=/^on[^A-Z]/,nY=RegExp("^(aria)-["+eQ+"]*$"),nQ=RegExp("^(aria)[A-Z]["+eQ+"]*$");nV=function(e,t,n,r){if(eB.call(nW,t)&&nW[t])return!0;var a=t.toLowerCase();if("onfocusin"===a||"onfocusout"===a)return eL("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."),nW[t]=!0,!0;// We can't rely on the event system being injected on the server.
if(null!=r){var i=r.registrationNameDependencies,o=r.possibleRegistrationNames;if(i.hasOwnProperty(t))return!0;var s=o.hasOwnProperty(a)?o[a]:null;if(null!=s)return eL("Invalid event handler property `%s`. Did you mean `%s`?",t,s),nW[t]=!0,!0;if(n$.test(t))return eL("Unknown event handler property `%s`. It will be ignored.",t),nW[t]=!0,!0}else if(n$.test(t))return nH.test(t)&&eL("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.",t),nW[t]=!0,!0;// Let the ARIA attribute hook validate ARIA attributes
if(nY.test(t)||nQ.test(t))return!0;if("innerhtml"===a)return eL("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."),nW[t]=!0,!0;if("aria"===a)return eL("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."),nW[t]=!0,!0;if("is"===a&&null!=n&&"string"!=typeof n)return eL("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.",typeof n),nW[t]=!0,!0;if("number"==typeof n&&isNaN(n))return eL("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.",t),nW[t]=!0,!0;var l=e2(t),u=null!==l&&0===l.type;if(nU.hasOwnProperty(a)){var c=nU[a];if(c!==t)return eL("Invalid DOM property `%s`. Did you mean `%s`?",t,c),nW[t]=!0,!0}else if(!u&&t!==a)return(// Unknown attributes should have lowercase casing since that's how they
// will be cased anyway with server rendering.
eL("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.",t,a),nW[t]=!0,!0);return"boolean"==typeof n&&e0(t,n,l,!1)?(n?eL('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.',n,t,t,n,t):eL('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.',n,t,t,n,t,t,t),nW[t]=!0,!0):!!u||(e0(t,n,l,!1)?(nW[t]=!0,!1):(("false"===n||"true"===n)&&null!==l&&3===l.type&&(eL("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?",n,t,"false"===n?"The browser will interpret it as a truthy value.":'Although this works, it will not work as expected if you pass the string "false".',t,n),nW[t]=!0),!0))// Now that we've validated casing, do not validate
};var nK=function(e,t,n){var r=[];for(var a in t)nV(e,a,t[a],n)||r.push(a);var i=r.map(function(e){return"`"+e+"`"}).join(", ");1===r.length?eL("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",i,e):r.length>1&&eL("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ",i,e)},nG=null;/**
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
var t=o1(e);if(t){if("function"!=typeof nJ)throw Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");var n=t.stateNode;// Guard against Fiber being unmounted.
if(n){var r=o3(n);nJ(t.stateNode,t.type,r)}}}function n2(e){nZ?n0?n0.push(e):n0=[e]:nZ=e}function n3(){if(nZ){var e=nZ,t=n0;if(nZ=null,n0=null,n1(e),t)for(var n=0;n<t.length;n++)n1(t[n])}}// the renderer. Such as when we're dispatching events or if third party
// libraries need to call batchedUpdates. Eventually, this API will go away when
// everything is batched by default. We'll then have a similar API to opt-out of
// scheduled work and instead do synchronous work.
// Defaults
var n5=function(e,t){return e(t)},n4=function(){},n6=!1;function n8(e,t,n){if(n6)// fully completes before restoring state.
return e(t,n);n6=!0;try{return n5(e,t,n)}finally{n6=!1,(null!==nZ||null!==n0)&&(// If a controlled event was fired, we may need to restore the state of
// the DOM node back to the controlled value. This is necessary when React
// bails out of the update without touching the DOM.
// TODO: Restore state in the microtask, after the discrete updates flush,
// instead of early flushing them here.
n4(),n3())}}// TODO: Replace with flushSync
/**
 * @param {object} inst The instance, which is the source of events.
 * @param {string} registrationName Name of listener (e.g. `onClick`).
 * @return {?function} The stored callback.
 */function n7(e,t){var n=e.stateNode;if(null===n)return null;var r=o3(n);if(null===r)return null;var a=r[t];if(function(e,t,n){switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":return!!(n.disabled&&("button"===t||"input"===t||"select"===t||"textarea"===t));default:return!1}}(t,e.type,r))return null;if(a&&"function"!=typeof a)throw Error("Expected `"+t+"` listener to be a function, instead got a value of `"+typeof a+"` type.");return a}var n9=!1;// Check if browser support events with passive listeners
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
if(eq)try{var re={};// $FlowFixMe: Ignore Flow complaining about needing a value
Object.defineProperty(re,"passive",{get:function(){n9=!0}}),window.addEventListener("test",re,re),window.removeEventListener("test",re,re)}catch(e){n9=!1}function rt(e,t,n,r,a,i,o,s,l){var u=Array.prototype.slice.call(arguments,3);try{t.apply(n,u)}catch(e){this.onError(e)}}var rn=rt;// In DEV mode, we swap out invokeGuardedCallback for a special version
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
if("undefined"!=typeof window&&"function"==typeof window.dispatchEvent&&"undefined"!=typeof document&&"function"==typeof document.createEvent){var rr=document.createElement("react");rn=function(e,t,n,r,a,i,o,s,l){// If document doesn't exist we know for sure we will crash in this method
// when we call document.createEvent(). However this can cause confusing
// errors: https://github.com/facebook/create-react-app/issues/3482
// So we preemptively throw with a better message instead.
if("undefined"==typeof document||null===document)throw Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");var u,c=document.createEvent("Event"),d=!1,f=!0,p=window.event,h=Object.getOwnPropertyDescriptor(window,"event");function m(){// We immediately remove the callback from event listeners so that
// nested `invokeGuardedCallback` calls do not clash. Otherwise, a
// nested call would trigger the fake event handlers of any call higher
// in the stack.
rr.removeEventListener(_,g,!1),void 0!==window.event&&window.hasOwnProperty("event")&&(window.event=p)}// Create an event handler for our fake event. We will synchronously
// dispatch our fake event using `dispatchEvent`. Inside the handler, we
// call the user-provided callback.
var v=Array.prototype.slice.call(arguments,3);function g(){d=!0,m(),t.apply(n,v),f=!1}// Create a global error event handler. We use this to capture the value
var y=!1,b=!1;function w(e){if(u=e.error,y=!0,null===u&&0===e.colno&&0===e.lineno&&(b=!0),e.defaultPrevented&&null!=u&&"object"==typeof u)try{u._suppressLogging=!0}catch(e){}}// Create a fake event type.
var _="react-"+(e||"invokeguardedcallback");// Attach our event handlers
if(window.addEventListener("error",w),rr.addEventListener(_,g,!1),// errors, it will trigger our global error handler.
c.initEvent(_,!1,!1),rr.dispatchEvent(c),h&&Object.defineProperty(window,"event",h),d&&f&&(y?b&&(u=Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")):// eslint-disable-next-line react-internal/prod-error-codes
u=Error("An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the \"Pause on exceptions\" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue."),this.onError(u)),window.removeEventListener("error",w),!d)return(// Something went really wrong, and our event was not dispatched.
// https://github.com/facebook/react/issues/16734
// https://github.com/facebook/react/issues/16585
// Fall back to the production implementation.
m(),rt.apply(this,arguments))}}var ra=rn,ri=!1,ro=null,rs=!1,rl=null,ru={onError:function(e){ri=!0,ro=e}};/**
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
 */function rc(e,t,n,r,a,i,o,s,l){ri=!1,ro=null,ra.apply(ru,arguments)}function rd(){if(ri){var e=ro;return ri=!1,ro=null,e}throw Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.")}/**
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
(n=t.return),r=t.return;while(r)}return 3===t.tag?n:null}function rm(e){if(13===e.tag){var t=e.memoizedState;if(null===t){var n=e.alternate;null!==n&&(t=n.memoizedState)}if(null!==t)return t.dehydrated}return null}function rv(e){return 3===e.tag?e.stateNode.containerInfo:null}function rg(e){if(rh(e)!==e)throw Error("Unable to find node on an unmounted component.")}function ry(e){var t=e.alternate;if(!t){// If there is no alternate, then we only need to check if it is mounted.
var n=rh(e);if(null===n)throw Error("Unable to find node on an unmounted component.");return n!==e?null:e}// If we have two possible branches, we'll walk backwards up to the root
for(// to see what path the root points to. On the way we may hit one of the
// special cases and we'll deal with them.
var r=e,a=t;;){var i=r.return;if(null===i)break;var o=i.alternate;if(null===o){// There is no alternate. This is an unusual case. Currently, it only
// happens when a Suspense component is hidden. An extra fragment fiber
// is inserted in between the Suspense fiber and its children. Skip
// over this extra fragment fiber and proceed to the next parent.
var s=i.return;if(null!==s){r=a=s;continue}// If there's no parent, we're at the root.
break}// If both copies of the parent fiber point to the same child, we can
// assume that the child is current. This happens when we bailout on low
// priority: the bailed out fiber's child reuses the current child.
if(i.child===o.child){for(var l=i.child;l;){if(l===r)return(// We've determined that A is the current branch.
rg(i),e);if(l===a)return(// We've determined that B is the current branch.
rg(i),t);l=l.sibling}// We should never have an alternate for any mounting node. So the only
// way this could possibly happen is if this was unmounted, if at all.
throw Error("Unable to find node on an unmounted component.")}if(r.return!==a.return)// The return pointer of A and the return pointer of B point to different
// fibers. We assume that return pointers never criss-cross, so A must
// belong to the child set of A.return, and B must belong to the child
// set of B.return.
r=i,a=o;else{for(// The return pointers point to the same fiber. We'll have to use the
// default, slow path: scan the child sets of each parent alternate to see
// which child belongs to which set.
//
// Search parent A's child set
var u=!1,c=i.child;c;){if(c===r){u=!0,r=i,a=o;break}if(c===a){u=!0,a=i,r=o;break}c=c.sibling}if(!u){for(// Search parent B's child set
c=o.child;c;){if(c===r){u=!0,r=o,a=i;break}if(c===a){u=!0,a=o,r=i;break}c=c.sibling}if(!u)throw Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.")}}if(r.alternate!==a)throw Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.")}// If the root is not a host container, we're in a disconnected tree. I.e.
// unmounted.
if(3!==r.tag)throw Error("Unable to find node on an unmounted component.");return r.stateNode.current===r?e:t}function rb(e){var t=ry(e);return null!==t?function e(t){// Next we'll drill down this component to find the first HostComponent/Text.
if(5===t.tag||6===t.tag)return t;for(var n=t.child;null!==n;){var r=e(n);if(null!==r)return r;n=n.sibling}return null}(t):null}// This module only exists as an ESM wrapper around the external CommonJS
var rw=eP.unstable_scheduleCallback,r_=eP.unstable_cancelCallback,rk=eP.unstable_shouldYield,rx=eP.unstable_requestPaint,rS=eP.unstable_now,rE=eP.unstable_getCurrentPriorityLevel,rC=eP.unstable_ImmediatePriority,rT=eP.unstable_UserBlockingPriority,rO=eP.unstable_NormalPriority,rR=eP.unstable_LowPriority,rP=eP.unstable_IdlePriority,rI=eP.unstable_yieldValue,rD=eP.unstable_setDisableYieldValue,rN=null,rL=null,rM=null,rA=!1,rU="undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__;function rz(e){if("function"==typeof rI&&(// We're in a test because Scheduler.unstable_yieldValue only exists
// in SchedulerMock. To reduce the noise in strict mode tests,
// suppress warnings and disable scheduler yielding during the double render
rD(e),eD=e),rL&&"function"==typeof rL.setStrictMode)try{rL.setStrictMode(rN,e)}catch(e){rA||(rA=!0,eL("React instrumentation encountered an error: %s",e))}}// Profiler API hooks
function rF(e){rM=e}function rj(){for(var e=new Map,t=1,n=0;n<rJ;n++){var r,a=/*                        */1&(r=t)?"Sync":/*    */2&r?"InputContinuousHydration":/*             */4&r?"InputContinuous":/*            */8&r?"DefaultHydration":/*                     */16&r?"Default":/*                */32&r?"TransitionHydration":/*                       */4194240&r?"Transition":/*                            */130023424&r?"Retry":/*          */134217728&r?"SelectiveHydration":/*               */268435456&r?"IdleHydration":/*                        */536870912&r?"Idle":/*                   */1073741824&r?"Offscreen":void 0;e.set(t,a),t*=2}return e}function rq(){null!==rM&&"function"==typeof rM.markCommitStopped&&rM.markCommitStopped()}function rB(e){null!==rM&&"function"==typeof rM.markComponentRenderStarted&&rM.markComponentRenderStarted(e)}function rV(){null!==rM&&"function"==typeof rM.markComponentRenderStopped&&rM.markComponentRenderStopped()}function rW(e){null!==rM&&"function"==typeof rM.markComponentLayoutEffectUnmountStarted&&rM.markComponentLayoutEffectUnmountStarted(e)}function r$(){null!==rM&&"function"==typeof rM.markComponentLayoutEffectUnmountStopped&&rM.markComponentLayoutEffectUnmountStopped()}function rH(e){null!==rM&&"function"==typeof rM.markRenderStarted&&rM.markRenderStarted(e)}function rY(){null!==rM&&"function"==typeof rM.markRenderStopped&&rM.markRenderStopped()}function rQ(e,t){null!==rM&&"function"==typeof rM.markStateUpdateScheduled&&rM.markStateUpdateScheduled(e,t)}// TODO: This is pretty well supported by browsers. Maybe we can drop it.
var rK=Math.clz32?Math.clz32:function(e){var t=e>>>0;return 0===t?32:31-(rG(t)/rX|0)|0},rG=Math.log,rX=Math.LN2,rJ=31,rZ=/*                        */64,r0=/*                             */4194304;// Count leading zeros.
function r1(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case /*                        */128:case /*                        */256:case /*                        */512:case /*                        */1024:case /*                        */2048:case /*                        */4096:case /*                        */8192:case /*                        */16384:case /*                       */32768:case /*                       */65536:case /*                       */131072:case /*                       */262144:case /*                       */524288:case /*                       */1048576:case /*                       */2097152:return 4194240&e;case 4194304:case /*                             */8388608:case /*                             */16777216:case /*                             */33554432:case /*                             */67108864:return 130023424&e;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return eL("Should have found matching lanes. This is a bug in React."),e}}function r2(e,t){// Early bailout if there's no pending work left.
var n=e.pendingLanes;if(/*                        */0===n)return 0;var r=0,a=e.suspendedLanes,i=e.pingedLanes,o=/*                          */268435455&n;if(0!==o){var s=o&~a;if(0!==s)r=r1(s);else{var l=o&i;0!==l&&(r=r1(l))}}else{// The only remaining work is Idle.
var u=n&~a;0!==u?r=r1(u):0!==i&&(r=r1(i))}if(0===r)// TODO: Consider warning in this path if a fallback timer is not scheduled.
return 0;// If we're already in the middle of a render, switching lanes will interrupt
// it and we'll lose our progress. We should only do this if the new lanes are
// higher priority.
if(0!==t&&t!==r&&// If we already suspended with a delay, then interrupting is fine. Don't
// bother waiting until the root is complete.
(t&a)==0){var c,d=(c=r)&-c,f=t&-t;if(d>=f||// Default priority updates should not interrupt transition updates. The
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
var p=e.entangledLanes;if(0!==p)for(var h=e.entanglements,m=r&p;m>0;){var v=r9(m),g=1<<v;r|=h[v],m&=~g}return r}function r3(e){var t=-1073741825&e.pendingLanes;return 0!==t?t:1073741824&t?1073741824:0}function r5(e){return(268435455&e)!=0}function r4(e){return(130023424&e)===e}function r6(e){return(4194240&e)!=0}function r8(){// Cycle through the lanes, assigning each new transition to the next lane.
// In most cases, this means every transition gets its own lane, until we
// run out of lanes and cycle back to the beginning.
var e=rZ;return(4194240&(rZ<<=1))==0&&(rZ=64),e}function r7(e){// This wrapper function gets inlined. Only exists so to communicate that it
// doesn't matter which bit is selected; you can pick any bit without
// affecting the algorithms where its used. Here I'm using
// getHighestPriorityLane because it requires the fewest operations.
return e&-e}function r9(e){return 31-rK(e)}function ae(e){for(var t=[],n=0;n<rJ;n++)t.push(e);return t}function at(e,t,n){e.pendingLanes|=t,536870912!==t&&(e.suspendedLanes=0,e.pingedLanes=0),// recent event, and we assume time is monotonically increasing.
e.eventTimes[r9(t)]=n}function an(e,t,n){e.pingedLanes|=e.suspendedLanes&t}function ar(e,t){for(// In addition to entangling each of the given lanes with each other, we also
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
var n=e.entangledLanes|=t,r=e.entanglements,a=n;a;){var i=r9(a),o=1<<i;o&t|// Is this lane transitively entangled with the newly entangled lanes?
r[i]&t&&(r[i]|=t),a&=~o}}function aa(e,t,n){if(rU)for(var r=e.pendingUpdatersLaneMap;n>0;){var a=r9(n),i=1<<a;r[a].add(t),n&=~i}}function ai(e,t){if(rU)for(var n=e.pendingUpdatersLaneMap,r=e.memoizedUpdaters;t>0;){var a=r9(t),i=1<<a,o=n[a];o.size>0&&(o.forEach(function(e){var t=e.alternate;null!==t&&r.has(t)||r.add(e)}),o.clear()),t&=~i}}var ao=/*                          */0;function as(e){var t=e&-e;return 1<t?4<t?r5(t)?16:536870912:4:1}// This is imported by the event replaying implementation in React DOM. It's
// in a separate file to break a circular dependency between the renderer and
// the reconciler.
function al(e){return e.current.memoizedState.isDehydrated}// has this definition built-in.
var au=!1,ac=[],ad=null,af=null,ap=null,ah=new Map,am=new Map,av=[],ag=["mousedown","mouseup","touchcancel","touchend","touchstart","auxclick","dblclick","pointercancel","pointerdown","pointerup","dragend","dragstart","drop","compositionend","compositionstart","keydown","keypress","keyup","input","textInput","copy","cut","paste","click","change","contextmenu","reset","submit"];// The queue of discrete events to be replayed.
function ay(e,t){switch(e){case"focusin":case"focusout":ad=null;break;case"dragenter":case"dragleave":af=null;break;case"mouseover":case"mouseout":ap=null;break;case"pointerover":case"pointerout":var n=t.pointerId;ah.delete(n);break;case"gotpointercapture":case"lostpointercapture":var r=t.pointerId;am.delete(r)}}function ab(e,t,n,r,a,i){if(null===e||e.nativeEvent!==i){if(null!==t){var o=o1(t);null!==o&&O(o)}return{blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[a]}}// If we have already queued this exact event, then it's because
// the different event systems have different DOM event listeners.
// We can accumulate the flags, and the targetContainers, and
// store a single event to be replayed.
e.eventSystemFlags|=r;var s=e.targetContainers;return null!==a&&-1===s.indexOf(a)&&s.push(a),e}function aw(e){// TODO: This function shares a lot of logic with findInstanceBlockingEvent.
// Try to unify them. It's a bit tricky since it would require two return
// values.
var t=o0(e.target);if(null!==t){var n=rh(t);if(null!==n){var r=n.tag;if(13===r){var a=rm(n);if(null!==a){// We're blocked on hydrating this boundary.
// Increase its priority.
e.blockedOn=a,D(e.priority,function(){R(n)});return}}else if(3===r&&al(n.stateNode)){e.blockedOn=rv(n);// We don't currently have a way to increase the priority of
// a root other than sync.
return}}}e.blockedOn=null}function a_(e){if(null!==e.blockedOn)return!1;for(var t=e.targetContainers;t.length>0;){var n=t[0],r=aD(e.domEventName,e.eventSystemFlags,n,e.nativeEvent);if(null===r){var a=e.nativeEvent,i=new a.constructor(a.type,a);null!==nG&&eL("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."),nG=i,a.target.dispatchEvent(i),null===nG&&eL("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."),nG=null}else{// We're still blocked. Try again later.
var o=o1(r);return null!==o&&O(o),e.blockedOn=r,!1}// This target container was successfully dispatched. Try the next.
t.shift()}return!0}function ak(e,t,n){a_(e)&&n.delete(t)}function ax(){au=!1,null!==ad&&a_(ad)&&(ad=null),null!==af&&a_(af)&&(af=null),null!==ap&&a_(ap)&&(ap=null),ah.forEach(ak),am.forEach(ak)}function aS(e,t){e.blockedOn!==t||(e.blockedOn=null,au||(au=!0,// now unblocked. This first might not actually be unblocked yet.
// We could check it early to avoid scheduling an unnecessary callback.
eP.unstable_scheduleCallback(eP.unstable_NormalPriority,ax)))}function aE(e){// Mark anything that was blocked on this as no longer blocked
// and eligible for a replay.
if(ac.length>0){aS(ac[0],e);// This is a exponential search for each boundary that commits. I think it's
// worth it because we expect very few discrete events to queue up and once
// we are actually fully unblocked it will be fast to replay them.
for(var t=1;t<ac.length;t++){var n=ac[t];n.blockedOn===e&&(n.blockedOn=null)}}null!==ad&&aS(ad,e),null!==af&&aS(af,e),null!==ap&&aS(ap,e);var r=function(t){return aS(t,e)};ah.forEach(r),am.forEach(r);for(var a=0;a<av.length;a++){var i=av[a];i.blockedOn===e&&(i.blockedOn=null)}for(;av.length>0;){var o=av[0];if(null!==o.blockedOn)break;aw(o),null===o.blockedOn&&av.shift()}}var aC=eI.ReactCurrentBatchConfig,aT=!0;// TODO: can we stop exporting these?
function aO(e,t,n,r){var a=ao,i=aC.transition;aC.transition=null;try{ao=1,aP(e,t,n,r)}finally{ao=a,aC.transition=i}}function aR(e,t,n,r){var a=ao,i=aC.transition;aC.transition=null;try{ao=4,aP(e,t,n,r)}finally{ao=a,aC.transition=i}}function aP(e,t,n,r){aT&&function(e,t,n,r){var a=aD(e,t,n,r);if(null===a){i7(e,t,r,aI,n),ay(e,r);return}if(function(e,t,n,r,a){// These set relatedTarget to null because the replayed event will be treated as if we
// moved from outside the window (no target) onto the target once it hydrates.
// Instead of mutating we could clone the event.
switch(t){case"focusin":return ad=ab(ad,e,t,n,r,a),!0;case"dragenter":return af=ab(af,e,t,n,r,a),!0;case"mouseover":return ap=ab(ap,e,t,n,r,a),!0;case"pointerover":var i=a.pointerId;return ah.set(i,ab(ah.get(i)||null,e,t,n,r,a)),!0;case"gotpointercapture":var o=a.pointerId;return am.set(o,ab(am.get(o)||null,e,t,n,r,a)),!0}return!1}// Check if this target is unblocked. Returns true if it's unblocked.
(a,e,t,n,r)){r.stopPropagation();return}// We need to clear only if we didn't queue because
if(// queueing is accumulative.
ay(e,r),4&t&&ag.indexOf(e)>-1){for(;null!==a;){var i=o1(a);null!==i&&T(i);var o=aD(e,t,n,r);if(null===o&&i7(e,t,r,aI,n),o===a)break;a=o}null!==a&&r.stopPropagation();return}// This is not replayable so we'll invoke it but without a target,
// in case the event system needs to trace it.
i7(e,t,r,null,n)}(e,t,n,r)}var aI=null;// Returns a SuspenseInstance or Container if it's blocked.
// The return_targetInst field above is conceptually part of the return value.
function aD(e,t,n,r){// TODO: Warn if _enabled is false.
aI=null;var a=o0(nX(r));if(null!==a){var i=rh(a);if(null===i)a=null;else{var o=i.tag;if(13===o){var s=rm(i);if(null!==s)// don't want this event dispatched twice through the event system.
// TODO: If this is the first discrete event in the queue. Schedule an increased
// priority for this boundary.
return s;// This shouldn't happen, something went wrong but to avoid blocking
// the whole system, dispatch the event without a target.
// TODO: Warn.
a=null}else if(3===o){if(al(i.stateNode))// the whole system.
return rv(i);a=null}else i!==a&&// component's mount, ignore it for now (that is, treat it as if it was an
// event on a non-React tree). We might also consider queueing events and
// dispatching them after the mount.
(a=null)}}return aI=a,null}function aN(e){switch(e){// Used by SimpleEventPlugin:
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
 */var aL=null,aM=null,aA=null;function aU(){if(aA)return aA;var e,t,n=aM,r=n.length,a=az(),i=a.length;for(e=0;e<r&&n[e]===a[e];e++);var o=r-e;for(t=1;t<=o&&n[r-t]===a[i-t];t++);var s=t>1?1-t:void 0;return aA=a.slice(e,s)}function az(){return"value"in aL?aL.value:aL.textContent}/**
 * `charCode` represents the actual "character code" and is safe to use with
 * `String.fromCharCode`. As such, only keys that correspond to printable
 * characters produce a valid `charCode`, the only exception to this is Enter.
 * The Tab-key is considered non-printable and does not have a `charCode`,
 * presumably because it does not produce a tab-character in browsers.
 *
 * @param {object} nativeEvent Native browser event.
 * @return {number} Normalized `charCode` property.
 */function aF(e){var t,n=e.keyCode;return(// Some non-printable keys are reported in `charCode`/`keyCode`, discard them.
// Must not discard the (non-)printable Enter-key.
("charCode"in e?0===(t=e.charCode)&&13===n&&(t=13):t=n,10===t&&(t=13),t>=32||13===t)?t:0)}function aj(){return!0}function aq(){return!1}// This is intentionally a factory so that we have different returned constructors.
// If we had a single constructor, it would be megamorphic and engines would deopt.
function aB(e){/**
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
   */function t(t,n,r,a,i){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=a,this.target=i,this.currentTarget=null,e)if(e.hasOwnProperty(o)){var s=e[o];s?this[o]=s(a):this[o]=a[o]}return(null!=a.defaultPrevented?a.defaultPrevented:!1===a.returnValue)?this.isDefaultPrevented=aj:this.isDefaultPrevented=aq,this.isPropagationStopped=aq,this}return tg(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():"unknown"!=typeof e.returnValue&&(e.returnValue=!1),this.isDefaultPrevented=aj)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():"unknown"!=typeof e.cancelBubble&&// IE. This event does not support bubbling or cancelling, and
// any references to cancelBubble throw "Member not found".  A
// typeof check of "unknown" circumvents this issue (and is also
// IE specific).
(e.cancelBubble=!0),this.isPropagationStopped=aj)},/**
     * We release all dispatched `SyntheticEvent`s after each event loop, adding
     * them back into the pool. This allows a way to hold onto a reference that
     * won't be added back into the pool.
     */persist:function(){},/**
     * Checks if this event should be released back into the pool.
     *
     * @return {boolean} True if this should not be released, false otherwise.
     */isPersistent:aj}),t}/**
 * @interface Event
 * @see http://www.w3.org/TR/DOM-Level-3-Events/
 */var aV={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},aW=aB(aV),a$=tg({},aV,{view:0,detail:0}),aH=aB(a$),aY=tg({},a$,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:a5,button:0,buttons:0,relatedTarget:function(e){return void 0===e.relatedTarget?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==M&&(M&&"mousemove"===e.type?(N=e.screenX-M.screenX,L=e.screenY-M.screenY):(N=0,L=0),M=e),N)},movementY:function(e){return"movementY"in e?e.movementY:L}}),aQ=aB(aY),aK=aB(tg({},aY,{dataTransfer:0})),aG=aB(tg({},a$,{relatedTarget:0})),aX=aB(tg({},aV,{animationName:0,elapsedTime:0,pseudoElement:0})),aJ=aB(tg({},aV,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}})),aZ=aB(tg({},aV,{data:0})),a0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},a1={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},a2={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};// getModifierState. If getModifierState is not supported, we map it to a set of
// modifier keys exposed by the event. In this case, Lock-keys are not supported.
function a3(e){var t=this.nativeEvent;if(t.getModifierState)return t.getModifierState(e);var n=a2[e];return!!n&&!!t[n]}function a5(e){return a3}var a4=aB(tg({},a$,{key:/**
 * @param {object} nativeEvent Native browser event.
 * @return {string} Normalized `key` property.
 */function(e){if(e.key){// Normalize inconsistent values reported by browsers due to
// implementations of a working draft specification.
// FireFox implements `key` but returns `MozPrintableKey` for all
// printable characters (normalized to `Unidentified`), ignore it.
var t=a0[e.key]||e.key;if("Unidentified"!==t)return t}// Browser does not implement `key`, polyfill as much of it as we can.
if("keypress"===e.type){var n=aF(e);// The enter-key is technically both printable and non-printable and can
// thus be captured by `keypress`, no other non-printable key should.
return 13===n?"Enter":String.fromCharCode(n)}return"keydown"===e.type||"keyup"===e.type?a1[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:a5,// Legacy Interface
charCode:function(e){return(// `charCode` is the result of a KeyPress event and represents the value of
// the actual printable character.
// KeyPress is deprecated, but its replacement is not yet final and not
// implemented in any major browser. Only KeyPress has charCode.
"keypress"===e.type?aF(e):0)},keyCode:function(e){return(// `keyCode` is the result of a KeyDown/Up event and represents the value of
// physical keyboard key.
// The actual meaning of the value depends on the users' keyboard layout
// which cannot be detected. Assuming that it is a US keyboard layout
// provides a surprisingly accurate mapping for US and European users.
// Due to this, it is left to the user to implement at this time.
"keydown"===e.type||"keyup"===e.type?e.keyCode:0)},which:function(e){return(// `which` is an alias for either `keyCode` or `charCode` depending on the
// type of the event.
"keypress"===e.type?aF(e):"keydown"===e.type||"keyup"===e.type?e.keyCode:0)}})),a6=aB(tg({},aY,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),a8=aB(tg({},a$,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:a5})),a7=aB(tg({},aV,{propertyName:0,elapsedTime:0,pseudoElement:0})),a9=aB(tg({},aY,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,// Browsers without "deltaMode" is reporting in raw wheel delta where one
// notch on the scroll is always +/- 120, roughly equivalent to pixels.
// A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
// ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
deltaMode:0})),ie=[9,13,27,32],it=eq&&"CompositionEvent"in window,ir=null;eq&&"documentMode"in document&&(ir=document.documentMode);// Webkit offers a very useful `textInput` event that can be used to
// directly represent `beforeInput`. The IE `textinput` event is not as
// useful, so we don't use it.
var ia=eq&&"TextEvent"in window&&!ir,ii=eq&&(!it||ir&&ir>8&&ir<=11),io=!1;// In IE9+, we have access to composition events, but the data supplied
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
 */function il(e){var t=e.detail;return"object"==typeof t&&"data"in t?t.data:null}/**
 * Check if a composition event was triggered by Korean IME.
 * Our fallback mode does not work well with IE's Korean IME,
 * so just use native composition events when Korean IME is used.
 * Although CompositionEvent.locale property is deprecated,
 * it is available in IE, where our fallback mode is enabled.
 *
 * @param {object} nativeEvent
 * @return {boolean}
 */function iu(e){return"ko"===e.locale}// Track the current IME composition status, if any.
var ic=!1,id={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ip(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return"input"===t?!!id[e.type]:"textarea"===t}function ih(e,t,n,r){// Flag this event loop as needing state restore.
n2(r);var a=oe(t,"onChange");if(a.length>0){var i=new aW("onChange","change",null,n,r);e.push({event:i,listeners:a})}}/**
 * For IE shims
 */var im=null,iv=null;function ig(e){i1(e,0)}function iy(e){if(tB(o2(e)))return e}function ib(e,t){if("change"===e)return t}/**
 * SECTION: handle `input` event
 */var iw=!1;/**
 * (For IE <=9) Removes the event listeners from the currently-tracked element,
 * if any exists.
 */function i_(){im&&(im.detachEvent("onpropertychange",ik),im=null,iv=null)}/**
 * (For IE <=9) Handles a propertychange event, sending a `change` event if
 * the value of the active element has changed.
 */function ik(e){if("value"===e.propertyName&&iy(iv)){var t;ih(t=[],iv,e,nX(e)),// other events and have it go through ReactBrowserEventEmitter. Since it
// doesn't, we manually listen for the events and so we have to enqueue and
// process the abstract event manually.
//
// Batching is necessary here in order to ensure that all event handlers run
// before the next rerender (including event handlers attached to ancestor
// elements instead of directly on the input). Without this, controlled
// components don't work properly in conjunction with event bubbling because
// the component is rerendered and the value reverted before all the event
// handlers can run. See https://github.com/facebook/react/issues/708.
n8(ig,t)}}function ix(e,t,n){"focusin"===e?(// In IE9, propertychange fires for most input events but is buggy and
// doesn't fire when text is deleted, but conveniently, selectionchange
// appears to fire in all of the remaining cases so we catch those and
// forward the event if the value has changed
// In either case, we don't want to call the event handler if the value
// is changed from JS so we redefine a setter for `.value` that updates
// our activeElementValue variable, allowing us to ignore those changes
//
// stopWatching() should be a noop here but we call it just in case we
// missed a blur event somehow.
i_(),im=t,iv=n,im.attachEvent("onpropertychange",ik)):"focusout"===e&&i_()}// For IE8 and IE9.
function iS(e,t){if("selectionchange"===e||"keyup"===e||"keydown"===e)// helpful for us so just check activeElement instead.
//
// 99% of the time, keydown and keyup aren't necessary. IE8 fails to fire
// propertychange on the first input event after setting `value` from a
// script and fires only keydown, keypress, keyup. Catching keyup usually
// gets it and catching keydown lets us fire an event for the first
// keystroke if user does a key repeat (it'll be a little delayed: right
// before the second keystroke). Other input methods (e.g., paste) seem to
// fire selectionchange normally.
return iy(iv)}function iE(e,t){if("click"===e)return iy(t)}function iC(e,t){if("input"===e||"change"===e)return iy(t)}eq&&// deleting text, so we ignore its input events.
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
for(var a=0;a<n.length;a++){var i=n[a];if(!eB.call(t,i)||!iT(e[i],t[i]))return!1}return!0}/**
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
 */function iP(e,t){for(var n=iR(e),r=0,a=0;n;){if(3===n.nodeType){if(a=r+n.textContent.length,r<=t&&a>=t)return{node:n,offset:t-r};r=a}n=iR(/**
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
 */function iN(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&("input"===t&&("text"===e.type||"search"===e.type||"tel"===e.type||"url"===e.type||"password"===e.type)||"textarea"===t||"true"===e.contentEditable)}var iL=eq&&"documentMode"in document&&document.documentMode<=11,iM=null,iA=null,iU=null,iz=!1;/**
 * Poll selection to see whether it's changed.
 *
 * @param {object} nativeEvent
 * @param {object} nativeEventTarget
 * @return {?SyntheticEvent}
 */function iF(e,t,n){// Ensure we have the right element, and that the user is not dragging a
// selection (this matches native `select` event behavior). In HTML5, select
// fires only on input and textarea thus if there's no focused element we
// won't dispatch.
var r=n.window===n?n.document:9===n.nodeType?n:n.ownerDocument;if(!iz&&null!=iM&&iM===tV(r)){// Only fire when selection has actually changed.
var a=/**
 * Get an object which is a unique representation of the current selection.
 *
 * The return value will not be consistent across nodes or browsers, but
 * two identical selections on the same node will return identical objects.
 */function(e){if("selectionStart"in e&&iN(e))return{start:e.selectionStart,end:e.selectionEnd};var t=(e.ownerDocument&&e.ownerDocument.defaultView||window).getSelection();return{anchorNode:t.anchorNode,anchorOffset:t.anchorOffset,focusNode:t.focusNode,focusOffset:t.focusOffset}}(iM);if(!iU||!iO(iU,a)){iU=a;var i=oe(iA,"onSelect");if(i.length>0){var o=new aW("onSelect","select",null,t,n);e.push({event:o,listeners:i}),o.target=iM}}}}/**
 * Generate a mapping of standard vendor prefixes using the defined style property and event name.
 *
 * @param {string} styleProp
 * @param {string} eventName
 * @returns {object}
 */function ij(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}/**
 * A list of event names to a configurable list of vendor prefixes.
 */var iq={animationend:ij("Animation","AnimationEnd"),animationiteration:ij("Animation","AnimationIteration"),animationstart:ij("Animation","AnimationStart"),transitionend:ij("Transition","TransitionEnd")},iB={},iV={};/**
 * Attempts to determine the correct vendor prefixed event name.
 *
 * @param {string} eventName
 * @returns {string}
 */function iW(e){if(iB[e])return iB[e];if(!iq[e])return e;var t=iq[e];for(var n in t)if(t.hasOwnProperty(n)&&n in iV)return iB[e]=t[n];return e}!eq||(iV=document.createElement("div").style,"AnimationEvent"in window||(delete iq.animationend.animation,delete iq.animationiteration.animation,delete iq.animationstart.animation),"TransitionEvent"in window||delete iq.transitionend.transition);var i$=iW("animationend"),iH=iW("animationiteration"),iY=iW("animationstart"),iQ=iW("transitionend"),iK=new Map,iG=["abort","auxClick","cancel","canPlay","canPlayThrough","click","close","contextMenu","copy","cut","drag","dragEnd","dragEnter","dragExit","dragLeave","dragOver","dragStart","drop","durationChange","emptied","encrypted","ended","error","gotPointerCapture","input","invalid","keyDown","keyPress","keyUp","load","loadedData","loadedMetadata","loadStart","lostPointerCapture","mouseDown","mouseMove","mouseOut","mouseOver","mouseUp","paste","pause","play","playing","pointerCancel","pointerDown","pointerMove","pointerOut","pointerOver","pointerUp","progress","rateChange","reset","resize","seeked","seeking","stalled","submit","suspend","timeUpdate","touchCancel","touchEnd","touchStart","volumeChange","scroll","toggle","touchMove","waiting","wheel"];function iX(e,t){iK.set(e,t),eF(t,[e])}// TODO: remove top-level side effect.
(function(){for(var e=0;e<iG.length;e++){var t=iG[e];iX(t.toLowerCase(),"on"+(t[0].toUpperCase()+t.slice(1)))}// Special cases where event names don't match.
iX(i$,"onAnimationEnd"),iX(iH,"onAnimationIteration"),iX(iY,"onAnimationStart"),iX("dblclick","onDoubleClick"),iX("focusin","onFocus"),iX("focusout","onBlur"),iX(iQ,"onTransitionEnd")})(),ej("onMouseEnter",["mouseout","mouseover"]),ej("onMouseLeave",["mouseout","mouseover"]),ej("onPointerEnter",["pointerout","pointerover"]),ej("onPointerLeave",["pointerout","pointerover"]),eF("onChange",["change","click","focusin","focusout","input","keydown","keyup","selectionchange"]),eF("onSelect",["focusout","contextmenu","dragend","focusin","keydown","keyup","mousedown","mouseup","selectionchange"]),eF("onBeforeInput",["compositionend","keypress","textInput","paste"]),eF("onCompositionEnd",["compositionend","focusout","keydown","keypress","keyup","mousedown"]),eF("onCompositionStart",["compositionstart","focusout","keydown","keypress","keyup","mousedown"]),eF("onCompositionUpdate",["compositionupdate","focusout","keydown","keypress","keyup","mousedown"]);var iJ=["abort","canplay","canplaythrough","durationchange","emptied","encrypted","ended","error","loadeddata","loadedmetadata","loadstart","pause","play","playing","progress","ratechange","resize","seeked","seeking","stalled","suspend","timeupdate","volumechange","waiting"],iZ=new Set(["cancel","close","invalid","load","scroll","toggle"].concat(iJ));// We should not delegate these events to the container, but rather
function i0(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,/**
 * Same as invokeGuardedCallback, but instead of returning an error, it stores
 * it in a global so it can be rethrown by `rethrowCaughtError` later.
 * TODO: See if caughtError and rethrowError can be unified.
 *
 * @param {String} name of the guard to use for logging or debugging
 * @param {Function} func The function to invoke
 * @param {*} context The context to use when calling the function
 * @param {...*} args Arguments for function
 */function(e,t,n,r,a,i,o,s,l){if(rc.apply(this,arguments),ri){var u=rd();rs||(rs=!0,rl=u)}}(r,t,void 0,e),e.currentTarget=null}function i1(e,t){for(var n=(4&t)!=0,r=0;r<e.length;r++){var a=e[r];!function(e,t,n){var r;if(n)for(var a=t.length-1;a>=0;a--){var i=t[a],o=i.instance,s=i.currentTarget,l=i.listener;if(o!==r&&e.isPropagationStopped())return;i0(e,l,s),r=o}else for(var u=0;u<t.length;u++){var c=t[u],d=c.instance,f=c.currentTarget,p=c.listener;if(d!==r&&e.isPropagationStopped())return;i0(e,p,f),r=d}}(a.event,a.listeners,n);//  event system doesn't use pooling.
}// This would be a good time to rethrow if any of the event handlers threw.
!/**
 * During execution of guarded functions we will capture the first error which
 * we will rethrow to be handled by the top level error handler.
 */function(){if(rs){var e=rl;throw rs=!1,rl=null,e}}()}function i2(e,t){iZ.has(e)||eL('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.',e);var n,r=(void 0===(n=t[oX])&&(n=t[oX]=new Set),n),a=e+"__bubble";r.has(a)||(i6(t,e,2,!1),r.add(a))}function i3(e,t,n){iZ.has(e)&&!t&&eL('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.',e);var r=0;t&&(r|=4),i6(n,e,r,t)}// This is only used by createEventHandle when the
var i5="_reactListening"+Math.random().toString(36).slice(2);function i4(e){if(!e[i5]){e[i5]=!0,eA.forEach(function(t){// We handle selectionchange separately because it
// doesn't bubble and needs to be on the document.
"selectionchange"!==t&&(iZ.has(t)||i3(t,!1,e),i3(t,!0,e))});var t=9===e.nodeType?e:e.ownerDocument;null===t||t[i5]||(t[i5]=!0,i3("selectionchange",!1,t))}}function i6(e,t,n,r,a){var i,o,s=function(e,t,n){var r;switch(aN(t)){case 1:r=aO;break;case 4:r=aR;break;default:r=aP}return r.bind(null,t,n,e)}(e,t,n),l=void 0;// If passive option is not supported, then the event will be
(n9&&("touchstart"===t||"touchmove"===t||"wheel"===t)&&(l=!0),r)?void 0!==l?(i=l,e.addEventListener(t,s,{capture:!0,passive:i})):e.addEventListener(t,s,!0):void 0!==l?(o=l,e.addEventListener(t,s,{passive:o})):e.addEventListener(t,s,!1)}function i8(e,t){return e===t||8===e.nodeType&&e.parentNode===t}function i7(e,t,n,r,a){var i=r;if((1&t)==0&&(2&t)==0&&null!==r){// The below logic attempts to work out if we need to change
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
var o=r;e:for(;;){if(null===o)return;var s=o.tag;if(3===s||4===s){var l=o.stateNode.containerInfo;if(i8(l,a))break;if(4===s)for(// The target is a portal, but it's not the rootContainer we're looking for.
// Normally portals handle their own events all the way down to the root.
// So we should be able to stop now. However, we don't know if this portal
// was part of *our* root.
var u=o.return;null!==u;){var c=u.tag;if((3===c||4===c)&&i8(u.stateNode.containerInfo,a))// a parent of the Portal. That means we can ignore it because the
// Portal will bubble through to us.
return;u=u.return}// Now we need to find it's corresponding host fiber in the other
// tree. To do this we can use getClosestInstanceFromNode, but we
// need to validate that the fiber is a host instance, otherwise
// we need to traverse up through the DOM till we find the correct
// node that is from the other tree.
for(;null!==l;){var d=o0(l);if(null===d)return;var f=d.tag;if(5===f||6===f){o=i=d;continue e}l=l.parentNode}}o=o.return}}n8(function(){var r,a,o,s,l,u,c,d,f,p;return r=i,a=nX(n),void(// TODO: we should remove the concept of a "SimpleEventPlugin".
// This is the basic functionality of the event system. All
// the other plugins are essentially polyfills. So the plugin
// should probably be inlined somewhere and have its logic
// be core the to event system. This would potentially allow
// us to ship builds of React without the polyfilled plugins below.
function(e,t,n,r,a,i,o){var s=iK.get(t);if(void 0!==s){var l=aW,u=t;switch(t){case"keypress":// Firefox creates a keypress event for function keys too. This removes
// the unwanted keypress events. Enter is however both printable and
// non-printable. One would expect Tab to be as well (but it isn't).
if(0===aF(r))return;/* falls through */case"keydown":case"keyup":l=a4;break;case"focusin":u="focus",l=aG;break;case"focusout":u="blur",l=aG;break;case"beforeblur":case"afterblur":l=aG;break;case"click":// Firefox creates a click event on right mouse clicks. This removes the
// unwanted click events.
if(2===r.button)return;/* falls through */case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":/* falls through */case"mouseout":case"mouseover":case"contextmenu":l=aQ;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":l=aK;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":l=a8;break;case i$:case iH:case iY:l=aX;break;case iQ:l=a7;break;case"scroll":l=aH;break;case"wheel":l=a9;break;case"copy":case"cut":case"paste":l=aJ;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":l=a6}var c=(4&i)!=0,d=!c&&// TODO: ideally, we'd eventually add all events from
// nonDelegatedEvents list in DOMPluginEventSystem.
// Then we can remove this special list.
// This is a breaking change that can wait until React 18.
"scroll"===t,f=function(e,t,n,r,a,i){for(var o=r?null!==t?t+"Capture":null:t,s=[],l=e,u=null;null!==l;){var c=l,d=c.stateNode;// Handle listeners that are on HostComponents (i.e. <div>)
if(5===c.tag&&null!==d&&(u=d,null!==o)){var f=n7(l,o);null!=f&&s.push(i9(l,f,u))}// If we are only accumulating events for the target, then we don't
// continue to propagate through the React fiber tree to find other
// listeners.
if(a)break;// If we are processing the onBeforeBlur event, then we need to take
l=l.return}return s}// We should only use this function for:
(n,s,r.type,c,d);if(f.length>0){// Intentionally create event lazily.
var p=new l(s,u,null,r,a);e.push({event:p,listeners:f})}}}(s=o=[],l=e,u=r,c=n,d=a,f=t),(7&f)==0&&(/**
 * For almost every interaction we care about, there will be both a top-level
 * `mouseover` and `mouseout` event that occurs. Only use `mouseout` so that
 * we do not extract duplicate events. However, moving the mouse into the
 * browser from outside will not fire a `mouseout` event. In this case, we use
 * the `mouseover` top-level event.
 */function(e,t,n,r,a,i,o){var s,l,u,c="mouseover"===t||"pointerover"===t,d="mouseout"===t||"pointerout"===t;if(c&&r!==nG){// If this is an over event with a target, we might have already dispatched
// the event in the out event of the other target. If this is replayed,
// then it's because we couldn't dispatch against this target previously
// so we have to do it now instead.
var f=r.relatedTarget||r.fromElement;if(f&&(o0(f)||f[oG]))return}if(d||c){if(a.window===a)s=a;else{// TODO: Figure out why `ownerDocument` is sometimes undefined in IE8.
var p=a.ownerDocument;s=p?p.defaultView||p.parentWindow:window}if(d){var h=r.relatedTarget||r.toElement;if(l=n,null!==(u=h?o0(h):null)){var m=rh(u);(u!==m||5!==u.tag&&6!==u.tag)&&(u=null)}}else // Moving to a node from outside the window.
l=null,u=n;if(l!==u){var v,g,y,b,w=aQ,_="onMouseLeave",k="onMouseEnter",x="mouse";("pointerout"===t||"pointerover"===t)&&(w=a6,_="onPointerLeave",k="onPointerEnter",x="pointer");var S=null==l?s:o2(l),E=null==u?s:o2(u),C=new w(_,x+"leave",l,r,a);C.target=S,C.relatedTarget=E;var T=null;// We should only process this nativeEvent if we are processing
if(o0(a)===n){var O=new w(k,x+"enter",u,r,a);O.target=E,O.relatedTarget=S,T=O}v=T,g=l,y=u,b=g&&y?/**
 * Return the lowest common ancestor of A and B, or null if they are in
 * different trees.
 */function(e,t){for(var n=e,r=t,a=0,i=n;i;i=ot(i))a++;for(var o=0,s=r;s;s=ot(s))o++;// If A is deeper, crawl up.
for(;a-o>0;)n=ot(n),a--;// If B is deeper, crawl up.
for(;o-a>0;)r=ot(r),o--;// Walk in lockstep until we find a match.
for(var l=a;l--;){if(n===r||null!==r&&n===r.alternate)return n;n=ot(n),r=ot(r)}return null}(g,y):null,null!==g&&on(e,C,g,b,!1),null!==y&&null!==v&&on(e,v,y,b,!0)}}}(s,l,u,c,d),/**
 * This plugin creates an `onChange` event that normalizes change events
 * across form elements. This event fires at a time when it's possible to
 * change the element's value without seeing a flicker.
 *
 * Supported elements are:
 * - input (see `isTextInputElement`)
 * - textarea
 * - select
 */function(e,t,n,r,a,i,o){var s,l,u,c,d,f=n?o2(n):window;if("select"===(s=f.nodeName&&f.nodeName.toLowerCase())||"input"===s&&"file"===f.type?c=ib:ip(f)?iw?c=iC:(c=iS,d=ix):(l=f.nodeName)&&"input"===l.toLowerCase()&&("checkbox"===f.type||"radio"===f.type)&&(c=iE),c){var p=c(t,n);if(p){ih(e,p,r,a);return}}d&&d(t,f,n),"focusout"===t&&(u=f._wrapperState)&&u.controlled&&"number"===f.type&&// If controlled, assign the value attribute to the current value on blur
t0(f,"number",f.value)}(s,l,u,c,d),/**
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
 */function(e,t,n,r,a,i,o){var s=n?o2(n):window;switch(t){// Track the input node that has focus.
case"focusin":(ip(s)||"true"===s.contentEditable)&&(iM=s,iA=n,iU=null);break;case"focusout":iM=null,iA=null,iU=null;break;// Don't fire the event while the user is dragging. This matches the
// semantics of the native select event.
case"mousedown":iz=!0;break;case"contextmenu":case"mouseup":case"dragend":iz=!1,iF(e,r,a);break;// Chrome and IE fire non-standard event when selection is changed (and
// sometimes when it hasn't). IE's event fires out of order with respect
// to key and input events on deletion, so we discard it.
//
// Firefox doesn't support selectionchange, so check selection status
// after each key entry. The selection changes after keydown and before
// keyup, but we check on keydown as well in the case of holding down a
// key, when multiple keydown events are fired but only one keyup is.
// This is also our approach for IE handling, for the reason above.
case"selectionchange":if(iL)break;// falls through
case"keydown":case"keyup":iF(e,r,a)}}(s,l,u,c,d),/**
 * @return {?object} A SyntheticCompositionEvent.
 */function(e,t,n,r,a){if(it?i=/**
 * Translate native top level events into event types.
 */function(e){switch(e){case"compositionstart":return"onCompositionStart";case"compositionend":return"onCompositionEnd";case"compositionupdate":return"onCompositionUpdate"}}(t):ic?is(t,r)&&(i="onCompositionEnd"):"keydown"===t&&229===r.keyCode&&(i="onCompositionStart"),i){ii&&!iu(r)&&(ic||"onCompositionStart"!==i?"onCompositionEnd"===i&&ic&&(o=aU()):(aL=a,aM=az(),ic=!0));var i,o,s=oe(n,i);if(s.length>0){var l=new aZ(i,t,null,r,a);if(e.push({event:l,listeners:s}),o)// This matches the property of native CompositionEventInterface.
l.data=o;else{var u=il(r);null!==u&&(l.data=u)}}}}(s,l,u,c,d),/**
 * Extract a SyntheticInputEvent for `beforeInput`, based on either native
 * `textInput` or fallback behavior.
 *
 * @return {?object} A SyntheticInputEvent.
 */function(e,t,n,r,a){// If no characters are being inserted, no BeforeInput event should
// be fired.
if(i=ia?function(e,t){switch(e){case"compositionend":return il(t);case"keypress":if(32!==t.which)return null;return io=!0," ";case"textInput":// Record the characters to be added to the DOM.
var n=t.data;// If it's a spacebar character, assume that we have already handled
// it at the keypress level and bail immediately. Android Chrome
// doesn't give us keycodes, so we need to ignore it.
if(" "===n&&io)return null;return n;default:// For other native event types, do nothing.
return null}}(t,r):/**
 * For browsers that do not provide the `textInput` event, extract the
 * appropriate string to use for SyntheticInputEvent.
 */function(e,t){// If we are currently composing (IME) and using a fallback to do so,
// try to extract the composed characters from the fallback object.
// If composition event is available, we extract a string only at
// compositionevent, otherwise extract it at fallback events.
if(ic){if("compositionend"===e||!it&&is(e,t)){var n=aU();return aL=null,aM=null,aA=null,ic=!1,n}return null}switch(e){case"paste":default:// If a paste event occurs after a keypress, throw out the input
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
if(t.char&&t.char.length>1)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return ii&&!iu(t)?null:t.data}}(t,r)){var i,o=oe(n,"onBeforeInput");if(o.length>0){var s=new aZ("onBeforeInput","beforeinput",null,r,a);e.push({event:s,listeners:o}),s.data=i}}}(s,l,u,c,d)),i1(o,t))})}function i9(e,t,n){return{instance:e,listener:t,currentTarget:n}}// - BeforeInputEventPlugin
// - ChangeEventPlugin
// - SelectEventPlugin
// This is because we only process these plugins
// in the bubble phase, so we need to accumulate two
// phase event listeners (via emulation).
function oe(e,t){for(var n=t+"Capture",r=[],a=e;null!==a;){var i=a,o=i.stateNode;// Handle listeners that are on HostComponents (i.e. <div>)
if(5===i.tag&&null!==o){var s=n7(a,n);null!=s&&r.unshift(i9(a,s,o));var l=n7(a,t);null!=l&&r.push(i9(a,l,o))}a=a.return}return r}function ot(e){if(null===e)return null;do e=e.return;// TODO: If this is a HostRoot we might want to bail out.
while(e&&5!==e.tag)return e||null}function on(e,t,n,r,a){for(var i=t._reactName,o=[],s=n;null!==s&&s!==r;){var l=s,u=l.alternate,c=l.stateNode,d=l.tag;if(null!==u&&u===r)break;if(5===d&&null!==c){if(a){var f=n7(s,i);null!=f&&o.unshift(i9(s,f,c))}else if(!a){var p=n7(s,i);null!=p&&o.push(i9(s,p,c))}}s=s.return}0!==o.length&&e.push({event:t,listeners:o})}// We should only use this function for:
var or=!1,oa="dangerouslySetInnerHTML",oi="suppressContentEditableWarning",oo="suppressHydrationWarning",os="autoFocus",ol="children",ou="style",oc="__html";A={// There are working polyfills for <dialog>. Let people use it.
dialog:!0,// Electron ships a custom <webview> tag to display external web content in
// an isolated frame and process.
// This tag is not present in non Electron environments such as JSDom which
// is often used for testing purposes.
// @see https://electronjs.org/docs/api/webview-tag
webview:!0},U=function(e,t){nA(e,t)||function(e,t){var n=[];for(var r in t)!function(e,t){if(eB.call(nF,t)&&nF[t])return!0;if(nq.test(t)){var n="aria-"+t.slice(4).toLowerCase(),r=nz.hasOwnProperty(n)?n:null;// DOM properties, then it is an invalid aria-* attribute.
if(null==r)return eL("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.",t),nF[t]=!0,!0;// aria-* attributes should be lowercase; suggest the lowercase version.
if(t!==r)return eL("Invalid ARIA attribute `%s`. Did you mean `%s`?",t,r),nF[t]=!0,!0}if(nj.test(t)){var a=t.toLowerCase(),i=nz.hasOwnProperty(a)?a:null;// DOM properties, then it is an invalid aria-* attribute.
if(null==i)return nF[t]=!0,!1;// aria-* attributes should be lowercase; suggest the lowercase version.
t!==i&&(eL("Unknown ARIA attribute `%s`. Did you mean `%s`?",t,i),nF[t]=!0)}return!0}(0,r)&&n.push(r);var a=n.map(function(e){return"`"+e+"`"}).join(", ");1===n.length?eL("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",a,e):n.length>1&&eL("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props",a,e)}(e,t),"input"!==e&&"textarea"!==e&&"select"!==e||null==t||null!==t.value||nB||(nB=!0,"select"===e&&t.multiple?eL("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.",e):eL("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.",e)),nA(e,t)||nK(e,t,{registrationNameDependencies:eU,possibleRegistrationNames:ez})},// browsers. It adds spaces and sorts the properties in some
// non-alphabetical order. Handling that would require sorting CSS
// properties in the client & server versions or applying
// `expectedStyle` to a temporary DOM node to read its `style` attribute
// normalized. Since it only affects IE, we're skipping style warnings
// in that browser completely in favor of doing all that work.
// See https://github.com/facebook/react/issues/11807
q=eq&&!document.documentMode,z=function(e,t,n){if(!or){var r=op(n),a=op(t);a!==r&&(or=!0,eL("Prop `%s` did not match. Server: %s Client: %s",e,JSON.stringify(a),JSON.stringify(r)))}},F=function(e){if(!or){or=!0;var t=[];e.forEach(function(e){t.push(e)}),eL("Extra attributes from the server: %s",t)}},j=function(e,t){!1===t?eL("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.",e,e,e):eL("Expected `%s` listener to be a function, instead got a value of `%s` type.",e,typeof t)},// can be used for comparison.
B=function(e,t){// We could have created a separate document here to avoid
// re-initializing custom elements if they exist. But this breaks
// how <noscript> is being handled. So we use the same document.
// See the discussion in https://github.com/facebook/react/pull/11157.
var n=e.namespaceURI===no?e.ownerDocument.createElement(e.tagName):e.ownerDocument.createElementNS(e.namespaceURI,e.tagName);return n.innerHTML=t,n.innerHTML};// It also can turn \u0000 into \uFFFD inside attributes.
// https://www.w3.org/TR/html5/single-page.html#preprocessing-the-input-stream
// If we have a mismatch, it might be caused by that.
// We will still patch up in this case but not fire the warning.
var od=/\r\n?/g,of=/\u0000|\uFFFD/g;function op(e){return eW(e)&&eL("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.",eV(e)),("string"==typeof e?e:""+e).replace(od,"\n").replace(of,"")}function oh(e,t,n,r){var a=op(t),i=op(e);if(i!==a&&(r&&!or&&(or=!0,eL('Text content did not match. Server: "%s" Client: "%s"',i,a)),n))// client rendering, up to the nearest Suspense boundary.
throw Error("Text content does not match server-rendered HTML.")}function om(e){return 9===e.nodeType?e:e.ownerDocument}function ov(){}function og(e){// Mobile Safari does not fire properly bubble click events on
// non-interactive elements, which means delegated click listeners do not
// fire. The workaround for this bug involves attaching an empty click
// listener on the target node.
// https://www.quirksmode.org/blog/archives/2010/09/click_event_del.html
// Just set it using the onclick property so that we don't have to manage any
// bookkeeping for it. Not sure if we need to clear it when the listener is
// removed.
// TODO: Only do this for the relevant Safaris maybe?
e.onclick=ov}function oy(e,t){or||(or=!0,eL("Did not expect server HTML to contain a <%s> in <%s>.",t.nodeName.toLowerCase(),e.nodeName.toLowerCase()))}function ob(e,t){or||(or=!0,eL('Did not expect server HTML to contain the text node "%s" in <%s>.',t.nodeValue,e.nodeName.toLowerCase()))}function ow(e,t,n){or||(or=!0,eL("Expected server HTML to contain a matching <%s> in <%s>.",t,e.nodeName.toLowerCase()))}function o_(e,t){""!==t&&(or||(or=!0,eL('Expected server HTML to contain a matching text node for "%s" in <%s>.',t,e.nodeName.toLowerCase())))}var ok=function(){},ox=function(){},oS=["address","applet","area","article","aside","base","basefont","bgsound","blockquote","body","br","button","caption","center","col","colgroup","dd","details","dir","div","dl","dt","embed","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","iframe","img","input","isindex","li","link","listing","main","marquee","menu","menuitem","meta","nav","noembed","noframes","noscript","object","ol","p","param","plaintext","pre","script","section","select","source","style","summary","table","tbody","td","template","textarea","tfoot","th","thead","title","tr","track","ul","wbr","xmp"],oE=["applet","caption","html","table","td","th","marquee","object","template",// TODO: Distinguish by namespace here -- for <title>, including it here
// errs on the side of fewer warnings
"foreignObject","desc","title"],oC=oE.concat(["button"]),oT=["dd","dt","li","option","optgroup","p","rp","rt"],oO={current:null,formTag:null,aTagInScope:null,buttonTagInScope:null,nobrTagInScope:null,pTagInButtonScope:null,listItemTagAutoclosing:null,dlItemTagAutoclosing:null};ox=function(e,t){var n=tg({},e||oO),r={tag:t};return -1!==oE.indexOf(t)&&(n.aTagInScope=null,n.buttonTagInScope=null,n.nobrTagInScope=null),-1!==oC.indexOf(t)&&(n.pTagInButtonScope=null),-1!==oS.indexOf(t)&&"address"!==t&&"div"!==t&&"p"!==t&&(n.listItemTagAutoclosing=null,n.dlItemTagAutoclosing=null),n.current=r,"form"===t&&(n.formTag=r),"a"===t&&(n.aTagInScope=r),"button"===t&&(n.buttonTagInScope=r),"nobr"===t&&(n.nobrTagInScope=r),"p"===t&&(n.pTagInButtonScope=r),"li"===t&&(n.listItemTagAutoclosing=r),("dd"===t||"dt"===t)&&(n.dlItemTagAutoclosing=r),n};/**
   * Returns whether
   */var oR=function(e,t){// First, let's check if we're in an unusual parsing mode...
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
switch(e){case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return"h1"!==t&&"h2"!==t&&"h3"!==t&&"h4"!==t&&"h5"!==t&&"h6"!==t;case"rp":case"rt":return -1===oT.indexOf(t);case"body":case"caption":case"col":case"colgroup":case"frameset":case"frame":case"head":case"html":case"tbody":case"td":case"tfoot":case"th":case"thead":case"tr":// These tags are only valid with a few parents that have special child
// parsing rules -- if we're down here, then none of those matched and
// so we allow it only if we don't know what the parent is, as all other
// cases are invalid.
return null==t}return!0},oP=function(e,t){switch(e){case"address":case"article":case"aside":case"blockquote":case"center":case"details":case"dialog":case"dir":case"div":case"dl":case"fieldset":case"figcaption":case"figure":case"footer":case"header":case"hgroup":case"main":case"menu":case"nav":case"ol":case"p":case"section":case"summary":case"ul":case"pre":case"listing":case"table":case"hr":case"xmp":case"h1":case"h2":case"h3":case"h4":case"h5":case"h6":return t.pTagInButtonScope;case"form":return t.formTag||t.pTagInButtonScope;case"li":return t.listItemTagAutoclosing;case"dd":case"dt":return t.dlItemTagAutoclosing;case"button":return t.buttonTagInScope;case"a":// Spec says something about storing a list of markers, but it sounds
// equivalent to this check.
return t.aTagInScope;case"nobr":return t.nobrTagInScope}return null},oI={};ok=function(e,t,n){var r=(n=n||oO).current,a=r&&r.tag;null!=t&&(null!=e&&eL("validateDOMNesting: when childText is passed, childTag should be null"),e="#text");var i=oR(e,a)?null:r,o=i?null:oP(e,n),s=i||o;if(s){var l=s.tag,u=!!i+"|"+e+"|"+l;if(!oI[u]){oI[u]=!0;var c=e,d="";if("#text"===e?/\S/.test(t)?c="Text nodes":(c="Whitespace text nodes",d=" Make sure you don't have any extra whitespace between tags on each line of your source code."):c="<"+e+">",i){var f="";"table"===l&&"tr"===e&&(f+=" Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."),eL("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s",c,l,d,f)}else eL("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.",c,l)}}};var oD="suppressHydrationWarning",oN=null,oL=null;function oM(e,t){return"textarea"===e||"noscript"===e||"string"==typeof t.children||"number"==typeof t.children||"object"==typeof t.dangerouslySetInnerHTML&&null!==t.dangerouslySetInnerHTML&&null!=t.dangerouslySetInnerHTML.__html}// if a component just imports ReactDOM (e.g. for findDOMNode).
// Some environments might not have setTimeout or clearTimeout.
var oA="function"==typeof setTimeout?setTimeout:void 0,oU="function"==typeof clearTimeout?clearTimeout:void 0,oz="function"==typeof Promise?Promise:void 0,oF="function"==typeof queueMicrotask?queueMicrotask:void 0!==oz?function(e){return oz.resolve(null).then(e).catch(oj)}:oA;function oj(e){setTimeout(function(){throw e})}// -------------------
function oq(e,t){var n=t,r=0;// Delete all nodes within this suspense boundary.
do{var a=n.nextSibling;if(e.removeChild(n),a&&8===a.nodeType){var i=a.data;if("/$"===i){if(0===r){e.removeChild(a),aE(t);return}r--}else("$"===i||"$?"===i||"$!"===i)&&r++}n=a}while(n)// TODO: Warn, we didn't find the end comment boundary.
// Retry if any event replaying was blocked on this.
aE(t)}function oB(e){return"$?"===e.data}function oV(e){return"$!"===e.data}function oW(e){// Skip non-hydratable nodes.
for(;null!=e;e=e.nextSibling){var t=e.nodeType;if(1===t||3===t)break;if(8===t){var n=e.data;if("$"===n||"$!"===n||"$?"===n)break;if("/$"===n)return null}}return e}function o$(e){return oW(e.nextSibling)}// SuspenseInstance. I.e. if its previous sibling is a Comment with
// SUSPENSE_x_START_DATA. Otherwise, null.
function oH(e){for(var t=e.previousSibling,n=0;t;){if(8===t.nodeType){var r=t.data;if("$"===r||"$!"===r||"$?"===r){if(0===n)return t;n--}else"/$"===r&&n++}t=t.previousSibling}return null}var oY=Math.random().toString(36).slice(2),oQ="__reactFiber$"+oY,oK="__reactProps$"+oY,oG="__reactContainer$"+oY,oX="__reactEvents$"+oY,oJ="__reactListeners$"+oY,oZ="__reactHandles$"+oY;// If the target node is part of a hydrated or not yet rendered subtree, then
// this may also return a SuspenseComponent or HostRoot to indicate that.
// Conceptually the HostRoot fiber is a child of the Container node. So if you
// pass the Container node as the targetNode, you will not actually get the
// HostRoot back. To get to the HostRoot, you need to pass a child of it.
// The same thing applies to Suspense boundaries.
function o0(e){var t=e[oQ];if(t)return t;for(// If the direct event target isn't a React owned DOM node, we need to look
// to see if one of its parents is a React owned DOM node.
var n=e.parentNode;n;){if(// We'll check if this is a container root that could include
// React nodes in the future. We need to check this first because
// if we're a child of a dehydrated container, we need to first
// find that inner container before moving on to finding the parent
// instance. Note that we don't check this field on  the targetNode
// itself because the fibers are conceptually between the container
// node and the first child. It isn't surrounding the container node.
// If it's not a container, we check if it's an instance.
t=n[oG]||n[oQ]){// Since this wasn't the direct target of the event, we might have
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
var a=oH(e);null!==a;){// We found a suspense instance. That means that we haven't
// hydrated it yet. Even though we leave the comments in the
// DOM after hydrating, and there are boundaries in the DOM
// that could already be hydrated, we wouldn't have found them
// through this pass since if the target is hydrated it would
// have had an internalInstanceKey on it.
// Let's get the fiber associated with the SuspenseComponent
// as the deepest instance.
var i=a[oQ];if(i)return i;// If we don't find a Fiber on the comment, it might be because
// we haven't gotten to hydrate it yet. There might still be a
// parent boundary that hasn't above this one so we need to find
// the outer most that is known.
a=oH(a);// If we don't find one, then that should mean that the parent
// host component also hasn't hydrated yet. We can return it
// below since it will bail out on the isMounted check later.
}return t}n=(e=n).parentNode}return null}/**
 * Given a DOM node, return the ReactDOMComponent or ReactDOMTextComponent
 * instance, or null if the node was not rendered by this React.
 */function o1(e){var t=e[oQ]||e[oG];return t&&(5===t.tag||6===t.tag||13===t.tag||3===t.tag)?t:null}/**
 * Given a ReactDOMComponent or ReactDOMTextComponent, return the corresponding
 * DOM node.
 */function o2(e){if(5===e.tag||6===e.tag)// a host component or host text.
return e.stateNode;// Without this first invariant, passing a non-DOM-component triggers the next
// invariant for a missing parent, which is super confusing.
throw Error("getNodeFromInstance: Invalid argument.")}function o3(e){return e[oK]||null}var o5={},o4=eI.ReactDebugCurrentFrame;function o6(e){if(e){var t=e._owner,n=function e(t,n,r){if(null==t)return"";if("function"==typeof t)return tx(t,!!((a=t.prototype)&&a.isReactComponent));if("string"==typeof t)return t_(t);switch(t){case tc:return t_("Suspense");case td:return t_("SuspenseList")}if("object"==typeof t)switch(t.$$typeof){case tu:return tx(t.render,!1);case tf:// Memo may contain any component type so we recursively resolve it.
return e(t.type,n,r);case tp:var a,i=t._payload,o=t._init;try{// Lazy may contain any component type so we recursively resolve it.
return e(o(i),n,r)}catch(e){}}return""}(e.type,e._source,t?t.type:null);o4.setExtraStackFrame(n)}else o4.setExtraStackFrame(null)}function o8(e,t,n,r,a){// $FlowFixMe This is okay but Flow doesn't know it.
var i=Function.call.bind(eB);for(var o in e)if(i(e,o)){var s=void 0;// Prop type validation may throw. In case they do, we don't want to
// fail the render phase where it didn't fail before. So we log it.
// After these have been cleaned up, we'll let them throw.
try{// This is intentionally an invariant that gets caught. It's the same
// behavior as without this statement except with a better message.
if("function"!=typeof e[o]){// eslint-disable-next-line react-internal/prod-error-codes
var l=Error((r||"React class")+": "+n+" type `"+o+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[o]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw l.name="Invariant Violation",l}s=e[o](t,o,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(e){s=e}!s||s instanceof Error||(o6(a),eL("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,o,typeof s),o6(null)),s instanceof Error&&!(s.message in o5)&&(// Only monitor this failure once because there tends to be a lot of the
// same error.
o5[s.message]=!0,o6(a),eL("Failed %s type: %s",n,s.message),o6(null))}}var o7=[];V=[];var o9=-1;function se(e){return{current:e}}function st(e,t){if(o9<0){eL("Unexpected pop.");return}t!==V[o9]&&eL("Unexpected Fiber popped."),e.current=o7[o9],o7[o9]=null,V[o9]=null,o9--}function sn(e,t,n){o7[++o9]=e.current,V[o9]=n,e.current=t}W={};var sr={};Object.freeze(sr);var sa=se(sr),si=se(!1),so=sr;// A cursor to a boolean indicating whether the context has changed.
function ss(e,t,n){return n&&sd(t)?so:sa.current}function sl(e,t,n){var r=e.stateNode;r.__reactInternalMemoizedUnmaskedChildContext=t,r.__reactInternalMemoizedMaskedChildContext=n}function su(e,t){var n=e.type.contextTypes;if(!n)return sr;// Avoid recreating masked context unless unmasked context has changed.
// Failing to do this will result in unnecessary calls to componentWillReceiveProps.
// This may trigger infinite loops if componentWillReceiveProps calls setState.
var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var a={};for(var i in n)a[i]=t[i];return o8(n,a,"context",tO(e)||"Unknown"),r&&sl(e,t,a),a}function sc(){return si.current}function sd(e){return null!=e.childContextTypes}function sf(e){st(si,e),st(sa,e)}function sp(e){st(si,e),st(sa,e)}function sh(e,t,n){if(sa.current!==sr)throw Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");sn(sa,t,e),sn(si,n,e)}function sm(e,t,n){var r=e.stateNode,a=t.childContextTypes;// It has only been added in Fiber to match the (unintentional) behavior in Stack.
if("function"!=typeof r.getChildContext){var i=tO(e)||"Unknown";return W[i]||(W[i]=!0,eL("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.",i,i)),n}var o=r.getChildContext();for(var s in o)if(!(s in a))throw Error((tO(e)||"Unknown")+'.getChildContext(): key "'+s+'" is not defined in childContextTypes.');return o8(a,o,"child context",tO(e)||"Unknown"),tg({},n,o)}function sv(e){var t=e.stateNode,n=t&&t.__reactInternalMemoizedMergedChildContext||sr;// We push the context as early as possible to ensure stack integrity.
return(// Inherit the parent's did-perform-work value to avoid inadvertently blocking updates.
so=sa.current,sn(sa,n,e),sn(si,si.current,e),!0)}function sg(e,t,n){var r=e.stateNode;if(!r)throw Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");if(n){// Merge parent and own context.
// Skip this if we're not updating due to sCU.
// This avoids unnecessarily recomputing memoized values.
var a=sm(e,t,so);r.__reactInternalMemoizedMergedChildContext=a,// It is important to unwind the context in the reverse order.
st(si,e),st(sa,e),sn(sa,a,e),sn(si,n,e)}else st(si,e),sn(si,n,e)}var sy=null,sb=!1,sw=!1;function s_(e){// Push this callback into an internal queue. We'll flush these either in
// the next tick, or earlier if something calls `flushSyncCallbackQueue`.
null===sy?sy=[e]:// we already scheduled one when we created the queue.
sy.push(e)}function sk(){if(!sw&&null!==sy){// Prevent re-entrance.
sw=!0;var e=0,t=ao;try{var n=sy;// TODO: Is this necessary anymore? The only user code that runs in this
for(ao=1;e<n.length;e++){var r=n[e];do r=r(!0);while(null!==r)}sy=null,sb=!1}catch(t){throw null!==sy&&(sy=sy.slice(e+1)),// Resume flushing in the next tick
rw(rC,sk),t}finally{ao=t,sw=!1}}return null}// TODO: Use the unified fiber stack module instead of this local one?
// Intentionally not using it yet to derisk the initial implementation, because
// the way we push/pop these values is a bit unusual. If there's a mistake, I'd
// rather the ids be wrong than crash the whole reconciler.
var sx=[],sS=0,sE=null,sC=0,sT=[],sO=0,sR=null,sP=1,sI="";function sD(e,t){// This is called right after we reconcile an array (or iterator) of child
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
sU(),sx[sS++]=sC,sx[sS++]=sE,sE=e,sC=t}function sN(e,t,n){sU(),sT[sO++]=sP,sT[sO++]=sI,sT[sO++]=sR,sR=e;var r=sP,a=sI,i=sM(r)-1,o=r&~(1<<i),s=n+1,l=sM(t)+i;// consideration the leading 1 we use to mark the end of the sequence.
if(l>30){// We overflowed the bitwise-safe range. Fall back to slower algorithm.
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
var u=i-i%5,c=(o&(1<<u)-1).toString(32),d=i-u;// Then create a bitmask that selects only those bits.
sP=1<<sM(t)+d|(s<<d|o>>u),sI=c+a}else sP=1<<l|(s<<i|o),sI=a}function sL(e){sU(),null!==e.return&&(sD(e,1),sN(e,1,0))}function sM(e){return 32-rK(e)}function sA(e){// Restore the previous values.
// This is a bit more complicated than other context-like modules in Fiber
// because the same Fiber may appear on the stack multiple times and for
// different reasons. We have to keep popping until the work-in-progress is
// no longer at the top of the stack.
for(;e===sE;)sE=sx[--sS],sx[sS]=null,sC=sx[--sS],sx[sS]=null;for(;e===sR;)sR=sT[--sO],sT[sO]=null,sI=sT[--sO],sT[sO]=null,sP=sT[--sO],sT[sO]=null}function sU(){sj||eL("Expected to be hydrating. This is a bug in React. Please file an issue.")}// This may have been an insertion or a hydration.
var sz=null,sF=null,sj=!1,sq=!1,sB=null;function sV(e,t){switch(e.tag){case 3:var n;n=e.stateNode.containerInfo,1===t.nodeType?oy(n,t):8===t.nodeType||ob(n,t);break;case 5:var r,a,i=(/*                 */1&e.mode)!=/*                         */0;e.type,r=e.memoizedProps,a=e.stateNode,(i||!0!==r[oD])&&(1===t.nodeType?oy(a,t):8===t.nodeType||ob(a,t));break;case 13:var o,s=e.memoizedState;null!==s.dehydrated&&null!==(o=s.dehydrated.parentNode)&&(1===t.nodeType?oy(o,t):8===t.nodeType||ob(o,t))}}function sW(e,t){sV(e,t);var n,r=((n=ph(5,null,null,0)).elementType="DELETED",n);r.stateNode=t,r.return=e;var a=e.deletions;null===a?(e.deletions=[r],e.flags|=/*                */16):a.push(r)}function s$(e,t){if(!sq)switch(e.tag){case 3:var n=e.stateNode.containerInfo;switch(t.tag){case 5:var r=t.type;t.pendingProps,ow(n,r);break;case 6:o_(n,t.pendingProps)}break;case 5:e.type;var a=e.memoizedProps,i=e.stateNode;switch(t.tag){case 5:var o=t.type;t.pendingProps,((1&e.mode)!=0||!0!==a[oD])&&ow(i,o);break;case 6:var s=t.pendingProps;((1&e.mode)!=0||!0!==a[oD])&&o_(i,s)}break;case 13:var l=e.memoizedState.dehydrated;if(null!==l)switch(t.tag){case 5:var u,c=t.type;t.pendingProps,null!==(u=l.parentNode)&&ow(u,c);break;case 6:var d,f=t.pendingProps;null!==(d=l.parentNode)&&o_(d,f)}break;default:return}}function sH(e,t){t.flags=-4097&t.flags|/*                    */2,s$(e,t)}function sY(e,t){switch(e.tag){case 5:var n=e.type;e.pendingProps;var r=1!==t.nodeType||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t;if(null!==r)return e.stateNode=r,sz=e,sF=oW(r.firstChild),!0;return!1;case 6:var a=""===e.pendingProps||3!==t.nodeType?null:t;if(null!==a)return e.stateNode=a,sz=e,sF=null,!0;return!1;case 13:var i=8!==t.nodeType?null:t;if(null!==i){var o,s={dehydrated:i,treeContext:(sU(),null!==sR)?{id:sP,overflow:sI}:null,retryLane:1073741824};e.memoizedState=s;// This simplifies the code for getHostSibling and deleting nodes,
// since it doesn't have to consider all Suspense boundaries and
// check if they're dehydrated ones or not.
var l=((o=ph(18,null,null,0)).stateNode=i,o);return l.return=e,e.child=l,sz=e,// it during the first pass. Instead, we'll reenter it later.
sF=null,!0}return!1;default:return!1}}function sQ(e){return(1&e.mode)!=0&&(/*                   */128&e.flags)==0}function sK(e){throw Error("Hydration failed because the initial UI does not match what was rendered on the server.")}function sG(e){if(sj){var t=sF;if(!t){sQ(e)&&(s$(sz,e),sK()),sH(sz,e),sj=!1,sz=e;return}var n=t;if(!sY(e,t)){sQ(e)&&(s$(sz,e),sK()),// We use this as a heuristic. It's based on intuition and not data so it
// might be flawed or unnecessary.
t=o$(n);var r=sz;if(!t||!sY(e,t)){// Nothing to hydrate. Make it an insertion.
sH(sz,e),sj=!1,sz=e;return}// We matched the next one, we'll now assume that the first one was
// superfluous and we'll delete it. Since we can't eagerly delete it
// we'll have to schedule a deletion. To do that, this node needs a dummy
// fiber associated with it.
sW(r,n)}}}function sX(e){for(var t=e.return;null!==t&&5!==t.tag&&3!==t.tag&&13!==t.tag;)t=t.return;sz=t}function sJ(e){if(e!==sz)// tree.
return!1;if(!sj)return(// If we're not currently hydrating but we're in a hydration context, then
// we were an insertion and now need to pop up reenter hydration of our
// siblings.
sX(e),sj=!0,!1);// If we have any remaining hydratable nodes, we need to delete them now.
// We only do this deeper than head and body since they tend to have random
// other nodes in them. We also ignore components with pure text content in
// side of them. We also don't delete anything inside the root container.
if(3!==e.tag&&(5!==e.tag||"head"!==(t=e.type)&&"body"!==t&&!oM(e.type,e.memoizedProps))){var t,n=sF;if(n){if(sQ(e))sZ(e),sK();else for(;n;)sW(e,n),n=o$(n)}}return sX(e),sF=13===e.tag?function(e){var t=e.memoizedState,n=null!==t?t.dehydrated:null;if(!n)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");return function(e){for(var t=e.nextSibling,n=0;t;){if(8===t.nodeType){var r=t.data;if("/$"===r){if(0===n)return o$(t);n--}else("$"===r||"$!"===r||"$?"===r)&&n++}t=t.nextSibling}// TODO: Warn, we didn't find the end comment boundary.
return null}// Returns the SuspenseInstance if this node is a direct child of a
(n)}(e):sz?o$(e.stateNode):null,!0}function sZ(e){for(var t=sF;t;)sV(e,t),t=o$(t)}function s0(){sz=null,sF=null,sj=!1,sq=!1}function s1(){null!==sB&&(// Successfully completed a forced client render. The errors that occurred
// during the hydration attempt are now recovered. We will log them in
// commit phase, once the entire tree has finished.
fU(sB),sB=null)}function s2(e){null===sB?sB=[e]:sB.push(e)}var s3=eI.ReactCurrentBatchConfig,s5={recordUnsafeLifecycleWarnings:function(e,t){},flushPendingUnsafeLifecycleWarnings:function(){},recordLegacyContextWarning:function(e,t){},flushLegacyContextWarning:function(){},discardPendingWarnings:function(){}},s4=function(e){for(var t=null,n=e;null!==n;)/*               */8&n.mode&&(t=n),n=n.return;return t},s6=function(e){var t=[];return e.forEach(function(e){t.push(e)}),t.sort().join(", ")},s8=[],s7=[],s9=[],le=[],lt=[],ln=[],lr=new Set;s5.recordUnsafeLifecycleWarnings=function(e,t){// Dedupe strategy: Warn once per component.
!lr.has(e.type)&&("function"==typeof t.componentWillMount&&// Don't warn about react-lifecycles-compat polyfilled components.
!0!==t.componentWillMount.__suppressDeprecationWarning&&s8.push(e),8&e.mode&&"function"==typeof t.UNSAFE_componentWillMount&&s7.push(e),"function"==typeof t.componentWillReceiveProps&&!0!==t.componentWillReceiveProps.__suppressDeprecationWarning&&s9.push(e),8&e.mode&&"function"==typeof t.UNSAFE_componentWillReceiveProps&&le.push(e),"function"==typeof t.componentWillUpdate&&!0!==t.componentWillUpdate.__suppressDeprecationWarning&&lt.push(e),8&e.mode&&"function"==typeof t.UNSAFE_componentWillUpdate&&ln.push(e))},s5.flushPendingUnsafeLifecycleWarnings=function(){// We do an initial pass to gather component names
var e=new Set;s8.length>0&&(s8.forEach(function(t){e.add(tO(t)||"Component"),lr.add(t.type)}),s8=[]);var t=new Set;s7.length>0&&(s7.forEach(function(e){t.add(tO(e)||"Component"),lr.add(e.type)}),s7=[]);var n=new Set;s9.length>0&&(s9.forEach(function(e){n.add(tO(e)||"Component"),lr.add(e.type)}),s9=[]);var r=new Set;le.length>0&&(le.forEach(function(e){r.add(tO(e)||"Component"),lr.add(e.type)}),le=[]);var a=new Set;lt.length>0&&(lt.forEach(function(e){a.add(tO(e)||"Component"),lr.add(e.type)}),lt=[]);var i=new Set;ln.length>0&&(ln.forEach(function(e){i.add(tO(e)||"Component"),lr.add(e.type)}),ln=[]),t.size>0&&eL("Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n\nPlease update the following components: %s",s6(t)),r.size>0&&eL("Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n\nPlease update the following components: %s",s6(r)),i.size>0&&eL("Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n\nPlease update the following components: %s",s6(i)),e.size>0&&eN("componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move code with side effects to componentDidMount, and set initial state in the constructor.\n* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",s6(e)),n.size>0&&eN("componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state\n* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",s6(n)),a.size>0&&eN("componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.\n\n* Move data fetching code or side effects to componentDidUpdate.\n* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run `npx react-codemod rename-unsafe-lifecycles` in your project source folder.\n\nPlease update the following components: %s",s6(a))};var la=new Map,li=new Set;// Tracks components we have already warned about.
function lo(e,t){if(e&&e.defaultProps){// Resolve default props. Taken from ReactElement
var n=tg({},t),r=e.defaultProps;for(var a in r)void 0===n[a]&&(n[a]=r[a]);return n}return t}s5.recordLegacyContextWarning=function(e,t){var n=s4(e);if(null===n){eL("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");return}// Dedup strategy: Warn once per component.
if(!li.has(e.type)){var r=la.get(n);(null!=e.type.contextTypes||null!=e.type.childContextTypes||null!==t&&"function"==typeof t.getChildContext)&&(void 0===r&&(r=[],la.set(n,r)),r.push(e))}},s5.flushLegacyContextWarning=function(){la.forEach(function(e,t){if(0!==e.length){var n=e[0],r=new Set;e.forEach(function(e){r.add(tO(e)||"Component"),li.add(e.type)});var a=s6(r);try{tM(n),eL("Legacy context API has been detected within a strict-mode tree.\n\nThe old API will be supported in all 16.x releases, but applications using it should migrate to the new version.\n\nPlease update the following components: %s\n\nLearn more about this warning here: https://reactjs.org/link/legacy-context",a)}finally{tL()}}})},s5.discardPendingWarnings=function(){s8=[],s7=[],s9=[],le=[],lt=[],ln=[],la=new Map};var ls=se(null);// Use this to detect multiple renderers using the same context
$={};var ll=null,lu=null,lc=null,ld=!1;function lf(){// This is called right before React yields execution, to ensure `readContext`
// cannot be called outside the render phase.
ll=null,lu=null,lc=null,ld=!1}function lp(e,t,n){sn(ls,t._currentValue,e),t._currentValue=n,void 0!==t._currentRenderer&&null!==t._currentRenderer&&t._currentRenderer!==$&&eL("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."),t._currentRenderer=$}function lh(e,t){var n=ls.current;st(ls,t),e._currentValue=n}function lm(e,t,n){for(// Update the child lanes of all the ancestors, including the alternates.
var r=e;null!==r;){var a=r.alternate;if((r.childLanes&t)===t?null!==a&&(a.childLanes&t)!==t&&(a.childLanes=a.childLanes|t):(r.childLanes=r.childLanes|t,null!==a&&(a.childLanes=a.childLanes|t)),r===n)break;r=r.return}r!==n&&eL("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.")}function lv(e,t){ll=e,lu=null,lc=null;var n=e.dependencies;null!==n&&null!==n.firstContext&&((n.lanes&t)!=0&&(c$=!0),// Reset the work-in-progress list
n.firstContext=null)}function lg(e){// This warning would fire if you read context inside a Hook like useMemo.
// Unlike the class check below, it's not enforced in production for perf.
ld&&eL("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");var t=e._currentValue;if(lc===e);else{var n={context:e,memoizedValue:t,next:null};if(null===lu){if(null===ll)throw Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");// This is the first dependency for this component. Create a new list.
lu=n,ll.dependencies={lanes:0,firstContext:n}}else lu=lu.next=n}return t}// render. When this render exits, either because it finishes or because it is
// interrupted, the interleaved updates will be transferred onto the main part
// of the queue.
var ly=null;function lb(e){null===ly?ly=[e]:ly.push(e)}function lw(e,t,n,r){var a=t.interleaved;return null===a?(// This is the first update. Create a circular list.
n.next=n,// be transferred to the pending queue.
lb(t)):(n.next=a.next,a.next=n),t.interleaved=n,l_(e,r)}function l_(e,t){// Update the source fiber's lanes
e.lanes=e.lanes|t;var n=e.alternate;null!==n&&(n.lanes=n.lanes|t),null===n&&(4098&e.flags)!=0&&pe(e);for(var r=e,a=e.return;null!==a;)(a.childLanes=a.childLanes|t,null!==(n=a.alternate))?n.childLanes=n.childLanes|t:(4098&a.flags)!=0&&pe(e),r=a,a=a.return;return 3===r.tag?r.stateNode:null}var lk=!1;function lx(e){var t={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null};e.updateQueue=t}function lS(e,t){// Clone the update queue from current. Unless it's already a clone.
var n=t.updateQueue,r=e.updateQueue;if(n===r){var a={baseState:r.baseState,firstBaseUpdate:r.firstBaseUpdate,lastBaseUpdate:r.lastBaseUpdate,shared:r.shared,effects:r.effects};t.updateQueue=a}}function lE(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function lC(e,t,n){var r,a=e.updateQueue;if(null===a)return null;var i=a.shared;if(Y!==i||H||(eL("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."),H=!0),(/*                */2&d6)!=/*             */0){// This is an unsafe render phase update. Add directly to the update
// queue so we can process it immediately during the current render.
var o=i.pending;// this fiber. This is for backwards compatibility in the case where you
// update a different component during render phase than the one that is
// currently renderings (a pattern that is accompanied by a warning).
return null===o?t.next=t:(t.next=o.next,o.next=t),i.pending=t,l_(e,n)}return null===(r=i.interleaved)?(// This is the first update. Create a circular list.
t.next=t,// be transferred to the pending queue.
lb(i)):(t.next=r.next,r.next=t),i.interleaved=t,l_(e,n)}function lT(e,t,n){var r=t.updateQueue;if(null!==r){var a=r.shared;if(r6(n)){var i=a.lanes,o=// have finished. We can remove them from the shared queue, which represents
// a superset of the actually pending lanes. In some cases we may entangle
// more than we need to, but that's OK. In fact it's worse if we *don't*
// entangle when we should.
(i&=e.pendingLanes)|n;// If any entangled lanes are no longer pending on the root, then they must
a.lanes=o,// the lane finished since the last time we entangled it. So we need to
// entangle it again, just to be sure.
ar(e,o)}}}function lO(e,t){// Captured updates are updates that are thrown by a child during the render
// phase. They should be discarded if the render is aborted. Therefore,
// we should only put them on the work-in-progress queue, not the current one.
var n=e.updateQueue,r=e.alternate;// Check if the work-in-progress queue is a clone.
if(null!==r){var a=r.updateQueue;if(n===a){// The work-in-progress queue is the same as current. This happens when
// we bail out on a parent fiber that then captures an error thrown by
// a child. Since we want to append the update only to the work-in
// -progress queue, we need to clone the updates. We usually clone during
// processUpdateQueue, but that didn't happen in this case because we
// skipped over the parent when we bailed out.
var i=null,o=null,s=n.firstBaseUpdate;if(null!==s){// Loop through the updates and clone them.
var l=s;do{var u={eventTime:l.eventTime,lane:l.lane,tag:l.tag,payload:l.payload,callback:l.callback,next:null};null===o?i=o=u:(o.next=u,o=u),l=l.next}while(null!==l)// Append the captured update the end of the cloned list.
null===o?i=o=t:(o.next=t,o=t)}else i=o=t;n={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:o,shared:a.shared,effects:a.effects},e.updateQueue=n;return}}// Append the update to the end of the list.
var c=n.lastBaseUpdate;null===c?n.firstBaseUpdate=t:c.next=t,n.lastBaseUpdate=t}function lR(e,t,n,r){// This is always non-null on a ClassComponent or HostRoot
var a=e.updateQueue;lk=!1,Y=a.shared;var i=a.firstBaseUpdate,o=a.lastBaseUpdate,s=a.shared.pending;if(null!==s){a.shared.pending=null;// and last so that it's non-circular.
var l=s,u=l.next;l.next=null,null===o?i=u:o.next=u,o=l;// we need to transfer the updates to that queue, too. Because the base
// queue is a singly-linked list with no cycles, we can append to both
// lists and take advantage of structural sharing.
// TODO: Pass `current` as argument
var c=e.alternate;if(null!==c){// This is always non-null on a ClassComponent or HostRoot
var d=c.updateQueue,f=d.lastBaseUpdate;f!==o&&(null===f?d.firstBaseUpdate=u:f.next=u,d.lastBaseUpdate=l)}}// These values may change as we process the queue.
if(null!==i){for(// Iterate through the list of updates to compute the result.
var p,h=a.baseState,m=0,v=null,g=null,y=null,b=i;;){var w=b.lane,_=b.eventTime;if((r&w)===w){// This update does have sufficient priority.
if(null!==y){var k={eventTime:_,// This update is going to be committed so we never want uncommit
// it. Using NoLane works because 0 is a subset of all bitmasks, so
// this will never be skipped by the check above.
lane:0,tag:b.tag,payload:b.payload,callback:b.callback,next:null};y=y.next=k}// Process this update.
if(h=function(e,t,n,r,a,i){switch(n.tag){case 1:var o=n.payload;if("function"==typeof o){ld=!0;var s=o.call(i,r,a);if(8&e.mode){rz(!0);try{o.call(i,r,a)}finally{rz(!1)}}return ld=!1,s}// State object
return o;case 3:e.flags=-65537&e.flags|128;// Intentional fallthrough
case 0:var l,u=n.payload;if("function"==typeof u){if(ld=!0,l=u.call(i,r,a),8&e.mode){rz(!0);try{u.call(i,r,a)}finally{rz(!1)}}ld=!1}else l=u;if(null==l)break;// Merge the partial state and the previous state.
return tg({},r,l);case 2:lk=!0}return r}(e,0,b,h,t,n),null!==b.callback&&// If the update was already committed, we should not queue its
// callback again.
0!==b.lane){e.flags|=/*                     */64;var x=a.effects;null===x?a.effects=[b]:x.push(b)}}else{// Priority is insufficient. Skip this update. If this is the first
// skipped update, the previous update/state is the new base
// update/state.
var S={eventTime:_,lane:w,tag:b.tag,payload:b.payload,callback:b.callback,next:null};null===y?(g=y=S,v=h):y=y.next=S,// Update the remaining priority in the queue.
m|=w}if(null===(b=b.next)){if(null===(s=a.shared.pending))break;// An update was scheduled from inside a reducer. Add the new
// pending updates to the end of the list and keep processing.
var E=s,C=E.next;// Intentionally unsound. Pending updates form a circular list, but we
E.next=null,b=C,a.lastBaseUpdate=E,a.shared.pending=null}}null===y&&(v=h),a.baseState=v,a.firstBaseUpdate=g,a.lastBaseUpdate=y;// process them during this render, but we do need to track which lanes
// are remaining.
var T=a.shared.interleaved;if(null!==T){var O=T;do m|=O.lane,O=O.next;while(O!==T)}else null===i&&// zero once the queue is empty.
(a.shared.lanes=0);fi|=p=m,e.lanes=m,e.memoizedState=h}Y=null}function lP(e,t,n){// Commit the effects
var r=t.effects;if(t.effects=null,null!==r)for(var a=0;a<r.length;a++){var i=r[a],o=i.callback;null!==o&&(i.callback=null,function(e,t){if("function"!=typeof e)throw Error("Invalid argument passed as callback. Expected a function. Instead received: "+e);e.call(t)}(o,n))}}H=!1,Y=null;var lI={},lD=new eR.Component().refs;// React.Component uses a shared frozen object by default.
Q=new Set,K=new Set,G=new Set,X=new Set,et=new Set,J=new Set,en=new Set,er=new Set;var lN=new Set;function lL(e,t,n,r){var a=e.memoizedState,i=n(r,a);if(8&e.mode){rz(!0);try{// Invoke the function an extra time to help detect side-effects.
i=n(r,a)}finally{rz(!1)}}Z(t,i);var o=null==i?a:tg({},a,i);e.memoizedState=o,0===e.lanes&&(e.updateQueue.baseState=o)}ee=function(e,t){if(null!==e&&"function"!=typeof e){var n=t+"_"+e;lN.has(n)||(lN.add(n),eL("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",t,e))}},Z=function(e,t){if(void 0===t){var n=tC(e)||"Component";J.has(n)||(J.add(n),eL("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.",n))}},// it causes problems. This is meant to give a nicer error message for
// ReactDOM15.unstable_renderSubtreeIntoContainer(reactDOM16Component,
// ...)) which otherwise throws a "_processChildContext is not a function"
// exception.
Object.defineProperty(lI,"_processChildContext",{enumerable:!1,value:function(){throw Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).")}}),Object.freeze(lI);var lM={isMounted:function(e){var t=rp.current;if(null!==t&&1===t.tag){var n=t.stateNode;n._warnedAboutRefsInRender||eL("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",tO(t)||"A component"),n._warnedAboutRefsInRender=!0}var r=rf(e);return!!r&&rh(r)===r},enqueueSetState:function(e,t,n){var r=rf(e),a=fI(),i=fD(r),o=lE(a,i);o.payload=t,null!=n&&(ee(n,"setState"),o.callback=n);var s=lC(r,o,i);null!==s&&(fN(s,r,i,a),lT(s,r,i)),rQ(r,i)},enqueueReplaceState:function(e,t,n){var r=rf(e),a=fI(),i=fD(r),o=lE(a,i);o.tag=1,o.payload=t,null!=n&&(ee(n,"replaceState"),o.callback=n);var s=lC(r,o,i);null!==s&&(fN(s,r,i,a),lT(s,r,i)),rQ(r,i)},enqueueForceUpdate:function(e,t){var n=rf(e),r=fI(),a=fD(n),i=lE(r,a);i.tag=2,null!=t&&(ee(t,"forceUpdate"),i.callback=t);var o=lC(n,i,a);null!==o&&(fN(o,n,a,r),lT(o,n,a)),null!==rM&&"function"==typeof rM.markForceUpdateScheduled&&rM.markForceUpdateScheduled(n,a)}};function lA(e,t,n,r,a,i,o){var s=e.stateNode;if("function"==typeof s.shouldComponentUpdate){var l=s.shouldComponentUpdate(r,i,o);if(8&e.mode){rz(!0);try{// Invoke the function an extra time to help detect side-effects.
l=s.shouldComponentUpdate(r,i,o)}finally{rz(!1)}}return void 0===l&&eL("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.",tC(t)||"Component"),l}return!t.prototype||!t.prototype.isPureReactComponent||!iO(n,r)||!iO(a,i)}function lU(e,t){t.updater=lM,e.stateNode=t,t._reactInternals=e,t._reactInternalInstance=lI}function lz(e,t,n){var r=!1,a=sr,i=sr,o=t.contextType;if("contextType"in t&&!(null===o||void 0!==o&&o.$$typeof===tl&&void 0===o._context)&&!er.has(t)){er.add(t);var s="";s=void 0===o?" However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file.":"object"!=typeof o?" However, it is set to a "+typeof o+".":o.$$typeof===ts?" Did you accidentally pass the Context.Provider instead?":void 0!==o._context?" Did you accidentally pass the Context.Consumer instead?":" However, it is set to an object with keys {"+Object.keys(o).join(", ")+"}.",eL("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s",tC(t)||"Component",s)}"object"==typeof o&&null!==o?i=lg(o):(a=ss(e,t,!0),i=(r=null!=t.contextTypes)?su(e,a):sr);var l=new t(n,i);// Instantiate twice to help detect side-effects.
if(8&e.mode){rz(!0);try{l=new t(n,i);// eslint-disable-line no-new
}finally{rz(!1)}}var u=e.memoizedState=null!==l.state&&void 0!==l.state?l.state:null;if(lU(e,l),"function"==typeof t.getDerivedStateFromProps&&null===u){var c=tC(t)||"Component";K.has(c)||(K.add(c),eL("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.",c,null===l.state?"null":"undefined",c))}// If new component APIs are defined, "unsafe" lifecycles won't be called.
// Warn about these lifecycles if they are present.
// Don't warn about react-lifecycles-compat polyfilled methods though.
if("function"==typeof t.getDerivedStateFromProps||"function"==typeof l.getSnapshotBeforeUpdate){var d=null,f=null,p=null;if("function"==typeof l.componentWillMount&&!0!==l.componentWillMount.__suppressDeprecationWarning?d="componentWillMount":"function"==typeof l.UNSAFE_componentWillMount&&(d="UNSAFE_componentWillMount"),"function"==typeof l.componentWillReceiveProps&&!0!==l.componentWillReceiveProps.__suppressDeprecationWarning?f="componentWillReceiveProps":"function"==typeof l.UNSAFE_componentWillReceiveProps&&(f="UNSAFE_componentWillReceiveProps"),"function"==typeof l.componentWillUpdate&&!0!==l.componentWillUpdate.__suppressDeprecationWarning?p="componentWillUpdate":"function"==typeof l.UNSAFE_componentWillUpdate&&(p="UNSAFE_componentWillUpdate"),null!==d||null!==f||null!==p){var h=tC(t)||"Component",m="function"==typeof t.getDerivedStateFromProps?"getDerivedStateFromProps()":"getSnapshotBeforeUpdate()";X.has(h)||(X.add(h),eL("Unsafe legacy lifecycles will not be called for components using new component APIs.\n\n%s uses %s but also contains the following legacy lifecycles:%s%s%s\n\nThe above lifecycles should be removed. Learn more about this warning here:\nhttps://reactjs.org/link/unsafe-component-lifecycles",h,m,null!==d?"\n  "+d:"",null!==f?"\n  "+f:"",null!==p?"\n  "+p:""))}}return r&&sl(e,a,i),l}function lF(e,t,n,r){var a=t.state;if("function"==typeof t.componentWillReceiveProps&&t.componentWillReceiveProps(n,r),"function"==typeof t.UNSAFE_componentWillReceiveProps&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==a){var i=tO(e)||"Component";Q.has(i)||(Q.add(i),eL("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",i)),lM.enqueueReplaceState(t,t.state,null)}}// Invokes the mount life-cycles on a previously never rendered instance.
function lj(e,t,n,r){a=e.stateNode,i=tC(t)||"Component",a.render||(t.prototype&&"function"==typeof t.prototype.render?eL("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?",i):eL("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.",i)),!a.getInitialState||a.getInitialState.isReactClassApproved||a.state||eL("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?",i),a.getDefaultProps&&!a.getDefaultProps.isReactClassApproved&&eL("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.",i),a.propTypes&&eL("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.",i),a.contextType&&eL("contextType was defined as an instance property on %s. Use a static property to define contextType instead.",i),a.contextTypes&&eL("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.",i),t.contextType&&t.contextTypes&&!en.has(t)&&(en.add(t),eL("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.",i)),"function"==typeof a.componentShouldUpdate&&eL("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.",i),t.prototype&&t.prototype.isPureReactComponent&&void 0!==a.shouldComponentUpdate&&eL("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.",tC(t)||"A pure component"),"function"==typeof a.componentDidUnmount&&eL("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?",i),"function"==typeof a.componentDidReceiveProps&&eL("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().",i),"function"==typeof a.componentWillRecieveProps&&eL("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?",i),"function"==typeof a.UNSAFE_componentWillRecieveProps&&eL("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?",i),o=a.props!==n,void 0!==a.props&&o&&eL("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.",i,i),a.defaultProps&&eL("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.",i,i),"function"!=typeof a.getSnapshotBeforeUpdate||"function"==typeof a.componentDidUpdate||G.has(t)||(G.add(t),eL("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.",tC(t))),"function"==typeof a.getDerivedStateFromProps&&eL("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.",i),"function"==typeof a.getDerivedStateFromError&&eL("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.",i),"function"==typeof t.getSnapshotBeforeUpdate&&eL("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.",i),(s=a.state)&&("object"!=typeof s||t4(s))&&eL("%s.state: must be set to an object or null",i),"function"==typeof a.getChildContext&&"object"!=typeof t.childContextTypes&&eL("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().",i);var a,i,o,s,l,u,c=e.stateNode;c.props=n,c.state=e.memoizedState,c.refs=lD,lx(e);var d=t.contextType;if("object"==typeof d&&null!==d)c.context=lg(d);else{var f=ss(e,t,!0);c.context=su(e,f)}if(c.state===n){var p=tC(t)||"Component";et.has(p)||(et.add(p),eL("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.",p))}8&e.mode&&s5.recordLegacyContextWarning(e,c),s5.recordUnsafeLifecycleWarnings(e,c),c.state=e.memoizedState;var h=t.getDerivedStateFromProps;"function"==typeof h&&(lL(e,t,h,n),c.state=e.memoizedState),"function"!=typeof t.getDerivedStateFromProps&&"function"!=typeof c.getSnapshotBeforeUpdate&&("function"==typeof c.UNSAFE_componentWillMount||"function"==typeof c.componentWillMount)&&(l=c.state,"function"==typeof c.componentWillMount&&c.componentWillMount(),"function"==typeof c.UNSAFE_componentWillMount&&c.UNSAFE_componentWillMount(),l!==c.state&&(eL("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.",tO(e)||"Component"),lM.enqueueReplaceState(c,c.state,null)),// process them now.
lR(e,n,c,r),c.state=e.memoizedState),"function"==typeof c.componentDidMount&&(u=4194308,(/*              */16&e.mode)!=0&&(u|=/*               */16777216),e.flags|=u)}var lq=function(e,t){};function lB(e,t,n){var r=n.ref;if(null!==r&&"function"!=typeof r&&"object"!=typeof r){// TODO: Clean this up once we turn on the string ref warning for
// everyone, because the strict mode case will no longer be relevant
if(8&e.mode&&// We warn in ReactElement.js if owner and self are equal for string refs
// because these cannot be automatically converted to an arrow function
// using a codemod. Therefore, we don't have to warn about string refs again.
!(n._owner&&n._self&&n._owner.stateNode!==n._self)){var a=tO(e)||"Component";eo[a]||(eL('A string ref, "%s", has been found within a strict mode tree. String refs are a source of potential bugs and should be avoided. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',r),eo[a]=!0)}if(n._owner){var i,o=n._owner;if(o){if(1!==o.tag)throw Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");i=o.stateNode}if(!i)throw Error("Missing owner for string ref "+r+". This error is likely caused by a bug in React. Please file an issue.");// Assigning this to a const so Flow knows it won't change in the closure
var s=i;eW(r)&&eL("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.","ref",eV(r));var l=""+r;// Check if previous string ref matches new string ref
if(null!==t&&null!==t.ref&&"function"==typeof t.ref&&t.ref._stringRef===l)return t.ref;var u=function(e){var t=s.refs;t===lD&&(t=s.refs={}),null===e?delete t[l]:t[l]=e};return u._stringRef=l,u}if("string"!=typeof r)throw Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");if(!n._owner)throw Error("Element ref was specified as a string ("+r+") but no owner was set. This could happen for one of the following reasons:\n1. You may be adding a ref to a function component\n2. You may be adding a ref to a component that was not created inside a component's render method\n3. You have multiple copies of React loaded\nSee https://reactjs.org/link/refs-must-have-owner for more information.")}return r}function lV(e,t){var n=Object.prototype.toString.call(t);throw Error("Objects are not valid as a React child (found: "+("[object Object]"===n?"object with keys {"+Object.keys(t).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.")}function lW(e){var t=tO(e)||"Component";el[t]||(el[t]=!0,eL("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it."))}function l$(e){var t=e._payload;return(0,e._init)(t)}// This wrapper function exists because I expect to clone the code in each path
// to be able to optimize each path individually by branching early. This needs
// a compiler or we can do it manually. Helpers that don't need this branching
// live outside of this function.
function lH(e){function t(t,n){if(e){var r=t.deletions;null===r?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(// TODO: For the shouldClone case, this could be micro-optimized a bit by
// assuming that after the first child we've already added everything.
var a=r;null!==a;)t(n,a),a=a.sibling;return null}function r(e,t){for(// Add the remaining children to a temporary map so that we can find them by
// keys quickly. Implicit (null) keys get added to this set with their index
// instead.
var n=new Map,r=t;null!==r;)null!==r.key?n.set(r.key,r):n.set(r.index,r),r=r.sibling;return n}function a(e,t){// We currently set sibling to null and index to 0 here because it is easy
// to forget to do before returning it. E.g. for the single child case.
var n=pv(e,t);return n.index=0,n.sibling=null,n}function i(t,n,r){if(t.index=r,!e)return(// During hydration, the useId algorithm needs to know which fibers are
// part of a list of children (arrays, iterators).
t.flags|=/*                       */1048576,n);var a=t.alternate;if(null===a)return(// This is an insertion.
t.flags|=2,n);var i=a.index;return i<n?(// This is a move.
t.flags|=2,n):i}function o(t){return e&&null===t.alternate&&(t.flags|=2),t}function s(e,t,n,r){if(null===t||6!==t.tag){// Insert
var i=p_(n,e.mode,r);return i.return=e,i}// Update
var o=a(t,n);return o.return=e,o}function l(e,t,n,r){var i=n.type;if(i===ta)return c(e,t,n.props.children,r,n.key);if(null!==t&&(t.elementType===i||pd(t,n)||// Lazy types should reconcile their resolved type.
// We need to do this after the Hot Reloading check above,
// because hot reloading has different semantics than prod because
// it doesn't resuspend. So we can't let the call below suspend.
"object"==typeof i&&null!==i&&i.$$typeof===tp&&l$(i)===t.type)){// Move based on index
var o=a(t,n.props);return o.ref=lB(e,t,n),o.return=e,o._debugSource=n._source,o._debugOwner=n._owner,o}// Insert
var s=py(n,e.mode,r);return s.ref=lB(e,t,n),s.return=e,s}function u(e,t,n,r){if(null===t||4!==t.tag||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation){// Insert
var i=pk(n,e.mode,r);return i.return=e,i}// Update
var o=a(t,n.children||[]);return o.return=e,o}function c(e,t,n,r,i){if(null===t||7!==t.tag){// Insert
var o=pb(n,e.mode,r,i);return o.return=e,o}// Update
var s=a(t,n);return s.return=e,s}function d(e,t,n){if("string"==typeof t&&""!==t||"number"==typeof t){// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
var r=p_(""+t,e.mode,n);return r.return=e,r}if("object"==typeof t&&null!==t){switch(t.$$typeof){case tn:var a=py(t,e.mode,n);return a.ref=lB(e,null,t),a.return=e,a;case tr:var i=pk(t,e.mode,n);return i.return=e,i;case tp:var o=t._payload;return d(e,(0,t._init)(o),n)}if(t4(t)||tv(t)){var s=pb(t,e.mode,n,null);return s.return=e,s}lV(e,t)}return"function"==typeof t&&lW(e),null}function f(e,t,n,r){// Update the fiber if the keys match, otherwise return null.
var a=null!==t?t.key:null;if("string"==typeof n&&""!==n||"number"==typeof n)return(// Text nodes don't have keys. If the previous node is implicitly keyed
// we can continue to replace it without aborting even if it is not a text
// node.
null!==a?null:s(e,t,""+n,r));if("object"==typeof n&&null!==n){switch(n.$$typeof){case tn:if(n.key===a)return l(e,t,n,r);return null;case tr:if(n.key===a)return u(e,t,n,r);return null;case tp:var i=n._payload;return f(e,t,(0,n._init)(i),r)}if(t4(n)||tv(n))return null!==a?null:c(e,t,n,r,null);lV(e,n)}return"function"==typeof n&&lW(e),null}function p(e,t,n,r,a){if("string"==typeof r&&""!==r||"number"==typeof r)return s(t,e.get(n)||null,""+r,a);if("object"==typeof r&&null!==r){switch(r.$$typeof){case tn:return l(t,e.get(null===r.key?n:r.key)||null,r,a);case tr:return u(t,e.get(null===r.key?n:r.key)||null,r,a);case tp:var i=r._payload;return p(e,t,n,(0,r._init)(i),a)}if(t4(r)||tv(r))return c(t,e.get(n)||null,r,a,null);lV(t,r)}return"function"==typeof r&&lW(t),null}/**
   * Warns if there is a duplicate or missing key
   */function h(e,t,n){if("object"!=typeof e||null===e)return t;switch(e.$$typeof){case tn:case tr:lq(e,n);var r=e.key;if("string"!=typeof r)break;if(null===t){(t=new Set).add(r);break}if(!t.has(r)){t.add(r);break}eL("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.",r);break;case tp:var a=e._payload;h((0,e._init)(a),t,n)}return t}return(// itself. They will be added to the side-effect list as we pass through the
// children and the parent.
function s(l,u,c,m){// Handle object types
if("object"==typeof c&&null!==c&&c.type===ta&&null===c.key&&(c=c.props.children),"object"==typeof c&&null!==c){switch(c.$$typeof){case tn:return o(function(e,r,i,o){for(var s=i.key,l=r;null!==l;){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(l.key===s){var u=i.type;if(u===ta){if(7===l.tag){n(e,l.sibling);var c=a(l,i.props.children);return c.return=e,c._debugSource=i._source,c._debugOwner=i._owner,c}}else if(l.elementType===u||pd(l,i)||// Lazy types should reconcile their resolved type.
// We need to do this after the Hot Reloading check above,
// because hot reloading has different semantics than prod because
// it doesn't resuspend. So we can't let the call below suspend.
"object"==typeof u&&null!==u&&u.$$typeof===tp&&l$(u)===l.type){n(e,l.sibling);var d=a(l,i.props);return d.ref=lB(e,l,i),d.return=e,d._debugSource=i._source,d._debugOwner=i._owner,d}// Didn't match.
n(e,l);break}t(e,l),l=l.sibling}if(i.type===ta){var f=pb(i.props.children,e.mode,o,i.key);return f.return=e,f}var p=py(i,e.mode,o);return p.ref=lB(e,r,i),p.return=e,p}(l,u,c,m));case tr:return o(function(e,r,i,o){for(var s=i.key,l=r;null!==l;){// TODO: If key === null and child.key === null, then this only applies to
// the first item in the list.
if(l.key===s){if(4===l.tag&&l.stateNode.containerInfo===i.containerInfo&&l.stateNode.implementation===i.implementation){n(e,l.sibling);var u=a(l,i.children||[]);return u.return=e,u}n(e,l);break}t(e,l),l=l.sibling}var c=pk(i,e.mode,o);return c.return=e,c}// This API will tag the children with the side-effect of the reconciliation
(l,u,c,m));case tp:var v=c._payload;return s(l,u,(0,c._init)(v),m)}if(t4(c))return function(a,o,s,l){for(var u=null,c=0;c<s.length;c++)u=h(s[c],u,a);for(// First, validate keys.
var m=null,v=null,g=o,y=0,b=0,w=null;null!==g&&b<s.length;b++){g.index>b?(w=g,g=null):w=g.sibling;var _=f(a,g,s[b],l);if(null===_){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
null===g&&(g=w);break}e&&g&&null===_.alternate&&// need to delete the existing child.
t(a,g),y=i(_,y,b),null===v?m=_:// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
v.sibling=_,v=_,g=w}if(b===s.length)return(// We've reached the end of the new children. We can delete the rest.
n(a,g),sj&&sD(a,b),m);if(null===g){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;b<s.length;b++){var k=d(a,s[b],l);null!==k&&(y=i(k,y,b),null===v?m=k:v.sibling=k,v=k)}return sj&&sD(a,b),m}// Add all children to a key map for quick lookups.
for(var x=r(a,g);b<s.length;b++){var S=p(x,a,b,s[b],l);null!==S&&(e&&null!==S.alternate&&// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
x.delete(null===S.key?b:S.key),y=i(S,y,b),null===v?m=S:v.sibling=S,v=S)}return e&&// to add them to the deletion list.
x.forEach(function(e){return t(a,e)}),sj&&sD(a,b),m}(l,u,c,m);if(tv(c))return function(a,o,s,l){// This is the same implementation as reconcileChildrenArray(),
// but using the iterator instead.
var u=tv(s);if("function"!=typeof u)throw Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");"function"==typeof Symbol&&// $FlowFixMe Flow doesn't know about toStringTag
"Generator"===s[Symbol.toStringTag]&&(ei||eL("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."),ei=!0),s.entries===u&&(ea||eL("Using Maps as children is not supported. Use an array of keyed ReactElements instead."),ea=!0);// We'll get a different iterator later for the main pass.
var c=u.call(s);if(c)for(var m=null,v=c.next();!v.done;v=c.next())m=h(v.value,m,a);var g=u.call(s);if(null==g)throw Error("An iterable object provided no iterator.");for(var y=null,b=null,w=o,_=0,k=0,x=null,S=g.next();null!==w&&!S.done;k++,S=g.next()){w.index>k?(x=w,w=null):x=w.sibling;var E=f(a,w,S.value,l);if(null===E){// TODO: This breaks on empty slots like null children. That's
// unfortunate because it triggers the slow path all the time. We need
// a better way to communicate whether this was a miss or null,
// boolean, undefined, etc.
null===w&&(w=x);break}e&&w&&null===E.alternate&&// need to delete the existing child.
t(a,w),_=i(E,_,k),null===b?y=E:// I.e. if we had null values before, then we want to defer this
// for each null value. However, we also don't want to call updateSlot
// with the previous one.
b.sibling=E,b=E,w=x}if(S.done)return(// We've reached the end of the new children. We can delete the rest.
n(a,w),sj&&sD(a,k),y);if(null===w){// If we don't have any more existing children we can choose a fast path
// since the rest will all be insertions.
for(;!S.done;k++,S=g.next()){var C=d(a,S.value,l);null!==C&&(_=i(C,_,k),null===b?y=C:b.sibling=C,b=C)}return sj&&sD(a,k),y}// Add all children to a key map for quick lookups.
for(var T=r(a,w);!S.done;k++,S=g.next()){var O=p(T,a,k,S.value,l);null!==O&&(e&&null!==O.alternate&&// current, that means that we reused the fiber. We need to delete
// it from the child list so that we don't add it to the deletion
// list.
T.delete(null===O.key?k:O.key),_=i(O,_,k),null===b?y=O:b.sibling=O,b=O)}return e&&// to add them to the deletion list.
T.forEach(function(e){return t(a,e)}),sj&&sD(a,k),y}(l,u,c,m);lV(l,c)}return"string"==typeof c&&""!==c||"number"==typeof c?o(function(e,t,r,i){// There's no need to check for keys on text nodes since we don't have a
// way to define them.
if(null!==t&&6===t.tag){// We already have an existing node so let's just update it and delete
// the rest.
n(e,t.sibling);var o=a(t,r);return o.return=e,o}// The existing first child is not a text node so we need to create one
// and delete the existing ones.
n(e,t);var s=p_(r,e.mode,i);return s.return=e,s}(l,u,""+c,m)):("function"==typeof c&&lW(l),n(l,u))})}ea=!1,ei=!1,eo={},/**
   * Warn if there's no key explicitly set on dynamic arrays of children or
   * object keys are not valid. This allows us to keep track of children between
   * updates.
   */es={},el={},lq=function(e,t){if(null!==e&&"object"==typeof e&&e._store&&!e._store.validated&&null==e.key){if("object"!=typeof e._store)throw Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");e._store.validated=!0;var n=tO(t)||"Component";es[n]||(es[n]=!0,eL('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'))}};var lY=lH(!0),lQ=lH(!1),lK={},lG=se(lK),lX=se(lK),lJ=se(lK);function lZ(e){if(e===lK)throw Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");return e}function l0(){return lZ(lJ.current)}function l1(e,t){// Push current root instance onto the stack;
// This allows us to reset root when portals are popped.
sn(lJ,t,e),// This enables us to pop only Fibers that provide unique contexts.
sn(lX,e,e),// However, we can't just call getRootHostContext() and push it because
// we'd have a different number of entries on the stack depending on
// whether getRootHostContext() throws somewhere in renderer code or not.
// So we push an empty value first. This lets us safely unwind on errors.
sn(lG,lK,e);var n=function(e){var t,n,r=e.nodeType;switch(r){case 9:case 11:t=9===r?"#document":"#fragment";var a=e.documentElement;n=a?a.namespaceURI:nu(null,"");break;default:var i=8===r?e.parentNode:e;n=nu(i.namespaceURI||null,t=i.tagName)}var o=t.toLowerCase();return{namespace:n,ancestorInfo:ox(null,o)}}(t);// Now that we know this function doesn't throw, replace it.
st(lG,e),sn(lG,n,e)}function l2(e){st(lG,e),st(lX,e),st(lJ,e)}function l3(){return lZ(lG.current)}function l5(e){lZ(lJ.current);var t,n=lZ(lG.current),r=(t=e.type,{namespace:nu(n.namespace,t),ancestorInfo:ox(n.ancestorInfo,t)});n!==r&&(// Track the context and the Fiber that provided it.
// This enables us to pop only Fibers that provide unique contexts.
sn(lX,e,e),sn(lG,r,e))}function l4(e){// Do not pop unless this Fiber provided the current context.
// pushHostContext() only pushes Fibers that provide unique contexts.
lX.current===e&&(st(lG,e),st(lX,e))}var l6=se(0);function l8(e,t){sn(l6,t,e)}function l7(e){for(var t=e;null!==t;){if(13===t.tag){var n=t.memoizedState;if(null!==n){var r=n.dehydrated;if(null===r||oB(r)||oV(r))return t}}else if(19===t.tag&&// revealOrder undefined can't be trusted because it don't
// keep track of whether it suspended or not.
void 0!==t.memoizedProps.revealOrder){if((128&t.flags)!=0)return t}else if(null!==t.child){t.child.return=t,t=t.child;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}// and should be reset before starting a new render.
// This tracks which mutable sources need to be reset after a render.
var l9=[];function ue(){for(var e=0;e<l9.length;e++)l9[e]._workInProgressVersionPrimary=null;l9.length=0}var ut=eI.ReactCurrentDispatcher,un=eI.ReactCurrentBatchConfig;eu=new Set;// These are set right before calling the component.
var ur=0,ua=null,ui=null,uo=null,us=!1,ul=!1,uu=0,uc=0,ud=null,uf=null,up=-1,uh=!1;// The work-in-progress fiber. I've named it differently to distinguish it from
function um(){var e=ud;null===uf?uf=[e]:uf.push(e)}function uv(){var e=ud;null!==uf&&uf[++up]!==e&&function(e){var t=tO(ua);if(!eu.has(t)&&(eu.add(t),null!==uf)){for(var n="",r=0;r<=up;r++){// lol @ IE not supporting String#repeat
for(var a=uf[r],i=r===up?e:a,o=r+1+". "+a;o.length<30;)o+=" ";o+=i+"\n",n+=o}eL("React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks\n\n   Previous render            Next render\n   ------------------------------------------------------\n%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n",t,n)}}(e)}function ug(e){null==e||t4(e)||// It's unlikely their type would change as usually you define them inline.
eL("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.",ud,typeof e)}function uy(){throw Error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.")}function ub(e,t){if(uh)return!1;if(null===t)return eL("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.",ud),!1;// Don't bother comparing lengths in prod because these arrays should be
// passed inline.
e.length!==t.length&&eL("The final argument passed to %s changed size between renders. The order and size of this array must remain constant.\n\nPrevious: %s\nIncoming: %s",ud,"["+t.join(", ")+"]","["+e.join(", ")+"]");for(var n=0;n<t.length&&n<e.length;n++)if(!iT(e[n],t[n]))return!1;return!0}function uw(e,t,n,r,a,i){ur=i,ua=t,uf=null!==e?e._debugHookTypes:null,up=-1,uh=null!==e&&e.type!==t.type,t.memoizedState=null,t.updateQueue=null,t.lanes=0,null!==e&&null!==e.memoizedState?ut.current=cm:null!==uf?// but no stateful hooks have been used.
// We want to match the production code behavior (which will use HooksDispatcherOnMount),
// but with the extra DEV validation to ensure hooks ordering hasn't changed.
// This dispatcher does that.
ut.current=ch:ut.current=cp;var o=n(r,a);// Check if there was a render phase update
if(ul){// Keep rendering in a loop for as long as render phase updates continue to
// be scheduled. Use a counter to prevent infinite loops.
var s=0;do{if(ul=!1,uu=0,s>=25)throw Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");s+=1,// Even when hot reloading, allow dependencies to stabilize
// after first render to prevent infinite render phase updates.
uh=!1,ui=null,uo=null,t.updateQueue=null,// Also validate hook order for cascading updates.
up=-1,ut.current=cv,o=n(r,a)}while(ul)}// We can assume the previous dispatcher is always this one, since we set it
// at the beginning of the render phase and there's no re-entrance.
ut.current=cf,t._debugHookTypes=uf;// hookTypesDev could catch more cases (e.g. context) but only in DEV bundles.
var l=null!==ui&&null!==ui.next;// localIdCounter = 0;
if(ur=0,ua=null,ui=null,uo=null,ud=null,uf=null,up=-1,null!==e&&(14680064&e.flags)!=(14680064&t.flags)&&// Disable this warning in legacy mode, because legacy Suspense is weird
// and creates false positives. To make this work in legacy mode, we'd
// need to mark fibers that commit in an incomplete state, somehow. For
// now I'll disable the warning that most of the bugs that would trigger
// it are either exclusive to concurrent mode or exist in both.
(1&e.mode)!=0&&eL("Internal React error: Expected static flag was missing. Please notify the React team."),us=!1,l)throw Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");return o}function u_(){// This should be called immediately after every renderWithHooks call.
// Conceptually, it's part of the return value of renderWithHooks; it's only a
// separate function to avoid using an array tuple.
var e=0!==uu;return uu=0,e}function uk(e,t,n){t.updateQueue=e.updateQueue,(16&t.mode)!=0?t.flags&=-50333701:t.flags&=-2053,e.lanes=e.lanes&~n}function ux(){if(// We can assume the previous dispatcher is always this one, since we set it
// at the beginning of the render phase and there's no re-entrance.
ut.current=cf,us){for(// There were render phase updates. These are only valid for this render
// phase, which we are now aborting. Remove the updates from the queues so
// they do not persist to the next render. Do not remove updates from hooks
// that weren't processed.
//
// Only reset the updates from the queue if it has a clone. If it does
// not have a clone, that means it wasn't processed, and the updates were
// scheduled before we entered the render phase.
var e=ua.memoizedState;null!==e;){var t=e.queue;null!==t&&(t.pending=null),e=e.next}us=!1}ur=0,ua=null,ui=null,uo=null,uf=null,up=-1,ud=null,ca=!1,ul=!1,uu=0}function uS(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return null===uo?ua.memoizedState=uo=e:uo=uo.next=e,uo}function uE(){if(null===ui){var e,t,n=ua.alternate;e=null!==n?n.memoizedState:null}else e=ui.next;if(null!==(t=null===uo?ua.memoizedState:uo.next))t=// There's already a work-in-progress. Reuse it.
(uo=t).next,ui=e;else{// Clone from the current hook.
if(null===e)throw Error("Rendered more hooks than during the previous render.");var r={memoizedState:(ui=e).memoizedState,baseState:ui.baseState,baseQueue:ui.baseQueue,queue:ui.queue,next:null};null===uo?ua.memoizedState=uo=r:uo=uo.next=r}return uo}function uC(){return{lastEffect:null,stores:null}}function uT(e,t){// $FlowFixMe: Flow doesn't like mixed types
return"function"==typeof t?t(e):t}function uO(e,t,n){var r,a=uS();r=void 0!==n?n(t):t,a.memoizedState=a.baseState=r;var i={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:r};a.queue=i;var o=i.dispatch=cs.bind(null,ua,i);return[a.memoizedState,o]}function uR(e,t,n){var r=uE(),a=r.queue;if(null===a)throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");a.lastRenderedReducer=e;var i=ui,o=i.baseQueue,s=a.pending;// The last rebase update that is NOT part of the base state.
if(null!==s){// We have new updates that haven't been processed yet.
// We'll add them to the base queue.
if(null!==o){// Merge the pending queue and the base queue.
var l=o.next,u=s.next;o.next=u,s.next=l}i.baseQueue!==o&&// the future if we implement resuming, or some form of that.
eL("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."),i.baseQueue=o=s,a.pending=null}if(null!==o){// We have a queue to process.
var c=o.next,d=i.baseState,f=null,p=null,h=null,m=c;do{var v=m.lane;if((ur&v)===v){// This update does have sufficient priority.
if(null!==h){var g={// This update is going to be committed so we never want uncommit
// it. Using NoLane works because 0 is a subset of all bitmasks, so
// this will never be skipped by the check above.
lane:0,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};h=h.next=g}// Process this update.
// we can use the eagerly computed state
d=m.hasEagerState?m.eagerState:e(d,m.action)}else{// Priority is insufficient. Skip this update. If this is the first
// skipped update, the previous update/state is the new base
// update/state.
var y,b={lane:v,action:m.action,hasEagerState:m.hasEagerState,eagerState:m.eagerState,next:null};null===h?(p=h=b,f=d):h=h.next=b,// Update the remaining priority in the queue.
// TODO: Don't need to accumulate this. Instead, we can remove
// renderLanes from the original lanes.
ua.lanes=ua.lanes|v,fi|=y=v}m=m.next}while(null!==m&&m!==c)null===h?f=d:h.next=p,iT(d,r.memoizedState)||(c$=!0),r.memoizedState=d,r.baseState=f,r.baseQueue=h,a.lastRenderedState=d}// Interleaved updates are stored on a separate queue. We aren't going to
// process them during this render, but we do need to track which lanes
// are remaining.
var w=a.interleaved;if(null!==w){var _=w;do{var k,x=_.lane;ua.lanes=ua.lanes|x,fi|=k=x,_=_.next}while(_!==w)}else null===o&&// zero once the queue is empty.
(a.lanes=0);var S=a.dispatch;return[r.memoizedState,S]}function uP(e,t,n){var r=uE(),a=r.queue;if(null===a)throw Error("Should have a queue. This is likely a bug in React. Please file an issue.");a.lastRenderedReducer=e;// This is a re-render. Apply the new render phase updates to the previous
// work-in-progress hook.
var i=a.dispatch,o=a.pending,s=r.memoizedState;if(null!==o){// The queue doesn't persist past this render pass.
a.pending=null;var l=o.next,u=l;do s=e(s,u.action),u=u.next;while(u!==l)// Mark that the fiber performed work, but only if the new state is
iT(s,r.memoizedState)||(c$=!0),r.memoizedState=s,null===r.baseQueue&&(r.baseState=s),a.lastRenderedState=s}return[s,i]}function uI(e,t,n){}function uD(e,t,n){}function uN(e,t,n){var r,a=ua,i=uS();if(sj){if(void 0===n)throw Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");r=n(),ec||r===n()||(eL("The result of getServerSnapshot should be cached to avoid an infinite loop"),ec=!0)}else{if(r=t(),ec||iT(r,t())||(eL("The result of getSnapshot should be cached to avoid an infinite loop"),ec=!0),null===d8)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");(30&ur)!=0||uM(a,t,r)}// Read the current snapshot from the store on every render. This breaks the
// normal rules of React, and only works because store updates are
// always synchronous.
i.memoizedState=r;var o={value:r,getSnapshot:t};return i.queue=o,uH(uU.bind(null,a,o,e),[e]),// this whenever subscribe, getSnapshot, or value changes. Because there's no
// clean-up function, and we track the deps correctly, we can call pushEffect
// directly, without storing any additional state. For the same reason, we
// don't need to set a static flag, either.
// TODO: We can move this to the passive phase once we add a pre-commit
// consistency check. See the next comment.
a.flags|=/*                      */2048,uq(9,uA.bind(null,a,o,r,t),void 0,null),r}function uL(e,t,n){var r=ua,a=uE(),i=t();ec||iT(i,t())||(eL("The result of getSnapshot should be cached to avoid an infinite loop"),ec=!0);var o=!iT(a.memoizedState,i);o&&(a.memoizedState=i,c$=!0);var s=a.queue;// commit phase if there was an interleaved mutation. In concurrent mode
// this can happen all the time, but even in synchronous mode, an earlier
// effect may have mutated the store.
if(uY(uU.bind(null,r,s,e),[e]),s.getSnapshot!==t||o||// Check if the susbcribe function changed. We can save some memory by
// checking whether we scheduled a subscription effect above.
null!==uo&&/* */1&uo.memoizedState.tag){if(r.flags|=2048,uq(9,uA.bind(null,r,s,i,t),void 0,null),null===d8)throw Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");(30&ur)!=0||uM(r,t,i)}return i}function uM(e,t,n){e.flags|=/*             */16384;var r={getSnapshot:t,value:n},a=ua.updateQueue;if(null===a)a=uC(),ua.updateQueue=a,a.stores=[r];else{var i=a.stores;null===i?a.stores=[r]:i.push(r)}}function uA(e,t,n,r){// These are updated in the passive phase
t.value=n,t.getSnapshot=r,uz(t)&&uF(e)}function uU(e,t,n){return n(function(){// The store changed. Check if the snapshot changed since the last time we
// read from the store.
uz(t)&&uF(e)})}function uz(e){var t=e.getSnapshot,n=e.value;try{var r=t();return!iT(n,r)}catch(e){return!0}}function uF(e){var t=l_(e,1);null!==t&&fN(t,e,1,-1)}function uj(e){var t=uS();"function"==typeof e&&(e=e()),t.memoizedState=t.baseState=e;var n={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:uT,lastRenderedState:e};t.queue=n;var r=n.dispatch=cl.bind(null,ua,n);return[t.memoizedState,r]}function uq(e,t,n,r){var a={tag:e,create:t,destroy:n,deps:r,// Circular
next:null},i=ua.updateQueue;if(null===i)i=uC(),ua.updateQueue=i,i.lastEffect=a.next=a;else{var o=i.lastEffect;if(null===o)i.lastEffect=a.next=a;else{var s=o.next;o.next=a,a.next=s,i.lastEffect=a}}return a}function uB(e){var t=uS(),n={current:e};return t.memoizedState=n,n}function uV(e){return uE().memoizedState}function uW(e,t,n,r){var a=uS(),i=void 0===r?null:r;ua.flags|=e,a.memoizedState=uq(1|t,n,void 0,i)}function u$(e,t,n,r){var a=uE(),i=void 0===r?null:r,o=void 0;if(null!==ui){var s=ui.memoizedState;if(o=s.destroy,null!==i&&ub(i,s.deps)){a.memoizedState=uq(t,n,o,i);return}}ua.flags|=e,a.memoizedState=uq(1|t,n,o,i)}function uH(e,t){return(16&ua.mode)!=0?uW(41945088,/*   */8,e,t):uW(8390656,8,e,t)}function uY(e,t){return u$(2048,8,e,t)}function uQ(e,t){return uW(/*                       */4,/*  */2,e,t)}function uK(e,t){return u$(4,2,e,t)}function uG(e,t){var n;return n=4194308,(16&ua.mode)!=0&&(n|=16777216),uW(n,/*    */4,e,t)}function uX(e,t){return u$(4,4,e,t)}function uJ(e,t){if("function"==typeof t)return t(e()),function(){t(null)};if(null!=t){t.hasOwnProperty("current")||eL("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.","an object with keys {"+Object.keys(t).join(", ")+"}");var n=e();return t.current=n,function(){t.current=null}}}function uZ(e,t,n){"function"!=typeof t&&eL("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",null!==t?typeof t:"null");var r,a=null!=n?n.concat([e]):null;return r=4194308,(16&ua.mode)!=0&&(r|=16777216),uW(r,4,uJ.bind(null,t,e),a)}function u0(e,t,n){"function"!=typeof t&&eL("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.",null!==t?typeof t:"null");var r=null!=n?n.concat([e]):null;return u$(4,4,uJ.bind(null,t,e),r)}function u1(e,t){// The react-debug-hooks package injects its own implementation
// so that e.g. DevTools can display custom hook values.
}function u2(e,t){return uS().memoizedState=[e,void 0===t?null:t],e}function u3(e,t){var n=uE(),r=void 0===t?null:t,a=n.memoizedState;return null!==a&&null!==r&&ub(r,a[1])?a[0]:(n.memoizedState=[e,r],e)}function u5(e,t){var n=uS(),r=e();return n.memoizedState=[r,void 0===t?null:t],r}function u4(e,t){var n=uE(),r=void 0===t?null:t,a=n.memoizedState;if(null!==a&&null!==r&&ub(r,a[1]))return a[0];var i=e();return n.memoizedState=[i,r],i}function u6(e){return uS().memoizedState=e,e}function u8(e){return u9(uE(),ui.memoizedState,e)}function u7(e){var t=uE();return null===ui?(// This is a rerender during a mount.
t.memoizedState=e,e):u9(t,ui.memoizedState,e)}function u9(e,t,n){if(!((21&ur)!=0))return e.baseState&&(// Flip this back to false.
e.baseState=!1,c$=!0),e.memoizedState=n,n;// This is an urgent update. If the value has changed, keep using the
// previous value and spawn a deferred render to update it later.
if(!iT(n,t)){// Schedule a deferred render
var r,a=r8();ua.lanes=ua.lanes|a,fi|=r=a,// from the latest value. The name "baseState" doesn't really match how we
// use it because we're reusing a state hook field instead of creating a
// new one.
e.baseState=!0}// Reuse the previous value
return t}function ce(e,t,n){var r=ao;ao=0!==r&&r<4?r:4,e(!0);var a=un.transition;un.transition={};var i=un.transition;un.transition._updatedFibers=new Set;try{e(!1),t()}finally{ao=r,un.transition=a,null===a&&i._updatedFibers&&(i._updatedFibers.size>10&&eN("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."),i._updatedFibers.clear())}}function ct(){var e=uj(!1),t=e[0],n=e[1],r=ce.bind(null,n);// The `start` method never changes.
return uS().memoizedState=r,[t,r]}function cn(){return[uR(uT)[0],uE().memoizedState]}function cr(){return[uP(uT)[0],uE().memoizedState]}var ca=!1;function ci(){var e,t=uS(),n=d8.identifierPrefix;if(sj){e=":"+n+"R"+(r=sI,((a=sP)&~(1<<sM(a)-1)).toString(32)+r);// that represents the position of this useId hook among all the useId
// hooks for this fiber.
var r,a,i=uu++;i>0&&(e+="H"+i.toString(32)),e+=":"}else e=":"+n+"r"+(uc++).toString(32)+":";return t.memoizedState=e,e}function co(){return uE().memoizedState}function cs(e,t,n){"function"==typeof arguments[3]&&eL("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=fD(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(cu(e))cc(t,a);else{var i=lw(e,t,a,r);null!==i&&(fN(i,e,r,fI()),cd(i,t,r))}rQ(e,r)}function cl(e,t,n){"function"==typeof arguments[3]&&eL("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");var r=fD(e),a={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(cu(e))cc(t,a);else{var i=e.alternate;if(0===e.lanes&&(null===i||0===i.lanes)){// The queue is currently empty, which means we can eagerly compute the
// next state before entering the render phase. If the new state is the
// same as the current state, we may be able to bail out entirely.
var o,s=t.lastRenderedReducer;if(null!==s){o=ut.current,ut.current=cy;try{var l,u=t.lastRenderedState,c=s(u,n);if(// it, on the update object. If the reducer hasn't changed by the
// time we enter the render phase, then the eager state can be used
// without calling the reducer again.
a.hasEagerState=!0,a.eagerState=c,iT(c,u)){// Fast path. We can bail out without scheduling React to re-render.
// It's still possible that we'll need to rebase this update later,
// if the component re-renders for a different reason and by that
// time the reducer has changed.
// TODO: Do we still need to entangle transitions in this case?
l=t.interleaved,null===l?(// This is the first update. Create a circular list.
a.next=a,// be transferred to the pending queue.
lb(t)):(a.next=l.next,l.next=a),t.interleaved=a;return}}catch(e){}finally{ut.current=o}}}var d=lw(e,t,a,r);null!==d&&(fN(d,e,r,fI()),cd(d,t,r))}rQ(e,r)}function cu(e){var t=e.alternate;return e===ua||null!==t&&t===ua}function cc(e,t){// This is a render phase update. Stash it in a lazily-created map of
// queue -> linked list of updates. After this render pass, we'll restart
// and apply the stashed updates on top of the work-in-progress hook.
ul=us=!0;var n=e.pending;null===n?t.next=t:(t.next=n.next,n.next=t),e.pending=t}// TODO: Move to ReactFiberConcurrentUpdates?
function cd(e,t,n){if(r6(n)){var r=t.lanes,a=// must have finished. We can remove them from the shared queue, which
// represents a superset of the actually pending lanes. In some cases we
// may entangle more than we need to, but that's OK. In fact it's worse if
// we *don't* entangle when we should.
(r&=e.pendingLanes)|n;// If any entangled lanes are no longer pending on the root, then they
t.lanes=a,// the lane finished since the last time we entangled it. So we need to
// entangle it again, just to be sure.
ar(e,a)}}var cf={readContext:lg,useCallback:uy,useContext:uy,useEffect:uy,useImperativeHandle:uy,useInsertionEffect:uy,useLayoutEffect:uy,useMemo:uy,useReducer:uy,useRef:uy,useState:uy,useDebugValue:uy,useDeferredValue:uy,useTransition:uy,useMutableSource:uy,useSyncExternalStore:uy,useId:uy,unstable_isNewReconciler:!1},cp=null,ch=null,cm=null,cv=null,cg=null,cy=null,cb=null,cw=function(){eL("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().")},c_=function(){eL("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks")};cp={readContext:function(e){return lg(e)},useCallback:function(e,t){return ud="useCallback",um(),ug(t),u2(e,t)},useContext:function(e){return ud="useContext",um(),lg(e)},useEffect:function(e,t){return ud="useEffect",um(),ug(t),uH(e,t)},useImperativeHandle:function(e,t,n){return ud="useImperativeHandle",um(),ug(n),uZ(e,t,n)},useInsertionEffect:function(e,t){return ud="useInsertionEffect",um(),ug(t),uQ(e,t)},useLayoutEffect:function(e,t){return ud="useLayoutEffect",um(),ug(t),uG(e,t)},useMemo:function(e,t){ud="useMemo",um(),ug(t);var n=ut.current;ut.current=cg;try{return u5(e,t)}finally{ut.current=n}},useReducer:function(e,t,n){ud="useReducer",um();var r=ut.current;ut.current=cg;try{return uO(e,t,n)}finally{ut.current=r}},useRef:function(e){return ud="useRef",um(),uB(e)},useState:function(e){ud="useState",um();var t=ut.current;ut.current=cg;try{return uj(e)}finally{ut.current=t}},useDebugValue:function(e,t){return ud="useDebugValue",um(),u1()},useDeferredValue:function(e){return ud="useDeferredValue",um(),u6(e)},useTransition:function(){return ud="useTransition",um(),ct()},useMutableSource:function(e,t,n){return ud="useMutableSource",um(),uI()},useSyncExternalStore:function(e,t,n){return ud="useSyncExternalStore",um(),uN(e,t,n)},useId:function(){return ud="useId",um(),ci()},unstable_isNewReconciler:!1},ch={readContext:function(e){return lg(e)},useCallback:function(e,t){return ud="useCallback",uv(),u2(e,t)},useContext:function(e){return ud="useContext",uv(),lg(e)},useEffect:function(e,t){return ud="useEffect",uv(),uH(e,t)},useImperativeHandle:function(e,t,n){return ud="useImperativeHandle",uv(),uZ(e,t,n)},useInsertionEffect:function(e,t){return ud="useInsertionEffect",uv(),uQ(e,t)},useLayoutEffect:function(e,t){return ud="useLayoutEffect",uv(),uG(e,t)},useMemo:function(e,t){ud="useMemo",uv();var n=ut.current;ut.current=cg;try{return u5(e,t)}finally{ut.current=n}},useReducer:function(e,t,n){ud="useReducer",uv();var r=ut.current;ut.current=cg;try{return uO(e,t,n)}finally{ut.current=r}},useRef:function(e){return ud="useRef",uv(),uB(e)},useState:function(e){ud="useState",uv();var t=ut.current;ut.current=cg;try{return uj(e)}finally{ut.current=t}},useDebugValue:function(e,t){return ud="useDebugValue",uv(),u1()},useDeferredValue:function(e){return ud="useDeferredValue",uv(),u6(e)},useTransition:function(){return ud="useTransition",uv(),ct()},useMutableSource:function(e,t,n){return ud="useMutableSource",uv(),uI()},useSyncExternalStore:function(e,t,n){return ud="useSyncExternalStore",uv(),uN(e,t,n)},useId:function(){return ud="useId",uv(),ci()},unstable_isNewReconciler:!1},cm={readContext:function(e){return lg(e)},useCallback:function(e,t){return ud="useCallback",uv(),u3(e,t)},useContext:function(e){return ud="useContext",uv(),lg(e)},useEffect:function(e,t){return ud="useEffect",uv(),uY(e,t)},useImperativeHandle:function(e,t,n){return ud="useImperativeHandle",uv(),u0(e,t,n)},useInsertionEffect:function(e,t){return ud="useInsertionEffect",uv(),uK(e,t)},useLayoutEffect:function(e,t){return ud="useLayoutEffect",uv(),uX(e,t)},useMemo:function(e,t){ud="useMemo",uv();var n=ut.current;ut.current=cy;try{return u4(e,t)}finally{ut.current=n}},useReducer:function(e,t,n){ud="useReducer",uv();var r=ut.current;ut.current=cy;try{return uR(e,t,n)}finally{ut.current=r}},useRef:function(e){return ud="useRef",uv(),uV()},useState:function(e){ud="useState",uv();var t=ut.current;ut.current=cy;try{return uR(uT)}finally{ut.current=t}},useDebugValue:function(e,t){return ud="useDebugValue",uv(),u1()},useDeferredValue:function(e){return ud="useDeferredValue",uv(),u8(e)},useTransition:function(){return ud="useTransition",uv(),cn()},useMutableSource:function(e,t,n){return ud="useMutableSource",uv(),uD()},useSyncExternalStore:function(e,t,n){return ud="useSyncExternalStore",uv(),uL(e,t)},useId:function(){return ud="useId",uv(),co()},unstable_isNewReconciler:!1},cv={readContext:function(e){return lg(e)},useCallback:function(e,t){return ud="useCallback",uv(),u3(e,t)},useContext:function(e){return ud="useContext",uv(),lg(e)},useEffect:function(e,t){return ud="useEffect",uv(),uY(e,t)},useImperativeHandle:function(e,t,n){return ud="useImperativeHandle",uv(),u0(e,t,n)},useInsertionEffect:function(e,t){return ud="useInsertionEffect",uv(),uK(e,t)},useLayoutEffect:function(e,t){return ud="useLayoutEffect",uv(),uX(e,t)},useMemo:function(e,t){ud="useMemo",uv();var n=ut.current;ut.current=cb;try{return u4(e,t)}finally{ut.current=n}},useReducer:function(e,t,n){ud="useReducer",uv();var r=ut.current;ut.current=cb;try{return uP(e,t,n)}finally{ut.current=r}},useRef:function(e){return ud="useRef",uv(),uV()},useState:function(e){ud="useState",uv();var t=ut.current;ut.current=cb;try{return uP(uT)}finally{ut.current=t}},useDebugValue:function(e,t){return ud="useDebugValue",uv(),u1()},useDeferredValue:function(e){return ud="useDeferredValue",uv(),u7(e)},useTransition:function(){return ud="useTransition",uv(),cr()},useMutableSource:function(e,t,n){return ud="useMutableSource",uv(),uD()},useSyncExternalStore:function(e,t,n){return ud="useSyncExternalStore",uv(),uL(e,t)},useId:function(){return ud="useId",uv(),co()},unstable_isNewReconciler:!1},cg={readContext:function(e){return cw(),lg(e)},useCallback:function(e,t){return ud="useCallback",c_(),um(),u2(e,t)},useContext:function(e){return ud="useContext",c_(),um(),lg(e)},useEffect:function(e,t){return ud="useEffect",c_(),um(),uH(e,t)},useImperativeHandle:function(e,t,n){return ud="useImperativeHandle",c_(),um(),uZ(e,t,n)},useInsertionEffect:function(e,t){return ud="useInsertionEffect",c_(),um(),uQ(e,t)},useLayoutEffect:function(e,t){return ud="useLayoutEffect",c_(),um(),uG(e,t)},useMemo:function(e,t){ud="useMemo",c_(),um();var n=ut.current;ut.current=cg;try{return u5(e,t)}finally{ut.current=n}},useReducer:function(e,t,n){ud="useReducer",c_(),um();var r=ut.current;ut.current=cg;try{return uO(e,t,n)}finally{ut.current=r}},useRef:function(e){return ud="useRef",c_(),um(),uB(e)},useState:function(e){ud="useState",c_(),um();var t=ut.current;ut.current=cg;try{return uj(e)}finally{ut.current=t}},useDebugValue:function(e,t){return ud="useDebugValue",c_(),um(),u1()},useDeferredValue:function(e){return ud="useDeferredValue",c_(),um(),u6(e)},useTransition:function(){return ud="useTransition",c_(),um(),ct()},useMutableSource:function(e,t,n){return ud="useMutableSource",c_(),um(),uI()},useSyncExternalStore:function(e,t,n){return ud="useSyncExternalStore",c_(),um(),uN(e,t,n)},useId:function(){return ud="useId",c_(),um(),ci()},unstable_isNewReconciler:!1},cy={readContext:function(e){return cw(),lg(e)},useCallback:function(e,t){return ud="useCallback",c_(),uv(),u3(e,t)},useContext:function(e){return ud="useContext",c_(),uv(),lg(e)},useEffect:function(e,t){return ud="useEffect",c_(),uv(),uY(e,t)},useImperativeHandle:function(e,t,n){return ud="useImperativeHandle",c_(),uv(),u0(e,t,n)},useInsertionEffect:function(e,t){return ud="useInsertionEffect",c_(),uv(),uK(e,t)},useLayoutEffect:function(e,t){return ud="useLayoutEffect",c_(),uv(),uX(e,t)},useMemo:function(e,t){ud="useMemo",c_(),uv();var n=ut.current;ut.current=cy;try{return u4(e,t)}finally{ut.current=n}},useReducer:function(e,t,n){ud="useReducer",c_(),uv();var r=ut.current;ut.current=cy;try{return uR(e,t,n)}finally{ut.current=r}},useRef:function(e){return ud="useRef",c_(),uv(),uV()},useState:function(e){ud="useState",c_(),uv();var t=ut.current;ut.current=cy;try{return uR(uT)}finally{ut.current=t}},useDebugValue:function(e,t){return ud="useDebugValue",c_(),uv(),u1()},useDeferredValue:function(e){return ud="useDeferredValue",c_(),uv(),u8(e)},useTransition:function(){return ud="useTransition",c_(),uv(),cn()},useMutableSource:function(e,t,n){return ud="useMutableSource",c_(),uv(),uD()},useSyncExternalStore:function(e,t,n){return ud="useSyncExternalStore",c_(),uv(),uL(e,t)},useId:function(){return ud="useId",c_(),uv(),co()},unstable_isNewReconciler:!1},cb={readContext:function(e){return cw(),lg(e)},useCallback:function(e,t){return ud="useCallback",c_(),uv(),u3(e,t)},useContext:function(e){return ud="useContext",c_(),uv(),lg(e)},useEffect:function(e,t){return ud="useEffect",c_(),uv(),uY(e,t)},useImperativeHandle:function(e,t,n){return ud="useImperativeHandle",c_(),uv(),u0(e,t,n)},useInsertionEffect:function(e,t){return ud="useInsertionEffect",c_(),uv(),uK(e,t)},useLayoutEffect:function(e,t){return ud="useLayoutEffect",c_(),uv(),uX(e,t)},useMemo:function(e,t){ud="useMemo",c_(),uv();var n=ut.current;ut.current=cy;try{return u4(e,t)}finally{ut.current=n}},useReducer:function(e,t,n){ud="useReducer",c_(),uv();var r=ut.current;ut.current=cy;try{return uP(e,t,n)}finally{ut.current=r}},useRef:function(e){return ud="useRef",c_(),uv(),uV()},useState:function(e){ud="useState",c_(),uv();var t=ut.current;ut.current=cy;try{return uP(uT)}finally{ut.current=t}},useDebugValue:function(e,t){return ud="useDebugValue",c_(),uv(),u1()},useDeferredValue:function(e){return ud="useDeferredValue",c_(),uv(),u7(e)},useTransition:function(){return ud="useTransition",c_(),uv(),cr()},useMutableSource:function(e,t,n){return ud="useMutableSource",c_(),uv(),uD()},useSyncExternalStore:function(e,t,n){return ud="useSyncExternalStore",c_(),uv(),uL(e,t)},useId:function(){return ud="useId",c_(),uv(),co()},unstable_isNewReconciler:!1};var ck=eP.unstable_now,cx=0,cS=-1,cE=-1,cC=-1,cT=!1,cO=!1;function cR(e){cE=ck(),e.actualStartTime<0&&(e.actualStartTime=ck())}function cP(e,t){if(cE>=0){var n=ck()-cE;e.actualDuration+=n,t&&(e.selfBaseDuration=n),cE=-1}}function cI(e){if(cS>=0){var t=ck()-cS;cS=-1;// Store duration on the next nearest Profiler ancestor
for(// Or the root (for the DevTools Profiler to read)
var n=e.return;null!==n;){switch(n.tag){case 3:var r=n.stateNode;r.effectDuration+=t;return;case 12:var a=n.stateNode;a.effectDuration+=t;return}n=n.return}}}function cD(e){if(cC>=0){var t=ck()-cC;cC=-1;// Store duration on the next nearest Profiler ancestor
for(// Or the root (for the DevTools Profiler to read)
var n=e.return;null!==n;){switch(n.tag){case 3:var r=n.stateNode;null!==r&&(r.passiveEffectDuration+=t);return;case 12:var a=n.stateNode;null!==a&&// In this case, the return pointer is also cleared out,
// so we won't be able to report the time spent in this Profiler's subtree.
(a.passiveEffectDuration+=t);return}n=n.return}}}function cN(){cS=ck()}function cL(e){for(// Transfer time spent rendering these children so we don't lose it
// after we rerender. This is used as a helper in special cases
// where we should count the work of multiple passes.
var t=e.child;t;)e.actualDuration+=t.actualDuration,t=t.sibling}function cM(e,t){// If the value is an error, call this function immediately after it is thrown
// so the stack is accurate.
return{value:e,source:t,stack:tS(t),digest:null}}function cA(e,t,n){return{value:e,source:null,stack:null!=n?n:null,digest:null!=t?t:null}}function cU(e,t){try{var n,r=t.value,a=t.source,i=t.stack;// `preventDefault()` in window `error` handler.
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
}var o=a?tO(a):null;if(3===e.tag)n="Consider adding an error boundary to your tree to customize error handling behavior.\nVisit https://reactjs.org/link/error-boundaries to learn more about error boundaries.";else{var s=tO(e)||"Anonymous";n="React will try to recreate this component tree from scratch using the error boundary you provided, "+s+"."}var l=(o?"The above error occurred in the <"+o+"> component:":"The above error occurred in one of your React components:")+"\n"+(null!==i?i:"")+"\n\n"+n;// In development, we provide our own message with just the component stack.
// We don't include the original error message and JS stack because the browser
// has already printed it. Even if the application swallows the error, it is still
// displayed by the browser thanks to the DEV-only fake event trick in ReactErrorUtils.
console.error(l);// Don't transform to our wrapper
}catch(e){// This method must not throw, or React internal state will get messed up.
// If console.error is overridden, or logCapturedError() shows a dialog that throws,
// we want to report this error outside of the normal stack as a last resort.
// https://github.com/facebook/react/issues/13188
setTimeout(function(){throw e})}}var cz="function"==typeof WeakMap?WeakMap:Map;function cF(e,t,n){var r=lE(-1,n);// Unmount the root by rendering null.
r.tag=3,// being called "element".
r.payload={element:null};var a=t.value;return r.callback=function(){f0(a),cU(e,t)},r}function cj(e,t,n){var r=lE(-1,n);r.tag=3;var a=e.type.getDerivedStateFromError;if("function"==typeof a){var i=t.value;r.payload=function(){return a(i)},r.callback=function(){pf(e),cU(e,t)}}var o=e.stateNode;return null!==o&&"function"==typeof o.componentDidCatch&&(r.callback=function(){pf(e),cU(e,t),"function"!=typeof a&&(null===fv?fv=new Set([this]):fv.add(this));var n=t.value,r=t.stack;this.componentDidCatch(n,{componentStack:null!==r?r:""}),"function"==typeof a||(1&e.lanes)!=0||eL("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.",tO(e)||"Unknown")}),r}function cq(e,t,n){// Attach a ping listener
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
var r,a=e.pingCache;if(null===a?(a=e.pingCache=new cz,r=new Set,a.set(t,r)):void 0===(r=a.get(t))&&(r=new Set,a.set(t,r)),!r.has(n)){// Memoize using the thread ID to prevent redundant listeners.
r.add(n);var i=f3.bind(null,e,t,n);rU&&pn(e,n),t.then(i,i)}}function cB(e){var t=e;do{if(13===t.tag&&function(e,t){// If it was the primary children that just suspended, capture and render the
// fallback. Otherwise, don't capture and bubble to the next boundary.
var n=e.memoizedState;return null!==n?null!==n.dehydrated:(e.memoizedProps,!0)}(t))return t;// This boundary already captured during this render. Continue to the next
// boundary.
t=t.return}while(null!==t)return null}function cV(e,t,n,r,a){// This marks a Suspense boundary so that when we're unwinding the stack,
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
var i=lE(-1,1);i.tag=2,lC(n,i,1)}}// The source fiber did not complete. Mark it with Sync priority to
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
e.lanes=a,e)}var cW=eI.ReactCurrentOwner,c$=!1;function cH(e,t,n,r){null===e?// won't update its child set by applying minimal side-effects. Instead,
// we will add them all to the child before it gets rendered. That means
// we can optimize this reconciliation pass by not tracking side-effects.
t.child=lQ(t,null,n,r):// we haven't yet started any work on these children. Therefore, we use
// the clone algorithm to create a copy of all the current children.
// If we had any progressed work already, that is invalid at this point so
// let's throw it out.
t.child=lY(t,e.child,n,r)}function cY(e,t,n,r,a){if(t.type!==t.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var i,o,s=n.propTypes;s&&o8(s,r,"prop",tC(n))}var l=n.render,u=t.ref;if(lv(t,a),rB(t),cW.current=t,tI=!0,i=uw(e,t,l,r,u,a),o=u_(),8&t.mode){rz(!0);try{i=uw(e,t,l,r,u,a),o=u_()}finally{rz(!1)}}return(tI=!1,rV(),null===e||c$)?(sj&&o&&sL(t),// React DevTools reads this flag.
t.flags|=/*                */1,cH(e,t,i,a),t.child):(uk(e,t,a),dl(e,t,a))}function cQ(e,t,n,r,a){if(null===e){var i=n.type;if("function"==typeof i&&!pm(i)&&void 0===i.defaultProps&&null===n.compare&&// SimpleMemoComponent codepath doesn't resolve outer props either.
void 0===n.defaultProps){var o=i;return o=pu(i),// and with only the default shallow comparison, we upgrade it
// to a SimpleMemoComponent to allow fast path updates.
t.tag=15,t.type=o,c3(t,i),cK(e,t,o,r,a)}var s=i.propTypes;s&&// We could move it there, but we'd still need this for lazy code path.
o8(s,r,"prop",tC(i));var l=pg(n.type,null,r,t,t.mode,a);return l.ref=t.ref,l.return=t,t.child=l,l}var u=n.type,c=u.propTypes;c&&// We could move it there, but we'd still need this for lazy code path.
o8(c,r,"prop",tC(u));var d=e.child;// This is always exactly one child
if(!du(e,a)){// This will be the props with resolved defaultProps,
// unlike current.memoizedProps which will be the unresolved ones.
var f=d.memoizedProps,p=n.compare;// Default to shallow comparison
if((p=null!==p?p:iO)(f,r)&&e.ref===t.ref)return dl(e,t,a)}// React DevTools reads this flag.
t.flags|=1;var h=pv(d,r);return h.ref=t.ref,h.return=t,t.child=h,h}function cK(e,t,n,r,a){if(t.type!==t.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var i=t.elementType;if(i.$$typeof===tp){// We warn when you define propTypes on lazy()
// so let's just skip over it to find memo() outer wrapper.
// Inner props for memo are validated later.
var o=i,s=o._payload,l=o._init;try{i=l(s)}catch(e){i=null}// Inner propTypes will be validated in the function component path.
var u=i&&i.propTypes;u&&o8(u,r,"prop",tC(i))}}if(null!==e){var c=e.memoizedProps;if(iO(c,r)&&e.ref===t.ref&&t.type===e.type){if(c$=!1,// would during a normal fiber bailout.
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
t.pendingProps=r=c,!du(e,a))return(// The pending lanes were cleared at the beginning of beginWork. We're
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
t.lanes=e.lanes,dl(e,t,a));(131072&e.flags)!=0&&// See https://github.com/facebook/react/pull/19216.
(c$=!0)}}return cJ(e,t,n,r,a)}function cG(e,t,n){var r,a,i=t.pendingProps,o=i.children,s=null!==e?e.memoizedState:null;if("hidden"===i.mode){// Rendering a hidden tree.
if((1&t.mode)==0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},fB(t,n);else if((1073741824&n)!=0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},fB(t,null!==s?s.baseLanes:n);else{return r=null!==s?s.baseLanes|n:n,// Schedule this fiber to re-render at offscreen priority. Then bailout.
t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:r,cachePool:null,transitions:null},t.updateQueue=null,// to avoid a push/pop misalignment.
fB(t,r),null}}else null!==s?(// We're going from hidden -> visible.
a=s.baseLanes|n,t.memoizedState=null):// special to do. Need to push to the stack regardless, though, to avoid
// a push/pop misalignment.
a=n,fB(t,a);return cH(e,t,o,n),t.child}// Note: These happen to have identical begin phases, for now. We shouldn't hold
function cX(e,t){var n=t.ref;(null===e&&null!==n||null!==e&&e.ref!==n)&&(// Schedule a Ref effect
t.flags|=/*                          */512,t.flags|=/*                    */2097152)}function cJ(e,t,n,r,a){if(t.type!==t.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var i,o,s,l=n.propTypes;l&&o8(l,r,"prop",tC(n))}var u=ss(t,n,!0);if(i=su(t,u),lv(t,a),rB(t),cW.current=t,tI=!0,o=uw(e,t,n,r,i,a),s=u_(),8&t.mode){rz(!0);try{o=uw(e,t,n,r,i,a),s=u_()}finally{rz(!1)}}return(tI=!1,rV(),null===e||c$)?(sj&&s&&sL(t),// React DevTools reads this flag.
t.flags|=1,cH(e,t,o,a),t.child):(uk(e,t,a),dl(e,t,a))}function cZ(e,t,n,r,a){// This is used by DevTools to force a boundary to error.
switch(pL(t)){case!1:var i,o,s=t.stateNode,l=new t.type(t.memoizedProps,s.context).state;s.updater.enqueueSetState(s,l,null);break;case!0:t.flags|=128,t.flags|=65536;var u,c=Error("Simulated error coming from DevTools"),d=(u=a)&-u;t.lanes=t.lanes|d;var f=cj(t,cM(c,t),d);lO(t,f)}if(t.type!==t.elementType){// Lazy component props can't be validated in createElement
// because they're only guaranteed to be resolved here.
var p=n.propTypes;p&&o8(p,r,"prop",tC(n))}sd(n)?(i=!0,sv(t)):i=!1,lv(t,a),null===t.stateNode?(ds(e,t),lz(t,n,r),lj(t,n,r,a),o=!0):o=null===e?function(e,t,n,r){var a,i,o,s=e.stateNode,l=e.memoizedProps;s.props=l;var u=s.context,c=t.contextType,d=sr;if("object"==typeof c&&null!==c)d=lg(c);else{var f=ss(e,t,!0);d=su(e,f)}var p=t.getDerivedStateFromProps,h="function"==typeof p||"function"==typeof s.getSnapshotBeforeUpdate;h||"function"!=typeof s.UNSAFE_componentWillReceiveProps&&"function"!=typeof s.componentWillReceiveProps||l===n&&u===d||lF(e,s,n,d),lk=!1;var m=e.memoizedState,v=s.state=m;if(lR(e,n,s,r),v=e.memoizedState,l===n&&m===v&&!sc()&&!lk)return"function"==typeof s.componentDidMount&&(a=4194308,(16&e.mode)!=0&&(a|=16777216),e.flags|=a),!1;"function"==typeof p&&(lL(e,t,p,n),v=e.memoizedState);var g=lk||lA(e,t,l,n,m,v,d);return g?(h||"function"!=typeof s.UNSAFE_componentWillMount&&"function"!=typeof s.componentWillMount||("function"==typeof s.componentWillMount&&s.componentWillMount(),"function"==typeof s.UNSAFE_componentWillMount&&s.UNSAFE_componentWillMount()),"function"==typeof s.componentDidMount&&(i=4194308,(16&e.mode)!=0&&(i|=16777216),e.flags|=i)):("function"==typeof s.componentDidMount&&(o=4194308,(16&e.mode)!=0&&(o|=16777216),e.flags|=o),// memoized state to indicate that this work can be reused.
e.memoizedProps=n,e.memoizedState=v),// if shouldComponentUpdate returns false.
s.props=n,s.state=v,s.context=d,g}// Invokes the update life-cycles and returns false if it shouldn't rerender.
(t,n,r,a):function(e,t,n,r,a){var i=t.stateNode;lS(e,t);var o=t.memoizedProps,s=t.type===t.elementType?o:lo(t.type,o);i.props=s;var l=t.pendingProps,u=i.context,c=n.contextType,d=sr;if("object"==typeof c&&null!==c)d=lg(c);else{var f=ss(t,n,!0);d=su(t,f)}var p=n.getDerivedStateFromProps,h="function"==typeof p||"function"==typeof i.getSnapshotBeforeUpdate;h||"function"!=typeof i.UNSAFE_componentWillReceiveProps&&"function"!=typeof i.componentWillReceiveProps||o===l&&u===d||lF(t,i,r,d),lk=!1;var m=t.memoizedState,v=i.state=m;if(lR(t,r,i,a),v=t.memoizedState,o===l&&m===v&&!sc()&&!lk)return"function"==typeof i.componentDidUpdate&&(o!==e.memoizedProps||m!==e.memoizedState)&&(t.flags|=4),"function"==typeof i.getSnapshotBeforeUpdate&&(o!==e.memoizedProps||m!==e.memoizedState)&&(t.flags|=/*                     */1024),!1;"function"==typeof p&&(lL(t,n,p,r),v=t.memoizedState);var g=lk||lA(t,n,s,r,m,v,d)||!1;return g?(h||"function"!=typeof i.UNSAFE_componentWillUpdate&&"function"!=typeof i.componentWillUpdate||("function"==typeof i.componentWillUpdate&&i.componentWillUpdate(r,v,d),"function"==typeof i.UNSAFE_componentWillUpdate&&i.UNSAFE_componentWillUpdate(r,v,d)),"function"==typeof i.componentDidUpdate&&(t.flags|=4),"function"==typeof i.getSnapshotBeforeUpdate&&(t.flags|=1024)):("function"==typeof i.componentDidUpdate&&(o!==e.memoizedProps||m!==e.memoizedState)&&(t.flags|=4),"function"==typeof i.getSnapshotBeforeUpdate&&(o!==e.memoizedProps||m!==e.memoizedState)&&(t.flags|=1024),// memoized props/state to indicate that this work can be reused.
t.memoizedProps=r,t.memoizedState=v),// if shouldComponentUpdate returns false.
i.props=r,i.state=v,i.context=d,g}(e,t,n,r,a);var h=c0(e,t,n,o,i,a),m=t.stateNode;return o&&m.props!==r&&(ev||eL("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.",tO(t)||"a component"),ev=!0),h}function c0(e,t,n,r,a,i){// Refs should update even if shouldComponentUpdate returns false
cX(e,t);var o,s,l=(128&t.flags)!=0;if(!r&&!l)return a&&sg(t,n,!1),dl(e,t,i);var u=t.stateNode;// Rerender
if(cW.current=t,l&&"function"!=typeof n.getDerivedStateFromError)// If we captured an error, but getDerivedStateFromError is not defined,
// unmount all the children. componentDidCatch will schedule an update to
// re-render a fallback. This is temporary until we migrate everyone to
// the new API.
// TODO: Warn in a future release.
s=null,cE=-1;else{if(rB(t),tI=!0,s=u.render(),8&t.mode){rz(!0);try{u.render()}finally{rz(!1)}}tI=!1,rV()}// React DevTools reads this flag.
return(t.flags|=1,null!==e&&l)?(o=s,// This function is fork of reconcileChildren. It's used in cases where we
// want to reconcile without matching against the existing set. This has the
// effect of all current children being unmounted; even if the type and key
// are the same, the old child is unmounted and a new child is created.
//
// To do this, we're going to go through the reconcile algorithm twice. In
// the first pass, we schedule a deletion for all the current children by
// passing null.
t.child=lY(t,e.child,null,i),// pass null in place of where we usually pass the current child set. This has
// the effect of remounting all children regardless of whether their
// identities match.
t.child=lY(t,null,o,i)):cH(e,t,s,i),// Memoize state using the values we just used to render.
// TODO: Restructure so we never read values from the instance.
t.memoizedState=u.state,a&&sg(t,n,!0),t.child}function c1(e){var t=e.stateNode;t.pendingContext?sh(e,t.pendingContext,t.pendingContext!==t.context):t.context&&sh(e,t.context,!1),l1(e,t.containerInfo)}function c2(e,t,n,r,a){return(// Revert to client rendering.
s0(),s2(a),t.flags|=/*            */256,cH(e,t,n,r),t.child)}function c3(e,t){if(t&&t.childContextTypes&&eL("%s(...): childContextTypes cannot be defined on a function component.",t.displayName||t.name||"Component"),null!==e.ref){var n="",r=tD();r&&(n+="\n\nCheck the render method of `"+r+"`.");var a=r||"",i=e._debugSource;i&&(a=i.fileName+":"+i.lineNumber),em[a]||(em[a]=!0,eL("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s",n))}if("function"==typeof t.getDerivedStateFromProps){var o=tC(t)||"Unknown";eh[o]||(eL("%s: Function components do not support getDerivedStateFromProps.",o),eh[o]=!0)}if("object"==typeof t.contextType&&null!==t.contextType){var s=tC(t)||"Unknown";ep[s]||(eL("%s: Function components do not support contextType.",s),ep[s]=!0)}}ed={},ef={},ep={},eh={},em={},ev=!1,eg={},ey={};var c5={dehydrated:null,treeContext:null,retryLane:0};function c4(e){return{baseLanes:e,cachePool:null,transitions:null}}function c6(e,t,n){var r=t.pendingProps;// This is used by DevTools to force a boundary to suspend.
pM(t)&&(t.flags|=128);var a=l6.current,i=!1,o=(128&t.flags)!=0;// boundary's children. This involves some custom reconciliation logic. Two
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
if(o||(s=a,// If we're already showing a fallback, there are cases where we need to
// remain on that fallback regardless of whether the content has resolved.
// For example, SuspenseList coordinates when nested content appears.
(null===e||null!==e.memoizedState)&&(2&s)!=0// Not currently showing content. Consult the Suspense context.
)?(// Something in this boundary's subtree already suspended. Switch to
// rendering the fallback children.
i=!0,t.flags&=-129):(null===e||null!==e.memoizedState)&&(a|=1),l8(t,a&=1),null===e){// Initial mount
// Special path for hydration
// If we're currently hydrating, try to hydrate this boundary.
sG(t);// This could've been a dehydrated suspense component.
var s,l,u,c,d,f,p=t.memoizedState;if(null!==p){var h=p.dehydrated;if(null!==h)return(1&t.mode)==0?(eL("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."),t.lanes=1):oV(h)?// for this, we need to schedule that at a higher priority based on when it would
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
t.lanes=1073741824,null}var m=r.children,v=r.fallback;if(!i)return c8(t,m);var g=(c=t.mode,d=t.child,f={mode:"hidden",children:m},(1&c)==0&&null!==d?(// In legacy mode, we commit the primary tree as if it successfully
// completed, even though it's in an inconsistent state.
(l=d).childLanes=0,l.pendingProps=f,/*                    */2&t.mode&&(// Reset the durations from the first pass so they aren't included in the
// final amounts. This seems counterintuitive, since we're intentionally
// not measuring part of the render phase, but this makes it match what we
// do in Concurrent Mode.
l.actualDuration=0,l.actualStartTime=-1,l.selfBaseDuration=0,l.treeBaseDuration=0)):l=c7(f,c),u=pb(v,c,n,null),l.return=t,u.return=t,l.sibling=u,t.child=l,u);return t.child.memoizedState=c4(n),t.memoizedState=c5,g}// This is an update.
// Special path for hydration
var y=e.memoizedState;if(null!==y){var b=y.dehydrated;if(null!==b)return function(e,t,n,r,a,i,o){if(n){// This is the second render pass. We already attempted to hydrated, but
// something either suspended or errored.
if(256&t.flags)return(// Something errored during hydration. Try again without hydrating.
t.flags&=-257,c9(e,t,o,cA(Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."))));if(null!==t.memoizedState)return(// Something suspended and we should still be in dehydrated mode.
// Leave the existing child in place.
t.child=e.child,// but the normal suspense pass doesn't.
t.flags|=128,null);// Suspended but we should no longer be in dehydrated mode.
// Therefore we now have to render the fallback.
var s,l,u,c,d,f,p=r.children,h=r.fallback,m=(d=c7({mode:"visible",children:p},c=t.mode),f=pb(h,c,o,null),// boundary) already mounted but this is a new fiber.
f.flags|=2,d.return=t,f.return=t,d.sibling=f,t.child=d,(1&t.mode)!=0&&// deletion. We need to reconcile to delete the current child.
lY(t,e.child,null,o),f);return t.child.memoizedState=c4(o),t.memoizedState=c5,m}if(sj&&eL("We should not be hydrating here. This is a bug in React. Please file a bug."),(1&t.mode)==0)return c9(e,t,o,// de-opt to client rendering should have an error message.
null);if(oV(a)){var v,g,y,b,w,_,k,x=((b=a.nextSibling&&a.nextSibling.dataset)&&(v=b.dgst,g=b.msg,y=b.stck),{message:g,digest:v,stack:y});return w=x.digest,_=x.message,k=x.stack,c9(e,t,o,cA(_?Error(_):Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering."),w,k))}// any context has changed, we need to treat is as if the input might have changed.
var S=(o&e.childLanes)!=0;if(c$||S){// This boundary has changed since the first render. This means that we are now unable to
// hydrate it. We might still be able to hydrate it using a higher priority lane.
var E=d8;if(null!==E){var C=function(e,t){var n;switch(t&-t){case 4:n=2;break;case 16:n=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:n=32;break;case 536870912:n=268435456;break;default:// Everything else is already either a hydration lane, or shouldn't
// be retried at a hydration lane.
n=0}// Check if the lane we chose is suspended. If so, that indicates that we
return(// already attempted and failed to hydrate at that level. Also check if we're
// already rendering that lane, which is rare but could happen.
(n&(e.suspendedLanes|t))!=0?0:n)}(E,o);0!==C&&C!==i.retryLane&&(// Intentionally mutating since this render will get interrupted. This
// is one of the very rare times where we mutate the current tree
// during the render phase.
i.retryLane=C,l_(e,C),fN(E,e,C,-1))}// If we have scheduled higher pri work above, this will probably just abort the render
return(// since we now have higher priority work, but in case it doesn't, we need to prepare to
// render something, if we time out. Even if that requires us to delete everything and
// skip hydration.
// Delay having to do this as long as the suspense timeout allows us.
fY(),c9(e,t,o,cA(Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."))))}if(oB(a)){// This component is still pending more data from the server, so we can't hydrate its
// content. We treat it as if this component suspended itself. It might seem as if
// we could just try to render it client-side instead. However, this will perform a
// lot of unnecessary work and is unlikely to complete since it often will suspend
// on missing data anyway. Additionally, the server might be able to render more
// than we can on the client yet. In that case we'd end up with more fallback states
// on the client than if we just leave it alone. If the server times out or errors
// these should update this boundary to the permanent Fallback state instead.
// Mark it as having captured (i.e. suspended).
t.flags|=128,t.child=e.child;var T=f4.bind(null,e);return a._reactRetry=T,null}s=t,l=a,u=i.treeContext,sF=oW(l.nextSibling),sz=s,sj=!0,sB=null,sq=!1,null!==u&&(sU(),sT[sO++]=sP,sT[sO++]=sI,sT[sO++]=sR,sP=u.id,sI=u.overflow,sR=s);var O=c8(t,r.children);// Mark the children as hydrating. This is a fast path to know whether this
return(// tree is part of a hydrating tree. This is used to determine if a child
// node has fully mounted yet, and for scheduling event replaying.
// Conceptually this is similar to Placement in that a new subtree is
// inserted into the React tree here. It just happens to not need DOM
// mutations because it already exists.
O.flags|=/*                    */4096,O)}(e,t,o,r,b,y,n)}if(i){var w,_,k,x,S,E,C,T=r.fallback,O=(w=r.children,x=t.mode,E=(S=e.child).sibling,C={mode:"hidden",children:w},(1&x)==0&&// Make sure we're on the second pass, i.e. the primary child fragment was
// already cloned. In legacy mode, the only case where this isn't true is
// when DevTools forces us to display a fallback; we skip the first render
// pass entirely and go straight to rendering the fallback. (In Concurrent
// Mode, SuspenseList can also trigger this scenario, but this is a legacy-
// only codepath.)
t.child!==S?((_=t.child).childLanes=0,_.pendingProps=C,2&t.mode&&(// Reset the durations from the first pass so they aren't included in the
// final amounts. This seems counterintuitive, since we're intentionally
// not measuring part of the render phase, but this makes it match what we
// do in Concurrent Mode.
_.actualDuration=0,_.actualStartTime=-1,_.selfBaseDuration=S.selfBaseDuration,_.treeBaseDuration=S.treeBaseDuration),// However, since we're going to remain on the fallback, we no longer want
// to delete it.
t.deletions=null):// (We don't do this in legacy mode, because in legacy mode we don't re-use
// the current tree; see previous branch.)
(_=pv(S,C)).subtreeFlags=14680064&S.subtreeFlags,null!==E?k=pv(E,T):(k=pb(T,x,n,null),// mounted but this is a new fiber.
k.flags|=2),k.return=t,_.return=t,_.sibling=k,t.child=_,k),R=t.child,P=e.child.memoizedState;return R.memoizedState=null===P?c4(n):{baseLanes:P.baseLanes|n,cachePool:null,transitions:P.transitions},R.childLanes=e.childLanes&~n,t.memoizedState=c5,O}var I=function(e,t,n,r){var a=e.child,i=a.sibling,o=pv(a,{mode:"visible",children:n});if((1&t.mode)==0&&(o.lanes=r),o.return=t,o.sibling=null,null!==i){// Delete the fallback child fragment
var s=t.deletions;null===s?(t.deletions=[i],t.flags|=16):s.push(i)}return t.child=o,o}(e,t,r.children,n);return t.memoizedState=null,I}function c8(e,t,n){var r=c7({mode:"visible",children:t},e.mode);return r.return=e,e.child=r,r}function c7(e,t,n){// The props argument to `createFiberFromOffscreen` is `any` typed, so we use
// this wrapper function to constrain it.
return pw(e,t,0,null)}function c9(e,t,n,r){null!==r&&s2(r),// This will add the old fiber to the deletion list
lY(t,e.child,null,n);var a=t.pendingProps.children,i=c8(t,a);return(// mounted but this is a new fiber.
i.flags|=2,t.memoizedState=null,i)}function de(e,t,n){e.lanes=e.lanes|t;var r=e.alternate;null!==r&&(r.lanes=r.lanes|t),lm(e.return,t,n)}function dt(e,t){var n=t4(e),r=!n&&"function"==typeof tv(e);if(n||r){var a=n?"array":"iterable";return eL("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>",a,t,a),!1}return!0}function dn(e,t,n,r,a){var i=e.memoizedState;null===i?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:a}:(// We can reuse the existing object from previous renders.
i.isBackwards=t,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=a)}// This can end up rendering this component multiple passes.
// The first pass splits the children fibers into two sets. A head and tail.
// We first render the head. If anything is in fallback state, we do another
// pass through beginWork to rerender all children (including the tail) with
// the force suspend context. If the first render didn't have anything in
// in fallback state. Then we render each row in the tail one-by-one.
// That happens in the completeWork phase without going back to beginWork.
function dr(e,t,n){var r=t.pendingProps,a=r.revealOrder,i=r.tail,o=r.children;(function(e){if(void 0!==e&&"forwards"!==e&&"backwards"!==e&&"together"!==e&&!eg[e]){if(eg[e]=!0,"string"==typeof e)switch(e.toLowerCase()){case"together":case"forwards":case"backwards":eL('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.',e,e.toLowerCase());break;case"forward":case"backward":eL('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.',e,e.toLowerCase());break;default:eL('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}else eL('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?',e)}})(a),void 0===i||ey[i]||("collapsed"!==i&&"hidden"!==i?(ey[i]=!0,eL('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?',i)):"forwards"!==a&&"backwards"!==a&&(ey[i]=!0,eL('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?',i))),function(e,t){if(("forwards"===t||"backwards"===t)&&null!=e&&!1!==e){if(t4(e)){for(var n=0;n<e.length;n++)if(!dt(e[n],n))return}else{var r=tv(e);if("function"==typeof r){var a=r.call(e);if(a)for(var i=a.next(),o=0;!i.done;i=a.next()){if(!dt(i.value,o))return;o++}}else eL('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?',t)}}}(o,a),cH(e,t,o,n);var s=l6.current;if((2&s)!=0?(s=1&s|2,t.flags|=128):(null!==e&&(128&e.flags)!=0&&// on any nested boundaries to let them know to try to render
// again. This is the same as context updating.
function(e,t,n){for(// Mark any Suspense boundaries with fallbacks as having work to do.
// If they were previously forced into fallbacks, they may now be able
// to unblock.
var r=t;null!==r;){if(13===r.tag)null!==r.memoizedState&&de(r,n,e);else if(19===r.tag)// to schedule work on. In this case we have to schedule it on the
// list itself.
// We don't have to traverse to the children of the list since
// the list will propagate the change when it rerenders.
de(r,n,e);else if(null!==r.child){r.child.return=r,r=r.child;continue}if(r===e)return;for(;null===r.sibling;){if(null===r.return||r.return===e)return;r=r.return}r.sibling.return=r.return,r=r.sibling}}(t,t.child,n),s&=1),l8(t,s),(1&t.mode)==0)// use make it a noop by treating it as the default revealOrder.
t.memoizedState=null;else switch(a){case"forwards":var l,u=function(e){for(// This is going to find the last row among these children that is already
// showing content on the screen, as opposed to being in fallback state or
// new. If a row has multiple Suspense boundaries, any of them being in the
// fallback state, counts as the whole row being in a fallback state.
// Note that the "rows" will be workInProgress, but any nested children
// will still be current since we haven't rendered them yet. The mounted
// order may not be the same as the new order. We use the new order.
var t=e,n=null;null!==t;){var r=t.alternate;// New rows can't be content rows.
null!==r&&null===l7(r)&&(n=t),t=t.sibling}return n}(t.child);null===u?(// The whole list is part of the tail.
// TODO: We could fast path by just rendering the tail now.
l=t.child,t.child=null):(// Disconnect the tail rows after the content row.
// We're going to render them separately later.
l=u.sibling,u.sibling=null),dn(t,!1,l,u,i);break;case"backwards":// We're going to find the first row that has existing content.
// At the same time we're going to reverse the list of everything
// we pass in the meantime. That's going to be our tail in reverse
// order.
var c=null,d=t.child;for(t.child=null;null!==d;){var f=d.alternate;// New rows can't be content rows.
if(null!==f&&null===l7(f)){// This is the beginning of the main content.
t.child=d;break}var p=d.sibling;d.sibling=c,c=d,d=p}// TODO: If workInProgress.child is null, we can continue on the tail immediately.
dn(t,!0,c,null,i);break;case"together":dn(t,!1,null,null,void 0);break;default:// The default reveal order is the same as not having
// a boundary.
t.memoizedState=null}return t.child}var da=!1,di=!1;function ds(e,t){(1&t.mode)==0&&null!==e&&(// A lazy component only mounts if it suspended inside a non-
// concurrent tree, in an inconsistent state. We want to treat it like
// a new mount, even though an empty version of it already committed.
// Disconnect the alternate pointers.
e.alternate=null,t.alternate=null,t.flags|=2)}function dl(e,t,n){var r;return(null!==e&&(t.dependencies=e.dependencies),cE=-1,r=t.lanes,fi|=r,(n&t.childLanes)!=0)?(// This fiber doesn't have work, but its subtree does. Clone the child
// fibers and continue.
function(e,t){if(null!==e&&t.child!==e.child)throw Error("Resuming work not yet implemented.");if(null!==t.child){var n=t.child,r=pv(n,n.pendingProps);for(t.child=r,r.return=t;null!==n.sibling;)n=n.sibling,(r=r.sibling=pv(n,n.pendingProps)).return=t;r.sibling=null}}// Reset a workInProgress child set to prepare it for a second pass.
(e,t),t.child):null}function du(e,t){return(e.lanes&t)!=0}function dc(e,t,n){if(t._debugNeedsRemount&&null!==e)return function(e,t,n){var r=t.return;if(null===r)throw Error("Cannot swap the root fiber.");if(// Disconnect from the old current.
// It will get deleted.
e.alternate=null,t.alternate=null,n.index=t.index,n.sibling=t.sibling,n.return=t.return,n.ref=t.ref,t===r.child)r.child=n;else{var a=r.child;if(null===a)throw Error("Expected parent to have a child.");for(;a.sibling!==t;)if(null===(a=a.sibling))throw Error("Expected to find the previous sibling.");a.sibling=n}// Delete the old fiber and place the new one.
// Since the old fiber is disconnected, we have to schedule it manually.
var i=r.deletions;return null===i?(r.deletions=[e],r.flags|=16):i.push(e),n.flags|=2,n}(e,t,pg(t.type,t.key,t.pendingProps,t._debugOwner||null,t.mode,t.lanes));if(null!==e){if(e.memoizedProps!==t.pendingProps||sc()||t.type!==e.type)// This may be unset if the props are determined to be equal later (memo).
c$=!0;else{if(!du(e,n)&&// If this is the second pass of an error or suspense boundary, there
// may not be work scheduled on `current`, so we check for this flag.
(128&t.flags)==0)return(// No pending updates or context. Bail out now.
c$=!1,function(e,t,n){// This fiber does not have any pending work. Bailout without entering
// the begin phase. There's still some bookkeeping we that needs to be done
// in this optimized path, mostly pushing stuff onto the stack.
switch(t.tag){case 3:c1(t),t.stateNode,s0();break;case 5:l5(t);break;case 1:sd(t.type)&&sv(t);break;case 4:l1(t,t.stateNode.containerInfo);break;case 10:var r=t.memoizedProps.value,a=t.type._context;lp(t,a,r);break;case 12:(n&t.childLanes)!=0&&(t.flags|=4);// Reset effect durations for the next eventual effect phase.
// These are reset during render to allow the DevTools commit hook a chance to read them,
var i=t.stateNode;i.effectDuration=0,i.passiveEffectDuration=0;break;case 13:var o=t.memoizedState;if(null!==o){if(null!==o.dehydrated)// upgrade it. We return null instead of bailoutOnAlreadyFinishedWork.
return l8(t,1&l6.current),// been unsuspended it has committed as a resolved Suspense component.
// If it needs to be retried, it should have work scheduled on it.
t.flags|=128,null;// If this boundary is currently timed out, we need to decide
if((n&t.child.childLanes)!=0)// to attempt to render the primary children again.
return c6(e,t,n);// The primary child fragment does not have pending work marked
// on it
l8(t,1&l6.current);// The primary children do not have pending work with sufficient
// priority. Bailout.
var s=dl(e,t,n);if(null!==s)// primary children and work on the fallback.
return s.sibling;// whether there were nested context consumers, via the call to
// `bailoutOnAlreadyFinishedWork` above.
return null}l8(t,1&l6.current);break;case 19:var l=(128&e.flags)!=0,u=(n&t.childLanes)!=0;if(l){if(u)// same children then we're still in progressive loading state.
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
c.rendering=null,c.tail=null,c.lastEffect=null),l8(t,l6.current),!u)// them got retried so they'll still be blocked in the same way
// as before. We can fast bail out.
return null;break;case 22:case 23:return(// Need to check if the tree still needs to be deferred. This is
// almost identical to the logic used in the normal update path,
// so we'll just enter that. The only difference is we'll bail out
// at the next level instead of this one, because the child props
// have not changed. Which is fine.
// TODO: Probably should refactor `beginWork` to split the bailout
// path from the normal path. I'm tempted to do a labeled break here
// but I won't :)
t.lanes=0,cG(e,t,n))}return dl(e,t,n)}(e,t,n));// See https://github.com/facebook/react/pull/19216.
c$=(131072&e.flags)!=0}}else if(c$=!1,sj&&(sU(),(1048576&t.flags)!=0)){// Check if this child belongs to a list of muliple children in
// its parent.
//
// In a true multi-threaded implementation, we would render children on
// parallel threads. This would represent the beginning of a new render
// thread for this subtree.
//
// We only use this for id generation during hydration, which is why the
// logic is located in this special branch.
var r=t.index;sN(t,(sU(),sC),r)}// Before entering the begin phase, clear pending update priority.
switch(// TODO: This assumes that we're about to evaluate the component and process
// the update queue. However, there's an exception: SimpleMemoComponent
// sometimes bails out later in the begin phase. This indicates that we should
// move this assignment out of the common path and into each branch.
t.lanes=0,t.tag){case 2:return function(e,t,n,r){ds(e,t);var a,i,o,s=t.pendingProps,l=ss(t,n,!1);if(a=su(t,l),lv(t,r),rB(t),n.prototype&&"function"==typeof n.prototype.render){var u=tC(n)||"Unknown";ed[u]||(eL("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.",u,u),ed[u]=!0)}// Support for module components is deprecated and is removed behind a flag.
// Whether or not it would crash later, we want to show a good message in DEV first.
if(8&t.mode&&s5.recordLegacyContextWarning(t,null),tI=!0,cW.current=t,i=uw(null,t,n,s,a,r),o=u_(),tI=!1,rV(),t.flags|=1,"object"==typeof i&&null!==i&&"function"==typeof i.render&&void 0===i.$$typeof){var c=tC(n)||"Unknown";ef[c]||(eL("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",c,c,c),ef[c]=!0)}if("object"==typeof i&&null!==i&&"function"==typeof i.render&&void 0===i.$$typeof){var d=tC(n)||"Unknown";ef[d]||(eL("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.",d,d,d),ef[d]=!0),t.tag=1,t.memoizedState=null,t.updateQueue=null;// During mounting we don't know the child context yet as the instance doesn't exist.
// We will invalidate the child context in finishClassComponent() right after rendering.
var f=!1;return sd(n)?(f=!0,sv(t)):f=!1,t.memoizedState=null!==i.state&&void 0!==i.state?i.state:null,lx(t),lU(t,i),lj(t,n,s,r),c0(null,t,n,!0,f,r)}if(// Proceed under the assumption that this is a function component
t.tag=0,8&t.mode){rz(!0);try{i=uw(null,t,n,s,a,r),o=u_()}finally{rz(!1)}}return sj&&o&&sL(t),cH(null,t,i,r),c3(t,n),t.child}(e,t,t.type,n);case 16:var a=t.elementType;return function(e,t,n,r){ds(e,t);var a,i=t.pendingProps,o=n._payload,s=(0,n._init)(o);t.type=s;var l=t.tag=function(e){if("function"==typeof e)return pm(e)?1:0;if(null!=e){var t=e.$$typeof;if(t===tu)return 11;if(t===tf)return 14}return 2}// This is used to create an alternate fiber to do work on.
(s),u=lo(s,i);switch(l){case 0:return c3(t,s),t.type=s=pu(s),cJ(null,t,s,u,r);case 1:return t.type=s=pu(s),cZ(null,t,s,u,r);case 11:return t.type=s=pc(s),cY(null,t,s,u,r);case 14:if(t.type!==t.elementType){var c=s.propTypes;c&&o8(c,u,"prop",tC(s))}return cQ(null,t,s,lo(s.type,u),r)}var d="";// because the fact that it's a separate type of work is an
// implementation detail.
throw null!==s&&"object"==typeof s&&s.$$typeof===tp&&(d=" Did you wrap a component in React.lazy() more than once?"),Error("Element type is invalid. Received a promise that resolves to: "+s+". Lazy element type must resolve to a class or function."+d)}(e,t,a,n);case 0:var i=t.type,o=t.pendingProps,s=t.elementType===i?o:lo(i,o);return cJ(e,t,i,s,n);case 1:var l=t.type,u=t.pendingProps,c=t.elementType===l?u:lo(l,u);return cZ(e,t,l,c,n);case 3:return function(e,t,n){if(c1(t),null===e)throw Error("Should have a current fiber. This is a bug in React.");var r=t.pendingProps,a=t.memoizedState,i=a.element;lS(e,t),lR(t,r,null,n);var o=t.memoizedState;t.stateNode;// being called "element".
var s=o.element;if(a.isDehydrated){// This is a hydration root whose shell has not yet hydrated. We should
// attempt to hydrate.
// Flip isDehydrated to false to indicate that when this render
// finishes, the root will no longer be dehydrated.
var l={element:s,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions};if(// have reducer functions so it doesn't need rebasing.
t.updateQueue.baseState=l,t.memoizedState=l,256&t.flags){// Something errored during a previous attempt to hydrate the shell, so we
// forced a client render.
var u=cM(Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."),t);return c2(e,t,s,n,u)}if(s!==i){var c=cM(Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."),t);return c2(e,t,s,n,c)}// The outermost shell has not hydrated yet. Start hydrating.
sF=oW(t.stateNode.containerInfo.firstChild),sz=t,sj=!0,sB=null,sq=!1;var d=lQ(t,null,s,n);t.child=d;for(var f=d;f;)// Mark each child as hydrating. This is a fast path to know whether this
// tree is part of a hydrating tree. This is used to determine if a child
// node has fully mounted yet, and for scheduling event replaying.
// Conceptually this is similar to Placement in that a new subtree is
// inserted into the React tree here. It just happens to not need DOM
// mutations because it already exists.
f.flags=-3&f.flags|4096,f=f.sibling}else{if(// Root is not dehydrated. Either this is a client-only root, or it
// already hydrated.
s0(),s===i)return dl(e,t,n);cH(e,t,s,n)}return t.child}(e,t,n);case 5:return l5(t),null===e&&sG(t),_=t.type,k=t.pendingProps,x=null!==e?e.memoizedProps:null,S=k.children,oM(_,k)?// case. We won't handle it as a reified child. We will instead handle
// this in the host environment that also has access to this prop. That
// avoids allocating another HostText fiber and traversing it.
S=null:null!==x&&oM(_,x)&&// empty, we need to schedule the text content to be reset.
(t.flags|=/*                 */32),cX(e,t),cH(e,t,S,n),t.child;case 6:return null===e&&sG(t),null;case 13:return c6(e,t,n);case 4:return l1(t,t.stateNode.containerInfo),E=t.pendingProps,null===e?// but at commit. Therefore we need to track insertions which the normal
// flow doesn't do during mount. This doesn't happen at the root because
// the root always starts with a "current" with a null child.
// TODO: Consider unifying this with how the root works.
t.child=lY(t,null,E,n):cH(e,t,E,n),t.child;case 11:var d=t.type,f=t.pendingProps,p=t.elementType===d?f:lo(d,f);return cY(e,t,d,p,n);case 7:return C=t.pendingProps,cH(e,t,C,n),t.child;case 8:return T=t.pendingProps.children,cH(e,t,T,n),t.child;case 12:return t.flags|=4,(O=t.stateNode).effectDuration=0,O.passiveEffectDuration=0,R=t.pendingProps.children,cH(e,t,R,n),t.child;case 10:return function(e,t,n){var r=t.type._context,a=t.pendingProps,i=t.memoizedProps,o=a.value;"value"in a||da||(da=!0,eL("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));var s=t.type.propTypes;if(s&&o8(s,a,"prop","Context.Provider"),lp(t,r,o),null!==i){if(iT(i.value,o))// No change. Bailout early if children are the same.
{if(i.children===a.children&&!sc())return dl(e,t,n)}else// them to update.
(function(e,t,n){var r=e.child;for(null!==r&&(r.return=e);null!==r;){var a=void 0,i=r.dependencies;// Visit this fiber.
if(null!==i){a=r.child;for(var o=i.firstContext;null!==o;){// Check if the context matches.
if(o.context===t){// Match! Schedule an update on this fiber.
if(1===r.tag){var s,l=lE(-1,(s=n)&-s);l.tag=2;// TODO: Because we don't have a work-in-progress, this will add the
// update to the current fiber, too, which means it will persist even if
// this render is thrown away. Since it's a race condition, not sure it's
// worth fixing.
// Inlined `enqueueUpdate` to remove interleaved update check
var u=r.updateQueue;if(null===u);else{var c=u.shared,d=c.pending;null===d?l.next=l:(l.next=d.next,d.next=l),c.pending=l}}r.lanes=r.lanes|n;var f=r.alternate;null!==f&&(f.lanes=f.lanes|n),lm(r.return,n,e),i.lanes=i.lanes|n;break}o=o.next}}else if(10===r.tag)a=r.type===e.type?null:r.child;else if(18===r.tag){// If a dehydrated suspense boundary is in this subtree, we don't know
// if it will have any context consumers in it. The best we can do is
// mark it as having updates.
var p=r.return;if(null===p)throw Error("We just came from a parent so we must have had a parent. This is a bug in React.");p.lanes=p.lanes|n;var h=p.alternate;null!==h&&(h.lanes=h.lanes|n),// This is intentionally passing this fiber as the parent
// because we want to schedule this fiber as having work
// on its children. We'll use the childLanes on
// this fiber to indicate that a context has changed.
lm(p,n,e),a=r.sibling}else a=r.child;if(null!==a)a.return=r;else for(// No child. Traverse to next sibling.
a=r;null!==a;){if(a===e){// We're back to the root of this subtree. Exit.
a=null;break}var m=a.sibling;if(null!==m){// Set the return pointer of the sibling to the work-in-progress fiber.
m.return=a.return,a=m;break}// No more siblings. Traverse up.
a=a.return}r=a}})(t,r,n)}return cH(e,t,a.children,n),t.child}(e,t,n);case 9:return void 0===(y=t.type)._context?y===y.Consumer||di||(di=!0,eL("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")):y=y._context,"function"!=typeof(b=t.pendingProps.children)&&eL("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."),lv(t,n),w=lg(y),rB(t),cW.current=t,tI=!0,g=b(w),tI=!1,rV(),t.flags|=1,cH(e,t,g,n),t.child;case 14:var h=t.type,m=lo(h,t.pendingProps);if(t.type!==t.elementType){var v=h.propTypes;v&&o8(v,m,"prop",tC(h))}return m=lo(h.type,m),cQ(e,t,h,m,n);case 15:return cK(e,t,t.type,t.pendingProps,n);case 17:var g,y,b,w,_,k,x,S,E,C,T,O,R,P,I=t.type,D=t.pendingProps,N=t.elementType===I?D:lo(I,D);return ds(e,t),t.tag=1,sd(I)?(P=!0,sv(t)):P=!1,lv(t,n),lz(t,I,N),lj(t,I,N,n),c0(null,t,I,!0,P,n);case 19:return dr(e,t,n);case 21:break;case 22:return cG(e,t,n)}throw Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function dd(e){// Tag the fiber with an update effect. This turns a Placement into
// a PlacementAndUpdate.
e.flags|=4}function df(e){e.flags|=512,e.flags|=2097152}function dp(e,t){if(!sj)switch(e.tailMode){case"hidden":for(// Any insertions at the end of the tail list after this point
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
var a=e.tail,i=null;null!==a;)null!==a.alternate&&(i=a),a=a.sibling;// Next we're simply going to delete all insertions after the
// last rendered item.
null===i?t||null===e.tail?e.tail=null:// row at the tail. So we'll keep on and cut off the rest.
e.tail.sibling=null:// inserted.
i.sibling=null}}function dh(e){var t=null!==e.alternate&&e.alternate.child===e.child,n=0,r=0;if(t){// Bubble up the earliest expiration time.
if((2&e.mode)!=0){for(// In profiling mode, resetChildExpirationTime is also used to reset
// profiler durations.
var a=e.selfBaseDuration,i=e.child;null!==i;)n|=i.lanes|i.childLanes,// so we should bubble those up even during a bailout. All the other
// flags have a lifetime only of a single render + commit, so we should
// ignore them.
r|=14680064&i.subtreeFlags,r|=14680064&i.flags,a+=i.treeBaseDuration,i=i.sibling;e.treeBaseDuration=a}else for(var o=e.child;null!==o;)n|=o.lanes|o.childLanes,// so we should bubble those up even during a bailout. All the other
// flags have a lifetime only of a single render + commit, so we should
// ignore them.
r|=14680064&o.subtreeFlags,r|=14680064&o.flags,// smell because it assumes the commit phase is never concurrent with
// the render phase. Will address during refactor to alternate model.
o.return=e,o=o.sibling;e.subtreeFlags|=r}else{// Bubble up the earliest expiration time.
if((2&e.mode)!=0){for(// In profiling mode, resetChildExpirationTime is also used to reset
// profiler durations.
var s=e.actualDuration,l=e.selfBaseDuration,u=e.child;null!==u;)n|=u.lanes|u.childLanes,r|=u.subtreeFlags,r|=u.flags,// only be updated if work is done on the fiber (i.e. it doesn't bailout).
// When work is done, it should bubble to the parent's actualDuration. If
// the fiber has not been cloned though, (meaning no work was done), then
// this value will reflect the amount of time spent working on a previous
// render. In that case it should not bubble. We determine whether it was
// cloned by comparing the child pointer.
s+=u.actualDuration,l+=u.treeBaseDuration,u=u.sibling;e.actualDuration=s,e.treeBaseDuration=l}else for(var c=e.child;null!==c;)n|=c.lanes|c.childLanes,r|=c.subtreeFlags,r|=c.flags,// smell because it assumes the commit phase is never concurrent with
// the render phase. Will address during refactor to alternate model.
c.return=e,c=c.sibling;e.subtreeFlags|=r}return e.childLanes=n,t}function dm(e,t,n){var r=t.pendingProps;// Note: This intentionally doesn't check if we're hydrating because comparing
switch(// to the current tree provider fiber is just as fast and less error-prone.
// Ideally we would have a special version of the work loop only
// for hydration.
sA(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return dh(t),null;case 1:case 17:return sd(t.type)&&sf(t),dh(t),null;case 3:var a=t.stateNode;return l2(t),sp(t),ue(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),null!==e&&null!==e.child||(sJ(t)?// the commit side-effects on the root.
dd(t):null===e||e.memoizedState.isDehydrated&&// Check if we reverted to client rendering (e.g. due to an error)
(256&t.flags)==0||(// Schedule an effect to clear this container at the start of the
// next commit. This handles the case of React rendering into a
// container with previous children. It's also safe to do for
// updates too, because current.child would only be null if the
// previous render was null (so the container would already
// be empty).
t.flags|=1024,// recoverable errors during first hydration attempt. If so, add
// them to a queue so we can log them in the commit phase.
s1())),ew(e,t),dh(t),null;case 5:l4(t);var i=l0(),o=t.type;if(null!==e&&null!=t.stateNode)e_(e,t,o,r,i),e.ref!==t.ref&&df(t);else{if(!r){if(null===t.stateNode)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");return(// This can happen when we abort work.
dh(t),null)}var s,l,u,c,d,f=l3();// TODO: Move createInstance to beginWork and keep it on a context
if(sJ(t))u=t.stateNode,c=!sq,s=t.type,l=t.memoizedProps,u[oQ]=t,u[oK]=l,d=function(e,t,n,r,a,i,o){switch(s=nA(t,n),U(t,n),t){case"dialog":i2("cancel",e),i2("close",e);break;case"iframe":case"object":case"embed":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the load event.
i2("load",e);break;case"video":case"audio":// We listen to these events in case to ensure emulated bubble
// listeners still fire for all the media events.
for(var s,l,u=0;u<iJ.length;u++)i2(iJ[u],e);break;case"source":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the error event.
i2("error",e);break;case"img":case"image":case"link":// We listen to these events in case to ensure emulated bubble
// listeners still fire for error and load events.
i2("error",e),i2("load",e);break;case"details":// We listen to this event in case to ensure emulated bubble
// listeners still fire for the toggle event.
i2("toggle",e);break;case"input":tG(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;case"option":t5(e,n);break;case"select":ne(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;case"textarea":nr(e,n),// listeners still fire for the invalid event.
i2("invalid",e)}nM(t,n),l=new Set;for(var c=e.attributes,d=0;d<c.length;d++)switch(c[d].name.toLowerCase()){// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
case"value":case"checked":case"selected":break;default:// Intentionally use the original name.
// See discussion in https://github.com/facebook/react/pull/10676.
l.add(c[d].name)}var f=null;for(var p in n)if(n.hasOwnProperty(p)){var h=n[p];if(p===ol)// For text content children we compare against textContent. This
// might match additional HTML that is hidden when we read it using
// textContent. E.g. "foo" will match "f<span>oo</span>" but that still
// satisfies our requirement. Our requirement is not to produce perfect
// HTML and attributes. Ideally we should preserve structure but it's
// ok not to if the visible content is still enough to indicate what
// even listeners these nodes might be wired up to.
// TODO: Warn if there is more than a single textNode as a child.
// TODO: Should we use domElement.firstChild.nodeValue to compare?
"string"==typeof h?e.textContent!==h&&(!0!==n[oo]&&oh(e.textContent,h,i,o),f=[ol,h]):"number"==typeof h&&e.textContent!==""+h&&(!0!==n[oo]&&oh(e.textContent,h,i,o),f=[ol,""+h]);else if(eU.hasOwnProperty(p))null!=h&&("function"!=typeof h&&j(p,h),"onScroll"===p&&i2("scroll",e));else if(o&&// Convince Flow we've calculated it (it's DEV-only in this method.)
"boolean"==typeof s){// Validate that the properties correspond to their expected values.
var m=void 0,v=e2(p);if(!0===n[oo]);else if(p===oi||p===oo||// Controlled attributes are not validated
// TODO: Only ignore them on controlled tags.
"value"===p||"checked"===p||"selected"===p);else if(p===oa){var g=e.innerHTML,y=h?h[oc]:void 0;if(null!=y){var b=B(e,y);b!==g&&z(p,g,b)}}else if(p===ou){if(// $FlowFixMe - Should be inferred as not undefined.
l.delete(p),q){var w=/**
 * Operations for dealing with CSS properties.
 *//**
 * This creates a string that is expected to be equivalent to the style
 * attribute generated by server-side rendering. It by-passes warnings and
 * security checks so it's not safe to use this value for anything other than
 * comparison. It is only used in DEV for SSR validation.
 */function(e){var t="",n="";for(var r in e)if(e.hasOwnProperty(r)){var a=e[r];if(null!=a){var i=0===r.indexOf("--");t+=n+(i?r:r.replace(nv,"-$1").toLowerCase().replace(ng,"-ms-"))+":"+nm(r,a,i),n=";"}}return t||null}(h);w!==(m=e.getAttribute("style"))&&z(p,m,w)}}else if(s)// $FlowFixMe - Should be inferred as not undefined.
l.delete(p.toLowerCase()),m=te(e,p,h),h!==m&&z(p,m,h);else if(!eZ(p,v,s)&&!e1(p,h,v,s)){var _=!1;if(null!==v)// $FlowFixMe - Should be inferred as not undefined.
l.delete(v.attributeName),m=/**
 * Get the value for a property on a node. Only used in DEV for SSR validation.
 * The "expected" argument is used as a hint of what the expected value is.
 * Some properties have multiple equivalent values.
 */function(e,t,n,r){if(r.mustUseProperty)return e[r.propertyName];e$(n,t),r.sanitizeURL&&// the hydration is successful of a javascript: URL, we
// still want to warn on the client.
// eslint-disable-next-line react-internal/safe-string-coercion
e9(""+n);var a=r.attributeName,i=null;if(4===r.type){if(e.hasAttribute(a)){var o=e.getAttribute(a);return""===o||(e1(t,n,r,!1)?o:o===""+n?n:o)}}else if(e.hasAttribute(a)){if(e1(t,n,r,!1))// for the error message.
return e.getAttribute(a);if(3===r.type)// the fact that we have it is the same as the expected.
return n;// Even if this property uses a namespace we use getAttribute
// because we assume its namespaced name is the same as our config.
// To use getAttributeNS we need the local name which we don't have
// in our config atm.
i=e.getAttribute(a)}return e1(t,n,r,!1)?null===i?n:i:i===""+n?n:i}(e,p,h,v);else{var k=r;if(k===no&&(k=nl(t)),k===no)l.delete(p.toLowerCase());else{var x=function(e){var t=e.toLowerCase();return nU.hasOwnProperty(t)&&nU[t]||null}(p);null!==x&&x!==p&&(// If an SVG prop is supplied with bad casing, it will
// be successfully parsed from HTML, but will produce a mismatch
// (and would be incorrectly rendered on the client).
// However, we already warn about bad casing elsewhere.
// So we'll skip the misleading extra mismatch warning in this case.
_=!0,l.delete(x)),l.delete(p)}m=te(e,p,h)}h===m||_||z(p,m,h)}}}switch(o&&l.size>0&&!0!==n[oo]&&F(l),t){case"input":// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
tq(e),tZ(e,n,!0);break;case"textarea":// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
tq(e),ni(e);break;case"select":case"option":break;default:"function"==typeof n.onClick&&og(e)}return f}(u,s,l,f.namespace,0,(1&t.mode)!=0,c),t.updateQueue=d,null!==d&&// commit-phase we mark this as such.
dd(t);else{var p=function(e,t,n,r,a){if(ok(e,null,r.ancestorInfo),"string"==typeof t.children||"number"==typeof t.children){var i=""+t.children,o=ox(r.ancestorInfo,e);ok(null,i,o)}var s=function(e,t,n,r){// tags get no namespace.
var a,i,o=om(n),s=r;if(s===no&&(s=nl(e)),s===no){if((a=nA(e,t))||e===e.toLowerCase()||eL("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.",e),"script"===e){// Create the script via .innerHTML so its "parser-inserted" flag is
// set to true and it does not execute
var l=o.createElement("div");l.innerHTML="<script></script>";// eslint-disable-line
// This is guaranteed to yield a script element.
var u=l.firstChild;i=l.removeChild(u)}else if("string"==typeof t.is)i=o.createElement(e,{is:t.is});else // attributes on `select`s needs to be added before `option`s are inserted.
// This prevents:
// - a bug where the `select` does not scroll to the correct option because singular
//  `select` elements automatically pick the first item #13222
// - a bug where the `select` set the first item as selected despite the `size` attribute #14239
// See https://github.com/facebook/react/issues/13222
// and https://github.com/facebook/react/issues/14239
if(// Separate else branch instead of using `props.is || undefined` above because of a Firefox bug.
// See discussion in https://github.com/facebook/react/pull/6896
// and discussion in https://bugzilla.mozilla.org/show_bug.cgi?id=1276240
i=o.createElement(e),"select"===e){var c=i;t.multiple?c.multiple=!0:t.size&&// it is possible that no option is selected.
//
// This is only necessary when a select in "single selection mode".
(c.size=t.size)}}else i=o.createElementNS(s,e);return s!==no||a||"[object HTMLUnknownElement]"!==Object.prototype.toString.call(i)||eB.call(A,e)||(A[e]=!0,eL("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.",e)),i}(e,t,n,r.namespace);return s[oQ]=a,s[oK]=t,s}(o,r,i,f,t);eb(p,t,!1,!1),t.stateNode=p,function(e,t,n,r,a){switch(function(e,t,n,r){var a,i,o=nA(t,n);switch(U(t,n),t){case"dialog":i2("cancel",e),i2("close",e),i=n;break;case"iframe":case"object":case"embed":// We listen to this event in case to ensure emulated bubble
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
i2("invalid",e);break;case"option":t5(e,n),i=n;break;case"select":ne(e,n),i=t9(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;case"textarea":nr(e,n),i=nn(e,n),// listeners still fire for the invalid event.
i2("invalid",e);break;default:i=n}switch(nM(t,i),function(e,t,n,r,a){for(var i in r)if(r.hasOwnProperty(i)){var o=r[i];if(i===ou)o&&// mutated. We have already warned for this in the past.
Object.freeze(o),nD(t,o);else if(i===oa){var s=o?o[oc]:void 0;null!=s&&nc(t,s)}else i===ol?"string"==typeof o?("textarea"!==e||""!==o)&&nd(t,o):"number"==typeof o&&nd(t,""+o):i===oi||i===oo||i===os||(eU.hasOwnProperty(i)?null!=o&&("function"!=typeof o&&j(i,o),"onScroll"===i&&i2("scroll",t)):null!=o&&tt(t,i,o,a))}}(t,e,0,i,o),t){case"input":// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
tq(e),tZ(e,n,!1);break;case"textarea":// TODO: Make sure we check if this is still unmounted or do any clean
// up necessary since we never stop tracking anymore.
tq(e),ni(e);break;case"option":null!=n.value&&e.setAttribute("value",""+tA(n.value));break;case"select":e.multiple=!!n.multiple,null!=(a=n.value)?t7(e,!!n.multiple,a,!1):null!=n.defaultValue&&t7(e,!!n.multiple,n.defaultValue,!0);break;default:"function"==typeof i.onClick&&og(e)}}// Calculate the diff between the two objects.
(e,t,n,0),t){case"button":case"input":case"select":case"textarea":return!!n.autoFocus;case"img":return!0;default:return!1}}(p,o,r,0)&&dd(t)}null!==t.ref&&df(t)}return dh(t),null;case 6:if(e&&null!=t.stateNode){var h=e.memoizedProps;// If we have an alternate, that means this is an update and we need
// to schedule a side-effect to do the updates.
ek(e,t,h,r)}else{if("string"!=typeof r&&null===t.stateNode)throw Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");var m,v,g=l0(),y=l3();sJ(t)?function(e){var t=e.stateNode,n=e.memoizedProps,r=(t[oQ]=e,e.mode,t.nodeValue!==n);if(r){// We assume that prepareToHydrateHostTextInstance is called in a context where the
// hydration parent is the parent host component of this host text.
var a=sz;if(null!==a)switch(a.tag){case 3:a.stateNode.containerInfo;var i=(1&a.mode)!=0;oh(t.nodeValue,n,i,!0);break;case 5:a.type;var o=a.memoizedProps,s=(a.stateNode,(1&a.mode)!=0);!0!==o[oD]&&oh(t.nodeValue,n,s,!0)}}return r}(t)&&dd(t):t.stateNode=(ok(null,r,y.ancestorInfo),(v=om(g).createTextNode(r))[oQ]=t,v)}return dh(t),null;case 13:st(l6,t);var b=t.memoizedState;// Special path for dehydrated boundaries. We may eventually move this
// to its own fiber type so that we can add other kinds of hydration
// boundaries that aren't associated with a Suspense tree. In anticipation
// of such a refactor, all the hydration logic is contained in
// this branch.
if((null===e||null!==e.memoizedState&&null!==e.memoizedState.dehydrated)&&!function(e,t,n){if(sj&&null!==sF&&(1&t.mode)!=0&&(128&t.flags)==0)return sZ(t),s0(),t.flags|=98560,!1;var r=sJ(t);if(null===n||null===n.dehydrated)return(// Successfully completed this tree. If this was a forced client render,
// there may have been recoverable errors during first hydration
// attempt. If so, add them to a queue so we can log them in the
// commit phase.
s1(),!0);// We might be inside a hydration state the first time we're picking up this
// Suspense boundary, and also after we've reentered it for further hydration.
if(null===e){if(!r)throw Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");if(function(e){var t=e.memoizedState,n=null!==t?t.dehydrated:null;if(!n)throw Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");n[oQ]=e}(t),dh(t),(2&t.mode)!=0&&null!==n){// Don't count time spent in a timed out Suspense subtree as part of the base duration.
var a=t.child;null!==a&&(t.treeBaseDuration-=a.treeBaseDuration)}return!1}if(// We might have reentered this boundary to hydrate it. If so, we need to reset the hydration
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
t.lanes=n,(2&t.mode)!=0&&cL(t),t);var w=null!==b;// a passive effect, which is when we process the transitions
if(w!==(null!==e&&null!==e.memoizedState)&&w){var _=t.child;// in the concurrent tree already suspended during this render.
// This is a known bug.
_.flags|=/*                   */8192,(1&t.mode)!=0&&((null!==e||(t.memoizedProps.unstable_avoidThisFallback,0))&&(1&l6.current)==0?// suspend for longer if possible.
fY():0===fn&&(fn=3))}if(null!==t.updateQueue&&// TODO: Move to passive phase
(t.flags|=4),dh(t),(2&t.mode)!=0&&w){// Don't count time spent in a timed out Suspense subtree as part of the base duration.
var k=t.child;null!==k&&(t.treeBaseDuration-=k.treeBaseDuration)}return null;case 4:return l2(t),ew(e,t),null===e&&i4(t.stateNode.containerInfo),dh(t),null;case 10:return lh(t.type._context,t),dh(t),null;case 19:st(l6,t);var x=t.memoizedState;if(null===x)return(// We're running in the default, "independent" mode.
// We don't do anything in this mode.
dh(t),null);var S=(128&t.flags)!=0,E=x.rendering;if(null===E){// We just rendered the head.
if(S)dp(x,!1);else{if(!(0===fn&&(null===e||(128&e.flags)==0)))for(var C=t.child;null!==C;){var T=l7(C);if(null!==T){S=!0,t.flags|=128,dp(x,!1);// part of the second pass. In that case nothing will subscribe to
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
l8(t,1&l6.current|2),t.child}C=C.sibling}null!==x.tail&&rS()>fd&&(// We have already passed our CPU deadline but we still have rows
// left in the tail. We'll just give up further attempts to render
// the main content and only render fallbacks.
t.flags|=128,S=!0,dp(x,!1),// to get it started back up to attempt the next item. While in terms
// of priority this work has the same priority as this current render,
// it's not part of the same transition once the transition has
// committed. If it's sync, we still want to yield so that it can be
// painted. Conceptually, this is really the same as pinging.
// We can use any RetryLane even if it's the one currently rendering
// since we're leaving it behind on this node.
t.lanes=4194304)}}else{// Append the rendered row to the child list.
if(!S){var R=l7(E);if(null!==R){t.flags|=128,S=!0;// get lost if this row ends up dropped during a second pass.
var P=R.updateQueue;if(null!==P&&(t.updateQueue=P,t.flags|=4),dp(x,!0),null===x.tail&&"hidden"===x.tailMode&&!E.alternate&&!sj// We don't cut it if we're hydrating.
)return(// We're done.
dh(t),null)}else 2*// exceed it.
rS()-x.renderingStartTime>fd&&1073741824!==n&&(// We have now passed our CPU deadline and we'll just give up further
// attempts to render the main content and only render fallbacks.
// The assumption is that this is usually faster.
t.flags|=128,S=!0,dp(x,!1),// to get it started back up to attempt the next item. While in terms
// of priority this work has the same priority as this current render,
// it's not part of the same transition once the transition has
// committed. If it's sync, we still want to yield so that it can be
// painted. Conceptually, this is really the same as pinging.
// We can use any RetryLane even if it's the one currently rendering
// since we're leaving it behind on this node.
t.lanes=4194304)}if(x.isBackwards)// The effect list of the backwards tail will have been added
// to the end. This breaks the guarantee that life-cycles fire in
// sibling order but that isn't a strong guarantee promised by React.
// Especially since these might also just pop in during future commits.
// Append to the beginning of the list.
E.sibling=t.child,t.child=E;else{var I=x.last;null!==I?I.sibling=E:t.child=E,x.last=E}}if(null!==x.tail){// We still have tail rows to render.
// Pop a row.
var D=x.tail;x.rendering=D,x.tail=D.sibling,x.renderingStartTime=rS(),D.sibling=null;// TODO: We can probably just avoid popping it instead and only
// setting it the first time we go from not suspended to suspended.
var N=l6.current;// Don't bubble properties in this case.
return S?N=1&N|2:N&=1,l8(t,N),D}return dh(t),null;case 21:break;case 22:case 23:fV(t);var L=null!==t.memoizedState;return null!==e&&null!==e.memoizedState!==L&&(t.flags|=8192),L&&(1&t.mode)!=0?(1073741824&fe)!=0&&(dh(t),6&t.subtreeFlags&&(t.flags|=8192)):dh(t),null;case 24:case 25:return null}throw Error("Unknown unit of work tag ("+t.tag+"). This error is likely caused by a bug in React. Please file an issue.")}function dv(e,t,n){switch(// Note: This intentionally doesn't check if we're hydrating because comparing
// to the current tree provider fiber is just as fast and less error-prone.
// Ideally we would have a special version of the work loop only
// for hydration.
sA(t),t.tag){case 1:null!=t.type.childContextTypes&&sf(t);break;case 3:t.stateNode,l2(t),sp(t),ue();break;case 5:l4(t);break;case 4:l2(t);break;case 13:case 19:st(l6,t);break;case 10:lh(t.type._context,t);break;case 22:case 23:fV(t)}}// Mutation mode
eb=function(e,t,n,r){for(// We only have the top Fiber that was created but we need recurse down its
// children to find all the terminal nodes.
var a=t.child;null!==a;){if(5===a.tag||6===a.tag)!function(e,t){e.appendChild(t)}(e,a.stateNode);else if(4===a.tag);else if(null!==a.child){a.child.return=a,a=a.child;continue}if(a===t)return;for(;null===a.sibling;){if(null===a.return||a.return===t)return;a=a.return}a.sibling.return=a.return,a=a.sibling}},ew=function(e,t){},e_=function(e,t,n,r,a){// If we have an alternate, that means this is an update and we need to
// schedule a side-effect to do the updates.
var i=e.memoizedProps;if(i!==r){// component is hitting the resume path. Figure out why. Possibly
// related to `hidden`.
var o=function(e,t,n,r,a,i){if(typeof r.children!=typeof n.children&&("string"==typeof r.children||"number"==typeof r.children)){var o=""+r.children,s=ox(i.ancestorInfo,t);ok(null,o,s)}return function(e,t,n,r,a){U(t,r);var i,o,s,l,u=null;switch(t){case"input":i=tK(e,n),o=tK(e,r),u=[];break;case"select":i=t9(e,n),o=t9(e,r),u=[];break;case"textarea":i=nn(e,n),o=nn(e,r),u=[];break;default:i=n,o=r,"function"!=typeof i.onClick&&"function"==typeof o.onClick&&og(e)}nM(t,o);var c=null;for(s in i)if(!o.hasOwnProperty(s)&&i.hasOwnProperty(s)&&null!=i[s]){if(s===ou){var d=i[s];for(l in d)d.hasOwnProperty(l)&&(c||(c={}),c[l]="")}else s!==oa&&s!==ol&&s!==oi&&s!==oo&&s!==os&&(eU.hasOwnProperty(s)?u||(u=[]):// the allowed property list in the commit phase instead.
(u=u||[]).push(s,null))}for(s in o){var f=o[s],p=null!=i?i[s]:void 0;if(o.hasOwnProperty(s)&&f!==p&&(null!=f||null!=p)){if(s===ou){if(f&&// mutated. We have already warned for this in the past.
Object.freeze(f),p){// Unset styles on `lastProp` but not on `nextProp`.
for(l in p)!p.hasOwnProperty(l)||f&&f.hasOwnProperty(l)||(c||(c={}),c[l]="");// Update styles that changed since `lastProp`.
for(l in f)f.hasOwnProperty(l)&&p[l]!==f[l]&&(c||(c={}),c[l]=f[l])}else c||(u||(u=[]),u.push(s,c)),c=f}else if(s===oa){var h=f?f[oc]:void 0,m=p?p[oc]:void 0;null!=h&&m!==h&&(u=u||[]).push(s,h)}else s===ol?("string"==typeof f||"number"==typeof f)&&(u=u||[]).push(s,""+f):s!==oi&&s!==oo&&(eU.hasOwnProperty(s)?(null!=f&&("function"!=typeof f&&j(s,f),"onScroll"===s&&i2("scroll",e)),u||p===f||// that the "current" props pointer gets updated so we need a commit
// to update this element.
(u=[])):// filter it out using the allowed property list during the commit.
(u=u||[]).push(s,f))}}return c&&(/**
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
 */function(e,t){if(t){var n=nN(e),r=nN(t),a={};for(var i in n){var o=n[i],s=r[i];if(s&&o!==s){var l,u=o+","+s;if(a[u])continue;a[u]=!0,eL("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.",null==(l=e[o])||"boolean"==typeof l||""===l?"Removing":"Updating",o,s)}}}}(c,o[ou]),(u=u||[]).push(ou,c)),u}// Apply the diff.
(e,t,n,r)}(t.stateNode,n,i,r,0,l3());// TODO: Type this specific to this type of component.
t.updateQueue=o,o&&dd(t)}},ek=function(e,t,n,r){// If the text differs, mark it as an update. All the work in done in commitWork.
n!==r&&dd(t)};var dg=null;dg=new Set;// Allows us to avoid traversing the return path to find the nearest Offscreen ancestor.
// Only used when enableSuspenseLayoutEffectSemantics is enabled.
var dy=!1,db=!1,dw="function"==typeof WeakSet?WeakSet:Set,d_=null,dk=null,dx=null,dS=function(e,t){if(t.props=e.memoizedProps,t.state=e.memoizedState,2&e.mode)try{cN(),t.componentWillUnmount()}finally{cI(e)}else t.componentWillUnmount()};function dE(e,t){try{dD(4,e)}catch(n){f2(e,t,n)}}// Capture errors so they don't interrupt unmounting.
function dC(e,t,n){try{dS(e,n)}catch(n){f2(e,t,n)}}// Capture errors so they don't interrupt mounting.
function dT(e,t){try{dN(e)}catch(n){f2(e,t,n)}}function dO(e,t){var n,r=e.ref;if(null!==r){if("function"==typeof r){try{if(2&e.mode)try{cN(),n=r(null)}finally{cI(e)}else n=r(null)}catch(n){f2(e,t,n)}"function"==typeof n&&eL("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",tO(e))}else r.current=null}}function dR(e,t,n){try{n()}catch(n){f2(e,t,n)}}var dP=!1;function dI(e,t,n){var r=t.updateQueue,a=null!==r?r.lastEffect:null;if(null!==a){var i=a.next,o=i;do{if((o.tag&e)===e){// Unmount
var s=o.destroy;o.destroy=void 0,void 0!==s&&((8&e)!=/*   */0?null!==rM&&"function"==typeof rM.markComponentPassiveEffectUnmountStarted&&rM.markComponentPassiveEffectUnmountStarted(t):(4&e)!=0&&rW(t),(2&e)!=0&&(fP=!0),dR(t,n,s),(2&e)!=0&&(fP=!1),(8&e)!=0?null!==rM&&"function"==typeof rM.markComponentPassiveEffectUnmountStopped&&rM.markComponentPassiveEffectUnmountStopped():(4&e)!=0&&r$())}o=o.next}while(o!==i)}}function dD(e,t){var n=t.updateQueue,r=null!==n?n.lastEffect:null;if(null!==r){var a=r.next,i=a;do{if((i.tag&e)===e){(8&e)!=0?null!==rM&&"function"==typeof rM.markComponentPassiveEffectMountStarted&&rM.markComponentPassiveEffectMountStarted(t):(4&e)!=0&&null!==rM&&"function"==typeof rM.markComponentLayoutEffectMountStarted&&rM.markComponentLayoutEffectMountStarted(t);var o=i.create;(2&e)!=0&&(fP=!0),i.destroy=o(),(2&e)!=0&&(fP=!1),(8&e)!=0?null!==rM&&"function"==typeof rM.markComponentPassiveEffectMountStopped&&rM.markComponentPassiveEffectMountStopped():(4&e)!=0&&null!==rM&&"function"==typeof rM.markComponentLayoutEffectMountStopped&&rM.markComponentLayoutEffectMountStopped();var s=i.destroy;if(void 0!==s&&"function"!=typeof s){var l=void 0;l=(4&i.tag)!=0?"useLayoutEffect":(2&i.tag)!=0?"useInsertionEffect":"useEffect";var u=void 0;u=null===s?" You returned null. If your effect does not require clean up, return undefined (or nothing).":"function"==typeof s.then?"\n\nIt looks like you wrote "+l+"(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:\n\n"+l+"(() => {\n  async function fetchData() {\n    // You can await here\n    const response = await MyAPI.getData(someId);\n    // ...\n  }\n  fetchData();\n}, [someId]); // Or [] if effect doesn't need props or state\n\nLearn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching":" You returned: "+s,eL("%s must not return anything besides a function, which is used for clean-up.%s",l,u)}}i=i.next}while(i!==a)}}function dN(e){var t=e.ref;if(null!==t){var n,r=e.stateNode;if(e.tag,"function"==typeof t){if(2&e.mode)try{cN(),n=t(r)}finally{cI(e)}else n=t(r);"function"==typeof n&&eL("Unexpected return value from a callback ref in %s. A callback ref should not return a function.",tO(e))}else t.hasOwnProperty("current")||eL("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().",tO(e)),t.current=r}}function dL(e){return 5===e.tag||3===e.tag||4===e.tag}function dM(e){// We're going to search forward into the tree until we find a sibling host
// node. Unfortunately, if multiple insertions are done in a row we have to
// search past them. This leads to exponential search for the next sibling.
// TODO: Find a more efficient way to do this.
var t=e;t:for(;;){// If we didn't find anything, let's try the next sibling.
for(;null===t.sibling;){if(null===t.return||dL(t.return))// last sibling.
return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;5!==t.tag&&6!==t.tag&&18!==t.tag;){// If it is not host node and, we might have a host node inside it.
// Try to search down until we find one.
if(2&t.flags||null===t.child||4===t.tag)continue t;t.child.return=t,t=t.child}// Check if this host node is stable or about to be placed.
if(!(2&t.flags))return t.stateNode}}// deleted subtree.
// TODO: Update these during the whole mutation phase, not just during
// a deletion.
var dA=null,dU=!1;function dz(e,t,n){for(// TODO: Use a static flag to skip trees that don't have unmount effects
var r=n.child;null!==r;)dF(e,t,r),r=r.sibling}function dF(e,t,n){// into their subtree. There are simpler cases in the inner switch
// that don't modify the stack.
switch(function(e){if(rL&&"function"==typeof rL.onCommitFiberUnmount)try{rL.onCommitFiberUnmount(rN,e)}catch(e){rA||(rA=!0,eL("React instrumentation encountered an error: %s",e))}}(n),n.tag){case 5:db||dO(n,t);// Intentional fallthrough to next branch
// eslint-disable-next-line-no-fallthrough
case 6:var r,a,i,o,s=dA,l=dU;dA=null,dz(e,t,n),dA=s,dU=l,null!==dA&&(dU?(i=dA,o=n.stateNode,8===i.nodeType?i.parentNode.removeChild(o):i.removeChild(o)):function(e,t){e.removeChild(t)}(dA,n.stateNode));return;case 18:null!==dA&&(dU?(r=dA,a=n.stateNode,8===r.nodeType?oq(r.parentNode,a):1===r.nodeType&&oq(r,a),// Retry if any event replaying was blocked on this.
aE(r)):oq(dA,n.stateNode));return;case 4:// When we go into a portal, it becomes the parent to remove from.
var u=dA,c=dU;dA=n.stateNode.containerInfo,dU=!0,dz(e,t,n),dA=u,dU=c;return;case 0:case 11:case 14:case 15:if(!db){var d=n.updateQueue;if(null!==d){var f=d.lastEffect;if(null!==f){var p=f.next,h=p;do{var m=h,v=m.destroy,g=m.tag;void 0!==v&&((2&g)!=0?dR(n,t,v):(4&g)!=0&&(rW(n),2&n.mode?(cN(),dR(n,t,v),cI(n)):dR(n,t,v),r$())),h=h.next}while(h!==p)}}}dz(e,t,n);return;case 1:if(!db){dO(n,t);var y=n.stateNode;"function"==typeof y.componentWillUnmount&&dC(n,t,y)}dz(e,t,n);return;case 21:default:dz(e,t,n);return;case 22:if(1&n.mode){// If this offscreen component is hidden, we already unmounted it. Before
// deleting the children, track that it's already unmounted so that we
// don't attempt to unmount the effects again.
// TODO: If the tree is hidden, in most cases we should be able to skip
// over the nested children entirely. An exception is we haven't yet found
// the topmost host node to delete, which we already track on the stack.
// But the other case is portals, which need to be detached no matter how
// deeply they are nested. We should use a subtree flag to track whether a
// subtree includes a nested portal.
var b=db;db=b||null!==n.memoizedState,dz(e,t,n),db=b}else dz(e,t,n)}}function dj(e){// If this boundary just timed out, then it will have a set of wakeables.
// For each wakeable, attach a listener so that when it resolves, React
// attempts to re-render the boundary in the primary (pre-timeout) state.
var t=e.updateQueue;if(null!==t){e.updateQueue=null;var n=e.stateNode;null===n&&(n=e.stateNode=new dw),t.forEach(function(t){// Memoize using the boundary fiber to prevent redundant listeners.
var r=f6.bind(null,e,t);if(!n.has(t)){if(n.add(t),rU){if(null!==dk&&null!==dx)pn(dx,dk);else throw Error("Expected finished root and lanes to be set. This is a bug in React.")}t.then(r,r)}})}}// This function detects when a Suspense boundary goes from visible to hidden.
function dq(e,t,n){// Deletions effects can be scheduled on any fiber type. They need to happen
// before the children effects hae fired.
var r=t.deletions;if(null!==r)for(var a=0;a<r.length;a++){var i=r[a];try{!function(e,t,n){// We only have the top Fiber that was deleted but we need to recurse down its
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
var r,a=t;n:for(;null!==a;){switch(a.tag){case 5:dA=a.stateNode,dU=!1;break n;case 3:case 4:dA=a.stateNode.containerInfo,dU=!0;break n}a=a.return}if(null===dA)throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");dF(e,t,n),dA=null,dU=!1,null!==(r=n.alternate)&&(r.return=null),n.return=null}(e,t,i)}catch(e){f2(i,t,e)}}var o=tP;if(12854&t.subtreeFlags)for(var s=t.child;null!==s;)tM(s),dB(s,e),s=s.sibling;tM(o)}function dB(e,t,n){var r,a=e.alternate,i=e.flags;// because the fiber tag is more specific. An exception is any flag related
// to reconcilation, because those can be set on all fiber types.
switch(e.tag){case 0:case 11:case 14:case 15:if(dq(t,e),dV(e),4&i){try{dI(3,e,e.return),dD(3,e)}catch(t){f2(e,e.return,t)}// Layout effects are destroyed during the mutation phase so that all
// destroy functions for all fibers are called before any create functions.
// This prevents sibling component effects from interfering with each other,
// e.g. a destroy function in one component should never override a ref set
// by a create function in another component during the same commit.
if(2&e.mode){try{cN(),dI(5,e,e.return)}catch(t){f2(e,e.return,t)}cI(e)}else try{dI(5,e,e.return)}catch(t){f2(e,e.return,t)}}return;case 1:dq(t,e),dV(e),512&i&&null!==a&&dO(a,a.return);return;case 5:// TODO: ContentReset gets cleared by the children during the commit
// phase. This is a refactor hazard because it means we must read
// flags the flags after `commitReconciliationEffects` has already run;
// the order matters. We should refactor so that ContentReset does not
// rely on mutating the flag during commit. Like by setting a flag
// during the render phase instead.
if(dq(t,e),dV(e),512&i&&null!==a&&dO(a,a.return),32&e.flags){var o=e.stateNode;try{nd(o,"")}catch(t){f2(e,e.return,t)}}if(4&i){var s=e.stateNode;if(null!=s){// Commit the work prepared earlier.
var l=e.memoizedProps,u=null!==a?a.memoizedProps:l,c=e.type,d=e.updateQueue;// For hydration we reuse the update path but we treat the oldProps
if(e.updateQueue=null,null!==d)try{// Apply the diff to the DOM node.
(function(e,t,n,r,a){var i,o;// changed.
switch("input"===n&&"radio"===a.type&&null!=a.name&&tX(e,a),nA(n,r),function(e,t,n,r){// TODO: Handle wasCustomComponentTag
for(var a=0;a<t.length;a+=2){var i=t[a],o=t[a+1];i===ou?nD(e,o):i===oa?nc(e,o):i===ol?nd(e,o):tt(e,i,o,r)}}(e,t,0,nA(n,a)),n){case"input":// Update the wrapper around inputs *after* updating props. This has to
// happen after `updateDOMProperties`. Otherwise HTML5 input validations
// raise warnings and prevent the new value from being assigned.
tJ(e,a);break;case"textarea":na(e,a);break;case"select":// <select> value update needs to occur after <option> children
// reconciliation
i=e._wrapperState.wasMultiple,e._wrapperState.wasMultiple=!!a.multiple,null!=(o=a.value)?t7(e,!!a.multiple,o,!1):!!a.multiple!==i&&(null!=a.defaultValue?t7(e,!!a.multiple,a.defaultValue,!0):t7(e,!!a.multiple,a.multiple?[]:"",!1))}})(s,d,c,u,l),s[oK]=l}catch(t){f2(e,e.return,t)}}}return;case 6:if(dq(t,e),dV(e),4&i){if(null===e.stateNode)throw Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");var f=e.stateNode,p=e.memoizedProps;null!==a&&a.memoizedProps;try{f.nodeValue=p}catch(t){f2(e,e.return,t)}}return;case 3:if(dq(t,e),dV(e),4&i&&null!==a&&a.memoizedState.isDehydrated)try{r=t.containerInfo,// Retry if any event replaying was blocked on this.
aE(r)}catch(t){f2(e,e.return,t)}return;case 4:default:dq(t,e),dV(e);return;case 13:dq(t,e),dV(e);var h=e.child;if(8192&h.flags){var m=h.stateNode,v=null!==h.memoizedState;// read it during an event
m.isHidden=v,v&&!(null!==h.alternate&&null!==h.alternate.memoizedState)&&(fc=rS())}if(4&i){try{e.memoizedState}catch(t){f2(e,e.return,t)}dj(e)}return;case 22:var g=null!==a&&null!==a.memoizedState;if(1&e.mode){// Before committing the children, track on the stack whether this
// offscreen subtree was already hidden, so that we don't unmount the
// effects again.
var y=db;db=y||g,dq(t,e),db=y}else dq(t,e);if(dV(e),8192&i){var b=e.stateNode,w=null!==e.memoizedState;if(// read it during an event
b.isHidden=w,w&&!g&&(1&e.mode)!=0){d_=e;for(var _=e.child;null!==_;)d_=_,function(e){for(;null!==d_;){var t=d_,n=t.child;switch(t.tag){case 0:case 11:case 14:case 15:if(2&t.mode)try{cN(),dI(4,t,t.return)}finally{cI(t)}else dI(4,t,t.return);break;case 1:// TODO (Offscreen) Check: flags & RefStatic
dO(t,t.return);var r=t.stateNode;"function"==typeof r.componentWillUnmount&&dC(t,t.return,r);break;case 5:dO(t,t.return);break;case 22:if(null!==t.memoizedState){// Nested Offscreen tree is already hidden. Don't disappear
// its effects.
d$(e);continue}}// TODO (Offscreen) Check: subtreeFlags & LayoutStatic
null!==n?(n.return=t,d_=n):d$(e)}}(_),_=_.sibling}!// TODO: This needs to run whenever there's an insertion or update
// inside a hidden Offscreen tree.
function(e,t){for(// Only hide or unhide the top-most host nodes.
var n=null,r=e;;){if(5===r.tag){if(null===n){n=r;try{var a=r.stateNode;t?function(e){var t=e.style;"function"==typeof t.setProperty?t.setProperty("display","none","important"):t.display="none"}(a):function(e,t){var n=t.style,r=null!=n&&n.hasOwnProperty("display")?n.display:null;e.style.display=nm("display",r)}(r.stateNode,r.memoizedProps)}catch(t){f2(e,e.return,t)}}}else if(6===r.tag){if(null===n)try{var i,o=r.stateNode;t?o.nodeValue="":(i=r.memoizedProps,o.nodeValue=i)}catch(t){f2(e,e.return,t)}}else if((22===r.tag||23===r.tag)&&null!==r.memoizedState&&r!==e);else if(null!==r.child){r.child.return=r,r=r.child;continue}if(r===e)return;for(;null===r.sibling;){if(null===r.return||r.return===e)return;n===r&&(n=null),r=r.return}n===r&&(n=null),r.sibling.return=r.return,r=r.sibling}}(e,w)}return;case 19:dq(t,e),dV(e),4&i&&dj(e);return;case 21:return}}function dV(e){// Placement effects (insertions, reorders) can be scheduled on any fiber
// type. They needs to happen after the children effects have fired, but
// before the effects on this fiber have fired.
var t=e.flags;if(2&t){try{!function(e){var t=function(e){for(var t=e.return;null!==t;){if(dL(t))return t;t=t.return}throw Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.")}(e);// Note: these two variables *must* always be updated together.
switch(t.tag){case 5:var n=t.stateNode;32&t.flags&&(nd(n,""),t.flags&=-33);var r=dM(e);// We only have the top Fiber that was inserted but we need to recurse down its
// children to find all the terminal nodes.
(function e(t,n,r){var a=t.tag;if(5===a||6===a){var i=t.stateNode;n?function(e,t,n){e.insertBefore(t,n)}(r,i,n):function(e,t){e.appendChild(t)}(r,i)}else if(4===a);else{var o=t.child;if(null!==o){e(o,n,r);for(var s=o.sibling;null!==s;)e(s,n,r),s=s.sibling}}}// These are tracked on the stack as we recursively traverse a
)(e,r,n);break;case 3:case 4:var a=t.stateNode.containerInfo,i=dM(e);(function e(t,n,r){var a=t.tag;if(5===a||6===a){var i,o=t.stateNode;n?8===r.nodeType?r.parentNode.insertBefore(o,n):r.insertBefore(o,n):(8===r.nodeType?(i=r.parentNode).insertBefore(o,r):(i=r).appendChild(o),null==r._reactRootContainer&&null===i.onclick&&og(i))}else if(4===a);else{var s=t.child;if(null!==s){e(s,n,r);for(var l=s.sibling;null!==l;)e(l,n,r),l=l.sibling}}})(e,i,a);break;// eslint-disable-next-line-no-fallthrough
default:throw Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.")}}(e)}catch(t){f2(e,e.return,t)}// Clear the "placement" from effect tag so that we know that this is
// inserted, before any life-cycles like componentDidMount gets called.
// TODO: findDOMNode doesn't rely on this any more but isMounted does
// and isMounted is deprecated anyway so we should be able to kill this.
e.flags&=-3}4096&t&&(e.flags&=-4097)}function dW(e,t,n){for(;null!==d_;){var r=d_;if((8772&r.flags)!=0){var a=r.alternate;tM(r);try{!function(e,t,n,r){if((8772&n.flags)!=0)switch(n.tag){case 0:case 11:case 15:if(!db){// At this point layout effects have already been destroyed (during mutation phase).
// This is done to prevent sibling component effects from interfering with each other,
// e.g. a destroy function in one component should never override a ref set
// by a create function in another component during the same commit.
if(2&n.mode)try{cN(),dD(5,n)}finally{cI(n)}else dD(5,n)}break;case 1:var a=n.stateNode;if(4&n.flags&&!db){if(null===t){if(n.type!==n.elementType||ev||(a.props!==n.memoizedProps&&eL("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",tO(n)||"instance"),a.state!==n.memoizedState&&eL("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",tO(n)||"instance")),2&n.mode)try{cN(),a.componentDidMount()}finally{cI(n)}else a.componentDidMount()}else{var i=n.elementType===n.type?t.memoizedProps:lo(n.type,t.memoizedProps),o=t.memoizedState;if(n.type!==n.elementType||ev||(a.props!==n.memoizedProps&&eL("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",tO(n)||"instance"),a.state!==n.memoizedState&&eL("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",tO(n)||"instance")),2&n.mode)try{cN(),a.componentDidUpdate(i,o,a.__reactInternalSnapshotBeforeUpdate)}finally{cI(n)}else a.componentDidUpdate(i,o,a.__reactInternalSnapshotBeforeUpdate)}}// TODO: I think this is now always non-null by the time it reaches the
// commit phase. Consider removing the type check.
var s=n.updateQueue;null!==s&&(n.type!==n.elementType||ev||(a.props!==n.memoizedProps&&eL("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",tO(n)||"instance"),a.state!==n.memoizedState&&eL("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",tO(n)||"instance")),// but instead we rely on them being set during last render.
// TODO: revisit this when we implement resuming.
lP(n,s,a));break;case 3:// TODO: I think this is now always non-null by the time it reaches the
// commit phase. Consider removing the type check.
var l=n.updateQueue;if(null!==l){var u=null;if(null!==n.child)switch(n.child.tag){case 5:case 1:u=n.child.stateNode}lP(n,l,u)}break;case 5:var c=n.stateNode;// Renderers may schedule work to be done after host components are mounted
// (eg DOM renderer may schedule auto-focus for inputs and form controls).
// These effects should only be committed when components are first mounted,
// aka when there is no current/alternate.
null===t&&4&n.flags&&function(e,t,n,r){// Despite the naming that might imply otherwise, this method only
// fires if there is an `Update` effect scheduled during mounting.
// This happens if `finalizeInitialChildren` returns `true` (which it
// does to implement the `autoFocus` attribute on the client). But
// there are also other cases when this might happen (such as patching
// up text content during hydration mismatch). So we'll check this again.
switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&e.focus();return;case"img":n.src&&(e.src=n.src);return}}(c,n.type,n.memoizedProps);break;case 6:case 4:case 19:case 17:case 21:case 22:case 23:case 25:break;case 12:var d=n.memoizedProps,f=d.onCommit,p=d.onRender,h=n.stateNode.effectDuration,m=cx,v=null===t?"mount":"update";cT&&(v="nested-update"),"function"==typeof p&&p(n.memoizedProps.id,v,n.actualDuration,n.treeBaseDuration,n.actualStartTime,m),"function"==typeof f&&f(n.memoizedProps.id,v,h,m),fw.push(n),fg||(fg=!0,pa(rO,function(){return fJ(),null}));// Do not reset these values until the next render so DevTools has a chance to read them first.
var g=n.return;r:for(;null!==g;){switch(g.tag){case 3:var y=g.stateNode;y.effectDuration+=h;break r;case 12:var b=g.stateNode;b.effectDuration+=h;break r}g=g.return}break;case 13:(function(e,t){if(null===t.memoizedState){var n=t.alternate;if(null!==n){var r=n.memoizedState;if(null!==r){var a=r.dehydrated;null!==a&&// Retry if any event replaying was blocked on this.
aE(a)}}}})(0,n);break;default:throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}!db&&512&n.flags&&dN(n)}(0,a,r,0)}catch(e){f2(r,r.return,e)}tL()}if(r===e){d_=null;return}var i=r.sibling;if(null!==i){i.return=r.return,d_=i;return}d_=r.return}}function d$(e){for(;null!==d_;){var t=d_;if(t===e){d_=null;return}var n=t.sibling;if(null!==n){n.return=t.return,d_=n;return}d_=t.return}}function dH(e){for(;null!==d_;){var t=d_;// TODO (Offscreen) Check: flags & LayoutStatic
tM(t);try{!function(e){// Turn on layout effects in a tree that previously disappeared.
// TODO (Offscreen) Check: flags & LayoutStatic
switch(e.tag){case 0:case 11:case 15:if(2&e.mode)try{cN(),dE(e,e.return)}finally{cI(e)}else dE(e,e.return);break;case 1:var t=e.stateNode;"function"==typeof t.componentDidMount&&function(e,t,n){try{n.componentDidMount()}catch(n){f2(e,t,n)}}// Capture errors so they don't interrupt mounting.
(e,e.return,t),dT(e,e.return);break;case 5:dT(e,e.return)}}(t)}catch(e){f2(t,t.return,e)}if(tL(),t===e){d_=null;return}var n=t.sibling;if(null!==n){// This node may have been reused from a previous render, so we can't
// assume its return pointer is correct.
n.return=t.return,d_=n;return}d_=t.return}}function dY(e){// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
switch(e.tag){case 0:case 11:case 15:try{dD(5,e)}catch(t){f2(e,e.return,t)}break;case 1:var t=e.stateNode;try{t.componentDidMount()}catch(t){f2(e,e.return,t)}}}function dQ(e){// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
switch(e.tag){case 0:case 11:case 15:try{dD(9,e)}catch(t){f2(e,e.return,t)}}}function dK(e){// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
switch(e.tag){case 0:case 11:case 15:try{dI(5,e,e.return)}catch(t){f2(e,e.return,t)}break;case 1:var t=e.stateNode;"function"==typeof t.componentWillUnmount&&dC(e,e.return,t)}}function dG(e){// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
switch(e.tag){case 0:case 11:case 15:try{dI(9,e,e.return)}catch(t){f2(e,e.return,t)}}}if("function"==typeof Symbol&&Symbol.for){var dX=Symbol.for;dX("selector.component"),dX("selector.has_pseudo_class"),dX("selector.role"),dX("selector.test_id"),dX("selector.text")}var dJ=[],dZ=eI.ReactCurrentActQueue;function d0(){var e="undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?IS_REACT_ACT_ENVIRONMENT:void 0;return e||null===dZ.current||eL("The current testing environment is not configured to support act(...)"),e}var d1=Math.ceil,d2=eI.ReactCurrentDispatcher,d3=eI.ReactCurrentOwner,d5=eI.ReactCurrentBatchConfig,d4=eI.ReactCurrentActQueue,d6=0,d8=null,d7=null,d9=0,fe=0,ft=se(0),fn=0,fr=null,fa=0,fi=0,fo=0,fs=0,fl=null,fu=null,fc=0,fd=1/0,ff=null;function fp(){fd=rS()+500}var fh=!1,fm=null,fv=null,fg=!1,fy=null,fb=0,fw=[],f_=null,fk=0,fx=null,fS=!1,fE=!1,fC=0,fT=null,fO=-1,fR=0,fP=!1;function fI(){return(6&d6)!=0?rS():-1!==fO?fO:// This is the first update since React yielded. Compute a new start time.
fO=rS()}function fD(e){if((1&e.mode)==0)return 1;if((2&d6)!=0&&0!==d9)// old behavior is to give this the same "thread" (lanes) as
// whatever is currently rendering. So if you call `setState` on a component
// that happens later in the same render, it will flush. Ideally, we want to
// remove the special case and treat them as if they came from an
// interleaved event. Regardless, this pattern is not officially supported.
// This behavior is only a fallback. The flag only exists until we can roll
// out the setState warning, since existing code might accidentally rely on
// the current behavior.
{var t;return(t=d9)&-t}if(null!==s3.transition){if(null!==d5.transition){var n,r=d5.transition;r._updatedFibers||(r._updatedFibers=new Set),r._updatedFibers.add(e)}// The algorithm for assigning an update to a lane should be stable for all
return 0===fR&&(fR=r8()),fR}// Updates originating inside certain React methods, like flushSync, have
// their priority set by tracking it with a context variable.
//
// The opaque type returned by the host config is internally a lane, so we can
// use that directly.
// TODO: Move this type conversion to the event priority module.
var a=ao;return 0!==a?a:void 0===(n=window.event)?16:aN(n.type)}function fN(e,t,n,r){((function(){if(fk>50)throw fk=0,fx=null,Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");fC>50&&(fC=0,fT=null,eL("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."))})(),fP&&eL("useInsertionEffect must not schedule updates."),fS&&(fE=!0),at(e,n,r),(2&d6)!=0&&e===d8)?// if the update originates from user space (with the exception of local
// hook updates, which are handled differently and don't reach this
// function), but there are some internal React features that use this as
// an implementation detail, like selective hydration.
function(e){if(tI&&!ca)switch(e.tag){case 0:case 11:case 15:var t=d7&&tO(d7)||"Unknown";// Dedupe by the rendering component because it's the one that needs to be fixed.
eS.has(t)||(eS.add(t),eL("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render",tO(e)||"Unknown",t,t));break;case 1:pt||(eL("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."),pt=!0)}}(t):(rU&&aa(e,t,n),function(e){if(1&e.mode){if(!d0())return}else{var t;// Legacy mode has additional cases where we suppress a warning.
if(t="undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?IS_REACT_ACT_ENVIRONMENT:void 0,"undefined"==typeof jest||!1===t||0!==d6||0!==e.tag&&11!==e.tag&&15!==e.tag)return}if(null===d4.current){var n=tP;try{tM(e),eL("An update to %s inside a test was not wrapped in act(...).\n\nWhen testing, code that causes React state updates should be wrapped into act(...):\n\nact(() => {\n  /* fire events that update state */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act",tO(e))}finally{n?tM(e):tL()}}}(t),e===d8&&((2&d6)==0&&(fo|=n),4===fn&&// definitely won't finish. Since we have a new update, let's mark it as
// suspended now, right before marking the incoming update. This has the
// effect of interrupting the current render and switching to the update.
// TODO: Make sure this doesn't override pings that happen while we've
// already started rendering.
fz(e,d9)),fL(e,r),1===n&&0===d6&&(1&t.mode)==0&&// Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
!d4.isBatchingLegacy&&(// Flush the synchronous work now, unless we're already working or inside
// a batch. This is intentionally inside scheduleUpdateOnFiber instead of
// scheduleCallbackForFiber to preserve the ability to schedule a callback
// without immediately flushing it. We only do this for user-initiated
// updates, to preserve historical behavior of legacy mode.
fp(),sb&&sk()))}// root; if a task was already scheduled, we'll check to make sure the priority
// of the existing task is the same as the priority of the next level that the
// root has work on. This function is called on every update, and right before
// exiting a task.
function fL(e,t){var n,r,a,i=e.callbackNode;// Check if any lanes are being starved by other work. If so, mark them as
!// expired so we know to work on those next.
function(e,t){for(// TODO: This gets called every time we yield. We can optimize by storing
// the earliest expiration time on the root. Then use that to quickly bail out
// of this function.
var n=e.pendingLanes,r=e.suspendedLanes,a=e.pingedLanes,i=e.expirationTimes,o=n;o>0;){var s=r9(o),l=1<<s,u=i[s];-1===u?((l&r)==0||(l&a)!=0)&&(i[s]=function(e,t){switch(e){case 1:case 2:case 4:// User interactions should expire slightly more quickly.
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
return -1;default:return eL("Should have found matching lanes. This is a bug in React."),-1}}(l,t)):u<=t&&(e.expiredLanes|=l),o&=~l}}// This returns the highest priority pending lanes regardless of whether they
(e,t);var o=r2(e,e===d8?d9:0);if(0===o){null!==i&&pi(i),e.callbackNode=null,e.callbackPriority=0;return}// We use the highest priority lane to represent the priority of the callback.
var s=o&-o,l=e.callbackPriority;// Check if there's an existing task. We may be able to reuse it.
if(l===s&&// Special case related to `act`. If the currently scheduled task is a
// Scheduler task, rather than an `act` task, cancel it and re-scheduled
// on the `act` queue.
!(null!==d4.current&&i!==pr)){// If we're going to re-use an existing task, it needs to exist.
// Assume that discrete update microtasks are non-cancellable and null.
// TODO: Temporary until we confirm this warning is not fired.
null==i&&1!==l&&eL("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");return}if(null!=i&&pi(i),1===s)0===e.tag?(null!==d4.isBatchingLegacy&&(d4.didScheduleLegacyUpdate=!0),n=fF.bind(null,e),sb=!0,s_(n)):s_(fF.bind(null,e)),null!==d4.current?// at the end of the current scope even when using the sync version
// of `act`.
d4.current.push(sk):oF(function(){// In Safari, appending an iframe forces microtasks to run.
// https://github.com/facebook/react/issues/22459
// We don't support running callbacks in the middle of render
// or commit so we need to check against that.
(6&d6)==0&&// if this happens outside render or commit phase (e.g. in an event).
sk()}),r=null;else{switch(as(o)){case 1:a=rC;break;case 4:a=rT;break;case 16:default:a=rO;break;case 536870912:a=rP}r=pa(a,fM.bind(null,e))}e.callbackPriority=s,e.callbackNode=r}// This is the entry point for every concurrent task, i.e. anything that
// goes through Scheduler.
function fM(e,t){if(cT=!1,cO=!1,// event time. The next update will compute a new event time.
fO=-1,fR=0,(6&d6)!=0)throw Error("Should not already be working.");// Flush any pending passive effects before deciding which lanes to work on,
// in case they schedule additional work.
var n=e.callbackNode;if(fJ()&&e.callbackNode!==n)// `ensureRootIsScheduled` because the check above implies either that
// there's a new task, or that there's no remaining work on this root.
return null;// Determine the next lanes to work on, using the fields stored
// on the root.
var r=r2(e,e===d8?d9:0);if(0===r)return null;var a=(30&r)!=0||(r&e.expiredLanes)!=0||t?fQ(e,r):function(e,t){var n=d6;d6|=2;var r=fH();// If the root or lanes have changed, throw out the existing stack
// and prepare a fresh one. Otherwise we'll continue where we left off.
if(d8!==e||d9!==t){if(rU){var a=e.memoizedUpdaters;a.size>0&&(pn(e,d9),a.clear()),// If we bailout on this work, we'll move them back (like above).
// It's important to move them now in case the work spawns more work at the same priority with different updaters.
// That way we can keep the current update and future updates separate.
ai(e,t)}ff=null,fp(),fW(e,t)}for(rH(t);;)try{/** @noinline */(function(){// Perform work until Scheduler asks us to yield
for(;null!==d7&&!rk();)fK(d7)})();break}catch(t){f$(e,t)}return(lf(),d2.current=r,d6=n,null!==d7)?(null!==rM&&"function"==typeof rM.markRenderYielded&&rM.markRenderYielded(),0):(rY(),d8=null,d9=0,fn)}(e,r);if(0!==a){if(2===a){// If something threw an error, try rendering one more time. We'll
// render synchronously to block concurrent data mutations, and we'll
// includes all pending updates are included. If it still fails after
// the second attempt, we'll give up and commit the resulting tree.
var i=r3(e);0!==i&&(r=i,a=fA(e,i))}if(1===a){var o=fr;throw fW(e,0),fz(e,r),fL(e,rS()),o}if(6===a)// cases where need to exit the current render without producing a
// consistent tree or committing.
//
// This should only happen during a concurrent render, not a discrete or
// synchronous update. We should have already checked for this when we
// unwound the stack.
fz(e,r);else{// The render completed.
// Check if this render may have yielded to a concurrent event, and if so,
// confirm that any newly rendered stores are consistent.
// TODO: It's possible that even a concurrent render may never have yielded
// to the main thread, if it was fast enough, or if it expired. We could
// skip the consistency check in that case, too.
var s=(30&r)==0,l=e.current.alternate;if(s&&!function(e){for(// Search the rendered tree for external store reads, and check whether the
// stores were mutated in a concurrent event. Intentionally using an iterative
// loop instead of recursion so we can exit early.
var t=e;;){if(16384&t.flags){var n=t.updateQueue;if(null!==n){var r=n.stores;if(null!==r)for(var a=0;a<r.length;a++){var i=r[a],o=i.getSnapshot,s=i.value;try{if(!iT(o(),s))return!1}catch(e){// If `getSnapshot` throws, return `false`. This will schedule
// a re-render, and the error will be rethrown during render.
return!1}}}}var l=t.child;if(16384&t.subtreeFlags&&null!==l){l.return=t,t=l;continue}if(t===e)break;for(;null===t.sibling;){if(null===t.return||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}// Flow doesn't know this is unreachable, but eslint does
// eslint-disable-next-line no-unreachable
return!0}(l)){if(2===// A store was mutated in an interleaved event. Render again,
// synchronously, to block further mutations.
(a=fQ(e,r))){var u=r3(e);0!==u&&(r=u,a=fA(e,u))}if(1===a){var c=fr;throw fW(e,0),fz(e,r),fL(e,rS()),c}}// We now have a consistent tree. The next step is either to commit it,
// or, if something suspended, wait to commit it after a timeout.
e.finishedWork=l,e.finishedLanes=r,function(e,t,n){switch(t){case 0:case 1:throw Error("Root did not complete. This is a bug in React.");// Flow knows about invariant, so it complains if I add a break
// statement, but eslint doesn't know about invariant, so it complains
// if I do. eslint-disable-next-line no-fallthrough
case 2:case 5:// We should have already attempted to retry this tree. If we reached
// this point, it errored again. Commit it.
fX(e,fu,ff);break;case 3:// should immediately commit it or wait a bit.
if(fz(e,n),r4(n)&&// do not delay if we're inside an act() scope
!po()){// This render only included retries, no updates. Throttle committing
// retries so that we don't show too many loading states too quickly.
var r=fc+500-rS();// Don't bother with a very short suspense time.
if(r>10){if(0!==r2(e,0))break;var a=e.suspendedLanes;if((a&n)!==n){fI(),an(e,a);break}// The render is suspended, it hasn't timed out, and there's no
// lower priority work to do. Instead of committing the fallback
// immediately, wait for more data to arrive.
e.timeoutHandle=oA(fX.bind(null,e,fu,ff),r);break}}// The work expired. Commit immediately.
fX(e,fu,ff);break;case 4:if(fz(e,n),(4194240&n)===n)break;if(!po()){// This is not a transition, but we did trigger an avoided state.
// Schedule a placeholder to display after a short delay, using the Just
// Noticeable Difference.
// TODO: Is the JND optimization worth the added complexity? If this is
// the only reason we track the event time, then probably not.
// Consider removing.
var i=function(e,t){for(var n=e.eventTimes,r=-1;t>0;){var a=r9(t),i=1<<a,o=n[a];o>r&&(r=o),t&=~i}return r}(e,n),o=rS()-i,s=(o<120?120:o<480?480:o<1080?1080:o<1920?1920:o<3e3?3e3:o<4320?4320:1960*d1(o/1960))-o;if(s>10){// Instead of committing the fallback immediately, wait for more data
// to arrive.
e.timeoutHandle=oA(fX.bind(null,e,fu,ff),s);break}}// Commit the placeholder.
fX(e,fu,ff);break;default:throw Error("Unknown root exit status.")}}(e,a,r)}}return(fL(e,rS()),e.callbackNode===n)?fM.bind(null,e):null}function fA(e,t){// If an error occurred during hydration, discard server response and fall
// back to client side render.
// Before rendering again, save the errors from the previous attempt.
var n=fl;if(al(e)){// The shell failed to hydrate. Set a flag to force a client rendering
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
var r=fW(e,t);r.flags|=256,// TODO: This gets logged by onRecoverableError, too, so we should be
// able to remove it.
eL("An error occurred during hydration. The server HTML was replaced with client content in <%s>.",e.containerInfo.nodeName.toLowerCase())}var a=fQ(e,t);if(2!==a){// Successfully finished rendering on retry
// The errors from the failed first attempt have been recovered. Add
// them to the collection of recoverable errors. We'll log them in the
// commit phase.
var i=fu;fu=n,null!==i&&fU(i)}return a}function fU(e){null===fu?fu=e:fu.push.apply(fu,e)}function fz(e,t){// When suspending, we should always exclude lanes that were pinged or (more
// rarely, since we try to avoid it) updated during the render phase.
// TODO: Lol maybe there's a better way to factor this besides this
// obnoxiously named function :)
t&=~fs,function(e,t){e.suspendedLanes|=t,e.pingedLanes&=~t;for(var n=e.expirationTimes,r=t;r>0;){var a=r9(r),i=1<<a;n[a]=-1,r&=~i}}(e,t&=~fo)}// This is the entry point for synchronous tasks that don't go
// through Scheduler
function fF(e){if(cT=cO,cO=!1,(6&d6)!=0)throw Error("Should not already be working.");fJ();var t=r2(e,0);if(!((1&t)!=0))return(// There's no remaining sync work left.
fL(e,rS()),null);var n=fQ(e,t);if(0!==e.tag&&2===n){// If something threw an error, try rendering one more time. We'll render
// synchronously to block concurrent data mutations, and we'll includes
// all pending updates are included. If it still fails after the second
// attempt, we'll give up and commit the resulting tree.
var r=r3(e);0!==r&&(t=r,n=fA(e,r))}if(1===n){var a=fr;throw fW(e,0),fz(e,t),fL(e,rS()),a}if(6===n)throw Error("Root did not complete. This is a bug in React.");// We now have a consistent tree. Because this is a sync render, we
// will commit it even if something suspended.
var i=e.current.alternate;return e.finishedWork=i,e.finishedLanes=t,fX(e,fu,ff),// pending level.
fL(e,rS()),null}function fj(e,t){var n=d6;d6|=/*               */1;try{return e(t)}finally{// most batchedUpdates-like method.
0===(d6=n)&&// Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
!d4.isBatchingLegacy&&(fp(),sb&&sk())}}// Warning, this opts-out of checking the function body.
// eslint-disable-next-line no-redeclare
function fq(e){// In legacy mode, we flush pending passive effects at the beginning of the
// next event, not at the end of the previous one.
null!==fy&&0===fy.tag&&(6&d6)==0&&fJ();var t=d6;d6|=1;var n=d5.transition,r=ao;try{if(d5.transition=null,ao=1,e)return e();return}finally{ao=r,d5.transition=n,(6&(d6=t))==0&&sk()}}function fB(e,t){sn(ft,fe,e),fe|=t,fa|=t}function fV(e){fe=ft.current,st(ft,e)}function fW(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(-1!==n&&(// The root previous suspended and scheduled a timeout to commit a fallback
// state. Now that we have additional work, cancel the timeout.
e.timeoutHandle=-1,oU(n)),null!==d7)for(var r=d7.return;null!==r;)dv(r.alternate,r),r=r.return;d8=e;var a=pv(e.current,null);return d7=a,d9=fe=fa=t,fn=0,fr=null,fi=0,fo=0,fs=0,fl=null,fu=null,function(){// Transfer the interleaved updates onto the main queue. Each queue has a
// `pending` field and an `interleaved` field. When they are not null, they
// point to the last node in a circular linked list. We need to append the
// interleaved list to the end of the pending list by joining them into a
// single, circular list.
if(null!==ly){for(var e=0;e<ly.length;e++){var t=ly[e],n=t.interleaved;if(null!==n){t.interleaved=null;var r=n.next,a=t.pending;if(null!==a){var i=a.next;a.next=r,n.next=i}t.pending=n}}ly=null}}(),s5.discardPendingWarnings(),a}function f$(e,t){for(;;){var n=d7;try{if(// Reset module-level state that was set during the render phase.
lf(),ux(),tL(),// separate issue. Write a regression test using string refs.
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
cP(n,!0),rV(),null!==t&&"object"==typeof t&&"function"==typeof t.then){var r,a,i,o,s,l=t;o=n,s=d9,null!==rM&&"function"==typeof rM.markComponentSuspended&&rM.markComponentSuspended(o,l,s)}else r=n,a=t,i=d9,null!==rM&&"function"==typeof rM.markComponentErrored&&rM.markComponentErrored(r,a,i);(function(e,t,n,r,a){if(// The source fiber did not complete.
n.flags|=/*                   */32768,rU&&pn(e,a),null!==r&&"object"==typeof r&&"function"==typeof r.then){// This is a wakeable. The component suspended.
var i,o=r;(function(e,t){// A legacy mode Suspense quirk, only relevant to hook components.
var n=e.tag;if((1&e.mode)==0&&(0===n||11===n||15===n)){var r=e.alternate;r?(e.updateQueue=r.updateQueue,e.memoizedState=r.memoizedState,e.lanes=r.lanes):(e.updateQueue=null,e.memoizedState=null)}})(n),sj&&1&n.mode&&(sq=!0);var s=cB(t);if(null!==s){s.flags&=-257,cV(s,t,n,e,a),1&s.mode&&cq(e,o,a),function(e,t,n,r){// Retry listener
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
var a=e.updateQueue;if(null===a){var i=new Set;i.add(n),e.updateQueue=i}else a.add(n)}(s,0,o);return}// No boundary was found. Unless this is a sync update, this is OK.
// We can suspend and wait for more data to arrive.
if(!((1&a)!=0)){// This is not a sync update. Suspend. Since we're not activating a
// Suspense boundary, this will unwind all the way to the root without
// performing a second pass to render a fallback. (This is arguably how
// refresh transitions should work, too, since we're not going to commit
// the fallbacks anyway.)
//
// This case also applies to initial hydration.
cq(e,o,a),fY();return}// This is a sync/discrete update. We treat this case like an error
// The error will be caught by the nearest suspense boundary.
r=Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.")}else if(sj&&1&n.mode){sq=!0;var l=cB(t);// If the error was thrown during hydration, we may be able to recover by
// discarding the dehydrated content and switching to a client render.
// Instead of surfacing the error, find the nearest Suspense boundary
// and render it again without hydration.
if(null!==l){(65536&l.flags)==0&&// children again, not the fallback.
(l.flags|=256),cV(l,t,n,e,a),// still log it so it can be fixed.
s2(cM(r,n));return}}i=r=cM(r,n),4!==fn&&(fn=2),null===fl?fl=[i]:fl.push(i);// over and traverse parent path again, this time treating the exception
// as an error.
var u=t;do{switch(u.tag){case 3:var c,d=r;u.flags|=65536;var f=(c=a)&-c;u.lanes=u.lanes|f;var p=cF(u,d,f);lO(u,p);return;case 1:// Capture and retry
var h=r,m=u.type,v=u.stateNode;if((128&u.flags)==0&&("function"==typeof m.getDerivedStateFromError||null!==v&&"function"==typeof v.componentDidCatch&&!fZ(v))){u.flags|=65536;var g,y=(g=a)&-g;u.lanes=u.lanes|y;var b=cj(u,h,y);lO(u,b);return}}u=u.return}while(null!==u)})(e,n.return,n,t,d9),fG(n)}catch(e){// Something in the return path also threw.
t=e,d7===n&&null!==n?d7=// If this boundary has already errored, then we had trouble processing
// the error. Bubble it to the next boundary.
n=n.return:n=d7;continue}// Return to the normal work loop.
return}}function fH(){var e=d2.current;return(d2.current=cf,null===e)?cf:e}function fY(){(0===fn||3===fn||2===fn)&&(fn=4),null!==d8&&(r5(fi)||r5(fo))&&// the updates that were skipped. Usually we only suspend at the end of
// the render phase.
// TODO: We should probably always mark the root as suspended immediately
// (inside this function), since by suspending at the end of the render
// phase introduces a potential mistake where we suspend lanes that were
// pinged or updated while we were rendering.
fz(d8,d9)}function fQ(e,t){var n=d6;d6|=2;var r=fH();// If the root or lanes have changed, throw out the existing stack
// and prepare a fresh one. Otherwise we'll continue where we left off.
if(d8!==e||d9!==t){if(rU){var a=e.memoizedUpdaters;a.size>0&&(pn(e,d9),a.clear()),// If we bailout on this work, we'll move them back (like above).
// It's important to move them now in case the work spawns more work at the same priority with different updaters.
// That way we can keep the current update and future updates separate.
ai(e,t)}ff=null,fW(e,t)}for(rH(t);;)try{/** @noinline */(function(){// Already timed out, so perform work without checking if we need to yield.
for(;null!==d7;)fK(d7)})();break}catch(t){f$(e,t)}if(lf(),d6=n,d2.current=r,null!==d7)throw Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");return rY(),d8=null,d9=0,fn}// The work loop is an extremely hot path. Tell Closure not to inline it.
function fK(e){// The current, flushed, state of this fiber is the alternate. Ideally
// nothing should rely on this, but relying on it here means that we don't
// need an additional field on the work in progress.
var t,n=e.alternate;tM(e),(2&e.mode)!=0?(cR(e),t=ex(n,e,fe),cP(e,!0)):t=ex(n,e,fe),tL(),e.memoizedProps=e.pendingProps,null===t?fG(e):d7=t,d3.current=null}function fG(e){// Attempt to complete the current unit of work, then move to the next
// sibling. If there are no more siblings, return to the parent fiber.
var t=e;do{// The current, flushed, state of this fiber is the alternate. Ideally
// nothing should rely on this, but relying on it here means that we don't
// need an additional field on the work in progress.
var n=t.alternate,r=t.return;if((32768&t.flags)==0){tM(t);var a=void 0;if((2&t.mode)==0?a=dm(n,t,fe):(cR(t),a=dm(n,t,fe),cP(t,!1)),tL(),null!==a){// Completing this fiber spawned new work. Work on that next.
d7=a;return}}else{// This fiber did not complete because something threw. Pop values off
// the stack without entering the complete phase. If this is a boundary,
// capture values if possible.
var i=function(e,t,n){switch(// Note: This intentionally doesn't check if we're hydrating because comparing
// to the current tree provider fiber is just as fast and less error-prone.
// Ideally we would have a special version of the work loop only
// for hydration.
sA(t),t.tag){case 1:sd(t.type)&&sf(t);var r=t.flags;if(65536&r)return t.flags=-65537&r|128,(2&t.mode)!=0&&cL(t),t;return null;case 3:t.stateNode,l2(t),sp(t),ue();var a=t.flags;if((65536&a)!=0&&(128&a)==0)return(// There was an error during render that wasn't captured by a suspense
// boundary. Do a second pass on the root to unmount the children.
t.flags=-65537&a|128,t);// We unwound to the root without completing it. Exit.
return null;case 5:return(// TODO: popHydrationState
l4(t),null);case 13:st(l6,t);var i=t.memoizedState;if(null!==i&&null!==i.dehydrated){if(null===t.alternate)throw Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");s0()}var o=t.flags;if(65536&o)return t.flags=-65537&o|128,(2&t.mode)!=0&&cL(t),t;return null;case 19:// caught by a nested boundary. If not, it should bubble through.
return st(l6,t),null;case 4:return l2(t),null;case 10:return lh(t.type._context,t),null;case 22:case 23:return fV(t),null;default:return null}}(0,t);// Because this fiber did not complete, don't reset its lanes.
if(null!==i){// If completing this work spawned new work, do that next. We'll come
// back here again.
// Since we're restarting, remove anything that is not a host effect
// from the effect tag.
i.flags&=/*               */32767,d7=i;return}if((2&t.mode)!=0){// Record the render duration for the fiber that errored.
cP(t,!1);// Include the time spent working on failed children before continuing.
for(var o=t.actualDuration,s=t.child;null!==s;)o+=s.actualDuration,s=s.sibling;t.actualDuration=o}if(null!==r)// Mark the parent fiber as incomplete and clear its subtree flags.
r.flags|=32768,r.subtreeFlags=0,r.deletions=null;else{// We've unwound all the way to the root.
fn=6,d7=null;return}}var l=t.sibling;if(null!==l){// If there is more work to do in this returnFiber, do that next.
d7=l;return}// Otherwise, return to the parent
d7=t=r}while(null!==t)// We've reached the root.
0===fn&&(fn=5)}function fX(e,t,n){// TODO: This no longer makes any sense. We already wrap the mutation and
// layout phases. Should be able to remove.
var r=ao,a=d5.transition;try{d5.transition=null,ao=1,function(e,t,n,r){do // means `flushPassiveEffects` will sometimes result in additional
// passive effects. So we need to keep flushing in a loop until there are
// no more pending effects.
// TODO: Might be better if `flushPassiveEffects` did not automatically
// flush synchronous work at the end, to avoid factoring hazards like this.
fJ();while(null!==fy)if(s5.flushLegacyContextWarning(),s5.flushPendingUnsafeLifecycleWarnings(),(6&d6)!=0)throw Error("Should not already be working.");var a=e.finishedWork,i=e.finishedLanes;if(null!==rM&&"function"==typeof rM.markCommitStarted&&rM.markCommitStarted(i),null===a)return rq();if(0===i&&eL("root.finishedLanes should not be empty during a commit. This is a bug in React."),e.finishedWork=null,e.finishedLanes=0,a===e.current)throw Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");// commitRoot never returns a continuation; it always finishes synchronously.
// So we can clear these now to allow a new callback to be scheduled.
e.callbackNode=null,e.callbackPriority=0;// pending time is whatever is left on the root fiber.
var o=a.lanes|a.childLanes;(function(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t;for(var r=e.entanglements,a=e.eventTimes,i=e.expirationTimes,o=n;o>0;){var s=r9(o),l=1<<s;r[s]=0,a[s]=-1,i[s]=-1,o&=~l}})(e,o),e===d8&&(// We can reset these now that they are finished.
d8=null,d7=null,d9=0),(2064&a.subtreeFlags)==0&&(2064&a.flags)==0||fg||(fg=!0,// to store it in pendingPassiveTransitions until they get processed
// We need to pass this through as an argument to commitRoot
// because workInProgressTransitions might have changed between
// the previous render and commit if we throttle the commit
// with setTimeout
f_=n,pa(rO,function(){// *after* passive effects fire to avoid freeing a cache pool that may
// be referenced by a node in the tree (HostRoot, Cache boundary etc)
return fJ(),null}));// TODO: This is left over from the effect list implementation, where we had
// to check for the existence of `firstEffect` to satisfy Flow. I think the
// only other reason this optimization exists is because it affects profiling.
// Reconsider whether this is necessary.
var s=(15990&a.subtreeFlags)!=0,l=(15990&a.flags)!=0;if(s||l){var u,c,d,f=d5.transition;d5.transition=null;var p=ao;ao=1;var h=d6;d6|=/*                */4,d3.current=null,e.containerInfo,oN=aT,oL={focusedElem:c=iD(),selectionRange:iN(c)?("selectionStart"in c?{start:c.selectionStart,end:c.selectionEnd}:/**
 * @param {DOMElement} outerNode
 * @return {?object}
 */function(e){var t=e.ownerDocument,n=t&&t.defaultView||window,r=n.getSelection&&n.getSelection();if(!r||0===r.rangeCount)return null;var a=r.anchorNode,i=r.anchorOffset,o=r.focusNode,s=r.focusOffset;// In Firefox, anchorNode and focusNode can be "anonymous divs", e.g. the
// up/down buttons on an <input type="number">. Anonymous divs do not seem to
// expose properties, triggering a "Permission denied error" if any of its
// properties are accessed. The only seemingly possible way to avoid erroring
// is to access a property that typically works for non-anonymous divs and
// catch any error that may otherwise arise. See
// https://bugzilla.mozilla.org/show_bug.cgi?id=208427
try{/* eslint-disable no-unused-expressions */a.nodeType,o.nodeType;/* eslint-enable no-unused-expressions */}catch(e){return null}return(/**
 * Returns {start, end} where `start` is the character/codepoint index of
 * (anchorNode, anchorOffset) within the textContent of `outerNode`, and
 * `end` is the index of (focusNode, focusOffset).
 *
 * Returns null if you pass in garbage input but we should probably just crash.
 *
 * Exported only for testing.
 */function(e,t,n,r,a){var i=0,o=-1,s=-1,l=0,u=0,c=e,d=null;r:for(;;){for(var f=null;c===t&&(0===n||3===c.nodeType)&&(o=i+n),c===r&&(0===a||3===c.nodeType)&&(s=i+a),3===c.nodeType&&(i+=c.nodeValue.length),null!==(f=c.firstChild);)// Moving from `node` to its first child `next`.
d=c,c=f;for(;;){if(c===e)break r;if(d===t&&++l===n&&(o=i),d===r&&++u===a&&(s=i),null!==(f=c.nextSibling))break;d=(c=d).parentNode}// Moving from `node` to its next sibling `next`.
c=f}return -1===o||-1===s?null:{start:o,end:s}}(e,a,i,o,s))}(c))||{start:0,end:0}:null},aT=!1,d_=a,function(){for(;null!==d_;){var e=d_,t=e.child;// This phase is only used for beforeActiveInstanceBlur.
(1028&e.subtreeFlags)!=0&&null!==t?(t.return=e,d_=t):function(){for(;null!==d_;){var e=d_;tM(e);try{(function(e){var t=e.alternate;if((1024&e.flags)!=0){switch(tM(e),e.tag){case 0:case 11:case 15:case 5:case 6:case 4:case 17:break;case 1:if(null!==t){var n,r=t.memoizedProps,a=t.memoizedState,i=e.stateNode;e.type!==e.elementType||ev||(i.props!==e.memoizedProps&&eL("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.",tO(e)||"instance"),i.state!==e.memoizedState&&eL("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.",tO(e)||"instance"));var o=i.getSnapshotBeforeUpdate(e.elementType===e.type?r:lo(e.type,r),a),s=dg;void 0!==o||s.has(e.type)||(s.add(e.type),eL("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.",tO(e))),i.__reactInternalSnapshotBeforeUpdate=o}break;case 3:1===(n=e.stateNode.containerInfo).nodeType?n.textContent="":9===n.nodeType&&n.documentElement&&n.removeChild(n.documentElement);break;default:throw Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.")}tL()}})(e)}catch(t){f2(e,e.return,t)}tL();var t=e.sibling;if(null!==t){t.return=e.return,d_=t;return}d_=e.return}}()}}(),cx=ck(),dk=i,dx=e,tM(a),dB(a,e),tM(a),dk=null,dx=null,e.containerInfo,/**
 * @restoreSelection: If any selection information was potentially lost,
 * restore it. This is useful when performing operations that could remove dom
 * nodes and place them back in, resulting in focus being lost.
 */function(e){var t,n=iD(),r=e.focusedElem,a=e.selectionRange;if(n!==r&&(t=r)&&t.ownerDocument&&function e(t,n){return!!t&&!!n&&(t===n||!iI(t)&&(iI(n)?e(t,n.parentNode):"contains"in t?t.contains(n):!!t.compareDocumentPosition&&!!(16&t.compareDocumentPosition(n))))}(t.ownerDocument.documentElement,t)){null!==a&&iN(r)&&(i=a.start,o=a.end,void 0===o&&(o=i),"selectionStart"in r?(r.selectionStart=i,r.selectionEnd=Math.min(o,r.value.length)):/**
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
if(r.getSelection){var a=r.getSelection(),i=e.textContent.length,o=Math.min(t.start,i),s=void 0===t.end?o:Math.min(t.end,i);// Flip backward selections, so we can set with a single range.
if(!a.extend&&o>s){var l=s;s=o,o=l}var u=iP(e,o),c=iP(e,s);if(u&&c){if(1===a.rangeCount&&a.anchorNode===u.node&&a.anchorOffset===u.offset&&a.focusNode===c.node&&a.focusOffset===c.offset)return;var d=n.createRange();d.setStart(u.node,u.offset),a.removeAllRanges(),o>s?(a.addRange(d),a.extend(c.node,c.offset)):(d.setEnd(c.node,c.offset),a.addRange(d))}}}(r,a));for(// Focusing a node can change the scroll position, which is undesirable
var i,o,s=[],l=r;l=l.parentNode;)1===l.nodeType&&s.push({element:l,left:l.scrollLeft,top:l.scrollTop});"function"==typeof r.focus&&r.focus();for(var u=0;u<s.length;u++){var c=s[u];c.element.scrollLeft=c.left,c.element.scrollTop=c.top}}}(oL),aT=!!oN,oN=null,oL=null,// the mutation phase, so that the previous tree is still current during
// componentWillUnmount, but before the layout phase, so that the finished
// work is current during componentDidMount/Update.
e.current=a,null!==rM&&"function"==typeof rM.markLayoutEffectsStarted&&rM.markLayoutEffectsStarted(i),dk=i,dx=e,d_=a,function e(t,n,r){for(// Suspense layout effects semantics don't change for legacy roots.
var a=(1&t.mode)!=0;null!==d_;){var i=d_,o=i.child;if(22===i.tag&&a){var s=null!==i.memoizedState||dy;if(s){// The Offscreen tree is hidden. Skip over its layout effects.
dW(t,n,r);continue}// TODO (Offscreen) Also check: subtreeFlags & LayoutMask
var l=i.alternate,u=null!==l&&null!==l.memoizedState||db,c=dy,d=db;dy=s,(db=u)&&!d&&(// This is the root of a reappearing boundary. Turn its layout effects
// back on.
d_=i,function(e){for(;null!==d_;){var t=d_,n=t.child;if(22===t.tag&&null!==t.memoizedState){// Nested Offscreen tree is still hidden. Don't re-appear its effects.
dH(e);continue}// TODO (Offscreen) Check: subtreeFlags & LayoutStatic
null!==n?(// This node may have been reused from a previous render, so we can't
// assume its return pointer is correct.
n.return=t,d_=n):dH(e)}}(i));for(var f=o;null!==f;)d_=f,e(f,n,r),f=f.sibling;// Restore Offscreen state and resume in our-progress traversal.
d_=i,dy=c,db=d,dW(t,n,r);continue}(8772&i.subtreeFlags)!=0&&null!==o?(o.return=i,d_=o):dW(t,n,r)}}(a,e,i),dk=null,dx=null,null!==rM&&"function"==typeof rM.markLayoutEffectsStopped&&rM.markLayoutEffectsStopped(),// opportunity to paint.
rx(),d6=h,ao=p,d5.transition=f}else // No effects.
e.current=a,cx=ck();var m=fg;if(fg?(// This commit has passive effects. Stash a reference to them. But don't
// schedule a callback until after flushing layout work.
fg=!1,fy=e,fb=i):(fC=0,fT=null),0===(o=e.pendingLanes)&&// error boundaries.
(fv=null),m||f8(e.current,!1),function(e,t){if(rL&&"function"==typeof rL.onCommitFiberRoot)try{var n,r=(128&e.current.flags)==128;switch(t){case 1:n=rC;break;case 4:n=rT;break;case 16:default:n=rO;break;case 536870912:n=rP}rL.onCommitFiberRoot(rN,e,n,r)}catch(e){rA||(rA=!0,eL("React instrumentation encountered an error: %s",e))}}(a.stateNode,r),rU&&e.memoizedUpdaters.clear(),dJ.forEach(function(e){return e()}),// additional work on this root is scheduled.
fL(e,rS()),null!==t)for(var v=e.onRecoverableError,g=0;g<t.length;g++){var y=t[g],b=y.stack,w=y.digest;v(y.value,{componentStack:b,digest:w})}if(fh){fh=!1;var _=fm;throw fm=null,_}// If the passive effects are the result of a discrete render, flush them
(1&fb)!=0&&0!==e.tag&&fJ(),(1&// Read this again, since a passive effect might have updated it
(o=e.pendingLanes))!=0?(cO=!0,e===fx?fk++:(fk=0,fx=e)):fk=0,// If layout work was scheduled, flush it now.
sk(),rq()}(e,t,n,r)}finally{d5.transition=a,ao=r}return null}function fJ(){// Returns whether passive effects were flushed.
// TODO: Combine this check with the one in flushPassiveEFfectsImpl. We should
// probably just combine the two functions. I believe they were only separate
// in the first place because we used to wrap it with
// `Scheduler.runWithPriority`, which accepts a function. But now we track the
// priority within React itself, so we can mutate the variable directly.
if(null!==fy){var e=as(fb),t=d5.transition,n=ao;try{return d5.transition=null,ao=16>e?16:e,function(){if(null===fy)return!1;// Cache and clear the transitions flag
var e,t=f_;f_=null;var n=fy,r=fb;if(fy=null,// Figure out why and fix it. It's not causing any known issues (probably
// because it's only used for profiling), but it's a refactor hazard.
fb=0,(6&d6)!=0)throw Error("Cannot flush passive effects while already rendering.");fS=!0,fE=!1,null!==rM&&"function"==typeof rM.markPassiveEffectsStarted&&rM.markPassiveEffectsStarted(r);var a=d6;d6|=4,d_=n.current,function(){for(;null!==d_;){var e=d_,t=e.child;if((16&d_.flags)!=0){var n=e.deletions;if(null!==n){for(var r=0;r<n.length;r++){var a=n[r];d_=a,function(e,t){for(;null!==d_;){var n=d_;// Deletion effects fire in parent -> child order
// TODO: Check if fiber has a PassiveStatic flag
tM(n),function(e,t){switch(e.tag){case 0:case 11:case 15:2&e.mode?(cC=ck(),dI(8,e,t),cD(e)):dI(8,e,t)}}// TODO: Reuse reappearLayoutEffects traversal here?
(n,t),tL();var r=n.child;// TODO: Only traverse subtree if it has a PassiveStatic flag. (But, if we
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
delete r[oQ],delete r[oK],delete r[oX],delete r[oJ],delete r[oZ])}t.stateNode=null,t._debugOwner=null,// Theoretically, nothing in here should be necessary, because we already
// disconnected the fiber from the tree. So even if something leaks this
// particular fiber, it won't leak anything else
//
// The purpose of this branch is to be super aggressive so we can measure
// if there's any difference in memory impact. If there is, that could
// indicate a React leak we don't know about.
t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}(t),t===e){d_=null;return}if(null!==n){n.return=r,d_=n;return}d_=r}}(e)}}(a,e)}// A fiber was deleted from this parent fiber, but it's still part of
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
var i=e.alternate;if(null!==i){var o=i.child;if(null!==o){i.child=null;do{var s=o.sibling;o.sibling=null,o=s}while(null!==o)}}d_=e}}(2064&e.subtreeFlags)!=0&&null!==t?(t.return=e,d_=t):function(){for(;null!==d_;){var e=d_;(2048&e.flags)!=0&&(tM(e),function(e){switch(e.tag){case 0:case 11:case 15:2&e.mode?(cC=ck(),dI(9,e,e.return),cD(e)):dI(9,e,e.return)}}(e),tL());var t=e.sibling;if(null!==t){t.return=e.return,d_=t;return}d_=e.return}}()}}(),d_=e=n.current,function(e,t,n,r){for(;null!==d_;){var a=d_,i=a.child;(2064&a.subtreeFlags)!=0&&null!==i?(i.return=a,d_=i):function(e,t,n,r){for(;null!==d_;){var a=d_;if((2048&a.flags)!=0){tM(a);try{(function(e,t,n,r){switch(t.tag){case 0:case 11:case 15:if(2&t.mode){cC=ck();try{dD(9,t)}finally{cD(t)}}else dD(9,t)}})(0,a,0,0)}catch(e){f2(a,a.return,e)}tL()}if(a===e){d_=null;return}var i=a.sibling;if(null!==i){i.return=a.return,d_=i;return}d_=a.return}}(e,0,0,0)}}(e,n,r,t);var i=fw;fw=[];for(var o=0;o<i.length;o++)!function(e,t){// Only Profilers with work in their subtree will have an Update effect scheduled.
if((4&t.flags)!=0&&12===t.tag){var n=t.stateNode.passiveEffectDuration,r=t.memoizedProps,a=r.id,i=r.onPostCommit,o=cx,s=null===t.alternate?"mount":"update";cT&&(s="nested-update"),"function"==typeof i&&i(a,s,n,o);// Bubble times to the next nearest ancestor Profiler.
// After we process that Profiler, we'll bubble further up.
var l=t.return;r:for(;null!==l;){switch(l.tag){case 3:var u=l.stateNode;u.passiveEffectDuration+=n;break r;case 12:var c=l.stateNode;c.passiveEffectDuration+=n;break r}l=l.return}}}(0,i[o]);null!==rM&&"function"==typeof rM.markPassiveEffectsStopped&&rM.markPassiveEffectsStopped(),f8(n.current,!0),d6=a,sk(),fE?n===fT?fC++:(fC=0,fT=n):fC=0,fS=!1,fE=!1,function(e){if(rL&&"function"==typeof rL.onPostCommitFiberRoot)try{rL.onPostCommitFiberRoot(rN,e)}catch(e){rA||(rA=!0,eL("React instrumentation encountered an error: %s",e))}}(n);var s=n.current.stateNode;return s.effectDuration=0,s.passiveEffectDuration=0,!0}()}finally{ao=n,d5.transition=t}}return!1}function fZ(e){return null!==fv&&fv.has(e)}var f0=function(e){fh||(fh=!0,fm=e)};function f1(e,t,n){var r=cF(e,cM(n,t),1),a=lC(e,r,1),i=fI();null!==a&&(at(a,1,i),fL(a,i))}function f2(e,t,n){if(rc(null,function(){throw n}),rd(),fP=!1,3===e.tag){// Error was thrown at the root. There is no parent, so the root
// itself should capture it.
f1(e,e,n);return}var r=null;for(r=t;null!==r;){if(3===r.tag){f1(r,e,n);return}if(1===r.tag){var a=r.type,i=r.stateNode;if("function"==typeof a.getDerivedStateFromError||"function"==typeof i.componentDidCatch&&!fZ(i)){var o=cj(r,cM(n,e),1),s=lC(r,o,1),l=fI();null!==s&&(at(s,1,l),fL(s,l));return}}r=r.return}// TODO: Until we re-land skipUnmountedBoundaries (see #20147), this warning
// will fire for errors that are thrown by destroy functions inside deleted
// trees. What it should instead do is propagate the error to the parent of
// the deleted tree. In the meantime, do not add this warning to the
// allowlist; this is only for our internal use.
eL("Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.\n\nError message:\n\n%s",n)}function f3(e,t,n){var r=e.pingCache;null!==r&&// never be thrown again.
r.delete(t);var a=fI();an(e,n),0!==e.tag&&d0()&&null===d4.current&&eL("A suspended resource finished loading inside a test, but the event was not wrapped in act(...).\n\nWhen testing, code that resolves suspended data should be wrapped into act(...):\n\nact(() => {\n  /* finish loading suspended data */\n});\n/* assert on the output */\n\nThis ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act"),d8===e&&(d9&n)===n&&(4===fn||3===fn&&r4(d9)&&rS()-fc<500?fW(e,0):// opportunity later. So we mark this render as having a ping.
fs|=n),fL(e,a)}function f5(e,t){// The boundary fiber (a Suspense component or SuspenseList component)
// previously was rendered in its fallback state. One of the promises that
// suspended it has resolved, which means at least part of the tree was
// likely unblocked. Try rendering again, at a new lanes.
0===t&&// unnecessary entanglement?
(t=(1&e.mode)==0?1:(n=r0,(130023424&(r0<<=1))==0&&(r0=4194304),n));// TODO: Special case idle priority?
var n,r=fI(),a=l_(e,t);null!==a&&(at(a,t,r),fL(a,r))}function f4(e){var t=e.memoizedState,n=0;null!==t&&(n=t.retryLane),f5(e,n)}function f6(e,t){var n,r=0;// Default
switch(e.tag){case 13:n=e.stateNode;var a=e.memoizedState;null!==a&&(r=a.retryLane);break;case 19:n=e.stateNode;break;default:throw Error("Pinged unknown suspense boundary type. This is probably a bug in React.")}null!==n&&// never be thrown again.
n.delete(t),f5(e,r)}// Computes the next Just Noticeable Difference (JND) boundary.
function f8(e,t){// TODO (StrictEffects) Should we set a marker on the root if it contains strict effects
// so we don't traverse unnecessarily? similar to subtreeFlags but just at the root level.
// Maybe not a big deal since this is DEV only behavior.
tM(e),f7(e,16777216,dK),t&&f7(e,/*              */33554432,dG),f7(e,16777216,dY),t&&f7(e,33554432,dQ),tL()}function f7(e,t,n){for(// We don't need to re-check StrictEffectsMode here.
// This function is only called if that check has already passed.
var r=e,a=null;null!==r;){var i=r.subtreeFlags&t;r!==a&&null!==r.child&&0!==i?r=r.child:((r.flags&t)!=0&&n(r),r=null!==r.sibling?r.sibling:a=r.return)}}var f9=null;function pe(e){if((2&d6)==0&&1&e.mode){var t=e.tag;if(2===t||3===t||1===t||0===t||11===t||14===t||15===t){// We show the whole stack but dedupe on the top component's name because
// the problematic code almost always lies inside that component.
var n=tO(e)||"ReactComponent";if(null!==f9){if(f9.has(n))return;f9.add(n)}else f9=new Set([n]);var r=tP;try{tM(e),eL("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.")}finally{r?tM(e):tL()}}}}ex=function(e,t,n){// If a component throws an error, we replay it again in a synchronously
// dispatched event, so that the debugger will treat it as an uncaught
// error See ReactErrorUtils for more information.
// Before entering the begin phase, copy the work-in-progress onto a dummy
// fiber. If beginWork throws, we'll use this to reset the state.
var r=px(null,t);try{return dc(e,t,n)}catch(i){if(sq||null!==i&&"object"==typeof i&&"function"==typeof i.then)// Don't replay errors if we are hydrating and have already suspended or handled an error
throw i;if(// Keep this code in sync with handleError; any changes here must have
// corresponding changes there.
lf(),ux(),// same fiber again.
// Unwind the failed stack frame
dv(e,t),px(t,r),2&t.mode&&cR(t),// Run beginWork again.
rc(null,dc,null,e,t,n),ri){var a=rd();"object"==typeof a&&null!==a&&a._suppressLogging&&"object"==typeof i&&null!==i&&!i._suppressLogging&&(i._suppressLogging=!0)}// We always throw the original error in case the second render pass is not idempotent.
// This can happen if a memoized function or CommonJS module doesn't throw after first invocation.
throw i}};var pt=!1;function pn(e,t){rU&&e.memoizedUpdaters.forEach(function(n){aa(e,n,t)})}eS=new Set;var pr={};function pa(e,t){// If we're currently inside an `act` scope, bypass Scheduler and push to
// the `act` queue instead.
var n=d4.current;return null!==n?(n.push(t),pr):rw(e,t)}function pi(e){if(e!==pr)// In production, always call Scheduler. This function will be stripped out.
return r_(e)}function po(){// Never force flush in production. This function should get stripped out.
return null!==d4.current}/* eslint-disable react-internal/prod-error-codes */var ps=null,pl=null;// $FlowFixMe Flow gets confused by a WeakSet feature check below.
function pu(e){if(null===ps)return e;var t=ps(e);return void 0===t?e:t.current}function pc(e){if(null===ps)return e;var t=ps(e);if(void 0===t){// Check if we're dealing with a real forwardRef. Don't want to crash early.
if(null!=e&&"function"==typeof e.render){// ForwardRef is special because its resolved .type is an object,
// but it's possible that we only have its inner render function in the map.
// If that inner render function is different, we'll build a new forwardRef type.
var n=pu(e.render);if(e.render!==n){var r={$$typeof:tu,render:n};return void 0!==e.displayName&&(r.displayName=e.displayName),r}}return e}// Use the latest known implementation.
return t.current}function pd(e,t){if(null===ps)return!1;var n=e.elementType,r=t.type,a=!1,i="object"==typeof r&&null!==r?r.$$typeof:null;switch(e.tag){case 1:"function"==typeof r&&(a=!0);break;case 0:"function"==typeof r?a=!0:i===tp&&// We're going to assume that the lazy inner type is stable,
// and so it is sufficient to avoid reconciling it away.
// We're not going to unwrap or actually use the new lazy type.
(a=!0);break;case 11:i===tu?a=!0:i===tp&&(a=!0);break;case 14:case 15:i===tf?// we shouldn't set this.
a=!0:i===tp&&(a=!0);break;default:return!1}// Check if both types have a family and it's the same one.
if(a){// Note: memo() and forwardRef() we'll compare outer rather than inner type.
// This means both of them need to be registered to preserve state.
// If we unwrapped and compared the inner types for wrappers instead,
// then we would risk falsely saying two separate memo(Foo)
// calls are equivalent because they wrap the same Foo function.
var o=ps(n);if(void 0!==o&&o===ps(r))return!0}return!1}function pf(e){null!==ps&&"function"==typeof WeakSet&&(null===pl&&(pl=new WeakSet),pl.add(e))}eE=!1;try{Object.preventExtensions({});/* eslint-enable no-new */}catch(e){// TODO: Consider warning about bad polyfills
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
return new pp(e,t,n,r)};function pm(e){var t=e.prototype;return!!(t&&t.isReactComponent)}function pv(e,t){var n=e.alternate;null===n?(// We use a double buffering pooling technique because we know that we'll
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
var r=e.dependencies;switch(n.dependencies=null===r?null:{lanes:r.lanes,firstContext:r.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.selfBaseDuration=e.selfBaseDuration,n.treeBaseDuration=e.treeBaseDuration,n._debugNeedsRemount=e._debugNeedsRemount,n.tag){case 2:case 0:case 15:case 1:n.type=pu(e.type);break;case 11:n.type=pc(e.type)}return n}// Used to reuse a Fiber for a second pass.
function pg(e,t,n,r,a,i){var o,s,l,u,c=2,d=e;// The resolved type is set if we know what the final type will be. I.e. it's not lazy.
if("function"==typeof e)pm(e)&&(c=1),d=pu(d);else if("string"==typeof e)c=5;else a:switch(e){case ta:return pb(n.children,a,i,t);case ti:c=8,(1&(a|=8))!=0&&(a|=16);break;case to:return o=a,"string"!=typeof n.id&&eL('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.',typeof n.id),(s=ph(12,n,t,2|o)).elementType=to,s.lanes=i,s.stateNode={effectDuration:0,passiveEffectDuration:0},s;case tc:return(l=ph(13,n,t,a)).elementType=tc,l.lanes=i,l;case td:return(u=ph(19,n,t,a)).elementType=td,u.lanes=i,u;case th:return pw(n,a,i,t);default:if("object"==typeof e&&null!==e)switch(e.$$typeof){case ts:c=10;break a;case tl:// This is a consumer
c=9;break a;case tu:c=11,d=pc(d);break a;case tf:c=14;break a;case tp:c=16,d=null;break a}var f="";(void 0===e||"object"==typeof e&&null!==e&&0===Object.keys(e).length)&&(f+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var p=r?tO(r):null;throw p&&(f+="\n\nCheck the render method of `"+p+"`."),Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: "+(null==e?e:typeof e)+"."+f)}var h=ph(c,n,t,a);return h.elementType=e,h.type=d,h.lanes=i,h._debugOwner=r,h}function py(e,t,n){var r=null;r=e._owner;var a=pg(e.type,e.key,e.props,r,t,n);return a._debugSource=e._source,a._debugOwner=e._owner,a}function pb(e,t,n,r){var a=ph(7,e,r,t);return a.lanes=n,a}function pw(e,t,n,r){var a=ph(22,e,r,t);return a.elementType=th,a.lanes=n,a.stateNode={isHidden:!1},a}function p_(e,t,n){var r=ph(6,e,null,t);return r.lanes=n,r}function pk(e,t,n){var r=ph(4,null!==e.children?e.children:[],e.key,t);return r.lanes=n,r.stateNode={containerInfo:e.containerInfo,pendingChildren:null,// Used by persistent updates
implementation:e.implementation},r}// Used for stashing WIP properties to replay failed work in DEV.
function px(e,t){return null===e&&// We only use a Fiber to ensure the same hidden class so DEV isn't slow.
(e=ph(2,null,null,0)),// This is intentionally written as a list of all properties.
// We tried to use Object.assign() instead but this is called in
// the hottest path, and Object.assign() was too slow:
// https://github.com/facebook/react/issues/12502
// This code is DEV-only so size is not a concern.
e.tag=t.tag,e.key=t.key,e.elementType=t.elementType,e.type=t.type,e.stateNode=t.stateNode,e.return=t.return,e.child=t.child,e.sibling=t.sibling,e.index=t.index,e.ref=t.ref,e.pendingProps=t.pendingProps,e.memoizedProps=t.memoizedProps,e.updateQueue=t.updateQueue,e.memoizedState=t.memoizedState,e.dependencies=t.dependencies,e.mode=t.mode,e.flags=t.flags,e.subtreeFlags=t.subtreeFlags,e.deletions=t.deletions,e.lanes=t.lanes,e.childLanes=t.childLanes,e.alternate=t.alternate,e.actualDuration=t.actualDuration,e.actualStartTime=t.actualStartTime,e.selfBaseDuration=t.selfBaseDuration,e.treeBaseDuration=t.treeBaseDuration,e._debugSource=t._debugSource,e._debugOwner=t._debugOwner,e._debugNeedsRemount=t._debugNeedsRemount,e._debugHookTypes=t._debugHookTypes,e}function pS(e,t,n,r,a){this.tag=t,this.containerInfo=e,this.pendingChildren=null,this.current=null,this.pingCache=null,this.finishedWork=null,this.timeoutHandle=-1,this.context=null,this.pendingContext=null,this.callbackNode=null,this.callbackPriority=0,this.eventTimes=ae(0),this.expirationTimes=ae(-1),this.pendingLanes=0,this.suspendedLanes=0,this.pingedLanes=0,this.expiredLanes=0,this.mutableReadLanes=0,this.finishedLanes=0,this.entangledLanes=0,this.entanglements=ae(0),this.identifierPrefix=r,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null,this.effectDuration=0,this.passiveEffectDuration=0,this.memoizedUpdaters=new Set;for(var i=this.pendingUpdatersLaneMap=[],o=0;o<rJ;o++)i.push(new Set);switch(t){case 1:this._debugRootType=n?"hydrateRoot()":"createRoot()";break;case 0:this._debugRootType=n?"hydrate()":"render()"}}function pE(e,t,n,r,a,i,o,// them through the root constructor. Perhaps we should put them all into a
// single type, like a DynamicHostConfig that is defined by the renderer.
s,l,u){var c,d=new pS(e,t,n,s,l),f=(1===t?(c=1,!0===i&&(c|=8,c|=16)):c=0,rU&&// This enables DevTools to start capturing timing at any point–
// Without some nodes in the tree having empty base times.
(c|=2),ph(3,null,null,c));return d.current=f,f.stateNode=d,f.memoizedState={element:r,isDehydrated:n,cache:null,// not enabled yet
transitions:null,pendingSuspenseBoundaries:null},lx(f),d}var pC="18.2.0";function pT(e){if(!e)return sr;var t=rf(e),n=function(e){// Currently this is only used with renderSubtreeIntoContainer; not sure if it
// makes sense elsewhere
if(rh(e)!==e||1!==e.tag)throw Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");var t=e;do{switch(t.tag){case 3:return t.stateNode.context;case 1:if(sd(t.type))return t.stateNode.__reactInternalMemoizedMergedChildContext}t=t.return}while(null!==t)throw Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.")}(t);if(1===t.tag){var r=t.type;if(sd(r))return sm(t,r,n)}return n}function pO(e,t,n,r,a,i,o,s,l,u){var c=pE(n,r,!0,e,a,i,o,s,l);// TODO: Move this to FiberRoot constructor
c.context=pT(null);// a regular update because the initial render must match was was rendered
// on the server.
// NOTE: This update intentionally doesn't have a payload. We're only using
// the update to schedule work on the root fiber (and, for legacy roots, to
// enqueue the callback if one is provided).
var d=c.current,f=fI(),p=fD(d),h=lE(f,p);return h.callback=null!=t?t:null,lC(d,h,p),c.current.lanes=p,at(c,p,f),fL(c,f),c}function pR(e,t,n,r){!function(e,t){if(rL&&"function"==typeof rL.onScheduleFiberRoot)try{rL.onScheduleFiberRoot(rN,e,t)}catch(e){rA||(rA=!0,eL("React instrumentation encountered an error: %s",e))}}(t,e);var a=t.current,i=fI(),o=fD(a);null!==rM&&"function"==typeof rM.markRenderScheduled&&rM.markRenderScheduled(o);var s=pT(n);null===t.context?t.context=s:t.pendingContext=s,tI&&null!==tP&&!eC&&(eC=!0,eL("Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.\n\nCheck the render method of %s.",tO(tP)||"Unknown"));var l=lE(i,o);// Caution: React DevTools currently depends on this property
// being called "element".
l.payload={element:e},null!==(r=void 0===r?null:r)&&("function"!=typeof r&&eL("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.",r),l.callback=r);var u=lC(a,l,o);return null!==u&&(fN(u,a,o,i),lT(u,a,o)),o}function pP(e){var t=e.current;return t.child?(t.child.tag,t.child.stateNode):null}function pI(e,t){var n,r=e.memoizedState;null!==r&&null!==r.dehydrated&&(r.retryLane=0!==(n=r.retryLane)&&n<t?n:t)}// Increases the priority of thenables when they resolve within this boundary.
function pD(e,t){pI(e,t);var n=e.alternate;n&&pI(n,t)}function pN(e){var t,n=null!==(t=ry(e))?function e(t){// Next we'll drill down this component to find the first HostComponent/Text.
if(5===t.tag||6===t.tag)return t;for(var n=t.child;null!==n;){if(4!==n.tag){var r=e(n);if(null!==r)return r}n=n.sibling}return null}(t):null;return null===n?null:n.stateNode}eC=!1,eT={};var pL=function(e){return null},pM=function(e){return!1},pA=null,pU=null,pz=null,pF=null,pj=null,pq=null,pB=null,pV=null,pW=null,p$=function(e,t,n){var r=t[n],a=t4(e)?e.slice():tg({},e);return n+1===t.length?t4(a)?a.splice(r,1):delete a[r]:a[r]=p$(e[r],t,n+1),a},pH=function(e,t){return p$(e,t,0)},pY=function(e,t,n,r){var a=t[r],i=t4(e)?e.slice():tg({},e);return r+1===t.length?(i[n[r]]=i[a],t4(i))?i.splice(a,1):delete i[a]:i[a]=pY(e[a],t,n,r+1),i},pQ=function(e,t,n){if(t.length!==n.length){eN("copyWithRename() expects paths of the same length");return}for(var r=0;r<n.length-1;r++)if(t[r]!==n[r]){eN("copyWithRename() expects paths to be the same except for the deepest key");return}return pY(e,t,n,0)},pK=function(e,t,n,r){if(n>=t.length)return r;var a=t[n],i=t4(e)?e.slice():tg({},e);return i[a]=pK(e[a],t,n+1,r),i},pG=function(e,t,n){return pK(e,t,0,n)},pX=function(e,t){for(// For now, the "id" of stateful hooks is just the stateful hook index.
// This may change in the future with e.g. nested hooks.
var n=e.memoizedState;null!==n&&t>0;)n=n.next,t--;return n};pA=function(e,t,n,r){var a=pX(e,t);if(null!==a){var i=pG(a.memoizedState,n,r);a.memoizedState=i,a.baseState=i,// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
e.memoizedProps=tg({},e.memoizedProps);var o=l_(e,1);null!==o&&fN(o,e,1,-1)}},pU=function(e,t,n){var r=pX(e,t);if(null!==r){var a=pH(r.memoizedState,n);r.memoizedState=a,r.baseState=a,// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
e.memoizedProps=tg({},e.memoizedProps);var i=l_(e,1);null!==i&&fN(i,e,1,-1)}},pz=function(e,t,n,r){var a=pX(e,t);if(null!==a){var i=pQ(a.memoizedState,n,r);a.memoizedState=i,a.baseState=i,// because there is no update we can add for useReducer hooks that won't trigger an error.
// (There's no appropriate action type for DevTools overrides.)
// As a result though, React will see the scheduled update as a noop and bailout.
// Shallow cloning props works as a workaround for now to bypass the bailout check.
e.memoizedProps=tg({},e.memoizedProps);var o=l_(e,1);null!==o&&fN(o,e,1,-1)}},pF=function(e,t,n){e.pendingProps=pG(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=l_(e,1);null!==r&&fN(r,e,1,-1)},pj=function(e,t){e.pendingProps=pH(e.memoizedProps,t),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var n=l_(e,1);null!==n&&fN(n,e,1,-1)},pq=function(e,t,n){e.pendingProps=pQ(e.memoizedProps,t,n),e.alternate&&(e.alternate.pendingProps=e.pendingProps);var r=l_(e,1);null!==r&&fN(r,e,1,-1)},pB=function(e){var t=l_(e,1);null!==t&&fN(t,e,1,-1)},pV=function(e){pL=e},pW=function(e){pM=e};/* global reportError */var pJ="function"==typeof reportError?reportError:function(e){// In older browsers and test environments, fallback to console.error.
// eslint-disable-next-line react-internal/no-production-logging
console.error(e)};function pZ(e){this._internalRoot=e}function p0(e){this._internalRoot=e}function p1(e){return!!(e&&(1===e.nodeType||9===e.nodeType||11===e.nodeType))}// TODO: Remove this function which also includes comment nodes.
// We only use it in places that are currently more relaxed.
function p2(e){return!!(e&&(1===e.nodeType||9===e.nodeType||11===e.nodeType||8===e.nodeType&&" react-mount-point-unstable "===e.nodeValue))}function p3(e){1===e.nodeType&&e.tagName&&"BODY"===e.tagName.toUpperCase()&&eL("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."),e[oG]&&(e._reactRootContainer?eL("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported."):eL("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."))}p0.prototype.render=pZ.prototype.render=function(e){var t=this._internalRoot;if(null===t)throw Error("Cannot update an unmounted root.");"function"==typeof arguments[1]?eL("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect()."):p1(arguments[1])?eL("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root."):void 0!==arguments[1]&&eL("You passed a second argument to root.render(...) but it only accepts one argument.");var n=t.containerInfo;if(8!==n.nodeType){var r=pN(t.current);r&&r.parentNode!==n&&eL("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.")}pR(e,t,null,null)},p0.prototype.unmount=pZ.prototype.unmount=function(){"function"==typeof arguments[0]&&eL("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");var e=this._internalRoot;if(null!==e){this._internalRoot=null;var t=e.containerInfo;(6&d6)!=0&&eL("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."),fq(function(){pR(null,e,null,null)}),t[oG]=null}},p0.prototype.unstable_scheduleHydration=function(e){e&&function(e){for(// TODO: This will read the priority if it's dispatched by the React
// event system but not native events. Should read window.event.type, like
// we do for updates (getCurrentEventPriority).
var t,n=P(),r={blockedOn:null,target:e,priority:n},a=0;// Stop once we hit the first target with lower priority than
a<av.length&&(t=av[a].priority,0!==n&&n<t);a++);av.splice(a,0,r),0===a&&aw(r)}(e)};var p5=eI.ReactCurrentOwner;function p4(e){return e?9===e.nodeType?e.documentElement:e.firstChild:null}function p6(){// legacy API.
}function p8(e,t,n,r,a){eO(n),null!==(i=void 0===a?null:a)&&"function"!=typeof i&&eL("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.","render",i);var i,o,s=n._reactRootContainer;if(s){if(o=s,"function"==typeof a){var l=a;a=function(){var e=pP(o);l.call(e)}}// Update
pR(t,o,e,a)}else o=function(e,t,n,r,a){if(a){if("function"==typeof r){var i,o,s=r;r=function(){var e=pP(l);s.call(e)}}var l=pO(t,r,e,0,null,!1,!1,"",p6);return e._reactRootContainer=l,o=l.current,e[oG]=o,i4(8===e.nodeType?e.parentNode:e),fq(),l}for(;u=e.lastChild;)e.removeChild(u);if("function"==typeof r){var u,c=r;r=function(){var e=pP(d);c.call(e)}}var d=pE(e,0,!1,null,null,!1,!1,"",p6);return e._reactRootContainer=d,i=d.current,e[oG]=i,i4(8===e.nodeType?e.parentNode:e),fq(function(){pR(t,d,n,r)}),d}(n,t,e,a,r);return pP(o)}eO=function(e){if(e._reactRootContainer&&8!==e.nodeType){var t=pN(e._reactRootContainer.current);t&&t.parentNode!==e&&eL("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.")}var n=!!e._reactRootContainer,r=p4(e);r&&o1(r)&&!n&&eL("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."),1===e.nodeType&&e.tagName&&"BODY"===e.tagName.toUpperCase()&&eL("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.")},T=function(e){switch(e.tag){case 3:var t=e.stateNode;if(al(t)){// Flush the first scheduled "update".
var n=r1(t.pendingLanes);0!==n&&(ar(t,1|n),fL(t,rS()),(6&d6)==0&&(fp(),sk()))}break;case 13:fq(function(){var t=l_(e,1);null!==t&&fN(t,e,1,fI())}),pD(e,1)}},O=function(e){if(13===e.tag){var t=l_(e,134217728);null!==t&&fN(t,e,134217728,fI()),pD(e,134217728)}},R=function(e){if(13===e.tag){var t=fD(e),n=l_(e,t);null!==n&&fN(n,e,t,fI()),pD(e,t)}},P=function(){return ao},D=function(e,t){var n=ao;try{return ao=e,t()}finally{ao=n}},("function"!=typeof Map||// $FlowIssue Flow incorrectly thinks Map has no prototype
null==Map.prototype||"function"!=typeof Map.prototype.forEach||"function"!=typeof Set||// $FlowIssue Flow incorrectly thinks Set has no prototype
null==Set.prototype||"function"!=typeof Set.prototype.clear||"function"!=typeof Set.prototype.forEach)&&eL("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"),nJ=function(e,t,n){var r;switch(t){case"input":tJ(e,n),function(e,t){var n=t.name;if("radio"===t.type&&null!=n){for(var r=e;r.parentNode;)r=r.parentNode;// If `rootNode.form` was non-null, then we could try `form.elements`,
e$(n,"name");for(var a=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),i=0;i<a.length;i++){var o=a[i];if(o!==e&&o.form===e.form){// This will throw if radio buttons rendered by different copies of React
// and the same name are rendered into the same form (same as #1939).
// That's probably okay; we don't support it just as we don't support
// mixing React radio buttons with non-React ones.
var s=o3(o);if(!s)throw Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");// We need update the tracked value on the named cousin since the value
// was changed but the input saw no event or value set
tB(o),// was previously checked to update will cause it to be come re-checked
// as appropriate.
tJ(o,s)}}}}// In Chrome, assigning defaultValue to certain input types triggers input validation.
(e,n);return;case"textarea":// DOM component is still mounted; update
na(e,n);return;case"select":null!=(r=n.value)&&t7(e,!!n.multiple,r,!1);return}},n5=fj,n4=fq;var p7={usingClientEntryPoint:!1,// Keep in sync with ReactTestUtils.js.
// This is an array for better minification.
Events:[o1,o2,o3,n2,n3,fj]};if(n=(t={findFiberByHostInstance:o0,bundleType:1,version:pC,rendererPackageName:"react-dom"}).findFiberByHostInstance,m=eI.ReactCurrentDispatcher,!function(e){if("undefined"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)return!1;var t=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(t.isDisabled)// of DevTools integration and associated warnings and logs.
// https://github.com/facebook/react/issues/3877
return!0;if(!t.supportsFiber)return eL("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"),!0;try{// This gives DevTools a way to feature detect that isn't tied to version number
// (since profiling and timeline are controlled by different feature flags).
e=tg({},e,{getLaneLabelMap:rj,injectProfilingHooks:rF}),rN=t.inject(e),rL=t}catch(e){eL("React instrumentation encountered an error: %s.",e)}return!!t.checkDCE}({bundleType:t.bundleType,version:t.version,rendererPackageName:t.rendererPackageName,rendererConfig:t.rendererConfig,overrideHookState:pA,overrideHookStateDeletePath:pU,overrideHookStateRenamePath:pz,overrideProps:pF,overridePropsDeletePath:pj,overridePropsRenamePath:pq,setErrorHandler:pV,setSuspenseHandler:pW,scheduleUpdate:pB,currentDispatcherRef:m,findHostInstanceByFiber:function(e){var t=rb(e);return null===t?null:t.stateNode},findFiberByHostInstance:n||function(e){return null},// React Refresh
findHostInstancesForRefresh:function(e,t){var n=new Set,r=new Set(t.map(function(e){return e.current}));return function e(t,n,r){var a=t.child,i=t.sibling,o=t.tag,s=t.type,l=null;switch(o){case 0:case 15:case 1:l=s;break;case 11:l=s.render}var u=!1;null!==l&&n.has(l)&&(u=!0),u?// There's no need to search deeper because for the purpose of giving
// visual feedback, "flashing" outermost parent rectangles is sufficient.
function(e,t){if(!function(e,t){for(var n=e,r=!1;;){if(5===n.tag)// We got a match.
r=!0,t.add(n.stateNode);else if(null!==n.child){n.child.return=n,n=n.child;continue}if(n===e)return r;for(;null===n.sibling;){if(null===n.return||n.return===e)return r;n=n.return}n.sibling.return=n.return,n=n.sibling}return!1}(e,t))for(// If we didn't find any host children, fallback to closest host parent.
var n=e;;){switch(n.tag){case 5:t.add(n.stateNode);return;case 4:case 3:t.add(n.stateNode.containerInfo);return}if(null===n.return)throw Error("Expected to reach root first.");n=n.return}}(t,r):null!==a&&e(a,n,r),null!==i&&e(i,n,r)}(e.current,r,n),n},scheduleRefresh:function(e,t){if(null!==ps){var n=t.staleFamilies,r=t.updatedFamilies;fJ(),fq(function(){(function e(t,n,r){var a=t.alternate,i=t.child,o=t.sibling,s=t.tag,l=t.type,u=null;switch(s){case 0:case 15:case 1:u=l;break;case 11:u=l.render}if(null===ps)throw Error("Expected resolveFamily to be set during hot reload.");var c=!1,d=!1;if(null!==u){var f=ps(u);void 0!==f&&(r.has(f)?d=!0:n.has(f)&&(1===s?d=!0:c=!0))}if(null!==pl&&(pl.has(t)||null!==a&&pl.has(a))&&(d=!0),d&&(t._debugNeedsRemount=!0),d||c){var p=l_(t,1);null!==p&&fN(p,t,1,-1)}null===i||d||e(i,n,r),null!==o&&e(o,n,r)})(e.current,r,n)})}},scheduleRoot:function(e,t){e.context===sr&&(fJ(),fq(function(){pR(t,e,null,null)}))},setRefreshHandler:function(e){ps=e},// Enables DevTools to append owner stacks to error messages in DEV mode.
getCurrentFiber:function(){return tP},// Enables DevTools to detect reconciler version rather than renderer version
// which may not match for third party renderers.
reconcilerVersion:pC})&&eq&&window.top===window.self&&(navigator.userAgent.indexOf("Chrome")>-1&&-1===navigator.userAgent.indexOf("Edge")||navigator.userAgent.indexOf("Firefox")>-1)){var p9=window.location.protocol;// Don't warn in exotic cases like chrome-extension://.
/^(https?|file):$/.test(p9)&&console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools"+("file:"===p9?"\nYou might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq":""),"font-weight:bold")}r=p7,a=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;if(!p1(t))throw Error("Target container is not a DOM element.");// TODO: pass ReactDOM portal implementation as third argument
// $FlowFixMe The Flow type is opaque but there's no way to actually create it.
return function(e,t,n){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null;return eW(r)&&eL("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.",eV(r)),{// This tag allow us to uniquely identify this as a React Portal
$$typeof:tr,key:null==r?null:""+r,children:e,containerInfo:t,implementation:null}}(e,t,null,n)},i=function(e,t){return p7.usingClientEntryPoint||eL('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),function(e,t){if(!p1(e))throw Error("createRoot(...): Target container is not a DOM element.");p3(e);var n,r=!1,a="",i=pJ;null!=t&&(t.hydrate?eN("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead."):"object"==typeof t&&null!==t&&t.$$typeof===tn&&eL("You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:\n\n  let root = createRoot(domContainer);\n  root.render(<App />);"),!0===t.unstable_strictMode&&(r=!0),void 0!==t.identifierPrefix&&(a=t.identifierPrefix),void 0!==t.onRecoverableError&&(i=t.onRecoverableError),void 0!==t.transitionCallbacks&&t.transitionCallbacks);var o=pE(e,1,!1,null,null,r,!1,a,i);return n=o.current,e[oG]=n,i4(8===e.nodeType?e.parentNode:e),new pZ(o)}(e,t)},o=function(e){var t=p5.current;return(null!==t&&null!==t.stateNode&&(t.stateNode._warnedAboutRefsInRender||eL("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.",tC(t.type)||"A component"),t.stateNode._warnedAboutRefsInRender=!0),null==e)?null:1===e.nodeType?e:function(e,t){var n=rf(e);if(void 0===n){if("function"==typeof e.render)throw Error("Unable to find node on an unmounted component.");throw Error("Argument appears to not be a ReactComponent. Keys: "+Object.keys(e).join(","))}var r=rb(n);if(null===r)return null;if(8&r.mode){var a=tO(n)||"Component";if(!eT[a]){eT[a]=!0;var i=tP;try{tM(r),8&n.mode?eL("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,a):eL("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node",t,t,a)}finally{// Ideally this should reset to previous but this shouldn't be called in
// render and there's another warning for that anyway.
i?tM(i):tL()}}}return r.stateNode}(e,"findDOMNode")},s=// Warning, this opts-out of checking the function body.
// eslint-disable-next-line no-redeclare
function(e){return(6&d6)!=0&&eL("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."),fq(e)},l=function(e,t,n){if(eL("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!p2(t))throw Error("Target container is not a DOM element.");return t[oG]&&void 0===t._reactRootContainer&&eL("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?"),p8(null,e,t,!0,n)},u=function(e,t,n){return p7.usingClientEntryPoint||eL('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'),function(e,t,n){if(!p1(e))throw Error("hydrateRoot(...): Target container is not a DOM element.");p3(e),void 0===t&&eL("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");// the hydration callbacks.
var r,a=null!=n?n:null,i=null!=n&&n.hydratedSources||null,o=!1,s="",l=pJ;// TODO: Delete this option
null!=n&&(!0===n.unstable_strictMode&&(o=!0),void 0!==n.identifierPrefix&&(s=n.identifierPrefix),void 0!==n.onRecoverableError&&(l=n.onRecoverableError));var u=pO(t,null,e,1,a,o,!1,s,l);if(r=u.current,e[oG]=r,i4(e),i)for(var c=0;c<i.length;c++)!// This ensures that the version used for server rendering matches the one
// that is eventually read during hydration.
// If they don't match there's a potential tear and a full deopt render is required.
function(e,t){var n=(0,t._getVersion)(t._source);// TODO Clear this data once all pending hydration work is finished.
// Retaining it forever may interfere with GC.
null==e.mutableSourceEagerHydrationData?e.mutableSourceEagerHydrationData=[t,n]:e.mutableSourceEagerHydrationData.push(t,n)}(u,i[c]);return new p0(u)}(e,t,n)}// Overload the definition to the two valid signatures.
,c=function(e,t,n){if(eL("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!p2(t))throw Error("Target container is not a DOM element.");return t[oG]&&void 0===t._reactRootContainer&&eL("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?"),p8(null,e,t,!1,n)},d=function(e){if(!p2(e))throw Error("unmountComponentAtNode(...): Target container is not a DOM element.");if(e[oG]&&void 0===e._reactRootContainer&&eL("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?"),e._reactRootContainer){var t=p4(e);// get `true` twice. That's probably fine?
return t&&!o1(t)&&eL("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React."),fq(function(){p8(null,null,e,!1,function(){// $FlowFixMe This should probably use `delete container._reactRootContainer`
e._reactRootContainer=null,e[oG]=null})}),!0}var n=p4(e),r=!!(n&&o1(n)),a=1===e.nodeType&&p2(e.parentNode)&&!!e.parentNode._reactRootContainer;return r&&eL("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s",a?"You may have accidentally passed in a React root node instead of its container.":"Instead, have the parent component update its state and rerender in order to remove this component."),!1},f=fj,p=function(e,t,n,r){return function(e,t,n,r){if(eL("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"),!p2(n))throw Error("Target container is not a DOM element.");if(null==e||!(void 0!==e._reactInternals))throw Error("parentComponent must be a valid React Component");return p8(e,t,n,!1,r)}(e,t,n,r)},h=pC,"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}),I.register("ibqfJ",function(e,t){e.exports=I("947eH")}),I.register("947eH",function(e,t){var r,a,i,o,s,l,u,c,d,f,p,h,m,v,g,y,b,w,_;n(e.exports,"unstable_now",function(){return r},function(e){return r=e}),n(e.exports,"unstable_IdlePriority",function(){return a},function(e){return a=e}),n(e.exports,"unstable_ImmediatePriority",function(){return i},function(e){return i=e}),n(e.exports,"unstable_LowPriority",function(){return o},function(e){return o=e}),n(e.exports,"unstable_NormalPriority",function(){return s},function(e){return s=e}),n(e.exports,"unstable_Profiling",function(){return l},function(e){return l=e}),n(e.exports,"unstable_UserBlockingPriority",function(){return u},function(e){return u=e}),n(e.exports,"unstable_cancelCallback",function(){return c},function(e){return c=e}),n(e.exports,"unstable_continueExecution",function(){return d},function(e){return d=e}),n(e.exports,"unstable_forceFrameRate",function(){return f},function(e){return f=e}),n(e.exports,"unstable_getCurrentPriorityLevel",function(){return p},function(e){return p=e}),n(e.exports,"unstable_getFirstCallbackNode",function(){return h},function(e){return h=e}),n(e.exports,"unstable_next",function(){return m},function(e){return m=e}),n(e.exports,"unstable_pauseExecution",function(){return v},function(e){return v=e}),n(e.exports,"unstable_requestPaint",function(){return g},function(e){return g=e}),n(e.exports,"unstable_runWithPriority",function(){return y},function(e){return y=e}),n(e.exports,"unstable_scheduleCallback",function(){return b},function(e){return b=e}),n(e.exports,"unstable_shouldYield",function(){return w},function(e){return w=e}),n(e.exports,"unstable_wrapCallback",function(){return _},function(e){return _=e}),function(){function e(e,t){var n=e.length;e.push(t),function(e,t,n){for(var r=n;r>0;){var a=r-1>>>1,i=e[a];if(!(k(i,t)>0))return;// The parent is larger. Swap positions.
e[a]=t,e[r]=i,r=a}}(e,t,n)}function t(e){return 0===e.length?null:e[0]}function n(e){if(0===e.length)return null;var t=e[0],n=e.pop();return n!==t&&(e[0]=n,function(e,t,n){for(var r=0,a=e.length,i=a>>>1;r<i;){var o=(r+1)*2-1,s=e[o],l=o+1,u=e[l];if(0>k(s,t))l<a&&0>k(u,s)?(e[r]=u,e[l]=t,r=l):(e[r]=s,e[o]=t,r=o);else{if(!(l<a&&0>k(u,t)))return;e[r]=u,e[l]=t,r=l}}}(e,n,0)),t}function k(e,t){// Compare sort index first, then task id.
var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if("undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error()),"object"==typeof performance&&"function"==typeof performance.now){var x,S=performance;r=function(){return S.now()}}else{var E=Date,C=E.now();r=function(){return E.now()-C}}// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
var T=[],O=[],R=1,P=null,I=3,D=!1,N=!1,L=!1,M="function"==typeof setTimeout?setTimeout:null,A="function"==typeof clearTimeout?clearTimeout:null,U="undefined"!=typeof setImmediate?setImmediate:null;function z(r){for(// Check for tasks that are no longer delayed and add them to the queue.
var a=t(O);null!==a;){if(null===a.callback)n(O);else{if(!(a.startTime<=r))return;// Timer fired. Transfer to the task queue.
n(O),a.sortIndex=a.expirationTime,e(T,a)}a=t(O)}}function F(e){if(L=!1,z(e),!N){if(null!==t(T))N=!0,G(j);else{var n=t(O);null!==n&&X(F,n.startTime-e)}}}function j(e,a){N=!1,L&&(// We scheduled a timeout but it's no longer needed. Cancel it.
L=!1,A(V),V=-1),D=!0;var i=I;try{return function(e,a){var i=a;for(z(i),P=t(T);null!==P&&!(P.expirationTime>i&&(!e||H()));){var o=P.callback;if("function"==typeof o){P.callback=null,I=P.priorityLevel;var s=o(P.expirationTime<=i);i=r(),"function"==typeof s?P.callback=s:P===t(T)&&n(T),z(i)}else n(T);P=t(T)}// Return whether there's additional work
if(null!==P)return!0;var l=t(O);return null!==l&&X(F,l.startTime-i),!1}(e,a)}finally{P=null,I=i,D=!1}}"undefined"!=typeof navigator&&void 0!==navigator.scheduling&&void 0!==navigator.scheduling.isInputPending&&navigator.scheduling.isInputPending.bind(navigator.scheduling);var q=!1,B=null,V=-1,W=5,$=-1;function H(){return!(r()-$<W)}var Y=function(){if(null!==B){var e=r();// Keep track of the start time so we can measure how long the main thread
// has been blocked.
$=e;// error can be observed.
//
// Intentionally not using a try-catch, since that makes some debugging
// techniques harder. Instead, if `scheduledHostCallback` errors, then
// `hasMoreWork` will remain true, and we'll continue the work loop.
var t=!0;try{t=B(!0,e)}finally{t?// of the preceding one.
x():(q=!1,B=null)}}else q=!1;// Yielding to the browser will give it a chance to paint, so we can
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
x=function(){U(Y)};else if("undefined"!=typeof MessageChannel){// DOM and Worker environments.
// We prefer MessageChannel because of the 4ms setTimeout clamping.
var Q=new MessageChannel,K=Q.port2;Q.port1.onmessage=Y,x=function(){K.postMessage(null)}}else x=function(){M(Y,0)};function G(e){B=e,q||(q=!0,x())}function X(e,t){V=M(function(){e(r())},t)}a=5,i=1,o=4,s=3,l=null,u=2,c=function(e){// remove from the queue because you can't remove arbitrary nodes from an
// array based heap, only the first one.)
e.callback=null},d=function(){N||D||(N=!0,G(j))},f=function(e){if(e<0||e>125){// Using console['error'] to evade Babel and ESLint
console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");return}W=e>0?Math.floor(1e3/e):5},p=function(){return I},h=function(){return t(T)},m=function(e){switch(I){case 1:case 2:case 3:// Shift down to normal priority
t=3;break;default:// Anything lower than normal priority should remain at the current level.
t=I}var t,n=I;I=t;try{return e()}finally{I=n}},v=function(){},g=function(){},y=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=I;I=e;try{return t()}finally{I=n}},b=function(n,a,i){var o,s,l=r();if("object"==typeof i&&null!==i){var u=i.delay;o="number"==typeof u&&u>0?l+u:l}else o=l;switch(n){case 1:s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}var c=o+s,d={id:R++,callback:a,priorityLevel:n,startTime:o,expirationTime:c,sortIndex:-1};return o>l?(// This is a delayed task.
d.sortIndex=o,e(O,d),null===t(T)&&d===t(O)&&(L?(A(V),V=-1):L=!0,// Schedule a timeout.
X(F,o-l))):(d.sortIndex=c,e(T,d),N||D||(N=!0,G(j))),d},w=H,_=function(e){var t=I;return function(){// This is a fork of runWithPriority, inlined for performance.
var n=I;I=t;try{return e.apply(this,arguments)}finally{I=n}}},"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}),I.register("bd4iG",function(e,t){var r,a,i;n(e.exports,"Fragment",function(){return r},function(e){return r=e}),n(e.exports,"jsx",function(){return a},function(e){return a=e}),n(e.exports,"jsxs",function(){return i},function(e){return i=e}),function(){var e,t,n,o,s,l,u,c,d,f,p,h,m,v,g=I("exYeM"),y=Symbol.for("react.element"),b=Symbol.for("react.portal"),w=Symbol.for("react.fragment"),_=Symbol.for("react.strict_mode"),k=Symbol.for("react.profiler"),x=Symbol.for("react.provider"),S=Symbol.for("react.context"),E=Symbol.for("react.forward_ref"),C=Symbol.for("react.suspense"),T=Symbol.for("react.suspense_list"),O=Symbol.for("react.memo"),R=Symbol.for("react.lazy"),P=Symbol.for("react.offscreen"),D=Symbol.iterator,N=g.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function L(e){for(var t,n,r,a,i=arguments.length,o=Array(i>1?i-1:0),s=1;s<i;s++)o[s-1]=arguments[s];t=e,n=o,""!==(r=N.ReactDebugCurrentFrame.getStackAddendum())&&(t+="%s",n=n.concat([r])),(a=n.map(function(e){return String(e)})).unshift("Warning: "+t),// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console.error,console,a)}function M(e){return e.displayName||"Context"}// Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.
function A(e){if(null==e)return null;if("number"==typeof e.tag&&L("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."),"function"==typeof e)return e.displayName||e.name||null;if("string"==typeof e)return e;switch(e){case w:return"Fragment";case b:return"Portal";case k:return"Profiler";case _:return"StrictMode";case C:return"Suspense";case T:return"SuspenseList"}if("object"==typeof e)switch(e.$$typeof){case S:return M(e)+".Consumer";case x:return M(e._context)+".Provider";case E:return function(e,t,n){var r=e.displayName;if(r)return r;var a=t.displayName||t.name||"";return""!==a?n+"("+a+")":n}// Keep in sync with react-reconciler/getComponentNameFromFiber
(e,e.render,"ForwardRef");case O:var t=e.displayName||null;if(null!==t)return t;return A(e.type)||"Memo";case R:var n=e._payload,r=e._init;try{return A(r(n))}catch(e){}}return null}e=Symbol.for("react.module.reference");var U=Object.assign,z=0;function F(){}F.__reactDisabledLog=!0;var j=N.ReactCurrentDispatcher;function q(e,t,n){if(void 0===d)try{throw Error()}catch(e){var r=e.stack.trim().match(/\n( *(at )?)/);d=r&&r[1]||""}// We use the prefix to ensure our stacks line up with native stack frames.
return"\n"+d+e}var B=!1;function V(e,r){// If something asked for a stack inside a fake render, it should get ignored.
if(!e||B)return"";var a,i,d=f.get(e);if(void 0!==d)return d;B=!0;var p=Error.prepareStackTrace;// $FlowFixMe It does accept undefined.
Error.prepareStackTrace=void 0,i=j.current,// for warnings.
j.current=null,function(){if(0===z){/* eslint-disable react-internal/no-production-logging */t=console.log,n=console.info,o=console.warn,s=console.error,l=console.group,u=console.groupCollapsed,c=console.groupEnd;var e={configurable:!0,enumerable:!0,value:F,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{info:e,log:e,warn:e,error:e,group:e,groupCollapsed:e,groupEnd:e});/* eslint-enable react-internal/no-production-logging */}z++}();try{// This should throw.
if(r){// Something should be setting the props in the constructor.
var h=function(){throw Error()};// $FlowFixMe
if(Object.defineProperty(h.prototype,"props",{set:function(){// We use a throwing setter instead of frozen or non-writable props
// because that won't throw in a non-strict mode function.
throw Error()}}),"object"==typeof Reflect&&Reflect.construct){// We construct a different control for this case to include any extra
// frames added by the construct call.
try{Reflect.construct(h,[])}catch(e){a=e}Reflect.construct(e,[],h)}else{try{h.call()}catch(e){a=e}e.call(h.prototype)}}else{try{throw Error()}catch(e){a=e}e()}}catch(t){// This is inlined manually because closure doesn't do it for us.
if(t&&a&&"string"==typeof t.stack){for(// This extracts the first frame from the sample that isn't also in the control.
// Skipping one frame that we assume is the frame that calls the two.
var m=t.stack.split("\n"),v=a.stack.split("\n"),g=m.length-1,y=v.length-1;g>=1&&y>=0&&m[g]!==v[y];)// Typically this will be the root most one. However, stack frames may be
// cut off due to maximum stack limits. In this case, one maybe cut off
// earlier than the other. We assume that the sample is longer or the same
// and there for cut off earlier. So we should find the root most frame in
// the sample somewhere in the control.
y--;for(;g>=1&&y>=0;g--,y--)// frame that called our sample function and the control.
if(m[g]!==v[y]){// In V8, the first line is describing the message but other VMs don't.
// If we're about to return the first line, and the control is also on the same
// line, that's a pretty good indicator that our sample threw at same line as
// the control. I.e. before we entered the sample frame. So we ignore this result.
// This can happen if you passed a class to function component, or non-function.
if(1!==g||1!==y)do // The next one that isn't the same should be our match though.
if(g--,--y<0||m[g]!==v[y]){// V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
var b="\n"+m[g].replace(" at new "," at ");// If our component frame is labeled "<anonymous>"
return e.displayName&&b.includes("<anonymous>")&&(b=b.replace("<anonymous>",e.displayName)),"function"==typeof e&&f.set(e,b),b}while(g>=1&&y>=0)break}}}finally{B=!1,j.current=i,function(){if(0==--z){/* eslint-disable react-internal/no-production-logging */var e={configurable:!0,enumerable:!0,writable:!0};// $FlowFixMe Flow thinks console is immutable.
Object.defineProperties(console,{log:U({},e,{value:t}),info:U({},e,{value:n}),warn:U({},e,{value:o}),error:U({},e,{value:s}),group:U({},e,{value:l}),groupCollapsed:U({},e,{value:u}),groupEnd:U({},e,{value:c})});/* eslint-enable react-internal/no-production-logging */}z<0&&L("disabledDepth fell below zero. This is a bug in React. Please file an issue.")}(),Error.prepareStackTrace=p}// Fallback to just using the name if we couldn't make it throw.
var w=e?e.displayName||e.name:"",_=w?q(w):"";return"function"==typeof e&&f.set(e,_),_}function W(e,t,n){if(null==e)return"";if("function"==typeof e)return V(e,!!((r=e.prototype)&&r.isReactComponent));if("string"==typeof e)return q(e);switch(e){case C:return q("Suspense");case T:return q("SuspenseList")}if("object"==typeof e)switch(e.$$typeof){case E:return V(e.render,!1);case O:// Memo may contain any component type so we recursively resolve it.
return W(e.type,t,n);case R:var r,a=e._payload,i=e._init;try{// Lazy may contain any component type so we recursively resolve it.
return W(i(a),t,n)}catch(e){}}return""}f=new("function"==typeof WeakMap?WeakMap:Map);var $=Object.prototype.hasOwnProperty,H={},Y=N.ReactDebugCurrentFrame;function Q(e){if(e){var t=e._owner,n=W(e.type,e._source,t?t.type:null);Y.setExtraStackFrame(n)}else Y.setExtraStackFrame(null)}var K=Array.isArray;// eslint-disable-next-line no-redeclare
function G(e){if(function(e){try{return!1}catch(e){return!0}}(e))return L("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.","function"==typeof Symbol&&Symbol.toStringTag&&e[Symbol.toStringTag]||e.constructor.name||"Object"),""+e;// throw (to help callers find troubleshooting comments)
}var X=N.ReactCurrentOwner,J={key:!0,ref:!0,__self:!0,__source:!0};m={};/**
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
 */var Z=function(e,t,n,r,a,i,o){var s={// This tag allows us to uniquely identify this as a React Element
$$typeof:y,// Built-in properties that belong on the element
type:e,key:t,ref:n,props:o,// Record the component responsible for creating this element.
_owner:i};return(// The validation flag is currently mutative. We put it on
// an external backing store so that we can freeze the whole object.
// This can be replaced with a WeakMap once they are implemented in
// commonly used development environments.
s._store={},// the validation flag non-enumerable (where possible, which should
// include every environment we run tests in), so the test framework
// ignores it.
Object.defineProperty(s._store,"validated",{configurable:!1,enumerable:!1,writable:!0,value:!1}),Object.defineProperty(s,"_self",{configurable:!1,enumerable:!1,writable:!1,value:r}),// equal for testing purposes and therefore we hide it from enumeration.
Object.defineProperty(s,"_source",{configurable:!1,enumerable:!1,writable:!1,value:a}),Object.freeze&&(Object.freeze(s.props),Object.freeze(s)),s)},ee=N.ReactCurrentOwner,et=N.ReactDebugCurrentFrame;function en(e){if(e){var t=e._owner,n=W(e.type,e._source,t?t.type:null);et.setExtraStackFrame(n)}else et.setExtraStackFrame(null)}/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */function er(e){return"object"==typeof e&&null!==e&&e.$$typeof===y}function ea(){if(ee.current){var e=A(ee.current.type);if(e)return"\n\nCheck the render method of `"+e+"`."}return""}v=!1;/**
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
 */function eo(e,t){if(e._store&&!e._store.validated&&null==e.key){e._store.validated=!0;var n=function(e){var t=ea();if(!t){var n="string"==typeof e?e:e.displayName||e.name;n&&(t="\n\nCheck the top-level render call using <"+n+">.")}return t}(t);if(!ei[n]){ei[n]=!0;// property, it may be the creator of the child that's responsible for
// assigning it a key.
var r="";e&&e._owner&&e._owner!==ee.current&&(r=" It was passed a child from "+A(e._owner.type)+"."),en(e),L('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.',n,r),en(null)}}}/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */function es(e,t){if("object"==typeof e){if(K(e))for(var n=0;n<e.length;n++){var r=e[n];er(r)&&eo(r,t)}else if(er(e))e._store&&(e._store.validated=!0);else if(e){var a=function(e){if(null===e||"object"!=typeof e)return null;var t=D&&e[D]||e["@@iterator"];return"function"==typeof t?t:null}(e);if("function"==typeof a&&a!==e.entries)for(var i,o=a.call(e);!(i=o.next()).done;)er(i.value)&&eo(i.value,t)}}}function el(t,n,r,a,i,o){var s="string"==typeof t||"function"==typeof t||t===w||t===k||t===_||t===C||t===T||t===P||"object"==typeof t&&null!==t&&(t.$$typeof===R||t.$$typeof===O||t.$$typeof===x||t.$$typeof===S||t.$$typeof===E||// This needs to include all possible module reference object
// types supported by any Flight configuration anywhere since
// we don't know which Flight build this will end up being used
// with.
t.$$typeof===e||void 0!==t.getModuleId);// We warn in this case but don't throw. We expect the element creation to
// succeed and there will likely be errors in render.
if(!s){var l,u="";(void 0===t||"object"==typeof t&&null!==t&&0===Object.keys(t).length)&&(u+=" You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");var c=void 0!==i?"\n\nCheck your code at "+i.fileName.replace(/^.*[\\\/]/,"")+":"+i.lineNumber+".":"";(c?u+=c:u+=ea(),null===t)?l="null":K(t)?l="array":void 0!==t&&t.$$typeof===y?(l="<"+(A(t.type)||"Unknown")+" />",u=" Did you accidentally export a JSX literal instead of a component?"):l=typeof t,L("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s",l,u)}var d=/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */function(e,t,n,r,a){var i,o={},s=null,l=null;for(i in void 0!==n&&(G(n),s=""+n),function(e){if($.call(e,"key")){var t=Object.getOwnPropertyDescriptor(e,"key").get;if(t&&t.isReactWarning)return!1}return void 0!==e.key}(t)&&(G(t.key),s=""+t.key),function(e){if($.call(e,"ref")){var t=Object.getOwnPropertyDescriptor(e,"ref").get;if(t&&t.isReactWarning)return!1}return void 0!==e.ref}(t)&&(l=t.ref,function(e,t){if("string"==typeof e.ref&&X.current&&t&&X.current.stateNode!==t){var n=A(X.current.type);m[n]||(L('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref',A(X.current.type),e.ref),m[n]=!0)}}(t,a)),t)$.call(t,i)&&!J.hasOwnProperty(i)&&(o[i]=t[i]);// Resolve default props
if(e&&e.defaultProps){var u=e.defaultProps;for(i in u)void 0===o[i]&&(o[i]=u[i])}if(s||l){var c,d,f="function"==typeof e?e.displayName||e.name||"Unknown":e;s&&((c=function(){p||(p=!0,L("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",f))}).isReactWarning=!0,Object.defineProperty(o,"key",{get:c,configurable:!0})),l&&((d=function(){h||(h=!0,L("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)",f))}).isReactWarning=!0,Object.defineProperty(o,"ref",{get:d,configurable:!0}))}return Z(e,s,l,a,r,X.current,o)}(t,n,r,i,o);// The result can be nullish if a mock or a custom function is used.
// TODO: Drop this when these are no longer allowed as the type argument.
if(null==d)return d;// Skip key warning if the type isn't valid since our key validation logic
// doesn't expect a non-string/function type and can throw confusing errors.
// We don't want exception behavior to differ between dev and prod.
// (Rendering will throw with a helpful message and as soon as the type is
// fixed, the key warnings will appear.)
if(s){var f=n.children;if(void 0!==f){if(a){if(K(f)){for(var g=0;g<f.length;g++)es(f[g],t);Object.freeze&&Object.freeze(f)}else L("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.")}else es(f,t)}}return t===w?/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */function(e){for(var t=Object.keys(e.props),n=0;n<t.length;n++){var r=t[n];if("children"!==r&&"key"!==r){en(e),L("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.",r),en(null);break}}null!==e.ref&&(en(e),L("Invalid attribute `ref` supplied to `React.Fragment`."),en(null))}(d):/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */function(e){var t,n=e.type;if(null!=n&&"string"!=typeof n){if("function"==typeof n)t=n.propTypes;else{if("object"!=typeof n||n.$$typeof!==E&&// Note: Memo only checks outer props here.
// Inner props are checked in the reconciler.
n.$$typeof!==O)return;t=n.propTypes}if(t){// Intentionally inside to avoid triggering lazy initializers:
var r=A(n);!function(e,t,n,r,a){// $FlowFixMe This is okay but Flow doesn't know it.
var i=Function.call.bind($);for(var o in e)if(i(e,o)){var s=void 0;// Prop type validation may throw. In case they do, we don't want to
// fail the render phase where it didn't fail before. So we log it.
// After these have been cleaned up, we'll let them throw.
try{// This is intentionally an invariant that gets caught. It's the same
// behavior as without this statement except with a better message.
if("function"!=typeof e[o]){// eslint-disable-next-line react-internal/prod-error-codes
var l=Error((r||"React class")+": "+n+" type `"+o+"` is invalid; it must be a function, usually from the `prop-types` package, but received `"+typeof e[o]+"`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");throw l.name="Invariant Violation",l}s=e[o](t,o,r,n,null,"SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED")}catch(e){s=e}!s||s instanceof Error||(Q(a),L("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).",r||"React class",n,o,typeof s),Q(null)),s instanceof Error&&!(s.message in H)&&(// Only monitor this failure once because there tends to be a lot of the
// same error.
H[s.message]=!0,Q(a),L("Failed %s type: %s",n,s.message),Q(null))}}(t,e.props,"prop",r,e)}else void 0===n.PropTypes||v||(v=!0,L("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?",A(n)||"Unknown"));"function"!=typeof n.getDefaultProps||n.getDefaultProps.isReactClassApproved||L("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.")}}(d),d}// These two functions exist to still get child warnings in dev
r=w,a=function(e,t,n){return el(e,t,n,!1)},i=// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.
function(e,t,n){return el(e,t,n,!0)}}()}),I.register("lrVh9",function(e,t){var r;n(e.exports,"useSyncExternalStore",function(){return r},function(e){return r=e}),function(){"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());var e=I("exYeM"),t=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;function n(e){for(var n,r,a,i,o=arguments.length,s=Array(o>1?o-1:0),l=1;l<o;l++)s[l-1]=arguments[l];n=e,r=s,""!==(a=t.ReactDebugCurrentFrame.getStackAddendum())&&(n+="%s",r=r.concat([a])),(i=r.map(function(e){return String(e)})).unshift("Warning: "+n),// breaks IE9: https://github.com/facebook/react/issues/13610
// eslint-disable-next-line react-internal/no-production-logging
Function.prototype.apply.call(console.error,console,i)}var a="function"==typeof Object.is?Object.is:/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t// eslint-disable-line no-self-compare
},i=e.useState,o=e.useEffect,s=e.useLayoutEffect,l=e.useDebugValue,u=!1,c=!1;function d(e){var t=e.getSnapshot,n=e.value;try{var r=t();return!a(n,r)}catch(e){return!0}}var f="undefined"!=typeof window&&void 0!==window.document&&void 0!==window.document.createElement?// because of a very particular set of implementation details and assumptions
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
f){u||void 0===e.startTransition||(u=!0,n("You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."));// breaks the rules of React, and only works here because of specific
// implementation details, most importantly that updates are
// always synchronous.
var p=r();c||a(p,r())||(n("The result of getSnapshot should be cached to avoid an infinite loop"),c=!0);// re-render whenever the subscribed state changes by updating an some
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
var h=i({inst:{value:p,getSnapshot:r}}),m=h[0].inst,v=h[1];// Track the latest getSnapshot function with a ref. This needs to be updated
return(// in the layout phase so we can access it during the tearing check that
// happens on subscribe.
s(function(){m.value=p,m.getSnapshot=r,d(m)&&v({inst:m})},[t,p,r]),o(function(){return d(m)&&v({inst:m}),t(function(){// TODO: Because there is no cross-renderer API for batching updates, it's
// up to the consumer of this library to wrap their subscription event
// with unstable_batchedUpdates. Should we try to detect when this isn't
// the case and print a warning in development?
// The store changed. Check if the snapshot changed since the last time we
// read from the store.
d(m)&&v({inst:m})})},[t]),l(p),p)}:function(e,t,n){// Note: The shim does not use getServerSnapshot, because pre-18 versions of
// React do not expose a way to check if we're hydrating. So users of the shim
// will need to track that themselves and return the correct value
// from `getSnapshot`.
return t()};r=void 0!==e.useSyncExternalStore?e.useSyncExternalStore:f,"undefined"!=typeof __REACT_DEVTOOLS_GLOBAL_HOOK__&&"function"==typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop&&__REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error())}()}),I.register("cV6nb",function(e,t){!/* UAParser.js v1.0.36
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License */function(n,r){var a="function",i="undefined",o="object",s="string",l="major",u="model",c="name",d="type",f="vendor",p="version",h="architecture",m="console",v="mobile",g="tablet",y="smarttv",b="wearable",w="embedded",_="Amazon",k="Apple",x="ASUS",S="BlackBerry",E="Browser",C="Chrome",T="Firefox",O="Google",R="Huawei",P="Microsoft",I="Motorola",D="Opera",N="Samsung",L="Sharp",M="Sony",A="Xiaomi",U="Zebra",z="Facebook",F="Chromium OS",j="Mac OS",q=function(e,t){var n={};for(var r in e)t[r]&&t[r].length%2==0?n[r]=t[r].concat(e[r]):n[r]=e[r];return n},B=function(e){for(var t={},n=0;n<e.length;n++)t[e[n].toUpperCase()]=e[n];return t},V=function(e,t){return typeof e===s&&-1!==W(t).indexOf(W(e))},W=function(e){return e.toLowerCase()},$=function(e,t){if(typeof e===s)return e=e.replace(/^\s\s*/,""),typeof t===i?e:e.substring(0,350)},H=function(e,t){for(var n,i,s,l,u,c,d=0;d<t.length&&!u;){var f=t[d],p=t[d+1];for(n=i=0;n<f.length&&!u&&f[n];)if(u=f[n++].exec(e))for(s=0;s<p.length;s++)c=u[++i],typeof(l=p[s])===o&&l.length>0?2===l.length?typeof l[1]==a?this[l[0]]=l[1].call(this,c):this[l[0]]=l[1]:3===l.length?typeof l[1]!==a||l[1].exec&&l[1].test?this[l[0]]=c?c.replace(l[1],l[2]):r:this[l[0]]=c?l[1].call(this,c,l[2]):r:4===l.length&&(this[l[0]]=c?l[3].call(this,c.replace(l[1],l[2])):r):this[l]=c||r;d+=2}},Y=function(e,t){for(var n in t)if(typeof t[n]===o&&t[n].length>0){for(var a=0;a<t[n].length;a++)if(V(t[n][a],e))return"?"===n?r:n}else if(V(t[n],e))return"?"===n?r:n;return e},Q={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},K={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[p,[c,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[p,[c,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[c,p],[/opios[\/ ]+([\w\.]+)/i],[p,[c,D+" Mini"]],[/\bopr\/([\w\.]+)/i],[p,[c,D]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[c,p],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[p,[c,"UC"+E]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[p,[c,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[p,[c,"WeChat"]],[/konqueror\/([\w\.]+)/i],[p,[c,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[p,[c,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[p,[c,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[c,/(.+)/,"$1 Secure "+E],p],[/\bfocus\/([\w\.]+)/i],[p,[c,T+" Focus"]],[/\bopt\/([\w\.]+)/i],[p,[c,D+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[p,[c,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[p,[c,"Dolphin"]],[/coast\/([\w\.]+)/i],[p,[c,D+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[p,[c,"MIUI "+E]],[/fxios\/([-\w\.]+)/i],[p,[c,T]],[/\bqihu|(qi?ho?o?|360)browser/i],[[c,"360 "+E]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[c,/(.+)/,"$1 "+E],p],[/(comodo_dragon)\/([\w\.]+)/i],[[c,/_/g," "],p],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[c,p],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[c],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[c,z],p],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram|snapchat)[\/ ]([-\w\.]+)/i],[c,p],[/\bgsa\/([\w\.]+) .*safari\//i],[p,[c,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[p,[c,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[p,[c,C+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[c,C+" WebView"],p],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[p,[c,"Android "+E]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[c,p],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[p,[c,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[p,c],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[c,[p,Y,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[c,p],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[c,"Netscape"],p],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[p,[c,T+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[c,p],[/(cobalt)\/([\w\.]+)/i],[c,[p,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[h,"amd64"]],[/(ia32(?=;))/i],[[h,W]],[/((?:i[346]|x)86)[;\)]/i],[[h,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[h,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[h,"armhf"]],[/windows (ce|mobile); ppc;/i],[[h,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[h,/ower/,"",W]],[/(sun4\w)[;\)]/i],[[h,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[h,W]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[u,[f,N],[d,g]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[u,[f,N],[d,v]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[u,[f,k],[d,v]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[u,[f,k],[d,g]],[/(macintosh);/i],[u,[f,k]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[u,[f,L],[d,v]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[u,[f,R],[d,g]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[u,[f,R],[d,v]],[/\b(poco[\w ]+|m2\d{3}j\d\d[a-z]{2})(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[u,/_/g," "],[f,A],[d,v]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[u,/_/g," "],[f,A],[d,g]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[u,[f,"OPPO"],[d,v]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[u,[f,"Vivo"],[d,v]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[u,[f,"Realme"],[d,v]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[u,[f,I],[d,v]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[u,[f,I],[d,g]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[u,[f,"LG"],[d,g]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[u,[f,"LG"],[d,v]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[u,[f,"Lenovo"],[d,g]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[u,/_/g," "],[f,"Nokia"],[d,v]],[/(pixel c)\b/i],[u,[f,O],[d,g]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[u,[f,O],[d,v]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[u,[f,M],[d,v]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[u,"Xperia Tablet"],[f,M],[d,g]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[u,[f,"OnePlus"],[d,v]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[u,[f,_],[d,g]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[u,/(.+)/g,"Fire Phone $1"],[f,_],[d,v]],[/(playbook);[-\w\),; ]+(rim)/i],[u,f,[d,g]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[u,[f,S],[d,v]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[u,[f,x],[d,g]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[u,[f,x],[d,v]],[/(nexus 9)/i],[u,[f,"HTC"],[d,g]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[f,[u,/_/g," "],[d,v]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[u,[f,"Acer"],[d,g]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[u,[f,"Meizu"],[d,v]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron|infinix|tecno)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[f,u,[d,v]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[f,u,[d,g]],[/(surface duo)/i],[u,[f,P],[d,g]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[u,[f,"Fairphone"],[d,v]],[/(u304aa)/i],[u,[f,"AT&T"],[d,v]],[/\bsie-(\w*)/i],[u,[f,"Siemens"],[d,v]],[/\b(rct\w+) b/i],[u,[f,"RCA"],[d,g]],[/\b(venue[\d ]{2,7}) b/i],[u,[f,"Dell"],[d,g]],[/\b(q(?:mv|ta)\w+) b/i],[u,[f,"Verizon"],[d,g]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[u,[f,"Barnes & Noble"],[d,g]],[/\b(tm\d{3}\w+) b/i],[u,[f,"NuVision"],[d,g]],[/\b(k88) b/i],[u,[f,"ZTE"],[d,g]],[/\b(nx\d{3}j) b/i],[u,[f,"ZTE"],[d,v]],[/\b(gen\d{3}) b.+49h/i],[u,[f,"Swiss"],[d,v]],[/\b(zur\d{3}) b/i],[u,[f,"Swiss"],[d,g]],[/\b((zeki)?tb.*\b) b/i],[u,[f,"Zeki"],[d,g]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[f,"Dragon Touch"],u,[d,g]],[/\b(ns-?\w{0,9}) b/i],[u,[f,"Insignia"],[d,g]],[/\b((nxa|next)-?\w{0,9}) b/i],[u,[f,"NextBook"],[d,g]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[f,"Voice"],u,[d,v]],[/\b(lvtel\-)?(v1[12]) b/i],[[f,"LvTel"],u,[d,v]],[/\b(ph-1) /i],[u,[f,"Essential"],[d,v]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[u,[f,"Envizen"],[d,g]],[/\b(trio[-\w\. ]+) b/i],[u,[f,"MachSpeed"],[d,g]],[/\btu_(1491) b/i],[u,[f,"Rotor"],[d,g]],[/(shield[\w ]+) b/i],[u,[f,"Nvidia"],[d,g]],[/(sprint) (\w+)/i],[f,u,[d,v]],[/(kin\.[onetw]{3})/i],[[u,/\./g," "],[f,P],[d,v]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[u,[f,U],[d,g]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[u,[f,U],[d,v]],[/smart-tv.+(samsung)/i],[f,[d,y]],[/hbbtv.+maple;(\d+)/i],[[u,/^/,"SmartTV"],[f,N],[d,y]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[f,"LG"],[d,y]],[/(apple) ?tv/i],[f,[u,k+" TV"],[d,y]],[/crkey/i],[[u,C+"cast"],[f,O],[d,y]],[/droid.+aft(\w+)( bui|\))/i],[u,[f,_],[d,y]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[u,[f,L],[d,y]],[/(bravia[\w ]+)( bui|\))/i],[u,[f,M],[d,y]],[/(mitv-\w{5}) bui/i],[u,[f,A],[d,y]],[/Hbbtv.*(technisat) (.*);/i],[f,u,[d,y]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[f,$],[u,$],[d,y]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[d,y]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[f,u,[d,m]],[/droid.+; (shield) bui/i],[u,[f,"Nvidia"],[d,m]],[/(playstation [345portablevi]+)/i],[u,[f,M],[d,m]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[u,[f,P],[d,m]],[/((pebble))app/i],[f,u,[d,b]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[u,[f,k],[d,b]],[/droid.+; (glass) \d/i],[u,[f,O],[d,b]],[/droid.+; (wt63?0{2,3})\)/i],[u,[f,U],[d,b]],[/(quest( 2| pro)?)/i],[u,[f,z],[d,b]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[f,[d,w]],[/(aeobc)\b/i],[u,[f,_],[d,w]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[u,[d,v]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[u,[d,g]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[d,g]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[d,v]],[/(android[-\w\. ]{0,9});.+buil/i],[u,[f,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[p,[c,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[p,[c,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[c,p],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[p,c]],os:[[/microsoft (windows) (vista|xp)/i],[c,p],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[c,[p,Y,Q]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[c,"Windows"],[p,Y,Q]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/(?:ios;fbsv\/|iphone.+ios[\/ ])([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[p,/_/g,"."],[c,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[c,j],[p,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[p,c],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[c,p],[/\(bb(10);/i],[p,[c,S]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[p,[c,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[p,[c,T+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[p,[c,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[p,[c,"watchOS"]],[/crkey\/([\d\.]+)/i],[p,[c,C+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[c,F],p],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[c,p],[/(sunos) ?([\w\.\d]*)/i],[[c,"Solaris"],p],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[c,p]]},G=function(e,t){if(typeof e===o&&(t=e,e=r),!(this instanceof G))return new G(e,t).getResult();var m=typeof n!==i&&n.navigator?n.navigator:r,y=e||(m&&m.userAgent?m.userAgent:""),b=m&&m.userAgentData?m.userAgentData:r,w=t?q(K,t):K,_=m&&m.userAgent==y;return this.getBrowser=function(){var e,t={};return t[c]=r,t[p]=r,H.call(t,y,w.browser),t[l]=typeof(e=t[p])===s?e.replace(/[^\d\.]/g,"").split(".")[0]:r,_&&m&&m.brave&&typeof m.brave.isBrave==a&&(t[c]="Brave"),t},this.getCPU=function(){var e={};return e[h]=r,H.call(e,y,w.cpu),e},this.getDevice=function(){var e={};return e[f]=r,e[u]=r,e[d]=r,H.call(e,y,w.device),_&&!e[d]&&b&&b.mobile&&(e[d]=v),_&&"Macintosh"==e[u]&&m&&typeof m.standalone!==i&&m.maxTouchPoints&&m.maxTouchPoints>2&&(e[u]="iPad",e[d]=g),e},this.getEngine=function(){var e={};return e[c]=r,e[p]=r,H.call(e,y,w.engine),e},this.getOS=function(){var e={};return e[c]=r,e[p]=r,H.call(e,y,w.os),_&&!e[c]&&b&&"Unknown"!=b.platform&&(e[c]=b.platform.replace(/chrome os/i,F).replace(/macos/i,j)),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return y},this.setUA=function(e){return y=typeof e===s&&e.length>350?$(e,350):e,this},this.setUA(y),this};G.VERSION="1.0.36",G.BROWSER=B([c,p,l]),G.CPU=B([h]),G.DEVICE=B([u,f,d,m,v,y,g,b,w]),G.ENGINE=G.OS=B([c,p]),e.exports&&(t=e.exports=G),t.UAParser=G;var X=typeof n!==i&&(n.jQuery||n.Zepto);if(X&&!X.ua){var J=new G;X.ua=J.getResult(),X.ua.get=function(){return J.getUA()},X.ua.set=function(e){J.setUA(e);var t=J.getResult();for(var n in t)X.ua[n]=t[n]}}}("object"==typeof window?window:this)});var D=I("exYeM"),N={};N=I("crBKy");var D=(I("exYeM"),I("exYeM"));// TYPES
// UTILS
let L="undefined"==typeof window||"Deno"in window;function M(){}function A(e,t,n){return H(e)?"function"==typeof t?{...n,queryKey:e,queryFn:t}:{...t,queryKey:e}:e}function U(e,t,n){return H(e)?[{...t,queryKey:e},n]:[e||{},t]}function z(e,t){let{type:n="all",exact:r,fetchStatus:a,predicate:i,queryKey:o,stale:s}=e;if(H(o)){if(r){if(t.queryHash!==j(o,t.options))return!1}else{if(!B(t.queryKey,o))return!1}}if("all"!==n){let e=t.isActive();if("active"===n&&!e||"inactive"===n&&e)return!1}return("boolean"!=typeof s||t.isStale()===s)&&(void 0===a||a===t.state.fetchStatus)&&(!i||!!i(t))}function F(e,t){let{exact:n,fetching:r,predicate:a,mutationKey:i}=e;if(H(i)){if(!t.options.mutationKey)return!1;if(n){if(q(t.options.mutationKey)!==q(i))return!1}else{if(!B(t.options.mutationKey,i))return!1}}return("boolean"!=typeof r||"loading"===t.state.status===r)&&(!a||!!a(t))}function j(e,t){let n=(null==t?void 0:t.queryKeyHashFn)||q;return n(e)}/**
 * Default query keys hash function.
 * Hashes the value into a stable hash.
 */function q(e){return JSON.stringify(e,(e,t)=>W(t)?Object.keys(t).sort().reduce((e,n)=>(e[n]=t[n],e),{}):t)}/**
 * Checks if `b` partially matches with `a`.
 */function B(e,t){return e===t||typeof e==typeof t&&!!e&&!!t&&"object"==typeof e&&"object"==typeof t&&!Object.keys(t).some(n=>!B(e[n],t[n]))}function V(e){return Array.isArray(e)&&e.length===Object.keys(e).length}// Copied from: https://github.com/jonschlinkert/is-plain-object
function W(e){if(!$(e))return!1;// If has modified constructor
let t=e.constructor;if(void 0===t)return!0;// If has modified prototype
let n=t.prototype;return!!($(n)&&n.hasOwnProperty("isPrototypeOf"))}function $(e){return"[object Object]"===Object.prototype.toString.call(e)}function H(e){return Array.isArray(e)}function Y(e){return new Promise(t=>{setTimeout(t,e)})}/**
 * Schedules a microtask.
 * This can be useful to schedule state updates after rendering.
 */function Q(e){Y(0).then(e)}let K=console,G=function(){let e=[],t=0,n=e=>{e()},r=e=>{e()},a=r=>{t?e.push(r):Q(()=>{n(r)})},i=()=>{let t=e;e=[],t.length&&Q(()=>{r(()=>{t.forEach(e=>{n(e)})})})};return{batch:e=>{let n;t++;try{n=e()}finally{--t||i()}return n},batchCalls:e=>(...t)=>{a(()=>{e(...t)})},schedule:a,setNotifyFunction:e=>{n=e},setBatchNotifyFunction:e=>{r=e}}}// SINGLETON
();class X{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){let t={listener:e};return this.listeners.add(t),this.onSubscribe(),()=>{this.listeners.delete(t),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}}let J=new class extends X{constructor(){super(),this.setup=e=>{// addEventListener does not exist in React Native, but window does
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if(!L&&window.addEventListener){let t=()=>e();// Listen to visibillitychange and focus
return window.addEventListener("visibilitychange",t,!1),window.addEventListener("focus",t,!1),()=>{// Be sure to unsubscribe if a new handler is set
window.removeEventListener("visibilitychange",t),window.removeEventListener("focus",t)}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.cleanup)||e.call(this),this.cleanup=void 0}}setEventListener(e){var t;this.setup=e,null==(t=this.cleanup)||t.call(this),this.cleanup=e(e=>{"boolean"==typeof e?this.setFocused(e):this.onFocus()})}setFocused(e){let t=this.focused!==e;t&&(this.focused=e,this.onFocus())}onFocus(){this.listeners.forEach(({listener:e})=>{e()})}isFocused(){return"boolean"==typeof this.focused?this.focused:"undefined"==typeof document||[void 0,"visible","prerender"].includes(document.visibilityState)}},Z=["online","offline"],ee=new class extends X{constructor(){super(),this.setup=e=>{// addEventListener does not exist in React Native, but window does
// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if(!L&&window.addEventListener){let t=()=>e();// Listen to online
return Z.forEach(e=>{window.addEventListener(e,t,!1)}),()=>{// Be sure to unsubscribe if a new handler is set
Z.forEach(e=>{window.removeEventListener(e,t)})}}}}onSubscribe(){this.cleanup||this.setEventListener(this.setup)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.cleanup)||e.call(this),this.cleanup=void 0}}setEventListener(e){var t;this.setup=e,null==(t=this.cleanup)||t.call(this),this.cleanup=e(e=>{"boolean"==typeof e?this.setOnline(e):this.onOnline()})}setOnline(e){let t=this.online!==e;t&&(this.online=e,this.onOnline())}onOnline(){this.listeners.forEach(({listener:e})=>{e()})}isOnline(){return"boolean"==typeof this.online?this.online:"undefined"==typeof navigator||void 0===navigator.onLine||navigator.onLine}};function et(e){return Math.min(1e3*2**e,3e4)}function en(e){return(null!=e?e:"online")!=="online"||ee.isOnline()}class er{constructor(e){this.revert=null==e?void 0:e.revert,this.silent=null==e?void 0:e.silent}}function ea(e){return e instanceof er}function ei(e){let t,n,r,a=!1,i=0,o=!1,s=new Promise((e,t)=>{n=e,r=t}),l=()=>!J.isFocused()||"always"!==e.networkMode&&!ee.isOnline(),u=r=>{o||(o=!0,null==e.onSuccess||e.onSuccess(r),null==t||t(),n(r))},c=n=>{o||(o=!0,null==e.onError||e.onError(n),null==t||t(),r(n))},d=()=>new Promise(n=>{t=e=>{let t=o||!l();return t&&n(e),t},null==e.onPause||e.onPause()}).then(()=>{t=void 0,o||null==e.onContinue||e.onContinue()}),f=()=>{let t;// Do nothing if already resolved
if(!o){try{t=e.fn()}catch(e){t=Promise.reject(e)}Promise.resolve(t).then(u).catch(t=>{var n,r;// Stop if the fetch is already resolved
if(o)return;// Do we need to retry the request?
let s=null!=(n=e.retry)?n:3,u=null!=(r=e.retryDelay)?r:et,p="function"==typeof u?u(i,t):u,h=!0===s||"number"==typeof s&&i<s||"function"==typeof s&&s(i,t);if(a||!h){// We are done if the query does not need to be retried
c(t);return}i++,null==e.onFail||e.onFail(i,t),Y(p)// Pause if the document is not visible or when the device is offline
.then(()=>{if(l())return d()}).then(()=>{a?c(t):f()})})}};return en(e.networkMode)?f():d().then(f),{promise:s,cancel:t=>{o||(c(new er(t)),null==e.abort||e.abort())},continue:()=>{let e=null==t?void 0:t();return e?s:Promise.resolve()},cancelRetry:()=>{a=!0},continueRetry:()=>{a=!1}}}class eo{destroy(){this.clearGcTimeout()}scheduleGc(){var e;this.clearGcTimeout(),"number"==typeof(e=this.cacheTime)&&e>=0&&e!==1/0&&(this.gcTimeout=setTimeout(()=>{this.optionalRemove()},this.cacheTime))}updateCacheTime(e){// Default to 5 minutes (Infinity for server-side) if no cache time is set
this.cacheTime=Math.max(this.cacheTime||0,null!=e?e:L?1/0:3e5)}clearGcTimeout(){this.gcTimeout&&(clearTimeout(this.gcTimeout),this.gcTimeout=void 0)}}// CLASS
class es extends eo{constructor(e){super(),this.abortSignalConsumed=!1,this.defaultOptions=e.defaultOptions,this.setOptions(e.options),this.observers=[],this.cache=e.cache,this.logger=e.logger||K,this.queryKey=e.queryKey,this.queryHash=e.queryHash,this.initialState=e.state||function(e){let t="function"==typeof e.initialData?e.initialData():e.initialData,n=void 0!==t,r=n?"function"==typeof e.initialDataUpdatedAt?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:n?null!=r?r:Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:n?"success":"loading",fetchStatus:"idle"}}(this.options),this.state=this.initialState,this.scheduleGc()}get meta(){return this.options.meta}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}optionalRemove(){this.observers.length||"idle"!==this.state.fetchStatus||this.cache.remove(this)}setData(e,t){var n,r;let a=(n=this.state.data,// Use prev data if an isDataEqual function is defined and returns `true`
null!=(r=this.options).isDataEqual&&r.isDataEqual(n,e)?n:"function"==typeof r.structuralSharing?r.structuralSharing(n,e):!1!==r.structuralSharing?/**
 * This function returns `a` if `b` is deeply equal.
 * If not, it will replace any deeply equal children of `b` with those of `a`.
 * This can be used for structural sharing between JSON values for example.
 */function e(t,n){if(t===n)return t;let r=V(t)&&V(n);if(r||W(t)&&W(n)){let a=r?t.length:Object.keys(t).length,i=r?n:Object.keys(n),o=i.length,s=r?[]:{},l=0;for(let a=0;a<o;a++){let o=r?a:i[a];s[o]=e(t[o],n[o]),s[o]===t[o]&&l++}return a===o&&l===a?t:s}return n}(n,e):e);// Set data and mark it as cached
return this.dispatch({data:a,type:"success",dataUpdatedAt:null==t?void 0:t.updatedAt,manual:null==t?void 0:t.manual}),a}setState(e,t){this.dispatch({type:"setState",state:e,setStateOptions:t})}cancel(e){var t;let n=this.promise;return null==(t=this.retryer)||t.cancel(e),n?n.then(M).catch(M):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(this.initialState)}isActive(){return this.observers.some(e=>!1!==e.options.enabled)}isDisabled(){return this.getObserversCount()>0&&!this.isActive()}isStale(){return this.state.isInvalidated||!this.state.dataUpdatedAt||this.observers.some(e=>e.getCurrentResult().isStale)}isStaleByTime(e=0){return this.state.isInvalidated||!this.state.dataUpdatedAt||!Math.max(this.state.dataUpdatedAt+(e||0)-Date.now(),0)}onFocus(){var e;let t=this.observers.find(e=>e.shouldFetchOnWindowFocus());t&&t.refetch({cancelRefetch:!1}),null==// Continue fetch if currently paused
(e=this.retryer)||e.continue()}onOnline(){var e;let t=this.observers.find(e=>e.shouldFetchOnReconnect());t&&t.refetch({cancelRefetch:!1}),null==// Continue fetch if currently paused
(e=this.retryer)||e.continue()}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),this.cache.notify({type:"observerAdded",query:this,observer:e}))}removeObserver(e){this.observers.includes(e)&&(this.observers=this.observers.filter(t=>t!==e),this.observers.length||(this.retryer&&(this.abortSignalConsumed?this.retryer.cancel({revert:!0}):this.retryer.cancelRetry()),this.scheduleGc()),this.cache.notify({type:"observerRemoved",query:this,observer:e}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||this.dispatch({type:"invalidate"})}fetch(e,t){var n,r,a,i;if("idle"!==this.state.fetchStatus){if(this.state.dataUpdatedAt&&null!=t&&t.cancelRefetch)this.cancel({silent:!0});else if(this.promise)return null==// make sure that retries that were potentially cancelled due to unmounts can continue
(a=this.retryer)||a.continueRetry(),this.promise}// Update config if passed, otherwise the config from the last execution is used
// Use the options from the first observer with a query function if no function is found.
// This can happen when the query is hydrated or created with setQueryData.
if(e&&this.setOptions(e),!this.options.queryFn){let e=this.observers.find(e=>e.options.queryFn);e&&this.setOptions(e.options)}Array.isArray(this.options.queryKey)||this.logger.error("As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']");let o=function(){if("function"==typeof AbortController)return new AbortController}(),s={queryKey:this.queryKey,pageParam:void 0,meta:this.meta},l=e=>{Object.defineProperty(e,"signal",{enumerable:!0,get:()=>{if(o)return this.abortSignalConsumed=!0,o.signal}})};// Create query function context
l(s);let u={fetchOptions:t,options:this.options,queryKey:this.queryKey,state:this.state,fetchFn:()=>this.options.queryFn?(this.abortSignalConsumed=!1,this.options.queryFn(s)):Promise.reject("Missing queryFn for queryKey '"+this.options.queryHash+"'")};l(u),null==(n=this.options.behavior)||n.onFetch(u),this.revertState=this.state,("idle"===this.state.fetchStatus||this.state.fetchMeta!==(null==(r=u.fetchOptions)?void 0:r.meta))&&this.dispatch({type:"fetch",meta:null==(i=u.fetchOptions)?void 0:i.meta});let c=e=>{if(ea(e)&&e.silent||this.dispatch({type:"error",error:e}),!ea(e)){var t,n,r,a;null==// Notify cache callback
(t=(n=this.cache.config).onError)||t.call(n,e,this),null==(r=(a=this.cache.config).onSettled)||r.call(a,this.state.data,e,this),this.logger.error(e)}this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1};// Try to fetch the data
return this.retryer=ei({fn:u.fetchFn,abort:null==o?void 0:o.abort.bind(o),onSuccess:e=>{var t,n,r,a;if(void 0===e){this.logger.error("Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: "+this.queryHash),c(Error(this.queryHash+" data is undefined"));return}this.setData(e),null==(t=(n=this.cache.config).onSuccess)||t.call(n,e,this),null==(r=(a=this.cache.config).onSettled)||r.call(a,e,this.state.error,this),this.isFetchingOptimistic||this.scheduleGc(),this.isFetchingOptimistic=!1},onError:c,onFail:(e,t)=>{this.dispatch({type:"failed",failureCount:e,error:t})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:u.options.retry,retryDelay:u.options.retryDelay,networkMode:u.options.networkMode}),this.promise=this.retryer.promise,this.promise}dispatch(e){this.state=(t=>{var n,r;switch(e.type){case"failed":return{...t,fetchFailureCount:e.failureCount,fetchFailureReason:e.error};case"pause":return{...t,fetchStatus:"paused"};case"continue":return{...t,fetchStatus:"fetching"};case"fetch":return{...t,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null!=(n=e.meta)?n:null,fetchStatus:en(this.options.networkMode)?"fetching":"paused",...!t.dataUpdatedAt&&{error:null,status:"loading"}};case"success":return{...t,data:e.data,dataUpdateCount:t.dataUpdateCount+1,dataUpdatedAt:null!=(r=e.dataUpdatedAt)?r:Date.now(),error:null,isInvalidated:!1,status:"success",...!e.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":let a=e.error;if(ea(a)&&a.revert&&this.revertState)return{...this.revertState,fetchStatus:"idle"};return{...t,error:a,errorUpdateCount:t.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:t.fetchFailureCount+1,fetchFailureReason:a,fetchStatus:"idle",status:"error"};case"invalidate":return{...t,isInvalidated:!0};case"setState":return{...t,...e.state}}})(this.state),G.batch(()=>{this.observers.forEach(t=>{t.onQueryUpdate(e)}),this.cache.notify({query:this,type:"updated",action:e})})}}// CLASS
class el extends X{constructor(e){super(),this.config=e||{},this.queries=[],this.queriesMap={}}build(e,t,n){var r;let a=t.queryKey,i=null!=(r=t.queryHash)?r:j(a,t),o=this.get(i);return o||(o=new es({cache:this,logger:e.getLogger(),queryKey:a,queryHash:i,options:e.defaultQueryOptions(t),state:n,defaultOptions:e.getQueryDefaults(a)}),this.add(o)),o}add(e){this.queriesMap[e.queryHash]||(this.queriesMap[e.queryHash]=e,this.queries.push(e),this.notify({type:"added",query:e}))}remove(e){let t=this.queriesMap[e.queryHash];t&&(e.destroy(),this.queries=this.queries.filter(t=>t!==e),t===e&&delete this.queriesMap[e.queryHash],this.notify({type:"removed",query:e}))}clear(){G.batch(()=>{this.queries.forEach(e=>{this.remove(e)})})}get(e){return this.queriesMap[e]}getAll(){return this.queries}find(e,t){let[n]=U(e,t);return void 0===n.exact&&(n.exact=!0),this.queries.find(e=>z(n,e))}findAll(e,t){let[n]=U(e,t);return Object.keys(n).length>0?this.queries.filter(e=>z(n,e)):this.queries}notify(e){G.batch(()=>{this.listeners.forEach(({listener:t})=>{t(e)})})}onFocus(){G.batch(()=>{this.queries.forEach(e=>{e.onFocus()})})}onOnline(){G.batch(()=>{this.queries.forEach(e=>{e.onOnline()})})}}// CLASS
class eu extends eo{constructor(e){super(),this.defaultOptions=e.defaultOptions,this.mutationId=e.mutationId,this.mutationCache=e.mutationCache,this.logger=e.logger||K,this.observers=[],this.state=e.state||ec(),this.setOptions(e.options),this.scheduleGc()}setOptions(e){this.options={...this.defaultOptions,...e},this.updateCacheTime(this.options.cacheTime)}get meta(){return this.options.meta}setState(e){this.dispatch({type:"setState",state:e})}addObserver(e){this.observers.includes(e)||(this.observers.push(e),this.clearGcTimeout(),this.mutationCache.notify({type:"observerAdded",mutation:this,observer:e}))}removeObserver(e){this.observers=this.observers.filter(t=>t!==e),this.scheduleGc(),this.mutationCache.notify({type:"observerRemoved",mutation:this,observer:e})}optionalRemove(){this.observers.length||("loading"===this.state.status?this.scheduleGc():this.mutationCache.remove(this))}continue(){var e,t;return null!=(e=null==(t=this.retryer)?void 0:t.continue())?e:this.execute()}async execute(){var e,t,n,r,a,i,o,s,l,u,c,d,f,p,h,m,v,g,y,b;let w="loading"===this.state.status;try{if(!w){this.dispatch({type:"loading",variables:this.options.variables}),await (null==(l=(u=this.mutationCache.config).onMutate)?void 0:l.call(u,this.state.variables,this));let e=await (null==(c=(d=this.options).onMutate)?void 0:c.call(d,this.state.variables));e!==this.state.context&&this.dispatch({type:"loading",context:e,variables:this.state.variables})}let f=await (()=>{var e;return this.retryer=ei({fn:()=>this.options.mutationFn?this.options.mutationFn(this.state.variables):Promise.reject("No mutationFn found"),onFail:(e,t)=>{this.dispatch({type:"failed",failureCount:e,error:t})},onPause:()=>{this.dispatch({type:"pause"})},onContinue:()=>{this.dispatch({type:"continue"})},retry:null!=(e=this.options.retry)?e:0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode}),this.retryer.promise})();// Notify cache callback
return await (null==(e=(t=this.mutationCache.config).onSuccess)?void 0:e.call(t,f,this.state.variables,this.state.context,this)),await (null==(n=(r=this.options).onSuccess)?void 0:n.call(r,f,this.state.variables,this.state.context)),await (null==(a=(i=this.mutationCache.config).onSettled)?void 0:a.call(i,f,null,this.state.variables,this.state.context,this)),await (null==(o=(s=this.options).onSettled)?void 0:o.call(s,f,null,this.state.variables,this.state.context)),this.dispatch({type:"success",data:f}),f}catch(e){try{throw(// Notify cache callback
await (null==(f=(p=this.mutationCache.config).onError)?void 0:f.call(p,e,this.state.variables,this.state.context,this)),this.logger.error(e),await (null==(h=(m=this.options).onError)?void 0:h.call(m,e,this.state.variables,this.state.context)),await (null==(v=(g=this.mutationCache.config).onSettled)?void 0:v.call(g,void 0,e,this.state.variables,this.state.context,this)),await (null==(y=(b=this.options).onSettled)?void 0:y.call(b,void 0,e,this.state.variables,this.state.context)),e)}finally{this.dispatch({type:"error",error:e})}}}dispatch(e){this.state=(t=>{switch(e.type){case"failed":return{...t,failureCount:e.failureCount,failureReason:e.error};case"pause":return{...t,isPaused:!0};case"continue":return{...t,isPaused:!1};case"loading":return{...t,context:e.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:!en(this.options.networkMode),status:"loading",variables:e.variables};case"success":return{...t,data:e.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...t,data:void 0,error:e.error,failureCount:t.failureCount+1,failureReason:e.error,isPaused:!1,status:"error"};case"setState":return{...t,...e.state}}})(this.state),G.batch(()=>{this.observers.forEach(t=>{t.onMutationUpdate(e)}),this.mutationCache.notify({mutation:this,type:"updated",action:e})})}}function ec(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0}}// CLASS
class ed extends X{constructor(e){super(),this.config=e||{},this.mutations=[],this.mutationId=0}build(e,t,n){let r=new eu({mutationCache:this,logger:e.getLogger(),mutationId:++this.mutationId,options:e.defaultMutationOptions(t),state:n,defaultOptions:t.mutationKey?e.getMutationDefaults(t.mutationKey):void 0});return this.add(r),r}add(e){this.mutations.push(e),this.notify({type:"added",mutation:e})}remove(e){this.mutations=this.mutations.filter(t=>t!==e),this.notify({type:"removed",mutation:e})}clear(){G.batch(()=>{this.mutations.forEach(e=>{this.remove(e)})})}getAll(){return this.mutations}find(e){return void 0===e.exact&&(e.exact=!0),this.mutations.find(t=>F(e,t))}findAll(e){return this.mutations.filter(t=>F(e,t))}notify(e){G.batch(()=>{this.listeners.forEach(({listener:t})=>{t(e)})})}resumePausedMutations(){var e;return this.resuming=(null!=(e=this.resuming)?e:Promise.resolve()).then(()=>{let e=this.mutations.filter(e=>e.state.isPaused);return G.batch(()=>e.reduce((e,t)=>e.then(()=>t.continue().catch(M)),Promise.resolve()))}).then(()=>{this.resuming=void 0}),this.resuming}}function ef(e,t){return null==e.getNextPageParam?void 0:e.getNextPageParam(t[t.length-1],t)}var D=I("exYeM");let ep=/*#__PURE__*/D.createContext(void 0),eh=/*#__PURE__*/D.createContext(!1);// Otherwise, if contextSharing is on, we share the first and at least one
// instance of the context across the window
// to ensure that if React Query is used across
// different bundles or microfrontends they will
// all use the same **instance** of context, regardless
// of module scoping.
function em(e,t){return e||(t&&"undefined"!=typeof window?(window.ReactQueryClientContext||(window.ReactQueryClientContext=ep),window.ReactQueryClientContext):ep)}let ev=({context:e}={})=>{let t=D.useContext(em(e,D.useContext(eh)));if(!t)throw Error("No QueryClient set, use QueryClientProvider to set one");return t},eg=({client:e,children:t,context:n,contextSharing:r=!1})=>{D.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),r&&e.getLogger().error("The contextSharing option has been deprecated and will be removed in the next major version");let a=em(n,r);return /*#__PURE__*/D.createElement(eh.Provider,{value:!n&&r},/*#__PURE__*/D.createElement(a.Provider,{value:e},t))};var D=I("exYeM");let ey=({debug:e,children:t})=>/*@__PURE__*/r(D).createElement(eb.Provider,{value:{log:(...t)=>{e&&console.log(...t)},warn:(...t)=>{e&&console.warn(...t)},error:(...t)=>{e&&console.error(...t);// throw new Error(...message)
    },info:(...t)=>{e&&console.info(...t)}}},t),eb=/*#__PURE__*/(0,D.createContext)({log:()=>{},warn:()=>{},error:()=>{},info:()=>{}}),ew=()=>(0,D.useContext)(eb);var D=(I("exYeM"),I("exYeM")),e_={};e_=I("bd4iG");var ek=Object.create,ex=Object.defineProperty,eS=Object.getOwnPropertyDescriptor,eE=Object.getOwnPropertyNames,eC=Object.getPrototypeOf,eT=Object.prototype.hasOwnProperty,eO=(a=(e,t)=>{var n,r;n=e,r=function(e){var t,n=void 0===Number.MAX_SAFE_INTEGER?9007199254740991:Number.MAX_SAFE_INTEGER,r=new WeakMap,a=(t=function(e,t){return r.set(e,t),t},function(e){var a=r.get(e),i=void 0===a?e.size:a<1073741824?a+1:0;if(!e.has(i))return t(e,i);if(e.size<536870912){for(;e.has(i);)i=Math.floor(1073741824*Math.random());return t(e,i)}if(e.size>n)throw Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;e.has(i);)i=Math.floor(Math.random()*n);return t(e,i)});e.addUniqueNumber=function(e){var t=a(e);return e.add(t),t},e.generateUniqueNumber=a},"object"==typeof e&&"u">typeof t?r(e):"function"==typeof define&&define.amd?define(["exports"],r):r((n="u">typeof globalThis?globalThis:n||self).fastUniqueNumbers={})},()=>(i||a((i={exports:{}}).exports,i),i.exports));D.Component;var eR=(s=null!=(o=eO())?ek(eC(o)):{},((e,t,n,r)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let n of eE(t))eT.call(e,n)||void 0===n||ex(e,n,{get:()=>t[n],enumerable:!(r=eS(t,n))||r.enumerable});return e})(o&&o.__esModule?s:ex(s,"default",{value:o,enumerable:!0}),o)),eP=e=>void 0!==e.method&&"call"===e.method,eI=e=>null===e.error&&"number"==typeof e.id;l=e=>{let t=new Map([[0,()=>{}]]),n=new Map([[0,()=>{}]]),r=new Map,a=new Worker(e);return a.addEventListener("message",({data:e})=>{if(eP(e)){let{params:{timerId:a,timerType:i}}=e;if("interval"===i){let e=t.get(a);if("number"==typeof e){let t=r.get(e);if(void 0===t||t.timerId!==a||t.timerType!==i)throw Error("The timer is in an undefined state.")}else if("u">typeof e)e();else throw Error("The timer is in an undefined state.")}else if("timeout"===i){let e=n.get(a);if("number"==typeof e){let t=r.get(e);if(void 0===t||t.timerId!==a||t.timerType!==i)throw Error("The timer is in an undefined state.")}else if("u">typeof e)e(),n.delete(a);else throw Error("The timer is in an undefined state.")}}else if(eI(e)){let{id:a}=e,i=r.get(a);if(void 0===i)throw Error("The timer is in an undefined state.");let{timerId:o,timerType:s}=i;r.delete(a),"interval"===s?t.delete(o):n.delete(o)}else{let{error:{message:t}}=e;throw Error(t)}}),{clearInterval:e=>{let n=(0,eR.generateUniqueNumber)(r);r.set(n,{timerId:e,timerType:"interval"}),t.set(e,n),a.postMessage({id:n,method:"clear",params:{timerId:e,timerType:"interval"}})},clearTimeout:e=>{let t=(0,eR.generateUniqueNumber)(r);r.set(t,{timerId:e,timerType:"timeout"}),n.set(e,t),a.postMessage({id:t,method:"clear",params:{timerId:e,timerType:"timeout"}})},setInterval:(e,n)=>{let r=(0,eR.generateUniqueNumber)(t);return t.set(r,()=>{e(),"function"==typeof t.get(r)&&a.postMessage({id:null,method:"set",params:{delay:n,now:performance.now(),timerId:r,timerType:"interval"}})}),a.postMessage({id:null,method:"set",params:{delay:n,now:performance.now(),timerId:r,timerType:"interval"}}),r},setTimeout:(e,t)=>{let r=(0,eR.generateUniqueNumber)(n);return n.set(r,e),a.postMessage({id:null,method:"set",params:{delay:t,now:performance.now(),timerId:r,timerType:"timeout"}}),r}}},t=null,()=>{if(null!==t)return t;let e=new Blob(['(()=>{"use strict";const e=new Map,t=new Map,r=(e,t)=>{let r,o;const i=performance.now();r=i,o=e-Math.max(0,i-t);return{expected:r+o,remainingDelay:o}},o=(e,t,r,i)=>{const s=performance.now();s>r?postMessage({id:null,method:"call",params:{timerId:t,timerType:i}}):e.set(t,setTimeout(o,r-s,e,t,r,i))};addEventListener("message",(i=>{let{data:s}=i;try{if("clear"===s.method){const{id:r,params:{timerId:o,timerType:i}}=s;if("interval"===i)(t=>{const r=e.get(t);if(void 0===r)throw new Error(\'There is no interval scheduled with the given id "\'.concat(t,\'".\'));clearTimeout(r),e.delete(t)})(o),postMessage({error:null,id:r});else{if("timeout"!==i)throw new Error(\'The given type "\'.concat(i,\'" is not supported\'));(e=>{const r=t.get(e);if(void 0===r)throw new Error(\'There is no timeout scheduled with the given id "\'.concat(e,\'".\'));clearTimeout(r),t.delete(e)})(o),postMessage({error:null,id:r})}}else{if("set"!==s.method)throw new Error(\'The given method "\'.concat(s.method,\'" is not supported\'));{const{params:{delay:i,now:n,timerId:a,timerType:d}}=s;if("interval"===d)((t,i,s)=>{const{expected:n,remainingDelay:a}=r(t,s);e.set(i,setTimeout(o,a,e,i,n,"interval"))})(i,a,n);else{if("timeout"!==d)throw new Error(\'The given type "\'.concat(d,\'" is not supported\'));((e,i,s)=>{const{expected:n,remainingDelay:a}=r(e,s);t.set(i,setTimeout(o,a,t,i,n,"timeout"))})(i,a,n)}}}}catch(e){postMessage({error:{message:e.message},id:s.id,result:null})}}))})();'],{type:"application/javascript; charset=utf-8"}),n=URL.createObjectURL(e);return t=l(n),setTimeout(()=>URL.revokeObjectURL(n)),t};var eD=(typeof window>"u"?"undefined":typeof window)=="object",eN={setTimeout:eD?setTimeout.bind(window):setTimeout,clearTimeout:eD?clearTimeout.bind(window):clearTimeout,setInterval:eD?setInterval.bind(window):setInterval,clearInterval:eD?clearInterval.bind(window):clearInterval},eL={},eM=class{name;closed=!1;mc=new MessageChannel;constructor(e){this.name=e,eL[e]=eL[e]||[],eL[e].push(this),this.mc.port1.start(),this.mc.port2.start(),this.onStorage=this.onStorage.bind(this),window.addEventListener("storage",this.onStorage)}onStorage(e){if(e.storageArea!==window.localStorage||e.key.substring(0,this.name.length)!==this.name||null===e.newValue)return;let t=JSON.parse(e.newValue);this.mc.port2.postMessage(t)}postMessage(e){if(this.closed)throw Error("InvalidStateError");let t=JSON.stringify(e),n=`${this.name}:${String(Date.now())}${String(Math.random())}`;window.localStorage.setItem(n,t),eN.setTimeout(()=>{window.localStorage.removeItem(n)},500),eL[this.name].forEach(e=>{e!==this&&e.mc.port2.postMessage(JSON.parse(t))})}close(){if(this.closed)return;this.closed=!0,this.mc.port1.close(),this.mc.port2.close(),window.removeEventListener("storage",this.onStorage);let e=eL[this.name].indexOf(this);eL[this.name].splice(e,1)}get onmessage(){return this.mc.port1.onmessage}set onmessage(e){this.mc.port1.onmessage=e}get onmessageerror(){return this.mc.port1.onmessageerror}set onmessageerror(e){this.mc.port1.onmessageerror=e}addEventListener(e,t){return this.mc.port1.addEventListener(e,t)}removeEventListener(e,t){return this.mc.port1.removeEventListener(e,t)}dispatchEvent(e){return this.mc.port1.dispatchEvent(e)}},eA=typeof window>"u"?void 0:"function"==typeof window.BroadcastChannel?window.BroadcastChannel:eM;function eU(){return Math.random().toString(36).substring(2)}var ez=class{options;channel;token=eU();isLeader=!1;isDead=!1;isApplying=!1;reApply=!1;intervals=[];listeners=[];deferred;constructor(e,t){this.channel=e,this.options=t,this.apply=this.apply.bind(this),this.awaitLeadership=this.awaitLeadership.bind(this),this.sendAction=this.sendAction.bind(this)}async apply(){if(this.isLeader||this.isDead)return!1;if(this.isApplying)return this.reApply=!0,!1;this.isApplying=!0;let e=!1,t=t=>{let{token:n,action:r}=t.data;n!==this.token&&(0===r&&n>this.token&&(e=!0),1===r&&(e=!0))};this.channel.addEventListener("message",t);try{return this.sendAction(0),await function(e=0){return new Promise(t=>eN.setTimeout(t,e))}(this.options.responseTime),this.channel.removeEventListener("message",t),this.isApplying=!1,e?!!this.reApply&&this.apply():(this.assumeLead(),!0)}catch{return!1}}awaitLeadership(){if(this.isLeader)return Promise.resolve();let e=!1,t=null;return new Promise(n=>{let r=()=>{if(e)return;e=!0;try{eN.clearInterval(t)}catch{}let r=this.intervals.indexOf(t);r>=0&&this.intervals.splice(r,1),this.channel.removeEventListener("message",a),n()};t=eN.setInterval(()=>{this.apply().then(()=>{this.isLeader&&r()})},this.options.fallbackInterval),this.intervals.push(t);let a=e=>{let{action:t}=e.data;2===t&&this.apply().then(()=>{this.isLeader&&r()})};this.channel.addEventListener("message",a)})}sendAction(e){this.channel.postMessage({action:e,token:this.token})}assumeLead(){this.isLeader=!0;let e=e=>{let{action:t}=e.data;0===t&&this.sendAction(1)};return this.channel.addEventListener("message",e),this.listeners.push(e),this.sendAction(1)}waitForLeadership(){return this.deferred||(this.deferred=this.awaitLeadership()),this.deferred}close(){if(!this.isDead){this.isDead=!0,this.isLeader=!1,this.sendAction(2);try{this.listeners.forEach(e=>this.channel.removeEventListener("message",e)),this.intervals.forEach(e=>eN.clearInterval(e))}catch{}}}},eF=class{channel;options;elector;token=eU();registry=new Map;allIdle=!1;isLastActive=!1;constructor(e){let{channelName:t}=e;this.options=e,this.channel=new eA(t),this.registry.set(this.token,1),e.leaderElection&&(this.elector=new ez(this.channel,{fallbackInterval:2e3,responseTime:100}),this.elector.waitForLeadership()),this.channel.addEventListener("message",e=>{let{action:t,token:n,data:r}=e.data;switch(t){case 3:this.registry.set(n,2);break;case 4:this.registry.delete(n);break;case 5:this.idle(n);break;case 6:this.active(n);break;case 7:this.prompt(n);break;case 8:this.start(n);break;case 9:this.reset(n);break;case 10:this.activate(n);break;case 11:this.pause(n);break;case 12:this.resume(n);break;case 13:this.options.onMessage(r)}}),this.send(3)}get isLeader(){if(!this.elector)throw Error('❌ Leader election is not enabled. To Enable it set the "leaderElection" property to true.');return this.elector.isLeader}prompt(e=this.token){this.registry.set(e,0);let t=[...this.registry.values()].every(e=>0===e);e===this.token&&this.send(7),t&&this.options.onPrompt()}idle(e=this.token){this.registry.set(e,2);let t=[...this.registry.values()].every(e=>2===e);e===this.token&&this.send(5),!this.allIdle&&t&&(this.allIdle=!0,this.options.onIdle())}active(e=this.token){this.allIdle=!1,this.registry.set(e,1);let t=[...this.registry.values()].some(e=>1===e);e===this.token&&this.send(6),t&&this.options.onActive(),this.isLastActive=e===this.token}start(e=this.token){this.allIdle=!1,this.registry.set(e,1),e===this.token?this.send(8):this.options.start(!0),this.isLastActive=e===this.token}reset(e=this.token){this.allIdle=!1,this.registry.set(e,1),e===this.token?this.send(9):this.options.reset(!0),this.isLastActive=e===this.token}activate(e=this.token){this.allIdle=!1,this.registry.set(e,1),e===this.token?this.send(10):this.options.activate(!0),this.isLastActive=e===this.token}pause(e=this.token){e===this.token?this.send(11):this.options.pause(!0)}resume(e=this.token){e===this.token?this.send(12):this.options.resume(!0)}message(e){try{this.channel.postMessage({action:13,token:this.token,data:e})}catch{}}send(e){try{this.channel.postMessage({action:e,token:this.token})}catch{}}close(){this.options.leaderElection&&this.elector.close(),this.send(4),this.channel.close()}},ej=eD?document:null,eq=["mousemove","keydown","wheel","DOMMouseScroll","mousewheel","mousedown","touchstart","touchmove","MSPointerDown","MSPointerMove","visibilitychange","focus"];function eB(e,t){let n=0;return function(...r){let a=new Date().getTime();if(!(a-n<t))return n=a,e(...r)}}var eV=()=>Date.now(),eW=(0,D.createContext)(null);function e$(e){let t=function({timeout:e=12e5,promptTimeout:t=0,promptBeforeIdle:n=0,element:r=ej,events:a=eq,timers:i,immediateEvents:o=[],onPresenceChange:s=()=>{},onPrompt:l=()=>{},onIdle:u=()=>{},onActive:c=()=>{},onAction:d=()=>{},onMessage:f=()=>{},debounce:p=0,throttle:h=0,eventsThrottle:m=200,startOnMount:v=!0,startManually:g=!1,stopOnIdle:y=!1,crossTab:b=!1,name:w="idle-timer",syncTimers:_=0,leaderElection:k=!1,disabled:x=!1}={}){let S=(0,D.useRef)(eV()),E=(0,D.useRef)(eV()),C=(0,D.useRef)(null),T=(0,D.useRef)(null),O=(0,D.useRef)(0),R=(0,D.useRef)(0),P=(0,D.useRef)(0),I=(0,D.useRef)(0),N=(0,D.useRef)(!1),L=(0,D.useRef)(!1),M=(0,D.useRef)(!1),A=(0,D.useRef)(!0),U=(0,D.useRef)(!1),z=(0,D.useRef)(null),F=(0,D.useRef)(null),j=(0,D.useRef)(e),q=(0,D.useRef)(0);(0,D.useEffect)(()=>{if(t&&console.warn("⚠️ IdleTimer -- The `promptTimeout` property has been deprecated in favor of `promptBeforeIdle`. It will be removed in the next major release."),n&&t)throw Error("❌ Both promptTimeout and promptBeforeIdle can not be set. The promptTimeout property will be deprecated in a future version.");if(e>=2147483647)throw Error(`\u274C The value for the timeout property must fit in a 32 bit signed integer, 2147483647.`);if(t>=2147483647)throw Error(`\u274C The value for the promptTimeout property must fit in a 32 bit signed integer, 2147483647.`);if(n>=2147483647)throw Error(`\u274C The value for the promptBeforeIdle property must fit in a 32 bit signed integer, 2147483647.`);if(n>=e)throw Error(`\u274C The value for the promptBeforeIdle property must be less than the timeout property, ${e}.`);if(n?(j.current=e-n,q.current=n):(j.current=e,q.current=t),!A.current){if(g||x)return;N.current&&(G.current(null,eI),F.current&&F.current.active()),ed()}},[e,t,n,g,x]);let B=(0,D.useRef)(y);(0,D.useEffect)(()=>{B.current=y},[y]);let V=(0,D.useRef)(o),W=(0,D.useRef)(r),$=(0,D.useRef)([...new Set([...a,...o]).values()]),H=(0,D.useRef)(x);(0,D.useEffect)(()=>{H.current=x,!A.current&&(x?eh():g||ed())},[x]);let Y=(0,D.useRef)(s);(0,D.useEffect)(()=>{Y.current=s},[s]);let Q=(0,D.useRef)(l);(0,D.useEffect)(()=>{Q.current=l},[l]);let K=(0,D.useRef)(u);(0,D.useEffect)(()=>{K.current=u},[u]);let G=(0,D.useRef)(c);(0,D.useEffect)(()=>{G.current=c},[c]);let X=(0,D.useRef)(d);(0,D.useEffect)(()=>{X.current=d},[d]);let J=(0,D.useRef)(f);(0,D.useEffect)(()=>{J.current=f},[f]);let Z=(0,D.useMemo)(()=>{let e=(e,t)=>X.current(e,t);return p>0?function(e,t){let n;function r(...a){n&&clearTimeout(n),n=setTimeout(()=>{e(...a),n=null},t)}return r.cancel=function(){clearTimeout(n)},r}(e,p):h>0?eB(e,h):e},[h,p]),ee=(0,D.useRef)();(0,D.useEffect)(()=>{b&&_&&(ee.current=eB(()=>{F.current.active()},_))},[b,_]);let et=()=>{null!==z.current&&(eN.clearTimeout(z.current),z.current=null)},en=(e,t=!0)=>{et(),z.current=eN.setTimeout(eo,e||j.current),t&&(T.current=eV())},er=e=>{L.current||N.current||(Q.current(e,eI),Y.current({type:"active",prompted:!0},eI)),I.current=0,P.current=eV(),L.current=!0,en(q.current,!1)},ea=()=>{et(),N.current||(K.current(null,eI),Y.current({type:"idle"},eI)),N.current=!0,C.current=eV(),B.current?ec():L.current&&(P.current=0,L.current=!1)},ei=e=>{et(),(N.current||L.current)&&(G.current(e,eI),Y.current({type:"active",prompted:!1},eI)),L.current=!1,P.current=0,N.current=!1,O.current+=eV()-C.current,R.current+=eV()-C.current,eu(),en()},eo=e=>{if(!N.current){Z.cancel&&Z.cancel();let t=eV()-T.current;if(!(j.current+q.current<t)&&q.current>0&&!L.current){F.current?F.current.prompt():er(e);return}F.current?F.current.idle():ea();return}F.current?F.current.active():ei(e)},es=e=>{if(v||T.current||(T.current=eV(),G.current(null,eI)),Z(e,eI),L.current)return;if(et(),!N.current&&V.current.includes(e.type)){eo(e);return}let t=eV()-T.current;if(N.current&&!y||!N.current&&t>=j.current){eo(e);return}M.current=!1,I.current=0,P.current=0,en(),b&&_&&ee.current()},el=(0,D.useRef)(es);(0,D.useEffect)(()=>{let e=U.current;e&&ec(),m>0?el.current=eB(es,m):el.current=es,e&&eu()},[m,h,p,X,b,_]);let eu=()=>{eD&&W.current&&(U.current||($.current.forEach(e=>{W.current.addEventListener(e,el.current,{capture:!0,passive:!0})}),U.current=!0))},ec=(e=!1)=>{eD&&W.current&&(U.current||e)&&($.current.forEach(e=>{W.current.removeEventListener(e,el.current,{capture:!0})}),U.current=!1)},ed=(0,D.useCallback)(e=>!H.current&&(et(),eu(),N.current=!1,L.current=!1,M.current=!1,I.current=0,P.current=0,F.current&&!e&&F.current.start(),en(),!0),[z,N,H,j,F]),ef=(0,D.useCallback)(e=>!H.current&&(et(),eu(),E.current=eV(),O.current+=eV()-C.current,R.current+=eV()-C.current,O.current=0,N.current=!1,L.current=!1,M.current=!1,I.current=0,P.current=0,F.current&&!e&&F.current.reset(),g||en(),!0),[z,N,j,g,H,F]),ep=(0,D.useCallback)(e=>!H.current&&(et(),eu(),(N.current||L.current)&&ei(),N.current=!1,L.current=!1,M.current=!1,I.current=0,P.current=0,E.current=eV(),F.current&&!e&&F.current.activate(),en(),!0),[z,N,L,H,j,F]),eh=(0,D.useCallback)((e=!1)=>!H.current&&!M.current&&(I.current=ek(),M.current=!0,ec(),et(),F.current&&!e&&F.current.pause(),!0),[z,H,F]),em=(0,D.useCallback)((e=!1)=>!H.current&&!!M.current&&(M.current=!1,L.current||eu(),N.current||en(I.current),P.current&&(P.current=eV()),F.current&&!e&&F.current.resume(),!0),[z,j,H,I,F]),ev=(0,D.useCallback)((e,t)=>(F.current?(t&&J.current(e,eI),F.current.message(e)):t&&J.current(e,eI),!0),[f]),eg=(0,D.useCallback)(()=>N.current,[N]),ey=(0,D.useCallback)(()=>L.current,[L]),eb=(0,D.useCallback)(()=>F.current?F.current.isLeader:null,[F]),ew=(0,D.useCallback)(()=>F.current?F.current.isLastActive:null,[F]),e_=(0,D.useCallback)(()=>F.current?F.current.token:null,[F]),ek=(0,D.useCallback)(()=>{if(M.current)return I.current;let e=Math.floor((I.current?I.current:q.current+j.current)-(T.current?eV()-T.current:0));return e<0?0:Math.abs(e)},[j,q,L,I,T]),ex=(0,D.useCallback)(()=>Math.round(eV()-E.current),[E]),eS=(0,D.useCallback)(()=>Math.round(eV()-S.current),[S]),eE=(0,D.useCallback)(()=>C.current?new Date(C.current):null,[C]),eC=(0,D.useCallback)(()=>T.current?new Date(T.current):null,[T]),eT=(0,D.useCallback)(()=>N.current?Math.round(eV()-C.current+O.current):Math.round(O.current),[C,O]),eO=(0,D.useCallback)(()=>N.current?Math.round(eV()-C.current+R.current):Math.round(R.current),[C,R]),eR=(0,D.useCallback)(()=>{let e=Math.round(ex()-eT());return e>=0?e:0},[C,O]),eP=(0,D.useCallback)(()=>{let e=Math.round(eS()-eO());return e>=0?e:0},[C,O]);(0,D.useEffect)(()=>{if(p>0&&h>0)throw Error("❌ onAction can either be throttled or debounced, not both.");i&&(eN.setTimeout=i.setTimeout,eN.clearTimeout=i.clearTimeout,eN.setInterval=i.setInterval,eN.clearInterval=i.clearInterval);let e=()=>{F.current&&F.current.close(),Z.cancel&&Z.cancel(),et(),ec(!0)};return eD&&window.addEventListener("beforeunload",e),()=>{eD&&window.removeEventListener("beforeunload",e),F.current&&F.current.close(),Z.cancel&&Z.cancel(),et(),ec(!0)}},[]),(0,D.useEffect)(()=>{F.current&&F.current.close(),b?F.current=new eF({channelName:w,leaderElection:k,onPrompt:()=>{er()},onIdle:()=>{ea()},onActive:()=>{ei()},onMessage:e=>{J.current(e,eI)},start:ed,reset:ef,activate:ep,pause:eh,resume:em}):F.current=null},[b,w,k,Q,K,G,J,ed,ef,eh,em]),(0,D.useEffect)(()=>{A.current||(et(),ec(!0)),g||x||(v?ed():eu())},[g,v,x,A]),(0,D.useEffect)(()=>{if(!A.current){let e=[...new Set([...a,...o]).values()];ec(),$.current=e,W.current=r,V.current=o,g||x||(v?ed():eu())}},[r,JSON.stringify(a),JSON.stringify(o),A,x,g,v]),(0,D.useEffect)(()=>{A.current&&(A.current=!1)},[A]);let eI={message:ev,start:ed,reset:ef,activate:ep,pause:eh,resume:em,isIdle:eg,isPrompted:ey,isLeader:eb,isLastActiveTab:ew,getTabId:e_,getRemainingTime:ek,getElapsedTime:ex,getTotalElapsedTime:eS,getLastIdleTime:eE,getLastActiveTime:eC,getIdleTime:eT,getTotalIdleTime:eO,getActiveTime:eR,getTotalActiveTime:eP,setOnPresenceChange:e=>{s=e,Y.current=e},setOnPrompt:e=>{l=e,Q.current=e},setOnIdle:e=>{u=e,K.current=e},setOnActive:e=>{c=e,G.current=e},setOnAction:e=>{d=e,X.current=e},setOnMessage:e=>{f=e,J.current=e}};return eI}(e);return(0,e_.jsx)(eW.Provider,{value:t,children:e.children})}eW.Consumer;var D=I("exYeM");function eH(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}var eY=function e(t,n){function r(e,r,a){if(!(typeof document>"u")){"number"==typeof(a=eH({},n,a)).expires&&(a.expires=new Date(Date.now()+864e5*a.expires)),a.expires&&(a.expires=a.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var i="";for(var o in a)a[o]&&(i+="; "+o,!0===a[o]||(i+="="+a[o].split(";")[0]));return document.cookie=e+"="+t.write(r,e)+i}}return Object.create({set:r,get:function(e){if(!(typeof document>"u"||arguments.length&&!e)){for(var n=document.cookie?document.cookie.split("; "):[],r={},a=0;a<n.length;a++){var i=n[a].split("="),o=i.slice(1).join("=");try{var s=decodeURIComponent(i[0]);if(r[s]=t.read(o,s),e===s)break}catch{}}return e?r[e]:r}},remove:function(e,t){r(e,"",eH({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,eH({},this.attributes,t))},withConverter:function(t){return e(eH({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(n)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"});function eQ(){return"u">typeof window}function eK(){if(eQ())return window.matchMedia("(hover: none)").matches||navigator.userAgent.toLowerCase().includes("mobile")}function eG(){if(eQ())return!eK()}function eX(e){var t,n;let r=null==(t=e.context)?void 0:t.includes("onDesktop"),a=null==(n=e.context)?void 0:n.includes("onMobile");r||a||e.handler(),r&&eG()&&e.handler(),a&&eK()&&e.handler()}function eJ(e){eZ(e),window.addEventListener("load",e,!0),window.addEventListener("mousemove",e,!0),window.addEventListener("mousedown",e,!0),window.addEventListener("keydown",e,!0),window.addEventListener("touchstart",e,!0),window.addEventListener("click",e,!0),window.addEventListener("scroll",e,!0)}function eZ(e){window.removeEventListener("load",e,!0),window.removeEventListener("mousemove",e,!0),window.removeEventListener("mousedown",e,!0),window.removeEventListener("keydown",e,!0),window.removeEventListener("touchstart",e,!0),window.removeEventListener("click",e,!0),window.removeEventListener("scroll",e,!0)}function e0(e,t=200){let n;return{execute(r){clearTimeout(n),n=setTimeout(()=>e(r),t)},abort(){clearTimeout(n)}}}let e1={onMobile:"onMobile",onTrigger:"onTrigger",onDesktop:"onDesktop",onUnsubscribe:"onUnsubscribe"},e2={cookie:{daysToExpire:30,key:"exit-intent"},desktop:{triggerOnIdle:!1,useBeforeUnload:!1,triggerOnMouseLeave:!0,delayInSecondsToTrigger:10},mobile:{triggerOnIdle:!0,delayInSecondsToTrigger:10}};var e3=Object.defineProperty,e5=Object.defineProperties,e4=Object.getOwnPropertyDescriptors,e6=Object.getOwnPropertySymbols,e8=Object.prototype.hasOwnProperty,e7=Object.prototype.propertyIsEnumerable,e9=(e,t,n)=>t in e?e3(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,te=(e,t)=>{for(var n in t||(t={}))e8.call(t,n)&&e9(e,n,t[n]);if(e6)for(var n of e6(t))e7.call(t,n)&&e9(e,n,t[n]);return e},tt=(e,t)=>e5(e,e4(t)),D=I("exYeM");// CLASS
class tn extends X{constructor(e,t){super(),this.client=e,this.setOptions(t),this.bindMethods(),this.updateResult()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var t;let n=this.options;this.options=this.client.defaultMutationOptions(e),!/**
 * Shallow compare objects. Only works with objects that always have the same properties.
 */function(e,t){if(e&&!t||t&&!e)return!1;for(let n in e)if(e[n]!==t[n])return!1;return!0}(n,this.options)&&this.client.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.currentMutation,observer:this}),null==(t=this.currentMutation)||t.setOptions(this.options)}onUnsubscribe(){if(!this.hasListeners()){var e;null==(e=this.currentMutation)||e.removeObserver(this)}}onMutationUpdate(e){this.updateResult();let t={listeners:!0};"success"===e.type?t.onSuccess=!0:"error"===e.type&&(t.onError=!0),this.notify(t)}getCurrentResult(){return this.currentResult}reset(){this.currentMutation=void 0,this.updateResult(),this.notify({listeners:!0})}mutate(e,t){return this.mutateOptions=t,this.currentMutation&&this.currentMutation.removeObserver(this),this.currentMutation=this.client.getMutationCache().build(this.client,{...this.options,variables:void 0!==e?e:this.options.variables}),this.currentMutation.addObserver(this),this.currentMutation.execute()}updateResult(){let e=this.currentMutation?this.currentMutation.state:ec(),t={...e,isLoading:"loading"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset};this.currentResult=t}notify(e){G.batch(()=>{// First trigger the mutate callbacks
if(this.mutateOptions&&this.hasListeners()){var t,n,r,a,i,o,s,l;e.onSuccess?(null==(t=(n=this.mutateOptions).onSuccess)||t.call(n,this.currentResult.data,this.currentResult.variables,this.currentResult.context),null==(r=(a=this.mutateOptions).onSettled)||r.call(a,this.currentResult.data,null,this.currentResult.variables,this.currentResult.context)):e.onError&&(null==(i=(o=this.mutateOptions).onError)||i.call(o,this.currentResult.error,this.currentResult.variables,this.currentResult.context),null==(s=(l=this.mutateOptions).onSettled)||s.call(l,void 0,this.currentResult.error,this.currentResult.variables,this.currentResult.context))}// Then trigger the listeners
e.listeners&&this.listeners.forEach(({listener:e})=>{e(this.currentResult)})})}}var tr={};tr=I("lrVh9");let ta=tr.useSyncExternalStore;function ti(){}let to={"Content-Type":"application/json"},ts={get:async(e,t)=>await fetch(e+"?"+new URLSearchParams(t),{method:"GET",headers:to}),post:async(e,t)=>await fetch(e,{method:"POST",headers:to,body:JSON.stringify(t)}),patch:async(e,t)=>await fetch(e,{method:"PATCH",headers:to,body:JSON.stringify(t)}),put:async(e,t)=>await fetch(e,{method:"PUT",headers:to,body:JSON.stringify(t)}),delete:async e=>await fetch(e,{method:"DELETE",headers:to})},tl=()=>{let{log:e,error:t}=ew();return function(e,t,n){var r,a;let i=H(e)?"function"==typeof t?{mutationKey:e,mutationFn:t}:{...t,mutationKey:e}:"function"==typeof e?{...t,mutationFn:e}:{...e},o=ev({context:i.context}),[s]=D.useState(()=>new tn(o,i));D.useEffect(()=>{s.setOptions(i)},[s,i]);let l=ta(D.useCallback(e=>s.subscribe(G.batchCalls(e)),[s]),()=>s.getCurrentResult(),()=>s.getCurrentResult()),u=D.useCallback((e,t)=>{s.mutate(e,t).catch(ti)},[s]);if(l.error&&(r=s.options.useErrorBoundary,a=[l.error],// Allow useErrorBoundary function to override throwing behavior on a per-error basis
"function"==typeof r?r(...a):!!r))throw l.error;return{...l,mutate:u,mutateAsync:l.mutate}}// eslint-disable-next-line @typescript-eslint/no-empty-function
(n=>ts.post("https://target-engine-api.starship-staging.com/collector/"+n?.visitor?.id,n).then(t=>(e("Collector API response",t),t)).catch(e=>(t("Collector API error",e),e)),{onSuccess:()=>{}})};var D=I("exYeM");let tu=()=>(0,D.useContext)(of);var D=I("exYeM"),tc={};tc=function(){/* eslint-disable no-var */function e(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)e[r]=n[r]}return e}/* eslint-enable no-var */return /* eslint-enable no-var *//* eslint-disable no-var */function t(n,r){function a(t,a,i){if("undefined"!=typeof document){"number"==typeof(i=e({},r,i)).expires&&(i.expires=new Date(Date.now()+864e5*i.expires)),i.expires&&(i.expires=i.expires.toUTCString()),t=encodeURIComponent(t).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var o="";for(var s in i)i[s]&&(o+="; "+s,!0!==i[s]&&// Considers RFC 6265 section 5.2:
// ...
// 3.  If the remaining unparsed-attributes contains a %x3B (";")
//     character:
// Consume the characters of the unparsed-attributes up to,
// not including, the first %x3B (";") character.
// ...
(o+="="+i[s].split(";")[0]));return document.cookie=t+"="+n.write(a,t)+o}}return Object.create({set:a,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var t=document.cookie?document.cookie.split("; "):[],r={},a=0;a<t.length;a++){var i=t[a].split("="),o=i.slice(1).join("=");try{var s=decodeURIComponent(i[0]);if(r[s]=n.read(o,s),e===s)break}catch(e){}}return e?r[e]:r}},remove:function(t,n){a(t,"",e({},n,{expires:-1}))},withAttributes:function(n){return t(this.converter,e({},this.attributes,n))},withConverter:function(n){return t(e({},this.converter,n),this.attributes)}},{attributes:{value:Object.freeze(r)},converter:{value:Object.freeze(n)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})}();let td=(e,t,n)=>/*@__PURE__*/r(tc).set(e,t,{expires:n||365,sameSite:"strict"}),tf=e=>/*@__PURE__*/r(tc).get(e),tp=({appId:e,setSession:t})=>{let n={firstVisit:void 0};if(!tf("_cm")||tf("_cm")!==e){td("_cm",e,365),t(n);return}tf("_cm")&&tf("_cm")===e&&(n.firstVisit=!1,t(n))},th="undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var tm={randomUUID:th};let tv=new Uint8Array(16);var tg=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,ty=function(e){return"string"==typeof e&&tg.test(e)};/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */let tb=[];for(let e=0;e<256;++e)tb.push((e+256).toString(16).slice(1));var tw=function(t,n,r){if(tm.randomUUID&&!n&&!t)return tm.randomUUID();t=t||{};let a=t.random||(t.rng||function(){// lazy load so that environments that need to polyfill have a chance to do so
if(!e&&!// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(tv)})();// Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,n){r=r||0;for(let e=0;e<16;++e)n[r+e]=a[e];return n}return function(e,t=0){// Note: Be careful editing this code!  It's been tuned for performance
// and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
return tb[e[t+0]]+tb[e[t+1]]+tb[e[t+2]]+tb[e[t+3]]+"-"+tb[e[t+4]]+tb[e[t+5]]+"-"+tb[e[t+6]]+tb[e[t+7]]+"-"+tb[e[t+8]]+tb[e[t+9]]+"-"+tb[e[t+10]]+tb[e[t+11]]+tb[e[t+12]]+tb[e[t+13]]+tb[e[t+14]]+tb[e[t+15]]}(a)},t_=function(e){if(!ty(e))throw TypeError("Invalid UUID");return parseInt(e.slice(14,15),16)};let tk=e=>ty(e)&&4===t_(e),tx=e=>tk(e),tS=({setVisitor:e})=>{let t={id:void 0};if(!tf("_cm_id")||!tx(tf("_cm_id"))){let n=tw();td("_cm_id",n,365),t.id=n,e(t);return}tf("_cm_id")&&(t.id=tf("_cm_id"),e(t))},tE=({children:e})=>{let{appId:t,booted:n}=tu(),{log:a}=ew(),[i,o]=(0,D.useState)({}),[s,l]=(0,D.useState)({});return(0,D.useEffect)(()=>{if(!n){a("VisitorProvider: not booted");return}a("VisitorProvider: booting");let e=async()=>{await tp({appId:t,setSession:o}),await tS({setVisitor:l})};e(),a("VisitorProvider: booted",i,s)},[t,n]),/*@__PURE__*/r(D).createElement(tC.Provider,{value:{session:i,visitor:s}},e)},tC=/*#__PURE__*/(0,D.createContext)({session:{},visitor:{}}),tT=()=>(0,D.useContext)(tC);var D=I("exYeM"),tO={},tR={DEBUG:!1,LIB_VERSION:"2.47.0"};if("undefined"==typeof window){var tP={hostname:""};E={navigator:{userAgent:""},document:{location:tP,referrer:""},screen:{width:0,height:0},location:tP}}else E=window;/*
 * Saved references to long variable names, so that closure compiler can
 * minimize file size.
 */var tI=Array.prototype,tD=Function.prototype,tN=Object.prototype,tL=tI.slice,tM=tN.toString,tA=tN.hasOwnProperty,tU=E.console,tz=E.navigator,tF=E.document,tj=E.opera,tq=E.screen,tB=tz.userAgent,tV=tD.bind,tW=tI.forEach,t$=tI.indexOf,tH=tI.map,tY=Array.isArray,tQ={},tK={trim:function(e){// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim#Polyfill
return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}},tG={/** @type {function(...*)} */log:function(){if(tR.DEBUG&&!tK.isUndefined(tU)&&tU)try{tU.log.apply(tU,arguments)}catch(e){tK.each(arguments,function(e){tU.log(e)})}},/** @type {function(...*)} */warn:function(){if(tR.DEBUG&&!tK.isUndefined(tU)&&tU){var e=["Mixpanel warning:"].concat(tK.toArray(arguments));try{tU.warn.apply(tU,e)}catch(t){tK.each(e,function(e){tU.warn(e)})}}},/** @type {function(...*)} */error:function(){if(tR.DEBUG&&!tK.isUndefined(tU)&&tU){var e=["Mixpanel error:"].concat(tK.toArray(arguments));try{tU.error.apply(tU,e)}catch(t){tK.each(e,function(e){tU.error(e)})}}},/** @type {function(...*)} */critical:function(){if(!tK.isUndefined(tU)&&tU){var e=["Mixpanel error:"].concat(tK.toArray(arguments));try{tU.error.apply(tU,e)}catch(t){tK.each(e,function(e){tU.error(e)})}}}},tX=function(e,t){return function(){return arguments[0]="["+t+"] "+arguments[0],e.apply(tG,arguments)}},tJ=function(e){return{log:tX(tG.log,e),error:tX(tG.error,e),critical:tX(tG.critical,e)}};// UNDERSCORE
// Embed part of the Underscore Library
tK.bind=function(e,t){var n,r;if(tV&&e.bind===tV)return tV.apply(e,tL.call(arguments,1));if(!tK.isFunction(e))throw TypeError();return n=tL.call(arguments,2),r=function(){if(!(this instanceof r))return e.apply(t,n.concat(tL.call(arguments)));var a={};a.prototype=e.prototype;var i=new a;a.prototype=null;var o=e.apply(i,n.concat(tL.call(arguments)));return Object(o)===o?o:i}},/**
 * @param {*=} obj
 * @param {function(...*)=} iterator
 * @param {Object=} context
 */tK.each=function(e,t,n){if(null!=e){if(tW&&e.forEach===tW)e.forEach(t,n);else if(e.length===+e.length){for(var r=0,a=e.length;r<a;r++)if(r in e&&t.call(n,e[r],r,e)===tQ)return}else for(var i in e)if(tA.call(e,i)&&t.call(n,e[i],i,e)===tQ)return}},tK.extend=function(e){return tK.each(tL.call(arguments,1),function(t){for(var n in t)void 0!==t[n]&&(e[n]=t[n])}),e},tK.isArray=tY||function(e){return"[object Array]"===tM.call(e)},// from a comment on http://dbj.org/dbj/?p=286
// fails on only one very rare and deliberate custom object:
// var bomb = { toString : undefined, valueOf: function(o) { return "function BOMBA!"; }};
tK.isFunction=function(e){try{return/^\s*\bfunction\b/.test(e)}catch(e){return!1}},tK.isArguments=function(e){return!!(e&&tA.call(e,"callee"))},tK.toArray=function(e){return e?e.toArray?e.toArray():tK.isArray(e)||tK.isArguments(e)?tL.call(e):tK.values(e):[]},tK.map=function(e,t,n){if(tH&&e.map===tH)return e.map(t,n);var r=[];return tK.each(e,function(e){r.push(t.call(n,e))}),r},tK.keys=function(e){var t=[];return null===e||tK.each(e,function(e,n){t[t.length]=n}),t},tK.values=function(e){var t=[];return null===e||tK.each(e,function(e){t[t.length]=e}),t},tK.include=function(e,t){var n=!1;return null===e?n:t$&&e.indexOf===t$?-1!=e.indexOf(t):(tK.each(e,function(e){if(n||(n=e===t))return tQ}),n)},tK.includes=function(e,t){return -1!==e.indexOf(t)},// Underscore Addons
tK.inherit=function(e,t){return e.prototype=new t,e.prototype.constructor=e,e.superclass=t.prototype,e},tK.isObject=function(e){return e===Object(e)&&!tK.isArray(e)},tK.isEmptyObject=function(e){if(tK.isObject(e)){for(var t in e)if(tA.call(e,t))return!1;return!0}return!1},tK.isUndefined=function(e){return void 0===e},tK.isString=function(e){return"[object String]"==tM.call(e)},tK.isDate=function(e){return"[object Date]"==tM.call(e)},tK.isNumber=function(e){return"[object Number]"==tM.call(e)},tK.isElement=function(e){return!!(e&&1===e.nodeType)},tK.encodeDates=function(e){return tK.each(e,function(t,n){tK.isDate(t)?e[n]=tK.formatDate(t):tK.isObject(t)&&(e[n]=tK.encodeDates(t));// recurse
}),e},tK.timestamp=function(){return Date.now=Date.now||function(){return+new Date},Date.now()},tK.formatDate=function(e){// YYYY-MM-DDTHH:MM:SS in UTC
function t(e){return e<10?"0"+e:e}return e.getUTCFullYear()+"-"+t(e.getUTCMonth()+1)+"-"+t(e.getUTCDate())+"T"+t(e.getUTCHours())+":"+t(e.getUTCMinutes())+":"+t(e.getUTCSeconds())},tK.strip_empty_properties=function(e){var t={};return tK.each(e,function(e,n){tK.isString(e)&&e.length>0&&(t[n]=e)}),t},/*
 * this function returns a copy of object after truncating it.  If
 * passed an Array or Object it will iterate through obj and
 * truncate all the values recursively.
 */tK.truncate=function(e,t){var n;return"string"==typeof e?n=e.slice(0,t):tK.isArray(e)?(n=[],tK.each(e,function(e){n.push(tK.truncate(e,t))})):tK.isObject(e)?(n={},tK.each(e,function(e,r){n[r]=tK.truncate(e,t)})):n=e,n},tK.JSONEncode=function(e){var t=function(e){var t=/[\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,n={"\b":"\\b","	":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"};// eslint-disable-line no-control-regex
return t.lastIndex=0,t.test(e)?'"'+e.replace(t,function(e){var t=n[e];return"string"==typeof t?t:"\\u"+("0000"+e.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+e+'"'},n=function(e,r){var a="",i=0,o="",s="",l=0,u=a,c=[],d=r[e];// What happens next depends on the value's type.
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
a+="    ",c=[],"[object Array]"===tM.apply(d)){for(i=0,// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.
l=d.length;i<l;i+=1)c[i]=n(i,d)||"null";return(// Join all of the elements together, separated with commas, and wrap them in
// brackets.
s=0===c.length?"[]":a?"[\n"+a+c.join(",\n"+a)+"\n"+u+"]":"["+c.join(",")+"]",a=u,s)}// Iterate through all of the keys in the object.
for(o in d)tA.call(d,o)&&(s=n(o,d))&&c.push(t(o)+(a?": ":":")+s);return(// Join all of the member texts together, separated with commas,
// and wrap them in braces.
s=0===c.length?"{}":a?"{"+c.join(",")+u+"}":"{"+c.join(",")+"}",a=u,s)}};// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.
return n("",{"":e})},/**
 * From https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js
 * Slightly modified to throw a real Error rather than a POJO
 */tK.JSONDecode=(p={'"':'"',"\\":"\\","/":"/",b:"\b",f:"\f",n:"\n",r:"\r",t:"	"},h=function(e){var t=SyntaxError(e);throw t.at=u,t.text=d,t},m=function(e){return e&&e!==c&&h("Expected '"+e+"' instead of '"+c+"'"),// Get the next character. When there are no more characters,
// return the empty string.
c=d.charAt(u),u+=1,c},v=function(){// Parse a number value.
var e,t="";for("-"===c&&(t="-",m("-"));c>="0"&&c<="9";)t+=c,m();if("."===c)for(t+=".";m()&&c>="0"&&c<="9";)t+=c;if("e"===c||"E"===c)for(t+=c,m(),("-"===c||"+"===c)&&(t+=c,m());c>="0"&&c<="9";)t+=c,m();if(isFinite(e=+t))return e;h("Bad number")},g=function(){// Parse a string value.
var e,t,n,r="";// When parsing for string values, we must look for " and \ characters.
if('"'===c)for(;m();){if('"'===c)return m(),r;if("\\"===c){if(m(),"u"===c){for(t=0,n=0;t<4&&isFinite(e=parseInt(m(),16));t+=1)n=16*n+e;r+=String.fromCharCode(n)}else if("string"==typeof p[c])r+=p[c];else break}else r+=c}h("Bad string")},y=function(){// Skip whitespace.
for(;c&&c<=" ";)m()},b=function(){// true, false, or null.
switch(c){case"t":return m("t"),m("r"),m("u"),m("e"),!0;case"f":return m("f"),m("a"),m("l"),m("s"),m("e"),!1;case"n":return m("n"),m("u"),m("l"),m("l"),null}h('Unexpected "'+c+'"')},w=function(){// Parse an array value.
var e=[];if("["===c){if(m("["),y(),"]"===c)return m("]"),e;// empty array
for(;c;){if(e.push(f()),y(),"]"===c)return m("]"),e;m(","),y()}}h("Bad array")},_=function(){// Parse an object value.
var e,t={};if("{"===c){if(m("{"),y(),"}"===c)return m("}"),t;// empty object
for(;c;){if(e=g(),y(),m(":"),Object.hasOwnProperty.call(t,e)&&h('Duplicate key "'+e+'"'),t[e]=f(),y(),"}"===c)return m("}"),t;m(","),y()}}h("Bad object")},f=function(){switch(// Parse a JSON value. It could be an object, an array, a string,
// a number, or a word.
y(),c){case"{":return _();case"[":return w();case'"':return g();case"-":return v();default:return c>="0"&&c<="9"?v():b()}},function(e){var t;return d=e,u=0,c=" ",t=f(),y(),c&&h("Syntax error"),t}),tK.base64Encode=function(e){var t,n,r,a,i,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",s=0,l=0,u="",c=[];if(!e)return e;e=tK.utf8Encode(e);do t=(i=e.charCodeAt(s++)<<16|e.charCodeAt(s++)<<8|e.charCodeAt(s++))>>18&63,n=i>>12&63,r=i>>6&63,a=63&i,// use hexets to index into b64, and append result to encoded string
c[l++]=o.charAt(t)+o.charAt(n)+o.charAt(r)+o.charAt(a);while(s<e.length)switch(u=c.join(""),e.length%3){case 1:u=u.slice(0,-2)+"==";break;case 2:u=u.slice(0,-1)+"="}return u},tK.utf8Encode=function(e){e=(e+"").replace(/\r\n/g,"\n").replace(/\r/g,"\n");var t,n,r,a="",i=0;for(r=0,t=n=0,i=e.length;r<i;r++){var o=e.charCodeAt(r),s=null;o<128?n++:s=o>127&&o<2048?String.fromCharCode(o>>6|192,63&o|128):String.fromCharCode(o>>12|224,o>>6&63|128,63&o|128),null!==s&&(n>t&&(a+=e.substring(t,n)),a+=s,t=n=r+1)}return n>t&&(a+=e.substring(t,e.length)),a},tK.UUID=(k=function(){var e,t=1*new Date;// cross-browser version of Date.now()
if(E.performance&&E.performance.now)e=E.performance.now();else // this while loop figures how many browser ticks go by
// before 1*new Date() returns a new number, ie the amount
// of ticks that go by per millisecond
for(// fall back to busy loop
e=0;t==1*new Date;)e++;return t.toString(16)+Math.floor(e).toString(16)},x=function(){var e,t,n=[],r=0;function a(e,t){var r,a=0;for(r=0;r<t.length;r++)a|=n[r]<<8*r;return e^a}for(e=0;e<tB.length;e++)t=tB.charCodeAt(e),n.unshift(255&t),n.length>=4&&(r=a(r,n),n=[]);return n.length>0&&(r=a(r,n)),r.toString(16)},function(){var e=(tq.height*tq.width).toString(16);return k()+"-"+Math.random().toString(16).replace(".","")+"-"+x()+"-"+e+"-"+k()});// _.isBlockedUA()
// This is to block various web spiders from executing our JS and
// sending false tracking data
var tZ=["ahrefsbot","baiduspider","bingbot","bingpreview","facebookexternal","petalbot","pinterest","screaming frog","yahoo! slurp","yandexbot",// a whole bunch of goog-specific crawlers
// https://developers.google.com/search/docs/advanced/crawling/overview-google-crawlers
"adsbot-google","apis-google","duplexweb-google","feedfetcher-google","google favicon","google web preview","google-read-aloud","googlebot","googleweblight","mediapartners-google","storebot-google"];tK.isBlockedUA=function(e){var t;for(t=0,e=e.toLowerCase();t<tZ.length;t++)if(-1!==e.indexOf(tZ[t]))return!0;return!1},/**
 * @param {Object=} formdata
 * @param {string=} arg_separator
 */tK.HTTPBuildQuery=function(e,t){var n,r,a=[];return tK.isUndefined(t)&&(t="&"),tK.each(e,function(e,t){n=encodeURIComponent(e.toString()),r=encodeURIComponent(t),a[a.length]=r+"="+n}),a.join(t)},tK.getQueryParam=function(e,t){var n="[\\?&]"+// Expects a raw URL
(t=t.replace(/[[]/,"\\[").replace(/[\]]/,"\\]"))+"=([^&#]*)",r=new RegExp(n).exec(e);if(null===r||r&&"string"!=typeof r[1]&&r[1].length)return"";var a=r[1];try{a=decodeURIComponent(a)}catch(e){tG.error("Skipping decoding for malformed query param: "+a)}return a.replace(/\+/g," ")},// _.cookie
// Methods partially borrowed from quirksmode.org/js/cookies.html
tK.cookie={get:function(e){for(var t=e+"=",n=tF.cookie.split(";"),r=0;r<n.length;r++){for(var a=n[r];" "==a.charAt(0);)a=a.substring(1,a.length);if(0===a.indexOf(t))return decodeURIComponent(a.substring(t.length,a.length))}return null},parse:function(e){var t;try{t=tK.JSONDecode(tK.cookie.get(e))||{}}catch(e){// noop
}return t},set_seconds:function(e,t,n,r,a,i,o){var s="",l="",u="";if(o)s="; domain="+o;else if(r){var c=t7(tF.location.hostname);s=c?"; domain=."+c:""}if(n){var d=new Date;d.setTime(d.getTime()+1e3*n),l="; expires="+d.toGMTString()}i&&(a=!0,u="; SameSite=None"),a&&(u+="; secure"),tF.cookie=e+"="+encodeURIComponent(t)+l+"; path=/"+s+u},set:function(e,t,n,r,a,i,o){var s="",l="",u="";if(o)s="; domain="+o;else if(r){var c=t7(tF.location.hostname);s=c?"; domain=."+c:""}if(n){var d=new Date;d.setTime(d.getTime()+864e5*n),l="; expires="+d.toGMTString()}i&&(a=!0,u="; SameSite=None"),a&&(u+="; secure");var f=e+"="+encodeURIComponent(t)+l+"; path=/"+s+u;return tF.cookie=f,f},remove:function(e,t,n){tK.cookie.set(e,"",-1,t,!1,!1,n)}};var t0=null,t1=function(e,t){if(null!==t0&&!t)return t0;var n=!0;try{e=e||window.localStorage;var r="__mplss_"+t4(8);e.setItem(r,"xyz"),"xyz"!==e.getItem(r)&&(n=!1),e.removeItem(r)}catch(e){n=!1}return t0=n,n};// _.localStorage
tK.localStorage={is_supported:function(e){var t=t1(null,e);return t||tG.error("localStorage unsupported; falling back to cookie store"),t},error:function(e){tG.error("localStorage error: "+e)},get:function(e){try{return window.localStorage.getItem(e)}catch(e){tK.localStorage.error(e)}return null},parse:function(e){try{return tK.JSONDecode(tK.localStorage.get(e))||{}}catch(e){// noop
}return null},set:function(e,t){try{window.localStorage.setItem(e,t)}catch(e){tK.localStorage.error(e)}},remove:function(e){try{window.localStorage.removeItem(e)}catch(e){tK.localStorage.error(e)}}},tK.register_event=function(){function e(t){return t&&(t.preventDefault=e.preventDefault,t.stopPropagation=e.stopPropagation),t}return e.preventDefault=function(){this.returnValue=!1},e.stopPropagation=function(){this.cancelBubble=!0},function(t,n,r,a,i){if(!t){tG.error("No valid element provided to register_event");return}if(t.addEventListener&&!a)t.addEventListener(n,r,!!i);else{var o="on"+n,s=t[o];t[o]=function(n){// this basically happens in firefox whenever another script
// overwrites the onload callback and doesn't pass the event
// object to previously defined callbacks.  All the browsers
// that don't define window.event implement addEventListener
// so the dom_loaded handler will still be fired as usual.
if(n=n||e(window.event)){var a,i,o=!0;return tK.isFunction(s)&&(a=s(n)),i=r.call(t,n),(!1===a||!1===i)&&(o=!1),o}}}}}();var t2=RegExp('^(\\w*)\\[(\\w+)([=~\\|\\^\\$\\*]?)=?"?([^\\]"]*)"?\\]$');tK.dom_query=function(){/* document.getElementsBySelector(selector)
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
if(!tF.getElementsByTagName)return[];// Split selector in to tokens
var r=n.split(" "),a=[tF];for(h=0;h<r.length;h++){if((u=r[h].replace(/^\s+/,"").replace(/\s+$/,"")).indexOf("#")>-1){d=// Token is an ID selector
(c=u.split("#"))[0];var i=c[1],o=tF.getElementById(i);if(!o||d&&o.nodeName.toLowerCase()!=d)return[];// Set currentContext to contain just this element
a=[o];continue;// Skip to next token
}if(u.indexOf(".")>-1){d=// Token contains a class selector
(c=u.split("."))[0];var s=c[1];for(d||(d="*"),// Get elements matching tag, filter them for class selector
f=[],p=0,m=0;m<a.length;m++)for(v=0,g="*"==d?e(a[m]):a[m].getElementsByTagName(d);v<g.length;v++)f[p++]=g[v];for(m=0,a=[],y=0;m<f.length;m++)f[m].className&&tK.isString(f[m].className)&&(" "+f[m].className+" ").replace(t," ").indexOf(" "+s+" ")>=0&&(a[y++]=f[m]);continue;// Skip to next token
}// Code to deal with attribute selectors
var l=u.match(t2);if(l){d=l[1];var u,c,d,f,p,h,m,v,g,y,b,w=l[2],_=l[3],k=l[4];for(d||(d="*"),// Grab all of the tagName elements within current context
f=[],p=0,m=0;m<a.length;m++)for(v=0,g="*"==d?e(a[m]):a[m].getElementsByTagName(d);v<g.length;v++)f[p++]=g[v];switch(a=[],y=0,_){case"=":b=function(e){return e.getAttribute(w)==k};break;case"~":b=function(e){return e.getAttribute(w).match(RegExp("\\b"+k+"\\b"))};break;case"|":b=function(e){return e.getAttribute(w).match(RegExp("^"+k+"-?"))};break;case"^":b=function(e){return 0===e.getAttribute(w).indexOf(k)};break;case"$":b=function(e){return e.getAttribute(w).lastIndexOf(k)==e.getAttribute(w).length-k.length};break;case"*":b=function(e){return e.getAttribute(w).indexOf(k)>-1};break;default:// Just test for existence of attribute
b=function(e){return e.getAttribute(w)}}for(m=0,a=[],y=0;m<f.length;m++)b(f[m])&&(a[y++]=f[m]);continue;// Skip to next token
}for(m=0,// If we get here, token is JUST an element (not a class or ID selector)
d=u,f=[],p=0;m<a.length;m++)for(v=0,g=a[m].getElementsByTagName(d);v<g.length;v++)f[p++]=g[v];a=f}return a}return function(e){return tK.isElement(e)?[e]:tK.isObject(e)&&!tK.isUndefined(e.length)?e:n.call(this,e)}}();var t3=["utm_source","utm_medium","utm_campaign","utm_content","utm_term"],t5=["dclid","fbclid","gclid","ko_click_id","li_fat_id","msclkid","ttclid","twclid","wbraid"];tK.info={campaignParams:function(e){var t="",n={};return tK.each(t3,function(r){(t=tK.getQueryParam(tF.URL,r)).length?n[r]=t:void 0!==e&&(n[r]=e)}),n},clickParams:function(){var e="",t={};return tK.each(t5,function(n){(e=tK.getQueryParam(tF.URL,n)).length&&(t[n]=e)}),t},marketingParams:function(){return tK.extend(tK.info.campaignParams(),tK.info.clickParams())},searchEngine:function(e){return 0===e.search("https?://(.*)google.([^/?]*)")?"google":0===e.search("https?://(.*)bing.com")?"bing":0===e.search("https?://(.*)yahoo.com")?"yahoo":0===e.search("https?://(.*)duckduckgo.com")?"duckduckgo":null},searchInfo:function(e){var t=tK.info.searchEngine(e),n="yahoo"!=t?"q":"p",r={};if(null!==t){r.$search_engine=t;var a=tK.getQueryParam(e,n);a.length&&(r.mp_keyword=a)}return r},/**
     * This function detects which browser is running this script.
     * The order of the checks are important since many user agents
     * include key words used in later checks.
     */browser:function(e,t,n){if(t=t||"",n||tK.includes(e," OPR/"))return tK.includes(e,"Mini")?"Opera Mini":"Opera";if(/(BlackBerry|PlayBook|BB10)/i.test(e))return"BlackBerry";if(tK.includes(e,"IEMobile")||tK.includes(e,"WPDesktop"))return"Internet Explorer Mobile";if(tK.includes(e,"SamsungBrowser/"))return"Samsung Internet";if(tK.includes(e,"Edge")||tK.includes(e,"Edg/"))return"Microsoft Edge";if(tK.includes(e,"FBIOS"))return"Facebook Mobile";if(tK.includes(e,"Chrome"))return"Chrome";else if(tK.includes(e,"CriOS"))return"Chrome iOS";else if(tK.includes(e,"UCWEB")||tK.includes(e,"UCBrowser"))return"UC Browser";else if(tK.includes(e,"FxiOS"))return"Firefox iOS";else if(tK.includes(t,"Apple"))return tK.includes(e,"Mobile")?"Mobile Safari":"Safari";else if(tK.includes(e,"Android"))return"Android Mobile";else if(tK.includes(e,"Konqueror"))return"Konqueror";else if(tK.includes(e,"Firefox"))return"Firefox";else if(tK.includes(e,"MSIE")||tK.includes(e,"Trident/"))return"Internet Explorer";else if(tK.includes(e,"Gecko"))return"Mozilla";else return""},/**
     * This function detects which browser version is running this script,
     * parsing major and minor version (e.g., 42.1). User agent strings from:
     * http://www.useragentstring.com/pages/useragentstring.php
     */browserVersion:function(e,t,n){var r={"Internet Explorer Mobile":/rv:(\d+(\.\d+)?)/,"Microsoft Edge":/Edge?\/(\d+(\.\d+)?)/,Chrome:/Chrome\/(\d+(\.\d+)?)/,"Chrome iOS":/CriOS\/(\d+(\.\d+)?)/,"UC Browser":/(UCBrowser|UCWEB)\/(\d+(\.\d+)?)/,Safari:/Version\/(\d+(\.\d+)?)/,"Mobile Safari":/Version\/(\d+(\.\d+)?)/,Opera:/(Opera|OPR)\/(\d+(\.\d+)?)/,Firefox:/Firefox\/(\d+(\.\d+)?)/,"Firefox iOS":/FxiOS\/(\d+(\.\d+)?)/,Konqueror:/Konqueror:(\d+(\.\d+)?)/,BlackBerry:/BlackBerry (\d+(\.\d+)?)/,"Android Mobile":/android\s(\d+(\.\d+)?)/,"Samsung Internet":/SamsungBrowser\/(\d+(\.\d+)?)/,"Internet Explorer":/(rv:|MSIE )(\d+(\.\d+)?)/,Mozilla:/rv:(\d+(\.\d+)?)/}[tK.info.browser(e,t,n)];if(void 0===r)return null;var a=e.match(r);return a?parseFloat(a[a.length-2]):null},os:function(){if(/Windows/i.test(tB))return/Phone/.test(tB)||/WPDesktop/.test(tB)?"Windows Phone":"Windows";if(/(iPhone|iPad|iPod)/.test(tB))return"iOS";if(/Android/.test(tB))return"Android";if(/(BlackBerry|PlayBook|BB10)/i.test(tB))return"BlackBerry";if(/Mac/i.test(tB))return"Mac OS X";if(/Linux/.test(tB))return"Linux";if(/CrOS/.test(tB))return"Chrome OS";else return""},device:function(e){return/Windows Phone/i.test(e)||/WPDesktop/.test(e)?"Windows Phone":/iPad/.test(e)?"iPad":/iPod/.test(e)?"iPod Touch":/iPhone/.test(e)?"iPhone":/(BlackBerry|PlayBook|BB10)/i.test(e)?"BlackBerry":/Android/.test(e)?"Android":""},referringDomain:function(e){var t=e.split("/");return t.length>=3?t[2]:""},properties:function(){return tK.extend(tK.strip_empty_properties({$os:tK.info.os(),$browser:tK.info.browser(tB,tz.vendor,tj),$referrer:tF.referrer,$referring_domain:tK.info.referringDomain(tF.referrer),$device:tK.info.device(tB)}),{$current_url:E.location.href,$browser_version:tK.info.browserVersion(tB,tz.vendor,tj),$screen_height:tq.height,$screen_width:tq.width,mp_lib:"web",$lib_version:tR.LIB_VERSION,$insert_id:t4(),time:tK.timestamp()/1e3// epoch time in seconds
})},people_properties:function(){return tK.extend(tK.strip_empty_properties({$os:tK.info.os(),$browser:tK.info.browser(tB,tz.vendor,tj)}),{$browser_version:tK.info.browserVersion(tB,tz.vendor,tj)})},mpPageViewProperties:function(){return tK.strip_empty_properties({current_page_title:tF.title,current_domain:E.location.hostname,current_url_path:E.location.pathname,current_url_protocol:E.location.protocol,current_url_search:E.location.search})}};var t4=function(e){var t=Math.random().toString(36).substring(2,10)+Math.random().toString(36).substring(2,10);return e?t.substring(0,e):t},t6=/[a-z0-9][a-z0-9-]*\.[a-z]+$/i,t8=/[a-z0-9][a-z0-9-]+\.[a-z.]{2,6}$/i,t7=function(e){var t=t8,n=e.split("."),r=n[n.length-1];(r.length>4||"com"===r||"org"===r)&&(t=t6);var a=e.match(t);return a?a[0]:""},t9=null,ne=null;"undefined"!=typeof JSON&&(t9=JSON.stringify,ne=JSON.parse),t9=t9||tK.JSONEncode,ne=ne||tK.JSONDecode,// EXPORTS (for closure compiler)
tK.toArray=tK.toArray,tK.isObject=tK.isObject,tK.JSONEncode=tK.JSONEncode,tK.JSONDecode=tK.JSONDecode,tK.isBlockedUA=tK.isBlockedUA,tK.isEmptyObject=tK.isEmptyObject,tK.info=tK.info,tK.info.device=tK.info.device,tK.info.browser=tK.info.browser,tK.info.browserVersion=tK.info.browserVersion,tK.info.properties=tK.info.properties;/**
 * DomTracker Object
 * @constructor
 */var nt=function(){};// interface
nt.prototype.create_properties=function(){},nt.prototype.event_handler=function(){},nt.prototype.after_track_handler=function(){},nt.prototype.init=function(e){return this.mp=e,this},/**
 * @param {Object|string} query
 * @param {string} event_name
 * @param {Object=} properties
 * @param {function=} user_callback
 */nt.prototype.track=function(e,t,n,r){var a=this,i=tK.dom_query(e);if(0===i.length){tG.error("The DOM query ("+e+") returned 0 elements");return}return tK.each(i,function(e){tK.register_event(e,this.override_event,function(e){var i={},o=a.create_properties(n,this),s=a.mp.get_config("track_links_timeout");a.event_handler(e,this,i),// in case the mixpanel servers don't get back to us in time
window.setTimeout(a.track_callback(r,o,i,!0),s),// fire the tracking event
a.mp.track(t,o,a.track_callback(r,o,i))})},this),!0},/**
 * @param {function} user_callback
 * @param {Object} props
 * @param {boolean=} timeout_occured
 */nt.prototype.track_callback=function(e,t,n,r){r=r||!1;var a=this;return function(){// options is referenced from both callbacks, so we can have
// a 'lock' of sorts to ensure only one fires
!n.callback_fired&&(n.callback_fired=!0,e&&!1===e(r,t)||a.after_track_handler(t,n,r))}},nt.prototype.create_properties=function(e,t){return"function"==typeof e?e(t):tK.extend({},e)};/**
 * LinkTracker Object
 * @constructor
 * @extends DomTracker
 */var nn=function(){this.override_event="click"};tK.inherit(nn,nt),nn.prototype.create_properties=function(e,t){var n=nn.superclass.create_properties.apply(this,arguments);return t.href&&(n.url=t.href),n},nn.prototype.event_handler=function(e,t,n){n.new_tab=2===e.which||e.metaKey||e.ctrlKey||"_blank"===t.target,n.href=t.href,n.new_tab||e.preventDefault()},nn.prototype.after_track_handler=function(e,t){t.new_tab||setTimeout(function(){window.location=t.href},0)};/**
 * FormTracker Object
 * @constructor
 * @extends DomTracker
 */var nr=function(){this.override_event="submit"};tK.inherit(nr,nt),nr.prototype.event_handler=function(e,t,n){n.element=t,e.preventDefault()},nr.prototype.after_track_handler=function(e,t){setTimeout(function(){t.element.submit()},0)};// eslint-disable-line camelcase
var na=tJ("lock"),ni=function(e,t){t=t||{},this.storageKey=e,this.storage=t.storage||window.localStorage,this.pollIntervalMS=t.pollIntervalMS||100,this.timeoutMS=t.timeoutMS||2e3};// pass in a specific pid to test contention scenarios; otherwise
// it is chosen randomly for each acquisition attempt
ni.prototype.withLock=function(e,t,n){n||"function"==typeof t||(n=t,t=null);var r=n||new Date().getTime()+"|"+Math.random(),a=new Date().getTime(),i=this.storageKey,o=this.pollIntervalMS,s=this.timeoutMS,l=this.storage,u=i+":X",c=i+":Y",d=i+":Z",f=function(e){t&&t(e)},p=function(e){if(new Date().getTime()-a>s){na.error("Timeout waiting for mutex on "+i+"; clearing lock. ["+r+"]"),l.removeItem(d),l.removeItem(c),v();return}setTimeout(function(){try{e()}catch(e){f(e)}},o*(Math.random()+.1))},h=function(e,t){e()?t():p(function(){h(e,t)})},m=function(){var e=l.getItem(c);if(e&&e!==r)return!1;if(l.setItem(c,r),l.getItem(c)===r)return!0;if(!t1(l,!0))throw Error("localStorage support dropped while acquiring lock");return!1},v=function(){l.setItem(u,r),h(m,function(){if(l.getItem(u)===r){g();return}p(function(){if(l.getItem(c)!==r){v();return}h(function(){return!l.getItem(d)},g)})})},g=function(){l.setItem(d,"1");try{e()}finally{l.removeItem(d),l.getItem(c)===r&&l.removeItem(c),l.getItem(u)===r&&l.removeItem(u)}};try{if(t1(l,!0))v();else throw Error("localStorage support check failed")}catch(e){f(e)}};// eslint-disable-line camelcase
var no=tJ("batch"),ns=function(e,t){t=t||{},this.storageKey=e,this.storage=t.storage||window.localStorage,this.reportError=t.errorReporter||tK.bind(no.error,no),this.lock=new ni(e,{storage:this.storage}),this.pid=t.pid||null,this.memQueue=[]};/**
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
 */ns.prototype.enqueue=function(e,t,n){var r={id:t4(),flushAfter:new Date().getTime()+2*t,payload:e};this.lock.withLock(tK.bind(function(){var t;try{var a=this.readFromStorage();a.push(r),(t=this.saveToStorage(a))&&this.memQueue.push(r)}catch(n){this.reportError("Error enqueueing item",e),t=!1}n&&n(t)},this),tK.bind(function(e){this.reportError("Error acquiring storage lock",e),n&&n(!1)},this),this.pid)},/**
 * Read out the given number of queue entries. If this.memQueue
 * has fewer than batchSize items, then look for "orphaned" items
 * in the persisted queue (items where the 'flushAfter' time has
 * already passed).
 */ns.prototype.fillBatch=function(e){var t=this.memQueue.slice(0,e);if(t.length<e){// don't need lock just to read events; localStorage is thread-safe
// and the worst that could happen is a duplicate send of some
// orphaned events, which will be deduplicated on the server side
var n=this.readFromStorage();if(n.length){// item IDs already in batch; don't duplicate out of storage
var r={};// poor man's Set
tK.each(t,function(e){r[e.id]=!0});for(var a=0;a<n.length;a++){var i=n[a];if(new Date().getTime()>i.flushAfter&&!r[i.id]&&(i.orphaned=!0,t.push(i),t.length>=e))break}}}return t};/**
 * Remove items with matching 'id' from array (immutably)
 * also remove any item without a valid id (e.g., malformed
 * storage entries).
 */var nl=function(e,t){var n=[];return tK.each(e,function(e){e.id&&!t[e.id]&&n.push(e)}),n};/**
 * Remove items with matching IDs from both in-memory queue
 * and persisted queue
 */ns.prototype.removeItemsByID=function(e,t){var n={};// poor man's Set
tK.each(e,function(e){n[e]=!0}),this.memQueue=nl(this.memQueue,n);var r=tK.bind(function(){var t;try{var r=this.readFromStorage();// an extra check: did storage report success but somehow
// the items are still there?
if(r=nl(r,n),t=this.saveToStorage(r)){r=this.readFromStorage();for(var a=0;a<r.length;a++){var i=r[a];if(i.id&&n[i.id])return this.reportError("Item not removed from storage"),!1}}}catch(n){this.reportError("Error removing items",e),t=!1}return t},this);this.lock.withLock(function(){var e=r();t&&t(e)},tK.bind(function(e){var n=!1;if(this.reportError("Error acquiring storage lock",e),!t1(this.storage,!0)&&!// Looks like localStorage writes have stopped working sometime after
// initialization (probably full), and so nobody can acquire locks
// anymore. Consider it temporarily safe to remove items without the
// lock, since nobody's writing successfully anyway.
(n=r()))// entirely.
try{this.storage.removeItem(this.storageKey)}catch(e){this.reportError("Error clearing queue",e)}t&&t(n)},this),this.pid)};// internal helper for RequestQueue.updatePayloads
var nu=function(e,t){var n=[];return tK.each(e,function(e){var r=e.id;if(r in t){var a=t[r];null!==a&&(e.payload=a,n.push(e))}else n.push(e)}),n};/**
 * Update payloads of given items in both in-memory queue and
 * persisted queue. Items set to null are removed from queues.
 */ns.prototype.updatePayloads=function(e,t){this.memQueue=nu(this.memQueue,e),this.lock.withLock(tK.bind(function(){var n;try{var r=this.readFromStorage();r=nu(r,e),n=this.saveToStorage(r)}catch(t){this.reportError("Error updating items",e),n=!1}t&&t(n)},this),tK.bind(function(e){this.reportError("Error acquiring storage lock",e),t&&t(!1)},this),this.pid)},/**
 * Read and parse items array from localStorage entry, handling
 * malformed/missing data if necessary.
 */ns.prototype.readFromStorage=function(){var e;try{(e=this.storage.getItem(this.storageKey))&&(e=ne(e),tK.isArray(e)||(this.reportError("Invalid storage entry:",e),e=null))}catch(t){this.reportError("Error retrieving queue",t),e=null}return e||[]},/**
 * Serialize the given items array to localStorage.
 */ns.prototype.saveToStorage=function(e){try{return this.storage.setItem(this.storageKey,t9(e)),!0}catch(e){return this.reportError("Error saving queue",e),!1}},/**
 * Clear out queues (memory and localStorage).
 */ns.prototype.clear=function(){this.memQueue=[],this.storage.removeItem(this.storageKey)};var nc=tJ("batch"),nd=function(e,t){this.errorReporter=t.errorReporter,this.queue=new ns(e,{errorReporter:tK.bind(this.reportError,this),storage:t.storage}),this.libConfig=t.libConfig,this.sendRequest=t.sendRequestFunc,this.beforeSendHook=t.beforeSendHook,this.stopAllBatching=t.stopAllBatchingFunc,// seed variable batch size + flush interval with configured values
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
 */function nf(e,t){nx(!0,e,t)}/**
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
 */function np(e,t){nx(!1,e,t)}/**
 * Check whether the user has opted in to data tracking and cookies/localstorage for the given token
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {boolean} whether the user has opted in to the given opt type
 */function nh(e,t){return"1"===nk(e,t)}/**
 * Check whether the user has opted out of data tracking and cookies/localstorage for the given token
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistenceType] Persistence mechanism used - cookie or localStorage
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @param {boolean} [options.ignoreDnt] - flag to ignore browser DNT settings and always return false
 * @returns {boolean} whether the user has opted out of the given opt type
 */function nm(e,t){if(/**
 * Check whether the user has set the DNT/doNotTrack setting to true in their browser
 * @param {Object} [options]
 * @param {string} [options.window] - alternate window object to check; used to force various DNT settings in browser tests
 * @param {boolean} [options.ignoreDnt] - flag to ignore browser DNT settings and always return false
 * @returns {boolean} whether the DNT setting is true
 */function(e){if(e&&e.ignoreDnt)return!1;var t=e&&e.window||E,n=t.navigator||{},r=!1;return tK.each([n.doNotTrack,n.msDoNotTrack,t.doNotTrack],function(e){tK.includes([!0,1,"1","yes"],e)&&(r=!0)}),r}(t))return tG.warn('This browser has "Do Not Track" enabled. This will prevent the Mixpanel SDK from sending any data. To ignore the "Do Not Track" browser setting, initialize the Mixpanel instance with the config "ignore_dnt: true"'),!0;var n="0"===nk(e,t);return n&&tG.warn("You are opted out of Mixpanel tracking. This will prevent the Mixpanel SDK from sending any data."),n}/**
 * Wrap a MixpanelLib method with a check for whether the user is opted out of data tracking and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */function nv(e){return nS(e,function(e){return this.get_config(e)})}/**
 * Wrap a MixpanelPeople method with a check for whether the user is opted out of data tracking and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */function ng(e){return nS(e,function(e){return this._get_config(e)})}/**
 * Wrap a MixpanelGroup method with a check for whether the user is opted out of data tracking and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */function ny(e){return nS(e,function(e){return this._get_config(e)})}/**
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
 */function nb(e,t){nw(t=t||{}).remove(n_(e,t),!!t.crossSubdomainCookie,t.cookieDomain)}/** Private **//**
 * Get storage util
 * @param {Object} [options]
 * @param {string} [options.persistenceType]
 * @returns {object} either _.cookie or _.localstorage
 */function nw(e){return"localStorage"===(e=e||{}).persistenceType?tK.localStorage:tK.cookie}/**
 * Get the name of the cookie that is used for the given opt type (tracking, cookie, etc.)
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {string} the name of the cookie for the given opt type
 */function n_(e,t){return((t=t||{}).persistencePrefix||"__mp_opt_in_out_")+e}/**
 * Get the value of the cookie that is used for the given opt type (tracking, cookie, etc.)
 * @param {string} token - Mixpanel project tracking token
 * @param {Object} [options]
 * @param {string} [options.persistencePrefix=__mp_opt_in_out] - custom prefix to be used in the cookie/localstorage name
 * @returns {string} the value of the cookie for the given opt type
 */function nk(e,t){return nw(t).get(n_(e,t))}/**
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
 */function nx(e,t,n){if(!tK.isString(t)||!t.length){tG.error("gdpr."+(e?"optIn":"optOut")+" called with an invalid token");return}nw(n=n||{}).set(n_(t,n),e?1:0,tK.isNumber(n.cookieExpiration)?n.cookieExpiration:null,!!n.crossSubdomainCookie,!!n.secureCookie,!!n.crossSiteCookie,n.cookieDomain),n.track&&e&&n.track(n.trackEventName||"$opt_in",n.trackProperties,{send_immediately:!0})}/**
 * Wrap a method with a check for whether the user is opted out of data tracking and cookies/localstorage for the given token
 * If the user has opted out, return early instead of executing the method.
 * If a callback argument was provided, execute it passing the 0 error code.
 * @param {function} method - wrapped method to be executed if the user has not opted out
 * @param {function} getConfigValue - getter function for the Mixpanel API token and other options to be used with opt-out check
 * @returns {*} the result of executing method OR undefined if the user has opted out
 */function nS(e,t){return function(){var n=!1;try{var r=t.call(this,"token"),a=t.call(this,"ignore_dnt"),i=t.call(this,"opt_out_tracking_persistence_type"),o=t.call(this,"opt_out_tracking_cookie_prefix"),s=t.call(this,"window");r&&(n=nm(r,{ignoreDnt:a,persistenceType:i,persistencePrefix:o,window:s}))}catch(e){tG.error("Unexpected error when checking tracking opt-out status: "+e)}if(!n)return e.apply(this,arguments);var l=arguments[arguments.length-1];"function"==typeof l&&l(0)}}/**
 * Add one item to queue.
 */nd.prototype.enqueue=function(e,t){this.queue.enqueue(e,this.flushInterval,t)},/**
 * Start flushing batches at the configured time interval. Must call
 * this method upon SDK init in order to send anything over the network.
 */nd.prototype.start=function(){this.stopped=!1,this.consecutiveRemovalFailures=0,this.flush()},/**
 * Stop flushing batches. Can be restarted by calling start().
 */nd.prototype.stop=function(){this.stopped=!0,this.timeoutID&&(clearTimeout(this.timeoutID),this.timeoutID=null)},/**
 * Clear out queue.
 */nd.prototype.clear=function(){this.queue.clear()},/**
 * Restore batch size configuration to whatever is set in the main SDK.
 */nd.prototype.resetBatchSize=function(){this.batchSize=this.libConfig.batch_size},/**
 * Restore flush interval time configuration to whatever is set in the main SDK.
 */nd.prototype.resetFlush=function(){this.scheduleFlush(this.libConfig.batch_flush_interval_ms)},/**
 * Schedule the next flush in the given number of milliseconds.
 */nd.prototype.scheduleFlush=function(e){this.flushInterval=e,this.stopped||(this.timeoutID=setTimeout(tK.bind(this.flush,this),this.flushInterval))},/**
 * Flush one batch to network. Depending on success/failure modes, it will either
 * remove the batch from the queue or leave it in for retry, and schedule the next
 * flush. In cases of most network or API failures, it will back off exponentially
 * when retrying.
 * @param {Object} [options]
 * @param {boolean} [options.sendBeacon] - whether to send batch with
 * navigator.sendBeacon (only useful for sending batches before page unloads, as
 * sendBeacon offers no callbacks or status indications)
 */nd.prototype.flush=function(e){try{if(this.requestInProgress){nc.log("Flush: Request already in progress");return}e=e||{};var t=this.libConfig.batch_request_timeout_ms,n=new Date().getTime(),r=this.batchSize,a=this.queue.fillBatch(r),i=[],o={};if(tK.each(a,function(e){var t=e.payload;if(this.beforeSendHook&&!e.orphaned&&(t=this.beforeSendHook(t)),t){t.event&&t.properties&&(t.properties=tK.extend({},t.properties,{mp_sent_by_lib_version:tR.LIB_VERSION}));var n=!0,r=e.id;r?(this.itemIdsSentSuccessfully[r]||0)>5&&(this.reportError("[dupe] item ID sent too many times, not sending",{item:e,batchSize:a.length,timesSent:this.itemIdsSentSuccessfully[r]}),n=!1):this.reportError("[dupe] found item with no ID",{item:e}),n&&i.push(t)}o[e.id]=t},this),i.length<1){this.resetFlush();return;// nothing to do
}this.requestInProgress=!0;var s=tK.bind(function(i){this.requestInProgress=!1;try{// handle API response in a try-catch to make sure we can reset the
// flush operation if something goes wrong
var s=!1;if(e.unloading)this.queue.updatePayloads(o);else if(tK.isObject(i)&&"timeout"===i.error&&new Date().getTime()-n>=t)this.reportError("Network timeout; retrying"),this.flush();else if(tK.isObject(i)&&i.xhr_req&&(i.xhr_req.status>=500||429===i.xhr_req.status||"timeout"===i.error)){// network or API error, or 429 Too Many Requests, retry
var l=2*this.flushInterval,u=i.xhr_req.responseHeaders;if(u){var c=u["Retry-After"];c&&(l=1e3*parseInt(c,10)||l)}l=Math.min(6e5,l),this.reportError("Error; retry in "+l+" ms"),this.scheduleFlush(l)}else if(tK.isObject(i)&&i.xhr_req&&413===i.xhr_req.status){// 413 Payload Too Large
if(a.length>1){var d=Math.max(1,Math.floor(r/2));this.batchSize=Math.min(this.batchSize,d,a.length-1),this.reportError("413 response; reducing batch size to "+this.batchSize),this.resetFlush()}else this.reportError("Single-event request too large; dropping",a),this.resetBatchSize(),s=!0}else // (even if it was e.g. a 400, in which case retrying won't help)
s=!0;s&&(this.queue.removeItemsByID(tK.map(a,function(e){return e.id}),tK.bind(function(e){e?(this.consecutiveRemovalFailures=0,this.flush()):(this.reportError("Failed to remove items from queue"),++this.consecutiveRemovalFailures>5?(this.reportError("Too many queue failures; disabling batching system."),this.stopAllBatching()):this.resetFlush())},this)),// client-side dedupe
tK.each(a,tK.bind(function(e){var t=e.id;t?(this.itemIdsSentSuccessfully[t]=this.itemIdsSentSuccessfully[t]||0,this.itemIdsSentSuccessfully[t]++,this.itemIdsSentSuccessfully[t]>5&&this.reportError("[dupe] item ID sent too many times",{item:e,batchSize:a.length,timesSent:this.itemIdsSentSuccessfully[t]})):this.reportError("[dupe] found item with no ID while removing",{item:e})},this)))}catch(e){this.reportError("Error handling API response",e),this.resetFlush()}},this),l={method:"POST",verbose:!0,ignore_json_errors:!0,timeout_ms:t// eslint-disable-line camelcase
};e.unloading&&(l.transport="sendBeacon"),nc.log("MIXPANEL REQUEST:",i),this.sendRequest(i,l,s)}catch(e){this.reportError("Error flushing request queue",e),this.resetFlush()}},/**
 * Log error to global logger and optional user-defined logger.
 */nd.prototype.reportError=function(e,t){if(nc.error.apply(nc.error,arguments),this.errorReporter)try{t instanceof Error||(t=Error(e)),this.errorReporter(e,t)}catch(e){nc.error(e)}};/** @const */var nE="$set",nC="$set_once",nT="$unset",nO="$add",nR="$append",nP="$union",nI="$remove",nD={set_action:function(e,t){var n={},r={};return tK.isObject(e)?tK.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=e)},this):r[e]=t,n[nE]=r,n},unset_action:function(e){var t={},n=[];return tK.isArray(e)||(e=[e]),tK.each(e,function(e){this._is_reserved_property(e)||n.push(e)},this),t[nT]=n,t},set_once_action:function(e,t){var n={},r={};return tK.isObject(e)?tK.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=e)},this):r[e]=t,n[nC]=r,n},union_action:function(e,t){var n={},r={};return tK.isObject(e)?tK.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=tK.isArray(e)?e:[e])},this):r[e]=tK.isArray(t)?t:[t],n[nP]=r,n},append_action:function(e,t){var n={},r={};return tK.isObject(e)?tK.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=e)},this):r[e]=t,n[nR]=r,n},remove_action:function(e,t){var n={},r={};return tK.isObject(e)?tK.each(e,function(e,t){this._is_reserved_property(t)||(r[t]=e)},this):r[e]=t,n[nI]=r,n},delete_action:function(){var e={};return e.$delete="",e}},nN=function(){};tK.extend(nN.prototype,nD),nN.prototype._init=function(e,t,n){this._mixpanel=e,this._group_key=t,this._group_id=n},/**
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
 */nN.prototype.set=ny(function(e,t,n){var r=this.set_action(e,t);return tK.isObject(e)&&(n=t),this._send_request(r,n)}),/**
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
 */nN.prototype.set_once=ny(function(e,t,n){var r=this.set_once_action(e,t);return tK.isObject(e)&&(n=t),this._send_request(r,n)}),/**
 * Unset properties on a group permanently.
 *
 * ### Usage:
 *
 *     mixpanel.get_group('company', 'mixpanel').unset('Founded');
 *
 * @param {String} prop The name of the property.
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */nN.prototype.unset=ny(function(e,t){var n=this.unset_action(e);return this._send_request(n,t)}),/**
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
 */nN.prototype.union=ny(function(e,t,n){tK.isObject(e)&&(n=t);var r=this.union_action(e,t);return this._send_request(r,n)}),/**
 * Permanently delete a group.
 *
 * ### Usage:
 *
 *     mixpanel.get_group('company', 'mixpanel').delete();
 *
 * @param {Function} [callback] If provided, the callback will be called after the tracking event
 */nN.prototype.delete=ny(function(e){// bracket notation above prevents a minification error related to reserved words
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
 */nN.prototype.remove=ny(function(e,t,n){var r=this.remove_action(e,t);return this._send_request(r,n)}),nN.prototype._send_request=function(e,t){e.$group_key=this._group_key,e.$group_id=this._group_id,e.$token=this._get_config("token");var n=tK.encodeDates(e);return this._mixpanel._track_or_batch({type:"groups",data:n,endpoint:this._get_config("api_host")+"/groups/",batcher:this._mixpanel.request_batchers.groups},t)},nN.prototype._is_reserved_property=function(e){return"$group_key"===e||"$group_id"===e},nN.prototype._get_config=function(e){return this._mixpanel.get_config(e)},nN.prototype.toString=function(){return this._mixpanel.toString()+".group."+this._group_key+"."+this._group_id},// MixpanelGroup Exports
nN.prototype.remove=nN.prototype.remove,nN.prototype.set=nN.prototype.set,nN.prototype.set_once=nN.prototype.set_once,nN.prototype.union=nN.prototype.union,nN.prototype.unset=nN.prototype.unset,nN.prototype.toString=nN.prototype.toString;/**
 * Mixpanel People Object
 * @constructor
 */var nL=function(){};tK.extend(nL.prototype,nD),nL.prototype._init=function(e){this._mixpanel=e},/*
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
*/nL.prototype.set=ng(function(e,t,n){var r=this.set_action(e,t);return tK.isObject(e)&&(n=t),this._get_config("save_referrer")&&this._mixpanel.persistence.update_referrer_info(document.referrer),// update $set object with default people properties
r[nE]=tK.extend({},tK.info.people_properties(),this._mixpanel.persistence.get_referrer_info(),r[nE]),this._send_request(r,n)}),/*
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
*/nL.prototype.set_once=ng(function(e,t,n){var r=this.set_once_action(e,t);return tK.isObject(e)&&(n=t),this._send_request(r,n)}),/*
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
*/nL.prototype.unset=ng(function(e,t){var n=this.unset_action(e);return this._send_request(n,t)}),/*
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
*/nL.prototype.increment=ng(function(e,t,n){var r={},a={};return tK.isObject(e)?(tK.each(e,function(e,t){if(!this._is_reserved_property(t)){if(isNaN(parseFloat(e))){tG.error("Invalid increment value passed to mixpanel.people.increment - must be a number");return}a[t]=e}},this),n=t):(tK.isUndefined(t)&&(t=1),a[e]=t),r[nO]=a,this._send_request(r,n)}),/*
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
*/nL.prototype.append=ng(function(e,t,n){tK.isObject(e)&&(n=t);var r=this.append_action(e,t);return this._send_request(r,n)}),/*
* Remove a value from a list-valued people analytics property.
*
* ### Usage:
*
*     mixpanel.people.remove('School', 'UCB');
*
* @param {Object|String} list_name If a string, this is the name of the property. If an object, this is an associative array of names and values.
* @param {*} [value] value Item to remove from the list
* @param {Function} [callback] If provided, the callback will be called after tracking the event.
*/nL.prototype.remove=ng(function(e,t,n){tK.isObject(e)&&(n=t);var r=this.remove_action(e,t);return this._send_request(r,n)}),/*
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
*/nL.prototype.union=ng(function(e,t,n){tK.isObject(e)&&(n=t);var r=this.union_action(e,t);return this._send_request(r,n)}),/*
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
 */nL.prototype.track_charge=ng(function(e,t,n){if(!tK.isNumber(e)&&isNaN(e=parseFloat(e))){tG.error("Invalid value passed to mixpanel.people.track_charge - must be a number");return}return this.append("$transactions",tK.extend({$amount:e},t),n)}),/*
 * Permanently clear all revenue report transactions from the
 * current user's people analytics profile.
 *
 * ### Usage:
 *
 *     mixpanel.people.clear_charges();
 *
 * @param {Function} [callback] If provided, the callback will be called after tracking the event.
 * @deprecated
 */nL.prototype.clear_charges=function(e){return this.set("$transactions",[],e)},/*
* Permanently deletes the current people analytics profile from
* Mixpanel (using the current distinct_id).
*
* ### Usage:
*
*     // remove the all data you have stored about the current user
*     mixpanel.people.delete_user();
*
*/nL.prototype.delete_user=function(){if(!this._identify_called()){tG.error("mixpanel.people.delete_user() requires you to call identify() first");return}var e={$delete:this._mixpanel.get_distinct_id()};return this._send_request(e)},nL.prototype.toString=function(){return this._mixpanel.toString()+".people"},nL.prototype._send_request=function(e,t){e.$token=this._get_config("token"),e.$distinct_id=this._mixpanel.get_distinct_id();var n=this._mixpanel.get_property("$device_id"),r=this._mixpanel.get_property("$user_id"),a=this._mixpanel.get_property("$had_persisted_distinct_id");n&&(e.$device_id=n),r&&(e.$user_id=r),a&&(e.$had_persisted_distinct_id=a);var i=tK.encodeDates(e);return this._identify_called()?this._mixpanel._track_or_batch({type:"people",data:i,endpoint:this._get_config("api_host")+"/engage/",batcher:this._mixpanel.request_batchers.people},t):(this._enqueue(e),tK.isUndefined(t)||t(this._get_config("verbose")?{status:-1,error:null}:-1),tK.truncate(i,255))},nL.prototype._get_config=function(e){return this._mixpanel.get_config(e)},nL.prototype._identify_called=function(){return!0===this._mixpanel._flags.identify_called},// Queue up engage operations if identify hasn't been called yet.
nL.prototype._enqueue=function(e){nE in e?this._mixpanel.persistence._add_to_people_queue(nE,e):nC in e?this._mixpanel.persistence._add_to_people_queue(nC,e):nT in e?this._mixpanel.persistence._add_to_people_queue(nT,e):nO in e?this._mixpanel.persistence._add_to_people_queue(nO,e):nR in e?this._mixpanel.persistence._add_to_people_queue(nR,e):nI in e?this._mixpanel.persistence._add_to_people_queue(nI,e):nP in e?this._mixpanel.persistence._add_to_people_queue(nP,e):tG.error("Invalid call to _enqueue():",e)},nL.prototype._flush_one_queue=function(e,t,n,r){var a=this,i=tK.extend({},this._mixpanel.persistence._get_queue(e)),o=i;!tK.isUndefined(i)&&tK.isObject(i)&&!tK.isEmptyObject(i)&&(a._mixpanel.persistence._pop_from_people_queue(e,i),r&&(o=r(i)),t.call(a,o,function(t,r){0===t&&a._mixpanel.persistence._add_to_people_queue(e,i),tK.isUndefined(n)||n(t,r)}))},// Flush queued engage operations - order does not matter,
// and there are network level race conditions anyway
nL.prototype._flush=function(e,t,n,r,a,i,o){var s=this,l=this._mixpanel.persistence._get_queue(nR),u=this._mixpanel.persistence._get_queue(nI);// we have to fire off each $append individually since there is
// no concat method server side
if(this._flush_one_queue(nE,this.set,e),this._flush_one_queue(nC,this.set_once,r),this._flush_one_queue(nT,this.unset,i,function(e){return tK.keys(e)}),this._flush_one_queue(nO,this.increment,t),this._flush_one_queue(nP,this.union,a),!tK.isUndefined(l)&&tK.isArray(l)&&l.length){for(var c,d=function(e,t){0===e&&s._mixpanel.persistence._add_to_people_queue(nR,c),tK.isUndefined(n)||n(e,t)},f=l.length-1;f>=0;f--)c=l.pop(),tK.isEmptyObject(c)||s.append(c,d);// Save the shortened append queue
s._mixpanel.persistence.save()}// same for $remove
if(!tK.isUndefined(u)&&tK.isArray(u)&&u.length){for(var p,h=function(e,t){0===e&&s._mixpanel.persistence._add_to_people_queue(nI,p),tK.isUndefined(o)||o(e,t)},m=u.length-1;m>=0;m--)p=u.pop(),tK.isEmptyObject(p)||s.remove(p,h);s._mixpanel.persistence.save()}},nL.prototype._is_reserved_property=function(e){return"$distinct_id"===e||"$token"===e||"$device_id"===e||"$user_id"===e||"$had_persisted_distinct_id"===e},// MixpanelPeople Exports
nL.prototype.set=nL.prototype.set,nL.prototype.set_once=nL.prototype.set_once,nL.prototype.unset=nL.prototype.unset,nL.prototype.increment=nL.prototype.increment,nL.prototype.append=nL.prototype.append,nL.prototype.remove=nL.prototype.remove,nL.prototype.union=nL.prototype.union,nL.prototype.track_charge=nL.prototype.track_charge,nL.prototype.clear_charges=nL.prototype.clear_charges,nL.prototype.delete_user=nL.prototype.delete_user,nL.prototype.toString=nL.prototype.toString;/*
 * Constants
 *//** @const */var nM="__mps",nA="__mpso",nU="__mpus",nz="__mpa",nF="__mpap",nj="__mpr",nq="__mpu",nB="$people_distinct_id",nV="__alias",nW="__timers",n$=[nM,nA,nU,nz,nF,nj,nq,nB,nV,nW],nH=function(e){this.props={},this.campaign_params_saved=!1,e.persistence_name?this.name="mp_"+e.persistence_name:this.name="mp_"+e.token+"_mixpanel";var t=e.persistence;"cookie"!==t&&"localStorage"!==t&&(tG.critical("Unknown persistence type "+t+"; falling back to cookie"),t=e.persistence="cookie"),"localStorage"===t&&tK.localStorage.is_supported()?this.storage=tK.localStorage:this.storage=tK.cookie,this.load(),this.update_config(e),this.upgrade(e),this.save()};nH.prototype.properties=function(){var e={};return(// Filter out reserved properties
tK.each(this.props,function(t,n){tK.include(n$,n)||(e[n]=t)}),e)},nH.prototype.load=function(){if(!this.disabled){var e=this.storage.parse(this.name);e&&(this.props=tK.extend({},e))}},nH.prototype.upgrade=function(e){var t,n,r=e.upgrade;r&&(t="mp_super_properties","string"==typeof r&&(t=r),n=this.storage.parse(t),// remove the cookie
this.storage.remove(t),this.storage.remove(t,!0),n&&(this.props=tK.extend(this.props,n.all,n.events))),!e.cookie_name&&"mixpanel"!==e.name&&(// special case to handle people with cookies of the form
// mp_TOKEN_INSTANCENAME from the first release of this library
t="mp_"+e.token+"_"+e.name,(n=this.storage.parse(t))&&(this.storage.remove(t),this.storage.remove(t,!0),// Save the prop values that were in the cookie from before -
// this should only happen once as we delete the old one.
this.register_once(n))),this.storage===tK.localStorage&&(n=tK.cookie.parse(this.name),tK.cookie.remove(this.name),tK.cookie.remove(this.name,!0),n&&this.register_once(n))},nH.prototype.save=function(){this.disabled||this.storage.set(this.name,tK.JSONEncode(this.props),this.expire_days,this.cross_subdomain,this.secure,this.cross_site,this.cookie_domain)},nH.prototype.remove=function(){// remove both domain and subdomain cookies
this.storage.remove(this.name,!1,this.cookie_domain),this.storage.remove(this.name,!0,this.cookie_domain)},// removes the storage entry and deletes all loaded data
// forced name for tests
nH.prototype.clear=function(){this.remove(),this.props={}},/**
* @param {Object} props
* @param {*=} default_value
* @param {number=} days
*/nH.prototype.register_once=function(e,t,n){return!!tK.isObject(e)&&(void 0===t&&(t="None"),this.expire_days=void 0===n?this.default_expiry:n,tK.each(e,function(e,n){this.props.hasOwnProperty(n)&&this.props[n]!==t||(this.props[n]=e)},this),this.save(),!0)},/**
* @param {Object} props
* @param {number=} days
*/nH.prototype.register=function(e,t){return!!tK.isObject(e)&&(this.expire_days=void 0===t?this.default_expiry:t,tK.extend(this.props,e),this.save(),!0)},nH.prototype.unregister=function(e){e in this.props&&(delete this.props[e],this.save())},nH.prototype.update_search_keyword=function(e){this.register(tK.info.searchInfo(e))},// EXPORTED METHOD, we test this directly.
nH.prototype.update_referrer_info=function(e){// If referrer doesn't exist, we want to note the fact that it was type-in traffic.
this.register_once({$initial_referrer:e||"$direct",$initial_referring_domain:tK.info.referringDomain(e)||"$direct"},"")},nH.prototype.get_referrer_info=function(){return tK.strip_empty_properties({$initial_referrer:this.props.$initial_referrer,$initial_referring_domain:this.props.$initial_referring_domain})},// safely fills the passed in object with stored properties,
// does not override any properties defined in both
// returns the passed in object
nH.prototype.safe_merge=function(e){return tK.each(this.props,function(t,n){n in e||(e[n]=t)}),e},nH.prototype.update_config=function(e){this.default_expiry=this.expire_days=e.cookie_expiration,this.set_disabled(e.disable_persistence),this.set_cookie_domain(e.cookie_domain),this.set_cross_site(e.cross_site_cookie),this.set_cross_subdomain(e.cross_subdomain_cookie),this.set_secure(e.secure_cookie)},nH.prototype.set_disabled=function(e){this.disabled=e,this.disabled?this.remove():this.save()},nH.prototype.set_cookie_domain=function(e){e!==this.cookie_domain&&(this.remove(),this.cookie_domain=e,this.save())},nH.prototype.set_cross_site=function(e){e!==this.cross_site&&(this.cross_site=e,this.remove(),this.save())},nH.prototype.set_cross_subdomain=function(e){e!==this.cross_subdomain&&(this.cross_subdomain=e,this.remove(),this.save())},nH.prototype.get_cross_subdomain=function(){return this.cross_subdomain},nH.prototype.set_secure=function(e){e!==this.secure&&(this.secure=!!e,this.remove(),this.save())},nH.prototype._add_to_people_queue=function(e,t){var n=this._get_queue_key(e),r=t[e],a=this._get_or_create_queue(nE),i=this._get_or_create_queue(nC),o=this._get_or_create_queue(nT),s=this._get_or_create_queue(nO),l=this._get_or_create_queue(nP),u=this._get_or_create_queue(nI,[]),c=this._get_or_create_queue(nR,[]);n===nM?(// Update the set queue - we can override any existing values
tK.extend(a,r),// if there was a pending increment, override it
// with the set.
this._pop_from_people_queue(nO,r),// if there was a pending union, override it
// with the set.
this._pop_from_people_queue(nP,r),this._pop_from_people_queue(nT,r)):n===nA?(// only queue the data if there is not already a set_once call for it.
tK.each(r,function(e,t){t in i||(i[t]=e)}),this._pop_from_people_queue(nT,r)):n===nU?tK.each(r,function(e){// undo previously-queued actions on this key
tK.each([a,i,s,l],function(t){e in t&&delete t[e]}),tK.each(c,function(t){e in t&&delete t[e]}),o[e]=!0}):n===nz?(tK.each(r,function(e,t){// If it exists in the set queue, increment
// the value
t in a?a[t]+=e:(t in s||(s[t]=0),s[t]+=e)},this),this._pop_from_people_queue(nT,r)):n===nq?(tK.each(r,function(e,t){tK.isArray(e)&&(t in l||(l[t]=[]),// We may send duplicates, the server will dedup them.
l[t]=l[t].concat(e))}),this._pop_from_people_queue(nT,r)):n===nj?(u.push(r),this._pop_from_people_queue(nR,r)):n===nF&&(c.push(r),this._pop_from_people_queue(nT,r)),tG.log("MIXPANEL PEOPLE REQUEST (QUEUED, PENDING IDENTIFY):"),tG.log(t),this.save()},nH.prototype._pop_from_people_queue=function(e,t){var n=this._get_queue(e);tK.isUndefined(n)||(tK.each(t,function(t,r){e===nR||e===nI?// e.g. remove should not override append in a case like
// append({foo: 'bar'}); remove({foo: 'qux'})
tK.each(n,function(e){e[r]===t&&delete e[r]}):delete n[r]},this),this.save())},nH.prototype._get_queue_key=function(e){return e===nE?nM:e===nC?nA:e===nT?nU:e===nO?nz:e===nR?nF:e===nI?nj:e===nP?nq:void tG.error("Invalid queue:",e)},nH.prototype._get_queue=function(e){return this.props[this._get_queue_key(e)]},nH.prototype._get_or_create_queue=function(e,t){var n=this._get_queue_key(e);return t=tK.isUndefined(t)?{}:t,this.props[n]||(this.props[n]=t)},nH.prototype.set_event_timer=function(e,t){var n=this.props[nW]||{};n[e]=t,this.props[nW]=n,this.save()},nH.prototype.remove_event_timer=function(e){var t=(this.props[nW]||{})[e];return tK.isUndefined(t)||(delete this.props[nW][e],this.save()),t};var nY=function(e){return e},nQ=function(){},nK="mixpanel",nG="base64",nX="$device:",nJ=E.XMLHttpRequest&&"withCredentials"in new XMLHttpRequest,nZ=!nJ&&-1===tB.indexOf("MSIE")&&-1===tB.indexOf("Mozilla"),n0=null;tz.sendBeacon&&(n0=function(){// late reference to navigator.sendBeacon to allow patching/spying
return tz.sendBeacon.apply(tz,arguments)});/*
 * Module-level globals
 */var n1={api_host:"https://api-js.mixpanel.com",api_method:"POST",api_transport:"XHR",api_payload_format:nG,app_host:"https://mixpanel.com",cdn:"https://cdn.mxpnl.com",cross_site_cookie:!1,cross_subdomain_cookie:!0,error_reporter:nQ,persistence:"cookie",persistence_name:"",cookie_domain:"",cookie_name:"",loaded:nQ,track_marketing:!0,track_pageview:!1,skip_first_touch_marketing:!1,store_google:!0,save_referrer:!0,test:!1,verbose:!1,img:!1,debug:!1,track_links_timeout:300,cookie_expiration:365,upgrade:!1,disable_persistence:!1,disable_cookie:!1,secure_cookie:!1,ip:!0,opt_out_tracking_by_default:!1,opt_out_persistence_by_default:!1,opt_out_tracking_persistence_type:"localStorage",opt_out_tracking_cookie_prefix:null,property_blacklist:[],xhr_headers:{},ignore_dnt:!1,batch_requests:!0,batch_size:50,batch_flush_interval_ms:5e3,batch_request_timeout_ms:9e4,batch_autostart:!0,hooks:{}},n2=!1,n3=function(){},n5=function(e,t,n){var r,a=n===nK?T:T[n];if(a&&0===C)r=a;else{if(a&&!tK.isArray(a)){tG.error("You have already initialized "+n);return}r=new n3}if(r._cached_groups={},r._init(e,t,n),r.people=new nL,r.people._init(r),!r.get_config("skip_first_touch_marketing")){// We need null UTM params in the object because
// UTM parameters act as a tuple. If any UTM param
// is present, then we set all UTM params including
// empty ones together
var i=tK.info.campaignParams(null),o={},s=!1;tK.each(i,function(e,t){o["initial_"+t]=e,e&&(s=!0)}),s&&r.people.set_once(o)}return(// if any instance on the page has debug = true, we set the
// global debug to be true
tR.DEBUG=tR.DEBUG||r.get_config("debug"),!tK.isUndefined(a)&&tK.isArray(a)&&(// Crunch through the people queue first - we queue this data up &
// flush on identify, so it's better to do all these operations first
r._execute_array.call(r.people,a.people),r._execute_array(a)),r)};// Initialization methods
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
 */n3.prototype.init=function(e,t,n){if(tK.isUndefined(n)){this.report_error("You must name your new library: init(token, config, name)");return}if(n===nK){this.report_error("You must initialize the main mixpanel object right after you include the Mixpanel js snippet");return}var r=n5(e,t,n);return T[n]=r,r._loaded(),r},// mixpanel._init(token:string, config:object, name:string)
//
// This function sets up the current instance of the mixpanel
// library.  The difference between this method and the init(...)
// method is this one initializes the actual instance, whereas the
// init(...) method sets up a new library and calls _init on it.
//
n3.prototype._init=function(e,t,n){t=t||{},this.__loaded=!0,this.config={};var r={};if(!("api_payload_format"in t)&&(t.api_host||n1.api_host).match(/\.mixpanel\.com/)&&(r.api_payload_format="json"),this.set_config(tK.extend({},n1,r,t,{name:n,token:e,callback_fn:(n===nK?n:nK+"."+n)+"._jsc"})),this._jsc=nQ,this.__dom_loaded_queue=[],this.__request_queue=[],this.__disabled_events=[],this._flags={disable_all_events:!1,identify_called:!1},// set up request queueing/batching
this.request_batchers={},this._batch_requests=this.get_config("batch_requests"),this._batch_requests){if(tK.localStorage.is_supported(!0)&&nJ){if(this.init_batchers(),n0&&E.addEventListener){// Before page closes or hides (user tabs away etc), attempt to flush any events
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
var a=tK.bind(function(){this.request_batchers.events.stopped||this.request_batchers.events.flush({unloading:!0})},this);E.addEventListener("pagehide",function(e){e.persisted&&a()}),E.addEventListener("visibilitychange",function(){"hidden"===tF.visibilityState&&a()})}}else this._batch_requests=!1,tG.log("Turning off Mixpanel request-queueing; needs XHR and localStorage support")}this.persistence=this.cookie=new nH(this.config),this.unpersisted_superprops={},this._gdpr_init();var i=tK.UUID();this.get_distinct_id()||// or the device id if something was already stored
// in the persitence
this.register_once({distinct_id:nX+i,$device_id:i},""),this.get_config("track_pageview")&&this.track_pageview()},// Private methods
n3.prototype._loaded=function(){this.get_config("loaded")(this),this._set_default_superprops()},// update persistence with info on referrer, UTM params, etc
n3.prototype._set_default_superprops=function(){this.persistence.update_search_keyword(tF.referrer),this.get_config("store_google")&&this.register(tK.info.campaignParams(),{persistent:!1}),this.get_config("save_referrer")&&this.persistence.update_referrer_info(tF.referrer)},n3.prototype._dom_loaded=function(){tK.each(this.__dom_loaded_queue,function(e){this._track_dom.apply(this,e)},this),this.has_opted_out_tracking()||tK.each(this.__request_queue,function(e){this._send_request.apply(this,e)},this),delete this.__dom_loaded_queue,delete this.__request_queue},n3.prototype._track_dom=function(e,t){if(this.get_config("img"))return this.report_error("You can't use DOM tracking functions with img = true."),!1;if(!n2)return this.__dom_loaded_queue.push([e,t]),!1;var n=new e().init(this);return n.track.apply(n,t)},/**
 * _prepare_callback() should be called by callers of _send_request for use
 * as the callback argument.
 *
 * If there is no callback, this returns null.
 * If we are going to make XHR/XDR requests, this returns a function.
 * If we are going to use script tags, this returns a string to use as the
 * callback GET param.
 */n3.prototype._prepare_callback=function(e,t){if(tK.isUndefined(e))return null;if(nJ)return function(n){e(n,t)};// if the user gives us a callback, we store as a random
// property on this instances jsc function and update our
// callback string to reflect that.
var n=this._jsc,r=""+Math.floor(1e8*Math.random()),a=this.get_config("callback_fn")+"["+r+"]";return n[r]=function(a){delete n[r],e(a,t)},a},n3.prototype._send_request=function(e,t,n,r){var a=!0;if(nZ)return this.__request_queue.push(arguments),a;var i={method:this.get_config("api_method"),transport:this.get_config("api_transport"),verbose:this.get_config("verbose")},o=null;!r&&(tK.isFunction(n)||"string"==typeof n)&&(r=n,n=null),n=tK.extend(i,n||{}),nJ||(n.method="GET");var s="POST"===n.method,l=n0&&s&&"sendbeacon"===n.transport.toLowerCase(),u=n.verbose;t.verbose&&(u=!0),this.get_config("test")&&(t.test=1),u&&(t.verbose=1),this.get_config("img")&&(t.img=1),!nJ&&(r?t.callback=r:(u||this.get_config("test"))&&// which by itself is not valid javascript. Without a callback, this verbose output will
// cause an error when returned via jsonp, so we force a no-op callback param.
// See the ECMA script spec: http://www.ecma-international.org/ecma-262/5.1/#sec-12.4
(t.callback="(function(){})")),t.ip=this.get_config("ip")?1:0,t._=new Date().getTime().toString(),s&&(o="data="+encodeURIComponent(t.data),delete t.data),e+="?"+tK.HTTPBuildQuery(t);var c=this;if("img"in t){var d=tF.createElement("img");d.src=e,tF.body.appendChild(d)}else if(l){try{a=n0(e,o)}catch(e){c.report_error(e),a=!1}try{r&&r(a?1:0)}catch(e){c.report_error(e)}}else if(nJ)try{var f=new XMLHttpRequest;f.open(n.method,e,!0);var p=this.get_config("xhr_headers");if(s&&(p["Content-Type"]="application/x-www-form-urlencoded"),tK.each(p,function(e,t){f.setRequestHeader(t,e)}),n.timeout_ms&&void 0!==f.timeout){f.timeout=n.timeout_ms;var h=new Date().getTime()}// send the mp_optout cookie
// withCredentials cannot be modified until after calling .open on Android and Mobile Safari
f.withCredentials=!0,f.onreadystatechange=function(){if(4===f.readyState){var e,t;if(200===f.status){if(r){if(u){try{e=tK.JSONDecode(f.responseText)}catch(t){if(c.report_error(t),!n.ignore_json_errors)return;e=f.responseText}r(e)}else r(Number(f.responseText))}}else t=f.timeout&&!f.status&&new Date().getTime()-h>=f.timeout?"timeout":"Bad HTTP status: "+f.status+" "+f.statusText,c.report_error(t),r&&(u?r({status:0,error:t,xhr_req:f}):r(0))}},f.send(o)}catch(e){c.report_error(e),a=!1}else{var m=tF.createElement("script");m.type="text/javascript",m.async=!0,m.defer=!0,m.src=e;var v=tF.getElementsByTagName("script")[0];v.parentNode.insertBefore(m,v)}return a},/**
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
 */n3.prototype._execute_array=function(e){var t,n=[],r=[],a=[];tK.each(e,function(e){e&&(t=e[0],tK.isArray(t)?a.push(e):"function"==typeof e?e.call(this):tK.isArray(e)&&"alias"===t?n.push(e):tK.isArray(e)&&-1!==t.indexOf("track")&&"function"==typeof this[t]?a.push(e):r.push(e))},this);var i=function(e,t){tK.each(e,function(e){if(tK.isArray(e[0])){// chained call
var n=t;tK.each(e,function(e){n=n[e[0]].apply(n,e.slice(1))})}else this[e[0]].apply(this,e.slice(1))},t)};i(n,this),i(r,this),i(a,this)},// request queueing utils
n3.prototype.are_batchers_initialized=function(){return!!this.request_batchers.events},n3.prototype.init_batchers=function(){var e=this.get_config("token");if(!this.are_batchers_initialized()){var t=tK.bind(function(t){return new nd("__mpq_"+e+t.queue_suffix,{libConfig:this.config,sendRequestFunc:tK.bind(function(e,n,r){this._send_request(this.get_config("api_host")+t.endpoint,this._encode_data_for_request(e),n,this._prepare_callback(r,e))},this),beforeSendHook:tK.bind(function(e){return this._run_hook("before_send_"+t.type,e)},this),errorReporter:this.get_config("error_reporter"),stopAllBatchingFunc:tK.bind(this.stop_batch_senders,this)})},this);this.request_batchers={events:t({type:"events",endpoint:"/track/",queue_suffix:"_ev"}),people:t({type:"people",endpoint:"/engage/",queue_suffix:"_pp"}),groups:t({type:"groups",endpoint:"/groups/",queue_suffix:"_gr"})}}this.get_config("batch_autostart")&&this.start_batch_senders()},n3.prototype.start_batch_senders=function(){this.are_batchers_initialized()&&(this._batch_requests=!0,tK.each(this.request_batchers,function(e){e.start()}))},n3.prototype.stop_batch_senders=function(){this._batch_requests=!1,tK.each(this.request_batchers,function(e){e.stop(),e.clear()})},/**
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
 */n3.prototype.push=function(e){this._execute_array([e])},/**
 * Disable events on the Mixpanel object. If passed no arguments,
 * this function disables tracking of any event. If passed an
 * array of event names, those events will be disabled, but other
 * events will continue to be tracked.
 *
 * Note: this function does not stop other mixpanel functions from
 * firing, such as register() or people.set().
 *
 * @param {Array} [events] An array of event names to disable
 */n3.prototype.disable=function(e){void 0===e?this._flags.disable_all_events=!0:this.__disabled_events=this.__disabled_events.concat(e)},n3.prototype._encode_data_for_request=function(e){var t=tK.JSONEncode(e);return this.get_config("api_payload_format")===nG&&(t=tK.base64Encode(t)),{data:t}},// internal method for handling track vs batch-enqueue logic
n3.prototype._track_or_batch=function(e,t){var n=tK.truncate(e.data,255),r=e.endpoint,a=e.batcher,i=e.should_send_immediately,o=e.send_request_options||{};t=t||nQ;var s=!0,l=tK.bind(function(){return(o.skip_hooks||(n=this._run_hook("before_send_"+e.type,n)),n)?(tG.log("MIXPANEL REQUEST:"),tG.log(n),this._send_request(r,this._encode_data_for_request(n),o,this._prepare_callback(t,n))):null},this);return this._batch_requests&&!i?a.enqueue(n,function(e){e?t(1,n):l()}):s=l(),s&&n},/**
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
 */n3.prototype.track=nv(function(e,t,n,r){r||"function"!=typeof n||(r=n,n=null);var a=(n=n||{}).transport;// external API, don't minify 'transport' prop
a&&(n.transport=a);var i=n.send_immediately;if("function"!=typeof r&&(r=nQ),tK.isUndefined(e)){this.report_error("No event name provided to mixpanel.track");return}if(this._event_is_disabled(e)){r(0);return}// set defaults
(t=t||{}).token=this.get_config("token");// set $duration if time_event was previously called for this event
var o=this.persistence.remove_event_timer(e);if(!tK.isUndefined(o)){var s=new Date().getTime()-o;t.$duration=parseFloat((s/1e3).toFixed(3))}this._set_default_superprops();var l=this.get_config("track_marketing")?tK.info.marketingParams():{};// note: extend writes to the first object, so lets make sure we
// don't write to the persistence properties object and info
// properties object by passing in a new object
// update properties with pageview info and super-properties
t=tK.extend({},tK.info.properties(),l,this.persistence.properties(),this.unpersisted_superprops,t);var u=this.get_config("property_blacklist");tK.isArray(u)?tK.each(u,function(e){delete t[e]}):this.report_error("Invalid value for property_blacklist config: "+u);var c={event:e,properties:t};return this._track_or_batch({type:"events",data:c,endpoint:this.get_config("api_host")+"/track/",batcher:this.request_batchers.events,should_send_immediately:i,send_request_options:n},r)}),/**
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
 */n3.prototype.set_group=nv(function(e,t,n){tK.isArray(t)||(t=[t]);var r={};return r[e]=t,this.register(r),this.people.set(e,t,n)}),/**
 * Add a new group for this user.
 *
 * ### Usage:
 *
 *      mixpanel.add_group('company', 'mixpanel')
 *
 * @param {String} group_key Group key
 * @param {*} group_id A valid Mixpanel property type
 * @param {Function} [callback] If provided, the callback will be called after tracking the event.
 */n3.prototype.add_group=nv(function(e,t,n){var r=this.get_property(e);if(void 0===r){var a={};a[e]=[t],this.register(a)}else -1===r.indexOf(t)&&(r.push(t),this.register(a));return this.people.union(e,t,n)}),/**
 * Remove a group from this user.
 *
 * ### Usage:
 *
 *      mixpanel.remove_group('company', 'mixpanel')
 *
 * @param {String} group_key Group key
 * @param {*} group_id A valid Mixpanel property type
 * @param {Function} [callback] If provided, the callback will be called after tracking the event.
 */n3.prototype.remove_group=nv(function(e,t,n){var r=this.get_property(e);// if the value doesn't exist, the persistent store is unchanged
if(void 0!==r){var a=r.indexOf(t);a>-1&&(r.splice(a,1),this.register({group_key:r})),0===r.length&&this.unregister(e)}return this.people.remove(e,t,n)}),/**
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
 */n3.prototype.track_with_groups=nv(function(e,t,n,r){var a=tK.extend({},t||{});return tK.each(n,function(e,t){null!=e&&(a[t]=e)}),this.track(e,a,r)}),n3.prototype._create_map_key=function(e,t){return e+"_"+JSON.stringify(t)},n3.prototype._remove_group_from_cache=function(e,t){delete this._cached_groups[this._create_map_key(e,t)]},/**
 * Look up reference to a Mixpanel group
 *
 * ### Usage:
 *
 *       mixpanel.get_group(group_key, group_id)
 *
 * @param {String} group_key Group key
 * @param {Object} group_id A valid Mixpanel property type
 * @returns {Object} A MixpanelGroup identifier
 */n3.prototype.get_group=function(e,t){var n=this._create_map_key(e,t),r=this._cached_groups[n];return(void 0===r||r._group_key!==e||r._group_id!==t)&&((r=new nN)._init(this,e,t),this._cached_groups[n]=r),r},/**
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
 */n3.prototype.track_pageview=nv(function(e,t){"object"!=typeof e&&(e={});var n=(t=t||{}).event_name||"$mp_web_page_view",r=tK.extend(tK.info.mpPageViewProperties(),tK.info.campaignParams(),tK.info.clickParams()),a=tK.extend({},r,e);return this.track(n,a)}),/**
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
 */n3.prototype.track_links=function(){return this._track_dom.call(this,nn,arguments)},/**
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
 */n3.prototype.track_forms=function(){return this._track_dom.call(this,nr,arguments)},/**
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
 */n3.prototype.time_event=function(e){if(tK.isUndefined(e)){this.report_error("No event name provided to mixpanel.time_event");return}this._event_is_disabled(e)||this.persistence.set_event_timer(e,new Date().getTime())};var n4={persistent:!0},n6=function(e){var t;return t=tK.isObject(e)?e:tK.isUndefined(e)?{}:{days:e},tK.extend({},n4,t)};/**
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
 */n3.prototype.register=function(e,t){var n=n6(t);n.persistent?this.persistence.register(e,n.days):tK.extend(this.unpersisted_superprops,e)},/**
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
 */n3.prototype.register_once=function(e,t,n){var r=n6(n);r.persistent?this.persistence.register_once(e,t,r.days):(void 0===t&&(t="None"),tK.each(e,function(e,n){this.unpersisted_superprops.hasOwnProperty(n)&&this.unpersisted_superprops[n]!==t||(this.unpersisted_superprops[n]=e)},this))},/**
 * Delete a super property stored with the current user.
 *
 * @param {String} property The name of the super property to remove
 * @param {Object} [options]
 * @param {boolean} [options.persistent=true] - whether to look in persistent storage (cookie/localStorage)
 */n3.prototype.unregister=function(e,t){(t=n6(t)).persistent?this.persistence.unregister(e):delete this.unpersisted_superprops[e]},n3.prototype._register_single=function(e,t){var n={};n[e]=t,this.register(n)},/**
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
 */n3.prototype.identify=function(e,t,n,r,a,i,o,s){// Optional Parameters
//  _set_callback:function  A callback to be run if and when the People set queue is flushed
//  _add_callback:function  A callback to be run if and when the People add queue is flushed
//  _append_callback:function  A callback to be run if and when the People append queue is flushed
//  _set_once_callback:function  A callback to be run if and when the People set_once queue is flushed
//  _union_callback:function  A callback to be run if and when the People union queue is flushed
//  _unset_callback:function  A callback to be run if and when the People unset queue is flushed
var l=this.get_distinct_id();if(e&&l!==e){// we allow the following condition if previous distinct_id is same as new_distinct_id
// so that you can force flush people updates for anonymous profiles.
if("string"==typeof e&&0===e.indexOf(nX))return this.report_error("distinct_id cannot have $device: prefix"),-1;this.register({$user_id:e})}this.get_property("$device_id")||this.register_once({$had_persisted_distinct_id:!0,$device_id:l},""),e!==l&&e!==this.get_property(nV)&&(this.unregister(nV),this.register({distinct_id:e})),this._flags.identify_called=!0,// Flush any queued up people requests
this.people._flush(t,n,r,a,i,o,s),e!==l&&this.track("$identify",{distinct_id:e,$anon_distinct_id:l},{skip_hooks:!0})},/**
 * Clears super properties and generates a new random distinct_id for this instance.
 * Useful for clearing data when a user logs out.
 */n3.prototype.reset=function(){this.persistence.clear(),this._flags.identify_called=!1;var e=tK.UUID();this.register_once({distinct_id:nX+e,$device_id:e},"")},/**
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
 */n3.prototype.get_distinct_id=function(){return this.get_property("distinct_id")},/**
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
 */n3.prototype.alias=function(e,t){// If the $people_distinct_id key exists in persistence, there has been a previous
// mixpanel.people.identify() call made for this user. It is VERY BAD to make an alias with
// this ID, as it will duplicate users.
if(e===this.get_property(nB))return this.report_error("Attempting to create alias for existing People user - aborting."),-2;var n=this;return(tK.isUndefined(t)&&(t=this.get_distinct_id()),e!==t)?(this._register_single(nV,e),this.track("$create_alias",{alias:e,distinct_id:t},{skip_hooks:!0},function(){// Flush the people queue
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
 */n3.prototype.name_tag=function(e){this._register_single("mp_name_tag",e)},/**
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
 */n3.prototype.set_config=function(e){tK.isObject(e)&&(tK.extend(this.config,e),e.batch_size&&tK.each(this.request_batchers,function(e){e.resetBatchSize()}),this.get_config("persistence_name")||(this.config.persistence_name=this.config.cookie_name),this.get_config("disable_persistence")||(this.config.disable_persistence=this.config.disable_cookie),this.persistence&&this.persistence.update_config(this.config),tR.DEBUG=tR.DEBUG||this.get_config("debug"))},/**
 * returns the current config object for the library.
 */n3.prototype.get_config=function(e){return this.config[e]},/**
 * Fetch a hook function from config, with safe default, and run it
 * against the given arguments
 * @param {string} hook_name which hook to retrieve
 * @returns {any|null} return value of user-provided hook, or null if nothing was returned
 */n3.prototype._run_hook=function(e){var t=(this.config.hooks[e]||nY).apply(this,tL.call(arguments,1));return void 0===t&&(this.report_error(e+" hook did not return a value"),t=null),t},/**
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
 */n3.prototype.get_property=function(e){return this.persistence.props[e]},n3.prototype.toString=function(){var e=this.get_config("name");return e!==nK&&(e=nK+"."+e),e},n3.prototype._event_is_disabled=function(e){return tK.isBlockedUA(tB)||this._flags.disable_all_events||tK.include(this.__disabled_events,e)},// perform some housekeeping around GDPR opt-in/out state
n3.prototype._gdpr_init=function(){"localStorage"===this.get_config("opt_out_tracking_persistence_type")&&tK.localStorage.is_supported()&&(!this.has_opted_in_tracking()&&this.has_opted_in_tracking({persistence_type:"cookie"})&&this.opt_in_tracking({enable_persistence:!1}),!this.has_opted_out_tracking()&&this.has_opted_out_tracking({persistence_type:"cookie"})&&this.opt_out_tracking({clear_persistence:!1}),this.clear_opt_in_out_tracking({persistence_type:"cookie",enable_persistence:!1})),this.has_opted_out_tracking()?this._gdpr_update_persistence({clear_persistence:!0}):!this.has_opted_in_tracking()&&(this.get_config("opt_out_tracking_by_default")||tK.cookie.get("mp_optout"))&&(tK.cookie.remove("mp_optout"),this.opt_out_tracking({clear_persistence:this.get_config("opt_out_persistence_by_default")}))},/**
 * Enable or disable persistence based on options
 * only enable/disable if persistence is not already in this state
 * @param {boolean} [options.clear_persistence] If true, will delete all data stored by the sdk in persistence and disable it
 * @param {boolean} [options.enable_persistence] If true, will re-enable sdk persistence
 */n3.prototype._gdpr_update_persistence=function(e){var t;if(e&&e.clear_persistence)t=!0;else{if(!e||!e.enable_persistence)return;t=!1}this.get_config("disable_persistence")||this.persistence.disabled===t||this.persistence.set_disabled(t),t&&tK.each(this.request_batchers,function(e){e.clear()})},// call a base gdpr function after constructing the appropriate token and options args
n3.prototype._gdpr_call_func=function(e,t){return t=tK.extend({track:tK.bind(this.track,this),persistence_type:this.get_config("opt_out_tracking_persistence_type"),cookie_prefix:this.get_config("opt_out_tracking_cookie_prefix"),cookie_expiration:this.get_config("cookie_expiration"),cross_site_cookie:this.get_config("cross_site_cookie"),cross_subdomain_cookie:this.get_config("cross_subdomain_cookie"),cookie_domain:this.get_config("cookie_domain"),secure_cookie:this.get_config("secure_cookie"),ignore_dnt:this.get_config("ignore_dnt")},t),tK.localStorage.is_supported()||(t.persistence_type="cookie"),e(this.get_config("token"),{track:t.track,trackEventName:t.track_event_name,trackProperties:t.track_properties,persistenceType:t.persistence_type,persistencePrefix:t.cookie_prefix,cookieDomain:t.cookie_domain,cookieExpiration:t.cookie_expiration,crossSiteCookie:t.cross_site_cookie,crossSubdomainCookie:t.cross_subdomain_cookie,secureCookie:t.secure_cookie,ignoreDnt:t.ignore_dnt})},/**
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
 */n3.prototype.opt_in_tracking=function(e){e=tK.extend({enable_persistence:!0},e),this._gdpr_call_func(nf,e),this._gdpr_update_persistence(e)},/**
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
 */n3.prototype.opt_out_tracking=function(e){(e=tK.extend({clear_persistence:!0,delete_user:!0},e)).delete_user&&this.people&&this.people._identify_called()&&(this.people.delete_user(),this.people.clear_charges()),this._gdpr_call_func(np,e),this._gdpr_update_persistence(e)},/**
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
 */n3.prototype.has_opted_in_tracking=function(e){return this._gdpr_call_func(nh,e)},/**
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
 */n3.prototype.has_opted_out_tracking=function(e){return this._gdpr_call_func(nm,e)},/**
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
 */n3.prototype.clear_opt_in_out_tracking=function(e){e=tK.extend({enable_persistence:!0},e),this._gdpr_call_func(nb,e),this._gdpr_update_persistence(e)},n3.prototype.report_error=function(e,t){tG.error.apply(tG.error,arguments);try{t||e instanceof Error||(e=Error(e)),this.get_config("error_reporter")(e,t)}catch(e){tG.error(e)}},// EXPORTS (for closure compiler)
// MixpanelLib Exports
n3.prototype.init=n3.prototype.init,n3.prototype.reset=n3.prototype.reset,n3.prototype.disable=n3.prototype.disable,n3.prototype.time_event=n3.prototype.time_event,n3.prototype.track=n3.prototype.track,n3.prototype.track_links=n3.prototype.track_links,n3.prototype.track_forms=n3.prototype.track_forms,n3.prototype.track_pageview=n3.prototype.track_pageview,n3.prototype.register=n3.prototype.register,n3.prototype.register_once=n3.prototype.register_once,n3.prototype.unregister=n3.prototype.unregister,n3.prototype.identify=n3.prototype.identify,n3.prototype.alias=n3.prototype.alias,n3.prototype.name_tag=n3.prototype.name_tag,n3.prototype.set_config=n3.prototype.set_config,n3.prototype.get_config=n3.prototype.get_config,n3.prototype.get_property=n3.prototype.get_property,n3.prototype.get_distinct_id=n3.prototype.get_distinct_id,n3.prototype.toString=n3.prototype.toString,n3.prototype.opt_out_tracking=n3.prototype.opt_out_tracking,n3.prototype.opt_in_tracking=n3.prototype.opt_in_tracking,n3.prototype.has_opted_out_tracking=n3.prototype.has_opted_out_tracking,n3.prototype.has_opted_in_tracking=n3.prototype.has_opted_in_tracking,n3.prototype.clear_opt_in_out_tracking=n3.prototype.clear_opt_in_out_tracking,n3.prototype.get_group=n3.prototype.get_group,n3.prototype.set_group=n3.prototype.set_group,n3.prototype.add_group=n3.prototype.add_group,n3.prototype.remove_group=n3.prototype.remove_group,n3.prototype.track_with_groups=n3.prototype.track_with_groups,n3.prototype.start_batch_senders=n3.prototype.start_batch_senders,n3.prototype.stop_batch_senders=n3.prototype.stop_batch_senders,// MixpanelPersistence Exports
nH.prototype.properties=nH.prototype.properties,nH.prototype.update_search_keyword=nH.prototype.update_search_keyword,nH.prototype.update_referrer_info=nH.prototype.update_referrer_info,nH.prototype.get_cross_subdomain=nH.prototype.get_cross_subdomain,nH.prototype.clear=nH.prototype.clear;var n8={},n7=function(){// add all the sub mixpanel instances
tK.each(n8,function(e,t){t!==nK&&(T[t]=e)}),// add private functions as _
T._=tK};C=0,// we override the snippets init function to handle the case where a
// user initializes the mixpanel library after the script loads & runs
(T=new n3).init=function(e,t,n){if(n)return T[n]||(T[n]=n8[n]=n5(e,t,n),T[n]._loaded()),T[n];var r=T;n8[nK]?r=n8[nK]:e&&(// intialize the main mixpanel lib
(r=n5(e,t,nK))._loaded(),n8[nK]=r),T=r,1===C&&(E[nK]=T),n7()},T.init(),function(){// Cross browser DOM Loaded support
function e(){// function flag since we only want to execute this once
e.done||(e.done=!0,n2=!0,nZ=!1,tK.each(n8,function(e){e._dom_loaded()}))}if(tF.addEventListener)"complete"===tF.readyState?// external JS (including this file). you will see some copypasta
// on the internet that checks for 'complete' and 'loaded', but
// 'loaded' is an IE thing
e():tF.addEventListener("DOMContentLoaded",e,!1);else if(tF.attachEvent){// IE
tF.attachEvent("onreadystatechange",e);// check to make sure we arn't in a frame
var t=!1;try{t=null===E.frameElement}catch(e){// noop
}tF.documentElement.doScroll&&t&&function t(){try{tF.documentElement.doScroll("left")}catch(e){setTimeout(t,1);return}e()}()}// fallback handler, always will work
tK.register_event(E,"load",e,!0)}(),tO=T;let n9=e=>{/*@__PURE__*/r(tO).init("d122fa924e1ea97d6b98569440c65a95",{debug:e.debug,track_pageview:!0,persistence:"localStorage"})},re=(e,t,n)=>/*@__PURE__*/r(tO).track(e,t,n),rt=({children:e})=>{let{appId:t}=tu(),{visitor:n}=tT(),{log:a}=ew();return(0,D.useEffect)(()=>{t&&n.id&&(a("MixpanelProvider: booting"),n9({debug:!0}),a("MixpanelProvider: registering visitor "+n.id+" to mixpanel"),/*@__PURE__*/r(tO).identify(n.id))},[t,n?.id]),/*@__PURE__*/r(D).createElement(rn.Provider,{value:{trackEvent:re}},e)},rn=/*#__PURE__*/(0,D.createContext)({trackEvent:()=>{}}),rr=()=>(0,D.useContext)(rn);var ra={};Object.defineProperty(ra,"__esModule",{value:!0});var D=I("exYeM"),ri=(S=D)&&"object"==typeof S&&"default"in S?S.default:S,ro=I("cV6nb"),rs=new ro,rl=rs.getBrowser(),ru=rs.getCPU(),rc=rs.getDevice(),rd=rs.getEngine(),rf=rs.getOS(),rp=rs.getUA(),rh=function(e){return rs.setUA(e)},rm=function(e){if(!e){console.error("No userAgent string was provided");return}var t=new ro(e);return{UA:t,browser:t.getBrowser(),cpu:t.getCPU(),device:t.getDevice(),engine:t.getEngine(),os:t.getOS(),ua:t.getUA(),setUserAgent:function(e){return t.setUA(e)}}},rv=/*#__PURE__*/Object.freeze({ClientUAInstance:rs,browser:rl,cpu:ru,device:rc,engine:rd,os:rf,ua:rp,setUa:rh,parseUserAgent:rm});function rg(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function ry(e){return(ry="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function rb(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function rw(){return(rw=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function r_(e){return(r_=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function rk(e,t){return(rk=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function rx(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function rS(e){if(void 0===e)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function rE(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var rC={Mobile:"mobile",Tablet:"tablet",SmartTv:"smarttv",Console:"console",Wearable:"wearable",Embedded:"embedded",Browser:void 0},rT={Chrome:"Chrome",Firefox:"Firefox",Opera:"Opera",Yandex:"Yandex",Safari:"Safari",InternetExplorer:"Internet Explorer",Edge:"Edge",Chromium:"Chromium",Ie:"IE",MobileSafari:"Mobile Safari",EdgeChromium:"Edge Chromium",MIUI:"MIUI Browser",SamsungBrowser:"Samsung Browser"},rO={IOS:"iOS",Android:"Android",WindowsPhone:"Windows Phone",Windows:"Windows",MAC_OS:"Mac OS"},rR={isMobile:!1,isTablet:!1,isBrowser:!1,isSmartTV:!1,isConsole:!1,isWearable:!1},rP=function(e){switch(e){case rC.Mobile:return{isMobile:!0};case rC.Tablet:return{isTablet:!0};case rC.SmartTv:return{isSmartTV:!0};case rC.Console:return{isConsole:!0};case rC.Wearable:return{isWearable:!0};case rC.Browser:return{isBrowser:!0};case rC.Embedded:return{isEmbedded:!0};default:return rR}},rI=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"none";return e||t},rD=function(){return!!("undefined"!=typeof window&&(window.navigator||navigator))&&(window.navigator||navigator)},rN=function(e){var t=rD();return t&&t.platform&&(-1!==t.platform.indexOf(e)||"MacIntel"===t.platform&&t.maxTouchPoints>1&&!window.MSStream)},rL=function(e){return e.type===rC.Mobile},rM=function(e){return e.type===rC.Tablet},rA=function(e){var t=e.type;return t===rC.Mobile||t===rC.Tablet},rU=function(e){return e.type===rC.SmartTv},rz=function(e){return e.type===rC.Browser},rF=function(e){return e.type===rC.Wearable},rj=function(e){return e.type===rC.Console},rq=function(e){return e.type===rC.Embedded},rB=function(e){return rI(e.vendor)},rV=function(e){return rI(e.model)},rW=function(e){return rI(e.type,"browser")},r$=function(e){return e.name===rO.Android},rH=function(e){return e.name===rO.Windows},rY=function(e){return e.name===rO.MAC_OS},rQ=function(e){return e.name===rO.WindowsPhone},rK=function(e){return e.name===rO.IOS},rG=function(e){return rI(e.version)},rX=function(e){return rI(e.name)},rJ=function(e){return e.name===rT.Chrome},rZ=function(e){return e.name===rT.Firefox},r0=function(e){return e.name===rT.Chromium},r1=function(e){return e.name===rT.Edge},r2=function(e){return e.name===rT.Yandex},r3=function(e){var t=e.name;return t===rT.Safari||t===rT.MobileSafari},r5=function(e){return e.name===rT.MobileSafari},r4=function(e){return e.name===rT.Opera},r6=function(e){var t=e.name;return t===rT.InternetExplorer||t===rT.Ie},r8=function(e){return e.name===rT.MIUI},r7=function(e){return e.name===rT.SamsungBrowser},r9=function(e){return rI(e.version)},ae=function(e){return rI(e.major)},at=function(e){return rI(e.name)},an=function(e){return rI(e.name)},ar=function(e){return rI(e.version)},aa=function(){var e=rD(),t=e&&e.userAgent&&e.userAgent.toLowerCase();return"string"==typeof t&&/electron/.test(t)},ai=function(e){return"string"==typeof e&&-1!==e.indexOf("Edg/")},ao=function(){var e=rD();return e&&(/iPad|iPhone|iPod/.test(e.platform)||"MacIntel"===e.platform&&e.maxTouchPoints>1)&&!window.MSStream},as=function(){return rN("iPad")},al=function(){return rN("iPhone")},au=function(){return rN("iPod")},ac=function(e){return rI(e)};function ad(e){var t=e||rv,n=t.device,r=t.browser,a=t.os,i=t.engine,o=t.ua;return{isSmartTV:rU(n),isConsole:rj(n),isWearable:rF(n),isEmbedded:rq(n),isMobileSafari:r5(r)||as(),isChromium:r0(r),isMobile:rA(n)||as(),isMobileOnly:rL(n),isTablet:rM(n)||as(),isBrowser:rz(n),isDesktop:rz(n),isAndroid:r$(a),isWinPhone:rQ(a),isIOS:rK(a)||as(),isChrome:rJ(r),isFirefox:rZ(r),isSafari:r3(r),isOpera:r4(r),isIE:r6(r),osVersion:rG(a),osName:rX(a),fullBrowserVersion:r9(r),browserVersion:ae(r),browserName:at(r),mobileVendor:rB(n),mobileModel:rV(n),engineName:an(i),engineVersion:ar(i),getUA:ac(o),isEdge:r1(r)||ai(o),isYandex:r2(r),deviceType:rW(n),isIOS13:ao(),isIPad13:as(),isIPhone13:al(),isIPod13:au(),isElectron:aa(),isEdgeChromium:ai(o),isLegacyEdge:r1(r)&&!ai(o),isWindows:rH(a),isMacOs:rY(a),isMIUI:r8(r),isSamsungBrowser:r7(r)}}var af=rU(rc),ap=rj(rc),ah=rF(rc),am=rq(rc),av=r5(rl)||as(),ag=r0(rl),ay=rA(rc)||as(),ab=rL(rc),aw=rM(rc)||as(),a_=rz(rc),ak=rz(rc),ax=r$(rf),aS=rQ(rf),aE=rK(rf)||as(),aC=rJ(rl),aT=rZ(rl),aO=r3(rl),aR=r4(rl),aP=r6(rl),aI=rG(rf),aD=rX(rf),aN=r9(rl),aL=ae(rl),aM=at(rl),aA=rB(rc),aU=rV(rc),az=an(rd),aF=ar(rd),aj=ac(rp),aq=r1(rl)||ai(rp),aB=r2(rl),aV=rW(rc),aW=ao(),a$=as(),aH=al(),aY=au(),aQ=aa(),aK=ai(rp),aG=r1(rl)&&!ai(rp),aX=rH(rf),aJ=rY(rf),aZ=r8(rl),a0=r7(rl);function a1(e){return rm(e||window.navigator.userAgent)}ra.AndroidView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return ax?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.BrowserTypes=rT,ra.BrowserView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return a_?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.ConsoleView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return ap?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.CustomView=function(e){var t=e.renderWithFragment,n=e.children,r=(e.viewClassName,e.style,e.condition),a=rx(e,["renderWithFragment","children","viewClassName","style","condition"]);return r?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",a,n):null},ra.IEView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return aP?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.IOSView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return aE?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.MobileOnlyView=function(e){var t=e.renderWithFragment,n=e.children,r=(e.viewClassName,e.style,rx(e,["renderWithFragment","children","viewClassName","style"]));return ab?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.MobileView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return ay?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.OsTypes=rO,ra.SmartTVView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return af?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.TabletView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return aw?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.WearableView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return ah?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.WinPhoneView=function(e){var t=e.renderWithFragment,n=e.children,r=rx(e,["renderWithFragment","children"]);return aS?t?ri.createElement(D.Fragment,null,n):ri.createElement("div",r,n):null},ra.browserName=aM,ra.browserVersion=aL,ra.deviceDetect=function(e){var t=e?rm(e):rv,n=t.device,r=t.browser,a=t.engine,i=t.os,o=t.ua,s=rP(n.type),l=s.isBrowser,u=s.isMobile,c=s.isTablet,d=s.isSmartTV,f=s.isConsole,p=s.isWearable,h=s.isEmbedded;return l?{isBrowser:l,browserMajorVersion:rI(r.major),browserFullVersion:rI(r.version),browserName:rI(r.name),engineName:rI(a.name),engineVersion:rI(a.version),osName:rI(i.name),osVersion:rI(i.version),userAgent:rI(o)}:d?{isSmartTV:d,engineName:rI(a.name),engineVersion:rI(a.version),osName:rI(i.name),osVersion:rI(i.version),userAgent:rI(o)}:f?{isConsole:f,engineName:rI(a.name),engineVersion:rI(a.version),osName:rI(i.name),osVersion:rI(i.version),userAgent:rI(o)}:u||c?function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?rg(Object(n),!0).forEach(function(t){var r;r=n[t],t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):rg(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}({},s,{vendor:rI(n.vendor),model:rI(n.model),os:rI(i.name),osVersion:rI(i.version),ua:rI(o)}):p?{isWearable:p,engineName:rI(a.name),engineVersion:rI(a.version),osName:rI(i.name),osVersion:rI(i.version),userAgent:rI(o)}:h?{isEmbedded:h,vendor:rI(n.vendor),model:rI(n.model),engineName:rI(a.name),engineVersion:rI(a.version),osName:rI(i.name),osVersion:rI(i.version),userAgent:rI(o)}:void 0},ra.deviceType=aV,ra.engineName=az,ra.engineVersion=aF,ra.fullBrowserVersion=aN,ra.getSelectorsByUserAgent=function(e){if(!e||"string"!=typeof e){console.error("No valid user agent string was provided");return}var t=rm(e);return ad({device:t.device,browser:t.browser,os:t.os,engine:t.engine,ua:t.ua})},ra.getUA=aj,ra.isAndroid=ax,ra.isBrowser=a_,ra.isChrome=aC,ra.isChromium=ag,ra.isConsole=ap,ra.isDesktop=ak,ra.isEdge=aq,ra.isEdgeChromium=aK,ra.isElectron=aQ,ra.isEmbedded=am,ra.isFirefox=aT,ra.isIE=aP,ra.isIOS=aE,ra.isIOS13=aW,ra.isIPad13=a$,ra.isIPhone13=aH,ra.isIPod13=aY,ra.isLegacyEdge=aG,ra.isMIUI=aZ,ra.isMacOs=aJ,ra.isMobile=ay,ra.isMobileOnly=ab,ra.isMobileSafari=av,ra.isOpera=aR,ra.isSafari=aO,ra.isSamsungBrowser=a0,ra.isSmartTV=af,ra.isTablet=aw,ra.isWearable=ah,ra.isWinPhone=aS,ra.isWindows=aX,ra.isYandex=aB,ra.mobileModel=aU,ra.mobileVendor=aA,ra.osName=aD,ra.osVersion=aI,ra.parseUserAgent=rm,ra.setUserAgent=function(e){return rh(e)},ra.useDeviceData=a1,ra.useDeviceSelectors=function(e){var t=a1(e||window.navigator.userAgent);return[ad(t),t]},ra.useMobileOrientation=function(){var e,t=function(e){if(Array.isArray(e))return e}(e=D.useState(function(){var e=window.innerWidth>window.innerHeight?90:0;return{isPortrait:0===e,isLandscape:90===e,orientation:0===e?"portrait":"landscape"}}))||function(e,t){var n,r,a=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=a){var i=[],o=!0,s=!1;try{for(a=a.call(e);!(o=(n=a.next()).done)&&(i.push(n.value),!t||i.length!==t);o=!0);}catch(e){s=!0,r=e}finally{try{o||null==a.return||a.return()}finally{if(s)throw r}}return i}}(e,2)||function(e,t){if(e){if("string"==typeof e)return rE(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);if("Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return rE(e,t)}}(e,2)||function(){throw TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),n=t[0],r=t[1],a=D.useCallback(function(){var e=window.innerWidth>window.innerHeight?90:0,t={isPortrait:0===e,isLandscape:90===e,orientation:0===e?"portrait":"landscape"};n.orientation!==t.orientation&&r(t)},[n.orientation]);return D.useEffect(function(){return("undefined"==typeof window?"undefined":ry(window))!==void 0&&ay&&(a(),window.addEventListener("load",a,!1),window.addEventListener("resize",a,!1)),function(){window.removeEventListener("resize",a,!1),window.removeEventListener("load",a,!1)}},[a]),n},ra.withOrientationChange=function(e){return /*#__PURE__*/function(t){var n,r;function a(e){var t;return function(e,t){if(!(e instanceof t))throw TypeError("Cannot call a class as a function")}(this,a),(t=function(e,t){if(t&&("object"==typeof t||"function"==typeof t))return t;if(void 0!==t)throw TypeError("Derived constructors may only return object or undefined");return rS(e)}(this,r_(a).call(this,e))).isEventListenerAdded=!1,t.handleOrientationChange=t.handleOrientationChange.bind(rS(t)),t.onOrientationChange=t.onOrientationChange.bind(rS(t)),t.onPageLoad=t.onPageLoad.bind(rS(t)),t.state={isLandscape:!1,isPortrait:!1},t}return function(e,t){if("function"!=typeof t&&null!==t)throw TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&rk(e,t)}(a,t),n=[{key:"handleOrientationChange",value:function(){this.isEventListenerAdded||(this.isEventListenerAdded=!0);var e=window.innerWidth>window.innerHeight?90:0;this.setState({isPortrait:0===e,isLandscape:90===e})}},{key:"onOrientationChange",value:function(){this.handleOrientationChange()}},{key:"onPageLoad",value:function(){this.handleOrientationChange()}},{key:"componentDidMount",value:function(){("undefined"==typeof window?"undefined":ry(window))!==void 0&&ay&&(this.isEventListenerAdded?window.removeEventListener("load",this.onPageLoad,!1):(this.handleOrientationChange(),window.addEventListener("load",this.onPageLoad,!1)),window.addEventListener("resize",this.onOrientationChange,!1))}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.onOrientationChange,!1)}},{key:"render",value:function(){return ri.createElement(e,rw({},this.props,{isLandscape:this.state.isLandscape,isPortrait:this.state.isPortrait}))}}],rb(a.prototype,n),r&&rb(a,r),a}(ri.Component)};let a2=({children:e,handlers:t})=>{let{log:n,error:a}=ew(),{appId:i,booted:o,initialDelay:s,exitIntentTriggers:l,idleTriggers:u}=tu(),{visitor:c}=tT(),{trackEvent:d}=rr(),{mutateAsync:f}=tl(),{registerHandler:p}=function(e={}){let t=tt(te({},e2),{cookie:te(te({},e2.cookie),e?.cookie),desktop:te(te({},e2.desktop),e?.desktop),mobile:te(te({},e2.mobile),e?.mobile)}),[n,r]=(0,D.useState)(t),[a,i]=(0,D.useState)(!1),[o,s]=(0,D.useState)(!1),l=(0,D.useRef)([]).current,u=(0,D.useRef)(!1),{mobile:c,desktop:d,cookie:f}=n;u.current=o||a;let p=(0,D.useCallback)(()=>{u.current||(i(!0),l.filter(e=>{var t,n;return(null==(t=e.context)?void 0:t.filter(e=>e!==e1.onDesktop&&e!==e1.onMobile).length)===0||(null==(n=e.context)?void 0:n.includes(e1.onTrigger))}).forEach(eX))},[]),h=(0,D.useCallback)(()=>{eY.set(f.key,"true",{expires:f.daysToExpire,sameSite:"Strict"}),l.filter(e=>{var t;return null==(t=e.context)?void 0:t.includes(e1.onUnsubscribe)}).forEach(eX),s(!0)},[f?.key]),m=(0,D.useCallback)(()=>{eY.remove(f?.key,{sameSite:"Strict"}),window.onbeforeunload=null,i(!1),s(!1)},[f?.key]),v=(0,D.useCallback)(()=>{m(),r(t)},[]),g=(0,D.useCallback)(e=>{let t=l.find(t=>t.id===e.id),n=tt(te({},e),{context:e?.context||[]});if(t){l[l.indexOf(t)]=n;return}l.push(n)},[]),y=(0,D.useCallback)((e=e2)=>{m(),r(t=>tt(te(te({},t||{}),e||{}),{cookie:te(te({},t?.cookie||{}),e?.cookie||{}),desktop:te(te({},t?.desktop||{}),e?.desktop||{}),mobile:te(te({},t?.mobile||{}),e?.mobile||{})}))},[n]);return(0,D.useEffect)(()=>{s("true"===eY.get(f.key))},[]),(0,D.useEffect)(()=>{if(eK()){let{execute:e,abort:t}=e0(p,1e3*c?.delayInSecondsToTrigger);if(u.current){eZ(e);return}return eK()&&c?.triggerOnIdle&&(eZ(e),eJ(e)),()=>{t(),eZ(e)}}if(eG()){let{execute:e,abort:t}=e0(p,1e3*d?.delayInSecondsToTrigger);return null!=d&&d.triggerOnIdle&&eJ(e),null!=d&&d.triggerOnMouseLeave&&document.body.addEventListener("mouseleave",p),null!=d&&d.useBeforeUnload&&(window.onbeforeunload=()=>{if(!u.current)return p(),""}),()=>{t(),eZ(e),document.body.removeEventListener("mouseleave",p)}}}),{settings:n,resetState:m,isTriggered:a,unsubscribe:h,resetSettings:v,updateSettings:y,isUnsubscribed:o,registerHandler:g,willBeTriggered:!(o||a)}}({cookie:{key:"_cm_exit",daysToExpire:0}}),[h,m]=(0,D.useState)(5e3),[v,g]=(0,D.useState)([]),[y,b]=(0,D.useState)(void 0),[w,_]=(0,D.useState)(null),[k,x]=(0,D.useState)(!1);console.log("current pageTrigger",v),n("CollectorProvider: user is on mobile?",ra.isMobile),// Removes the intently overlay, if intently is false
(0,D.useEffect)(()=>{if(k)return;n("CollectorProvider: removing intently overlay");let e=setInterval(function(){var t=document.querySelectorAll("div[id=smc-v5-overlay-106412]");Array.prototype.forEach.call(t,function(t){t.parentNode.removeChild(t),n("CollectorProvider: successfully removed intently overlay"),clearInterval(e)})},100);return()=>{clearInterval(e)}},[k]);let S=e=>{if(!e)return null;// Check if the server has provided a trigger for:
// - the type of trigger we want to display (idle, exit, default, etc.)
// - the behaviour of the trigger we want to display (modal, youtube, inverse, etc.)
let r=v.find(n=>n.invocation===e&&t?.find(e=>e.behaviour===n.behaviour));if(n("CollectorProvider: available triggers include: ",v),n("CollectorProvider: attempting to show displayTrigger",e,r),!r)return a("No trigger found for displayTrigger",e),null;n("CollectorProvider: available handlers include: ",t),n("CollectorProvider: trigger to match is: ",r);// Now grab the handler for the trigger (this could be optimised with a map)
let i=t?.find(e=>e.behaviour===r.behaviour);return(n("CollectorProvider: attempting to show trigger",r,i),i)?i.invoke?(d("trigger_displayed",{triggerId:r.id,triggerType:r.invocation,triggerBehaviour:r.behaviour}),i.invoke(r)):(a("No invoke method found for handler",i),null):(a("No handler found for trigger",r),null)},E=(0,D.useCallback)(()=>{!y&&u&&(n("CollectorProvider: attempting to fire idle trigger"),b("INVOCATION_IDLE_TIME"))},[v,y]),C=(0,D.useCallback)(()=>{n("CollectorProvider: attempting to fire exit trigger"),b("INVOCATION_EXIT_INTENT")},[]);(0,D.useEffect)(()=>{l&&(ra.isMobile||(n("CollectorProvider: attempting to register exit trigger"),p({id:"clientTrigger",handler:C})))},[]);let T=(0,D.useCallback)(()=>{n("CollectorProvider: resetting displayTrigger"),b(void 0)},[]);// @todo this should be invoked when booted
// and then on any window page URL changes.
(0,D.useEffect)(()=>{if(!o){n("CollectorProvider: Not yet collecting, awaiting boot");return}let e=setTimeout(()=>{if(!c.id){n("CollectorProvider: Not yet collecting, awaiting visitor ID");return}n("CollectorProvider: collecting data");let e=new URLSearchParams(window.location.search).toString().split("&").reduce((e,t)=>{let[n,r]=t.split("=");return n&&(e[n]=r),e},{});f({appId:i,visitor:c,page:{url:window.location.href,path:window.location.pathname,title:document.title,params:e},referrer:{url:document.referrer,title:"",utm:{// eslint-disable-next-line camelcase
source:e?.utm_source,// eslint-disable-next-line camelcase
medium:e?.utm_medium,// eslint-disable-next-line camelcase
campaign:e?.utm_campaign,// eslint-disable-next-line camelcase
term:e?.utm_term,// eslint-disable-next-line camelcase
content:e?.utm_content}}}).then(async e=>{let t=await e.json();n("Sent collector data, retrieved:",t),// Set IdleTimer
// @todo turn this into the dynamic value
m(5e3),g(t?.pageTriggers?.filter(e=>ra.isMobile&&"INVOCATION_IDLE_TIME"===e.invocation||!ra.isMobile&&"INVOCATION_EXIT_INTENT"===e.invocation)||[]),t.intently?(// show intently overlay here
n("CollectorProvider: user is in Intently cohort"),x(!0)):(// remove intently overlay here
n("CollectorProvider: user is in Fingerprint cohort"),x(!1))}).catch(e=>{a("failed to store collected data",e)}),n("CollectorProvider: collected data")},s);return()=>{clearTimeout(e)}},[o,c]),(0,D.useEffect)(()=>{if(w)return()=>clearTimeout(w)},[w]);let O=/*@__PURE__*/r(D).useMemo(()=>S(y),[S,y]);return /*@__PURE__*/r(D).createElement(e$,{timeout:h,onPresenceChange:e=>{"active"===e.type&&(// clear interval regardless a value is present or not.
// @ts-ignore
clearTimeout(w),_(null)),n("presence changed",e)},onIdle:E},/*@__PURE__*/r(D).createElement(a3.Provider,{value:{resetDisplayTrigger:T,setTrigger:e=>{n("CollectorProvider: manually setting trigger",e),g([...v,e]),b(e.invocation)}}},e,O))},a3=/*#__PURE__*/(0,D.createContext)({resetDisplayTrigger:()=>{},setTrigger:()=>{}});var D=I("exYeM");let a5=(0,D.createContext)(null),a4={didCatch:!1,error:null};class a6 extends D.Component{constructor(e){super(e),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=a4}static getDerivedStateFromError(e){return{didCatch:!0,error:e}}resetErrorBoundary(){let{error:e}=this.state;if(null!==e){for(var t,n,r=arguments.length,a=Array(r),i=0;i<r;i++)a[i]=arguments[i];null===(t=(n=this.props).onReset)||void 0===t||t.call(n,{args:a,reason:"imperative-api"}),this.setState(a4)}}componentDidCatch(e,t){var n,r;null===(n=(r=this.props).onError)||void 0===n||n.call(r,e,t)}componentDidUpdate(e,t){let{didCatch:n}=this.state,{resetKeys:r}=this.props;// There's an edge case where if the thing that triggered the error happens to *also* be in the resetKeys array,
// we'd end up resetting the error boundary immediately.
// This would likely trigger a second error to be thrown.
// So we make sure that we don't check the resetKeys on the first call of cDU after the error is set.
if(n&&null!==t.error&&function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return e.length!==t.length||e.some((e,n)=>!Object.is(e,t[n]))}(e.resetKeys,r)){var a,i;null===(a=(i=this.props).onReset)||void 0===a||a.call(i,{next:r,prev:e.resetKeys,reason:"keys"}),this.setState(a4)}}render(){let{children:e,fallbackRender:t,FallbackComponent:n,fallback:r}=this.props,{didCatch:a,error:i}=this.state,o=e;if(a){let e={error:i,resetErrorBoundary:this.resetErrorBoundary};if((0,D.isValidElement)(r))o=r;else if("function"==typeof t)o=t(e);else if(n)o=(0,D.createElement)(n,e);else throw i}return(0,D.createElement)(a5.Provider,{value:{didCatch:a,error:i,resetErrorBoundary:this.resetErrorBoundary}},o)}}var D=(I("exYeM"),I("exYeM"));let a8=()=>(0,D.useContext)(a3),a7=({trigger:e})=>{let{resetDisplayTrigger:t}=a8(),[n,a]=(0,D.useState)(!0),[i,o]=(0,D.useState)(!1),s=()=>{t(),a(!1)};return((0,D.useEffect)(()=>{let e=`
  @charset "UTF-8";
  @import "https://fonts.smct.co/Din/font.css";
  .variant-bg,
  .variant-overlay-outer,
  .variant-bar,
  .variant-final-message,
  .variant-success-message {
    display: none;
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .variant-bg,
  .variant-bar {
    z-index: 99999999999;
  }
  .variant-bar,
  .variant-handle,
  .variant-final-message,
  .variant-success-message-inner,
  .variant-overlay-inner {
    background-color: rgba(0, 0, 0, 1);
  }
  .variant-bar,
  .variant-option,
  .variant-handle,
  .variant-final-message,
  .variant-text-outer > .variant-text,
  a.variant-link {
    color: #fff;
  }
  .variant-bg,
  .variant-bg * {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .variant-bg * {
    line-height: 100%;
  }
  .variant-overlay-inner,
  .variant-input,
  .variant-text,
  .variant-text-outer,
  .variant-item,
  .variant-progress,
  .variant-panel .variant-bg,
  .variant-handle > span,
  .variant-loader,
  .variant-loader-single,
  .variant-loader-double,
  .variant-option,
  .variant-long-close {
    display: block;
  }
  .variant-text-outer,
  .variant-option {
    width: 50%;
    min-width: 280px;
    margin: auto;
  }
  .variant-input {
    background-color: rgba(255, 255, 255, 0.8);
  }
  .variant-bg {
    background-color: rgba(0, 0, 0, 0.6);
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: scroll;
  }
  .variant-overlay-outer {
    position: relative;
    transition: height 0.2s ease;
  }
  .variant-overlay-inner {
    width: 700px;
    min-height: 400px;
    position: relative;
    margin: 10% auto;
    transition: all 0.2s ease;
    padding: 10px 10px 30px;
    min-width: 300px;
  }
  .variant-close {
    border-radius: 50%;
    color: #333;
    cursor: pointer;
    display: block;
    font-size: 20px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
    position: absolute;
    right: 10px;
    text-align: center;
    top: 10px;
    width: 30px;
    z-index: 100;
  }
  .variant-close a {
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
  }
  .variant-close:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
  .variant-close-safe {
    text-shadow: 1px 1px 1px #000;
    color: #fff;
    width: 100%;
    text-align: center;
    cursor: pointer;
    display: none;
    position: fixed;
    bottom: 30px;
    left: 0;
  }
  .variant-close-safe a {
    color: #fff !important;
  }
  .variant-closer {
    cursor: pointer;
  }
  .variant-long-close {
    font-size: 14px;
    position: absolute;
    bottom: 10px;
    width: 100%;
    left: 0;
    text-align: center;
  }
  .variant-long-close a.variant-link {
    width: auto;
  }
  a.variant-link {
    display: inline-block;
    text-decoration: none;
    height: 100%;
    width: 100%;
  }
  .variant-input,
  .variant-button,
  .variant-reveal {
    width: 100%;
  }
  .variant-button,
  .variant-cover {
    background: #333;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .variant-input {
    color: #000;
    text-align: center;
    border: 1px solid #333;
    margin: 10px auto;
    padding: 10px;
  }
  .variant-input::-webkit-input-placeholder,
  .variant-input:-moz-placeholder,
  .variant-input::-moz-placeholder,
  .variant-input:-ms-input-placeholder {
    color: #ccc;
    text-transform: uppercase;
  }
  .variant-input:focus {
    outline: none;
  }
  .variant-button {
    border: medium none;
    color: #fff;
    outline: medium none;
    display: block;
    margin: 10px auto;
    font-size: 20px;
    padding: 10px;
    cursor: pointer;
  }
  .variant-reveal {
    display: block;
    margin: 10px auto;
    position: relative;
    text-align: center;
  }
  .variant-cover,
  .variant-code {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 10px;
    font-size: 20px;
  }
  .variant-cover {
    z-index: 2;
    color: #fff;
    padding: 11px;
    cursor: pointer;
  }
  .variant-button:hover,
  .variant-cover:hover {
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .variant-code {
    z-index: 1;
    border: 1px solid #333;
    background: rgba(255, 255, 255, 0.8);
    color: #333;
    font-weight: 700;
    -moz-user-select: text;
    -webkit-user-select: text;
    -ms-user-select: text;
    user-select: text;
  }
  .variant-text {
    text-align: center;
    font-size: 20px;
  }
  .variant-text2 {
    font-size: 40px;
    font-weight: 700;
  }
  .variant-img-outer {
    position: relative;
    width: 100%;
    display: block;
  }
  .variant-img {
    display: block;
    width: 100%;
  }
  .variant-img img {
    border: medium none;
    display: block;
    margin: auto;
    outline: medium none;
    max-width: 100%;
  }
  .variant-clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
  }
  .variant-clearfix {
    display: inline-block;
    height: 1%;
    display: block;
  }
  .variant-item {
    height: 80px;
    padding: 10px;
    border-bottom: 1px dashed #ccc;
  }
  .variant-item .variant-item-img {
    display: inline-block;
    text-align: center;
  }
  .variant-item .variant-item-img img {
    max-width: 60px;
    max-height: 60px;
  }
  .variant-item .variant-title {
    font-weight: 700;
    display: inline-block;
  }
  .variant-item .variant-price {
    display: inline-block;
  }
  .variant-item .variant-qty {
    display: inline-block;
  }
  .variant-progress {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 0;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1) inset;
    height: 21px;
    margin-bottom: 21px;
    overflow: hidden;
    width: 100%;
  }
  .variant-progress-bar {
    background-color: #007932;
    box-shadow: 0 -1px 0 rgba(0, 0, 0, 0.15) inset;
    color: #fff;
    float: left;
    font-size: 12px;
    height: 100%;
    line-height: 21px;
    text-align: center;
    transition: width 0.6s ease 0s;
    width: 0;
  }
  .variant-progress .variant-progress-bar {
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.15) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.15) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    animation: 0.5s linear 0s normal none infinite running
      .variant-progress-bar-stripes;
  }
  @-webkit-keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  @-o-keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  @keyframes .variant-progress-bar-stripes {
    from {
      background-position: 40px 0;
    }
    to {
      background-position: 0 0;
    }
  }
  .variant-overlay {
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.1) inset;
  }
  .variant-overlay:before,
  .variant-overlay:after {
    content: "";
    position: absolute;
    z-index: -1;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
    top: 0;
    bottom: 0;
    left: 10px;
    right: 10px;
    border-radius: 100px / 10px;
  }
  .variant-overlay:after {
    right: 10px;
    left: auto;
    transform: skew(8deg) rotate(3deg);
  }
  .variant-panel .variant-bg {
    width: 0;
    height: 100%;
    position: fixed;
    z-index: 1001;
    top: 0;
    background-color: #111;
    padding: 0;
    left: 0;
    bottom: 0;
    right: 0;
    color: #fff;
    overflow-x: hidden;
    overflow-y: scroll;
    transition: width 0.5s;
  }
  .variant-panel-body-cover {
    position: fixed;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: none;
  }
  .variant-panel.variant-panel-left .variant-bg {
    right: auto;
  }
  .variant-panel.variant-panel-right .variant-bg {
    left: auto;
  }
  .variant-panel .variant-overlay-inner {
    width: 90%;
  }
  .variant-input-group {
    display: block;
    text-align: center;
  }
  .variant-input-group input[type="checkbox"],
  .variant-input-group input[type="radio"] {
    margin-right: 3px;
    margin-left: 10px;
  }
  .variant-input-error ::-webkit-input-placeholder,
  .variant-input-error :-moz-placeholder,
  .variant-input-error ::-moz-placeholder,
  .variant-input-error :-ms-input-placeholder {
    color: #d30003;
  }
  .variant-input-error label {
    color: #d30003;
  }
  .variant-input-error input,
  .variant-input-error select,
  .variant-input-error textarea {
    border-color: #d30003;
  }
  .variant-bar,
  .variant-handle {
    box-shadow: 0 6px 6px rgba(0, 0, 0, 0.3);
    border-bottom-left-radius: 3px;
    border-bottom-right-radius: 3px;
  }
  .variant-bar {
    display: none;
    position: fixed;
    top: 0;
    left: 25%;
    right: 25%;
    width: 50%;
    font-weight: 700;
    font-size: 16px;
    text-shadow: none;
    text-align: center;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
  }
  @media (max-width: 500px) {
    .variant-bar {
      width: 80%;
      left: 10%;
    }
  }
  .variant-bar-close {
    cursor: pointer;
    height: 10px;
    line-height: 10px;
    position: absolute;
    right: 10px;
    top: 10px;
    width: 10px;
  }
  .variant-handle {
    position: absolute;
    width: 50px;
    margin-left: -25px;
    height: 20px;
    left: 50%;
    bottom: -20px;
    cursor: pointer;
    line-height: 12px;
    letter-spacing: -2px;
  }
  .variant-handle > span {
    position: absolute;
    width: 60%;
    left: 20%;
    height: 2px;
    background: #fff;
  }
  .variant-bar1 {
    top: 20%;
  }
  .variant-bar2 {
    top: 40%;
  }
  .variant-bar3 {
    top: 60%;
  }
  .variant-arrow-up {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid #000;
  }
  .variant-arrow-down {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000;
  }
  .variant-arrow-right {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 5px solid #000;
  }
  .variant-arrow-left {
    width: 0;
    height: 0;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-right: 5px solid #000;
  }
  .variant-preview {
    position: fixed;
    top: 20px;
    left: 50%;
    margin-left: -160px;
    width: 320px;
    padding: 5px 10px;
    background: #ff0;
    color: #000;
    font-family: Gotham, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
  }
  .variant-preview-close {
    font-size: 7px;
    height: 3px;
    position: absolute;
    right: 4px;
    top: 0;
    width: 3px;
  }
  .variant-preview .variant-arrow-up {
    position: absolute;
    top: -20px;
    left: 50%;
    margin-left: -10px;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #ff0;
  }
  .variant-notices {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    transition: height 0.3s ease;
  }
  .variant-notice-box {
    padding: 5px 10px;
    background: #ec6952;
    font-size: 12px;
    text-align: left;
    border-radius: 5px;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    cursor: pointer;
    min-height: 30px;
    min-width: 100px;
    max-width: 500px;
    width: auto;
    margin-bottom: 5px;
    color: #fff;
    float: right;
    clear: both;
    z-index: 100;
    transition: all 0.5s ease;
    overflow: hidden;
  }
  .variant-notice-box.success {
    background: #24a233;
  }
  .variant-notice-box.warning {
    background: #cf9d0f;
  }
  .variant-notice-box.danger {
    background: #d30003;
  }
  @media screen {
    .variant-preloader {
      position: fixed;
      left: -9999px;
      top: -9999px;
    }
    .variant-preloader img {
      display: block;
    }
  }
  @media print {
    .variant-preloader,
    .variant-preloader img {
      visibility: hidden;
      display: none;
    }
  }
  .variant-final-message {
    border-radius: 2px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
    bottom: 10px;
    font-size: 16px;
    padding: 10px 20px;
    position: fixed;
    right: 10px;
    z-index: 1e15;
  }
  .variant-final-message-close {
    position: absolute;
    top: 3px;
    right: 1px;
    width: 10px;
    height: 10px;
    cursor: pointer;
    font-size: 10px;
    opacity: 0.5;
  }
  .variant-final-message .variant-select {
    font-weight: 700;
  }
  .variant-final-message:hover .variant-final-message-close {
    opacity: 1;
  }
  .variant-success-message {
    position: absolute;
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align: center;
  }
  .variant-success-message-inner {
    background: #08ad00 none repeat scroll 0 0;
    border-radius: 5px;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
    color: #fff;
    display: inline-block;
    font-size: 30px;
    margin: 20% auto auto;
    padding: 10px 30px;
    position: relative;
  }
  .variant-success-close {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    font-size: 12px;
  }
  @-webkit-keyframes .variant-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes .variant-spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes .variant-pulse {
    50% {
      background: #fff;
    }
  }
  @keyframes .variant-pulse {
    50% {
      background: #fff;
    }
  }
  .variant-loader-bg,
  .variant-dc-placeholder {
    position: absolute;
    top: 10%;
    left: 50%;
    background: rgba(0, 0, 0, 0.8);
    width: 60px;
    margin-left: -30px;
    height: 60px;
    z-index: 10;
    border-radius: 10px;
    display: none;
  }
  .variant-loader,
  .variant-loader-single,
  .variant-loader-double {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin: 5px;
    border: 0.25rem solid rgba(255, 255, 255, 0.2);
    border-top-color: #fff;
    -webkit-animation: variant-spin 1s infinite linear;
    animation: variant-spin 1s infinite linear;
  }
  .variant-loader-double {
    border-style: double;
    border-width: 0.5rem;
  }
  .variant-loader-pulse {
    -webkit-animation: variant-pulse 750ms infinite;
    animation: variant-pulse 750ms infinite;
    -webkit-animation-delay: 250ms;
    animation-delay: 250ms;
    height: 30px;
    left: 25px;
    position: absolute;
    top: 14px;
    width: 10px;
  }
  .variant-loader-pulse:before,
  .variant-loader-pulse:after {
    content: "";
    position: absolute;
    display: block;
    height: 16px;
    width: 6px;
    top: 50%;
    background: rgba(255, 255, 255, 0.2);
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    -webkit-animation: variant-pulse 750ms infinite;
    animation: variant-pulse 750ms infinite;
  }
  .variant-loader-pulse:before {
    left: -12px;
  }
  .variant-loader-pulse:after {
    left: 16px;
    -webkit-animation-delay: 500ms;
    animation-delay: 500ms;
  }
  .variant-loader-bg[data-theme="white"],
  .variant-dc-placeholder {
    background: rgba(255, 255, 255, 0.8);
  }
  .variant-loader-bg[data-theme="white"] .variant-loader-single,
  .variant-dc-placeholder .variant-loader-single,
  .variant-loader-bg[data-theme="white"] .variant-loader-double,
  .variant-dc-placeholder .variant-loader-double,
  .variant-loader-bg[data-theme="white"] .variant-loader-pulse,
  .variant-dc-placeholder .variant-loader-pulse {
    border-color: rgba(0, 0, 0, 0.2);
    border-top-color: #000;
  }
  .variant-terms {
    background-color: #fff;
    border: 1px solid #333;
    border-radius: 3px;
    bottom: 5%;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.4);
    left: 5%;
    padding: 10px;
    position: absolute;
    right: 5%;
    top: 5%;
    z-index: 101;
    display: none;
  }
  .variant-terms-header,
  .variant-terms-para,
  .variant-terms-close,
  .variant-terms-close-x {
    color: #333;
    display: block;
  }
  .variant-terms-scroller {
    position: absolute;
    top: 10px;
    left: 10px;
    right: 10px;
    bottom: 30px;
    overflow: auto;
  }
  .variant-terms-header {
    font-size: 20px;
    font-weight: 700;
    margin: 5px 0;
    text-align: center;
  }
  .variant-terms-para {
    margin: 5px 0;
    font-size: 12px;
  }
  .variant-terms-close {
    bottom: 10px;
    cursor: pointer;
    left: 10px;
    position: absolute;
    right: 10px;
    text-align: center;
  }
  .variant-show-terms,
  .variant-show-terms {
    text-decoration: underline;
    cursor: pointer;
  }
  .variant-terms[data-theme="dark"] {
    background-color: #333;
  }
  .variant-terms[data-theme="dark"] .variant-terms-header,
  .variant-terms[data-theme="dark"] .variant-terms-para,
  .variant-terms[data-theme="dark"] .variant-terms-close,
  .variant-terms[data-theme="dark"] .variant-terms-close-x {
    color: #fff;
  }
  .variant-terms-close-x {
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    opacity: 0.7;
    -webkit-transition: all 0.25s ease-in-out;
    -ms-transition: all 0.25s ease-in-out;
    -o-transition: all 0.25s ease-in-out;
    -moz-transition: all 0.25s ease-in-out;
    transition: transform all 0.25s ease-in-out;
  }
  .variant-terms-close-x:hover {
    opacity: 1;
    -webkit-transform: rotate(180deg) scale(1.3);
    -ms-transform: rotate(180deg) scale(1.3);
    -o-transform: rotate(180deg) scale(1.3);
    -moz-transform: rotate(180deg) scale(1.3);
    transform: rotate(180deg) scale(1.3);
  }
  .variant-cp {
    -youbkit-touch-callout: none;
    -youbkit-user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .variant-cp,
  .variant-cp-msg {
    display: none;
  }
  .variant-hidden-consents {
    opacity: 0;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 1px;
    height: 1px;
    visibility: hidden;
  }
  .variant-requestNotifications .variant-agree-yes,
  .variant-requestNotifications .variant-agree-no {
    display: none;
  }
  .variant-notices {
    padding: 10px;
    right: 20px;
    left: auto;
    max-width: 300px;
    z-index: 100;
  }
  .variant-dc-placeholder {
    display: block;
    height: 30px;
    width: 30px;
    top: 3px;
  }
  .variant-dc-placeholder > * {
    height: 20px;
    width: 20px;
  }
  .variant-shake-msg {
    display: none;
  }
  .variant-animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }
  .variant-animated.variant-infinite {
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
  }
  .variant-animated.variant-hinge {
    -webkit-animation-duration: 2s;
    animation-duration: 2s;
  }
  .variant-animated.variant-bounceIn,
  .variant-animated.variant-bounceOut,
  .variant-animated.variant-flipOutX,
  .variant-animated.variant-flipOutY {
    -webkit-animation-duration: 0.75s;
    animation-duration: 0.75s;
  }
  @-webkit-keyframes .variant-fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes .variant-fadeIn {
    0% {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  .variant-fadeIn {
    -webkit-animation-name: variant-fadeIn;
    animation-name: variant-fadeIn;
  }
  @-webkit-keyframes .variant-bounceInDown {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInDown {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -3000px, 0);
      transform: translate3d(0, -3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, 25px, 0);
      transform: translate3d(0, 25px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, 5px, 0);
      transform: translate3d(0, 5px, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInDown {
    -webkit-animation-name: variant-bounceInDown;
    animation-name: variant-bounceInDown;
  }
  .variant-animDelay2 {
    -webkit-animation-delay: 0.2s !important;
    -moz-animation-delay: 0.2s !important;
    -ms-animation-delay: 0.2s !important;
    -o-animation-delay: 0.2s !important;
    animation-delay: 0.2s !important;
  }
  .variant-animDelay6 {
    -webkit-animation-delay: 0.6s !important;
    -moz-animation-delay: 0.6s !important;
    -ms-animation-delay: 0.6s !important;
    -o-animation-delay: 0.6s !important;
    animation-delay: 0.6s !important;
  }
  @-webkit-keyframes .variant-bounceInRight {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInRight {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(3000px, 0, 0);
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(-25px, 0, 0);
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(-5px, 0, 0);
      transform: translate3d(-5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInRight {
    -webkit-animation-name: variant-bounceInRight;
    animation-name: variant-bounceInRight;
  }
  .variant-animDelay8 {
    -webkit-animation-delay: 0.8s !important;
    -moz-animation-delay: 0.8s !important;
    -ms-animation-delay: 0.8s !important;
    -o-animation-delay: 0.8s !important;
    animation-delay: 0.8s !important;
  }
  .variant-animDelay10 {
    -webkit-animation-delay: 1s !important;
    -moz-animation-delay: 1s !important;
    -ms-animation-delay: 1s !important;
    -o-animation-delay: 1s !important;
    animation-delay: 1s !important;
  }
  .variant-animDelay12 {
    -webkit-animation-delay: 1.2s !important;
    -moz-animation-delay: 1.2s !important;
    -ms-animation-delay: 1.2s !important;
    -o-animation-delay: 1.2s !important;
    animation-delay: 1.2s !important;
  }
  .variant-animDelay4 {
    -webkit-animation-delay: 0.4s !important;
    -moz-animation-delay: 0.4s !important;
    -ms-animation-delay: 0.4s !important;
    -o-animation-delay: 0.4s !important;
    animation-delay: 0.4s !important;
  }
  @-webkit-keyframes .variant-bounceInLeft {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-bounceInLeft {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-3000px, 0, 0);
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(25px, 0, 0);
      transform: translate3d(25px, 0, 0);
    }
    75% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      -webkit-transform: translate3d(5px, 0, 0);
      transform: translate3d(5px, 0, 0);
    }
    to {
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-bounceInLeft {
    -webkit-animation-name: variant-bounceInLeft;
    animation-name: variant-bounceInLeft;
  }
  @-webkit-keyframes .variant-fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInLeft {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInLeft {
    -webkit-animation-name: variant-fadeInLeft;
    animation-name: variant-fadeInLeft;
  }
  @-webkit-keyframes .variant-fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInRight {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0);
      transform: translate3d(100%, 0, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInRight {
    -webkit-animation-name: variant-fadeInRight;
    animation-name: variant-fadeInRight;
  }
  @-webkit-keyframes .variant-bounceInUp {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
  @keyframes .variant-bounceInUp {
    0%,
    60%,
    75%,
    90%,
    to {
      -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
      animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 3000px, 0);
      transform: translate3d(0, 3000px, 0);
    }
    60% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    75% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    90% {
      -webkit-transform: translate3d(0, -5px, 0);
      transform: translate3d(0, -5px, 0);
    }
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
  }
  .variant-bounceInUp {
    -webkit-animation-name: variant-bounceInUp;
    animation-name: variant-bounceInUp;
  }
  .variant-animDelay7 {
    -webkit-animation-delay: 0.7s !important;
    -moz-animation-delay: 0.7s !important;
    -ms-animation-delay: 0.7s !important;
    -o-animation-delay: 0.7s !important;
    animation-delay: 0.7s !important;
  }
  .variant-animDelay9 {
    -webkit-animation-delay: 0.9s !important;
    -moz-animation-delay: 0.9s !important;
    -ms-animation-delay: 0.9s !important;
    -o-animation-delay: 0.9s !important;
    animation-delay: 0.9s !important;
  }
  @-webkit-keyframes .variant-fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInUp {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInUp {
    -webkit-animation-name: variant-fadeInUp;
    animation-name: variant-fadeInUp;
  }
  .variant-animDelay14 {
    -webkit-animation-delay: 1.4s !important;
    -moz-animation-delay: 1.4s !important;
    -ms-animation-delay: 1.4s !important;
    -o-animation-delay: 1.4s !important;
    animation-delay: 1.4s !important;
  }
  .variant-animDelay1 {
    -webkit-animation-delay: 0.1s !important;
    -moz-animation-delay: 0.1s !important;
    -ms-animation-delay: 0.1s !important;
    -o-animation-delay: 0.1s !important;
    animation-delay: 0.1s !important;
  }
  @-webkit-keyframes .variant-fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  @keyframes .variant-fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    to {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }
  .variant-fadeInDown {
    -webkit-animation-name: variant-fadeInDown;
    animation-name: variant-fadeInDown;
  }
  @-webkit-keyframes .variant-fadeOutUp {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  @keyframes .variant-fadeOutUp {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
  }
  .variant-fadeOutUp {
    -webkit-animation-name: variant-fadeOutUp;
    animation-name: variant-fadeOutUp;
  }
  @-webkit-keyframes .variant-fadeOutDown {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
  @keyframes .variant-fadeOutDown {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }
  .variant-fadeOutDown {
    -webkit-animation-name: variant-fadeOutDown;
    animation-name: variant-fadeOutDown;
  }
  @-webkit-keyframes .variant-fadeOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes .variant-fadeOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .variant-fadeOut {
    -webkit-animation-name: variant-fadeOut;
    animation-name: variant-fadeOut;
  }
  @-webkit-keyframes .variant-bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -2000px, 0);
      transform: translate3d(0, -2000px, 0);
    }
  }
  @keyframes .variant-bounceOutUp {
    20% {
      -webkit-transform: translate3d(0, -10px, 0);
      transform: translate3d(0, -10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, 20px, 0);
      transform: translate3d(0, 20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, -2000px, 0);
      transform: translate3d(0, -2000px, 0);
    }
  }
  .variant-bounceOutUp {
    -webkit-animation-name: variant-bounceOutUp;
    animation-name: variant-bounceOutUp;
  }
  @-webkit-keyframes .variant-bounceOutDown {
    20% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 2000px, 0);
      transform: translate3d(0, 2000px, 0);
    }
  }
  @keyframes .variant-bounceOutDown {
    20% {
      -webkit-transform: translate3d(0, 10px, 0);
      transform: translate3d(0, 10px, 0);
    }
    40%,
    45% {
      opacity: 1;
      -webkit-transform: translate3d(0, -20px, 0);
      transform: translate3d(0, -20px, 0);
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 2000px, 0);
      transform: translate3d(0, 2000px, 0);
    }
  }
  .variant-bounceOutDown {
    -webkit-animation-name: variant-bounceOutDown;
    animation-name: variant-bounceOutDown;
  }
  @-webkit-keyframes .variant-rubberBand {
    0% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    to {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  @keyframes .variant-rubberBand {
    0% {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
    30% {
      -webkit-transform: scale3d(1.25, 0.75, 1);
      transform: scale3d(1.25, 0.75, 1);
    }
    40% {
      -webkit-transform: scale3d(0.75, 1.25, 1);
      transform: scale3d(0.75, 1.25, 1);
    }
    50% {
      -webkit-transform: scale3d(1.15, 0.85, 1);
      transform: scale3d(1.15, 0.85, 1);
    }
    65% {
      -webkit-transform: scale3d(0.95, 1.05, 1);
      transform: scale3d(0.95, 1.05, 1);
    }
    75% {
      -webkit-transform: scale3d(1.05, 0.95, 1);
      transform: scale3d(1.05, 0.95, 1);
    }
    to {
      -webkit-transform: scaleX(1);
      transform: scaleX(1);
    }
  }
  .variant-rubberBand {
    -webkit-animation-name: variant-rubberBand;
    animation-name: variant-rubberBand;
  }
  @-webkit-keyframes .variant-shake {
    0%,
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
  }
  @keyframes .variant-shake {
    0%,
    to {
      -webkit-transform: translateZ(0);
      transform: translateZ(0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
      -webkit-transform: translate3d(-10px, 0, 0);
      transform: translate3d(-10px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
      -webkit-transform: translate3d(10px, 0, 0);
      transform: translate3d(10px, 0, 0);
    }
  }
  .variant-shake {
    -webkit-animation-name: variant-shake;
    animation-name: variant-shake;
  }
  @-webkit-keyframes .variant-rollOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);
      transform: translate3d(100%, 0, 0) rotate(120deg);
    }
  }
  @keyframes .variant-rollOut {
    0% {
      opacity: 1;
    }
    to {
      opacity: 0;
      -webkit-transform: translate3d(100%, 0, 0) rotate(120deg);
      transform: translate3d(100%, 0, 0) rotate(120deg);
    }
  }
  .variant-rollOut {
    -webkit-animation-name: variant-rollOut;
    animation-name: variant-rollOut;
  }
  .variant-bg * {
    font-family: "DINCompPro-CondMedium";
  }
  .variant-overlay-inner {
    background-size: cover;
    width: 420px;
    min-height: 520px;
    border-radius: 5px;
    padding-bottom: 0;
    border: 2px solid #fff;
  }
  .variant-text-outer,
  .variant-option {
    width: 380px;
    margin: auto;
  }
  .variant-text1,
  .variant-text2 {
    font-size: 26px;
    font-weight: 400;
    margin: 15px auto;
    text-align: center;
    color: #4e5255;
    text-transform: uppercase;
  }
  .variant-text1 {
    font-size: 34px;
    font-weight: 600;
    margin: 25px auto 15px;
    color: #016543;
  }
  .variant-button {
    font-size: 24px;
    padding: 10px;
    text-transform: uppercase;
    margin: 300px auto auto;
    color: #fff;
    width: 340px;
    transition: all 0.5s ease !important;
  }
  .variant-button:hover {
    background-color: #016543;
  }
  .variant-close {
    font-size: 14px;
    background-color: #fff;
    top: -10px;
    right: -10px;
  }
  .variant-close a.variant-link {
    color: #000;
  }
  @media screen and (max-width: 420px) {
    .variant-close-safe {
      display: block;
    }
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.95);
      transform-origin: 5% 0 0;
    }
    .variant-overlay-outer {
      height: 420px;
    }
  }
  @media screen and (max-width: 412px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.93);
      transform-origin: 4.9% 0 0;
    }
    .variant-overlay-outer {
      height: 412px;
    }
  }
  @media screen and (max-width: 403px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.91);
      transform-origin: 4.8% 0 0;
    }
    .variant-overlay-outer {
      height: 403px;
    }
  }
  @media screen and (max-width: 395px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.89);
      transform-origin: 4.7% 0 0;
    }
    .variant-overlay-outer {
      height: 395px;
    }
  }
  @media screen and (max-width: 386px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.87);
      transform-origin: 4.6% 0 0;
    }
    .variant-overlay-outer {
      height: 386px;
    }
  }
  @media screen and (max-width: 378px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.85);
      transform-origin: 4.5% 0 0;
    }
    .variant-overlay-outer {
      height: 378px;
    }
  }
  @media screen and (max-width: 370px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.84);
      transform-origin: 4.4% 0 0;
    }
    .variant-overlay-outer {
      height: 370px;
    }
  }
  @media screen and (max-width: 361px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.82);
      transform-origin: 4.3% 0 0;
    }
    .variant-overlay-outer {
      height: 361px;
    }
  }
  @media screen and (max-width: 353px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.8);
      transform-origin: 4.2% 0 0;
    }
    .variant-overlay-outer {
      height: 353px;
    }
  }
  @media screen and (max-width: 344px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.78);
      transform-origin: 4.1% 0 0;
    }
    .variant-overlay-outer {
      height: 344px;
    }
  }
  @media screen and (max-width: 336px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.76);
      transform-origin: 4% 0 0;
    }
    .variant-overlay-outer {
      height: 336px;
    }
  }
  @media screen and (max-width: 328px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.74);
      transform-origin: 3.9% 0 0;
    }
    .variant-overlay-outer {
      height: 328px;
    }
  }
  @media screen and (max-width: 319px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.72);
      transform-origin: 3.8% 0 0;
    }
    .variant-overlay-outer {
      height: 319px;
    }
  }
  @media screen and (max-width: 311px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.7);
      transform-origin: 3.7% 0 0;
    }
    .variant-overlay-outer {
      height: 311px;
    }
  }
  @media screen and (max-width: 302px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.68);
      transform-origin: 3.6% 0 0;
    }
    .variant-overlay-outer {
      height: 302px;
    }
  }
  @media screen and (max-width: 294px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.66);
      transform-origin: 3.5% 0 0;
    }
    .variant-overlay-outer {
      height: 294px;
    }
  }
  @media screen and (max-width: 286px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.65);
      transform-origin: 3.4% 0 0;
    }
    .variant-overlay-outer {
      height: 286px;
    }
  }
  @media screen and (max-width: 277px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.63);
      transform-origin: 3.3% 0 0;
    }
    .variant-overlay-outer {
      height: 277px;
    }
  }
  @media screen and (max-width: 269px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.61);
      transform-origin: 3.2% 0 0;
    }
    .variant-overlay-outer {
      height: 269px;
    }
  }
  @media screen and (max-width: 260px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.59);
      transform-origin: 3.1% 0 0;
    }
    .variant-overlay-outer {
      height: 260px;
    }
  }
  @media screen and (max-width: 252px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.57);
      transform-origin: 3% 0 0;
    }
    .variant-overlay-outer {
      height: 252px;
    }
  }
  @media screen and (max-width: 244px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.55);
      transform-origin: 2.9% 0 0;
    }
    .variant-overlay-outer {
      height: 244px;
    }
  }
  @media screen and (max-width: 235px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.53);
      transform-origin: 2.8% 0 0;
    }
    .variant-overlay-outer {
      height: 235px;
    }
  }
  @media screen and (max-width: 227px) {
    div:not(#smct-overlay-mini-preview) .variant-overlay-inner {
      transform: scale(0.51);
      transform-origin: 2.7% 0 0;
    }
    .variant-overlay-outer {
      height: 227px;
    }
  }
`,t=document.createElement("style");t.type="text/css",t.appendChild(document.createTextNode(e)),document.head.appendChild(t),o(!0)}),n&&i)?/*@__PURE__*/r(D).createElement("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.5)",zIndex:9999}},/*@__PURE__*/r(D).createElement("div",{id:"variant-overlay-106412","data-browser":"firefox","data-device":"desktop"},/*@__PURE__*/r(D).createElement("div",{className:"variant-bg variant-animated variant-fadeIn",style:{display:"block"}},/*@__PURE__*/r(D).createElement("div",{className:"variant-overlay-outer variant-animated variant-bounceInDown variant-animDelay2",style:{display:"block"}},/*@__PURE__*/r(D).createElement("div",{className:"variant-overlay-inner smc_clearfix","data-bgtheme":"dark","data-changes":"variant-overlay-inner|width,background-image,background-color","data-edits":"content6",style:{backgroundImage:`url(${e?.data?.backgroundURL})`,backgroundColor:"#f1f1f1"}},/*@__PURE__*/r(D).createElement("div",{className:"variant-img-outer"},/*@__PURE__*/r(D).createElement("div",{className:"variant-img variant-img1 variant-animated variant-bounceInDown variant-animDelay6","data-changes":".variant-img1|margin-top,margin-bottom,image-upload","data-edits":"content1"}),/*@__PURE__*/r(D).createElement("div",{className:"variant-img variant-img2 variant-animated variant-bounceInRight variant-animDelay8","data-changes":".variant-img2|margin-top,margin-bottom,image-upload","data-edits":"content2"}),/*@__PURE__*/r(D).createElement("div",{className:"variant-img variant-img3 variant-animated variant-bounceInRight variant-animDelay10","data-changes":".variant-img3|margin-top,margin-bottom,image-upload","data-edits":"content3"}),/*@__PURE__*/r(D).createElement("div",{className:"variant-img variant-img4 variant-animated variant-bounceInRight variant-animDelay12","data-changes":".variant-img4|margin-top,margin-bottom,image-upload","data-edits":"content4"})),/*@__PURE__*/r(D).createElement("div",{className:"variant-text-outer"},/*@__PURE__*/r(D).createElement("div",{className:"variant-text variant-text1 variant-animated variant-bounceInDown variant-animDelay4","data-edits":"text1","data-changes":".variant-text1|font-size,color,margin-top,margin-bottom",style:{color:"white",marginTop:40,textShadow:"0 1px 4px #000"}},e?.data?.heading),/*@__PURE__*/r(D).createElement("div",{className:"variant-text variant-text2 variant-animated variant-bounceInRight variant-animDelay6","data-edits":"text2","data-changes":".variant-text2|font-size,color,margin-top,margin-bottom",style:{color:"white",textShadow:"0 1px 4px #000",fontSize:45}},e?.data?.paragraph),/*@__PURE__*/r(D).createElement("div",{className:"variant-text variant-text3 variant-animated variant-bounceInLeft variant-animDelay8","data-edits":"text3","data-changes":".variant-text3|font-size,color,margin-top,margin-bottom"}),/*@__PURE__*/r(D).createElement("div",{className:"variant-text variant-text4 variant-animated variant-bounceInRight variant-animDelay10","data-edits":"text4","data-changes":".variant-text4|font-size,color,margin-top,margin-bottom"})),/*@__PURE__*/r(D).createElement("div",{className:"variant-option variant-clickRedirect",onClick:t=>{t.preventDefault(),e?.data?.buttonURL?window.open(e?.data?.buttonURL):s()}},/*@__PURE__*/r(D).createElement("div",{className:"variant-input-group"},/*@__PURE__*/r(D).createElement("span",{className:"variant-button variant-animated variant-fadeInRight variant-animDelay10","data-edits":"text10","data-changes":".variant-button|font-size,background-color,color"},e?.data?.buttonText))),/*@__PURE__*/r(D).createElement("div",{className:"variant-long-close variant-animated variant-fadeInUp variant-animDelay14","data-engage-class":"variant-engaged"},/*@__PURE__*/r(D).createElement("a",{"data-close-type":"long_close",className:"variant-link variant-closer",href:"#rdl","data-engage-text":"","data-edits":"text7,text11","data-changes":"variant-long-close a.variant-link|font-size,color,margin-top,margin-bottom",onClick:e=>{e.preventDefault(),s()}})),/*@__PURE__*/r(D).createElement("div",{className:"variant-close variant-animated variant-fadeInRight variant-animDelay4 variant-closer"},/*@__PURE__*/r(D).createElement("a",{"data-close-type":"x_close",className:"variant-link",href:"#rdl",onClick:e=>{e.preventDefault(),s()}},"✕")))),/*@__PURE__*/r(D).createElement("div",{className:"variant-close-safe variant-closer"},/*@__PURE__*/r(D).createElement("a",{"data-close-type":"x_close",className:"variant-link",href:"#rdl",onClick:e=>{e.preventDefault(),s()}},"[close]"))))):null},a9=({trigger:e})=>/*@__PURE__*/r(N).createPortal(/*@__PURE__*/r(D).createElement(a7,{trigger:e}),document.body);var D=I("exYeM");let ie=({trigger:e})=>{let[t,n]=(0,D.useState)(!0);return t?/*@__PURE__*/r(D).createElement("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.5)",zIndex:9999}},/*@__PURE__*/r(D).createElement("div",{style:{background:"#fff url('"+e?.brand?.backgroundImage+"') no-repeat center center",position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",backgroundColor:"#fff",borderRadius:"0.5rem",padding:0,boxShadow:"0 0 1rem rgba(0,0,0,0.5)",border:"3px solid white",zIndex:9999}},/*@__PURE__*/r(D).createElement("div",{style:{backgroundColor:e?.brand?.overlayColor,maxWidth:"600px",padding:"2rem",borderRadius:"0.5rem"}},/*@__PURE__*/r(D).createElement("button",{onClick:()=>{n(!1)},style:{position:"absolute",top:"0.5rem",right:"0.5rem",fontSize:"2rem",backgroundColor:e?.brand?.fontColor,color:e?.brand?.primaryColor,border:"none",borderRadius:"0.5rem",padding:"0 1rem"}},"\xd7"),/*@__PURE__*/r(D).createElement("iframe",{src:e?.data?.url,allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",style:{width:"500px",height:"260px",marginTop:"1rem"}})))):null},it=({trigger:e})=>/*@__PURE__*/r(N).createPortal(/*@__PURE__*/r(D).createElement(ie,{trigger:e}),document.body);var D=(I("exYeM"),I("exYeM")),ir=e=>"checkbox"===e.type,ia=e=>e instanceof Date,ii=e=>null==e;let io=e=>"object"==typeof e;var is=e=>!ii(e)&&!Array.isArray(e)&&io(e)&&!ia(e),il=e=>is(e)&&e.target?ir(e.target)?e.target.checked:e.target.value:e,iu=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,ic=(e,t)=>e.has(iu(t)),id=e=>{let t=e.constructor&&e.constructor.prototype;return is(t)&&t.hasOwnProperty("isPrototypeOf")},ip="undefined"!=typeof window&&void 0!==window.HTMLElement&&"undefined"!=typeof document;function ih(e){let t;let n=Array.isArray(e);if(e instanceof Date)t=new Date(e);else if(e instanceof Set)t=new Set(e);else if(!(!(ip&&(e instanceof Blob||e instanceof FileList))&&(n||is(e))))return e;else if(t=n?[]:{},n||id(e))for(let n in e)e.hasOwnProperty(n)&&(t[n]=ih(e[n]));else t=e;return t}var im=e=>Array.isArray(e)?e.filter(Boolean):[],iv=e=>void 0===e,ig=(e,t,n)=>{if(!t||!is(e))return n;let r=im(t.split(/[,[\].]+?/)).reduce((e,t)=>ii(e)?e:e[t],e);return iv(r)||r===e?iv(e[t])?n:e[t]:r},iy=e=>"boolean"==typeof e;let ib={BLUR:"blur",FOCUS_OUT:"focusout"},iw={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},i_={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"};/*@__PURE__*/r(D).createContext(null);var ik=(e,t,n,r=!0)=>{let a={defaultValues:t._defaultValues};for(let i in e)Object.defineProperty(a,i,{get:()=>(t._proxyFormState[i]!==iw.all&&(t._proxyFormState[i]=!r||iw.all),n&&(n[i]=!0),e[i])});return a},ix=e=>is(e)&&!Object.keys(e).length,iS=(e,t,n,r)=>{n(e);let{name:a,...i}=e;return ix(i)||Object.keys(i).length>=Object.keys(t).length||Object.keys(i).find(e=>t[e]===(!r||iw.all))},iE=e=>Array.isArray(e)?e:[e],iC=e=>"string"==typeof e,iT=(e,t,n,r,a)=>iC(e)?(r&&t.watch.add(e),ig(n,e,a)):Array.isArray(e)?e.map(e=>(r&&t.watch.add(e),ig(n,e))):(r&&(t.watchAll=!0),n),iO=e=>/^\w*$/.test(e),iR=e=>im(e.replace(/["|']|\]/g,"").split(/\.|\[/));function iP(e,t,n){let r=-1,a=iO(t)?[t]:iR(t),i=a.length,o=i-1;for(;++r<i;){let t=a[r],i=n;if(r!==o){let n=e[t];i=is(n)||Array.isArray(n)?n:isNaN(+a[r+1])?{}:[]}e[t]=i,e=e[t]}return e}var iI=(e,t,n,r,a)=>t?{...n[e],types:{...n[e]&&n[e].types?n[e].types:{},[r]:a||!0}}:{};let iD=(e,t,n)=>{for(let r of n||Object.keys(e)){let n=ig(e,r);if(n){let{_f:e,...r}=n;if(e&&t(e.name)){if(e.ref.focus){e.ref.focus();break}if(e.refs&&e.refs[0].focus){e.refs[0].focus();break}}else is(r)&&iD(r,t)}}};var iN=e=>({isOnSubmit:!e||e===iw.onSubmit,isOnBlur:e===iw.onBlur,isOnChange:e===iw.onChange,isOnAll:e===iw.all,isOnTouch:e===iw.onTouched}),iL=(e,t,n)=>!n&&(t.watchAll||t.watch.has(e)||[...t.watch].some(t=>e.startsWith(t)&&/^\.\w+/.test(e.slice(t.length)))),iM=(e,t,n)=>{let r=im(ig(e,n));return iP(r,"root",t[n]),iP(e,n,r),e},iA=e=>"file"===e.type,iU=e=>"function"==typeof e,iz=e=>{if(!ip)return!1;let t=e?e.ownerDocument:0;return e instanceof(t&&t.defaultView?t.defaultView.HTMLElement:HTMLElement)},iF=e=>iC(e),ij=e=>"radio"===e.type,iq=e=>e instanceof RegExp;let iB={value:!1,isValid:!1},iV={value:!0,isValid:!0};var iW=e=>{if(Array.isArray(e)){if(e.length>1){let t=e.filter(e=>e&&e.checked&&!e.disabled).map(e=>e.value);return{value:t,isValid:!!t.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!iv(e[0].attributes.value)?iv(e[0].value)||""===e[0].value?iV:{value:e[0].value,isValid:!0}:iV:iB}return iB};let i$={isValid:!1,value:null};var iH=e=>Array.isArray(e)?e.reduce((e,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:e,i$):i$;function iY(e,t,n="validate"){if(iF(e)||Array.isArray(e)&&e.every(iF)||iy(e)&&!e)return{type:n,message:iF(e)?e:"",ref:t}}var iQ=e=>is(e)&&!iq(e)?e:{value:e,message:""},iK=async(e,t,n,r,a)=>{let{ref:i,refs:o,required:s,maxLength:l,minLength:u,min:c,max:d,pattern:f,validate:p,name:h,valueAsNumber:m,mount:v,disabled:g}=e._f,y=ig(t,h);if(!v||g)return{};let b=o?o[0]:i,w=e=>{r&&b.reportValidity&&(b.setCustomValidity(iy(e)?"":e||""),b.reportValidity())},_={},k=ij(i),x=ir(i),S=(m||iA(i))&&iv(i.value)&&iv(y)||iz(i)&&""===i.value||""===y||Array.isArray(y)&&!y.length,E=iI.bind(null,h,n,_),C=(e,t,n,r=i_.maxLength,a=i_.minLength)=>{let o=e?t:n;_[h]={type:e?r:a,message:o,ref:i,...E(e?r:a,o)}};if(a?!Array.isArray(y)||!y.length:s&&(!(k||x)&&(S||ii(y))||iy(y)&&!y||x&&!iW(o).isValid||k&&!iH(o).isValid)){let{value:e,message:t}=iF(s)?{value:!!s,message:s}:iQ(s);if(e&&(_[h]={type:i_.required,message:t,ref:b,...E(i_.required,t)},!n))return w(t),_}if(!S&&(!ii(c)||!ii(d))){let e,t;let r=iQ(d),a=iQ(c);if(ii(y)||isNaN(y)){let n=i.valueAsDate||new Date(y),o=e=>new Date(new Date().toDateString()+" "+e),s="time"==i.type,l="week"==i.type;iC(r.value)&&y&&(e=s?o(y)>o(r.value):l?y>r.value:n>new Date(r.value)),iC(a.value)&&y&&(t=s?o(y)<o(a.value):l?y<a.value:n<new Date(a.value))}else{let n=i.valueAsNumber||(y?+y:y);ii(r.value)||(e=n>r.value),ii(a.value)||(t=n<a.value)}if((e||t)&&(C(!!e,r.message,a.message,i_.max,i_.min),!n))return w(_[h].message),_}if((l||u)&&!S&&(iC(y)||a&&Array.isArray(y))){let e=iQ(l),t=iQ(u),r=!ii(e.value)&&y.length>+e.value,a=!ii(t.value)&&y.length<+t.value;if((r||a)&&(C(r,e.message,t.message),!n))return w(_[h].message),_}if(f&&!S&&iC(y)){let{value:e,message:t}=iQ(f);if(iq(e)&&!y.match(e)&&(_[h]={type:i_.pattern,message:t,ref:i,...E(i_.pattern,t)},!n))return w(t),_}if(p){if(iU(p)){let e=await p(y,t),r=iY(e,b);if(r&&(_[h]={...r,...E(i_.validate,r.message)},!n))return w(r.message),_}else if(is(p)){let e={};for(let r in p){if(!ix(e)&&!n)break;let a=iY(await p[r](y,t),b,r);a&&(e={...a,...E(r,a.message)},w(a.message),n&&(_[h]=e))}if(!ix(e)&&(_[h]={ref:b,...e},!n))return _}}return w(!0),_};function iG(e,t){let n=Array.isArray(t)?t:iO(t)?[t]:iR(t),r=1===n.length?e:function(e,t){let n=t.slice(0,-1).length,r=0;for(;r<n;)e=iv(e)?r++:e[t[r++]];return e}(e,n),a=n.length-1,i=n[a];return r&&delete r[i],0!==a&&(is(r)&&ix(r)||Array.isArray(r)&&function(e){for(let t in e)if(e.hasOwnProperty(t)&&!iv(e[t]))return!1;return!0}(r))&&iG(e,n.slice(0,-1)),e}function iX(){let e=[];return{get observers(){return e},next:t=>{for(let n of e)n.next&&n.next(t)},subscribe:t=>(e.push(t),{unsubscribe:()=>{e=e.filter(e=>e!==t)}}),unsubscribe:()=>{e=[]}}}var iJ=e=>ii(e)||!io(e);function iZ(e,t){if(iJ(e)||iJ(t))return e===t;if(ia(e)&&ia(t))return e.getTime()===t.getTime();let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let a of n){let n=e[a];if(!r.includes(a))return!1;if("ref"!==a){let e=t[a];if(ia(n)&&ia(e)||is(n)&&is(e)||Array.isArray(n)&&Array.isArray(e)?!iZ(n,e):n!==e)return!1}}return!0}var i0=e=>"select-multiple"===e.type,i1=e=>ij(e)||ir(e),i2=e=>iz(e)&&e.isConnected,i3=e=>{for(let t in e)if(iU(e[t]))return!0;return!1};function i5(e,t={}){let n=Array.isArray(e);if(is(e)||n)for(let n in e)Array.isArray(e[n])||is(e[n])&&!i3(e[n])?(t[n]=Array.isArray(e[n])?[]:{},i5(e[n],t[n])):ii(e[n])||(t[n]=!0);return t}var i4=(e,t)=>(function e(t,n,r){let a=Array.isArray(t);if(is(t)||a)for(let a in t)Array.isArray(t[a])||is(t[a])&&!i3(t[a])?iv(n)||iJ(r[a])?r[a]=Array.isArray(t[a])?i5(t[a],[]):{...i5(t[a])}:e(t[a],ii(n)?{}:n[a],r[a]):r[a]=!iZ(t[a],n[a]);return r})(e,t,i5(t)),i6=(e,{valueAsNumber:t,valueAsDate:n,setValueAs:r})=>iv(e)?e:t?""===e?NaN:e?+e:e:n&&iC(e)?new Date(e):r?r(e):e;function i8(e){let t=e.ref;if(e.refs?!e.refs.every(e=>e.disabled):!t.disabled)return iA(t)?t.files:ij(t)?iH(e.refs).value:i0(t)?[...t.selectedOptions].map(({value:e})=>e):ir(t)?iW(e.refs).value:i6(iv(t.value)?e.ref.value:t.value,e)}var i7=(e,t,n,r)=>{let a={};for(let n of e){let e=ig(t,n);e&&iP(a,n,e._f)}return{criteriaMode:n,names:[...e],fields:a,shouldUseNativeValidation:r}},i9=e=>iv(e)?e:iq(e)?e.source:is(e)?iq(e.value)?e.value.source:e.value:e,oe=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate);function ot(e,t,n){let r=ig(e,n);if(r||iO(n))return{error:r,name:n};let a=n.split(".");for(;a.length;){let r=a.join("."),i=ig(t,r),o=ig(e,r);if(i&&!Array.isArray(i)&&n!==r)break;if(o&&o.type)return{name:r,error:o};a.pop()}return{name:n}}var on=(e,t,n,r,a)=>!a.isOnAll&&(!n&&a.isOnTouch?!(t||e):(n?r.isOnBlur:a.isOnBlur)?!e:(n?!r.isOnChange:!a.isOnChange)||e),or=(e,t)=>!im(ig(e,t)).length&&iG(e,t);let oa={mode:iw.onSubmit,reValidateMode:iw.onChange,shouldFocusError:!0},oi=(e,t={})=>{e.startsWith("/")&&(e=e.substring(1));let n=`https://bookings-bff.starship-staging.com/${e}`;return 0===Object.keys(t).length?n:`${n}?${new URLSearchParams(t).toString()}`},oo=({children:e,className:t,onClick:n,disabled:r,colour:a="primary"})=>{let i=`btn step-button bg-${a} border-${a} text-white hover:bg-${a}/80 disabled:text-${a}/50 disabled:border-${a}/50`+(t?" "+t:"");return r&&(i+=" disabled"),/*#__PURE__*/D.createElement("button",{disabled:r,className:i,onClick:n},e)},os=({details:e})=>/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("h3",null,"Terms of Voucher"),/*#__PURE__*/D.createElement("p",{className:"text-sm"},e.termsAndConditions));var ol=({})=>{let e={},t={},n={},[a,i]=D.useState(!0);if(!a)return null;let{register:o,handleSubmit:s,formState:{isSubmitting:l}}=/**
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
 */function(e={}){let t=/*@__PURE__*/r(D).useRef(),n=/*@__PURE__*/r(D).useRef(),[a,i]=/*@__PURE__*/r(D).useState({isDirty:!1,isValidating:!1,isLoading:iU(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},errors:{},defaultValues:iU(e.defaultValues)?void 0:e.defaultValues});t.current||(t.current={...function(e={},t){let n,r={...oa,...e},a={submitCount:0,isDirty:!1,isLoading:iU(r.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},errors:{}},i={},o=(is(r.defaultValues)||is(r.values))&&ih(r.defaultValues||r.values)||{},s=r.shouldUnregister?{}:ih(o),l={action:!1,mount:!1,watch:!1},u={mount:new Set,unMount:new Set,array:new Set,watch:new Set},c=0,d={isDirty:!1,dirtyFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1},f={values:iX(),array:iX(),state:iX()},p=e.resetOptions&&e.resetOptions.keepDirtyValues,h=iN(r.mode),m=iN(r.reValidateMode),v=r.criteriaMode===iw.all,g=e=>t=>{clearTimeout(c),c=setTimeout(e,t)},y=async e=>{if(d.isValid||e){let e=r.resolver?ix((await S()).errors):await C(i,!0);e!==a.isValid&&f.state.next({isValid:e})}},b=e=>d.isValidating&&f.state.next({isValidating:e}),w=(e,t)=>{iP(a.errors,e,t),f.state.next({errors:a.errors})},_=(e,t,n,r)=>{let a=ig(i,e);if(a){let i=ig(s,e,iv(n)?ig(o,e):n);iv(i)||r&&r.defaultChecked||t?iP(s,e,t?i:i8(a._f)):R(e,i),l.mount&&y()}},k=(e,t,n,r,i)=>{let s=!1,l=!1,u={name:e};if(!n||r){d.isDirty&&(l=a.isDirty,a.isDirty=u.isDirty=T(),s=l!==u.isDirty);let n=iZ(ig(o,e),t);l=ig(a.dirtyFields,e),n?iG(a.dirtyFields,e):iP(a.dirtyFields,e,!0),u.dirtyFields=a.dirtyFields,s=s||d.dirtyFields&&!n!==l}if(n){let t=ig(a.touchedFields,e);t||(iP(a.touchedFields,e,n),u.touchedFields=a.touchedFields,s=s||d.touchedFields&&t!==n)}return s&&i&&f.state.next(u),s?u:{}},x=(t,r,i,o)=>{let s=ig(a.errors,t),l=d.isValid&&iy(r)&&a.isValid!==r;if(e.delayError&&i?(n=g(()=>w(t,i)))(e.delayError):(clearTimeout(c),n=null,i?iP(a.errors,t,i):iG(a.errors,t)),(i?!iZ(s,i):s)||!ix(o)||l){let e={...o,...l&&iy(r)?{isValid:r}:{},errors:a.errors,name:t};a={...a,...e},f.state.next(e)}b(!1)},S=async e=>r.resolver(s,r.context,i7(e||u.mount,i,r.criteriaMode,r.shouldUseNativeValidation)),E=async e=>{let{errors:t}=await S(e);if(e)for(let n of e){let e=ig(t,n);e?iP(a.errors,n,e):iG(a.errors,n)}else a.errors=t;return t},C=async(e,t,n={valid:!0})=>{for(let i in e){let o=e[i];if(o){let{_f:e,...i}=o;if(e){let i=u.array.has(e.name),l=await iK(o,s,v,r.shouldUseNativeValidation&&!t,i);if(l[e.name]&&(n.valid=!1,t))break;t||(ig(l,e.name)?i?iM(a.errors,l,e.name):iP(a.errors,e.name,l[e.name]):iG(a.errors,e.name))}i&&await C(i,t,n)}}return n.valid},T=(e,t)=>(e&&t&&iP(s,e,t),!iZ(L(),o)),O=(e,t,n)=>iT(e,u,{...l.mount?s:iv(t)?o:iC(e)?{[e]:t}:t},n,t),R=(e,t,n={})=>{let r=ig(i,e),a=t;if(r){let n=r._f;n&&(n.disabled||iP(s,e,i6(t,n)),a=iz(n.ref)&&ii(t)?"":t,i0(n.ref)?[...n.ref.options].forEach(e=>e.selected=a.includes(e.value)):n.refs?ir(n.ref)?n.refs.length>1?n.refs.forEach(e=>(!e.defaultChecked||!e.disabled)&&(e.checked=Array.isArray(a)?!!a.find(t=>t===e.value):a===e.value)):n.refs[0]&&(n.refs[0].checked=!!a):n.refs.forEach(e=>e.checked=e.value===a):iA(n.ref)?n.ref.value="":(n.ref.value=a,n.ref.type||f.values.next({name:e,values:{...s}})))}(n.shouldDirty||n.shouldTouch)&&k(e,a,n.shouldTouch,n.shouldDirty,!0),n.shouldValidate&&N(e)},P=(e,t,n)=>{for(let r in t){let a=t[r],o=`${e}.${r}`,s=ig(i,o);!u.array.has(e)&&iJ(a)&&(!s||s._f)||ia(a)?R(o,a,n):P(o,a,n)}},I=(e,n,r={})=>{let c=ig(i,e),p=u.array.has(e),h=ih(n);iP(s,e,h),p?(f.array.next({name:e,values:{...s}}),(d.isDirty||d.dirtyFields)&&r.shouldDirty&&f.state.next({name:e,dirtyFields:i4(o,s),isDirty:T(e,h)})):!c||c._f||ii(h)?R(e,h,r):P(e,h,r),iL(e,u)&&f.state.next({...a}),f.values.next({name:e,values:{...s}}),l.mount||t()},D=async e=>{let t=e.target,o=t.name,l=!0,c=ig(i,o);if(c){let p,g;let w=t.type?i8(c._f):il(e),_=e.type===ib.BLUR||e.type===ib.FOCUS_OUT,E=!oe(c._f)&&!r.resolver&&!ig(a.errors,o)&&!c._f.deps||on(_,ig(a.touchedFields,o),a.isSubmitted,m,h),T=iL(o,u,_);iP(s,o,w),_?(c._f.onBlur&&c._f.onBlur(e),n&&n(0)):c._f.onChange&&c._f.onChange(e);let O=k(o,w,_,!1),R=!ix(O)||T;if(_||f.values.next({name:o,type:e.type,values:{...s}}),E)return d.isValid&&y(),R&&f.state.next({name:o,...T?{}:O});if(!_&&T&&f.state.next({...a}),b(!0),r.resolver){let{errors:e}=await S([o]),t=ot(a.errors,i,o),n=ot(e,i,t.name||o);p=n.error,o=n.name,g=ix(e)}else p=(await iK(c,s,v,r.shouldUseNativeValidation))[o],(l=Number.isNaN(w)||w===ig(s,o,w))&&(p?g=!1:d.isValid&&(g=await C(i,!0)));l&&(c._f.deps&&N(c._f.deps),x(o,g,p,O))}},N=async(e,t={})=>{let n,o;let s=iE(e);if(b(!0),r.resolver){let t=await E(iv(e)?e:s);n=ix(t),o=e?!s.some(e=>ig(t,e)):n}else e?((o=(await Promise.all(s.map(async e=>{let t=ig(i,e);return await C(t&&t._f?{[e]:t}:t)}))).every(Boolean))||a.isValid)&&y():o=n=await C(i);return f.state.next({...!iC(e)||d.isValid&&n!==a.isValid?{}:{name:e},...r.resolver||!e?{isValid:n}:{},errors:a.errors,isValidating:!1}),t.shouldFocus&&!o&&iD(i,e=>e&&ig(a.errors,e),e?s:u.mount),o},L=e=>{let t={...o,...l.mount?s:{}};return iv(e)?t:iC(e)?ig(t,e):e.map(e=>ig(t,e))},M=(e,t)=>({invalid:!!ig((t||a).errors,e),isDirty:!!ig((t||a).dirtyFields,e),isTouched:!!ig((t||a).touchedFields,e),error:ig((t||a).errors,e)}),A=(e,t,n)=>{let r=(ig(i,e,{_f:{}})._f||{}).ref;iP(a.errors,e,{...t,ref:r}),f.state.next({name:e,errors:a.errors,isValid:!1}),n&&n.shouldFocus&&r&&r.focus&&r.focus()},U=(e,t={})=>{for(let n of e?iE(e):u.mount)u.mount.delete(n),u.array.delete(n),t.keepValue||(iG(i,n),iG(s,n)),t.keepError||iG(a.errors,n),t.keepDirty||iG(a.dirtyFields,n),t.keepTouched||iG(a.touchedFields,n),r.shouldUnregister||t.keepDefaultValue||iG(o,n);f.values.next({values:{...s}}),f.state.next({...a,...t.keepDirty?{isDirty:T()}:{}}),t.keepIsValid||y()},z=({disabled:e,name:t,field:n,fields:r})=>{if(iy(e)){let a=e?void 0:ig(s,t,i8(n?n._f:ig(r,t)._f));iP(s,t,a),k(t,a,!1,!1,!0)}},F=(e,t={})=>{let n=ig(i,e),a=iy(t.disabled);return iP(i,e,{...n||{},_f:{...n&&n._f?n._f:{ref:{name:e}},name:e,mount:!0,...t}}),u.mount.add(e),n?z({field:n,disabled:t.disabled,name:e}):_(e,!0,t.value),{...a?{disabled:t.disabled}:{},...r.progressive?{required:!!t.required,min:i9(t.min),max:i9(t.max),minLength:i9(t.minLength),maxLength:i9(t.maxLength),pattern:i9(t.pattern)}:{},name:e,onChange:D,onBlur:D,ref:a=>{if(a){F(e,t),n=ig(i,e);let r=iv(a.value)&&a.querySelectorAll&&a.querySelectorAll("input,select,textarea")[0]||a,s=i1(r),l=n._f.refs||[];(s?l.find(e=>e===r):r===n._f.ref)||(iP(i,e,{_f:{...n._f,...s?{refs:[...l.filter(i2),r,...Array.isArray(ig(o,e))?[{}]:[]],ref:{type:r.type,name:e}}:{ref:r}}}),_(e,!1,void 0,r))}else(n=ig(i,e,{}))._f&&(n._f.mount=!1),(r.shouldUnregister||t.shouldUnregister)&&!(ic(u.array,e)&&l.action)&&u.unMount.add(e)}}},j=()=>r.shouldFocusError&&iD(i,e=>e&&ig(a.errors,e),u.mount),q=(e,t)=>async n=>{n&&(n.preventDefault&&n.preventDefault(),n.persist&&n.persist());let o=ih(s);if(f.state.next({isSubmitting:!0}),r.resolver){let{errors:e,values:t}=await S();a.errors=e,o=t}else await C(i);iG(a.errors,"root"),ix(a.errors)?(f.state.next({errors:{}}),await e(o,n)):(t&&await t({...a.errors},n),j(),setTimeout(j)),f.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:ix(a.errors),submitCount:a.submitCount+1,errors:a.errors})},B=(n,r={})=>{let c=n?ih(n):o,h=ih(c),m=n&&!ix(n)?h:o;if(r.keepDefaultValues||(o=c),!r.keepValues){if(r.keepDirtyValues||p)for(let e of u.mount)ig(a.dirtyFields,e)?iP(m,e,ig(s,e)):I(e,ig(m,e));else{if(ip&&iv(n))for(let e of u.mount){let t=ig(i,e);if(t&&t._f){let e=Array.isArray(t._f.refs)?t._f.refs[0]:t._f.ref;if(iz(e)){let t=e.closest("form");if(t){t.reset();break}}}}i={}}s=e.shouldUnregister?r.keepDefaultValues?ih(o):{}:ih(m),f.array.next({values:{...m}}),f.values.next({values:{...m}})}u={mount:new Set,unMount:new Set,array:new Set,watch:new Set,watchAll:!1,focus:""},l.mount||t(),l.mount=!d.isValid||!!r.keepIsValid,l.watch=!!e.shouldUnregister,f.state.next({submitCount:r.keepSubmitCount?a.submitCount:0,isDirty:r.keepDirty?a.isDirty:!!(r.keepDefaultValues&&!iZ(n,o)),isSubmitted:!!r.keepIsSubmitted&&a.isSubmitted,dirtyFields:r.keepDirtyValues?a.dirtyFields:r.keepDefaultValues&&n?i4(o,n):{},touchedFields:r.keepTouched?a.touchedFields:{},errors:r.keepErrors?a.errors:{},isSubmitSuccessful:!!r.keepIsSubmitSuccessful&&a.isSubmitSuccessful,isSubmitting:!1})},V=(e,t)=>B(iU(e)?e(s):e,t);return{control:{register:F,unregister:U,getFieldState:M,handleSubmit:q,setError:A,_executeSchema:S,_getWatch:O,_getDirty:T,_updateValid:y,_removeUnmounted:()=>{for(let e of u.unMount){let t=ig(i,e);t&&(t._f.refs?t._f.refs.every(e=>!i2(e)):!i2(t._f.ref))&&U(e)}u.unMount=new Set},_updateFieldArray:(e,t=[],n,r,u=!0,c=!0)=>{if(r&&n){if(l.action=!0,c&&Array.isArray(ig(i,e))){let t=n(ig(i,e),r.argA,r.argB);u&&iP(i,e,t)}if(c&&Array.isArray(ig(a.errors,e))){let t=n(ig(a.errors,e),r.argA,r.argB);u&&iP(a.errors,e,t),or(a.errors,e)}if(d.touchedFields&&c&&Array.isArray(ig(a.touchedFields,e))){let t=n(ig(a.touchedFields,e),r.argA,r.argB);u&&iP(a.touchedFields,e,t)}d.dirtyFields&&(a.dirtyFields=i4(o,s)),f.state.next({name:e,isDirty:T(e,t),dirtyFields:a.dirtyFields,errors:a.errors,isValid:a.isValid})}else iP(s,e,t)},_updateDisabledField:z,_getFieldArray:t=>im(ig(l.mount?s:o,t,e.shouldUnregister?ig(o,t,[]):[])),_reset:B,_resetDefaultValues:()=>iU(r.defaultValues)&&r.defaultValues().then(e=>{V(e,r.resetOptions),f.state.next({isLoading:!1})}),_updateFormState:e=>{a={...a,...e}},_subjects:f,_proxyFormState:d,get _fields(){return i},get _formValues(){return s},get _state(){return l},set _state(value){l=value},get _defaultValues(){return o},get _names(){return u},set _names(value){u=value},get _formState(){return a},set _formState(value){a=value},get _options(){return r},set _options(value){r={...r,...value}}},trigger:N,register:F,handleSubmit:q,watch:(e,t)=>iU(e)?f.values.subscribe({next:n=>e(O(void 0,t),n)}):O(e,t,!0),setValue:I,getValues:L,reset:V,resetField:(e,t={})=>{ig(i,e)&&(iv(t.defaultValue)?I(e,ig(o,e)):(I(e,t.defaultValue),iP(o,e,t.defaultValue)),t.keepTouched||iG(a.touchedFields,e),t.keepDirty||(iG(a.dirtyFields,e),a.isDirty=t.defaultValue?T(e,ig(o,e)):T()),!t.keepError&&(iG(a.errors,e),d.isValid&&y()),f.state.next({...a}))},clearErrors:e=>{e&&iE(e).forEach(e=>iG(a.errors,e)),f.state.next({errors:e?a.errors:{}})},unregister:U,setError:A,setFocus:(e,t={})=>{let n=ig(i,e),r=n&&n._f;if(r){let e=r.refs?r.refs[0]:r.ref;e.focus&&(e.focus(),t.shouldSelect&&e.select())}},getFieldState:M}}(e,()=>i(e=>({...e}))),formState:a});let o=t.current.control;return o._options=e,!function(e){let t=/*@__PURE__*/r(D).useRef(e);t.current=e,/*@__PURE__*/r(D).useEffect(()=>{let n=!e.disabled&&t.current.subject&&t.current.subject.subscribe({next:t.current.next});return()=>{n&&n.unsubscribe()}},[e.disabled])}({subject:o._subjects.state,next:e=>{iS(e,o._proxyFormState,o._updateFormState,!0)&&i({...o._formState})}}),/*@__PURE__*/r(D).useEffect(()=>{e.values&&!iZ(e.values,n.current)?(o._reset(e.values,o._options.resetOptions),n.current=e.values):o._resetDefaultValues()},[e.values,o]),/*@__PURE__*/r(D).useEffect(()=>{o._state.mount||(o._updateValid(),o._state.mount=!0),o._state.watch&&(o._state.watch=!1,o._subjects.state.next({...o._formState})),o._removeUnmounted()}),t.current.formState=ik(a,o),t.current}(),[u,c]=D.useState({busy:!1,complete:!1,voucher:null,error:null,responseStatusCode:0});async function d(r){let a={...r,bookingLink:`${n?.origin}/${e?.slug}`},i=await fetch(oi(`campaigns/${t?.campaign}/voucher?locationID=${e?.identifier}`),{method:"POST",headers:{Accept:"application/json","Content-type":"application/json"},body:JSON.stringify(a)});i.json().then(e=>{i.ok?c({busy:!1,complete:!0,voucher:e.voucher}):c({busy:!1,error:e,responseStatusCode:i.status})})}async function f(n){// @ts-ignore
c({busy:!0});try{""!==t.campaign&&d(n).then(()=>{let t={item_name:e?.name,affiliation:"Booking Flow"};console.log(t);// navigate(`/${landingPage?.slug}`)
})}catch(e){}}return!0===u.complete?/*#__PURE__*/D.createElement("div",{className:"container"},/*#__PURE__*/D.createElement("h2",null,"Voucher Sent!"),/*#__PURE__*/D.createElement("p",{className:"text-md"},"Good news! We've sent your voucher to the email provided!"),u.voucher&&/*#__PURE__*/D.createElement("div",{className:"col-12 mt-3"},/*#__PURE__*/D.createElement(os,{details:u.voucher}))):409===u.responseStatusCode?/*#__PURE__*/D.createElement("div",{className:"container"},/*#__PURE__*/D.createElement("h2",{className:"mt-3"},"Uh-oh!"),/*#__PURE__*/D.createElement("p",null,"It seems that you already received this voucher. Please get in touch if this doesn't seem right:\xa0",/*#__PURE__*/D.createElement("a",{href:"/help",className:"underline font-serif tracking-wide",onClick:()=>i(!1)},"contact us"))):/*#__PURE__*/D.createElement("div",{style:{position:"fixed",top:0,left:0,width:"100vw",height:"100vh",backgroundColor:"rgba(0,0,0,0.5)",zIndex:9999}},/*#__PURE__*/D.createElement("main",{className:"flex-grow flex flex-col justify-center container relative"},/*#__PURE__*/D.createElement("div",{className:"w-full"},/*#__PURE__*/D.createElement("div",{className:"cms-content text-center md:text-left"},/*#__PURE__*/D.createElement("h2",null,"Get Your Voucher"),/*#__PURE__*/D.createElement("p",null,"To receive your voucher, we just need a few details from you."),/*#__PURE__*/D.createElement("h3",{className:`bar-title border-l-4 border-solid border-${e?.colour}`},"Contact Info"),/*#__PURE__*/D.createElement("form",{onSubmit:s(f)},/*#__PURE__*/D.createElement("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2"},/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("label",{htmlFor:"first_name"},"First Name*"),/*#__PURE__*/D.createElement("input",{...o("firstName",{required:!0,minLength:2,maxLength:30,validate:e=>e.trim().length>=2}),type:"text",className:"form-input",id:"firstName"})),/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("label",{htmlFor:"last_name"},"Last Name*"),/*#__PURE__*/D.createElement("input",{...o("lastName",{required:!0,minLength:2,maxLength:30,validate:e=>e.trim().length>=2}),type:"text",className:"form-input",id:"lastName"})),/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("label",{htmlFor:"email"},"Email*"),/*#__PURE__*/D.createElement("input",{...o("emailAddress",{required:!0}),type:"email",className:"form-input",id:"email"}))),/*#__PURE__*/D.createElement("div",null,/*#__PURE__*/D.createElement("p",null,"* Required Field")),/*#__PURE__*/D.createElement("div",{className:"flex gap-x-6 gap-y-2 items-center flex-wrap justify-center lg:justify-start"},/*#__PURE__*/D.createElement("div",{className:"form-check"},/*#__PURE__*/D.createElement("input",{type:"checkbox",...o("terms",{required:!0}),className:"form-check-input",id:"terms"})," ",/*#__PURE__*/D.createElement("label",{htmlFor:"terms",className:"form-check-label"},"I confirm that I have read & agreed with the"," ",/*#__PURE__*/D.createElement("a",{href:e?.privacyPolicy,target:"_blank",rel:"noreferrer"},"Privacy Policy"),"*")),/*#__PURE__*/D.createElement(oo,{className:"btn mt-2 md:mt-0",type:"submit",colour:e?.colour,disabled:u.busy||l},l||u.busy?"Sending Voucher...":"Get My Voucher")),u.error&&409!==u.responseStatusCode&&/*#__PURE__*/D.createElement("div",{className:`alert mt-5 bg-${e?.colour}/20`},"There was a problem sending your voucher. Please check your details and try again."))))))},D=I("exYeM");let ou=[{id:"modal_v1",behaviour:"BEHAVIOUR_MODAL",invoke:e=>/*@__PURE__*/r(D).createElement(a9,{trigger:e})},{id:"youtube_v1",behaviour:"youtube",invoke:e=>/*@__PURE__*/r(D).createElement(it,{trigger:e})},{id:"inverse_v1",behaviour:"inverse_flow",invoke:e=>/*@__PURE__*/r(D).createElement(ol,{trigger:e})}],oc=new // CLASS
class{constructor(e={}){this.queryCache=e.queryCache||new el,this.mutationCache=e.mutationCache||new ed,this.logger=e.logger||K,this.defaultOptions=e.defaultOptions||{},this.queryDefaults=[],this.mutationDefaults=[],this.mountCount=0,e.logger&&this.logger.error("Passing a custom logger has been deprecated and will be removed in the next major version.")}mount(){this.mountCount++,1===this.mountCount&&(this.unsubscribeFocus=J.subscribe(()=>{J.isFocused()&&(this.resumePausedMutations(),this.queryCache.onFocus())}),this.unsubscribeOnline=ee.subscribe(()=>{ee.isOnline()&&(this.resumePausedMutations(),this.queryCache.onOnline())}))}unmount(){var e,t;this.mountCount--,0===this.mountCount&&(null==(e=this.unsubscribeFocus)||e.call(this),this.unsubscribeFocus=void 0,null==(t=this.unsubscribeOnline)||t.call(this),this.unsubscribeOnline=void 0)}isFetching(e,t){let[n]=U(e,t);return n.fetchStatus="fetching",this.queryCache.findAll(n).length}isMutating(e){return this.mutationCache.findAll({...e,fetching:!0}).length}getQueryData(e,t){var n;return null==(n=this.queryCache.find(e,t))?void 0:n.state.data}ensureQueryData(e,t,n){let r=A(e,t,n),a=this.getQueryData(r.queryKey);return a?Promise.resolve(a):this.fetchQuery(r)}getQueriesData(e){return this.getQueryCache().findAll(e).map(({queryKey:e,state:t})=>{let n=t.data;return[e,n]})}setQueryData(e,t,n){let r=this.queryCache.find(e),a=null==r?void 0:r.state.data,i="function"==typeof t?t(a):t;if(void 0===i)return;let o=A(e),s=this.defaultQueryOptions(o);return this.queryCache.build(this,s).setData(i,{...n,manual:!0})}setQueriesData(e,t,n){return G.batch(()=>this.getQueryCache().findAll(e).map(({queryKey:e})=>[e,this.setQueryData(e,t,n)]))}getQueryState(e,t){var n;return null==(n=this.queryCache.find(e,t))?void 0:n.state}removeQueries(e,t){let[n]=U(e,t),r=this.queryCache;G.batch(()=>{r.findAll(n).forEach(e=>{r.remove(e)})})}resetQueries(e,t,n){let[r,a]=U(e,t,n),i=this.queryCache,o={type:"active",...r};return G.batch(()=>(i.findAll(r).forEach(e=>{e.reset()}),this.refetchQueries(o,a)))}cancelQueries(e,t,n){let[r,a={}]=U(e,t,n);void 0===a.revert&&(a.revert=!0);let i=G.batch(()=>this.queryCache.findAll(r).map(e=>e.cancel(a)));return Promise.all(i).then(M).catch(M)}invalidateQueries(e,t,n){let[r,a]=U(e,t,n);return G.batch(()=>{var e,t;if(this.queryCache.findAll(r).forEach(e=>{e.invalidate()}),"none"===r.refetchType)return Promise.resolve();let n={...r,type:null!=(e=null!=(t=r.refetchType)?t:r.type)?e:"active"};return this.refetchQueries(n,a)})}refetchQueries(e,t,n){let[r,a]=U(e,t,n),i=G.batch(()=>this.queryCache.findAll(r).filter(e=>!e.isDisabled()).map(e=>{var t;return e.fetch(void 0,{...a,cancelRefetch:null==(t=null==a?void 0:a.cancelRefetch)||t,meta:{refetchPage:r.refetchPage}})})),o=Promise.all(i).then(M);return null!=a&&a.throwOnError||(o=o.catch(M)),o}fetchQuery(e,t,n){let r=A(e,t,n),a=this.defaultQueryOptions(r);void 0===a.retry&&(a.retry=!1);let i=this.queryCache.build(this,a);return i.isStaleByTime(a.staleTime)?i.fetch(a):Promise.resolve(i.state.data)}prefetchQuery(e,t,n){return this.fetchQuery(e,t,n).then(M).catch(M)}fetchInfiniteQuery(e,t,n){let r=A(e,t,n);return r.behavior={onFetch:e=>{e.fetchFn=()=>{var t,n,r,a,i,o,s;let l;let u=null==(t=e.fetchOptions)?void 0:null==(n=t.meta)?void 0:n.refetchPage,c=null==(r=e.fetchOptions)?void 0:null==(a=r.meta)?void 0:a.fetchMore,d=null==c?void 0:c.pageParam,f=(null==c?void 0:c.direction)==="forward",p=(null==c?void 0:c.direction)==="backward",h=(null==(i=e.state.data)?void 0:i.pages)||[],m=(null==(o=e.state.data)?void 0:o.pageParams)||[],v=m,g=!1,y=t=>{Object.defineProperty(t,"signal",{enumerable:!0,get:()=>{var t,n;return null!=(t=e.signal)&&t.aborted?g=!0:null==(n=e.signal)||n.addEventListener("abort",()=>{g=!0}),e.signal}})},b=e.options.queryFn||(()=>Promise.reject("Missing queryFn for queryKey '"+e.options.queryHash+"'")),w=(e,t,n,r)=>(v=r?[t,...v]:[...v,t],r?[n,...e]:[...e,n]),_=(t,n,r,a)=>{if(g)return Promise.reject("Cancelled");if(void 0===r&&!n&&t.length)return Promise.resolve(t);let i={queryKey:e.queryKey,pageParam:r,meta:e.options.meta};y(i);let o=b(i),s=Promise.resolve(o).then(e=>w(t,r,e,a));return s};if(h.length){if(f){let t=void 0!==d,n=t?d:ef(e.options,h);l=_(h,t,n)}else if(p){let t=void 0!==d,n=t?d:null==(s=e.options).getPreviousPageParam?void 0:s.getPreviousPageParam(h[0],h);l=_(h,t,n,!0)}else{v=[];let t=void 0===e.options.getNextPageParam,n=!u||!h[0]||u(h[0],0,h);l=n?_([],t,m[0]):Promise.resolve(w([],m[0],h[0]));// Fetch remaining pages
for(let n=1;n<h.length;n++)l=l.then(r=>{let a=!u||!h[n]||u(h[n],n,h);if(a){let a=t?m[n]:ef(e.options,r);return _(r,t,a)}return Promise.resolve(w(r,m[n],h[n]))})}}else l=_([]);let k=l.then(e=>({pages:e,pageParams:v}));return k}}},this.fetchQuery(r)}prefetchInfiniteQuery(e,t,n){return this.fetchInfiniteQuery(e,t,n).then(M).catch(M)}resumePausedMutations(){return this.mutationCache.resumePausedMutations()}getQueryCache(){return this.queryCache}getMutationCache(){return this.mutationCache}getLogger(){return this.logger}getDefaultOptions(){return this.defaultOptions}setDefaultOptions(e){this.defaultOptions=e}setQueryDefaults(e,t){let n=this.queryDefaults.find(t=>q(e)===q(t.queryKey));n?n.defaultOptions=t:this.queryDefaults.push({queryKey:e,defaultOptions:t})}getQueryDefaults(e){if(!e)return;// Get the first matching defaults
let t=this.queryDefaults.find(t=>B(e,t.queryKey));// Additional checks and error in dev mode
{// Retrieve all matching defaults for the given key
let t=this.queryDefaults.filter(t=>B(e,t.queryKey));// It is ok not having defaults, but it is error prone to have more than 1 default for a given key
t.length>1&&this.logger.error("[QueryClient] Several query defaults match with key '"+JSON.stringify(e)+"'. The first matching query defaults are used. Please check how query defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetquerydefaults.")}return null==t?void 0:t.defaultOptions}setMutationDefaults(e,t){let n=this.mutationDefaults.find(t=>q(e)===q(t.mutationKey));n?n.defaultOptions=t:this.mutationDefaults.push({mutationKey:e,defaultOptions:t})}getMutationDefaults(e){if(!e)return;// Get the first matching defaults
let t=this.mutationDefaults.find(t=>B(e,t.mutationKey));// Additional checks and error in dev mode
{// Retrieve all matching defaults for the given key
let t=this.mutationDefaults.filter(t=>B(e,t.mutationKey));// It is ok not having defaults, but it is error prone to have more than 1 default for a given key
t.length>1&&this.logger.error("[QueryClient] Several mutation defaults match with key '"+JSON.stringify(e)+"'. The first matching mutation defaults are used. Please check how mutation defaults are registered. Order does matter here. cf. https://react-query.tanstack.com/reference/QueryClient#queryclientsetmutationdefaults.")}return null==t?void 0:t.defaultOptions}defaultQueryOptions(e){if(null!=e&&e._defaulted)return e;let t={...this.defaultOptions.queries,...this.getQueryDefaults(null==e?void 0:e.queryKey),...e,_defaulted:!0};return!t.queryHash&&t.queryKey&&(t.queryHash=j(t.queryKey,t)),void 0===t.refetchOnReconnect&&(t.refetchOnReconnect="always"!==t.networkMode),void 0===t.useErrorBoundary&&(t.useErrorBoundary=!!t.suspense),t}defaultMutationOptions(e){return null!=e&&e._defaulted?e:{...this.defaultOptions.mutations,...this.getMutationDefaults(null==e?void 0:e.mutationKey),...e,_defaulted:!0}}clear(){this.queryCache.clear(),this.mutationCache.clear()}},od=({appId:e,children:t,consent:n=!1,consentCallback:a,debug:i,defaultHandlers:o,initialDelay:s=0,exitIntentTriggers:l=!0,idleTriggers:u=!0})=>{let[c,d]=(0,D.useState)(n),[f,p]=(0,D.useState)(!1),[h,m]=(0,D.useState)(o||ou),v=/*@__PURE__*/r(D).useCallback(e=>{m(t=>[...t,e])},[m]);return(/**
   * Effect checks for user consent either via direct variable or a callback.
   * in any case, once one of the conditions is met, the single state gets set to true, allowing the logic to flow.
   * TODO: Think if it makes sense to memoize / derive that state instead? Gonna be tricky with an interval involved.
   */(0,D.useEffect)(()=>{if(n){d(n);return}if(!a)return;let e=a(),t=setInterval(()=>{d(n)},1e3);// clear on onmount
return e&&clearInterval(t),()=>clearInterval(t)},[a,n]),(0,D.useEffect)(()=>{if(!e)throw Error("C&M Fingerprint: appId is required");if(f||!c)return;let t=async()=>{// @todo this should be invoked when booted.
// It will call out to the API to confirm the
// appId is valid and return the app configuration.
p(!0)};t()},[c]),e)?c?/*@__PURE__*/r(D).createElement(ey,{debug:i},/*@__PURE__*/r(D).createElement(eg,{client:oc},/*@__PURE__*/r(D).createElement(of.Provider,{value:{appId:e,booted:f,currentTrigger:{},registerHandler:v,trackEvent:()=>{alert("trackEvent not implemented")},trackPageView:()=>{alert("trackPageView not implemented")},unregisterHandler:()=>{alert("unregisterHandler not implemented")},initialDelay:s,idleTriggers:u,exitIntentTriggers:l}},/*@__PURE__*/r(D).createElement(tE,null,/*@__PURE__*/r(D).createElement(rt,null,/*@__PURE__*/r(D).createElement(a2,{handlers:h},/*@__PURE__*/r(D).createElement(a6,{onError:(e,t)=>console.error(e,t),fallback:/*@__PURE__*/r(D).createElement("div",null,"An application error occurred.")},t))))))):t:null},of=/*#__PURE__*/(0,D.createContext)({appId:"",booted:!1,consent:!1,currentTrigger:{},exitIntentTriggers:!1,idleTriggers:!1,initialDelay:0,registerHandler:()=>{},trackEvent:()=>{},trackPageView:()=>{},unregisterHandler:()=>{}}),op=document.createElement("div");op.id="fingerprint-widget",document.body.appendChild(op),// Embeds widget styles
// @todo this should be provided by CDN
// const styles = document.createElement('link')
// styles.rel = 'stylesheet'
// // @todo update parcel to use the hashed styles
// // @todo automatically strip any non-namespaced styles
// styles.href = '../dist/fingerprint.css'
// document.head.appendChild(styles)
console.log("Fingerprint Widget Loaded"),/*@__PURE__*/r(N).render(/*@__PURE__*/r(D).createElement(/*@__PURE__*/r(D).StrictMode,null,/*@__PURE__*/r(D).createElement(({appId:e,consent:t,debug:n})=>/*@__PURE__*/r(D).createElement(od,{appId:e,consent:t,debug:n}),{appId:document?.currentScript?.getAttribute("id")||"",consent:document?.currentScript?.getAttribute("data-consent")==="false",// @todo Revert this from 'false' to 'true'
debug:document?.currentScript?.getAttribute("data-debug")==="false"})),document.getElementById("fingerprint-widget"))}();//# sourceMappingURL=fingerprint.js.map

//# sourceMappingURL=fingerprint.js.map
