import { Injectable } from '@nestjs/common';
import { CreateMinisteryDto } from './dto/create-ministery.dto';
import { UpdateMinisteryDto } from './dto/update-ministery.dto';

@Injectable()
export class MinisterysService {
  create(createMinisteryDto: CreateMinisteryDto) {
    return 'This action adds a new ministery';
  }

  findAll() {
    return `This action returns all ministerys`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ministery`;
  }

  update(id: number, updateMinisteryDto: UpdateMinisteryDto) {
    return `This action updates a #${id} ministery`;
  }

  remove(id: number) {
    return `This action removes a #${id} ministery`;
  }
}
