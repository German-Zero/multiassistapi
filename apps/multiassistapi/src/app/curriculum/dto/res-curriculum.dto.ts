export class CurriculumResponseDto {
  id: number;
  weeklyHours: number;

  subject: {
    name: string;
  };

  division: {
    shift: string;
    letter: string;
    academicLevel: {
      name: string;
    }
  }
}
