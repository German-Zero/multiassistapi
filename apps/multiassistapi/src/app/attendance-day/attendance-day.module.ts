import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AttendanceDay } from "./infrastructure/attendance-day.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AttendanceDay])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AttendanceDayModule {}
