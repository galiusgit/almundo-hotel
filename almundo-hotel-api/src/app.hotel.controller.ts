import { Get, Controller } from '@nestjs/common';
import { AppService } from 'app.service';

@Controller()
export class AppHotelController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return this.appService.root();
  }
}
