import { Module } from '@nestjs/common';
import { AppHotelController } from './app.hotel.controller';
import { HotelService } from './app.hotel.service';
import { SqliteManager } from './app.sqlite.manager';

/**
 * AppHotelApiModule
 * @export
 * @class AppHotelApiModule
 */
@Module({
  imports: [],
  components: [HotelService, SqliteManager],
  exports: [HotelService, SqliteManager],
  controllers: [AppHotelController],
})
export class AppHotelApiModule {
/**
 * Creates an instance of AppHotelApiModule.
 * @memberof AppHotelApiModule
 */
constructor() { }
}
