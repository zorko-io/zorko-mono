import * as faker from 'faker';
import { Repository } from './repository';

export class RepositoryFakeGenerator {

  getOneRandomValidRepository(): Repository {
    return {
      id: faker.random.uuid(),
      name: faker.lorem.text(5),
      description: faker.lorem.sentence(20),
      owner: faker.random.uuid()
    }
  }

  getOneWrongName(): Repository {
    return {
      id: faker.random.uuid(),
      name: '',
      description: faker.lorem.sentence(20),
      owner: faker.random.uuid()
    }
  }


  getOneWrongDescription(): Repository {
    return {
      id: faker.random.uuid(),
      name: faker.lorem.text(5),
      description: '',
      owner: faker.random.uuid()
    }
  }

  getOneMissedOwner(): Repository {
    return {
      id: faker.random.uuid(),
      name: faker.lorem.text(5),
      description: faker.lorem.sentence(20),
      owner: ''
    }
  }
}


export const repositoryFakeGenerator = new RepositoryFakeGenerator();





