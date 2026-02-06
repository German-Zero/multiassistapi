import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./infrastructure/user.entity";
import { RoleModule } from "../roles/roles.module";
import { UsersController } from "./api/users.controller";
import { CreateUserUseCase } from "./application/create-user.use-case";
import { UserRepositoryImpl } from "./infrastructure/user.repository.impl";
import { USER_REPOSITORY } from "./domain/user.token";
import { CreateAdminUseCase } from "./application/create-admin.use-case";
import { RegisterUserUseCase } from "./application/register-user.use-case";
import { PasswordHasher } from "../common/security/password-hasher";
import { BcryptPasswordHasher } from "../common/security/bcrypt-password-hasher.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
  ],
  controllers: [UsersController],
  providers: [
    CreateUserUseCase,
    CreateAdminUseCase,
    RegisterUserUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: PasswordHasher,
      useClass: BcryptPasswordHasher,
    }
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
