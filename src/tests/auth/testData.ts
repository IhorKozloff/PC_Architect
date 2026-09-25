export const authTestData = {
  valid: {
    name: 'Ihor',
    email: 'ihor@example.com',
    password: '12345678'
  },

  invalidEmail: {
    email: 'invalid-email',
    password: '12345678'
  },

  shortPassword: {
    email: 'ihor@example.com',
    password: '1234567'
  },

  missingEmail: {
    password: '12345678'
  },

  existingUser: {
    id: 'user-id',
    email: 'ihor@example.com',
    name: 'Ihor',
    password: 'hashed-password'
  }

};