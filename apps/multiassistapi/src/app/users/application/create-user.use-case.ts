import { Injectable } from "@nestjs/common";
import { RoleRepository } from "../../roles/domain/role.repository";
import { UserRepository } from "../domain/user.repository";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../infrastructure/user.entity";
import { USER_SUB_ROLES } from "../../common/role.rules";
import { RoleEnum } from "../../common/enums";
import { IsEnum } from "class-validator";
import { PasswordHasher } from "../../common/security/password-hasher";
import { School } from "../../schools/infrastructure/schools.entity";

@Injectable()
export class CreateUserUseCase {
  @IsEnum(RoleEnum)
  userType: RoleEnum;
  constructor(
    private readonly roleRepo: RoleRepository,
    private readonly userRepo: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(dto: CreateUserDto) {
    if (!USER_SUB_ROLES.includes(dto.userType)) {
      throw new Error('Tipo de usuario invalido');
    }

    const hashedPassword = await this.passwordHasher.hash(dto.dni)
    const baseRole = await this.roleRepo.findByName(RoleEnum.USER);
    const subRole = await this.roleRepo.findByName(dto.userType);

    if (!baseRole || !subRole) {
      throw new Error('Roles mal configurados');
    }

  const user = new User();
  user.email = dto.email;
  user.name = dto.name;
  user.middleName = dto.middlename;
  user.lastname = dto.lastname;
  user.displayName = `${dto.name} ${dto.middlename} ${dto.lastname}`;
  user.password = hashedPassword;
  user.passwordChanged = false;
  user.dni = dto.dni;
  if (dto.userType === RoleEnum.ADMIN) {
    const adminRole = await this.roleRepo.findByName(RoleEnum.ADMIN);
    user.roles = [adminRole];
  } else {
    user.roles = [baseRole, subRole];
  }
  user.school = {id: dto.schoolId } as School;

  return this.userRepo.save(user);
  }
}
