import { RoleEnum } from "../../common/enums";
import { Role } from "../infrastructure/roles.entity";

export interface RoleRepository {
  findByName(name: RoleEnum): Promise<Role | null>;
}
