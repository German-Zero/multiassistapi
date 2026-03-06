import { Injectable } from "@nestjs/common";
import { DisciplinaryRepository } from "../domain/disciplinary-actions.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { DiscilpinaryAction } from "./disciplinary-actions.entity";
import { Repository } from "typeorm";

@Injectable()
export class DisciplinaryRepositoryImpl implements DisciplinaryRepository {
  constructor(
    @InjectRepository(DiscilpinaryAction)
    private readonly repo: Repository<DiscilpinaryAction>,
  ) {}

  create(disciplinary: Partial<DiscilpinaryAction>): Promise<DiscilpinaryAction> {
    return this.repo.save(disciplinary)
  }

  findByStudent(studentId: number): Promise<DiscilpinaryAction[]> {
    return this.repo.find({
      where: {
        student: { id: Number(studentId) },
      },
      order: { date: 'DESC' },
    });
  }

  findById(id: number): Promise<DiscilpinaryAction | null> {
    return this.repo.findOne( { where: { id } } );
  }

  save(disciplinary: DiscilpinaryAction): Promise<DiscilpinaryAction> {
    return this.repo.save(disciplinary)
  }
}
