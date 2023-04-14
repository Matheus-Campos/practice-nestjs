import { Module } from '@nestjs/common';
import { VaccineModule } from './vaccine/vaccine.module';

@Module({
  imports: [VaccineModule],
})
export class AppModule {}
