import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { databaseProviders } from './database.providers';
import { DatabaseExceptionFilter } from './database-exception.filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: DatabaseExceptionFilter,
    },
    ...databaseProviders,
  ],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
