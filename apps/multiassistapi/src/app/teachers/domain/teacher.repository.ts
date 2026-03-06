import { Teacher } from "../infrastructure/teachers.entity";

export abstract class TeacherRepository {
  abstract findByUserId(userId: number): Promise<Teacher[]>
  abstract findCurriculumByUserId(userId: number): Promise<Teacher[]>
  abstract deleteByUserId(userId: number): Promise<void>
  abstract createMany(teachers: Teacher[]): Promise<Teacher[]>
}
