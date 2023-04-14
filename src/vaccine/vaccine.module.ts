import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { VaccineController } from './controllers';
import { VaccineService } from './services';
import { vaccineProviders } from './vaccine.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [VaccineController],
  providers: [VaccineService, ...vaccineProviders],
})
export class VaccineModule {}
