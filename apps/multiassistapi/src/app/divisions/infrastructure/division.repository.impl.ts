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
    return this.repo
     .createQueryBuilder('division')
     .leftJoinAndSelect('division.academicLevel', 'academicLevel')
     .getMany();
  }

  async findDivisionsWithStudents(): Promise<Division[]> {
  return this.repo
    .createQueryBuilder('division')
    .innerJoin('division.students', 'student')
    .leftJoinAndSelect('division.academicLevel', 'academicLevel')
    .select([
      'division.id AS "id"',
      'division.letter AS "letter"',
      'division.shift AS "shift"',
      'academicLevel.name AS "academicLevelName"',
      'COUNT(student.id) AS "studentCount"'
    ])
    .groupBy('division.id')
    .addGroupBy('division.letter')
    .addGroupBy('division.shift')
    .addGroupBy('academicLevel.name')
    .orderBy('division.id', 'ASC')
    .getRawMany()
}

  findById(id: number): Promise<Division> {
    return this.repo.findOneBy({ id });
  }
}
