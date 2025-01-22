import { Inject, Injectable } from '@nestjs/common';
import { CreateScaleDto } from './dto/create-scale.dto';
import { UpdateScaleDto } from './dto/update-scale.dto';
import { FirestoreServiceCRUD } from 'src/@types/models/firestore.service';
import { Scale } from './entities/scale.entity';
import { FindResponse } from 'src/@types/interfaces/findResponse';
import { Firestore } from 'firebase-admin/firestore';
import { ResponseHandler } from 'src/utils/responseHandler';

@Injectable()
export class ScalesService extends FirestoreServiceCRUD<
  Scale,
  FindResponse<Scale>,
  CreateScaleDto,
  UpdateScaleDto
> {
  constructor(
    @Inject('FIRESTORE') firestore: Firestore,
    responseHandler: ResponseHandler,
  ) {
    super(firestore, 'scales', responseHandler);
  }
}
