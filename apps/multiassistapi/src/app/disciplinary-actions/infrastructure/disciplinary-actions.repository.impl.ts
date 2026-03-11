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

  findWarningByUser(userId: number): Promise<any[]> {
    return this.repo
      .createQueryBuilder('disciplinary_actions')
      .innerJoin('disciplinary_actions.student', 'students')
      .select([
        'disciplinary_actions.id AS "id"',
        'disciplinary_actions.reason AS "reason"',
        'disciplinary_actions.date AS "date"',
        'disciplinary_actions.severity AS "severity"'
      ])
      .where('students.user_id = :userId', { userId })
      .orderBy('disciplinary_actions.date', 'DESC')
      .getRawMany()
  }

  save(disciplinary: DiscilpinaryAction): Promise<DiscilpinaryAction> {
    return this.repo.save(disciplinary)
  }
}
