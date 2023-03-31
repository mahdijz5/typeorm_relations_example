import { UserRoleRepository } from './../user/user.role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import Role from './entities/role.entity';
import { RoleRepository } from './role.repository';
import { UserRoleRl } from 'src/user/entities/userRoleRl.entity';

@Module({
  imports :[TypeOrmModule.forFeature([Role,UserRoleRl])],
  controllers: [RoleController],
  providers: [RoleService,RoleRepository,UserRoleRepository],
  exports : [RoleRepository]
})
export class RoleModule {}
