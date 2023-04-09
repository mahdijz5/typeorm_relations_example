import { UpdateFrontDto } from './dto/updateFront.dto';
import { Injectable, BadRequestException } from '@nestjs/common';
import { FrontRepository } from './front.repository';
import { CreateFrontDto } from './dto';
import Front from './entities/front.entity';

@Injectable()
export class FrontService {
    constructor(private roleRepository: FrontRepository) { }

    async create(data: CreateFrontDto): Promise<Front> {
        try {
            const isExist = await this.roleRepository.findOneBy({ name: data.name })
            if (isExist) throw new BadRequestException('Front already exists')
            const front = this.roleRepository.create({ ...data })

            await this.roleRepository.save(front)

            return front
        } catch (error) {
            throw error
        }
    }

    async update(data: UpdateFrontDto, id: number) {
        try {
            await this.roleRepository.update(data, id)
        } catch (error) {
            throw error
        }
    }

    async remove(id: number) {
        try {
            await this.roleRepository.remove(id)
        } catch (error) {
            throw error
        }
    }

    async find(limit: number, page: number, searchQuery: string) {
        const query = `%${searchQuery}%`
        try {
            return await this.roleRepository.search(query, page, limit)
        } catch (error) {
            throw error
        }
    }
}
