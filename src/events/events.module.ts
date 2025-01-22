import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { ResponseHandler } from 'src/utils/responseHandler';

@Module({
  controllers: [EventsController],
  providers: [EventsService, ResponseHandler],
})
export class EventsModule {}
