/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsArray,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { User } from 'src/users/entities/user.entity'; // A classe User
import { Status } from 'src/@types/scale/status'; // A classe Status

export class CreateScaleDto {
  /**
   * Data da escala.
   * @type {Date}
   */
  @IsDate()
  @IsNotEmpty()
  date: Date;

  /**
   * Identificador do ministério associado à escala.
   * @type {number}
   */
  @IsInt()
  @IsNotEmpty()
  ministeryID: number;

  /**
   * Identificador único da escala.
   * @type {number}
   */
  @IsInt()
  @IsNotEmpty()
  id: number;

  /**
   * Lista de membros associados à escala.
   * @type {User[]}
   */
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => User)
  members: User[];

  /**
   * Status atual da escala.
   * @type {Status}
   */
  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
