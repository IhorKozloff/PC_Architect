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
    },
    SIGN_IN: {
      INVALID_EMAIL_OR_PASSWORD: 'Invalid email or password',
      AUTHORIZATION_ERROR: 'Authorization error'
    }
  },
  TEXT: {
    LANDING:{ 
      HERO: {
        NEXT_BUILD_TEXT: 'YOUR NEXT BUILD STARTS HERE', 
        MAIN_HEADING_TEXT: {
          main: 'Build Beyond',
          hightLighted: 'Limits.'
        },
        CTA_BUTTON_MAIN: 'Start Building',
        FEATURES_LIST: [
          {
            primary: 'Choose your parts', 
            secondary: '8 component categories',
            iconName: 'Cpu'
          },
          {
            primary: 'See the total', 
            secondary: 'Price updates as you build',
            iconName: 'Calculator'
          },
          {
            primary: 'Make it yours', 
            secondary: 'Name and save your build',
            iconName: 'Save'
          },
        ],
        MAIN_IMG_ALT: "Custom black PC with a glass side panel, liquid cooling, and violet and cyan lighting"
      }
    }
  },
  ROUTES: {
    dashboard: '/dashboard'
  }
} as const;