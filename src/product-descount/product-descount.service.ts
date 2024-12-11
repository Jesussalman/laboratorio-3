import { Injectable } from "@nestjs/common";
import { ManagerError } from "@/common/errors/manager.error";
import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { AllApiResponse } from "@/common/interfaces/response-api.interface";
import { productDescountEntity } from "./entities/product-descount.entity";
import { CreateproductDescountDto } from "./dto/create-product-descount.dto";
import { UpdateProductDescountDto } from "./dto/update-product-descount.dto";

@Injectable()
export class productDescountService {

    constructor(
        @InjectRepository(productDescountEntity)
        private readonly ProductdescoutRepository: Repository<productDescountEntity>
    ) { }


    async create(createproductDescoutDto: CreateproductDescountDto ): Promise<productDescountEntity> {
        try {
            const Productdescount = await this.ProductdescoutRepository.save(createproductDescoutDto)
            if (!Productdescount) {
                throw new ManagerError({
                    type: 'CONFLICT',
                    message: 'Productdescount not created!',
                });
            }
            return Productdescount;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<productDescountEntity>> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [total, data] = await Promise.all([
                this.ProductdescoutRepository.count({ where: { isActive: true } }),
                this.ProductdescoutRepository.createQueryBuilder('descount')
                  .where({ isActive: true })
                  .leftJoinAndSelect('Productdescount.products', 'products')
                  .take(limit)
                  .skip(skip)
                  .getMany()
            ])
            const lastPage = Math.ceil(total / limit);

            if (!data) {
                new ManagerError({
                    type: "NOT_FOUND",
                    message: "No hay Productdescount"
                })
            }

            return {
                meta: {
                    page,
                    limit,
                    lastPage,
                    total,
                },
                data,
            };
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findOne(id: string): Promise<productDescountEntity> {
        try {
            const Productdescount = await this.ProductdescoutRepository.createQueryBuilder('descount')
            .where({ id, isActive: true })
            .leftJoinAndSelect('Productdescount.products', 'product')
            .getOne();
            if (!Productdescount) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Productdescount not found',
                });
            }
            return Productdescount;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: string, UpdateProductDescountDto: UpdateProductDescountDto): Promise<UpdateResult> {
        try {
            const Productdescount = await this.ProductdescoutRepository.update(id, UpdateProductDescountDto)
            if (Productdescount.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'descount not found',
                });
            }
            return Productdescount
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: string): Promise<UpdateResult> {
        try {
            const Productdescount= await this.ProductdescoutRepository.update({ id }, { isActive: false })
            if (Productdescount.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Productdescount not found',
                });
            }

            return Productdescount
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}