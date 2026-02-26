import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DivisionRepository } from "../domain/division.repository";
import { Division } from "./divisions.entity";
import { Repository } from "typeorm";

@Injectable()
export class DivisionRepositoryImpl implements DivisionRepository {
  constructor(

    @InjectRepository(Division)
    private readonly repo: Repository<Division>,

  ) {}

  findAll(): Promise<Division[]> {
    return this.repo.find();
  }

  findById(id: number): Promise<Division> {
    return this.repo.findOneBy({ id });
  }
}
