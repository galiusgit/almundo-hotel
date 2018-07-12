import { Component, OnInit } from '@angular/core';
import { HotelModel } from '../../../../common-hotel-dependencies/src/hotel/models/HotelModel';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-right-section',
  templateUrl: './app.right.section.component.html',
})
export class AppRightSectionComponent implements OnInit{
  public title: string = 'App Right Section Component';
  public hotels: Array<HotelModel> = [];

  constructor(private hotelService: HotelService){}

  public ngOnInit(): void{
    this.hotels = this.hotelService.getHotelList();
    // this.hotelService.getHotelList2().then((val) => console.log(val));
  }
}