import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthEntity, AuthSchema } from './auth.entity';
import { AccessTokenStrategy } from './jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthEntity.name, schema: AuthSchema }]),
    JwtModule.register({
      signOptions: { expiresIn: '10m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy],
  exports: [AuthService],
})
export class AuthModule {}
