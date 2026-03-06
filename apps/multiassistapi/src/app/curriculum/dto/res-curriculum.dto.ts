export class CurriculumResponseDto {
  id: number;
  weeklyHours: number;

  subjectName: string;
  academicLevelName: string;

  division: {
    shift: string;
    letter: string;
  }
}
