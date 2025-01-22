import { CommonResponse } from './commonResponse';

/**
 * Interface genérica para serviços CRUD.
 *
 * @template FIND Tipo de retorno para busca individual.
 * @template FINDALL Tipo de retorno para busca de todos os registros.
 * @template CREATE Tipo de dados esperados para criação de registros.
 * @template UPDATE Tipo de dados esperados para atualização de registros, padrão como uma versão parcial de `CREATE`.
 */
export interface ICRUDService<FIND, FINDALL, CREATE, UPDATE = Partial<CREATE>> {
  /**
   * Obtém todos os registros.
   *
   * @returns {Promise<FINDALL>} Uma promessa contendo todos os registros.
   * @example
   * const users = await crudService.findAll();
   * console.log(users);
   */
  findAll(): Promise<FINDALL>;

  /**
   * Busca um registro pelo ID.
   *
   * @param {number} id O ID do registro.
   * @returns {Promise<FIND | null>} Uma promessa contendo o registro encontrado ou `null` caso não exista.
   * @example
   * const user = await crudService.findByID(1);
   * console.log(user);
   */
  findByID(id: number): Promise<FIND | null>;

  /**
   * Busca um registro pelo PID (opcional).
   *
   * @param {string} pid O PID do registro.
   * @returns {Promise<FIND | null>} Uma promessa contendo o registro encontrado ou `null` caso não exista.
   * @example
   * const user = await crudService.findByPID('abc123');
   * console.log(user);
   */
  findByPID?(pid: string): Promise<FIND | null>;

  /**
   * Cria um novo registro.
   *
   * @param {CREATE} data Dados necessários para criar o registro.
   * @returns {Promise<CommonResponse>} Uma promessa contendo a resposta com o status da operação e o registro criado.
   * @example
   * const newUser = await crudService.create({ name: 'John Doe', email: 'john.doe@example.com' });
   * console.log(newUser);
   */
  create(data: CREATE): Promise<CommonResponse>;

  /**
   * Atualiza um registro existente.
   *
   * @param {number} id O ID do registro.
   * @param {UPDATE} partialData Dados parciais para atualização.
   * @returns {Promise<CommonResponse>} Uma promessa contendo a resposta com o status da operação.
   * @example
   * const updatedUser = await crudService.update(1, { name: 'Jane Doe' });
   * console.log(updatedUser);
   */
  update(id: number, partialData: UPDATE): Promise<CommonResponse>;

  /**
   * Exclui um registro pelo ID.
   *
   * @param {number} id O ID do registro a ser excluído.
   * @returns {Promise<CommonResponse>} Uma promessa contendo a resposta com o status da operação.
   * @example
   * const deletedUser = await crudService.delete(1);
   * console.log(deletedUser);
   */
  delete(id: number): Promise<CommonResponse>;
}
