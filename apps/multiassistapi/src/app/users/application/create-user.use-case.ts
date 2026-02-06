import { Inject, Injectable } from "@nestjs/common";
import { RoleRepository } from "../../roles/domain/role.repository";
import { UserRepository } from "../domain/user.repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../infrastructure/user.entity";
import { USER_REPOSITORY } from "../domain/user.token";
import { ROLE_REPOSITORY } from "../../roles/domain/role.token";
import { USER_SUB_ROLES } from "../../common/role.rules";
import { RoleEnum } from "../../common/enums";

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(ROLE_REPOSITORY)
    private readonly roleRepo: RoleRepository,

    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,
  ) {}

  async execute(dto: CreateUserDto) {
    if (!USER_SUB_ROLES.includes(dto.userType)) {
      throw new Error('Tipo de usuario invalido');
    }

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
  user.password = dto.password;
  user.dni = dto.dni;
  user.roles = [userRole, subRole];

  return this.userRepo.save(user);
  }
}
