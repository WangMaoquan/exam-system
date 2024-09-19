import { NestFactory } from '@nestjs/core';
import { ExamModule } from './exam.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(ExamModule);

  // 获取微服务的实例
  const microService = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  // 开启微服务
  await microService.listen();
  // await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
