import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role } from "./infrastructure/roles.entity";
import { RoleRepositoryImpl } from "./infrastructure/role.repository.impl";
import { ROLE_REPOSITORY } from "./domain/role.token";

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [],
  providers: [
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: [ROLE_REPOSITORY],
})
export class RoleModule {}
