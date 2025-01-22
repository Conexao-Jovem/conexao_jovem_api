/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  /**
   * Identificador único do usuário.
   * @type {number}
   */
  @IsInt()
  @IsNotEmpty()
  id: number;

  /**
   * Nome completo do usuário.
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Endereço de e-mail do usuário.
   * @type {string}
   */
  @IsEmail()
  @IsNotEmpty()
  email: string;

  /**
   * Identificador do ministério ao qual o usuário está associado.
   * @type {number}
   */
  @IsInt()
  @IsNotEmpty()
  ministeryID: number;

  /**
   * Identificador público do usuário (pode ser usado para fins de SEO ou URLs).
   * @type {string}
   */
  @IsString()
  @IsNotEmpty()
  pid: string;

  /**
   * Senha do usuário (armazenada de forma segura, como hash).
   * @type {string}
   */
  @IsString()
  @MinLength(6) // A senha deve ter pelo menos 6 caracteres
  @IsNotEmpty()
  password: string;

  /**
   * URL da imagem de perfil do usuário.
   * @type {string}
   */
  @IsUrl()
  @IsNotEmpty()
  imgUrl: string;
}
