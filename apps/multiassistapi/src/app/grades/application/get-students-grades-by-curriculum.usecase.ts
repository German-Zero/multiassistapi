import { Injectable } from "@nestjs/common";
import { GradesRepository } from "../domain/grades.repository";
import { StudentGradesDto } from "../dto/student-grades.dto";

@Injectable()
export class GetStudentsGradesByCurriculumUseCase {

  constructor(
    private readonly repo: GradesRepository
  ) {}

    async execute(curriculumId: number): Promise<StudentGradesDto[]> {
    const rows =
      await this.repo.getGradeByCurriculum(curriculumId);
    const studentsMap = new Map<number, StudentGradesDto>();
    const addedGrades = new Set<number>();
    for (const row of rows) {
      if (!studentsMap.has(row.studentid)) {
        studentsMap.set(row.studentid, {
          studentId: row.studentid,
          studentName: `${row.firstname} ${row.lastname}`,
          trimesters: {
            1: { grades: [], average: null },
            2: { grades: [], average: null },
            3: { grades: [], average: null }
          },
          recoveryExam: null,
          finalGrade: null
        });
      }
      const student = studentsMap.get(row.studentid);
      if (row.gradeid && row.trimester && !addedGrades.has(row.gradeid)) {
        addedGrades.add(row.gradeid)
        student.trimesters[row.trimester].grades.push({
          id: row.gradeid,
          value: Number(row.gradevalue)
        });
      }
    }
    for (const student of studentsMap.values()) {
      const trimesterAverages = [];
      for (const t of [1,2,3]) {
        const grades = student.trimesters[t].grades;
        if (grades.length) {
          const avg =
            grades.reduce((s,g)=>s+g.value,0) / grades.length;
          student.trimesters[t].average =
            Number(avg.toFixed(2));
          trimesterAverages.push(avg);
        }
      }
      if (trimesterAverages.length) {
        const final =
          trimesterAverages.reduce((a,b)=>a+b) /
          trimesterAverages.length;
        student.finalGrade =
          Number(final.toFixed(2));
      }
    }
    return Array.from(studentsMap.values());
  }
}
