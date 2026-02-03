import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AcademicLevel } from "./infrastructure/academic-level.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AcademicLevel])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AcademicLevelModule {}
