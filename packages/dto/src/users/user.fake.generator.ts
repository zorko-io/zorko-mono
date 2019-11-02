import { User } from './user';
import * as faker from 'faker';

export class UserFakeGenerator {

  getMinimalRandomValidUser (): User {
    return {
      email: faker.internet.email(),
      password: faker.internet.password()
    }
  }

  getRandomValidUser (): User {
    return {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      roles: [],
      password: faker.internet.password(),
      login: faker.random.word()
    }
  }

  getRandomValidUserOnlyWithHashPassword (): User {
    return {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      roles: [],
      hashPassword: faker.internet.password(),
      login: faker.random.word()
    }
  }

  getRandomUserWithoutLogin (): User {
    return {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      roles: [],
      hashPassword: faker.internet.password(),
    }
  }

  getRandomUserWithWrongEmail(): User {
    return {
      id: faker.random.uuid(),
      email: 'fdf###ffsdfe43444.fdfdfd',
      roles: [],
      password: faker.internet.password(),
      login: faker.random.word()
    }
  }
}

export const userFakeGenerator = new UserFakeGenerator();

export default new UserFakeGenerator();
