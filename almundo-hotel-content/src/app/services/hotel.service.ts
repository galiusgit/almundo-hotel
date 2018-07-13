import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { FilterRequestModel } from '../../../../common-hotel-dependencies/src/hotel/models/FilterRequestModel';

/**
 * HotelService
 * @export
 * @class HotelService
 */
@Injectable()
export class HotelService {

  /**
   * Creates an instance of HotelService.
   * @param {Http} http
   * @memberof HotelService
   */
  constructor(private http: Http) { }

  /**
   * getHotelList
   * @returns
   * @memberof HotelService
   */
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

  /**
   * findFilterHotels
   * @param {FilterRequestModel} filterRequest
   * @returns
   * @memberof HotelService
   */
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

  /**
   * objHotelMapper
   * @private
   * @param {Array<any>} hotelRowsRequest
   * @returns
   * @memberof HotelService
   */
  private objHotelMapper(hotelRowsRequest: Array<any>) {
    for (const hotelRow of hotelRowsRequest) {
      if (hotelRow.amenities) {
        hotelRow.amenities = hotelRow.amenities.split(',');
      }
    }
    return hotelRowsRequest;
  }

}
