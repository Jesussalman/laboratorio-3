import { PartialType } from '@nestjs/mapped-types';
import { CreateproductDescountDto } from './create-product-descount.dto';

export class UpdateProductDescountDto extends PartialType(CreateproductDescountDto) {}
