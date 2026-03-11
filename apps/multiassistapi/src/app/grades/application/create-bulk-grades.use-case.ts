import { Injectable } from "@nestjs/common";
import { GradesRepository } from "../domain/grades.repository";
import { CreateBulkGradesDto } from "../dto/create-bulk-grades.dto";
import { Grade } from "../infrastructure/grades.entity";
import { Student } from "../../students/infrastructure/students.entity";
import { Curriculum } from "../../curriculum/infrastructure/curriculum.entity";
import { Trimester } from "../infrastructure/trimester.entity";

@Injectable()
export class CreateBulkGradesUseCase {
  constructor(
    private readonly gradeRepository: GradesRepository
  ) {}

  async execute(dto: CreateBulkGradesDto) {
    const grades: Grade[] = dto.grades.map(item =>{
      const grade = new Grade();
      grade.student = { id: item.studentId } as Student;
      grade.curriculum = { id: dto.curriculumId } as Curriculum;
      grade.trimester = { id: dto.trimesterId } as Trimester;
      grade.description = dto.description;
      grade.type = dto.type;
      grade.value = item.value;
      return grade;
    });
    await this.gradeRepository.saveBulkGrades(grades);

    return {
      inserted: grades.length
    }
  }
}
