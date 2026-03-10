export class TeacherCurriculumDto {
  curriculumId: number;
  weeklyHours: number;

  subject: {
    name: string;
  }

  division: {
    id: number
    shift: string;
    letter: string;
    academicLevel: {
      name: string;
    }
  }
}
