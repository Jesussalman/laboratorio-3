import { Module } from '@nestjs/common';
import { DescountService } from './descount.service';
import { DescountController } from './descount.controller';
import { DescountEntity } from './entities/descount.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DescountController],
  providers: [DescountService],

  imports: [
    TypeOrmModule.forFeature([
      DescountEntity

    ]),
  ]
})
export class DescountModule {}
