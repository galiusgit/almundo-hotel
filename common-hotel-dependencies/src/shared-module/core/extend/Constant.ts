/**
 * Default class constants definition.
 * @class Constant<T>
 */
export class Constant<T> {
  /**
   * Value cosntant, generyc type pased.
   *
   * @attribute value
   * @private
   * @type {T} is the Generyc type from value.
   */
  private value: T;
  /**
   * Size constant values.
   *
   * @attribute size
   * @private
   * @type number
   */
  private size: number;
  /**
   * @class Constant
   * @constructor
   */
  constructor(value: T) {
    this.value = value;
    this.size = 0;
  }
  /**
   * Get value from constant.
   * @method getValue
   * @return {T} is the Generyc type pased from constructor.
   */
  public getValue(): T {
    return this.value;
  }
  /**
   * TODO: falta implementar este método.
   * Compare if is the the same constant object.
   * @method getValue
   * @static
   * @param {any} object parameter compare.
   * @return {boolean} is the same constant object.
   */
  public static equals(obj: any): boolean {
    return this === obj;
  }
  /**
   * TODO: falta implementar este método.
   * Get the object constant from constant name.
   * @method valueOf<T>
   * @static
   * @param {string} name constant
   * @return {Constant<T>} return the constant object generyc type.
   */
  public static valueOf<T>(name: string): Constant<T> {
    let result: Constant<T> = null;
    if (this && this[name]) {
      result = this[name];
    }
    return result;
  }
  /**
   * Initial or create fast constant.
   * @method valueOf<T>
   * @static
   * @param {string} name constant
   * @return {Constant<T>} return the constant object generyc type.
   */
  public static new<T>(value: T): Constant<T> {
    return new Constant<T>(value);
  }
  /**
   * TODO:es preciso probar la funcionalidad de este método.
   * Get the string value from this constant.
   * @method toString
   * @return {string} to string name from this constant.
   */
  public toString(): string {
    const funcNameRegex = /function (.{1,})\(/;
    const results = (funcNameRegex).exec(this.constructor.toString());
    const className = (results && results.length > 1) ? results[1] : '';
    return className + ' (' + this.size + ')';
  }

}