import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

declare const module: any;

const SERVER_PORT: number = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();