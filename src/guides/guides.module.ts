import { forwardRef,Module } from '@nestjs/common';
import { GuidesService } from './guides.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guide } from './guides.entity';
import { GuidesResolver } from './guides.resolver';
import { AuthResolver } from '../auth/auth.resolver';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "../auth/constants"
import { AuthModule } from '../auth/auth.module'; 
@Module({
  imports: [forwardRef(() => AuthModule),TypeOrmModule.forFeature([Guide]),
  PassportModule,
  JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: '60s' },
  }),   
],
  providers: [GuidesService,GuidesResolver], 
  exports: [GuidesService],
})
export class GuidesModule {}     