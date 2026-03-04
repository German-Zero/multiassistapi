import { DiscilpinaryAction } from "../infrastructure/disciplinary-actions.entity";

export abstract class DisciplinaryRepository {
  abstract create(disciplinary: Partial<DiscilpinaryAction>): Promise<DiscilpinaryAction>;
  abstract findByStudent(studentId: number): Promise<DiscilpinaryAction[]>;
  abstract findById(id: number): Promise<DiscilpinaryAction | null>
  abstract save(disciplinary: DiscilpinaryAction): Promise<DiscilpinaryAction>;
}
