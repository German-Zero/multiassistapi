import { Division } from "../infrastructure/divisions.entity";

export abstract class DivisionRepository {
  abstract findAll(): Promise<Division[]>;
}
