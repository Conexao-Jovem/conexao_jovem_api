import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreServiceCRUD } from 'src/@types/models/firestore.service';
import { FindResponse } from 'src/@types/interfaces/findResponse';
import { User } from './entities/user.entity';
import { ResponseHandler } from 'src/utils/responseHandler';

@Injectable()
export class UsersService extends FirestoreServiceCRUD<
  User,
  FindResponse<User>,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(
    @Inject('FIRESTORE') firestore: Firestore,
    responseHandler: ResponseHandler,
  ) {
    super(firestore, 'users', responseHandler);
  }
}
