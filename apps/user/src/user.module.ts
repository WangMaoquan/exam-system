import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisModule } from '@app/redis';
import { EmailModule } from '@app/email';

@Module({
  imports: [RedisModule, EmailModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
