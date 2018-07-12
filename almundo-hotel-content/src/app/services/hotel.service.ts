import { Injectable } from '@angular/core';
import { HotelModel } from '../models/HotelModel';

@Injectable()
export class HotelService {

  constructor() { }

  public getHotelList(): Array<HotelModel> {
    return [
      {
        "id": 249942,
        "name": "Hotel Stefanos",
        "stars": 3,
        "price": 994.18,
        "image": "4900059_30_b.jpg",
        "amenities": [
          "safety-box",
          "nightclub",
          "deep-soaking-bathtub",
          "beach",
          "business-center"
        ]
      },
      {
        "id": 161901,
        "name": "Hotel Santa Cruz",
        "stars": 3,
        "price": 1267.57,
        "image": "6623490_6_b.jpg",
        "amenities": [
          "nightclub",
          "business-center",
          "bathtub",
          "newspaper",
          "restaurant"
        ]
      },
      {
        "id": 161914,
        "name": "NM Lima Hotel",
        "stars": 4,
        "price": 1445.5,
        "image": "981018_26_b.jpg",
        "amenities": [
          "business-center",
          "nightclub",
          "deep-soaking-bathtub",
          "fitness-center",
          "garden"
        ]
      },
    ];
  }

}
