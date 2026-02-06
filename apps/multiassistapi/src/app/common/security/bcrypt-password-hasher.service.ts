import { Injectable } from "@nestjs/common";
import { PasswordHasher } from "./password-hasher";
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  private readonly SALT_ROUNDS = 10;

  hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.SALT_ROUNDS);
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }
}
