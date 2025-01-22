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

/**
 * Serviço abstrato para operações CRUD utilizando Firestore.
 *
 * @template FIND Tipo retornado em operações de busca única.
 * @template FINDALL Tipo retornado em operações de busca de múltiplos documentos.
 * @template CREATE Tipo de dados necessários para criar um novo documento.
 * @template UPDATE Tipo de dados para atualizar um documento existente.
 */
@Injectable()
export abstract class FirestoreServiceCRUD<
  FIND,
  FINDALL,
  CREATE extends WithFieldValue<DocumentData>,
  UPDATE extends UpdateData<CREATE>,
> implements ICRUDService<FIND, FINDALL, CREATE, UPDATE>
{
  /**
   * Construtor do FirestoreService.
   *
   * @param {Firestore} firestore Instância do Firestore.
   * @param {string} collectionName Nome da coleção no Firestore.
   * @param {IResponseHandler} responseHandler Manipulador de respostas.
   * @example
   * const firestoreService = new UserService(firestoreInstance, 'users', responseHandler);
   */
  constructor(
    @Inject('FIRESTORE')
    protected readonly firestore: Firestore,
    protected readonly collectionName: string,
    protected readonly responseHandler: IResponseHandler,
  ) {}

  /**
   * Busca todos os documentos na coleção.
   *
   * @returns {Promise<FINDALL>} Lista de documentos na coleção.
   * @example
   * const users = await firestoreService.findAll();
   * console.log(users);
   */
  async findAll(): Promise<FINDALL> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as FINDALL;
  }

  /**
   * Busca um documento pelo ID.
   *
   * @param {number} id Identificador do documento.
   * @returns {Promise<FIND | null>} Documento encontrado ou null.
   * @example
   * const user = await firestoreService.findByID(1);
   * console.log(user);
   */
  async findByID(id: number): Promise<FIND | null> {
    const doc = await this.findByField('id', id);
    if (!doc) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as FIND;
  }

  /**
   * Busca um documento pelo PID.
   *
   * @param {string} pid Identificador público do documento.
   * @returns {Promise<FIND | null>} Documento encontrado ou null.
   * @example
   * const user = await firestoreService.findByPID('abc123');
   * console.log(user);
   */
  async findByPID(pid: string): Promise<FIND | null> {
    const doc = await this.findByField('pid', pid);
    if (!doc) {
      return null;
    }
    return { id: doc.id, ...doc.data() } as FIND;
  }

  /**
   * Cria um novo documento na coleção.
   *
   * @param {CREATE} data Dados do novo documento.
   * @returns {Promise<CommonResponse>} Resposta da operação.
   * @example
   * const newUser = await firestoreService.create({ name: 'John', age: 30 });
   * console.log(newUser);
   */
  async create(data: CREATE): Promise<CommonResponse> {
    return this.handleCrudOperation('POST', async () => {
      const newDoc = await this.collection.add(data);
      return { id: newDoc.id, ...data };
    });
  }

  /**
   * Atualiza um documento existente pelo ID.
   *
   * @param {number} id Identificador do documento.
   * @param {UPDATE} partialData Dados parciais para atualização.
   * @returns {Promise<CommonResponse>} Resposta da operação.
   * @example
   * const updatedUser = await firestoreService.update(1, { age: 31 });
   * console.log(updatedUser);
   */
  async update(id: number, partialData: UPDATE): Promise<CommonResponse> {
    return this.handleCrudOperation('PATCH', async () => {
      const doc = await this.findByField('id', id);

      if (!doc) {
        throw new Error('Documento não encontrado');
      }

      await doc.ref.update(partialData);
      return { id, ...partialData };
    });
  }

  /**
   * Deleta um documento pelo ID.
   *
   * @param {number} id Identificador do documento.
   * @returns {Promise<CommonResponse>} Resposta da operação.
   * @example
   * const deletedUser = await firestoreService.delete(1);
   * console.log(deletedUser);
   */
  async delete(id: number): Promise<CommonResponse> {
    return this.handleCrudOperation('DELETE', async () => {
      const doc = await this.findByField('id', id);

      if (!doc) {
        throw new Error('Documento não encontrado');
      }

      await doc.ref.delete();
      return { id };
    });
  }

  /**
   * Acessa a coleção configurada no Firestore.
   *
   * @protected
   * @returns {FirebaseFirestore.CollectionReference} Referência à coleção.
   */
  protected get collection() {
    return this.firestore.collection(this.collectionName);
  }

  /**
   * Busca um documento por um campo específico.
   *
   * @protected
   * @param {string} field Nome do campo.
   * @param {string | number} value Valor do campo.
   * @returns {Promise<FirebaseFirestore.DocumentSnapshot | null>} Documento encontrado ou null.
   * @example
   * const doc = await firestoreService.findByField('email', 'test@example.com');
   * console.log(doc);
   */
  private async findByField(
    field: string,
    value: string | number,
  ): Promise<FirebaseFirestore.DocumentSnapshot | null> {
    const query = await this.collection.where(field, '==', value).get();
    if (query.empty) {
      return null;
    }
    return query.docs[0];
  }

  /**
   * Manipula operações CRUD com tratamento de erros.
   *
   * @private
   * @template T Tipo do resultado esperado.
   * @param {'POST' | 'PATCH' | 'DELETE'} operation Tipo da operação CRUD.
   * @param {() => Promise<T>} action Ação a ser executada.
   * @returns {Promise<CommonResponse>} Resposta da operação.
   * @example
   * const result = await firestoreService.handleCrudOperation('POST', async () => {
   *   return { id: 1, name: 'Test' };
   * });
   * console.log(result);
   */
  private async handleCrudOperation<T>(
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
      if (error instanceof Error) {
        return this.responseHandler.error(operation, error);
      }
      return this.responseHandler.error(
        operation,
        new Error('Erro desconhecido'),
      );
    }
  }
}
