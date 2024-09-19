import { PrismaService } from '@app/prisma';
import { Inject, Injectable } from '@nestjs/common';
import { ExamAddDto } from './dto/exam-add.dto';

@Injectable()
export class ExamService {
  @Inject(PrismaService)
  private prismaService: PrismaService;

  async add(dto: ExamAddDto, userId: number) {
    return this.prismaService.exam.create({
      data: {
        name: dto.name,
        content: '',
        createUser: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async list(userId: number) {
    return this.prismaService.exam.findMany({
      where: {
        createUserId: userId,
      },
    });
  }
}
