import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./infrastructure/teachers.entity";
import { TeacherAssignment } from "./infrastructure/teacher-assignments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Teacher, TeacherAssignment])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TeacherModule {}
