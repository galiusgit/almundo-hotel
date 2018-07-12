import { Get, Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { HotelModel } from '../../common-hotel-dependencies/src/hotel/models/HotelModel';

const hotelListConst: Array<HotelModel> = require('../resource/data.json');

@Controller('hotel-api')
export class AppHotelController {
  constructor(private readonly appService: AppService) { }

  @Get('list')
  public getHotelList(): Array<HotelModel> {
    this.appService.root();
    return hotelListConst;
  }
}
