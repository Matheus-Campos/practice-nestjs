import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Vaccine } from '../entities/vaccine.entity';
import { VACCINE_REPOSITORY } from '../vaccine.providers';

@Injectable()
export class VaccineService {
  @Inject(VACCINE_REPOSITORY)
  private readonly vaccineRepository: Repository<Vaccine>;

  listVaccines() {
    return this.vaccineRepository.find({ order: { name: 'ASC' } });
  }

  registerVaccine(name: string) {
    return this.vaccineRepository.save({ name });
  }

  getVaccineById(id: number) {
    return this.vaccineRepository.findOneByOrFail({ id });
  }

  async addQuantity(id: number, newQuantity: number) {
    const vaccine = await this.vaccineRepository.findOneByOrFail({ id });

    if (newQuantity <= newQuantity) {
      throw new BadRequestException('Cannot decrease quantity');
    }
    vaccine.quantity = newQuantity;
    return this.vaccineRepository.save(vaccine);
  }

  async deleteVaccineById(id: number) {
    await this.vaccineRepository.softDelete({ id });
  }
}
