import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [
    {
      id: uuid(),
      name: 'Toyota',
      createAt: new Date().getTime(),
    },
  ];
  create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto;
    const brand: Brand = {
      id: uuid(),
      name: name.toLocaleLowerCase(),
      //name: createBrandDto.name,
      createAt: new Date().getTime(),
    };
    this.brands.push(brand);
    return brand;
  }

  findAll() {
    return this.brands;
  }

  findOne(id: string) {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) throw new NotFoundException(`No exite el codigo ${id}`);
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    const brandBD = this.findOne(id);
    brandBD.name = updateBrandDto.name;
    brandBD.updatedAt = new Date().getTime();
    return brandBD;
  }

  remove(id: string) {
    this.brands = this.brands.filter((brand) => brand.id !== id);
  }
}
