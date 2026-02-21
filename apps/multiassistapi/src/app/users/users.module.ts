import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./infrastructure/user.entity";
import { RoleModule } from "../roles/roles.module";
import { UsersController } from "./api/users.controller";
import { UserRepositoryImpl } from "./infrastructure/user.repository.impl";
import { GetUserUseCase } from "./application/get-user.use-case";
import { CreateUserUseCase } from "./application/create-user.use-case";
import { CreateAdminUseCase } from "./application/create-admin.use-case";
import { PasswordHasher } from "../common/security/password-hasher";
import { UserRepository } from "./domain/user.repository";
import { BcryptPasswordHasher } from "../common/security/bcrypt-password-hasher.service";
import { GetUsersByRoleUseCase } from "./application/get-user-by-role.use-case";
import { UpdateUserUseCase } from "./application/update-user.use-case";
import { DeleteUserUseCase } from "./application/delete-user.use-case";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
  ],
  controllers: [UsersController],
  providers: [
    GetUserUseCase,
    GetUsersByRoleUseCase,
    CreateUserUseCase,
    CreateAdminUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: UserRepository,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PasswordHasher,
      useClass: BcryptPasswordHasher,
    }
  ],
  exports: [UserRepository]
})
export class UsersModule {}
