import { RoleRepository } from './../role/role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { ProvidersEnum } from 'src/utils/enums';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { UserRoleRepository } from './user.role.repository';
import { UserRoleRl } from './entities/userRoleRl.entity';
import Role from 'src/role/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User,UserRoleRl,Role]) , JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  }), AuthModule],
  controllers: [UserController],
  providers: [{
    provide : ProvidersEnum.uesrService,
    useClass : UserService
  },UserRepository,UserRoleRepository,RoleRepository],
  exports : [UserRepository,UserRoleRepository]
})
export class UserModule {}
