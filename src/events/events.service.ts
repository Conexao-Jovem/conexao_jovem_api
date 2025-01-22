import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { FirestoreServiceCRUD } from 'src/@types/models/firestore.service';
import { FindResponse } from 'src/@types/interfaces/findResponse';
import { Firestore } from 'firebase-admin/firestore';
import { ResponseHandler } from 'src/utils/responseHandler';

@Injectable()
export class EventsService extends FirestoreServiceCRUD<
  Event,
  FindResponse<Event>,
  CreateEventDto,
  UpdateEventDto
> {
  constructor(
    @Inject('FIRESTORE') firestore: Firestore,
    responseHandler: ResponseHandler,
  ) {
    super(firestore, 'events', responseHandler);
  }
}
