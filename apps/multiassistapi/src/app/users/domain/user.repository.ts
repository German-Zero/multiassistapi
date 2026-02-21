import { User } from "../infrastructure/user.entity";

export abstract class UserRepository {
  abstract save(user: User): Promise<User>;
  abstract findAll(): Promise<User[]>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findById(id: number): Promise<User | null>;
  abstract findByRole(roleName: string): Promise<User[]>;
  abstract update(user: User): Promise<User>;
  abstract remove(user: User);
}
