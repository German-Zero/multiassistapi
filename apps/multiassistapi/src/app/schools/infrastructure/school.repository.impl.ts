import { Injectable } from "@nestjs/common";
import { SchoolRepository } from "../domain/school.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { School } from "./schools.entity";
import { Repository } from "typeorm";

@Injectable()
export class SchoolRepositoryImpl implements SchoolRepository {
  constructor(
    @InjectRepository(School)
    private readonly repo: Repository<School>,
  ) {}

  remove(school: School) {
    return this.repo.remove(school);
  }

  create(school: School) {
    return this.repo.save(school);
  }

  findAll(): Promise<School[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<School | null> {
    return this.repo.findOne({ where: { id }, relations: ['address'] });
  }

  update(school: School): Promise<School> {
    return this.repo.save(school)
  }

}
