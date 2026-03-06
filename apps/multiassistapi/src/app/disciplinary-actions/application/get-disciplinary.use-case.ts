import { Injectable } from "@nestjs/common";
import { DisciplinaryRepository } from "../domain/disciplinary-actions.repository";
import { DisciplinaryResponseDto } from "../dto/res-disciplinary.dto";

@Injectable()
export class GetDisciplinaryByStudentUseCase {
  constructor(
    private readonly disciplinaryRepo: DisciplinaryRepository,
  ) {}

  async execute(studentId: number): Promise<DisciplinaryResponseDto[]> {
    const actions = await this.disciplinaryRepo.findByStudent(studentId);

    return actions.map(a => ({
      id: a.id,
      reason: a.reason,
      severity: a.severity,
      date: a.date,
    }));
  }
}
