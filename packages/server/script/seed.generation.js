const fs = require('fs');
const path = require('path');
const faker = require('faker');

async function generateUsers(usersCount) {
  let counter = usersCount;
  let fakeUser;
  const users = [];

  while (counter) {
    fakeUser = {
      email: faker.internet.email(),
      password: faker.internet.password()
    };
    users.push(fakeUser);
    counter = counter - 1;
  }
  return users;
}

generateUsers(10)
  .then(users => {
    fs.writeFileSync(path.join('seed', 'users.json'), JSON.stringify(users, null, 2));
  });
