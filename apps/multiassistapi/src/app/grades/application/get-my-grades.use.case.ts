import { Injectable } from "@nestjs/common";
import { GradesRepository } from "../domain/grades.repository";
import { StudentCurriculumGradesDto } from "../dto/student-curricculum-grades.dto";

@Injectable()
export class GetMyGradesUseCase {
  constructor(
    private readonly repo: GradesRepository
  ) {}

  async execute(userId: number) {
    const rows = await this.repo.findGradesByUser(userId);
    const map = new Map<number, StudentCurriculumGradesDto>();
    for (const row of rows) {
      const curriculumId = Number(row.curriculumId);
      if (!map.has(curriculumId)) {
        map.set(curriculumId, {
          curriculumId,
          subject: row.subjectName,

          trimesters: {
            1: { grades:[], average: null },
            2: { grades:[], average: null },
            3: { grades:[], average: null }
          },
          finalGrade: null
        });
      }
      const curriculum = map.get(curriculumId);
      if (row.gradeId && row.trimester) {
        curriculum.trimesters[Number(row.trimester)].grades.push({
          id: row.gradeId,
          value: Number(row.gradeValue)
        });
      }
    }
    for (const curriculum of map.values()) {
      const trimesterAverages: number[] = [];
      for(const t of [1, 2, 3]) {
        const grades = curriculum.trimesters[t].grades;
        if (grades.length) {
          const avg = grades.reduce((s,g) => s+g.value, 0) / grades.length;

          curriculum.trimesters[t].average = Number(avg.toFixed(2));
          trimesterAverages.push(avg)
        }
      }
      if (trimesterAverages.length) {
        const final = trimesterAverages.reduce((a,b) => a+b) / trimesterAverages.length;

        curriculum.finalGrade = Number(final.toFixed(2))
      }
    }

    return Array.from(map.values());
  }
}
