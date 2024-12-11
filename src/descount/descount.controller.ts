import { Controller, Get, Post, Body, Patch, Param, Delete, ParseArrayPipe, Query } from '@nestjs/common';
import { DescountService } from './descount.service';
import { CreateDescountDto } from './dto/create-descount.dto';
import { UpdateDescountDto } from './dto/update-descount.dto';
import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';

@Controller('descount')
export class DescountController {
  constructor(private readonly descountService: DescountService) {}

  @Post()
  create(@Body() createDescountDto: CreateDescountDto) {
    return this.descountService.create(createDescountDto);
  }

  @Get()
  findAll( @Query() paginationDto: PaginationDto ) {
    return this.descountService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseArrayPipe) id: string) {
    return this.descountService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseArrayPipe) id: string, @Body() updateDescountDto: UpdateDescountDto) {
    return this.descountService.update(id, updateDescountDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseArrayPipe) id: string) {
    return this.descountService.remove(id);
  }
}
