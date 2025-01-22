import { Module } from '@nestjs/common';
import { ScalesService } from './scales.service';
import { ScalesController } from './scales.controller';
import { ResponseHandler } from 'src/utils/responseHandler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [ScalesController],
  providers: [ScalesService, ResponseHandler],
})
export class ScalesModule {}
