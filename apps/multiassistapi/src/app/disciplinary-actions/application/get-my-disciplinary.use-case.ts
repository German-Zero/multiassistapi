import { Injectable } from "@nestjs/common";
import { DisciplinaryRepository } from "../domain/disciplinary-actions.repository";

@Injectable()
export class GetMyWarningUseCase {
  constructor(
    private readonly repo: DisciplinaryRepository,
  ) {}

  async execute(userId: number) {
    const rows = await this.repo.findWarningByUser(userId);

    return rows.map(w => ({
      id: w.id,
      reason: w.reason,
      date: w.date,
      severity: w.severity,
    }));
  }
}
