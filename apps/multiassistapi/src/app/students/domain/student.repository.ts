import { Student } from "../infrastructure/students.entity";

export abstract class StudentRepository {
  abstract findByUserIds(userIds: number[]): Promise<Student[]>;
  abstract saveMany(students: Student[]): Promise<Student[]>;
}
