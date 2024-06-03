import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModel } from './_core/entities/user.entity';
import { CommonModule } from './_common/_common.module';
import { UsersModule } from './users/users.module';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TitleModel } from './_core/entities/title.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOSTNAME,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [UserModel, TitleModel],
      synchronize: true,
    }),
    CommonModule,
    UsersModule,
    RegisterModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
  ],
})
export class AppModule {}
