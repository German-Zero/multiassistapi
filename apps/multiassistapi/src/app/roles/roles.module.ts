import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./infrastructure/roles.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [],
  providers: [],
  exports: [],
})
export class RoleModule {}
