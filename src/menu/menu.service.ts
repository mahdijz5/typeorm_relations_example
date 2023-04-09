import { UpdateMenuParams } from './../utils/types';
import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMenuParams } from 'src/utils/types';
import Menu from './entities/menu.entity';
import { MenuRepository } from './menu.repository';

@Injectable()
export class MenuService {
    constructor(private menuRepository: MenuRepository) { }

    async create(data: CreateMenuParams): Promise<Menu> {
        try {
            const isExist = await this.menuRepository.findOneBy({ name: data.name })
            if (isExist) throw new BadRequestException('Menu already exists')
            const menu = this.menuRepository.create({ ...data })

            await this.menuRepository.save(menu)

            return menu
        } catch (error) {
            throw error
        }
    }

    async createChildren(data: CreateMenuParams, parentId: number): Promise<Menu> {
        try {
            const isExist = await this.menuRepository.findOneBy({ name: data.name })
            if (isExist) throw new BadRequestException('Menu already exists')
            const parent = await this.menuRepository.findOneBy({ id: parentId })
            if (!parent) throw new BadRequestException('Parent doesnt exist')
            const menu = await this.create({ ...data })
            menu.parent = parent
            await this.menuRepository.save(menu)
            return menu
        } catch (error) {
            throw error
        }
    }

    async update(data: UpdateMenuParams, id: number) {
        try {
            await this.menuRepository.update({name : data.name}, id,data.fronts)
        } catch (error) {
            throw error
        }
    }

    async remove(id: number) {
        try {
            await this.menuRepository.remove(id)
        } catch (error) {
            throw error
        }
    }

    async find(limit: number, page: number, searchQuery: string): Promise<Menu[]> {
        try {
            return await this.menuRepository.search(limit,page,searchQuery)
        } catch (error) {
            throw error
        }
    }

    async findTree() {
        try {
            return await this.menuRepository.getTree()
        } catch (error) {
            throw error
        }
    }
}
