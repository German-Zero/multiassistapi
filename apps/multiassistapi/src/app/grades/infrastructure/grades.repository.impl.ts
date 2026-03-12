import { Injectable } from "@nestjs/common";
import { GradesRepository } from "../domain/grades.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Grade } from "./grades.entity";
import { PutBulkGradesDto } from "../dto/put-bulk-grades.dto";


@Injectable()
export class GradesRepositoryImpl implements GradesRepository {
  constructor(
    @InjectRepository(Grade)
    private readonly gradeRepo: Repository<Grade>,
  ) {}

  async saveBulkGrades(grades: Grade[]): Promise<void> {
    await this.gradeRepo
      .createQueryBuilder()
      .insert()
      .into(Grade)
      .values(grades)
      .execute()
  }

  async putBulkGrades(dto: PutBulkGradesDto): Promise<void> {
    const queryRunner = this.gradeRepo.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      for (const g of dto.grades) {
        const updateData: any = {};
        if (g.value !== undefined) updateData.value = g.value;
        if (dto.description !== undefined) updateData.description = dto.description;
        if (dto.type !== undefined) updateData.type = dto.type;

        await queryRunner.manager
          .createQueryBuilder()
          .update(Grade)
          .set(updateData)
          .where('id = :id', { id: g.gradeId })
          .execute()
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction()
      throw error;
    } finally {
      await queryRunner.release()
    }
  }

  async findGradesByUser(userId: number): Promise<any[]> {
    return this.gradeRepo
      .createQueryBuilder('grade')
      .innerJoin('grade.student', 'student')
      .innerJoin('student.user', 'user')
      .innerJoin('grade.curriculum', 'curriculum')
      .innerJoin('curriculum.subject', 'subject')
      .leftJoin('grade.trimester', 'trimester')
      .select([
        'curriculum.id AS "curriculumId"',
        'student.id AS "studentId"',
        'user.id AS "userId"',
        'subject.name AS "subjectName"',
        'grade.id AS "gradeId"',
        'grade.value AS "gradeValue"',
        'trimester.number AS "trimester"'
      ])
      .where('user.id = :userId', { userId })
      .orderBy('curriculum.id', 'ASC')
      .getRawMany();
  }
}
