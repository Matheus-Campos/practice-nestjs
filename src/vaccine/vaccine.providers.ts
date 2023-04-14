import { Provider } from '@nestjs/common';
import { DATA_SOURCE } from 'src/database/database.providers';
import { DataSource } from 'typeorm';
import { Vaccine } from './entities/vaccine.entity';

export const VACCINE_REPOSITORY = Symbol('__VACCINE__REPOSITORY__');

export const vaccineProviders: Provider[] = [
  {
    provide: VACCINE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Vaccine),
    inject: [DATA_SOURCE],
  },
];
