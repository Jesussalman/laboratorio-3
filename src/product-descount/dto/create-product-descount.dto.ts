import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";
import { productDescountEntity } from "../entities/product-descount.entity";
import { DescountEntity } from "@/descount/entities/descount.entity";

export class CreateproductDescountDto {


    @IsString()
    @IsNotEmpty()    
    product: string;

    @IsString()
    @IsNotEmpty()    
    descount: string;

    
}
