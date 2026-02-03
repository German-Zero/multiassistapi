import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SchoolCalendar } from "./infrastructure/school-calendar.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SchoolCalendar])],
  controllers: [],
  providers: [],
  exports: [],
})
export class SchoolCalendarModule {}
