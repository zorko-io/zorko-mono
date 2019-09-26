import * as faker from 'faker';
import { Repository } from './repository';

export function getOneRandomValidRepository(): Repository {
  return {
    id: faker.random.uuid(),
    name: faker.lorem.text(5),
    description: faker.lorem.sentence(20),
    owner: faker.random.uuid()
  }
}

export function getOneWrongName(): Repository {
  return {
    id: faker.random.uuid(),
    name: '',
    description: faker.lorem.sentence(20),
    owner: faker.random.uuid()
  }
}

export function getOneWrongDescription(): Repository {
  return {
    id: faker.random.uuid(),
    name: faker.lorem.text(5),
    description: '',
    owner: faker.random.uuid()
  }
}

export function getOneMissedOwner(): Repository {
  return {
    id: faker.random.uuid(),
    name: faker.lorem.text(5),
    description: faker.lorem.sentence(20),
    owner: ''
  }
}



