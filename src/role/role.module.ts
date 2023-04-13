import { FrontRepository } from 'src/front/front.repository';
import { MenuRepository } from 'src/menu/menu.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module, forwardRef } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import Role from './entities/role.entity';
import { RoleRepository } from './role.repository';
import { MenuRoleRepository } from './menuRole.repository';
import MenuRoleRl from './entities/menuRoleRl.entity';
import Menu from 'src/menu/entities/menu.entity';
import { MenuModule } from 'src/menu/menu.module';
import { FrontModule } from 'src/front/front.module';
import Front from 'src/front/entities/front.entity';
import { AuthModule } from 'src/auth/auth.module';
import { JwtGuard } from 'src/auth/guards/jwt.guard';


@Module({ 
  imports :[TypeOrmModule.forFeature([Role,MenuRoleRl,Menu,Front]),MenuModule,FrontModule,forwardRef(() => AuthModule)],
  controllers: [RoleController],
  providers: [RoleService,RoleRepository,MenuRoleRepository],
  exports : [RoleRepository,MenuRoleRepository]
})
export class RoleModule {}
