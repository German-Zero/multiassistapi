import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./infrastructure/roles.entity";
import { RoleRepositoryImpl } from "./infrastructure/role.repository.impl";
import { RoleRepository } from "./domain/role.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [],
  providers: [
    {
      provide: RoleRepository,
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: [RoleRepository],
})
export class RoleModule {}
