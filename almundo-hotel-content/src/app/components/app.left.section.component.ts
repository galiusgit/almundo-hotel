import { Component, OnInit } from '@angular/core';
import { FilterRequestModel } from '../../../../common-hotel-dependencies/src/hotel/models/FilterRequestModel';
import { Router } from '@angular/router';
/**
 * AppLeftSectionComponent
 * @export
 * @class AppLeftSectionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-left-section',
  templateUrl: './app.left.section.component.html',
})
export class AppLeftSectionComponent implements OnInit {
  /**
   * @type {string}
   * @memberof AppLeftSectionComponent
   */
  public title: string = 'App Left Section Component';

  /**
   * @type {boolean}
   * @memberof AppLeftSectionComponent
   */
  public showHotelNameForm: boolean = true;

  /**
   * @type {boolean}
   * @memberof AppLeftSectionComponent
   */
  public showStarsRate: boolean = true;

  /**
   * @private
   * @type {Object}
   * @memberof AppLeftSectionComponent
   */
  private allOptionsMap: Object = { 1: true, 2: true, 3: true, 4: true, 5: true };

  /**
   * @type {Object}
   * @memberof AppLeftSectionComponent
   */
  public optionsMap: Object = this.allOptionsMap;

  /**
   * @memberof AppLeftSectionComponent - isAllChecked
   */
  public isAllChecked = true;
  /**
   * Creates an instance of AppLeftSectionComponent.
   * @param {Router} router
   * @memberof AppLeftSectionComponent
   */
  constructor(private router: Router) { }

  /**
   * ngOnInit
   * @memberof AppLeftSectionComponent
   */
  public ngOnInit(): void { }

  /**
   * onClickSubmit
   * @param {*} data
   * @memberof AppLeftSectionComponent
   */
  public onClickSubmit(data: any) {
    const starsResult: Array<number> = [];
    for (const optio of Object.keys(this.optionsMap)) {
      starsResult.push(parseInt(optio, 0));
    }
    const modelRequets: FilterRequestModel = {
      name: data.name,
      stars: starsResult,
    };
    this.router.navigate(['/report'], { queryParams: modelRequets });
  }

  /**
   * allChecked
   * @param {*} option
   * @param {*} event
   * @memberof AppLeftSectionComponent
   */
  public allChecked(option, event) {
    this.isAllChecked = event.target.checked;
    if (event.target.checked) {
      this.optionsMap = this.allOptionsMap;
    } else {
      this.optionsMap = {};
    }
  }

  /**
   * updateChecked
   * @param {*} option
   * @param {*} event
   * @memberof AppLeftSectionComponent
   */
  public updateChecked(option, event) {
    if (event.target.checked) {
      this.optionsMap[option] = option;
    } else {
      delete this.optionsMap[option];
    }
  }

}
