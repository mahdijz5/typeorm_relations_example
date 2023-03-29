import { Module } from '@nestjs/common';
import { FrontController } from './front.controller';
import { FrontService } from './front.service';

@Module({
  controllers: [FrontController],
  providers: [FrontService]
})
export class FrontModule {}
