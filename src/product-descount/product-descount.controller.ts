import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductDescountService } from './product-descount.service';
import { CreateproductDescountDto } from './dto/create-product-descount.dto';
import { UpdateProductDescountDto } from './dto/update-product-descount.dto';

@Controller('product-descount')
export class ProductDescountController {
  constructor(private readonly productDescountService: ProductDescountService) {}

  @Post()
  create(@Body() createProductDescountDto: CreateproductDescountDto) {
    return this.productDescountService.create(createProductDescountDto);
  }

  @Get()
  findAll() {
    return this.productDescountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDescountService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDescountDto: UpdateProductDescountDto) {
    return this.productDescountService.update(+id, updateProductDescountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDescountService.remove(id);
  }
}
