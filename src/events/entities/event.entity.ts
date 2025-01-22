import { Address } from 'src/@types/event/address';
import { Ticket } from 'src/@types/event/ticket';

/**
 * Representa um evento no sistema.
 */
export class Event {
  /**
   * Identificador único do evento.
   * @type {string}
   */
  id: string;

  /**
   * Data de início do evento.
   * @type {Date}
   */
  initialDate: Date;

  /**
   * Data de término do evento.
   * @type {Date}
   */
  endDate: Date;

  /**
   * Número máximo de participantes permitidos no evento.
   * @type {number}
   */
  maxMembers: number;

  /**
   * Número de membros que já compraram ingressos para o evento.
   * @type {number}
   */
  membersHasBought: number;

  /**
   * Lista de ingressos disponíveis para o evento.
   * @type {Ticket[]}
   */
  tickets: Ticket[];

  /**
   * Endereço onde o evento será realizado.
   * @type {Address}
   */
  address: Address;

  /**
   * Descrição detalhada do evento.
   * @type {string}
   */
  description: string;

  /**
   * Título ou nome do evento.
   * @type {string}
   */
  title: string;

  /**
   * Identificador do proprietário ou criador do evento.
   * @type {number}
   */
  ownerId: number;

  /**
   * Identificador público do evento (pode ser usado para fins de SEO ou URLs).
   * @type {string}
   */
  pid: string;
}
