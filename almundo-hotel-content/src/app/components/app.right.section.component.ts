import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HotelModel } from '../../../../common-hotel-dependencies/src/hotel/models/HotelModel';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-right-section',
  templateUrl: './app.right.section.component.html',
})
export class AppRightSectionComponent implements OnInit {
  public title: string = 'App Right Section Component';
  public hotels: Array<HotelModel> = [];

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.route
      .queryParams
      .subscribe(params => {
        // Defaults to 0 if no query param provided.
        console.log('params: ', params);
        this.hotelService.findFilterHotels({
          name: params.name ? params.name : '',
          stars: params.stars ? params.stars : [],
        }).then((hotelLisResponse: Array<HotelModel>) => {
          this.hotels = hotelLisResponse;
        });
      });
  }
}