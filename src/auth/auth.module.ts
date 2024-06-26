import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { JwtStrategy } from './strategy/auth.strategy';

export const jwtSecret = "dsdf4ds5fs56f465fs7"

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[
    PrismaModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret,
      signOptions: {expiresIn:'5m'}
    }),
    UsersModule
  ]
})
export class AuthModule {}
