import { MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

export const mongooseFactoryModule = (
  configService: ConfigService,
): MongooseModuleOptions => ({
  uri: configService.get<string>('DB_URI'),
});
