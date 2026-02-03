import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { UsersModule } from './users/infrastructure/users.module';
import { TeacherModule } from './teachers/teachers.module';
import { AcademicLevelModule } from './academic-level/academic-level.module';
import { AddressModule } from './addresses/addresses.module';
import { AttendanceModule } from './attendance/attendance.module';
import { AttendanceDayModule } from './attendance-day/attendance-day.module';
import { DiscilpinaryActionModule } from './disciplinary-actions/disciplinary-actions.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { DivisionModule } from './divisions/divisions.module';
import { GradeModule } from './grades/grades.module';
import { RoleModule } from './roles/roles.module';
import { SchoolCalendarModule } from './school-calendar/school-calendar.module';
import { SchoolYearModule } from './school-year/school-year.module';
import { SchoolModule } from './schools/schools.module';
import { StudentModule } from './students/students.module';
import { TeacherAssignmentModule } from './teacher-assignments/teacher-assignments.module';
import { SubjectModule } from './subjects/subjects.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    TeacherModule,
    AcademicLevelModule,
    AddressModule,
    AttendanceModule,
    AttendanceDayModule,
    DiscilpinaryActionModule,
    CurriculumModule,
    DivisionModule,
    GradeModule,
    RoleModule,
    SchoolCalendarModule,
    SchoolYearModule,
    SchoolModule,
    StudentModule,
    TeacherAssignmentModule,
    SubjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
