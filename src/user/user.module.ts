import { RoleModule } from './../role/role.module';
import { RoleRepository } from './../role/role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module,forwardRef } from '@nestjs/common';
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
import { MenuModule } from 'src/menu/menu.module';
import Menu from 'src/menu/entities/menu.entity';
import { FrontModule } from 'src/front/front.module';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Module({
  imports: [TypeOrmModule.forFeature([User,Role,UserRoleRl,Menu]) , JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  }),RoleModule,MenuModule,FrontModule,forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [{
    provide : ProvidersEnum.uesrService,
    useClass : UserService
  },RoleRepository,UserRepository,UserRoleRepository,JwtGuard],
  exports : [UserRepository,UserRoleRepository]
})
export class UserModule {}
