
/**
 * Default class object parameters.
 * @class ClassObject
 * @extends Function
 */
export class ClassObject extends Function {
  /**
   * Indicate the init class name.
   *
   * @attribute __class_name__
   * @private
   * @default false
   * @type string
   */
  private __class_name__: string = 'ClassObject';
  /**
   * @class ClassObject
   * @constructor
   */
  constructor(className: string) {
    super();
    if (className) {
      this.__class_name__ = className;
    }
  }
  /**
   * Compare the same class instance.
   * @method equals
   * @return {boolean} is the same class object.
   */
  public equals(obj: any): boolean {
    return this === obj;
  }
  /**
   * Get the current class name.
   * @method getClassName
   * @return {string} return the current class name.
   */
  public getClassName(): string {
    return this.__class_name__;
  }
}