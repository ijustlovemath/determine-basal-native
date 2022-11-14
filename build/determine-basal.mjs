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

// lib/determine-basal/determine-basal.js
var require_determine_basal = __commonJS({
  "lib/determine-basal/determine-basal.js"(exports, module) {
    var round_basal = require_round_basal();
    function round(value, digits) {
      if (!digits) {
        digits = 0;
      }
      var scale = Math.pow(10, digits);
      return Math.round(value * scale) / scale;
    }
    function calculate_expected_delta(target_bg, eventual_bg, bgi) {
      var five_min_blocks = 2 * 60 / 5;
      var target_delta = target_bg - eventual_bg;
      return round(bgi + target_delta / five_min_blocks, 1);
    }
    function convert_bg(value, profile) {
      if (profile.out_units === "mmol/L") {
        return round(value / 18, 1).toFixed(1);
      } else {
        return Math.round(value);
      }
    }
    function enable_smb(profile, microBolusAllowed, meal_data, bg, target_bg, high_bg) {
      if (!microBolusAllowed) {
        console.error("SMB disabled (!microBolusAllowed)");
        return false;
      } else if (!profile.allowSMB_with_high_temptarget && profile.temptargetSet && target_bg > 100) {
        console.error("SMB disabled due to high temptarget of", target_bg);
        return false;
      } else if (meal_data.bwFound === true && profile.A52_risk_enable === false) {
        console.error("SMB disabled due to Bolus Wizard activity in the last 6 hours.");
        return false;
      }
      if (profile.enableSMB_always === true) {
        if (meal_data.bwFound) {
          console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard");
        } else {
          console.error("SMB enabled due to enableSMB_always");
        }
        return true;
      }
      if (profile.enableSMB_with_COB === true && meal_data.mealCOB) {
        if (meal_data.bwCarbs) {
          console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard");
        } else {
          console.error("SMB enabled for COB of", meal_data.mealCOB);
        }
        return true;
      }
      if (profile.enableSMB_after_carbs === true && meal_data.carbs) {
        if (meal_data.bwCarbs) {
          console.error("Warning: SMB enabled with Bolus Wizard carbs: be sure to easy bolus 30s before using Bolus Wizard");
        } else {
          console.error("SMB enabled for 6h after carb entry");
        }
        return true;
      }
      if (profile.enableSMB_with_temptarget === true && (profile.temptargetSet && target_bg < 100)) {
        if (meal_data.bwFound) {
          console.error("Warning: SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard");
        } else {
          console.error("SMB enabled for temptarget of", convert_bg(target_bg, profile));
        }
        return true;
      }
      if (profile.enableSMB_high_bg === true && high_bg !== null && bg >= high_bg) {
        console.error("Checking BG to see if High for SMB enablement.");
        console.error("Current BG", bg, " | High BG ", high_bg);
        if (meal_data.bwFound) {
          console.error("Warning: High BG SMB enabled within 6h of using Bolus Wizard: be sure to easy bolus 30s before using Bolus Wizard");
        } else {
          console.error("High BG detected. Enabling SMB.");
        }
        return true;
      }
      console.error("SMB disabled (no enableSMB preferences active or no condition satisfied)");
      return false;
    }
    var determine_basal = function determine_basal2(glucose_status, currenttemp, iob_data, profile, autosens_data, meal_data, tempBasalFunctions, microBolusAllowed, reservoir_data, currentTime) {
      var rT = {};
      var deliverAt = new Date();
      if (currentTime) {
        deliverAt = currentTime;
      }
      if (typeof profile === "undefined" || typeof profile.current_basal === "undefined") {
        rT.error = "Error: could not get current basal rate";
        return rT;
      }
      var profile_current_basal = round_basal(profile.current_basal, profile);
      var basal = profile_current_basal;
      var systemTime = new Date();
      if (currentTime) {
        systemTime = currentTime;
      }
      var bgTime = new Date(glucose_status.date);
      var minAgo = round((systemTime - bgTime) / 60 / 1e3, 1);
      var bg = glucose_status.glucose;
      var noise = glucose_status.noise;
      var tick;
      if (glucose_status.delta > -0.5) {
        tick = "+" + round(glucose_status.delta, 0);
      } else {
        tick = round(glucose_status.delta, 0);
      }
      var minDelta = Math.min(glucose_status.delta, glucose_status.short_avgdelta);
      var minAvgDelta = Math.min(glucose_status.short_avgdelta, glucose_status.long_avgdelta);
      var maxDelta = Math.max(glucose_status.delta, glucose_status.short_avgdelta, glucose_status.long_avgdelta);
      if (bg <= 10 || bg === 38 || noise >= 3) {
        rT.reason = "CGM is calibrating, in ??? state, or noise is high";
      }
      var tooflat = false;
      if (bg > 60 && glucose_status.delta == 0 && glucose_status.short_avgdelta > -1 && glucose_status.short_avgdelta < 1 && glucose_status.long_avgdelta > -1 && glucose_status.long_avgdelta < 1) {
        if (glucose_status.device == "fakecgm") {
          console.error("CGM data is unchanged (" + bg + "+" + glucose_status.delta + ") for 5m w/ " + glucose_status.short_avgdelta + " mg/dL ~15m change & " + glucose_status.long_avgdelta + " mg/dL ~45m change");
          console.error("Simulator mode detected (", glucose_status.device, "): continuing anyway");
        } else {
          tooflat = true;
        }
      }
      if (minAgo > 12 || minAgo < -5) {
        rT.reason = "If current system time " + systemTime + " is correct, then BG data is too old. The last BG data was read " + minAgo + "m ago at " + bgTime;
      } else if (tooflat) {
        if (glucose_status.last_cal && glucose_status.last_cal < 3) {
          rT.reason = "CGM was just calibrated";
        } else {
          rT.reason = "CGM data is unchanged (" + bg + "+" + glucose_status.delta + ") for 5m w/ " + glucose_status.short_avgdelta + " mg/dL ~15m change & " + glucose_status.long_avgdelta + " mg/dL ~45m change";
        }
      }
      if (bg <= 10 || bg === 38 || noise >= 3 || minAgo > 12 || minAgo < -5 || tooflat) {
        if (currenttemp.rate > basal) {
          rT.reason += ". Replacing high temp basal of " + currenttemp.rate + " with neutral temp of " + basal;
          rT.deliverAt = deliverAt;
          rT.temp = "absolute";
          rT.duration = 30;
          rT.rate = basal;
          return rT;
        } else if (currenttemp.rate === 0 && currenttemp.duration > 30) {
          rT.reason += ". Shortening " + currenttemp.duration + "m long zero temp to 30m. ";
          rT.deliverAt = deliverAt;
          rT.temp = "absolute";
          rT.duration = 30;
          rT.rate = 0;
          return rT;
        } else {
          rT.reason += ". Temp " + currenttemp.rate + " <= current basal " + basal + "U/hr; doing nothing. ";
          return rT;
        }
      }
      var max_iob = profile.max_iob;
      var target_bg;
      var min_bg;
      var max_bg;
      var high_bg;
      if (typeof profile.min_bg !== "undefined") {
        min_bg = profile.min_bg;
      }
      if (typeof profile.max_bg !== "undefined") {
        max_bg = profile.max_bg;
      }
      if (typeof profile.enableSMB_high_bg_target !== "undefined") {
        high_bg = profile.enableSMB_high_bg_target;
      }
      if (typeof profile.min_bg !== "undefined" && typeof profile.max_bg !== "undefined") {
        target_bg = (profile.min_bg + profile.max_bg) / 2;
      } else {
        rT.error = "Error: could not determine target_bg. ";
        return rT;
      }
      var sensitivityRatio;
      var high_temptarget_raises_sensitivity = profile.exercise_mode || profile.high_temptarget_raises_sensitivity;
      var normalTarget = 100;
      if (profile.half_basal_exercise_target) {
        var halfBasalTarget = profile.half_basal_exercise_target;
      } else {
        halfBasalTarget = 160;
      }
      if (high_temptarget_raises_sensitivity && profile.temptargetSet && target_bg > normalTarget || profile.low_temptarget_lowers_sensitivity && profile.temptargetSet && target_bg < normalTarget) {
        var c = halfBasalTarget - normalTarget;
        if (c * (c + target_bg - normalTarget) <= 0) {
          sensitivityRatio = profile.autosens_max;
        } else {
          sensitivityRatio = c / (c + target_bg - normalTarget);
        }
        sensitivityRatio = Math.min(sensitivityRatio, profile.autosens_max);
        sensitivityRatio = round(sensitivityRatio, 2);
        process.stderr.write("Sensitivity ratio set to " + sensitivityRatio + " based on temp target of " + target_bg + "; ");
      } else if (typeof autosens_data !== "undefined" && autosens_data) {
        sensitivityRatio = autosens_data.ratio;
        process.stderr.write("Autosens ratio: " + sensitivityRatio + "; ");
      }
      if (sensitivityRatio) {
        basal = profile.current_basal * sensitivityRatio;
        basal = round_basal(basal, profile);
        if (basal !== profile_current_basal) {
          process.stderr.write("Adjusting basal from " + profile_current_basal + " to " + basal + "; ");
        } else {
          process.stderr.write("Basal unchanged: " + basal + "; ");
        }
      }
      if (profile.temptargetSet) {
      } else if (typeof autosens_data !== "undefined" && autosens_data) {
        if (profile.sensitivity_raises_target && autosens_data.ratio < 1 || profile.resistance_lowers_target && autosens_data.ratio > 1) {
          min_bg = round((min_bg - 60) / autosens_data.ratio) + 60;
          max_bg = round((max_bg - 60) / autosens_data.ratio) + 60;
          var new_target_bg = round((target_bg - 60) / autosens_data.ratio) + 60;
          new_target_bg = Math.max(80, new_target_bg);
          if (target_bg === new_target_bg) {
            process.stderr.write("target_bg unchanged: " + new_target_bg + "; ");
          } else {
            process.stderr.write("target_bg from " + target_bg + " to " + new_target_bg + "; ");
          }
          target_bg = new_target_bg;
        }
      }
      if (glucose_status.noise >= 2) {
        var noisyCGMTargetMultiplier = Math.max(1.1, profile.noisyCGMTargetMultiplier);
        var maxRaw = Math.min(250, profile.maxRaw);
        var adjustedMinBG = round(Math.min(200, min_bg * noisyCGMTargetMultiplier));
        var adjustedTargetBG = round(Math.min(200, target_bg * noisyCGMTargetMultiplier));
        var adjustedMaxBG = round(Math.min(200, max_bg * noisyCGMTargetMultiplier));
        process.stderr.write("Raising target_bg for noisy / raw CGM data, from " + target_bg + " to " + adjustedTargetBG + "; ");
        min_bg = adjustedMinBG;
        target_bg = adjustedTargetBG;
        max_bg = adjustedMaxBG;
      }
      var threshold = min_bg - 0.5 * (min_bg - 40);
      var profile_sens = round(profile.sens, 1);
      var sens = profile.sens;
      if (typeof autosens_data !== "undefined" && autosens_data) {
        sens = profile.sens / sensitivityRatio;
        sens = round(sens, 1);
        if (sens !== profile_sens) {
          process.stderr.write("ISF from " + profile_sens + " to " + sens);
        } else {
          process.stderr.write("ISF unchanged: " + sens);
        }
      }
      console.error("; CR:", profile.carb_ratio);
      if (typeof iob_data === "undefined") {
        rT.error = "Error: iob_data undefined. ";
        return rT;
      }
      var iobArray = iob_data;
      if (typeof iob_data.length && iob_data.length > 1) {
        iob_data = iobArray[0];
      }
      if (typeof iob_data.activity === "undefined" || typeof iob_data.iob === "undefined") {
        rT.error = "Error: iob_data missing some property. ";
        return rT;
      }
      var lastTempAge;
      if (typeof iob_data.lastTemp !== "undefined") {
        lastTempAge = round((new Date(systemTime).getTime() - iob_data.lastTemp.date) / 6e4);
      } else {
        lastTempAge = 0;
      }
      var tempModulus = (lastTempAge + currenttemp.duration) % 30;
      console.error("currenttemp:", currenttemp, "lastTempAge:", lastTempAge, "m", "tempModulus:", tempModulus, "m");
      rT.temp = "absolute";
      rT.deliverAt = deliverAt;
      if (microBolusAllowed && currenttemp && iob_data.lastTemp && currenttemp.rate !== iob_data.lastTemp.rate && lastTempAge > 10 && currenttemp.duration) {
        rT.reason = "Warning: currenttemp rate " + currenttemp.rate + " != lastTemp rate " + iob_data.lastTemp.rate + " from pumphistory; canceling temp";
        return tempBasalFunctions.setTempBasal(0, 0, profile, rT, currenttemp);
      }
      if (currenttemp && iob_data.lastTemp && currenttemp.duration > 0) {
        var lastTempEnded = lastTempAge - iob_data.lastTemp.duration;
        if (lastTempEnded > 5 && lastTempAge > 10) {
          rT.reason = "Warning: currenttemp running but lastTemp from pumphistory ended " + lastTempEnded + "m ago; canceling temp";
          return tempBasalFunctions.setTempBasal(0, 0, profile, rT, currenttemp);
        }
      }
      var bgi = round(-iob_data.activity * sens * 5, 2);
      var deviation = round(30 / 5 * (minDelta - bgi));
      if (deviation < 0) {
        deviation = round(30 / 5 * (minAvgDelta - bgi));
        if (deviation < 0) {
          deviation = round(30 / 5 * (glucose_status.long_avgdelta - bgi));
        }
      }
      if (iob_data.iob > 0) {
        var naive_eventualBG = round(bg - iob_data.iob * sens);
      } else {
        naive_eventualBG = round(bg - iob_data.iob * Math.min(sens, profile.sens));
      }
      var eventualBG = naive_eventualBG + deviation;
      if (typeof eventualBG === "undefined" || isNaN(eventualBG)) {
        rT.error = "Error: could not calculate eventualBG. ";
        return rT;
      }
      var expectedDelta = calculate_expected_delta(target_bg, eventualBG, bgi);
      rT = {
        "temp": "absolute",
        "bg": bg,
        "tick": tick,
        "eventualBG": eventualBG,
        "insulinReq": 0,
        "reservoir": reservoir_data,
        "deliverAt": deliverAt,
        "sensitivityRatio": sensitivityRatio
      };
      var COBpredBGs = [];
      var IOBpredBGs = [];
      var UAMpredBGs = [];
      var ZTpredBGs = [];
      COBpredBGs.push(bg);
      IOBpredBGs.push(bg);
      ZTpredBGs.push(bg);
      UAMpredBGs.push(bg);
      var enableSMB = enable_smb(
        profile,
        microBolusAllowed,
        meal_data,
        bg,
        target_bg,
        high_bg
      );
      var enableUAM = profile.enableUAM;
      var ci = 0;
      var cid = 0;
      ci = round(minDelta - bgi, 1);
      var uci = round(minDelta - bgi, 1);
      csf = sens / profile.carb_ratio;
      console.error("profile.sens:", profile.sens, "sens:", sens, "CSF:", csf);
      var maxCarbAbsorptionRate = 30;
      var maxCI = round(maxCarbAbsorptionRate * csf * 5 / 60, 1);
      if (ci > maxCI) {
        console.error("Limiting carb impact from", ci, "to", maxCI, "mg/dL/5m (", maxCarbAbsorptionRate, "g/h )");
        ci = maxCI;
      }
      var remainingCATimeMin = 3;
      if (sensitivityRatio) {
        remainingCATimeMin = remainingCATimeMin / sensitivityRatio;
      }
      var assumedCarbAbsorptionRate = 20;
      var remainingCATime = remainingCATimeMin;
      if (meal_data.carbs) {
        remainingCATimeMin = Math.max(remainingCATimeMin, meal_data.mealCOB / assumedCarbAbsorptionRate);
        var lastCarbAge = round((new Date(systemTime).getTime() - meal_data.lastCarbTime) / 6e4);
        var fractionCOBAbsorbed = (meal_data.carbs - meal_data.mealCOB) / meal_data.carbs;
        remainingCATime = remainingCATimeMin + 1.5 * lastCarbAge / 60;
        remainingCATime = round(remainingCATime, 1);
        console.error("Last carbs", lastCarbAge, "minutes ago; remainingCATime:", remainingCATime, "hours;", round(fractionCOBAbsorbed * 100) + "% carbs absorbed");
      }
      var totalCI = Math.max(0, ci / 5 * 60 * remainingCATime / 2);
      var totalCA = totalCI / csf;
      var remainingCarbsCap = 90;
      var remainingCarbsFraction = 1;
      if (profile.remainingCarbsCap) {
        remainingCarbsCap = Math.min(90, profile.remainingCarbsCap);
      }
      if (profile.remainingCarbsFraction) {
        remainingCarbsFraction = Math.min(1, profile.remainingCarbsFraction);
      }
      var remainingCarbsIgnore = 1 - remainingCarbsFraction;
      var remainingCarbs = Math.max(0, meal_data.mealCOB - totalCA - meal_data.carbs * remainingCarbsIgnore);
      remainingCarbs = Math.min(remainingCarbsCap, remainingCarbs);
      var remainingCIpeak = remainingCarbs * csf * 5 / 60 / (remainingCATime / 2);
      var slopeFromMaxDeviation = round(meal_data.slopeFromMaxDeviation, 2);
      var slopeFromMinDeviation = round(meal_data.slopeFromMinDeviation, 2);
      var slopeFromDeviations = Math.min(slopeFromMaxDeviation, -slopeFromMinDeviation / 3);
      if (ci === 0) {
        cid = 0;
      } else {
        cid = Math.min(remainingCATime * 60 / 5 / 2, Math.max(0, meal_data.mealCOB * csf / ci));
      }
      console.error("Carb Impact:", ci, "mg/dL per 5m; CI Duration:", round(cid * 5 / 60 * 2, 1), "hours; remaining CI (", remainingCATime, " peak):", round(remainingCIpeak, 1), "mg/dL per 5m");
      var minIOBPredBG = 999;
      var minCOBPredBG = 999;
      var minUAMPredBG = 999;
      var minGuardBG = bg;
      var minCOBGuardBG = 999;
      var minUAMGuardBG = 999;
      var minIOBGuardBG = 999;
      var minZTGuardBG = 999;
      var minPredBG;
      var avgPredBG;
      var IOBpredBG = eventualBG;
      var maxIOBPredBG = bg;
      var maxCOBPredBG = bg;
      var maxUAMPredBG = bg;
      var eventualPredBG = bg;
      var lastIOBpredBG;
      var lastCOBpredBG;
      var lastUAMpredBG;
      var lastZTpredBG;
      var UAMduration = 0;
      var remainingCItotal = 0;
      var remainingCIs = [];
      var predCIs = [];
      try {
        iobArray.forEach(function(iobTick) {
          var predBGI = round(-iobTick.activity * sens * 5, 2);
          var predZTBGI = round(-iobTick.iobWithZeroTemp.activity * sens * 5, 2);
          var predDev = ci * (1 - Math.min(1, IOBpredBGs.length / (60 / 5)));
          IOBpredBG = IOBpredBGs[IOBpredBGs.length - 1] + predBGI + predDev;
          var ZTpredBG = ZTpredBGs[ZTpredBGs.length - 1] + predZTBGI;
          var predCI = Math.max(0, Math.max(0, ci) * (1 - COBpredBGs.length / Math.max(cid * 2, 1)));
          var intervals = Math.min(COBpredBGs.length, remainingCATime * 12 - COBpredBGs.length);
          var remainingCI = Math.max(0, intervals / (remainingCATime / 2 * 12) * remainingCIpeak);
          remainingCItotal += predCI + remainingCI;
          remainingCIs.push(round(remainingCI, 0));
          predCIs.push(round(predCI, 0));
          COBpredBG = COBpredBGs[COBpredBGs.length - 1] + predBGI + Math.min(0, predDev) + predCI + remainingCI;
          var predUCIslope = Math.max(0, uci + UAMpredBGs.length * slopeFromDeviations);
          var predUCImax = Math.max(0, uci * (1 - UAMpredBGs.length / Math.max(3 * 60 / 5, 1)));
          var predUCI = Math.min(predUCIslope, predUCImax);
          if (predUCI > 0) {
            UAMduration = round((UAMpredBGs.length + 1) * 5 / 60, 1);
          }
          UAMpredBG = UAMpredBGs[UAMpredBGs.length - 1] + predBGI + Math.min(0, predDev) + predUCI;
          if (IOBpredBGs.length < 48) {
            IOBpredBGs.push(IOBpredBG);
          }
          if (COBpredBGs.length < 48) {
            COBpredBGs.push(COBpredBG);
          }
          if (UAMpredBGs.length < 48) {
            UAMpredBGs.push(UAMpredBG);
          }
          if (ZTpredBGs.length < 48) {
            ZTpredBGs.push(ZTpredBG);
          }
          if (COBpredBG < minCOBGuardBG) {
            minCOBGuardBG = round(COBpredBG);
          }
          if (UAMpredBG < minUAMGuardBG) {
            minUAMGuardBG = round(UAMpredBG);
          }
          if (IOBpredBG < minIOBGuardBG) {
            minIOBGuardBG = round(IOBpredBG);
          }
          if (ZTpredBG < minZTGuardBG) {
            minZTGuardBG = round(ZTpredBG);
          }
          var insulinPeakTime = 60;
          insulinPeakTime = 90;
          var insulinPeak5m = insulinPeakTime / 60 * 12;
          if (IOBpredBGs.length > insulinPeak5m && IOBpredBG < minIOBPredBG) {
            minIOBPredBG = round(IOBpredBG);
          }
          if (IOBpredBG > maxIOBPredBG) {
            maxIOBPredBG = IOBpredBG;
          }
          if ((cid || remainingCIpeak > 0) && COBpredBGs.length > insulinPeak5m && COBpredBG < minCOBPredBG) {
            minCOBPredBG = round(COBpredBG);
          }
          if ((cid || remainingCIpeak > 0) && COBpredBG > maxIOBPredBG) {
            maxCOBPredBG = COBpredBG;
          }
          if (enableUAM && UAMpredBGs.length > 12 && UAMpredBG < minUAMPredBG) {
            minUAMPredBG = round(UAMpredBG);
          }
          if (enableUAM && UAMpredBG > maxIOBPredBG) {
            maxUAMPredBG = UAMpredBG;
          }
        });
      } catch (e) {
        console.error("Problem with iobArray.  Optional feature Advanced Meal Assist disabled");
      }
      if (meal_data.mealCOB) {
        console.error("predCIs (mg/dL/5m):", predCIs.join(" "));
        console.error("remainingCIs:      ", remainingCIs.join(" "));
      }
      rT.predBGs = {};
      IOBpredBGs.forEach(function(p, i2, theArray) {
        theArray[i2] = round(Math.min(401, Math.max(39, p)));
      });
      for (var i = IOBpredBGs.length - 1; i > 12; i--) {
        if (IOBpredBGs[i - 1] !== IOBpredBGs[i]) {
          break;
        } else {
          IOBpredBGs.pop();
        }
      }
      rT.predBGs.IOB = IOBpredBGs;
      lastIOBpredBG = round(IOBpredBGs[IOBpredBGs.length - 1]);
      ZTpredBGs.forEach(function(p, i2, theArray) {
        theArray[i2] = round(Math.min(401, Math.max(39, p)));
      });
      for (i = ZTpredBGs.length - 1; i > 6; i--) {
        if (ZTpredBGs[i - 1] >= ZTpredBGs[i] || ZTpredBGs[i] <= target_bg) {
          break;
        } else {
          ZTpredBGs.pop();
        }
      }
      rT.predBGs.ZT = ZTpredBGs;
      lastZTpredBG = round(ZTpredBGs[ZTpredBGs.length - 1]);
      if (meal_data.mealCOB > 0 && (ci > 0 || remainingCIpeak > 0)) {
        COBpredBGs.forEach(function(p, i2, theArray) {
          theArray[i2] = round(Math.min(401, Math.max(39, p)));
        });
        for (i = COBpredBGs.length - 1; i > 12; i--) {
          if (COBpredBGs[i - 1] !== COBpredBGs[i]) {
            break;
          } else {
            COBpredBGs.pop();
          }
        }
        rT.predBGs.COB = COBpredBGs;
        lastCOBpredBG = round(COBpredBGs[COBpredBGs.length - 1]);
        eventualBG = Math.max(eventualBG, round(COBpredBGs[COBpredBGs.length - 1]));
      }
      if (ci > 0 || remainingCIpeak > 0) {
        if (enableUAM) {
          UAMpredBGs.forEach(function(p, i2, theArray) {
            theArray[i2] = round(Math.min(401, Math.max(39, p)));
          });
          for (i = UAMpredBGs.length - 1; i > 12; i--) {
            if (UAMpredBGs[i - 1] !== UAMpredBGs[i]) {
              break;
            } else {
              UAMpredBGs.pop();
            }
          }
          rT.predBGs.UAM = UAMpredBGs;
          lastUAMpredBG = round(UAMpredBGs[UAMpredBGs.length - 1]);
          if (UAMpredBGs[UAMpredBGs.length - 1]) {
            eventualBG = Math.max(eventualBG, round(UAMpredBGs[UAMpredBGs.length - 1]));
          }
        }
        rT.eventualBG = eventualBG;
      }
      console.error("UAM Impact:", uci, "mg/dL per 5m; UAM Duration:", UAMduration, "hours");
      minIOBPredBG = Math.max(39, minIOBPredBG);
      minCOBPredBG = Math.max(39, minCOBPredBG);
      minUAMPredBG = Math.max(39, minUAMPredBG);
      minPredBG = round(minIOBPredBG);
      var fractionCarbsLeft = meal_data.mealCOB / meal_data.carbs;
      if (minUAMPredBG < 999 && minCOBPredBG < 999) {
        avgPredBG = round((1 - fractionCarbsLeft) * UAMpredBG + fractionCarbsLeft * COBpredBG);
      } else if (minCOBPredBG < 999) {
        avgPredBG = round((IOBpredBG + COBpredBG) / 2);
      } else if (minUAMPredBG < 999) {
        avgPredBG = round((IOBpredBG + UAMpredBG) / 2);
      } else {
        avgPredBG = round(IOBpredBG);
      }
      if (minZTGuardBG > avgPredBG) {
        avgPredBG = minZTGuardBG;
      }
      if (cid || remainingCIpeak > 0) {
        if (enableUAM) {
          minGuardBG = fractionCarbsLeft * minCOBGuardBG + (1 - fractionCarbsLeft) * minUAMGuardBG;
        } else {
          minGuardBG = minCOBGuardBG;
        }
      } else if (enableUAM) {
        minGuardBG = minUAMGuardBG;
      } else {
        minGuardBG = minIOBGuardBG;
      }
      minGuardBG = round(minGuardBG);
      var minZTUAMPredBG = minUAMPredBG;
      if (minZTGuardBG < threshold) {
        minZTUAMPredBG = (minUAMPredBG + minZTGuardBG) / 2;
      } else if (minZTGuardBG < target_bg) {
        var blendPct = (minZTGuardBG - threshold) / (target_bg - threshold);
        var blendedMinZTGuardBG = minUAMPredBG * blendPct + minZTGuardBG * (1 - blendPct);
        minZTUAMPredBG = (minUAMPredBG + blendedMinZTGuardBG) / 2;
      } else if (minZTGuardBG > minUAMPredBG) {
        minZTUAMPredBG = (minUAMPredBG + minZTGuardBG) / 2;
      }
      minZTUAMPredBG = round(minZTUAMPredBG);
      if (meal_data.carbs) {
        if (!enableUAM && minCOBPredBG < 999) {
          minPredBG = round(Math.max(minIOBPredBG, minCOBPredBG));
        } else if (minCOBPredBG < 999) {
          var blendedMinPredBG = fractionCarbsLeft * minCOBPredBG + (1 - fractionCarbsLeft) * minZTUAMPredBG;
          minPredBG = round(Math.max(minIOBPredBG, minCOBPredBG, blendedMinPredBG));
        } else if (enableUAM) {
          minPredBG = minZTUAMPredBG;
        } else {
          minPredBG = minGuardBG;
        }
      } else if (enableUAM) {
        minPredBG = round(Math.max(minIOBPredBG, minZTUAMPredBG));
      }
      minPredBG = Math.min(minPredBG, avgPredBG);
      process.stderr.write("minPredBG: " + minPredBG + " minIOBPredBG: " + minIOBPredBG + " minZTGuardBG: " + minZTGuardBG);
      if (minCOBPredBG < 999) {
        process.stderr.write(" minCOBPredBG: " + minCOBPredBG);
      }
      if (minUAMPredBG < 999) {
        process.stderr.write(" minUAMPredBG: " + minUAMPredBG);
      }
      console.error(" avgPredBG:", avgPredBG, "COB:", meal_data.mealCOB, "/", meal_data.carbs);
      if (maxCOBPredBG > bg) {
        minPredBG = Math.min(minPredBG, maxCOBPredBG);
      }
      rT.COB = meal_data.mealCOB;
      rT.IOB = iob_data.iob;
      rT.BGI = convert_bg(bgi, profile);
      rT.deviation = convert_bg(deviation, profile);
      rT.ISF = convert_bg(sens, profile);
      rT.CR = round(profile.carb_ratio, 2);
      rT.target_bg = convert_bg(target_bg, profile);
      rT.reason = "COB: " + rT.COB + ", Dev: " + rT.deviation + ", BGI: " + rT.BGI + ", ISF: " + rT.ISF + ", CR: " + rT.CR + ", minPredBG " + convert_bg(minPredBG, profile) + ", minGuardBG " + convert_bg(minGuardBG, profile) + ", IOBpredBG " + convert_bg(lastIOBpredBG, profile);
      if (lastCOBpredBG > 0) {
        rT.reason += ", COBpredBG " + convert_bg(lastCOBpredBG, profile);
      }
      if (lastUAMpredBG > 0) {
        rT.reason += ", UAMpredBG " + convert_bg(lastUAMpredBG, profile);
      }
      rT.reason += "; ";
      var carbsReqBG = naive_eventualBG;
      if (carbsReqBG < 40) {
        carbsReqBG = Math.min(minGuardBG, carbsReqBG);
      }
      var bgUndershoot = threshold - carbsReqBG;
      var minutesAboveMinBG = 240;
      var minutesAboveThreshold = 240;
      if (meal_data.mealCOB > 0 && (ci > 0 || remainingCIpeak > 0)) {
        for (i = 0; i < COBpredBGs.length; i++) {
          if (COBpredBGs[i] < min_bg) {
            minutesAboveMinBG = 5 * i;
            break;
          }
        }
        for (i = 0; i < COBpredBGs.length; i++) {
          if (COBpredBGs[i] < threshold) {
            minutesAboveThreshold = 5 * i;
            break;
          }
        }
      } else {
        for (i = 0; i < IOBpredBGs.length; i++) {
          if (IOBpredBGs[i] < min_bg) {
            minutesAboveMinBG = 5 * i;
            break;
          }
        }
        for (i = 0; i < IOBpredBGs.length; i++) {
          if (IOBpredBGs[i] < threshold) {
            minutesAboveThreshold = 5 * i;
            break;
          }
        }
      }
      if (enableSMB && minGuardBG < threshold) {
        console.error("minGuardBG", convert_bg(minGuardBG, profile), "projected below", convert_bg(threshold, profile), "- disabling SMB");
        enableSMB = false;
      }
      var maxDelta_bg_threshold;
      if (typeof profile.maxDelta_bg_threshold === "undefined") {
        maxDelta_bg_threshold = 0.2;
      }
      if (typeof profile.maxDelta_bg_threshold !== "undefined") {
        maxDelta_bg_threshold = Math.min(profile.maxDelta_bg_threshold, 0.3);
      }
      if (maxDelta > maxDelta_bg_threshold * bg) {
        console.error("maxDelta " + convert_bg(maxDelta, profile) + " > " + 100 * maxDelta_bg_threshold + "% of BG " + convert_bg(bg, profile) + " - disabling SMB");
        rT.reason += "maxDelta " + convert_bg(maxDelta, profile) + " > " + 100 * maxDelta_bg_threshold + "% of BG " + convert_bg(bg, profile) + ": SMB disabled; ";
        enableSMB = false;
      }
      console.error("BG projected to remain above", convert_bg(min_bg, profile), "for", minutesAboveMinBG, "minutes");
      if (minutesAboveThreshold < 240 || minutesAboveMinBG < 60) {
        console.error("BG projected to remain above", convert_bg(threshold, profile), "for", minutesAboveThreshold, "minutes");
      }
      var zeroTempDuration = minutesAboveThreshold;
      var zeroTempEffect = profile.current_basal * sens * zeroTempDuration / 60;
      var COBforCarbsReq = Math.max(0, meal_data.mealCOB - 0.25 * meal_data.carbs);
      var carbsReq = (bgUndershoot - zeroTempEffect) / csf - COBforCarbsReq;
      zeroTempEffect = round(zeroTempEffect);
      carbsReq = round(carbsReq);
      console.error("naive_eventualBG:", naive_eventualBG, "bgUndershoot:", bgUndershoot, "zeroTempDuration:", zeroTempDuration, "zeroTempEffect:", zeroTempEffect, "carbsReq:", carbsReq);
      if (meal_data.reason == "Could not parse clock data") {
        console.error("carbsReq unknown: Could not parse clock data");
      } else if (carbsReq >= profile.carbsReqThreshold && minutesAboveThreshold <= 45) {
        rT.carbsReq = carbsReq;
        rT.reason += carbsReq + " add'l carbs req w/in " + minutesAboveThreshold + "m; ";
      }
      if (bg < threshold && iob_data.iob < -profile.current_basal * 20 / 60 && minDelta > 0 && minDelta > expectedDelta) {
        rT.reason += "IOB " + iob_data.iob + " < " + round(-profile.current_basal * 20 / 60, 2);
        rT.reason += " and minDelta " + convert_bg(minDelta, profile) + " > expectedDelta " + convert_bg(expectedDelta, profile) + "; ";
      } else if (bg < threshold || minGuardBG < threshold) {
        rT.reason += "minGuardBG " + convert_bg(minGuardBG, profile) + "<" + convert_bg(threshold, profile);
        bgUndershoot = target_bg - minGuardBG;
        var worstCaseInsulinReq = bgUndershoot / sens;
        var durationReq = round(60 * worstCaseInsulinReq / profile.current_basal);
        durationReq = round(durationReq / 30) * 30;
        durationReq = Math.min(120, Math.max(30, durationReq));
        return tempBasalFunctions.setTempBasal(0, durationReq, profile, rT, currenttemp);
      }
      if (profile.skip_neutral_temps && rT.deliverAt.getMinutes() >= 55) {
        rT.reason += "; Canceling temp at " + rT.deliverAt.getMinutes() + "m past the hour. ";
        return tempBasalFunctions.setTempBasal(0, 0, profile, rT, currenttemp);
      }
      if (eventualBG < min_bg) {
        rT.reason += "Eventual BG " + convert_bg(eventualBG, profile) + " < " + convert_bg(min_bg, profile);
        if (minDelta > expectedDelta && minDelta > 0 && !carbsReq) {
          if (naive_eventualBG < 40) {
            rT.reason += ", naive_eventualBG < 40. ";
            return tempBasalFunctions.setTempBasal(0, 30, profile, rT, currenttemp);
          }
          if (glucose_status.delta > minDelta) {
            rT.reason += ", but Delta " + convert_bg(tick, profile) + " > expectedDelta " + convert_bg(expectedDelta, profile);
          } else {
            rT.reason += ", but Min. Delta " + minDelta.toFixed(2) + " > Exp. Delta " + convert_bg(expectedDelta, profile);
          }
          if (currenttemp.duration > 15 && round_basal(basal, profile) === round_basal(currenttemp.rate, profile)) {
            rT.reason += ", temp " + currenttemp.rate + " ~ req " + basal + "U/hr. ";
            return rT;
          } else {
            rT.reason += "; setting current basal of " + basal + " as temp. ";
            return tempBasalFunctions.setTempBasal(basal, 30, profile, rT, currenttemp);
          }
        }
        var insulinReq = 2 * Math.min(0, (eventualBG - target_bg) / sens);
        insulinReq = round(insulinReq, 2);
        var naiveInsulinReq = Math.min(0, (naive_eventualBG - target_bg) / sens);
        naiveInsulinReq = round(naiveInsulinReq, 2);
        if (minDelta < 0 && minDelta > expectedDelta) {
          var newinsulinReq = round(insulinReq * (minDelta / expectedDelta), 2);
          insulinReq = newinsulinReq;
        }
        var rate = basal + 2 * insulinReq;
        rate = round_basal(rate, profile);
        var insulinScheduled = currenttemp.duration * (currenttemp.rate - basal) / 60;
        var minInsulinReq = Math.min(insulinReq, naiveInsulinReq);
        if (insulinScheduled < minInsulinReq - basal * 0.3) {
          rT.reason += ", " + currenttemp.duration + "m@" + currenttemp.rate.toFixed(2) + " is a lot less than needed. ";
          return tempBasalFunctions.setTempBasal(rate, 30, profile, rT, currenttemp);
        }
        if (typeof currenttemp.rate !== "undefined" && (currenttemp.duration > 5 && rate >= currenttemp.rate * 0.8)) {
          rT.reason += ", temp " + currenttemp.rate + " ~< req " + rate + "U/hr. ";
          return rT;
        } else {
          if (rate <= 0) {
            bgUndershoot = target_bg - naive_eventualBG;
            worstCaseInsulinReq = bgUndershoot / sens;
            durationReq = round(60 * worstCaseInsulinReq / profile.current_basal);
            if (durationReq < 0) {
              durationReq = 0;
            } else {
              durationReq = round(durationReq / 30) * 30;
              durationReq = Math.min(120, Math.max(0, durationReq));
            }
            if (durationReq > 0) {
              rT.reason += ", setting " + durationReq + "m zero temp. ";
              return tempBasalFunctions.setTempBasal(rate, durationReq, profile, rT, currenttemp);
            }
          } else {
            rT.reason += ", setting " + rate + "U/hr. ";
          }
          return tempBasalFunctions.setTempBasal(rate, 30, profile, rT, currenttemp);
        }
      }
      if (minDelta < expectedDelta) {
        if (!(microBolusAllowed && enableSMB)) {
          if (glucose_status.delta < minDelta) {
            rT.reason += "Eventual BG " + convert_bg(eventualBG, profile) + " > " + convert_bg(min_bg, profile) + " but Delta " + convert_bg(tick, profile) + " < Exp. Delta " + convert_bg(expectedDelta, profile);
          } else {
            rT.reason += "Eventual BG " + convert_bg(eventualBG, profile) + " > " + convert_bg(min_bg, profile) + " but Min. Delta " + minDelta.toFixed(2) + " < Exp. Delta " + convert_bg(expectedDelta, profile);
          }
          if (currenttemp.duration > 15 && round_basal(basal, profile) === round_basal(currenttemp.rate, profile)) {
            rT.reason += ", temp " + currenttemp.rate + " ~ req " + basal + "U/hr. ";
            return rT;
          } else {
            rT.reason += "; setting current basal of " + basal + " as temp. ";
            return tempBasalFunctions.setTempBasal(basal, 30, profile, rT, currenttemp);
          }
        }
      }
      if (Math.min(eventualBG, minPredBG) < max_bg) {
        if (!(microBolusAllowed && enableSMB)) {
          rT.reason += convert_bg(eventualBG, profile) + "-" + convert_bg(minPredBG, profile) + " in range: no temp required";
          if (currenttemp.duration > 15 && round_basal(basal, profile) === round_basal(currenttemp.rate, profile)) {
            rT.reason += ", temp " + currenttemp.rate + " ~ req " + basal + "U/hr. ";
            return rT;
          } else {
            rT.reason += "; setting current basal of " + basal + " as temp. ";
            return tempBasalFunctions.setTempBasal(basal, 30, profile, rT, currenttemp);
          }
        }
      }
      if (eventualBG >= max_bg) {
        rT.reason += "Eventual BG " + convert_bg(eventualBG, profile) + " >= " + convert_bg(max_bg, profile) + ", ";
      }
      if (iob_data.iob > max_iob) {
        rT.reason += "IOB " + round(iob_data.iob, 2) + " > max_iob " + max_iob;
        if (currenttemp.duration > 15 && round_basal(basal, profile) === round_basal(currenttemp.rate, profile)) {
          rT.reason += ", temp " + currenttemp.rate + " ~ req " + basal + "U/hr. ";
          return rT;
        } else {
          rT.reason += "; setting current basal of " + basal + " as temp. ";
          return tempBasalFunctions.setTempBasal(basal, 30, profile, rT, currenttemp);
        }
      } else {
        insulinReq = round((Math.min(minPredBG, eventualBG) - target_bg) / sens, 2);
        if (insulinReq > max_iob - iob_data.iob) {
          rT.reason += "max_iob " + max_iob + ", ";
          insulinReq = max_iob - iob_data.iob;
        }
        rate = basal + 2 * insulinReq;
        rate = round_basal(rate, profile);
        insulinReq = round(insulinReq, 3);
        rT.insulinReq = insulinReq;
        var lastBolusAge = round((new Date(systemTime).getTime() - iob_data.lastBolusTime) / 6e4, 1);
        if (microBolusAllowed && enableSMB && bg > threshold) {
          var mealInsulinReq = round(meal_data.mealCOB / profile.carb_ratio, 3);
          if (typeof profile.maxSMBBasalMinutes === "undefined") {
            var maxBolus = round(profile.current_basal * 30 / 60, 1);
            console.error("profile.maxSMBBasalMinutes undefined: defaulting to 30m");
          } else if (iob_data.iob > mealInsulinReq && iob_data.iob > 0) {
            console.error("IOB", iob_data.iob, "> COB", meal_data.mealCOB + "; mealInsulinReq =", mealInsulinReq);
            if (profile.maxUAMSMBBasalMinutes) {
              console.error("profile.maxUAMSMBBasalMinutes:", profile.maxUAMSMBBasalMinutes, "profile.current_basal:", profile.current_basal);
              maxBolus = round(profile.current_basal * profile.maxUAMSMBBasalMinutes / 60, 1);
            } else {
              console.error("profile.maxUAMSMBBasalMinutes undefined: defaulting to 30m");
              maxBolus = round(profile.current_basal * 30 / 60, 1);
            }
          } else {
            console.error("profile.maxSMBBasalMinutes:", profile.maxSMBBasalMinutes, "profile.current_basal:", profile.current_basal);
            maxBolus = round(profile.current_basal * profile.maxSMBBasalMinutes / 60, 1);
          }
          bolusIncrement = 0.1;
          if (profile.bolus_increment) {
            bolusIncrement = profile.bolus_increment;
          }
          ;
          var roundSMBTo = 1 / bolusIncrement;
          var microBolus = Math.floor(Math.min(insulinReq / 2, maxBolus) * roundSMBTo) / roundSMBTo;
          var smbTarget = target_bg;
          worstCaseInsulinReq = (smbTarget - (naive_eventualBG + minIOBPredBG) / 2) / sens;
          durationReq = round(60 * worstCaseInsulinReq / profile.current_basal);
          if (insulinReq > 0 && microBolus < bolusIncrement) {
            durationReq = 0;
          }
          var smbLowTempReq = 0;
          if (durationReq <= 0) {
            durationReq = 0;
          } else if (durationReq >= 30) {
            durationReq = round(durationReq / 30) * 30;
            durationReq = Math.min(60, Math.max(0, durationReq));
          } else {
            smbLowTempReq = round(basal * durationReq / 30, 2);
            durationReq = 30;
          }
          rT.reason += " insulinReq " + insulinReq;
          if (microBolus >= maxBolus) {
            rT.reason += "; maxBolus " + maxBolus;
          }
          if (durationReq > 0) {
            rT.reason += "; setting " + durationReq + "m low temp of " + smbLowTempReq + "U/h";
          }
          rT.reason += ". ";
          var SMBInterval = 3;
          if (profile.SMBInterval) {
            SMBInterval = Math.min(10, Math.max(1, profile.SMBInterval));
          }
          var nextBolusMins = round(SMBInterval - lastBolusAge, 0);
          var nextBolusSeconds = round((SMBInterval - lastBolusAge) * 60, 0) % 60;
          console.error("naive_eventualBG", naive_eventualBG + ",", durationReq + "m " + smbLowTempReq + "U/h temp needed; last bolus", lastBolusAge + "m ago; maxBolus: " + maxBolus);
          if (lastBolusAge > SMBInterval) {
            if (microBolus > 0) {
              rT.units = microBolus;
              rT.reason += "Microbolusing " + microBolus + "U. ";
            }
          } else {
            rT.reason += "Waiting " + nextBolusMins + "m " + nextBolusSeconds + "s to microbolus again. ";
          }
          if (durationReq > 0) {
            rT.rate = smbLowTempReq;
            rT.duration = durationReq;
            return rT;
          }
        }
        var maxSafeBasal = tempBasalFunctions.getMaxSafeBasal(profile);
        if (rate > maxSafeBasal) {
          rT.reason += "adj. req. rate: " + rate + " to maxSafeBasal: " + maxSafeBasal + ", ";
          rate = round_basal(maxSafeBasal, profile);
        }
        insulinScheduled = currenttemp.duration * (currenttemp.rate - basal) / 60;
        if (insulinScheduled >= insulinReq * 2) {
          rT.reason += currenttemp.duration + "m@" + currenttemp.rate.toFixed(2) + " > 2 * insulinReq. Setting temp basal of " + rate + "U/hr. ";
          return tempBasalFunctions.setTempBasal(rate, 30, profile, rT, currenttemp);
        }
        if (typeof currenttemp.duration === "undefined" || currenttemp.duration === 0) {
          rT.reason += "no temp, setting " + rate + "U/hr. ";
          return tempBasalFunctions.setTempBasal(rate, 30, profile, rT, currenttemp);
        }
        if (currenttemp.duration > 5 && round_basal(rate, profile) <= round_basal(currenttemp.rate, profile)) {
          rT.reason += "temp " + currenttemp.rate + " >~ req " + rate + "U/hr. ";
          return rT;
        }
        rT.reason += "temp " + currenttemp.rate + "<" + rate + "U/hr. ";
        return tempBasalFunctions.setTempBasal(rate, 30, profile, rT, currenttemp);
      }
    };
    module.exports = determine_basal;
  }
});
//export default require_determine_basal();
