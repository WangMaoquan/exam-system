import { Controller, Get } from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Get()
  getHello(): string {
    return this.examService.getHello();
  }

  // messagePattern 说明是 微服务通信
  @MessagePattern('sum')
  sun(arr: number[]): number {
    return arr.reduce((total, item) => total + item, 0);
  }
}
