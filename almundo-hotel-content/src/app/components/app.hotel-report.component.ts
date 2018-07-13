import { Component, OnInit } from '@angular/core';
/**
 * AppHotelReportComponent
 * @export
 * @class AppHotelReportComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-hotel-report',
  template: `
  <app-left-section class="col-xs-12 col-sm-3 col-lg-3"></app-left-section>
  <app-right-section class="col-xs-12 col-sm-9 col-lg-9"></app-right-section>
  `,
  styles: [],
})
export class AppHotelReportComponent implements OnInit {
  /**
   * Creates an instance of AppHotelReportComponent.
   * @memberof AppHotelReportComponent
   */
  constructor() { }

  /**
   * ngOnInit
   * @memberof AppHotelReportComponent
   */
  public ngOnInit() {
  }

}
