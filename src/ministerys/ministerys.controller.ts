import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.ministerysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMinisteryDto: UpdateMinisteryDto) {
    return this.ministerysService.update(+id, updateMinisteryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ministerysService.remove(+id);
  }
}
