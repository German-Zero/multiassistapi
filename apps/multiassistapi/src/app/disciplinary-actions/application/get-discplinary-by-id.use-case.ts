import { Injectable } from "@nestjs/common";
import { DisciplinaryRepository } from "../domain/disciplinary-actions.repository";
import { DiscilpinaryAction } from "../infrastructure/disciplinary-actions.entity";

@Injectable()
export class GetDisciplinaryByIdUseCase {
  constructor(
    private readonly repo: DisciplinaryRepository,
  ) {}

  async execute(id: number): Promise<DiscilpinaryAction> {
    if (!id) throw new Error('ID Is Required')
    return this.repo.findById(id)
  }

}
