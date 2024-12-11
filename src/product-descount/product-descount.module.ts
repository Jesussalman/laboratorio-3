import { Module } from '@nestjs/common';
import { productDescountService, } from './product-descount.service';
import { ProductDescountController } from './product-descount.controller';

@Module({
  controllers: [ProductDescountController],
  providers: [productDescountService],
})
export class ProductDescountModule {}
