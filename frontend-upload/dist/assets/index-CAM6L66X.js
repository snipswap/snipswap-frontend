var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
import { r as reactExports, a as reactDomExports, g as getDefaultExportFromCjs, R as React$3, b as React$4 } from "./vendor-CNj5xcql.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$1 = reactExports, k$2 = Symbol.for("react.element"), l$1 = Symbol.for("react.fragment"), m$2 = Object.prototype.hasOwnProperty, n$1 = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q$1(c2, a2, g2) {
  var b2, d2 = {}, e3 = null, h2 = null;
  void 0 !== g2 && (e3 = "" + g2);
  void 0 !== a2.key && (e3 = "" + a2.key);
  void 0 !== a2.ref && (h2 = a2.ref);
  for (b2 in a2) m$2.call(a2, b2) && !p$1.hasOwnProperty(b2) && (d2[b2] = a2[b2]);
  if (c2 && c2.defaultProps) for (b2 in a2 = c2.defaultProps, a2) void 0 === d2[b2] && (d2[b2] = a2[b2]);
  return { $$typeof: k$2, type: c2, key: e3, ref: h2, props: d2, _owner: n$1.current };
}
reactJsxRuntime_production_min.Fragment = l$1;
reactJsxRuntime_production_min.jsx = q$1;
reactJsxRuntime_production_min.jsxs = q$1;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var m$1 = reactDomExports;
{
  client.createRoot = m$1.createRoot;
  client.hydrateRoot = m$1.hydrateRoot;
}
function r$1(e3) {
  var t2, f2, n2 = "";
  if ("string" == typeof e3 || "number" == typeof e3) n2 += e3;
  else if ("object" == typeof e3) if (Array.isArray(e3)) {
    var o = e3.length;
    for (t2 = 0; t2 < o; t2++) e3[t2] && (f2 = r$1(e3[t2])) && (n2 && (n2 += " "), n2 += f2);
  } else for (f2 in e3) e3[f2] && (n2 && (n2 += " "), n2 += f2);
  return n2;
}
function clsx() {
  for (var e3, t2, f2 = 0, n2 = "", o = arguments.length; f2 < o; f2++) (e3 = arguments[f2]) && (t2 = r$1(e3)) && (n2 && (n2 += " "), n2 += t2);
  return n2;
}
var get$2 = {};
var isUnsafeProperty = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isUnsafeProperty2(key) {
    return key === "__proto__";
  }
  exports.isUnsafeProperty = isUnsafeProperty2;
})(isUnsafeProperty);
var isDeepKey = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isDeepKey2(key) {
    switch (typeof key) {
      case "number":
      case "symbol": {
        return false;
      }
      case "string": {
        return key.includes(".") || key.includes("[") || key.includes("]");
      }
    }
  }
  exports.isDeepKey = isDeepKey2;
})(isDeepKey);
var toKey = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function toKey2(value) {
    var _a;
    if (typeof value === "string" || typeof value === "symbol") {
      return value;
    }
    if (Object.is((_a = value == null ? void 0 : value.valueOf) == null ? void 0 : _a.call(value), -0)) {
      return "-0";
    }
    return String(value);
  }
  exports.toKey = toKey2;
})(toKey);
var toPath = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function toPath2(deepKey) {
    const result = [];
    const length = deepKey.length;
    if (length === 0) {
      return result;
    }
    let index = 0;
    let key = "";
    let quoteChar = "";
    let bracket = false;
    if (deepKey.charCodeAt(0) === 46) {
      result.push("");
      index++;
    }
    while (index < length) {
      const char = deepKey[index];
      if (quoteChar) {
        if (char === "\\" && index + 1 < length) {
          index++;
          key += deepKey[index];
        } else if (char === quoteChar) {
          quoteChar = "";
        } else {
          key += char;
        }
      } else if (bracket) {
        if (char === '"' || char === "'") {
          quoteChar = char;
        } else if (char === "]") {
          bracket = false;
          result.push(key);
          key = "";
        } else {
          key += char;
        }
      } else {
        if (char === "[") {
          bracket = true;
          if (key) {
            result.push(key);
            key = "";
          }
        } else if (char === ".") {
          if (key) {
            result.push(key);
            key = "";
          }
        } else {
          key += char;
        }
      }
      index++;
    }
    if (key) {
      result.push(key);
    }
    return result;
  }
  exports.toPath = toPath2;
})(toPath);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isUnsafeProperty$1 = isUnsafeProperty;
  const isDeepKey$1 = isDeepKey;
  const toKey$1 = toKey;
  const toPath$1 = toPath;
  function get2(object2, path, defaultValue) {
    if (object2 == null) {
      return defaultValue;
    }
    switch (typeof path) {
      case "string": {
        if (isUnsafeProperty$1.isUnsafeProperty(path)) {
          return defaultValue;
        }
        const result = object2[path];
        if (result === void 0) {
          if (isDeepKey$1.isDeepKey(path)) {
            return get2(object2, toPath$1.toPath(path), defaultValue);
          } else {
            return defaultValue;
          }
        }
        return result;
      }
      case "number":
      case "symbol": {
        if (typeof path === "number") {
          path = toKey$1.toKey(path);
        }
        const result = object2[path];
        if (result === void 0) {
          return defaultValue;
        }
        return result;
      }
      default: {
        if (Array.isArray(path)) {
          return getWithPath(object2, path, defaultValue);
        }
        if (Object.is(path == null ? void 0 : path.valueOf(), -0)) {
          path = "-0";
        } else {
          path = String(path);
        }
        if (isUnsafeProperty$1.isUnsafeProperty(path)) {
          return defaultValue;
        }
        const result = object2[path];
        if (result === void 0) {
          return defaultValue;
        }
        return result;
      }
    }
  }
  function getWithPath(object2, path, defaultValue) {
    if (path.length === 0) {
      return defaultValue;
    }
    let current2 = object2;
    for (let index = 0; index < path.length; index++) {
      if (current2 == null) {
        return defaultValue;
      }
      if (isUnsafeProperty$1.isUnsafeProperty(path[index])) {
        return defaultValue;
      }
      current2 = current2[path[index]];
    }
    if (current2 === void 0) {
      return defaultValue;
    }
    return current2;
  }
  exports.get = get2;
})(get$2);
var get = get$2.get;
const get$1 = /* @__PURE__ */ getDefaultExportFromCjs(get);
var reactIs = { exports: {} };
var reactIs_production_min = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = "function" === typeof Symbol && Symbol.for, c$1 = b ? Symbol.for("react.element") : 60103, d = b ? Symbol.for("react.portal") : 60106, e = b ? Symbol.for("react.fragment") : 60107, f = b ? Symbol.for("react.strict_mode") : 60108, g = b ? Symbol.for("react.profiler") : 60114, h = b ? Symbol.for("react.provider") : 60109, k$1 = b ? Symbol.for("react.context") : 60110, l = b ? Symbol.for("react.async_mode") : 60111, m = b ? Symbol.for("react.concurrent_mode") : 60111, n = b ? Symbol.for("react.forward_ref") : 60112, p = b ? Symbol.for("react.suspense") : 60113, q = b ? Symbol.for("react.suspense_list") : 60120, r = b ? Symbol.for("react.memo") : 60115, t = b ? Symbol.for("react.lazy") : 60116, v = b ? Symbol.for("react.block") : 60121, w = b ? Symbol.for("react.fundamental") : 60117, x$1 = b ? Symbol.for("react.responder") : 60118, y$1 = b ? Symbol.for("react.scope") : 60119;
function z(a2) {
  if ("object" === typeof a2 && null !== a2) {
    var u = a2.$$typeof;
    switch (u) {
      case c$1:
        switch (a2 = a2.type, a2) {
          case l:
          case m:
          case e:
          case g:
          case f:
          case p:
            return a2;
          default:
            switch (a2 = a2 && a2.$$typeof, a2) {
              case k$1:
              case n:
              case t:
              case r:
              case h:
                return a2;
              default:
                return u;
            }
        }
      case d:
        return u;
    }
  }
}
function A(a2) {
  return z(a2) === m;
}
reactIs_production_min.AsyncMode = l;
reactIs_production_min.ConcurrentMode = m;
reactIs_production_min.ContextConsumer = k$1;
reactIs_production_min.ContextProvider = h;
reactIs_production_min.Element = c$1;
reactIs_production_min.ForwardRef = n;
reactIs_production_min.Fragment = e;
reactIs_production_min.Lazy = t;
reactIs_production_min.Memo = r;
reactIs_production_min.Portal = d;
reactIs_production_min.Profiler = g;
reactIs_production_min.StrictMode = f;
reactIs_production_min.Suspense = p;
reactIs_production_min.isAsyncMode = function(a2) {
  return A(a2) || z(a2) === l;
};
reactIs_production_min.isConcurrentMode = A;
reactIs_production_min.isContextConsumer = function(a2) {
  return z(a2) === k$1;
};
reactIs_production_min.isContextProvider = function(a2) {
  return z(a2) === h;
};
reactIs_production_min.isElement = function(a2) {
  return "object" === typeof a2 && null !== a2 && a2.$$typeof === c$1;
};
reactIs_production_min.isForwardRef = function(a2) {
  return z(a2) === n;
};
reactIs_production_min.isFragment = function(a2) {
  return z(a2) === e;
};
reactIs_production_min.isLazy = function(a2) {
  return z(a2) === t;
};
reactIs_production_min.isMemo = function(a2) {
  return z(a2) === r;
};
reactIs_production_min.isPortal = function(a2) {
  return z(a2) === d;
};
reactIs_production_min.isProfiler = function(a2) {
  return z(a2) === g;
};
reactIs_production_min.isStrictMode = function(a2) {
  return z(a2) === f;
};
reactIs_production_min.isSuspense = function(a2) {
  return z(a2) === p;
};
reactIs_production_min.isValidElementType = function(a2) {
  return "string" === typeof a2 || "function" === typeof a2 || a2 === e || a2 === m || a2 === g || a2 === f || a2 === p || a2 === q || "object" === typeof a2 && null !== a2 && (a2.$$typeof === t || a2.$$typeof === r || a2.$$typeof === h || a2.$$typeof === k$1 || a2.$$typeof === n || a2.$$typeof === w || a2.$$typeof === x$1 || a2.$$typeof === y$1 || a2.$$typeof === v);
};
reactIs_production_min.typeOf = z;
{
  reactIs.exports = reactIs_production_min;
}
var reactIsExports = reactIs.exports;
var mathSign = (value) => {
  if (value === 0) {
    return 0;
  }
  if (value > 0) {
    return 1;
  }
  return -1;
};
var isNan = (value) => {
  return typeof value == "number" && value != +value;
};
var isPercent = (value) => typeof value === "string" && value.indexOf("%") === value.length - 1;
var isNumber = (value) => (typeof value === "number" || value instanceof Number) && !isNan(value);
var isNumOrStr = (value) => isNumber(value) || typeof value === "string";
var idCounter = 0;
var uniqueId = (prefix2) => {
  var id = ++idCounter;
  return "".concat(prefix2 || "").concat(id);
};
var getPercentValue = function getPercentValue2(percent, totalValue) {
  var defaultValue = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  var validate = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  if (!isNumber(percent) && typeof percent !== "string") {
    return defaultValue;
  }
  var value;
  if (isPercent(percent)) {
    if (totalValue == null) {
      return defaultValue;
    }
    var index = percent.indexOf("%");
    value = totalValue * parseFloat(percent.slice(0, index)) / 100;
  } else {
    value = +percent;
  }
  if (isNan(value)) {
    value = defaultValue;
  }
  if (validate && totalValue != null && value > totalValue) {
    value = totalValue;
  }
  return value;
};
var hasDuplicate = (ary) => {
  if (!Array.isArray(ary)) {
    return false;
  }
  var len = ary.length;
  var cache = {};
  for (var i = 0; i < len; i++) {
    if (!cache[ary[i]]) {
      cache[ary[i]] = true;
    } else {
      return true;
    }
  }
  return false;
};
function interpolate$1(start, end, t2) {
  if (isNumber(start) && isNumber(end)) {
    return start + t2 * (end - start);
  }
  return end;
}
function findEntryInArray(ary, specifiedKey, specifiedValue) {
  if (!ary || !ary.length) {
    return void 0;
  }
  return ary.find((entry) => entry && (typeof specifiedKey === "function" ? specifiedKey(entry) : get$1(entry, specifiedKey)) === specifiedValue);
}
var isNullish = (value) => {
  return value === null || typeof value === "undefined";
};
var upperFirst = (value) => {
  if (isNullish(value)) {
    return value;
  }
  return "".concat(value.charAt(0).toUpperCase()).concat(value.slice(1));
};
var EventKeys = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function isEventKey(key) {
  if (typeof key !== "string") {
    return false;
  }
  var allowedEventKeys = EventKeys;
  return allowedEventKeys.includes(key);
}
var SVGContainerPropKeys = ["viewBox", "children"];
var PolyElementKeys = ["points", "pathLength"];
var FilteredElementKeyMap = {
  svg: SVGContainerPropKeys,
  polygon: PolyElementKeys,
  polyline: PolyElementKeys
};
var adaptEventHandlers = (props, newHandler) => {
  if (!props || typeof props === "function" || typeof props === "boolean") {
    return null;
  }
  var inputProps = props;
  if (/* @__PURE__ */ reactExports.isValidElement(props)) {
    inputProps = props.props;
  }
  if (typeof inputProps !== "object" && typeof inputProps !== "function") {
    return null;
  }
  var out = {};
  Object.keys(inputProps).forEach((key) => {
    if (isEventKey(key)) {
      out[key] = (e3) => inputProps[key](inputProps, e3);
    }
  });
  return out;
};
var getEventHandlerOfChild = (originalHandler, data, index) => (e3) => {
  originalHandler(data, index, e3);
  return null;
};
var adaptEventsOfChild = (props, data, index) => {
  if (props === null || typeof props !== "object" && typeof props !== "function") {
    return null;
  }
  var out = null;
  Object.keys(props).forEach((key) => {
    var item = props[key];
    if (isEventKey(key) && typeof item === "function") {
      if (!out) out = {};
      out[key] = getEventHandlerOfChild(item, data, index);
    }
  });
  return out;
};
var SVGElementPropKeys = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
];
function isSvgElementPropKey(key) {
  if (typeof key !== "string") {
    return false;
  }
  var allowedSvgKeys = SVGElementPropKeys;
  return allowedSvgKeys.includes(key);
}
function svgPropertiesNoEvents(obj) {
  var filteredEntries = Object.entries(obj).filter((_ref2) => {
    var [key] = _ref2;
    return isSvgElementPropKey(key);
  });
  return Object.fromEntries(filteredEntries);
}
var getDisplayName = (Comp) => {
  if (typeof Comp === "string") {
    return Comp;
  }
  if (!Comp) {
    return "";
  }
  return Comp.displayName || Comp.name || "Component";
};
var lastChildren = null;
var lastResult = null;
var toArray$1 = (children) => {
  if (children === lastChildren && Array.isArray(lastResult)) {
    return lastResult;
  }
  var result = [];
  reactExports.Children.forEach(children, (child) => {
    if (isNullish(child)) return;
    if (reactIsExports.isFragment(child)) {
      result = result.concat(toArray$1(child.props.children));
    } else {
      result.push(child);
    }
  });
  lastResult = result;
  lastChildren = children;
  return result;
};
function findAllByType(children, type) {
  var result = [];
  var types = [];
  if (Array.isArray(type)) {
    types = type.map((t2) => getDisplayName(t2));
  } else {
    types = [getDisplayName(type)];
  }
  toArray$1(children).forEach((child) => {
    var childType = get$1(child, "type.displayName") || get$1(child, "type.name");
    if (types.indexOf(childType) !== -1) {
      result.push(child);
    }
  });
  return result;
}
var isClipDot = (dot) => {
  if (dot && typeof dot === "object" && "clipDot" in dot) {
    return Boolean(dot.clipDot);
  }
  return true;
};
var isValidSpreadableProp = (property2, key, includeEvents, svgElementType) => {
  var _ref2;
  if (typeof key === "symbol" || typeof key === "number") {
    return true;
  }
  var matchingElementTypeKeys = (_ref2 = svgElementType && (FilteredElementKeyMap === null || FilteredElementKeyMap === void 0 ? void 0 : FilteredElementKeyMap[svgElementType])) !== null && _ref2 !== void 0 ? _ref2 : [];
  var isDataAttribute = key.startsWith("data-");
  var isSpecificSvgAttribute = typeof property2 !== "function" && (Boolean(svgElementType) && matchingElementTypeKeys.includes(key) || isSvgElementPropKey(key));
  var isEventAttribute = Boolean(includeEvents) && isEventKey(key);
  return isDataAttribute || isSpecificSvgAttribute || isEventAttribute;
};
var filterProps = (props, includeEvents, svgElementType) => {
  if (!props || typeof props === "function" || typeof props === "boolean") {
    return null;
  }
  var inputProps = props;
  if (/* @__PURE__ */ reactExports.isValidElement(props)) {
    inputProps = props.props;
  }
  if (typeof inputProps !== "object" && typeof inputProps !== "function") {
    return null;
  }
  var out = {};
  Object.keys(inputProps).forEach((key) => {
    var _inputProps;
    if (isValidSpreadableProp((_inputProps = inputProps) === null || _inputProps === void 0 ? void 0 : _inputProps[key], key, includeEvents, svgElementType)) {
      out[key] = inputProps[key];
    }
  });
  return out;
};
var _excluded$j = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function _extends$m() {
  return _extends$m = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$m.apply(null, arguments);
}
function _objectWithoutProperties$j(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$j(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$j(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var Surface = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var {
    children,
    width,
    height,
    viewBox,
    className,
    style,
    title,
    desc
  } = props, others = _objectWithoutProperties$j(props, _excluded$j);
  var svgView = viewBox || {
    width,
    height,
    x: 0,
    y: 0
  };
  var layerClass = clsx("recharts-surface", className);
  return /* @__PURE__ */ reactExports.createElement("svg", _extends$m({}, filterProps(others, true, "svg"), {
    className: layerClass,
    width,
    height,
    style,
    viewBox: "".concat(svgView.x, " ").concat(svgView.y, " ").concat(svgView.width, " ").concat(svgView.height),
    ref
  }), /* @__PURE__ */ reactExports.createElement("title", null, title), /* @__PURE__ */ reactExports.createElement("desc", null, desc), children);
});
var _excluded$i = ["children", "className"];
function _extends$l() {
  return _extends$l = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$l.apply(null, arguments);
}
function _objectWithoutProperties$i(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$i(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$i(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var Layer = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var {
    children,
    className
  } = props, others = _objectWithoutProperties$i(props, _excluded$i);
  var layerClass = clsx("recharts-layer", className);
  return /* @__PURE__ */ reactExports.createElement("g", _extends$l({
    className: layerClass
  }, filterProps(others, true), {
    ref
  }), children);
});
var LegendPortalContext = /* @__PURE__ */ reactExports.createContext(null);
function constant$1(x2) {
  return function constant2() {
    return x2;
  };
}
const cos = Math.cos;
const sin = Math.sin;
const sqrt$1 = Math.sqrt;
const pi$1 = Math.PI;
const tau$1 = 2 * pi$1;
const pi = Math.PI, tau = 2 * pi, epsilon = 1e-6, tauEpsilon = tau - epsilon;
function append(strings) {
  this._ += strings[0];
  for (let i = 1, n2 = strings.length; i < n2; ++i) {
    this._ += arguments[i] + strings[i];
  }
}
function appendRound(digits) {
  let d2 = Math.floor(digits);
  if (!(d2 >= 0)) throw new Error(`invalid digits: ${digits}`);
  if (d2 > 15) return append;
  const k2 = 10 ** d2;
  return function(strings) {
    this._ += strings[0];
    for (let i = 1, n2 = strings.length; i < n2; ++i) {
      this._ += Math.round(arguments[i] * k2) / k2 + strings[i];
    }
  };
}
class Path {
  constructor(digits) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null;
    this._ = "";
    this._append = digits == null ? append : appendRound(digits);
  }
  moveTo(x2, y2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}`;
  }
  closePath() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._append`Z`;
    }
  }
  lineTo(x2, y2) {
    this._append`L${this._x1 = +x2},${this._y1 = +y2}`;
  }
  quadraticCurveTo(x1, y1, x2, y2) {
    this._append`Q${+x1},${+y1},${this._x1 = +x2},${this._y1 = +y2}`;
  }
  bezierCurveTo(x1, y1, x2, y2, x3, y3) {
    this._append`C${+x1},${+y1},${+x2},${+y2},${this._x1 = +x3},${this._y1 = +y3}`;
  }
  arcTo(x1, y1, x2, y2, r2) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r2 = +r2;
    if (r2 < 0) throw new Error(`negative radius: ${r2}`);
    let x0 = this._x1, y0 = this._y1, x21 = x2 - x1, y21 = y2 - y1, x01 = x0 - x1, y01 = y0 - y1, l01_2 = x01 * x01 + y01 * y01;
    if (this._x1 === null) {
      this._append`M${this._x1 = x1},${this._y1 = y1}`;
    } else if (!(l01_2 > epsilon)) ;
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r2) {
      this._append`L${this._x1 = x1},${this._y1 = y1}`;
    } else {
      let x20 = x2 - x0, y20 = y2 - y0, l21_2 = x21 * x21 + y21 * y21, l20_2 = x20 * x20 + y20 * y20, l21 = Math.sqrt(l21_2), l01 = Math.sqrt(l01_2), l2 = r2 * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2), t01 = l2 / l01, t21 = l2 / l21;
      if (Math.abs(t01 - 1) > epsilon) {
        this._append`L${x1 + t01 * x01},${y1 + t01 * y01}`;
      }
      this._append`A${r2},${r2},0,0,${+(y01 * x20 > x01 * y20)},${this._x1 = x1 + t21 * x21},${this._y1 = y1 + t21 * y21}`;
    }
  }
  arc(x2, y2, r2, a0, a1, ccw) {
    x2 = +x2, y2 = +y2, r2 = +r2, ccw = !!ccw;
    if (r2 < 0) throw new Error(`negative radius: ${r2}`);
    let dx = r2 * Math.cos(a0), dy = r2 * Math.sin(a0), x0 = x2 + dx, y0 = y2 + dy, cw = 1 ^ ccw, da = ccw ? a0 - a1 : a1 - a0;
    if (this._x1 === null) {
      this._append`M${x0},${y0}`;
    } else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._append`L${x0},${y0}`;
    }
    if (!r2) return;
    if (da < 0) da = da % tau + tau;
    if (da > tauEpsilon) {
      this._append`A${r2},${r2},0,1,${cw},${x2 - dx},${y2 - dy}A${r2},${r2},0,1,${cw},${this._x1 = x0},${this._y1 = y0}`;
    } else if (da > epsilon) {
      this._append`A${r2},${r2},0,${+(da >= pi)},${cw},${this._x1 = x2 + r2 * Math.cos(a1)},${this._y1 = y2 + r2 * Math.sin(a1)}`;
    }
  }
  rect(x2, y2, w2, h2) {
    this._append`M${this._x0 = this._x1 = +x2},${this._y0 = this._y1 = +y2}h${w2 = +w2}v${+h2}h${-w2}Z`;
  }
  toString() {
    return this._;
  }
}
function withPath(shape) {
  let digits = 3;
  shape.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) {
      digits = null;
    } else {
      const d2 = Math.floor(_);
      if (!(d2 >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d2;
    }
    return shape;
  };
  return () => new Path(digits);
}
function array(x2) {
  return typeof x2 === "object" && "length" in x2 ? x2 : Array.from(x2);
}
function Linear(context) {
  this._context = context;
}
Linear.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(x2, y2);
        break;
    }
  }
};
function curveLinear(context) {
  return new Linear(context);
}
function x(p2) {
  return p2[0];
}
function y(p2) {
  return p2[1];
}
function shapeLine(x$12, y$12) {
  var defined2 = constant$1(true), context = null, curve = curveLinear, output = null, path = withPath(line);
  x$12 = typeof x$12 === "function" ? x$12 : x$12 === void 0 ? x : constant$1(x$12);
  y$12 = typeof y$12 === "function" ? y$12 : y$12 === void 0 ? y : constant$1(y$12);
  function line(data) {
    var i, n2 = (data = array(data)).length, d2, defined0 = false, buffer;
    if (context == null) output = curve(buffer = path());
    for (i = 0; i <= n2; ++i) {
      if (!(i < n2 && defined2(d2 = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) output.lineStart();
        else output.lineEnd();
      }
      if (defined0) output.point(+x$12(d2, i, data), +y$12(d2, i, data));
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  line.x = function(_) {
    return arguments.length ? (x$12 = typeof _ === "function" ? _ : constant$1(+_), line) : x$12;
  };
  line.y = function(_) {
    return arguments.length ? (y$12 = typeof _ === "function" ? _ : constant$1(+_), line) : y$12;
  };
  line.defined = function(_) {
    return arguments.length ? (defined2 = typeof _ === "function" ? _ : constant$1(!!_), line) : defined2;
  };
  line.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), line) : curve;
  };
  line.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), line) : context;
  };
  return line;
}
function shapeArea(x0, y0, y1) {
  var x1 = null, defined2 = constant$1(true), context = null, curve = curveLinear, output = null, path = withPath(area);
  x0 = typeof x0 === "function" ? x0 : x0 === void 0 ? x : constant$1(+x0);
  y0 = typeof y0 === "function" ? y0 : y0 === void 0 ? constant$1(0) : constant$1(+y0);
  y1 = typeof y1 === "function" ? y1 : y1 === void 0 ? y : constant$1(+y1);
  function area(data) {
    var i, j, k2, n2 = (data = array(data)).length, d2, defined0 = false, buffer, x0z = new Array(n2), y0z = new Array(n2);
    if (context == null) output = curve(buffer = path());
    for (i = 0; i <= n2; ++i) {
      if (!(i < n2 && defined2(d2 = data[i], i, data)) === defined0) {
        if (defined0 = !defined0) {
          j = i;
          output.areaStart();
          output.lineStart();
        } else {
          output.lineEnd();
          output.lineStart();
          for (k2 = i - 1; k2 >= j; --k2) {
            output.point(x0z[k2], y0z[k2]);
          }
          output.lineEnd();
          output.areaEnd();
        }
      }
      if (defined0) {
        x0z[i] = +x0(d2, i, data), y0z[i] = +y0(d2, i, data);
        output.point(x1 ? +x1(d2, i, data) : x0z[i], y1 ? +y1(d2, i, data) : y0z[i]);
      }
    }
    if (buffer) return output = null, buffer + "" || null;
  }
  function arealine() {
    return shapeLine().defined(defined2).curve(curve).context(context);
  }
  area.x = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), x1 = null, area) : x0;
  };
  area.x0 = function(_) {
    return arguments.length ? (x0 = typeof _ === "function" ? _ : constant$1(+_), area) : x0;
  };
  area.x1 = function(_) {
    return arguments.length ? (x1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : x1;
  };
  area.y = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), y1 = null, area) : y0;
  };
  area.y0 = function(_) {
    return arguments.length ? (y0 = typeof _ === "function" ? _ : constant$1(+_), area) : y0;
  };
  area.y1 = function(_) {
    return arguments.length ? (y1 = _ == null ? null : typeof _ === "function" ? _ : constant$1(+_), area) : y1;
  };
  area.lineX0 = area.lineY0 = function() {
    return arealine().x(x0).y(y0);
  };
  area.lineY1 = function() {
    return arealine().x(x0).y(y1);
  };
  area.lineX1 = function() {
    return arealine().x(x1).y(y0);
  };
  area.defined = function(_) {
    return arguments.length ? (defined2 = typeof _ === "function" ? _ : constant$1(!!_), area) : defined2;
  };
  area.curve = function(_) {
    return arguments.length ? (curve = _, context != null && (output = curve(context)), area) : curve;
  };
  area.context = function(_) {
    return arguments.length ? (_ == null ? context = output = null : output = curve(context = _), area) : context;
  };
  return area;
}
class Bump {
  constructor(context, x2) {
    this._context = context;
    this._x = x2;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  }
  point(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0: {
        this._point = 1;
        if (this._line) this._context.lineTo(x2, y2);
        else this._context.moveTo(x2, y2);
        break;
      }
      case 1:
        this._point = 2;
      default: {
        if (this._x) this._context.bezierCurveTo(this._x0 = (this._x0 + x2) / 2, this._y0, this._x0, y2, x2, y2);
        else this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + y2) / 2, x2, this._y0, x2, y2);
        break;
      }
    }
    this._x0 = x2, this._y0 = y2;
  }
}
function bumpX(context) {
  return new Bump(context, true);
}
function bumpY(context) {
  return new Bump(context, false);
}
const symbolCircle = {
  draw(context, size) {
    const r2 = sqrt$1(size / pi$1);
    context.moveTo(r2, 0);
    context.arc(0, 0, r2, 0, tau$1);
  }
};
const symbolCross = {
  draw(context, size) {
    const r2 = sqrt$1(size / 5) / 2;
    context.moveTo(-3 * r2, -r2);
    context.lineTo(-r2, -r2);
    context.lineTo(-r2, -3 * r2);
    context.lineTo(r2, -3 * r2);
    context.lineTo(r2, -r2);
    context.lineTo(3 * r2, -r2);
    context.lineTo(3 * r2, r2);
    context.lineTo(r2, r2);
    context.lineTo(r2, 3 * r2);
    context.lineTo(-r2, 3 * r2);
    context.lineTo(-r2, r2);
    context.lineTo(-3 * r2, r2);
    context.closePath();
  }
};
const tan30 = sqrt$1(1 / 3);
const tan30_2 = tan30 * 2;
const symbolDiamond = {
  draw(context, size) {
    const y2 = sqrt$1(size / tan30_2);
    const x2 = y2 * tan30;
    context.moveTo(0, -y2);
    context.lineTo(x2, 0);
    context.lineTo(0, y2);
    context.lineTo(-x2, 0);
    context.closePath();
  }
};
const symbolSquare = {
  draw(context, size) {
    const w2 = sqrt$1(size);
    const x2 = -w2 / 2;
    context.rect(x2, x2, w2, w2);
  }
};
const ka = 0.8908130915292852;
const kr = sin(pi$1 / 10) / sin(7 * pi$1 / 10);
const kx = sin(tau$1 / 10) * kr;
const ky = -cos(tau$1 / 10) * kr;
const symbolStar = {
  draw(context, size) {
    const r2 = sqrt$1(size * ka);
    const x2 = kx * r2;
    const y2 = ky * r2;
    context.moveTo(0, -r2);
    context.lineTo(x2, y2);
    for (let i = 1; i < 5; ++i) {
      const a2 = tau$1 * i / 5;
      const c2 = cos(a2);
      const s2 = sin(a2);
      context.lineTo(s2 * r2, -c2 * r2);
      context.lineTo(c2 * x2 - s2 * y2, s2 * x2 + c2 * y2);
    }
    context.closePath();
  }
};
const sqrt3 = sqrt$1(3);
const symbolTriangle = {
  draw(context, size) {
    const y2 = -sqrt$1(size / (sqrt3 * 3));
    context.moveTo(0, y2 * 2);
    context.lineTo(-sqrt3 * y2, -y2);
    context.lineTo(sqrt3 * y2, -y2);
    context.closePath();
  }
};
const c = -0.5;
const s = sqrt$1(3) / 2;
const k = 1 / sqrt$1(12);
const a = (k / 2 + 1) * 3;
const symbolWye = {
  draw(context, size) {
    const r2 = sqrt$1(size / a);
    const x0 = r2 / 2, y0 = r2 * k;
    const x1 = x0, y1 = r2 * k + r2;
    const x2 = -x1, y2 = y1;
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(c * x0 - s * y0, s * x0 + c * y0);
    context.lineTo(c * x1 - s * y1, s * x1 + c * y1);
    context.lineTo(c * x2 - s * y2, s * x2 + c * y2);
    context.lineTo(c * x0 + s * y0, c * y0 - s * x0);
    context.lineTo(c * x1 + s * y1, c * y1 - s * x1);
    context.lineTo(c * x2 + s * y2, c * y2 - s * x2);
    context.closePath();
  }
};
function Symbol$1(type, size) {
  let context = null, path = withPath(symbol);
  type = typeof type === "function" ? type : constant$1(type || symbolCircle);
  size = typeof size === "function" ? size : constant$1(size === void 0 ? 64 : +size);
  function symbol() {
    let buffer;
    if (!context) context = buffer = path();
    type.apply(this, arguments).draw(context, +size.apply(this, arguments));
    if (buffer) return context = null, buffer + "" || null;
  }
  symbol.type = function(_) {
    return arguments.length ? (type = typeof _ === "function" ? _ : constant$1(_), symbol) : type;
  };
  symbol.size = function(_) {
    return arguments.length ? (size = typeof _ === "function" ? _ : constant$1(+_), symbol) : size;
  };
  symbol.context = function(_) {
    return arguments.length ? (context = _ == null ? null : _, symbol) : context;
  };
  return symbol;
}
function noop$5() {
}
function point$2(that, x2, y2) {
  that._context.bezierCurveTo(
    (2 * that._x0 + that._x1) / 3,
    (2 * that._y0 + that._y1) / 3,
    (that._x0 + 2 * that._x1) / 3,
    (that._y0 + 2 * that._y1) / 3,
    (that._x0 + 4 * that._x1 + x2) / 6,
    (that._y0 + 4 * that._y1 + y2) / 6
  );
}
function Basis(context) {
  this._context = context;
}
Basis.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        point$2(this, this._x1, this._y1);
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasis(context) {
  return new Basis(context);
}
function BasisClosed(context) {
  this._context = context;
}
BasisClosed.prototype = {
  areaStart: noop$5,
  areaEnd: noop$5,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2);
        this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3);
        this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3);
        this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2);
        this.point(this._x3, this._y3);
        this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._x2 = x2, this._y2 = y2;
        break;
      case 1:
        this._point = 2;
        this._x3 = x2, this._y3 = y2;
        break;
      case 2:
        this._point = 3;
        this._x4 = x2, this._y4 = y2;
        this._context.moveTo((this._x0 + 4 * this._x1 + x2) / 6, (this._y0 + 4 * this._y1 + y2) / 6);
        break;
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasisClosed(context) {
  return new BasisClosed(context);
}
function BasisOpen(context) {
  this._context = context;
}
BasisOpen.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line || this._line !== 0 && this._point === 3) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var x0 = (this._x0 + 4 * this._x1 + x2) / 6, y0 = (this._y0 + 4 * this._y1 + y2) / 6;
        this._line ? this._context.lineTo(x0, y0) : this._context.moveTo(x0, y0);
        break;
      case 3:
        this._point = 4;
      default:
        point$2(this, x2, y2);
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
  }
};
function curveBasisOpen(context) {
  return new BasisOpen(context);
}
function LinearClosed(context) {
  this._context = context;
}
LinearClosed.prototype = {
  areaStart: noop$5,
  areaEnd: noop$5,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._point) this._context.closePath();
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    if (this._point) this._context.lineTo(x2, y2);
    else this._point = 1, this._context.moveTo(x2, y2);
  }
};
function curveLinearClosed(context) {
  return new LinearClosed(context);
}
function sign(x2) {
  return x2 < 0 ? -1 : 1;
}
function slope3(that, x2, y2) {
  var h0 = that._x1 - that._x0, h1 = x2 - that._x1, s0 = (that._y1 - that._y0) / (h0 || h1 < 0 && -0), s1 = (y2 - that._y1) / (h1 || h0 < 0 && -0), p2 = (s0 * h1 + s1 * h0) / (h0 + h1);
  return (sign(s0) + sign(s1)) * Math.min(Math.abs(s0), Math.abs(s1), 0.5 * Math.abs(p2)) || 0;
}
function slope2(that, t2) {
  var h2 = that._x1 - that._x0;
  return h2 ? (3 * (that._y1 - that._y0) / h2 - t2) / 2 : t2;
}
function point$1(that, t02, t12) {
  var x0 = that._x0, y0 = that._y0, x1 = that._x1, y1 = that._y1, dx = (x1 - x0) / 3;
  that._context.bezierCurveTo(x0 + dx, y0 + dx * t02, x1 - dx, y1 - dx * t12, x1, y1);
}
function MonotoneX(context) {
  this._context = context;
}
MonotoneX.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        point$1(this, this._t0, slope2(this, this._t0));
        break;
    }
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    var t12 = NaN;
    x2 = +x2, y2 = +y2;
    if (x2 === this._x1 && y2 === this._y1) return;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        point$1(this, slope2(this, t12 = slope3(this, x2, y2)), t12);
        break;
      default:
        point$1(this, this._t0, t12 = slope3(this, x2, y2));
        break;
    }
    this._x0 = this._x1, this._x1 = x2;
    this._y0 = this._y1, this._y1 = y2;
    this._t0 = t12;
  }
};
function MonotoneY(context) {
  this._context = new ReflectContext(context);
}
(MonotoneY.prototype = Object.create(MonotoneX.prototype)).point = function(x2, y2) {
  MonotoneX.prototype.point.call(this, y2, x2);
};
function ReflectContext(context) {
  this._context = context;
}
ReflectContext.prototype = {
  moveTo: function(x2, y2) {
    this._context.moveTo(y2, x2);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(x2, y2) {
    this._context.lineTo(y2, x2);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x3, y3) {
    this._context.bezierCurveTo(y1, x1, y2, x2, y3, x3);
  }
};
function monotoneX(context) {
  return new MonotoneX(context);
}
function monotoneY(context) {
  return new MonotoneY(context);
}
function Natural(context) {
  this._context = context;
}
Natural.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [];
    this._y = [];
  },
  lineEnd: function() {
    var x2 = this._x, y2 = this._y, n2 = x2.length;
    if (n2) {
      this._line ? this._context.lineTo(x2[0], y2[0]) : this._context.moveTo(x2[0], y2[0]);
      if (n2 === 2) {
        this._context.lineTo(x2[1], y2[1]);
      } else {
        var px = controlPoints(x2), py = controlPoints(y2);
        for (var i0 = 0, i1 = 1; i1 < n2; ++i0, ++i1) {
          this._context.bezierCurveTo(px[0][i0], py[0][i0], px[1][i0], py[1][i0], x2[i1], y2[i1]);
        }
      }
    }
    if (this._line || this._line !== 0 && n2 === 1) this._context.closePath();
    this._line = 1 - this._line;
    this._x = this._y = null;
  },
  point: function(x2, y2) {
    this._x.push(+x2);
    this._y.push(+y2);
  }
};
function controlPoints(x2) {
  var i, n2 = x2.length - 1, m2, a2 = new Array(n2), b2 = new Array(n2), r2 = new Array(n2);
  a2[0] = 0, b2[0] = 2, r2[0] = x2[0] + 2 * x2[1];
  for (i = 1; i < n2 - 1; ++i) a2[i] = 1, b2[i] = 4, r2[i] = 4 * x2[i] + 2 * x2[i + 1];
  a2[n2 - 1] = 2, b2[n2 - 1] = 7, r2[n2 - 1] = 8 * x2[n2 - 1] + x2[n2];
  for (i = 1; i < n2; ++i) m2 = a2[i] / b2[i - 1], b2[i] -= m2, r2[i] -= m2 * r2[i - 1];
  a2[n2 - 1] = r2[n2 - 1] / b2[n2 - 1];
  for (i = n2 - 2; i >= 0; --i) a2[i] = (r2[i] - a2[i + 1]) / b2[i];
  b2[n2 - 1] = (x2[n2] + a2[n2 - 1]) / 2;
  for (i = 0; i < n2 - 1; ++i) b2[i] = 2 * x2[i + 1] - a2[i + 1];
  return [a2, b2];
}
function curveNatural(context) {
  return new Natural(context);
}
function Step(context, t2) {
  this._context = context;
  this._t = t2;
}
Step.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN;
    this._point = 0;
  },
  lineEnd: function() {
    if (0 < this._t && this._t < 1 && this._point === 2) this._context.lineTo(this._x, this._y);
    if (this._line || this._line !== 0 && this._point === 1) this._context.closePath();
    if (this._line >= 0) this._t = 1 - this._t, this._line = 1 - this._line;
  },
  point: function(x2, y2) {
    x2 = +x2, y2 = +y2;
    switch (this._point) {
      case 0:
        this._point = 1;
        this._line ? this._context.lineTo(x2, y2) : this._context.moveTo(x2, y2);
        break;
      case 1:
        this._point = 2;
      default: {
        if (this._t <= 0) {
          this._context.lineTo(this._x, y2);
          this._context.lineTo(x2, y2);
        } else {
          var x1 = this._x * (1 - this._t) + x2 * this._t;
          this._context.lineTo(x1, this._y);
          this._context.lineTo(x1, y2);
        }
        break;
      }
    }
    this._x = x2, this._y = y2;
  }
};
function curveStep(context) {
  return new Step(context, 0.5);
}
function stepBefore(context) {
  return new Step(context, 0);
}
function stepAfter(context) {
  return new Step(context, 1);
}
function stackOffsetNone(series, order) {
  if (!((n2 = series.length) > 1)) return;
  for (var i = 1, j, s0, s1 = series[order[0]], n2, m2 = s1.length; i < n2; ++i) {
    s0 = s1, s1 = series[order[i]];
    for (j = 0; j < m2; ++j) {
      s1[j][1] += s1[j][0] = isNaN(s0[j][1]) ? s0[j][0] : s0[j][1];
    }
  }
}
function stackOrderNone(series) {
  var n2 = series.length, o = new Array(n2);
  while (--n2 >= 0) o[n2] = n2;
  return o;
}
function stackValue(d2, key) {
  return d2[key];
}
function stackSeries(key) {
  const series = [];
  series.key = key;
  return series;
}
function shapeStack() {
  var keys = constant$1([]), order = stackOrderNone, offset = stackOffsetNone, value = stackValue;
  function stack(data) {
    var sz = Array.from(keys.apply(this, arguments), stackSeries), i, n2 = sz.length, j = -1, oz;
    for (const d2 of data) {
      for (i = 0, ++j; i < n2; ++i) {
        (sz[i][j] = [0, +value(d2, sz[i].key, j, data)]).data = d2;
      }
    }
    for (i = 0, oz = array(order(sz)); i < n2; ++i) {
      sz[oz[i]].index = i;
    }
    offset(sz, oz);
    return sz;
  }
  stack.keys = function(_) {
    return arguments.length ? (keys = typeof _ === "function" ? _ : constant$1(Array.from(_)), stack) : keys;
  };
  stack.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant$1(+_), stack) : value;
  };
  stack.order = function(_) {
    return arguments.length ? (order = _ == null ? stackOrderNone : typeof _ === "function" ? _ : constant$1(Array.from(_)), stack) : order;
  };
  stack.offset = function(_) {
    return arguments.length ? (offset = _ == null ? stackOffsetNone : _, stack) : offset;
  };
  return stack;
}
function stackOffsetExpand(series, order) {
  if (!((n2 = series.length) > 0)) return;
  for (var i, n2, j = 0, m2 = series[0].length, y2; j < m2; ++j) {
    for (y2 = i = 0; i < n2; ++i) y2 += series[i][j][1] || 0;
    if (y2) for (i = 0; i < n2; ++i) series[i][j][1] /= y2;
  }
  stackOffsetNone(series, order);
}
function stackOffsetSilhouette(series, order) {
  if (!((n2 = series.length) > 0)) return;
  for (var j = 0, s0 = series[order[0]], n2, m2 = s0.length; j < m2; ++j) {
    for (var i = 0, y2 = 0; i < n2; ++i) y2 += series[i][j][1] || 0;
    s0[j][1] += s0[j][0] = -y2 / 2;
  }
  stackOffsetNone(series, order);
}
function stackOffsetWiggle(series, order) {
  if (!((n2 = series.length) > 0) || !((m2 = (s0 = series[order[0]]).length) > 0)) return;
  for (var y2 = 0, j = 1, s0, m2, n2; j < m2; ++j) {
    for (var i = 0, s1 = 0, s2 = 0; i < n2; ++i) {
      var si = series[order[i]], sij0 = si[j][1] || 0, sij1 = si[j - 1][1] || 0, s3 = (sij0 - sij1) / 2;
      for (var k2 = 0; k2 < i; ++k2) {
        var sk = series[order[k2]], skj0 = sk[j][1] || 0, skj1 = sk[j - 1][1] || 0;
        s3 += skj0 - skj1;
      }
      s1 += sij0, s2 += s3 * sij0;
    }
    s0[j - 1][1] += s0[j - 1][0] = y2;
    if (s1) y2 -= s2 / s1;
  }
  s0[j - 1][1] += s0[j - 1][0] = y2;
  stackOffsetNone(series, order);
}
var _excluded$h = ["type", "size", "sizeType"];
function _extends$k() {
  return _extends$k = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$k.apply(null, arguments);
}
function ownKeys$x(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$x(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$x(Object(t2), true).forEach(function(r3) {
      _defineProperty$B(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$x(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$B(e3, r2, t2) {
  return (r2 = _toPropertyKey$B(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$B(t2) {
  var i = _toPrimitive$B(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$B(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _objectWithoutProperties$h(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$h(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$h(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var symbolFactories = {
  symbolCircle,
  symbolCross,
  symbolDiamond,
  symbolSquare,
  symbolStar,
  symbolTriangle,
  symbolWye
};
var RADIAN$1 = Math.PI / 180;
var getSymbolFactory = (type) => {
  var name = "symbol".concat(upperFirst(type));
  return symbolFactories[name] || symbolCircle;
};
var calculateAreaSize = (size, sizeType, type) => {
  if (sizeType === "area") {
    return size;
  }
  switch (type) {
    case "cross":
      return 5 * size * size / 9;
    case "diamond":
      return 0.5 * size * size / Math.sqrt(3);
    case "square":
      return size * size;
    case "star": {
      var angle = 18 * RADIAN$1;
      return 1.25 * size * size * (Math.tan(angle) - Math.tan(angle * 2) * Math.tan(angle) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * size * size / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * size * size / 8;
    default:
      return Math.PI * size * size / 4;
  }
};
var registerSymbol = (key, factory) => {
  symbolFactories["symbol".concat(upperFirst(key))] = factory;
};
var Symbols = (_ref2) => {
  var {
    type = "circle",
    size = 64,
    sizeType = "area"
  } = _ref2, rest = _objectWithoutProperties$h(_ref2, _excluded$h);
  var props = _objectSpread$x(_objectSpread$x({}, rest), {}, {
    type,
    size,
    sizeType
  });
  var realType = "circle";
  if (typeof type === "string") {
    realType = type;
  }
  var getPath2 = () => {
    var symbolFactory = getSymbolFactory(realType);
    var symbol = Symbol$1().type(symbolFactory).size(calculateAreaSize(size, sizeType, realType));
    return symbol();
  };
  var {
    className,
    cx,
    cy
  } = props;
  var filteredProps = filterProps(props, true);
  if (cx === +cx && cy === +cy && size === +size) {
    return /* @__PURE__ */ reactExports.createElement("path", _extends$k({}, filteredProps, {
      className: clsx("recharts-symbols", className),
      transform: "translate(".concat(cx, ", ").concat(cy, ")"),
      d: getPath2()
    }));
  }
  return null;
};
Symbols.registerSymbol = registerSymbol;
var uniqBy$3 = {};
var uniqBy$2 = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function uniqBy2(arr, mapper) {
    const map2 = /* @__PURE__ */ new Map();
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      const key = mapper(item);
      if (!map2.has(key)) {
        map2.set(key, item);
      }
    }
    return Array.from(map2.values());
  }
  exports.uniqBy = uniqBy2;
})(uniqBy$2);
var identity$4 = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function identity2(x2) {
    return x2;
  }
  exports.identity = identity2;
})(identity$4);
var isArrayLikeObject = {};
var isArrayLike = {};
var isLength = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isLength2(value) {
    return Number.isSafeInteger(value) && value >= 0;
  }
  exports.isLength = isLength2;
})(isLength);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isLength$1 = isLength;
  function isArrayLike2(value) {
    return value != null && typeof value !== "function" && isLength$1.isLength(value.length);
  }
  exports.isArrayLike = isArrayLike2;
})(isArrayLike);
var isObjectLike = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isObjectLike2(value) {
    return typeof value === "object" && value !== null;
  }
  exports.isObjectLike = isObjectLike2;
})(isObjectLike);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isArrayLike$1 = isArrayLike;
  const isObjectLike$1 = isObjectLike;
  function isArrayLikeObject2(value) {
    return isObjectLike$1.isObjectLike(value) && isArrayLike$1.isArrayLike(value);
  }
  exports.isArrayLikeObject = isArrayLikeObject2;
})(isArrayLikeObject);
var iteratee = {};
var property = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const get2 = get$2;
  function property2(path) {
    return function(object2) {
      return get2.get(object2, path);
    };
  }
  exports.property = property2;
})(property);
var matches = {};
var isMatch = {};
var isMatchWith = {};
var isObject = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isObject2(value) {
    return value !== null && (typeof value === "object" || typeof value === "function");
  }
  exports.isObject = isObject2;
})(isObject);
var isPrimitive = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isPrimitive2(value) {
    return value == null || typeof value !== "object" && typeof value !== "function";
  }
  exports.isPrimitive = isPrimitive2;
})(isPrimitive);
var eq = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function eq2(value, other) {
    return value === other || Number.isNaN(value) && Number.isNaN(other);
  }
  exports.eq = eq2;
})(eq);
var hasRequiredIsMatchWith;
function requireIsMatchWith() {
  if (hasRequiredIsMatchWith) return isMatchWith;
  hasRequiredIsMatchWith = 1;
  (function(exports) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    const isMatch2 = requireIsMatch();
    const isObject$1 = isObject;
    const isPrimitive$1 = isPrimitive;
    const eq$1 = eq;
    function isMatchWith2(target, source, compare) {
      if (typeof compare !== "function") {
        return isMatch2.isMatch(target, source);
      }
      return isMatchWithInternal(target, source, function doesMatch(objValue, srcValue, key, object2, source2, stack) {
        const isEqual = compare(objValue, srcValue, key, object2, source2, stack);
        if (isEqual !== void 0) {
          return Boolean(isEqual);
        }
        return isMatchWithInternal(objValue, srcValue, doesMatch, stack);
      }, /* @__PURE__ */ new Map());
    }
    function isMatchWithInternal(target, source, compare, stack) {
      if (source === target) {
        return true;
      }
      switch (typeof source) {
        case "object": {
          return isObjectMatch(target, source, compare, stack);
        }
        case "function": {
          const sourceKeys = Object.keys(source);
          if (sourceKeys.length > 0) {
            return isMatchWithInternal(target, { ...source }, compare, stack);
          }
          return eq$1.eq(target, source);
        }
        default: {
          if (!isObject$1.isObject(target)) {
            return eq$1.eq(target, source);
          }
          if (typeof source === "string") {
            return source === "";
          }
          return true;
        }
      }
    }
    function isObjectMatch(target, source, compare, stack) {
      if (source == null) {
        return true;
      }
      if (Array.isArray(source)) {
        return isArrayMatch(target, source, compare, stack);
      }
      if (source instanceof Map) {
        return isMapMatch(target, source, compare, stack);
      }
      if (source instanceof Set) {
        return isSetMatch(target, source, compare, stack);
      }
      const keys = Object.keys(source);
      if (target == null) {
        return keys.length === 0;
      }
      if (keys.length === 0) {
        return true;
      }
      if (stack && stack.has(source)) {
        return stack.get(source) === target;
      }
      if (stack) {
        stack.set(source, target);
      }
      try {
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          if (!isPrimitive$1.isPrimitive(target) && !(key in target)) {
            return false;
          }
          if (source[key] === void 0 && target[key] !== void 0) {
            return false;
          }
          if (source[key] === null && target[key] !== null) {
            return false;
          }
          const isEqual = compare(target[key], source[key], key, target, source, stack);
          if (!isEqual) {
            return false;
          }
        }
        return true;
      } finally {
        if (stack) {
          stack.delete(source);
        }
      }
    }
    function isMapMatch(target, source, compare, stack) {
      if (source.size === 0) {
        return true;
      }
      if (!(target instanceof Map)) {
        return false;
      }
      for (const [key, sourceValue] of source.entries()) {
        const targetValue = target.get(key);
        const isEqual = compare(targetValue, sourceValue, key, target, source, stack);
        if (isEqual === false) {
          return false;
        }
      }
      return true;
    }
    function isArrayMatch(target, source, compare, stack) {
      if (source.length === 0) {
        return true;
      }
      if (!Array.isArray(target)) {
        return false;
      }
      const countedIndex = /* @__PURE__ */ new Set();
      for (let i = 0; i < source.length; i++) {
        const sourceItem = source[i];
        let found = false;
        for (let j = 0; j < target.length; j++) {
          if (countedIndex.has(j)) {
            continue;
          }
          const targetItem = target[j];
          let matches2 = false;
          const isEqual = compare(targetItem, sourceItem, i, target, source, stack);
          if (isEqual) {
            matches2 = true;
          }
          if (matches2) {
            countedIndex.add(j);
            found = true;
            break;
          }
        }
        if (!found) {
          return false;
        }
      }
      return true;
    }
    function isSetMatch(target, source, compare, stack) {
      if (source.size === 0) {
        return true;
      }
      if (!(target instanceof Set)) {
        return false;
      }
      return isArrayMatch([...target], [...source], compare, stack);
    }
    exports.isMatchWith = isMatchWith2;
    exports.isSetMatch = isSetMatch;
  })(isMatchWith);
  return isMatchWith;
}
var hasRequiredIsMatch;
function requireIsMatch() {
  if (hasRequiredIsMatch) return isMatch;
  hasRequiredIsMatch = 1;
  (function(exports) {
    Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
    const isMatchWith2 = requireIsMatchWith();
    function isMatch2(target, source) {
      return isMatchWith2.isMatchWith(target, source, () => void 0);
    }
    exports.isMatch = isMatch2;
  })(isMatch);
  return isMatch;
}
var cloneDeep$1 = {};
var cloneDeepWith$1 = {};
var getSymbols = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function getSymbols2(object2) {
    return Object.getOwnPropertySymbols(object2).filter((symbol) => Object.prototype.propertyIsEnumerable.call(object2, symbol));
  }
  exports.getSymbols = getSymbols2;
})(getSymbols);
var getTag = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function getTag2(value) {
    if (value == null) {
      return value === void 0 ? "[object Undefined]" : "[object Null]";
    }
    return Object.prototype.toString.call(value);
  }
  exports.getTag = getTag2;
})(getTag);
var tags = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const regexpTag = "[object RegExp]";
  const stringTag = "[object String]";
  const numberTag = "[object Number]";
  const booleanTag = "[object Boolean]";
  const argumentsTag = "[object Arguments]";
  const symbolTag = "[object Symbol]";
  const dateTag = "[object Date]";
  const mapTag = "[object Map]";
  const setTag = "[object Set]";
  const arrayTag = "[object Array]";
  const functionTag = "[object Function]";
  const arrayBufferTag = "[object ArrayBuffer]";
  const objectTag = "[object Object]";
  const errorTag = "[object Error]";
  const dataViewTag = "[object DataView]";
  const uint8ArrayTag = "[object Uint8Array]";
  const uint8ClampedArrayTag = "[object Uint8ClampedArray]";
  const uint16ArrayTag = "[object Uint16Array]";
  const uint32ArrayTag = "[object Uint32Array]";
  const bigUint64ArrayTag = "[object BigUint64Array]";
  const int8ArrayTag = "[object Int8Array]";
  const int16ArrayTag = "[object Int16Array]";
  const int32ArrayTag = "[object Int32Array]";
  const bigInt64ArrayTag = "[object BigInt64Array]";
  const float32ArrayTag = "[object Float32Array]";
  const float64ArrayTag = "[object Float64Array]";
  exports.argumentsTag = argumentsTag;
  exports.arrayBufferTag = arrayBufferTag;
  exports.arrayTag = arrayTag;
  exports.bigInt64ArrayTag = bigInt64ArrayTag;
  exports.bigUint64ArrayTag = bigUint64ArrayTag;
  exports.booleanTag = booleanTag;
  exports.dataViewTag = dataViewTag;
  exports.dateTag = dateTag;
  exports.errorTag = errorTag;
  exports.float32ArrayTag = float32ArrayTag;
  exports.float64ArrayTag = float64ArrayTag;
  exports.functionTag = functionTag;
  exports.int16ArrayTag = int16ArrayTag;
  exports.int32ArrayTag = int32ArrayTag;
  exports.int8ArrayTag = int8ArrayTag;
  exports.mapTag = mapTag;
  exports.numberTag = numberTag;
  exports.objectTag = objectTag;
  exports.regexpTag = regexpTag;
  exports.setTag = setTag;
  exports.stringTag = stringTag;
  exports.symbolTag = symbolTag;
  exports.uint16ArrayTag = uint16ArrayTag;
  exports.uint32ArrayTag = uint32ArrayTag;
  exports.uint8ArrayTag = uint8ArrayTag;
  exports.uint8ClampedArrayTag = uint8ClampedArrayTag;
})(tags);
var isTypedArray = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isTypedArray2(x2) {
    return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
  }
  exports.isTypedArray = isTypedArray2;
})(isTypedArray);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const getSymbols$1 = getSymbols;
  const getTag$1 = getTag;
  const tags$1 = tags;
  const isPrimitive$1 = isPrimitive;
  const isTypedArray$1 = isTypedArray;
  function cloneDeepWith2(obj, cloneValue) {
    return cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), cloneValue);
  }
  function cloneDeepWithImpl(valueToClone, keyToClone, objectToClone, stack = /* @__PURE__ */ new Map(), cloneValue = void 0) {
    const cloned = cloneValue == null ? void 0 : cloneValue(valueToClone, keyToClone, objectToClone, stack);
    if (cloned !== void 0) {
      return cloned;
    }
    if (isPrimitive$1.isPrimitive(valueToClone)) {
      return valueToClone;
    }
    if (stack.has(valueToClone)) {
      return stack.get(valueToClone);
    }
    if (Array.isArray(valueToClone)) {
      const result = new Array(valueToClone.length);
      stack.set(valueToClone, result);
      for (let i = 0; i < valueToClone.length; i++) {
        result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
      }
      if (Object.hasOwn(valueToClone, "index")) {
        result.index = valueToClone.index;
      }
      if (Object.hasOwn(valueToClone, "input")) {
        result.input = valueToClone.input;
      }
      return result;
    }
    if (valueToClone instanceof Date) {
      return new Date(valueToClone.getTime());
    }
    if (valueToClone instanceof RegExp) {
      const result = new RegExp(valueToClone.source, valueToClone.flags);
      result.lastIndex = valueToClone.lastIndex;
      return result;
    }
    if (valueToClone instanceof Map) {
      const result = /* @__PURE__ */ new Map();
      stack.set(valueToClone, result);
      for (const [key, value] of valueToClone) {
        result.set(key, cloneDeepWithImpl(value, key, objectToClone, stack, cloneValue));
      }
      return result;
    }
    if (valueToClone instanceof Set) {
      const result = /* @__PURE__ */ new Set();
      stack.set(valueToClone, result);
      for (const value of valueToClone) {
        result.add(cloneDeepWithImpl(value, void 0, objectToClone, stack, cloneValue));
      }
      return result;
    }
    if (typeof Buffer !== "undefined" && Buffer.isBuffer(valueToClone)) {
      return valueToClone.subarray();
    }
    if (isTypedArray$1.isTypedArray(valueToClone)) {
      const result = new (Object.getPrototypeOf(valueToClone)).constructor(valueToClone.length);
      stack.set(valueToClone, result);
      for (let i = 0; i < valueToClone.length; i++) {
        result[i] = cloneDeepWithImpl(valueToClone[i], i, objectToClone, stack, cloneValue);
      }
      return result;
    }
    if (valueToClone instanceof ArrayBuffer || typeof SharedArrayBuffer !== "undefined" && valueToClone instanceof SharedArrayBuffer) {
      return valueToClone.slice(0);
    }
    if (valueToClone instanceof DataView) {
      const result = new DataView(valueToClone.buffer.slice(0), valueToClone.byteOffset, valueToClone.byteLength);
      stack.set(valueToClone, result);
      copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
      return result;
    }
    if (typeof File !== "undefined" && valueToClone instanceof File) {
      const result = new File([valueToClone], valueToClone.name, {
        type: valueToClone.type
      });
      stack.set(valueToClone, result);
      copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
      return result;
    }
    if (valueToClone instanceof Blob) {
      const result = new Blob([valueToClone], { type: valueToClone.type });
      stack.set(valueToClone, result);
      copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
      return result;
    }
    if (valueToClone instanceof Error) {
      const result = new valueToClone.constructor();
      stack.set(valueToClone, result);
      result.message = valueToClone.message;
      result.name = valueToClone.name;
      result.stack = valueToClone.stack;
      result.cause = valueToClone.cause;
      copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
      return result;
    }
    if (typeof valueToClone === "object" && isCloneableObject(valueToClone)) {
      const result = Object.create(Object.getPrototypeOf(valueToClone));
      stack.set(valueToClone, result);
      copyProperties(result, valueToClone, objectToClone, stack, cloneValue);
      return result;
    }
    return valueToClone;
  }
  function copyProperties(target, source, objectToClone = target, stack, cloneValue) {
    const keys = [...Object.keys(source), ...getSymbols$1.getSymbols(source)];
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const descriptor = Object.getOwnPropertyDescriptor(target, key);
      if (descriptor == null || descriptor.writable) {
        target[key] = cloneDeepWithImpl(source[key], key, objectToClone, stack, cloneValue);
      }
    }
  }
  function isCloneableObject(object2) {
    switch (getTag$1.getTag(object2)) {
      case tags$1.argumentsTag:
      case tags$1.arrayTag:
      case tags$1.arrayBufferTag:
      case tags$1.dataViewTag:
      case tags$1.booleanTag:
      case tags$1.dateTag:
      case tags$1.float32ArrayTag:
      case tags$1.float64ArrayTag:
      case tags$1.int8ArrayTag:
      case tags$1.int16ArrayTag:
      case tags$1.int32ArrayTag:
      case tags$1.mapTag:
      case tags$1.numberTag:
      case tags$1.objectTag:
      case tags$1.regexpTag:
      case tags$1.setTag:
      case tags$1.stringTag:
      case tags$1.symbolTag:
      case tags$1.uint8ArrayTag:
      case tags$1.uint8ClampedArrayTag:
      case tags$1.uint16ArrayTag:
      case tags$1.uint32ArrayTag: {
        return true;
      }
      default: {
        return false;
      }
    }
  }
  exports.cloneDeepWith = cloneDeepWith2;
  exports.cloneDeepWithImpl = cloneDeepWithImpl;
  exports.copyProperties = copyProperties;
})(cloneDeepWith$1);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const cloneDeepWith2 = cloneDeepWith$1;
  function cloneDeep2(obj) {
    return cloneDeepWith2.cloneDeepWithImpl(obj, void 0, obj, /* @__PURE__ */ new Map(), void 0);
  }
  exports.cloneDeep = cloneDeep2;
})(cloneDeep$1);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isMatch2 = requireIsMatch();
  const cloneDeep2 = cloneDeep$1;
  function matches2(source) {
    source = cloneDeep2.cloneDeep(source);
    return (target) => {
      return isMatch2.isMatch(target, source);
    };
  }
  exports.matches = matches2;
})(matches);
var matchesProperty = {};
var cloneDeep = {};
var cloneDeepWith = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const cloneDeepWith$1$1 = cloneDeepWith$1;
  const tags$1 = tags;
  function cloneDeepWith2(obj, customizer) {
    return cloneDeepWith$1$1.cloneDeepWith(obj, (value, key, object2, stack) => {
      const cloned = customizer == null ? void 0 : customizer(value, key, object2, stack);
      if (cloned !== void 0) {
        return cloned;
      }
      if (typeof obj !== "object") {
        return void 0;
      }
      switch (Object.prototype.toString.call(obj)) {
        case tags$1.numberTag:
        case tags$1.stringTag:
        case tags$1.booleanTag: {
          const result = new obj.constructor(obj == null ? void 0 : obj.valueOf());
          cloneDeepWith$1$1.copyProperties(result, obj);
          return result;
        }
        case tags$1.argumentsTag: {
          const result = {};
          cloneDeepWith$1$1.copyProperties(result, obj);
          result.length = obj.length;
          result[Symbol.iterator] = obj[Symbol.iterator];
          return result;
        }
        default: {
          return void 0;
        }
      }
    });
  }
  exports.cloneDeepWith = cloneDeepWith2;
})(cloneDeepWith);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const cloneDeepWith$12 = cloneDeepWith;
  function cloneDeep2(obj) {
    return cloneDeepWith$12.cloneDeepWith(obj);
  }
  exports.cloneDeep = cloneDeep2;
})(cloneDeep);
var has$1 = {};
var isIndex = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const IS_UNSIGNED_INTEGER = /^(?:0|[1-9]\d*)$/;
  function isIndex2(value, length = Number.MAX_SAFE_INTEGER) {
    switch (typeof value) {
      case "number": {
        return Number.isInteger(value) && value >= 0 && value < length;
      }
      case "symbol": {
        return false;
      }
      case "string": {
        return IS_UNSIGNED_INTEGER.test(value);
      }
    }
  }
  exports.isIndex = isIndex2;
})(isIndex);
var isArguments = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const getTag$1 = getTag;
  function isArguments2(value) {
    return value !== null && typeof value === "object" && getTag$1.getTag(value) === "[object Arguments]";
  }
  exports.isArguments = isArguments2;
})(isArguments);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isDeepKey$1 = isDeepKey;
  const isIndex$1 = isIndex;
  const isArguments$1 = isArguments;
  const toPath$1 = toPath;
  function has2(object2, path) {
    let resolvedPath;
    if (Array.isArray(path)) {
      resolvedPath = path;
    } else if (typeof path === "string" && isDeepKey$1.isDeepKey(path) && (object2 == null ? void 0 : object2[path]) == null) {
      resolvedPath = toPath$1.toPath(path);
    } else {
      resolvedPath = [path];
    }
    if (resolvedPath.length === 0) {
      return false;
    }
    let current2 = object2;
    for (let i = 0; i < resolvedPath.length; i++) {
      const key = resolvedPath[i];
      if (current2 == null || !Object.hasOwn(current2, key)) {
        const isSparseIndex = (Array.isArray(current2) || isArguments$1.isArguments(current2)) && isIndex$1.isIndex(key) && key < current2.length;
        if (!isSparseIndex) {
          return false;
        }
      }
      current2 = current2[key];
    }
    return true;
  }
  exports.has = has2;
})(has$1);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isMatch2 = requireIsMatch();
  const toKey$1 = toKey;
  const cloneDeep$12 = cloneDeep;
  const get2 = get$2;
  const has2 = has$1;
  function matchesProperty2(property2, source) {
    switch (typeof property2) {
      case "object": {
        if (Object.is(property2 == null ? void 0 : property2.valueOf(), -0)) {
          property2 = "-0";
        }
        break;
      }
      case "number": {
        property2 = toKey$1.toKey(property2);
        break;
      }
    }
    source = cloneDeep$12.cloneDeep(source);
    return function(target) {
      const result = get2.get(target, property2);
      if (result === void 0) {
        return has2.has(target, property2);
      }
      if (source === void 0) {
        return result === void 0;
      }
      return isMatch2.isMatch(result, source);
    };
  }
  exports.matchesProperty = matchesProperty2;
})(matchesProperty);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const identity2 = identity$4;
  const property$1 = property;
  const matches$1 = matches;
  const matchesProperty$1 = matchesProperty;
  function iteratee2(value) {
    if (value == null) {
      return identity2.identity;
    }
    switch (typeof value) {
      case "function": {
        return value;
      }
      case "object": {
        if (Array.isArray(value) && value.length === 2) {
          return matchesProperty$1.matchesProperty(value[0], value[1]);
        }
        return matches$1.matches(value);
      }
      case "string":
      case "symbol":
      case "number": {
        return property$1.property(value);
      }
    }
  }
  exports.iteratee = iteratee2;
})(iteratee);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const uniqBy$12 = uniqBy$2;
  const identity2 = identity$4;
  const isArrayLikeObject$1 = isArrayLikeObject;
  const iteratee$1 = iteratee;
  function uniqBy2(array2, iteratee$1$1 = identity2.identity) {
    if (!isArrayLikeObject$1.isArrayLikeObject(array2)) {
      return [];
    }
    return uniqBy$12.uniqBy(Array.from(array2), iteratee$1.iteratee(iteratee$1$1));
  }
  exports.uniqBy = uniqBy2;
})(uniqBy$3);
var uniqBy = uniqBy$3.uniqBy;
const uniqBy$1 = /* @__PURE__ */ getDefaultExportFromCjs(uniqBy);
function getUniqPayload(payload, option, defaultUniqBy2) {
  if (option === true) {
    return uniqBy$1(payload, defaultUniqBy2);
  }
  if (typeof option === "function") {
    return uniqBy$1(payload, option);
  }
  return payload;
}
var withSelector = { exports: {} };
var withSelector_production = {};
var shim$2 = { exports: {} };
var useSyncExternalStoreShim_production = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$2 = reactExports;
function is$3(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs$2 = "function" === typeof Object.is ? Object.is : is$3, useState = React$2.useState, useEffect$2 = React$2.useEffect, useLayoutEffect = React$2.useLayoutEffect, useDebugValue$2 = React$2.useDebugValue;
function useSyncExternalStore$2(subscribe, getSnapshot) {
  var value = getSnapshot(), _useState = useState({ inst: { value, getSnapshot } }), inst = _useState[0].inst, forceUpdate = _useState[1];
  useLayoutEffect(
    function() {
      inst.value = value;
      inst.getSnapshot = getSnapshot;
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
    },
    [subscribe, value, getSnapshot]
  );
  useEffect$2(
    function() {
      checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      return subscribe(function() {
        checkIfSnapshotChanged(inst) && forceUpdate({ inst });
      });
    },
    [subscribe]
  );
  useDebugValue$2(value);
  return value;
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs$2(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function useSyncExternalStore$1$1(subscribe, getSnapshot) {
  return getSnapshot();
}
var shim$1 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? useSyncExternalStore$1$1 : useSyncExternalStore$2;
useSyncExternalStoreShim_production.useSyncExternalStore = void 0 !== React$2.useSyncExternalStore ? React$2.useSyncExternalStore : shim$1;
{
  shim$2.exports = useSyncExternalStoreShim_production;
}
var shimExports = shim$2.exports;
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React$1 = reactExports, shim = shimExports;
function is$2(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs$1 = "function" === typeof Object.is ? Object.is : is$2, useSyncExternalStore$1 = shim.useSyncExternalStore, useRef$1 = React$1.useRef, useEffect$1 = React$1.useEffect, useMemo$1 = React$1.useMemo, useDebugValue$1 = React$1.useDebugValue;
withSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  var instRef = useRef$1(null);
  if (null === instRef.current) {
    var inst = { hasValue: false, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo$1(
    function() {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return memoizedSelection = currentSelection;
          }
          return memoizedSelection = nextSnapshot;
        }
        currentSelection = memoizedSelection;
        if (objectIs$1(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return memoizedSnapshot = nextSnapshot, currentSelection;
        memoizedSnapshot = nextSnapshot;
        return memoizedSelection = nextSelection;
      }
      var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function() {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot ? void 0 : function() {
          return memoizedSelector(maybeGetServerSnapshot());
        }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore$1(subscribe, instRef[0], instRef[1]);
  useEffect$1(
    function() {
      inst.hasValue = true;
      inst.value = value;
    },
    [value]
  );
  useDebugValue$1(value);
  return value;
};
{
  withSelector.exports = withSelector_production;
}
var withSelectorExports = withSelector.exports;
var RechartsReduxContext = /* @__PURE__ */ reactExports.createContext(null);
var noopDispatch = (a2) => a2;
var useAppDispatch = () => {
  var context = reactExports.useContext(RechartsReduxContext);
  if (context) {
    return context.store.dispatch;
  }
  return noopDispatch;
};
var noop$4 = () => {
};
var addNestedSubNoop = () => noop$4;
var refEquality = (a2, b2) => a2 === b2;
function useAppSelector(selector) {
  var context = reactExports.useContext(RechartsReduxContext);
  return withSelectorExports.useSyncExternalStoreWithSelector(context ? context.subscription.addNestedSub : addNestedSubNoop, context ? context.store.getState : noop$4, context ? context.store.getState : noop$4, context ? selector : noop$4, refEquality);
}
function assertIsFunction(func, errorMessage = `expected a function, instead received ${typeof func}`) {
  if (typeof func !== "function") {
    throw new TypeError(errorMessage);
  }
}
function assertIsObject(object2, errorMessage = `expected an object, instead received ${typeof object2}`) {
  if (typeof object2 !== "object") {
    throw new TypeError(errorMessage);
  }
}
function assertIsArrayOfFunctions(array2, errorMessage = `expected all items to be functions, instead received the following types: `) {
  if (!array2.every((item) => typeof item === "function")) {
    const itemTypes = array2.map(
      (item) => typeof item === "function" ? `function ${item.name || "unnamed"}()` : typeof item
    ).join(", ");
    throw new TypeError(`${errorMessage}[${itemTypes}]`);
  }
}
var ensureIsArray = (item) => {
  return Array.isArray(item) ? item : [item];
};
function getDependencies(createSelectorArgs) {
  const dependencies = Array.isArray(createSelectorArgs[0]) ? createSelectorArgs[0] : createSelectorArgs;
  assertIsArrayOfFunctions(
    dependencies,
    `createSelector expects all input-selectors to be functions, but received the following types: `
  );
  return dependencies;
}
function collectInputSelectorResults(dependencies, inputSelectorArgs) {
  const inputSelectorResults = [];
  const { length } = dependencies;
  for (let i = 0; i < length; i++) {
    inputSelectorResults.push(dependencies[i].apply(null, inputSelectorArgs));
  }
  return inputSelectorResults;
}
var StrongRef = class {
  constructor(value) {
    this.value = value;
  }
  deref() {
    return this.value;
  }
};
var Ref = typeof WeakRef !== "undefined" ? WeakRef : StrongRef;
var UNTERMINATED = 0;
var TERMINATED = 1;
function createCacheNode() {
  return {
    s: UNTERMINATED,
    v: void 0,
    o: null,
    p: null
  };
}
function weakMapMemoize(func, options = {}) {
  let fnNode = createCacheNode();
  const { resultEqualityCheck } = options;
  let lastResult2;
  let resultsCount = 0;
  function memoized() {
    var _a;
    let cacheNode = fnNode;
    const { length } = arguments;
    for (let i = 0, l2 = length; i < l2; i++) {
      const arg = arguments[i];
      if (typeof arg === "function" || typeof arg === "object" && arg !== null) {
        let objectCache = cacheNode.o;
        if (objectCache === null) {
          cacheNode.o = objectCache = /* @__PURE__ */ new WeakMap();
        }
        const objectNode = objectCache.get(arg);
        if (objectNode === void 0) {
          cacheNode = createCacheNode();
          objectCache.set(arg, cacheNode);
        } else {
          cacheNode = objectNode;
        }
      } else {
        let primitiveCache = cacheNode.p;
        if (primitiveCache === null) {
          cacheNode.p = primitiveCache = /* @__PURE__ */ new Map();
        }
        const primitiveNode = primitiveCache.get(arg);
        if (primitiveNode === void 0) {
          cacheNode = createCacheNode();
          primitiveCache.set(arg, cacheNode);
        } else {
          cacheNode = primitiveNode;
        }
      }
    }
    const terminatedNode = cacheNode;
    let result;
    if (cacheNode.s === TERMINATED) {
      result = cacheNode.v;
    } else {
      result = func.apply(null, arguments);
      resultsCount++;
      if (resultEqualityCheck) {
        const lastResultValue = ((_a = lastResult2 == null ? void 0 : lastResult2.deref) == null ? void 0 : _a.call(lastResult2)) ?? lastResult2;
        if (lastResultValue != null && resultEqualityCheck(lastResultValue, result)) {
          result = lastResultValue;
          resultsCount !== 0 && resultsCount--;
        }
        const needsWeakRef = typeof result === "object" && result !== null || typeof result === "function";
        lastResult2 = needsWeakRef ? new Ref(result) : result;
      }
    }
    terminatedNode.s = TERMINATED;
    terminatedNode.v = result;
    return result;
  }
  memoized.clearCache = () => {
    fnNode = createCacheNode();
    memoized.resetResultsCount();
  };
  memoized.resultsCount = () => resultsCount;
  memoized.resetResultsCount = () => {
    resultsCount = 0;
  };
  return memoized;
}
function createSelectorCreator(memoizeOrOptions, ...memoizeOptionsFromArgs) {
  const createSelectorCreatorOptions = typeof memoizeOrOptions === "function" ? {
    memoize: memoizeOrOptions,
    memoizeOptions: memoizeOptionsFromArgs
  } : memoizeOrOptions;
  const createSelector2 = (...createSelectorArgs) => {
    let recomputations = 0;
    let dependencyRecomputations = 0;
    let lastResult2;
    let directlyPassedOptions = {};
    let resultFunc = createSelectorArgs.pop();
    if (typeof resultFunc === "object") {
      directlyPassedOptions = resultFunc;
      resultFunc = createSelectorArgs.pop();
    }
    assertIsFunction(
      resultFunc,
      `createSelector expects an output function after the inputs, but received: [${typeof resultFunc}]`
    );
    const combinedOptions = {
      ...createSelectorCreatorOptions,
      ...directlyPassedOptions
    };
    const {
      memoize: memoize2,
      memoizeOptions = [],
      argsMemoize = weakMapMemoize,
      argsMemoizeOptions = []
    } = combinedOptions;
    const finalMemoizeOptions = ensureIsArray(memoizeOptions);
    const finalArgsMemoizeOptions = ensureIsArray(argsMemoizeOptions);
    const dependencies = getDependencies(createSelectorArgs);
    const memoizedResultFunc = memoize2(function recomputationWrapper() {
      recomputations++;
      return resultFunc.apply(
        null,
        arguments
      );
    }, ...finalMemoizeOptions);
    const selector = argsMemoize(function dependenciesChecker() {
      dependencyRecomputations++;
      const inputSelectorResults = collectInputSelectorResults(
        dependencies,
        arguments
      );
      lastResult2 = memoizedResultFunc.apply(null, inputSelectorResults);
      return lastResult2;
    }, ...finalArgsMemoizeOptions);
    return Object.assign(selector, {
      resultFunc,
      memoizedResultFunc,
      dependencies,
      dependencyRecomputations: () => dependencyRecomputations,
      resetDependencyRecomputations: () => {
        dependencyRecomputations = 0;
      },
      lastResult: () => lastResult2,
      recomputations: () => recomputations,
      resetRecomputations: () => {
        recomputations = 0;
      },
      memoize: memoize2,
      argsMemoize
    });
  };
  Object.assign(createSelector2, {
    withTypes: () => createSelector2
  });
  return createSelector2;
}
var createSelector = /* @__PURE__ */ createSelectorCreator(weakMapMemoize);
var createStructuredSelector = Object.assign(
  (inputSelectorsObject, selectorCreator = createSelector) => {
    assertIsObject(
      inputSelectorsObject,
      `createStructuredSelector expects first argument to be an object where each property is a selector, instead received a ${typeof inputSelectorsObject}`
    );
    const inputSelectorKeys = Object.keys(inputSelectorsObject);
    const dependencies = inputSelectorKeys.map(
      (key) => inputSelectorsObject[key]
    );
    const structuredSelector = selectorCreator(
      dependencies,
      (...inputSelectorResults) => {
        return inputSelectorResults.reduce((composition, value, index) => {
          composition[inputSelectorKeys[index]] = value;
          return composition;
        }, {});
      }
    );
    return structuredSelector;
  },
  { withTypes: () => createStructuredSelector }
);
var sortBy$2 = {};
var orderBy = {};
var compareValues = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function getPriority(a2) {
    if (typeof a2 === "symbol") {
      return 1;
    }
    if (a2 === null) {
      return 2;
    }
    if (a2 === void 0) {
      return 3;
    }
    if (a2 !== a2) {
      return 4;
    }
    return 0;
  }
  const compareValues2 = (a2, b2, order) => {
    if (a2 !== b2) {
      const aPriority = getPriority(a2);
      const bPriority = getPriority(b2);
      if (aPriority === bPriority && aPriority === 0) {
        if (a2 < b2) {
          return order === "desc" ? 1 : -1;
        }
        if (a2 > b2) {
          return order === "desc" ? -1 : 1;
        }
      }
      return order === "desc" ? bPriority - aPriority : aPriority - bPriority;
    }
    return 0;
  };
  exports.compareValues = compareValues2;
})(compareValues);
var isKey = {};
var isSymbol = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isSymbol2(value) {
    return typeof value === "symbol" || value instanceof Symbol;
  }
  exports.isSymbol = isSymbol2;
})(isSymbol);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isSymbol$1 = isSymbol;
  const regexIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
  const regexIsPlainProp = /^\w*$/;
  function isKey2(value, object2) {
    if (Array.isArray(value)) {
      return false;
    }
    if (typeof value === "number" || typeof value === "boolean" || value == null || isSymbol$1.isSymbol(value)) {
      return true;
    }
    return typeof value === "string" && (regexIsPlainProp.test(value) || !regexIsDeepProp.test(value)) || object2 != null && Object.hasOwn(object2, value);
  }
  exports.isKey = isKey2;
})(isKey);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const compareValues$1 = compareValues;
  const isKey$1 = isKey;
  const toPath$1 = toPath;
  function orderBy2(collection, criteria, orders, guard) {
    if (collection == null) {
      return [];
    }
    orders = guard ? void 0 : orders;
    if (!Array.isArray(collection)) {
      collection = Object.values(collection);
    }
    if (!Array.isArray(criteria)) {
      criteria = criteria == null ? [null] : [criteria];
    }
    if (criteria.length === 0) {
      criteria = [null];
    }
    if (!Array.isArray(orders)) {
      orders = orders == null ? [] : [orders];
    }
    orders = orders.map((order) => String(order));
    const getValueByNestedPath = (object2, path) => {
      let target = object2;
      for (let i = 0; i < path.length && target != null; ++i) {
        target = target[path[i]];
      }
      return target;
    };
    const getValueByCriterion = (criterion, object2) => {
      if (object2 == null || criterion == null) {
        return object2;
      }
      if (typeof criterion === "object" && "key" in criterion) {
        if (Object.hasOwn(object2, criterion.key)) {
          return object2[criterion.key];
        }
        return getValueByNestedPath(object2, criterion.path);
      }
      if (typeof criterion === "function") {
        return criterion(object2);
      }
      if (Array.isArray(criterion)) {
        return getValueByNestedPath(object2, criterion);
      }
      if (typeof object2 === "object") {
        return object2[criterion];
      }
      return object2;
    };
    const preparedCriteria = criteria.map((criterion) => {
      if (Array.isArray(criterion) && criterion.length === 1) {
        criterion = criterion[0];
      }
      if (criterion == null || typeof criterion === "function" || Array.isArray(criterion) || isKey$1.isKey(criterion)) {
        return criterion;
      }
      return { key: criterion, path: toPath$1.toPath(criterion) };
    });
    const preparedCollection = collection.map((item) => ({
      original: item,
      criteria: preparedCriteria.map((criterion) => getValueByCriterion(criterion, item))
    }));
    return preparedCollection.slice().sort((a2, b2) => {
      for (let i = 0; i < preparedCriteria.length; i++) {
        const comparedResult = compareValues$1.compareValues(a2.criteria[i], b2.criteria[i], orders[i]);
        if (comparedResult !== 0) {
          return comparedResult;
        }
      }
      return 0;
    }).map((item) => item.original);
  }
  exports.orderBy = orderBy2;
})(orderBy);
var flatten = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function flatten2(arr, depth = 1) {
    const result = [];
    const flooredDepth = Math.floor(depth);
    const recursive = (arr2, currentDepth) => {
      for (let i = 0; i < arr2.length; i++) {
        const item = arr2[i];
        if (Array.isArray(item) && currentDepth < flooredDepth) {
          recursive(item, currentDepth + 1);
        } else {
          result.push(item);
        }
      }
    };
    recursive(arr, 0);
    return result;
  }
  exports.flatten = flatten2;
})(flatten);
var isIterateeCall = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isIndex$1 = isIndex;
  const isArrayLike$1 = isArrayLike;
  const isObject$1 = isObject;
  const eq$1 = eq;
  function isIterateeCall2(value, index, object2) {
    if (!isObject$1.isObject(object2)) {
      return false;
    }
    if (typeof index === "number" && isArrayLike$1.isArrayLike(object2) && isIndex$1.isIndex(index) && index < object2.length || typeof index === "string" && index in object2) {
      return eq$1.eq(object2[index], value);
    }
    return false;
  }
  exports.isIterateeCall = isIterateeCall2;
})(isIterateeCall);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const orderBy$1 = orderBy;
  const flatten$1 = flatten;
  const isIterateeCall$1 = isIterateeCall;
  function sortBy2(collection, ...criteria) {
    const length = criteria.length;
    if (length > 1 && isIterateeCall$1.isIterateeCall(collection, criteria[0], criteria[1])) {
      criteria = [];
    } else if (length > 2 && isIterateeCall$1.isIterateeCall(criteria[0], criteria[1], criteria[2])) {
      criteria = [criteria[0]];
    }
    return orderBy$1.orderBy(collection, flatten$1.flatten(criteria), ["asc"]);
  }
  exports.sortBy = sortBy2;
})(sortBy$2);
var sortBy = sortBy$2.sortBy;
const sortBy$1 = /* @__PURE__ */ getDefaultExportFromCjs(sortBy);
var selectLegendSettings = (state) => state.legend.settings;
var selectLegendSize = (state) => state.legend.size;
var selectAllLegendPayload2DArray = (state) => state.legend.payload;
createSelector([selectAllLegendPayload2DArray, selectLegendSettings], (payloads, _ref2) => {
  var {
    itemSorter
  } = _ref2;
  var flat = payloads.flat(1);
  return itemSorter ? sortBy$1(flat, itemSorter) : flat;
});
var EPS$1 = 1;
function useElementOffset() {
  var extraDependencies = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var [lastBoundingBox, setLastBoundingBox] = reactExports.useState({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  });
  var updateBoundingBox = reactExports.useCallback(
    (node) => {
      if (node != null) {
        var rect = node.getBoundingClientRect();
        var box = {
          height: rect.height,
          left: rect.left,
          top: rect.top,
          width: rect.width
        };
        if (Math.abs(box.height - lastBoundingBox.height) > EPS$1 || Math.abs(box.left - lastBoundingBox.left) > EPS$1 || Math.abs(box.top - lastBoundingBox.top) > EPS$1 || Math.abs(box.width - lastBoundingBox.width) > EPS$1) {
          setLastBoundingBox({
            height: box.height,
            left: box.left,
            top: box.top,
            width: box.width
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lastBoundingBox.width, lastBoundingBox.height, lastBoundingBox.top, lastBoundingBox.left, ...extraDependencies]
  );
  return [lastBoundingBox, updateBoundingBox];
}
function formatProdErrorMessage$1(code) {
  return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var symbol_observable_default = $$observable;
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var ActionTypes = {
  INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
var actionTypes_default = ActionTypes;
function isPlainObject$4(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function createStore(reducer, preloadedState, enhancer) {
  if (typeof reducer !== "function") {
    throw new Error(formatProdErrorMessage$1(2));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(formatProdErrorMessage$1(0));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(formatProdErrorMessage$1(1));
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = /* @__PURE__ */ new Map();
  let nextListeners = currentListeners;
  let listenerIdCounter = 0;
  let isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = /* @__PURE__ */ new Map();
      currentListeners.forEach((listener2, key) => {
        nextListeners.set(key, listener2);
      });
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(3));
    }
    return currentState;
  }
  function subscribe(listener2) {
    if (typeof listener2 !== "function") {
      throw new Error(formatProdErrorMessage$1(4));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(5));
    }
    let isSubscribed = true;
    ensureCanMutateNextListeners();
    const listenerId = listenerIdCounter++;
    nextListeners.set(listenerId, listener2);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage$1(6));
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      nextListeners.delete(listenerId);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject$4(action)) {
      throw new Error(formatProdErrorMessage$1(7));
    }
    if (typeof action.type === "undefined") {
      throw new Error(formatProdErrorMessage$1(8));
    }
    if (typeof action.type !== "string") {
      throw new Error(formatProdErrorMessage$1(17));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage$1(9));
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    const listeners = currentListeners = nextListeners;
    listeners.forEach((listener2) => {
      listener2();
    });
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(formatProdErrorMessage$1(10));
    }
    currentReducer = nextReducer;
    dispatch({
      type: actionTypes_default.REPLACE
    });
  }
  function observable() {
    const outerSubscribe = subscribe;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(formatProdErrorMessage$1(11));
        }
        function observeState() {
          const observerAsObserver = observer;
          if (observerAsObserver.next) {
            observerAsObserver.next(getState());
          }
        }
        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      },
      [symbol_observable_default]() {
        return this;
      }
    };
  }
  dispatch({
    type: actionTypes_default.INIT
  });
  const store = {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [symbol_observable_default]: observable
  };
  return store;
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach((key) => {
    const reducer = reducers[key];
    const initialState2 = reducer(void 0, {
      type: actionTypes_default.INIT
    });
    if (typeof initialState2 === "undefined") {
      throw new Error(formatProdErrorMessage$1(12));
    }
    if (typeof reducer(void 0, {
      type: actionTypes_default.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage$1(13));
    }
  });
}
function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);
  let shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e3) {
    shapeAssertionError = e3;
  }
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage$1(14));
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function compose$1(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a2, b2) => (...args) => a2(b2(...args)));
}
function applyMiddleware(...middlewares) {
  return (createStore2) => (reducer, preloadedState) => {
    const store = createStore2(reducer, preloadedState);
    let dispatch = () => {
      throw new Error(formatProdErrorMessage$1(15));
    };
    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...args) => dispatch(action, ...args)
    };
    const chain = middlewares.map((middleware) => middleware(middlewareAPI));
    dispatch = compose$1(...chain)(store.dispatch);
    return {
      ...store,
      dispatch
    };
  };
}
function isAction(action) {
  return isPlainObject$4(action) && "type" in action && typeof action.type === "string";
}
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
  throw new Error(
    `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var getPrototypeOf = Object.getPrototypeOf;
function isDraft(value) {
  return !!value && !!value[DRAFT_STATE];
}
function isDraftable(value) {
  var _a;
  if (!value)
    return false;
  return isPlainObject$3(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!((_a = value.constructor) == null ? void 0 : _a[DRAFTABLE]) || isMap(value) || isSet(value);
}
var objectCtorString = Object.prototype.constructor.toString();
function isPlainObject$3(value) {
  if (!value || typeof value !== "object")
    return false;
  const proto = getPrototypeOf(value);
  if (proto === null) {
    return true;
  }
  const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
  if (Ctor === Object)
    return true;
  return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
}
function each(obj, iter) {
  if (getArchtype(obj) === 0) {
    Reflect.ownKeys(obj).forEach((key) => {
      iter(key, obj[key], obj);
    });
  } else {
    obj.forEach((entry, index) => iter(index, entry, obj));
  }
}
function getArchtype(thing) {
  const state = thing[DRAFT_STATE];
  return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
function has(thing, prop) {
  return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
}
function set(thing, propOrOldValue, value) {
  const t2 = getArchtype(thing);
  if (t2 === 2)
    thing.set(propOrOldValue, value);
  else if (t2 === 3) {
    thing.add(value);
  } else
    thing[propOrOldValue] = value;
}
function is$1(x2, y2) {
  if (x2 === y2) {
    return x2 !== 0 || 1 / x2 === 1 / y2;
  } else {
    return x2 !== x2 && y2 !== y2;
  }
}
function isMap(target) {
  return target instanceof Map;
}
function isSet(target) {
  return target instanceof Set;
}
function latest(state) {
  return state.copy_ || state.base_;
}
function shallowCopy(base, strict) {
  if (isMap(base)) {
    return new Map(base);
  }
  if (isSet(base)) {
    return new Set(base);
  }
  if (Array.isArray(base))
    return Array.prototype.slice.call(base);
  const isPlain = isPlainObject$3(base);
  if (strict === true || strict === "class_only" && !isPlain) {
    const descriptors = Object.getOwnPropertyDescriptors(base);
    delete descriptors[DRAFT_STATE];
    let keys = Reflect.ownKeys(descriptors);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const desc = descriptors[key];
      if (desc.writable === false) {
        desc.writable = true;
        desc.configurable = true;
      }
      if (desc.get || desc.set)
        descriptors[key] = {
          configurable: true,
          writable: true,
          // could live with !!desc.set as well here...
          enumerable: desc.enumerable,
          value: base[key]
        };
    }
    return Object.create(getPrototypeOf(base), descriptors);
  } else {
    const proto = getPrototypeOf(base);
    if (proto !== null && isPlain) {
      return { ...base };
    }
    const obj = Object.create(proto);
    return Object.assign(obj, base);
  }
}
function freeze(obj, deep = false) {
  if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
    return obj;
  if (getArchtype(obj) > 1) {
    Object.defineProperties(obj, {
      set: { value: dontMutateFrozenCollections },
      add: { value: dontMutateFrozenCollections },
      clear: { value: dontMutateFrozenCollections },
      delete: { value: dontMutateFrozenCollections }
    });
  }
  Object.freeze(obj);
  if (deep)
    Object.values(obj).forEach((value) => freeze(value, true));
  return obj;
}
function dontMutateFrozenCollections() {
  die(2);
}
function isFrozen(obj) {
  return Object.isFrozen(obj);
}
var plugins = {};
function getPlugin(pluginKey) {
  const plugin = plugins[pluginKey];
  if (!plugin) {
    die(0, pluginKey);
  }
  return plugin;
}
var currentScope;
function getCurrentScope() {
  return currentScope;
}
function createScope(parent_, immer_) {
  return {
    drafts_: [],
    parent_,
    immer_,
    // Whenever the modified draft contains a draft from another scope, we
    // need to prevent auto-freezing so the unowned draft can be finalized.
    canAutoFreeze_: true,
    unfinalizedDrafts_: 0
  };
}
function usePatchesInScope(scope, patchListener) {
  if (patchListener) {
    getPlugin("Patches");
    scope.patches_ = [];
    scope.inversePatches_ = [];
    scope.patchListener_ = patchListener;
  }
}
function revokeScope(scope) {
  leaveScope(scope);
  scope.drafts_.forEach(revokeDraft);
  scope.drafts_ = null;
}
function leaveScope(scope) {
  if (scope === currentScope) {
    currentScope = scope.parent_;
  }
}
function enterScope(immer2) {
  return currentScope = createScope(currentScope, immer2);
}
function revokeDraft(draft) {
  const state = draft[DRAFT_STATE];
  if (state.type_ === 0 || state.type_ === 1)
    state.revoke_();
  else
    state.revoked_ = true;
}
function processResult(result, scope) {
  scope.unfinalizedDrafts_ = scope.drafts_.length;
  const baseDraft = scope.drafts_[0];
  const isReplaced = result !== void 0 && result !== baseDraft;
  if (isReplaced) {
    if (baseDraft[DRAFT_STATE].modified_) {
      revokeScope(scope);
      die(4);
    }
    if (isDraftable(result)) {
      result = finalize(scope, result);
      if (!scope.parent_)
        maybeFreeze(scope, result);
    }
    if (scope.patches_) {
      getPlugin("Patches").generateReplacementPatches_(
        baseDraft[DRAFT_STATE].base_,
        result,
        scope.patches_,
        scope.inversePatches_
      );
    }
  } else {
    result = finalize(scope, baseDraft, []);
  }
  revokeScope(scope);
  if (scope.patches_) {
    scope.patchListener_(scope.patches_, scope.inversePatches_);
  }
  return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value, path) {
  if (isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  if (!state) {
    each(
      value,
      (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path)
    );
    return value;
  }
  if (state.scope_ !== rootScope)
    return value;
  if (!state.modified_) {
    maybeFreeze(rootScope, state.base_, true);
    return state.base_;
  }
  if (!state.finalized_) {
    state.finalized_ = true;
    state.scope_.unfinalizedDrafts_--;
    const result = state.copy_;
    let resultEach = result;
    let isSet2 = false;
    if (state.type_ === 3) {
      resultEach = new Set(result);
      result.clear();
      isSet2 = true;
    }
    each(
      resultEach,
      (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
    );
    maybeFreeze(rootScope, result, false);
    if (path && rootScope.patches_) {
      getPlugin("Patches").generatePatches_(
        state,
        path,
        rootScope.patches_,
        rootScope.inversePatches_
      );
    }
  }
  return state.copy_;
}
function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
  if (isDraft(childValue)) {
    const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
    !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
    const res = finalize(rootScope, childValue, path);
    set(targetObject, prop, res);
    if (isDraft(res)) {
      rootScope.canAutoFreeze_ = false;
    } else
      return;
  } else if (targetIsSet) {
    targetObject.add(childValue);
  }
  if (isDraftable(childValue) && !isFrozen(childValue)) {
    if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
      return;
    }
    finalize(rootScope, childValue);
    if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && (isMap(targetObject) ? targetObject.has(prop) : Object.prototype.propertyIsEnumerable.call(targetObject, prop)))
      maybeFreeze(rootScope, childValue);
  }
}
function maybeFreeze(scope, value, deep = false) {
  if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
    freeze(value, deep);
  }
}
function createProxyProxy(base, parent) {
  const isArray = Array.isArray(base);
  const state = {
    type_: isArray ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: parent ? parent.scope_ : getCurrentScope(),
    // True for both shallow and deep changes.
    modified_: false,
    // Used during finalization.
    finalized_: false,
    // Track which properties have been assigned (true) or deleted (false).
    assigned_: {},
    // The parent draft state.
    parent_: parent,
    // The base state.
    base_: base,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: false
  };
  let target = state;
  let traps = objectTraps;
  if (isArray) {
    target = [state];
    traps = arrayTraps;
  }
  const { revoke, proxy } = Proxy.revocable(target, traps);
  state.draft_ = proxy;
  state.revoke_ = revoke;
  return proxy;
}
var objectTraps = {
  get(state, prop) {
    if (prop === DRAFT_STATE)
      return state;
    const source = latest(state);
    if (!has(source, prop)) {
      return readPropFromProto(state, source, prop);
    }
    const value = source[prop];
    if (state.finalized_ || !isDraftable(value)) {
      return value;
    }
    if (value === peek(state.base_, prop)) {
      prepareCopy(state);
      return state.copy_[prop] = createProxy(value, state);
    }
    return value;
  },
  has(state, prop) {
    return prop in latest(state);
  },
  ownKeys(state) {
    return Reflect.ownKeys(latest(state));
  },
  set(state, prop, value) {
    const desc = getDescriptorFromProto(latest(state), prop);
    if (desc == null ? void 0 : desc.set) {
      desc.set.call(state.draft_, value);
      return true;
    }
    if (!state.modified_) {
      const current2 = peek(latest(state), prop);
      const currentState = current2 == null ? void 0 : current2[DRAFT_STATE];
      if (currentState && currentState.base_ === value) {
        state.copy_[prop] = value;
        state.assigned_[prop] = false;
        return true;
      }
      if (is$1(value, current2) && (value !== void 0 || has(state.base_, prop)))
        return true;
      prepareCopy(state);
      markChanged(state);
    }
    if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
    (value !== void 0 || prop in state.copy_) || // special case: NaN
    Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
      return true;
    state.copy_[prop] = value;
    state.assigned_[prop] = true;
    return true;
  },
  deleteProperty(state, prop) {
    if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
      state.assigned_[prop] = false;
      prepareCopy(state);
      markChanged(state);
    } else {
      delete state.assigned_[prop];
    }
    if (state.copy_) {
      delete state.copy_[prop];
    }
    return true;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(state, prop) {
    const owner = latest(state);
    const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
    if (!desc)
      return desc;
    return {
      writable: true,
      configurable: state.type_ !== 1 || prop !== "length",
      enumerable: desc.enumerable,
      value: owner[prop]
    };
  },
  defineProperty() {
    die(11);
  },
  getPrototypeOf(state) {
    return getPrototypeOf(state.base_);
  },
  setPrototypeOf() {
    die(12);
  }
};
var arrayTraps = {};
each(objectTraps, (key, fn) => {
  arrayTraps[key] = function() {
    arguments[0] = arguments[0][0];
    return fn.apply(this, arguments);
  };
});
arrayTraps.deleteProperty = function(state, prop) {
  return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
  return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
  const state = draft[DRAFT_STATE];
  const source = state ? latest(state) : draft;
  return source[prop];
}
function readPropFromProto(state, source, prop) {
  var _a;
  const desc = getDescriptorFromProto(source, prop);
  return desc ? `value` in desc ? desc.value : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (_a = desc.get) == null ? void 0 : _a.call(state.draft_)
  ) : void 0;
}
function getDescriptorFromProto(source, prop) {
  if (!(prop in source))
    return void 0;
  let proto = getPrototypeOf(source);
  while (proto) {
    const desc = Object.getOwnPropertyDescriptor(proto, prop);
    if (desc)
      return desc;
    proto = getPrototypeOf(proto);
  }
  return void 0;
}
function markChanged(state) {
  if (!state.modified_) {
    state.modified_ = true;
    if (state.parent_) {
      markChanged(state.parent_);
    }
  }
}
function prepareCopy(state) {
  if (!state.copy_) {
    state.copy_ = shallowCopy(
      state.base_,
      state.scope_.immer_.useStrictShallowCopy_
    );
  }
}
var Immer2 = class {
  constructor(config2) {
    this.autoFreeze_ = true;
    this.useStrictShallowCopy_ = false;
    this.produce = (base, recipe, patchListener) => {
      if (typeof base === "function" && typeof recipe !== "function") {
        const defaultBase = recipe;
        recipe = base;
        const self = this;
        return function curriedProduce(base2 = defaultBase, ...args) {
          return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
        };
      }
      if (typeof recipe !== "function")
        die(6);
      if (patchListener !== void 0 && typeof patchListener !== "function")
        die(7);
      let result;
      if (isDraftable(base)) {
        const scope = enterScope(this);
        const proxy = createProxy(base, void 0);
        let hasError = true;
        try {
          result = recipe(proxy);
          hasError = false;
        } finally {
          if (hasError)
            revokeScope(scope);
          else
            leaveScope(scope);
        }
        usePatchesInScope(scope, patchListener);
        return processResult(result, scope);
      } else if (!base || typeof base !== "object") {
        result = recipe(base);
        if (result === void 0)
          result = base;
        if (result === NOTHING)
          result = void 0;
        if (this.autoFreeze_)
          freeze(result, true);
        if (patchListener) {
          const p2 = [];
          const ip = [];
          getPlugin("Patches").generateReplacementPatches_(base, result, p2, ip);
          patchListener(p2, ip);
        }
        return result;
      } else
        die(1, base);
    };
    this.produceWithPatches = (base, recipe) => {
      if (typeof base === "function") {
        return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
      }
      let patches, inversePatches;
      const result = this.produce(base, recipe, (p2, ip) => {
        patches = p2;
        inversePatches = ip;
      });
      return [result, patches, inversePatches];
    };
    if (typeof (config2 == null ? void 0 : config2.autoFreeze) === "boolean")
      this.setAutoFreeze(config2.autoFreeze);
    if (typeof (config2 == null ? void 0 : config2.useStrictShallowCopy) === "boolean")
      this.setUseStrictShallowCopy(config2.useStrictShallowCopy);
  }
  createDraft(base) {
    if (!isDraftable(base))
      die(8);
    if (isDraft(base))
      base = current(base);
    const scope = enterScope(this);
    const proxy = createProxy(base, void 0);
    proxy[DRAFT_STATE].isManual_ = true;
    leaveScope(scope);
    return proxy;
  }
  finishDraft(draft, patchListener) {
    const state = draft && draft[DRAFT_STATE];
    if (!state || !state.isManual_)
      die(9);
    const { scope_: scope } = state;
    usePatchesInScope(scope, patchListener);
    return processResult(void 0, scope);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(value) {
    this.autoFreeze_ = value;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(value) {
    this.useStrictShallowCopy_ = value;
  }
  applyPatches(base, patches) {
    let i;
    for (i = patches.length - 1; i >= 0; i--) {
      const patch = patches[i];
      if (patch.path.length === 0 && patch.op === "replace") {
        base = patch.value;
        break;
      }
    }
    if (i > -1) {
      patches = patches.slice(i + 1);
    }
    const applyPatchesImpl = getPlugin("Patches").applyPatches_;
    if (isDraft(base)) {
      return applyPatchesImpl(base, patches);
    }
    return this.produce(
      base,
      (draft) => applyPatchesImpl(draft, patches)
    );
  }
};
function createProxy(value, parent) {
  const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
  const scope = parent ? parent.scope_ : getCurrentScope();
  scope.drafts_.push(draft);
  return draft;
}
function current(value) {
  if (!isDraft(value))
    die(10, value);
  return currentImpl(value);
}
function currentImpl(value) {
  if (!isDraftable(value) || isFrozen(value))
    return value;
  const state = value[DRAFT_STATE];
  let copy2;
  if (state) {
    if (!state.modified_)
      return state.base_;
    state.finalized_ = true;
    copy2 = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
  } else {
    copy2 = shallowCopy(value, true);
  }
  each(copy2, (key, childValue) => {
    set(copy2, key, currentImpl(childValue));
  });
  if (state) {
    state.finalized_ = false;
  }
  return copy2;
}
var immer = new Immer2();
var produce = immer.produce;
function castDraft(value) {
  return value;
}
function createThunkMiddleware(extraArgument) {
  const middleware = ({ dispatch, getState }) => (next) => (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
  return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length === 0) return void 0;
  if (typeof arguments[0] === "object") return compose$1;
  return compose$1.apply(null, arguments);
};
function createAction(type, prepareAction) {
  function actionCreator(...args) {
    if (prepareAction) {
      let prepared = prepareAction(...args);
      if (!prepared) {
        throw new Error(formatProdErrorMessage(0));
      }
      return {
        type,
        payload: prepared.payload,
        ..."meta" in prepared && {
          meta: prepared.meta
        },
        ..."error" in prepared && {
          error: prepared.error
        }
      };
    }
    return {
      type,
      payload: args[0]
    };
  }
  actionCreator.toString = () => `${type}`;
  actionCreator.type = type;
  actionCreator.match = (action) => isAction(action) && action.type === type;
  return actionCreator;
}
var Tuple = class _Tuple extends Array {
  constructor(...items) {
    super(...items);
    Object.setPrototypeOf(this, _Tuple.prototype);
  }
  static get [Symbol.species]() {
    return _Tuple;
  }
  concat(...arr) {
    return super.concat.apply(this, arr);
  }
  prepend(...arr) {
    if (arr.length === 1 && Array.isArray(arr[0])) {
      return new _Tuple(...arr[0].concat(this));
    }
    return new _Tuple(...arr.concat(this));
  }
};
function freezeDraftable(val) {
  return isDraftable(val) ? produce(val, () => {
  }) : val;
}
function getOrInsertComputed(map2, key, compute) {
  if (map2.has(key)) return map2.get(key);
  return map2.set(key, compute(key)).get(key);
}
function isBoolean(x2) {
  return typeof x2 === "boolean";
}
var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
  const {
    thunk: thunk$1 = true,
    immutableCheck = true,
    serializableCheck = true,
    actionCreatorCheck = true
  } = options ?? {};
  let middlewareArray = new Tuple();
  if (thunk$1) {
    if (isBoolean(thunk$1)) {
      middlewareArray.push(thunk);
    } else {
      middlewareArray.push(withExtraArgument(thunk$1.extraArgument));
    }
  }
  return middlewareArray;
};
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var createQueueWithTimer = (timeout) => {
  return (notify) => {
    setTimeout(notify, timeout);
  };
};
var autoBatchEnhancer = (options = {
  type: "raf"
}) => (next) => (...args) => {
  const store = next(...args);
  let notifying = true;
  let shouldNotifyAtEndOfTick = false;
  let notificationQueued = false;
  const listeners = /* @__PURE__ */ new Set();
  const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10)
  ) : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
  const notifyListeners = () => {
    notificationQueued = false;
    if (shouldNotifyAtEndOfTick) {
      shouldNotifyAtEndOfTick = false;
      listeners.forEach((l2) => l2());
    }
  };
  return Object.assign({}, store, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(listener2) {
      const wrappedListener = () => notifying && listener2();
      const unsubscribe = store.subscribe(wrappedListener);
      listeners.add(listener2);
      return () => {
        unsubscribe();
        listeners.delete(listener2);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(action) {
      var _a;
      try {
        notifying = !((_a = action == null ? void 0 : action.meta) == null ? void 0 : _a[SHOULD_AUTOBATCH]);
        shouldNotifyAtEndOfTick = !notifying;
        if (shouldNotifyAtEndOfTick) {
          if (!notificationQueued) {
            notificationQueued = true;
            queueCallback(notifyListeners);
          }
        }
        return store.dispatch(action);
      } finally {
        notifying = true;
      }
    }
  });
};
var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
  const {
    autoBatch = true
  } = options ?? {};
  let enhancerArray = new Tuple(middlewareEnhancer);
  if (autoBatch) {
    enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
  }
  return enhancerArray;
};
function configureStore(options) {
  const getDefaultMiddleware = buildGetDefaultMiddleware();
  const {
    reducer = void 0,
    middleware,
    devTools = true,
    preloadedState = void 0,
    enhancers = void 0
  } = options || {};
  let rootReducer2;
  if (typeof reducer === "function") {
    rootReducer2 = reducer;
  } else if (isPlainObject$4(reducer)) {
    rootReducer2 = combineReducers(reducer);
  } else {
    throw new Error(formatProdErrorMessage(1));
  }
  let finalMiddleware;
  if (typeof middleware === "function") {
    finalMiddleware = middleware(getDefaultMiddleware);
  } else {
    finalMiddleware = getDefaultMiddleware();
  }
  let finalCompose = compose$1;
  if (devTools) {
    finalCompose = composeWithDevTools({
      // Enable capture of stack traces for dispatched Redux actions
      trace: false,
      ...typeof devTools === "object" && devTools
    });
  }
  const middlewareEnhancer = applyMiddleware(...finalMiddleware);
  const getDefaultEnhancers = buildGetDefaultEnhancers(middlewareEnhancer);
  let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
  const composedEnhancer = finalCompose(...storeEnhancers);
  return createStore(rootReducer2, preloadedState, composedEnhancer);
}
function executeReducerBuilderCallback(builderCallback) {
  const actionsMap = {};
  const actionMatchers = [];
  let defaultCaseReducer;
  const builder = {
    addCase(typeOrActionCreator, reducer) {
      const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
      if (!type) {
        throw new Error(formatProdErrorMessage(28));
      }
      if (type in actionsMap) {
        throw new Error(formatProdErrorMessage(29));
      }
      actionsMap[type] = reducer;
      return builder;
    },
    addAsyncThunk(asyncThunk, reducers) {
      if (reducers.pending) actionsMap[asyncThunk.pending.type] = reducers.pending;
      if (reducers.rejected) actionsMap[asyncThunk.rejected.type] = reducers.rejected;
      if (reducers.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers.fulfilled;
      if (reducers.settled) actionMatchers.push({
        matcher: asyncThunk.settled,
        reducer: reducers.settled
      });
      return builder;
    },
    addMatcher(matcher, reducer) {
      actionMatchers.push({
        matcher,
        reducer
      });
      return builder;
    },
    addDefaultCase(reducer) {
      defaultCaseReducer = reducer;
      return builder;
    }
  };
  builderCallback(builder);
  return [actionsMap, actionMatchers, defaultCaseReducer];
}
function isStateFunction(x2) {
  return typeof x2 === "function";
}
function createReducer(initialState2, mapOrBuilderCallback) {
  let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
  let getInitialState;
  if (isStateFunction(initialState2)) {
    getInitialState = () => freezeDraftable(initialState2());
  } else {
    const frozenInitialState = freezeDraftable(initialState2);
    getInitialState = () => frozenInitialState;
  }
  function reducer(state = getInitialState(), action) {
    let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({
      matcher
    }) => matcher(action)).map(({
      reducer: reducer2
    }) => reducer2)];
    if (caseReducers.filter((cr) => !!cr).length === 0) {
      caseReducers = [finalDefaultCaseReducer];
    }
    return caseReducers.reduce((previousState, caseReducer) => {
      if (caseReducer) {
        if (isDraft(previousState)) {
          const draft = previousState;
          const result = caseReducer(draft, action);
          if (result === void 0) {
            return previousState;
          }
          return result;
        } else if (!isDraftable(previousState)) {
          const result = caseReducer(previousState, action);
          if (result === void 0) {
            if (previousState === null) {
              return previousState;
            }
            throw Error("A case reducer on a non-draftable value must not return undefined");
          }
          return result;
        } else {
          return produce(previousState, (draft) => {
            return caseReducer(draft, action);
          });
        }
      }
      return previousState;
    }, state);
  }
  reducer.getInitialState = getInitialState;
  return reducer;
}
var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
var nanoid = (size = 21) => {
  let id = "";
  let i = size;
  while (i--) {
    id += urlAlphabet[Math.random() * 64 | 0];
  }
  return id;
};
var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function getType(slice, actionKey) {
  return `${slice}/${actionKey}`;
}
function buildCreateSlice({
  creators
} = {}) {
  var _a;
  const cAT = (_a = creators == null ? void 0 : creators.asyncThunk) == null ? void 0 : _a[asyncThunkSymbol];
  return function createSlice2(options) {
    const {
      name,
      reducerPath = name
    } = options;
    if (!name) {
      throw new Error(formatProdErrorMessage(11));
    }
    const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
    const reducerNames = Object.keys(reducers);
    const context = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    };
    const contextMethods = {
      addCase(typeOrActionCreator, reducer2) {
        const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (!type) {
          throw new Error(formatProdErrorMessage(12));
        }
        if (type in context.sliceCaseReducersByType) {
          throw new Error(formatProdErrorMessage(13));
        }
        context.sliceCaseReducersByType[type] = reducer2;
        return contextMethods;
      },
      addMatcher(matcher, reducer2) {
        context.sliceMatchers.push({
          matcher,
          reducer: reducer2
        });
        return contextMethods;
      },
      exposeAction(name2, actionCreator) {
        context.actionCreators[name2] = actionCreator;
        return contextMethods;
      },
      exposeCaseReducer(name2, reducer2) {
        context.sliceCaseReducersByName[name2] = reducer2;
        return contextMethods;
      }
    };
    reducerNames.forEach((reducerName) => {
      const reducerDefinition = reducers[reducerName];
      const reducerDetails = {
        reducerName,
        type: getType(name, reducerName),
        createNotation: typeof options.reducers === "function"
      };
      if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) {
        handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
      } else {
        handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
      }
    });
    function buildReducer() {
      const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
      const finalCaseReducers = {
        ...extraReducers,
        ...context.sliceCaseReducersByType
      };
      return createReducer(options.initialState, (builder) => {
        for (let key in finalCaseReducers) {
          builder.addCase(key, finalCaseReducers[key]);
        }
        for (let sM of context.sliceMatchers) {
          builder.addMatcher(sM.matcher, sM.reducer);
        }
        for (let m2 of actionMatchers) {
          builder.addMatcher(m2.matcher, m2.reducer);
        }
        if (defaultCaseReducer) {
          builder.addDefaultCase(defaultCaseReducer);
        }
      });
    }
    const selectSelf = (state) => state;
    const injectedSelectorCache = /* @__PURE__ */ new Map();
    const injectedStateCache = /* @__PURE__ */ new WeakMap();
    let _reducer;
    function reducer(state, action) {
      if (!_reducer) _reducer = buildReducer();
      return _reducer(state, action);
    }
    function getInitialState() {
      if (!_reducer) _reducer = buildReducer();
      return _reducer.getInitialState();
    }
    function makeSelectorProps(reducerPath2, injected = false) {
      function selectSlice(state) {
        let sliceState = state[reducerPath2];
        if (typeof sliceState === "undefined") {
          if (injected) {
            sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
          }
        }
        return sliceState;
      }
      function getSelectors(selectState = selectSelf) {
        const selectorCache = getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap());
        return getOrInsertComputed(selectorCache, selectState, () => {
          const map2 = {};
          for (const [name2, selector] of Object.entries(options.selectors ?? {})) {
            map2[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
          }
          return map2;
        });
      }
      return {
        reducerPath: reducerPath2,
        getSelectors,
        get selectors() {
          return getSelectors(selectSlice);
        },
        selectSlice
      };
    }
    const slice = {
      name,
      reducer,
      actions: context.actionCreators,
      caseReducers: context.sliceCaseReducersByName,
      getInitialState,
      ...makeSelectorProps(reducerPath),
      injectInto(injectable, {
        reducerPath: pathOpt,
        ...config2
      } = {}) {
        const newReducerPath = pathOpt ?? reducerPath;
        injectable.inject({
          reducerPath: newReducerPath,
          reducer
        }, config2);
        return {
          ...slice,
          ...makeSelectorProps(newReducerPath, true)
        };
      }
    };
    return slice;
  };
}
function wrapSelector(selector, selectState, getInitialState, injected) {
  function wrapper(rootState, ...args) {
    let sliceState = selectState(rootState);
    if (typeof sliceState === "undefined") {
      if (injected) {
        sliceState = getInitialState();
      }
    }
    return selector(sliceState, ...args);
  }
  wrapper.unwrapped = selector;
  return wrapper;
}
var createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
  function asyncThunk(payloadCreator, config2) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator,
      ...config2
    };
  }
  asyncThunk.withTypes = () => asyncThunk;
  return {
    reducer(caseReducer) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [caseReducer.name](...args) {
          return caseReducer(...args);
        }
      }[caseReducer.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(prepare, reducer) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare,
        reducer
      };
    },
    asyncThunk
  };
}
function handleNormalReducerDefinition({
  type,
  reducerName,
  createNotation
}, maybeReducerWithPrepare, context) {
  let caseReducer;
  let prepareCallback;
  if ("reducer" in maybeReducerWithPrepare) {
    if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) {
      throw new Error(formatProdErrorMessage(17));
    }
    caseReducer = maybeReducerWithPrepare.reducer;
    prepareCallback = maybeReducerWithPrepare.prepare;
  } else {
    caseReducer = maybeReducerWithPrepare;
  }
  context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
  return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({
  type,
  reducerName
}, reducerDefinition, context, cAT) {
  if (!cAT) {
    throw new Error(formatProdErrorMessage(18));
  }
  const {
    payloadCreator,
    fulfilled,
    pending,
    rejected,
    settled,
    options
  } = reducerDefinition;
  const thunk2 = cAT(type, payloadCreator, options);
  context.exposeAction(reducerName, thunk2);
  if (fulfilled) {
    context.addCase(thunk2.fulfilled, fulfilled);
  }
  if (pending) {
    context.addCase(thunk2.pending, pending);
  }
  if (rejected) {
    context.addCase(thunk2.rejected, rejected);
  }
  if (settled) {
    context.addMatcher(thunk2.settled, settled);
  }
  context.exposeCaseReducer(reducerName, {
    fulfilled: fulfilled || noop$3,
    pending: pending || noop$3,
    rejected: rejected || noop$3,
    settled: settled || noop$3
  });
}
function noop$3() {
}
var task = "task";
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
var taskCancelled = `task-${cancelled}`;
var taskCompleted = `task-${completed}`;
var listenerCancelled = `${listener}-${cancelled}`;
var listenerCompleted = `${listener}-${completed}`;
var TaskAbortError = class {
  constructor(code) {
    __publicField(this, "name", "TaskAbortError");
    __publicField(this, "message");
    this.code = code;
    this.message = `${task} ${cancelled} (reason: ${code})`;
  }
};
var assertFunction = (func, expected) => {
  if (typeof func !== "function") {
    throw new TypeError(formatProdErrorMessage(32));
  }
};
var noop2 = () => {
};
var catchRejection = (promise, onError = noop2) => {
  promise.catch(onError);
  return promise;
};
var addAbortSignalListener = (abortSignal, callback) => {
  abortSignal.addEventListener("abort", callback, {
    once: true
  });
  return () => abortSignal.removeEventListener("abort", callback);
};
var abortControllerWithReason = (abortController, reason) => {
  const signal = abortController.signal;
  if (signal.aborted) {
    return;
  }
  if (!("reason" in signal)) {
    Object.defineProperty(signal, "reason", {
      enumerable: true,
      value: reason,
      configurable: true,
      writable: true
    });
  }
  abortController.abort(reason);
};
var validateActive = (signal) => {
  if (signal.aborted) {
    const {
      reason
    } = signal;
    throw new TaskAbortError(reason);
  }
};
function raceWithSignal(signal, promise) {
  let cleanup = noop2;
  return new Promise((resolve, reject) => {
    const notifyRejection = () => reject(new TaskAbortError(signal.reason));
    if (signal.aborted) {
      notifyRejection();
      return;
    }
    cleanup = addAbortSignalListener(signal, notifyRejection);
    promise.finally(() => cleanup()).then(resolve, reject);
  }).finally(() => {
    cleanup = noop2;
  });
}
var runTask = async (task2, cleanUp) => {
  try {
    await Promise.resolve();
    const value = await task2();
    return {
      status: "ok",
      value
    };
  } catch (error) {
    return {
      status: error instanceof TaskAbortError ? "cancelled" : "rejected",
      error
    };
  } finally {
    cleanUp == null ? void 0 : cleanUp();
  }
};
var createPause = (signal) => {
  return (promise) => {
    return catchRejection(raceWithSignal(signal, promise).then((output) => {
      validateActive(signal);
      return output;
    }));
  };
};
var createDelay = (signal) => {
  const pause = createPause(signal);
  return (timeoutMs) => {
    return pause(new Promise((resolve) => setTimeout(resolve, timeoutMs)));
  };
};
var {
  assign
} = Object;
var INTERNAL_NIL_TOKEN = {};
var alm = "listenerMiddleware";
var createFork = (parentAbortSignal, parentBlockingPromises) => {
  const linkControllers = (controller) => addAbortSignalListener(parentAbortSignal, () => abortControllerWithReason(controller, parentAbortSignal.reason));
  return (taskExecutor, opts) => {
    assertFunction(taskExecutor);
    const childAbortController = new AbortController();
    linkControllers(childAbortController);
    const result = runTask(async () => {
      validateActive(parentAbortSignal);
      validateActive(childAbortController.signal);
      const result2 = await taskExecutor({
        pause: createPause(childAbortController.signal),
        delay: createDelay(childAbortController.signal),
        signal: childAbortController.signal
      });
      validateActive(childAbortController.signal);
      return result2;
    }, () => abortControllerWithReason(childAbortController, taskCompleted));
    if (opts == null ? void 0 : opts.autoJoin) {
      parentBlockingPromises.push(result.catch(noop2));
    }
    return {
      result: createPause(parentAbortSignal)(result),
      cancel() {
        abortControllerWithReason(childAbortController, taskCancelled);
      }
    };
  };
};
var createTakePattern = (startListening, signal) => {
  const take = async (predicate, timeout) => {
    validateActive(signal);
    let unsubscribe = () => {
    };
    const tuplePromise = new Promise((resolve, reject) => {
      let stopListening = startListening({
        predicate,
        effect: (action, listenerApi) => {
          listenerApi.unsubscribe();
          resolve([action, listenerApi.getState(), listenerApi.getOriginalState()]);
        }
      });
      unsubscribe = () => {
        stopListening();
        reject();
      };
    });
    const promises = [tuplePromise];
    if (timeout != null) {
      promises.push(new Promise((resolve) => setTimeout(resolve, timeout, null)));
    }
    try {
      const output = await raceWithSignal(signal, Promise.race(promises));
      validateActive(signal);
      return output;
    } finally {
      unsubscribe();
    }
  };
  return (predicate, timeout) => catchRejection(take(predicate, timeout));
};
var getListenerEntryPropsFrom = (options) => {
  let {
    type,
    actionCreator,
    matcher,
    predicate,
    effect
  } = options;
  if (type) {
    predicate = createAction(type).match;
  } else if (actionCreator) {
    type = actionCreator.type;
    predicate = actionCreator.match;
  } else if (matcher) {
    predicate = matcher;
  } else if (predicate) ;
  else {
    throw new Error(formatProdErrorMessage(21));
  }
  assertFunction(effect);
  return {
    predicate,
    type,
    effect
  };
};
var createListenerEntry = /* @__PURE__ */ assign((options) => {
  const {
    type,
    predicate,
    effect
  } = getListenerEntryPropsFrom(options);
  const entry = {
    id: nanoid(),
    effect,
    type,
    predicate,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(formatProdErrorMessage(22));
    }
  };
  return entry;
}, {
  withTypes: () => createListenerEntry
});
var findListenerEntry = (listenerMap, options) => {
  const {
    type,
    effect,
    predicate
  } = getListenerEntryPropsFrom(options);
  return Array.from(listenerMap.values()).find((entry) => {
    const matchPredicateOrType = typeof type === "string" ? entry.type === type : entry.predicate === predicate;
    return matchPredicateOrType && entry.effect === effect;
  });
};
var cancelActiveListeners = (entry) => {
  entry.pending.forEach((controller) => {
    abortControllerWithReason(controller, listenerCancelled);
  });
};
var createClearListenerMiddleware = (listenerMap) => {
  return () => {
    listenerMap.forEach(cancelActiveListeners);
    listenerMap.clear();
  };
};
var safelyNotifyError = (errorHandler, errorToNotify, errorInfo) => {
  try {
    errorHandler(errorToNotify, errorInfo);
  } catch (errorHandlerError) {
    setTimeout(() => {
      throw errorHandlerError;
    }, 0);
  }
};
var addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), {
  withTypes: () => addListener
});
var clearAllListeners = /* @__PURE__ */ createAction(`${alm}/removeAll`);
var removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), {
  withTypes: () => removeListener
});
var defaultErrorHandler = (...args) => {
  console.error(`${alm}/error`, ...args);
};
var createListenerMiddleware = (middlewareOptions = {}) => {
  const listenerMap = /* @__PURE__ */ new Map();
  const {
    extra,
    onError = defaultErrorHandler
  } = middlewareOptions;
  assertFunction(onError);
  const insertEntry = (entry) => {
    entry.unsubscribe = () => listenerMap.delete(entry.id);
    listenerMap.set(entry.id, entry);
    return (cancelOptions) => {
      entry.unsubscribe();
      if (cancelOptions == null ? void 0 : cancelOptions.cancelActive) {
        cancelActiveListeners(entry);
      }
    };
  };
  const startListening = (options) => {
    const entry = findListenerEntry(listenerMap, options) ?? createListenerEntry(options);
    return insertEntry(entry);
  };
  assign(startListening, {
    withTypes: () => startListening
  });
  const stopListening = (options) => {
    const entry = findListenerEntry(listenerMap, options);
    if (entry) {
      entry.unsubscribe();
      if (options.cancelActive) {
        cancelActiveListeners(entry);
      }
    }
    return !!entry;
  };
  assign(stopListening, {
    withTypes: () => stopListening
  });
  const notifyListener = async (entry, action, api, getOriginalState) => {
    const internalTaskController = new AbortController();
    const take = createTakePattern(startListening, internalTaskController.signal);
    const autoJoinPromises = [];
    try {
      entry.pending.add(internalTaskController);
      await Promise.resolve(entry.effect(
        action,
        // Use assign() rather than ... to avoid extra helper functions added to bundle
        assign({}, api, {
          getOriginalState,
          condition: (predicate, timeout) => take(predicate, timeout).then(Boolean),
          take,
          delay: createDelay(internalTaskController.signal),
          pause: createPause(internalTaskController.signal),
          extra,
          signal: internalTaskController.signal,
          fork: createFork(internalTaskController.signal, autoJoinPromises),
          unsubscribe: entry.unsubscribe,
          subscribe: () => {
            listenerMap.set(entry.id, entry);
          },
          cancelActiveListeners: () => {
            entry.pending.forEach((controller, _, set2) => {
              if (controller !== internalTaskController) {
                abortControllerWithReason(controller, listenerCancelled);
                set2.delete(controller);
              }
            });
          },
          cancel: () => {
            abortControllerWithReason(internalTaskController, listenerCancelled);
            entry.pending.delete(internalTaskController);
          },
          throwIfCancelled: () => {
            validateActive(internalTaskController.signal);
          }
        })
      ));
    } catch (listenerError) {
      if (!(listenerError instanceof TaskAbortError)) {
        safelyNotifyError(onError, listenerError, {
          raisedBy: "effect"
        });
      }
    } finally {
      await Promise.all(autoJoinPromises);
      abortControllerWithReason(internalTaskController, listenerCompleted);
      entry.pending.delete(internalTaskController);
    }
  };
  const clearListenerMiddleware = createClearListenerMiddleware(listenerMap);
  const middleware = (api) => (next) => (action) => {
    if (!isAction(action)) {
      return next(action);
    }
    if (addListener.match(action)) {
      return startListening(action.payload);
    }
    if (clearAllListeners.match(action)) {
      clearListenerMiddleware();
      return;
    }
    if (removeListener.match(action)) {
      return stopListening(action.payload);
    }
    let originalState = api.getState();
    const getOriginalState = () => {
      if (originalState === INTERNAL_NIL_TOKEN) {
        throw new Error(formatProdErrorMessage(23));
      }
      return originalState;
    };
    let result;
    try {
      result = next(action);
      if (listenerMap.size > 0) {
        const currentState = api.getState();
        const listenerEntries = Array.from(listenerMap.values());
        for (const entry of listenerEntries) {
          let runListener = false;
          try {
            runListener = entry.predicate(action, currentState, originalState);
          } catch (predicateError) {
            runListener = false;
            safelyNotifyError(onError, predicateError, {
              raisedBy: "predicate"
            });
          }
          if (!runListener) {
            continue;
          }
          notifyListener(entry, action, api, getOriginalState);
        }
      }
    } finally {
      originalState = INTERNAL_NIL_TOKEN;
    }
    return result;
  };
  return {
    middleware,
    startListening,
    stopListening,
    clearListeners: clearListenerMiddleware
  };
};
function formatProdErrorMessage(code) {
  return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var initialState$a = {
  layoutType: "horizontal",
  width: 0,
  height: 0,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  scale: 1
};
var chartLayoutSlice = createSlice({
  name: "chartLayout",
  initialState: initialState$a,
  reducers: {
    setLayout(state, action) {
      state.layoutType = action.payload;
    },
    setChartSize(state, action) {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
    setMargin(state, action) {
      var _action$payload$top, _action$payload$right, _action$payload$botto, _action$payload$left;
      state.margin.top = (_action$payload$top = action.payload.top) !== null && _action$payload$top !== void 0 ? _action$payload$top : 0;
      state.margin.right = (_action$payload$right = action.payload.right) !== null && _action$payload$right !== void 0 ? _action$payload$right : 0;
      state.margin.bottom = (_action$payload$botto = action.payload.bottom) !== null && _action$payload$botto !== void 0 ? _action$payload$botto : 0;
      state.margin.left = (_action$payload$left = action.payload.left) !== null && _action$payload$left !== void 0 ? _action$payload$left : 0;
    },
    setScale(state, action) {
      state.scale = action.payload;
    }
  }
});
var {
  setMargin,
  setLayout,
  setChartSize,
  setScale
} = chartLayoutSlice.actions;
var chartLayoutReducer = chartLayoutSlice.reducer;
function ownKeys$w(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$w(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$w(Object(t2), true).forEach(function(r3) {
      _defineProperty$A(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$w(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$A(e3, r2, t2) {
  return (r2 = _toPropertyKey$A(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$A(t2) {
  var i = _toPrimitive$A(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$A(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var RADIAN = Math.PI / 180;
var radianToDegree = (angleInRadian) => angleInRadian * 180 / Math.PI;
var polarToCartesian = (cx, cy, radius, angle) => ({
  x: cx + Math.cos(-RADIAN * angle) * radius,
  y: cy + Math.sin(-RADIAN * angle) * radius
});
var getMaxRadius = function getMaxRadius2(width, height) {
  var offset = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(width - (offset.left || 0) - (offset.right || 0)), Math.abs(height - (offset.top || 0) - (offset.bottom || 0))) / 2;
};
var distanceBetweenPoints = (point2, anotherPoint) => {
  var {
    x: x1,
    y: y1
  } = point2;
  var {
    x: x2,
    y: y2
  } = anotherPoint;
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
};
var getAngleOfPoint = (_ref2, _ref22) => {
  var {
    x: x2,
    y: y2
  } = _ref2;
  var {
    cx,
    cy
  } = _ref22;
  var radius = distanceBetweenPoints({
    x: x2,
    y: y2
  }, {
    x: cx,
    y: cy
  });
  if (radius <= 0) {
    return {
      radius,
      angle: 0
    };
  }
  var cos2 = (x2 - cx) / radius;
  var angleInRadian = Math.acos(cos2);
  if (y2 > cy) {
    angleInRadian = 2 * Math.PI - angleInRadian;
  }
  return {
    radius,
    angle: radianToDegree(angleInRadian),
    angleInRadian
  };
};
var formatAngleOfSector = (_ref3) => {
  var {
    startAngle,
    endAngle
  } = _ref3;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min2 = Math.min(startCnt, endCnt);
  return {
    startAngle: startAngle - min2 * 360,
    endAngle: endAngle - min2 * 360
  };
};
var reverseFormatAngleOfSector = (angle, _ref4) => {
  var {
    startAngle,
    endAngle
  } = _ref4;
  var startCnt = Math.floor(startAngle / 360);
  var endCnt = Math.floor(endAngle / 360);
  var min2 = Math.min(startCnt, endCnt);
  return angle + min2 * 360;
};
var inRangeOfSector = (_ref5, viewBox) => {
  var {
    x: x2,
    y: y2
  } = _ref5;
  var {
    radius,
    angle
  } = getAngleOfPoint({
    x: x2,
    y: y2
  }, viewBox);
  var {
    innerRadius,
    outerRadius
  } = viewBox;
  if (radius < innerRadius || radius > outerRadius) {
    return null;
  }
  if (radius === 0) {
    return null;
  }
  var {
    startAngle,
    endAngle
  } = formatAngleOfSector(viewBox);
  var formatAngle = angle;
  var inRange2;
  if (startAngle <= endAngle) {
    while (formatAngle > endAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < startAngle) {
      formatAngle += 360;
    }
    inRange2 = formatAngle >= startAngle && formatAngle <= endAngle;
  } else {
    while (formatAngle > startAngle) {
      formatAngle -= 360;
    }
    while (formatAngle < endAngle) {
      formatAngle += 360;
    }
    inRange2 = formatAngle >= endAngle && formatAngle <= startAngle;
  }
  if (inRange2) {
    return _objectSpread$w(_objectSpread$w({}, viewBox), {}, {
      radius,
      angle: reverseFormatAngleOfSector(formatAngle, viewBox)
    });
  }
  return null;
};
function getSliced(arr, startIndex, endIndex) {
  if (!Array.isArray(arr)) {
    return arr;
  }
  if (arr && startIndex + endIndex !== 0) {
    return arr.slice(startIndex, endIndex + 1);
  }
  return arr;
}
function ownKeys$v(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$v(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$v(Object(t2), true).forEach(function(r3) {
      _defineProperty$z(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$v(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$z(e3, r2, t2) {
  return (r2 = _toPropertyKey$z(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$z(t2) {
  var i = _toPrimitive$z(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$z(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function getValueByDataKey(obj, dataKey, defaultValue) {
  if (isNullish(obj) || isNullish(dataKey)) {
    return defaultValue;
  }
  if (isNumOrStr(dataKey)) {
    return get$1(obj, dataKey, defaultValue);
  }
  if (typeof dataKey === "function") {
    return dataKey(obj);
  }
  return defaultValue;
}
var calculateActiveTickIndex = (coordinate, ticks2, unsortedTicks, axisType, range2) => {
  var _ticks$length;
  var index = -1;
  var len = (_ticks$length = ticks2 === null || ticks2 === void 0 ? void 0 : ticks2.length) !== null && _ticks$length !== void 0 ? _ticks$length : 0;
  if (len <= 1 || coordinate == null) {
    return 0;
  }
  if (axisType === "angleAxis" && range2 != null && Math.abs(Math.abs(range2[1] - range2[0]) - 360) <= 1e-6) {
    for (var i = 0; i < len; i++) {
      var before = i > 0 ? unsortedTicks[i - 1].coordinate : unsortedTicks[len - 1].coordinate;
      var cur = unsortedTicks[i].coordinate;
      var after = i >= len - 1 ? unsortedTicks[0].coordinate : unsortedTicks[i + 1].coordinate;
      var sameDirectionCoord = void 0;
      if (mathSign(cur - before) !== mathSign(after - cur)) {
        var diffInterval = [];
        if (mathSign(after - cur) === mathSign(range2[1] - range2[0])) {
          sameDirectionCoord = after;
          var curInRange = cur + range2[1] - range2[0];
          diffInterval[0] = Math.min(curInRange, (curInRange + before) / 2);
          diffInterval[1] = Math.max(curInRange, (curInRange + before) / 2);
        } else {
          sameDirectionCoord = before;
          var afterInRange = after + range2[1] - range2[0];
          diffInterval[0] = Math.min(cur, (afterInRange + cur) / 2);
          diffInterval[1] = Math.max(cur, (afterInRange + cur) / 2);
        }
        var sameInterval = [Math.min(cur, (sameDirectionCoord + cur) / 2), Math.max(cur, (sameDirectionCoord + cur) / 2)];
        if (coordinate > sameInterval[0] && coordinate <= sameInterval[1] || coordinate >= diffInterval[0] && coordinate <= diffInterval[1]) {
          ({
            index
          } = unsortedTicks[i]);
          break;
        }
      } else {
        var minValue = Math.min(before, after);
        var maxValue = Math.max(before, after);
        if (coordinate > (minValue + cur) / 2 && coordinate <= (maxValue + cur) / 2) {
          ({
            index
          } = unsortedTicks[i]);
          break;
        }
      }
    }
  } else if (ticks2) {
    for (var _i = 0; _i < len; _i++) {
      if (_i === 0 && coordinate <= (ticks2[_i].coordinate + ticks2[_i + 1].coordinate) / 2 || _i > 0 && _i < len - 1 && coordinate > (ticks2[_i].coordinate + ticks2[_i - 1].coordinate) / 2 && coordinate <= (ticks2[_i].coordinate + ticks2[_i + 1].coordinate) / 2 || _i === len - 1 && coordinate > (ticks2[_i].coordinate + ticks2[_i - 1].coordinate) / 2) {
        ({
          index
        } = ticks2[_i]);
        break;
      }
    }
  }
  return index;
};
var appendOffsetOfLegend = (offset, legendSettings, legendSize) => {
  if (legendSettings && legendSize) {
    var {
      width: boxWidth,
      height: boxHeight
    } = legendSize;
    var {
      align,
      verticalAlign,
      layout
    } = legendSettings;
    if ((layout === "vertical" || layout === "horizontal" && verticalAlign === "middle") && align !== "center" && isNumber(offset[align])) {
      return _objectSpread$v(_objectSpread$v({}, offset), {}, {
        [align]: offset[align] + (boxWidth || 0)
      });
    }
    if ((layout === "horizontal" || layout === "vertical" && align === "center") && verticalAlign !== "middle" && isNumber(offset[verticalAlign])) {
      return _objectSpread$v(_objectSpread$v({}, offset), {}, {
        [verticalAlign]: offset[verticalAlign] + (boxHeight || 0)
      });
    }
  }
  return offset;
};
var isCategoricalAxis = (layout, axisType) => layout === "horizontal" && axisType === "xAxis" || layout === "vertical" && axisType === "yAxis" || layout === "centric" && axisType === "angleAxis" || layout === "radial" && axisType === "radiusAxis";
var getCoordinatesOfGrid = (ticks2, minValue, maxValue, syncWithTicks) => {
  if (syncWithTicks) {
    return ticks2.map((entry) => entry.coordinate);
  }
  var hasMin, hasMax;
  var values = ticks2.map((entry) => {
    if (entry.coordinate === minValue) {
      hasMin = true;
    }
    if (entry.coordinate === maxValue) {
      hasMax = true;
    }
    return entry.coordinate;
  });
  if (!hasMin) {
    values.push(minValue);
  }
  if (!hasMax) {
    values.push(maxValue);
  }
  return values;
};
var getTicksOfAxis = (axis, isGrid, isAll) => {
  if (!axis) {
    return null;
  }
  var {
    duplicateDomain,
    type,
    range: range2,
    scale,
    realScaleType,
    isCategorical,
    categoricalDomain,
    tickCount,
    ticks: ticks2,
    niceTicks,
    axisType
  } = axis;
  if (!scale) {
    return null;
  }
  var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && range2 && range2.length >= 2 ? mathSign(range2[0] - range2[1]) * 2 * offset : offset;
  if (ticks2 || niceTicks) {
    var result = (ticks2 || niceTicks || []).map((entry, index) => {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      return {
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scale(scaleContent) + offset,
        value: entry,
        offset,
        index
      };
    });
    return result.filter((row) => !isNan(row.coordinate));
  }
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => ({
      coordinate: scale(entry) + offset,
      value: entry,
      index,
      offset
    }));
  }
  if (scale.ticks && true && tickCount != null) {
    return scale.ticks(tickCount).map((entry, index) => ({
      coordinate: scale(entry) + offset,
      value: entry,
      offset,
      index
    }));
  }
  return scale.domain().map((entry, index) => ({
    coordinate: scale(entry) + offset,
    value: duplicateDomain ? duplicateDomain[entry] : entry,
    index,
    offset
  }));
};
var EPS = 1e-4;
var checkDomainOfScale = (scale) => {
  var domain = scale.domain();
  if (!domain || domain.length <= 2) {
    return;
  }
  var len = domain.length;
  var range2 = scale.range();
  var minValue = Math.min(range2[0], range2[1]) - EPS;
  var maxValue = Math.max(range2[0], range2[1]) + EPS;
  var first = scale(domain[0]);
  var last2 = scale(domain[len - 1]);
  if (first < minValue || first > maxValue || last2 < minValue || last2 > maxValue) {
    scale.domain([domain[0], domain[len - 1]]);
  }
};
var truncateByDomain = (value, domain) => {
  if (!domain || domain.length !== 2 || !isNumber(domain[0]) || !isNumber(domain[1])) {
    return value;
  }
  var minValue = Math.min(domain[0], domain[1]);
  var maxValue = Math.max(domain[0], domain[1]);
  var result = [value[0], value[1]];
  if (!isNumber(value[0]) || value[0] < minValue) {
    result[0] = minValue;
  }
  if (!isNumber(value[1]) || value[1] > maxValue) {
    result[1] = maxValue;
  }
  if (result[0] > maxValue) {
    result[0] = maxValue;
  }
  if (result[1] < minValue) {
    result[1] = minValue;
  }
  return result;
};
var offsetSign = (series) => {
  var n2 = series.length;
  if (n2 <= 0) {
    return;
  }
  for (var j = 0, m2 = series[0].length; j < m2; ++j) {
    var positive = 0;
    var negative = 0;
    for (var i = 0; i < n2; ++i) {
      var value = isNan(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
      if (value >= 0) {
        series[i][j][0] = positive;
        series[i][j][1] = positive + value;
        positive = series[i][j][1];
      } else {
        series[i][j][0] = negative;
        series[i][j][1] = negative + value;
        negative = series[i][j][1];
      }
    }
  }
};
var offsetPositive = (series) => {
  var n2 = series.length;
  if (n2 <= 0) {
    return;
  }
  for (var j = 0, m2 = series[0].length; j < m2; ++j) {
    var positive = 0;
    for (var i = 0; i < n2; ++i) {
      var value = isNan(series[i][j][1]) ? series[i][j][0] : series[i][j][1];
      if (value >= 0) {
        series[i][j][0] = positive;
        series[i][j][1] = positive + value;
        positive = series[i][j][1];
      } else {
        series[i][j][0] = 0;
        series[i][j][1] = 0;
      }
    }
  }
};
var STACK_OFFSET_MAP = {
  sign: offsetSign,
  // @ts-expect-error definitelytyped types are incorrect
  expand: stackOffsetExpand,
  // @ts-expect-error definitelytyped types are incorrect
  none: stackOffsetNone,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: stackOffsetSilhouette,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: stackOffsetWiggle,
  positive: offsetPositive
};
var getStackedData = (data, dataKeys, offsetType) => {
  var offsetAccessor = STACK_OFFSET_MAP[offsetType];
  var stack = shapeStack().keys(dataKeys).value((d2, key) => +getValueByDataKey(d2, key, 0)).order(stackOrderNone).offset(offsetAccessor);
  return stack(data);
};
function getNormalizedStackId(publicStackId) {
  return publicStackId == null ? void 0 : String(publicStackId);
}
function getCateCoordinateOfLine(_ref2) {
  var {
    axis,
    ticks: ticks2,
    bandSize,
    entry,
    index,
    dataKey
  } = _ref2;
  if (axis.type === "category") {
    if (!axis.allowDuplicatedCategory && axis.dataKey && !isNullish(entry[axis.dataKey])) {
      var matchedTick = findEntryInArray(ticks2, "value", entry[axis.dataKey]);
      if (matchedTick) {
        return matchedTick.coordinate + bandSize / 2;
      }
    }
    return ticks2[index] ? ticks2[index].coordinate + bandSize / 2 : null;
  }
  var value = getValueByDataKey(entry, !isNullish(dataKey) ? dataKey : axis.dataKey);
  return !isNullish(value) ? axis.scale(value) : null;
}
var getCateCoordinateOfBar = (_ref2) => {
  var {
    axis,
    ticks: ticks2,
    offset,
    bandSize,
    entry,
    index
  } = _ref2;
  if (axis.type === "category") {
    return ticks2[index] ? ticks2[index].coordinate + offset : null;
  }
  var value = getValueByDataKey(entry, axis.dataKey, axis.scale.domain()[index]);
  return !isNullish(value) ? axis.scale(value) - bandSize / 2 + offset : null;
};
var getBaseValueOfBar = (_ref3) => {
  var {
    numericAxis
  } = _ref3;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var minValue = Math.min(domain[0], domain[1]);
    var maxValue = Math.max(domain[0], domain[1]);
    if (minValue <= 0 && maxValue >= 0) {
      return 0;
    }
    if (maxValue < 0) {
      return maxValue;
    }
    return minValue;
  }
  return domain[0];
};
var getDomainOfSingle = (data) => {
  var flat = data.flat(2).filter(isNumber);
  return [Math.min(...flat), Math.max(...flat)];
};
var makeDomainFinite = (domain) => {
  return [domain[0] === Infinity ? 0 : domain[0], domain[1] === -Infinity ? 0 : domain[1]];
};
var getDomainOfStackGroups = (stackGroups, startIndex, endIndex) => {
  if (stackGroups == null) {
    return void 0;
  }
  return makeDomainFinite(Object.keys(stackGroups).reduce((result, stackId) => {
    var group = stackGroups[stackId];
    var {
      stackedData
    } = group;
    var domain = stackedData.reduce((res, entry) => {
      var sliced = getSliced(entry, startIndex, endIndex);
      var s2 = getDomainOfSingle(sliced);
      return [Math.min(res[0], s2[0]), Math.max(res[1], s2[1])];
    }, [Infinity, -Infinity]);
    return [Math.min(domain[0], result[0]), Math.max(domain[1], result[1])];
  }, [Infinity, -Infinity]));
};
var MIN_VALUE_REG = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var MAX_VALUE_REG = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/;
var getBandSizeOfAxis = (axis, ticks2, isBar) => {
  if (axis && axis.scale && axis.scale.bandwidth) {
    var bandWidth = axis.scale.bandwidth();
    if (!isBar || bandWidth > 0) {
      return bandWidth;
    }
  }
  if (axis && ticks2 && ticks2.length >= 2) {
    var orderedTicks = sortBy$1(ticks2, (o) => o.coordinate);
    var bandSize = Infinity;
    for (var i = 1, len = orderedTicks.length; i < len; i++) {
      var cur = orderedTicks[i];
      var prev = orderedTicks[i - 1];
      bandSize = Math.min((cur.coordinate || 0) - (prev.coordinate || 0), bandSize);
    }
    return bandSize === Infinity ? 0 : bandSize;
  }
  return isBar ? void 0 : 0;
};
function getTooltipEntry(_ref4) {
  var {
    tooltipEntrySettings,
    dataKey,
    payload,
    value,
    name
  } = _ref4;
  return _objectSpread$v(_objectSpread$v({}, tooltipEntrySettings), {}, {
    dataKey,
    payload,
    value,
    name
  });
}
function getTooltipNameProp(nameFromItem, dataKey) {
  if (nameFromItem) {
    return String(nameFromItem);
  }
  if (typeof dataKey === "string") {
    return dataKey;
  }
  return void 0;
}
function inRange(x2, y2, layout, polarViewBox, offset) {
  if (layout === "horizontal" || layout === "vertical") {
    var isInRange = x2 >= offset.left && x2 <= offset.left + offset.width && y2 >= offset.top && y2 <= offset.top + offset.height;
    return isInRange ? {
      x: x2,
      y: y2
    } : null;
  }
  if (polarViewBox) {
    return inRangeOfSector({
      x: x2,
      y: y2
    }, polarViewBox);
  }
  return null;
}
var getActiveCoordinate = (layout, tooltipTicks, activeIndex, rangeObj) => {
  var entry = tooltipTicks.find((tick) => tick && tick.index === activeIndex);
  if (entry) {
    if (layout === "horizontal") {
      return {
        x: entry.coordinate,
        y: rangeObj.y
      };
    }
    if (layout === "vertical") {
      return {
        x: rangeObj.x,
        y: entry.coordinate
      };
    }
    if (layout === "centric") {
      var _angle = entry.coordinate;
      var {
        radius: _radius
      } = rangeObj;
      return _objectSpread$v(_objectSpread$v(_objectSpread$v({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, _radius, _angle)), {}, {
        angle: _angle,
        radius: _radius
      });
    }
    var radius = entry.coordinate;
    var {
      angle
    } = rangeObj;
    return _objectSpread$v(_objectSpread$v(_objectSpread$v({}, rangeObj), polarToCartesian(rangeObj.cx, rangeObj.cy, radius, angle)), {}, {
      angle,
      radius
    });
  }
  return {
    x: 0,
    y: 0
  };
};
var calculateTooltipPos = (rangeObj, layout) => {
  if (layout === "horizontal") {
    return rangeObj.x;
  }
  if (layout === "vertical") {
    return rangeObj.y;
  }
  if (layout === "centric") {
    return rangeObj.angle;
  }
  return rangeObj.radius;
};
var selectChartWidth = (state) => state.layout.width;
var selectChartHeight = (state) => state.layout.height;
var selectContainerScale = (state) => state.layout.scale;
var selectMargin = (state) => state.layout.margin;
var selectAllXAxes = createSelector((state) => state.cartesianAxis.xAxis, (xAxisMap) => {
  return Object.values(xAxisMap);
});
var selectAllYAxes = createSelector((state) => state.cartesianAxis.yAxis, (yAxisMap) => {
  return Object.values(yAxisMap);
});
var DATA_ITEM_INDEX_ATTRIBUTE_NAME = "data-recharts-item-index";
var DATA_ITEM_DATAKEY_ATTRIBUTE_NAME = "data-recharts-item-data-key";
var DEFAULT_Y_AXIS_WIDTH = 60;
function ownKeys$u(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$u(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$u(Object(t2), true).forEach(function(r3) {
      _defineProperty$y(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$u(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$y(e3, r2, t2) {
  return (r2 = _toPropertyKey$y(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$y(t2) {
  var i = _toPrimitive$y(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$y(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var selectBrushHeight = (state) => state.brush.height;
function selectLeftAxesOffset(state) {
  var yAxes = selectAllYAxes(state);
  return yAxes.reduce((result, entry) => {
    if (entry.orientation === "left" && !entry.mirror && !entry.hide) {
      var width = typeof entry.width === "number" ? entry.width : DEFAULT_Y_AXIS_WIDTH;
      return result + width;
    }
    return result;
  }, 0);
}
function selectRightAxesOffset(state) {
  var yAxes = selectAllYAxes(state);
  return yAxes.reduce((result, entry) => {
    if (entry.orientation === "right" && !entry.mirror && !entry.hide) {
      var width = typeof entry.width === "number" ? entry.width : DEFAULT_Y_AXIS_WIDTH;
      return result + width;
    }
    return result;
  }, 0);
}
function selectTopAxesOffset(state) {
  var xAxes = selectAllXAxes(state);
  return xAxes.reduce((result, entry) => {
    if (entry.orientation === "top" && !entry.mirror && !entry.hide) {
      return result + entry.height;
    }
    return result;
  }, 0);
}
function selectBottomAxesOffset(state) {
  var xAxes = selectAllXAxes(state);
  return xAxes.reduce((result, entry) => {
    if (entry.orientation === "bottom" && !entry.mirror && !entry.hide) {
      return result + entry.height;
    }
    return result;
  }, 0);
}
var selectChartOffsetInternal = createSelector([selectChartWidth, selectChartHeight, selectMargin, selectBrushHeight, selectLeftAxesOffset, selectRightAxesOffset, selectTopAxesOffset, selectBottomAxesOffset, selectLegendSettings, selectLegendSize], (chartWidth, chartHeight, margin, brushHeight, leftAxesOffset, rightAxesOffset, topAxesOffset, bottomAxesOffset, legendSettings, legendSize) => {
  var offsetH = {
    left: (margin.left || 0) + leftAxesOffset,
    right: (margin.right || 0) + rightAxesOffset
  };
  var offsetV = {
    top: (margin.top || 0) + topAxesOffset,
    bottom: (margin.bottom || 0) + bottomAxesOffset
  };
  var offset = _objectSpread$u(_objectSpread$u({}, offsetV), offsetH);
  var brushBottom = offset.bottom;
  offset.bottom += brushHeight;
  offset = appendOffsetOfLegend(offset, legendSettings, legendSize);
  var offsetWidth = chartWidth - offset.left - offset.right;
  var offsetHeight = chartHeight - offset.top - offset.bottom;
  return _objectSpread$u(_objectSpread$u({
    brushBottom
  }, offset), {}, {
    // never return negative values for height and width
    width: Math.max(offsetWidth, 0),
    height: Math.max(offsetHeight, 0)
  });
});
var selectChartViewBox = createSelector(selectChartOffsetInternal, (offset) => ({
  x: offset.left,
  y: offset.top,
  width: offset.width,
  height: offset.height
}));
var selectAxisViewBox = createSelector(selectChartWidth, selectChartHeight, (width, height) => ({
  x: 0,
  y: 0,
  width,
  height
}));
var PanoramaContext = /* @__PURE__ */ reactExports.createContext(null);
var useIsPanorama = () => reactExports.useContext(PanoramaContext) != null;
var selectBrushSettings = (state) => state.brush;
var selectBrushDimensions = createSelector([selectBrushSettings, selectChartOffsetInternal, selectMargin], (brushSettings, offset, margin) => ({
  height: brushSettings.height,
  x: isNumber(brushSettings.x) ? brushSettings.x : offset.left,
  y: isNumber(brushSettings.y) ? brushSettings.y : offset.top + offset.height + offset.brushBottom - ((margin === null || margin === void 0 ? void 0 : margin.bottom) || 0),
  width: isNumber(brushSettings.width) ? brushSettings.width : offset.width
}));
var useViewBox = () => {
  var _useAppSelector;
  var panorama = useIsPanorama();
  var rootViewBox = useAppSelector(selectChartViewBox);
  var brushDimensions = useAppSelector(selectBrushDimensions);
  var brushPadding = (_useAppSelector = useAppSelector(selectBrushSettings)) === null || _useAppSelector === void 0 ? void 0 : _useAppSelector.padding;
  if (!panorama || !brushDimensions || !brushPadding) {
    return rootViewBox;
  }
  return {
    width: brushDimensions.width - brushPadding.left - brushPadding.right,
    height: brushDimensions.height - brushPadding.top - brushPadding.bottom,
    x: brushPadding.left,
    y: brushPadding.top
  };
};
var manyComponentsThrowErrorsIfOffsetIsUndefined = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
};
var useOffsetInternal = () => {
  var _useAppSelector2;
  return (_useAppSelector2 = useAppSelector(selectChartOffsetInternal)) !== null && _useAppSelector2 !== void 0 ? _useAppSelector2 : manyComponentsThrowErrorsIfOffsetIsUndefined;
};
var useChartWidth = () => {
  return useAppSelector(selectChartWidth);
};
var useChartHeight = () => {
  return useAppSelector(selectChartHeight);
};
var selectChartLayout = (state) => state.layout.layoutType;
var useChartLayout = () => useAppSelector(selectChartLayout);
var initialState$9 = {
  settings: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "middle",
    itemSorter: "value"
  },
  size: {
    width: 0,
    height: 0
  },
  payload: []
};
var legendSlice = createSlice({
  name: "legend",
  initialState: initialState$9,
  reducers: {
    setLegendSize(state, action) {
      state.size.width = action.payload.width;
      state.size.height = action.payload.height;
    },
    setLegendSettings(state, action) {
      state.settings.align = action.payload.align;
      state.settings.layout = action.payload.layout;
      state.settings.verticalAlign = action.payload.verticalAlign;
      state.settings.itemSorter = action.payload.itemSorter;
    },
    addLegendPayload(state, action) {
      state.payload.push(castDraft(action.payload));
    },
    removeLegendPayload(state, action) {
      var index = current(state).payload.indexOf(castDraft(action.payload));
      if (index > -1) {
        state.payload.splice(index, 1);
      }
    }
  }
});
var {
  setLegendSize,
  setLegendSettings,
  addLegendPayload,
  removeLegendPayload
} = legendSlice.actions;
var legendReducer = legendSlice.reducer;
function _extends$j() {
  return _extends$j = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$j.apply(null, arguments);
}
function ownKeys$t(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$t(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$t(Object(t2), true).forEach(function(r3) {
      _defineProperty$x(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$t(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$x(e3, r2, t2) {
  return (r2 = _toPropertyKey$x(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$x(t2) {
  var i = _toPrimitive$x(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$x(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function defaultFormatter(value) {
  return Array.isArray(value) && isNumOrStr(value[0]) && isNumOrStr(value[1]) ? value.join(" ~ ") : value;
}
var DefaultTooltipContent = (props) => {
  var {
    separator = " : ",
    contentStyle = {},
    itemStyle = {},
    labelStyle = {},
    payload,
    formatter,
    itemSorter,
    wrapperClassName,
    labelClassName,
    label,
    labelFormatter,
    accessibilityLayer = false
  } = props;
  var renderContent2 = () => {
    if (payload && payload.length) {
      var listStyle = {
        padding: 0,
        margin: 0
      };
      var items = (itemSorter ? sortBy$1(payload, itemSorter) : payload).map((entry, i) => {
        if (entry.type === "none") {
          return null;
        }
        var finalFormatter = entry.formatter || formatter || defaultFormatter;
        var {
          value,
          name
        } = entry;
        var finalValue = value;
        var finalName = name;
        if (finalFormatter) {
          var formatted = finalFormatter(value, name, entry, i, payload);
          if (Array.isArray(formatted)) {
            [finalValue, finalName] = formatted;
          } else if (formatted != null) {
            finalValue = formatted;
          } else {
            return null;
          }
        }
        var finalItemStyle = _objectSpread$t({
          display: "block",
          paddingTop: 4,
          paddingBottom: 4,
          color: entry.color || "#000"
        }, itemStyle);
        return (
          // eslint-disable-next-line react/no-array-index-key
          /* @__PURE__ */ reactExports.createElement("li", {
            className: "recharts-tooltip-item",
            key: "tooltip-item-".concat(i),
            style: finalItemStyle
          }, isNumOrStr(finalName) ? /* @__PURE__ */ reactExports.createElement("span", {
            className: "recharts-tooltip-item-name"
          }, finalName) : null, isNumOrStr(finalName) ? /* @__PURE__ */ reactExports.createElement("span", {
            className: "recharts-tooltip-item-separator"
          }, separator) : null, /* @__PURE__ */ reactExports.createElement("span", {
            className: "recharts-tooltip-item-value"
          }, finalValue), /* @__PURE__ */ reactExports.createElement("span", {
            className: "recharts-tooltip-item-unit"
          }, entry.unit || ""))
        );
      });
      return /* @__PURE__ */ reactExports.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: listStyle
      }, items);
    }
    return null;
  };
  var finalStyle = _objectSpread$t({
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  }, contentStyle);
  var finalLabelStyle = _objectSpread$t({
    margin: 0
  }, labelStyle);
  var hasLabel = !isNullish(label);
  var finalLabel = hasLabel ? label : "";
  var wrapperCN = clsx("recharts-default-tooltip", wrapperClassName);
  var labelCN = clsx("recharts-tooltip-label", labelClassName);
  if (hasLabel && labelFormatter && payload !== void 0 && payload !== null) {
    finalLabel = labelFormatter(label, payload);
  }
  var accessibilityAttributes = accessibilityLayer ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ reactExports.createElement("div", _extends$j({
    className: wrapperCN,
    style: finalStyle
  }, accessibilityAttributes), /* @__PURE__ */ reactExports.createElement("p", {
    className: labelCN,
    style: finalLabelStyle
  }, /* @__PURE__ */ reactExports.isValidElement(finalLabel) ? finalLabel : "".concat(finalLabel)), renderContent2());
};
var CSS_CLASS_PREFIX = "recharts-tooltip-wrapper";
var TOOLTIP_HIDDEN = {
  visibility: "hidden"
};
function getTooltipCSSClassName(_ref2) {
  var {
    coordinate,
    translateX,
    translateY
  } = _ref2;
  return clsx(CSS_CLASS_PREFIX, {
    ["".concat(CSS_CLASS_PREFIX, "-right")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX >= coordinate.x,
    ["".concat(CSS_CLASS_PREFIX, "-left")]: isNumber(translateX) && coordinate && isNumber(coordinate.x) && translateX < coordinate.x,
    ["".concat(CSS_CLASS_PREFIX, "-bottom")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY >= coordinate.y,
    ["".concat(CSS_CLASS_PREFIX, "-top")]: isNumber(translateY) && coordinate && isNumber(coordinate.y) && translateY < coordinate.y
  });
}
function getTooltipTranslateXY(_ref2) {
  var {
    allowEscapeViewBox,
    coordinate,
    key,
    offsetTopLeft,
    position,
    reverseDirection,
    tooltipDimension,
    viewBox,
    viewBoxDimension
  } = _ref2;
  if (position && isNumber(position[key])) {
    return position[key];
  }
  var negative = coordinate[key] - tooltipDimension - (offsetTopLeft > 0 ? offsetTopLeft : 0);
  var positive = coordinate[key] + offsetTopLeft;
  if (allowEscapeViewBox[key]) {
    return reverseDirection[key] ? negative : positive;
  }
  var viewBoxKey = viewBox[key];
  if (viewBoxKey == null) {
    return 0;
  }
  if (reverseDirection[key]) {
    var _tooltipBoundary = negative;
    var _viewBoxBoundary = viewBoxKey;
    if (_tooltipBoundary < _viewBoxBoundary) {
      return Math.max(positive, viewBoxKey);
    }
    return Math.max(negative, viewBoxKey);
  }
  if (viewBoxDimension == null) {
    return 0;
  }
  var tooltipBoundary = positive + tooltipDimension;
  var viewBoxBoundary = viewBoxKey + viewBoxDimension;
  if (tooltipBoundary > viewBoxBoundary) {
    return Math.max(negative, viewBoxKey);
  }
  return Math.max(positive, viewBoxKey);
}
function getTransformStyle(_ref3) {
  var {
    translateX,
    translateY,
    useTranslate3d
  } = _ref3;
  return {
    transform: useTranslate3d ? "translate3d(".concat(translateX, "px, ").concat(translateY, "px, 0)") : "translate(".concat(translateX, "px, ").concat(translateY, "px)")
  };
}
function getTooltipTranslate(_ref4) {
  var {
    allowEscapeViewBox,
    coordinate,
    offsetTopLeft,
    position,
    reverseDirection,
    tooltipBox,
    useTranslate3d,
    viewBox
  } = _ref4;
  var cssProperties, translateX, translateY;
  if (tooltipBox.height > 0 && tooltipBox.width > 0 && coordinate) {
    translateX = getTooltipTranslateXY({
      allowEscapeViewBox,
      coordinate,
      key: "x",
      offsetTopLeft,
      position,
      reverseDirection,
      tooltipDimension: tooltipBox.width,
      viewBox,
      viewBoxDimension: viewBox.width
    });
    translateY = getTooltipTranslateXY({
      allowEscapeViewBox,
      coordinate,
      key: "y",
      offsetTopLeft,
      position,
      reverseDirection,
      tooltipDimension: tooltipBox.height,
      viewBox,
      viewBoxDimension: viewBox.height
    });
    cssProperties = getTransformStyle({
      translateX,
      translateY,
      useTranslate3d
    });
  } else {
    cssProperties = TOOLTIP_HIDDEN;
  }
  return {
    cssProperties,
    cssClasses: getTooltipCSSClassName({
      translateX,
      translateY,
      coordinate
    })
  };
}
function ownKeys$s(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$s(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$s(Object(t2), true).forEach(function(r3) {
      _defineProperty$w(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$s(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$w(e3, r2, t2) {
  return (r2 = _toPropertyKey$w(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$w(t2) {
  var i = _toPrimitive$w(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$w(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
class TooltipBoundingBox extends reactExports.PureComponent {
  constructor() {
    super(...arguments);
    _defineProperty$w(this, "state", {
      dismissed: false,
      dismissedAtCoordinate: {
        x: 0,
        y: 0
      }
    });
    _defineProperty$w(this, "handleKeyDown", (event) => {
      if (event.key === "Escape") {
        var _this$props$coordinat, _this$props$coordinat2, _this$props$coordinat3, _this$props$coordinat4;
        this.setState({
          dismissed: true,
          dismissedAtCoordinate: {
            x: (_this$props$coordinat = (_this$props$coordinat2 = this.props.coordinate) === null || _this$props$coordinat2 === void 0 ? void 0 : _this$props$coordinat2.x) !== null && _this$props$coordinat !== void 0 ? _this$props$coordinat : 0,
            y: (_this$props$coordinat3 = (_this$props$coordinat4 = this.props.coordinate) === null || _this$props$coordinat4 === void 0 ? void 0 : _this$props$coordinat4.y) !== null && _this$props$coordinat3 !== void 0 ? _this$props$coordinat3 : 0
          }
        });
      }
    });
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }
  componentDidUpdate() {
    var _this$props$coordinat5, _this$props$coordinat6;
    if (!this.state.dismissed) {
      return;
    }
    if (((_this$props$coordinat5 = this.props.coordinate) === null || _this$props$coordinat5 === void 0 ? void 0 : _this$props$coordinat5.x) !== this.state.dismissedAtCoordinate.x || ((_this$props$coordinat6 = this.props.coordinate) === null || _this$props$coordinat6 === void 0 ? void 0 : _this$props$coordinat6.y) !== this.state.dismissedAtCoordinate.y) {
      this.state.dismissed = false;
    }
  }
  render() {
    var {
      active,
      allowEscapeViewBox,
      animationDuration,
      animationEasing,
      children,
      coordinate,
      hasPayload,
      isAnimationActive,
      offset,
      position,
      reverseDirection,
      useTranslate3d,
      viewBox,
      wrapperStyle,
      lastBoundingBox,
      innerRef,
      hasPortalFromProps
    } = this.props;
    var {
      cssClasses,
      cssProperties
    } = getTooltipTranslate({
      allowEscapeViewBox,
      coordinate,
      offsetTopLeft: offset,
      position,
      reverseDirection,
      tooltipBox: {
        height: lastBoundingBox.height,
        width: lastBoundingBox.width
      },
      useTranslate3d,
      viewBox
    });
    var positionStyles = hasPortalFromProps ? {} : _objectSpread$s(_objectSpread$s({
      transition: isAnimationActive && active ? "transform ".concat(animationDuration, "ms ").concat(animationEasing) : void 0
    }, cssProperties), {}, {
      pointerEvents: "none",
      visibility: !this.state.dismissed && active && hasPayload ? "visible" : "hidden",
      position: "absolute",
      top: 0,
      left: 0
    });
    var outerStyle = _objectSpread$s(_objectSpread$s({}, positionStyles), {}, {
      visibility: !this.state.dismissed && active && hasPayload ? "visible" : "hidden"
    }, wrapperStyle);
    return (
      // This element allow listening to the `Escape` key. See https://github.com/recharts/recharts/pull/2925
      /* @__PURE__ */ reactExports.createElement("div", {
        // @ts-expect-error typescript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
        xmlns: "http://www.w3.org/1999/xhtml",
        tabIndex: -1,
        className: cssClasses,
        style: outerStyle,
        ref: innerRef
      }, children)
    );
  }
}
var parseIsSsrByDefault = () => !(typeof window !== "undefined" && window.document && Boolean(window.document.createElement) && window.setTimeout);
var Global = {
  isSsr: parseIsSsrByDefault()
};
var useAccessibilityLayer = () => useAppSelector((state) => state.rootProps.accessibilityLayer);
function isWellBehavedNumber(n2) {
  return Number.isFinite(n2);
}
function isPositiveNumber(n2) {
  return typeof n2 === "number" && n2 > 0 && Number.isFinite(n2);
}
function _extends$i() {
  return _extends$i = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$i.apply(null, arguments);
}
function ownKeys$r(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$r(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$r(Object(t2), true).forEach(function(r3) {
      _defineProperty$v(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$r(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$v(e3, r2, t2) {
  return (r2 = _toPropertyKey$v(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$v(t2) {
  var i = _toPrimitive$v(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$v(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var CURVE_FACTORIES = {
  curveBasisClosed,
  curveBasisOpen,
  curveBasis,
  curveBumpX: bumpX,
  curveBumpY: bumpY,
  curveLinearClosed,
  curveLinear,
  curveMonotoneX: monotoneX,
  curveMonotoneY: monotoneY,
  curveNatural,
  curveStep,
  curveStepAfter: stepAfter,
  curveStepBefore: stepBefore
};
var defined = (p2) => isWellBehavedNumber(p2.x) && isWellBehavedNumber(p2.y);
var getX = (p2) => p2.x;
var getY = (p2) => p2.y;
var getCurveFactory = (type, layout) => {
  if (typeof type === "function") {
    return type;
  }
  var name = "curve".concat(upperFirst(type));
  if ((name === "curveMonotone" || name === "curveBump") && layout) {
    return CURVE_FACTORIES["".concat(name).concat(layout === "vertical" ? "Y" : "X")];
  }
  return CURVE_FACTORIES[name] || curveLinear;
};
var getPath$1 = (_ref2) => {
  var {
    type = "linear",
    points = [],
    baseLine,
    layout,
    connectNulls = false
  } = _ref2;
  var curveFactory = getCurveFactory(type, layout);
  var formatPoints = connectNulls ? points.filter(defined) : points;
  var lineFunction;
  if (Array.isArray(baseLine)) {
    var formatBaseLine = connectNulls ? baseLine.filter((base) => defined(base)) : baseLine;
    var areaPoints = formatPoints.map((entry, index) => _objectSpread$r(_objectSpread$r({}, entry), {}, {
      base: formatBaseLine[index]
    }));
    if (layout === "vertical") {
      lineFunction = shapeArea().y(getY).x1(getX).x0((d2) => d2.base.x);
    } else {
      lineFunction = shapeArea().x(getX).y1(getY).y0((d2) => d2.base.y);
    }
    lineFunction.defined(defined).curve(curveFactory);
    return lineFunction(areaPoints);
  }
  if (layout === "vertical" && isNumber(baseLine)) {
    lineFunction = shapeArea().y(getY).x1(getX).x0(baseLine);
  } else if (isNumber(baseLine)) {
    lineFunction = shapeArea().x(getX).y1(getY).y0(baseLine);
  } else {
    lineFunction = shapeLine().x(getX).y(getY);
  }
  lineFunction.defined(defined).curve(curveFactory);
  return lineFunction(formatPoints);
};
var Curve = (props) => {
  var {
    className,
    points,
    path,
    pathRef
  } = props;
  if ((!points || !points.length) && !path) {
    return null;
  }
  var realPath = points && points.length ? getPath$1(props) : path;
  return /* @__PURE__ */ reactExports.createElement("path", _extends$i({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
    className: clsx("recharts-curve", className),
    d: realPath === null ? void 0 : realPath,
    ref: pathRef
  }));
};
var _excluded$g = ["x", "y", "top", "left", "width", "height", "className"];
function _extends$h() {
  return _extends$h = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$h.apply(null, arguments);
}
function ownKeys$q(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$q(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$q(Object(t2), true).forEach(function(r3) {
      _defineProperty$u(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$q(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$u(e3, r2, t2) {
  return (r2 = _toPropertyKey$u(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$u(t2) {
  var i = _toPrimitive$u(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$u(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _objectWithoutProperties$g(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$g(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$g(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var getPath = (x2, y2, width, height, top, left) => {
  return "M".concat(x2, ",").concat(top, "v").concat(height, "M").concat(left, ",").concat(y2, "h").concat(width);
};
var Cross = (_ref2) => {
  var {
    x: x2 = 0,
    y: y2 = 0,
    top = 0,
    left = 0,
    width = 0,
    height = 0,
    className
  } = _ref2, rest = _objectWithoutProperties$g(_ref2, _excluded$g);
  var props = _objectSpread$q({
    x: x2,
    y: y2,
    top,
    left,
    width,
    height
  }, rest);
  if (!isNumber(x2) || !isNumber(y2) || !isNumber(width) || !isNumber(height) || !isNumber(top) || !isNumber(left)) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement("path", _extends$h({}, filterProps(props, true), {
    className: clsx("recharts-cross", className),
    d: getPath(x2, y2, width, height, top, left)
  }));
};
function getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize) {
  var halfSize = tooltipAxisBandSize / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: layout === "horizontal" ? activeCoordinate.x - halfSize : offset.left + 0.5,
    y: layout === "horizontal" ? offset.top + 0.5 : activeCoordinate.y - halfSize,
    width: layout === "horizontal" ? tooltipAxisBandSize : offset.width - 1,
    height: layout === "horizontal" ? offset.height - 1 : tooltipAxisBandSize
  };
}
function ownKeys$p(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$p(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$p(Object(t2), true).forEach(function(r3) {
      _defineProperty$t(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$p(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$t(e3, r2, t2) {
  return (r2 = _toPropertyKey$t(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$t(t2) {
  var i = _toPrimitive$t(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$t(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function resolveDefaultProps(realProps, defaultProps2) {
  var resolvedProps = _objectSpread$p({}, realProps);
  var dp = defaultProps2;
  var keys = Object.keys(defaultProps2);
  var withDefaults = keys.reduce((acc, key) => {
    if (acc[key] === void 0 && dp[key] !== void 0) {
      acc[key] = dp[key];
    }
    return acc;
  }, resolvedProps);
  return withDefaults;
}
function noop$2() {
}
function ownKeys$o(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$o(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$o(Object(t2), true).forEach(function(r3) {
      _defineProperty$s(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$o(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$s(e3, r2, t2) {
  return (r2 = _toPropertyKey$s(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$s(t2) {
  var i = _toPrimitive$s(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$s(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var getDashCase = (name) => name.replace(/([A-Z])/g, (v2) => "-".concat(v2.toLowerCase()));
var getTransitionVal = (props, duration, easing) => props.map((prop) => "".concat(getDashCase(prop), " ").concat(duration, "ms ").concat(easing)).join(",");
var getIntersectionKeys = (preObj, nextObj) => [Object.keys(preObj), Object.keys(nextObj)].reduce((a2, b2) => a2.filter((c2) => b2.includes(c2)));
var mapObject = (fn, obj) => Object.keys(obj).reduce((res, key) => _objectSpread$o(_objectSpread$o({}, res), {}, {
  [key]: fn(key, obj[key])
}), {});
function ownKeys$n(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$n(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$n(Object(t2), true).forEach(function(r3) {
      _defineProperty$r(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$n(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$r(e3, r2, t2) {
  return (r2 = _toPropertyKey$r(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$r(t2) {
  var i = _toPrimitive$r(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$r(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var alpha = (begin, end, k2) => begin + (end - begin) * k2;
var needContinue = (_ref2) => {
  var {
    from: from2,
    to: to2
  } = _ref2;
  return from2 !== to2;
};
var calStepperVals = (easing, preVals, steps) => {
  var nextStepVals = mapObject((key, val) => {
    if (needContinue(val)) {
      var [newX, newV] = easing(val.from, val.to, val.velocity);
      return _objectSpread$n(_objectSpread$n({}, val), {}, {
        from: newX,
        velocity: newV
      });
    }
    return val;
  }, preVals);
  if (steps < 1) {
    return mapObject((key, val) => {
      if (needContinue(val)) {
        return _objectSpread$n(_objectSpread$n({}, val), {}, {
          velocity: alpha(val.velocity, nextStepVals[key].velocity, steps),
          from: alpha(val.from, nextStepVals[key].from, steps)
        });
      }
      return val;
    }, preVals);
  }
  return calStepperVals(easing, nextStepVals, steps - 1);
};
function createStepperUpdate(from2, to2, easing, interKeys, render, timeoutController) {
  var preTime;
  var stepperStyle = interKeys.reduce((res, key) => _objectSpread$n(_objectSpread$n({}, res), {}, {
    [key]: {
      from: from2[key],
      velocity: 0,
      to: to2[key]
    }
  }), {});
  var getCurrStyle = () => mapObject((key, val) => val.from, stepperStyle);
  var shouldStopAnimation = () => !Object.values(stepperStyle).filter(needContinue).length;
  var stopAnimation = null;
  var stepperUpdate = (now) => {
    if (!preTime) {
      preTime = now;
    }
    var deltaTime = now - preTime;
    var steps = deltaTime / easing.dt;
    stepperStyle = calStepperVals(easing, stepperStyle, steps);
    render(_objectSpread$n(_objectSpread$n(_objectSpread$n({}, from2), to2), getCurrStyle()));
    preTime = now;
    if (!shouldStopAnimation()) {
      stopAnimation = timeoutController.setTimeout(stepperUpdate);
    }
  };
  return () => {
    stopAnimation = timeoutController.setTimeout(stepperUpdate);
    return () => {
      stopAnimation();
    };
  };
}
function createTimingUpdate(from2, to2, easing, duration, interKeys, render, timeoutController) {
  var stopAnimation = null;
  var timingStyle = interKeys.reduce((res, key) => _objectSpread$n(_objectSpread$n({}, res), {}, {
    [key]: [from2[key], to2[key]]
  }), {});
  var beginTime;
  var timingUpdate = (now) => {
    if (!beginTime) {
      beginTime = now;
    }
    var t2 = (now - beginTime) / duration;
    var currStyle = mapObject((key, val) => alpha(...val, easing(t2)), timingStyle);
    render(_objectSpread$n(_objectSpread$n(_objectSpread$n({}, from2), to2), currStyle));
    if (t2 < 1) {
      stopAnimation = timeoutController.setTimeout(timingUpdate);
    } else {
      var finalStyle = mapObject((key, val) => alpha(...val, easing(1)), timingStyle);
      render(_objectSpread$n(_objectSpread$n(_objectSpread$n({}, from2), to2), finalStyle));
    }
  };
  return () => {
    stopAnimation = timeoutController.setTimeout(timingUpdate);
    return () => {
      stopAnimation();
    };
  };
}
const configUpdate = (from2, to2, easing, duration, render, timeoutController) => {
  var interKeys = getIntersectionKeys(from2, to2);
  return easing.isStepper === true ? createStepperUpdate(from2, to2, easing, interKeys, render, timeoutController) : createTimingUpdate(from2, to2, easing, duration, interKeys, render, timeoutController);
};
var ACCURACY = 1e-4;
var cubicBezierFactor = (c1, c2) => [0, 3 * c1, 3 * c2 - 6 * c1, 3 * c1 - 3 * c2 + 1];
var evaluatePolynomial = (params, t2) => params.map((param, i) => param * t2 ** i).reduce((pre, curr) => pre + curr);
var cubicBezier = (c1, c2) => (t2) => {
  var params = cubicBezierFactor(c1, c2);
  return evaluatePolynomial(params, t2);
};
var derivativeCubicBezier = (c1, c2) => (t2) => {
  var params = cubicBezierFactor(c1, c2);
  var newParams = [...params.map((param, i) => param * i).slice(1), 0];
  return evaluatePolynomial(newParams, t2);
};
var configBezier = function configBezier2() {
  var x1, x2, y1, y2;
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  if (args.length === 1) {
    switch (args[0]) {
      case "linear":
        [x1, y1, x2, y2] = [0, 0, 1, 1];
        break;
      case "ease":
        [x1, y1, x2, y2] = [0.25, 0.1, 0.25, 1];
        break;
      case "ease-in":
        [x1, y1, x2, y2] = [0.42, 0, 1, 1];
        break;
      case "ease-out":
        [x1, y1, x2, y2] = [0.42, 0, 0.58, 1];
        break;
      case "ease-in-out":
        [x1, y1, x2, y2] = [0, 0, 0.58, 1];
        break;
      default: {
        var easing = args[0].split("(");
        if (easing[0] === "cubic-bezier" && easing[1].split(")")[0].split(",").length === 4) {
          [x1, y1, x2, y2] = easing[1].split(")")[0].split(",").map((x3) => parseFloat(x3));
        }
      }
    }
  } else if (args.length === 4) {
    [x1, y1, x2, y2] = args;
  }
  var curveX = cubicBezier(x1, x2);
  var curveY = cubicBezier(y1, y2);
  var derCurveX = derivativeCubicBezier(x1, x2);
  var rangeValue = (value) => {
    if (value > 1) {
      return 1;
    }
    if (value < 0) {
      return 0;
    }
    return value;
  };
  var bezier = (_t) => {
    var t2 = _t > 1 ? 1 : _t;
    var x3 = t2;
    for (var i = 0; i < 8; ++i) {
      var evalT = curveX(x3) - t2;
      var derVal = derCurveX(x3);
      if (Math.abs(evalT - t2) < ACCURACY || derVal < ACCURACY) {
        return curveY(x3);
      }
      x3 = rangeValue(x3 - evalT / derVal);
    }
    return curveY(x3);
  };
  bezier.isStepper = false;
  return bezier;
};
var configSpring = function configSpring2() {
  var config2 = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  var {
    stiff = 100,
    damping = 8,
    dt = 17
  } = config2;
  var stepper = (currX, destX, currV) => {
    var FSpring = -(currX - destX) * stiff;
    var FDamping = currV * damping;
    var newV = currV + (FSpring - FDamping) * dt / 1e3;
    var newX = currV * dt / 1e3 + currX;
    if (Math.abs(newX - destX) < ACCURACY && Math.abs(newV) < ACCURACY) {
      return [destX, 0];
    }
    return [newX, newV];
  };
  stepper.isStepper = true;
  stepper.dt = dt;
  return stepper;
};
var configEasing = (easing) => {
  if (typeof easing === "string") {
    switch (easing) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return configBezier(easing);
      case "spring":
        return configSpring();
      default:
        if (easing.split("(")[0] === "cubic-bezier") {
          return configBezier(easing);
        }
    }
  }
  if (typeof easing === "function") {
    return easing;
  }
  return null;
};
function createAnimateManager(timeoutController) {
  var currStyle;
  var handleChange = () => null;
  var shouldStop = false;
  var cancelTimeout = null;
  var setStyle = (_style) => {
    if (shouldStop) {
      return;
    }
    if (Array.isArray(_style)) {
      if (!_style.length) {
        return;
      }
      var styles = _style;
      var [curr, ...restStyles] = styles;
      if (typeof curr === "number") {
        cancelTimeout = timeoutController.setTimeout(setStyle.bind(null, restStyles), curr);
        return;
      }
      setStyle(curr);
      cancelTimeout = timeoutController.setTimeout(setStyle.bind(null, restStyles));
      return;
    }
    if (typeof _style === "string") {
      currStyle = _style;
      handleChange(currStyle);
    }
    if (typeof _style === "object") {
      currStyle = _style;
      handleChange(currStyle);
    }
    if (typeof _style === "function") {
      _style();
    }
  };
  return {
    stop: () => {
      shouldStop = true;
    },
    start: (style) => {
      shouldStop = false;
      if (cancelTimeout) {
        cancelTimeout();
        cancelTimeout = null;
      }
      setStyle(style);
    },
    subscribe: (_handleChange) => {
      handleChange = _handleChange;
      return () => {
        handleChange = () => null;
      };
    },
    getTimeoutController: () => timeoutController
  };
}
class RequestAnimationFrameTimeoutController {
  setTimeout(callback) {
    var delay = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var startTime = performance.now();
    var requestId = null;
    var executeCallback = (now) => {
      if (now - startTime >= delay) {
        callback(now);
      } else if (typeof requestAnimationFrame === "function") {
        requestId = requestAnimationFrame(executeCallback);
      }
    };
    requestId = requestAnimationFrame(executeCallback);
    return () => {
      cancelAnimationFrame(requestId);
    };
  }
}
function createDefaultAnimationManager() {
  return createAnimateManager(new RequestAnimationFrameTimeoutController());
}
var AnimationManagerContext = /* @__PURE__ */ reactExports.createContext(createDefaultAnimationManager);
function useAnimationManager(animationId, animationManagerFromProps) {
  var contextAnimationManager = reactExports.useContext(AnimationManagerContext);
  return reactExports.useMemo(() => animationManagerFromProps !== null && animationManagerFromProps !== void 0 ? animationManagerFromProps : contextAnimationManager(animationId), [animationId, animationManagerFromProps, contextAnimationManager]);
}
var defaultJavascriptAnimateProps = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: true,
  canBegin: true,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
};
var from = {
  t: 0
};
var to = {
  t: 1
};
function JavascriptAnimate(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultJavascriptAnimateProps);
  var {
    isActive,
    canBegin,
    duration,
    easing,
    begin,
    onAnimationEnd,
    onAnimationStart,
    children
  } = props;
  var animationManager = useAnimationManager(props.animationId, props.animationManager);
  var [style, setStyle] = reactExports.useState(isActive ? from : to);
  var stopJSAnimation = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!isActive) {
      setStyle(to);
    }
  }, [isActive]);
  reactExports.useEffect(() => {
    if (!isActive || !canBegin) {
      return noop$2;
    }
    var startAnimation = configUpdate(from, to, configEasing(easing), duration, setStyle, animationManager.getTimeoutController());
    var onAnimationActive = () => {
      stopJSAnimation.current = startAnimation();
    };
    animationManager.start([onAnimationStart, begin, onAnimationActive, duration, onAnimationEnd]);
    return () => {
      animationManager.stop();
      if (stopJSAnimation.current) {
        stopJSAnimation.current();
      }
      onAnimationEnd();
    };
  }, [isActive, canBegin, duration, easing, begin, onAnimationStart, onAnimationEnd, animationManager]);
  return children(style.t);
}
function useAnimationId(input) {
  var prefix2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-";
  var animationId = reactExports.useRef(uniqueId(prefix2));
  var prevProps = reactExports.useRef(input);
  if (prevProps.current !== input) {
    animationId.current = uniqueId(prefix2);
    prevProps.current = input;
  }
  return animationId.current;
}
function ownKeys$m(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$m(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$m(Object(t2), true).forEach(function(r3) {
      _defineProperty$q(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$m(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$q(e3, r2, t2) {
  return (r2 = _toPropertyKey$q(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$q(t2) {
  var i = _toPrimitive$q(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$q(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _extends$g() {
  return _extends$g = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$g.apply(null, arguments);
}
var getRectanglePath = (x2, y2, width, height, radius) => {
  var maxRadius = Math.min(Math.abs(width) / 2, Math.abs(height) / 2);
  var ySign = height >= 0 ? 1 : -1;
  var xSign = width >= 0 ? 1 : -1;
  var clockWise = height >= 0 && width >= 0 || height < 0 && width < 0 ? 1 : 0;
  var path;
  if (maxRadius > 0 && radius instanceof Array) {
    var newRadius = [0, 0, 0, 0];
    for (var i = 0, len = 4; i < len; i++) {
      newRadius[i] = radius[i] > maxRadius ? maxRadius : radius[i];
    }
    path = "M".concat(x2, ",").concat(y2 + ySign * newRadius[0]);
    if (newRadius[0] > 0) {
      path += "A ".concat(newRadius[0], ",").concat(newRadius[0], ",0,0,").concat(clockWise, ",").concat(x2 + xSign * newRadius[0], ",").concat(y2);
    }
    path += "L ".concat(x2 + width - xSign * newRadius[1], ",").concat(y2);
    if (newRadius[1] > 0) {
      path += "A ".concat(newRadius[1], ",").concat(newRadius[1], ",0,0,").concat(clockWise, ",\n        ").concat(x2 + width, ",").concat(y2 + ySign * newRadius[1]);
    }
    path += "L ".concat(x2 + width, ",").concat(y2 + height - ySign * newRadius[2]);
    if (newRadius[2] > 0) {
      path += "A ".concat(newRadius[2], ",").concat(newRadius[2], ",0,0,").concat(clockWise, ",\n        ").concat(x2 + width - xSign * newRadius[2], ",").concat(y2 + height);
    }
    path += "L ".concat(x2 + xSign * newRadius[3], ",").concat(y2 + height);
    if (newRadius[3] > 0) {
      path += "A ".concat(newRadius[3], ",").concat(newRadius[3], ",0,0,").concat(clockWise, ",\n        ").concat(x2, ",").concat(y2 + height - ySign * newRadius[3]);
    }
    path += "Z";
  } else if (maxRadius > 0 && radius === +radius && radius > 0) {
    var _newRadius = Math.min(maxRadius, radius);
    path = "M ".concat(x2, ",").concat(y2 + ySign * _newRadius, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x2 + xSign * _newRadius, ",").concat(y2, "\n            L ").concat(x2 + width - xSign * _newRadius, ",").concat(y2, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x2 + width, ",").concat(y2 + ySign * _newRadius, "\n            L ").concat(x2 + width, ",").concat(y2 + height - ySign * _newRadius, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x2 + width - xSign * _newRadius, ",").concat(y2 + height, "\n            L ").concat(x2 + xSign * _newRadius, ",").concat(y2 + height, "\n            A ").concat(_newRadius, ",").concat(_newRadius, ",0,0,").concat(clockWise, ",").concat(x2, ",").concat(y2 + height - ySign * _newRadius, " Z");
  } else {
    path = "M ".concat(x2, ",").concat(y2, " h ").concat(width, " v ").concat(height, " h ").concat(-width, " Z");
  }
  return path;
};
var defaultProps$4 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  // The radius of border
  // The radius of four corners when radius is a number
  // The radius of left-top, right-top, right-bottom, left-bottom when radius is an array
  radius: 0,
  isAnimationActive: false,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
};
var Rectangle = (rectangleProps) => {
  var props = resolveDefaultProps(rectangleProps, defaultProps$4);
  var pathRef = reactExports.useRef(null);
  var [totalLength, setTotalLength] = reactExports.useState(-1);
  reactExports.useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      try {
        var pathTotalLength = pathRef.current.getTotalLength();
        if (pathTotalLength) {
          setTotalLength(pathTotalLength);
        }
      } catch (_unused) {
      }
    }
  }, []);
  var {
    x: x2,
    y: y2,
    width,
    height,
    radius,
    className
  } = props;
  var {
    animationEasing,
    animationDuration,
    animationBegin,
    isAnimationActive,
    isUpdateAnimationActive
  } = props;
  var prevWidthRef = reactExports.useRef(width);
  var prevHeightRef = reactExports.useRef(height);
  var prevXRef = reactExports.useRef(x2);
  var prevYRef = reactExports.useRef(y2);
  var animationIdInput = reactExports.useMemo(() => ({
    x: x2,
    y: y2,
    width,
    height,
    radius
  }), [x2, y2, width, height, radius]);
  var animationId = useAnimationId(animationIdInput, "rectangle-");
  if (x2 !== +x2 || y2 !== +y2 || width !== +width || height !== +height || width === 0 || height === 0) {
    return null;
  }
  var layerClass = clsx("recharts-rectangle", className);
  if (!isUpdateAnimationActive) {
    return /* @__PURE__ */ reactExports.createElement("path", _extends$g({}, filterProps(props, true), {
      className: layerClass,
      d: getRectanglePath(x2, y2, width, height, radius)
    }));
  }
  var prevWidth = prevWidthRef.current;
  var prevHeight = prevHeightRef.current;
  var prevX = prevXRef.current;
  var prevY = prevYRef.current;
  var from2 = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
  var to2 = "".concat(totalLength, "px 0px");
  var transition = getTransitionVal(["strokeDasharray"], animationDuration, typeof animationEasing === "string" ? animationEasing : void 0);
  return /* @__PURE__ */ reactExports.createElement(JavascriptAnimate, {
    animationId,
    key: animationId,
    canBegin: totalLength > 0,
    duration: animationDuration,
    easing: animationEasing,
    isActive: isUpdateAnimationActive,
    begin: animationBegin
  }, (t2) => {
    var currWidth = interpolate$1(prevWidth, width, t2);
    var currHeight = interpolate$1(prevHeight, height, t2);
    var currX = interpolate$1(prevX, x2, t2);
    var currY = interpolate$1(prevY, y2, t2);
    if (pathRef.current) {
      prevWidthRef.current = currWidth;
      prevHeightRef.current = currHeight;
      prevXRef.current = currX;
      prevYRef.current = currY;
    }
    var animationStyle;
    if (!isAnimationActive) {
      animationStyle = {
        strokeDasharray: to2
      };
    } else if (t2 > 0) {
      animationStyle = {
        transition,
        strokeDasharray: to2
      };
    } else {
      animationStyle = {
        strokeDasharray: from2
      };
    }
    return /* @__PURE__ */ reactExports.createElement("path", _extends$g({}, filterProps(props, true), {
      className: layerClass,
      d: getRectanglePath(currX, currY, currWidth, currHeight, radius),
      ref: pathRef,
      style: _objectSpread$m(_objectSpread$m({}, animationStyle), props.style)
    }));
  });
};
function getRadialCursorPoints(activeCoordinate) {
  var {
    cx,
    cy,
    radius,
    startAngle,
    endAngle
  } = activeCoordinate;
  var startPoint = polarToCartesian(cx, cy, radius, startAngle);
  var endPoint = polarToCartesian(cx, cy, radius, endAngle);
  return {
    points: [startPoint, endPoint],
    cx,
    cy,
    radius,
    startAngle,
    endAngle
  };
}
function _extends$f() {
  return _extends$f = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$f.apply(null, arguments);
}
var getDeltaAngle$1 = (startAngle, endAngle) => {
  var sign2 = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 359.999);
  return sign2 * deltaAngle;
};
var getTangentCircle = (_ref2) => {
  var {
    cx,
    cy,
    radius,
    angle,
    sign: sign2,
    isExternal,
    cornerRadius,
    cornerIsExternal
  } = _ref2;
  var centerRadius = cornerRadius * (isExternal ? 1 : -1) + radius;
  var theta = Math.asin(cornerRadius / centerRadius) / RADIAN;
  var centerAngle = cornerIsExternal ? angle : angle + sign2 * theta;
  var center = polarToCartesian(cx, cy, centerRadius, centerAngle);
  var circleTangency = polarToCartesian(cx, cy, radius, centerAngle);
  var lineTangencyAngle = cornerIsExternal ? angle - sign2 * theta : angle;
  var lineTangency = polarToCartesian(cx, cy, centerRadius * Math.cos(theta * RADIAN), lineTangencyAngle);
  return {
    center,
    circleTangency,
    lineTangency,
    theta
  };
};
var getSectorPath = (_ref2) => {
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  } = _ref2;
  var angle = getDeltaAngle$1(startAngle, endAngle);
  var tempEndAngle = startAngle + angle;
  var outerStartPoint = polarToCartesian(cx, cy, outerRadius, startAngle);
  var outerEndPoint = polarToCartesian(cx, cy, outerRadius, tempEndAngle);
  var path = "M ".concat(outerStartPoint.x, ",").concat(outerStartPoint.y, "\n    A ").concat(outerRadius, ",").concat(outerRadius, ",0,\n    ").concat(+(Math.abs(angle) > 180), ",").concat(+(startAngle > tempEndAngle), ",\n    ").concat(outerEndPoint.x, ",").concat(outerEndPoint.y, "\n  ");
  if (innerRadius > 0) {
    var innerStartPoint = polarToCartesian(cx, cy, innerRadius, startAngle);
    var innerEndPoint = polarToCartesian(cx, cy, innerRadius, tempEndAngle);
    path += "L ".concat(innerEndPoint.x, ",").concat(innerEndPoint.y, "\n            A ").concat(innerRadius, ",").concat(innerRadius, ",0,\n            ").concat(+(Math.abs(angle) > 180), ",").concat(+(startAngle <= tempEndAngle), ",\n            ").concat(innerStartPoint.x, ",").concat(innerStartPoint.y, " Z");
  } else {
    path += "L ".concat(cx, ",").concat(cy, " Z");
  }
  return path;
};
var getSectorWithCorner = (_ref3) => {
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    cornerRadius,
    forceCornerRadius,
    cornerIsExternal,
    startAngle,
    endAngle
  } = _ref3;
  var sign2 = mathSign(endAngle - startAngle);
  var {
    circleTangency: soct,
    lineTangency: solt,
    theta: sot
  } = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: startAngle,
    sign: sign2,
    cornerRadius,
    cornerIsExternal
  });
  var {
    circleTangency: eoct,
    lineTangency: eolt,
    theta: eot
  } = getTangentCircle({
    cx,
    cy,
    radius: outerRadius,
    angle: endAngle,
    sign: -sign2,
    cornerRadius,
    cornerIsExternal
  });
  var outerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sot - eot;
  if (outerArcAngle < 0) {
    if (forceCornerRadius) {
      return "M ".concat(solt.x, ",").concat(solt.y, "\n        a").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,1,").concat(cornerRadius * 2, ",0\n        a").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,1,").concat(-cornerRadius * 2, ",0\n      ");
    }
    return getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    });
  }
  var path = "M ".concat(solt.x, ",").concat(solt.y, "\n    A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign2 < 0), ",").concat(soct.x, ",").concat(soct.y, "\n    A").concat(outerRadius, ",").concat(outerRadius, ",0,").concat(+(outerArcAngle > 180), ",").concat(+(sign2 < 0), ",").concat(eoct.x, ",").concat(eoct.y, "\n    A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign2 < 0), ",").concat(eolt.x, ",").concat(eolt.y, "\n  ");
  if (innerRadius > 0) {
    var {
      circleTangency: sict,
      lineTangency: silt,
      theta: sit
    } = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: startAngle,
      sign: sign2,
      isExternal: true,
      cornerRadius,
      cornerIsExternal
    });
    var {
      circleTangency: eict,
      lineTangency: eilt,
      theta: eit
    } = getTangentCircle({
      cx,
      cy,
      radius: innerRadius,
      angle: endAngle,
      sign: -sign2,
      isExternal: true,
      cornerRadius,
      cornerIsExternal
    });
    var innerArcAngle = cornerIsExternal ? Math.abs(startAngle - endAngle) : Math.abs(startAngle - endAngle) - sit - eit;
    if (innerArcAngle < 0 && cornerRadius === 0) {
      return "".concat(path, "L").concat(cx, ",").concat(cy, "Z");
    }
    path += "L".concat(eilt.x, ",").concat(eilt.y, "\n      A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign2 < 0), ",").concat(eict.x, ",").concat(eict.y, "\n      A").concat(innerRadius, ",").concat(innerRadius, ",0,").concat(+(innerArcAngle > 180), ",").concat(+(sign2 > 0), ",").concat(sict.x, ",").concat(sict.y, "\n      A").concat(cornerRadius, ",").concat(cornerRadius, ",0,0,").concat(+(sign2 < 0), ",").concat(silt.x, ",").concat(silt.y, "Z");
  } else {
    path += "L".concat(cx, ",").concat(cy, "Z");
  }
  return path;
};
var defaultProps$3 = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: false,
  cornerIsExternal: false
};
var Sector = (sectorProps) => {
  var props = resolveDefaultProps(sectorProps, defaultProps$3);
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    cornerRadius,
    forceCornerRadius,
    cornerIsExternal,
    startAngle,
    endAngle,
    className
  } = props;
  if (outerRadius < innerRadius || startAngle === endAngle) {
    return null;
  }
  var layerClass = clsx("recharts-sector", className);
  var deltaRadius = outerRadius - innerRadius;
  var cr = getPercentValue(cornerRadius, deltaRadius, 0, true);
  var path;
  if (cr > 0 && Math.abs(startAngle - endAngle) < 360) {
    path = getSectorWithCorner({
      cx,
      cy,
      innerRadius,
      outerRadius,
      cornerRadius: Math.min(cr, deltaRadius / 2),
      forceCornerRadius,
      cornerIsExternal,
      startAngle,
      endAngle
    });
  } else {
    path = getSectorPath({
      cx,
      cy,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle
    });
  }
  return /* @__PURE__ */ reactExports.createElement("path", _extends$f({}, filterProps(props, true), {
    className: layerClass,
    d: path
  }));
};
function getCursorPoints(layout, activeCoordinate, offset) {
  var x1, y1, x2, y2;
  if (layout === "horizontal") {
    x1 = activeCoordinate.x;
    x2 = x1;
    y1 = offset.top;
    y2 = offset.top + offset.height;
  } else if (layout === "vertical") {
    y1 = activeCoordinate.y;
    y2 = y1;
    x1 = offset.left;
    x2 = offset.left + offset.width;
  } else if (activeCoordinate.cx != null && activeCoordinate.cy != null) {
    if (layout === "centric") {
      var {
        cx,
        cy,
        innerRadius,
        outerRadius,
        angle
      } = activeCoordinate;
      var innerPoint = polarToCartesian(cx, cy, innerRadius, angle);
      var outerPoint = polarToCartesian(cx, cy, outerRadius, angle);
      x1 = innerPoint.x;
      y1 = innerPoint.y;
      x2 = outerPoint.x;
      y2 = outerPoint.y;
    } else {
      return getRadialCursorPoints(activeCoordinate);
    }
  }
  return [{
    x: x1,
    y: y1
  }, {
    x: x2,
    y: y2
  }];
}
var range$4 = {};
var toFinite = {};
var toNumber = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isSymbol$1 = isSymbol;
  function toNumber2(value) {
    if (isSymbol$1.isSymbol(value)) {
      return NaN;
    }
    return Number(value);
  }
  exports.toNumber = toNumber2;
})(toNumber);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const toNumber$1 = toNumber;
  function toFinite2(value) {
    if (!value) {
      return value === 0 ? value : 0;
    }
    value = toNumber$1.toNumber(value);
    if (value === Infinity || value === -Infinity) {
      const sign2 = value < 0 ? -1 : 1;
      return sign2 * Number.MAX_VALUE;
    }
    return value === value ? value : 0;
  }
  exports.toFinite = toFinite2;
})(toFinite);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const isIterateeCall$1 = isIterateeCall;
  const toFinite$1 = toFinite;
  function range2(start, end, step) {
    if (step && typeof step !== "number" && isIterateeCall$1.isIterateeCall(start, end, step)) {
      end = step = void 0;
    }
    start = toFinite$1.toFinite(start);
    if (end === void 0) {
      end = start;
      start = 0;
    } else {
      end = toFinite$1.toFinite(end);
    }
    step = step === void 0 ? start < end ? 1 : -1 : toFinite$1.toFinite(step);
    const length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
    const result = new Array(length);
    for (let index = 0; index < length; index++) {
      result[index] = start;
      start += step;
    }
    return result;
  }
  exports.range = range2;
})(range$4);
var range$2 = range$4.range;
const range$3 = /* @__PURE__ */ getDefaultExportFromCjs(range$2);
function ascending(a2, b2) {
  return a2 == null || b2 == null ? NaN : a2 < b2 ? -1 : a2 > b2 ? 1 : a2 >= b2 ? 0 : NaN;
}
function descending(a2, b2) {
  return a2 == null || b2 == null ? NaN : b2 < a2 ? -1 : b2 > a2 ? 1 : b2 >= a2 ? 0 : NaN;
}
function bisector(f2) {
  let compare1, compare2, delta;
  if (f2.length !== 2) {
    compare1 = ascending;
    compare2 = (d2, x2) => ascending(f2(d2), x2);
    delta = (d2, x2) => f2(d2) - x2;
  } else {
    compare1 = f2 === ascending || f2 === descending ? f2 : zero$1;
    compare2 = f2;
    delta = f2;
  }
  function left(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function right(a2, x2, lo = 0, hi = a2.length) {
    if (lo < hi) {
      if (compare1(x2, x2) !== 0) return hi;
      do {
        const mid = lo + hi >>> 1;
        if (compare2(a2[mid], x2) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }
  function center(a2, x2, lo = 0, hi = a2.length) {
    const i = left(a2, x2, lo, hi - 1);
    return i > lo && delta(a2[i - 1], x2) > -delta(a2[i], x2) ? i - 1 : i;
  }
  return { left, center, right };
}
function zero$1() {
  return 0;
}
function number$2(x2) {
  return x2 === null ? NaN : +x2;
}
function* numbers(values, valueof) {
  {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}
const ascendingBisect = bisector(ascending);
const bisectRight = ascendingBisect.right;
bisector(number$2).center;
class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: key } });
    if (entries != null) for (const [key2, value] of entries) this.set(key2, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}
function intern_get({ _intern, _key }, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}
function intern_set({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}
function intern_delete({ _intern, _key }, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}
function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}
function compareDefined(compare = ascending) {
  if (compare === ascending) return ascendingDefined;
  if (typeof compare !== "function") throw new TypeError("compare is not a function");
  return (a2, b2) => {
    const x2 = compare(a2, b2);
    if (x2 || x2 === 0) return x2;
    return (compare(b2, b2) === 0) - (compare(a2, a2) === 0);
  };
}
function ascendingDefined(a2, b2) {
  return (a2 == null || !(a2 >= a2)) - (b2 == null || !(b2 >= b2)) || (a2 < b2 ? -1 : a2 > b2 ? 1 : 0);
}
const e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count), power = Math.floor(Math.log10(step)), error = step / Math.pow(10, power), factor = error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}
function ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse2 = stop < start, [i1, i2, inc] = reverse2 ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n2 = i2 - i1 + 1, ticks2 = new Array(n2);
  if (reverse2) {
    if (inc < 0) for (let i = 0; i < n2; ++i) ticks2[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n2; ++i) ticks2[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n2; ++i) ticks2[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n2; ++i) ticks2[i] = (i1 + i) * inc;
  }
  return ticks2;
}
function tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}
function tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse2 = stop < start, inc = reverse2 ? tickIncrement(stop, start, count) : tickIncrement(start, stop, count);
  return (reverse2 ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}
function max(values, valueof) {
  let max2;
  {
    for (const value of values) {
      if (value != null && (max2 < value || max2 === void 0 && value >= value)) {
        max2 = value;
      }
    }
  }
  return max2;
}
function min(values, valueof) {
  let min2;
  {
    for (const value of values) {
      if (value != null && (min2 > value || min2 === void 0 && value >= value)) {
        min2 = value;
      }
    }
  }
  return min2;
}
function quickselect(array2, k2, left = 0, right = Infinity, compare) {
  k2 = Math.floor(k2);
  left = Math.floor(Math.max(0, left));
  right = Math.floor(Math.min(array2.length - 1, right));
  if (!(left <= k2 && k2 <= right)) return array2;
  compare = compare === void 0 ? ascendingDefined : compareDefined(compare);
  while (right > left) {
    if (right - left > 600) {
      const n2 = right - left + 1;
      const m2 = k2 - left + 1;
      const z2 = Math.log(n2);
      const s2 = 0.5 * Math.exp(2 * z2 / 3);
      const sd = 0.5 * Math.sqrt(z2 * s2 * (n2 - s2) / n2) * (m2 - n2 / 2 < 0 ? -1 : 1);
      const newLeft = Math.max(left, Math.floor(k2 - m2 * s2 / n2 + sd));
      const newRight = Math.min(right, Math.floor(k2 + (n2 - m2) * s2 / n2 + sd));
      quickselect(array2, k2, newLeft, newRight, compare);
    }
    const t2 = array2[k2];
    let i = left;
    let j = right;
    swap(array2, left, k2);
    if (compare(array2[right], t2) > 0) swap(array2, left, right);
    while (i < j) {
      swap(array2, i, j), ++i, --j;
      while (compare(array2[i], t2) < 0) ++i;
      while (compare(array2[j], t2) > 0) --j;
    }
    if (compare(array2[left], t2) === 0) swap(array2, left, j);
    else ++j, swap(array2, j, right);
    if (j <= k2) left = j + 1;
    if (k2 <= j) right = j - 1;
  }
  return array2;
}
function swap(array2, i, j) {
  const t2 = array2[i];
  array2[i] = array2[j];
  array2[j] = t2;
}
function quantile$1(values, p2, valueof) {
  values = Float64Array.from(numbers(values));
  if (!(n2 = values.length) || isNaN(p2 = +p2)) return;
  if (p2 <= 0 || n2 < 2) return min(values);
  if (p2 >= 1) return max(values);
  var n2, i = (n2 - 1) * p2, i0 = Math.floor(i), value0 = max(quickselect(values, i0).subarray(0, i0 + 1)), value1 = min(values.subarray(i0 + 1));
  return value0 + (value1 - value0) * (i - i0);
}
function quantileSorted(values, p2, valueof = number$2) {
  if (!(n2 = values.length) || isNaN(p2 = +p2)) return;
  if (p2 <= 0 || n2 < 2) return +valueof(values[0], 0, values);
  if (p2 >= 1) return +valueof(values[n2 - 1], n2 - 1, values);
  var n2, i = (n2 - 1) * p2, i0 = Math.floor(i), value0 = +valueof(values[i0], i0, values), value1 = +valueof(values[i0 + 1], i0 + 1, values);
  return value0 + (value1 - value0) * (i - i0);
}
function range$1(start, stop, step) {
  start = +start, stop = +stop, step = (n2 = arguments.length) < 2 ? (stop = start, start = 0, 1) : n2 < 3 ? 1 : +step;
  var i = -1, n2 = Math.max(0, Math.ceil((stop - start) / step)) | 0, range2 = new Array(n2);
  while (++i < n2) {
    range2[i] = start + i * step;
  }
  return range2;
}
function initRange(domain, range2) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(domain);
      break;
    default:
      this.range(range2).domain(domain);
      break;
  }
  return this;
}
function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}
const implicit = Symbol("implicit");
function ordinal() {
  var index = new InternMap(), domain = [], range2 = [], unknown = implicit;
  function scale(d2) {
    let i = index.get(d2);
    if (i === void 0) {
      if (unknown !== implicit) return unknown;
      index.set(d2, i = domain.push(d2) - 1);
    }
    return range2[i % range2.length];
  }
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), scale) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return ordinal(domain, range2).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return scale;
}
function band() {
  var scale = ordinal().unknown(void 0), domain = scale.domain, ordinalRange = scale.range, r0 = 0, r1 = 1, step, bandwidth, round2 = false, paddingInner = 0, paddingOuter = 0, align = 0.5;
  delete scale.unknown;
  function rescale() {
    var n2 = domain().length, reverse2 = r1 < r0, start = reverse2 ? r1 : r0, stop = reverse2 ? r0 : r1;
    step = (stop - start) / Math.max(1, n2 - paddingInner + paddingOuter * 2);
    if (round2) step = Math.floor(step);
    start += (stop - start - step * (n2 - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round2) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = range$1(n2).map(function(i) {
      return start + step * i;
    });
    return ordinalRange(reverse2 ? values.reverse() : values);
  }
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.range = function(_) {
    return arguments.length ? ([r0, r1] = _, r0 = +r0, r1 = +r1, rescale()) : [r0, r1];
  };
  scale.rangeRound = function(_) {
    return [r0, r1] = _, r0 = +r0, r1 = +r1, round2 = true, rescale();
  };
  scale.bandwidth = function() {
    return bandwidth;
  };
  scale.step = function() {
    return step;
  };
  scale.round = function(_) {
    return arguments.length ? (round2 = !!_, rescale()) : round2;
  };
  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };
  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };
  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };
  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };
  scale.copy = function() {
    return band(domain(), [r0, r1]).round(round2).paddingInner(paddingInner).paddingOuter(paddingOuter).align(align);
  };
  return initRange.apply(rescale(), arguments);
}
function pointish(scale) {
  var copy2 = scale.copy;
  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;
  scale.copy = function() {
    return pointish(copy2());
  };
  return scale;
}
function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}
function define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}
function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}
function Color() {
}
var darker = 0.7;
var brighter = 1 / darker;
var reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);
var named = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor(), this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});
function color_formatHex() {
  return this.rgb().formatHex();
}
function color_formatHex8() {
  return this.rgb().formatHex8();
}
function color_formatHsl() {
  return hslConvert(this).formatHsl();
}
function color_formatRgb() {
  return this.rgb().formatRgb();
}
function color(format2) {
  var m2, l2;
  format2 = (format2 + "").trim().toLowerCase();
  return (m2 = reHex.exec(format2)) ? (l2 = m2[1].length, m2 = parseInt(m2[1], 16), l2 === 6 ? rgbn(m2) : l2 === 3 ? new Rgb(m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, (m2 & 15) << 4 | m2 & 15, 1) : l2 === 8 ? rgba(m2 >> 24 & 255, m2 >> 16 & 255, m2 >> 8 & 255, (m2 & 255) / 255) : l2 === 4 ? rgba(m2 >> 12 & 15 | m2 >> 8 & 240, m2 >> 8 & 15 | m2 >> 4 & 240, m2 >> 4 & 15 | m2 & 240, ((m2 & 15) << 4 | m2 & 15) / 255) : null) : (m2 = reRgbInteger.exec(format2)) ? new Rgb(m2[1], m2[2], m2[3], 1) : (m2 = reRgbPercent.exec(format2)) ? new Rgb(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, 1) : (m2 = reRgbaInteger.exec(format2)) ? rgba(m2[1], m2[2], m2[3], m2[4]) : (m2 = reRgbaPercent.exec(format2)) ? rgba(m2[1] * 255 / 100, m2[2] * 255 / 100, m2[3] * 255 / 100, m2[4]) : (m2 = reHslPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, 1) : (m2 = reHslaPercent.exec(format2)) ? hsla(m2[1], m2[2] / 100, m2[3] / 100, m2[4]) : named.hasOwnProperty(format2) ? rgbn(named[format2]) : format2 === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
}
function rgbn(n2) {
  return new Rgb(n2 >> 16 & 255, n2 >> 8 & 255, n2 & 255, 1);
}
function rgba(r2, g2, b2, a2) {
  if (a2 <= 0) r2 = g2 = b2 = NaN;
  return new Rgb(r2, g2, b2, a2);
}
function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb();
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}
function rgb$1(r2, g2, b2, opacity) {
  return arguments.length === 1 ? rgbConvert(r2) : new Rgb(r2, g2, b2, opacity == null ? 1 : opacity);
}
function Rgb(r2, g2, b2, opacity) {
  this.r = +r2;
  this.g = +g2;
  this.b = +b2;
  this.opacity = +opacity;
}
define(Rgb, rgb$1, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Rgb(this.r * k2, this.g * k2, this.b * k2, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && (-0.5 <= this.g && this.g < 255.5) && (-0.5 <= this.b && this.b < 255.5) && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex,
  // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));
function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}
function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function rgb_formatRgb() {
  const a2 = clampa(this.opacity);
  return `${a2 === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a2 === 1 ? ")" : `, ${a2})`}`;
}
function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}
function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}
function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}
function hsla(h2, s2, l2, a2) {
  if (a2 <= 0) h2 = s2 = l2 = NaN;
  else if (l2 <= 0 || l2 >= 1) h2 = s2 = NaN;
  else if (s2 <= 0) h2 = NaN;
  return new Hsl(h2, s2, l2, a2);
}
function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl();
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r2 = o.r / 255, g2 = o.g / 255, b2 = o.b / 255, min2 = Math.min(r2, g2, b2), max2 = Math.max(r2, g2, b2), h2 = NaN, s2 = max2 - min2, l2 = (max2 + min2) / 2;
  if (s2) {
    if (r2 === max2) h2 = (g2 - b2) / s2 + (g2 < b2) * 6;
    else if (g2 === max2) h2 = (b2 - r2) / s2 + 2;
    else h2 = (r2 - g2) / s2 + 4;
    s2 /= l2 < 0.5 ? max2 + min2 : 2 - max2 - min2;
    h2 *= 60;
  } else {
    s2 = l2 > 0 && l2 < 1 ? 0 : h2;
  }
  return new Hsl(h2, s2, l2, o.opacity);
}
function hsl(h2, s2, l2, opacity) {
  return arguments.length === 1 ? hslConvert(h2) : new Hsl(h2, s2, l2, opacity == null ? 1 : opacity);
}
function Hsl(h2, s2, l2, opacity) {
  this.h = +h2;
  this.s = +s2;
  this.l = +l2;
  this.opacity = +opacity;
}
define(Hsl, hsl, extend(Color, {
  brighter(k2) {
    k2 = k2 == null ? brighter : Math.pow(brighter, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  darker(k2) {
    k2 = k2 == null ? darker : Math.pow(darker, k2);
    return new Hsl(this.h, this.s, this.l * k2, this.opacity);
  },
  rgb() {
    var h2 = this.h % 360 + (this.h < 0) * 360, s2 = isNaN(h2) || isNaN(this.s) ? 0 : this.s, l2 = this.l, m2 = l2 + (l2 < 0.5 ? l2 : 1 - l2) * s2, m1 = 2 * l2 - m2;
    return new Rgb(
      hsl2rgb(h2 >= 240 ? h2 - 240 : h2 + 120, m1, m2),
      hsl2rgb(h2, m1, m2),
      hsl2rgb(h2 < 120 ? h2 + 240 : h2 - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && (0 <= this.l && this.l <= 1) && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a2 = clampa(this.opacity);
    return `${a2 === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a2 === 1 ? ")" : `, ${a2})`}`;
  }
}));
function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}
function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}
function hsl2rgb(h2, m1, m2) {
  return (h2 < 60 ? m1 + (m2 - m1) * h2 / 60 : h2 < 180 ? m2 : h2 < 240 ? m1 + (m2 - m1) * (240 - h2) / 60 : m1) * 255;
}
const constant = (x2) => () => x2;
function linear$1(a2, d2) {
  return function(t2) {
    return a2 + t2 * d2;
  };
}
function exponential(a2, b2, y2) {
  return a2 = Math.pow(a2, y2), b2 = Math.pow(b2, y2) - a2, y2 = 1 / y2, function(t2) {
    return Math.pow(a2 + t2 * b2, y2);
  };
}
function gamma(y2) {
  return (y2 = +y2) === 1 ? nogamma : function(a2, b2) {
    return b2 - a2 ? exponential(a2, b2, y2) : constant(isNaN(a2) ? b2 : a2);
  };
}
function nogamma(a2, b2) {
  var d2 = b2 - a2;
  return d2 ? linear$1(a2, d2) : constant(isNaN(a2) ? b2 : a2);
}
const rgb = function rgbGamma(y2) {
  var color2 = gamma(y2);
  function rgb2(start, end) {
    var r2 = color2((start = rgb$1(start)).r, (end = rgb$1(end)).r), g2 = color2(start.g, end.g), b2 = color2(start.b, end.b), opacity = nogamma(start.opacity, end.opacity);
    return function(t2) {
      start.r = r2(t2);
      start.g = g2(t2);
      start.b = b2(t2);
      start.opacity = opacity(t2);
      return start + "";
    };
  }
  rgb2.gamma = rgbGamma;
  return rgb2;
}(1);
function numberArray(a2, b2) {
  if (!b2) b2 = [];
  var n2 = a2 ? Math.min(b2.length, a2.length) : 0, c2 = b2.slice(), i;
  return function(t2) {
    for (i = 0; i < n2; ++i) c2[i] = a2[i] * (1 - t2) + b2[i] * t2;
    return c2;
  };
}
function isNumberArray(x2) {
  return ArrayBuffer.isView(x2) && !(x2 instanceof DataView);
}
function genericArray(a2, b2) {
  var nb = b2 ? b2.length : 0, na = a2 ? Math.min(nb, a2.length) : 0, x2 = new Array(na), c2 = new Array(nb), i;
  for (i = 0; i < na; ++i) x2[i] = interpolate(a2[i], b2[i]);
  for (; i < nb; ++i) c2[i] = b2[i];
  return function(t2) {
    for (i = 0; i < na; ++i) c2[i] = x2[i](t2);
    return c2;
  };
}
function date$1(a2, b2) {
  var d2 = /* @__PURE__ */ new Date();
  return a2 = +a2, b2 = +b2, function(t2) {
    return d2.setTime(a2 * (1 - t2) + b2 * t2), d2;
  };
}
function interpolateNumber(a2, b2) {
  return a2 = +a2, b2 = +b2, function(t2) {
    return a2 * (1 - t2) + b2 * t2;
  };
}
function object(a2, b2) {
  var i = {}, c2 = {}, k2;
  if (a2 === null || typeof a2 !== "object") a2 = {};
  if (b2 === null || typeof b2 !== "object") b2 = {};
  for (k2 in b2) {
    if (k2 in a2) {
      i[k2] = interpolate(a2[k2], b2[k2]);
    } else {
      c2[k2] = b2[k2];
    }
  }
  return function(t2) {
    for (k2 in i) c2[k2] = i[k2](t2);
    return c2;
  };
}
var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
function zero(b2) {
  return function() {
    return b2;
  };
}
function one(b2) {
  return function(t2) {
    return b2(t2) + "";
  };
}
function string(a2, b2) {
  var bi = reA.lastIndex = reB.lastIndex = 0, am, bm, bs, i = -1, s2 = [], q2 = [];
  a2 = a2 + "", b2 = b2 + "";
  while ((am = reA.exec(a2)) && (bm = reB.exec(b2))) {
    if ((bs = bm.index) > bi) {
      bs = b2.slice(bi, bs);
      if (s2[i]) s2[i] += bs;
      else s2[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) {
      if (s2[i]) s2[i] += bm;
      else s2[++i] = bm;
    } else {
      s2[++i] = null;
      q2.push({ i, x: interpolateNumber(am, bm) });
    }
    bi = reB.lastIndex;
  }
  if (bi < b2.length) {
    bs = b2.slice(bi);
    if (s2[i]) s2[i] += bs;
    else s2[++i] = bs;
  }
  return s2.length < 2 ? q2[0] ? one(q2[0].x) : zero(b2) : (b2 = q2.length, function(t2) {
    for (var i2 = 0, o; i2 < b2; ++i2) s2[(o = q2[i2]).i] = o.x(t2);
    return s2.join("");
  });
}
function interpolate(a2, b2) {
  var t2 = typeof b2, c2;
  return b2 == null || t2 === "boolean" ? constant(b2) : (t2 === "number" ? interpolateNumber : t2 === "string" ? (c2 = color(b2)) ? (b2 = c2, rgb) : string : b2 instanceof color ? rgb : b2 instanceof Date ? date$1 : isNumberArray(b2) ? numberArray : Array.isArray(b2) ? genericArray : typeof b2.valueOf !== "function" && typeof b2.toString !== "function" || isNaN(b2) ? object : interpolateNumber)(a2, b2);
}
function interpolateRound(a2, b2) {
  return a2 = +a2, b2 = +b2, function(t2) {
    return Math.round(a2 * (1 - t2) + b2 * t2);
  };
}
function piecewise(interpolate$12, values) {
  if (values === void 0) values = interpolate$12, interpolate$12 = interpolate;
  var i = 0, n2 = values.length - 1, v2 = values[0], I = new Array(n2 < 0 ? 0 : n2);
  while (i < n2) I[i] = interpolate$12(v2, v2 = values[++i]);
  return function(t2) {
    var i2 = Math.max(0, Math.min(n2 - 1, Math.floor(t2 *= n2)));
    return I[i2](t2 - i2);
  };
}
function constants(x2) {
  return function() {
    return x2;
  };
}
function number$1(x2) {
  return +x2;
}
var unit = [0, 1];
function identity$3(x2) {
  return x2;
}
function normalize(a2, b2) {
  return (b2 -= a2 = +a2) ? function(x2) {
    return (x2 - a2) / b2;
  } : constants(isNaN(b2) ? NaN : 0.5);
}
function clamper(a2, b2) {
  var t2;
  if (a2 > b2) t2 = a2, a2 = b2, b2 = t2;
  return function(x2) {
    return Math.max(a2, Math.min(b2, x2));
  };
}
function bimap(domain, range2, interpolate2) {
  var d0 = domain[0], d1 = domain[1], r0 = range2[0], r1 = range2[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate2(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate2(r0, r1);
  return function(x2) {
    return r0(d0(x2));
  };
}
function polymap(domain, range2, interpolate2) {
  var j = Math.min(domain.length, range2.length) - 1, d2 = new Array(j), r2 = new Array(j), i = -1;
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range2 = range2.slice().reverse();
  }
  while (++i < j) {
    d2[i] = normalize(domain[i], domain[i + 1]);
    r2[i] = interpolate2(range2[i], range2[i + 1]);
  }
  return function(x2) {
    var i2 = bisectRight(domain, x2, 1, j) - 1;
    return r2[i2](d2[i2](x2));
  };
}
function copy$1(source, target) {
  return target.domain(source.domain()).range(source.range()).interpolate(source.interpolate()).clamp(source.clamp()).unknown(source.unknown());
}
function transformer$2() {
  var domain = unit, range2 = unit, interpolate$12 = interpolate, transform, untransform, unknown, clamp = identity$3, piecewise2, output, input;
  function rescale() {
    var n2 = Math.min(domain.length, range2.length);
    if (clamp !== identity$3) clamp = clamper(domain[0], domain[n2 - 1]);
    piecewise2 = n2 > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : (output || (output = piecewise2(domain.map(transform), range2, interpolate$12)))(transform(clamp(x2)));
  }
  scale.invert = function(y2) {
    return clamp(untransform((input || (input = piecewise2(range2, domain.map(transform), interpolateNumber)))(y2)));
  };
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), rescale()) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return range2 = Array.from(_), interpolate$12 = interpolateRound, rescale();
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : identity$3, rescale()) : clamp !== identity$3;
  };
  scale.interpolate = function(_) {
    return arguments.length ? (interpolate$12 = _, rescale()) : interpolate$12;
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t2, u) {
    transform = t2, untransform = u;
    return rescale();
  };
}
function continuous() {
  return transformer$2()(identity$3, identity$3);
}
function formatDecimal(x2) {
  return Math.abs(x2 = Math.round(x2)) >= 1e21 ? x2.toLocaleString("en").replace(/,/g, "") : x2.toString(10);
}
function formatDecimalParts(x2, p2) {
  if ((i = (x2 = p2 ? x2.toExponential(p2 - 1) : x2.toExponential()).indexOf("e")) < 0) return null;
  var i, coefficient = x2.slice(0, i);
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x2.slice(i + 1)
  ];
}
function exponent(x2) {
  return x2 = formatDecimalParts(Math.abs(x2)), x2 ? x2[1] : NaN;
}
function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length, t2 = [], j = 0, g2 = grouping[0], length = 0;
    while (i > 0 && g2 > 0) {
      if (length + g2 + 1 > width) g2 = Math.max(1, width - length);
      t2.push(value.substring(i -= g2, i + g2));
      if ((length += g2 + 1) > width) break;
      g2 = grouping[j = (j + 1) % grouping.length];
    }
    return t2.reverse().join(thousands);
  };
}
function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}
formatSpecifier.prototype = FormatSpecifier.prototype;
function FormatSpecifier(specifier) {
  this.fill = specifier.fill === void 0 ? " " : specifier.fill + "";
  this.align = specifier.align === void 0 ? ">" : specifier.align + "";
  this.sign = specifier.sign === void 0 ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === void 0 ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === void 0 ? void 0 : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === void 0 ? void 0 : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === void 0 ? "" : specifier.type + "";
}
FormatSpecifier.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function formatTrim(s2) {
  out: for (var n2 = s2.length, i = 1, i0 = -1, i1; i < n2; ++i) {
    switch (s2[i]) {
      case ".":
        i0 = i1 = i;
        break;
      case "0":
        if (i0 === 0) i0 = i;
        i1 = i;
        break;
      default:
        if (!+s2[i]) break out;
        if (i0 > 0) i0 = 0;
        break;
    }
  }
  return i0 > 0 ? s2.slice(0, i0) + s2.slice(i1 + 1) : s2;
}
var prefixExponent;
function formatPrefixAuto(x2, p2) {
  var d2 = formatDecimalParts(x2, p2);
  if (!d2) return x2 + "";
  var coefficient = d2[0], exponent2 = d2[1], i = exponent2 - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent2 / 3))) * 3) + 1, n2 = coefficient.length;
  return i === n2 ? coefficient : i > n2 ? coefficient + new Array(i - n2 + 1).join("0") : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i) : "0." + new Array(1 - i).join("0") + formatDecimalParts(x2, Math.max(0, p2 + i - 1))[0];
}
function formatRounded(x2, p2) {
  var d2 = formatDecimalParts(x2, p2);
  if (!d2) return x2 + "";
  var coefficient = d2[0], exponent2 = d2[1];
  return exponent2 < 0 ? "0." + new Array(-exponent2).join("0") + coefficient : coefficient.length > exponent2 + 1 ? coefficient.slice(0, exponent2 + 1) + "." + coefficient.slice(exponent2 + 1) : coefficient + new Array(exponent2 - coefficient.length + 2).join("0");
}
const formatTypes = {
  "%": (x2, p2) => (x2 * 100).toFixed(p2),
  "b": (x2) => Math.round(x2).toString(2),
  "c": (x2) => x2 + "",
  "d": formatDecimal,
  "e": (x2, p2) => x2.toExponential(p2),
  "f": (x2, p2) => x2.toFixed(p2),
  "g": (x2, p2) => x2.toPrecision(p2),
  "o": (x2) => Math.round(x2).toString(8),
  "p": (x2, p2) => formatRounded(x2 * 100, p2),
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": (x2) => Math.round(x2).toString(16).toUpperCase(),
  "x": (x2) => Math.round(x2).toString(16)
};
function identity$2(x2) {
  return x2;
}
var map$1 = Array.prototype.map, prefixes = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function formatLocale$1(locale2) {
  var group = locale2.grouping === void 0 || locale2.thousands === void 0 ? identity$2 : formatGroup(map$1.call(locale2.grouping, Number), locale2.thousands + ""), currencyPrefix = locale2.currency === void 0 ? "" : locale2.currency[0] + "", currencySuffix = locale2.currency === void 0 ? "" : locale2.currency[1] + "", decimal = locale2.decimal === void 0 ? "." : locale2.decimal + "", numerals = locale2.numerals === void 0 ? identity$2 : formatNumerals(map$1.call(locale2.numerals, String)), percent = locale2.percent === void 0 ? "%" : locale2.percent + "", minus = locale2.minus === void 0 ? "−" : locale2.minus + "", nan = locale2.nan === void 0 ? "NaN" : locale2.nan + "";
  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);
    var fill = specifier.fill, align = specifier.align, sign2 = specifier.sign, symbol = specifier.symbol, zero2 = specifier.zero, width = specifier.width, comma = specifier.comma, precision = specifier.precision, trim = specifier.trim, type = specifier.type;
    if (type === "n") comma = true, type = "g";
    else if (!formatTypes[type]) precision === void 0 && (precision = 12), trim = true, type = "g";
    if (zero2 || fill === "0" && align === "=") zero2 = true, fill = "0", align = "=";
    var prefix2 = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "", suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";
    var formatType = formatTypes[type], maybeSuffix = /[defgprs%]/.test(type);
    precision = precision === void 0 ? 6 : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision)) : Math.max(0, Math.min(20, precision));
    function format2(value) {
      var valuePrefix = prefix2, valueSuffix = suffix, i, n2, c2;
      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;
        var valueNegative = value < 0 || 1 / value < 0;
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);
        if (trim) value = formatTrim(value);
        if (valueNegative && +value === 0 && sign2 !== "+") valueNegative = false;
        valuePrefix = (valueNegative ? sign2 === "(" ? sign2 : minus : sign2 === "-" || sign2 === "(" ? "" : sign2) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign2 === "(" ? ")" : "");
        if (maybeSuffix) {
          i = -1, n2 = value.length;
          while (++i < n2) {
            if (c2 = value.charCodeAt(i), 48 > c2 || c2 > 57) {
              valueSuffix = (c2 === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }
      if (comma && !zero2) value = group(value, Infinity);
      var length = valuePrefix.length + value.length + valueSuffix.length, padding = length < width ? new Array(width - length + 1).join(fill) : "";
      if (comma && zero2) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";
      switch (align) {
        case "<":
          value = valuePrefix + value + valueSuffix + padding;
          break;
        case "=":
          value = valuePrefix + padding + value + valueSuffix;
          break;
        case "^":
          value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length);
          break;
        default:
          value = padding + valuePrefix + value + valueSuffix;
          break;
      }
      return numerals(value);
    }
    format2.toString = function() {
      return specifier + "";
    };
    return format2;
  }
  function formatPrefix2(specifier, value) {
    var f2 = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)), e3 = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3, k2 = Math.pow(10, -e3), prefix2 = prefixes[8 + e3 / 3];
    return function(value2) {
      return f2(k2 * value2) + prefix2;
    };
  }
  return {
    format: newFormat,
    formatPrefix: formatPrefix2
  };
}
var locale$1;
var format;
var formatPrefix;
defaultLocale$1({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function defaultLocale$1(definition) {
  locale$1 = formatLocale$1(definition);
  format = locale$1.format;
  formatPrefix = locale$1.formatPrefix;
  return locale$1;
}
function precisionFixed(step) {
  return Math.max(0, -exponent(Math.abs(step)));
}
function precisionPrefix(step, value) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3 - exponent(Math.abs(step)));
}
function precisionRound(step, max2) {
  step = Math.abs(step), max2 = Math.abs(max2) - step;
  return Math.max(0, exponent(max2) - exponent(step)) + 1;
}
function tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count), precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}
function linearish(scale) {
  var domain = scale.domain;
  scale.ticks = function(count) {
    var d2 = domain();
    return ticks(d2[0], d2[d2.length - 1], count == null ? 10 : count);
  };
  scale.tickFormat = function(count, specifier) {
    var d2 = domain();
    return tickFormat(d2[0], d2[d2.length - 1], count == null ? 10 : count, specifier);
  };
  scale.nice = function(count) {
    if (count == null) count = 10;
    var d2 = domain();
    var i0 = 0;
    var i1 = d2.length - 1;
    var start = d2[i0];
    var stop = d2[i1];
    var prestep;
    var step;
    var maxIter = 10;
    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }
    while (maxIter-- > 0) {
      step = tickIncrement(start, stop, count);
      if (step === prestep) {
        d2[i0] = start;
        d2[i1] = stop;
        return domain(d2);
      } else if (step > 0) {
        start = Math.floor(start / step) * step;
        stop = Math.ceil(stop / step) * step;
      } else if (step < 0) {
        start = Math.ceil(start * step) / step;
        stop = Math.floor(stop * step) / step;
      } else {
        break;
      }
      prestep = step;
    }
    return scale;
  };
  return scale;
}
function linear() {
  var scale = continuous();
  scale.copy = function() {
    return copy$1(scale, linear());
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}
function identity$1(domain) {
  var unknown;
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : x2;
  }
  scale.invert = scale;
  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = Array.from(_, number$1), scale) : domain.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return identity$1(domain).unknown(unknown);
  };
  domain = arguments.length ? Array.from(domain, number$1) : [0, 1];
  return linearish(scale);
}
function nice(domain, interval) {
  domain = domain.slice();
  var i0 = 0, i1 = domain.length - 1, x0 = domain[i0], x1 = domain[i1], t2;
  if (x1 < x0) {
    t2 = i0, i0 = i1, i1 = t2;
    t2 = x0, x0 = x1, x1 = t2;
  }
  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}
function transformLog(x2) {
  return Math.log(x2);
}
function transformExp(x2) {
  return Math.exp(x2);
}
function transformLogn(x2) {
  return -Math.log(-x2);
}
function transformExpn(x2) {
  return -Math.exp(-x2);
}
function pow10(x2) {
  return isFinite(x2) ? +("1e" + x2) : x2 < 0 ? 0 : x2;
}
function powp(base) {
  return base === 10 ? pow10 : base === Math.E ? Math.exp : (x2) => Math.pow(base, x2);
}
function logp(base) {
  return base === Math.E ? Math.log : base === 10 && Math.log10 || base === 2 && Math.log2 || (base = Math.log(base), (x2) => Math.log(x2) / base);
}
function reflect(f2) {
  return (x2, k2) => -f2(-x2, k2);
}
function loggish(transform) {
  const scale = transform(transformLog, transformExp);
  const domain = scale.domain;
  let base = 10;
  let logs;
  let pows;
  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }
  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };
  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };
  scale.ticks = (count) => {
    const d2 = domain();
    let u = d2[0];
    let v2 = d2[d2.length - 1];
    const r2 = v2 < u;
    if (r2) [u, v2] = [v2, u];
    let i = logs(u);
    let j = logs(v2);
    let k2;
    let t2;
    const n2 = count == null ? 10 : +count;
    let z2 = [];
    if (!(base % 1) && j - i < n2) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k2 = 1; k2 < base; ++k2) {
          t2 = i < 0 ? k2 / pows(-i) : k2 * pows(i);
          if (t2 < u) continue;
          if (t2 > v2) break;
          z2.push(t2);
        }
      }
      else for (; i <= j; ++i) {
        for (k2 = base - 1; k2 >= 1; --k2) {
          t2 = i > 0 ? k2 / pows(-i) : k2 * pows(i);
          if (t2 < u) continue;
          if (t2 > v2) break;
          z2.push(t2);
        }
      }
      if (z2.length * 2 < n2) z2 = ticks(u, v2, n2);
    } else {
      z2 = ticks(i, j, Math.min(j - i, n2)).map(pows);
    }
    return r2 ? z2.reverse() : z2;
  };
  scale.tickFormat = (count, specifier) => {
    if (count == null) count = 10;
    if (specifier == null) specifier = base === 10 ? "s" : ",";
    if (typeof specifier !== "function") {
      if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null) specifier.trim = true;
      specifier = format(specifier);
    }
    if (count === Infinity) return specifier;
    const k2 = Math.max(1, base * count / scale.ticks().length);
    return (d2) => {
      let i = d2 / pows(Math.round(logs(d2)));
      if (i * base < base - 0.5) i *= base;
      return i <= k2 ? specifier(d2) : "";
    };
  };
  scale.nice = () => {
    return domain(nice(domain(), {
      floor: (x2) => pows(Math.floor(logs(x2))),
      ceil: (x2) => pows(Math.ceil(logs(x2)))
    }));
  };
  return scale;
}
function log() {
  const scale = loggish(transformer$2()).domain([1, 10]);
  scale.copy = () => copy$1(scale, log()).base(scale.base());
  initRange.apply(scale, arguments);
  return scale;
}
function transformSymlog(c2) {
  return function(x2) {
    return Math.sign(x2) * Math.log1p(Math.abs(x2 / c2));
  };
}
function transformSymexp(c2) {
  return function(x2) {
    return Math.sign(x2) * Math.expm1(Math.abs(x2)) * c2;
  };
}
function symlogish(transform) {
  var c2 = 1, scale = transform(transformSymlog(c2), transformSymexp(c2));
  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c2 = +_), transformSymexp(c2)) : c2;
  };
  return linearish(scale);
}
function symlog() {
  var scale = symlogish(transformer$2());
  scale.copy = function() {
    return copy$1(scale, symlog()).constant(scale.constant());
  };
  return initRange.apply(scale, arguments);
}
function transformPow(exponent2) {
  return function(x2) {
    return x2 < 0 ? -Math.pow(-x2, exponent2) : Math.pow(x2, exponent2);
  };
}
function transformSqrt(x2) {
  return x2 < 0 ? -Math.sqrt(-x2) : Math.sqrt(x2);
}
function transformSquare(x2) {
  return x2 < 0 ? -x2 * x2 : x2 * x2;
}
function powish(transform) {
  var scale = transform(identity$3, identity$3), exponent2 = 1;
  function rescale() {
    return exponent2 === 1 ? transform(identity$3, identity$3) : exponent2 === 0.5 ? transform(transformSqrt, transformSquare) : transform(transformPow(exponent2), transformPow(1 / exponent2));
  }
  scale.exponent = function(_) {
    return arguments.length ? (exponent2 = +_, rescale()) : exponent2;
  };
  return linearish(scale);
}
function pow() {
  var scale = powish(transformer$2());
  scale.copy = function() {
    return copy$1(scale, pow()).exponent(scale.exponent());
  };
  initRange.apply(scale, arguments);
  return scale;
}
function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}
function square(x2) {
  return Math.sign(x2) * x2 * x2;
}
function unsquare(x2) {
  return Math.sign(x2) * Math.sqrt(Math.abs(x2));
}
function radial() {
  var squared = continuous(), range2 = [0, 1], round2 = false, unknown;
  function scale(x2) {
    var y2 = unsquare(squared(x2));
    return isNaN(y2) ? unknown : round2 ? Math.round(y2) : y2;
  }
  scale.invert = function(y2) {
    return squared.invert(square(y2));
  };
  scale.domain = function(_) {
    return arguments.length ? (squared.domain(_), scale) : squared.domain();
  };
  scale.range = function(_) {
    return arguments.length ? (squared.range((range2 = Array.from(_, number$1)).map(square)), scale) : range2.slice();
  };
  scale.rangeRound = function(_) {
    return scale.range(_).round(true);
  };
  scale.round = function(_) {
    return arguments.length ? (round2 = !!_, scale) : round2;
  };
  scale.clamp = function(_) {
    return arguments.length ? (squared.clamp(_), scale) : squared.clamp();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return radial(squared.domain(), range2).round(round2).clamp(squared.clamp()).unknown(unknown);
  };
  initRange.apply(scale, arguments);
  return linearish(scale);
}
function quantile() {
  var domain = [], range2 = [], thresholds = [], unknown;
  function rescale() {
    var i = 0, n2 = Math.max(1, range2.length);
    thresholds = new Array(n2 - 1);
    while (++i < n2) thresholds[i - 1] = quantileSorted(domain, i / n2);
    return scale;
  }
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : range2[bisectRight(thresholds, x2)];
  }
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d2 of _) if (d2 != null && !isNaN(d2 = +d2)) domain.push(d2);
    domain.sort(ascending);
    return rescale();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), rescale()) : range2.slice();
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.quantiles = function() {
    return thresholds.slice();
  };
  scale.copy = function() {
    return quantile().domain(domain).range(range2).unknown(unknown);
  };
  return initRange.apply(scale, arguments);
}
function quantize() {
  var x0 = 0, x1 = 1, n2 = 1, domain = [0.5], range2 = [0, 1], unknown;
  function scale(x2) {
    return x2 != null && x2 <= x2 ? range2[bisectRight(domain, x2, 0, n2)] : unknown;
  }
  function rescale() {
    var i = -1;
    domain = new Array(n2);
    while (++i < n2) domain[i] = ((i + 1) * x1 - (i - n2) * x0) / (n2 + 1);
    return scale;
  }
  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, x0 = +x0, x1 = +x1, rescale()) : [x0, x1];
  };
  scale.range = function(_) {
    return arguments.length ? (n2 = (range2 = Array.from(_)).length - 1, rescale()) : range2.slice();
  };
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return i < 0 ? [NaN, NaN] : i < 1 ? [x0, domain[0]] : i >= n2 ? [domain[n2 - 1], x1] : [domain[i - 1], domain[i]];
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };
  scale.thresholds = function() {
    return domain.slice();
  };
  scale.copy = function() {
    return quantize().domain([x0, x1]).range(range2).unknown(unknown);
  };
  return initRange.apply(linearish(scale), arguments);
}
function threshold() {
  var domain = [0.5], range2 = [0, 1], unknown, n2 = 1;
  function scale(x2) {
    return x2 != null && x2 <= x2 ? range2[bisectRight(domain, x2, 0, n2)] : unknown;
  }
  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_), n2 = Math.min(domain.length, range2.length - 1), scale) : domain.slice();
  };
  scale.range = function(_) {
    return arguments.length ? (range2 = Array.from(_), n2 = Math.min(domain.length, range2.length - 1), scale) : range2.slice();
  };
  scale.invertExtent = function(y2) {
    var i = range2.indexOf(y2);
    return [domain[i - 1], domain[i]];
  };
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  scale.copy = function() {
    return threshold().domain(domain).range(range2).unknown(unknown);
  };
  return initRange.apply(scale, arguments);
}
const t0 = /* @__PURE__ */ new Date(), t1 = /* @__PURE__ */ new Date();
function timeInterval(floori, offseti, count, field) {
  function interval(date2) {
    return floori(date2 = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+date2)), date2;
  }
  interval.floor = (date2) => {
    return floori(date2 = /* @__PURE__ */ new Date(+date2)), date2;
  };
  interval.ceil = (date2) => {
    return floori(date2 = new Date(date2 - 1)), offseti(date2, 1), floori(date2), date2;
  };
  interval.round = (date2) => {
    const d0 = interval(date2), d1 = interval.ceil(date2);
    return date2 - d0 < d1 - date2 ? d0 : d1;
  };
  interval.offset = (date2, step) => {
    return offseti(date2 = /* @__PURE__ */ new Date(+date2), step == null ? 1 : Math.floor(step)), date2;
  };
  interval.range = (start, stop, step) => {
    const range2 = [];
    start = interval.ceil(start);
    step = step == null ? 1 : Math.floor(step);
    if (!(start < stop) || !(step > 0)) return range2;
    let previous;
    do
      range2.push(previous = /* @__PURE__ */ new Date(+start)), offseti(start, step), floori(start);
    while (previous < start && start < stop);
    return range2;
  };
  interval.filter = (test) => {
    return timeInterval((date2) => {
      if (date2 >= date2) while (floori(date2), !test(date2)) date2.setTime(date2 - 1);
    }, (date2, step) => {
      if (date2 >= date2) {
        if (step < 0) while (++step <= 0) {
          while (offseti(date2, -1), !test(date2)) {
          }
        }
        else while (--step >= 0) {
          while (offseti(date2, 1), !test(date2)) {
          }
        }
      }
    });
  };
  if (count) {
    interval.count = (start, end) => {
      t0.setTime(+start), t1.setTime(+end);
      floori(t0), floori(t1);
      return Math.floor(count(t0, t1));
    };
    interval.every = (step) => {
      step = Math.floor(step);
      return !isFinite(step) || !(step > 0) ? null : !(step > 1) ? interval : interval.filter(field ? (d2) => field(d2) % step === 0 : (d2) => interval.count(0, d2) % step === 0);
    };
  }
  return interval;
}
const millisecond = timeInterval(() => {
}, (date2, step) => {
  date2.setTime(+date2 + step);
}, (start, end) => {
  return end - start;
});
millisecond.every = (k2) => {
  k2 = Math.floor(k2);
  if (!isFinite(k2) || !(k2 > 0)) return null;
  if (!(k2 > 1)) return millisecond;
  return timeInterval((date2) => {
    date2.setTime(Math.floor(date2 / k2) * k2);
  }, (date2, step) => {
    date2.setTime(+date2 + step * k2);
  }, (start, end) => {
    return (end - start) / k2;
  });
};
millisecond.range;
const durationSecond = 1e3;
const durationMinute = durationSecond * 60;
const durationHour = durationMinute * 60;
const durationDay = durationHour * 24;
const durationWeek = durationDay * 7;
const durationMonth = durationDay * 30;
const durationYear = durationDay * 365;
const second = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds());
}, (date2, step) => {
  date2.setTime(+date2 + step * durationSecond);
}, (start, end) => {
  return (end - start) / durationSecond;
}, (date2) => {
  return date2.getUTCSeconds();
});
second.range;
const timeMinute = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date2) => {
  return date2.getMinutes();
});
timeMinute.range;
const utcMinute = timeInterval((date2) => {
  date2.setUTCSeconds(0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationMinute);
}, (start, end) => {
  return (end - start) / durationMinute;
}, (date2) => {
  return date2.getUTCMinutes();
});
utcMinute.range;
const timeHour = timeInterval((date2) => {
  date2.setTime(date2 - date2.getMilliseconds() - date2.getSeconds() * durationSecond - date2.getMinutes() * durationMinute);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date2) => {
  return date2.getHours();
});
timeHour.range;
const utcHour = timeInterval((date2) => {
  date2.setUTCMinutes(0, 0, 0);
}, (date2, step) => {
  date2.setTime(+date2 + step * durationHour);
}, (start, end) => {
  return (end - start) / durationHour;
}, (date2) => {
  return date2.getUTCHours();
});
utcHour.range;
const timeDay = timeInterval(
  (date2) => date2.setHours(0, 0, 0, 0),
  (date2, step) => date2.setDate(date2.getDate() + step),
  (start, end) => (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationDay,
  (date2) => date2.getDate() - 1
);
timeDay.range;
const utcDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date2) => {
  return date2.getUTCDate() - 1;
});
utcDay.range;
const unixDay = timeInterval((date2) => {
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCDate(date2.getUTCDate() + step);
}, (start, end) => {
  return (end - start) / durationDay;
}, (date2) => {
  return Math.floor(date2 / durationDay);
});
unixDay.range;
function timeWeekday(i) {
  return timeInterval((date2) => {
    date2.setDate(date2.getDate() - (date2.getDay() + 7 - i) % 7);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setDate(date2.getDate() + step * 7);
  }, (start, end) => {
    return (end - start - (end.getTimezoneOffset() - start.getTimezoneOffset()) * durationMinute) / durationWeek;
  });
}
const timeSunday = timeWeekday(0);
const timeMonday = timeWeekday(1);
const timeTuesday = timeWeekday(2);
const timeWednesday = timeWeekday(3);
const timeThursday = timeWeekday(4);
const timeFriday = timeWeekday(5);
const timeSaturday = timeWeekday(6);
timeSunday.range;
timeMonday.range;
timeTuesday.range;
timeWednesday.range;
timeThursday.range;
timeFriday.range;
timeSaturday.range;
function utcWeekday(i) {
  return timeInterval((date2) => {
    date2.setUTCDate(date2.getUTCDate() - (date2.getUTCDay() + 7 - i) % 7);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCDate(date2.getUTCDate() + step * 7);
  }, (start, end) => {
    return (end - start) / durationWeek;
  });
}
const utcSunday = utcWeekday(0);
const utcMonday = utcWeekday(1);
const utcTuesday = utcWeekday(2);
const utcWednesday = utcWeekday(3);
const utcThursday = utcWeekday(4);
const utcFriday = utcWeekday(5);
const utcSaturday = utcWeekday(6);
utcSunday.range;
utcMonday.range;
utcTuesday.range;
utcWednesday.range;
utcThursday.range;
utcFriday.range;
utcSaturday.range;
const timeMonth = timeInterval((date2) => {
  date2.setDate(1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setMonth(date2.getMonth() + step);
}, (start, end) => {
  return end.getMonth() - start.getMonth() + (end.getFullYear() - start.getFullYear()) * 12;
}, (date2) => {
  return date2.getMonth();
});
timeMonth.range;
const utcMonth = timeInterval((date2) => {
  date2.setUTCDate(1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCMonth(date2.getUTCMonth() + step);
}, (start, end) => {
  return end.getUTCMonth() - start.getUTCMonth() + (end.getUTCFullYear() - start.getUTCFullYear()) * 12;
}, (date2) => {
  return date2.getUTCMonth();
});
utcMonth.range;
const timeYear = timeInterval((date2) => {
  date2.setMonth(0, 1);
  date2.setHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setFullYear(date2.getFullYear() + step);
}, (start, end) => {
  return end.getFullYear() - start.getFullYear();
}, (date2) => {
  return date2.getFullYear();
});
timeYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setFullYear(Math.floor(date2.getFullYear() / k2) * k2);
    date2.setMonth(0, 1);
    date2.setHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setFullYear(date2.getFullYear() + step * k2);
  });
};
timeYear.range;
const utcYear = timeInterval((date2) => {
  date2.setUTCMonth(0, 1);
  date2.setUTCHours(0, 0, 0, 0);
}, (date2, step) => {
  date2.setUTCFullYear(date2.getUTCFullYear() + step);
}, (start, end) => {
  return end.getUTCFullYear() - start.getUTCFullYear();
}, (date2) => {
  return date2.getUTCFullYear();
});
utcYear.every = (k2) => {
  return !isFinite(k2 = Math.floor(k2)) || !(k2 > 0) ? null : timeInterval((date2) => {
    date2.setUTCFullYear(Math.floor(date2.getUTCFullYear() / k2) * k2);
    date2.setUTCMonth(0, 1);
    date2.setUTCHours(0, 0, 0, 0);
  }, (date2, step) => {
    date2.setUTCFullYear(date2.getUTCFullYear() + step * k2);
  });
};
utcYear.range;
function ticker(year, month, week, day, hour, minute) {
  const tickIntervals = [
    [second, 1, durationSecond],
    [second, 5, 5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute, 1, durationMinute],
    [minute, 5, 5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [hour, 1, durationHour],
    [hour, 3, 3 * durationHour],
    [hour, 6, 6 * durationHour],
    [hour, 12, 12 * durationHour],
    [day, 1, durationDay],
    [day, 2, 2 * durationDay],
    [week, 1, durationWeek],
    [month, 1, durationMonth],
    [month, 3, 3 * durationMonth],
    [year, 1, durationYear]
  ];
  function ticks2(start, stop, count) {
    const reverse2 = stop < start;
    if (reverse2) [start, stop] = [stop, start];
    const interval = count && typeof count.range === "function" ? count : tickInterval(start, stop, count);
    const ticks3 = interval ? interval.range(start, +stop + 1) : [];
    return reverse2 ? ticks3.reverse() : ticks3;
  }
  function tickInterval(start, stop, count) {
    const target = Math.abs(stop - start) / count;
    const i = bisector(([, , step2]) => step2).right(tickIntervals, target);
    if (i === tickIntervals.length) return year.every(tickStep(start / durationYear, stop / durationYear, count));
    if (i === 0) return millisecond.every(Math.max(tickStep(start, stop, count), 1));
    const [t2, step] = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
    return t2.every(step);
  }
  return [ticks2, tickInterval];
}
const [utcTicks, utcTickInterval] = ticker(utcYear, utcMonth, utcSunday, unixDay, utcHour, utcMinute);
const [timeTicks, timeTickInterval] = ticker(timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute);
function localDate(d2) {
  if (0 <= d2.y && d2.y < 100) {
    var date2 = new Date(-1, d2.m, d2.d, d2.H, d2.M, d2.S, d2.L);
    date2.setFullYear(d2.y);
    return date2;
  }
  return new Date(d2.y, d2.m, d2.d, d2.H, d2.M, d2.S, d2.L);
}
function utcDate(d2) {
  if (0 <= d2.y && d2.y < 100) {
    var date2 = new Date(Date.UTC(-1, d2.m, d2.d, d2.H, d2.M, d2.S, d2.L));
    date2.setUTCFullYear(d2.y);
    return date2;
  }
  return new Date(Date.UTC(d2.y, d2.m, d2.d, d2.H, d2.M, d2.S, d2.L));
}
function newDate(y2, m2, d2) {
  return { y: y2, m: m2, d: d2, H: 0, M: 0, S: 0, L: 0 };
}
function formatLocale(locale2) {
  var locale_dateTime = locale2.dateTime, locale_date = locale2.date, locale_time = locale2.time, locale_periods = locale2.periods, locale_weekdays = locale2.days, locale_shortWeekdays = locale2.shortDays, locale_months = locale2.months, locale_shortMonths = locale2.shortMonths;
  var periodRe = formatRe(locale_periods), periodLookup = formatLookup(locale_periods), weekdayRe = formatRe(locale_weekdays), weekdayLookup = formatLookup(locale_weekdays), shortWeekdayRe = formatRe(locale_shortWeekdays), shortWeekdayLookup = formatLookup(locale_shortWeekdays), monthRe = formatRe(locale_months), monthLookup = formatLookup(locale_months), shortMonthRe = formatRe(locale_shortMonths), shortMonthLookup = formatLookup(locale_shortMonths);
  var formats = {
    "a": formatShortWeekday,
    "A": formatWeekday,
    "b": formatShortMonth,
    "B": formatMonth,
    "c": null,
    "d": formatDayOfMonth,
    "e": formatDayOfMonth,
    "f": formatMicroseconds,
    "g": formatYearISO,
    "G": formatFullYearISO,
    "H": formatHour24,
    "I": formatHour12,
    "j": formatDayOfYear,
    "L": formatMilliseconds,
    "m": formatMonthNumber,
    "M": formatMinutes,
    "p": formatPeriod,
    "q": formatQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatSeconds,
    "u": formatWeekdayNumberMonday,
    "U": formatWeekNumberSunday,
    "V": formatWeekNumberISO,
    "w": formatWeekdayNumberSunday,
    "W": formatWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatYear,
    "Y": formatFullYear,
    "Z": formatZone,
    "%": formatLiteralPercent
  };
  var utcFormats = {
    "a": formatUTCShortWeekday,
    "A": formatUTCWeekday,
    "b": formatUTCShortMonth,
    "B": formatUTCMonth,
    "c": null,
    "d": formatUTCDayOfMonth,
    "e": formatUTCDayOfMonth,
    "f": formatUTCMicroseconds,
    "g": formatUTCYearISO,
    "G": formatUTCFullYearISO,
    "H": formatUTCHour24,
    "I": formatUTCHour12,
    "j": formatUTCDayOfYear,
    "L": formatUTCMilliseconds,
    "m": formatUTCMonthNumber,
    "M": formatUTCMinutes,
    "p": formatUTCPeriod,
    "q": formatUTCQuarter,
    "Q": formatUnixTimestamp,
    "s": formatUnixTimestampSeconds,
    "S": formatUTCSeconds,
    "u": formatUTCWeekdayNumberMonday,
    "U": formatUTCWeekNumberSunday,
    "V": formatUTCWeekNumberISO,
    "w": formatUTCWeekdayNumberSunday,
    "W": formatUTCWeekNumberMonday,
    "x": null,
    "X": null,
    "y": formatUTCYear,
    "Y": formatUTCFullYear,
    "Z": formatUTCZone,
    "%": formatLiteralPercent
  };
  var parses = {
    "a": parseShortWeekday,
    "A": parseWeekday,
    "b": parseShortMonth,
    "B": parseMonth,
    "c": parseLocaleDateTime,
    "d": parseDayOfMonth,
    "e": parseDayOfMonth,
    "f": parseMicroseconds,
    "g": parseYear,
    "G": parseFullYear,
    "H": parseHour24,
    "I": parseHour24,
    "j": parseDayOfYear,
    "L": parseMilliseconds,
    "m": parseMonthNumber,
    "M": parseMinutes,
    "p": parsePeriod,
    "q": parseQuarter,
    "Q": parseUnixTimestamp,
    "s": parseUnixTimestampSeconds,
    "S": parseSeconds,
    "u": parseWeekdayNumberMonday,
    "U": parseWeekNumberSunday,
    "V": parseWeekNumberISO,
    "w": parseWeekdayNumberSunday,
    "W": parseWeekNumberMonday,
    "x": parseLocaleDate,
    "X": parseLocaleTime,
    "y": parseYear,
    "Y": parseFullYear,
    "Z": parseZone,
    "%": parseLiteralPercent
  };
  formats.x = newFormat(locale_date, formats);
  formats.X = newFormat(locale_time, formats);
  formats.c = newFormat(locale_dateTime, formats);
  utcFormats.x = newFormat(locale_date, utcFormats);
  utcFormats.X = newFormat(locale_time, utcFormats);
  utcFormats.c = newFormat(locale_dateTime, utcFormats);
  function newFormat(specifier, formats2) {
    return function(date2) {
      var string2 = [], i = -1, j = 0, n2 = specifier.length, c2, pad2, format2;
      if (!(date2 instanceof Date)) date2 = /* @__PURE__ */ new Date(+date2);
      while (++i < n2) {
        if (specifier.charCodeAt(i) === 37) {
          string2.push(specifier.slice(j, i));
          if ((pad2 = pads[c2 = specifier.charAt(++i)]) != null) c2 = specifier.charAt(++i);
          else pad2 = c2 === "e" ? " " : "0";
          if (format2 = formats2[c2]) c2 = format2(date2, pad2);
          string2.push(c2);
          j = i + 1;
        }
      }
      string2.push(specifier.slice(j, i));
      return string2.join("");
    };
  }
  function newParse(specifier, Z) {
    return function(string2) {
      var d2 = newDate(1900, void 0, 1), i = parseSpecifier(d2, specifier, string2 += "", 0), week, day;
      if (i != string2.length) return null;
      if ("Q" in d2) return new Date(d2.Q);
      if ("s" in d2) return new Date(d2.s * 1e3 + ("L" in d2 ? d2.L : 0));
      if (Z && !("Z" in d2)) d2.Z = 0;
      if ("p" in d2) d2.H = d2.H % 12 + d2.p * 12;
      if (d2.m === void 0) d2.m = "q" in d2 ? d2.q : 0;
      if ("V" in d2) {
        if (d2.V < 1 || d2.V > 53) return null;
        if (!("w" in d2)) d2.w = 1;
        if ("Z" in d2) {
          week = utcDate(newDate(d2.y, 0, 1)), day = week.getUTCDay();
          week = day > 4 || day === 0 ? utcMonday.ceil(week) : utcMonday(week);
          week = utcDay.offset(week, (d2.V - 1) * 7);
          d2.y = week.getUTCFullYear();
          d2.m = week.getUTCMonth();
          d2.d = week.getUTCDate() + (d2.w + 6) % 7;
        } else {
          week = localDate(newDate(d2.y, 0, 1)), day = week.getDay();
          week = day > 4 || day === 0 ? timeMonday.ceil(week) : timeMonday(week);
          week = timeDay.offset(week, (d2.V - 1) * 7);
          d2.y = week.getFullYear();
          d2.m = week.getMonth();
          d2.d = week.getDate() + (d2.w + 6) % 7;
        }
      } else if ("W" in d2 || "U" in d2) {
        if (!("w" in d2)) d2.w = "u" in d2 ? d2.u % 7 : "W" in d2 ? 1 : 0;
        day = "Z" in d2 ? utcDate(newDate(d2.y, 0, 1)).getUTCDay() : localDate(newDate(d2.y, 0, 1)).getDay();
        d2.m = 0;
        d2.d = "W" in d2 ? (d2.w + 6) % 7 + d2.W * 7 - (day + 5) % 7 : d2.w + d2.U * 7 - (day + 6) % 7;
      }
      if ("Z" in d2) {
        d2.H += d2.Z / 100 | 0;
        d2.M += d2.Z % 100;
        return utcDate(d2);
      }
      return localDate(d2);
    };
  }
  function parseSpecifier(d2, specifier, string2, j) {
    var i = 0, n2 = specifier.length, m2 = string2.length, c2, parse;
    while (i < n2) {
      if (j >= m2) return -1;
      c2 = specifier.charCodeAt(i++);
      if (c2 === 37) {
        c2 = specifier.charAt(i++);
        parse = parses[c2 in pads ? specifier.charAt(i++) : c2];
        if (!parse || (j = parse(d2, string2, j)) < 0) return -1;
      } else if (c2 != string2.charCodeAt(j++)) {
        return -1;
      }
    }
    return j;
  }
  function parsePeriod(d2, string2, i) {
    var n2 = periodRe.exec(string2.slice(i));
    return n2 ? (d2.p = periodLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseShortWeekday(d2, string2, i) {
    var n2 = shortWeekdayRe.exec(string2.slice(i));
    return n2 ? (d2.w = shortWeekdayLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseWeekday(d2, string2, i) {
    var n2 = weekdayRe.exec(string2.slice(i));
    return n2 ? (d2.w = weekdayLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseShortMonth(d2, string2, i) {
    var n2 = shortMonthRe.exec(string2.slice(i));
    return n2 ? (d2.m = shortMonthLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseMonth(d2, string2, i) {
    var n2 = monthRe.exec(string2.slice(i));
    return n2 ? (d2.m = monthLookup.get(n2[0].toLowerCase()), i + n2[0].length) : -1;
  }
  function parseLocaleDateTime(d2, string2, i) {
    return parseSpecifier(d2, locale_dateTime, string2, i);
  }
  function parseLocaleDate(d2, string2, i) {
    return parseSpecifier(d2, locale_date, string2, i);
  }
  function parseLocaleTime(d2, string2, i) {
    return parseSpecifier(d2, locale_time, string2, i);
  }
  function formatShortWeekday(d2) {
    return locale_shortWeekdays[d2.getDay()];
  }
  function formatWeekday(d2) {
    return locale_weekdays[d2.getDay()];
  }
  function formatShortMonth(d2) {
    return locale_shortMonths[d2.getMonth()];
  }
  function formatMonth(d2) {
    return locale_months[d2.getMonth()];
  }
  function formatPeriod(d2) {
    return locale_periods[+(d2.getHours() >= 12)];
  }
  function formatQuarter(d2) {
    return 1 + ~~(d2.getMonth() / 3);
  }
  function formatUTCShortWeekday(d2) {
    return locale_shortWeekdays[d2.getUTCDay()];
  }
  function formatUTCWeekday(d2) {
    return locale_weekdays[d2.getUTCDay()];
  }
  function formatUTCShortMonth(d2) {
    return locale_shortMonths[d2.getUTCMonth()];
  }
  function formatUTCMonth(d2) {
    return locale_months[d2.getUTCMonth()];
  }
  function formatUTCPeriod(d2) {
    return locale_periods[+(d2.getUTCHours() >= 12)];
  }
  function formatUTCQuarter(d2) {
    return 1 + ~~(d2.getUTCMonth() / 3);
  }
  return {
    format: function(specifier) {
      var f2 = newFormat(specifier += "", formats);
      f2.toString = function() {
        return specifier;
      };
      return f2;
    },
    parse: function(specifier) {
      var p2 = newParse(specifier += "", false);
      p2.toString = function() {
        return specifier;
      };
      return p2;
    },
    utcFormat: function(specifier) {
      var f2 = newFormat(specifier += "", utcFormats);
      f2.toString = function() {
        return specifier;
      };
      return f2;
    },
    utcParse: function(specifier) {
      var p2 = newParse(specifier += "", true);
      p2.toString = function() {
        return specifier;
      };
      return p2;
    }
  };
}
var pads = { "-": "", "_": " ", "0": "0" }, numberRe = /^\s*\d+/, percentRe = /^%/, requoteRe = /[\\^$*+?|[\]().{}]/g;
function pad(value, fill, width) {
  var sign2 = value < 0 ? "-" : "", string2 = (sign2 ? -value : value) + "", length = string2.length;
  return sign2 + (length < width ? new Array(width - length + 1).join(fill) + string2 : string2);
}
function requote(s2) {
  return s2.replace(requoteRe, "\\$&");
}
function formatRe(names) {
  return new RegExp("^(?:" + names.map(requote).join("|") + ")", "i");
}
function formatLookup(names) {
  return new Map(names.map((name, i) => [name.toLowerCase(), i]));
}
function parseWeekdayNumberSunday(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 1));
  return n2 ? (d2.w = +n2[0], i + n2[0].length) : -1;
}
function parseWeekdayNumberMonday(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 1));
  return n2 ? (d2.u = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberSunday(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.U = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberISO(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.V = +n2[0], i + n2[0].length) : -1;
}
function parseWeekNumberMonday(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.W = +n2[0], i + n2[0].length) : -1;
}
function parseFullYear(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 4));
  return n2 ? (d2.y = +n2[0], i + n2[0].length) : -1;
}
function parseYear(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.y = +n2[0] + (+n2[0] > 68 ? 1900 : 2e3), i + n2[0].length) : -1;
}
function parseZone(d2, string2, i) {
  var n2 = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(string2.slice(i, i + 6));
  return n2 ? (d2.Z = n2[1] ? 0 : -(n2[2] + (n2[3] || "00")), i + n2[0].length) : -1;
}
function parseQuarter(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 1));
  return n2 ? (d2.q = n2[0] * 3 - 3, i + n2[0].length) : -1;
}
function parseMonthNumber(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.m = n2[0] - 1, i + n2[0].length) : -1;
}
function parseDayOfMonth(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.d = +n2[0], i + n2[0].length) : -1;
}
function parseDayOfYear(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 3));
  return n2 ? (d2.m = 0, d2.d = +n2[0], i + n2[0].length) : -1;
}
function parseHour24(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.H = +n2[0], i + n2[0].length) : -1;
}
function parseMinutes(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.M = +n2[0], i + n2[0].length) : -1;
}
function parseSeconds(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 2));
  return n2 ? (d2.S = +n2[0], i + n2[0].length) : -1;
}
function parseMilliseconds(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 3));
  return n2 ? (d2.L = +n2[0], i + n2[0].length) : -1;
}
function parseMicroseconds(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i, i + 6));
  return n2 ? (d2.L = Math.floor(n2[0] / 1e3), i + n2[0].length) : -1;
}
function parseLiteralPercent(d2, string2, i) {
  var n2 = percentRe.exec(string2.slice(i, i + 1));
  return n2 ? i + n2[0].length : -1;
}
function parseUnixTimestamp(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i));
  return n2 ? (d2.Q = +n2[0], i + n2[0].length) : -1;
}
function parseUnixTimestampSeconds(d2, string2, i) {
  var n2 = numberRe.exec(string2.slice(i));
  return n2 ? (d2.s = +n2[0], i + n2[0].length) : -1;
}
function formatDayOfMonth(d2, p2) {
  return pad(d2.getDate(), p2, 2);
}
function formatHour24(d2, p2) {
  return pad(d2.getHours(), p2, 2);
}
function formatHour12(d2, p2) {
  return pad(d2.getHours() % 12 || 12, p2, 2);
}
function formatDayOfYear(d2, p2) {
  return pad(1 + timeDay.count(timeYear(d2), d2), p2, 3);
}
function formatMilliseconds(d2, p2) {
  return pad(d2.getMilliseconds(), p2, 3);
}
function formatMicroseconds(d2, p2) {
  return formatMilliseconds(d2, p2) + "000";
}
function formatMonthNumber(d2, p2) {
  return pad(d2.getMonth() + 1, p2, 2);
}
function formatMinutes(d2, p2) {
  return pad(d2.getMinutes(), p2, 2);
}
function formatSeconds(d2, p2) {
  return pad(d2.getSeconds(), p2, 2);
}
function formatWeekdayNumberMonday(d2) {
  var day = d2.getDay();
  return day === 0 ? 7 : day;
}
function formatWeekNumberSunday(d2, p2) {
  return pad(timeSunday.count(timeYear(d2) - 1, d2), p2, 2);
}
function dISO(d2) {
  var day = d2.getDay();
  return day >= 4 || day === 0 ? timeThursday(d2) : timeThursday.ceil(d2);
}
function formatWeekNumberISO(d2, p2) {
  d2 = dISO(d2);
  return pad(timeThursday.count(timeYear(d2), d2) + (timeYear(d2).getDay() === 4), p2, 2);
}
function formatWeekdayNumberSunday(d2) {
  return d2.getDay();
}
function formatWeekNumberMonday(d2, p2) {
  return pad(timeMonday.count(timeYear(d2) - 1, d2), p2, 2);
}
function formatYear(d2, p2) {
  return pad(d2.getFullYear() % 100, p2, 2);
}
function formatYearISO(d2, p2) {
  d2 = dISO(d2);
  return pad(d2.getFullYear() % 100, p2, 2);
}
function formatFullYear(d2, p2) {
  return pad(d2.getFullYear() % 1e4, p2, 4);
}
function formatFullYearISO(d2, p2) {
  var day = d2.getDay();
  d2 = day >= 4 || day === 0 ? timeThursday(d2) : timeThursday.ceil(d2);
  return pad(d2.getFullYear() % 1e4, p2, 4);
}
function formatZone(d2) {
  var z2 = d2.getTimezoneOffset();
  return (z2 > 0 ? "-" : (z2 *= -1, "+")) + pad(z2 / 60 | 0, "0", 2) + pad(z2 % 60, "0", 2);
}
function formatUTCDayOfMonth(d2, p2) {
  return pad(d2.getUTCDate(), p2, 2);
}
function formatUTCHour24(d2, p2) {
  return pad(d2.getUTCHours(), p2, 2);
}
function formatUTCHour12(d2, p2) {
  return pad(d2.getUTCHours() % 12 || 12, p2, 2);
}
function formatUTCDayOfYear(d2, p2) {
  return pad(1 + utcDay.count(utcYear(d2), d2), p2, 3);
}
function formatUTCMilliseconds(d2, p2) {
  return pad(d2.getUTCMilliseconds(), p2, 3);
}
function formatUTCMicroseconds(d2, p2) {
  return formatUTCMilliseconds(d2, p2) + "000";
}
function formatUTCMonthNumber(d2, p2) {
  return pad(d2.getUTCMonth() + 1, p2, 2);
}
function formatUTCMinutes(d2, p2) {
  return pad(d2.getUTCMinutes(), p2, 2);
}
function formatUTCSeconds(d2, p2) {
  return pad(d2.getUTCSeconds(), p2, 2);
}
function formatUTCWeekdayNumberMonday(d2) {
  var dow = d2.getUTCDay();
  return dow === 0 ? 7 : dow;
}
function formatUTCWeekNumberSunday(d2, p2) {
  return pad(utcSunday.count(utcYear(d2) - 1, d2), p2, 2);
}
function UTCdISO(d2) {
  var day = d2.getUTCDay();
  return day >= 4 || day === 0 ? utcThursday(d2) : utcThursday.ceil(d2);
}
function formatUTCWeekNumberISO(d2, p2) {
  d2 = UTCdISO(d2);
  return pad(utcThursday.count(utcYear(d2), d2) + (utcYear(d2).getUTCDay() === 4), p2, 2);
}
function formatUTCWeekdayNumberSunday(d2) {
  return d2.getUTCDay();
}
function formatUTCWeekNumberMonday(d2, p2) {
  return pad(utcMonday.count(utcYear(d2) - 1, d2), p2, 2);
}
function formatUTCYear(d2, p2) {
  return pad(d2.getUTCFullYear() % 100, p2, 2);
}
function formatUTCYearISO(d2, p2) {
  d2 = UTCdISO(d2);
  return pad(d2.getUTCFullYear() % 100, p2, 2);
}
function formatUTCFullYear(d2, p2) {
  return pad(d2.getUTCFullYear() % 1e4, p2, 4);
}
function formatUTCFullYearISO(d2, p2) {
  var day = d2.getUTCDay();
  d2 = day >= 4 || day === 0 ? utcThursday(d2) : utcThursday.ceil(d2);
  return pad(d2.getUTCFullYear() % 1e4, p2, 4);
}
function formatUTCZone() {
  return "+0000";
}
function formatLiteralPercent() {
  return "%";
}
function formatUnixTimestamp(d2) {
  return +d2;
}
function formatUnixTimestampSeconds(d2) {
  return Math.floor(+d2 / 1e3);
}
var locale;
var timeFormat;
var utcFormat;
defaultLocale({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function defaultLocale(definition) {
  locale = formatLocale(definition);
  timeFormat = locale.format;
  locale.parse;
  utcFormat = locale.utcFormat;
  locale.utcParse;
  return locale;
}
function date(t2) {
  return new Date(t2);
}
function number(t2) {
  return t2 instanceof Date ? +t2 : +/* @__PURE__ */ new Date(+t2);
}
function calendar(ticks2, tickInterval, year, month, week, day, hour, minute, second2, format2) {
  var scale = continuous(), invert = scale.invert, domain = scale.domain;
  var formatMillisecond = format2(".%L"), formatSecond = format2(":%S"), formatMinute = format2("%I:%M"), formatHour = format2("%I %p"), formatDay = format2("%a %d"), formatWeek = format2("%b %d"), formatMonth = format2("%B"), formatYear2 = format2("%Y");
  function tickFormat2(date2) {
    return (second2(date2) < date2 ? formatMillisecond : minute(date2) < date2 ? formatSecond : hour(date2) < date2 ? formatMinute : day(date2) < date2 ? formatHour : month(date2) < date2 ? week(date2) < date2 ? formatDay : formatWeek : year(date2) < date2 ? formatMonth : formatYear2)(date2);
  }
  scale.invert = function(y2) {
    return new Date(invert(y2));
  };
  scale.domain = function(_) {
    return arguments.length ? domain(Array.from(_, number)) : domain().map(date);
  };
  scale.ticks = function(interval) {
    var d2 = domain();
    return ticks2(d2[0], d2[d2.length - 1], interval == null ? 10 : interval);
  };
  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat2 : format2(specifier);
  };
  scale.nice = function(interval) {
    var d2 = domain();
    if (!interval || typeof interval.range !== "function") interval = tickInterval(d2[0], d2[d2.length - 1], interval == null ? 10 : interval);
    return interval ? domain(nice(d2, interval)) : scale;
  };
  scale.copy = function() {
    return copy$1(scale, calendar(ticks2, tickInterval, year, month, week, day, hour, minute, second2, format2));
  };
  return scale;
}
function time() {
  return initRange.apply(calendar(timeTicks, timeTickInterval, timeYear, timeMonth, timeSunday, timeDay, timeHour, timeMinute, second, timeFormat).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function utcTime() {
  return initRange.apply(calendar(utcTicks, utcTickInterval, utcYear, utcMonth, utcSunday, utcDay, utcHour, utcMinute, second, utcFormat).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function transformer$1() {
  var x0 = 0, x1 = 1, t02, t12, k10, transform, interpolator = identity$3, clamp = false, unknown;
  function scale(x2) {
    return x2 == null || isNaN(x2 = +x2) ? unknown : interpolator(k10 === 0 ? 0.5 : (x2 = (transform(x2) - t02) * k10, clamp ? Math.max(0, Math.min(1, x2)) : x2));
  }
  scale.domain = function(_) {
    return arguments.length ? ([x0, x1] = _, t02 = transform(x0 = +x0), t12 = transform(x1 = +x1), k10 = t02 === t12 ? 0 : 1 / (t12 - t02), scale) : [x0, x1];
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  function range2(interpolate2) {
    return function(_) {
      var r0, r1;
      return arguments.length ? ([r0, r1] = _, interpolator = interpolate2(r0, r1), scale) : [interpolator(0), interpolator(1)];
    };
  }
  scale.range = range2(interpolate);
  scale.rangeRound = range2(interpolateRound);
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t2) {
    transform = t2, t02 = t2(x0), t12 = t2(x1), k10 = t02 === t12 ? 0 : 1 / (t12 - t02);
    return scale;
  };
}
function copy(source, target) {
  return target.domain(source.domain()).interpolator(source.interpolator()).clamp(source.clamp()).unknown(source.unknown());
}
function sequential() {
  var scale = linearish(transformer$1()(identity$3));
  scale.copy = function() {
    return copy(scale, sequential());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialLog() {
  var scale = loggish(transformer$1()).domain([1, 10]);
  scale.copy = function() {
    return copy(scale, sequentialLog()).base(scale.base());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialSymlog() {
  var scale = symlogish(transformer$1());
  scale.copy = function() {
    return copy(scale, sequentialSymlog()).constant(scale.constant());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialPow() {
  var scale = powish(transformer$1());
  scale.copy = function() {
    return copy(scale, sequentialPow()).exponent(scale.exponent());
  };
  return initInterpolator.apply(scale, arguments);
}
function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}
function sequentialQuantile() {
  var domain = [], interpolator = identity$3;
  function scale(x2) {
    if (x2 != null && !isNaN(x2 = +x2)) return interpolator((bisectRight(domain, x2, 1) - 1) / (domain.length - 1));
  }
  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (let d2 of _) if (d2 != null && !isNaN(d2 = +d2)) domain.push(d2);
    domain.sort(ascending);
    return scale;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  scale.range = function() {
    return domain.map((d2, i) => interpolator(i / (domain.length - 1)));
  };
  scale.quantiles = function(n2) {
    return Array.from({ length: n2 + 1 }, (_, i) => quantile$1(domain, i / n2));
  };
  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };
  return initInterpolator.apply(scale, arguments);
}
function transformer() {
  var x0 = 0, x1 = 0.5, x2 = 1, s2 = 1, t02, t12, t2, k10, k21, interpolator = identity$3, transform, clamp = false, unknown;
  function scale(x3) {
    return isNaN(x3 = +x3) ? unknown : (x3 = 0.5 + ((x3 = +transform(x3)) - t12) * (s2 * x3 < s2 * t12 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x3)) : x3));
  }
  scale.domain = function(_) {
    return arguments.length ? ([x0, x1, x2] = _, t02 = transform(x0 = +x0), t12 = transform(x1 = +x1), t2 = transform(x2 = +x2), k10 = t02 === t12 ? 0 : 0.5 / (t12 - t02), k21 = t12 === t2 ? 0 : 0.5 / (t2 - t12), s2 = t12 < t02 ? -1 : 1, scale) : [x0, x1, x2];
  };
  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };
  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };
  function range2(interpolate2) {
    return function(_) {
      var r0, r1, r2;
      return arguments.length ? ([r0, r1, r2] = _, interpolator = piecewise(interpolate2, [r0, r1, r2]), scale) : [interpolator(0), interpolator(0.5), interpolator(1)];
    };
  }
  scale.range = range2(interpolate);
  scale.rangeRound = range2(interpolateRound);
  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };
  return function(t3) {
    transform = t3, t02 = t3(x0), t12 = t3(x1), t2 = t3(x2), k10 = t02 === t12 ? 0 : 0.5 / (t12 - t02), k21 = t12 === t2 ? 0 : 0.5 / (t2 - t12), s2 = t12 < t02 ? -1 : 1;
    return scale;
  };
}
function diverging() {
  var scale = linearish(transformer()(identity$3));
  scale.copy = function() {
    return copy(scale, diverging());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingLog() {
  var scale = loggish(transformer()).domain([0.1, 1, 10]);
  scale.copy = function() {
    return copy(scale, divergingLog()).base(scale.base());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingSymlog() {
  var scale = symlogish(transformer());
  scale.copy = function() {
    return copy(scale, divergingSymlog()).constant(scale.constant());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingPow() {
  var scale = powish(transformer());
  scale.copy = function() {
    return copy(scale, divergingPow()).exponent(scale.exponent());
  };
  return initInterpolator.apply(scale, arguments);
}
function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}
const d3Scales = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: band,
  scaleDiverging: diverging,
  scaleDivergingLog: divergingLog,
  scaleDivergingPow: divergingPow,
  scaleDivergingSqrt: divergingSqrt,
  scaleDivergingSymlog: divergingSymlog,
  scaleIdentity: identity$1,
  scaleImplicit: implicit,
  scaleLinear: linear,
  scaleLog: log,
  scaleOrdinal: ordinal,
  scalePoint: point,
  scalePow: pow,
  scaleQuantile: quantile,
  scaleQuantize: quantize,
  scaleRadial: radial,
  scaleSequential: sequential,
  scaleSequentialLog: sequentialLog,
  scaleSequentialPow: sequentialPow,
  scaleSequentialQuantile: sequentialQuantile,
  scaleSequentialSqrt: sequentialSqrt,
  scaleSequentialSymlog: sequentialSymlog,
  scaleSqrt: sqrt,
  scaleSymlog: symlog,
  scaleThreshold: threshold,
  scaleTime: time,
  scaleUtc: utcTime,
  tickFormat
}, Symbol.toStringTag, { value: "Module" }));
var selectChartDataWithIndexes = (state) => state.chartData;
var selectChartDataAndAlwaysIgnoreIndexes = createSelector([selectChartDataWithIndexes], (dataState) => {
  var dataEndIndex = dataState.chartData != null ? dataState.chartData.length - 1 : 0;
  return {
    chartData: dataState.chartData,
    computedData: dataState.computedData,
    dataEndIndex,
    dataStartIndex: 0
  };
});
var selectChartDataWithIndexesIfNotInPanorama = (state, _unused1, _unused2, isPanorama) => {
  if (isPanorama) {
    return selectChartDataAndAlwaysIgnoreIndexes(state);
  }
  return selectChartDataWithIndexes(state);
};
function isWellFormedNumberDomain(v2) {
  if (Array.isArray(v2) && v2.length === 2) {
    var [min2, max2] = v2;
    if (isWellBehavedNumber(min2) && isWellBehavedNumber(max2)) {
      return true;
    }
  }
  return false;
}
function extendDomain(providedDomain, boundaryDomain, allowDataOverflow) {
  if (allowDataOverflow) {
    return providedDomain;
  }
  return [Math.min(providedDomain[0], boundaryDomain[0]), Math.max(providedDomain[1], boundaryDomain[1])];
}
function numericalDomainSpecifiedWithoutRequiringData(userDomain, allowDataOverflow) {
  if (!allowDataOverflow) {
    return void 0;
  }
  if (typeof userDomain === "function") {
    return void 0;
  }
  if (Array.isArray(userDomain) && userDomain.length === 2) {
    var [providedMin, providedMax] = userDomain;
    var finalMin, finalMax;
    if (isWellBehavedNumber(providedMin)) {
      finalMin = providedMin;
    } else if (typeof providedMin === "function") {
      return void 0;
    }
    if (isWellBehavedNumber(providedMax)) {
      finalMax = providedMax;
    } else if (typeof providedMax === "function") {
      return void 0;
    }
    var candidate = [finalMin, finalMax];
    if (isWellFormedNumberDomain(candidate)) {
      return candidate;
    }
  }
  return void 0;
}
function parseNumericalUserDomain(userDomain, dataDomain, allowDataOverflow) {
  if (!allowDataOverflow && dataDomain == null) {
    return void 0;
  }
  if (typeof userDomain === "function" && dataDomain != null) {
    try {
      var result = userDomain(dataDomain, allowDataOverflow);
      if (isWellFormedNumberDomain(result)) {
        return extendDomain(result, dataDomain, allowDataOverflow);
      }
    } catch (_unused) {
    }
  }
  if (Array.isArray(userDomain) && userDomain.length === 2) {
    var [providedMin, providedMax] = userDomain;
    var finalMin, finalMax;
    if (providedMin === "auto") {
      if (dataDomain != null) {
        finalMin = Math.min(...dataDomain);
      }
    } else if (isNumber(providedMin)) {
      finalMin = providedMin;
    } else if (typeof providedMin === "function") {
      try {
        if (dataDomain != null) {
          finalMin = providedMin(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0]);
        }
      } catch (_unused2) {
      }
    } else if (typeof providedMin === "string" && MIN_VALUE_REG.test(providedMin)) {
      var match = MIN_VALUE_REG.exec(providedMin);
      if (match == null || dataDomain == null) {
        finalMin = void 0;
      } else {
        var value = +match[1];
        finalMin = dataDomain[0] - value;
      }
    } else {
      finalMin = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[0];
    }
    if (providedMax === "auto") {
      if (dataDomain != null) {
        finalMax = Math.max(...dataDomain);
      }
    } else if (isNumber(providedMax)) {
      finalMax = providedMax;
    } else if (typeof providedMax === "function") {
      try {
        if (dataDomain != null) {
          finalMax = providedMax(dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1]);
        }
      } catch (_unused3) {
      }
    } else if (typeof providedMax === "string" && MAX_VALUE_REG.test(providedMax)) {
      var _match = MAX_VALUE_REG.exec(providedMax);
      if (_match == null || dataDomain == null) {
        finalMax = void 0;
      } else {
        var _value = +_match[1];
        finalMax = dataDomain[1] + _value;
      }
    } else {
      finalMax = dataDomain === null || dataDomain === void 0 ? void 0 : dataDomain[1];
    }
    var candidate = [finalMin, finalMax];
    if (isWellFormedNumberDomain(candidate)) {
      if (dataDomain == null) {
        return candidate;
      }
      return extendDomain(candidate, dataDomain, allowDataOverflow);
    }
  }
  return void 0;
}
var MAX_DIGITS = 1e9, defaults = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, Decimal, external = true, decimalError = "[DecimalError] ", invalidArgument = decimalError + "Invalid argument: ", exponentOutOfRange = decimalError + "Exponent out of range: ", mathfloor = Math.floor, mathpow = Math.pow, isDecimal = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, ONE, BASE = 1e7, LOG_BASE = 7, MAX_SAFE_INTEGER = 9007199254740991, MAX_E = mathfloor(MAX_SAFE_INTEGER / LOG_BASE), P = {};
P.absoluteValue = P.abs = function() {
  var x2 = new this.constructor(this);
  if (x2.s) x2.s = 1;
  return x2;
};
P.comparedTo = P.cmp = function(y2) {
  var i, j, xdL, ydL, x2 = this;
  y2 = new x2.constructor(y2);
  if (x2.s !== y2.s) return x2.s || -y2.s;
  if (x2.e !== y2.e) return x2.e > y2.e ^ x2.s < 0 ? 1 : -1;
  xdL = x2.d.length;
  ydL = y2.d.length;
  for (i = 0, j = xdL < ydL ? xdL : ydL; i < j; ++i) {
    if (x2.d[i] !== y2.d[i]) return x2.d[i] > y2.d[i] ^ x2.s < 0 ? 1 : -1;
  }
  return xdL === ydL ? 0 : xdL > ydL ^ x2.s < 0 ? 1 : -1;
};
P.decimalPlaces = P.dp = function() {
  var x2 = this, w2 = x2.d.length - 1, dp = (w2 - x2.e) * LOG_BASE;
  w2 = x2.d[w2];
  if (w2) for (; w2 % 10 == 0; w2 /= 10) dp--;
  return dp < 0 ? 0 : dp;
};
P.dividedBy = P.div = function(y2) {
  return divide(this, new this.constructor(y2));
};
P.dividedToIntegerBy = P.idiv = function(y2) {
  var x2 = this, Ctor = x2.constructor;
  return round(divide(x2, new Ctor(y2), 0, 1), Ctor.precision);
};
P.equals = P.eq = function(y2) {
  return !this.cmp(y2);
};
P.exponent = function() {
  return getBase10Exponent(this);
};
P.greaterThan = P.gt = function(y2) {
  return this.cmp(y2) > 0;
};
P.greaterThanOrEqualTo = P.gte = function(y2) {
  return this.cmp(y2) >= 0;
};
P.isInteger = P.isint = function() {
  return this.e > this.d.length - 2;
};
P.isNegative = P.isneg = function() {
  return this.s < 0;
};
P.isPositive = P.ispos = function() {
  return this.s > 0;
};
P.isZero = function() {
  return this.s === 0;
};
P.lessThan = P.lt = function(y2) {
  return this.cmp(y2) < 0;
};
P.lessThanOrEqualTo = P.lte = function(y2) {
  return this.cmp(y2) < 1;
};
P.logarithm = P.log = function(base) {
  var r2, x2 = this, Ctor = x2.constructor, pr = Ctor.precision, wpr = pr + 5;
  if (base === void 0) {
    base = new Ctor(10);
  } else {
    base = new Ctor(base);
    if (base.s < 1 || base.eq(ONE)) throw Error(decimalError + "NaN");
  }
  if (x2.s < 1) throw Error(decimalError + (x2.s ? "NaN" : "-Infinity"));
  if (x2.eq(ONE)) return new Ctor(0);
  external = false;
  r2 = divide(ln(x2, wpr), ln(base, wpr), wpr);
  external = true;
  return round(r2, pr);
};
P.minus = P.sub = function(y2) {
  var x2 = this;
  y2 = new x2.constructor(y2);
  return x2.s == y2.s ? subtract(x2, y2) : add(x2, (y2.s = -y2.s, y2));
};
P.modulo = P.mod = function(y2) {
  var q2, x2 = this, Ctor = x2.constructor, pr = Ctor.precision;
  y2 = new Ctor(y2);
  if (!y2.s) throw Error(decimalError + "NaN");
  if (!x2.s) return round(new Ctor(x2), pr);
  external = false;
  q2 = divide(x2, y2, 0, 1).times(y2);
  external = true;
  return x2.minus(q2);
};
P.naturalExponential = P.exp = function() {
  return exp(this);
};
P.naturalLogarithm = P.ln = function() {
  return ln(this);
};
P.negated = P.neg = function() {
  var x2 = new this.constructor(this);
  x2.s = -x2.s || 0;
  return x2;
};
P.plus = P.add = function(y2) {
  var x2 = this;
  y2 = new x2.constructor(y2);
  return x2.s == y2.s ? add(x2, y2) : subtract(x2, (y2.s = -y2.s, y2));
};
P.precision = P.sd = function(z2) {
  var e3, sd, w2, x2 = this;
  if (z2 !== void 0 && z2 !== !!z2 && z2 !== 1 && z2 !== 0) throw Error(invalidArgument + z2);
  e3 = getBase10Exponent(x2) + 1;
  w2 = x2.d.length - 1;
  sd = w2 * LOG_BASE + 1;
  w2 = x2.d[w2];
  if (w2) {
    for (; w2 % 10 == 0; w2 /= 10) sd--;
    for (w2 = x2.d[0]; w2 >= 10; w2 /= 10) sd++;
  }
  return z2 && e3 > sd ? e3 : sd;
};
P.squareRoot = P.sqrt = function() {
  var e3, n2, pr, r2, s2, t2, wpr, x2 = this, Ctor = x2.constructor;
  if (x2.s < 1) {
    if (!x2.s) return new Ctor(0);
    throw Error(decimalError + "NaN");
  }
  e3 = getBase10Exponent(x2);
  external = false;
  s2 = Math.sqrt(+x2);
  if (s2 == 0 || s2 == 1 / 0) {
    n2 = digitsToString(x2.d);
    if ((n2.length + e3) % 2 == 0) n2 += "0";
    s2 = Math.sqrt(n2);
    e3 = mathfloor((e3 + 1) / 2) - (e3 < 0 || e3 % 2);
    if (s2 == 1 / 0) {
      n2 = "5e" + e3;
    } else {
      n2 = s2.toExponential();
      n2 = n2.slice(0, n2.indexOf("e") + 1) + e3;
    }
    r2 = new Ctor(n2);
  } else {
    r2 = new Ctor(s2.toString());
  }
  pr = Ctor.precision;
  s2 = wpr = pr + 3;
  for (; ; ) {
    t2 = r2;
    r2 = t2.plus(divide(x2, t2, wpr + 2)).times(0.5);
    if (digitsToString(t2.d).slice(0, wpr) === (n2 = digitsToString(r2.d)).slice(0, wpr)) {
      n2 = n2.slice(wpr - 3, wpr + 1);
      if (s2 == wpr && n2 == "4999") {
        round(t2, pr + 1, 0);
        if (t2.times(t2).eq(x2)) {
          r2 = t2;
          break;
        }
      } else if (n2 != "9999") {
        break;
      }
      wpr += 4;
    }
  }
  external = true;
  return round(r2, pr);
};
P.times = P.mul = function(y2) {
  var carry, e3, i, k2, r2, rL, t2, xdL, ydL, x2 = this, Ctor = x2.constructor, xd = x2.d, yd = (y2 = new Ctor(y2)).d;
  if (!x2.s || !y2.s) return new Ctor(0);
  y2.s *= x2.s;
  e3 = x2.e + y2.e;
  xdL = xd.length;
  ydL = yd.length;
  if (xdL < ydL) {
    r2 = xd;
    xd = yd;
    yd = r2;
    rL = xdL;
    xdL = ydL;
    ydL = rL;
  }
  r2 = [];
  rL = xdL + ydL;
  for (i = rL; i--; ) r2.push(0);
  for (i = ydL; --i >= 0; ) {
    carry = 0;
    for (k2 = xdL + i; k2 > i; ) {
      t2 = r2[k2] + yd[i] * xd[k2 - i - 1] + carry;
      r2[k2--] = t2 % BASE | 0;
      carry = t2 / BASE | 0;
    }
    r2[k2] = (r2[k2] + carry) % BASE | 0;
  }
  for (; !r2[--rL]; ) r2.pop();
  if (carry) ++e3;
  else r2.shift();
  y2.d = r2;
  y2.e = e3;
  return external ? round(y2, Ctor.precision) : y2;
};
P.toDecimalPlaces = P.todp = function(dp, rm) {
  var x2 = this, Ctor = x2.constructor;
  x2 = new Ctor(x2);
  if (dp === void 0) return x2;
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);
  return round(x2, dp + getBase10Exponent(x2) + 1, rm);
};
P.toExponential = function(dp, rm) {
  var str, x2 = this, Ctor = x2.constructor;
  if (dp === void 0) {
    str = toString(x2, true);
  } else {
    checkInt32(dp, 0, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    x2 = round(new Ctor(x2), dp + 1, rm);
    str = toString(x2, true, dp + 1);
  }
  return str;
};
P.toFixed = function(dp, rm) {
  var str, y2, x2 = this, Ctor = x2.constructor;
  if (dp === void 0) return toString(x2);
  checkInt32(dp, 0, MAX_DIGITS);
  if (rm === void 0) rm = Ctor.rounding;
  else checkInt32(rm, 0, 8);
  y2 = round(new Ctor(x2), dp + getBase10Exponent(x2) + 1, rm);
  str = toString(y2.abs(), false, dp + getBase10Exponent(y2) + 1);
  return x2.isneg() && !x2.isZero() ? "-" + str : str;
};
P.toInteger = P.toint = function() {
  var x2 = this, Ctor = x2.constructor;
  return round(new Ctor(x2), getBase10Exponent(x2) + 1, Ctor.rounding);
};
P.toNumber = function() {
  return +this;
};
P.toPower = P.pow = function(y2) {
  var e3, k2, pr, r2, sign2, yIsInt, x2 = this, Ctor = x2.constructor, guard = 12, yn = +(y2 = new Ctor(y2));
  if (!y2.s) return new Ctor(ONE);
  x2 = new Ctor(x2);
  if (!x2.s) {
    if (y2.s < 1) throw Error(decimalError + "Infinity");
    return x2;
  }
  if (x2.eq(ONE)) return x2;
  pr = Ctor.precision;
  if (y2.eq(ONE)) return round(x2, pr);
  e3 = y2.e;
  k2 = y2.d.length - 1;
  yIsInt = e3 >= k2;
  sign2 = x2.s;
  if (!yIsInt) {
    if (sign2 < 0) throw Error(decimalError + "NaN");
  } else if ((k2 = yn < 0 ? -yn : yn) <= MAX_SAFE_INTEGER) {
    r2 = new Ctor(ONE);
    e3 = Math.ceil(pr / LOG_BASE + 4);
    external = false;
    for (; ; ) {
      if (k2 % 2) {
        r2 = r2.times(x2);
        truncate(r2.d, e3);
      }
      k2 = mathfloor(k2 / 2);
      if (k2 === 0) break;
      x2 = x2.times(x2);
      truncate(x2.d, e3);
    }
    external = true;
    return y2.s < 0 ? new Ctor(ONE).div(r2) : round(r2, pr);
  }
  sign2 = sign2 < 0 && y2.d[Math.max(e3, k2)] & 1 ? -1 : 1;
  x2.s = 1;
  external = false;
  r2 = y2.times(ln(x2, pr + guard));
  external = true;
  r2 = exp(r2);
  r2.s = sign2;
  return r2;
};
P.toPrecision = function(sd, rm) {
  var e3, str, x2 = this, Ctor = x2.constructor;
  if (sd === void 0) {
    e3 = getBase10Exponent(x2);
    str = toString(x2, e3 <= Ctor.toExpNeg || e3 >= Ctor.toExpPos);
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
    x2 = round(new Ctor(x2), sd, rm);
    e3 = getBase10Exponent(x2);
    str = toString(x2, sd <= e3 || e3 <= Ctor.toExpNeg, sd);
  }
  return str;
};
P.toSignificantDigits = P.tosd = function(sd, rm) {
  var x2 = this, Ctor = x2.constructor;
  if (sd === void 0) {
    sd = Ctor.precision;
    rm = Ctor.rounding;
  } else {
    checkInt32(sd, 1, MAX_DIGITS);
    if (rm === void 0) rm = Ctor.rounding;
    else checkInt32(rm, 0, 8);
  }
  return round(new Ctor(x2), sd, rm);
};
P.toString = P.valueOf = P.val = P.toJSON = P[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var x2 = this, e3 = getBase10Exponent(x2), Ctor = x2.constructor;
  return toString(x2, e3 <= Ctor.toExpNeg || e3 >= Ctor.toExpPos);
};
function add(x2, y2) {
  var carry, d2, e3, i, k2, len, xd, yd, Ctor = x2.constructor, pr = Ctor.precision;
  if (!x2.s || !y2.s) {
    if (!y2.s) y2 = new Ctor(x2);
    return external ? round(y2, pr) : y2;
  }
  xd = x2.d;
  yd = y2.d;
  k2 = x2.e;
  e3 = y2.e;
  xd = xd.slice();
  i = k2 - e3;
  if (i) {
    if (i < 0) {
      d2 = xd;
      i = -i;
      len = yd.length;
    } else {
      d2 = yd;
      e3 = k2;
      len = xd.length;
    }
    k2 = Math.ceil(pr / LOG_BASE);
    len = k2 > len ? k2 + 1 : len + 1;
    if (i > len) {
      i = len;
      d2.length = 1;
    }
    d2.reverse();
    for (; i--; ) d2.push(0);
    d2.reverse();
  }
  len = xd.length;
  i = yd.length;
  if (len - i < 0) {
    i = len;
    d2 = yd;
    yd = xd;
    xd = d2;
  }
  for (carry = 0; i; ) {
    carry = (xd[--i] = xd[i] + yd[i] + carry) / BASE | 0;
    xd[i] %= BASE;
  }
  if (carry) {
    xd.unshift(carry);
    ++e3;
  }
  for (len = xd.length; xd[--len] == 0; ) xd.pop();
  y2.d = xd;
  y2.e = e3;
  return external ? round(y2, pr) : y2;
}
function checkInt32(i, min2, max2) {
  if (i !== ~~i || i < min2 || i > max2) {
    throw Error(invalidArgument + i);
  }
}
function digitsToString(d2) {
  var i, k2, ws, indexOfLastWord = d2.length - 1, str = "", w2 = d2[0];
  if (indexOfLastWord > 0) {
    str += w2;
    for (i = 1; i < indexOfLastWord; i++) {
      ws = d2[i] + "";
      k2 = LOG_BASE - ws.length;
      if (k2) str += getZeroString(k2);
      str += ws;
    }
    w2 = d2[i];
    ws = w2 + "";
    k2 = LOG_BASE - ws.length;
    if (k2) str += getZeroString(k2);
  } else if (w2 === 0) {
    return "0";
  }
  for (; w2 % 10 === 0; ) w2 /= 10;
  return str + w2;
}
var divide = /* @__PURE__ */ function() {
  function multiplyInteger(x2, k2) {
    var temp, carry = 0, i = x2.length;
    for (x2 = x2.slice(); i--; ) {
      temp = x2[i] * k2 + carry;
      x2[i] = temp % BASE | 0;
      carry = temp / BASE | 0;
    }
    if (carry) x2.unshift(carry);
    return x2;
  }
  function compare(a2, b2, aL, bL) {
    var i, r2;
    if (aL != bL) {
      r2 = aL > bL ? 1 : -1;
    } else {
      for (i = r2 = 0; i < aL; i++) {
        if (a2[i] != b2[i]) {
          r2 = a2[i] > b2[i] ? 1 : -1;
          break;
        }
      }
    }
    return r2;
  }
  function subtract2(a2, b2, aL) {
    var i = 0;
    for (; aL--; ) {
      a2[aL] -= i;
      i = a2[aL] < b2[aL] ? 1 : 0;
      a2[aL] = i * BASE + a2[aL] - b2[aL];
    }
    for (; !a2[0] && a2.length > 1; ) a2.shift();
  }
  return function(x2, y2, pr, dp) {
    var cmp, e3, i, k2, prod, prodL, q2, qd, rem, remL, rem0, sd, t2, xi, xL, yd0, yL, yz, Ctor = x2.constructor, sign2 = x2.s == y2.s ? 1 : -1, xd = x2.d, yd = y2.d;
    if (!x2.s) return new Ctor(x2);
    if (!y2.s) throw Error(decimalError + "Division by zero");
    e3 = x2.e - y2.e;
    yL = yd.length;
    xL = xd.length;
    q2 = new Ctor(sign2);
    qd = q2.d = [];
    for (i = 0; yd[i] == (xd[i] || 0); ) ++i;
    if (yd[i] > (xd[i] || 0)) --e3;
    if (pr == null) {
      sd = pr = Ctor.precision;
    } else if (dp) {
      sd = pr + (getBase10Exponent(x2) - getBase10Exponent(y2)) + 1;
    } else {
      sd = pr;
    }
    if (sd < 0) return new Ctor(0);
    sd = sd / LOG_BASE + 2 | 0;
    i = 0;
    if (yL == 1) {
      k2 = 0;
      yd = yd[0];
      sd++;
      for (; (i < xL || k2) && sd--; i++) {
        t2 = k2 * BASE + (xd[i] || 0);
        qd[i] = t2 / yd | 0;
        k2 = t2 % yd | 0;
      }
    } else {
      k2 = BASE / (yd[0] + 1) | 0;
      if (k2 > 1) {
        yd = multiplyInteger(yd, k2);
        xd = multiplyInteger(xd, k2);
        yL = yd.length;
        xL = xd.length;
      }
      xi = yL;
      rem = xd.slice(0, yL);
      remL = rem.length;
      for (; remL < yL; ) rem[remL++] = 0;
      yz = yd.slice();
      yz.unshift(0);
      yd0 = yd[0];
      if (yd[1] >= BASE / 2) ++yd0;
      do {
        k2 = 0;
        cmp = compare(yd, rem, yL, remL);
        if (cmp < 0) {
          rem0 = rem[0];
          if (yL != remL) rem0 = rem0 * BASE + (rem[1] || 0);
          k2 = rem0 / yd0 | 0;
          if (k2 > 1) {
            if (k2 >= BASE) k2 = BASE - 1;
            prod = multiplyInteger(yd, k2);
            prodL = prod.length;
            remL = rem.length;
            cmp = compare(prod, rem, prodL, remL);
            if (cmp == 1) {
              k2--;
              subtract2(prod, yL < prodL ? yz : yd, prodL);
            }
          } else {
            if (k2 == 0) cmp = k2 = 1;
            prod = yd.slice();
          }
          prodL = prod.length;
          if (prodL < remL) prod.unshift(0);
          subtract2(rem, prod, remL);
          if (cmp == -1) {
            remL = rem.length;
            cmp = compare(yd, rem, yL, remL);
            if (cmp < 1) {
              k2++;
              subtract2(rem, yL < remL ? yz : yd, remL);
            }
          }
          remL = rem.length;
        } else if (cmp === 0) {
          k2++;
          rem = [0];
        }
        qd[i++] = k2;
        if (cmp && rem[0]) {
          rem[remL++] = xd[xi] || 0;
        } else {
          rem = [xd[xi]];
          remL = 1;
        }
      } while ((xi++ < xL || rem[0] !== void 0) && sd--);
    }
    if (!qd[0]) qd.shift();
    q2.e = e3;
    return round(q2, dp ? pr + getBase10Exponent(q2) + 1 : pr);
  };
}();
function exp(x2, sd) {
  var denominator, guard, pow2, sum, t2, wpr, i = 0, k2 = 0, Ctor = x2.constructor, pr = Ctor.precision;
  if (getBase10Exponent(x2) > 16) throw Error(exponentOutOfRange + getBase10Exponent(x2));
  if (!x2.s) return new Ctor(ONE);
  {
    external = false;
    wpr = pr;
  }
  t2 = new Ctor(0.03125);
  while (x2.abs().gte(0.1)) {
    x2 = x2.times(t2);
    k2 += 5;
  }
  guard = Math.log(mathpow(2, k2)) / Math.LN10 * 2 + 5 | 0;
  wpr += guard;
  denominator = pow2 = sum = new Ctor(ONE);
  Ctor.precision = wpr;
  for (; ; ) {
    pow2 = round(pow2.times(x2), wpr);
    denominator = denominator.times(++i);
    t2 = sum.plus(divide(pow2, denominator, wpr));
    if (digitsToString(t2.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      while (k2--) sum = round(sum.times(sum), wpr);
      Ctor.precision = pr;
      return sd == null ? (external = true, round(sum, pr)) : sum;
    }
    sum = t2;
  }
}
function getBase10Exponent(x2) {
  var e3 = x2.e * LOG_BASE, w2 = x2.d[0];
  for (; w2 >= 10; w2 /= 10) e3++;
  return e3;
}
function getLn10(Ctor, sd, pr) {
  if (sd > Ctor.LN10.sd()) {
    external = true;
    if (pr) Ctor.precision = pr;
    throw Error(decimalError + "LN10 precision limit exceeded");
  }
  return round(new Ctor(Ctor.LN10), sd);
}
function getZeroString(k2) {
  var zs = "";
  for (; k2--; ) zs += "0";
  return zs;
}
function ln(y2, sd) {
  var c2, c0, denominator, e3, numerator, sum, t2, wpr, x2, n2 = 1, guard = 10, x3 = y2, xd = x3.d, Ctor = x3.constructor, pr = Ctor.precision;
  if (x3.s < 1) throw Error(decimalError + (x3.s ? "NaN" : "-Infinity"));
  if (x3.eq(ONE)) return new Ctor(0);
  if (sd == null) {
    external = false;
    wpr = pr;
  } else {
    wpr = sd;
  }
  if (x3.eq(10)) {
    if (sd == null) external = true;
    return getLn10(Ctor, wpr);
  }
  wpr += guard;
  Ctor.precision = wpr;
  c2 = digitsToString(xd);
  c0 = c2.charAt(0);
  e3 = getBase10Exponent(x3);
  if (Math.abs(e3) < 15e14) {
    while (c0 < 7 && c0 != 1 || c0 == 1 && c2.charAt(1) > 3) {
      x3 = x3.times(y2);
      c2 = digitsToString(x3.d);
      c0 = c2.charAt(0);
      n2++;
    }
    e3 = getBase10Exponent(x3);
    if (c0 > 1) {
      x3 = new Ctor("0." + c2);
      e3++;
    } else {
      x3 = new Ctor(c0 + "." + c2.slice(1));
    }
  } else {
    t2 = getLn10(Ctor, wpr + 2, pr).times(e3 + "");
    x3 = ln(new Ctor(c0 + "." + c2.slice(1)), wpr - guard).plus(t2);
    Ctor.precision = pr;
    return sd == null ? (external = true, round(x3, pr)) : x3;
  }
  sum = numerator = x3 = divide(x3.minus(ONE), x3.plus(ONE), wpr);
  x2 = round(x3.times(x3), wpr);
  denominator = 3;
  for (; ; ) {
    numerator = round(numerator.times(x2), wpr);
    t2 = sum.plus(divide(numerator, new Ctor(denominator), wpr));
    if (digitsToString(t2.d).slice(0, wpr) === digitsToString(sum.d).slice(0, wpr)) {
      sum = sum.times(2);
      if (e3 !== 0) sum = sum.plus(getLn10(Ctor, wpr + 2, pr).times(e3 + ""));
      sum = divide(sum, new Ctor(n2), wpr);
      Ctor.precision = pr;
      return sd == null ? (external = true, round(sum, pr)) : sum;
    }
    sum = t2;
    denominator += 2;
  }
}
function parseDecimal(x2, str) {
  var e3, i, len;
  if ((e3 = str.indexOf(".")) > -1) str = str.replace(".", "");
  if ((i = str.search(/e/i)) > 0) {
    if (e3 < 0) e3 = i;
    e3 += +str.slice(i + 1);
    str = str.substring(0, i);
  } else if (e3 < 0) {
    e3 = str.length;
  }
  for (i = 0; str.charCodeAt(i) === 48; ) ++i;
  for (len = str.length; str.charCodeAt(len - 1) === 48; ) --len;
  str = str.slice(i, len);
  if (str) {
    len -= i;
    e3 = e3 - i - 1;
    x2.e = mathfloor(e3 / LOG_BASE);
    x2.d = [];
    i = (e3 + 1) % LOG_BASE;
    if (e3 < 0) i += LOG_BASE;
    if (i < len) {
      if (i) x2.d.push(+str.slice(0, i));
      for (len -= LOG_BASE; i < len; ) x2.d.push(+str.slice(i, i += LOG_BASE));
      str = str.slice(i);
      i = LOG_BASE - str.length;
    } else {
      i -= len;
    }
    for (; i--; ) str += "0";
    x2.d.push(+str);
    if (external && (x2.e > MAX_E || x2.e < -MAX_E)) throw Error(exponentOutOfRange + e3);
  } else {
    x2.s = 0;
    x2.e = 0;
    x2.d = [0];
  }
  return x2;
}
function round(x2, sd, rm) {
  var i, j, k2, n2, rd, doRound, w2, xdi, xd = x2.d;
  for (n2 = 1, k2 = xd[0]; k2 >= 10; k2 /= 10) n2++;
  i = sd - n2;
  if (i < 0) {
    i += LOG_BASE;
    j = sd;
    w2 = xd[xdi = 0];
  } else {
    xdi = Math.ceil((i + 1) / LOG_BASE);
    k2 = xd.length;
    if (xdi >= k2) return x2;
    w2 = k2 = xd[xdi];
    for (n2 = 1; k2 >= 10; k2 /= 10) n2++;
    i %= LOG_BASE;
    j = i - LOG_BASE + n2;
  }
  if (rm !== void 0) {
    k2 = mathpow(10, n2 - j - 1);
    rd = w2 / k2 % 10 | 0;
    doRound = sd < 0 || xd[xdi + 1] !== void 0 || w2 % k2;
    doRound = rm < 4 ? (rd || doRound) && (rm == 0 || rm == (x2.s < 0 ? 3 : 2)) : rd > 5 || rd == 5 && (rm == 4 || doRound || rm == 6 && // Check whether the digit to the left of the rounding digit is odd.
    (i > 0 ? j > 0 ? w2 / mathpow(10, n2 - j) : 0 : xd[xdi - 1]) % 10 & 1 || rm == (x2.s < 0 ? 8 : 7));
  }
  if (sd < 1 || !xd[0]) {
    if (doRound) {
      k2 = getBase10Exponent(x2);
      xd.length = 1;
      sd = sd - k2 - 1;
      xd[0] = mathpow(10, (LOG_BASE - sd % LOG_BASE) % LOG_BASE);
      x2.e = mathfloor(-sd / LOG_BASE) || 0;
    } else {
      xd.length = 1;
      xd[0] = x2.e = x2.s = 0;
    }
    return x2;
  }
  if (i == 0) {
    xd.length = xdi;
    k2 = 1;
    xdi--;
  } else {
    xd.length = xdi + 1;
    k2 = mathpow(10, LOG_BASE - i);
    xd[xdi] = j > 0 ? (w2 / mathpow(10, n2 - j) % mathpow(10, j) | 0) * k2 : 0;
  }
  if (doRound) {
    for (; ; ) {
      if (xdi == 0) {
        if ((xd[0] += k2) == BASE) {
          xd[0] = 1;
          ++x2.e;
        }
        break;
      } else {
        xd[xdi] += k2;
        if (xd[xdi] != BASE) break;
        xd[xdi--] = 0;
        k2 = 1;
      }
    }
  }
  for (i = xd.length; xd[--i] === 0; ) xd.pop();
  if (external && (x2.e > MAX_E || x2.e < -MAX_E)) {
    throw Error(exponentOutOfRange + getBase10Exponent(x2));
  }
  return x2;
}
function subtract(x2, y2) {
  var d2, e3, i, j, k2, len, xd, xe, xLTy, yd, Ctor = x2.constructor, pr = Ctor.precision;
  if (!x2.s || !y2.s) {
    if (y2.s) y2.s = -y2.s;
    else y2 = new Ctor(x2);
    return external ? round(y2, pr) : y2;
  }
  xd = x2.d;
  yd = y2.d;
  e3 = y2.e;
  xe = x2.e;
  xd = xd.slice();
  k2 = xe - e3;
  if (k2) {
    xLTy = k2 < 0;
    if (xLTy) {
      d2 = xd;
      k2 = -k2;
      len = yd.length;
    } else {
      d2 = yd;
      e3 = xe;
      len = xd.length;
    }
    i = Math.max(Math.ceil(pr / LOG_BASE), len) + 2;
    if (k2 > i) {
      k2 = i;
      d2.length = 1;
    }
    d2.reverse();
    for (i = k2; i--; ) d2.push(0);
    d2.reverse();
  } else {
    i = xd.length;
    len = yd.length;
    xLTy = i < len;
    if (xLTy) len = i;
    for (i = 0; i < len; i++) {
      if (xd[i] != yd[i]) {
        xLTy = xd[i] < yd[i];
        break;
      }
    }
    k2 = 0;
  }
  if (xLTy) {
    d2 = xd;
    xd = yd;
    yd = d2;
    y2.s = -y2.s;
  }
  len = xd.length;
  for (i = yd.length - len; i > 0; --i) xd[len++] = 0;
  for (i = yd.length; i > k2; ) {
    if (xd[--i] < yd[i]) {
      for (j = i; j && xd[--j] === 0; ) xd[j] = BASE - 1;
      --xd[j];
      xd[i] += BASE;
    }
    xd[i] -= yd[i];
  }
  for (; xd[--len] === 0; ) xd.pop();
  for (; xd[0] === 0; xd.shift()) --e3;
  if (!xd[0]) return new Ctor(0);
  y2.d = xd;
  y2.e = e3;
  return external ? round(y2, pr) : y2;
}
function toString(x2, isExp, sd) {
  var k2, e3 = getBase10Exponent(x2), str = digitsToString(x2.d), len = str.length;
  if (isExp) {
    if (sd && (k2 = sd - len) > 0) {
      str = str.charAt(0) + "." + str.slice(1) + getZeroString(k2);
    } else if (len > 1) {
      str = str.charAt(0) + "." + str.slice(1);
    }
    str = str + (e3 < 0 ? "e" : "e+") + e3;
  } else if (e3 < 0) {
    str = "0." + getZeroString(-e3 - 1) + str;
    if (sd && (k2 = sd - len) > 0) str += getZeroString(k2);
  } else if (e3 >= len) {
    str += getZeroString(e3 + 1 - len);
    if (sd && (k2 = sd - e3 - 1) > 0) str = str + "." + getZeroString(k2);
  } else {
    if ((k2 = e3 + 1) < len) str = str.slice(0, k2) + "." + str.slice(k2);
    if (sd && (k2 = sd - len) > 0) {
      if (e3 + 1 === len) str += ".";
      str += getZeroString(k2);
    }
  }
  return x2.s < 0 ? "-" + str : str;
}
function truncate(arr, len) {
  if (arr.length > len) {
    arr.length = len;
    return true;
  }
}
function clone(obj) {
  var i, p2, ps;
  function Decimal2(value) {
    var x2 = this;
    if (!(x2 instanceof Decimal2)) return new Decimal2(value);
    x2.constructor = Decimal2;
    if (value instanceof Decimal2) {
      x2.s = value.s;
      x2.e = value.e;
      x2.d = (value = value.d) ? value.slice() : value;
      return;
    }
    if (typeof value === "number") {
      if (value * 0 !== 0) {
        throw Error(invalidArgument + value);
      }
      if (value > 0) {
        x2.s = 1;
      } else if (value < 0) {
        value = -value;
        x2.s = -1;
      } else {
        x2.s = 0;
        x2.e = 0;
        x2.d = [0];
        return;
      }
      if (value === ~~value && value < 1e7) {
        x2.e = 0;
        x2.d = [value];
        return;
      }
      return parseDecimal(x2, value.toString());
    } else if (typeof value !== "string") {
      throw Error(invalidArgument + value);
    }
    if (value.charCodeAt(0) === 45) {
      value = value.slice(1);
      x2.s = -1;
    } else {
      x2.s = 1;
    }
    if (isDecimal.test(value)) parseDecimal(x2, value);
    else throw Error(invalidArgument + value);
  }
  Decimal2.prototype = P;
  Decimal2.ROUND_UP = 0;
  Decimal2.ROUND_DOWN = 1;
  Decimal2.ROUND_CEIL = 2;
  Decimal2.ROUND_FLOOR = 3;
  Decimal2.ROUND_HALF_UP = 4;
  Decimal2.ROUND_HALF_DOWN = 5;
  Decimal2.ROUND_HALF_EVEN = 6;
  Decimal2.ROUND_HALF_CEIL = 7;
  Decimal2.ROUND_HALF_FLOOR = 8;
  Decimal2.clone = clone;
  Decimal2.config = Decimal2.set = config;
  if (obj === void 0) obj = {};
  if (obj) {
    ps = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"];
    for (i = 0; i < ps.length; ) if (!obj.hasOwnProperty(p2 = ps[i++])) obj[p2] = this[p2];
  }
  Decimal2.config(obj);
  return Decimal2;
}
function config(obj) {
  if (!obj || typeof obj !== "object") {
    throw Error(decimalError + "Object expected");
  }
  var i, p2, v2, ps = [
    "precision",
    1,
    MAX_DIGITS,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (i = 0; i < ps.length; i += 3) {
    if ((v2 = obj[p2 = ps[i]]) !== void 0) {
      if (mathfloor(v2) === v2 && v2 >= ps[i + 1] && v2 <= ps[i + 2]) this[p2] = v2;
      else throw Error(invalidArgument + p2 + ": " + v2);
    }
  }
  if ((v2 = obj[p2 = "LN10"]) !== void 0) {
    if (v2 == Math.LN10) this[p2] = new this(v2);
    else throw Error(invalidArgument + p2 + ": " + v2);
  }
  return this;
}
var Decimal = clone(defaults);
ONE = new Decimal(1);
const Decimal$1 = Decimal;
var identity = (i) => i;
var PLACE_HOLDER = {};
var isPlaceHolder = (val) => val === PLACE_HOLDER;
var curry0 = (fn) => function _curried() {
  if (arguments.length === 0 || arguments.length === 1 && isPlaceHolder(arguments.length <= 0 ? void 0 : arguments[0])) {
    return _curried;
  }
  return fn(...arguments);
};
var curryN = (n2, fn) => {
  if (n2 === 1) {
    return fn;
  }
  return curry0(function() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var argsLength = args.filter((arg) => arg !== PLACE_HOLDER).length;
    if (argsLength >= n2) {
      return fn(...args);
    }
    return curryN(n2 - argsLength, curry0(function() {
      for (var _len2 = arguments.length, restArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        restArgs[_key2] = arguments[_key2];
      }
      var newArgs = args.map((arg) => isPlaceHolder(arg) ? restArgs.shift() : arg);
      return fn(...newArgs, ...restArgs);
    }));
  });
};
var curry = (fn) => curryN(fn.length, fn);
var range = (begin, end) => {
  var arr = [];
  for (var i = begin; i < end; ++i) {
    arr[i - begin] = i;
  }
  return arr;
};
var map = curry((fn, arr) => {
  if (Array.isArray(arr)) {
    return arr.map(fn);
  }
  return Object.keys(arr).map((key) => arr[key]).map(fn);
});
var compose = function compose2() {
  for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    args[_key3] = arguments[_key3];
  }
  if (!args.length) {
    return identity;
  }
  var fns = args.reverse();
  var firstFn = fns[0];
  var tailsFn = fns.slice(1);
  return function() {
    return tailsFn.reduce((res, fn) => fn(res), firstFn(...arguments));
  };
};
var reverse = (arr) => {
  if (Array.isArray(arr)) {
    return arr.reverse();
  }
  return arr.split("").reverse().join("");
};
var memoize = (fn) => {
  var lastArgs = null;
  var lastResult2 = null;
  return function() {
    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }
    if (lastArgs && args.every((val, i) => {
      var _lastArgs;
      return val === ((_lastArgs = lastArgs) === null || _lastArgs === void 0 ? void 0 : _lastArgs[i]);
    })) {
      return lastResult2;
    }
    lastArgs = args;
    lastResult2 = fn(...args);
    return lastResult2;
  };
};
function getDigitCount(value) {
  var result;
  if (value === 0) {
    result = 1;
  } else {
    result = Math.floor(new Decimal$1(value).abs().log(10).toNumber()) + 1;
  }
  return result;
}
function rangeStep(start, end, step) {
  var num = new Decimal$1(start);
  var i = 0;
  var result = [];
  while (num.lt(end) && i < 1e5) {
    result.push(num.toNumber());
    num = num.add(step);
    i++;
  }
  return result;
}
curry((a2, b2, t2) => {
  var newA = +a2;
  var newB = +b2;
  return newA + t2 * (newB - newA);
});
curry((a2, b2, x2) => {
  var diff = b2 - +a2;
  diff = diff || Infinity;
  return (x2 - a2) / diff;
});
curry((a2, b2, x2) => {
  var diff = b2 - +a2;
  diff = diff || Infinity;
  return Math.max(0, Math.min(1, (x2 - a2) / diff));
});
var getValidInterval = (_ref2) => {
  var [min2, max2] = _ref2;
  var [validMin, validMax] = [min2, max2];
  if (min2 > max2) {
    [validMin, validMax] = [max2, min2];
  }
  return [validMin, validMax];
};
var getFormatStep = (roughStep, allowDecimals, correctionFactor) => {
  if (roughStep.lte(0)) {
    return new Decimal$1(0);
  }
  var digitCount = getDigitCount(roughStep.toNumber());
  var digitCountValue = new Decimal$1(10).pow(digitCount);
  var stepRatio = roughStep.div(digitCountValue);
  var stepRatioScale = digitCount !== 1 ? 0.05 : 0.1;
  var amendStepRatio = new Decimal$1(Math.ceil(stepRatio.div(stepRatioScale).toNumber())).add(correctionFactor).mul(stepRatioScale);
  var formatStep = amendStepRatio.mul(digitCountValue);
  return allowDecimals ? new Decimal$1(formatStep.toNumber()) : new Decimal$1(Math.ceil(formatStep.toNumber()));
};
var getTickOfSingleValue = (value, tickCount, allowDecimals) => {
  var step = new Decimal$1(1);
  var middle = new Decimal$1(value);
  if (!middle.isint() && allowDecimals) {
    var absVal = Math.abs(value);
    if (absVal < 1) {
      step = new Decimal$1(10).pow(getDigitCount(value) - 1);
      middle = new Decimal$1(Math.floor(middle.div(step).toNumber())).mul(step);
    } else if (absVal > 1) {
      middle = new Decimal$1(Math.floor(value));
    }
  } else if (value === 0) {
    middle = new Decimal$1(Math.floor((tickCount - 1) / 2));
  } else if (!allowDecimals) {
    middle = new Decimal$1(Math.floor(value));
  }
  var middleIndex = Math.floor((tickCount - 1) / 2);
  var fn = compose(map((n2) => middle.add(new Decimal$1(n2 - middleIndex).mul(step)).toNumber()), range);
  return fn(0, tickCount);
};
var _calculateStep = function calculateStep(min2, max2, tickCount, allowDecimals) {
  var correctionFactor = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0;
  if (!Number.isFinite((max2 - min2) / (tickCount - 1))) {
    return {
      step: new Decimal$1(0),
      tickMin: new Decimal$1(0),
      tickMax: new Decimal$1(0)
    };
  }
  var step = getFormatStep(new Decimal$1(max2).sub(min2).div(tickCount - 1), allowDecimals, correctionFactor);
  var middle;
  if (min2 <= 0 && max2 >= 0) {
    middle = new Decimal$1(0);
  } else {
    middle = new Decimal$1(min2).add(max2).div(2);
    middle = middle.sub(new Decimal$1(middle).mod(step));
  }
  var belowCount = Math.ceil(middle.sub(min2).div(step).toNumber());
  var upCount = Math.ceil(new Decimal$1(max2).sub(middle).div(step).toNumber());
  var scaleCount = belowCount + upCount + 1;
  if (scaleCount > tickCount) {
    return _calculateStep(min2, max2, tickCount, allowDecimals, correctionFactor + 1);
  }
  if (scaleCount < tickCount) {
    upCount = max2 > 0 ? upCount + (tickCount - scaleCount) : upCount;
    belowCount = max2 > 0 ? belowCount : belowCount + (tickCount - scaleCount);
  }
  return {
    step,
    tickMin: middle.sub(new Decimal$1(belowCount).mul(step)),
    tickMax: middle.add(new Decimal$1(upCount).mul(step))
  };
};
function getNiceTickValuesFn(_ref2) {
  var [min2, max2] = _ref2;
  var tickCount = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6;
  var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var count = Math.max(tickCount, 2);
  var [cormin, cormax] = getValidInterval([min2, max2]);
  if (cormin === -Infinity || cormax === Infinity) {
    var _values = cormax === Infinity ? [cormin, ...range(0, tickCount - 1).map(() => Infinity)] : [...range(0, tickCount - 1).map(() => -Infinity), cormax];
    return min2 > max2 ? reverse(_values) : _values;
  }
  if (cormin === cormax) {
    return getTickOfSingleValue(cormin, tickCount, allowDecimals);
  }
  var {
    step,
    tickMin,
    tickMax
  } = _calculateStep(cormin, cormax, count, allowDecimals, 0);
  var values = rangeStep(tickMin, tickMax.add(new Decimal$1(0.1).mul(step)), step);
  return min2 > max2 ? reverse(values) : values;
}
function getTickValuesFixedDomainFn(_ref3, tickCount) {
  var [min2, max2] = _ref3;
  var allowDecimals = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : true;
  var [cormin, cormax] = getValidInterval([min2, max2]);
  if (cormin === -Infinity || cormax === Infinity) {
    return [min2, max2];
  }
  if (cormin === cormax) {
    return [cormin];
  }
  var count = Math.max(tickCount, 2);
  var step = getFormatStep(new Decimal$1(cormax).sub(cormin).div(count - 1), allowDecimals, 0);
  var values = [...rangeStep(new Decimal$1(cormin), new Decimal$1(cormax), step), cormax];
  if (allowDecimals === false) {
    values = values.map((value) => Math.round(value));
  }
  return min2 > max2 ? reverse(values) : values;
}
var getNiceTickValues = memoize(getNiceTickValuesFn);
var getTickValuesFixedDomain = memoize(getTickValuesFixedDomainFn);
var selectRootMaxBarSize = (state) => state.rootProps.maxBarSize;
var selectBarGap = (state) => state.rootProps.barGap;
var selectBarCategoryGap = (state) => state.rootProps.barCategoryGap;
var selectRootBarSize = (state) => state.rootProps.barSize;
var selectStackOffsetType = (state) => state.rootProps.stackOffset;
var selectChartName = (state) => state.options.chartName;
var selectSyncId = (state) => state.rootProps.syncId;
var selectSyncMethod = (state) => state.rootProps.syncMethod;
var selectEventEmitter = (state) => state.options.eventEmitter;
var defaultPolarAngleAxisProps = {
  allowDuplicatedCategory: true,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  angleAxisId: 0,
  reversed: false,
  scale: "auto",
  tick: true,
  type: "category"
};
var defaultPolarRadiusAxisProps = {
  allowDataOverflow: false,
  allowDuplicatedCategory: true,
  radiusAxisId: 0,
  scale: "auto",
  tick: true,
  tickCount: 5,
  type: "number"
};
var combineAxisRangeWithReverse = (axisSettings, axisRange) => {
  if (!axisSettings || !axisRange) {
    return void 0;
  }
  if (axisSettings !== null && axisSettings !== void 0 && axisSettings.reversed) {
    return [axisRange[1], axisRange[0]];
  }
  return axisRange;
};
var implicitAngleAxis = {
  allowDataOverflow: false,
  allowDecimals: false,
  allowDuplicatedCategory: false,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarAngleAxisProps.angleAxisId,
  includeHidden: false,
  name: void 0,
  reversed: defaultPolarAngleAxisProps.reversed,
  scale: defaultPolarAngleAxisProps.scale,
  tick: defaultPolarAngleAxisProps.tick,
  tickCount: void 0,
  ticks: void 0,
  type: defaultPolarAngleAxisProps.type,
  unit: void 0
};
var implicitRadiusAxis = {
  allowDataOverflow: defaultPolarRadiusAxisProps.allowDataOverflow,
  allowDecimals: false,
  allowDuplicatedCategory: defaultPolarRadiusAxisProps.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarRadiusAxisProps.radiusAxisId,
  includeHidden: false,
  name: void 0,
  reversed: false,
  scale: defaultPolarRadiusAxisProps.scale,
  tick: defaultPolarRadiusAxisProps.tick,
  tickCount: defaultPolarRadiusAxisProps.tickCount,
  ticks: void 0,
  type: defaultPolarRadiusAxisProps.type,
  unit: void 0
};
var implicitRadialBarAngleAxis = {
  allowDataOverflow: false,
  allowDecimals: false,
  allowDuplicatedCategory: defaultPolarAngleAxisProps.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarAngleAxisProps.angleAxisId,
  includeHidden: false,
  name: void 0,
  reversed: false,
  scale: defaultPolarAngleAxisProps.scale,
  tick: defaultPolarAngleAxisProps.tick,
  tickCount: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0
};
var implicitRadialBarRadiusAxis = {
  allowDataOverflow: defaultPolarRadiusAxisProps.allowDataOverflow,
  allowDecimals: false,
  allowDuplicatedCategory: defaultPolarRadiusAxisProps.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: defaultPolarRadiusAxisProps.radiusAxisId,
  includeHidden: false,
  name: void 0,
  reversed: false,
  scale: defaultPolarRadiusAxisProps.scale,
  tick: defaultPolarRadiusAxisProps.tick,
  tickCount: defaultPolarRadiusAxisProps.tickCount,
  ticks: void 0,
  type: "category",
  unit: void 0
};
var selectAngleAxis = (state, angleAxisId) => {
  if (state.polarAxis.angleAxis[angleAxisId] != null) {
    return state.polarAxis.angleAxis[angleAxisId];
  }
  if (state.layout.layoutType === "radial") {
    return implicitRadialBarAngleAxis;
  }
  return implicitAngleAxis;
};
var selectRadiusAxis = (state, radiusAxisId) => {
  if (state.polarAxis.radiusAxis[radiusAxisId] != null) {
    return state.polarAxis.radiusAxis[radiusAxisId];
  }
  if (state.layout.layoutType === "radial") {
    return implicitRadialBarRadiusAxis;
  }
  return implicitRadiusAxis;
};
var selectPolarOptions = (state) => state.polarOptions;
var selectMaxRadius = createSelector([selectChartWidth, selectChartHeight, selectChartOffsetInternal], getMaxRadius);
var selectInnerRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
  if (polarChartOptions == null) {
    return void 0;
  }
  return getPercentValue(polarChartOptions.innerRadius, maxRadius, 0);
});
var selectOuterRadius = createSelector([selectPolarOptions, selectMaxRadius], (polarChartOptions, maxRadius) => {
  if (polarChartOptions == null) {
    return void 0;
  }
  return getPercentValue(polarChartOptions.outerRadius, maxRadius, maxRadius * 0.8);
});
var combineAngleAxisRange = (polarOptions) => {
  if (polarOptions == null) {
    return [0, 0];
  }
  var {
    startAngle,
    endAngle
  } = polarOptions;
  return [startAngle, endAngle];
};
var selectAngleAxisRange = createSelector([selectPolarOptions], combineAngleAxisRange);
createSelector([selectAngleAxis, selectAngleAxisRange], combineAxisRangeWithReverse);
var selectRadiusAxisRange = createSelector([selectMaxRadius, selectInnerRadius, selectOuterRadius], (maxRadius, innerRadius, outerRadius) => {
  if (maxRadius == null || innerRadius == null || outerRadius == null) {
    return void 0;
  }
  return [innerRadius, outerRadius];
});
createSelector([selectRadiusAxis, selectRadiusAxisRange], combineAxisRangeWithReverse);
var selectPolarViewBox = createSelector([selectChartLayout, selectPolarOptions, selectInnerRadius, selectOuterRadius, selectChartWidth, selectChartHeight], (layout, polarOptions, innerRadius, outerRadius, width, height) => {
  if (layout !== "centric" && layout !== "radial" || polarOptions == null || innerRadius == null || outerRadius == null) {
    return void 0;
  }
  var {
    cx,
    cy,
    startAngle,
    endAngle
  } = polarOptions;
  return {
    cx: getPercentValue(cx, width, width / 2),
    cy: getPercentValue(cy, height, height / 2),
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise: false
    // this property look useful, why not use it?
  };
});
var pickAxisType = (_state, axisType) => axisType;
var pickAxisId = (_state, _axisType, axisId) => axisId;
function getStackSeriesIdentifier(graphicalItem) {
  return graphicalItem === null || graphicalItem === void 0 ? void 0 : graphicalItem.id;
}
var selectTooltipAxisType = (state) => {
  var layout = selectChartLayout(state);
  if (layout === "horizontal") {
    return "xAxis";
  }
  if (layout === "vertical") {
    return "yAxis";
  }
  if (layout === "centric") {
    return "angleAxis";
  }
  return "radiusAxis";
};
var selectTooltipAxisId = (state) => state.tooltip.settings.axisId;
var selectTooltipAxis = (state) => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  return selectAxisSettings(state, axisType, axisId);
};
var selectTooltipAxisDataKey = createSelector([selectTooltipAxis], (axis) => axis === null || axis === void 0 ? void 0 : axis.dataKey);
function combineDisplayedStackedData(stackedGraphicalItems, _ref2, tooltipAxisSettings) {
  var {
    chartData = []
  } = _ref2;
  var {
    allowDuplicatedCategory,
    dataKey: tooltipDataKey
  } = tooltipAxisSettings;
  var knownItemsByDataKey = /* @__PURE__ */ new Map();
  stackedGraphicalItems.forEach((item) => {
    var _item$data;
    var resolvedData = (_item$data = item.data) !== null && _item$data !== void 0 ? _item$data : chartData;
    if (resolvedData == null || resolvedData.length === 0) {
      return;
    }
    var stackIdentifier = getStackSeriesIdentifier(item);
    resolvedData.forEach((entry, index) => {
      var tooltipValue = tooltipDataKey == null || allowDuplicatedCategory ? index : String(getValueByDataKey(entry, tooltipDataKey, null));
      var numericValue = getValueByDataKey(entry, item.dataKey, 0);
      var curr;
      if (knownItemsByDataKey.has(tooltipValue)) {
        curr = knownItemsByDataKey.get(tooltipValue);
      } else {
        curr = {};
      }
      Object.assign(curr, {
        [stackIdentifier]: numericValue
      });
      knownItemsByDataKey.set(tooltipValue, curr);
    });
  });
  return Array.from(knownItemsByDataKey.values());
}
function isStacked(graphicalItem) {
  return graphicalItem.stackId != null && graphicalItem.dataKey != null;
}
function ownKeys$l(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$l(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$l(Object(t2), true).forEach(function(r3) {
      _defineProperty$p(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$l(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$p(e3, r2, t2) {
  return (r2 = _toPropertyKey$p(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$p(t2) {
  var i = _toPrimitive$p(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$p(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var defaultNumericDomain = [0, "auto"];
var implicitXAxis = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  angle: 0,
  dataKey: void 0,
  domain: void 0,
  height: 30,
  hide: true,
  id: 0,
  includeHidden: false,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: false,
  name: void 0,
  orientation: "bottom",
  padding: {
    left: 0,
    right: 0
  },
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "category",
  unit: void 0
};
var selectXAxisSettingsNoDefaults = (state, axisId) => {
  return state.cartesianAxis.xAxis[axisId];
};
var selectXAxisSettings = (state, axisId) => {
  var axis = selectXAxisSettingsNoDefaults(state, axisId);
  if (axis == null) {
    return implicitXAxis;
  }
  return axis;
};
var implicitYAxis = {
  allowDataOverflow: false,
  allowDecimals: true,
  allowDuplicatedCategory: true,
  angle: 0,
  dataKey: void 0,
  domain: defaultNumericDomain,
  hide: true,
  id: 0,
  includeHidden: false,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: false,
  name: void 0,
  orientation: "left",
  padding: {
    top: 0,
    bottom: 0
  },
  reversed: false,
  scale: "auto",
  tick: true,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0,
  width: DEFAULT_Y_AXIS_WIDTH
};
var selectYAxisSettingsNoDefaults = (state, axisId) => {
  return state.cartesianAxis.yAxis[axisId];
};
var selectYAxisSettings = (state, axisId) => {
  var axis = selectYAxisSettingsNoDefaults(state, axisId);
  if (axis == null) {
    return implicitYAxis;
  }
  return axis;
};
var implicitZAxis = {
  domain: [0, "auto"],
  includeHidden: false,
  reversed: false,
  allowDataOverflow: false,
  allowDuplicatedCategory: false,
  dataKey: void 0,
  id: 0,
  name: "",
  range: [64, 64],
  scale: "auto",
  type: "number",
  unit: ""
};
var selectZAxisSettings = (state, axisId) => {
  var axis = state.cartesianAxis.zAxis[axisId];
  if (axis == null) {
    return implicitZAxis;
  }
  return axis;
};
var selectBaseAxis = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    case "zAxis": {
      return selectZAxisSettings(state, axisId);
    }
    case "angleAxis": {
      return selectAngleAxis(state, axisId);
    }
    case "radiusAxis": {
      return selectRadiusAxis(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectCartesianAxisSettings = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectAxisSettings = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSettings(state, axisId);
    }
    case "yAxis": {
      return selectYAxisSettings(state, axisId);
    }
    case "angleAxis": {
      return selectAngleAxis(state, axisId);
    }
    case "radiusAxis": {
      return selectRadiusAxis(state, axisId);
    }
    default:
      throw new Error("Unexpected axis type: ".concat(axisType));
  }
};
var selectHasBar = (state) => state.graphicalItems.cartesianItems.some((item) => item.type === "bar") || state.graphicalItems.polarItems.some((item) => item.type === "radialBar");
function itemAxisPredicate(axisType, axisId) {
  return (item) => {
    switch (axisType) {
      case "xAxis":
        return "xAxisId" in item && item.xAxisId === axisId;
      case "yAxis":
        return "yAxisId" in item && item.yAxisId === axisId;
      case "zAxis":
        return "zAxisId" in item && item.zAxisId === axisId;
      case "angleAxis":
        return "angleAxisId" in item && item.angleAxisId === axisId;
      case "radiusAxis":
        return "radiusAxisId" in item && item.radiusAxisId === axisId;
      default:
        return false;
    }
  };
}
var selectUnfilteredCartesianItems = (state) => state.graphicalItems.cartesianItems;
var selectAxisPredicate = createSelector([pickAxisType, pickAxisId], itemAxisPredicate);
var combineGraphicalItemsSettings = (graphicalItems, axisSettings, axisPredicate) => graphicalItems.filter(axisPredicate).filter((item) => {
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.includeHidden) === true) {
    return true;
  }
  return !item.hide;
});
var selectCartesianItemsSettings = createSelector([selectUnfilteredCartesianItems, selectBaseAxis, selectAxisPredicate], combineGraphicalItemsSettings);
var selectStackedCartesianItemsSettings = createSelector([selectCartesianItemsSettings], (cartesianItems) => {
  return cartesianItems.filter((item) => item.type === "area" || item.type === "bar").filter(isStacked);
});
var filterGraphicalNotStackedItems = (cartesianItems) => cartesianItems.filter((item) => !("stackId" in item) || item.stackId === void 0);
var selectCartesianItemsSettingsExceptStacked = createSelector([selectCartesianItemsSettings], filterGraphicalNotStackedItems);
var combineGraphicalItemsData = (cartesianItems) => cartesianItems.map((item) => item.data).filter(Boolean).flat(1);
var selectCartesianGraphicalItemsData = createSelector([selectCartesianItemsSettings], combineGraphicalItemsData);
var combineDisplayedData = (graphicalItemsData, _ref2) => {
  var {
    chartData = [],
    dataStartIndex,
    dataEndIndex
  } = _ref2;
  if (graphicalItemsData.length > 0) {
    return graphicalItemsData;
  }
  return chartData.slice(dataStartIndex, dataEndIndex + 1);
};
var selectDisplayedData = createSelector([selectCartesianGraphicalItemsData, selectChartDataWithIndexesIfNotInPanorama], combineDisplayedData);
var combineAppliedValues = (data, axisSettings, items) => {
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) {
    return data.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey)
    }));
  }
  if (items.length > 0) {
    return items.map((item) => item.dataKey).flatMap((dataKey) => data.map((entry) => ({
      value: getValueByDataKey(entry, dataKey)
    })));
  }
  return data.map((entry) => ({
    value: entry
  }));
};
var selectAllAppliedValues = createSelector([selectDisplayedData, selectBaseAxis, selectCartesianItemsSettings], combineAppliedValues);
function isErrorBarRelevantForAxisType(axisType, errorBar) {
  switch (axisType) {
    case "xAxis":
      return errorBar.direction === "x";
    case "yAxis":
      return errorBar.direction === "y";
    default:
      return false;
  }
}
function onlyAllowNumbers(data) {
  return data.filter((v2) => isNumOrStr(v2) || v2 instanceof Date).map(Number).filter((n2) => isNan(n2) === false);
}
function getErrorDomainByDataKey(entry, appliedValue, relevantErrorBars) {
  if (!relevantErrorBars || typeof appliedValue !== "number" || isNan(appliedValue)) {
    return [];
  }
  if (!relevantErrorBars.length) {
    return [];
  }
  return onlyAllowNumbers(relevantErrorBars.flatMap((eb) => {
    var errorValue = getValueByDataKey(entry, eb.dataKey);
    var lowBound, highBound;
    if (Array.isArray(errorValue)) {
      [lowBound, highBound] = errorValue;
    } else {
      lowBound = highBound = errorValue;
    }
    if (!isWellBehavedNumber(lowBound) || !isWellBehavedNumber(highBound)) {
      return void 0;
    }
    return [appliedValue - lowBound, appliedValue + highBound];
  }));
}
var selectDisplayedStackedData = createSelector([selectStackedCartesianItemsSettings, selectChartDataWithIndexesIfNotInPanorama, selectTooltipAxis], combineDisplayedStackedData);
var combineStackGroups = (displayedData, items, stackOffsetType) => {
  var initialItemsGroups = {};
  var itemsGroup = items.reduce((acc, item) => {
    if (item.stackId == null) {
      return acc;
    }
    if (acc[item.stackId] == null) {
      acc[item.stackId] = [];
    }
    acc[item.stackId].push(item);
    return acc;
  }, initialItemsGroups);
  return Object.fromEntries(Object.entries(itemsGroup).map((_ref2) => {
    var [stackId, graphicalItems] = _ref2;
    var dataKeys = graphicalItems.map(getStackSeriesIdentifier);
    return [stackId, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: getStackedData(displayedData, dataKeys, stackOffsetType),
      graphicalItems
    }];
  }));
};
var selectStackGroups = createSelector([selectDisplayedStackedData, selectStackedCartesianItemsSettings, selectStackOffsetType], combineStackGroups);
var combineDomainOfStackGroups = (stackGroups, _ref3, axisType) => {
  var {
    dataStartIndex,
    dataEndIndex
  } = _ref3;
  if (axisType === "zAxis") {
    return void 0;
  }
  var domainOfStackGroups = getDomainOfStackGroups(stackGroups, dataStartIndex, dataEndIndex);
  if (domainOfStackGroups != null && domainOfStackGroups[0] === 0 && domainOfStackGroups[1] === 0) {
    return void 0;
  }
  return domainOfStackGroups;
};
var selectDomainOfStackGroups = createSelector([selectStackGroups, selectChartDataWithIndexes, pickAxisType], combineDomainOfStackGroups);
var combineAppliedNumericalValuesIncludingErrorValues = (data, axisSettings, items, errorBars, axisType) => {
  if (items.length > 0) {
    return data.flatMap((entry) => {
      return items.flatMap((item) => {
        var _errorBars$item$id, _axisSettings$dataKey;
        var relevantErrorBars = (_errorBars$item$id = errorBars[item.id]) === null || _errorBars$item$id === void 0 ? void 0 : _errorBars$item$id.filter((errorBar) => isErrorBarRelevantForAxisType(axisType, errorBar));
        var valueByDataKey = getValueByDataKey(entry, (_axisSettings$dataKey = axisSettings.dataKey) !== null && _axisSettings$dataKey !== void 0 ? _axisSettings$dataKey : item.dataKey);
        return {
          value: valueByDataKey,
          errorDomain: getErrorDomainByDataKey(entry, valueByDataKey, relevantErrorBars)
        };
      });
    }).filter(Boolean);
  }
  if ((axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.dataKey) != null) {
    return data.map((item) => ({
      value: getValueByDataKey(item, axisSettings.dataKey),
      errorDomain: []
    }));
  }
  return data.map((entry) => ({
    value: entry,
    errorDomain: []
  }));
};
var selectAllErrorBarSettings = (state) => state.errorBars;
var combineRelevantErrorBarSettings = (cartesianItemsSettings, allErrorBarSettings, axisType) => {
  return cartesianItemsSettings.flatMap((item) => {
    return allErrorBarSettings[item.id];
  }).filter(Boolean).filter((e3) => {
    return isErrorBarRelevantForAxisType(axisType, e3);
  });
};
createSelector([selectCartesianItemsSettingsExceptStacked, selectAllErrorBarSettings, pickAxisType], combineRelevantErrorBarSettings);
var selectAllAppliedNumericalValuesIncludingErrorValues = createSelector([selectDisplayedData, selectBaseAxis, selectCartesianItemsSettingsExceptStacked, selectAllErrorBarSettings, pickAxisType], combineAppliedNumericalValuesIncludingErrorValues);
function onlyAllowNumbersAndStringsAndDates(item) {
  var {
    value
  } = item;
  if (isNumOrStr(value) || value instanceof Date) {
    return value;
  }
  return void 0;
}
var computeNumericalDomain = (dataWithErrorDomains) => {
  var allDataSquished = dataWithErrorDomains.flatMap((d2) => [d2.value, d2.errorDomain]).flat(1);
  var onlyNumbers = onlyAllowNumbers(allDataSquished);
  if (onlyNumbers.length === 0) {
    return void 0;
  }
  return [Math.min(...onlyNumbers), Math.max(...onlyNumbers)];
};
var computeDomainOfTypeCategory = (allDataSquished, axisSettings, isCategorical) => {
  var categoricalDomain = allDataSquished.map(onlyAllowNumbersAndStringsAndDates).filter((v2) => v2 != null);
  if (isCategorical && (axisSettings.dataKey == null || axisSettings.allowDuplicatedCategory && hasDuplicate(categoricalDomain))) {
    return range$3(0, allDataSquished.length);
  }
  if (axisSettings.allowDuplicatedCategory) {
    return categoricalDomain;
  }
  return Array.from(new Set(categoricalDomain));
};
var getDomainDefinition = (axisSettings) => {
  var _axisSettings$domain;
  if (axisSettings == null || !("domain" in axisSettings)) {
    return defaultNumericDomain;
  }
  if (axisSettings.domain != null) {
    return axisSettings.domain;
  }
  if (axisSettings.ticks != null) {
    if (axisSettings.type === "number") {
      var allValues = onlyAllowNumbers(axisSettings.ticks);
      return [Math.min(...allValues), Math.max(...allValues)];
    }
    if (axisSettings.type === "category") {
      return axisSettings.ticks.map(String);
    }
  }
  return (_axisSettings$domain = axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.domain) !== null && _axisSettings$domain !== void 0 ? _axisSettings$domain : defaultNumericDomain;
};
var mergeDomains = function mergeDomains2() {
  for (var _len = arguments.length, domains = new Array(_len), _key = 0; _key < _len; _key++) {
    domains[_key] = arguments[_key];
  }
  var allDomains = domains.filter(Boolean);
  if (allDomains.length === 0) {
    return void 0;
  }
  var allValues = allDomains.flat();
  var min2 = Math.min(...allValues);
  var max2 = Math.max(...allValues);
  return [min2, max2];
};
var selectReferenceDots = (state) => state.referenceElements.dots;
var filterReferenceElements = (elements, axisType, axisId) => {
  return elements.filter((el) => el.ifOverflow === "extendDomain").filter((el) => {
    if (axisType === "xAxis") {
      return el.xAxisId === axisId;
    }
    return el.yAxisId === axisId;
  });
};
var selectReferenceDotsByAxis = createSelector([selectReferenceDots, pickAxisType, pickAxisId], filterReferenceElements);
var selectReferenceAreas = (state) => state.referenceElements.areas;
var selectReferenceAreasByAxis = createSelector([selectReferenceAreas, pickAxisType, pickAxisId], filterReferenceElements);
var selectReferenceLines = (state) => state.referenceElements.lines;
var selectReferenceLinesByAxis = createSelector([selectReferenceLines, pickAxisType, pickAxisId], filterReferenceElements);
var combineDotsDomain = (dots, axisType) => {
  var allCoords = onlyAllowNumbers(dots.map((dot) => axisType === "xAxis" ? dot.x : dot.y));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceDotsDomain = createSelector(selectReferenceDotsByAxis, pickAxisType, combineDotsDomain);
var combineAreasDomain = (areas, axisType) => {
  var allCoords = onlyAllowNumbers(areas.flatMap((area) => [axisType === "xAxis" ? area.x1 : area.y1, axisType === "xAxis" ? area.x2 : area.y2]));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceAreasDomain = createSelector([selectReferenceAreasByAxis, pickAxisType], combineAreasDomain);
var combineLinesDomain = (lines, axisType) => {
  var allCoords = onlyAllowNumbers(lines.map((line) => axisType === "xAxis" ? line.x : line.y));
  if (allCoords.length === 0) {
    return void 0;
  }
  return [Math.min(...allCoords), Math.max(...allCoords)];
};
var selectReferenceLinesDomain = createSelector(selectReferenceLinesByAxis, pickAxisType, combineLinesDomain);
var selectReferenceElementsDomain = createSelector(selectReferenceDotsDomain, selectReferenceLinesDomain, selectReferenceAreasDomain, (dotsDomain, linesDomain, areasDomain) => {
  return mergeDomains(dotsDomain, areasDomain, linesDomain);
});
var selectDomainDefinition = createSelector([selectBaseAxis], getDomainDefinition);
var combineNumericalDomain = (axisSettings, domainDefinition, domainOfStackGroups, allDataWithErrorDomains, referenceElementsDomain, layout, axisType) => {
  var domainFromUserPreference = numericalDomainSpecifiedWithoutRequiringData(domainDefinition, axisSettings.allowDataOverflow);
  if (domainFromUserPreference != null) {
    return domainFromUserPreference;
  }
  var shouldIncludeDomainOfStackGroups = layout === "vertical" && axisType === "xAxis" || layout === "horizontal" && axisType === "yAxis";
  var mergedDomains = shouldIncludeDomainOfStackGroups ? mergeDomains(domainOfStackGroups, referenceElementsDomain, computeNumericalDomain(allDataWithErrorDomains)) : mergeDomains(referenceElementsDomain, computeNumericalDomain(allDataWithErrorDomains));
  return parseNumericalUserDomain(domainDefinition, mergedDomains, axisSettings.allowDataOverflow);
};
var selectNumericalDomain = createSelector([selectBaseAxis, selectDomainDefinition, selectDomainOfStackGroups, selectAllAppliedNumericalValuesIncludingErrorValues, selectReferenceElementsDomain, selectChartLayout, pickAxisType], combineNumericalDomain);
var expandDomain = [0, 1];
var combineAxisDomain = (axisSettings, layout, displayedData, allAppliedValues, stackOffsetType, axisType, numericalDomain) => {
  if ((axisSettings == null || displayedData == null || displayedData.length === 0) && numericalDomain === void 0) {
    return void 0;
  }
  var {
    dataKey,
    type
  } = axisSettings;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (isCategorical && dataKey == null) {
    return range$3(0, displayedData.length);
  }
  if (type === "category") {
    return computeDomainOfTypeCategory(allAppliedValues, axisSettings, isCategorical);
  }
  if (stackOffsetType === "expand") {
    return expandDomain;
  }
  return numericalDomain;
};
var selectAxisDomain = createSelector([selectBaseAxis, selectChartLayout, selectDisplayedData, selectAllAppliedValues, selectStackOffsetType, pickAxisType, selectNumericalDomain], combineAxisDomain);
var combineRealScaleType = (axisConfig, layout, hasBar, chartType, axisType) => {
  if (axisConfig == null) {
    return void 0;
  }
  var {
    scale,
    type
  } = axisConfig;
  if (scale === "auto") {
    if (layout === "radial" && axisType === "radiusAxis") {
      return "band";
    }
    if (layout === "radial" && axisType === "angleAxis") {
      return "linear";
    }
    if (type === "category" && chartType && (chartType.indexOf("LineChart") >= 0 || chartType.indexOf("AreaChart") >= 0 || chartType.indexOf("ComposedChart") >= 0 && !hasBar)) {
      return "point";
    }
    if (type === "category") {
      return "band";
    }
    return "linear";
  }
  if (typeof scale === "string") {
    var name = "scale".concat(upperFirst(scale));
    return name in d3Scales ? name : "point";
  }
  return void 0;
};
var selectRealScaleType = createSelector([selectBaseAxis, selectChartLayout, selectHasBar, selectChartName, pickAxisType], combineRealScaleType);
function getD3ScaleFromType(realScaleType) {
  if (realScaleType == null) {
    return void 0;
  }
  if (realScaleType in d3Scales) {
    return d3Scales[realScaleType]();
  }
  var name = "scale".concat(upperFirst(realScaleType));
  if (name in d3Scales) {
    return d3Scales[name]();
  }
  return void 0;
}
function combineScaleFunction(axis, realScaleType, axisDomain, axisRange) {
  if (axisDomain == null || axisRange == null) {
    return void 0;
  }
  if (typeof axis.scale === "function") {
    return axis.scale.copy().domain(axisDomain).range(axisRange);
  }
  var d3ScaleFunction = getD3ScaleFromType(realScaleType);
  if (d3ScaleFunction == null) {
    return void 0;
  }
  var scale = d3ScaleFunction.domain(axisDomain).range(axisRange);
  checkDomainOfScale(scale);
  return scale;
}
var combineNiceTicks = (axisDomain, axisSettings, realScaleType) => {
  var domainDefinition = getDomainDefinition(axisSettings);
  if (realScaleType !== "auto" && realScaleType !== "linear") {
    return void 0;
  }
  if (axisSettings != null && axisSettings.tickCount && Array.isArray(domainDefinition) && (domainDefinition[0] === "auto" || domainDefinition[1] === "auto") && isWellFormedNumberDomain(axisDomain)) {
    return getNiceTickValues(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals);
  }
  if (axisSettings != null && axisSettings.tickCount && axisSettings.type === "number" && isWellFormedNumberDomain(axisDomain)) {
    return getTickValuesFixedDomain(axisDomain, axisSettings.tickCount, axisSettings.allowDecimals);
  }
  return void 0;
};
var selectNiceTicks = createSelector([selectAxisDomain, selectAxisSettings, selectRealScaleType], combineNiceTicks);
var combineAxisDomainWithNiceTicks = (axisSettings, domain, niceTicks, axisType) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    axisType !== "angleAxis" && (axisSettings === null || axisSettings === void 0 ? void 0 : axisSettings.type) === "number" && isWellFormedNumberDomain(domain) && Array.isArray(niceTicks) && niceTicks.length > 0
  ) {
    var minFromDomain = domain[0];
    var minFromTicks = niceTicks[0];
    var maxFromDomain = domain[1];
    var maxFromTicks = niceTicks[niceTicks.length - 1];
    return [Math.min(minFromDomain, minFromTicks), Math.max(maxFromDomain, maxFromTicks)];
  }
  return domain;
};
var selectAxisDomainIncludingNiceTicks = createSelector([selectBaseAxis, selectAxisDomain, selectNiceTicks, pickAxisType], combineAxisDomainWithNiceTicks);
var selectSmallestDistanceBetweenValues = createSelector(selectAllAppliedValues, selectBaseAxis, (allDataSquished, axisSettings) => {
  if (!axisSettings || axisSettings.type !== "number") {
    return void 0;
  }
  var smallestDistanceBetweenValues = Infinity;
  var sortedValues = Array.from(onlyAllowNumbers(allDataSquished.map((d2) => d2.value))).sort((a2, b2) => a2 - b2);
  if (sortedValues.length < 2) {
    return Infinity;
  }
  var diff = sortedValues[sortedValues.length - 1] - sortedValues[0];
  if (diff === 0) {
    return Infinity;
  }
  for (var i = 0; i < sortedValues.length - 1; i++) {
    var distance = sortedValues[i + 1] - sortedValues[i];
    smallestDistanceBetweenValues = Math.min(smallestDistanceBetweenValues, distance);
  }
  return smallestDistanceBetweenValues / diff;
});
var selectCalculatedPadding = createSelector(selectSmallestDistanceBetweenValues, selectChartLayout, selectBarCategoryGap, selectChartOffsetInternal, (_1, _2, _3, padding) => padding, (smallestDistanceInPercent, layout, barCategoryGap, offset, padding) => {
  if (!isWellBehavedNumber(smallestDistanceInPercent)) {
    return 0;
  }
  var rangeWidth = layout === "vertical" ? offset.height : offset.width;
  if (padding === "gap") {
    return smallestDistanceInPercent * rangeWidth / 2;
  }
  if (padding === "no-gap") {
    var gap = getPercentValue(barCategoryGap, smallestDistanceInPercent * rangeWidth);
    var halfBand = smallestDistanceInPercent * rangeWidth / 2;
    return halfBand - gap - (halfBand - gap) / rangeWidth * gap;
  }
  return 0;
});
var selectCalculatedXAxisPadding = (state, axisId) => {
  var xAxisSettings = selectXAxisSettings(state, axisId);
  if (xAxisSettings == null || typeof xAxisSettings.padding !== "string") {
    return 0;
  }
  return selectCalculatedPadding(state, "xAxis", axisId, xAxisSettings.padding);
};
var selectCalculatedYAxisPadding = (state, axisId) => {
  var yAxisSettings = selectYAxisSettings(state, axisId);
  if (yAxisSettings == null || typeof yAxisSettings.padding !== "string") {
    return 0;
  }
  return selectCalculatedPadding(state, "yAxis", axisId, yAxisSettings.padding);
};
var selectXAxisPadding = createSelector(selectXAxisSettings, selectCalculatedXAxisPadding, (xAxisSettings, calculated) => {
  var _padding$left, _padding$right;
  if (xAxisSettings == null) {
    return {
      left: 0,
      right: 0
    };
  }
  var {
    padding
  } = xAxisSettings;
  if (typeof padding === "string") {
    return {
      left: calculated,
      right: calculated
    };
  }
  return {
    left: ((_padding$left = padding.left) !== null && _padding$left !== void 0 ? _padding$left : 0) + calculated,
    right: ((_padding$right = padding.right) !== null && _padding$right !== void 0 ? _padding$right : 0) + calculated
  };
});
var selectYAxisPadding = createSelector(selectYAxisSettings, selectCalculatedYAxisPadding, (yAxisSettings, calculated) => {
  var _padding$top, _padding$bottom;
  if (yAxisSettings == null) {
    return {
      top: 0,
      bottom: 0
    };
  }
  var {
    padding
  } = yAxisSettings;
  if (typeof padding === "string") {
    return {
      top: calculated,
      bottom: calculated
    };
  }
  return {
    top: ((_padding$top = padding.top) !== null && _padding$top !== void 0 ? _padding$top : 0) + calculated,
    bottom: ((_padding$bottom = padding.bottom) !== null && _padding$bottom !== void 0 ? _padding$bottom : 0) + calculated
  };
});
var combineXAxisRange = createSelector([selectChartOffsetInternal, selectXAxisPadding, selectBrushDimensions, selectBrushSettings, (_state, _axisId, isPanorama) => isPanorama], (offset, padding, brushDimensions, _ref4, isPanorama) => {
  var {
    padding: brushPadding
  } = _ref4;
  if (isPanorama) {
    return [brushPadding.left, brushDimensions.width - brushPadding.right];
  }
  return [offset.left + padding.left, offset.left + offset.width - padding.right];
});
var combineYAxisRange = createSelector([selectChartOffsetInternal, selectChartLayout, selectYAxisPadding, selectBrushDimensions, selectBrushSettings, (_state, _axisId, isPanorama) => isPanorama], (offset, layout, padding, brushDimensions, _ref5, isPanorama) => {
  var {
    padding: brushPadding
  } = _ref5;
  if (isPanorama) {
    return [brushDimensions.height - brushPadding.bottom, brushPadding.top];
  }
  if (layout === "horizontal") {
    return [offset.top + offset.height - padding.bottom, offset.top + padding.top];
  }
  return [offset.top + padding.top, offset.top + offset.height - padding.bottom];
});
var selectAxisRange = (state, axisType, axisId, isPanorama) => {
  var _selectZAxisSettings;
  switch (axisType) {
    case "xAxis":
      return combineXAxisRange(state, axisId, isPanorama);
    case "yAxis":
      return combineYAxisRange(state, axisId, isPanorama);
    case "zAxis":
      return (_selectZAxisSettings = selectZAxisSettings(state, axisId)) === null || _selectZAxisSettings === void 0 ? void 0 : _selectZAxisSettings.range;
    case "angleAxis":
      return selectAngleAxisRange(state);
    case "radiusAxis":
      return selectRadiusAxisRange(state, axisId);
    default:
      return void 0;
  }
};
var selectAxisRangeWithReverse = createSelector([selectBaseAxis, selectAxisRange], combineAxisRangeWithReverse);
var selectAxisScale = createSelector([selectBaseAxis, selectRealScaleType, selectAxisDomainIncludingNiceTicks, selectAxisRangeWithReverse], combineScaleFunction);
createSelector([selectCartesianItemsSettings, selectAllErrorBarSettings, pickAxisType], combineRelevantErrorBarSettings);
function compareIds(a2, b2) {
  if (a2.id < b2.id) {
    return -1;
  }
  if (a2.id > b2.id) {
    return 1;
  }
  return 0;
}
var pickAxisOrientation = (_state, orientation) => orientation;
var pickMirror = (_state, _orientation, mirror) => mirror;
var selectAllXAxesWithOffsetType = createSelector(selectAllXAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var selectAllYAxesWithOffsetType = createSelector(selectAllYAxes, pickAxisOrientation, pickMirror, (allAxes, orientation, mirror) => allAxes.filter((axis) => axis.orientation === orientation).filter((axis) => axis.mirror === mirror).sort(compareIds));
var getXAxisSize = (offset, axisSettings) => {
  return {
    width: offset.width,
    height: axisSettings.height
  };
};
var getYAxisSize = (offset, axisSettings) => {
  var width = typeof axisSettings.width === "number" ? axisSettings.width : DEFAULT_Y_AXIS_WIDTH;
  return {
    width,
    height: offset.height
  };
};
var selectXAxisSize = createSelector(selectChartOffsetInternal, selectXAxisSettings, getXAxisSize);
var combineXAxisPositionStartingPoint = (offset, orientation, chartHeight) => {
  switch (orientation) {
    case "top":
      return offset.top;
    case "bottom":
      return chartHeight - offset.bottom;
    default:
      return 0;
  }
};
var combineYAxisPositionStartingPoint = (offset, orientation, chartWidth) => {
  switch (orientation) {
    case "left":
      return offset.left;
    case "right":
      return chartWidth - offset.right;
    default:
      return 0;
  }
};
var selectAllXAxesOffsetSteps = createSelector(selectChartHeight, selectChartOffsetInternal, selectAllXAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartHeight, offset, allAxesWithSameOffsetType, orientation, mirror) => {
  var steps = {};
  var position;
  allAxesWithSameOffsetType.forEach((axis) => {
    var axisSize = getXAxisSize(offset, axis);
    if (position == null) {
      position = combineXAxisPositionStartingPoint(offset, orientation, chartHeight);
    }
    var needSpace = orientation === "top" && !mirror || orientation === "bottom" && mirror;
    steps[axis.id] = position - Number(needSpace) * axisSize.height;
    position += (needSpace ? -1 : 1) * axisSize.height;
  });
  return steps;
});
var selectAllYAxesOffsetSteps = createSelector(selectChartWidth, selectChartOffsetInternal, selectAllYAxesWithOffsetType, pickAxisOrientation, pickMirror, (chartWidth, offset, allAxesWithSameOffsetType, orientation, mirror) => {
  var steps = {};
  var position;
  allAxesWithSameOffsetType.forEach((axis) => {
    var axisSize = getYAxisSize(offset, axis);
    if (position == null) {
      position = combineYAxisPositionStartingPoint(offset, orientation, chartWidth);
    }
    var needSpace = orientation === "left" && !mirror || orientation === "right" && mirror;
    steps[axis.id] = position - Number(needSpace) * axisSize.width;
    position += (needSpace ? -1 : 1) * axisSize.width;
  });
  return steps;
});
var selectXAxisPosition = (state, axisId) => {
  var offset = selectChartOffsetInternal(state);
  var axisSettings = selectXAxisSettings(state, axisId);
  if (axisSettings == null) {
    return void 0;
  }
  var allSteps = selectAllXAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
  var stepOfThisAxis = allSteps[axisId];
  if (stepOfThisAxis == null) {
    return {
      x: offset.left,
      y: 0
    };
  }
  return {
    x: offset.left,
    y: stepOfThisAxis
  };
};
var selectYAxisPosition = (state, axisId) => {
  var offset = selectChartOffsetInternal(state);
  var axisSettings = selectYAxisSettings(state, axisId);
  if (axisSettings == null) {
    return void 0;
  }
  var allSteps = selectAllYAxesOffsetSteps(state, axisSettings.orientation, axisSettings.mirror);
  var stepOfThisAxis = allSteps[axisId];
  if (stepOfThisAxis == null) {
    return {
      x: 0,
      y: offset.top
    };
  }
  return {
    x: stepOfThisAxis,
    y: offset.top
  };
};
var selectYAxisSize = createSelector(selectChartOffsetInternal, selectYAxisSettings, (offset, axisSettings) => {
  var width = typeof axisSettings.width === "number" ? axisSettings.width : DEFAULT_Y_AXIS_WIDTH;
  return {
    width,
    height: offset.height
  };
});
var selectCartesianAxisSize = (state, axisType, axisId) => {
  switch (axisType) {
    case "xAxis": {
      return selectXAxisSize(state, axisId).width;
    }
    case "yAxis": {
      return selectYAxisSize(state, axisId).height;
    }
    default: {
      return void 0;
    }
  }
};
var combineDuplicateDomain = (chartLayout, appliedValues, axis, axisType) => {
  if (axis == null) {
    return void 0;
  }
  var {
    allowDuplicatedCategory,
    type,
    dataKey
  } = axis;
  var isCategorical = isCategoricalAxis(chartLayout, axisType);
  var allData = appliedValues.map((av) => av.value);
  if (dataKey && isCategorical && type === "category" && allowDuplicatedCategory && hasDuplicate(allData)) {
    return allData;
  }
  return void 0;
};
var selectDuplicateDomain = createSelector([selectChartLayout, selectAllAppliedValues, selectBaseAxis, pickAxisType], combineDuplicateDomain);
var combineCategoricalDomain = (layout, appliedValues, axis, axisType) => {
  if (axis == null || axis.dataKey == null) {
    return void 0;
  }
  var {
    type,
    scale
  } = axis;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (isCategorical && (type === "number" || scale !== "auto")) {
    return appliedValues.map((d2) => d2.value);
  }
  return void 0;
};
var selectCategoricalDomain = createSelector([selectChartLayout, selectAllAppliedValues, selectAxisSettings, pickAxisType], combineCategoricalDomain);
var selectAxisPropsNeededForCartesianGridTicksGenerator = createSelector([selectChartLayout, selectCartesianAxisSettings, selectRealScaleType, selectAxisScale, selectDuplicateDomain, selectCategoricalDomain, selectAxisRange, selectNiceTicks, pickAxisType], (layout, axis, realScaleType, scale, duplicateDomain, categoricalDomain, axisRange, niceTicks, axisType) => {
  if (axis == null) {
    return null;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  return {
    angle: axis.angle,
    interval: axis.interval,
    minTickGap: axis.minTickGap,
    orientation: axis.orientation,
    tick: axis.tick,
    tickCount: axis.tickCount,
    tickFormatter: axis.tickFormatter,
    ticks: axis.ticks,
    type: axis.type,
    unit: axis.unit,
    axisType,
    categoricalDomain,
    duplicateDomain,
    isCategorical,
    niceTicks,
    range: axisRange,
    realScaleType,
    scale
  };
});
var combineAxisTicks = (layout, axis, realScaleType, scale, niceTicks, axisRange, duplicateDomain, categoricalDomain, axisType) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  var {
    type,
    ticks: ticks2,
    tickCount
  } = axis;
  var offsetForBand = realScaleType === "scaleBand" && typeof scale.bandwidth === "function" ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && axisRange != null && axisRange.length >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
  var ticksOrNiceTicks = ticks2 || niceTicks;
  if (ticksOrNiceTicks) {
    var result = ticksOrNiceTicks.map((entry, index) => {
      var scaleContent = duplicateDomain ? duplicateDomain.indexOf(entry) : entry;
      return {
        index,
        // If the scaleContent is not a number, the coordinate will be NaN.
        // That could be the case for example with a PointScale and a string as domain.
        coordinate: scale(scaleContent) + offset,
        value: entry,
        offset
      };
    });
    return result.filter((row) => !isNan(row.coordinate));
  }
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => ({
      coordinate: scale(entry) + offset,
      value: entry,
      index,
      offset
    }));
  }
  if (scale.ticks) {
    return scale.ticks(tickCount).map((entry) => ({
      coordinate: scale(entry) + offset,
      value: entry,
      offset
    }));
  }
  return scale.domain().map((entry, index) => ({
    coordinate: scale(entry) + offset,
    value: duplicateDomain ? duplicateDomain[entry] : entry,
    index,
    offset
  }));
};
var selectTicksOfAxis = createSelector([selectChartLayout, selectAxisSettings, selectRealScaleType, selectAxisScale, selectNiceTicks, selectAxisRange, selectDuplicateDomain, selectCategoricalDomain, pickAxisType], combineAxisTicks);
var combineGraphicalItemTicks = (layout, axis, scale, axisRange, duplicateDomain, categoricalDomain, axisType) => {
  if (axis == null || scale == null || axisRange == null || axisRange[0] === axisRange[1]) {
    return void 0;
  }
  var isCategorical = isCategoricalAxis(layout, axisType);
  var {
    tickCount
  } = axis;
  var offset = 0;
  offset = axisType === "angleAxis" && (axisRange === null || axisRange === void 0 ? void 0 : axisRange.length) >= 2 ? mathSign(axisRange[0] - axisRange[1]) * 2 * offset : offset;
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => ({
      coordinate: scale(entry) + offset,
      value: entry,
      index,
      offset
    }));
  }
  if (scale.ticks) {
    return scale.ticks(tickCount).map((entry) => ({
      coordinate: scale(entry) + offset,
      value: entry,
      offset
    }));
  }
  return scale.domain().map((entry, index) => ({
    coordinate: scale(entry) + offset,
    value: duplicateDomain ? duplicateDomain[entry] : entry,
    index,
    offset
  }));
};
var selectTicksOfGraphicalItem = createSelector([selectChartLayout, selectAxisSettings, selectAxisScale, selectAxisRange, selectDuplicateDomain, selectCategoricalDomain, pickAxisType], combineGraphicalItemTicks);
var selectAxisWithScale = createSelector(selectBaseAxis, selectAxisScale, (axis, scale) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  return _objectSpread$l(_objectSpread$l({}, axis), {}, {
    scale
  });
});
var selectZAxisScale = createSelector([selectBaseAxis, selectRealScaleType, selectAxisDomain, selectAxisRangeWithReverse], combineScaleFunction);
createSelector((state, _axisType, axisId) => selectZAxisSettings(state, axisId), selectZAxisScale, (axis, scale) => {
  if (axis == null || scale == null) {
    return void 0;
  }
  return _objectSpread$l(_objectSpread$l({}, axis), {}, {
    scale
  });
});
var selectChartDirection = createSelector([selectChartLayout, selectAllXAxes, selectAllYAxes], (layout, allXAxes, allYAxes) => {
  switch (layout) {
    case "horizontal": {
      return allXAxes.some((axis) => axis.reversed) ? "right-to-left" : "left-to-right";
    }
    case "vertical": {
      return allYAxes.some((axis) => axis.reversed) ? "bottom-to-top" : "top-to-bottom";
    }
    case "centric":
    case "radial": {
      return "left-to-right";
    }
    default: {
      return void 0;
    }
  }
});
var selectDefaultTooltipEventType = (state) => state.options.defaultTooltipEventType;
var selectValidateTooltipEventTypes = (state) => state.options.validateTooltipEventTypes;
function combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes) {
  if (shared == null) {
    return defaultTooltipEventType;
  }
  var eventType = shared ? "axis" : "item";
  if (validateTooltipEventTypes == null) {
    return defaultTooltipEventType;
  }
  return validateTooltipEventTypes.includes(eventType) ? eventType : defaultTooltipEventType;
}
function selectTooltipEventType$1(state, shared) {
  var defaultTooltipEventType = selectDefaultTooltipEventType(state);
  var validateTooltipEventTypes = selectValidateTooltipEventTypes(state);
  return combineTooltipEventType(shared, defaultTooltipEventType, validateTooltipEventTypes);
}
function useTooltipEventType(shared) {
  return useAppSelector((state) => selectTooltipEventType$1(state, shared));
}
var combineActiveLabel = (tooltipTicks, activeIndex) => {
  var _tooltipTicks$n;
  var n2 = Number(activeIndex);
  if (isNan(n2) || activeIndex == null) {
    return void 0;
  }
  return n2 >= 0 ? tooltipTicks === null || tooltipTicks === void 0 || (_tooltipTicks$n = tooltipTicks[n2]) === null || _tooltipTicks$n === void 0 ? void 0 : _tooltipTicks$n.value : void 0;
};
var selectTooltipSettings = (state) => state.tooltip.settings;
var noInteraction = {
  active: false,
  index: null,
  dataKey: void 0,
  coordinate: void 0
};
var initialState$8 = {
  itemInteraction: {
    click: noInteraction,
    hover: noInteraction
  },
  axisInteraction: {
    click: noInteraction,
    hover: noInteraction
  },
  keyboardInteraction: noInteraction,
  syncInteraction: {
    active: false,
    index: null,
    dataKey: void 0,
    label: void 0,
    coordinate: void 0
  },
  tooltipItemPayloads: [],
  settings: {
    shared: void 0,
    trigger: "hover",
    axisId: 0,
    active: false,
    defaultIndex: void 0
  }
};
var tooltipSlice = createSlice({
  name: "tooltip",
  initialState: initialState$8,
  reducers: {
    addTooltipEntrySettings(state, action) {
      state.tooltipItemPayloads.push(castDraft(action.payload));
    },
    removeTooltipEntrySettings(state, action) {
      var index = current(state).tooltipItemPayloads.indexOf(castDraft(action.payload));
      if (index > -1) {
        state.tooltipItemPayloads.splice(index, 1);
      }
    },
    setTooltipSettingsState(state, action) {
      state.settings = action.payload;
    },
    setActiveMouseOverItemIndex(state, action) {
      state.syncInteraction.active = false;
      state.keyboardInteraction.active = false;
      state.itemInteraction.hover.active = true;
      state.itemInteraction.hover.index = action.payload.activeIndex;
      state.itemInteraction.hover.dataKey = action.payload.activeDataKey;
      state.itemInteraction.hover.coordinate = action.payload.activeCoordinate;
    },
    mouseLeaveChart(state) {
      state.itemInteraction.hover.active = false;
      state.axisInteraction.hover.active = false;
    },
    mouseLeaveItem(state) {
      state.itemInteraction.hover.active = false;
    },
    setActiveClickItemIndex(state, action) {
      state.syncInteraction.active = false;
      state.itemInteraction.click.active = true;
      state.keyboardInteraction.active = false;
      state.itemInteraction.click.index = action.payload.activeIndex;
      state.itemInteraction.click.dataKey = action.payload.activeDataKey;
      state.itemInteraction.click.coordinate = action.payload.activeCoordinate;
    },
    setMouseOverAxisIndex(state, action) {
      state.syncInteraction.active = false;
      state.axisInteraction.hover.active = true;
      state.keyboardInteraction.active = false;
      state.axisInteraction.hover.index = action.payload.activeIndex;
      state.axisInteraction.hover.dataKey = action.payload.activeDataKey;
      state.axisInteraction.hover.coordinate = action.payload.activeCoordinate;
    },
    setMouseClickAxisIndex(state, action) {
      state.syncInteraction.active = false;
      state.keyboardInteraction.active = false;
      state.axisInteraction.click.active = true;
      state.axisInteraction.click.index = action.payload.activeIndex;
      state.axisInteraction.click.dataKey = action.payload.activeDataKey;
      state.axisInteraction.click.coordinate = action.payload.activeCoordinate;
    },
    setSyncInteraction(state, action) {
      state.syncInteraction = action.payload;
    },
    setKeyboardInteraction(state, action) {
      state.keyboardInteraction.active = action.payload.active;
      state.keyboardInteraction.index = action.payload.activeIndex;
      state.keyboardInteraction.coordinate = action.payload.activeCoordinate;
      state.keyboardInteraction.dataKey = action.payload.activeDataKey;
    }
  }
});
var {
  addTooltipEntrySettings,
  removeTooltipEntrySettings,
  setTooltipSettingsState,
  setActiveMouseOverItemIndex,
  mouseLeaveItem,
  mouseLeaveChart,
  setActiveClickItemIndex,
  setMouseOverAxisIndex,
  setMouseClickAxisIndex,
  setSyncInteraction,
  setKeyboardInteraction
} = tooltipSlice.actions;
var tooltipReducer = tooltipSlice.reducer;
function ownKeys$k(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$k(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$k(Object(t2), true).forEach(function(r3) {
      _defineProperty$o(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$k(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$o(e3, r2, t2) {
  return (r2 = _toPropertyKey$o(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$o(t2) {
  var i = _toPrimitive$o(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$o(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger) {
  if (tooltipEventType === "axis") {
    if (trigger === "click") {
      return tooltipState.axisInteraction.click;
    }
    return tooltipState.axisInteraction.hover;
  }
  if (trigger === "click") {
    return tooltipState.itemInteraction.click;
  }
  return tooltipState.itemInteraction.hover;
}
function hasBeenActivePreviously(tooltipInteractionState) {
  return tooltipInteractionState.index != null;
}
var combineTooltipInteractionState = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
  if (tooltipEventType == null) {
    return noInteraction;
  }
  var appropriateMouseInteraction = chooseAppropriateMouseInteraction(tooltipState, tooltipEventType, trigger);
  if (appropriateMouseInteraction == null) {
    return noInteraction;
  }
  if (appropriateMouseInteraction.active) {
    return appropriateMouseInteraction;
  }
  if (tooltipState.keyboardInteraction.active) {
    return tooltipState.keyboardInteraction;
  }
  if (tooltipState.syncInteraction.active && tooltipState.syncInteraction.index != null) {
    return tooltipState.syncInteraction;
  }
  var activeFromProps = tooltipState.settings.active === true;
  if (hasBeenActivePreviously(appropriateMouseInteraction)) {
    if (activeFromProps) {
      return _objectSpread$k(_objectSpread$k({}, appropriateMouseInteraction), {}, {
        active: true
      });
    }
  } else if (defaultIndex != null) {
    return {
      active: true,
      coordinate: void 0,
      dataKey: void 0,
      index: defaultIndex
    };
  }
  return _objectSpread$k(_objectSpread$k({}, noInteraction), {}, {
    coordinate: appropriateMouseInteraction.coordinate
  });
};
var combineActiveTooltipIndex = (tooltipInteraction, chartData) => {
  var desiredIndex = tooltipInteraction === null || tooltipInteraction === void 0 ? void 0 : tooltipInteraction.index;
  if (desiredIndex == null) {
    return null;
  }
  var indexAsNumber = Number(desiredIndex);
  if (!isWellBehavedNumber(indexAsNumber)) {
    return desiredIndex;
  }
  var lowerLimit = 0;
  var upperLimit = Infinity;
  if (chartData.length > 0) {
    upperLimit = chartData.length - 1;
  }
  return String(Math.max(lowerLimit, Math.min(indexAsNumber, upperLimit)));
};
var combineCoordinateForDefaultIndex = (width, height, layout, offset, tooltipTicks, defaultIndex, tooltipConfigurations, tooltipPayloadSearcher) => {
  if (defaultIndex == null || tooltipPayloadSearcher == null) {
    return void 0;
  }
  var firstConfiguration = tooltipConfigurations[0];
  var maybePosition = firstConfiguration == null ? void 0 : tooltipPayloadSearcher(firstConfiguration.positions, defaultIndex);
  if (maybePosition != null) {
    return maybePosition;
  }
  var tick = tooltipTicks === null || tooltipTicks === void 0 ? void 0 : tooltipTicks[Number(defaultIndex)];
  if (!tick) {
    return void 0;
  }
  switch (layout) {
    case "horizontal": {
      return {
        x: tick.coordinate,
        y: (offset.top + height) / 2
      };
    }
    default: {
      return {
        x: (offset.left + width) / 2,
        y: tick.coordinate
      };
    }
  }
};
var combineTooltipPayloadConfigurations = (tooltipState, tooltipEventType, trigger, defaultIndex) => {
  if (tooltipEventType === "axis") {
    return tooltipState.tooltipItemPayloads;
  }
  if (tooltipState.tooltipItemPayloads.length === 0) {
    return [];
  }
  var filterByDataKey;
  if (trigger === "hover") {
    filterByDataKey = tooltipState.itemInteraction.hover.dataKey;
  } else {
    filterByDataKey = tooltipState.itemInteraction.click.dataKey;
  }
  if (filterByDataKey == null && defaultIndex != null) {
    return [tooltipState.tooltipItemPayloads[0]];
  }
  return tooltipState.tooltipItemPayloads.filter((tpc) => {
    var _tpc$settings;
    return ((_tpc$settings = tpc.settings) === null || _tpc$settings === void 0 ? void 0 : _tpc$settings.dataKey) === filterByDataKey;
  });
};
var selectTooltipPayloadSearcher = (state) => state.options.tooltipPayloadSearcher;
var selectTooltipState = (state) => state.tooltip;
function ownKeys$j(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$j(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$j(Object(t2), true).forEach(function(r3) {
      _defineProperty$n(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$j(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$n(e3, r2, t2) {
  return (r2 = _toPropertyKey$n(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$n(t2) {
  var i = _toPrimitive$n(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$n(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function selectFinalData(dataDefinedOnItem, dataDefinedOnChart) {
  if (dataDefinedOnItem != null) {
    return dataDefinedOnItem;
  }
  return dataDefinedOnChart;
}
var combineTooltipPayload = (tooltipPayloadConfigurations, activeIndex, chartDataState, tooltipAxisDataKey, activeLabel, tooltipPayloadSearcher, tooltipEventType) => {
  if (activeIndex == null || tooltipPayloadSearcher == null) {
    return void 0;
  }
  var {
    chartData,
    computedData,
    dataStartIndex,
    dataEndIndex
  } = chartDataState;
  var init = [];
  return tooltipPayloadConfigurations.reduce((agg, _ref2) => {
    var _settings$dataKey;
    var {
      dataDefinedOnItem,
      settings
    } = _ref2;
    var finalData = selectFinalData(dataDefinedOnItem, chartData);
    var sliced = Array.isArray(finalData) ? getSliced(finalData, dataStartIndex, dataEndIndex) : finalData;
    var finalDataKey = (_settings$dataKey = settings === null || settings === void 0 ? void 0 : settings.dataKey) !== null && _settings$dataKey !== void 0 ? _settings$dataKey : tooltipAxisDataKey;
    var finalNameKey = settings === null || settings === void 0 ? void 0 : settings.nameKey;
    var tooltipPayload;
    if (tooltipAxisDataKey && Array.isArray(sliced) && /*
     * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
     * as tooltip payloads and findEntryInArray is not prepared to handle that.
     * Sad but also ScatterChart only allows 'item' tooltipEventType
     * and also this is only a problem if there are multiple Scatters and each has its own data array
     * so let's fix that some other time.
     */
    !Array.isArray(sliced[0]) && /*
     * If the tooltipEventType is 'axis', we should search for the dataKey in the sliced data
     * because thanks to allowDuplicatedCategory=false, the order of elements in the array
     * no longer matches the order of elements in the original data
     * and so we need to search by the active dataKey + label rather than by index.
     *
     * The same happens if multiple graphical items are present in the chart
     * and each of them has its own data array. Those arrays get concatenated
     * and again the tooltip index no longer matches the original data.
     *
     * On the other hand the tooltipEventType 'item' should always search by index
     * because we get the index from interacting over the individual elements
     * which is always accurate, irrespective of the allowDuplicatedCategory setting.
     */
    tooltipEventType === "axis") {
      tooltipPayload = findEntryInArray(sliced, tooltipAxisDataKey, activeLabel);
    } else {
      tooltipPayload = tooltipPayloadSearcher(sliced, activeIndex, computedData, finalNameKey);
    }
    if (Array.isArray(tooltipPayload)) {
      tooltipPayload.forEach((item) => {
        var newSettings = _objectSpread$j(_objectSpread$j({}, settings), {}, {
          name: item.name,
          unit: item.unit,
          // color and fill are erased to keep 100% the identical behaviour to recharts 2.x - but there's nothing stopping us from returning them here. It's technically a breaking change.
          color: void 0,
          // color and fill are erased to keep 100% the identical behaviour to recharts 2.x - but there's nothing stopping us from returning them here. It's technically a breaking change.
          fill: void 0
        });
        agg.push(getTooltipEntry({
          tooltipEntrySettings: newSettings,
          dataKey: item.dataKey,
          payload: item.payload,
          // @ts-expect-error getValueByDataKey does not validate the output type
          value: getValueByDataKey(item.payload, item.dataKey),
          name: item.name
        }));
      });
    } else {
      var _getValueByDataKey;
      agg.push(getTooltipEntry({
        tooltipEntrySettings: settings,
        dataKey: finalDataKey,
        payload: tooltipPayload,
        // @ts-expect-error getValueByDataKey does not validate the output type
        value: getValueByDataKey(tooltipPayload, finalDataKey),
        // @ts-expect-error getValueByDataKey does not validate the output type
        name: (_getValueByDataKey = getValueByDataKey(tooltipPayload, finalNameKey)) !== null && _getValueByDataKey !== void 0 ? _getValueByDataKey : settings === null || settings === void 0 ? void 0 : settings.name
      }));
    }
    return agg;
  }, init);
};
var selectTooltipAxisRealScaleType = createSelector([selectTooltipAxis, selectChartLayout, selectHasBar, selectChartName, selectTooltipAxisType], combineRealScaleType);
var selectAllUnfilteredGraphicalItems = createSelector([(state) => state.graphicalItems.cartesianItems, (state) => state.graphicalItems.polarItems], (cartesianItems, polarItems) => [...cartesianItems, ...polarItems]);
var selectTooltipAxisPredicate = createSelector([selectTooltipAxisType, selectTooltipAxisId], itemAxisPredicate);
var selectAllGraphicalItemsSettings = createSelector([selectAllUnfilteredGraphicalItems, selectTooltipAxis, selectTooltipAxisPredicate], combineGraphicalItemsSettings);
var selectAllStackedGraphicalItemsSettings = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipGraphicalItemsData = createSelector([selectAllGraphicalItemsSettings], combineGraphicalItemsData);
var selectTooltipDisplayedData = createSelector([selectTooltipGraphicalItemsData, selectChartDataWithIndexes], combineDisplayedData);
var selectTooltipStackedData = createSelector([selectAllStackedGraphicalItemsSettings, selectChartDataWithIndexes, selectTooltipAxis], combineDisplayedStackedData);
var selectAllTooltipAppliedValues = createSelector([selectTooltipDisplayedData, selectTooltipAxis, selectAllGraphicalItemsSettings], combineAppliedValues);
var selectTooltipAxisDomainDefinition = createSelector([selectTooltipAxis], getDomainDefinition);
var selectAllStackedGraphicalItems = createSelector([selectAllGraphicalItemsSettings], (graphicalItems) => graphicalItems.filter(isStacked));
var selectTooltipStackGroups = createSelector([selectTooltipStackedData, selectAllStackedGraphicalItems, selectStackOffsetType], combineStackGroups);
var selectTooltipDomainOfStackGroups = createSelector([selectTooltipStackGroups, selectChartDataWithIndexes, selectTooltipAxisType], combineDomainOfStackGroups);
var selectTooltipItemsSettingsExceptStacked = createSelector([selectAllGraphicalItemsSettings], filterGraphicalNotStackedItems);
var selectTooltipAllAppliedNumericalValuesIncludingErrorValues = createSelector([selectTooltipDisplayedData, selectTooltipAxis, selectTooltipItemsSettingsExceptStacked, selectAllErrorBarSettings, selectTooltipAxisType], combineAppliedNumericalValuesIncludingErrorValues);
var selectReferenceDotsByTooltipAxis = createSelector([selectReferenceDots, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceDotsDomain = createSelector([selectReferenceDotsByTooltipAxis, selectTooltipAxisType], combineDotsDomain);
var selectReferenceAreasByTooltipAxis = createSelector([selectReferenceAreas, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceAreasDomain = createSelector([selectReferenceAreasByTooltipAxis, selectTooltipAxisType], combineAreasDomain);
var selectReferenceLinesByTooltipAxis = createSelector([selectReferenceLines, selectTooltipAxisType, selectTooltipAxisId], filterReferenceElements);
var selectTooltipReferenceLinesDomain = createSelector([selectReferenceLinesByTooltipAxis, selectTooltipAxisType], combineLinesDomain);
var selectTooltipReferenceElementsDomain = createSelector([selectTooltipReferenceDotsDomain, selectTooltipReferenceLinesDomain, selectTooltipReferenceAreasDomain], mergeDomains);
var selectTooltipNumericalDomain = createSelector([selectTooltipAxis, selectTooltipAxisDomainDefinition, selectTooltipDomainOfStackGroups, selectTooltipAllAppliedNumericalValuesIncludingErrorValues, selectTooltipReferenceElementsDomain, selectChartLayout, selectTooltipAxisType], combineNumericalDomain);
var selectTooltipAxisDomain = createSelector([selectTooltipAxis, selectChartLayout, selectTooltipDisplayedData, selectAllTooltipAppliedValues, selectStackOffsetType, selectTooltipAxisType, selectTooltipNumericalDomain], combineAxisDomain);
var selectTooltipNiceTicks = createSelector([selectTooltipAxisDomain, selectTooltipAxis, selectTooltipAxisRealScaleType], combineNiceTicks);
var selectTooltipAxisDomainIncludingNiceTicks = createSelector([selectTooltipAxis, selectTooltipAxisDomain, selectTooltipNiceTicks, selectTooltipAxisType], combineAxisDomainWithNiceTicks);
var selectTooltipAxisRange = (state) => {
  var axisType = selectTooltipAxisType(state);
  var axisId = selectTooltipAxisId(state);
  var isPanorama = false;
  return selectAxisRange(state, axisType, axisId, isPanorama);
};
var selectTooltipAxisRangeWithReverse = createSelector([selectTooltipAxis, selectTooltipAxisRange], combineAxisRangeWithReverse);
var selectTooltipAxisScale = createSelector([selectTooltipAxis, selectTooltipAxisRealScaleType, selectTooltipAxisDomainIncludingNiceTicks, selectTooltipAxisRangeWithReverse], combineScaleFunction);
var selectTooltipDuplicateDomain = createSelector([selectChartLayout, selectAllTooltipAppliedValues, selectTooltipAxis, selectTooltipAxisType], combineDuplicateDomain);
var selectTooltipCategoricalDomain = createSelector([selectChartLayout, selectAllTooltipAppliedValues, selectTooltipAxis, selectTooltipAxisType], combineCategoricalDomain);
var combineTicksOfTooltipAxis = (layout, axis, realScaleType, scale, range2, duplicateDomain, categoricalDomain, axisType) => {
  if (!axis) {
    return void 0;
  }
  var {
    type
  } = axis;
  var isCategorical = isCategoricalAxis(layout, axisType);
  if (!scale) {
    return void 0;
  }
  var offsetForBand = realScaleType === "scaleBand" && scale.bandwidth ? scale.bandwidth() / 2 : 2;
  var offset = type === "category" && scale.bandwidth ? scale.bandwidth() / offsetForBand : 0;
  offset = axisType === "angleAxis" && range2 != null && (range2 === null || range2 === void 0 ? void 0 : range2.length) >= 2 ? mathSign(range2[0] - range2[1]) * 2 * offset : offset;
  if (isCategorical && categoricalDomain) {
    return categoricalDomain.map((entry, index) => ({
      coordinate: scale(entry) + offset,
      value: entry,
      index,
      offset
    }));
  }
  return scale.domain().map((entry, index) => ({
    coordinate: scale(entry) + offset,
    value: duplicateDomain ? duplicateDomain[entry] : entry,
    index,
    offset
  }));
};
var selectTooltipAxisTicks = createSelector([selectChartLayout, selectTooltipAxis, selectTooltipAxisRealScaleType, selectTooltipAxisScale, selectTooltipAxisRange, selectTooltipDuplicateDomain, selectTooltipCategoricalDomain, selectTooltipAxisType], combineTicksOfTooltipAxis);
var selectTooltipEventType = createSelector([selectDefaultTooltipEventType, selectValidateTooltipEventTypes, selectTooltipSettings], (defaultTooltipEventType, validateTooltipEventType, settings) => combineTooltipEventType(settings.shared, defaultTooltipEventType, validateTooltipEventType));
var selectTooltipTrigger = (state) => state.tooltip.settings.trigger;
var selectDefaultIndex = (state) => state.tooltip.settings.defaultIndex;
var selectTooltipInteractionState$1 = createSelector([selectTooltipState, selectTooltipEventType, selectTooltipTrigger, selectDefaultIndex], combineTooltipInteractionState);
var selectActiveTooltipIndex = createSelector([selectTooltipInteractionState$1, selectTooltipDisplayedData], combineActiveTooltipIndex);
var selectActiveLabel$1 = createSelector([selectTooltipAxisTicks, selectActiveTooltipIndex], combineActiveLabel);
var selectActiveTooltipDataKey = createSelector([selectTooltipInteractionState$1], (tooltipInteraction) => {
  if (!tooltipInteraction) {
    return void 0;
  }
  return tooltipInteraction.dataKey;
});
var selectTooltipPayloadConfigurations$1 = createSelector([selectTooltipState, selectTooltipEventType, selectTooltipTrigger, selectDefaultIndex], combineTooltipPayloadConfigurations);
var selectTooltipCoordinateForDefaultIndex = createSelector([selectChartWidth, selectChartHeight, selectChartLayout, selectChartOffsetInternal, selectTooltipAxisTicks, selectDefaultIndex, selectTooltipPayloadConfigurations$1, selectTooltipPayloadSearcher], combineCoordinateForDefaultIndex);
var selectActiveTooltipCoordinate = createSelector([selectTooltipInteractionState$1, selectTooltipCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
  if (tooltipInteractionState !== null && tooltipInteractionState !== void 0 && tooltipInteractionState.coordinate) {
    return tooltipInteractionState.coordinate;
  }
  return defaultIndexCoordinate;
});
var selectIsTooltipActive$1 = createSelector([selectTooltipInteractionState$1], (tooltipInteractionState) => tooltipInteractionState.active);
var selectActiveTooltipPayload = createSelector([selectTooltipPayloadConfigurations$1, selectActiveTooltipIndex, selectChartDataWithIndexes, selectTooltipAxisDataKey, selectActiveLabel$1, selectTooltipPayloadSearcher, selectTooltipEventType], combineTooltipPayload);
var selectActiveTooltipDataPoints = createSelector([selectActiveTooltipPayload], (payload) => {
  if (payload == null) {
    return void 0;
  }
  var dataPoints = payload.map((p2) => p2.payload).filter((p2) => p2 != null);
  return Array.from(new Set(dataPoints));
});
function ownKeys$i(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$i(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$i(Object(t2), true).forEach(function(r3) {
      _defineProperty$m(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$i(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$m(e3, r2, t2) {
  return (r2 = _toPropertyKey$m(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$m(t2) {
  var i = _toPrimitive$m(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$m(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var useTooltipAxis = () => useAppSelector(selectTooltipAxis);
var useTooltipAxisBandSize = () => {
  var tooltipAxis = useTooltipAxis();
  var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
  var tooltipAxisScale = useAppSelector(selectTooltipAxisScale);
  return getBandSizeOfAxis(_objectSpread$i(_objectSpread$i({}, tooltipAxis), {}, {
    scale: tooltipAxisScale
  }), tooltipTicks);
};
var useChartName = () => {
  return useAppSelector(selectChartName);
};
var pickTooltipEventType = (_state, tooltipEventType) => tooltipEventType;
var pickTrigger = (_state, _tooltipEventType, trigger) => trigger;
var pickDefaultIndex = (_state, _tooltipEventType, _trigger, defaultIndex) => defaultIndex;
var selectOrderedTooltipTicks = createSelector(selectTooltipAxisTicks, (ticks2) => sortBy$1(ticks2, (o) => o.coordinate));
var selectTooltipInteractionState = createSelector([selectTooltipState, pickTooltipEventType, pickTrigger, pickDefaultIndex], combineTooltipInteractionState);
var selectActiveIndex = createSelector([selectTooltipInteractionState, selectTooltipDisplayedData], combineActiveTooltipIndex);
var selectTooltipDataKey = (state, tooltipEventType, trigger) => {
  if (tooltipEventType == null) {
    return void 0;
  }
  var tooltipState = selectTooltipState(state);
  if (tooltipEventType === "axis") {
    if (trigger === "hover") {
      return tooltipState.axisInteraction.hover.dataKey;
    }
    return tooltipState.axisInteraction.click.dataKey;
  }
  if (trigger === "hover") {
    return tooltipState.itemInteraction.hover.dataKey;
  }
  return tooltipState.itemInteraction.click.dataKey;
};
var selectTooltipPayloadConfigurations = createSelector([selectTooltipState, pickTooltipEventType, pickTrigger, pickDefaultIndex], combineTooltipPayloadConfigurations);
var selectCoordinateForDefaultIndex = createSelector([selectChartWidth, selectChartHeight, selectChartLayout, selectChartOffsetInternal, selectTooltipAxisTicks, pickDefaultIndex, selectTooltipPayloadConfigurations, selectTooltipPayloadSearcher], combineCoordinateForDefaultIndex);
var selectActiveCoordinate = createSelector([selectTooltipInteractionState, selectCoordinateForDefaultIndex], (tooltipInteractionState, defaultIndexCoordinate) => {
  var _tooltipInteractionSt;
  return (_tooltipInteractionSt = tooltipInteractionState.coordinate) !== null && _tooltipInteractionSt !== void 0 ? _tooltipInteractionSt : defaultIndexCoordinate;
});
var selectActiveLabel = createSelector(selectTooltipAxisTicks, selectActiveIndex, combineActiveLabel);
var selectTooltipPayload = createSelector([selectTooltipPayloadConfigurations, selectActiveIndex, selectChartDataWithIndexes, selectTooltipAxisDataKey, selectActiveLabel, selectTooltipPayloadSearcher, pickTooltipEventType], combineTooltipPayload);
var selectIsTooltipActive = createSelector([selectTooltipInteractionState], (tooltipInteractionState) => {
  return {
    isActive: tooltipInteractionState.active,
    activeIndex: tooltipInteractionState.index
  };
});
var combineActiveProps = (chartEvent, layout, polarViewBox, tooltipAxisType, tooltipAxisRange, tooltipTicks, orderedTooltipTicks, offset) => {
  if (!chartEvent || !layout || !tooltipAxisType || !tooltipAxisRange || !tooltipTicks) {
    return void 0;
  }
  var rangeObj = inRange(chartEvent.chartX, chartEvent.chartY, layout, polarViewBox, offset);
  if (!rangeObj) {
    return void 0;
  }
  var pos = calculateTooltipPos(rangeObj, layout);
  var activeIndex = calculateActiveTickIndex(pos, orderedTooltipTicks, tooltipTicks, tooltipAxisType, tooltipAxisRange);
  var activeCoordinate = getActiveCoordinate(layout, tooltipTicks, activeIndex, rangeObj);
  return {
    activeIndex: String(activeIndex),
    activeCoordinate
  };
};
function _extends$e() {
  return _extends$e = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$e.apply(null, arguments);
}
function ownKeys$h(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$h(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$h(Object(t2), true).forEach(function(r3) {
      _defineProperty$l(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$h(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$l(e3, r2, t2) {
  return (r2 = _toPropertyKey$l(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$l(t2) {
  var i = _toPrimitive$l(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$l(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function CursorInternal(props) {
  var {
    coordinate,
    payload,
    index,
    offset,
    tooltipAxisBandSize,
    layout,
    cursor,
    tooltipEventType,
    chartName
  } = props;
  var activeCoordinate = coordinate;
  var activePayload = payload;
  var activeTooltipIndex = index;
  if (!cursor || !activeCoordinate || chartName !== "ScatterChart" && tooltipEventType !== "axis") {
    return null;
  }
  var restProps, cursorComp;
  if (chartName === "ScatterChart") {
    restProps = activeCoordinate;
    cursorComp = Cross;
  } else if (chartName === "BarChart") {
    restProps = getCursorRectangle(layout, activeCoordinate, offset, tooltipAxisBandSize);
    cursorComp = Rectangle;
  } else if (layout === "radial") {
    var {
      cx,
      cy,
      radius,
      startAngle,
      endAngle
    } = getRadialCursorPoints(activeCoordinate);
    restProps = {
      cx,
      cy,
      startAngle,
      endAngle,
      innerRadius: radius,
      outerRadius: radius
    };
    cursorComp = Sector;
  } else {
    restProps = {
      points: getCursorPoints(layout, activeCoordinate, offset)
    };
    cursorComp = Curve;
  }
  var extraClassName = typeof cursor === "object" && "className" in cursor ? cursor.className : void 0;
  var cursorProps = _objectSpread$h(_objectSpread$h(_objectSpread$h(_objectSpread$h({
    stroke: "#ccc",
    pointerEvents: "none"
  }, offset), restProps), filterProps(cursor, false)), {}, {
    payload: activePayload,
    payloadIndex: activeTooltipIndex,
    className: clsx("recharts-tooltip-cursor", extraClassName)
  });
  return /* @__PURE__ */ reactExports.isValidElement(cursor) ? /* @__PURE__ */ reactExports.cloneElement(cursor, cursorProps) : /* @__PURE__ */ reactExports.createElement(cursorComp, cursorProps);
}
function Cursor(props) {
  var tooltipAxisBandSize = useTooltipAxisBandSize();
  var offset = useOffsetInternal();
  var layout = useChartLayout();
  var chartName = useChartName();
  return /* @__PURE__ */ reactExports.createElement(CursorInternal, _extends$e({}, props, {
    coordinate: props.coordinate,
    index: props.index,
    payload: props.payload,
    offset,
    layout,
    tooltipAxisBandSize,
    chartName
  }));
}
var TooltipPortalContext = /* @__PURE__ */ reactExports.createContext(null);
var useTooltipPortal = () => reactExports.useContext(TooltipPortalContext);
var eventemitter3 = { exports: {} };
(function(module) {
  var has2 = Object.prototype.hasOwnProperty, prefix2 = "~";
  function Events() {
  }
  if (Object.create) {
    Events.prototype = /* @__PURE__ */ Object.create(null);
    if (!new Events().__proto__) prefix2 = false;
  }
  function EE(fn, context, once) {
    this.fn = fn;
    this.context = context;
    this.once = once || false;
  }
  function addListener2(emitter, event, fn, context, once) {
    if (typeof fn !== "function") {
      throw new TypeError("The listener must be a function");
    }
    var listener2 = new EE(fn, context || emitter, once), evt = prefix2 ? prefix2 + event : event;
    if (!emitter._events[evt]) emitter._events[evt] = listener2, emitter._eventsCount++;
    else if (!emitter._events[evt].fn) emitter._events[evt].push(listener2);
    else emitter._events[evt] = [emitter._events[evt], listener2];
    return emitter;
  }
  function clearEvent(emitter, evt) {
    if (--emitter._eventsCount === 0) emitter._events = new Events();
    else delete emitter._events[evt];
  }
  function EventEmitter2() {
    this._events = new Events();
    this._eventsCount = 0;
  }
  EventEmitter2.prototype.eventNames = function eventNames() {
    var names = [], events, name;
    if (this._eventsCount === 0) return names;
    for (name in events = this._events) {
      if (has2.call(events, name)) names.push(prefix2 ? name.slice(1) : name);
    }
    if (Object.getOwnPropertySymbols) {
      return names.concat(Object.getOwnPropertySymbols(events));
    }
    return names;
  };
  EventEmitter2.prototype.listeners = function listeners(event) {
    var evt = prefix2 ? prefix2 + event : event, handlers = this._events[evt];
    if (!handlers) return [];
    if (handlers.fn) return [handlers.fn];
    for (var i = 0, l2 = handlers.length, ee = new Array(l2); i < l2; i++) {
      ee[i] = handlers[i].fn;
    }
    return ee;
  };
  EventEmitter2.prototype.listenerCount = function listenerCount(event) {
    var evt = prefix2 ? prefix2 + event : event, listeners = this._events[evt];
    if (!listeners) return 0;
    if (listeners.fn) return 1;
    return listeners.length;
  };
  EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
    var evt = prefix2 ? prefix2 + event : event;
    if (!this._events[evt]) return false;
    var listeners = this._events[evt], len = arguments.length, args, i;
    if (listeners.fn) {
      if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
      switch (len) {
        case 1:
          return listeners.fn.call(listeners.context), true;
        case 2:
          return listeners.fn.call(listeners.context, a1), true;
        case 3:
          return listeners.fn.call(listeners.context, a1, a2), true;
        case 4:
          return listeners.fn.call(listeners.context, a1, a2, a3), true;
        case 5:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
        case 6:
          return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
      }
      for (i = 1, args = new Array(len - 1); i < len; i++) {
        args[i - 1] = arguments[i];
      }
      listeners.fn.apply(listeners.context, args);
    } else {
      var length = listeners.length, j;
      for (i = 0; i < length; i++) {
        if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
        switch (len) {
          case 1:
            listeners[i].fn.call(listeners[i].context);
            break;
          case 2:
            listeners[i].fn.call(listeners[i].context, a1);
            break;
          case 3:
            listeners[i].fn.call(listeners[i].context, a1, a2);
            break;
          case 4:
            listeners[i].fn.call(listeners[i].context, a1, a2, a3);
            break;
          default:
            if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
              args[j - 1] = arguments[j];
            }
            listeners[i].fn.apply(listeners[i].context, args);
        }
      }
    }
    return true;
  };
  EventEmitter2.prototype.on = function on(event, fn, context) {
    return addListener2(this, event, fn, context, false);
  };
  EventEmitter2.prototype.once = function once(event, fn, context) {
    return addListener2(this, event, fn, context, true);
  };
  EventEmitter2.prototype.removeListener = function removeListener2(event, fn, context, once) {
    var evt = prefix2 ? prefix2 + event : event;
    if (!this._events[evt]) return this;
    if (!fn) {
      clearEvent(this, evt);
      return this;
    }
    var listeners = this._events[evt];
    if (listeners.fn) {
      if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
        clearEvent(this, evt);
      }
    } else {
      for (var i = 0, events = [], length = listeners.length; i < length; i++) {
        if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
          events.push(listeners[i]);
        }
      }
      if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
      else clearEvent(this, evt);
    }
    return this;
  };
  EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
    var evt;
    if (event) {
      evt = prefix2 ? prefix2 + event : event;
      if (this._events[evt]) clearEvent(this, evt);
    } else {
      this._events = new Events();
      this._eventsCount = 0;
    }
    return this;
  };
  EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
  EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
  EventEmitter2.prefixed = prefix2;
  EventEmitter2.EventEmitter = EventEmitter2;
  {
    module.exports = EventEmitter2;
  }
})(eventemitter3);
var eventemitter3Exports = eventemitter3.exports;
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
var eventCenter = new EventEmitter();
var TOOLTIP_SYNC_EVENT = "recharts.syncEvent.tooltip";
var BRUSH_SYNC_EVENT = "recharts.syncEvent.brush";
function arrayTooltipSearcher(data, strIndex) {
  if (!strIndex) return void 0;
  var numIndex = Number.parseInt(strIndex, 10);
  if (isNan(numIndex)) {
    return void 0;
  }
  return data === null || data === void 0 ? void 0 : data[numIndex];
}
var initialState$7 = {
  chartName: "",
  tooltipPayloadSearcher: void 0,
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
};
var optionsSlice = createSlice({
  name: "options",
  initialState: initialState$7,
  reducers: {
    createEventEmitter: (state) => {
      if (state.eventEmitter == null) {
        state.eventEmitter = Symbol("rechartsEventEmitter");
      }
    }
  }
});
var optionsReducer = optionsSlice.reducer;
var {
  createEventEmitter
} = optionsSlice.actions;
function selectSynchronisedTooltipState(state) {
  return state.tooltip.syncInteraction;
}
var initialChartDataState = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
};
var chartDataSlice = createSlice({
  name: "chartData",
  initialState: initialChartDataState,
  reducers: {
    setChartData(state, action) {
      state.chartData = action.payload;
      if (action.payload == null) {
        state.dataStartIndex = 0;
        state.dataEndIndex = 0;
        return;
      }
      if (action.payload.length > 0 && state.dataEndIndex !== action.payload.length - 1) {
        state.dataEndIndex = action.payload.length - 1;
      }
    },
    setComputedData(state, action) {
      state.computedData = action.payload;
    },
    setDataStartEndIndexes(state, action) {
      var {
        startIndex,
        endIndex
      } = action.payload;
      if (startIndex != null) {
        state.dataStartIndex = startIndex;
      }
      if (endIndex != null) {
        state.dataEndIndex = endIndex;
      }
    }
  }
});
var {
  setChartData,
  setDataStartEndIndexes,
  setComputedData
} = chartDataSlice.actions;
var chartDataReducer = chartDataSlice.reducer;
var _excluded$f = ["x", "y"];
function ownKeys$g(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$g(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$g(Object(t2), true).forEach(function(r3) {
      _defineProperty$k(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$g(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$k(e3, r2, t2) {
  return (r2 = _toPropertyKey$k(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$k(t2) {
  var i = _toPrimitive$k(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$k(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _objectWithoutProperties$f(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$f(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$f(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var noop$1 = () => {
};
function useTooltipSyncEventsListener() {
  var mySyncId = useAppSelector(selectSyncId);
  var myEventEmitter = useAppSelector(selectEventEmitter);
  var dispatch = useAppDispatch();
  var syncMethod = useAppSelector(selectSyncMethod);
  var tooltipTicks = useAppSelector(selectTooltipAxisTicks);
  var layout = useChartLayout();
  var viewBox = useViewBox();
  var className = useAppSelector((state) => state.rootProps.className);
  reactExports.useEffect(() => {
    if (mySyncId == null) {
      return noop$1;
    }
    var listener2 = (incomingSyncId, action, emitter) => {
      if (myEventEmitter === emitter) {
        return;
      }
      if (mySyncId !== incomingSyncId) {
        return;
      }
      if (syncMethod === "index") {
        var _action$payload;
        if (viewBox && action !== null && action !== void 0 && (_action$payload = action.payload) !== null && _action$payload !== void 0 && _action$payload.coordinate) {
          var _action$payload$coord = action.payload.coordinate, {
            x: _x,
            y: _y
          } = _action$payload$coord, otherCoordinateProps = _objectWithoutProperties$f(_action$payload$coord, _excluded$f);
          var boundedCoordinate = _objectSpread$g(_objectSpread$g(_objectSpread$g({}, otherCoordinateProps), typeof _x === "number" && {
            x: Math.max(viewBox.x, Math.min(_x, viewBox.x + viewBox.width))
          }), typeof _y === "number" && {
            y: Math.max(viewBox.y, Math.min(_y, viewBox.y + viewBox.height))
          });
          var boundedAction = _objectSpread$g(_objectSpread$g({}, action), {}, {
            payload: _objectSpread$g(_objectSpread$g({}, action.payload), {}, {
              coordinate: boundedCoordinate
            })
          });
          dispatch(boundedAction);
        } else {
          dispatch(action);
        }
        return;
      }
      if (tooltipTicks == null) {
        return;
      }
      var activeTick;
      if (typeof syncMethod === "function") {
        var syncMethodParam = {
          activeTooltipIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
          isTooltipActive: action.payload.active,
          activeIndex: action.payload.index == null ? void 0 : Number(action.payload.index),
          activeLabel: action.payload.label,
          activeDataKey: action.payload.dataKey,
          activeCoordinate: action.payload.coordinate
        };
        var activeTooltipIndex = syncMethod(tooltipTicks, syncMethodParam);
        activeTick = tooltipTicks[activeTooltipIndex];
      } else if (syncMethod === "value") {
        activeTick = tooltipTicks.find((tick) => String(tick.value) === action.payload.label);
      }
      var {
        coordinate
      } = action.payload;
      if (activeTick == null || action.payload.active === false || coordinate == null || viewBox == null) {
        dispatch(setSyncInteraction({
          active: false,
          coordinate: void 0,
          dataKey: void 0,
          index: null,
          label: void 0
        }));
        return;
      }
      var {
        x: x2,
        y: y2
      } = coordinate;
      var validateChartX = Math.min(x2, viewBox.x + viewBox.width);
      var validateChartY = Math.min(y2, viewBox.y + viewBox.height);
      var activeCoordinate = {
        x: layout === "horizontal" ? activeTick.coordinate : validateChartX,
        y: layout === "horizontal" ? validateChartY : activeTick.coordinate
      };
      var syncAction = setSyncInteraction({
        active: action.payload.active,
        coordinate: activeCoordinate,
        dataKey: action.payload.dataKey,
        index: String(activeTick.index),
        label: action.payload.label
      });
      dispatch(syncAction);
    };
    eventCenter.on(TOOLTIP_SYNC_EVENT, listener2);
    return () => {
      eventCenter.off(TOOLTIP_SYNC_EVENT, listener2);
    };
  }, [className, dispatch, myEventEmitter, mySyncId, syncMethod, tooltipTicks, layout, viewBox]);
}
function useBrushSyncEventsListener() {
  var mySyncId = useAppSelector(selectSyncId);
  var myEventEmitter = useAppSelector(selectEventEmitter);
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    if (mySyncId == null) {
      return noop$1;
    }
    var listener2 = (incomingSyncId, action, emitter) => {
      if (myEventEmitter === emitter) {
        return;
      }
      if (mySyncId === incomingSyncId) {
        dispatch(setDataStartEndIndexes(action));
      }
    };
    eventCenter.on(BRUSH_SYNC_EVENT, listener2);
    return () => {
      eventCenter.off(BRUSH_SYNC_EVENT, listener2);
    };
  }, [dispatch, myEventEmitter, mySyncId]);
}
function useSynchronisedEventsFromOtherCharts() {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(createEventEmitter());
  }, [dispatch]);
  useTooltipSyncEventsListener();
  useBrushSyncEventsListener();
}
function useTooltipChartSynchronisation(tooltipEventType, trigger, activeCoordinate, activeLabel, activeIndex, isTooltipActive) {
  var activeDataKey = useAppSelector((state) => selectTooltipDataKey(state, tooltipEventType, trigger));
  var eventEmitterSymbol = useAppSelector(selectEventEmitter);
  var syncId = useAppSelector(selectSyncId);
  var syncMethod = useAppSelector(selectSyncMethod);
  var tooltipState = useAppSelector(selectSynchronisedTooltipState);
  var isReceivingSynchronisation = tooltipState === null || tooltipState === void 0 ? void 0 : tooltipState.active;
  reactExports.useEffect(() => {
    if (isReceivingSynchronisation) {
      return;
    }
    if (syncId == null) {
      return;
    }
    if (eventEmitterSymbol == null) {
      return;
    }
    var syncAction = setSyncInteraction({
      active: isTooltipActive,
      coordinate: activeCoordinate,
      dataKey: activeDataKey,
      index: activeIndex,
      label: typeof activeLabel === "number" ? String(activeLabel) : activeLabel
    });
    eventCenter.emit(TOOLTIP_SYNC_EVENT, syncId, syncAction, eventEmitterSymbol);
  }, [isReceivingSynchronisation, activeCoordinate, activeDataKey, activeIndex, activeLabel, eventEmitterSymbol, syncId, syncMethod, isTooltipActive]);
}
function ownKeys$f(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$f(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$f(Object(t2), true).forEach(function(r3) {
      _defineProperty$j(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$f(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$j(e3, r2, t2) {
  return (r2 = _toPropertyKey$j(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$j(t2) {
  var i = _toPrimitive$j(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$j(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function defaultUniqBy(entry) {
  return entry.dataKey;
}
function renderContent(content, props) {
  if (/* @__PURE__ */ reactExports.isValidElement(content)) {
    return /* @__PURE__ */ reactExports.cloneElement(content, props);
  }
  if (typeof content === "function") {
    return /* @__PURE__ */ reactExports.createElement(content, props);
  }
  return /* @__PURE__ */ reactExports.createElement(DefaultTooltipContent, props);
}
var emptyPayload = [];
var defaultTooltipProps = {
  allowEscapeViewBox: {
    x: false,
    y: false
  },
  animationDuration: 400,
  animationEasing: "ease",
  axisId: 0,
  contentStyle: {},
  cursor: true,
  filterNull: true,
  isAnimationActive: !Global.isSsr,
  itemSorter: "name",
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: false,
    y: false
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: false,
  wrapperStyle: {}
};
function Tooltip(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultTooltipProps);
  var {
    active: activeFromProps,
    allowEscapeViewBox,
    animationDuration,
    animationEasing,
    content,
    filterNull,
    isAnimationActive,
    offset,
    payloadUniqBy,
    position,
    reverseDirection,
    useTranslate3d,
    wrapperStyle,
    cursor,
    shared,
    trigger,
    defaultIndex,
    portal: portalFromProps,
    axisId
  } = props;
  var dispatch = useAppDispatch();
  var defaultIndexAsString = typeof defaultIndex === "number" ? String(defaultIndex) : defaultIndex;
  reactExports.useEffect(() => {
    dispatch(setTooltipSettingsState({
      shared,
      trigger,
      axisId,
      active: activeFromProps,
      defaultIndex: defaultIndexAsString
    }));
  }, [dispatch, shared, trigger, axisId, activeFromProps, defaultIndexAsString]);
  var viewBox = useViewBox();
  var accessibilityLayer = useAccessibilityLayer();
  var tooltipEventType = useTooltipEventType(shared);
  var {
    activeIndex,
    isActive
  } = useAppSelector((state) => selectIsTooltipActive(state, tooltipEventType, trigger, defaultIndexAsString));
  var payloadFromRedux = useAppSelector((state) => selectTooltipPayload(state, tooltipEventType, trigger, defaultIndexAsString));
  var labelFromRedux = useAppSelector((state) => selectActiveLabel(state, tooltipEventType, trigger, defaultIndexAsString));
  var coordinate = useAppSelector((state) => selectActiveCoordinate(state, tooltipEventType, trigger, defaultIndexAsString));
  var payload = payloadFromRedux;
  var tooltipPortalFromContext = useTooltipPortal();
  var finalIsActive = activeFromProps !== null && activeFromProps !== void 0 ? activeFromProps : isActive;
  var [lastBoundingBox, updateBoundingBox] = useElementOffset([payload, finalIsActive]);
  var finalLabel = tooltipEventType === "axis" ? labelFromRedux : void 0;
  useTooltipChartSynchronisation(tooltipEventType, trigger, coordinate, finalLabel, activeIndex, finalIsActive);
  var tooltipPortal = portalFromProps !== null && portalFromProps !== void 0 ? portalFromProps : tooltipPortalFromContext;
  if (tooltipPortal == null) {
    return null;
  }
  var finalPayload = payload !== null && payload !== void 0 ? payload : emptyPayload;
  if (!finalIsActive) {
    finalPayload = emptyPayload;
  }
  if (filterNull && finalPayload.length) {
    finalPayload = getUniqPayload(payload.filter((entry) => entry.value != null && (entry.hide !== true || props.includeHidden)), payloadUniqBy, defaultUniqBy);
  }
  var hasPayload = finalPayload.length > 0;
  var tooltipElement = /* @__PURE__ */ reactExports.createElement(TooltipBoundingBox, {
    allowEscapeViewBox,
    animationDuration,
    animationEasing,
    isAnimationActive,
    active: finalIsActive,
    coordinate,
    hasPayload,
    offset,
    position,
    reverseDirection,
    useTranslate3d,
    viewBox,
    wrapperStyle,
    lastBoundingBox,
    innerRef: updateBoundingBox,
    hasPortalFromProps: Boolean(portalFromProps)
  }, renderContent(content, _objectSpread$f(_objectSpread$f({}, props), {}, {
    // @ts-expect-error renderContent method expects the payload to be mutable, TODO make it immutable
    payload: finalPayload,
    label: finalLabel,
    active: finalIsActive,
    coordinate,
    accessibilityLayer
  })));
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactDomExports.createPortal(tooltipElement, tooltipPortal), finalIsActive && /* @__PURE__ */ reactExports.createElement(Cursor, {
    cursor,
    tooltipEventType,
    coordinate,
    payload,
    index: activeIndex
  }));
}
var throttle$2 = {};
var debounce$1 = {};
var debounce = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function debounce2(func, debounceMs, { signal, edges } = {}) {
    let pendingThis = void 0;
    let pendingArgs = null;
    const leading = edges != null && edges.includes("leading");
    const trailing = edges == null || edges.includes("trailing");
    const invoke = () => {
      if (pendingArgs !== null) {
        func.apply(pendingThis, pendingArgs);
        pendingThis = void 0;
        pendingArgs = null;
      }
    };
    const onTimerEnd = () => {
      if (trailing) {
        invoke();
      }
      cancel();
    };
    let timeoutId = null;
    const schedule = () => {
      if (timeoutId != null) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        timeoutId = null;
        onTimerEnd();
      }, debounceMs);
    };
    const cancelTimer = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    };
    const cancel = () => {
      cancelTimer();
      pendingThis = void 0;
      pendingArgs = null;
    };
    const flush = () => {
      invoke();
    };
    const debounced = function(...args) {
      if (signal == null ? void 0 : signal.aborted) {
        return;
      }
      pendingThis = this;
      pendingArgs = args;
      const isFirstCall = timeoutId == null;
      schedule();
      if (leading && isFirstCall) {
        invoke();
      }
    };
    debounced.schedule = schedule;
    debounced.cancel = cancel;
    debounced.flush = flush;
    signal == null ? void 0 : signal.addEventListener("abort", cancel, { once: true });
    return debounced;
  }
  exports.debounce = debounce2;
})(debounce);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const debounce$12 = debounce;
  function debounce$2(func, debounceMs = 0, options = {}) {
    if (typeof options !== "object") {
      options = {};
    }
    const { leading = false, trailing = true, maxWait } = options;
    const edges = Array(2);
    if (leading) {
      edges[0] = "leading";
    }
    if (trailing) {
      edges[1] = "trailing";
    }
    let result = void 0;
    let pendingAt = null;
    const _debounced = debounce$12.debounce(function(...args) {
      result = func.apply(this, args);
      pendingAt = null;
    }, debounceMs, { edges });
    const debounced = function(...args) {
      if (maxWait != null) {
        if (pendingAt === null) {
          pendingAt = Date.now();
        }
        if (Date.now() - pendingAt >= maxWait) {
          result = func.apply(this, args);
          pendingAt = Date.now();
          _debounced.cancel();
          _debounced.schedule();
          return result;
        }
      }
      _debounced.apply(this, args);
      return result;
    };
    const flush = () => {
      _debounced.flush();
      return result;
    };
    debounced.cancel = _debounced.cancel;
    debounced.flush = flush;
    return debounced;
  }
  exports.debounce = debounce$2;
})(debounce$1);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const debounce2 = debounce$1;
  function throttle2(func, throttleMs = 0, options = {}) {
    const { leading = true, trailing = true } = options;
    return debounce2.debounce(func, throttleMs, {
      leading,
      maxWait: throttleMs,
      trailing
    });
  }
  exports.throttle = throttle2;
})(throttle$2);
var throttle = throttle$2.throttle;
const throttle$1 = /* @__PURE__ */ getDefaultExportFromCjs(throttle);
var warn = function warn2(condition, format2) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }
};
function ownKeys$e(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$e(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$e(Object(t2), true).forEach(function(r3) {
      _defineProperty$i(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$e(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$i(e3, r2, t2) {
  return (r2 = _toPropertyKey$i(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$i(t2) {
  var i = _toPrimitive$i(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$i(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var ResponsiveContainer = /* @__PURE__ */ reactExports.forwardRef((_ref2, ref) => {
  var {
    aspect,
    initialDimension = {
      width: -1,
      height: -1
    },
    width = "100%",
    height = "100%",
    /*
     * default min-width to 0 if not specified - 'auto' causes issues with flexbox
     * https://github.com/recharts/recharts/issues/172
     */
    minWidth = 0,
    minHeight,
    maxHeight,
    children,
    debounce: debounce2 = 0,
    id,
    className,
    onResize,
    style = {}
  } = _ref2;
  var containerRef = reactExports.useRef(null);
  var onResizeRef = reactExports.useRef();
  onResizeRef.current = onResize;
  reactExports.useImperativeHandle(ref, () => containerRef.current);
  var [sizes, setSizes] = reactExports.useState({
    containerWidth: initialDimension.width,
    containerHeight: initialDimension.height
  });
  var setContainerSize = reactExports.useCallback((newWidth, newHeight) => {
    setSizes((prevState) => {
      var roundedWidth = Math.round(newWidth);
      var roundedHeight = Math.round(newHeight);
      if (prevState.containerWidth === roundedWidth && prevState.containerHeight === roundedHeight) {
        return prevState;
      }
      return {
        containerWidth: roundedWidth,
        containerHeight: roundedHeight
      };
    });
  }, []);
  reactExports.useEffect(() => {
    var callback = (entries) => {
      var _onResizeRef$current;
      var {
        width: containerWidth2,
        height: containerHeight2
      } = entries[0].contentRect;
      setContainerSize(containerWidth2, containerHeight2);
      (_onResizeRef$current = onResizeRef.current) === null || _onResizeRef$current === void 0 || _onResizeRef$current.call(onResizeRef, containerWidth2, containerHeight2);
    };
    if (debounce2 > 0) {
      callback = throttle$1(callback, debounce2, {
        trailing: true,
        leading: false
      });
    }
    var observer = new ResizeObserver(callback);
    var {
      width: containerWidth,
      height: containerHeight
    } = containerRef.current.getBoundingClientRect();
    setContainerSize(containerWidth, containerHeight);
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [setContainerSize, debounce2]);
  var chartContent = reactExports.useMemo(() => {
    var {
      containerWidth,
      containerHeight
    } = sizes;
    if (containerWidth < 0 || containerHeight < 0) {
      return null;
    }
    warn(isPercent(width) || isPercent(height), "The width(%s) and height(%s) are both fixed numbers,\n       maybe you don't need to use a ResponsiveContainer.", width, height);
    warn(!aspect || aspect > 0, "The aspect(%s) must be greater than zero.", aspect);
    var calculatedWidth = isPercent(width) ? containerWidth : width;
    var calculatedHeight = isPercent(height) ? containerHeight : height;
    if (aspect && aspect > 0) {
      if (calculatedWidth) {
        calculatedHeight = calculatedWidth / aspect;
      } else if (calculatedHeight) {
        calculatedWidth = calculatedHeight * aspect;
      }
      if (maxHeight && calculatedHeight > maxHeight) {
        calculatedHeight = maxHeight;
      }
    }
    warn(calculatedWidth > 0 || calculatedHeight > 0, "The width(%s) and height(%s) of chart should be greater than 0,\n       please check the style of container, or the props width(%s) and height(%s),\n       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the\n       height and width.", calculatedWidth, calculatedHeight, width, height, minWidth, minHeight, aspect);
    return reactExports.Children.map(children, (child) => {
      return /* @__PURE__ */ reactExports.cloneElement(child, {
        width: calculatedWidth,
        height: calculatedHeight,
        // calculate the actual size and override it.
        style: _objectSpread$e({
          width: calculatedWidth,
          height: calculatedHeight
        }, child.props.style)
      });
    });
  }, [aspect, children, height, maxHeight, minHeight, minWidth, sizes, width]);
  return /* @__PURE__ */ reactExports.createElement("div", {
    id: id ? "".concat(id) : void 0,
    className: clsx("recharts-responsive-container", className),
    style: _objectSpread$e(_objectSpread$e({}, style), {}, {
      width,
      height,
      minWidth,
      minHeight,
      maxHeight
    }),
    ref: containerRef
  }, /* @__PURE__ */ reactExports.createElement("div", {
    style: {
      width: 0,
      height: 0,
      overflow: "visible"
    }
  }, chartContent));
});
var Cell = (_props) => null;
Cell.displayName = "Cell";
function _defineProperty$h(e3, r2, t2) {
  return (r2 = _toPropertyKey$h(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$h(t2) {
  var i = _toPrimitive$h(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$h(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
class LRUCache {
  constructor(maxSize) {
    _defineProperty$h(this, "cache", /* @__PURE__ */ new Map());
    this.maxSize = maxSize;
  }
  get(key) {
    var value = this.cache.get(key);
    if (value !== void 0) {
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }
  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      var firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, value);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function ownKeys$d(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$d(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$d(Object(t2), true).forEach(function(r3) {
      _defineProperty$g(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$d(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$g(e3, r2, t2) {
  return (r2 = _toPropertyKey$g(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$g(t2) {
  var i = _toPrimitive$g(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$g(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var defaultConfig = {
  cacheSize: 2e3,
  enableCache: true
};
var currentConfig = _objectSpread$d({}, defaultConfig);
var stringCache = new LRUCache(currentConfig.cacheSize);
var SPAN_STYLE = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
};
var MEASUREMENT_SPAN_ID = "recharts_measurement_span";
function createCacheKey(text, style) {
  var fontSize = style.fontSize || "";
  var fontFamily = style.fontFamily || "";
  var fontWeight = style.fontWeight || "";
  var fontStyle = style.fontStyle || "";
  var letterSpacing = style.letterSpacing || "";
  var textTransform = style.textTransform || "";
  return "".concat(text, "|").concat(fontSize, "|").concat(fontFamily, "|").concat(fontWeight, "|").concat(fontStyle, "|").concat(letterSpacing, "|").concat(textTransform);
}
var measureTextWithDOM = (text, style) => {
  try {
    var measurementSpan = document.getElementById(MEASUREMENT_SPAN_ID);
    if (!measurementSpan) {
      measurementSpan = document.createElement("span");
      measurementSpan.setAttribute("id", MEASUREMENT_SPAN_ID);
      measurementSpan.setAttribute("aria-hidden", "true");
      document.body.appendChild(measurementSpan);
    }
    Object.assign(measurementSpan.style, SPAN_STYLE, style);
    measurementSpan.textContent = "".concat(text);
    var rect = measurementSpan.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height
    };
  } catch (_unused) {
    return {
      width: 0,
      height: 0
    };
  }
};
var getStringSize = function getStringSize2(text) {
  var style = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (text === void 0 || text === null || Global.isSsr) {
    return {
      width: 0,
      height: 0
    };
  }
  if (!currentConfig.enableCache) {
    return measureTextWithDOM(text, style);
  }
  var cacheKey = createCacheKey(text, style);
  var cachedResult = stringCache.get(cacheKey);
  if (cachedResult) {
    return cachedResult;
  }
  var result = measureTextWithDOM(text, style);
  stringCache.set(cacheKey, result);
  return result;
};
var MULTIPLY_OR_DIVIDE_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var ADD_OR_SUBTRACT_REGEX = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/;
var CSS_LENGTH_UNIT_REGEX = /^px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q$/;
var NUM_SPLIT_REGEX = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/;
var CONVERSION_RATES = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
};
var FIXED_CSS_LENGTH_UNITS = Object.keys(CONVERSION_RATES);
var STR_NAN = "NaN";
function convertToPx(value, unit2) {
  return value * CONVERSION_RATES[unit2];
}
class DecimalCSS {
  static parse(str) {
    var _NUM_SPLIT_REGEX$exec;
    var [, numStr, unit2] = (_NUM_SPLIT_REGEX$exec = NUM_SPLIT_REGEX.exec(str)) !== null && _NUM_SPLIT_REGEX$exec !== void 0 ? _NUM_SPLIT_REGEX$exec : [];
    return new DecimalCSS(parseFloat(numStr), unit2 !== null && unit2 !== void 0 ? unit2 : "");
  }
  constructor(num, unit2) {
    this.num = num;
    this.unit = unit2;
    this.num = num;
    this.unit = unit2;
    if (isNan(num)) {
      this.unit = "";
    }
    if (unit2 !== "" && !CSS_LENGTH_UNIT_REGEX.test(unit2)) {
      this.num = NaN;
      this.unit = "";
    }
    if (FIXED_CSS_LENGTH_UNITS.includes(unit2)) {
      this.num = convertToPx(num, unit2);
      this.unit = "px";
    }
  }
  add(other) {
    if (this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num + other.num, this.unit);
  }
  subtract(other) {
    if (this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num - other.num, this.unit);
  }
  multiply(other) {
    if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num * other.num, this.unit || other.unit);
  }
  divide(other) {
    if (this.unit !== "" && other.unit !== "" && this.unit !== other.unit) {
      return new DecimalCSS(NaN, "");
    }
    return new DecimalCSS(this.num / other.num, this.unit || other.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return isNan(this.num);
  }
}
function calculateArithmetic(expr) {
  if (expr.includes(STR_NAN)) {
    return STR_NAN;
  }
  var newExpr = expr;
  while (newExpr.includes("*") || newExpr.includes("/")) {
    var _MULTIPLY_OR_DIVIDE_R;
    var [, leftOperand, operator, rightOperand] = (_MULTIPLY_OR_DIVIDE_R = MULTIPLY_OR_DIVIDE_REGEX.exec(newExpr)) !== null && _MULTIPLY_OR_DIVIDE_R !== void 0 ? _MULTIPLY_OR_DIVIDE_R : [];
    var lTs = DecimalCSS.parse(leftOperand !== null && leftOperand !== void 0 ? leftOperand : "");
    var rTs = DecimalCSS.parse(rightOperand !== null && rightOperand !== void 0 ? rightOperand : "");
    var result = operator === "*" ? lTs.multiply(rTs) : lTs.divide(rTs);
    if (result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(MULTIPLY_OR_DIVIDE_REGEX, result.toString());
  }
  while (newExpr.includes("+") || /.-\d+(?:\.\d+)?/.test(newExpr)) {
    var _ADD_OR_SUBTRACT_REGE;
    var [, _leftOperand, _operator, _rightOperand] = (_ADD_OR_SUBTRACT_REGE = ADD_OR_SUBTRACT_REGEX.exec(newExpr)) !== null && _ADD_OR_SUBTRACT_REGE !== void 0 ? _ADD_OR_SUBTRACT_REGE : [];
    var _lTs = DecimalCSS.parse(_leftOperand !== null && _leftOperand !== void 0 ? _leftOperand : "");
    var _rTs = DecimalCSS.parse(_rightOperand !== null && _rightOperand !== void 0 ? _rightOperand : "");
    var _result = _operator === "+" ? _lTs.add(_rTs) : _lTs.subtract(_rTs);
    if (_result.isNaN()) {
      return STR_NAN;
    }
    newExpr = newExpr.replace(ADD_OR_SUBTRACT_REGEX, _result.toString());
  }
  return newExpr;
}
var PARENTHESES_REGEX = /\(([^()]*)\)/;
function calculateParentheses(expr) {
  var newExpr = expr;
  var match;
  while ((match = PARENTHESES_REGEX.exec(newExpr)) != null) {
    var [, parentheticalExpression] = match;
    newExpr = newExpr.replace(PARENTHESES_REGEX, calculateArithmetic(parentheticalExpression));
  }
  return newExpr;
}
function evaluateExpression(expression) {
  var newExpr = expression.replace(/\s+/g, "");
  newExpr = calculateParentheses(newExpr);
  newExpr = calculateArithmetic(newExpr);
  return newExpr;
}
function safeEvaluateExpression(expression) {
  try {
    return evaluateExpression(expression);
  } catch (_unused) {
    return STR_NAN;
  }
}
function reduceCSSCalc(expression) {
  var result = safeEvaluateExpression(expression.slice(5, -1));
  if (result === STR_NAN) {
    return "";
  }
  return result;
}
var _excluded$e = ["x", "y", "lineHeight", "capHeight", "scaleToFit", "textAnchor", "verticalAnchor", "fill"], _excluded2$7 = ["dx", "dy", "angle", "className", "breakAll"];
function _extends$d() {
  return _extends$d = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$d.apply(null, arguments);
}
function _objectWithoutProperties$e(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$e(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$e(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var BREAKING_SPACES = /[ \f\n\r\t\v\u2028\u2029]+/;
var calculateWordWidths = (_ref2) => {
  var {
    children,
    breakAll,
    style
  } = _ref2;
  try {
    var words = [];
    if (!isNullish(children)) {
      if (breakAll) {
        words = children.toString().split("");
      } else {
        words = children.toString().split(BREAKING_SPACES);
      }
    }
    var wordsWithComputedWidth = words.map((word) => ({
      word,
      width: getStringSize(word, style).width
    }));
    var spaceWidth = breakAll ? 0 : getStringSize(" ", style).width;
    return {
      wordsWithComputedWidth,
      spaceWidth
    };
  } catch (_unused) {
    return null;
  }
};
var calculateWordsByLines = (_ref2, initialWordsWithComputedWith, spaceWidth, lineWidth, scaleToFit) => {
  var {
    maxLines,
    children,
    style,
    breakAll
  } = _ref2;
  var shouldLimitLines = isNumber(maxLines);
  var text = children;
  var calculate = function calculate2() {
    var words = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    return words.reduce((result2, _ref3) => {
      var {
        word,
        width
      } = _ref3;
      var currentLine = result2[result2.length - 1];
      if (currentLine && (lineWidth == null || scaleToFit || currentLine.width + width + spaceWidth < Number(lineWidth))) {
        currentLine.words.push(word);
        currentLine.width += width + spaceWidth;
      } else {
        var newLine = {
          words: [word],
          width
        };
        result2.push(newLine);
      }
      return result2;
    }, []);
  };
  var originalResult = calculate(initialWordsWithComputedWith);
  var findLongestLine = (words) => words.reduce((a2, b2) => a2.width > b2.width ? a2 : b2);
  if (!shouldLimitLines || scaleToFit) {
    return originalResult;
  }
  var overflows = originalResult.length > maxLines || findLongestLine(originalResult).width > Number(lineWidth);
  if (!overflows) {
    return originalResult;
  }
  var suffix = "…";
  var checkOverflow = (index) => {
    var tempText = text.slice(0, index);
    var words = calculateWordWidths({
      breakAll,
      style,
      children: tempText + suffix
    }).wordsWithComputedWidth;
    var result2 = calculate(words);
    var doesOverflow = result2.length > maxLines || findLongestLine(result2).width > Number(lineWidth);
    return [doesOverflow, result2];
  };
  var start = 0;
  var end = text.length - 1;
  var iterations = 0;
  var trimmedResult;
  while (start <= end && iterations <= text.length - 1) {
    var middle = Math.floor((start + end) / 2);
    var prev = middle - 1;
    var [doesPrevOverflow, result] = checkOverflow(prev);
    var [doesMiddleOverflow] = checkOverflow(middle);
    if (!doesPrevOverflow && !doesMiddleOverflow) {
      start = middle + 1;
    }
    if (doesPrevOverflow && doesMiddleOverflow) {
      end = middle - 1;
    }
    if (!doesPrevOverflow && doesMiddleOverflow) {
      trimmedResult = result;
      break;
    }
    iterations++;
  }
  return trimmedResult || originalResult;
};
var getWordsWithoutCalculate = (children) => {
  var words = !isNullish(children) ? children.toString().split(BREAKING_SPACES) : [];
  return [{
    words
  }];
};
var getWordsByLines = (_ref4) => {
  var {
    width,
    scaleToFit,
    children,
    style,
    breakAll,
    maxLines
  } = _ref4;
  if ((width || scaleToFit) && !Global.isSsr) {
    var wordsWithComputedWidth, spaceWidth;
    var wordWidths = calculateWordWidths({
      breakAll,
      children,
      style
    });
    if (wordWidths) {
      var {
        wordsWithComputedWidth: wcw,
        spaceWidth: sw
      } = wordWidths;
      wordsWithComputedWidth = wcw;
      spaceWidth = sw;
    } else {
      return getWordsWithoutCalculate(children);
    }
    return calculateWordsByLines({
      breakAll,
      children,
      maxLines,
      style
    }, wordsWithComputedWidth, spaceWidth, width, scaleToFit);
  }
  return getWordsWithoutCalculate(children);
};
var DEFAULT_FILL = "#808080";
var Text = /* @__PURE__ */ reactExports.forwardRef((_ref5, ref) => {
  var {
    x: propsX = 0,
    y: propsY = 0,
    lineHeight = "1em",
    // Magic number from d3
    capHeight = "0.71em",
    scaleToFit = false,
    textAnchor = "start",
    // Maintain compat with existing charts / default SVG behavior
    verticalAnchor = "end",
    fill = DEFAULT_FILL
  } = _ref5, props = _objectWithoutProperties$e(_ref5, _excluded$e);
  var wordsByLines = reactExports.useMemo(() => {
    return getWordsByLines({
      breakAll: props.breakAll,
      children: props.children,
      maxLines: props.maxLines,
      scaleToFit,
      style: props.style,
      width: props.width
    });
  }, [props.breakAll, props.children, props.maxLines, scaleToFit, props.style, props.width]);
  var {
    dx,
    dy,
    angle,
    className,
    breakAll
  } = props, textProps = _objectWithoutProperties$e(props, _excluded2$7);
  if (!isNumOrStr(propsX) || !isNumOrStr(propsY) || wordsByLines.length === 0) {
    return null;
  }
  var x2 = propsX + (isNumber(dx) ? dx : 0);
  var y2 = propsY + (isNumber(dy) ? dy : 0);
  var startDy;
  switch (verticalAnchor) {
    case "start":
      startDy = reduceCSSCalc("calc(".concat(capHeight, ")"));
      break;
    case "middle":
      startDy = reduceCSSCalc("calc(".concat((wordsByLines.length - 1) / 2, " * -").concat(lineHeight, " + (").concat(capHeight, " / 2))"));
      break;
    default:
      startDy = reduceCSSCalc("calc(".concat(wordsByLines.length - 1, " * -").concat(lineHeight, ")"));
      break;
  }
  var transforms = [];
  if (scaleToFit) {
    var lineWidth = wordsByLines[0].width;
    var {
      width
    } = props;
    transforms.push("scale(".concat(isNumber(width) ? width / lineWidth : 1, ")"));
  }
  if (angle) {
    transforms.push("rotate(".concat(angle, ", ").concat(x2, ", ").concat(y2, ")"));
  }
  if (transforms.length) {
    textProps.transform = transforms.join(" ");
  }
  return /* @__PURE__ */ reactExports.createElement("text", _extends$d({}, filterProps(textProps, true), {
    ref,
    x: x2,
    y: y2,
    className: clsx("recharts-text", className),
    textAnchor,
    fill: fill.includes("url") ? DEFAULT_FILL : fill
  }), wordsByLines.map((line, index) => {
    var words = line.words.join(breakAll ? "" : " ");
    return (
      // duplicate words will cause duplicate keys
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ reactExports.createElement("tspan", {
        x: x2,
        dy: index === 0 ? startDy : lineHeight,
        key: "".concat(words, "-").concat(index)
      }, words)
    );
  }));
});
Text.displayName = "Text";
var _excluded$d = ["labelRef"];
function _objectWithoutProperties$d(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$d(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$d(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function ownKeys$c(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$c(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$c(Object(t2), true).forEach(function(r3) {
      _defineProperty$f(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$c(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$f(e3, r2, t2) {
  return (r2 = _toPropertyKey$f(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$f(t2) {
  var i = _toPrimitive$f(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$f(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _extends$c() {
  return _extends$c = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$c.apply(null, arguments);
}
var CartesianLabelContext = /* @__PURE__ */ reactExports.createContext(null);
var CartesianLabelContextProvider = (_ref2) => {
  var {
    x: x2,
    y: y2,
    width,
    height,
    children
  } = _ref2;
  var viewBox = reactExports.useMemo(() => ({
    x: x2,
    y: y2,
    width,
    height
  }), [x2, y2, width, height]);
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelContext.Provider, {
    value: viewBox
  }, children);
};
var useCartesianLabelContext = () => {
  var labelChildContext = reactExports.useContext(CartesianLabelContext);
  var chartContext = useViewBox();
  return labelChildContext || chartContext;
};
var PolarLabelContext = /* @__PURE__ */ reactExports.createContext(null);
var usePolarLabelContext = () => {
  var labelChildContext = reactExports.useContext(PolarLabelContext);
  var chartContext = useAppSelector(selectPolarViewBox);
  return labelChildContext || chartContext;
};
var getLabel = (props) => {
  var {
    value,
    formatter
  } = props;
  var label = isNullish(props.children) ? value : props.children;
  if (typeof formatter === "function") {
    return formatter(label);
  }
  return label;
};
var isLabelContentAFunction = (content) => {
  return content != null && typeof content === "function";
};
var getDeltaAngle = (startAngle, endAngle) => {
  var sign2 = mathSign(endAngle - startAngle);
  var deltaAngle = Math.min(Math.abs(endAngle - startAngle), 360);
  return sign2 * deltaAngle;
};
var renderRadialLabel = (labelProps, position, label, attrs, viewBox) => {
  var {
    offset,
    className
  } = labelProps;
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    clockWise
  } = viewBox;
  var radius = (innerRadius + outerRadius) / 2;
  var deltaAngle = getDeltaAngle(startAngle, endAngle);
  var sign2 = deltaAngle >= 0 ? 1 : -1;
  var labelAngle, direction;
  switch (position) {
    case "insideStart":
      labelAngle = startAngle + sign2 * offset;
      direction = clockWise;
      break;
    case "insideEnd":
      labelAngle = endAngle - sign2 * offset;
      direction = !clockWise;
      break;
    case "end":
      labelAngle = endAngle + sign2 * offset;
      direction = clockWise;
      break;
    default:
      throw new Error("Unsupported position ".concat(position));
  }
  direction = deltaAngle <= 0 ? direction : !direction;
  var startPoint = polarToCartesian(cx, cy, radius, labelAngle);
  var endPoint = polarToCartesian(cx, cy, radius, labelAngle + (direction ? 1 : -1) * 359);
  var path = "M".concat(startPoint.x, ",").concat(startPoint.y, "\n    A").concat(radius, ",").concat(radius, ",0,1,").concat(direction ? 0 : 1, ",\n    ").concat(endPoint.x, ",").concat(endPoint.y);
  var id = isNullish(labelProps.id) ? uniqueId("recharts-radial-line-") : labelProps.id;
  return /* @__PURE__ */ reactExports.createElement("text", _extends$c({}, attrs, {
    dominantBaseline: "central",
    className: clsx("recharts-radial-bar-label", className)
  }), /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("path", {
    id,
    d: path
  })), /* @__PURE__ */ reactExports.createElement("textPath", {
    xlinkHref: "#".concat(id)
  }, label));
};
var getAttrsOfPolarLabel = (viewBox, offset, position) => {
  var {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle
  } = viewBox;
  var midAngle = (startAngle + endAngle) / 2;
  if (position === "outside") {
    var {
      x: _x,
      y: _y
    } = polarToCartesian(cx, cy, outerRadius + offset, midAngle);
    return {
      x: _x,
      y: _y,
      textAnchor: _x >= cx ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (position === "center") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  }
  if (position === "centerTop") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  }
  if (position === "centerBottom") {
    return {
      x: cx,
      y: cy,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  }
  var r2 = (innerRadius + outerRadius) / 2;
  var {
    x: x2,
    y: y2
  } = polarToCartesian(cx, cy, r2, midAngle);
  return {
    x: x2,
    y: y2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
};
var isPolar = (viewBox) => "cx" in viewBox && isNumber(viewBox.cx);
var getAttrsOfCartesianLabel = (props, viewBox) => {
  var {
    parentViewBox: parentViewBoxFromProps,
    offset,
    position
  } = props;
  var parentViewBox;
  if (parentViewBoxFromProps != null && !isPolar(parentViewBoxFromProps)) {
    parentViewBox = parentViewBoxFromProps;
  }
  var {
    x: x2,
    y: y2,
    width,
    height
  } = viewBox;
  var verticalSign = height >= 0 ? 1 : -1;
  var verticalOffset = verticalSign * offset;
  var verticalEnd = verticalSign > 0 ? "end" : "start";
  var verticalStart = verticalSign > 0 ? "start" : "end";
  var horizontalSign = width >= 0 ? 1 : -1;
  var horizontalOffset = horizontalSign * offset;
  var horizontalEnd = horizontalSign > 0 ? "end" : "start";
  var horizontalStart = horizontalSign > 0 ? "start" : "end";
  if (position === "top") {
    var attrs = {
      x: x2 + width / 2,
      y: y2 - verticalSign * offset,
      textAnchor: "middle",
      verticalAnchor: verticalEnd
    };
    return _objectSpread$c(_objectSpread$c({}, attrs), parentViewBox ? {
      height: Math.max(y2 - parentViewBox.y, 0),
      width
    } : {});
  }
  if (position === "bottom") {
    var _attrs = {
      x: x2 + width / 2,
      y: y2 + height + verticalOffset,
      textAnchor: "middle",
      verticalAnchor: verticalStart
    };
    return _objectSpread$c(_objectSpread$c({}, _attrs), parentViewBox ? {
      height: Math.max(parentViewBox.y + parentViewBox.height - (y2 + height), 0),
      width
    } : {});
  }
  if (position === "left") {
    var _attrs2 = {
      x: x2 - horizontalOffset,
      y: y2 + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: "middle"
    };
    return _objectSpread$c(_objectSpread$c({}, _attrs2), parentViewBox ? {
      width: Math.max(_attrs2.x - parentViewBox.x, 0),
      height
    } : {});
  }
  if (position === "right") {
    var _attrs3 = {
      x: x2 + width + horizontalOffset,
      y: y2 + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: "middle"
    };
    return _objectSpread$c(_objectSpread$c({}, _attrs3), parentViewBox ? {
      width: Math.max(parentViewBox.x + parentViewBox.width - _attrs3.x, 0),
      height
    } : {});
  }
  var sizeAttrs = parentViewBox ? {
    width,
    height
  } : {};
  if (position === "insideLeft") {
    return _objectSpread$c({
      x: x2 + horizontalOffset,
      y: y2 + height / 2,
      textAnchor: horizontalStart,
      verticalAnchor: "middle"
    }, sizeAttrs);
  }
  if (position === "insideRight") {
    return _objectSpread$c({
      x: x2 + width - horizontalOffset,
      y: y2 + height / 2,
      textAnchor: horizontalEnd,
      verticalAnchor: "middle"
    }, sizeAttrs);
  }
  if (position === "insideTop") {
    return _objectSpread$c({
      x: x2 + width / 2,
      y: y2 + verticalOffset,
      textAnchor: "middle",
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideBottom") {
    return _objectSpread$c({
      x: x2 + width / 2,
      y: y2 + height - verticalOffset,
      textAnchor: "middle",
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === "insideTopLeft") {
    return _objectSpread$c({
      x: x2 + horizontalOffset,
      y: y2 + verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideTopRight") {
    return _objectSpread$c({
      x: x2 + width - horizontalOffset,
      y: y2 + verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalStart
    }, sizeAttrs);
  }
  if (position === "insideBottomLeft") {
    return _objectSpread$c({
      x: x2 + horizontalOffset,
      y: y2 + height - verticalOffset,
      textAnchor: horizontalStart,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (position === "insideBottomRight") {
    return _objectSpread$c({
      x: x2 + width - horizontalOffset,
      y: y2 + height - verticalOffset,
      textAnchor: horizontalEnd,
      verticalAnchor: verticalEnd
    }, sizeAttrs);
  }
  if (!!position && typeof position === "object" && (isNumber(position.x) || isPercent(position.x)) && (isNumber(position.y) || isPercent(position.y))) {
    return _objectSpread$c({
      x: x2 + getPercentValue(position.x, width),
      y: y2 + getPercentValue(position.y, height),
      textAnchor: "end",
      verticalAnchor: "end"
    }, sizeAttrs);
  }
  return _objectSpread$c({
    x: x2 + width / 2,
    y: y2 + height / 2,
    textAnchor: "middle",
    verticalAnchor: "middle"
  }, sizeAttrs);
};
var defaultLabelProps = {
  offset: 5
};
function Label(outerProps) {
  var props = resolveDefaultProps(outerProps, defaultLabelProps);
  var {
    viewBox: viewBoxFromProps,
    position,
    value,
    children,
    content,
    className = "",
    textBreakAll,
    labelRef
  } = props;
  var polarViewBox = usePolarLabelContext();
  var cartesianViewBox = useCartesianLabelContext();
  var resolvedViewBox = position === "center" ? cartesianViewBox : polarViewBox !== null && polarViewBox !== void 0 ? polarViewBox : cartesianViewBox;
  var viewBox = viewBoxFromProps || resolvedViewBox;
  if (!viewBox || isNullish(value) && isNullish(children) && !/* @__PURE__ */ reactExports.isValidElement(content) && typeof content !== "function") {
    return null;
  }
  var propsWithViewBox = _objectSpread$c(_objectSpread$c({}, props), {}, {
    viewBox
  });
  if (/* @__PURE__ */ reactExports.isValidElement(content)) {
    var {
      labelRef: _
    } = propsWithViewBox, propsWithoutLabelRef = _objectWithoutProperties$d(propsWithViewBox, _excluded$d);
    return /* @__PURE__ */ reactExports.cloneElement(content, propsWithoutLabelRef);
  }
  var label;
  if (typeof content === "function") {
    label = /* @__PURE__ */ reactExports.createElement(content, propsWithViewBox);
    if (/* @__PURE__ */ reactExports.isValidElement(label)) {
      return label;
    }
  } else {
    label = getLabel(props);
  }
  var isPolarLabel = isPolar(viewBox);
  var attrs = filterProps(props, true);
  if (isPolarLabel && (position === "insideStart" || position === "insideEnd" || position === "end")) {
    return renderRadialLabel(props, position, label, attrs, viewBox);
  }
  var positionAttrs = isPolarLabel ? getAttrsOfPolarLabel(viewBox, props.offset, props.position) : getAttrsOfCartesianLabel(props, viewBox);
  return /* @__PURE__ */ reactExports.createElement(Text, _extends$c({
    ref: labelRef,
    className: clsx("recharts-label", className)
  }, attrs, positionAttrs, {
    breakAll: textBreakAll
  }), label);
}
Label.displayName = "Label";
var parseLabel = (label, viewBox, labelRef) => {
  if (!label) {
    return null;
  }
  var commonProps = {
    viewBox,
    labelRef
  };
  if (label === true) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$c({
      key: "label-implicit"
    }, commonProps));
  }
  if (isNumOrStr(label)) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$c({
      key: "label-implicit",
      value: label
    }, commonProps));
  }
  if (/* @__PURE__ */ reactExports.isValidElement(label)) {
    if (label.type === Label) {
      return /* @__PURE__ */ reactExports.cloneElement(label, _objectSpread$c({
        key: "label-implicit"
      }, commonProps));
    }
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$c({
      key: "label-implicit",
      content: label
    }, commonProps));
  }
  if (isLabelContentAFunction(label)) {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$c({
      key: "label-implicit",
      content: label
    }, commonProps));
  }
  if (label && typeof label === "object") {
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$c({}, label, {
      key: "label-implicit"
    }, commonProps));
  }
  return null;
};
function CartesianLabelFromLabelProp(_ref3) {
  var {
    label
  } = _ref3;
  var viewBox = useCartesianLabelContext();
  return parseLabel(label, viewBox) || null;
}
var last$3 = {};
var last$2 = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function last2(arr) {
    return arr[arr.length - 1];
  }
  exports.last = last2;
})(last$2);
var toArray = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function toArray2(value) {
    return Array.isArray(value) ? value : Array.from(value);
  }
  exports.toArray = toArray2;
})(toArray);
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  const last$12 = last$2;
  const toArray$12 = toArray;
  const isArrayLike$1 = isArrayLike;
  function last2(array2) {
    if (!isArrayLike$1.isArrayLike(array2)) {
      return void 0;
    }
    return last$12.last(toArray$12.toArray(array2));
  }
  exports.last = last2;
})(last$3);
var last = last$3.last;
const last$1 = /* @__PURE__ */ getDefaultExportFromCjs(last);
var _excluded$c = ["valueAccessor"], _excluded2$6 = ["dataKey", "clockWise", "id", "textBreakAll"];
function _extends$b() {
  return _extends$b = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$b.apply(null, arguments);
}
function _objectWithoutProperties$c(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$c(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$c(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var defaultAccessor = (entry) => Array.isArray(entry.value) ? last$1(entry.value) : entry.value;
var CartesianLabelListContext = /* @__PURE__ */ reactExports.createContext(void 0);
var CartesianLabelListContextProvider = CartesianLabelListContext.Provider;
var PolarLabelListContext = /* @__PURE__ */ reactExports.createContext(void 0);
PolarLabelListContext.Provider;
function useCartesianLabelListContext() {
  return reactExports.useContext(CartesianLabelListContext);
}
function usePolarLabelListContext() {
  return reactExports.useContext(PolarLabelListContext);
}
function LabelList(_ref2) {
  var {
    valueAccessor = defaultAccessor
  } = _ref2, restProps = _objectWithoutProperties$c(_ref2, _excluded$c);
  var {
    dataKey,
    clockWise,
    id,
    textBreakAll
  } = restProps, others = _objectWithoutProperties$c(restProps, _excluded2$6);
  var cartesianData = useCartesianLabelListContext();
  var polarData = usePolarLabelListContext();
  var data = cartesianData || polarData;
  if (!data || !data.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(Layer, {
    className: "recharts-label-list"
  }, data.map((entry, index) => {
    var _restProps$fill;
    var value = isNullish(dataKey) ? valueAccessor(entry, index) : getValueByDataKey(entry && entry.payload, dataKey);
    var idProps = isNullish(id) ? {} : {
      id: "".concat(id, "-").concat(index)
    };
    return /* @__PURE__ */ reactExports.createElement(Label, _extends$b({}, filterProps(entry, true), others, idProps, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (_restProps$fill = restProps.fill) !== null && _restProps$fill !== void 0 ? _restProps$fill : entry.fill,
      parentViewBox: entry.parentViewBox,
      value,
      textBreakAll,
      viewBox: entry.viewBox,
      key: "label-".concat(index),
      index
    }));
  }));
}
LabelList.displayName = "LabelList";
function LabelListFromLabelProp(_ref2) {
  var {
    label
  } = _ref2;
  if (!label) {
    return null;
  }
  if (label === true) {
    return /* @__PURE__ */ reactExports.createElement(LabelList, {
      key: "labelList-implicit"
    });
  }
  if (/* @__PURE__ */ reactExports.isValidElement(label) || isLabelContentAFunction(label)) {
    return /* @__PURE__ */ reactExports.createElement(LabelList, {
      key: "labelList-implicit",
      content: label
    });
  }
  if (typeof label === "object") {
    return /* @__PURE__ */ reactExports.createElement(LabelList, _extends$b({
      key: "labelList-implicit"
    }, label, {
      type: String(label.type)
    }));
  }
  return null;
}
function _extends$a() {
  return _extends$a = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$a.apply(null, arguments);
}
var Dot = (props) => {
  var {
    cx,
    cy,
    r: r2,
    className
  } = props;
  var layerClass = clsx("recharts-dot", className);
  if (cx === +cx && cy === +cy && r2 === +r2) {
    return /* @__PURE__ */ reactExports.createElement("circle", _extends$a({}, svgPropertiesNoEvents(props), adaptEventHandlers(props), {
      className: layerClass,
      cx,
      cy,
      r: r2
    }));
  }
  return null;
};
var initialState$6 = {
  radiusAxis: {},
  angleAxis: {}
};
var polarAxisSlice = createSlice({
  name: "polarAxis",
  initialState: initialState$6,
  reducers: {
    addRadiusAxis(state, action) {
      state.radiusAxis[action.payload.id] = castDraft(action.payload);
    },
    removeRadiusAxis(state, action) {
      delete state.radiusAxis[action.payload.id];
    },
    addAngleAxis(state, action) {
      state.angleAxis[action.payload.id] = castDraft(action.payload);
    },
    removeAngleAxis(state, action) {
      delete state.angleAxis[action.payload.id];
    }
  }
});
var {
  addRadiusAxis,
  removeRadiusAxis,
  addAngleAxis,
  removeAngleAxis
} = polarAxisSlice.actions;
var polarAxisReducer = polarAxisSlice.reducer;
var isPlainObject$2 = {};
(function(exports) {
  Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
  function isPlainObject2(object2) {
    var _a;
    if (typeof object2 !== "object") {
      return false;
    }
    if (object2 == null) {
      return false;
    }
    if (Object.getPrototypeOf(object2) === null) {
      return true;
    }
    if (Object.prototype.toString.call(object2) !== "[object Object]") {
      const tag = object2[Symbol.toStringTag];
      if (tag == null) {
        return false;
      }
      const isTagReadonly = !((_a = Object.getOwnPropertyDescriptor(object2, Symbol.toStringTag)) == null ? void 0 : _a.writable);
      if (isTagReadonly) {
        return false;
      }
      return object2.toString() === `[object ${tag}]`;
    }
    let proto = object2;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(object2) === proto;
  }
  exports.isPlainObject = isPlainObject2;
})(isPlainObject$2);
var isPlainObject = isPlainObject$2.isPlainObject;
const isPlainObject$1 = /* @__PURE__ */ getDefaultExportFromCjs(isPlainObject);
function ownKeys$b(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$b(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$b(Object(t2), true).forEach(function(r3) {
      _defineProperty$e(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$b(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$e(e3, r2, t2) {
  return (r2 = _toPropertyKey$e(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$e(t2) {
  var i = _toPrimitive$e(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$e(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _extends$9() {
  return _extends$9 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$9.apply(null, arguments);
}
var getTrapezoidPath = (x2, y2, upperWidth, lowerWidth, height) => {
  var widthGap = upperWidth - lowerWidth;
  var path;
  path = "M ".concat(x2, ",").concat(y2);
  path += "L ".concat(x2 + upperWidth, ",").concat(y2);
  path += "L ".concat(x2 + upperWidth - widthGap / 2, ",").concat(y2 + height);
  path += "L ".concat(x2 + upperWidth - widthGap / 2 - lowerWidth, ",").concat(y2 + height);
  path += "L ".concat(x2, ",").concat(y2, " Z");
  return path;
};
var defaultProps$2 = {
  x: 0,
  y: 0,
  upperWidth: 0,
  lowerWidth: 0,
  height: 0,
  isUpdateAnimationActive: false,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
};
var Trapezoid = (outsideProps) => {
  var trapezoidProps = resolveDefaultProps(outsideProps, defaultProps$2);
  var {
    x: x2,
    y: y2,
    upperWidth,
    lowerWidth,
    height,
    className
  } = trapezoidProps;
  var {
    animationEasing,
    animationDuration,
    animationBegin,
    isUpdateAnimationActive
  } = trapezoidProps;
  var pathRef = reactExports.useRef();
  var [totalLength, setTotalLength] = reactExports.useState(-1);
  var prevUpperWidthRef = reactExports.useRef(upperWidth);
  var prevLowerWidthRef = reactExports.useRef(lowerWidth);
  var prevHeightRef = reactExports.useRef(height);
  var prevXRef = reactExports.useRef(x2);
  var prevYRef = reactExports.useRef(y2);
  var animationId = useAnimationId(outsideProps, "trapezoid-");
  reactExports.useEffect(() => {
    if (pathRef.current && pathRef.current.getTotalLength) {
      try {
        var pathTotalLength = pathRef.current.getTotalLength();
        if (pathTotalLength) {
          setTotalLength(pathTotalLength);
        }
      } catch (_unused) {
      }
    }
  }, []);
  if (x2 !== +x2 || y2 !== +y2 || upperWidth !== +upperWidth || lowerWidth !== +lowerWidth || height !== +height || upperWidth === 0 && lowerWidth === 0 || height === 0) {
    return null;
  }
  var layerClass = clsx("recharts-trapezoid", className);
  if (!isUpdateAnimationActive) {
    return /* @__PURE__ */ reactExports.createElement("g", null, /* @__PURE__ */ reactExports.createElement("path", _extends$9({}, filterProps(trapezoidProps, true), {
      className: layerClass,
      d: getTrapezoidPath(x2, y2, upperWidth, lowerWidth, height)
    })));
  }
  var prevUpperWidth = prevUpperWidthRef.current;
  var prevLowerWidth = prevLowerWidthRef.current;
  var prevHeight = prevHeightRef.current;
  var prevX = prevXRef.current;
  var prevY = prevYRef.current;
  var from2 = "0px ".concat(totalLength === -1 ? 1 : totalLength, "px");
  var to2 = "".concat(totalLength, "px 0px");
  var transition = getTransitionVal(["strokeDasharray"], animationDuration, animationEasing);
  return /* @__PURE__ */ reactExports.createElement(JavascriptAnimate, {
    animationId,
    key: animationId,
    canBegin: totalLength > 0,
    duration: animationDuration,
    easing: animationEasing,
    isActive: isUpdateAnimationActive,
    begin: animationBegin
  }, (t2) => {
    var currUpperWidth = interpolate$1(prevUpperWidth, upperWidth, t2);
    var currLowerWidth = interpolate$1(prevLowerWidth, lowerWidth, t2);
    var currHeight = interpolate$1(prevHeight, height, t2);
    var currX = interpolate$1(prevX, x2, t2);
    var currY = interpolate$1(prevY, y2, t2);
    if (pathRef.current) {
      prevUpperWidthRef.current = currUpperWidth;
      prevLowerWidthRef.current = currLowerWidth;
      prevHeightRef.current = currHeight;
      prevXRef.current = currX;
      prevYRef.current = currY;
    }
    var animationStyle = t2 > 0 ? {
      transition,
      strokeDasharray: to2
    } : {
      strokeDasharray: from2
    };
    return /* @__PURE__ */ reactExports.createElement("path", _extends$9({}, filterProps(trapezoidProps, true), {
      className: layerClass,
      d: getTrapezoidPath(currX, currY, currUpperWidth, currLowerWidth, currHeight),
      ref: pathRef,
      style: _objectSpread$b(_objectSpread$b({}, animationStyle), trapezoidProps.style)
    }));
  });
};
var _excluded$b = ["option", "shapeType", "propTransformer", "activeClassName", "isActive"];
function _objectWithoutProperties$b(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$b(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$b(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function ownKeys$a(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$a(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$a(Object(t2), true).forEach(function(r3) {
      _defineProperty$d(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$a(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$d(e3, r2, t2) {
  return (r2 = _toPropertyKey$d(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$d(t2) {
  var i = _toPrimitive$d(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$d(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function defaultPropTransformer(option, props) {
  return _objectSpread$a(_objectSpread$a({}, props), option);
}
function isSymbolsProps(shapeType, _elementProps) {
  return shapeType === "symbols";
}
function ShapeSelector(_ref2) {
  var {
    shapeType,
    elementProps
  } = _ref2;
  switch (shapeType) {
    case "rectangle":
      return /* @__PURE__ */ reactExports.createElement(Rectangle, elementProps);
    case "trapezoid":
      return /* @__PURE__ */ reactExports.createElement(Trapezoid, elementProps);
    case "sector":
      return /* @__PURE__ */ reactExports.createElement(Sector, elementProps);
    case "symbols":
      if (isSymbolsProps(shapeType)) {
        return /* @__PURE__ */ reactExports.createElement(Symbols, elementProps);
      }
      break;
    default:
      return null;
  }
}
function getPropsFromShapeOption(option) {
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    return option.props;
  }
  return option;
}
function Shape(_ref2) {
  var {
    option,
    shapeType,
    propTransformer = defaultPropTransformer,
    activeClassName = "recharts-active-shape",
    isActive
  } = _ref2, props = _objectWithoutProperties$b(_ref2, _excluded$b);
  var shape;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    shape = /* @__PURE__ */ reactExports.cloneElement(option, _objectSpread$a(_objectSpread$a({}, props), getPropsFromShapeOption(option)));
  } else if (typeof option === "function") {
    shape = option(props);
  } else if (isPlainObject$1(option) && typeof option !== "boolean") {
    var nextProps = propTransformer(option, props);
    shape = /* @__PURE__ */ reactExports.createElement(ShapeSelector, {
      shapeType,
      elementProps: nextProps
    });
  } else {
    var elementProps = props;
    shape = /* @__PURE__ */ reactExports.createElement(ShapeSelector, {
      shapeType,
      elementProps
    });
  }
  if (isActive) {
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: activeClassName
    }, shape);
  }
  return shape;
}
var useMouseEnterItemDispatch = (onMouseEnterFromProps, dataKey) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseEnterFromProps === null || onMouseEnterFromProps === void 0 || onMouseEnterFromProps(data, index, event);
    dispatch(setActiveMouseOverItemIndex({
      activeIndex: String(index),
      activeDataKey: dataKey,
      activeCoordinate: data.tooltipPosition
    }));
  };
};
var useMouseLeaveItemDispatch = (onMouseLeaveFromProps) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseLeaveFromProps === null || onMouseLeaveFromProps === void 0 || onMouseLeaveFromProps(data, index, event);
    dispatch(mouseLeaveItem());
  };
};
var useMouseClickItemDispatch = (onMouseClickFromProps, dataKey) => {
  var dispatch = useAppDispatch();
  return (data, index) => (event) => {
    onMouseClickFromProps === null || onMouseClickFromProps === void 0 || onMouseClickFromProps(data, index, event);
    dispatch(setActiveClickItemIndex({
      activeIndex: String(index),
      activeDataKey: dataKey,
      activeCoordinate: data.tooltipPosition
    }));
  };
};
function SetTooltipEntrySettings(_ref2) {
  var {
    fn,
    args
  } = _ref2;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  reactExports.useEffect(() => {
    if (isPanorama) {
      return void 0;
    }
    var tooltipEntrySettings = fn(args);
    dispatch(addTooltipEntrySettings(tooltipEntrySettings));
    return () => {
      dispatch(removeTooltipEntrySettings(tooltipEntrySettings));
    };
  }, [fn, args, dispatch, isPanorama]);
  return null;
}
var noop = () => {
};
function SetLegendPayload(_ref2) {
  var {
    legendPayload
  } = _ref2;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  reactExports.useEffect(() => {
    if (isPanorama) {
      return noop;
    }
    dispatch(addLegendPayload(legendPayload));
    return () => {
      dispatch(removeLegendPayload(legendPayload));
    };
  }, [dispatch, isPanorama, legendPayload]);
  return null;
}
var _ref;
var useIdFallback = () => {
  var [id] = reactExports.useState(() => uniqueId("uid-"));
  return id;
};
var useId = (_ref = React$3["useId".toString()]) !== null && _ref !== void 0 ? _ref : useIdFallback;
function useUniqueId(prefix2, customId) {
  var generatedId = useId();
  if (customId) {
    return customId;
  }
  return prefix2 ? "".concat(prefix2, "-").concat(generatedId) : generatedId;
}
var GraphicalItemIdContext = /* @__PURE__ */ reactExports.createContext(void 0);
var RegisterGraphicalItemId = (_ref2) => {
  var {
    id,
    type,
    children
  } = _ref2;
  var resolvedId = useUniqueId("recharts-".concat(type), id);
  return /* @__PURE__ */ reactExports.createElement(GraphicalItemIdContext.Provider, {
    value: resolvedId
  }, children(resolvedId));
};
var initialState$5 = {
  cartesianItems: [],
  polarItems: []
};
var graphicalItemsSlice = createSlice({
  name: "graphicalItems",
  initialState: initialState$5,
  reducers: {
    addCartesianGraphicalItem(state, action) {
      state.cartesianItems.push(castDraft(action.payload));
    },
    replaceCartesianGraphicalItem(state, action) {
      var {
        prev,
        next
      } = action.payload;
      var index = current(state).cartesianItems.indexOf(castDraft(prev));
      if (index > -1) {
        state.cartesianItems[index] = castDraft(next);
      }
    },
    removeCartesianGraphicalItem(state, action) {
      var index = current(state).cartesianItems.indexOf(castDraft(action.payload));
      if (index > -1) {
        state.cartesianItems.splice(index, 1);
      }
    },
    addPolarGraphicalItem(state, action) {
      state.polarItems.push(castDraft(action.payload));
    },
    removePolarGraphicalItem(state, action) {
      var index = current(state).polarItems.indexOf(castDraft(action.payload));
      if (index > -1) {
        state.polarItems.splice(index, 1);
      }
    }
  }
});
var {
  addCartesianGraphicalItem,
  replaceCartesianGraphicalItem,
  removeCartesianGraphicalItem,
  addPolarGraphicalItem,
  removePolarGraphicalItem
} = graphicalItemsSlice.actions;
var graphicalItemsReducer = graphicalItemsSlice.reducer;
function SetCartesianGraphicalItem(props) {
  var dispatch = useAppDispatch();
  var prevPropsRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (prevPropsRef.current === null) {
      dispatch(addCartesianGraphicalItem(props));
    } else if (prevPropsRef.current !== props) {
      dispatch(replaceCartesianGraphicalItem({
        prev: prevPropsRef.current,
        next: props
      }));
    }
    prevPropsRef.current = props;
  }, [dispatch, props]);
  reactExports.useEffect(() => {
    return () => {
      if (prevPropsRef.current) {
        dispatch(removeCartesianGraphicalItem(prevPropsRef.current));
        prevPropsRef.current = null;
      }
    };
  }, [dispatch]);
  return null;
}
function ownKeys$9(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$9(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$9(Object(t2), true).forEach(function(r3) {
      _defineProperty$c(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$9(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$c(e3, r2, t2) {
  return (r2 = _toPropertyKey$c(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$c(t2) {
  var i = _toPrimitive$c(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$c(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var initialState$4 = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
};
var cartesianAxisSlice = createSlice({
  name: "cartesianAxis",
  initialState: initialState$4,
  reducers: {
    addXAxis(state, action) {
      state.xAxis[action.payload.id] = castDraft(action.payload);
    },
    removeXAxis(state, action) {
      delete state.xAxis[action.payload.id];
    },
    addYAxis(state, action) {
      state.yAxis[action.payload.id] = castDraft(action.payload);
    },
    removeYAxis(state, action) {
      delete state.yAxis[action.payload.id];
    },
    addZAxis(state, action) {
      state.zAxis[action.payload.id] = castDraft(action.payload);
    },
    removeZAxis(state, action) {
      delete state.zAxis[action.payload.id];
    },
    updateYAxisWidth(state, action) {
      var {
        id,
        width
      } = action.payload;
      if (state.yAxis[id]) {
        state.yAxis[id] = _objectSpread$9(_objectSpread$9({}, state.yAxis[id]), {}, {
          width
        });
      }
    }
  }
});
var {
  addXAxis,
  removeXAxis,
  addYAxis,
  removeYAxis,
  addZAxis,
  removeZAxis,
  updateYAxisWidth
} = cartesianAxisSlice.actions;
var cartesianAxisReducer = cartesianAxisSlice.reducer;
var selectChartOffset = createSelector([selectChartOffsetInternal], (offsetInternal) => {
  if (!offsetInternal) {
    return void 0;
  }
  return {
    top: offsetInternal.top,
    bottom: offsetInternal.bottom,
    left: offsetInternal.left,
    right: offsetInternal.right
  };
});
var selectPlotArea = createSelector([selectChartOffset, selectChartWidth, selectChartHeight], (offset, chartWidth, chartHeight) => {
  if (!offset || chartWidth == null || chartHeight == null) {
    return void 0;
  }
  return {
    x: offset.left,
    y: offset.top,
    width: Math.max(0, chartWidth - offset.left - offset.right),
    height: Math.max(0, chartHeight - offset.top - offset.bottom)
  };
});
var usePlotArea = () => {
  return useAppSelector(selectPlotArea);
};
var useActiveTooltipDataPoints = () => {
  return useAppSelector(selectActiveTooltipDataPoints);
};
function ownKeys$8(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$8(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$8(Object(t2), true).forEach(function(r3) {
      _defineProperty$b(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$8(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$b(e3, r2, t2) {
  return (r2 = _toPropertyKey$b(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$b(t2) {
  var i = _toPrimitive$b(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$b(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var renderActivePoint = (_ref2) => {
  var {
    point: point2,
    childIndex,
    mainColor,
    activeDot,
    dataKey
  } = _ref2;
  if (activeDot === false || point2.x == null || point2.y == null) {
    return null;
  }
  var dotProps = _objectSpread$8(_objectSpread$8({
    index: childIndex,
    dataKey,
    cx: point2.x,
    cy: point2.y,
    r: 4,
    fill: mainColor !== null && mainColor !== void 0 ? mainColor : "none",
    strokeWidth: 2,
    stroke: "#fff",
    payload: point2.payload,
    value: point2.value
  }, filterProps(activeDot, false)), adaptEventHandlers(activeDot));
  var dot;
  if (/* @__PURE__ */ reactExports.isValidElement(activeDot)) {
    dot = /* @__PURE__ */ reactExports.cloneElement(activeDot, dotProps);
  } else if (typeof activeDot === "function") {
    dot = activeDot(dotProps);
  } else {
    dot = /* @__PURE__ */ reactExports.createElement(Dot, dotProps);
  }
  return /* @__PURE__ */ reactExports.createElement(Layer, {
    className: "recharts-active-dot"
  }, dot);
};
function ActivePoints(_ref2) {
  var {
    points,
    mainColor,
    activeDot,
    itemDataKey
  } = _ref2;
  var activeTooltipIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataPoints = useActiveTooltipDataPoints();
  if (points == null || activeDataPoints == null) {
    return null;
  }
  var activePoint = points.find((p2) => activeDataPoints.includes(p2.payload));
  if (isNullish(activePoint)) {
    return null;
  }
  return renderActivePoint({
    point: activePoint,
    childIndex: Number(activeTooltipIndex),
    mainColor,
    dataKey: itemDataKey,
    activeDot
  });
}
var prefix = "Invariant failed";
function invariant(condition, message) {
  {
    throw new Error(prefix);
  }
}
var _excluded$a = ["x", "y"];
function _extends$8() {
  return _extends$8 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$8.apply(null, arguments);
}
function ownKeys$7(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r22) {
      return Object.getOwnPropertyDescriptor(e3, r22).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$7(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$7(Object(t2), true).forEach(function(r22) {
      _defineProperty$a(e3, r22, t2[r22]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$7(Object(t2)).forEach(function(r22) {
      Object.defineProperty(e3, r22, Object.getOwnPropertyDescriptor(t2, r22));
    });
  }
  return e3;
}
function _defineProperty$a(e3, r2, t2) {
  return (r2 = _toPropertyKey$a(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$a(t2) {
  var i = _toPrimitive$a(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$a(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _objectWithoutProperties$a(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$a(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$a(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function typeguardBarRectangleProps(_ref2, props) {
  var {
    x: xProp,
    y: yProp
  } = _ref2, option = _objectWithoutProperties$a(_ref2, _excluded$a);
  var xValue = "".concat(xProp);
  var x2 = parseInt(xValue, 10);
  var yValue = "".concat(yProp);
  var y2 = parseInt(yValue, 10);
  var heightValue = "".concat(props.height || option.height);
  var height = parseInt(heightValue, 10);
  var widthValue = "".concat(props.width || option.width);
  var width = parseInt(widthValue, 10);
  return _objectSpread$7(_objectSpread$7(_objectSpread$7(_objectSpread$7(_objectSpread$7({}, props), option), x2 ? {
    x: x2
  } : {}), y2 ? {
    y: y2
  } : {}), {}, {
    height,
    width,
    name: props.name,
    radius: props.radius
  });
}
function BarRectangle(props) {
  return /* @__PURE__ */ reactExports.createElement(Shape, _extends$8({
    shapeType: "rectangle",
    propTransformer: typeguardBarRectangleProps,
    activeClassName: "recharts-active-bar"
  }, props));
}
var minPointSizeCallback = function minPointSizeCallback2(minPointSize) {
  var defaultValue = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  return (value, index) => {
    if (isNumber(minPointSize)) return minPointSize;
    var isValueNumberOrNil = isNumber(value) || isNullish(value);
    if (isValueNumberOrNil) {
      return minPointSize(value, index);
    }
    !isValueNumberOrNil ? invariant() : void 0;
    return defaultValue;
  };
};
var initialState$3 = {};
var errorBarSlice = createSlice({
  name: "errorBars",
  initialState: initialState$3,
  reducers: {
    addErrorBar: (state, action) => {
      var {
        itemId,
        errorBar
      } = action.payload;
      if (!state[itemId]) {
        state[itemId] = [];
      }
      state[itemId].push(errorBar);
    },
    replaceErrorBar: (state, action) => {
      var {
        itemId,
        prev,
        next
      } = action.payload;
      if (state[itemId]) {
        state[itemId] = state[itemId].map((e3) => e3.dataKey === prev.dataKey && e3.direction === prev.direction ? next : e3);
      }
    },
    removeErrorBar: (state, action) => {
      var {
        itemId,
        errorBar
      } = action.payload;
      if (state[itemId]) {
        state[itemId] = state[itemId].filter((e3) => e3.dataKey !== errorBar.dataKey || e3.direction !== errorBar.direction);
      }
    }
  }
});
var {
  addErrorBar,
  replaceErrorBar,
  removeErrorBar
} = errorBarSlice.actions;
var errorBarReducer = errorBarSlice.reducer;
var _excluded$9 = ["children"];
function _objectWithoutProperties$9(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$9(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$9(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var initialContextState = {
  data: [],
  xAxisId: "xAxis-0",
  yAxisId: "yAxis-0",
  dataPointFormatter: () => ({
    x: 0,
    y: 0,
    value: 0
  }),
  errorBarOffset: 0
};
var ErrorBarContext = /* @__PURE__ */ reactExports.createContext(initialContextState);
function SetErrorBarContext(props) {
  var {
    children
  } = props, rest = _objectWithoutProperties$9(props, _excluded$9);
  return /* @__PURE__ */ reactExports.createElement(ErrorBarContext.Provider, {
    value: rest
  }, children);
}
function useNeedsClip(xAxisId, yAxisId) {
  var _xAxis$allowDataOverf, _yAxis$allowDataOverf;
  var xAxis = useAppSelector((state) => selectXAxisSettings(state, xAxisId));
  var yAxis = useAppSelector((state) => selectYAxisSettings(state, yAxisId));
  var needClipX = (_xAxis$allowDataOverf = xAxis === null || xAxis === void 0 ? void 0 : xAxis.allowDataOverflow) !== null && _xAxis$allowDataOverf !== void 0 ? _xAxis$allowDataOverf : implicitXAxis.allowDataOverflow;
  var needClipY = (_yAxis$allowDataOverf = yAxis === null || yAxis === void 0 ? void 0 : yAxis.allowDataOverflow) !== null && _yAxis$allowDataOverf !== void 0 ? _yAxis$allowDataOverf : implicitYAxis.allowDataOverflow;
  var needClip = needClipX || needClipY;
  return {
    needClip,
    needClipX,
    needClipY
  };
}
function GraphicalItemClipPath(_ref2) {
  var {
    xAxisId,
    yAxisId,
    clipPathId
  } = _ref2;
  var plotArea = usePlotArea();
  var {
    needClipX,
    needClipY,
    needClip
  } = useNeedsClip(xAxisId, yAxisId);
  if (!needClip) {
    return null;
  }
  var {
    x: x2,
    y: y2,
    width,
    height
  } = plotArea;
  return /* @__PURE__ */ reactExports.createElement("clipPath", {
    id: "clipPath-".concat(clipPathId)
  }, /* @__PURE__ */ reactExports.createElement("rect", {
    x: needClipX ? x2 : x2 - width / 2,
    y: needClipY ? y2 : y2 - height / 2,
    width: needClipX ? width : width * 2,
    height: needClipY ? height : height * 2
  }));
}
var _excluded$8 = ["onMouseEnter", "onMouseLeave", "onClick"], _excluded2$5 = ["value", "background", "tooltipPosition"], _excluded3$2 = ["id"], _excluded4$1 = ["onMouseEnter", "onClick", "onMouseLeave"];
function _extends$7() {
  return _extends$7 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$7.apply(null, arguments);
}
function ownKeys$6(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$6(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$6(Object(t2), true).forEach(function(r3) {
      _defineProperty$9(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$6(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$9(e3, r2, t2) {
  return (r2 = _toPropertyKey$9(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$9(t2) {
  var i = _toPrimitive$9(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$9(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _objectWithoutProperties$8(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$8(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$8(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var computeLegendPayloadFromBarData = (props) => {
  var {
    dataKey,
    name,
    fill,
    legendType,
    hide
  } = props;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: fill,
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
function getTooltipEntrySettings$1(props) {
  var {
    dataKey,
    stroke,
    strokeWidth,
    fill,
    name,
    hide,
    unit: unit2
  } = props;
  return {
    dataDefinedOnItem: void 0,
    positions: void 0,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: props.tooltipType,
      color: props.fill,
      unit: unit2
    }
  };
}
function BarBackground(props) {
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var {
    data,
    dataKey,
    background: backgroundFromProps,
    allOtherBarProps
  } = props;
  var {
    onMouseEnter: onMouseEnterFromProps,
    onMouseLeave: onMouseLeaveFromProps,
    onClick: onItemClickFromProps
  } = allOtherBarProps, restOfAllOtherProps = _objectWithoutProperties$8(allOtherBarProps, _excluded$8);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey);
  if (!backgroundFromProps || data == null) {
    return null;
  }
  var backgroundProps = filterProps(backgroundFromProps, false);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, data.map((entry, i) => {
    var {
      value,
      background: backgroundFromDataEntry,
      tooltipPosition
    } = entry, rest = _objectWithoutProperties$8(entry, _excluded2$5);
    if (!backgroundFromDataEntry) {
      return null;
    }
    var onMouseEnter = onMouseEnterFromContext(entry, i);
    var onMouseLeave = onMouseLeaveFromContext(entry, i);
    var onClick = onClickFromContext(entry, i);
    var barRectangleProps = _objectSpread$6(_objectSpread$6(_objectSpread$6(_objectSpread$6(_objectSpread$6({
      option: backgroundFromProps,
      isActive: String(i) === activeIndex
    }, rest), {}, {
      // @ts-expect-error BarRectangle props do not accept `fill` property.
      fill: "#eee"
    }, backgroundFromDataEntry), backgroundProps), adaptEventsOfChild(restOfAllOtherProps, entry, i)), {}, {
      onMouseEnter,
      onMouseLeave,
      onClick,
      dataKey,
      index: i,
      className: "recharts-bar-background-rectangle"
    });
    return /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$7({
      key: "background-bar-".concat(i)
    }, barRectangleProps));
  }));
}
function BarLabelListProvider(_ref2) {
  var {
    showLabels,
    children,
    rects
  } = _ref2;
  var labelListEntries = rects === null || rects === void 0 ? void 0 : rects.map((entry) => {
    var viewBox = {
      x: entry.x,
      y: entry.y,
      width: entry.width,
      height: entry.height
    };
    return _objectSpread$6(_objectSpread$6({}, viewBox), {}, {
      value: entry.value,
      payload: entry.payload,
      parentViewBox: entry.parentViewBox,
      viewBox,
      fill: entry.fill
    });
  });
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : void 0
  }, children);
}
function BarRectangleWithActiveState(props) {
  var {
    shape,
    activeBar,
    baseProps,
    entry,
    index,
    dataKey
  } = props;
  var activeIndex = useAppSelector(selectActiveTooltipIndex);
  var activeDataKey = useAppSelector(selectActiveTooltipDataKey);
  var isActive = activeBar && String(index) === activeIndex && (activeDataKey == null || dataKey === activeDataKey);
  var option = isActive ? activeBar : shape;
  return /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$7({}, baseProps, entry, {
    isActive,
    option,
    index,
    dataKey
  }));
}
function BarRectangleNeverActive(props) {
  var {
    shape,
    baseProps,
    entry,
    index,
    dataKey
  } = props;
  return /* @__PURE__ */ reactExports.createElement(BarRectangle, _extends$7({}, baseProps, entry, {
    isActive: false,
    option: shape,
    index,
    dataKey
  }));
}
function BarRectangles(_ref2) {
  var {
    data,
    props
  } = _ref2;
  var _svgPropertiesNoEvent = svgPropertiesNoEvents(props), {
    id
  } = _svgPropertiesNoEvent, baseProps = _objectWithoutProperties$8(_svgPropertiesNoEvent, _excluded3$2);
  var {
    shape,
    dataKey,
    activeBar
  } = props;
  var {
    onMouseEnter: onMouseEnterFromProps,
    onClick: onItemClickFromProps,
    onMouseLeave: onMouseLeaveFromProps
  } = props, restOfAllOtherProps = _objectWithoutProperties$8(props, _excluded4$1);
  var onMouseEnterFromContext = useMouseEnterItemDispatch(onMouseEnterFromProps, dataKey);
  var onMouseLeaveFromContext = useMouseLeaveItemDispatch(onMouseLeaveFromProps);
  var onClickFromContext = useMouseClickItemDispatch(onItemClickFromProps, dataKey);
  if (!data) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, data.map((entry, i) => {
    return /* @__PURE__ */ reactExports.createElement(Layer, _extends$7({
      className: "recharts-bar-rectangle"
    }, adaptEventsOfChild(restOfAllOtherProps, entry, i), {
      // @ts-expect-error BarRectangleItem type definition says it's missing properties, but I can see them present in debugger!
      onMouseEnter: onMouseEnterFromContext(entry, i),
      onMouseLeave: onMouseLeaveFromContext(entry, i),
      onClick: onClickFromContext(entry, i),
      key: "rectangle-".concat(entry === null || entry === void 0 ? void 0 : entry.x, "-").concat(entry === null || entry === void 0 ? void 0 : entry.y, "-").concat(entry === null || entry === void 0 ? void 0 : entry.value, "-").concat(i)
    }), activeBar ? /* @__PURE__ */ reactExports.createElement(BarRectangleWithActiveState, {
      shape,
      activeBar,
      baseProps,
      entry,
      index: i,
      dataKey
    }) : (
      /*
       * If the `activeBar` prop is falsy, then let's call the variant without hooks.
       * Using the `selectActiveTooltipIndex` selector is usually fast
       * but in charts with large-ish amount of data even the few nanoseconds add up to a noticeable jank.
       * If the activeBar is false then we don't need to know which index is active - because we won't use it anyway.
       * So let's just skip the hooks altogether. That way, React can skip rendering the component,
       * and can skip the tree reconciliation for its children too.
       * Because we can't call hooks conditionally, we need to have a separate component for that.
       */
      /* @__PURE__ */ reactExports.createElement(BarRectangleNeverActive, {
        shape,
        baseProps,
        entry,
        index: i,
        dataKey
      })
    ));
  }));
}
function RectanglesWithAnimation(_ref3) {
  var {
    props,
    previousRectanglesRef
  } = _ref3;
  var {
    data,
    layout,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationEnd,
    onAnimationStart
  } = props;
  var prevData = previousRectanglesRef.current;
  var animationId = useAnimationId(props, "recharts-bar-");
  var [isAnimating, setIsAnimating] = reactExports.useState(false);
  var showLabels = !isAnimating;
  var handleAnimationEnd = reactExports.useCallback(() => {
    if (typeof onAnimationEnd === "function") {
      onAnimationEnd();
    }
    setIsAnimating(false);
  }, [onAnimationEnd]);
  var handleAnimationStart = reactExports.useCallback(() => {
    if (typeof onAnimationStart === "function") {
      onAnimationStart();
    }
    setIsAnimating(true);
  }, [onAnimationStart]);
  return /* @__PURE__ */ reactExports.createElement(BarLabelListProvider, {
    showLabels,
    rects: data
  }, /* @__PURE__ */ reactExports.createElement(JavascriptAnimate, {
    animationId,
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart,
    key: animationId
  }, (t2) => {
    var stepData = t2 === 1 ? data : data === null || data === void 0 ? void 0 : data.map((entry, index) => {
      var prev = prevData && prevData[index];
      if (prev) {
        return _objectSpread$6(_objectSpread$6({}, entry), {}, {
          x: interpolate$1(prev.x, entry.x, t2),
          y: interpolate$1(prev.y, entry.y, t2),
          width: interpolate$1(prev.width, entry.width, t2),
          height: interpolate$1(prev.height, entry.height, t2)
        });
      }
      if (layout === "horizontal") {
        var h2 = interpolate$1(0, entry.height, t2);
        return _objectSpread$6(_objectSpread$6({}, entry), {}, {
          y: entry.y + entry.height - h2,
          height: h2
        });
      }
      var w2 = interpolate$1(0, entry.width, t2);
      return _objectSpread$6(_objectSpread$6({}, entry), {}, {
        width: w2
      });
    });
    if (t2 > 0) {
      previousRectanglesRef.current = stepData !== null && stepData !== void 0 ? stepData : null;
    }
    if (stepData == null) {
      return null;
    }
    return /* @__PURE__ */ reactExports.createElement(Layer, null, /* @__PURE__ */ reactExports.createElement(BarRectangles, {
      props,
      data: stepData
    }));
  }), /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
    label: props.label
  }), props.children);
}
function RenderRectangles(props) {
  var previousRectanglesRef = reactExports.useRef(null);
  return /* @__PURE__ */ reactExports.createElement(RectanglesWithAnimation, {
    previousRectanglesRef,
    props
  });
}
var defaultMinPointSize = 0;
var errorBarDataPointFormatter = (dataPoint, dataKey) => {
  var value = Array.isArray(dataPoint.value) ? dataPoint.value[1] : dataPoint.value;
  return {
    x: dataPoint.x,
    y: dataPoint.y,
    value,
    // @ts-expect-error getValueByDataKey does not validate the output type
    errorVal: getValueByDataKey(dataPoint, dataKey)
  };
};
class BarWithState extends reactExports.PureComponent {
  render() {
    var {
      hide,
      data,
      dataKey,
      className,
      xAxisId,
      yAxisId,
      needClip,
      background,
      id
    } = this.props;
    if (hide || data == null) {
      return null;
    }
    var layerClass = clsx("recharts-bar", className);
    var clipPathId = id;
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: layerClass,
      id
    }, needClip && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    })), /* @__PURE__ */ reactExports.createElement(Layer, {
      className: "recharts-bar-rectangles",
      clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
    }, /* @__PURE__ */ reactExports.createElement(BarBackground, {
      data,
      dataKey,
      background,
      allOtherBarProps: this.props
    }), /* @__PURE__ */ reactExports.createElement(RenderRectangles, this.props)));
  }
}
var defaultBarProps = {
  activeBar: false,
  animationBegin: 0,
  animationDuration: 400,
  animationEasing: "ease",
  hide: false,
  isAnimationActive: !Global.isSsr,
  legendType: "rect",
  minPointSize: defaultMinPointSize,
  xAxisId: 0,
  yAxisId: 0
};
function BarImpl(props) {
  var {
    xAxisId,
    yAxisId,
    hide,
    legendType,
    minPointSize,
    activeBar,
    animationBegin,
    animationDuration,
    animationEasing,
    isAnimationActive
  } = props;
  var {
    needClip
  } = useNeedsClip(xAxisId, yAxisId);
  var layout = useChartLayout();
  var isPanorama = useIsPanorama();
  var cells = findAllByType(props.children, Cell);
  var rects = useAppSelector((state) => selectBarRectangles(state, xAxisId, yAxisId, isPanorama, props.id, cells));
  if (layout !== "vertical" && layout !== "horizontal") {
    return null;
  }
  var errorBarOffset;
  var firstDataPoint = rects === null || rects === void 0 ? void 0 : rects[0];
  if (firstDataPoint == null || firstDataPoint.height == null || firstDataPoint.width == null) {
    errorBarOffset = 0;
  } else {
    errorBarOffset = layout === "vertical" ? firstDataPoint.height / 2 : firstDataPoint.width / 2;
  }
  return /* @__PURE__ */ reactExports.createElement(SetErrorBarContext, {
    xAxisId,
    yAxisId,
    data: rects,
    dataPointFormatter: errorBarDataPointFormatter,
    errorBarOffset
  }, /* @__PURE__ */ reactExports.createElement(BarWithState, _extends$7({}, props, {
    layout,
    needClip,
    data: rects,
    xAxisId,
    yAxisId,
    hide,
    legendType,
    minPointSize,
    activeBar,
    animationBegin,
    animationDuration,
    animationEasing,
    isAnimationActive
  })));
}
function computeBarRectangles(_ref4) {
  var {
    layout,
    barSettings: {
      dataKey,
      minPointSize: minPointSizeProp
    },
    pos,
    bandSize,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    stackedData,
    displayedData,
    offset,
    cells,
    parentViewBox
  } = _ref4;
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var stackedDomain = stackedData ? numericAxis.scale.domain() : null;
  var baseValue = getBaseValueOfBar({
    numericAxis
  });
  return displayedData.map((entry, index) => {
    var value, x2, y2, width, height, background;
    if (stackedData) {
      value = truncateByDomain(stackedData[index], stackedDomain);
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      }
    }
    var minPointSize = minPointSizeCallback(minPointSizeProp, defaultMinPointSize)(value[1], index);
    if (layout === "horizontal") {
      var _ref5;
      var [baseValueScale, currentValueScale] = [yAxis.scale(value[0]), yAxis.scale(value[1])];
      x2 = getCateCoordinateOfBar({
        axis: xAxis,
        ticks: xAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      y2 = (_ref5 = currentValueScale !== null && currentValueScale !== void 0 ? currentValueScale : baseValueScale) !== null && _ref5 !== void 0 ? _ref5 : void 0;
      width = pos.size;
      var computedHeight = baseValueScale - currentValueScale;
      height = isNan(computedHeight) ? 0 : computedHeight;
      background = {
        x: x2,
        y: offset.top,
        width,
        height: offset.height
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(height) < Math.abs(minPointSize)) {
        var delta = mathSign(height || minPointSize) * (Math.abs(minPointSize) - Math.abs(height));
        y2 -= delta;
        height += delta;
      }
    } else {
      var [_baseValueScale, _currentValueScale] = [xAxis.scale(value[0]), xAxis.scale(value[1])];
      x2 = _baseValueScale;
      y2 = getCateCoordinateOfBar({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        offset: pos.offset,
        entry,
        index
      });
      width = _currentValueScale - _baseValueScale;
      height = pos.size;
      background = {
        x: offset.left,
        y: y2,
        width: offset.width,
        height
      };
      if (Math.abs(minPointSize) > 0 && Math.abs(width) < Math.abs(minPointSize)) {
        var _delta = mathSign(width || minPointSize) * (Math.abs(minPointSize) - Math.abs(width));
        width += _delta;
      }
    }
    if (x2 == null || y2 == null || width == null || height == null) {
      return null;
    }
    var barRectangleItem = _objectSpread$6(_objectSpread$6({}, entry), {}, {
      x: x2,
      y: y2,
      width,
      height,
      value: stackedData ? value : value[1],
      payload: entry,
      background,
      tooltipPosition: {
        x: x2 + width / 2,
        y: y2 + height / 2
      },
      parentViewBox
    }, cells && cells[index] && cells[index].props);
    return barRectangleItem;
  }).filter(Boolean);
}
function Bar(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultBarProps);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "bar"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromBarData(props)
  }), /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    fn: getTooltipEntrySettings$1,
    args: props
  }), /* @__PURE__ */ reactExports.createElement(SetCartesianGraphicalItem, {
    type: "bar",
    id,
    data: void 0,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    dataKey: props.dataKey,
    stackId: getNormalizedStackId(props.stackId),
    hide: props.hide,
    barSize: props.barSize,
    minPointSize: props.minPointSize,
    maxBarSize: props.maxBarSize,
    isPanorama
  }), /* @__PURE__ */ reactExports.createElement(BarImpl, _extends$7({}, props, {
    id
  }))));
}
Bar.displayName = "Bar";
function ownKeys$5(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$5(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$5(Object(t2), true).forEach(function(r3) {
      _defineProperty$8(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$5(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$8(e3, r2, t2) {
  return (r2 = _toPropertyKey$8(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$8(t2) {
  var i = _toPrimitive$8(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$8(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var pickXAxisId = (_state, xAxisId) => xAxisId;
var pickYAxisId = (_state, _xAxisId, yAxisId) => yAxisId;
var pickIsPanorama = (_state, _xAxisId, _yAxisId, isPanorama) => isPanorama;
var pickBarId = (_state, _xAxisId, _yAxisId, _isPanorama, id) => id;
var selectSynchronisedBarSettings = createSelector([selectUnfilteredCartesianItems, pickBarId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "bar").find((item) => item.id === id));
var selectMaxBarSize = createSelector([selectSynchronisedBarSettings], (barSettings) => barSettings === null || barSettings === void 0 ? void 0 : barSettings.maxBarSize);
var pickCells = (_state, _xAxisId, _yAxisId, _isPanorama, _id, cells) => cells;
var getBarSize = (globalSize, totalSize, selfSize) => {
  var barSize = selfSize !== null && selfSize !== void 0 ? selfSize : globalSize;
  if (isNullish(barSize)) {
    return void 0;
  }
  return getPercentValue(barSize, totalSize, 0);
};
var selectAllVisibleBars = createSelector([selectChartLayout, selectUnfilteredCartesianItems, pickXAxisId, pickYAxisId, pickIsPanorama], (layout, allItems, xAxisId, yAxisId, isPanorama) => allItems.filter((i) => {
  if (layout === "horizontal") {
    return i.xAxisId === xAxisId;
  }
  return i.yAxisId === yAxisId;
}).filter((i) => i.isPanorama === isPanorama).filter((i) => i.hide === false).filter((i) => i.type === "bar"));
var selectBarStackGroups = (state, xAxisId, yAxisId, isPanorama) => {
  var layout = selectChartLayout(state);
  if (layout === "horizontal") {
    return selectStackGroups(state, "yAxis", yAxisId, isPanorama);
  }
  return selectStackGroups(state, "xAxis", xAxisId, isPanorama);
};
var selectBarCartesianAxisSize = (state, xAxisId, yAxisId) => {
  var layout = selectChartLayout(state);
  if (layout === "horizontal") {
    return selectCartesianAxisSize(state, "xAxis", xAxisId);
  }
  return selectCartesianAxisSize(state, "yAxis", yAxisId);
};
var combineBarSizeList = (allBars, globalSize, totalSize) => {
  var initialValue = {};
  var stackedBars = allBars.filter(isStacked);
  var unstackedBars = allBars.filter((b2) => b2.stackId == null);
  var groupByStack = stackedBars.reduce((acc, bar) => {
    if (!acc[bar.stackId]) {
      acc[bar.stackId] = [];
    }
    acc[bar.stackId].push(bar);
    return acc;
  }, initialValue);
  var stackedSizeList = Object.entries(groupByStack).map((_ref2) => {
    var [stackId, bars] = _ref2;
    var dataKeys = bars.map((b2) => b2.dataKey);
    var barSize = getBarSize(globalSize, totalSize, bars[0].barSize);
    return {
      stackId,
      dataKeys,
      barSize
    };
  });
  var unstackedSizeList = unstackedBars.map((b2) => {
    var dataKeys = [b2.dataKey].filter((dk) => dk != null);
    var barSize = getBarSize(globalSize, totalSize, b2.barSize);
    return {
      stackId: void 0,
      dataKeys,
      barSize
    };
  });
  return [...stackedSizeList, ...unstackedSizeList];
};
var selectBarSizeList = createSelector([selectAllVisibleBars, selectRootBarSize, selectBarCartesianAxisSize], combineBarSizeList);
var selectBarBandSize = (state, xAxisId, yAxisId, isPanorama, id) => {
  var _ref2, _getBandSizeOfAxis;
  var barSettings = selectSynchronisedBarSettings(state, xAxisId, yAxisId, isPanorama, id);
  if (barSettings == null) {
    return void 0;
  }
  var layout = selectChartLayout(state);
  var globalMaxBarSize = selectRootMaxBarSize(state);
  var {
    maxBarSize: childMaxBarSize
  } = barSettings;
  var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
  var axis, ticks2;
  if (layout === "horizontal") {
    axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
    ticks2 = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
  } else {
    axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
    ticks2 = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
  }
  return (_ref2 = (_getBandSizeOfAxis = getBandSizeOfAxis(axis, ticks2, true)) !== null && _getBandSizeOfAxis !== void 0 ? _getBandSizeOfAxis : maxBarSize) !== null && _ref2 !== void 0 ? _ref2 : 0;
};
var selectAxisBandSize = (state, xAxisId, yAxisId, isPanorama) => {
  var layout = selectChartLayout(state);
  var axis, ticks2;
  if (layout === "horizontal") {
    axis = selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
    ticks2 = selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
  } else {
    axis = selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
    ticks2 = selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
  }
  return getBandSizeOfAxis(axis, ticks2);
};
function getBarPositions(barGap, barCategoryGap, bandSize, sizeList, maxBarSize) {
  var len = sizeList.length;
  if (len < 1) {
    return void 0;
  }
  var realBarGap = getPercentValue(barGap, bandSize, 0, true);
  var result;
  var initialValue = [];
  if (isWellBehavedNumber(sizeList[0].barSize)) {
    var useFull = false;
    var fullBarSize = bandSize / len;
    var sum = sizeList.reduce((res, entry) => res + (entry.barSize || 0), 0);
    sum += (len - 1) * realBarGap;
    if (sum >= bandSize) {
      sum -= (len - 1) * realBarGap;
      realBarGap = 0;
    }
    if (sum >= bandSize && fullBarSize > 0) {
      useFull = true;
      fullBarSize *= 0.9;
      sum = len * fullBarSize;
    }
    var offset = (bandSize - sum) / 2 >> 0;
    var prev = {
      offset: offset - realBarGap,
      size: 0
    };
    result = sizeList.reduce((res, entry) => {
      var _entry$barSize;
      var newPosition = {
        stackId: entry.stackId,
        dataKeys: entry.dataKeys,
        position: {
          offset: prev.offset + prev.size + realBarGap,
          size: useFull ? fullBarSize : (_entry$barSize = entry.barSize) !== null && _entry$barSize !== void 0 ? _entry$barSize : 0
        }
      };
      var newRes = [...res, newPosition];
      prev = newRes[newRes.length - 1].position;
      return newRes;
    }, initialValue);
  } else {
    var _offset = getPercentValue(barCategoryGap, bandSize, 0, true);
    if (bandSize - 2 * _offset - (len - 1) * realBarGap <= 0) {
      realBarGap = 0;
    }
    var originalSize = (bandSize - 2 * _offset - (len - 1) * realBarGap) / len;
    if (originalSize > 1) {
      originalSize >>= 0;
    }
    var size = isWellBehavedNumber(maxBarSize) ? Math.min(originalSize, maxBarSize) : originalSize;
    result = sizeList.reduce((res, entry, i) => [...res, {
      stackId: entry.stackId,
      dataKeys: entry.dataKeys,
      position: {
        offset: _offset + (originalSize + realBarGap) * i + (originalSize - size) / 2,
        size
      }
    }], initialValue);
  }
  return result;
}
var combineAllBarPositions = (sizeList, globalMaxBarSize, barGap, barCategoryGap, barBandSize, bandSize, childMaxBarSize) => {
  var maxBarSize = isNullish(childMaxBarSize) ? globalMaxBarSize : childMaxBarSize;
  var allBarPositions = getBarPositions(barGap, barCategoryGap, barBandSize !== bandSize ? barBandSize : bandSize, sizeList, maxBarSize);
  if (barBandSize !== bandSize && allBarPositions != null) {
    allBarPositions = allBarPositions.map((pos) => _objectSpread$5(_objectSpread$5({}, pos), {}, {
      position: _objectSpread$5(_objectSpread$5({}, pos.position), {}, {
        offset: pos.position.offset - barBandSize / 2
      })
    }));
  }
  return allBarPositions;
};
var selectAllBarPositions = createSelector([selectBarSizeList, selectRootMaxBarSize, selectBarGap, selectBarCategoryGap, selectBarBandSize, selectAxisBandSize, selectMaxBarSize], combineAllBarPositions);
var selectXAxisWithScale$1 = (state, xAxisId, _yAxisId, isPanorama) => selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
var selectYAxisWithScale$1 = (state, _xAxisId, yAxisId, isPanorama) => selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
var selectXAxisTicks$1 = (state, xAxisId, _yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
var selectYAxisTicks$1 = (state, _xAxisId, yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
var selectBarPosition = createSelector([selectAllBarPositions, selectSynchronisedBarSettings], (allBarPositions, barSettings) => {
  if (allBarPositions == null || barSettings == null) {
    return void 0;
  }
  var position = allBarPositions.find((p2) => p2.stackId === barSettings.stackId && barSettings.dataKey != null && p2.dataKeys.includes(barSettings.dataKey));
  if (position == null) {
    return void 0;
  }
  return position.position;
});
var combineStackedData = (stackGroups, barSettings) => {
  var stackSeriesIdentifier = getStackSeriesIdentifier(barSettings);
  if (!stackGroups || stackSeriesIdentifier == null || barSettings == null) {
    return void 0;
  }
  var {
    stackId
  } = barSettings;
  if (stackId == null) {
    return void 0;
  }
  var stackGroup = stackGroups[stackId];
  if (!stackGroup) {
    return void 0;
  }
  var {
    stackedData
  } = stackGroup;
  if (!stackedData) {
    return void 0;
  }
  return stackedData.find((sd) => sd.key === stackSeriesIdentifier);
};
var selectStackedDataOfItem = createSelector([selectBarStackGroups, selectSynchronisedBarSettings], combineStackedData);
var selectBarRectangles = createSelector([selectChartOffsetInternal, selectAxisViewBox, selectXAxisWithScale$1, selectYAxisWithScale$1, selectXAxisTicks$1, selectYAxisTicks$1, selectBarPosition, selectChartLayout, selectChartDataWithIndexesIfNotInPanorama, selectAxisBandSize, selectStackedDataOfItem, selectSynchronisedBarSettings, pickCells], (offset, axisViewBox, xAxis, yAxis, xAxisTicks, yAxisTicks, pos, layout, _ref3, bandSize, stackedData, barSettings, cells) => {
  var {
    chartData,
    dataStartIndex,
    dataEndIndex
  } = _ref3;
  if (barSettings == null || pos == null || axisViewBox == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || bandSize == null) {
    return void 0;
  }
  var {
    data
  } = barSettings;
  var displayedData;
  if (data != null && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  return computeBarRectangles({
    layout,
    barSettings,
    pos,
    parentViewBox: axisViewBox,
    bandSize,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    stackedData,
    displayedData,
    offset,
    cells
  });
});
var ChartDataContextProvider = (props) => {
  var {
    chartData
  } = props;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  reactExports.useEffect(() => {
    if (isPanorama) {
      return () => {
      };
    }
    dispatch(setChartData(chartData));
    return () => {
      dispatch(setChartData(void 0));
    };
  }, [chartData, dispatch, isPanorama]);
  return null;
};
var initialState$2 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
};
var brushSlice = createSlice({
  name: "brush",
  initialState: initialState$2,
  reducers: {
    setBrushSettings(_state, action) {
      if (action.payload == null) {
        return initialState$2;
      }
      return action.payload;
    }
  }
});
var {
  setBrushSettings
} = brushSlice.actions;
var brushReducer = brushSlice.reducer;
function _defineProperty$7(e3, r2, t2) {
  return (r2 = _toPropertyKey$7(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$7(t2) {
  var i = _toPrimitive$7(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$7(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
class ScaleHelper {
  static create(obj) {
    return new ScaleHelper(obj);
  }
  constructor(scale) {
    this.scale = scale;
  }
  get domain() {
    return this.scale.domain;
  }
  get range() {
    return this.scale.range;
  }
  get rangeMin() {
    return this.range()[0];
  }
  get rangeMax() {
    return this.range()[1];
  }
  get bandwidth() {
    return this.scale.bandwidth;
  }
  apply(value) {
    var {
      bandAware,
      position
    } = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (value === void 0) {
      return void 0;
    }
    if (position) {
      switch (position) {
        case "start": {
          return this.scale(value);
        }
        case "middle": {
          var offset = this.bandwidth ? this.bandwidth() / 2 : 0;
          return this.scale(value) + offset;
        }
        case "end": {
          var _offset = this.bandwidth ? this.bandwidth() : 0;
          return this.scale(value) + _offset;
        }
        default: {
          return this.scale(value);
        }
      }
    }
    if (bandAware) {
      var _offset2 = this.bandwidth ? this.bandwidth() / 2 : 0;
      return this.scale(value) + _offset2;
    }
    return this.scale(value);
  }
  isInRange(value) {
    var range2 = this.range();
    var first = range2[0];
    var last2 = range2[range2.length - 1];
    return first <= last2 ? value >= first && value <= last2 : value >= last2 && value <= first;
  }
}
_defineProperty$7(ScaleHelper, "EPS", 1e-4);
function normalizeAngle(angle) {
  return (angle % 180 + 180) % 180;
}
var getAngledRectangleWidth = function getAngledRectangleWidth2(_ref5) {
  var {
    width,
    height
  } = _ref5;
  var angle = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  var normalizedAngle = normalizeAngle(angle);
  var angleRadians = normalizedAngle * Math.PI / 180;
  var angleThreshold = Math.atan(height / width);
  var angledWidth = angleRadians > angleThreshold && angleRadians < Math.PI - angleThreshold ? height / Math.sin(angleRadians) : width / Math.cos(angleRadians);
  return Math.abs(angledWidth);
};
var initialState$1 = {
  dots: [],
  areas: [],
  lines: []
};
var referenceElementsSlice = createSlice({
  name: "referenceElements",
  initialState: initialState$1,
  reducers: {
    addDot: (state, action) => {
      state.dots.push(action.payload);
    },
    removeDot: (state, action) => {
      var index = current(state).dots.findIndex((dot) => dot === action.payload);
      if (index !== -1) {
        state.dots.splice(index, 1);
      }
    },
    addArea: (state, action) => {
      state.areas.push(action.payload);
    },
    removeArea: (state, action) => {
      var index = current(state).areas.findIndex((area) => area === action.payload);
      if (index !== -1) {
        state.areas.splice(index, 1);
      }
    },
    addLine: (state, action) => {
      state.lines.push(action.payload);
    },
    removeLine: (state, action) => {
      var index = current(state).lines.findIndex((line) => line === action.payload);
      if (index !== -1) {
        state.lines.splice(index, 1);
      }
    }
  }
});
var {
  addDot,
  removeDot,
  addArea,
  removeArea,
  addLine,
  removeLine
} = referenceElementsSlice.actions;
var referenceElementsReducer = referenceElementsSlice.reducer;
var ClipPathIdContext = /* @__PURE__ */ reactExports.createContext(void 0);
var ClipPathProvider = (_ref2) => {
  var {
    children
  } = _ref2;
  var [clipPathId] = reactExports.useState("".concat(uniqueId("recharts"), "-clip"));
  var plotArea = usePlotArea();
  if (plotArea == null) {
    return null;
  }
  var {
    x: x2,
    y: y2,
    width,
    height
  } = plotArea;
  return /* @__PURE__ */ reactExports.createElement(ClipPathIdContext.Provider, {
    value: clipPathId
  }, /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", {
    id: clipPathId
  }, /* @__PURE__ */ reactExports.createElement("rect", {
    x: x2,
    y: y2,
    height,
    width
  }))), children);
};
function shallowEqual(a2, b2) {
  for (var key in a2) {
    if ({}.hasOwnProperty.call(a2, key) && (!{}.hasOwnProperty.call(b2, key) || a2[key] !== b2[key])) {
      return false;
    }
  }
  for (var _key in b2) {
    if ({}.hasOwnProperty.call(b2, _key) && !{}.hasOwnProperty.call(a2, _key)) {
      return false;
    }
  }
  return true;
}
function getEveryNthWithCondition(array2, n2, isValid) {
  if (n2 < 1) {
    return [];
  }
  if (n2 === 1 && isValid === void 0) {
    return array2;
  }
  var result = [];
  for (var i = 0; i < array2.length; i += n2) {
    {
      result.push(array2[i]);
    }
  }
  return result;
}
function getAngledTickWidth(contentSize, unitSize, angle) {
  var size = {
    width: contentSize.width + unitSize.width,
    height: contentSize.height + unitSize.height
  };
  return getAngledRectangleWidth(size, angle);
}
function getTickBoundaries(viewBox, sign2, sizeKey) {
  var isWidth = sizeKey === "width";
  var {
    x: x2,
    y: y2,
    width,
    height
  } = viewBox;
  if (sign2 === 1) {
    return {
      start: isWidth ? x2 : y2,
      end: isWidth ? x2 + width : y2 + height
    };
  }
  return {
    start: isWidth ? x2 + width : y2 + height,
    end: isWidth ? x2 : y2
  };
}
function isVisible(sign2, tickPosition, getSize, start, end) {
  if (sign2 * tickPosition < sign2 * start || sign2 * tickPosition > sign2 * end) {
    return false;
  }
  var size = getSize();
  return sign2 * (tickPosition - sign2 * size / 2 - start) >= 0 && sign2 * (tickPosition + sign2 * size / 2 - end) <= 0;
}
function getNumberIntervalTicks(ticks2, interval) {
  return getEveryNthWithCondition(ticks2, interval + 1);
}
function getEquidistantTicks(sign2, boundaries, getTickSize, ticks2, minTickGap) {
  var result = (ticks2 || []).slice();
  var {
    start: initialStart,
    end
  } = boundaries;
  var index = 0;
  var stepsize = 1;
  var start = initialStart;
  var _loop = function _loop2() {
    var entry = ticks2 === null || ticks2 === void 0 ? void 0 : ticks2[index];
    if (entry === void 0) {
      return {
        v: getEveryNthWithCondition(ticks2, stepsize)
      };
    }
    var i = index;
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(entry, i);
      }
      return size;
    };
    var tickCoord = entry.coordinate;
    var isShow = index === 0 || isVisible(sign2, tickCoord, getSize, start, end);
    if (!isShow) {
      index = 0;
      start = initialStart;
      stepsize += 1;
    }
    if (isShow) {
      start = tickCoord + sign2 * (getSize() / 2 + minTickGap);
      index += stepsize;
    }
  }, _ret;
  while (stepsize <= result.length) {
    _ret = _loop();
    if (_ret) return _ret.v;
  }
  return [];
}
function ownKeys$4(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$4(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$4(Object(t2), true).forEach(function(r3) {
      _defineProperty$6(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$4(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$6(e3, r2, t2) {
  return (r2 = _toPropertyKey$6(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$6(t2) {
  var i = _toPrimitive$6(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$6(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function getTicksEnd(sign2, boundaries, getTickSize, ticks2, minTickGap) {
  var result = (ticks2 || []).slice();
  var len = result.length;
  var {
    start
  } = boundaries;
  var {
    end
  } = boundaries;
  var _loop = function _loop2(i2) {
    var entry = result[i2];
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(entry, i2);
      }
      return size;
    };
    if (i2 === len - 1) {
      var gap = sign2 * (entry.coordinate + sign2 * getSize() / 2 - end);
      result[i2] = entry = _objectSpread$4(_objectSpread$4({}, entry), {}, {
        tickCoord: gap > 0 ? entry.coordinate - gap * sign2 : entry.coordinate
      });
    } else {
      result[i2] = entry = _objectSpread$4(_objectSpread$4({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = isVisible(sign2, entry.tickCoord, getSize, start, end);
    if (isShow) {
      end = entry.tickCoord - sign2 * (getSize() / 2 + minTickGap);
      result[i2] = _objectSpread$4(_objectSpread$4({}, entry), {}, {
        isShow: true
      });
    }
  };
  for (var i = len - 1; i >= 0; i--) {
    _loop(i);
  }
  return result;
}
function getTicksStart(sign2, boundaries, getTickSize, ticks2, minTickGap, preserveEnd) {
  var result = (ticks2 || []).slice();
  var len = result.length;
  var {
    start,
    end
  } = boundaries;
  if (preserveEnd) {
    var tail = ticks2[len - 1];
    var tailSize = getTickSize(tail, len - 1);
    var tailGap = sign2 * (tail.coordinate + sign2 * tailSize / 2 - end);
    result[len - 1] = tail = _objectSpread$4(_objectSpread$4({}, tail), {}, {
      tickCoord: tailGap > 0 ? tail.coordinate - tailGap * sign2 : tail.coordinate
    });
    var isTailShow = isVisible(sign2, tail.tickCoord, () => tailSize, start, end);
    if (isTailShow) {
      end = tail.tickCoord - sign2 * (tailSize / 2 + minTickGap);
      result[len - 1] = _objectSpread$4(_objectSpread$4({}, tail), {}, {
        isShow: true
      });
    }
  }
  var count = preserveEnd ? len - 1 : len;
  var _loop2 = function _loop22(i2) {
    var entry = result[i2];
    var size;
    var getSize = () => {
      if (size === void 0) {
        size = getTickSize(entry, i2);
      }
      return size;
    };
    if (i2 === 0) {
      var gap = sign2 * (entry.coordinate - sign2 * getSize() / 2 - start);
      result[i2] = entry = _objectSpread$4(_objectSpread$4({}, entry), {}, {
        tickCoord: gap < 0 ? entry.coordinate - gap * sign2 : entry.coordinate
      });
    } else {
      result[i2] = entry = _objectSpread$4(_objectSpread$4({}, entry), {}, {
        tickCoord: entry.coordinate
      });
    }
    var isShow = isVisible(sign2, entry.tickCoord, getSize, start, end);
    if (isShow) {
      start = entry.tickCoord + sign2 * (getSize() / 2 + minTickGap);
      result[i2] = _objectSpread$4(_objectSpread$4({}, entry), {}, {
        isShow: true
      });
    }
  };
  for (var i = 0; i < count; i++) {
    _loop2(i);
  }
  return result;
}
function getTicks(props, fontSize, letterSpacing) {
  var {
    tick,
    ticks: ticks2,
    viewBox,
    minTickGap,
    orientation,
    interval,
    tickFormatter,
    unit: unit2,
    angle
  } = props;
  if (!ticks2 || !ticks2.length || !tick) {
    return [];
  }
  if (isNumber(interval) || Global.isSsr) {
    var _getNumberIntervalTic;
    return (_getNumberIntervalTic = getNumberIntervalTicks(ticks2, isNumber(interval) ? interval : 0)) !== null && _getNumberIntervalTic !== void 0 ? _getNumberIntervalTic : [];
  }
  var candidates = [];
  var sizeKey = orientation === "top" || orientation === "bottom" ? "width" : "height";
  var unitSize = unit2 && sizeKey === "width" ? getStringSize(unit2, {
    fontSize,
    letterSpacing
  }) : {
    width: 0,
    height: 0
  };
  var getTickSize = (content, index) => {
    var value = typeof tickFormatter === "function" ? tickFormatter(content.value, index) : content.value;
    return sizeKey === "width" ? getAngledTickWidth(getStringSize(value, {
      fontSize,
      letterSpacing
    }), unitSize, angle) : getStringSize(value, {
      fontSize,
      letterSpacing
    })[sizeKey];
  };
  var sign2 = ticks2.length >= 2 ? mathSign(ticks2[1].coordinate - ticks2[0].coordinate) : 1;
  var boundaries = getTickBoundaries(viewBox, sign2, sizeKey);
  if (interval === "equidistantPreserveStart") {
    return getEquidistantTicks(sign2, boundaries, getTickSize, ticks2, minTickGap);
  }
  if (interval === "preserveStart" || interval === "preserveStartEnd") {
    candidates = getTicksStart(sign2, boundaries, getTickSize, ticks2, minTickGap, interval === "preserveStartEnd");
  } else {
    candidates = getTicksEnd(sign2, boundaries, getTickSize, ticks2, minTickGap);
  }
  return candidates.filter((entry) => entry.isShow);
}
var _excluded$7 = ["viewBox"], _excluded2$4 = ["viewBox"];
function _extends$6() {
  return _extends$6 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$6.apply(null, arguments);
}
function ownKeys$3(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$3(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$3(Object(t2), true).forEach(function(r3) {
      _defineProperty$5(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$3(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _objectWithoutProperties$7(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$7(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$7(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function _defineProperty$5(e3, r2, t2) {
  return (r2 = _toPropertyKey$5(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$5(t2) {
  var i = _toPrimitive$5(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$5(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
class CartesianAxis extends reactExports.Component {
  constructor(props) {
    super(props);
    this.tickRefs = /* @__PURE__ */ reactExports.createRef();
    this.tickRefs.current = [];
    this.state = {
      fontSize: "",
      letterSpacing: ""
    };
  }
  shouldComponentUpdate(_ref2, nextState) {
    var {
      viewBox
    } = _ref2, restProps = _objectWithoutProperties$7(_ref2, _excluded$7);
    var _this$props = this.props, {
      viewBox: viewBoxOld
    } = _this$props, restPropsOld = _objectWithoutProperties$7(_this$props, _excluded2$4);
    return !shallowEqual(viewBox, viewBoxOld) || !shallowEqual(restProps, restPropsOld) || !shallowEqual(nextState, this.state);
  }
  /**
   * Calculate the coordinates of endpoints in ticks
   * @param  data The data of a simple tick
   * @return (x1, y1): The coordinate of endpoint close to tick text
   *  (x2, y2): The coordinate of endpoint close to axis
   */
  getTickLineCoord(data) {
    var {
      x: x2,
      y: y2,
      width,
      height,
      orientation,
      tickSize,
      mirror,
      tickMargin
    } = this.props;
    var x1, x22, y1, y22, tx, ty;
    var sign2 = mirror ? -1 : 1;
    var finalTickSize = data.tickSize || tickSize;
    var tickCoord = isNumber(data.tickCoord) ? data.tickCoord : data.coordinate;
    switch (orientation) {
      case "top":
        x1 = x22 = data.coordinate;
        y22 = y2 + +!mirror * height;
        y1 = y22 - sign2 * finalTickSize;
        ty = y1 - sign2 * tickMargin;
        tx = tickCoord;
        break;
      case "left":
        y1 = y22 = data.coordinate;
        x22 = x2 + +!mirror * width;
        x1 = x22 - sign2 * finalTickSize;
        tx = x1 - sign2 * tickMargin;
        ty = tickCoord;
        break;
      case "right":
        y1 = y22 = data.coordinate;
        x22 = x2 + +mirror * width;
        x1 = x22 + sign2 * finalTickSize;
        tx = x1 + sign2 * tickMargin;
        ty = tickCoord;
        break;
      default:
        x1 = x22 = data.coordinate;
        y22 = y2 + +mirror * height;
        y1 = y22 + sign2 * finalTickSize;
        ty = y1 + sign2 * tickMargin;
        tx = tickCoord;
        break;
    }
    return {
      line: {
        x1,
        y1,
        x2: x22,
        y2: y22
      },
      tick: {
        x: tx,
        y: ty
      }
    };
  }
  getTickTextAnchor() {
    var {
      orientation,
      mirror
    } = this.props;
    switch (orientation) {
      case "left":
        return mirror ? "start" : "end";
      case "right":
        return mirror ? "end" : "start";
      default:
        return "middle";
    }
  }
  getTickVerticalAnchor() {
    var {
      orientation,
      mirror
    } = this.props;
    switch (orientation) {
      case "left":
      case "right":
        return "middle";
      case "top":
        return mirror ? "start" : "end";
      default:
        return mirror ? "end" : "start";
    }
  }
  renderAxisLine() {
    var {
      x: x2,
      y: y2,
      width,
      height,
      orientation,
      mirror,
      axisLine
    } = this.props;
    var props = _objectSpread$3(_objectSpread$3(_objectSpread$3({}, filterProps(this.props, false)), filterProps(axisLine, false)), {}, {
      fill: "none"
    });
    if (orientation === "top" || orientation === "bottom") {
      var needHeight = +(orientation === "top" && !mirror || orientation === "bottom" && mirror);
      props = _objectSpread$3(_objectSpread$3({}, props), {}, {
        x1: x2,
        y1: y2 + needHeight * height,
        x2: x2 + width,
        y2: y2 + needHeight * height
      });
    } else {
      var needWidth = +(orientation === "left" && !mirror || orientation === "right" && mirror);
      props = _objectSpread$3(_objectSpread$3({}, props), {}, {
        x1: x2 + needWidth * width,
        y1: y2,
        x2: x2 + needWidth * width,
        y2: y2 + height
      });
    }
    return /* @__PURE__ */ reactExports.createElement("line", _extends$6({}, props, {
      className: clsx("recharts-cartesian-axis-line", get$1(axisLine, "className"))
    }));
  }
  static renderTickItem(option, props, value) {
    var tickItem;
    var combinedClassName = clsx(props.className, "recharts-cartesian-axis-tick-value");
    if (/* @__PURE__ */ reactExports.isValidElement(option)) {
      tickItem = /* @__PURE__ */ reactExports.cloneElement(option, _objectSpread$3(_objectSpread$3({}, props), {}, {
        className: combinedClassName
      }));
    } else if (typeof option === "function") {
      tickItem = option(_objectSpread$3(_objectSpread$3({}, props), {}, {
        className: combinedClassName
      }));
    } else {
      var className = "recharts-cartesian-axis-tick-value";
      if (typeof option !== "boolean") {
        className = clsx(className, option.className);
      }
      tickItem = /* @__PURE__ */ reactExports.createElement(Text, _extends$6({}, props, {
        className
      }), value);
    }
    return tickItem;
  }
  /**
   * render the ticks
   * @param {string} fontSize Fontsize to consider for tick spacing
   * @param {string} letterSpacing Letter spacing to consider for tick spacing
   * @param {Array} ticks The ticks to actually render (overrides what was passed in props)
   * @return {ReactElement | null} renderedTicks
   */
  renderTicks(fontSize, letterSpacing) {
    var ticks2 = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
    var {
      tickLine,
      stroke,
      tick,
      tickFormatter,
      unit: unit2,
      padding,
      tickTextProps
    } = this.props;
    var finalTicks = getTicks(_objectSpread$3(_objectSpread$3({}, this.props), {}, {
      ticks: ticks2
    }), fontSize, letterSpacing);
    var textAnchor = this.getTickTextAnchor();
    var verticalAnchor = this.getTickVerticalAnchor();
    var axisProps = svgPropertiesNoEvents(this.props);
    var customTickProps = filterProps(tick, false);
    var tickLineProps = _objectSpread$3(_objectSpread$3({}, axisProps), {}, {
      fill: "none"
    }, filterProps(tickLine, false));
    var items = finalTicks.map((entry, i) => {
      var {
        line: lineCoord,
        tick: tickCoord
      } = this.getTickLineCoord(entry);
      var tickProps = _objectSpread$3(_objectSpread$3(_objectSpread$3(_objectSpread$3({
        // @ts-expect-error textAnchor from axisProps is typed as `string` but Text wants type `TextAnchor`
        textAnchor,
        verticalAnchor
      }, axisProps), {}, {
        stroke: "none",
        fill: stroke
      }, customTickProps), tickCoord), {}, {
        index: i,
        payload: entry,
        visibleTicksCount: finalTicks.length,
        tickFormatter,
        padding
      }, tickTextProps);
      return /* @__PURE__ */ reactExports.createElement(Layer, _extends$6({
        className: "recharts-cartesian-axis-tick",
        key: "tick-".concat(entry.value, "-").concat(entry.coordinate, "-").concat(entry.tickCoord)
      }, adaptEventsOfChild(this.props, entry, i)), tickLine && // @ts-expect-error recharts scale is not compatible with SVG scale
      /* @__PURE__ */ reactExports.createElement("line", _extends$6({}, tickLineProps, lineCoord, {
        className: clsx("recharts-cartesian-axis-tick-line", get$1(tickLine, "className"))
      })), tick && CartesianAxis.renderTickItem(tick, tickProps, "".concat(typeof tickFormatter === "function" ? tickFormatter(entry.value, i) : entry.value).concat(unit2 || "")));
    });
    return items.length > 0 ? /* @__PURE__ */ reactExports.createElement("g", {
      className: "recharts-cartesian-axis-ticks"
    }, items) : null;
  }
  render() {
    var {
      axisLine,
      width,
      height,
      className,
      hide
    } = this.props;
    if (hide) {
      return null;
    }
    var {
      ticks: ticks2
    } = this.props;
    if (width != null && width <= 0 || height != null && height <= 0) {
      return null;
    }
    return /* @__PURE__ */ reactExports.createElement(Layer, {
      className: clsx("recharts-cartesian-axis", className),
      ref: (_ref2) => {
        if (_ref2) {
          var tickNodes = _ref2.getElementsByClassName("recharts-cartesian-axis-tick-value");
          this.tickRefs.current = Array.from(tickNodes);
          var tick = tickNodes[0];
          if (tick) {
            var calculatedFontSize = window.getComputedStyle(tick).fontSize;
            var calculatedLetterSpacing = window.getComputedStyle(tick).letterSpacing;
            if (calculatedFontSize !== this.state.fontSize || calculatedLetterSpacing !== this.state.letterSpacing) {
              this.setState({
                fontSize: window.getComputedStyle(tick).fontSize,
                letterSpacing: window.getComputedStyle(tick).letterSpacing
              });
            }
          }
        }
      }
    }, axisLine && this.renderAxisLine(), this.renderTicks(this.state.fontSize, this.state.letterSpacing, ticks2), /* @__PURE__ */ reactExports.createElement(CartesianLabelContextProvider, {
      x: this.props.x,
      y: this.props.y,
      width: this.props.width,
      height: this.props.height
    }, /* @__PURE__ */ reactExports.createElement(CartesianLabelFromLabelProp, {
      label: this.props.label
    }), this.props.children));
  }
}
_defineProperty$5(CartesianAxis, "displayName", "CartesianAxis");
_defineProperty$5(CartesianAxis, "defaultProps", {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  viewBox: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  // The orientation of axis
  orientation: "bottom",
  // The ticks
  ticks: [],
  stroke: "#666",
  tickLine: true,
  axisLine: true,
  tick: true,
  mirror: false,
  minTickGap: 5,
  // The width or height of tick
  tickSize: 6,
  tickMargin: 2,
  interval: "preserveEnd"
});
var _excluded$6 = ["x1", "y1", "x2", "y2", "key"], _excluded2$3 = ["offset"], _excluded3$1 = ["xAxisId", "yAxisId"], _excluded4 = ["xAxisId", "yAxisId"];
function ownKeys$2(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$2(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$2(Object(t2), true).forEach(function(r3) {
      _defineProperty$4(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$2(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$4(e3, r2, t2) {
  return (r2 = _toPropertyKey$4(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$4(t2) {
  var i = _toPrimitive$4(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$4(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _extends$5() {
  return _extends$5 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$5.apply(null, arguments);
}
function _objectWithoutProperties$6(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$6(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$6(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var Background = (props) => {
  var {
    fill
  } = props;
  if (!fill || fill === "none") {
    return null;
  }
  var {
    fillOpacity,
    x: x2,
    y: y2,
    width,
    height,
    ry
  } = props;
  return /* @__PURE__ */ reactExports.createElement("rect", {
    x: x2,
    y: y2,
    ry,
    width,
    height,
    stroke: "none",
    fill,
    fillOpacity,
    className: "recharts-cartesian-grid-bg"
  });
};
function renderLineItem(option, props) {
  var lineItem;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    lineItem = /* @__PURE__ */ reactExports.cloneElement(option, props);
  } else if (typeof option === "function") {
    lineItem = option(props);
  } else {
    var {
      x1,
      y1,
      x2,
      y2,
      key
    } = props, others = _objectWithoutProperties$6(props, _excluded$6);
    var _svgPropertiesNoEvent = svgPropertiesNoEvents(others), {
      offset: __
    } = _svgPropertiesNoEvent, restOfFilteredProps = _objectWithoutProperties$6(_svgPropertiesNoEvent, _excluded2$3);
    lineItem = /* @__PURE__ */ reactExports.createElement("line", _extends$5({}, restOfFilteredProps, {
      x1,
      y1,
      x2,
      y2,
      fill: "none",
      key
    }));
  }
  return lineItem;
}
function HorizontalGridLines(props) {
  var {
    x: x2,
    width,
    horizontal = true,
    horizontalPoints
  } = props;
  if (!horizontal || !horizontalPoints || !horizontalPoints.length) {
    return null;
  }
  var {
    xAxisId,
    yAxisId
  } = props, otherLineItemProps = _objectWithoutProperties$6(props, _excluded3$1);
  var items = horizontalPoints.map((entry, i) => {
    var lineItemProps = _objectSpread$2(_objectSpread$2({}, otherLineItemProps), {}, {
      x1: x2,
      y1: entry,
      x2: x2 + width,
      y2: entry,
      key: "line-".concat(i),
      index: i
    });
    return renderLineItem(horizontal, lineItemProps);
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid-horizontal"
  }, items);
}
function VerticalGridLines(props) {
  var {
    y: y2,
    height,
    vertical = true,
    verticalPoints
  } = props;
  if (!vertical || !verticalPoints || !verticalPoints.length) {
    return null;
  }
  var {
    xAxisId,
    yAxisId
  } = props, otherLineItemProps = _objectWithoutProperties$6(props, _excluded4);
  var items = verticalPoints.map((entry, i) => {
    var lineItemProps = _objectSpread$2(_objectSpread$2({}, otherLineItemProps), {}, {
      x1: entry,
      y1: y2,
      x2: entry,
      y2: y2 + height,
      key: "line-".concat(i),
      index: i
    });
    return renderLineItem(vertical, lineItemProps);
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid-vertical"
  }, items);
}
function HorizontalStripes(props) {
  var {
    horizontalFill,
    fillOpacity,
    x: x2,
    y: y2,
    width,
    height,
    horizontalPoints,
    horizontal = true
  } = props;
  if (!horizontal || !horizontalFill || !horizontalFill.length) {
    return null;
  }
  var roundedSortedHorizontalPoints = horizontalPoints.map((e3) => Math.round(e3 + y2 - y2)).sort((a2, b2) => a2 - b2);
  if (y2 !== roundedSortedHorizontalPoints[0]) {
    roundedSortedHorizontalPoints.unshift(0);
  }
  var items = roundedSortedHorizontalPoints.map((entry, i) => {
    var lastStripe = !roundedSortedHorizontalPoints[i + 1];
    var lineHeight = lastStripe ? y2 + height - entry : roundedSortedHorizontalPoints[i + 1] - entry;
    if (lineHeight <= 0) {
      return null;
    }
    var colorIndex = i % horizontalFill.length;
    return /* @__PURE__ */ reactExports.createElement("rect", {
      key: "react-".concat(i),
      y: entry,
      x: x2,
      height: lineHeight,
      width,
      stroke: "none",
      fill: horizontalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-gridstripes-horizontal"
  }, items);
}
function VerticalStripes(props) {
  var {
    vertical = true,
    verticalFill,
    fillOpacity,
    x: x2,
    y: y2,
    width,
    height,
    verticalPoints
  } = props;
  if (!vertical || !verticalFill || !verticalFill.length) {
    return null;
  }
  var roundedSortedVerticalPoints = verticalPoints.map((e3) => Math.round(e3 + x2 - x2)).sort((a2, b2) => a2 - b2);
  if (x2 !== roundedSortedVerticalPoints[0]) {
    roundedSortedVerticalPoints.unshift(0);
  }
  var items = roundedSortedVerticalPoints.map((entry, i) => {
    var lastStripe = !roundedSortedVerticalPoints[i + 1];
    var lineWidth = lastStripe ? x2 + width - entry : roundedSortedVerticalPoints[i + 1] - entry;
    if (lineWidth <= 0) {
      return null;
    }
    var colorIndex = i % verticalFill.length;
    return /* @__PURE__ */ reactExports.createElement("rect", {
      key: "react-".concat(i),
      x: entry,
      y: y2,
      width: lineWidth,
      height,
      stroke: "none",
      fill: verticalFill[colorIndex],
      fillOpacity,
      className: "recharts-cartesian-grid-bg"
    });
  });
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-gridstripes-vertical"
  }, items);
}
var defaultVerticalCoordinatesGenerator = (_ref2, syncWithTicks) => {
  var {
    xAxis,
    width,
    height,
    offset
  } = _ref2;
  return getCoordinatesOfGrid(getTicks(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, CartesianAxis.defaultProps), xAxis), {}, {
    ticks: getTicksOfAxis(xAxis),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.left, offset.left + offset.width, syncWithTicks);
};
var defaultHorizontalCoordinatesGenerator = (_ref2, syncWithTicks) => {
  var {
    yAxis,
    width,
    height,
    offset
  } = _ref2;
  return getCoordinatesOfGrid(getTicks(_objectSpread$2(_objectSpread$2(_objectSpread$2({}, CartesianAxis.defaultProps), yAxis), {}, {
    ticks: getTicksOfAxis(yAxis),
    viewBox: {
      x: 0,
      y: 0,
      width,
      height
    }
  })), offset.top, offset.top + offset.height, syncWithTicks);
};
var defaultProps$1 = {
  horizontal: true,
  vertical: true,
  // The ordinates of horizontal grid lines
  horizontalPoints: [],
  // The abscissas of vertical grid lines
  verticalPoints: [],
  stroke: "#ccc",
  fill: "none",
  // The fill of colors of grid lines
  verticalFill: [],
  horizontalFill: [],
  xAxisId: 0,
  yAxisId: 0
};
function CartesianGrid(props) {
  var chartWidth = useChartWidth();
  var chartHeight = useChartHeight();
  var offset = useOffsetInternal();
  var propsIncludingDefaults = _objectSpread$2(_objectSpread$2({}, resolveDefaultProps(props, defaultProps$1)), {}, {
    x: isNumber(props.x) ? props.x : offset.left,
    y: isNumber(props.y) ? props.y : offset.top,
    width: isNumber(props.width) ? props.width : offset.width,
    height: isNumber(props.height) ? props.height : offset.height
  });
  var {
    xAxisId,
    yAxisId,
    x: x2,
    y: y2,
    width,
    height,
    syncWithTicks,
    horizontalValues,
    verticalValues
  } = propsIncludingDefaults;
  var isPanorama = useIsPanorama();
  var xAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "xAxis", xAxisId, isPanorama));
  var yAxis = useAppSelector((state) => selectAxisPropsNeededForCartesianGridTicksGenerator(state, "yAxis", yAxisId, isPanorama));
  if (!isNumber(width) || width <= 0 || !isNumber(height) || height <= 0 || !isNumber(x2) || x2 !== +x2 || !isNumber(y2) || y2 !== +y2) {
    return null;
  }
  var verticalCoordinatesGenerator = propsIncludingDefaults.verticalCoordinatesGenerator || defaultVerticalCoordinatesGenerator;
  var horizontalCoordinatesGenerator = propsIncludingDefaults.horizontalCoordinatesGenerator || defaultHorizontalCoordinatesGenerator;
  var {
    horizontalPoints,
    verticalPoints
  } = propsIncludingDefaults;
  if ((!horizontalPoints || !horizontalPoints.length) && typeof horizontalCoordinatesGenerator === "function") {
    var isHorizontalValues = horizontalValues && horizontalValues.length;
    var generatorResult = horizontalCoordinatesGenerator({
      yAxis: yAxis ? _objectSpread$2(_objectSpread$2({}, yAxis), {}, {
        ticks: isHorizontalValues ? horizontalValues : yAxis.ticks
      }) : void 0,
      width: chartWidth,
      height: chartHeight,
      offset
    }, isHorizontalValues ? true : syncWithTicks);
    warn(Array.isArray(generatorResult), "horizontalCoordinatesGenerator should return Array but instead it returned [".concat(typeof generatorResult, "]"));
    if (Array.isArray(generatorResult)) {
      horizontalPoints = generatorResult;
    }
  }
  if ((!verticalPoints || !verticalPoints.length) && typeof verticalCoordinatesGenerator === "function") {
    var isVerticalValues = verticalValues && verticalValues.length;
    var _generatorResult = verticalCoordinatesGenerator({
      xAxis: xAxis ? _objectSpread$2(_objectSpread$2({}, xAxis), {}, {
        ticks: isVerticalValues ? verticalValues : xAxis.ticks
      }) : void 0,
      width: chartWidth,
      height: chartHeight,
      offset
    }, isVerticalValues ? true : syncWithTicks);
    warn(Array.isArray(_generatorResult), "verticalCoordinatesGenerator should return Array but instead it returned [".concat(typeof _generatorResult, "]"));
    if (Array.isArray(_generatorResult)) {
      verticalPoints = _generatorResult;
    }
  }
  return /* @__PURE__ */ reactExports.createElement("g", {
    className: "recharts-cartesian-grid"
  }, /* @__PURE__ */ reactExports.createElement(Background, {
    fill: propsIncludingDefaults.fill,
    fillOpacity: propsIncludingDefaults.fillOpacity,
    x: propsIncludingDefaults.x,
    y: propsIncludingDefaults.y,
    width: propsIncludingDefaults.width,
    height: propsIncludingDefaults.height,
    ry: propsIncludingDefaults.ry
  }), /* @__PURE__ */ reactExports.createElement(HorizontalStripes, _extends$5({}, propsIncludingDefaults, {
    horizontalPoints
  })), /* @__PURE__ */ reactExports.createElement(VerticalStripes, _extends$5({}, propsIncludingDefaults, {
    verticalPoints
  })), /* @__PURE__ */ reactExports.createElement(HorizontalGridLines, _extends$5({}, propsIncludingDefaults, {
    offset,
    horizontalPoints,
    xAxis,
    yAxis
  })), /* @__PURE__ */ reactExports.createElement(VerticalGridLines, _extends$5({}, propsIncludingDefaults, {
    offset,
    verticalPoints,
    xAxis,
    yAxis
  })));
}
CartesianGrid.displayName = "CartesianGrid";
var selectXAxisWithScale = (state, xAxisId, _yAxisId, isPanorama) => selectAxisWithScale(state, "xAxis", xAxisId, isPanorama);
var selectXAxisTicks = (state, xAxisId, _yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "xAxis", xAxisId, isPanorama);
var selectYAxisWithScale = (state, _xAxisId, yAxisId, isPanorama) => selectAxisWithScale(state, "yAxis", yAxisId, isPanorama);
var selectYAxisTicks = (state, _xAxisId, yAxisId, isPanorama) => selectTicksOfGraphicalItem(state, "yAxis", yAxisId, isPanorama);
var selectBandSize = createSelector([selectChartLayout, selectXAxisWithScale, selectYAxisWithScale, selectXAxisTicks, selectYAxisTicks], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks) => {
  if (isCategoricalAxis(layout, "xAxis")) {
    return getBandSizeOfAxis(xAxis, xAxisTicks, false);
  }
  return getBandSizeOfAxis(yAxis, yAxisTicks, false);
});
var pickAreaId = (_state, _xAxisId, _yAxisId, _isPanorama, id) => id;
var selectSynchronisedAreaSettings = createSelector([selectUnfilteredCartesianItems, pickAreaId], (graphicalItems, id) => graphicalItems.filter((item) => item.type === "area").find((item) => item.id === id));
var selectGraphicalItemStackedData = (state, xAxisId, yAxisId, isPanorama, id) => {
  var _stackGroups$stackId;
  var areaSettings = selectSynchronisedAreaSettings(state, xAxisId, yAxisId, isPanorama, id);
  if (areaSettings == null) {
    return void 0;
  }
  var layout = selectChartLayout(state);
  var isXAxisCategorical = isCategoricalAxis(layout, "xAxis");
  var stackGroups;
  if (isXAxisCategorical) {
    stackGroups = selectStackGroups(state, "yAxis", yAxisId, isPanorama);
  } else {
    stackGroups = selectStackGroups(state, "xAxis", xAxisId, isPanorama);
  }
  if (stackGroups == null) {
    return void 0;
  }
  var {
    stackId
  } = areaSettings;
  var stackSeriesIdentifier = getStackSeriesIdentifier(areaSettings);
  if (stackId == null || stackSeriesIdentifier == null) {
    return void 0;
  }
  var groups = (_stackGroups$stackId = stackGroups[stackId]) === null || _stackGroups$stackId === void 0 ? void 0 : _stackGroups$stackId.stackedData;
  return groups === null || groups === void 0 ? void 0 : groups.find((v2) => v2.key === stackSeriesIdentifier);
};
var selectArea = createSelector([selectChartLayout, selectXAxisWithScale, selectYAxisWithScale, selectXAxisTicks, selectYAxisTicks, selectGraphicalItemStackedData, selectChartDataWithIndexesIfNotInPanorama, selectBandSize, selectSynchronisedAreaSettings], (layout, xAxis, yAxis, xAxisTicks, yAxisTicks, stackedData, _ref2, bandSize, areaSettings) => {
  var {
    chartData,
    dataStartIndex,
    dataEndIndex
  } = _ref2;
  if (areaSettings == null || layout !== "horizontal" && layout !== "vertical" || xAxis == null || yAxis == null || xAxisTicks == null || yAxisTicks == null || xAxisTicks.length === 0 || yAxisTicks.length === 0 || bandSize == null) {
    return void 0;
  }
  var {
    data
  } = areaSettings;
  var displayedData;
  if (data && data.length > 0) {
    displayedData = data;
  } else {
    displayedData = chartData === null || chartData === void 0 ? void 0 : chartData.slice(dataStartIndex, dataEndIndex + 1);
  }
  if (displayedData == null) {
    return void 0;
  }
  var chartBaseValue = void 0;
  return computeArea({
    layout,
    xAxis,
    yAxis,
    xAxisTicks,
    yAxisTicks,
    dataStartIndex,
    areaSettings,
    stackedData,
    displayedData,
    chartBaseValue,
    bandSize
  });
});
var _excluded$5 = ["id"], _excluded2$2 = ["activeDot", "animationBegin", "animationDuration", "animationEasing", "connectNulls", "dot", "fill", "fillOpacity", "hide", "isAnimationActive", "legendType", "stroke", "xAxisId", "yAxisId"];
function _objectWithoutProperties$5(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$5(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$5(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function ownKeys$1(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread$1(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys$1(Object(t2), true).forEach(function(r3) {
      _defineProperty$3(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys$1(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty$3(e3, r2, t2) {
  return (r2 = _toPropertyKey$3(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$3(t2) {
  var i = _toPrimitive$3(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$3(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _extends$4() {
  return _extends$4 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$4.apply(null, arguments);
}
function getLegendItemColor(stroke, fill) {
  return stroke && stroke !== "none" ? stroke : fill;
}
var computeLegendPayloadFromAreaData = (props) => {
  var {
    dataKey,
    name,
    stroke,
    fill,
    legendType,
    hide
  } = props;
  return [{
    inactive: hide,
    dataKey,
    type: legendType,
    color: getLegendItemColor(stroke, fill),
    value: getTooltipNameProp(name, dataKey),
    payload: props
  }];
};
function getTooltipEntrySettings(props) {
  var {
    dataKey,
    data,
    stroke,
    strokeWidth,
    fill,
    name,
    hide,
    unit: unit2
  } = props;
  return {
    dataDefinedOnItem: data,
    positions: void 0,
    settings: {
      stroke,
      strokeWidth,
      fill,
      dataKey,
      nameKey: void 0,
      name: getTooltipNameProp(name, dataKey),
      hide,
      type: props.tooltipType,
      color: getLegendItemColor(stroke, fill),
      unit: unit2
    }
  };
}
var renderDotItem = (option, props) => {
  var dotItem;
  if (/* @__PURE__ */ reactExports.isValidElement(option)) {
    dotItem = /* @__PURE__ */ reactExports.cloneElement(option, props);
  } else if (typeof option === "function") {
    dotItem = option(props);
  } else {
    var className = clsx("recharts-area-dot", typeof option !== "boolean" ? option.className : "");
    dotItem = /* @__PURE__ */ reactExports.createElement(Dot, _extends$4({}, props, {
      className
    }));
  }
  return dotItem;
};
function shouldRenderDots(points, dot) {
  if (points == null) {
    return false;
  }
  if (dot) {
    return true;
  }
  return points.length === 1;
}
function Dots(_ref2) {
  var {
    clipPathId,
    points,
    props
  } = _ref2;
  var {
    needClip,
    dot,
    dataKey
  } = props;
  if (!shouldRenderDots(points, dot)) {
    return null;
  }
  var clipDot = isClipDot(dot);
  var areaProps = svgPropertiesNoEvents(props);
  var customDotProps = filterProps(dot, true);
  var dots = points.map((entry, i) => {
    var dotProps = _objectSpread$1(_objectSpread$1(_objectSpread$1({
      key: "dot-".concat(i),
      r: 3
    }, areaProps), customDotProps), {}, {
      index: i,
      cx: entry.x,
      cy: entry.y,
      dataKey,
      value: entry.value,
      payload: entry.payload,
      points
    });
    return renderDotItem(dot, dotProps);
  });
  var dotsProps = {
    clipPath: needClip ? "url(#clipPath-".concat(clipDot ? "" : "dots-").concat(clipPathId, ")") : void 0
  };
  return /* @__PURE__ */ reactExports.createElement(Layer, _extends$4({
    className: "recharts-area-dots"
  }, dotsProps), dots);
}
function AreaLabelListProvider(_ref2) {
  var {
    showLabels,
    children,
    points
  } = _ref2;
  var labelListEntries = points.map((point2) => {
    var viewBox = {
      x: point2.x,
      y: point2.y,
      width: 0,
      height: 0
    };
    return _objectSpread$1(_objectSpread$1({}, viewBox), {}, {
      value: point2.value,
      payload: point2.payload,
      parentViewBox: void 0,
      viewBox,
      fill: void 0
    });
  });
  return /* @__PURE__ */ reactExports.createElement(CartesianLabelListContextProvider, {
    value: showLabels ? labelListEntries : null
  }, children);
}
function StaticArea(_ref3) {
  var {
    points,
    baseLine,
    needClip,
    clipPathId,
    props
  } = _ref3;
  var {
    layout,
    type,
    stroke,
    connectNulls,
    isRange
  } = props;
  var {
    id
  } = props, propsWithoutId = _objectWithoutProperties$5(props, _excluded$5);
  var allOtherProps = svgPropertiesNoEvents(propsWithoutId);
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, (points === null || points === void 0 ? void 0 : points.length) > 1 && /* @__PURE__ */ reactExports.createElement(Layer, {
    clipPath: needClip ? "url(#clipPath-".concat(clipPathId, ")") : void 0
  }, /* @__PURE__ */ reactExports.createElement(Curve, _extends$4({}, allOtherProps, {
    id,
    points,
    connectNulls,
    type,
    baseLine,
    layout,
    stroke: "none",
    className: "recharts-area-area"
  })), stroke !== "none" && /* @__PURE__ */ reactExports.createElement(Curve, _extends$4({}, allOtherProps, {
    className: "recharts-area-curve",
    layout,
    type,
    connectNulls,
    fill: "none",
    points
  })), stroke !== "none" && isRange && /* @__PURE__ */ reactExports.createElement(Curve, _extends$4({}, allOtherProps, {
    className: "recharts-area-curve",
    layout,
    type,
    connectNulls,
    fill: "none",
    points: baseLine
  }))), /* @__PURE__ */ reactExports.createElement(Dots, {
    points,
    props: propsWithoutId,
    clipPathId
  }));
}
function VerticalRect(_ref4) {
  var {
    alpha: alpha2,
    baseLine,
    points,
    strokeWidth
  } = _ref4;
  var startY = points[0].y;
  var endY = points[points.length - 1].y;
  if (!isWellBehavedNumber(startY) || !isWellBehavedNumber(endY)) {
    return null;
  }
  var height = alpha2 * Math.abs(startY - endY);
  var maxX = Math.max(...points.map((entry) => entry.x || 0));
  if (isNumber(baseLine)) {
    maxX = Math.max(baseLine, maxX);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxX = Math.max(...baseLine.map((entry) => entry.x || 0), maxX);
  }
  if (isNumber(maxX)) {
    return /* @__PURE__ */ reactExports.createElement("rect", {
      x: 0,
      y: startY < endY ? startY : startY - height,
      width: maxX + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1),
      height: Math.floor(height)
    });
  }
  return null;
}
function HorizontalRect(_ref5) {
  var {
    alpha: alpha2,
    baseLine,
    points,
    strokeWidth
  } = _ref5;
  var startX = points[0].x;
  var endX = points[points.length - 1].x;
  if (!isWellBehavedNumber(startX) || !isWellBehavedNumber(endX)) {
    return null;
  }
  var width = alpha2 * Math.abs(startX - endX);
  var maxY = Math.max(...points.map((entry) => entry.y || 0));
  if (isNumber(baseLine)) {
    maxY = Math.max(baseLine, maxY);
  } else if (baseLine && Array.isArray(baseLine) && baseLine.length) {
    maxY = Math.max(...baseLine.map((entry) => entry.y || 0), maxY);
  }
  if (isNumber(maxY)) {
    return /* @__PURE__ */ reactExports.createElement("rect", {
      x: startX < endX ? startX : startX - width,
      y: 0,
      width,
      height: Math.floor(maxY + (strokeWidth ? parseInt("".concat(strokeWidth), 10) : 1))
    });
  }
  return null;
}
function ClipRect(_ref6) {
  var {
    alpha: alpha2,
    layout,
    points,
    baseLine,
    strokeWidth
  } = _ref6;
  if (layout === "vertical") {
    return /* @__PURE__ */ reactExports.createElement(VerticalRect, {
      alpha: alpha2,
      points,
      baseLine,
      strokeWidth
    });
  }
  return /* @__PURE__ */ reactExports.createElement(HorizontalRect, {
    alpha: alpha2,
    points,
    baseLine,
    strokeWidth
  });
}
function AreaWithAnimation(_ref7) {
  var {
    needClip,
    clipPathId,
    props,
    previousPointsRef,
    previousBaselineRef
  } = _ref7;
  var {
    points,
    baseLine,
    isAnimationActive,
    animationBegin,
    animationDuration,
    animationEasing,
    onAnimationStart,
    onAnimationEnd
  } = props;
  var animationId = useAnimationId(props, "recharts-area-");
  var [isAnimating, setIsAnimating] = reactExports.useState(false);
  var showLabels = !isAnimating;
  var handleAnimationEnd = reactExports.useCallback(() => {
    if (typeof onAnimationEnd === "function") {
      onAnimationEnd();
    }
    setIsAnimating(false);
  }, [onAnimationEnd]);
  var handleAnimationStart = reactExports.useCallback(() => {
    if (typeof onAnimationStart === "function") {
      onAnimationStart();
    }
    setIsAnimating(true);
  }, [onAnimationStart]);
  var prevPoints = previousPointsRef.current;
  var prevBaseLine = previousBaselineRef.current;
  return /* @__PURE__ */ reactExports.createElement(AreaLabelListProvider, {
    showLabels,
    points
  }, props.children, /* @__PURE__ */ reactExports.createElement(JavascriptAnimate, {
    animationId,
    begin: animationBegin,
    duration: animationDuration,
    isActive: isAnimationActive,
    easing: animationEasing,
    onAnimationEnd: handleAnimationEnd,
    onAnimationStart: handleAnimationStart,
    key: animationId
  }, (t2) => {
    if (prevPoints) {
      var prevPointsDiffFactor = prevPoints.length / points.length;
      var stepPoints = (
        /*
         * Here it is important that at the very end of the animation, on the last frame,
         * we render the original points without any interpolation.
         * This is needed because the code above is checking for reference equality to decide if the animation should run
         * and if we create a new array instance (even if the numbers were the same)
         * then we would break animations.
         */
        t2 === 1 ? points : points.map((entry, index) => {
          var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
          if (prevPoints[prevPointIndex]) {
            var prev = prevPoints[prevPointIndex];
            return _objectSpread$1(_objectSpread$1({}, entry), {}, {
              x: interpolate$1(prev.x, entry.x, t2),
              y: interpolate$1(prev.y, entry.y, t2)
            });
          }
          return entry;
        })
      );
      var stepBaseLine;
      if (isNumber(baseLine)) {
        stepBaseLine = interpolate$1(prevBaseLine, baseLine, t2);
      } else if (isNullish(baseLine) || isNan(baseLine)) {
        stepBaseLine = interpolate$1(prevBaseLine, 0, t2);
      } else {
        stepBaseLine = baseLine.map((entry, index) => {
          var prevPointIndex = Math.floor(index * prevPointsDiffFactor);
          if (Array.isArray(prevBaseLine) && prevBaseLine[prevPointIndex]) {
            var prev = prevBaseLine[prevPointIndex];
            return _objectSpread$1(_objectSpread$1({}, entry), {}, {
              x: interpolate$1(prev.x, entry.x, t2),
              y: interpolate$1(prev.y, entry.y, t2)
            });
          }
          return entry;
        });
      }
      if (t2 > 0) {
        previousPointsRef.current = stepPoints;
        previousBaselineRef.current = stepBaseLine;
      }
      return /* @__PURE__ */ reactExports.createElement(StaticArea, {
        points: stepPoints,
        baseLine: stepBaseLine,
        needClip,
        clipPathId,
        props
      });
    }
    if (t2 > 0) {
      previousPointsRef.current = points;
      previousBaselineRef.current = baseLine;
    }
    return /* @__PURE__ */ reactExports.createElement(Layer, null, isAnimationActive && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement("clipPath", {
      id: "animationClipPath-".concat(clipPathId)
    }, /* @__PURE__ */ reactExports.createElement(ClipRect, {
      alpha: t2,
      points,
      baseLine,
      layout: props.layout,
      strokeWidth: props.strokeWidth
    }))), /* @__PURE__ */ reactExports.createElement(Layer, {
      clipPath: "url(#animationClipPath-".concat(clipPathId, ")")
    }, /* @__PURE__ */ reactExports.createElement(StaticArea, {
      points,
      baseLine,
      needClip,
      clipPathId,
      props
    })));
  }), /* @__PURE__ */ reactExports.createElement(LabelListFromLabelProp, {
    label: props.label
  }));
}
function RenderArea(_ref8) {
  var {
    needClip,
    clipPathId,
    props
  } = _ref8;
  var previousPointsRef = reactExports.useRef(null);
  var previousBaselineRef = reactExports.useRef();
  return /* @__PURE__ */ reactExports.createElement(AreaWithAnimation, {
    needClip,
    clipPathId,
    props,
    previousPointsRef,
    previousBaselineRef
  });
}
class AreaWithState extends reactExports.PureComponent {
  render() {
    var _filterProps;
    var {
      hide,
      dot,
      points,
      className,
      top,
      left,
      needClip,
      xAxisId,
      yAxisId,
      width,
      height,
      id,
      baseLine
    } = this.props;
    if (hide) {
      return null;
    }
    var layerClass = clsx("recharts-area", className);
    var clipPathId = id;
    var {
      r: r2 = 3,
      strokeWidth = 2
    } = (_filterProps = filterProps(dot, false)) !== null && _filterProps !== void 0 ? _filterProps : {
      r: 3,
      strokeWidth: 2
    };
    var clipDot = isClipDot(dot);
    var dotSize = r2 * 2 + strokeWidth;
    return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(Layer, {
      className: layerClass
    }, needClip && /* @__PURE__ */ reactExports.createElement("defs", null, /* @__PURE__ */ reactExports.createElement(GraphicalItemClipPath, {
      clipPathId,
      xAxisId,
      yAxisId
    }), !clipDot && /* @__PURE__ */ reactExports.createElement("clipPath", {
      id: "clipPath-dots-".concat(clipPathId)
    }, /* @__PURE__ */ reactExports.createElement("rect", {
      x: left - dotSize / 2,
      y: top - dotSize / 2,
      width: width + dotSize,
      height: height + dotSize
    }))), /* @__PURE__ */ reactExports.createElement(RenderArea, {
      needClip,
      clipPathId,
      props: this.props
    })), /* @__PURE__ */ reactExports.createElement(ActivePoints, {
      points,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot
    }), this.props.isRange && Array.isArray(baseLine) && /* @__PURE__ */ reactExports.createElement(ActivePoints, {
      points: baseLine,
      mainColor: getLegendItemColor(this.props.stroke, this.props.fill),
      itemDataKey: this.props.dataKey,
      activeDot: this.props.activeDot
    }));
  }
}
var defaultAreaProps = {
  activeDot: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease",
  connectNulls: false,
  dot: false,
  fill: "#3182bd",
  fillOpacity: 0.6,
  hide: false,
  isAnimationActive: !Global.isSsr,
  legendType: "line",
  stroke: "#3182bd",
  xAxisId: 0,
  yAxisId: 0
};
function AreaImpl(props) {
  var _useAppSelector;
  var _resolveDefaultProps = resolveDefaultProps(props, defaultAreaProps), {
    activeDot,
    animationBegin,
    animationDuration,
    animationEasing,
    connectNulls,
    dot,
    fill,
    fillOpacity,
    hide,
    isAnimationActive,
    legendType,
    stroke,
    xAxisId,
    yAxisId
  } = _resolveDefaultProps, everythingElse = _objectWithoutProperties$5(_resolveDefaultProps, _excluded2$2);
  var layout = useChartLayout();
  var chartName = useChartName();
  var {
    needClip
  } = useNeedsClip(xAxisId, yAxisId);
  var isPanorama = useIsPanorama();
  var {
    points,
    isRange,
    baseLine
  } = (_useAppSelector = useAppSelector((state) => selectArea(state, xAxisId, yAxisId, isPanorama, props.id))) !== null && _useAppSelector !== void 0 ? _useAppSelector : {};
  var plotArea = usePlotArea();
  if (layout !== "horizontal" && layout !== "vertical" || plotArea == null) {
    return null;
  }
  if (chartName !== "AreaChart" && chartName !== "ComposedChart") {
    return null;
  }
  var {
    height,
    width,
    x: left,
    y: top
  } = plotArea;
  if (!points || !points.length) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(AreaWithState, _extends$4({}, everythingElse, {
    activeDot,
    animationBegin,
    animationDuration,
    animationEasing,
    baseLine,
    connectNulls,
    dot,
    fill,
    fillOpacity,
    height,
    hide,
    layout,
    isAnimationActive,
    isRange,
    legendType,
    needClip,
    points,
    stroke,
    width,
    left,
    top,
    xAxisId,
    yAxisId
  }));
}
var getBaseValue = (layout, chartBaseValue, itemBaseValue, xAxis, yAxis) => {
  var baseValue = itemBaseValue !== null && itemBaseValue !== void 0 ? itemBaseValue : chartBaseValue;
  if (isNumber(baseValue)) {
    return baseValue;
  }
  var numericAxis = layout === "horizontal" ? yAxis : xAxis;
  var domain = numericAxis.scale.domain();
  if (numericAxis.type === "number") {
    var domainMax = Math.max(domain[0], domain[1]);
    var domainMin = Math.min(domain[0], domain[1]);
    if (baseValue === "dataMin") {
      return domainMin;
    }
    if (baseValue === "dataMax") {
      return domainMax;
    }
    return domainMax < 0 ? domainMax : Math.max(Math.min(domain[0], domain[1]), 0);
  }
  if (baseValue === "dataMin") {
    return domain[0];
  }
  if (baseValue === "dataMax") {
    return domain[1];
  }
  return domain[0];
};
function computeArea(_ref9) {
  var {
    areaSettings: {
      connectNulls,
      baseValue: itemBaseValue,
      dataKey
    },
    stackedData,
    layout,
    chartBaseValue,
    xAxis,
    yAxis,
    displayedData,
    dataStartIndex,
    xAxisTicks,
    yAxisTicks,
    bandSize
  } = _ref9;
  var hasStack = stackedData && stackedData.length;
  var baseValue = getBaseValue(layout, chartBaseValue, itemBaseValue, xAxis, yAxis);
  var isHorizontalLayout = layout === "horizontal";
  var isRange = false;
  var points = displayedData.map((entry, index) => {
    var value;
    if (hasStack) {
      value = stackedData[dataStartIndex + index];
    } else {
      value = getValueByDataKey(entry, dataKey);
      if (!Array.isArray(value)) {
        value = [baseValue, value];
      } else {
        isRange = true;
      }
    }
    var isBreakPoint = value[1] == null || hasStack && !connectNulls && getValueByDataKey(entry, dataKey) == null;
    if (isHorizontalLayout) {
      return {
        x: getCateCoordinateOfLine({
          axis: xAxis,
          ticks: xAxisTicks,
          bandSize,
          entry,
          index
        }),
        y: isBreakPoint ? null : yAxis.scale(value[1]),
        value,
        payload: entry
      };
    }
    return {
      x: isBreakPoint ? null : xAxis.scale(value[1]),
      y: getCateCoordinateOfLine({
        axis: yAxis,
        ticks: yAxisTicks,
        bandSize,
        entry,
        index
      }),
      value,
      payload: entry
    };
  });
  var baseLine;
  if (hasStack || isRange) {
    baseLine = points.map((entry) => {
      var x2 = Array.isArray(entry.value) ? entry.value[0] : null;
      if (isHorizontalLayout) {
        return {
          x: entry.x,
          y: x2 != null && entry.y != null ? yAxis.scale(x2) : null,
          payload: entry.payload
        };
      }
      return {
        x: x2 != null ? xAxis.scale(x2) : null,
        y: entry.y,
        payload: entry.payload
      };
    });
  } else {
    baseLine = isHorizontalLayout ? yAxis.scale(baseValue) : xAxis.scale(baseValue);
  }
  return {
    points,
    baseLine,
    isRange
  };
}
function Area(outsideProps) {
  var props = resolveDefaultProps(outsideProps, defaultAreaProps);
  var isPanorama = useIsPanorama();
  return /* @__PURE__ */ reactExports.createElement(RegisterGraphicalItemId, {
    id: props.id,
    type: "area"
  }, (id) => /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetLegendPayload, {
    legendPayload: computeLegendPayloadFromAreaData(props)
  }), /* @__PURE__ */ reactExports.createElement(SetTooltipEntrySettings, {
    fn: getTooltipEntrySettings,
    args: props
  }), /* @__PURE__ */ reactExports.createElement(SetCartesianGraphicalItem, {
    type: "area",
    id,
    data: props.data,
    dataKey: props.dataKey,
    xAxisId: props.xAxisId,
    yAxisId: props.yAxisId,
    zAxisId: 0,
    stackId: getNormalizedStackId(props.stackId),
    hide: props.hide,
    barSize: void 0,
    baseValue: props.baseValue,
    isPanorama,
    connectNulls: props.connectNulls
  }), /* @__PURE__ */ reactExports.createElement(AreaImpl, _extends$4({}, props, {
    id
  }))));
}
Area.displayName = "Area";
var _excluded$4 = ["children"], _excluded2$1 = ["dangerouslySetInnerHTML", "ticks"], _excluded3 = ["id"];
function _defineProperty$2(e3, r2, t2) {
  return (r2 = _toPropertyKey$2(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$2(t2) {
  var i = _toPrimitive$2(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$2(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _extends$3() {
  return _extends$3 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$3.apply(null, arguments);
}
function _objectWithoutProperties$4(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$4(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$4(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function SetXAxisSettings(props) {
  var dispatch = useAppDispatch();
  var settings = reactExports.useMemo(() => {
    var {
      children
    } = props, rest = _objectWithoutProperties$4(props, _excluded$4);
    return rest;
  }, [props]);
  reactExports.useEffect(() => {
    dispatch(addXAxis(settings));
    return () => {
      dispatch(removeXAxis(settings));
    };
  }, [settings, dispatch]);
  return props.children;
}
var XAxisImpl = (props) => {
  var {
    xAxisId,
    className
  } = props;
  var viewBox = useAppSelector(selectAxisViewBox);
  var isPanorama = useIsPanorama();
  var axisType = "xAxis";
  var scale = useAppSelector((state) => selectAxisScale(state, axisType, xAxisId, isPanorama));
  var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, xAxisId, isPanorama));
  var axisSize = useAppSelector((state) => selectXAxisSize(state, xAxisId));
  var position = useAppSelector((state) => selectXAxisPosition(state, xAxisId));
  var synchronizedSettings = useAppSelector((state) => selectXAxisSettingsNoDefaults(state, xAxisId));
  if (axisSize == null || position == null || synchronizedSettings == null) {
    return null;
  }
  var {
    dangerouslySetInnerHTML,
    ticks: ticks2
  } = props, allOtherProps = _objectWithoutProperties$4(props, _excluded2$1);
  var {
    id
  } = synchronizedSettings, restSynchronizedSettings = _objectWithoutProperties$4(synchronizedSettings, _excluded3);
  return /* @__PURE__ */ reactExports.createElement(CartesianAxis, _extends$3({}, allOtherProps, restSynchronizedSettings, {
    scale,
    x: position.x,
    y: position.y,
    width: axisSize.width,
    height: axisSize.height,
    className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
    viewBox,
    ticks: cartesianTickItems
  }));
};
var XAxisSettingsDispatcher = (props) => {
  var _props$interval, _props$includeHidden, _props$angle, _props$minTickGap, _props$tick;
  return /* @__PURE__ */ reactExports.createElement(SetXAxisSettings, {
    interval: (_props$interval = props.interval) !== null && _props$interval !== void 0 ? _props$interval : "preserveEnd",
    id: props.xAxisId,
    scale: props.scale,
    type: props.type,
    padding: props.padding,
    allowDataOverflow: props.allowDataOverflow,
    domain: props.domain,
    dataKey: props.dataKey,
    allowDuplicatedCategory: props.allowDuplicatedCategory,
    allowDecimals: props.allowDecimals,
    tickCount: props.tickCount,
    includeHidden: (_props$includeHidden = props.includeHidden) !== null && _props$includeHidden !== void 0 ? _props$includeHidden : false,
    reversed: props.reversed,
    ticks: props.ticks,
    height: props.height,
    orientation: props.orientation,
    mirror: props.mirror,
    hide: props.hide,
    unit: props.unit,
    name: props.name,
    angle: (_props$angle = props.angle) !== null && _props$angle !== void 0 ? _props$angle : 0,
    minTickGap: (_props$minTickGap = props.minTickGap) !== null && _props$minTickGap !== void 0 ? _props$minTickGap : 5,
    tick: (_props$tick = props.tick) !== null && _props$tick !== void 0 ? _props$tick : true,
    tickFormatter: props.tickFormatter
  }, /* @__PURE__ */ reactExports.createElement(XAxisImpl, props));
};
class XAxis extends reactExports.Component {
  render() {
    return /* @__PURE__ */ reactExports.createElement(XAxisSettingsDispatcher, this.props);
  }
}
_defineProperty$2(XAxis, "displayName", "XAxis");
_defineProperty$2(XAxis, "defaultProps", {
  allowDataOverflow: implicitXAxis.allowDataOverflow,
  allowDecimals: implicitXAxis.allowDecimals,
  allowDuplicatedCategory: implicitXAxis.allowDuplicatedCategory,
  height: implicitXAxis.height,
  hide: false,
  mirror: implicitXAxis.mirror,
  orientation: implicitXAxis.orientation,
  padding: implicitXAxis.padding,
  reversed: implicitXAxis.reversed,
  scale: implicitXAxis.scale,
  tickCount: implicitXAxis.tickCount,
  type: implicitXAxis.type,
  xAxisId: 0
});
var getCalculatedYAxisWidth = (_ref2) => {
  var {
    ticks: ticks2,
    label,
    labelGapWithTick = 5,
    // Default gap between label and tick
    tickSize = 0,
    tickMargin = 0
  } = _ref2;
  var maxTickWidth = 0;
  if (ticks2) {
    ticks2.forEach((tickNode) => {
      if (tickNode) {
        var bbox = tickNode.getBoundingClientRect();
        if (bbox.width > maxTickWidth) {
          maxTickWidth = bbox.width;
        }
      }
    });
    var labelWidth = label ? label.getBoundingClientRect().width : 0;
    var tickWidth = tickSize + tickMargin;
    var updatedYAxisWidth = maxTickWidth + tickWidth + labelWidth + (label ? labelGapWithTick : 0);
    return Math.round(updatedYAxisWidth);
  }
  return 0;
};
var _excluded$3 = ["dangerouslySetInnerHTML", "ticks"], _excluded2 = ["id"];
function _defineProperty$1(e3, r2, t2) {
  return (r2 = _toPropertyKey$1(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey$1(t2) {
  var i = _toPrimitive$1(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive$1(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
function _extends$2() {
  return _extends$2 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$2.apply(null, arguments);
}
function _objectWithoutProperties$3(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$3(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$3(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function SetYAxisSettings(settings) {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(addYAxis(settings));
    return () => {
      dispatch(removeYAxis(settings));
    };
  }, [settings, dispatch]);
  return null;
}
var YAxisImpl = (props) => {
  var _cartesianAxisRef$cur;
  var {
    yAxisId,
    className,
    width,
    label
  } = props;
  var cartesianAxisRef = reactExports.useRef(null);
  var labelRef = reactExports.useRef(null);
  var viewBox = useAppSelector(selectAxisViewBox);
  var isPanorama = useIsPanorama();
  var dispatch = useAppDispatch();
  var axisType = "yAxis";
  var scale = useAppSelector((state) => selectAxisScale(state, axisType, yAxisId, isPanorama));
  var axisSize = useAppSelector((state) => selectYAxisSize(state, yAxisId));
  var position = useAppSelector((state) => selectYAxisPosition(state, yAxisId));
  var cartesianTickItems = useAppSelector((state) => selectTicksOfAxis(state, axisType, yAxisId, isPanorama));
  var synchronizedSettings = useAppSelector((state) => selectYAxisSettingsNoDefaults(state, yAxisId));
  reactExports.useLayoutEffect(() => {
    var _axisComponent$tickRe;
    if (width !== "auto" || !axisSize || isLabelContentAFunction(label) || /* @__PURE__ */ reactExports.isValidElement(label) || synchronizedSettings == null) {
      return;
    }
    var axisComponent = cartesianAxisRef.current;
    var tickNodes = axisComponent === null || axisComponent === void 0 || (_axisComponent$tickRe = axisComponent.tickRefs) === null || _axisComponent$tickRe === void 0 ? void 0 : _axisComponent$tickRe.current;
    var {
      tickSize,
      tickMargin
    } = axisComponent.props;
    var updatedYAxisWidth = getCalculatedYAxisWidth({
      ticks: tickNodes,
      label: labelRef.current,
      labelGapWithTick: 5,
      tickSize,
      tickMargin
    });
    if (Math.round(axisSize.width) !== Math.round(updatedYAxisWidth)) {
      dispatch(updateYAxisWidth({
        id: yAxisId,
        width: updatedYAxisWidth
      }));
    }
  }, [
    cartesianAxisRef,
    cartesianAxisRef === null || cartesianAxisRef === void 0 || (_cartesianAxisRef$cur = cartesianAxisRef.current) === null || _cartesianAxisRef$cur === void 0 || (_cartesianAxisRef$cur = _cartesianAxisRef$cur.tickRefs) === null || _cartesianAxisRef$cur === void 0 ? void 0 : _cartesianAxisRef$cur.current,
    // required to do re-calculation when using brush
    axisSize === null || axisSize === void 0 ? void 0 : axisSize.width,
    axisSize,
    dispatch,
    label,
    yAxisId,
    width
  ]);
  if (axisSize == null || position == null || synchronizedSettings == null) {
    return null;
  }
  var {
    dangerouslySetInnerHTML,
    ticks: ticks2
  } = props, allOtherProps = _objectWithoutProperties$3(props, _excluded$3);
  var {
    id
  } = synchronizedSettings, restSynchronizedSettings = _objectWithoutProperties$3(synchronizedSettings, _excluded2);
  return /* @__PURE__ */ reactExports.createElement(CartesianAxis, _extends$2({}, allOtherProps, restSynchronizedSettings, {
    ref: cartesianAxisRef,
    labelRef,
    scale,
    x: position.x,
    y: position.y,
    tickTextProps: width === "auto" ? {
      width: void 0
    } : {
      width
    },
    width: axisSize.width,
    height: axisSize.height,
    className: clsx("recharts-".concat(axisType, " ").concat(axisType), className),
    viewBox,
    ticks: cartesianTickItems
  }));
};
var YAxisSettingsDispatcher = (props) => {
  var _props$interval, _props$includeHidden, _props$angle, _props$minTickGap, _props$tick;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement(SetYAxisSettings, {
    interval: (_props$interval = props.interval) !== null && _props$interval !== void 0 ? _props$interval : "preserveEnd",
    id: props.yAxisId,
    scale: props.scale,
    type: props.type,
    domain: props.domain,
    allowDataOverflow: props.allowDataOverflow,
    dataKey: props.dataKey,
    allowDuplicatedCategory: props.allowDuplicatedCategory,
    allowDecimals: props.allowDecimals,
    tickCount: props.tickCount,
    padding: props.padding,
    includeHidden: (_props$includeHidden = props.includeHidden) !== null && _props$includeHidden !== void 0 ? _props$includeHidden : false,
    reversed: props.reversed,
    ticks: props.ticks,
    width: props.width,
    orientation: props.orientation,
    mirror: props.mirror,
    hide: props.hide,
    unit: props.unit,
    name: props.name,
    angle: (_props$angle = props.angle) !== null && _props$angle !== void 0 ? _props$angle : 0,
    minTickGap: (_props$minTickGap = props.minTickGap) !== null && _props$minTickGap !== void 0 ? _props$minTickGap : 5,
    tick: (_props$tick = props.tick) !== null && _props$tick !== void 0 ? _props$tick : true,
    tickFormatter: props.tickFormatter
  }), /* @__PURE__ */ reactExports.createElement(YAxisImpl, props));
};
var YAxisDefaultProps = {
  allowDataOverflow: implicitYAxis.allowDataOverflow,
  allowDecimals: implicitYAxis.allowDecimals,
  allowDuplicatedCategory: implicitYAxis.allowDuplicatedCategory,
  hide: false,
  mirror: implicitYAxis.mirror,
  orientation: implicitYAxis.orientation,
  padding: implicitYAxis.padding,
  reversed: implicitYAxis.reversed,
  scale: implicitYAxis.scale,
  tickCount: implicitYAxis.tickCount,
  type: implicitYAxis.type,
  width: implicitYAxis.width,
  yAxisId: 0
};
class YAxis extends reactExports.Component {
  render() {
    return /* @__PURE__ */ reactExports.createElement(YAxisSettingsDispatcher, this.props);
  }
}
_defineProperty$1(YAxis, "displayName", "YAxis");
_defineProperty$1(YAxis, "defaultProps", YAxisDefaultProps);
var useSyncExternalStoreWithSelector_production = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var React = reactExports;
function is(x2, y2) {
  return x2 === y2 && (0 !== x2 || 1 / x2 === 1 / y2) || x2 !== x2 && y2 !== y2;
}
var objectIs = "function" === typeof Object.is ? Object.is : is, useSyncExternalStore = React.useSyncExternalStore, useRef = React.useRef, useEffect = React.useEffect, useMemo = React.useMemo, useDebugValue = React.useDebugValue;
useSyncExternalStoreWithSelector_production.useSyncExternalStoreWithSelector = function(subscribe, getSnapshot, getServerSnapshot, selector, isEqual) {
  var instRef = useRef(null);
  if (null === instRef.current) {
    var inst = { hasValue: false, value: null };
    instRef.current = inst;
  } else inst = instRef.current;
  instRef = useMemo(
    function() {
      function memoizedSelector(nextSnapshot) {
        if (!hasMemo) {
          hasMemo = true;
          memoizedSnapshot = nextSnapshot;
          nextSnapshot = selector(nextSnapshot);
          if (void 0 !== isEqual && inst.hasValue) {
            var currentSelection = inst.value;
            if (isEqual(currentSelection, nextSnapshot))
              return memoizedSelection = currentSelection;
          }
          return memoizedSelection = nextSnapshot;
        }
        currentSelection = memoizedSelection;
        if (objectIs(memoizedSnapshot, nextSnapshot)) return currentSelection;
        var nextSelection = selector(nextSnapshot);
        if (void 0 !== isEqual && isEqual(currentSelection, nextSelection))
          return memoizedSnapshot = nextSnapshot, currentSelection;
        memoizedSnapshot = nextSnapshot;
        return memoizedSelection = nextSelection;
      }
      var hasMemo = false, memoizedSnapshot, memoizedSelection, maybeGetServerSnapshot = void 0 === getServerSnapshot ? null : getServerSnapshot;
      return [
        function() {
          return memoizedSelector(getSnapshot());
        },
        null === maybeGetServerSnapshot ? void 0 : function() {
          return memoizedSelector(maybeGetServerSnapshot());
        }
      ];
    },
    [getSnapshot, getServerSnapshot, selector, isEqual]
  );
  var value = useSyncExternalStore(subscribe, instRef[0], instRef[1]);
  useEffect(
    function() {
      inst.hasValue = true;
      inst.value = value;
    },
    [value]
  );
  useDebugValue(value);
  return value;
};
function defaultNoopBatch(callback) {
  callback();
}
function createListenerCollection() {
  let first = null;
  let last2 = null;
  return {
    clear() {
      first = null;
      last2 = null;
    },
    notify() {
      defaultNoopBatch(() => {
        let listener2 = first;
        while (listener2) {
          listener2.callback();
          listener2 = listener2.next;
        }
      });
    },
    get() {
      const listeners = [];
      let listener2 = first;
      while (listener2) {
        listeners.push(listener2);
        listener2 = listener2.next;
      }
      return listeners;
    },
    subscribe(callback) {
      let isSubscribed = true;
      const listener2 = last2 = {
        callback,
        next: null,
        prev: last2
      };
      if (listener2.prev) {
        listener2.prev.next = listener2;
      } else {
        first = listener2;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null) return;
        isSubscribed = false;
        if (listener2.next) {
          listener2.next.prev = listener2.prev;
        } else {
          last2 = listener2.prev;
        }
        if (listener2.prev) {
          listener2.prev.next = listener2.next;
        } else {
          first = listener2.next;
        }
      };
    }
  };
}
var nullListeners = {
  notify() {
  },
  get: () => []
};
function createSubscription(store, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;
  let subscriptionsAmount = 0;
  let selfSubscribed = false;
  function addNestedSub(listener2) {
    trySubscribe();
    const cleanupListener = listeners.subscribe(listener2);
    let removed = false;
    return () => {
      if (!removed) {
        removed = true;
        cleanupListener();
        tryUnsubscribe();
      }
    };
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return selfSubscribed;
  }
  function trySubscribe() {
    subscriptionsAmount++;
    if (!unsubscribe) {
      unsubscribe = store.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    subscriptionsAmount--;
    if (unsubscribe && subscriptionsAmount === 0) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  function trySubscribeSelf() {
    if (!selfSubscribed) {
      selfSubscribed = true;
      trySubscribe();
    }
  }
  function tryUnsubscribeSelf() {
    if (selfSubscribed) {
      selfSubscribed = false;
      tryUnsubscribe();
    }
  }
  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe: trySubscribeSelf,
    tryUnsubscribe: tryUnsubscribeSelf,
    getListeners: () => listeners
  };
  return subscription;
}
var canUseDOM = () => !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
var isDOM = /* @__PURE__ */ canUseDOM();
var isRunningInReactNative = () => typeof navigator !== "undefined" && navigator.product === "ReactNative";
var isReactNative = /* @__PURE__ */ isRunningInReactNative();
var getUseIsomorphicLayoutEffect = () => isDOM || isReactNative ? reactExports.useLayoutEffect : reactExports.useEffect;
var useIsomorphicLayoutEffect = /* @__PURE__ */ getUseIsomorphicLayoutEffect();
var ContextKey = /* @__PURE__ */ Symbol.for(`react-redux-context`);
var gT = typeof globalThis !== "undefined" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function getContext() {
  if (!reactExports.createContext) return {};
  const contextMap = gT[ContextKey] ?? (gT[ContextKey] = /* @__PURE__ */ new Map());
  let realContext = contextMap.get(reactExports.createContext);
  if (!realContext) {
    realContext = reactExports.createContext(
      null
    );
    contextMap.set(reactExports.createContext, realContext);
  }
  return realContext;
}
var ReactReduxContext = /* @__PURE__ */ getContext();
function Provider(providerProps) {
  const { children, context, serverState, store } = providerProps;
  const contextValue = reactExports.useMemo(() => {
    const subscription = createSubscription(store);
    const baseContextValue = {
      store,
      subscription,
      getServerState: serverState ? () => serverState : void 0
    };
    {
      return baseContextValue;
    }
  }, [store, serverState]);
  const previousState = reactExports.useMemo(() => store.getState(), [store]);
  useIsomorphicLayoutEffect(() => {
    const { subscription } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = void 0;
    };
  }, [contextValue, previousState]);
  const Context = context || ReactReduxContext;
  return /* @__PURE__ */ reactExports.createElement(Context.Provider, { value: contextValue }, children);
}
var Provider_default = Provider;
var pickChartPointer = (_state, chartPointer) => chartPointer;
var selectActivePropsFromChartPointer = createSelector([pickChartPointer, selectChartLayout, selectPolarViewBox, selectTooltipAxisType, selectTooltipAxisRangeWithReverse, selectTooltipAxisTicks, selectOrderedTooltipTicks, selectChartOffsetInternal], combineActiveProps);
var getChartPointer = (event) => {
  var rect = event.currentTarget.getBoundingClientRect();
  var scaleX = rect.width / event.currentTarget.offsetWidth;
  var scaleY = rect.height / event.currentTarget.offsetHeight;
  return {
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    chartX: Math.round((event.clientX - rect.left) / scaleX),
    chartY: Math.round((event.clientY - rect.top) / scaleY)
  };
};
var mouseClickAction = createAction("mouseClick");
var mouseClickMiddleware = createListenerMiddleware();
mouseClickMiddleware.startListening({
  actionCreator: mouseClickAction,
  effect: (action, listenerApi) => {
    var mousePointer = action.payload;
    var activeProps = selectActivePropsFromChartPointer(listenerApi.getState(), getChartPointer(mousePointer));
    if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
      listenerApi.dispatch(setMouseClickAxisIndex({
        activeIndex: activeProps.activeIndex,
        activeDataKey: void 0,
        activeCoordinate: activeProps.activeCoordinate
      }));
    }
  }
});
var mouseMoveAction = createAction("mouseMove");
var mouseMoveMiddleware = createListenerMiddleware();
mouseMoveMiddleware.startListening({
  actionCreator: mouseMoveAction,
  effect: (action, listenerApi) => {
    var mousePointer = action.payload;
    var state = listenerApi.getState();
    var tooltipEventType = selectTooltipEventType$1(state, state.tooltip.settings.shared);
    var activeProps = selectActivePropsFromChartPointer(state, getChartPointer(mousePointer));
    if (tooltipEventType === "axis") {
      if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
        listenerApi.dispatch(setMouseOverAxisIndex({
          activeIndex: activeProps.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: activeProps.activeCoordinate
        }));
      } else {
        listenerApi.dispatch(mouseLeaveChart());
      }
    }
  }
});
function reduxDevtoolsJsonStringifyReplacer(_key, value) {
  if (value instanceof HTMLElement) {
    return "HTMLElement <".concat(value.tagName, ' class="').concat(value.className, '">');
  }
  if (value === window) {
    return "global.window";
  }
  return value;
}
var initialState = {
  accessibilityLayer: true,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index"
};
var rootPropsSlice = createSlice({
  name: "rootProps",
  initialState,
  reducers: {
    updateOptions: (state, action) => {
      var _action$payload$barGa;
      state.accessibilityLayer = action.payload.accessibilityLayer;
      state.barCategoryGap = action.payload.barCategoryGap;
      state.barGap = (_action$payload$barGa = action.payload.barGap) !== null && _action$payload$barGa !== void 0 ? _action$payload$barGa : initialState.barGap;
      state.barSize = action.payload.barSize;
      state.maxBarSize = action.payload.maxBarSize;
      state.stackOffset = action.payload.stackOffset;
      state.syncId = action.payload.syncId;
      state.syncMethod = action.payload.syncMethod;
      state.className = action.payload.className;
    }
  }
});
var rootPropsReducer = rootPropsSlice.reducer;
var {
  updateOptions
} = rootPropsSlice.actions;
var polarOptionsSlice = createSlice({
  name: "polarOptions",
  initialState: null,
  reducers: {
    updatePolarOptions: (_state, action) => {
      return action.payload;
    }
  }
});
var {
  updatePolarOptions
} = polarOptionsSlice.actions;
var polarOptionsReducer = polarOptionsSlice.reducer;
var keyDownAction = createAction("keyDown");
var focusAction = createAction("focus");
var keyboardEventsMiddleware = createListenerMiddleware();
keyboardEventsMiddleware.startListening({
  actionCreator: keyDownAction,
  effect: (action, listenerApi) => {
    var state = listenerApi.getState();
    var accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false;
    if (!accessibilityLayerIsActive) {
      return;
    }
    var {
      keyboardInteraction
    } = state.tooltip;
    var key = action.payload;
    if (key !== "ArrowRight" && key !== "ArrowLeft" && key !== "Enter") {
      return;
    }
    var currentIndex = Number(combineActiveTooltipIndex(keyboardInteraction, selectTooltipDisplayedData(state)));
    var tooltipTicks = selectTooltipAxisTicks(state);
    if (key === "Enter") {
      var _coordinate = selectCoordinateForDefaultIndex(state, "axis", "hover", String(keyboardInteraction.index));
      listenerApi.dispatch(setKeyboardInteraction({
        active: !keyboardInteraction.active,
        activeIndex: keyboardInteraction.index,
        activeDataKey: keyboardInteraction.dataKey,
        activeCoordinate: _coordinate
      }));
      return;
    }
    var direction = selectChartDirection(state);
    var directionMultiplier = direction === "left-to-right" ? 1 : -1;
    var movement = key === "ArrowRight" ? 1 : -1;
    var nextIndex = currentIndex + movement * directionMultiplier;
    if (tooltipTicks == null || nextIndex >= tooltipTicks.length || nextIndex < 0) {
      return;
    }
    var coordinate = selectCoordinateForDefaultIndex(state, "axis", "hover", String(nextIndex));
    listenerApi.dispatch(setKeyboardInteraction({
      active: true,
      activeIndex: nextIndex.toString(),
      activeDataKey: void 0,
      activeCoordinate: coordinate
    }));
  }
});
keyboardEventsMiddleware.startListening({
  actionCreator: focusAction,
  effect: (_action, listenerApi) => {
    var state = listenerApi.getState();
    var accessibilityLayerIsActive = state.rootProps.accessibilityLayer !== false;
    if (!accessibilityLayerIsActive) {
      return;
    }
    var {
      keyboardInteraction
    } = state.tooltip;
    if (keyboardInteraction.active) {
      return;
    }
    if (keyboardInteraction.index == null) {
      var nextIndex = "0";
      var coordinate = selectCoordinateForDefaultIndex(state, "axis", "hover", String(nextIndex));
      listenerApi.dispatch(setKeyboardInteraction({
        activeDataKey: void 0,
        active: true,
        activeIndex: nextIndex,
        activeCoordinate: coordinate
      }));
    }
  }
});
var externalEventAction = createAction("externalEvent");
var externalEventsMiddleware = createListenerMiddleware();
externalEventsMiddleware.startListening({
  actionCreator: externalEventAction,
  effect: (action, listenerApi) => {
    if (action.payload.handler == null) {
      return;
    }
    var state = listenerApi.getState();
    var nextState = {
      activeCoordinate: selectActiveTooltipCoordinate(state),
      activeDataKey: selectActiveTooltipDataKey(state),
      activeIndex: selectActiveTooltipIndex(state),
      activeLabel: selectActiveLabel$1(state),
      activeTooltipIndex: selectActiveTooltipIndex(state),
      isTooltipActive: selectIsTooltipActive$1(state)
    };
    action.payload.handler(nextState, action.payload.reactEvent);
  }
});
var selectAllTooltipPayloadConfiguration = createSelector([selectTooltipState], (tooltipState) => tooltipState.tooltipItemPayloads);
var selectTooltipCoordinate = createSelector([selectAllTooltipPayloadConfiguration, selectTooltipPayloadSearcher, (_state, tooltipIndex, _dataKey) => tooltipIndex, (_state, _tooltipIndex, dataKey) => dataKey], (allTooltipConfigurations, tooltipPayloadSearcher, tooltipIndex, dataKey) => {
  var mostRelevantTooltipConfiguration = allTooltipConfigurations.find((tooltipConfiguration) => {
    return tooltipConfiguration.settings.dataKey === dataKey;
  });
  if (mostRelevantTooltipConfiguration == null) {
    return void 0;
  }
  var {
    positions
  } = mostRelevantTooltipConfiguration;
  if (positions == null) {
    return void 0;
  }
  var maybePosition = tooltipPayloadSearcher(positions, tooltipIndex);
  return maybePosition;
});
var touchEventAction = createAction("touchMove");
var touchEventMiddleware = createListenerMiddleware();
touchEventMiddleware.startListening({
  actionCreator: touchEventAction,
  effect: (action, listenerApi) => {
    var touchEvent = action.payload;
    var state = listenerApi.getState();
    var tooltipEventType = selectTooltipEventType$1(state, state.tooltip.settings.shared);
    if (tooltipEventType === "axis") {
      var activeProps = selectActivePropsFromChartPointer(state, getChartPointer({
        clientX: touchEvent.touches[0].clientX,
        clientY: touchEvent.touches[0].clientY,
        currentTarget: touchEvent.currentTarget
      }));
      if ((activeProps === null || activeProps === void 0 ? void 0 : activeProps.activeIndex) != null) {
        listenerApi.dispatch(setMouseOverAxisIndex({
          activeIndex: activeProps.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: activeProps.activeCoordinate
        }));
      }
    } else if (tooltipEventType === "item") {
      var _target$getAttribute;
      var touch = touchEvent.touches[0];
      var target = document.elementFromPoint(touch.clientX, touch.clientY);
      if (!target || !target.getAttribute) {
        return;
      }
      var itemIndex = target.getAttribute(DATA_ITEM_INDEX_ATTRIBUTE_NAME);
      var dataKey = (_target$getAttribute = target.getAttribute(DATA_ITEM_DATAKEY_ATTRIBUTE_NAME)) !== null && _target$getAttribute !== void 0 ? _target$getAttribute : void 0;
      var coordinate = selectTooltipCoordinate(listenerApi.getState(), itemIndex, dataKey);
      listenerApi.dispatch(setActiveMouseOverItemIndex({
        activeDataKey: dataKey,
        activeIndex: itemIndex,
        activeCoordinate: coordinate
      }));
    }
  }
});
var rootReducer = combineReducers({
  brush: brushReducer,
  cartesianAxis: cartesianAxisReducer,
  chartData: chartDataReducer,
  errorBars: errorBarReducer,
  graphicalItems: graphicalItemsReducer,
  layout: chartLayoutReducer,
  legend: legendReducer,
  options: optionsReducer,
  polarAxis: polarAxisReducer,
  polarOptions: polarOptionsReducer,
  referenceElements: referenceElementsReducer,
  rootProps: rootPropsReducer,
  tooltip: tooltipReducer
});
var createRechartsStore = function createRechartsStore2(preloadedState) {
  var chartName = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return configureStore({
    reducer: rootReducer,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      serializableCheck: false
    }).concat([mouseClickMiddleware.middleware, mouseMoveMiddleware.middleware, keyboardEventsMiddleware.middleware, externalEventsMiddleware.middleware, touchEventMiddleware.middleware]),
    devTools: !!window.RECHARTS_DEV_TOOLS_ENABLED && {
      serialize: {
        replacer: reduxDevtoolsJsonStringifyReplacer
      },
      name: "recharts-".concat(chartName)
    }
  });
};
function RechartsStoreProvider(_ref2) {
  var {
    preloadedState,
    children,
    reduxStoreName
  } = _ref2;
  var isPanorama = useIsPanorama();
  var storeRef = reactExports.useRef(null);
  if (isPanorama) {
    return children;
  }
  if (storeRef.current == null) {
    storeRef.current = createRechartsStore(preloadedState, reduxStoreName);
  }
  var nonNullContext = RechartsReduxContext;
  return /* @__PURE__ */ reactExports.createElement(Provider_default, {
    context: nonNullContext,
    store: storeRef.current
  }, children);
}
function ReportMainChartProps(_ref2) {
  var {
    layout,
    width,
    height,
    margin
  } = _ref2;
  var dispatch = useAppDispatch();
  var isPanorama = useIsPanorama();
  reactExports.useEffect(() => {
    if (!isPanorama) {
      dispatch(setLayout(layout));
      dispatch(setChartSize({
        width,
        height
      }));
      dispatch(setMargin(margin));
    }
  }, [dispatch, isPanorama, layout, width, height, margin]);
  return null;
}
function ReportChartProps(props) {
  var dispatch = useAppDispatch();
  reactExports.useEffect(() => {
    dispatch(updateOptions(props));
  }, [dispatch, props]);
  return null;
}
var _excluded$2 = ["children"];
function _objectWithoutProperties$2(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$2(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$2(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
function _extends$1() {
  return _extends$1 = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends$1.apply(null, arguments);
}
var FULL_WIDTH_AND_HEIGHT = {
  width: "100%",
  height: "100%"
};
var MainChartSurface = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var width = useChartWidth();
  var height = useChartHeight();
  var hasAccessibilityLayer = useAccessibilityLayer();
  if (!isPositiveNumber(width) || !isPositiveNumber(height)) {
    return null;
  }
  var {
    children,
    otherAttributes,
    title,
    desc
  } = props;
  var tabIndex, role;
  if (typeof otherAttributes.tabIndex === "number") {
    tabIndex = otherAttributes.tabIndex;
  } else {
    tabIndex = hasAccessibilityLayer ? 0 : void 0;
  }
  if (typeof otherAttributes.role === "string") {
    role = otherAttributes.role;
  } else {
    role = hasAccessibilityLayer ? "application" : void 0;
  }
  return /* @__PURE__ */ reactExports.createElement(Surface, _extends$1({}, otherAttributes, {
    title,
    desc,
    role,
    tabIndex,
    width,
    height,
    style: FULL_WIDTH_AND_HEIGHT,
    ref
  }), children);
});
var BrushPanoramaSurface = (_ref2) => {
  var {
    children
  } = _ref2;
  var brushDimensions = useAppSelector(selectBrushDimensions);
  if (!brushDimensions) {
    return null;
  }
  var {
    width,
    height,
    y: y2,
    x: x2
  } = brushDimensions;
  return /* @__PURE__ */ reactExports.createElement(Surface, {
    width,
    height,
    x: x2,
    y: y2
  }, children);
};
var RootSurface = /* @__PURE__ */ reactExports.forwardRef((_ref2, ref) => {
  var {
    children
  } = _ref2, rest = _objectWithoutProperties$2(_ref2, _excluded$2);
  var isPanorama = useIsPanorama();
  if (isPanorama) {
    return /* @__PURE__ */ reactExports.createElement(BrushPanoramaSurface, null, children);
  }
  return /* @__PURE__ */ reactExports.createElement(MainChartSurface, _extends$1({
    ref
  }, rest), children);
});
function useReportScale() {
  var dispatch = useAppDispatch();
  var [ref, setRef] = reactExports.useState(null);
  var scale = useAppSelector(selectContainerScale);
  reactExports.useEffect(() => {
    if (ref == null) {
      return;
    }
    var rect = ref.getBoundingClientRect();
    var newScale = rect.width / ref.offsetWidth;
    if (isWellBehavedNumber(newScale) && newScale !== scale) {
      dispatch(setScale(newScale));
    }
  }, [ref, dispatch, scale]);
  return setRef;
}
function ownKeys(e3, r2) {
  var t2 = Object.keys(e3);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e3);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e3, r3).enumerable;
    })), t2.push.apply(t2, o);
  }
  return t2;
}
function _objectSpread(e3) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t2 = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t2), true).forEach(function(r3) {
      _defineProperty(e3, r3, t2[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e3, Object.getOwnPropertyDescriptors(t2)) : ownKeys(Object(t2)).forEach(function(r3) {
      Object.defineProperty(e3, r3, Object.getOwnPropertyDescriptor(t2, r3));
    });
  }
  return e3;
}
function _defineProperty(e3, r2, t2) {
  return (r2 = _toPropertyKey(r2)) in e3 ? Object.defineProperty(e3, r2, { value: t2, enumerable: true, configurable: true, writable: true }) : e3[r2] = t2, e3;
}
function _toPropertyKey(t2) {
  var i = _toPrimitive(t2, "string");
  return "symbol" == typeof i ? i : i + "";
}
function _toPrimitive(t2, r2) {
  if ("object" != typeof t2 || !t2) return t2;
  var e3 = t2[Symbol.toPrimitive];
  if (void 0 !== e3) {
    var i = e3.call(t2, r2);
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r2 ? String : Number)(t2);
}
var RechartsWrapper = /* @__PURE__ */ reactExports.forwardRef((_ref2, ref) => {
  var {
    children,
    className,
    height,
    onClick,
    onContextMenu,
    onDoubleClick,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseUp,
    onTouchEnd,
    onTouchMove,
    onTouchStart,
    style,
    width
  } = _ref2;
  var dispatch = useAppDispatch();
  var [tooltipPortal, setTooltipPortal] = reactExports.useState(null);
  var [legendPortal, setLegendPortal] = reactExports.useState(null);
  useSynchronisedEventsFromOtherCharts();
  var setScaleRef = useReportScale();
  var innerRef = reactExports.useCallback((node) => {
    setScaleRef(node);
    if (typeof ref === "function") {
      ref(node);
    }
    setTooltipPortal(node);
    setLegendPortal(node);
  }, [setScaleRef, ref, setTooltipPortal, setLegendPortal]);
  var myOnClick = reactExports.useCallback((e3) => {
    dispatch(mouseClickAction(e3));
    dispatch(externalEventAction({
      handler: onClick,
      reactEvent: e3
    }));
  }, [dispatch, onClick]);
  var myOnMouseEnter = reactExports.useCallback((e3) => {
    dispatch(mouseMoveAction(e3));
    dispatch(externalEventAction({
      handler: onMouseEnter,
      reactEvent: e3
    }));
  }, [dispatch, onMouseEnter]);
  var myOnMouseLeave = reactExports.useCallback((e3) => {
    dispatch(mouseLeaveChart());
    dispatch(externalEventAction({
      handler: onMouseLeave,
      reactEvent: e3
    }));
  }, [dispatch, onMouseLeave]);
  var myOnMouseMove = reactExports.useCallback((e3) => {
    dispatch(mouseMoveAction(e3));
    dispatch(externalEventAction({
      handler: onMouseMove,
      reactEvent: e3
    }));
  }, [dispatch, onMouseMove]);
  var onFocus = reactExports.useCallback(() => {
    dispatch(focusAction());
  }, [dispatch]);
  var onKeyDown = reactExports.useCallback((e3) => {
    dispatch(keyDownAction(e3.key));
  }, [dispatch]);
  var myOnContextMenu = reactExports.useCallback((e3) => {
    dispatch(externalEventAction({
      handler: onContextMenu,
      reactEvent: e3
    }));
  }, [dispatch, onContextMenu]);
  var myOnDoubleClick = reactExports.useCallback((e3) => {
    dispatch(externalEventAction({
      handler: onDoubleClick,
      reactEvent: e3
    }));
  }, [dispatch, onDoubleClick]);
  var myOnMouseDown = reactExports.useCallback((e3) => {
    dispatch(externalEventAction({
      handler: onMouseDown,
      reactEvent: e3
    }));
  }, [dispatch, onMouseDown]);
  var myOnMouseUp = reactExports.useCallback((e3) => {
    dispatch(externalEventAction({
      handler: onMouseUp,
      reactEvent: e3
    }));
  }, [dispatch, onMouseUp]);
  var myOnTouchStart = reactExports.useCallback((e3) => {
    dispatch(externalEventAction({
      handler: onTouchStart,
      reactEvent: e3
    }));
  }, [dispatch, onTouchStart]);
  var myOnTouchMove = reactExports.useCallback((e3) => {
    dispatch(touchEventAction(e3));
    dispatch(externalEventAction({
      handler: onTouchMove,
      reactEvent: e3
    }));
  }, [dispatch, onTouchMove]);
  var myOnTouchEnd = reactExports.useCallback((e3) => {
    dispatch(externalEventAction({
      handler: onTouchEnd,
      reactEvent: e3
    }));
  }, [dispatch, onTouchEnd]);
  return /* @__PURE__ */ reactExports.createElement(TooltipPortalContext.Provider, {
    value: tooltipPortal
  }, /* @__PURE__ */ reactExports.createElement(LegendPortalContext.Provider, {
    value: legendPortal
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: clsx("recharts-wrapper", className),
    style: _objectSpread({
      position: "relative",
      cursor: "default",
      width,
      height
    }, style),
    onClick: myOnClick,
    onContextMenu: myOnContextMenu,
    onDoubleClick: myOnDoubleClick,
    onFocus,
    onKeyDown,
    onMouseDown: myOnMouseDown,
    onMouseEnter: myOnMouseEnter,
    onMouseLeave: myOnMouseLeave,
    onMouseMove: myOnMouseMove,
    onMouseUp: myOnMouseUp,
    onTouchEnd: myOnTouchEnd,
    onTouchMove: myOnTouchMove,
    onTouchStart: myOnTouchStart,
    ref: innerRef
  }, children)));
});
var _excluded$1 = ["children", "className", "width", "height", "style", "compact", "title", "desc"];
function _objectWithoutProperties$1(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose$1(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose$1(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var CategoricalChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  var {
    children,
    className,
    width,
    height,
    style,
    compact,
    title,
    desc
  } = props, others = _objectWithoutProperties$1(props, _excluded$1);
  var attrs = svgPropertiesNoEvents(others);
  if (compact) {
    return /* @__PURE__ */ reactExports.createElement(RootSurface, {
      otherAttributes: attrs,
      title,
      desc
    }, children);
  }
  return /* @__PURE__ */ reactExports.createElement(RechartsWrapper, {
    className,
    style,
    width,
    height,
    onClick: props.onClick,
    onMouseLeave: props.onMouseLeave,
    onMouseEnter: props.onMouseEnter,
    onMouseMove: props.onMouseMove,
    onMouseDown: props.onMouseDown,
    onMouseUp: props.onMouseUp,
    onContextMenu: props.onContextMenu,
    onDoubleClick: props.onDoubleClick,
    onTouchStart: props.onTouchStart,
    onTouchMove: props.onTouchMove,
    onTouchEnd: props.onTouchEnd
  }, /* @__PURE__ */ reactExports.createElement(RootSurface, {
    otherAttributes: attrs,
    title,
    desc,
    ref
  }, /* @__PURE__ */ reactExports.createElement(ClipPathProvider, null, children)));
});
var _excluded = ["width", "height"];
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function(n2) {
    for (var e3 = 1; e3 < arguments.length; e3++) {
      var t2 = arguments[e3];
      for (var r2 in t2) ({}).hasOwnProperty.call(t2, r2) && (n2[r2] = t2[r2]);
    }
    return n2;
  }, _extends.apply(null, arguments);
}
function _objectWithoutProperties(e3, t2) {
  if (null == e3) return {};
  var o, r2, i = _objectWithoutPropertiesLoose(e3, t2);
  if (Object.getOwnPropertySymbols) {
    var n2 = Object.getOwnPropertySymbols(e3);
    for (r2 = 0; r2 < n2.length; r2++) o = n2[r2], -1 === t2.indexOf(o) && {}.propertyIsEnumerable.call(e3, o) && (i[o] = e3[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r2, e3) {
  if (null == r2) return {};
  var t2 = {};
  for (var n2 in r2) if ({}.hasOwnProperty.call(r2, n2)) {
    if (-1 !== e3.indexOf(n2)) continue;
    t2[n2] = r2[n2];
  }
  return t2;
}
var defaultMargin = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
};
var defaultProps = {
  accessibilityLayer: true,
  layout: "horizontal",
  stackOffset: "none",
  barCategoryGap: "10%",
  barGap: 4,
  margin: defaultMargin,
  reverseStackOrder: false,
  syncMethod: "index"
};
var CartesianChart = /* @__PURE__ */ reactExports.forwardRef(function CartesianChart2(props, ref) {
  var _categoricalChartProp;
  var rootChartProps = resolveDefaultProps(props.categoricalChartProps, defaultProps);
  var {
    width,
    height
  } = rootChartProps, otherCategoricalProps = _objectWithoutProperties(rootChartProps, _excluded);
  if (!isPositiveNumber(width) || !isPositiveNumber(height)) {
    return null;
  }
  var {
    chartName,
    defaultTooltipEventType,
    validateTooltipEventTypes,
    tooltipPayloadSearcher,
    categoricalChartProps
  } = props;
  var options = {
    chartName,
    defaultTooltipEventType,
    validateTooltipEventTypes,
    tooltipPayloadSearcher,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ reactExports.createElement(RechartsStoreProvider, {
    preloadedState: {
      options
    },
    reduxStoreName: (_categoricalChartProp = categoricalChartProps.id) !== null && _categoricalChartProp !== void 0 ? _categoricalChartProp : chartName
  }, /* @__PURE__ */ reactExports.createElement(ChartDataContextProvider, {
    chartData: categoricalChartProps.data
  }), /* @__PURE__ */ reactExports.createElement(ReportMainChartProps, {
    width,
    height,
    layout: rootChartProps.layout,
    margin: rootChartProps.margin
  }), /* @__PURE__ */ reactExports.createElement(ReportChartProps, {
    accessibilityLayer: rootChartProps.accessibilityLayer,
    barCategoryGap: rootChartProps.barCategoryGap,
    maxBarSize: rootChartProps.maxBarSize,
    stackOffset: rootChartProps.stackOffset,
    barGap: rootChartProps.barGap,
    barSize: rootChartProps.barSize,
    syncId: rootChartProps.syncId,
    syncMethod: rootChartProps.syncMethod,
    className: rootChartProps.className
  }), /* @__PURE__ */ reactExports.createElement(CategoricalChart, _extends({}, otherCategoricalProps, {
    width,
    height,
    ref
  })));
});
var allowedTooltipTypes = ["axis"];
var ComposedChart = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  return /* @__PURE__ */ reactExports.createElement(CartesianChart, {
    chartName: "ComposedChart",
    defaultTooltipEventType: "axis",
    validateTooltipEventTypes: allowedTooltipTypes,
    tooltipPayloadSearcher: arrayTooltipSearcher,
    categoricalChartProps: props,
    ref
  });
});
const BinanceCandlestick = (props) => {
  const { payload, x: x2, y: y2, width, height } = props;
  if (!payload || !payload.open || !payload.high || !payload.low || !payload.close) {
    return null;
  }
  const { open, high, low, close, volume } = payload;
  const isBullish = close >= open;
  const color2 = isBullish ? "#0ecb81" : "#f6465d";
  const centerX = x2 + width / 2;
  const bodyTop = Math.min(open, close);
  const bodyBottom = Math.max(open, close);
  const bodyHeight = Math.abs(close - open);
  const priceRange = high - low;
  const pixelPerPrice = height / priceRange;
  const highY = y2;
  const lowY = y2 + height;
  const bodyTopY = y2 + (high - bodyTop) * pixelPerPrice;
  const bodyBottomY = y2 + (high - bodyBottom) * pixelPerPrice;
  const wickWidth = Math.max(1, width * 0.08);
  const bodyWidth = Math.max(width * 0.7, 3);
  const bodyX = x2 + (width - bodyWidth) / 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "line",
      {
        x1: centerX,
        y1: highY,
        x2: centerX,
        y2: bodyTopY,
        stroke: color2,
        strokeWidth: wickWidth,
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "line",
      {
        x1: centerX,
        y1: bodyBottomY,
        x2: centerX,
        y2: lowY,
        stroke: color2,
        strokeWidth: wickWidth,
        strokeLinecap: "round"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "rect",
      {
        x: bodyX,
        y: bodyTopY,
        width: bodyWidth,
        height: Math.max(bodyHeight * pixelPerPrice, 1),
        fill: isBullish ? color2 : "#1e2329",
        stroke: color2,
        strokeWidth: isBullish ? 0 : 1.5,
        rx: 1,
        ry: 1
      }
    ),
    bodyHeight === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "line",
      {
        x1: bodyX,
        y1: bodyTopY,
        x2: bodyX + bodyWidth,
        y2: bodyTopY,
        stroke: color2,
        strokeWidth: 2,
        strokeLinecap: "round"
      }
    )
  ] });
};
const VolumeBar = (props) => {
  const { payload, x: x2, y: y2, width, height } = props;
  if (!payload || !payload.volume || !payload.open || !payload.close) {
    return null;
  }
  const isBullish = payload.close >= payload.open;
  const color2 = isBullish ? "#0ecb81" : "#f6465d";
  const opacity = 0.6;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "rect",
    {
      x: x2 + width * 0.1,
      y: y2,
      width: width * 0.8,
      height,
      fill: color2,
      opacity,
      rx: 1,
      ry: 1
    }
  );
};
const BinanceStyleChart = ({ data, chartType, selectedPair, showVolume = true }) => {
  const [processedData, setProcessedData] = reactExports.useState([]);
  const [priceScale, setPriceScale] = reactExports.useState({ min: 0, max: 0 });
  const [volumeScale, setVolumeScale] = reactExports.useState({ min: 0, max: 0 });
  const chartRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!data || data.length === 0) return;
    const processed = data.map((item, index) => ({
      ...item,
      index,
      formattedTime: new Date(item.time).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit"
      })
    }));
    const prices = data.flatMap((d2) => [d2.open, d2.high, d2.low, d2.close]);
    const volumes = data.map((d2) => d2.volume || 0);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;
    setPriceScale({
      min: minPrice - priceRange * 0.02,
      max: maxPrice + priceRange * 0.02
    });
    setVolumeScale({
      min: 0,
      max: Math.max(...volumes) * 1.1
    });
    setProcessedData(processed);
  }, [data]);
  const formatPrice = (value) => {
    if (value >= 1e3) {
      return `$${(value / 1e3).toFixed(1)}K`;
    }
    return `$${value.toFixed(4)}`;
  };
  const formatVolume = (value) => {
    if (value >= 1e6) {
      return `${(value / 1e6).toFixed(1)}M`;
    }
    if (value >= 1e3) {
      return `${(value / 1e3).toFixed(1)}K`;
    }
    return value.toFixed(0);
  };
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const data2 = payload[0].payload;
    if (!data2) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "binance-tooltip", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "tooltip-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-time", children: new Date(data2.time).toLocaleString() }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-label", children: "Open:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-value", children: formatPrice(data2.open) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-label", children: "High:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-value high", children: formatPrice(data2.high) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-label", children: "Low:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-value low", children: formatPrice(data2.low) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-label", children: "Close:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `tooltip-value ${data2.close >= data2.open ? "bullish" : "bearish"}`, children: formatPrice(data2.close) })
        ] }),
        data2.volume && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tooltip-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-label", children: "Volume:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "tooltip-value", children: formatVolume(data2.volume) })
        ] })
      ] })
    ] });
  };
  const renderChart = () => {
    if (chartType === "line") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ComposedChart, { data: processedData, margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "lineGradient", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "5%", stopColor: "#0ecb81", stopOpacity: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "95%", stopColor: "#0ecb81", stopOpacity: 0 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          CartesianGrid,
          {
            strokeDasharray: "1 1",
            stroke: "#2b3139",
            horizontal: true,
            vertical: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "formattedTime",
            axisLine: false,
            tickLine: false,
            tick: { fontSize: 11, fill: "#848e9c" },
            interval: "preserveStartEnd"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            domain: [priceScale.min, priceScale.max],
            orientation: "right",
            axisLine: false,
            tickLine: false,
            tick: { fontSize: 11, fill: "#848e9c" },
            tickFormatter: formatPrice,
            width: 80
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Area,
          {
            type: "monotone",
            dataKey: "close",
            stroke: "#0ecb81",
            strokeWidth: 2,
            fill: "url(#lineGradient)",
            dot: false
          }
        )
      ] }) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ComposedChart, { data: processedData, margin: { top: 10, right: 30, left: 0, bottom: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        CartesianGrid,
        {
          strokeDasharray: "1 1",
          stroke: "#2b3139",
          horizontal: true,
          vertical: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        XAxis,
        {
          dataKey: "formattedTime",
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 11, fill: "#848e9c" },
          interval: "preserveStartEnd"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        YAxis,
        {
          domain: [priceScale.min, priceScale.max],
          orientation: "right",
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 11, fill: "#848e9c" },
          tickFormatter: formatPrice,
          width: 80
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(CustomTooltip, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Bar,
        {
          dataKey: "high",
          shape: /* @__PURE__ */ jsxRuntimeExports.jsx(BinanceCandlestick, {}),
          fill: "transparent"
        }
      )
    ] }) });
  };
  const renderVolumeChart = () => {
    if (!showVolume) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "volume-chart", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ComposedChart, { data: processedData, margin: { top: 0, right: 30, left: 0, bottom: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        XAxis,
        {
          dataKey: "formattedTime",
          axisLine: false,
          tickLine: false,
          tick: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        YAxis,
        {
          domain: [0, volumeScale.max],
          orientation: "right",
          axisLine: false,
          tickLine: false,
          tick: { fontSize: 10, fill: "#848e9c" },
          tickFormatter: formatVolume,
          width: 80
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Bar,
        {
          dataKey: "volume",
          shape: /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeBar, {}),
          fill: "transparent"
        }
      )
    ] }) }) });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "binance-style-chart", ref: chartRef, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "price-chart", children: renderChart() }),
    showVolume && renderVolumeChart()
  ] });
};
const generateRealisticCandlestickData = (symbol = "ATOM", days = 7, interval = "1m") => {
  const data = [];
  const now = Date.now();
  const intervalMs = getIntervalMs(interval);
  const totalCandles = Math.floor(days * 24 * 60 * 60 * 1e3 / intervalMs);
  const basePrices = {
    "ATOM": 4.5989,
    "SCRT": 0.1945,
    "OSMO": 0.1689,
    "BTC": 111422,
    "ETH": 4307.57
  };
  let currentPrice = basePrices[symbol] || 4.5989;
  let trend = 0;
  let trendStrength = 0;
  let volatility = 2e-3;
  for (let i = 0; i < totalCandles; i++) {
    const time2 = now - (totalCandles - i) * intervalMs;
    if (Math.random() < 0.05) {
      trend = Math.random() < 0.33 ? -1 : Math.random() < 0.5 ? 0 : 1;
      trendStrength = Math.random() * 0.5 + 0.1;
    }
    const hour = new Date(time2).getHours();
    const isActiveHours = hour >= 8 && hour <= 16 || hour >= 20 && hour <= 23;
    const timeVolatility = isActiveHours ? volatility * 1.5 : volatility * 0.7;
    const open = currentPrice;
    const trendBias = trend * trendStrength * 1e-3;
    const randomChange = (Math.random() - 0.5) * timeVolatility * 2;
    const priceChange = trendBias + randomChange;
    const close = open * (1 + priceChange);
    const wickRange = Math.abs(close - open) * (0.5 + Math.random() * 1.5);
    const maxPrice = Math.max(open, close);
    const minPrice = Math.min(open, close);
    const high = maxPrice + Math.random() * wickRange * 0.7;
    const low = minPrice - Math.random() * wickRange * 0.7;
    const finalLow = Math.max(low, currentPrice * 0.95);
    const baseVolume = getBaseVolume(symbol);
    const volumeMultiplier = isActiveHours ? 1.2 + Math.random() * 0.8 : 0.3 + Math.random() * 0.4;
    const volatilityBoost = Math.abs(priceChange) > volatility ? 1.5 : 1;
    const volume = Math.floor(baseVolume * volumeMultiplier * volatilityBoost * (0.5 + Math.random()));
    data.push({
      time: time2,
      open: parseFloat(open.toFixed(getDecimalPlaces(symbol))),
      high: parseFloat(high.toFixed(getDecimalPlaces(symbol))),
      low: parseFloat(finalLow.toFixed(getDecimalPlaces(symbol))),
      close: parseFloat(close.toFixed(getDecimalPlaces(symbol))),
      volume
    });
    currentPrice = close;
    const basePrice = basePrices[symbol] || 4.5989;
    if (currentPrice > basePrice * 1.5 || currentPrice < basePrice * 0.5) {
      currentPrice = basePrice * (0.9 + Math.random() * 0.2);
    }
  }
  return data;
};
const getIntervalMs = (interval) => {
  const intervals = {
    "1m": 60 * 1e3,
    "5m": 5 * 60 * 1e3,
    "15m": 15 * 60 * 1e3,
    "1h": 60 * 60 * 1e3,
    "4h": 4 * 60 * 60 * 1e3,
    "1d": 24 * 60 * 60 * 1e3
  };
  return intervals[interval] || intervals["1m"];
};
const getBaseVolume = (symbol) => {
  const volumes = {
    "ATOM": 5e5,
    "SCRT": 2e5,
    "OSMO": 3e5,
    "BTC": 5e4,
    "ETH": 1e5
  };
  return volumes[symbol] || 5e5;
};
const getDecimalPlaces = (symbol) => {
  const decimals = {
    "ATOM": 4,
    "SCRT": 4,
    "OSMO": 4,
    "BTC": 2,
    "ETH": 2
  };
  return decimals[symbol] || 4;
};
const generateOrderBookData = (currentPrice, spread = 1e-3) => {
  const bids = [];
  const asks = [];
  for (let i = 0; i < 15; i++) {
    const bidPrice = currentPrice * (1 - spread * (i + 1));
    const askPrice = currentPrice * (1 + spread * (i + 1));
    const baseAmount = 100 + Math.random() * 900;
    const depthFactor = Math.exp(-i * 0.1);
    const bidAmount = baseAmount * depthFactor * (0.8 + Math.random() * 0.4);
    const askAmount = baseAmount * depthFactor * (0.8 + Math.random() * 0.4);
    bids.push({
      price: parseFloat(bidPrice.toFixed(4)),
      amount: parseFloat(bidAmount.toFixed(2)),
      total: 0
      // Will be calculated later
    });
    asks.push({
      price: parseFloat(askPrice.toFixed(4)),
      amount: parseFloat(askAmount.toFixed(2)),
      total: 0
      // Will be calculated later
    });
  }
  let bidTotal = 0;
  bids.forEach((bid) => {
    bidTotal += bid.amount;
    bid.total = bidTotal;
  });
  let askTotal = 0;
  asks.forEach((ask) => {
    askTotal += ask.amount;
    ask.total = askTotal;
  });
  return { bids, asks };
};
const generateRecentTrades = (currentPrice, count = 20) => {
  const trades = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const time2 = now - (count - i) * (Math.random() * 3e4 + 5e3);
    const priceVariation = (Math.random() - 0.5) * 2e-3;
    const price = currentPrice * (1 + priceVariation);
    const amount = Math.random() * 100 + 10;
    const side = Math.random() > 0.5 ? "buy" : "sell";
    trades.push({
      id: `trade_${i}`,
      price: parseFloat(price.toFixed(4)),
      amount: parseFloat(amount.toFixed(2)),
      time: new Date(time2).toLocaleTimeString(),
      side,
      timestamp: time2
    });
  }
  return trades.sort((a2, b2) => b2.timestamp - a2.timestamp);
};
const StreamlinedTradingApp = () => {
  const [selectedPair, setSelectedPair] = reactExports.useState("ATOM/USDC");
  const [chartType, setChartType] = reactExports.useState("candlestick");
  const [candlestickData, setCandlestickData] = reactExports.useState([]);
  const [orderBook, setOrderBook] = reactExports.useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const tradingPairs = [
    { symbol: "ATOM/USDC", name: "Cosmos", icon: "⚛️", price: 4.5989, change: 1.34 },
    { symbol: "SCRT/USDC", name: "Secret Network", icon: "🔐", price: 0.1945, change: -0.25 },
    { symbol: "OSMO/USDC", name: "Osmosis", icon: "🌊", price: 0.1689, change: 2.04 },
    { symbol: "BTC/USDC", name: "Bitcoin", icon: "₿", price: 111422, change: -0.71 },
    { symbol: "ETH/USDC", name: "Ethereum", icon: "Ξ", price: 4307.57, change: -0.15 }
  ];
  reactExports.useEffect(() => {
    const initializeData = async () => {
      var _a;
      try {
        const symbol = selectedPair.split("/")[0];
        const initialCandleData = generateRealisticCandlestickData(symbol, 1, "1m");
        setCandlestickData(initialCandleData);
        const currentPrice = ((_a = initialCandleData[initialCandleData.length - 1]) == null ? void 0 : _a.close) || 4.5989;
        const orderBookData = generateOrderBookData(currentPrice);
        setOrderBook(orderBookData);
        const tradesData = generateRecentTrades(currentPrice);
        setRecentTrades(tradesData);
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to initialize data:", error);
        setIsLoading(false);
      }
    };
    initializeData();
  }, [selectedPair]);
  const currentPair = tradingPairs.find((p2) => p2.symbol === selectedPair);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "loading-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo_snipswap.png", alt: "SnipSwap", className: "loading-logo" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Loading SnipSwap DEX..." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "loading-spinner" })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "streamlined-trading-app", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "app-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "header-left", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "logo-container", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/logo_snipswap.png", alt: "SnipSwap", className: "app-logo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brand-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "SnipSwap" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Privacy-First DEX" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "header-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "main-nav", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "nav-btn active", children: "Trade" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "nav-btn", children: "Pools" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "nav-btn", children: "Portfolio" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "header-right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "network-info", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "network-icon", children: "🔐" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secret Network" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "connect-wallet-btn", children: "Connect Wallet" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "main-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pairs-sidebar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "Markets" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pairs-list", children: tradingPairs.map((pair) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `pair-item ${selectedPair === pair.symbol ? "selected" : ""}`,
            onClick: () => setSelectedPair(pair.symbol),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pair-info", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pair-icon", children: pair.icon }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pair-details", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pair-symbol", children: pair.symbol }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pair-name", children: pair.name })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pair-data", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "price", children: [
                  "$",
                  pair.price.toFixed(4)
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `change ${pair.change >= 0 ? "positive" : "negative"}`, children: [
                  pair.change >= 0 ? "+" : "",
                  pair.change.toFixed(2),
                  "%"
                ] })
              ] })
            ]
          },
          pair.symbol
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-header", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pair-info", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "current-pair", children: selectedPair }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "current-price", children: [
              "$",
              currentPair == null ? void 0 : currentPair.price.toFixed(4)
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `current-change ${(currentPair == null ? void 0 : currentPair.change) >= 0 ? "positive" : "negative"}`, children: [
              (currentPair == null ? void 0 : currentPair.change) >= 0 ? "+" : "",
              currentPair == null ? void 0 : currentPair.change.toFixed(2),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "chart-controls", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: `chart-btn ${chartType === "line" ? "active" : ""}`,
                onClick: () => setChartType("line"),
                children: "Line"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: `chart-btn ${chartType === "candlestick" ? "active" : ""}`,
                onClick: () => setChartType("candlestick"),
                children: "Candles"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "chart-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          BinanceStyleChart,
          {
            data: candlestickData,
            chartType,
            selectedPair,
            showVolume: true
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "market-sidebar", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order-book", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Order Book" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "book-headers", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Total" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "asks", children: orderBook.asks.slice(0, 8).reverse().map((ask, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "book-row ask", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: ask.price.toFixed(4) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "amount", children: ask.amount.toFixed(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "total", children: ask.total.toFixed(2) })
          ] }, index)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "spread", children: [
            "Spread: ",
            orderBook.asks.length && orderBook.bids.length ? (orderBook.asks[0].price - orderBook.bids[0].price).toFixed(4) : "0.0000"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bids", children: orderBook.bids.slice(0, 8).map((bid, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "book-row bid", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: bid.price.toFixed(4) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "amount", children: bid.amount.toFixed(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "total", children: bid.total.toFixed(2) })
          ] }, index)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "recent-trades", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Recent Trades" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "trades-headers", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Price" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Amount" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Time" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "trades-list", children: recentTrades.slice(0, 10).map((trade) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `trade-row ${trade.side}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "price", children: trade.price.toFixed(4) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "amount", children: trade.amount.toFixed(2) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "time", children: trade.time })
          ] }, trade.id)) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "app-footer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-content", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "footer-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🔐 Privacy-First Trading" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "⚡ Lightning Fast" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "🛡️ MEV Protected" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "footer-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Powered by Secret Network" }) })
    ] }) })
  ] });
};
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React$4.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StreamlinedTradingApp, {}) })
);
//# sourceMappingURL=index-CAM6L66X.js.map
