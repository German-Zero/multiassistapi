import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './config/database.config';
import { TeacherModule } from './teachers/teachers.module';
import { AcademicLevelModule } from './academic-level/academic-level.module';
import { AddressModule } from './addresses/addresses.module';
import { AttendanceModule } from './attendance/attendance.module';
import { DiscilpinaryActionModule } from './disciplinary-actions/disciplinary-actions.module';
import { CurriculumModule } from './curriculum/curriculum.module';
import { DivisionModule } from './divisions/divisions.module';
import { GradeModule } from './grades/grades.module';
import { RoleModule } from './roles/roles.module';
import { SchoolModule } from './schools/schools.module';
import { StudentModule } from './students/students.module';
import { SubjectModule } from './subjects/subjects.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthController } from './health/health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(databaseConfig),
    AuthModule,
    UsersModule,
    TeacherModule,
    AcademicLevelModule,
    AddressModule,
    AttendanceModule,
    DiscilpinaryActionModule,
    CurriculumModule,
    DivisionModule,
    GradeModule,
    RoleModule,
    SchoolModule,
    StudentModule,
    SubjectModule,
    ScheduleModule,
  ],
  controllers: [AppController, HealthController],
  providers: [AppService],
})
export class AppModule {}
