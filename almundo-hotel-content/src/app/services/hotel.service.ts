import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { HotelModel } from '../../../../common-hotel-dependencies/src/hotel/models/HotelModel';
import { FilterRequestModel } from '../../../../common-hotel-dependencies/src/hotel/models/FilterRequestModel';

@Injectable()
export class HotelService {

  constructor(private http: Http) { }

  public getHotelList() {
    const headersParam = new Headers({
      'Content-type': 'application/json',
    });
    return this.http.get('http://localhost:3000/hotel-api/list', { headers: headersParam })
      .toPromise()
      .then((res) => {
        return this.objHotelMapper(res.json());
      });
  }

  public findFilterHotels(filterRequest: FilterRequestModel) {
    const headersParam = new Headers({
      'Content-type': 'application/json',
    });
    return this.http.get('http://localhost:3000/hotel-api/filter-list',
      { headers: headersParam, params: filterRequest })
      .toPromise()
      .then((res) => {
        return this.objHotelMapper(res.json());
      });
  }

  private objHotelMapper(hotelRowsRequest: Array<any>) {
    for (const hotelRow of hotelRowsRequest) {
      if (hotelRow.amenities) {
        hotelRow.amenities = hotelRow.amenities.split(',');
      }
    }
    return hotelRowsRequest;
  }

}
