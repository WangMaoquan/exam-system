import { Inject, Injectable } from '@nestjs/common';
import { AnswerAddDto } from './dto/answer-add.dto';
import { PrismaService } from '@app/prisma';

@Injectable()
export class AnswerService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async add(dto: AnswerAddDto, userId: number) {
    return this.prismaService.answer.create({
      data: {
        content: dto.content,
        score: 0,
        answerer: {
          connect: {
            id: userId,
          },
        },
        exam: {
          connect: {
            id: dto.examId,
          },
        },
      },
    });
  }
}
