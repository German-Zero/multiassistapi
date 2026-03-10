import { Curriculum } from "../infrastructure/curriculum.entity";

export abstract class CurriculumRepository {
  abstract findByIds(ids: number[]): Promise<Curriculum[]>;
  abstract findById(id: number): Promise<Curriculum>
  abstract findAll(): Promise<Curriculum[]>;
  abstract save(curriculum: Curriculum): Promise<Curriculum>;
  abstract delete(id: number): Promise<void>;
}
