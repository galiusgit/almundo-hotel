import { Module } from '@nestjs/common';
import { AppHotelController } from './app.hotel.controller';
import { HotelService } from './app.hotel.service';
import { SqliteManager } from './app.sqlite.manager';

@Module({
  imports: [],
  components: [HotelService, SqliteManager],
  exports: [HotelService, SqliteManager],
  controllers: [AppHotelController],
})
export class AppHotelApiModule {

  constructor() { }
}
