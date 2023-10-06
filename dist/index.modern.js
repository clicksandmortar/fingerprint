import { useMutation, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React__default, { useState, createElement, createContext, useContext, useEffect, useCallback, useMemo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import ReactDOM from 'react-dom';
import { validate, version, v4 } from 'uuid';
import { isMobile } from 'react-device-detect';
import { IdleTimerProvider } from 'react-idle-timer';
import { useExitIntent } from 'use-exit-intent';
import mixpanel from 'mixpanel-browser';
import Cookies from 'js-cookie';

const baseUrl = 'https://bookings-bff.starship-staging.com';
const makeFullUrl = (resource, params = {}) => {
  if (resource.startsWith('/')) {
    resource = resource.substring(1);
  }
  const fullUri = `${baseUrl}/${resource}`;
  if (Object.keys(params).length === 0) {
    return fullUri;
  }
  return `${fullUri}?${new URLSearchParams(params).toString()}`;
};
const Button = ({
  children,
  className,
  onClick,
  disabled,
  colour: _colour = 'primary'
}) => {
  let builtButtonClasses = `btn step-button bg-${_colour} border-${_colour} text-white hover:bg-${_colour}/80 disabled:text-${_colour}/50 disabled:border-${_colour}/50` + (className ? ' ' + className : '');
  if (disabled) {
    builtButtonClasses += ' disabled';
  }
  return createElement("button", {
    disabled: disabled,
    className: builtButtonClasses,
    onClick: onClick
  }, children);
};
const Voucher = ({
  details
}) => {
  return createElement("div", null, createElement("h3", null, "Terms of Voucher"), createElement("p", {
    className: 'text-sm'
  }, details.termsAndConditions));
};
const TriggerInverse = ({}) => {
  const landingPage = {};
  const form = {};
  const location = {};
  const [open, setOpen] = useState(true);
  if (!open) {
    return null;
  }
  const {
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm();
  const initialState = {
    busy: false,
    complete: false,
    voucher: null,
    error: null,
    responseStatusCode: 0
  };
  const [state, setState] = useState(initialState);
  async function submitVoucher(data) {
    const reqData = {
      ...data,
      bookingLink: `${location === null || location === void 0 ? void 0 : location.origin}/${landingPage === null || landingPage === void 0 ? void 0 : landingPage.slug}`
    };
    const response = await fetch(makeFullUrl(`campaigns/${form === null || form === void 0 ? void 0 : form.campaign}/voucher?locationID=${landingPage === null || landingPage === void 0 ? void 0 : landingPage.identifier}`), {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify(reqData)
    });
    response.json().then(responseData => {
      if (response.ok) {
        setState({
          busy: false,
          complete: true,
          voucher: responseData.voucher
        });
      } else {
        setState({
          busy: false,
          error: responseData,
          responseStatusCode: response.status
        });
      }
    });
  }
  async function onSubmit(data) {
    setState({
      busy: true
    });
    try {
      if (form.campaign !== '') {
        submitVoucher(data).then(() => {
          const eventData = {
            item_name: landingPage === null || landingPage === void 0 ? void 0 : landingPage.name,
            affiliation: 'Booking Flow'
          };
          console.log(eventData);
        });
      }
    } catch (e) {}
  }
  if (state.complete === true) {
    return createElement("div", {
      className: 'container'
    }, createElement("h2", null, "Voucher Sent!"), createElement("p", {
      className: 'text-md'
    }, "Good news! We've sent your voucher to the email provided!"), state.voucher && createElement("div", {
      className: 'col-12 mt-3'
    }, createElement(Voucher, {
      details: state.voucher
    })));
  }
  if (state.responseStatusCode === 409) {
    return createElement("div", {
      className: 'container'
    }, createElement("h2", {
      className: 'mt-3'
    }, "Uh-oh!"), createElement("p", null, "It seems that you already received this voucher. Please get in touch if this doesn't seem right:\u00A0", createElement("a", {
      href: '/help',
      className: 'underline font-serif tracking-wide',
      onClick: () => setOpen(false)
    }, "contact us")));
  }
  return createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }
  }, createElement("main", {
    className: 'flex-grow flex flex-col justify-center container relative'
  }, createElement("div", {
    className: 'w-full'
  }, createElement("div", {
    className: 'cms-content text-center md:text-left'
  }, createElement("h2", null, "Get Your Voucher"), createElement("p", null, "To receive your voucher, we just need a few details from you."), createElement("h3", {
    className: `bar-title border-l-4 border-solid border-${landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour}`
  }, "Contact Info"), createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: 'grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2'
  }, createElement("div", null, createElement("label", {
    htmlFor: 'first_name'
  }, "First Name*"), createElement("input", Object.assign({}, register('firstName', {
    required: true,
    minLength: 2,
    maxLength: 30,
    validate: value => value.trim().length >= 2
  }), {
    type: 'text',
    className: 'form-input',
    id: 'firstName'
  }))), createElement("div", null, createElement("label", {
    htmlFor: 'last_name'
  }, "Last Name*"), createElement("input", Object.assign({}, register('lastName', {
    required: true,
    minLength: 2,
    maxLength: 30,
    validate: value => value.trim().length >= 2
  }), {
    type: 'text',
    className: 'form-input',
    id: 'lastName'
  }))), createElement("div", null, createElement("label", {
    htmlFor: 'email'
  }, "Email*"), createElement("input", Object.assign({}, register('emailAddress', {
    required: true
  }), {
    type: 'email',
    className: 'form-input',
    id: 'email'
  })))), createElement("div", null, createElement("p", null, "* Required Field")), createElement("div", {
    className: 'flex gap-x-6 gap-y-2 items-center flex-wrap justify-center lg:justify-start'
  }, createElement("div", {
    className: 'form-check'
  }, createElement("input", Object.assign({
    type: 'checkbox'
  }, register('terms', {
    required: true
  }), {
    className: 'form-check-input',
    id: 'terms'
  })), ' ', createElement("label", {
    htmlFor: 'terms',
    className: 'form-check-label'
  }, "I confirm that I have read & agreed with the", ' ', createElement("a", {
    href: landingPage === null || landingPage === void 0 ? void 0 : landingPage.privacyPolicy,
    target: '_blank',
    rel: 'noreferrer'
  }, "Privacy Policy"), "*")), createElement(Button, {
    className: 'btn mt-2 md:mt-0',
    type: 'submit',
    colour: landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour,
    disabled: state.busy || isSubmitting
  }, isSubmitting || state.busy ? 'Sending Voucher...' : 'Get My Voucher')), state.error && state.responseStatusCode !== 409 && createElement("div", {
    className: `alert mt-5 bg-${landingPage === null || landingPage === void 0 ? void 0 : landingPage.colour}/20`
  }, "There was a problem sending your voucher. Please check your details and try again."))))));
};

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

var _listCacheClear = listCacheClear;

/**
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
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

var eq_1 = eq;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq_1(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

var _assocIndexOf = assocIndexOf;

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

var _listCacheDelete = listCacheDelete;

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

var _listCacheGet = listCacheGet;

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return _assocIndexOf(this.__data__, key) > -1;
}

var _listCacheHas = listCacheHas;

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = _assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

var _listCacheSet = listCacheSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = _listCacheClear;
ListCache.prototype['delete'] = _listCacheDelete;
ListCache.prototype.get = _listCacheGet;
ListCache.prototype.has = _listCacheHas;
ListCache.prototype.set = _listCacheSet;

var _ListCache = ListCache;

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new _ListCache;
  this.size = 0;
}

var _stackClear = stackClear;

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

var _stackDelete = stackDelete;

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

var _stackGet = stackGet;

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

var _stackHas = stackHas;

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

var _freeGlobal = freeGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = _freeGlobal || freeSelf || Function('return this')();

var _root = root;

/** Built-in value references. */
var Symbol = _root.Symbol;

var _Symbol = Symbol;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

var _getRawTag = getRawTag;

/** Used for built-in method references. */
var objectProto$1 = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString$1 = objectProto$1.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString$1.call(value);
}

var _objectToString = objectToString;

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag$1 && symToStringTag$1 in Object(value))
    ? _getRawTag(value)
    : _objectToString(value);
}

var _baseGetTag = baseGetTag;

/**
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
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

var isObject_1 = isObject;

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
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
 */
function isFunction(value) {
  if (!isObject_1(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = _baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

var isFunction_1 = isFunction;

/** Used to detect overreaching core-js shims. */
var coreJsData = _root['__core-js_shared__'];

var _coreJsData = coreJsData;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

var _isMasked = isMasked;

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

var _toSource = toSource;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto$1 = Function.prototype,
    objectProto$2 = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString$1 = funcProto$1.toString;

/** Used to check objects for own properties. */
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject_1(value) || _isMasked(value)) {
    return false;
  }
  var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
  return pattern.test(_toSource(value));
}

var _baseIsNative = baseIsNative;

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

var _getValue = getValue;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = _getValue(object, key);
  return _baseIsNative(value) ? value : undefined;
}

var _getNative = getNative;

/* Built-in method references that are verified to be native. */
var Map = _getNative(_root, 'Map');

var _Map = Map;

/* Built-in method references that are verified to be native. */
var nativeCreate = _getNative(Object, 'create');

var _nativeCreate = nativeCreate;

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
  this.size = 0;
}

var _hashClear = hashClear;

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

var _hashDelete = hashDelete;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto$3 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (_nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
}

var _hashGet = hashGet;

/** Used for built-in method references. */
var objectProto$4 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
}

var _hashHas = hashHas;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
  return this;
}

var _hashSet = hashSet;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = _hashClear;
Hash.prototype['delete'] = _hashDelete;
Hash.prototype.get = _hashGet;
Hash.prototype.has = _hashHas;
Hash.prototype.set = _hashSet;

var _Hash = Hash;

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new _Hash,
    'map': new (_Map || _ListCache),
    'string': new _Hash
  };
}

var _mapCacheClear = mapCacheClear;

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

var _isKeyable = isKeyable;

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return _isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

var _getMapData = getMapData;

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = _getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

var _mapCacheDelete = mapCacheDelete;

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return _getMapData(this, key).get(key);
}

var _mapCacheGet = mapCacheGet;

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return _getMapData(this, key).has(key);
}

var _mapCacheHas = mapCacheHas;

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = _getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

var _mapCacheSet = mapCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = _mapCacheClear;
MapCache.prototype['delete'] = _mapCacheDelete;
MapCache.prototype.get = _mapCacheGet;
MapCache.prototype.has = _mapCacheHas;
MapCache.prototype.set = _mapCacheSet;

var _MapCache = MapCache;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof _ListCache) {
    var pairs = data.__data__;
    if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new _MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

var _stackSet = stackSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new _ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = _stackClear;
Stack.prototype['delete'] = _stackDelete;
Stack.prototype.get = _stackGet;
Stack.prototype.has = _stackHas;
Stack.prototype.set = _stackSet;

var _Stack = Stack;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED$2 = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED$2);
  return this;
}

var _setCacheAdd = setCacheAdd;

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

var _setCacheHas = setCacheHas;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new _MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = _setCacheAdd;
SetCache.prototype.has = _setCacheHas;

var _SetCache = SetCache;

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

var _arraySome = arraySome;

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

var _cacheHas = cacheHas;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Check that cyclic values are equal.
  var arrStacked = stack.get(array);
  var othStacked = stack.get(other);
  if (arrStacked && othStacked) {
    return arrStacked == other && othStacked == array;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new _SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!_arraySome(other, function(othValue, othIndex) {
            if (!_cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

var _equalArrays = equalArrays;

/** Built-in value references. */
var Uint8Array = _root.Uint8Array;

var _Uint8Array = Uint8Array;

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

var _mapToArray = mapToArray;

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

var _setToArray = setToArray;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$1 = 1,
    COMPARE_UNORDERED_FLAG$1 = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = _Symbol ? _Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
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
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new _Uint8Array(object), new _Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq_1(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = _mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG$1;
      convert || (convert = _setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG$1;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = _equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

var _equalByTag = equalByTag;

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

var _arrayPush = arrayPush;

/**
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
 */
var isArray = Array.isArray;

var isArray_1 = isArray;

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
}

var _baseGetAllKeys = baseGetAllKeys;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

var _arrayFilter = arrayFilter;

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

var stubArray_1 = stubArray;

/** Used for built-in method references. */
var objectProto$5 = Object.prototype;

/** Built-in value references. */
var propertyIsEnumerable = objectProto$5.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols;

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return _arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

var _getSymbols = getSymbols;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

var _baseTimes = baseTimes;

/**
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
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

var isObjectLike_1 = isObjectLike;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
}

var _baseIsArguments = baseIsArguments;

/** Used for built-in method references. */
var objectProto$6 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

/**
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
 */
var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
  return isObjectLike_1(value) && hasOwnProperty$4.call(value, 'callee') &&
    !propertyIsEnumerable$1.call(value, 'callee');
};

var isArguments_1 = isArguments;

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

var stubFalse_1 = stubFalse;

var isBuffer_1 = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? _root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse_1;

module.exports = isBuffer;
});

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;

  return !!length &&
    (type == 'number' ||
      (type != 'symbol' && reIsUint.test(value))) &&
        (value > -1 && value % 1 == 0 && value < length);
}

var _isIndex = isIndex;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER$1 = 9007199254740991;

/**
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
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
}

var isLength_1 = isLength;

/** `Object#toString` result references. */
var argsTag$1 = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag$1 = '[object Boolean]',
    dateTag$1 = '[object Date]',
    errorTag$1 = '[object Error]',
    funcTag$1 = '[object Function]',
    mapTag$1 = '[object Map]',
    numberTag$1 = '[object Number]',
    objectTag = '[object Object]',
    regexpTag$1 = '[object RegExp]',
    setTag$1 = '[object Set]',
    stringTag$1 = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag$1 = '[object ArrayBuffer]',
    dataViewTag$1 = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag$1] = typedArrayTags[boolTag$1] =
typedArrayTags[dataViewTag$1] = typedArrayTags[dateTag$1] =
typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
typedArrayTags[mapTag$1] = typedArrayTags[numberTag$1] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag$1] =
typedArrayTags[setTag$1] = typedArrayTags[stringTag$1] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike_1(value) &&
    isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
}

var _baseIsTypedArray = baseIsTypedArray;

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

var _baseUnary = baseUnary;

var _nodeUtil = createCommonjsModule(function (module, exports) {
/** Detect free variable `exports`. */
var freeExports =  exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && _freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    }

    // Legacy `process.binding('util')` for Node.js < 10.
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;
});

/* Node.js helper references. */
var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

/**
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
 */
var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

var isTypedArray_1 = isTypedArray;

/** Used for built-in method references. */
var objectProto$7 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray_1(value),
      isArg = !isArr && isArguments_1(value),
      isBuff = !isArr && !isArg && isBuffer_1(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? _baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           _isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

var _arrayLikeKeys = arrayLikeKeys;

/** Used for built-in method references. */
var objectProto$8 = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

  return value === proto;
}

var _isPrototype = isPrototype;

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

var _overArg = overArg;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = _overArg(Object.keys, Object);

var _nativeKeys = nativeKeys;

/** Used for built-in method references. */
var objectProto$9 = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$6 = objectProto$9.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!_isPrototype(object)) {
    return _nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$6.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

var _baseKeys = baseKeys;

/**
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
 */
function isArrayLike(value) {
  return value != null && isLength_1(value.length) && !isFunction_1(value);
}

var isArrayLike_1 = isArrayLike;

/**
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
 */
function keys(object) {
  return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
}

var keys_1 = keys;

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return _baseGetAllKeys(object, keys_1, _getSymbols);
}

var _getAllKeys = getAllKeys;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$2 = 1;

/** Used for built-in method references. */
var objectProto$a = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$7 = objectProto$a.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG$2,
      objProps = _getAllKeys(object),
      objLength = objProps.length,
      othProps = _getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty$7.call(other, key))) {
      return false;
    }
  }
  // Check that cyclic values are equal.
  var objStacked = stack.get(object);
  var othStacked = stack.get(other);
  if (objStacked && othStacked) {
    return objStacked == other && othStacked == object;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

var _equalObjects = equalObjects;

/* Built-in method references that are verified to be native. */
var DataView = _getNative(_root, 'DataView');

var _DataView = DataView;

/* Built-in method references that are verified to be native. */
var Promise = _getNative(_root, 'Promise');

var _Promise = Promise;

/* Built-in method references that are verified to be native. */
var Set = _getNative(_root, 'Set');

var _Set = Set;

/* Built-in method references that are verified to be native. */
var WeakMap = _getNative(_root, 'WeakMap');

var _WeakMap = WeakMap;

/** `Object#toString` result references. */
var mapTag$2 = '[object Map]',
    objectTag$1 = '[object Object]',
    promiseTag = '[object Promise]',
    setTag$2 = '[object Set]',
    weakMapTag$1 = '[object WeakMap]';

var dataViewTag$2 = '[object DataView]';

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = _toSource(_DataView),
    mapCtorString = _toSource(_Map),
    promiseCtorString = _toSource(_Promise),
    setCtorString = _toSource(_Set),
    weakMapCtorString = _toSource(_WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = _baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
    (_Map && getTag(new _Map) != mapTag$2) ||
    (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
    (_Set && getTag(new _Set) != setTag$2) ||
    (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
  getTag = function(value) {
    var result = _baseGetTag(value),
        Ctor = result == objectTag$1 ? value.constructor : undefined,
        ctorString = Ctor ? _toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag$2;
        case mapCtorString: return mapTag$2;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag$2;
        case weakMapCtorString: return weakMapTag$1;
      }
    }
    return result;
  };
}

var _getTag = getTag;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$3 = 1;

/** `Object#toString` result references. */
var argsTag$2 = '[object Arguments]',
    arrayTag$1 = '[object Array]',
    objectTag$2 = '[object Object]';

/** Used for built-in method references. */
var objectProto$b = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty$8 = objectProto$b.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray_1(object),
      othIsArr = isArray_1(other),
      objTag = objIsArr ? arrayTag$1 : _getTag(object),
      othTag = othIsArr ? arrayTag$1 : _getTag(other);

  objTag = objTag == argsTag$2 ? objectTag$2 : objTag;
  othTag = othTag == argsTag$2 ? objectTag$2 : othTag;

  var objIsObj = objTag == objectTag$2,
      othIsObj = othTag == objectTag$2,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer_1(object)) {
    if (!isBuffer_1(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new _Stack);
    return (objIsArr || isTypedArray_1(object))
      ? _equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : _equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG$3)) {
    var objIsWrapped = objIsObj && hasOwnProperty$8.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty$8.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new _Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new _Stack);
  return _equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

var _baseIsEqualDeep = baseIsEqualDeep;

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike_1(value) && !isObjectLike_1(other))) {
    return value !== value && other !== other;
  }
  return _baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

var _baseIsEqual = baseIsEqual;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$4 = 1,
    COMPARE_UNORDERED_FLAG$2 = 2;

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new _Stack;
      if (customizer) {
        var result = customizer(objValue, srcValue, key, object, source, stack);
      }
      if (!(result === undefined
            ? _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$4 | COMPARE_UNORDERED_FLAG$2, customizer, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

var _baseIsMatch = baseIsMatch;

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject_1(value);
}

var _isStrictComparable = isStrictComparable;

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = keys_1(object),
      length = result.length;

  while (length--) {
    var key = result[length],
        value = object[key];

    result[length] = [key, value, _isStrictComparable(value)];
  }
  return result;
}

var _getMatchData = getMatchData;

/**
 * A specialized version of `matchesProperty` for source values suitable
 * for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function matchesStrictComparable(key, srcValue) {
  return function(object) {
    if (object == null) {
      return false;
    }
    return object[key] === srcValue &&
      (srcValue !== undefined || (key in Object(object)));
  };
}

var _matchesStrictComparable = matchesStrictComparable;

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatches(source) {
  var matchData = _getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    return _matchesStrictComparable(matchData[0][0], matchData[0][1]);
  }
  return function(object) {
    return object === source || _baseIsMatch(object, source, matchData);
  };
}

var _baseMatches = baseMatches;

/** `Object#toString` result references. */
var symbolTag$1 = '[object Symbol]';

/**
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
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike_1(value) && _baseGetTag(value) == symbolTag$1);
}

var isSymbol_1 = isSymbol;

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/;

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray_1(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol_1(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

var _isKey = isKey;

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
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
 * method interface of `clear`, `delete`, `get`, `has`, and `set`.
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
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || _MapCache);
  return memoized;
}

// Expose `MapCache`.
memoize.Cache = _MapCache;

var memoize_1 = memoize;

/** Used as the maximum memoize cache size. */
var MAX_MEMOIZE_SIZE = 500;

/**
 * A specialized version of `_.memoize` which clears the memoized function's
 * cache when it exceeds `MAX_MEMOIZE_SIZE`.
 *
 * @private
 * @param {Function} func The function to have its output memoized.
 * @returns {Function} Returns the new memoized function.
 */
function memoizeCapped(func) {
  var result = memoize_1(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });

  var cache = result.cache;
  return result;
}

var _memoizeCapped = memoizeCapped;

/** Used to match property names within property paths. */
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = _memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46 /* . */) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

var _stringToPath = stringToPath;

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

var _arrayMap = arrayMap;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** Used to convert symbols to primitives and strings. */
var symbolProto$1 = _Symbol ? _Symbol.prototype : undefined,
    symbolToString = symbolProto$1 ? symbolProto$1.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isArray_1(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return _arrayMap(value, baseToString) + '';
  }
  if (isSymbol_1(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

var _baseToString = baseToString;

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : _baseToString(value);
}

var toString_1 = toString;

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @param {Object} [object] The object to query keys on.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value, object) {
  if (isArray_1(value)) {
    return value;
  }
  return _isKey(value, object) ? [value] : _stringToPath(toString_1(value));
}

var _castPath = castPath;

/** Used as references for various `Number` constants. */
var INFINITY$1 = 1 / 0;

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol_1(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY$1) ? '-0' : result;
}

var _toKey = toKey;

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = _castPath(path, object);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[_toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

var _baseGet = baseGet;

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : _baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var get_1 = get;

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}

var _baseHasIn = baseHasIn;

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  path = _castPath(path, object);

  var index = -1,
      length = path.length,
      result = false;

  while (++index < length) {
    var key = _toKey(path[index]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength_1(length) && _isIndex(key, length) &&
    (isArray_1(object) || isArguments_1(object));
}

var _hasPath = hasPath;

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': 2 }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b');
 * // => true
 *
 * _.hasIn(object, ['a', 'b']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return object != null && _hasPath(object, path, _baseHasIn);
}

var hasIn_1 = hasIn;

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG$5 = 1,
    COMPARE_UNORDERED_FLAG$3 = 2;

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new spec function.
 */
function baseMatchesProperty(path, srcValue) {
  if (_isKey(path) && _isStrictComparable(srcValue)) {
    return _matchesStrictComparable(_toKey(path), srcValue);
  }
  return function(object) {
    var objValue = get_1(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn_1(object, path)
      : _baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG$5 | COMPARE_UNORDERED_FLAG$3);
  };
}

var _baseMatchesProperty = baseMatchesProperty;

/**
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
 */
function identity(value) {
  return value;
}

var identity_1 = identity;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

var _baseProperty = baseProperty;

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return _baseGet(object, path);
  };
}

var _basePropertyDeep = basePropertyDeep;

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new accessor function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': 2 } },
 *   { 'a': { 'b': 1 } }
 * ];
 *
 * _.map(objects, _.property('a.b'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
 * // => [1, 2]
 */
function property(path) {
  return _isKey(path) ? _baseProperty(_toKey(path)) : _basePropertyDeep(path);
}

var property_1 = property;

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
  // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
  if (typeof value == 'function') {
    return value;
  }
  if (value == null) {
    return identity_1;
  }
  if (typeof value == 'object') {
    return isArray_1(value)
      ? _baseMatchesProperty(value[0], value[1])
      : _baseMatches(value);
  }
  return property_1(value);
}

var _baseIteratee = baseIteratee;

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} predicate The function invoked per iteration.
 * @param {number} fromIndex The index to search from.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromIndex, fromRight) {
  var length = array.length,
      index = fromIndex + (fromRight ? 1 : -1);

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

var _baseFindIndex = baseFindIndex;

/**
 * The base implementation of `_.isNaN` without support for number objects.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
 */
function baseIsNaN(value) {
  return value !== value;
}

var _baseIsNaN = baseIsNaN;

/**
 * A specialized version of `_.indexOf` which performs strict equality
 * comparisons of values, i.e. `===`.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function strictIndexOf(array, value, fromIndex) {
  var index = fromIndex - 1,
      length = array.length;

  while (++index < length) {
    if (array[index] === value) {
      return index;
    }
  }
  return -1;
}

var _strictIndexOf = strictIndexOf;

/**
 * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} value The value to search for.
 * @param {number} fromIndex The index to search from.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseIndexOf(array, value, fromIndex) {
  return value === value
    ? _strictIndexOf(array, value, fromIndex)
    : _baseFindIndex(array, _baseIsNaN, fromIndex);
}

var _baseIndexOf = baseIndexOf;

/**
 * A specialized version of `_.includes` for arrays without support for
 * specifying an index to search from.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludes(array, value) {
  var length = array == null ? 0 : array.length;
  return !!length && _baseIndexOf(array, value, 0) > -1;
}

var _arrayIncludes = arrayIncludes;

/**
 * This function is like `arrayIncludes` except that it accepts a comparator.
 *
 * @private
 * @param {Array} [array] The array to inspect.
 * @param {*} target The value to search for.
 * @param {Function} comparator The comparator invoked per element.
 * @returns {boolean} Returns `true` if `target` is found, else `false`.
 */
function arrayIncludesWith(array, value, comparator) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (comparator(value, array[index])) {
      return true;
    }
  }
  return false;
}

var _arrayIncludesWith = arrayIncludesWith;

/**
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
 */
function noop() {
  // No operation performed.
}

var noop_1 = noop;

/** Used as references for various `Number` constants. */
var INFINITY$2 = 1 / 0;

/**
 * Creates a set object of `values`.
 *
 * @private
 * @param {Array} values The values to add to the set.
 * @returns {Object} Returns the new set.
 */
var createSet = !(_Set && (1 / _setToArray(new _Set([,-0]))[1]) == INFINITY$2) ? noop_1 : function(values) {
  return new _Set(values);
};

var _createSet = createSet;

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE$1 = 200;

/**
 * The base implementation of `_.uniqBy` without support for iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee] The iteratee invoked per element.
 * @param {Function} [comparator] The comparator invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 */
function baseUniq(array, iteratee, comparator) {
  var index = -1,
      includes = _arrayIncludes,
      length = array.length,
      isCommon = true,
      result = [],
      seen = result;

  if (comparator) {
    isCommon = false;
    includes = _arrayIncludesWith;
  }
  else if (length >= LARGE_ARRAY_SIZE$1) {
    var set = iteratee ? null : _createSet(array);
    if (set) {
      return _setToArray(set);
    }
    isCommon = false;
    includes = _cacheHas;
    seen = new _SetCache;
  }
  else {
    seen = iteratee ? [] : result;
  }
  outer:
  while (++index < length) {
    var value = array[index],
        computed = iteratee ? iteratee(value) : value;

    value = (comparator || value !== 0) ? value : 0;
    if (isCommon && computed === computed) {
      var seenIndex = seen.length;
      while (seenIndex--) {
        if (seen[seenIndex] === computed) {
          continue outer;
        }
      }
      if (iteratee) {
        seen.push(computed);
      }
      result.push(value);
    }
    else if (!includes(seen, computed, comparator)) {
      if (seen !== result) {
        seen.push(computed);
      }
      result.push(value);
    }
  }
  return result;
}

var _baseUniq = baseUniq;

/**
 * This method is like `_.uniq` except that it accepts `iteratee` which is
 * invoked for each element in `array` to generate the criterion by which
 * uniqueness is computed. The order of result values is determined by the
 * order they occur in the array. The iteratee is invoked with one argument:
 * (value).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Array
 * @param {Array} array The array to inspect.
 * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
 * @returns {Array} Returns the new duplicate free array.
 * @example
 *
 * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
 * // => [2.1, 1.2]
 *
 * // The `_.property` iteratee shorthand.
 * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
 * // => [{ 'x': 1 }, { 'x': 2 }]
 */
function uniqBy(array, iteratee) {
  return (array && array.length) ? _baseUniq(array, _baseIteratee(iteratee)) : [];
}

var uniqBy_1 = uniqBy;

function getEnvVars() {
  let isDev = false;
  if (typeof window === 'undefined') {
    isDev = true;
  } else {
    var _window, _window$location, _window$location$host, _window2, _window2$location;
    if ((_window = window) !== null && _window !== void 0 && (_window$location = _window.location) !== null && _window$location !== void 0 && (_window$location$host = _window$location.host) !== null && _window$location$host !== void 0 && _window$location$host.includes('localhost')) isDev = true;
    if (((_window2 = window) === null || _window2 === void 0 ? void 0 : (_window2$location = _window2.location) === null || _window2$location === void 0 ? void 0 : _window2$location.host) === `stage65-az.harvester.co.uk`) isDev = true;
  }
  if (isDev) return {
    FINGERPRINT_API_HOSTNAME: 'https://target-engine-api.starship-staging.com',
    MIXPANEL_TOKEN: 'd122fa924e1ea97d6b98569440c65a95'
  };
  return {
    FINGERPRINT_API_HOSTNAME: 'https://target-engine-api.starship-production.com',
    MIXPANEL_TOKEN: 'cfca3a93becd5735a4f04dc8e10ede27'
  };
}

const headers = {
  'Content-Type': 'application/json'
};
const hostname = getEnvVars().FINGERPRINT_API_HOSTNAME;
const request = {
  get: async (url, params) => {
    return await fetch(url + '?' + new URLSearchParams(params), {
      method: 'GET',
      headers
    });
  },
  post: async (url, body) => {
    return await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    });
  },
  patch: async (url, body) => {
    return await fetch(url, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body)
    });
  },
  put: async (url, body) => {
    return await fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    });
  },
  delete: async url => {
    return await fetch(url, {
      method: 'DELETE',
      headers
    });
  }
};

const LoggingProvider = ({
  debug,
  children
}) => {
  const log = (...message) => {
    if (debug) {
      console.log(...message);
    }
  };
  const warn = (...message) => {
    if (debug) {
      console.warn(...message);
    }
  };
  const error = (...message) => {
    if (debug) {
      console.error(...message);
    }
  };
  const info = (...message) => {
    if (debug) {
      console.info(...message);
    }
  };
  useEffect(() => {
    if (!debug) return;
    log('LoggingProvider: In Debug Mode');
  });
  return React__default.createElement(LoggingContext.Provider, {
    value: {
      log,
      warn,
      error,
      info
    }
  }, children);
};
const LoggingContext = createContext({
  log: () => {},
  warn: () => {},
  error: () => {},
  info: () => {}
});
const useLogging = () => {
  return useContext(LoggingContext);
};

const useCollectorMutation = () => {
  const {
    log,
    error
  } = useLogging();
  return useMutation(data => {
    var _data$visitor;
    return request.post(hostname + '/collector/' + (data === null || data === void 0 ? void 0 : (_data$visitor = data.visitor) === null || _data$visitor === void 0 ? void 0 : _data$visitor.id), data).then(response => {
      log('Collector API response', response);
      return response;
    }).catch(err => {
      error('Collector API error', err);
      return err;
    });
  }, {
    onSuccess: () => {}
  });
};

const useFingerprint = () => {
  return useContext(FingerprintContext);
};

const setCookie = (name, value, expires) => {
  return Cookies.set(name, value, {
    expires: expires || 365,
    sameSite: 'strict'
  });
};
const getCookie = name => {
  return Cookies.get(name);
};
const onCookieChanged = (callback, interval = 1000) => {
  let lastCookie = document.cookie;
  setInterval(() => {
    const cookie = document.cookie;
    if (cookie !== lastCookie) {
      try {
        callback({
          oldValue: lastCookie,
          newValue: cookie
        });
      } finally {
        lastCookie = cookie;
      }
    }
  }, interval);
};

const bootstrapSession = ({
  appId,
  setSession
}) => {
  const session = {
    firstVisit: undefined
  };
  if (!getCookie('_cm') || getCookie('_cm') !== appId) {
    setCookie('_cm', appId, 365);
    setSession(session);
    return;
  }
  if (getCookie('_cm') && getCookie('_cm') === appId) {
    session.firstVisit = false;
    setSession(session);
  }
};

const uuidValidateV4 = uuid => {
  return validate(uuid) && version(uuid) === 4;
};

const validVisitorId = id => {
  return uuidValidateV4(id);
};

const bootstrapVisitor = ({
  setVisitor
}) => {
  const visitor = {
    id: undefined
  };
  if (!getCookie('_cm_id') || !validVisitorId(getCookie('_cm_id'))) {
    const visitorId = v4();
    setCookie('_cm_id', visitorId, 365);
    visitor.id = visitorId;
    setVisitor(visitor);
    return;
  }
  if (getCookie('_cm_id')) {
    visitor.id = getCookie('_cm_id');
    setVisitor(visitor);
  }
};

const VisitorProvider = ({
  children
}) => {
  const {
    appId,
    booted
  } = useFingerprint();
  const {
    log
  } = useLogging();
  const [session, setSession] = useState({});
  const [visitor, setVisitor] = useState({});
  useEffect(() => {
    if (!booted) {
      log('VisitorProvider: not booted');
      return;
    }
    log('VisitorProvider: booting');
    const boot = async () => {
      await bootstrapSession({
        appId,
        setSession
      });
      await bootstrapVisitor({
        setVisitor
      });
    };
    boot();
    log('VisitorProvider: booted', session, visitor);
  }, [appId, booted]);
  return React__default.createElement(VisitorContext.Provider, {
    value: {
      session,
      visitor
    }
  }, children);
};
const VisitorContext = createContext({
  session: {},
  visitor: {}
});
const useVisitor = () => {
  return useContext(VisitorContext);
};

const init = cfg => {
  mixpanel.init(getEnvVars().MIXPANEL_TOKEN, {
    debug: cfg.debug,
    track_pageview: true,
    persistence: 'localStorage'
  });
};
const trackEvent = (event, props, callback) => {
  return mixpanel.track(event, props, callback);
};
const MixpanelProvider = ({
  children
}) => {
  const {
    appId
  } = useFingerprint();
  const {
    visitor
  } = useVisitor();
  const {
    log
  } = useLogging();
  useEffect(() => {
    if (!appId || !visitor.id) {
      return;
    }
    log('MixpanelProvider: booting');
    init({
      debug: true
    });
    log('MixpanelProvider: registering visitor ' + visitor.id + ' to mixpanel');
    mixpanel.identify(visitor.id);
  }, [appId, visitor === null || visitor === void 0 ? void 0 : visitor.id]);
  return React__default.createElement(MixpanelContext.Provider, {
    value: {
      trackEvent
    }
  }, children);
};
const MixpanelContext = createContext({
  trackEvent: () => {}
});
const useMixpanel = () => {
  return useContext(MixpanelContext);
};

const idleStatusAfterMs = 5 * 1000;
function CollectorProvider({
  children,
  handlers = []
}) {
  const {
    log,
    error
  } = useLogging();
  const {
    appId,
    booted,
    initialDelay,
    exitIntentTriggers,
    idleTriggers
  } = useFingerprint();
  const {
    visitor
  } = useVisitor();
  const {
    trackEvent
  } = useMixpanel();
  const {
    mutateAsync: collect
  } = useCollectorMutation();
  const {
    registerHandler
  } = useExitIntent({
    cookie: {
      key: '_cm_exit',
      daysToExpire: 0
    }
  });
  const [idleTimeout, setIdleTimeout] = useState(idleStatusAfterMs);
  const [pageTriggers, setPageTriggers] = useState([]);
  const [displayTrigger, setDisplayTrigger] = useState(undefined);
  const [intently, setIntently] = useState(false);
  const addPageTriggers = triggers => {
    setPageTriggers(prev => uniqBy_1([...prev, ...triggers], 'id'));
  };
  log('CollectorProvider: user is on mobile?', isMobile);
  const shouldLaunchIdleTriggers = isMobile;
  useEffect(() => {
    if (intently) return;
    log('CollectorProvider: removing intently overlay');
    const runningInterval = setInterval(() => {
      const locatedIntentlyScript = document.querySelectorAll('div[id^=smc-v5-overlay-]');
      Array.prototype.forEach.call(locatedIntentlyScript, node => {
        node.parentNode.removeChild(node);
        log('CollectorProvider: successfully removed intently overlay');
        clearInterval(runningInterval);
      });
    }, 100);
    return () => {
      clearInterval(runningInterval);
    };
  }, [intently, log]);
  const TriggerComponent = React__default.useCallback(() => {
    var _handler$invoke, _handler;
    if (!displayTrigger) return null;
    const fakey = {
      id: 'f76e1b0e-480e-4211-8209-db5cb8eb0753',
      invocation: 'INVOCATION_EXIT_INTENT',
      behaviour: 'BEHAVIOUR_MODAL',
      data: {
        backgroundURL: 'https://cdn.fingerprint-staging.host/browns-lamb-shank-800.jpg',
        buttonText: 'Book now',
        buttonURL: 'https://www.browns-restaurants.co.uk/tablebooking#/',
        heading: 'Thought About Christmas?',
        paragraph: 'Celebrate at Browns'
      }
    };
    let handler;
    const trigger = [...pageTriggers, fakey].find(_trigger => {
      const potentialTrigger = _trigger.invocation === displayTrigger;
      const potentialHandler = handlers === null || handlers === void 0 ? void 0 : handlers.find(handler => handler.behaviour === _trigger.behaviour);
      handler = potentialHandler;
      return potentialTrigger && potentialHandler;
    });
    log('CollectorProvider: available triggers include: ', pageTriggers);
    log('CollectorProvider: attempting to show displayTrigger', displayTrigger, trigger);
    if (!trigger) {
      error(`No trigger found for displayTrigger`, displayTrigger);
      return null;
    }
    log('CollectorProvider: available handlers include: ', handlers);
    log('CollectorProvider: trigger to match is: ', trigger);
    log('CollectorProvider: attempting to show trigger', trigger, handler);
    if (!handler) {
      log('No handler found for trigger', trigger);
      return null;
    }
    if (!handler.invoke) {
      log('No invoke method found for handler', handler);
      return null;
    }
    if (!handler.invoke) {
      log('No invoke method found for handler', handler);
      return null;
    }
    const potentialComponent = (_handler$invoke = (_handler = handler).invoke) === null || _handler$invoke === void 0 ? void 0 : _handler$invoke.call(_handler, trigger);
    if (potentialComponent && React__default.isValidElement(potentialComponent)) return potentialComponent;
    return null;
  }, [displayTrigger, error, handlers, log, pageTriggers, handlers]);
  const fireIdleTrigger = useCallback(() => {
    if (!idleTriggers) return;
    log('CollectorProvider: attempting to fire idle trigger');
    setDisplayTrigger('INVOCATION_IDLE_TIME');
  }, [idleTriggers, log]);
  const fireExitTrigger = useCallback(() => {
    log('CollectorProvider: attempting to fire exit trigger');
    setDisplayTrigger('INVOCATION_EXIT_INTENT');
  }, [log, exitIntentTriggers, setDisplayTrigger]);
  useEffect(() => {
    if (!exitIntentTriggers) return;
    if (!shouldLaunchIdleTriggers) return;
    log('CollectorProvider: attempting to register exit trigger');
    registerHandler({
      id: 'clientTrigger',
      handler: fireExitTrigger
    });
  }, [exitIntentTriggers, fireExitTrigger, log, registerHandler, shouldLaunchIdleTriggers]);
  const resetDisplayTrigger = useCallback(() => {
    log('CollectorProvider: resetting displayTrigger');
    setDisplayTrigger(undefined);
  }, [log]);
  useEffect(() => {
    if (!booted) {
      log('CollectorProvider: Not yet collecting, awaiting boot');
      return;
    }
    const delay = setTimeout(() => {
      if (!visitor.id) {
        log('CollectorProvider: Not yet collecting, awaiting visitor ID');
        return;
      }
      log('CollectorProvider: collecting data');
      const params = new URLSearchParams(window.location.search).toString().split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        if (!key) return acc;
        acc[key] = value;
        return acc;
      }, {});
      collect({
        appId,
        visitor,
        page: {
          url: window.location.href,
          path: window.location.pathname,
          title: document.title,
          params
        },
        referrer: {
          url: document.referrer,
          title: '',
          utm: {
            source: params === null || params === void 0 ? void 0 : params.utm_source,
            medium: params === null || params === void 0 ? void 0 : params.utm_medium,
            campaign: params === null || params === void 0 ? void 0 : params.utm_campaign,
            term: params === null || params === void 0 ? void 0 : params.utm_term,
            content: params === null || params === void 0 ? void 0 : params.utm_content
          }
        }
      }).then(async response => {
        if (response.status === 204) {
          setIntently(true);
          return;
        }
        const payload = await response.json();
        log('Sent collector data, retrieved:', payload);
        setIdleTimeout(idleStatusAfterMs);
        addPageTriggers(payload === null || payload === void 0 ? void 0 : payload.pageTriggers);
        if (!payload.intently) {
          log('CollectorProvider: user is in Fingerprint cohort');
          setIntently(false);
          trackEvent('user_cohort', {
            cohort: 'fingerprint'
          });
        } else {
          log('CollectorProvider: user is in Intently cohort');
          setIntently(true);
          trackEvent('user_cohort', {
            cohort: 'intently'
          });
        }
      }).catch(err => {
        error('failed to store collected data', err);
      });
      log('CollectorProvider: collected data');
    }, initialDelay);
    return () => {
      clearTimeout(delay);
    };
  }, [appId, booted, collect, error, handlers, initialDelay, log, trackEvent, visitor]);
  const setTrigger = React__default.useCallback(trigger => {
    log('CollectorProvider: manually setting trigger', trigger);
    addPageTriggers([trigger]);
    setDisplayTrigger(trigger.invocation);
  }, [log, pageTriggers, setDisplayTrigger, addPageTriggers]);
  const collectorContextVal = React__default.useMemo(() => ({
    resetDisplayTrigger,
    setTrigger,
    trackEvent
  }), [resetDisplayTrigger, setTrigger, trackEvent]);
  return React__default.createElement(IdleTimerProvider, {
    timeout: idleTimeout,
    onPresenceChange: presence => {
      log('presence changed', presence);
    },
    onIdle: fireIdleTrigger
  }, React__default.createElement(CollectorContext.Provider, {
    value: collectorContextVal
  }, children), React__default.createElement(TriggerComponent, null));
}
const CollectorContext = createContext({
  resetDisplayTrigger: () => {},
  setTrigger: () => {},
  trackEvent: () => {}
});

const useCollector = () => {
  return useContext(CollectorContext);
};

const CurlyText = ({
  randomHash,
  text
}) => {
  return React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    xmlnsXlink: 'http://www.w3.org/1999/xlink',
    version: '1.1',
    viewBox: '0 0 500 500',
    className: 'f' + randomHash + '-curlyText'
  }, React__default.createElement("defs", null, React__default.createElement("path", {
    id: 'textPath',
    d: 'M 0 500 A 175,100 0 0 1 500,500'
  })), React__default.createElement("text", {
    x: '0',
    y: '0',
    textAnchor: 'middle'
  }, React__default.createElement("textPath", {
    xlinkHref: '#textPath',
    fill: 'white',
    startOffset: '50%'
  }, text)));
};
const Modal = ({
  trigger
}) => {
  var _trigger$data3, _trigger$data4, _trigger$data5, _trigger$data6, _trigger$data7;
  const {
    resetDisplayTrigger,
    trackEvent
  } = useCollector();
  const [open, setOpen] = useState(true);
  const [stylesLoaded, setStylesLoaded] = useState(false);
  const closeModal = () => {
    trackEvent('user_closed_trigger', trigger);
    resetDisplayTrigger();
    setOpen(false);
  };
  const redirectUser = e => {
    var _trigger$data, _trigger$data2;
    e.preventDefault();
    trackEvent('user_clicked_button', trigger);
    (trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.buttonURL) && window.open(trigger === null || trigger === void 0 ? void 0 : (_trigger$data2 = trigger.data) === null || _trigger$data2 === void 0 ? void 0 : _trigger$data2.buttonURL, '_self');
  };
  const randomHash = useMemo(() => {
    return v4().split('-')[0];
  }, []);
  useEffect(() => {
    if (!open) return;
  }, []);
  useEffect(() => {
    const css = `
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

.f` + randomHash + `-overlay {
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

.f` + randomHash + `-modal {
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
  .f` + randomHash + `-modal {
    width: 50%;
    max-width: 600px;
  }
}

.f` + randomHash + `-modalImage {
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
  .f` + randomHash + `-modal {
    width: 100vw;
  }
}


.f` + randomHash + `-curlyText {
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

.f` + randomHash + `-curlyText text {
  font-size: 1.3rem;
}


.f` + randomHash + `-mainText {
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
  .f` + randomHash + `-curlyText {
    margin-top: -200px;
  }
}

@media screen and (min-width: 1024px) {
  .f` + randomHash + `-curlyText {
    margin-top: -200px;
  }

  .f` + randomHash + `-mainText {
    font-size: 2.4rem;
  }
}

@media screen and (min-width: 1150px) {
  .f` + randomHash + `-mainText {
    font-size: 2.7rem;
  }
}

.f` + randomHash + `-cta {
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

.f` + randomHash + `-cta:hover {
  transition: all 0.3s;
  filter: brightness(0.95);
}

.f` + randomHash + `-close-button {
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

.f` + randomHash + `-button-container {
  flex: 1;
  display: grid;
  place-content: center;
}

.f` + randomHash + `-image-darken {
  background: rgba(0,0,0,0.2);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
}
    `;
    const styles = document.createElement('style');
    styles.type = 'text/css';
    styles.appendChild(document.createTextNode(css));
    document.head.appendChild(styles);
    setStylesLoaded(true);
  });
  if (!stylesLoaded) {
    return null;
  }
  if (!open) {
    return null;
  }
  if (!stylesLoaded) {
    return null;
  }
  return React__default.createElement("div", {
    className: 'f' + randomHash + '-overlay'
  }, React__default.createElement("div", {
    className: 'f' + randomHash + '-modal',
    style: {
      background: `url(${trigger === null || trigger === void 0 ? void 0 : (_trigger$data3 = trigger.data) === null || _trigger$data3 === void 0 ? void 0 : _trigger$data3.backgroundURL})`,
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'relative',
      height: 500
    }
  }, React__default.createElement("div", {
    className: 'f' + randomHash + '-image-darken'
  }, React__default.createElement("button", {
    className: 'f' + randomHash + '-close-button',
    onClick: closeModal
  }, React__default.createElement("svg", {
    xmlns: 'http://www.w3.org/2000/svg',
    width: '16',
    height: '16',
    viewBox: '0 0 16 16'
  }, React__default.createElement("path", {
    fill: '#000',
    fillRule: 'evenodd',
    d: 'M8.707 8l3.647-3.646a.5.5 0 0 0-.708-.708L8 7.293 4.354 3.646a.5.5 0 1 0-.708.708L7.293 8l-3.647 3.646a.5.5 0 0 0 .708.708L8 8.707l3.646 3.647a.5.5 0 0 0 .708-.708L8.707 8z'
  }))), React__default.createElement(CurlyText, {
    text: trigger === null || trigger === void 0 ? void 0 : (_trigger$data4 = trigger.data) === null || _trigger$data4 === void 0 ? void 0 : _trigger$data4.heading,
    randomHash: randomHash
  }), React__default.createElement("div", {
    style: {
      flex: 1
    },
    className: 'f' + randomHash + '--spacer'
  }), React__default.createElement("div", {
    style: {
      flex: 1,
      marginTop: -150,
      textTransform: 'uppercase',
      textAlign: 'center',
      letterSpacing: '2pt'
    }
  }, React__default.createElement("span", {
    className: 'f' + randomHash + '-mainText'
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data5 = trigger.data) === null || _trigger$data5 === void 0 ? void 0 : _trigger$data5.paragraph)), React__default.createElement("div", {
    className: 'f' + randomHash + '-buttonContainer'
  }, React__default.createElement("a", {
    href: trigger === null || trigger === void 0 ? void 0 : (_trigger$data6 = trigger.data) === null || _trigger$data6 === void 0 ? void 0 : _trigger$data6.buttonURL,
    className: 'f' + randomHash + '-cta',
    onClick: e => redirectUser(e)
  }, trigger === null || trigger === void 0 ? void 0 : (_trigger$data7 = trigger.data) === null || _trigger$data7 === void 0 ? void 0 : _trigger$data7.buttonText)))));
};
const TriggerModal = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Modal, {
    trigger: trigger
  }), document.body);
};

const Youtube = ({
  trigger
}) => {
  var _trigger$brand, _trigger$brand2, _trigger$brand3, _trigger$brand4, _trigger$data;
  const [open, setOpen] = useState(true);
  if (!open) {
    return null;
  }
  return React__default.createElement("div", {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 9999
    }
  }, React__default.createElement("div", {
    style: {
      background: "#fff url('" + (trigger === null || trigger === void 0 ? void 0 : (_trigger$brand = trigger.brand) === null || _trigger$brand === void 0 ? void 0 : _trigger$brand.backgroundImage) + "') no-repeat center center",
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      backgroundColor: '#fff',
      borderRadius: '0.5rem',
      padding: 0,
      boxShadow: '0 0 1rem rgba(0,0,0,0.5)',
      border: '3px solid white',
      zIndex: 9999
    }
  }, React__default.createElement("div", {
    style: {
      backgroundColor: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand2 = trigger.brand) === null || _trigger$brand2 === void 0 ? void 0 : _trigger$brand2.overlayColor,
      maxWidth: '600px',
      padding: '2rem',
      borderRadius: '0.5rem'
    }
  }, React__default.createElement("button", {
    onClick: () => {
      setOpen(false);
    },
    style: {
      position: 'absolute',
      top: '0.5rem',
      right: '0.5rem',
      fontSize: '2rem',
      backgroundColor: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand3 = trigger.brand) === null || _trigger$brand3 === void 0 ? void 0 : _trigger$brand3.fontColor,
      color: trigger === null || trigger === void 0 ? void 0 : (_trigger$brand4 = trigger.brand) === null || _trigger$brand4 === void 0 ? void 0 : _trigger$brand4.primaryColor,
      border: 'none',
      borderRadius: '0.5rem',
      padding: '0 1rem'
    }
  }, "\u00D7"), React__default.createElement("iframe", {
    src: trigger === null || trigger === void 0 ? void 0 : (_trigger$data = trigger.data) === null || _trigger$data === void 0 ? void 0 : _trigger$data.url,
    allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
    style: {
      width: '500px',
      height: '260px',
      marginTop: '1rem'
    }
  }))));
};
const TriggerYoutube = ({
  trigger
}) => {
  return ReactDOM.createPortal(React__default.createElement(Youtube, {
    trigger: trigger
  }), document.body);
};

const clientHandlers = [{
  id: 'modal_v1',
  behaviour: 'BEHAVIOUR_MODAL',
  invoke: trigger => React__default.createElement(TriggerModal, {
    trigger: trigger
  })
}, {
  id: 'youtube_v1',
  behaviour: 'youtube',
  invoke: trigger => React__default.createElement(TriggerYoutube, {
    trigger: trigger
  })
}, {
  id: 'inverse_v1',
  behaviour: 'inverse_flow',
  invoke: trigger => React__default.createElement(TriggerInverse, {
    trigger: trigger
  })
}];

const queryClient = new QueryClient();
const FingerprintProvider = ({
  appId,
  children,
  consent: _consent = false,
  consentCallback,
  debug,
  defaultHandlers,
  initialDelay: _initialDelay = 0,
  exitIntentTriggers: _exitIntentTriggers = true,
  idleTriggers: _idleTriggers = true
}) => {
  const [consentGiven, setConsentGiven] = useState(_consent);
  const [booted, setBooted] = useState(false);
  const [handlers, setHandlers] = useState(defaultHandlers || clientHandlers);
  const registerHandler = React__default.useCallback(trigger => {
    setHandlers(handlers => {
      return [...handlers, trigger];
    });
  }, [setHandlers]);
  useEffect(() => {
    if (_consent) {
      setConsentGiven(_consent);
      return;
    }
    console.log('Fingerprint Widget Consent: ', _consent);
    if (!consentCallback) return;
    const consentGivenViaCallback = consentCallback();
    const interval = setInterval(() => {
      setConsentGiven(_consent);
    }, 1000);
    if (consentGivenViaCallback) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [consentCallback, _consent]);
  useEffect(() => {
    if (!appId) {
      throw new Error('C&M Fingerprint: appId is required');
    }
    if (booted) {
      return;
    }
    if (!consentGiven) {
      return;
    }
    const performBoot = async () => {
      setBooted(true);
    };
    performBoot();
  }, [consentGiven]);
  if (!appId) {
    return null;
  }
  if (!consentGiven) {
    return children;
  }
  return React__default.createElement(LoggingProvider, {
    debug: debug
  }, React__default.createElement(QueryClientProvider, {
    client: queryClient
  }, React__default.createElement(FingerprintContext.Provider, {
    value: {
      appId,
      booted,
      currentTrigger: {},
      registerHandler,
      trackEvent: () => {
        alert('trackEvent not implemented');
      },
      trackPageView: () => {
        alert('trackPageView not implemented');
      },
      unregisterHandler: () => {
        alert('unregisterHandler not implemented');
      },
      initialDelay: _initialDelay,
      idleTriggers: _idleTriggers,
      exitIntentTriggers: _exitIntentTriggers
    }
  }, React__default.createElement(VisitorProvider, null, React__default.createElement(MixpanelProvider, null, React__default.createElement(CollectorProvider, {
    handlers: handlers
  }, React__default.createElement(ErrorBoundary, {
    onError: (error, info) => console.error(error, info),
    fallback: React__default.createElement("div", null, "An application error occurred.")
  }, children)))))));
};
const defaultFingerprintState = {
  appId: '',
  booted: false,
  consent: false,
  currentTrigger: {},
  exitIntentTriggers: false,
  idleTriggers: false,
  initialDelay: 0,
  registerHandler: () => {},
  trackEvent: () => {},
  trackPageView: () => {},
  unregisterHandler: () => {}
};
const FingerprintContext = createContext({
  ...defaultFingerprintState
});

export { CollectorContext, CollectorProvider, FingerprintContext, FingerprintProvider, onCookieChanged, useCollector, useFingerprint };
//# sourceMappingURL=index.modern.js.map
