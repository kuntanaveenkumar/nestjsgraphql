import { forwardRef,Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.orm.entity';
import { UsersResolver } from './users.resolver';
import { AuthResolver } from '../auth/auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "../auth/constants"
import { AuthModule } from '../auth/auth.module'; 
@Module({
  imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([User]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),   
],
  providers: [UsersService,UsersResolver], 
  exports: [UsersService],
})
export class UsersModule {}     