import  Front  from 'src/front/entities/front.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { FrontController } from './front.controller';
import { FrontService } from './front.service';
import { FrontRepository } from './front.repository';

@Module({
  imports :[TypeOrmModule.forFeature([Front])],
  controllers: [FrontController],
  providers: [FrontService,FrontRepository],
  exports : [FrontRepository]
})
export class FrontModule {}
