import { config } from 'dotenv';
import { ConfigService, ConfigModule } from '@nestjs/config';
import {
  DynamicModule,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserSchema } from './schemas/user.schema';
import { MovieSchema } from './schemas/movie.schema';
import { AuthController } from './controllers/auth.controller';
import { MovieService } from './services/movie.service';
import { MovieController } from './controllers/movie.controller';
import { UsersController } from './controllers/users.controller';

config();

const schemas: DynamicModule = MongooseModule.forFeature([
  {
    name: 'User',
    schema: UserSchema,
  },
  {
    name: 'Movie',
    schema: MovieSchema,
  },
]);

const services = [AuthService, UsersService, MovieService];

const controllers = [AuthController, UsersController, MovieController];

const { REFRESH_TOKEN_SECRET, REFRESH_TOKEN_TIME } = process.env;

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    schemas,
    JwtModule.register({
      secret: REFRESH_TOKEN_SECRET || 'SeKret',
      signOptions: {
        expiresIn: REFRESH_TOKEN_TIME,
      },
    }),
  ],
  controllers: [...controllers],
  providers: [...services, LocalStrategy, JwtStrategy],
  exports: [...services],
})
export class SharedModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply().forRoutes(...controllers);
  }
}
