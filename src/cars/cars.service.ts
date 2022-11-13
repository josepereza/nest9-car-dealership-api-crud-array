import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto } from './dto/createCar.dto';
import { UpdateCarDto } from './dto/updateCar.dto';
@Injectable()
export class CarsService {
  private cars: Car[] = [
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  getAll() {
    return this.cars;
  }
  getById(id: string) {
    const car = this.cars.find((item) => item.id === id);
    if (!car) {
      throw new NotFoundException('no se encuentra id');
    }
    return car;
  }
  createCar(data: CreateCarDto) {
    const newcar: Car = {
      id: uuid(),
      brand: data.brand,
      model: data.model,
    };
    this.cars.push(newcar);
    return data;
  }

  updateCar(id: string, updateCarDto: UpdateCarDto) {
    console.log(id, updateCarDto);
    const carDB = this.getById(id);
    if (updateCarDto.id && updateCarDto.id !== id)
      throw new BadRequestException(`Car id is not valid`);
    carDB.brand = updateCarDto.brand;
    carDB.model = updateCarDto.model;
    /*  this.cars = this.cars.map((item) => {
      if (item.id === id) {
        carDB = { ...carDB, ...updateCarDto, id };
        return carDB;
      }
      return item;
    }); */
    return carDB;
  }
  deleteCar(id: string) {
    this.getById(id);
    this.cars = this.cars.filter((item) => item.id !== id);
  }
}
