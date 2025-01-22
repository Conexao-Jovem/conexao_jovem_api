/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { User } from 'src/users/entities/user.entity';

/**
 * DTO (Data Transfer Object) para a criação de um novo ministério.
 */
export class CreateMinisteryDto {
  /**
   * Nome do ministério.
   * @type {string}
   * @example "Ministério de Música"
   */
  @IsString()
  @IsNotEmpty()
  name: string;

  /**
   * Lista de membros associados ao ministério.
   * @type {User[]}
   * @example [{ id: 1, name: "João Silva" }, { id: 2, name: "Maria Souza" }]
   */
  @IsArray()
  members?: User[];

  /**
   * Nome ou identificação do principal responsável pelo ministério.
   * @type {string}
   * @example "João Silva"
   */
  @IsString()
  @IsNotEmpty()
  principal: string;

  /**
   * URL da imagem associada ao ministério.
   * @type {string}
   * @example "https://example.com/ministery-image.jpg"
   */
  @IsUrl()
  imgUrl: string;
}
