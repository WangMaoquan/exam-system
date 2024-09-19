import { Body, Controller, Get, Post } from '@nestjs/common';
import { ExamService } from './exam.service';
import { MessagePattern } from '@nestjs/microservices';
import { RequireLogin, UserInfo } from '@app/common';
import { ExamAddDto } from './dto/exam-add.dto';

@Controller()
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  // messagePattern 说明是 微服务通信
  @MessagePattern('sum')
  sun(arr: number[]): number {
    return arr.reduce((total, item) => total + item, 0);
  }

  @Post('add')
  @RequireLogin()
  async add(@Body() dto: ExamAddDto, @UserInfo('userId') userId: number) {
    return this.examService.add(dto, userId);
  }

  @Get('list')
  @RequireLogin()
  async list(@UserInfo('userId') userId: number) {
    return this.examService.list(userId);
  }
}
