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
      relations: ['subject', 'division', 'division.academicLevel'],
    });
  }

  findById(id: number): Promise<Curriculum> {
    return this.repo.findOne({
      where: { id },
      relations: ['subject', 'division', 'division.academicLevel'],
    })
  }

  findAll(): Promise<Curriculum[]> {
    return this.repo.find({
      relations: ['subject', 'division', 'division.academicLevel'],
      order: {
        division: { id: 'ASC' }
      },
    });
  }

  save(curriculum: Curriculum): Promise<Curriculum> {
    return this.repo.save(curriculum);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id)
  }
}
