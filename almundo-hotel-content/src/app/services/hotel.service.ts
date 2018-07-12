import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HotelModel } from '../../../../common-hotel-dependencies/src/hotel/models/HotelModel';

@Injectable()
export class HotelService {

  constructor(private http: Http) { }

  public getHotelList(): Array<HotelModel> {
    return [];
  }

  public getHotelList2(){
    return this.http.get('http://localhost:3000/hotel-api/list').toPromise();
  }

}
