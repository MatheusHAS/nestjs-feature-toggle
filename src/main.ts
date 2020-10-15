import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import register from '@react-ssr/nestjs-express/register';

(async () => {
  const appInstance = await NestFactory.create<NestExpressApplication>(AppModule);
  await register(appInstance);

  const PORT = process.env.PORT || 3000;
  await appInstance.listen(PORT, async () => {
    console.log(`Started on port ${PORT}`);
  });
})();
