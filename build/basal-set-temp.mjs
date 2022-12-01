var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// ../node_modules/lodash/_baseClamp.js
var require_baseClamp = __commonJS({
  "../node_modules/lodash/_baseClamp.js"(exports, module) {
    function baseClamp(number, lower, upper) {
      if (number === number) {
        if (upper !== void 0) {
          number = number <= upper ? number : upper;
        }
        if (lower !== void 0) {
          number = number >= lower ? number : lower;
        }
      }
      return number;
    }
    module.exports = baseClamp;
  }
});

// ../node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// ../node_modules/lodash/_root.js
var require_root = __commonJS({
  "../node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || globalThis;
    module.exports = root;
  }
});

// ../node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// ../node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "../node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// ../node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "../node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// ../node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
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
    module.exports = getRawTag;
  }
});

// ../node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// ../node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// ../node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// ../node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// ../node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "../node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// ../node_modules/lodash/_trimmedEndIndex.js
var require_trimmedEndIndex = __commonJS({
  "../node_modules/lodash/_trimmedEndIndex.js"(exports, module) {
    var reWhitespace = /\s/;
    function trimmedEndIndex(string) {
      var index = string.length;
      while (index-- && reWhitespace.test(string.charAt(index))) {
      }
      return index;
    }
    module.exports = trimmedEndIndex;
  }
});

// ../node_modules/lodash/_baseTrim.js
var require_baseTrim = __commonJS({
  "../node_modules/lodash/_baseTrim.js"(exports, module) {
    var trimmedEndIndex = require_trimmedEndIndex();
    var reTrimStart = /^\s+/;
    function baseTrim(string) {
      return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
    }
    module.exports = baseTrim;
  }
});

// ../node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "../node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// ../node_modules/lodash/toNumber.js
var require_toNumber = __commonJS({
  "../node_modules/lodash/toNumber.js"(exports, module) {
    var baseTrim = require_baseTrim();
    var isObject = require_isObject();
    var isSymbol = require_isSymbol();
    var NAN = 0 / 0;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = baseTrim(value);
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = toNumber;
  }
});

// ../node_modules/lodash/toFinite.js
var require_toFinite = __commonJS({
  "../node_modules/lodash/toFinite.js"(exports, module) {
    var toNumber = require_toNumber();
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    module.exports = toFinite;
  }
});

// ../node_modules/lodash/toInteger.js
var require_toInteger = __commonJS({
  "../node_modules/lodash/toInteger.js"(exports, module) {
    var toFinite = require_toFinite();
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    module.exports = toInteger;
  }
});

// ../node_modules/lodash/toString.js
var require_toString = __commonJS({
  "../node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// ../node_modules/lodash/endsWith.js
var require_endsWith = __commonJS({
  "../node_modules/lodash/endsWith.js"(exports, module) {
    var baseClamp = require_baseClamp();
    var baseToString = require_baseToString();
    var toInteger = require_toInteger();
    var toString = require_toString();
    function endsWith(string, target, position) {
      string = toString(string);
      target = baseToString(target);
      var length = string.length;
      position = position === void 0 ? length : baseClamp(toInteger(position), 0, length);
      var end = position;
      position -= target.length;
      return position >= 0 && string.slice(position, end) == target;
    }
    module.exports = endsWith;
  }
});

// lib/round-basal.js
var require_round_basal = __commonJS({
  "lib/round-basal.js"(exports, module) {
    var endsWith = require_endsWith();
    var round_basal = function round_basal2(basal, profile) {
      var lowest_rate_scale = 20;
      if (typeof profile !== "undefined") {
        if (typeof profile.model === "string") {
          if (endsWith(profile.model, "54") || endsWith(profile.model, "23")) {
            lowest_rate_scale = 40;
          }
        }
      }
      var rounded_basal = basal;
      if (basal < 1) {
        rounded_basal = Math.round(basal * lowest_rate_scale) / lowest_rate_scale;
      } else if (basal < 10) {
        rounded_basal = Math.round(basal * 20) / 20;
      } else {
        rounded_basal = Math.round(basal * 10) / 10;
      }
      return rounded_basal;
    };
    exports = module.exports = round_basal;
  }
});

// lib/basal-set-temp.js
var require_basal_set_temp = __commonJS({
  "lib/basal-set-temp.js"(exports, module) {
    function reason(rT, msg) {
      rT.reason = (rT.reason ? rT.reason + ". " : "") + msg;
      console.error(msg);
    }
    var tempBasalFunctions = {};
    tempBasalFunctions.getMaxSafeBasal = function getMaxSafeBasal(profile) {
      var max_daily_safety_multiplier = isNaN(profile.max_daily_safety_multiplier) || profile.max_daily_safety_multiplier === null ? 3 : profile.max_daily_safety_multiplier;
      var current_basal_safety_multiplier = isNaN(profile.current_basal_safety_multiplier) || profile.current_basal_safety_multiplier === null ? 4 : profile.current_basal_safety_multiplier;
      return Math.min(profile.max_basal, max_daily_safety_multiplier * profile.max_daily_basal, current_basal_safety_multiplier * profile.current_basal);
    };
    tempBasalFunctions.setTempBasal = function setTempBasal(rate, duration, profile, rT, currenttemp) {
      var maxSafeBasal = tempBasalFunctions.getMaxSafeBasal(profile);
      var round_basal = require_round_basal();
      if (rate < 0) {
        rate = 0;
      } else if (rate > maxSafeBasal) {
        rate = maxSafeBasal;
      }
      var suggestedRate = round_basal(rate, profile);
      if (typeof currenttemp !== "undefined" && typeof currenttemp.duration !== "undefined" && typeof currenttemp.rate !== "undefined" && currenttemp.duration > duration - 10 && currenttemp.duration <= 120 && suggestedRate <= currenttemp.rate * 1.2 && suggestedRate >= currenttemp.rate * 0.8 && duration > 0) {
        rT.reason += " " + currenttemp.duration + "m left and " + currenttemp.rate + " ~ req " + suggestedRate + "U/hr: no temp required";
        return rT;
      }
      if (suggestedRate === profile.current_basal) {
        if (profile.skip_neutral_temps === true) {
          if (typeof currenttemp !== "undefined" && typeof currenttemp.duration !== "undefined" && currenttemp.duration > 0) {
            reason(rT, "Suggested rate is same as profile rate, a temp basal is active, canceling current temp");
            rT.duration = 0;
            rT.rate = 0;
            return rT;
          } else {
            reason(rT, "Suggested rate is same as profile rate, no temp basal is active, doing nothing");
            return rT;
          }
        } else {
          reason(rT, "Setting neutral temp basal of " + profile.current_basal + "U/hr");
          rT.duration = duration;
          rT.rate = suggestedRate;
          return rT;
        }
      } else {
        rT.duration = duration;
        rT.rate = suggestedRate;
        return rT;
      }
    };
    module.exports = tempBasalFunctions;
  }
});
//export default require_basal_set_temp();
 