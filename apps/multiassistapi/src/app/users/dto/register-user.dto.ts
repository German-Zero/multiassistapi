import { RoleEnum } from "../../common/enums";

export class RegisterUserDto {
  email: string;
  name: string;
  lastname: string;
  dni: string;
  userType: RoleEnum;
}
