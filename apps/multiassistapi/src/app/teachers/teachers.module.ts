import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Teacher } from "./infrastructure/teachers.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [],
  providers: [],
  exports: [],
})
export class TeacherModule {}
