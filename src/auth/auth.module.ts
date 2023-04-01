import { UserRoleRepository } from './../user/user.role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from "./strategies/local.strategy"
import { JwtStrategy } from "./strategies/jwt.strategy"
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtGuard } from './guards/jwt.guard';
import { User } from 'src/user/entities/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { UserRoleRl } from 'src/user/entities/userRoleRl.entity';
import Role from 'src/role/entities/role.entity';
import { RoleRepository } from 'src/role/role.repository';
import { MenuRoleRepository } from 'src/role/menuRole.repository';
import { MenuRepository } from 'src/menu/menu.repository';
import { FrontRepository } from 'src/front/front.repository';
import { MenuFrontRepository } from 'src/menu/menuFront.repository';
import MenuRoleRl from 'src/role/entities/menuRoleRl.entity';
import Menu from 'src/menu/entities/menu.entity';
import Front from 'src/front/entities/front.entity';
import MenuFrontRl from 'src/menu/entities/menuFrontRl.enity';
 
@Module({
  imports: [TypeOrmModule.forFeature([User,Role,UserRoleRl,MenuRoleRl,Menu,Front,MenuFrontRl]), PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtGuard,UserRepository,RoleRepository,UserRoleRepository,MenuRoleRepository,MenuRepository,FrontRepository,MenuFrontRepository],
  controllers: [AuthController],
  exports: [JwtStrategy,JwtGuard]
})
export class AuthModule {}
