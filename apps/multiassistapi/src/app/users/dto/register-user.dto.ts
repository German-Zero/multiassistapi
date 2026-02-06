import { RoleEnum } from "../../common/enums";

export class RegisterUserDto {
  email: string;
  name: string;
  middlename?: string;
  lastname: string;
  dni: string;
  userType: RoleEnum;
}
