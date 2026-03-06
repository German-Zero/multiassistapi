export class TeacherCurriculumDto {
  curriculumId: number;
  weeklyHours: number;

  subjectName: string;
  academicLevelName: string;

  division: {
    shift: string;
    letter: string;
  }
}
