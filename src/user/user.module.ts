import { Module } from '@nestjs/common';
import { OtpModule } from '../otp/otp.module';
import { PrismaService } from '../prisma.service';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [OtpModule],
  controllers: [UsersController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
