import { Inject, Injectable } from '@nestjs/common';
import {
  DocumentData,
  Firestore,
  UpdateData,
  WithFieldValue,
} from 'firebase-admin/firestore';
import { ICRUDService } from '../interfaces/ICRUD.service';
import { CommonResponse } from '../interfaces/commonResponse';
import { IResponseHandler } from 'src/utils/responseHandler';

@Injectable()
export abstract class FirestoreServiceCRUD<
  FIND,
  FINDALL,
  CREATE extends WithFieldValue<DocumentData>,
  UPDATE extends UpdateData<CREATE>,
> implements ICRUDService<FIND, FINDALL, CREATE, UPDATE>
{
  constructor(
    @Inject('FIRESTORE')
    protected readonly firestore: Firestore,
    protected readonly collectionName: string,
    protected readonly responseHandler: IResponseHandler,
  ) {}

  async findAll(): Promise<FINDALL> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FINDALL;
  }

  async findByID(id: string): Promise<FIND | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as FIND;
  }

  async findByPID(pid: string): Promise<FIND | null> {
    const doc = await this.findDocumentByField('pid', pid);
    if (!doc) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as FIND;
  }

  async create(data: CREATE): Promise<CommonResponse> {
    return this.executeCrudOperation('POST', async () => {
      const newDoc = await this.collection.add(data);
      return { id: newDoc.id, ...data };
    });
  }

  async update(id: string, partialData: UPDATE): Promise<CommonResponse> {
    return this.executeCrudOperation('PATCH', async () => {
      await this.ensureDocumentExists(id);
      await this.collection.doc(id).update(partialData);
      return { id, ...partialData };
    });
  }

  async delete(id: string): Promise<CommonResponse> {
    return this.executeCrudOperation('DELETE', async () => {
      await this.ensureDocumentExists(id);
      await this.collection.doc(id).delete();
      return { id };
    });
  }

  protected get collection() {
    return this.firestore.collection(this.collectionName);
  }

  private async findDocumentByField(
    field: string,
    value: string | number,
  ): Promise<FirebaseFirestore.DocumentSnapshot | null> {
    const query = await this.collection.where(field, '==', value).get();
    if (query.empty) {
      return null;
    }
    return query.docs[0];
  }

  private async ensureDocumentExists(id: string): Promise<void> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) {
      throw new Error('Documento não encontrado');
    }
  }

  private async executeCrudOperation<T>(
    operation: 'POST' | 'PATCH' | 'DELETE',
    action: () => Promise<T>,
  ): Promise<CommonResponse> {
    try {
      const result = await action();
      return this.responseHandler.success(
        operation,
        this.collectionName,
        200,
        result,
      );
    } catch (error) {
      return this.responseHandler.error(
        operation,
        error instanceof Error ? error : new Error('Erro desconhecido'),
      );
    }
  }
}
