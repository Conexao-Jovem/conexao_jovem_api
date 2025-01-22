import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule } from '@nestjs/config';
import { ResponseHandler } from 'src/utils/responseHandler';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [UsersService, ResponseHandler],
})
export class UsersModule {}
