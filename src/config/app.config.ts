export const MIN_PASSWORD_LENGTH = 8;

export const appConfig = {
  AUTH: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  }, 
  ERRORS: {
    SIGN_UP: {
      EMAIL_REQUIRED: 'Enter an email!',
      EMAIL_INVALID: 'Email format is not valid!',
      PASSWORD_TOO_SHORT: `The password must contain at least ${MIN_PASSWORD_LENGTH} characters.`,
      EMAIL_TAKEN: 'The email is already taken.'
    }
  }
} as const;