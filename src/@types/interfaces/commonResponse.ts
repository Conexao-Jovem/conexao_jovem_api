/**
 * Interface para a estrutura de resposta padrão em operações de CRUD.
 */
export interface CommonResponse {
  /**
   * Mensagem descrevendo o resultado da operação.
   *
   * @type {string}
   * @example
   * "Sucesso na operação: GET de usuários"
   */
  message: string;

  /**
   * Código de status HTTP representando o resultado da operação.
   *
   * @type {number}
   * @example
   * 200 // Operação bem-sucedida
   * @example
   * 500 // Erro interno do servidor
   */
  status: number;

  /**
   * Dados adicionais relacionados à resposta, se aplicável.
   *
   * @type {unknown}
   * @example
   * { id: 1, name: 'John Doe', email: 'john.doe@example.com' }
   */
  data?: unknown;
}
