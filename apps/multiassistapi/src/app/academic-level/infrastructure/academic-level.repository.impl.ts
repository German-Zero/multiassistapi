import { Injectable } from "@nestjs/common";
import { AcademicLevelRepository } from "../domain/academic-level.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { AcademicLevel } from "./academic-level.entity";
import { Repository } from "typeorm";

@Injectable()
export class AcademicLevelRepositoryImpl implements AcademicLevelRepository {
  constructor(
    @InjectRepository(AcademicLevel)
    private readonly repo: Repository<AcademicLevel>,
  ) {}

  findAll(): Promise<AcademicLevel[]> {
    return this.repo.find();
  }
}
