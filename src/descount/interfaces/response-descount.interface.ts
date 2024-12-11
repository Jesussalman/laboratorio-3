import { DescountEntity } from "../entities/descount.entity";

export interface ResponseAllProducts{
    page: number;
    lastPage: number;
    limit: number;
    total: number;
    data: DescountEntity[];
}