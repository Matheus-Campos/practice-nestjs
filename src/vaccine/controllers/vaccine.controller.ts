import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
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

  @Patch(':id/quantity')
  addQuantity(
    @Param('id') vaccineId: string,
    @Body('newQuantity') newQuantity: number,
  ): Promise<Vaccine> {
    return this.vaccineService.addQuantity(Number(vaccineId), newQuantity);
  }

  @Delete(':id')
  deleteById(@Param('id') vaccineId: string): Promise<void> {
    return this.vaccineService.deleteVaccineById(Number(vaccineId));
  }
}
