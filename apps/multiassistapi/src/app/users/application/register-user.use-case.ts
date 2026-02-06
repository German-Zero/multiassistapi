import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "../domain/user.token";
import { UserRepository } from "../domain/user.repository";
import { ROLE_REPOSITORY } from "../../roles/domain/role.token";
import { RoleRepository } from "../../roles/domain/role.repository";
import { RegisterUserDto } from "../dto/register-user.dto";
import { USER_SUB_ROLES } from "../../common/role.rules";
import { RoleEnum } from "../../common/enums";
import { User } from "../infrastructure/user.entity";
import { PasswordHasher } from "../../common/security/password-hasher";

@Injectable()
export class RegisterUserUseCase {
  constructor (
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,

    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(dto: RegisterUserDto) {
    if (!USER_SUB_ROLES.includes(dto.userType)) {
      throw new Error('Tipo de usuario inválido');
    }

    const hashedPassword = await this.passwordHasher.hash(dto.dni)
    const userRole = await this.roleRepo.findByName(RoleEnum.USER);
    const subRole = await this.roleRepo.findByName(dto.userType);

    if (!userRole || !subRole) {
      throw new Error('Roles mal configurados');
    }

    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.middleName = dto.middlename;
    user.lastname = dto.lastname;
    user.displayName = `${dto.name} ${dto.middlename} ${dto.lastname}`;
    user.dni = dto.dni;

    user.password = hashedPassword;
    user.passwordChanged = false;

    user.roles = [userRole, subRole];

    return this.userRepo.save(user);
  }
}
