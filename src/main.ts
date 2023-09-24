import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  // Enable CORS for your React app's origin (http://localhost:3001 in this case)
  app.use(
    cors({
      origin: 'http://localhost:3001',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true, // Allow cookies and credentials to be sent with the request
    }),
  );

  await app.listen(3000);
}
bootstrap();
