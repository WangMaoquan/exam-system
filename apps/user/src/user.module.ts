import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RedisModule } from '@app/redis';
import { EmailModule } from '@app/email';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    RedisModule,
    EmailModule,
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: 'decade',
          signOptions: {
            expiresIn: '30m', // 默认 30 分钟
          },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
