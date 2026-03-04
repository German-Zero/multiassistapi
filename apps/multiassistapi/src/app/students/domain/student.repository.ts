import { Student } from "../infrastructure/students.entity";

export abstract class StudentRepository {
  abstract findByUserIds(userIds: number[]): Promise<Student[]>;
  abstract findByUserId(userId: number): Promise<Student | null>;
  abstract saveMany(students: Student[]): Promise<Student[]>;
  abstract findAll(): Promise<Student[]>
  abstract findById(id: number): Promise<Student>
  abstract findByDivision(divisionId: number): Promise<Student[]>
  abstract findByIdsAndDivision(studentIds: number[], divisionId: number): Promise<Student[]>;
}
