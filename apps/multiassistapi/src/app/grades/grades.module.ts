import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Grade } from "./infrastructure/grades.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Grade])],
  controllers: [],
  providers: [],
  exports: [],
})
export class GradeModule {}
