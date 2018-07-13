import { NestFactory } from '@nestjs/core';
import { AppHotelApiModule } from './app.hotel.api.module';

declare const module: any;

const SERVER_PORT: number = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppHotelApiModule);
  await app.listen(SERVER_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();