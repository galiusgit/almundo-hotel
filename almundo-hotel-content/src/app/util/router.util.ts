import { Injectable } from '@angular/core';

@Injectable()
export class RouterUtil {

  private currentRoute: string;

  constructor() { }

  public getCurrentRoute(): string {
    return this.currentRoute;
  }

  public setCurrentRoute(value: string) {
    this.currentRoute = value;
  }

  public isRouteActive(routeStr: string): boolean{
    return routeStr === this.currentRoute;
  }

}
