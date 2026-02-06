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

  findAll(): Promise<School[]> {
    return this.repo.find();
  }
}
