import { Injectable } from "@nestjs/common";
import { ManagerError } from "@/common/errors/manager.error";
import { PaginationDto } from '@/common/dtos/pagination/pagination.dto';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { AllApiResponse } from "@/common/interfaces/response-api.interface";
import { DescountEntity } from "./entities/descount.entity";
import { CreateDescountDto } from "./dto/create-descount.dto";
import { UpdateDescountDto } from "./dto/update-descount.dto";

@Injectable()
export class DescountService {

    constructor(
        @InjectRepository(DescountEntity)
        private readonly descoutRepository: Repository<DescountEntity>
    ) { }


    async create(createDescoutDto: CreateDescountDto): Promise<DescountEntity> {
        try {
            const descount = await this.descoutRepository.save(createDescoutDto)
            if (!descount) {
                throw new ManagerError({
                    type: 'CONFLICT',
                    message: 'Descount not created!',
                });
            }
            return descount;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async findAll(paginationDto: PaginationDto): Promise<AllApiResponse<DescountEntity>> {
        const { limit, page } = paginationDto;
        const skip = (page - 1) * limit;
        try {
            const [total, data] = await Promise.all([
                this.descoutRepository.count({ where: { isActive: true } }),
                this.descoutRepository.createQueryBuilder('descount')
                  .where({ isActive: true })
                  .leftJoinAndSelect('descount.products', 'products')
                  .take(limit)
                  .skip(skip)
                  .getMany()
            ])
            const lastPage = Math.ceil(total / limit);

            if (!data) {
                new ManagerError({
                    type: "NOT_FOUND",
                    message: "No hay descount"
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

    async findOne(id: string): Promise<DescountEntity> {
        try {
            const descount = await this.descoutRepository.createQueryBuilder('descount')
            .where({ id, isActive: true })
            .leftJoinAndSelect('descount.products', 'product')
            .getOne();
            if (!descount) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'descount not found',
                });
            }
            return descount;
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async update(id: string, updateDescountDto: UpdateDescountDto): Promise<UpdateResult> {
        try {
            const descount = await this.descoutRepository.update(id, updateDescountDto)
            if (descount.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'descount not found',
                });
            }
            return descount
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }

    async remove(id: string): Promise<UpdateResult> {
        try {
            const descount= await this.descoutRepository.update({ id }, { isActive: false })
            if (descount.affected === 0) {
                throw new ManagerError({
                    type: 'NOT_FOUND',
                    message: 'Descount not found',
                });
            }

            return descount
        } catch (error) {
            ManagerError.createSignatureError(error.message);
        }
    }
}
