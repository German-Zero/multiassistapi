import { Teacher } from "../infrastructure/teachers.entity";

export abstract class TeacherRepository {
  abstract save(teacher: Teacher): Promise<Teacher>
}
