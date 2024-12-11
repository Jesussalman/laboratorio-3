import { Module } from '@nestjs/common';

import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './common/config/data.source';
import { WarehousesModule } from './warehouses/warehouses.module';
import { StocksModule } from './stocks/stocks.module';
import { AuthModule } from './auth/auth.module';
import { PurchasesModule } from './purchases/purchases.module';
import { PaymentMethodsModule } from './payment-methods/payment-methods.module';
import { CustomersModule } from './customers/customers.module';
import { DescountModule } from './descount/descount.module';
import { ProductDescountModule } from './product-descount/product-descount.module';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      envFilePath: `.env.development`,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(DataSourceConfig),
    ProductsModule, 
    CategoriesModule, 
    SuppliersModule, 
    UsersModule, WarehousesModule, StocksModule, AuthModule, PurchasesModule, PaymentMethodsModule, CustomersModule, DescountModule, ProductDescountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}