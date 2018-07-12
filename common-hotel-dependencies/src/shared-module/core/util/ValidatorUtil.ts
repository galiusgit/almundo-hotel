import { RegexUtil } from './RegexUtil';
/**
 * General default utils from javascript.
 * @class ValidatorUtil
 */
export class ValidatorUtil {

  public static DEFAULT_RADIX = 10;
  public static MAX_LENGTH_URL = 2083;

  /**
   * TODO: es preciso probar la funcionalidad de este método.
   * Get the string value from input value pased.
   * @method toString
   * @static
   * @param {any} any input value.
   * @return {string} to string value of the input value.
   */
  public static toString(input: any): string {
    if (typeof input === 'object' && input != null && (input as string).toString) {
      input = (input as string).toString();
    } else if (input === null || typeof input === 'undefined' || (isNaN(input) && !(input as string).length)) {
      input = '';
    } else if (typeof input !== 'string') {
      input += '';
    }
    return input;
  }

  /**
   * Convert to Date object javascript if is possible, else return null value.
   * @method toDate
   * @static
   * @param {any} any format date value.
   * @return {string} to string value for the any value.
   */
  public static toDate(date: any): Date {
    if (Object.prototype.toString.call(date) === '[object Date]') {
      return date;
    }
    date = Date.parse(date);
    return !isNaN(date) ? new Date(date) : null;
  }
  /**
   * Converts string to float.
   * @param str {string}
   */
  public static toFloat(str: string): number {
    return parseFloat(str);
  }

  /**
   * Converts string to float.
   * @param str {string}
   * @param radix {Integer}
   */
  public static toInt(str: string, radix?: number): number {
    return parseInt(str, radix || ValidatorUtil.DEFAULT_RADIX);
  }

  /**
   * Converts string to boolean.
   * @param str {string}
   * @param strict {boolean}
   */
  public static toBoolean(str: string, strict?: boolean): boolean {
    if (strict) {
      return str === '1' || str === 'true';
    }
    return str !== '0' && str !== 'false' && str !== '';
  }

  /**
   * Compare to string object.
   * @param str {string}
   * @param comparison {any - Object}
   */
  public static toEquals(str: string, comparison: any): boolean {
    return str === this.toString(comparison);
  }

  /**
   * TODO: probar este método, está raro
   * It's true if contains the element
   * @param str {string}
   * @param elem {any - Object}
   */
  public static contains(str: string, elem: any): boolean {
    return str.indexOf(this.toString(elem)) >= 0;
  }

  /**
   * Matches in string with pattern
   * @param str {string}
   * @param pattern {string | RegExp}
   * @param modifiers {string}
   */
  public static matches(str: string, pattern: string | RegExp, modifiers: string): boolean {
    let auxPattern: RegExp;
    if (Object.prototype.toString.call(pattern) === '[object RegExp]') {
      auxPattern = pattern as RegExp;
    } else {
      auxPattern = new RegExp(pattern as string, modifiers);
    }
    return auxPattern.test(str);
  }

  /**
   * Get the object isntance class for any element.
   * @param obj {Object | Function | string | any}
   */
  public static getObjectClass(obj: Object | Function | string | any) {
    if (obj && (obj as Object).constructor && (obj as Object).constructor.toString) {
      if (obj.constructor.name) {
        return obj.constructor.name;
      }
      const str = (obj as Object).constructor.toString();
      let arr = null;
      if (str.charAt(0) === '[') {
        arr = str.match(/\[\w+\s*(\w+)\]/);
      } else {
        arr = str.match(/function\s*(\w+)/);
      }
      const minArrLength = 2;
      if (arr && arr.length === minArrLength) {
        return arr[1];
      }
    }
    return null;
  }

  /**
   * Gets the class name for any element.
   * @param obj {any}
   */
  public static buildClassName(obj: any): string {
    if (typeof obj === 'undefined') {
      return 'undefined';
    }
    if (obj === null) {
      return 'null';
    }
    if (obj === undefined) {
      return 'undefined';
    }
    const str: string = Object.prototype.toString.call(obj);
    return str.match(/^\[object\s(.*)\]$/)[1];
  }

  /**
   * Is URL
   * @param str {string}
   */
  public static isURL(str: string): boolean {
    const url = RegexUtil.URL.getValue();
    return str.length < ValidatorUtil.MAX_LENGTH_URL && url.test(str);
  }
  /**
   * Is Alpha.
   * @param str {string}
   */
  public static isAlpha(str: string): boolean {
    return RegexUtil.ALPHA.getValue().test(str);
  }
  /**
   * Is alpha numeric.
   * @param str {string}
   */
  public static isAlphanumeric(str: string): boolean {
    return RegexUtil.ALPHA_NUMERIC.getValue().test(str);
  }
  /**
   * Is numeric
   * @param str {string}
   */
  public static isNumeric(str: string): boolean {
    return RegexUtil.NUMERIC.getValue().test(str);
  }
  /**
   * Is Hexadecimal.
   * @param str {string}
   */
  public static isHexadecimal(str: string): boolean {
    return RegexUtil.HEXADECIMAL.getValue().test(str);
  }
  /**
   * Is Hexadecimal color
   * @param str {string}
   */
  public static isHexColor(str: string): boolean {
    return RegexUtil.HEXCOLOR.getValue().test(str);
  }
  /**
   * Is lower-case
   * @param str {string}
   */
  public static isLowercase(str: string): boolean {
    return str === str.toLowerCase();
  }
  /**
   * Is upper-case
   * @param str {string}
   */
  public static isUppercase(str: string): boolean {
    return str === str.toUpperCase();
  }
  /**
   * Is integer
   * @param str {any}
   */
  public static isInt(str: any): boolean {
    return RegexUtil.INT.getValue().test(str);
  }
  /**
   * Is float value
   * @param str {any}
   */
  public static isFloat(str: any) {
    return str !== '' && RegexUtil.FLOAT.getValue().test(str);
  }
  /**
   * Is divisible by
   * @param str {string}
   * @param num {number}
   */
  public static isDivisibleBy(str: string, num: number) {
    return ValidatorUtil.toFloat(str) % num === 0;
  }
  /**
   * Is null
   * @param str {string | any}
   */
  public static isNull(str: string | any) {
    return (null == str || (str as string).length === 0);
  }
  /**
   * Is empty any value.
   * @param value
   */
  public static isEmpty(value: any): boolean {
    if (!value || (value === RegexUtil.EMPTY) || (value == null) || (value === undefined) || (value === {})) {
      return true;
    }
    if (this.isArray(value) && (value as Array<any>).length === 0) {
      return true;
    }
    return false;
  }
  /**
   * Is Undefined
   * @param value {any}
   */
  public static isUndefined(value: any): boolean {
    return (typeof value === 'undefined');
  }
  /**
   * is defined.
   * @param value {any}
   */
  public static isDefined(value: any): boolean {
    return !ValidatorUtil.isUndefined(value);
  }
  /**
   * Is array
   * @param value {any}
   */
  public static isArray(value: any): boolean {
    return ValidatorUtil.isNotEmpty(value) && Array.isArray(value);
  }
  /**
   * Is not empty
   * @param value {any}
   */
  public static isNotEmpty(value: any): boolean {
    return !ValidatorUtil.isEmpty(value);
  }
  /**
   * is function.
   * @param value {any}
   */
  public static isFunction(value: any): boolean {
    const getType = {};
    return value && getType.toString.call(value) === '[object Function]';
  }
  /**
   * Is object
   * @param value {any | Object}
   */
  public static isObject(value: any | Object): boolean {
    if (ValidatorUtil.isNotEmpty(value) && (value as Object).toString() === '[object Object]') {
      return true;
    }
    return false;
  }

  /**
   * Is length
   * @param str {string}
   * @param min {number}
   * @param max {number}
   */
  public static isLength(str: string, min: number, max: number) {
    return str.length >= min && (typeof max === 'undefined' || str.length <= max);
  }
  /**
   * Is date
   * @param str {string}
   */
  public static isDate(str: string): boolean {
    return !isNaN(Date.parse(str));
  }
  /**
   * Is date after
   * @param str {string}
   * @param date {Date}
   */
  public static isDateAfter(str: string, date: Date): boolean {
    const comparison = ValidatorUtil.toDate(date || new Date());
    const original = ValidatorUtil.toDate(str);
    return original && comparison && original > comparison;
  }
  /**
   * Is date before
   * @param str {string}
   * @param date {Date}
   */
  public static isDateBefore(str: string, date: Date): boolean {
    const comparison = ValidatorUtil.toDate(date || new Date());
    const original = ValidatorUtil.toDate(str);
    return original && comparison && original < comparison;
  }

  /**
   * Is json
   * @param str {string}
   */
  public static isJSON(str: string): boolean {
    try {
      JSON.parse(str);
    } catch (e) {
      if (e instanceof SyntaxError) {
        return false;
      }
    }
    return true;
  }
  /**
   * is multibyte
   * @param str {string}
   */
  public static isMultibyte(str: string) {
    return RegexUtil.MULTIBYTE.getValue().test(str);
  }
  /**
   * merge objects
   * @param obj {Object}
   * @param defaults {Object}
   */
  public static merge(obj: Object, defaults: Object) {
    obj = obj || {};
    for (const key in defaults) {
      if (typeof (obj as any)[key] === 'undefined') {
        (obj as any)[key] = (defaults as any)[key];
      }
    }
    return obj;
  }
  /**
   * ltrim
   * @param str {string}
   * @param chars {string}
   */
  public static ltrim(str: string, chars: string): string {
    const pattern = chars ? new RegExp('^[' + chars + ']+', 'g') : /^\s+/g;
    return str.replace(pattern, '');
  }
  /**
   * rtrim
   * @param str {string}
   * @param chars {string}
   */
  public static rtrim(str: string, chars: string): string {
    const pattern = chars ? new RegExp('[' + chars + ']+$', 'g') : /\s+$/g;
    return str.replace(pattern, '');
  }

  /**
   * trim
   * @param str {string}
   * @param chars {string}
   */
  public static trim(str: string, chars: string): string {
    const pattern = chars ? new RegExp('^[' + chars + ']+|[' + chars + ']+$', 'g') : /^\s+|\s+$/g;
    return str.replace(pattern, '');
  }

  /**
   * escape
   * @param str {string}
   */
  public static escape(str: string): string {
    return (str.replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;'));
  }

  /**
   * whitelist
   * @param str {string}
   * @param chars {string}
   */
  public static whitelist(str: string, chars: string): string {
    return str.replace(new RegExp('[^' + chars + ']+', 'g'), '');
  }

  /**
   * blacklist
   * @param str {string}
   * @param chars {string}
   */
  public static blacklist(str: string, chars: string): string {
    return str.replace(new RegExp('[' + chars + ']+', 'g'), '');
  }

}