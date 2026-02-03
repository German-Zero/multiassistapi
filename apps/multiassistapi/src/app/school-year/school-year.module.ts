import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchoolYear } from "./infrastructure/schools-year.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SchoolYear])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SchoolYearModule {}
