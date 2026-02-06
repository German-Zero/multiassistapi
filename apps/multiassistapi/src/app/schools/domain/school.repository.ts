import { School } from "../infrastructure/schools.entity";

export abstract class SchoolRepository {
  abstract findAll(): Promise<School[]>;
}
