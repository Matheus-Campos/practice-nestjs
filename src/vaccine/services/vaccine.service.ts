import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vaccine } from '../entities/vaccine.entity';
import { VACCINE_REPOSITORY } from '../vaccine.providers';

@Injectable()
export class VaccineService {
  @Inject(VACCINE_REPOSITORY)
  private readonly vaccineRepository: Repository<Vaccine>;

  listVaccines(): Promise<Vaccine[]> {
    return this.vaccineRepository.find();
  }

  registerVaccine(name: string): Promise<Vaccine> {
    return this.vaccineRepository.save({ name });
  }
}
