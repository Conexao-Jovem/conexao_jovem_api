import { Inject, Injectable } from '@nestjs/common';
import { CreateMinisteryDto } from './dto/create-ministery.dto';
import { UpdateMinisteryDto } from './dto/update-ministery.dto';
import { FirestoreServiceCRUD } from 'src/@types/models/firestore.service';
import { Ministery } from './entities/ministery.entity';
import { FindResponse } from 'src/@types/interfaces/findResponse';
import { Firestore } from 'firebase-admin/firestore';
import { ResponseHandler } from 'src/utils/responseHandler';

@Injectable()
export class MinisterysService extends FirestoreServiceCRUD<
  Ministery,
  FindResponse<Ministery>,
  CreateMinisteryDto,
  UpdateMinisteryDto
> {
  constructor(
    @Inject('FIRESTORE') firestore: Firestore,
    responseHandler: ResponseHandler,
  ) {
    super(firestore, 'ministerys', responseHandler);
  }
}
