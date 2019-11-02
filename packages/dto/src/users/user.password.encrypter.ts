export interface UserPasswordEncrypter {
  (data: string, options?: object): Promise<string>;
}
