export interface UserPasswordEncrypter {
  hash(data: string): Promise<string>;
  compare(originalPassword: string, hashPassword: string): Promise<boolean>;
}
