import { NestFactory } from '@nestjs/core';
import { ExamModule } from './exam.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ExamModule);

  // 获取微服务的实例
  const microService = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  });

  // 开启微服务
  await microService.listen();
  // await app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
