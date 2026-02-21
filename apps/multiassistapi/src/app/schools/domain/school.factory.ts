import { Address } from "../../addresses/infrastructure/addresses.entity";
import { CreateSchoolDto } from "../dto/create-school.dto";
import { School } from "../infrastructure/schools.entity";

export class SchoolFactory {
  static create(dto: CreateSchoolDto): School {
    const address = new Address();
    Object.assign(address, dto.address);

    const school = new School();
    school.name = dto.name;
    school.address = address;

    return school;
  }
}
