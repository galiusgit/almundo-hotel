import { Get, Controller, Req, Res, HttpStatus, Query } from '@nestjs/common';
import { Response, Request } from 'express';
import { HotelModel } from '../../common-hotel-dependencies/src/hotel/models/HotelModel';
import { FilterRequestModel } from '../../common-hotel-dependencies/src/hotel/models/FilterRequestModel';
import { LoggerUtil } from '../../common-hotel-dependencies/src/shared-module/core/util/LoggerUtil';
import { HotelService } from './app.hotel.service';

const logger: LoggerUtil = new LoggerUtil('AppHotelController', __filename);
/**
 * @export
 * @class AppHotelController
 */
@Controller('hotel-api')
export class AppHotelController {

  /**
   * Creates an instance of AppHotelController.
   * @param {HotelService} hotelService
   * @memberof AppHotelController
   */
  constructor(private readonly hotelService: HotelService) { }

  /**
   * getStaticHotelList
   * @param {Request} req
   * @returns {Array<HotelModel>}
   * @memberof AppHotelController
   */
  @Get('static-list')
  public getStaticHotelList(@Req() req: Request): Array<HotelModel> {
    logger.log('------> getHotelList' + req.url);
    return this.hotelService.getStaticHotelList();
  }

  /**
   * findAllHotels
   * @param {Response} res
   * @returns {Array<HotelModel>}
   * @memberof AppHotelController
   */
  @Get('list')
  public findAllHotels(@Res() res: Response): Array<HotelModel> {
    return this.hotelService.findAllHotels(res);
  }

  /**
   * findFilterHotels
   * @param {Response} res
   * @param {FilterRequestModel} filterRequest
   * @returns {Array<HotelModel>}
   * @memberof AppHotelController
   */
  @Get('filter-list')
  public findFilterHotels(@Res() res: Response, @Query() filterRequest: FilterRequestModel): Array<HotelModel> {
    logger.log('filterRequest: ', filterRequest);
    return this.hotelService.findFilterHotels(filterRequest, res);
  }

  /**
   * getAllEmployees
   * @param {Request} req
   * @param {Response} res
   * @returns {Array<string>}
   * @memberof AppHotelController
   */
  @Get('employees')
  public getAllEmployees(@Req() req: Request, @Res() res: Response): Array<string> {
    logger.log('------> getAllEmployees' + req.url);
    res.status(HttpStatus.OK).json(['hola1']);
    return [];
  }
}
