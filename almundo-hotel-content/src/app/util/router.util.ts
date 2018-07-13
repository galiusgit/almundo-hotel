import { Injectable } from '@angular/core';

/**
 * @export
 * @class RouterUtil
 */
@Injectable()
export class RouterUtil {
  /**
   * currentRoute
   * @private
   * @type {string}
   * @memberof RouterUtil
   */
  private currentRoute: string;

  /**
   * Creates an instance of RouterUtil.
   * @memberof RouterUtil
   */
  constructor() { }

  /**
   * getCurrentRoute
   * @returns {string}
   * @memberof RouterUtil
   */
  public getCurrentRoute(): string {
    return this.currentRoute;
  }

  /**
   * setCurrentRoute
   * @param {string} value
   * @memberof RouterUtil
   */
  public setCurrentRoute(value: string) {
    this.currentRoute = value;
  }

  /**
   * isRouteActive
   * @param {string} routeStr
   * @returns {boolean}
   * @memberof RouterUtil
   */
  public isRouteActive(routeStr: string): boolean {
    return routeStr === this.currentRoute;
  }

}
