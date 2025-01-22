import { User } from 'src/users/entities/user.entity';
import { Status } from 'src/@types/scale/status';

/**
 * Representa uma escala no sistema.
 */
export class Scale {
  /**
   * Data da escala.
   * @type {Date}
   */
  date: Date;

  /**
   * Identificador do ministério associado à escala.
   * @type {number}
   */
  ministeryID: number;

  /**
   * Identificador único da escala.
   * @type {number}
   */
  id: number;

  /**
   * Identificador público da escala (pode ser usado para fins de SEO ou URLs).
   * @type {string}
   */
  pid: string;

  /**
   * Lista de membros associados à escala.
   * @type {User[]}
   */
  members: User[];

  /**
   * Status atual da escala.
   * @type {Status}
   */
  status: Status;
}
