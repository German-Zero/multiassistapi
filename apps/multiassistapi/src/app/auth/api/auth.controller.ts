import { Response } from "express";
import { Body, Controller, Get, InternalServerErrorException, Param, Post, Res, UseGuards } from "@nestjs/common";
import { LoginUseCase } from "../application/login.use-case";
import { ChangePasswordDto } from "../dto/change-password.dto";
import { ChangePasswordUseCase } from "../application/change-password.use-case";
import { JwtAuthGuard } from "../infrastructure/jwt.guard";
import { CurrentUser } from "../../common/decorator/current-user.decorator";
import { AuthPayLoad } from "../domain/auth.payload";


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

  @UseGuards(JwtAuthGuard)
  @Post('/change-password/:id')
  changePassword(
    @Param('id') id: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.changePass.execute(id, dto)
  }

  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@CurrentUser() user: AuthPayLoad) {
    return {
      id: user.sub,
      email: user.email,
      role: user.roles,
    }
  }
}
