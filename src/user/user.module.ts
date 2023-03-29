import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ProvidersEnum } from 'src/utils/enums';
import { User } from './entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { UserRepository } from './user.repository';
import { PostRepository } from 'src/post/post.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User,Post]), JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  }), AuthModule],
  controllers: [UserController],
  providers: [{
    provide : ProvidersEnum.uesrService,
    useClass : UserService
  },UserRepository,PostRepository],
  exports : [UserRepository]
})
export class UserModule {}
