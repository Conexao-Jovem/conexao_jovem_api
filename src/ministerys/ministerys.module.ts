import { Module } from '@nestjs/common';
import { MinisterysService } from './ministerys.service';
import { MinisterysController } from './ministerys.controller';
import { ConfigModule } from '@nestjs/config';
import { ResponseHandler } from 'src/utils/responseHandler';

@Module({
  imports: [ConfigModule],
  controllers: [MinisterysController],
  providers: [MinisterysService, ResponseHandler],
})
export class MinisterysModule {}
