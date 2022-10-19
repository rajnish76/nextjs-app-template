import { isArray, isNull, isObject, isUndefined } from './type-util';

/**
 * Deep merges a target object by copying the values of all enumerable own properties from
 * one or more source objects to the target object. Properties in the target object will
 * be overwritten by properties in the sources if they have the same key. Sources are applied
 * from left to right in the arguments list.
 *
 * @param   {Object}    target      The target object.
 * @param   {...Object} [sources]   One or more source objects to merge.
 * @returns {Object}
 */
export function merge(target, ...sources) {
  sources.forEach((source) => {
    for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        if (isObject(target[key]) && !isArray(target[key]) && isObject(source[key]) && !isArray(source[key])) {
          target[key] = merge({}, target[key], source[key]);
        } else {
          target[key] = source[key];
        }
      }
    }
  });

  return target;
}

/**
 * Getting the error response message
 *
 * @param   {Object}    error      The error response.
 * @returns {String}
 */
export function responseError(error) {
  if (error.response && error.response.data) {
    if (error.response.data.errors && error.response.data.errors.length) {
      return error.response.data.errors.map((e) => e.defaultMessage).join('\n');
    } else if (error.response.data.message) {
      return error.response.data.message;
    } else {
      return error.message;
    }
  } else {
    return error.message;
  }
}

/**
 * Getting a unique Id
 *
 * @returns {String}
 */
export function getUniqueId() {
  return Math.random().toString(36).substring(2);
}

/**
 * Deep checks two objects are return true if both objects are eqaul
 *
 * @param   {Object}    Object1     The first object.
 * @param   {Object} 	Object2   	The second object.
 * @return 	{Boolean}
 */

export function areObjectsEqual(obj1, obj2) {
  if (isObject(obj1) && isObject(obj2)) {
    for (const p in obj1) {
      if (Object.prototype.hasOwnProperty.call(obj1, p) !== Object.prototype.hasOwnProperty.call(obj2, p)) return false;
      switch (typeof obj1[p]) {
        case 'object':
          if (!areObjectsEqual(obj1[p], obj2[p])) return false;
          break;
        case 'function':
          if (typeof obj2[p] == 'undefined' || (p !== 'compare' && obj1[p].toString() !== obj2[p].toString())) return false;
          break;
        default:
          if (obj1[p] !== obj2[p]) return false;
      }
    }
    for (const p in obj2) {
      if (typeof obj1[p] == 'undefined') return false;
    }
    return true;
  } else if (isNull(obj1) && isNull(obj2)) {
    return true;
  } else if (isUndefined(obj1) && isUndefined(obj2)) {
    return true;
  } else {
    return false;
  }
}
