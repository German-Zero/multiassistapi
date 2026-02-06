import { Inject, UnauthorizedException } from "@nestjs/common";
import { USER_REPOSITORY } from "../../users/domain/user.token";
import { UserRepository } from "../../users/domain/user.repository";
import { JwtService } from "@nestjs/jwt";
import { AuthPayLoad } from "../domain/auth.payload";
import { PasswordHasher } from "../../common/security/password-hasher";

export class LoginUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepo: UserRepository,

    private readonly jwtService: JwtService,

    private readonly passwordHashed: PasswordHasher,
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepo.findByEmail(email);

    const isValid = await this.passwordHashed.compare(
      password,
      user.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!isValid) {
      throw new UnauthorizedException();
    }

    if (!user.passwordChanged) {
      return {
        mustChangePassword: true,
        userId: user.id,
      };
    }

    const payload: AuthPayLoad = {
      sub: user.id,
      email: user.email,
      roles: user.roles.map(r => r.name),
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
