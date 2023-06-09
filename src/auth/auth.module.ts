import { UserModule } from './../user/user.module';
import { UserRoleRepository } from './../user/user.role.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module ,forwardRef} from '@nestjs/common';
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
import { RoleRepository } from 'src/role/role.repository';
import { RolesGuard } from './guards/role.guard';
import Role from 'src/role/entities/role.entity';
import { RoleModule } from 'src/role/role.module';


@Module({
  imports: [TypeOrmModule.forFeature([User,UserRoleRl,Role]),forwardRef(() => UserModule),forwardRef(() => RoleModule),PassportModule, JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {
      expiresIn: "1d"
    }
  }),],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtGuard,RolesGuard],
  controllers: [AuthController],
  exports: [JwtStrategy,JwtGuard,RolesGuard]
})
export class AuthModule {}
