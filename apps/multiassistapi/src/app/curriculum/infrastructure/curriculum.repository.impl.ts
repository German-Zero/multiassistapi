import { Injectable } from "@nestjs/common";
import { CurriculumRepository } from "../domain/curriculum.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Curriculum } from "./curriculum.entity";
import { In, Repository } from "typeorm";

@Injectable()
export class CurriculumRepositoryImpl implements CurriculumRepository {
  constructor(
    @InjectRepository(Curriculum)
    private readonly repo: Repository<Curriculum>
  ) {}

  findByIds(ids: number[]): Promise<Curriculum[]> {
    return this.repo.find({
      where: { id: In(ids) },
      relations: ['subject', 'division', 'academicLevel'],
    });
  }

  findAll(): Promise<Curriculum[]> {
    return this.repo.find({
      relations: ['subject', 'division', 'academicLevel'],
      order: {
        academicLevel: { id: 'ASC' },
        division: { id: 'ASC' }
      },
    });
  }
}
