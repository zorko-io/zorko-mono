const Server = {
  baseUrl: 'http://localhost:3000'
};

const Users  = {
  JoeUser : {
    email: 'test@email.com',
    password: '1234567',
    roles: ['user']
  },
  AdminUser : {
    email: 'admin@email.com',
    password: 'qwerty',
    roles: ['admin']
  }
};

export { Users, Server }

