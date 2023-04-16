import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const DATA_SOURCE = Symbol('__DATA_SOURCE__');

export const databaseProviders: Provider[] = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: 'postgres',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize:
          configService.get<string>('SYNCHRONIZE_DATABASE') === 'true',
      });

      return dataSource.initialize();
    },
    inject: [ConfigService],
  },
];
