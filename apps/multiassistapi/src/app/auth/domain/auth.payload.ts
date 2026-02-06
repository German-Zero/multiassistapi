import { RoleEnum } from "../../common/enums";

export interface AuthPayLoad {
  sub: number;
  email: string;
  roles: RoleEnum[];
}
