import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { StudentRepository } from "../domain/student.repository";
import { In, Repository } from "typeorm";
import { Student } from "./students.entity";

@Injectable()
export class StudentRepositoryImpl implements StudentRepository {
  constructor(
    @InjectRepository(Student)
    private readonly repo: Repository<Student>,
  ) {}

    findByUserIds(userIds: number[]): Promise<Student[]> {
    return this.repo.find({
      where: {
        user: { id: In(userIds) },
      },
      relations: ['user', 'division'],
    });
  }

  findByUserId(userId: number): Promise<Student | null> {
    return this.repo.findOne({
      where: { user: { id: userId } },
    });
  }

  findById(id: number): Promise<Student> {
    return this.repo.findOne({
      where: { id: id }
    })
  }

    saveMany(students: Student[]): Promise<Student[]> {
    return this.repo.save(students);
  }

    findAll(): Promise<Student[]> {
    return this.repo.find({
      relations: ['user', 'division'],
    });
  }

  async findByDivision(divisionId: number): Promise<Student[]> {
    return this.repo.find({
      where: { division: { id: divisionId } },
      relations: ['user'],
    });
  }

  findByIdsAndDivision(studentIds: number[], divisionId: number): Promise<Student[]> {
    return this.repo
    .createQueryBuilder('student')
    .innerJoin('student.division', 'division')
    .where('student.id IN (:...ids)', { ids: studentIds })
    .andWhere('division.id = :divisionId', { divisionId })
    .getMany();
  }

  async getStudentByCurriculum(curriculumId: number) {
    return this.repo
    .createQueryBuilder('student')
    .innerJoin('student.user', 'user')
    .innerJoin('student.division', 'division')
    .innerJoin('curriculum', 'curriculum', 'curriculum.division = division.id')
    .leftJoin('grades', 'grades', 'grades.student = student.id AND grades.curriculum = curriculum.id')
    .leftJoin('grades.trimester', 'trimester')
    .select([
      'student.id AS "studentid"',
      'user.name AS "firstname"',
      'user.lastname AS "lastname"',
      'grades.id AS "gradeid"',
      'grades.value AS "gradevalue"',
      'trimester.number AS "trimester"'
    ])
    .where('curriculum.id = :curriculumId', { curriculumId })
    .orderBy('student.id', 'ASC')
    .getRawMany()
  }
}
