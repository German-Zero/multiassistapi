import { RoleEnum } from "../../common/enums";

export class CreateUserDto {
  email: string;
  name: string;
  middlename?: string;
  lastname: string;
  password: string;
  dni: string;
  userType: RoleEnum;
  schoolId: number;
}
