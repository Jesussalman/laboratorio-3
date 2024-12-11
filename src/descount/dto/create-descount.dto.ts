import { IsArray, IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from "class-validator";

export class CreateDescountDto {


    @IsString()
    @IsNotEmpty()
    @MinLength(3)    
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    percentage: number;

    @IsNumber()
    amount: number;

    @IsDate()
    @IsNotEmpty()
    StartDate: Date;

    @IsDate()
    @IsNotEmpty()
    endDate: Date;


}

