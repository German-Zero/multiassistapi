import { Injectable, NotFoundException } from "@nestjs/common";
import { CurriculumRepository } from "../domain/curriculum.repository";
import { StudentRepository } from "../../students/domain/student.repository";

@Injectable()
export class GetStudentByCurriculumUseCase {
  constructor(
    private readonly curriculumRepo: CurriculumRepository,
    private readonly studentRepo: StudentRepository,
  ) {}

  async execute(id: number) {
    const curriculum = await this.curriculumRepo.findById(id);

    if (!curriculum) throw new NotFoundException('Curriculum Not Found')

    const students = await this.studentRepo.findByDivision(curriculum.division.id)

    return students.map(s => ({
      studentId: s.id,
      name: s.user.name,
      lastname: s.user.lastname,
      email: s.user.email,
    }))
  }
}
