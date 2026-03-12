import { TrimesterGradesDto } from "../../grades/dto/trimester-grades.dto";

export class StudentGradesDto {
  studentId: number;
  studentName: string;
  trimesters: {
    1: TrimesterGradesDto;
    2: TrimesterGradesDto;
    3: TrimesterGradesDto;
  }

  recoveryExam: number | null;
  finalGrade: number | null;
}
