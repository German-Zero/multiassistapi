import { Injectable, NotFoundException } from "@nestjs/common";
import { DisciplinaryRepository } from "../domain/disciplinary-actions.repository";
import { StudentRepository } from "../../students/domain/student.repository";
import { PostDisciplinaryDto } from "../dto/post-disciplinary.dto";
import { DiscilpinaryAction } from "../infrastructure/disciplinary-actions.entity";
import { User } from "../../users/infrastructure/user.entity";
import { Student } from "../../students/infrastructure/students.entity";

@Injectable()
export class CreateDisciplinaryUseCase{
  constructor(
    private readonly disciplinaryRepo: DisciplinaryRepository,
    private readonly studentRepo: StudentRepository,
  ) {}

  async execute(dto: PostDisciplinaryDto, user: User) {

    const student = await this.studentRepo.findById(dto.studentId);
    if (!student) throw new NotFoundException('Student Not Found');

    const disciplinary = new DiscilpinaryAction();

    disciplinary.student = { id: dto.studentId } as Student;
    disciplinary.reason = dto.reason;
    disciplinary.severity = dto.severity
    disciplinary.date = new Date().toISOString().split('T')[0];
    disciplinary.issuedBy = { id: user.id } as User;

    return this.disciplinaryRepo.save(disciplinary);
  }
}
