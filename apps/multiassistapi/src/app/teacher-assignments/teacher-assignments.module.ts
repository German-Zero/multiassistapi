import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TeacherAssignment } from "./infrastructure/teacher-assignments.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TeacherAssignment])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TeacherAssignmentModule {}
