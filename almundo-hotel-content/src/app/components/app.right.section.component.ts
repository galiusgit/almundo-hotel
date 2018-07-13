import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HotelModel } from '../../../../common-hotel-dependencies/src/hotel/models/HotelModel';
import { HotelService } from '../services/hotel.service';
/**
 * AppRightSectionComponent
 * @export
 * @class AppRightSectionComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-right-section',
  templateUrl: './app.right.section.component.html',
})
export class AppRightSectionComponent implements OnInit {
  /**
   * @type {string}
   * @memberof AppRightSectionComponent
   */
  public title: string = 'App Right Section Component';

  /**
   * @type {Array<HotelModel>}
   * @memberof AppRightSectionComponent
   */
  public hotels: Array<HotelModel> = [];

  /**
   * Creates an instance of AppRightSectionComponent.
   * @param {HotelService} hotelService
   * @param {ActivatedRoute} route
   * @param {Router} router
   * @memberof AppRightSectionComponent
   */
  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  /**
   * ngOnInit
   * @memberof AppRightSectionComponent
   */
  public ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        this.hotelService.findFilterHotels({
          name: params.name ? params.name : '',
          stars: params.stars ? params.stars : [],
        }).then((hotelLisResponse: Array<HotelModel>) => {
          this.hotels = hotelLisResponse;
        });
      });
  }
}