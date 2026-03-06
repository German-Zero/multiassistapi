import { Curriculum } from "../infrastructure/curriculum.entity";

export abstract class CurriculumRepository {
  abstract findByIds(ids: number[]): Promise<Curriculum[]>;
  abstract findAll(): Promise<Curriculum[]>;
}
