import { School } from "../infrastructure/schools.entity";

export abstract class SchoolRepository {
  abstract create(school: School): Promise<School>;
  abstract findAll(): Promise<School[]>;
  abstract findById(id: number): Promise<School | null>;
  abstract update(school: School): Promise<School>;
  abstract remove(school: School);
}
