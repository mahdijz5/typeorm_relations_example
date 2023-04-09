import { TypeOrmModule } from '@nestjs/typeorm';
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
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports :[TypeOrmModule.forFeature([Menu,Front,MenuFrontRl]),AuthModule,FrontModule],
  controllers: [MenuController],
  providers: [MenuService,MenuRepository,FrontRepository,MenuFrontRepository,JwtGuard],
  exports : [MenuRepository,MenuFrontRepository]
})
export class MenuModule {}
