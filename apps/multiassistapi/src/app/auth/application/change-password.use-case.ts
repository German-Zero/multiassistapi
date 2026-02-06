import { Inject, Injectable } from "@nestjs/common";
import { USER_REPOSITORY } from "../../users/domain/user.token";
import { UserRepository } from "../../users/domain/user.repository";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { PasswordHasher } from "../../common/security/password-hasher";

@Injectable()
export class ChangePasswordUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(id: number, dto: ChangePasswordDto) {
    const user = await this.userRepo.findById(id);

    if (!user) throw new Error('Usuario no existe');

    if (user.passwordChanged) {
      throw new Error('Contraseña ya fue cambiada');
    }

    const hashedPassword = await this.passwordHasher.hash(dto.newPassword);

    user.password = hashedPassword;
    user.passwordChanged = true;

    return this.userRepo.save(user);
  }
}
