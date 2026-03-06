import { Injectable, NotFoundException } from "@nestjs/common";
import { DisciplinaryRepository } from "../domain/disciplinary-actions.repository";
import { PutDisciplinaryDto } from "../dto/put-disciplinary.dto";

@Injectable()
export class PutDisciplinaryUseCase {
  constructor(
    private readonly disciplinaryRepo: DisciplinaryRepository,
  ) {}

  async execute(id: number, dto: PutDisciplinaryDto) {
    const action = await this.disciplinaryRepo.findById(id);

    if (!action) throw new NotFoundException('Disciplinary Action Not Found')

    if (dto.severity !== undefined) action.severity = dto.severity;

    action.reason = dto.reason;
    action.severity = dto.severity;

    return await this.disciplinaryRepo.save(action)
  }
}
