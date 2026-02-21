import { RoleEnum } from "../../common/enums";
import { Role } from "../infrastructure/roles.entity";

export abstract class RoleRepository {
  abstract findByName(name: RoleEnum): Promise<Role | null>;
}
