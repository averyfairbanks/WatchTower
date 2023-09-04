import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'debug', 'fatal', 'log', 'warn', 'verbose'] });
  await app.listen(3000);
  console.log(`Server started on port ${await app.getUrl()}`);
}
bootstrap();
