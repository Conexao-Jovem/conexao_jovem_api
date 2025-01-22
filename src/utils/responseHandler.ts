import { CommonResponse } from 'src/@types/interfaces/commonResponse';

/**
 * Interface para manipuladores de resposta padrão.
 */
export interface IResponseHandler {
  /**
   * Gera uma resposta de sucesso.
   *
   * @param {string} operation Tipo de operação executada (GET, POST, PATCH, DELETE).
   * @param {string} entityName Nome da entidade afetada pela operação.
   * @param {number} status Código de status HTTP da resposta.
   * @param {unknown} data Dados resultantes da operação.
   * @returns {CommonResponse} Objeto contendo a mensagem de sucesso, status e dados.
   * @example
   * const response = responseHandler.success('POST', 'user', 201, { id: 1 });
   * console.log(response);
   */
  success(
    operation: string,
    entityName: string,
    status: number,
    data: unknown,
  ): CommonResponse;

  /**
   * Gera uma resposta de erro.
   *
   * @param {string} operation Tipo de operação executada (GET, POST, PATCH, DELETE).
   * @param {Error} error Objeto de erro contendo a mensagem do problema.
   * @returns {CommonResponse} Objeto contendo a mensagem de erro, status e detalhes do erro.
   * @example
   * const errorResponse = responseHandler.error('GET', new Error('User not found'));
   * console.log(errorResponse);
   */
  error(operation: string, error: Error): CommonResponse;
}

/**
 * Implementação padrão de um manipulador de respostas.
 */
export class ResponseHandler implements IResponseHandler {
  /**
   * Gera uma resposta de sucesso.
   *
   * @param {'GET' | 'POST' | 'PATCH' | 'DELETE'} operation Tipo de operação executada.
   * @param {string} entityName Nome da entidade afetada pela operação.
   * @param {number} status Código de status HTTP da resposta.
   * @param {unknown} data Dados resultantes da operação.
   * @returns {CommonResponse} Objeto contendo a mensagem de sucesso, status e dados.
   * @example
   * const response = responseHandler.success('POST', 'user', 201, { id: 1 });
   * console.log(response);
   */
  success(
    operation: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    entityName: string,
    status: number,
    data: unknown = {},
  ): CommonResponse {
    return {
      message: `Sucesso na operação: ${operation} de ${entityName}`,
      status,
      data,
    };
  }

  /**
   * Gera uma resposta de erro.
   *
   * @param {'GET' | 'POST' | 'PATCH' | 'DELETE'} operation Tipo de operação executada.
   * @param {Error} error Objeto de erro contendo a mensagem do problema.
   * @returns {CommonResponse} Objeto contendo a mensagem de erro, status e detalhes do erro.
   * @example
   * const errorResponse = responseHandler.error('GET', new Error('User not found'));
   * console.log(errorResponse);
   */
  error(
    operation: 'GET' | 'POST' | 'PATCH' | 'DELETE',
    error: Error,
  ): CommonResponse {
    return {
      message: `Erro na operação: ${operation}`,
      status: 500,
      data: { error: error.message },
    };
  }
}
