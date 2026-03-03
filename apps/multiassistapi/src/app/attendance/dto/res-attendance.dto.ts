export class AttendanceResponseDto {
  id: number;
  status: string;
  justification: string | null;
  attendanceDay: {
    id: number;
    date: string;
    isOpen: boolean;
  }
}
