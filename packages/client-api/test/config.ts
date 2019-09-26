const Server = {
  baseUrl: 'http://localhost:7777'
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

const UserProfiles = {
  JoeUserProfile: {
    login: 'test'
  },
};

export { Users, Server, UserProfiles }

