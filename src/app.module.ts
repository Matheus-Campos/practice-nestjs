import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { VaccineModule } from './vaccine/vaccine.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), VaccineModule],
})
export class AppModule {}
