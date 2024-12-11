import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../common/config/base.entity";
import { SupplierEntity } from "../../suppliers/entities/supplier.entity";
import { CategoryEntity } from "../../categories/entities/category.entity";
import { StockEntity } from "../../stocks/entities/stock.entity";
import { productDescountEntity } from "@/product-descount/entities/product-descount.entity";

@Entity('descount')
export class DescountEntity extends BaseEntity{


    @Column({type: "varchar"})
    name: string;

    @Column({type: "varchar"})
    description: string;

    @Column()
    percentage: number;

    @Column()
    amount: number;

    @Column()
    StartDate: Date;

    @Column()
    endDate: Date;


    @OneToMany(() => productDescountEntity, (Productdescount) => Productdescount.descount)
    Productdescount: productDescountEntity[];

  }

