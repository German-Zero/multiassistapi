import { Response } from "express";
import { Body, Controller, InternalServerErrorException, Param, Post, Res } from "@nestjs/common";
import { LoginUseCase } from "../application/login.use-case";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { ChangePasswordUseCase } from "../application/change-password.use-case";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly login: LoginUseCase,
    private readonly changePass: ChangePasswordUseCase,
  ) {}

  @Post('/login')
  async loginUser(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.login.execute(body.email, body.password)

    if ('mustChangePassword' in result) {
      return result;
    }
    if (!result.access_token) {
      throw new InternalServerErrorException('Token not generated')
    }

    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 1000 * 60 * 60 * 24,
    });

    return { ok: true };
  }

  @Post('/change-password/:id')
  changePassword(
    @Param('id') id: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.changePass.execute(id, dto)
  }

  @Post('/logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });

    return { ok: true };
  }
}
