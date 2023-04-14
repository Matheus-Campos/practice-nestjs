import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Vaccine } from '../entities/vaccine.entity';
import { VaccineService } from '../services';

@Controller('vaccines')
export class VaccineController {
  constructor(private readonly vaccineService: VaccineService) {}

  @Get()
  list(): Promise<Vaccine[]> {
    return this.vaccineService.listVaccines();
  }

  @Post()
  create(@Body('name') name: string): Promise<Vaccine> {
    return this.vaccineService.registerVaccine(name);
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Vaccine> {
    return this.vaccineService.getVaccineById(Number(id));
  }
}
