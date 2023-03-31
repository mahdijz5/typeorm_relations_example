import { TypeOrmModule } from '@nestjs/typeorm';
import MenuRoletRl from 'src/role/entities/menuRoleRl.entity';
import  MenuFrontRl from 'src/menu/entities/menuFrontRl.enity';
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import Menu from './entities/menu.entity';
import { MenuRepository } from './menu.repository';

@Module({
  imports :[TypeOrmModule.forFeature([Menu])],
  controllers: [MenuController],
  providers: [MenuService,MenuRepository],
  exports : [MenuRepository]
})
export class MenuModule {}
