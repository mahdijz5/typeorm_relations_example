import  Front  from 'src/front/entities/front.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FrontController } from './front.controller';
import { FrontService } from './front.service';
import { FrontRepository } from './front.repository';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports :[TypeOrmModule.forFeature([Front]),AuthModule],
  controllers: [FrontController],
  providers: [FrontService,FrontRepository,JwtGuard],
  exports : [FrontRepository]
})
export class FrontModule {}
