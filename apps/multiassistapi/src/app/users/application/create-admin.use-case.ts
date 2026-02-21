import { Injectable } from "@nestjs/common";
import { UserRepository } from "../domain/user.repository";
import { RoleRepository } from "../../roles/domain/role.repository";
import { CreateAdminDto } from "../dto/create-admin.dto";
import { RoleEnum } from "../../common/enums";
import { User } from "../infrastructure/user.entity";
import { PasswordHasher } from "../../common/security/password-hasher";

@Injectable()
export class CreateAdminUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly roleRepo: RoleRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(dto: CreateAdminDto) {
    const adminRole = await this.roleRepo.findByName(RoleEnum.ADMIN);
    if (!adminRole) throw new Error('ADMIN no existe');
    const hashedPassword = await this.passwordHasher.hash(dto.password);

    const user = new User();
    user.email = dto.email;
    user.name = dto.name;
    user.middleName = dto.middlename;
    user.lastname = dto.lastname;
    user.displayName = `${dto.name} ${dto.middlename} ${dto.lastname}`;
    user.password = hashedPassword;
    user.dni = dto.dni;
    user.roles = [adminRole];

    return this.userRepo.save(user);
  }
}
