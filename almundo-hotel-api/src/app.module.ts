import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppHotelController } from './app.hotel.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, AppHotelController],
  providers: [AppService],
})
export class AppModule {}
