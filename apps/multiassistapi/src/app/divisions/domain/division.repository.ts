import { Division } from "../infrastructure/divisions.entity";

export abstract class DivisionRepository {
  abstract findAll(): Promise<Division[]>;
  abstract findById(id: number): Promise<Division>;
}
