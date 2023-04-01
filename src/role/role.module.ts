import { FrontRepository } from 'src/front/front.repository';
import { MenuFrontRepository } from 'src/menu/menuFront.repository';
import { MenuRepository } from 'src/menu/menu.repository';
import { UserRoleRepository } from './../user/user.role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import Role from './entities/role.entity';
import { RoleRepository } from './role.repository';
import { UserRoleRl } from 'src/user/entities/userRoleRl.entity';
import { MenuRoleRepository } from './menuRole.repository';
import MenuRoleRl from './entities/menuRoleRl.entity';
import Menu from 'src/menu/entities/menu.entity';
import { MenuModule } from 'src/menu/menu.module';
import Front from 'src/front/entities/front.entity';
import { FrontModule } from 'src/front/front.module';


@Module({ 
  imports :[TypeOrmModule.forFeature([Role,MenuRoleRl,Menu]),MenuModule,FrontModule],
  controllers: [RoleController],
  providers: [RoleService,RoleRepository,MenuRoleRepository,MenuRepository],
  exports : [RoleRepository,MenuRoleRepository]
})
export class RoleModule {}
