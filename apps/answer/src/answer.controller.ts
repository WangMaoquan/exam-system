import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RequireLogin, UserInfo } from '@app/common';
import { AnswerAddDto } from './dto/answer-add.dto';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Inject('EXAM_SERVICE')
  private examClient: ClientProxy;

  @Get()
  async getHello() {
    const value = await firstValueFrom(this.examClient.send('sum', [1, 3, 5]));
    return value;
  }

  @Post('add')
  @RequireLogin()
  async add(@Body() addDto: AnswerAddDto, @UserInfo('userId') userId: number) {
    return this.answerService.add(addDto, userId);
  }
}
