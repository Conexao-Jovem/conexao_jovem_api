import { Module } from '@nestjs/common';
import { MinisterysService } from './ministerys.service';
import { MinisterysController } from './ministerys.controller';

@Module({
  controllers: [MinisterysController],
  providers: [MinisterysService],
})
export class MinisterysModule {}
