import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { FrontModule } from './front/front.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/entities/user.entity';
import Role from './role/entities/role.entity';
import {UserRoleRl} from './user/entities/userRoleRl.entity';
import Front  from 'src/front/entities/front.entity';
import MenuFrontRl  from 'src/menu/entities/menuFrontRl.enity';
import Menu from './menu/entities/menu.entity';
import MenuRoletRl from './role/entities/menuRoleRl.entity';
import { RolesGuard } from './auth/guards/role.guard';

const rootDir = process.env.NODE_ENV === 'dist'
    ? 'dist'
    : 'src';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.SERVER_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User,Role,Menu,MenuFrontRl,FrontModule,Front,MenuRoletRl,UserRoleRl],
      synchronize: true,
    }),UserModule, MenuModule, FrontModule, RoleModule, AuthModule],
  controllers: [AppController],
  providers: [AppService,{
    provide: APP_GUARD,
    useClass: RolesGuard,
  }],
})
export class AppModule {}
