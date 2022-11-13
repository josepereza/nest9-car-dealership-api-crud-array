import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/createCar.dto';
import { UpdateCarDto } from './dto/updateCar.dto';

@Controller('cars')
//@UsePipes(ValidationPipe)
export class CarsController {
  cars = [];
  car = {};

  constructor(private carsService: CarsService) {}

  @Get()
  getAll() {
    this.cars = this.carsService.getAll();
    return this.cars;
  }

  @Get(':id')
  getById(@Param('id', ParseUUIDPipe) id: string) {
    this.car = this.carsService.getById(id);
    return this.car;
  }

  @Post()
  createCar(@Body() body: CreateCarDto) {
    return this.carsService.createCar(body);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateCarDto,
  ) {
    return this.carsService.updateCar(id, body);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string) {
    return this.carsService.deleteCar(id)
  }
}
