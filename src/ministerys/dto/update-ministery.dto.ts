import { PartialType } from '@nestjs/mapped-types';
import { CreateMinisteryDto } from './create-ministery.dto';

export class UpdateMinisteryDto extends PartialType(CreateMinisteryDto) {}
