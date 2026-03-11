export class StudentCurriculumGradesDto {
  curriculumId: number;
  subject: string;
  trimesters: {
    1: { grades: { id:number; value: number }[]; average:number | null }
    2: { grades: { id:number; value: number }[]; average:number | null }
    3: { grades: { id:number; value: number }[]; average:number | null }
  };

  finalGrade: number | null;
}
