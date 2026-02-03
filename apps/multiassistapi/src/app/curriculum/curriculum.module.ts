import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Curriculum } from "./infrastructure/curriculum.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Curriculum])],
  controllers: [],
  providers: [],
  exports: [],
})
export class CurriculumModule {}
