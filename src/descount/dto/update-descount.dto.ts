import { PartialType } from '@nestjs/mapped-types';
import { CreateDescountDto } from './create-descount.dto';

export class UpdateDescountDto extends PartialType(CreateDescountDto) {}
