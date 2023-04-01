import { TypeOrmModule } from '@nestjs/typeorm';
import MenuRoletRl from 'src/role/entities/menuRoleRl.entity';
import  MenuFrontRl from 'src/menu/entities/menuFrontRl.enity';
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import Menu from './entities/menu.entity';
import { MenuRepository } from './menu.repository';
import { FrontRepository } from 'src/front/front.repository';
import Front from 'src/front/entities/front.entity';
import { MenuFrontRepository } from './menuFront.repository';
import { FrontModule } from 'src/front/front.module';

@Module({
  imports :[TypeOrmModule.forFeature([Menu,Front,MenuFrontRl]),FrontModule],
  controllers: [MenuController],
  providers: [MenuService,MenuRepository,FrontRepository,MenuFrontRepository],
  exports : [MenuRepository,MenuFrontRepository]
})
export class MenuModule {}
