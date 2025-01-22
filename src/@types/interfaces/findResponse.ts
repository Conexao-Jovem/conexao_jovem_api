/**
 * Interface genérica para respostas de busca com paginação.
 *
 * @template T Tipo de dado retornado na busca.
 */
export interface FindResponse<T> {
  /**
   * Dados retornados pela busca.
   *
   * @type {T[]}
   * @example
   * [{ id: 1, name: "John Doe" }, { id: 2, name: "Jane Doe" }]
   */
  data: T[];

  /**
   * Número total de resultados disponíveis para a busca.
   *
   * @type {number}
   * @example
   * 100
   */
  totalCount: number;

  /**
   * Página atual da busca.
   *
   * @type {number}
   * @example
   * 1
   */
  currentPage: number;

  /**
   * Número de itens por página.
   *
   * @type {number}
   * @example
   * 10
   */
  itemsPerPage: number;

  /**
   * Número total de páginas.
   *
   * @type {number}
   * @example
   * 10
   */
  totalPages: number;
}
