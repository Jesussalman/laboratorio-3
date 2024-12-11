import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/config/base.entity";
import { SupplierEntity } from "../../suppliers/entities/supplier.entity";
import { CategoryEntity } from "../../categories/entities/category.entity";
import { StockEntity } from "../../stocks/entities/stock.entity";
import { DescountEntity } from "@/descount/entities/descount.entity";
import { ProductEntity } from "@/products/entities/product.entity";

@Entity('product')
export class productDescountEntity extends BaseEntity{


    @ManyToOne(() => DescountEntity, (descount) => descount.Productdescount)
    @JoinColumn({name: "descount_id"})
    descount: string;

    @ManyToOne(() => ProductEntity, (product) => product.Productdescount)
    @JoinColumn({name: "Productdescount_id"})
    product: string;

    




  }
