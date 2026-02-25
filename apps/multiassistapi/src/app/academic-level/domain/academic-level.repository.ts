import { AcademicLevel } from "../infrastructure/academic-level.entity";

export abstract class AcademicLevelRepository {
  abstract findAll(): Promise<AcademicLevel[]>;
}
