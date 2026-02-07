import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./api/auth.controller";
import { LoginUseCase } from "./application/login.use-case";
import { JwtStrategy } from "./infrastructure/jwt.strategy";
import { JwtAuthGuard } from "./infrastructure/jwt.guard";
import { RolesGuard } from "./infrastructure/roles.guard";
import { ChangePasswordUseCase } from "./application/change-password.use-case";
import { PasswordHasher } from "../common/security/password-hasher";
import { BcryptPasswordHasher } from "../common/security/bcrypt-password-hasher.service";

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    LoginUseCase,
    ChangePasswordUseCase,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
    {
      provide: PasswordHasher,
      useClass: BcryptPasswordHasher,
    }
  ],
})
export class AuthModule {}
