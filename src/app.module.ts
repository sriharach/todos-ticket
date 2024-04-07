import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { redisStore } from 'cache-manager-redis-yet';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './helper/http-exception';
import { MongooseModule } from '@nestjs/mongoose';
import { MusicalModule } from './musical/musical.module';
import { MusicalRowModule } from './musical-row/musical-row.module';
import { MusicalZoneModule } from './musical-zone/musical-zone.module';
import { ReservationModule } from './reservation/reservation.module';

@Module({
  providers: [
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.local',
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          socket: {
            host: configService.get<string>('REDIS_HOST'),
            port: parseInt(configService.get<string>('REDIS_PORT')!),
          },
        });
        return {
          store: () => store,
        };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forRoot(process.env.HOST_MONGODB, { lazyConnection: true, dbName: process.env.DB_NAME }),
    AuthModule,
    UserModule,
    MusicalModule,
    MusicalRowModule,
    MusicalZoneModule,
    ReservationModule,
  ],
})
export class AppModule {}
