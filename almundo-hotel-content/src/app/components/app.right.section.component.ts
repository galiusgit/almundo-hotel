import { Component, OnInit } from '@angular/core';
import { HotelModel } from '../models/HotelModel';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-right-section',
  templateUrl: './app.right.section.component.html'
})
export class AppRightSectionComponent implements OnInit{
  public title: string = "App Right Section Component";
  public hotels: Array<HotelModel> = [];

  private hotelService:HotelService

  constructor(hotelService:HotelService){
    this.hotelService = hotelService;
  }

  public ngOnInit(): void{
    this.hotels = this.hotelService.getHotelList();
  }
  
}