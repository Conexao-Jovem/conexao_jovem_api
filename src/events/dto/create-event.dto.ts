/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsObject,
  IsString,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { Address } from 'src/@types/event/address';
import { Ticket } from 'src/@types/event/ticket';

export class CreateEventDto {
  /**
   * Data de início do evento.
   * @type {Date}
   */
  @IsDate()
  @IsNotEmpty()
  initialDate: Date;

  /**
   * Data de término do evento.
   * @type {Date}
   */
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  /**
   * Número máximo de participantes permitidos no evento.
   * @type {number}
   */
  @IsInt()
  @Min(1)
  @Max(1000)
  maxMembers: number;

  /**
   * Lista de ingressos disponíveis para o evento.
   * @type {Ticket[]}
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Ticket)
  tickets: Ticket[];

  /**
   * Endereço onde o evento será realizado.
   * @type {Address}
   */
  @IsObject()
  @ValidateNested()
  @Type(() => Address)
  address: Address;

  /**
   * Descrição detalhada do evento.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  description: string;

  /**
   * Título ou nome do evento.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  title: string;

  /**
   * Identificador do proprietário ou criador do evento.
   * @type {number}
   */
  @IsInt()
  @IsNotEmpty()
  ownerId: number;
}
