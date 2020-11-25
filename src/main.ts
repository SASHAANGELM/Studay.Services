import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import firebaseAdmin from './firebase/config';

const PORT = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
