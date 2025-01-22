import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MinisterysService } from './ministerys.service';
import { CreateMinisteryDto } from './dto/create-ministery.dto';
import { UpdateMinisteryDto } from './dto/update-ministery.dto';

@Controller('ministerys')
export class MinisterysController {
  constructor(private readonly ministerysService: MinisterysService) {}

  @Post()
  create(@Body() createMinisteryDto: CreateMinisteryDto) {
    return this.ministerysService.create(createMinisteryDto);
  }

  @Get()
  findAll() {
    return this.ministerysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ministerysService.findByID(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMinisteryDto: UpdateMinisteryDto,
  ) {
    return this.ministerysService.update(+id, updateMinisteryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ministerysService.delete(+id);
  }
}
