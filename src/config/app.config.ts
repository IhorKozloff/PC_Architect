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
    LANDING: {
      HERO: {
        NEXT_BUILD_TEXT: 'YOUR NEXT BUILD STARTS HERE',
        MAIN_HEADING_TEXT: {
          main: 'Build Beyond',
          hightLighted: 'Limits.'
        },
        CTA_BUTTON_MAIN: 'Start Building',
        DESCRIPTION: 'Your vision. Your components. Your PC. Choose your parts, see the total, and save a build that\'s entirely yours.',
        SIGN_IN_TEXT: 'Sign in to create and save your build.',
        PREVIEW: {
          PROCESSOR: { label: 'PROCESSOR', name: 'AMD Ryzen 7 7800X3D', price: '$39,990.00' },
          MEMORY: { label: 'MEMORY', name: 'G.Skill Trident Z5', details: '32GB DDR5', price: '$18,990.00' },
          GRAPHICS: { label: 'GRAPHICS', name: 'NVIDIA RTX 4080', price: '$119,990.00' },
          CAPTION: 'Example configuration · Demo prices from the sample catalog',
        },
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
      },
      FEATURES: {
        EYEBROW_TEXT: 'BUILT AROUND YOUR CHOICES',
        MAIN_HEADING_TEXT: 'Features',
        DESCRIPTION: 'The essentials for putting your next PC together, one component at a time.',
        ITEMS: [
          { iconName: 'Layers', title: 'Eight component categories', description: 'Choose your CPU, graphics card, motherboard, RAM, storage, power supply, case, and cooling.' },
          { iconName: 'RefreshCw', title: 'Swap parts as you go', description: 'Change a selected component from its category dialog while keeping the rest of your configuration.' },
          { iconName: 'Calculator', title: 'A total that keeps up', description: 'See individual component prices and a running total based on the parts in your current build.' },
          { iconName: 'Save', title: 'Save your configuration', description: 'Give your build a name and save the selected components and total price to your account.' },
        ],
      },
      COMPONENTS: {
        EYEBROW_TEXT: 'EVERY PART HAS A PLACE',
        MAIN_HEADING_TEXT: 'Components',
        DESCRIPTION: 'Explore the eight categories that bring your next PC together.',
        CATEGORY_NAMES: {
          cpu: 'CPU', gpu: 'Videocard', motherboard: 'Motherboard', ram: 'RAM',
          storage: 'Storage', psu: 'PSU', case: 'Case', cooling: 'Cooling',
        },
      },
      FINAL_CTA: {
        EYEBROW_TEXT: 'YOUR VISION. YOUR BUILD.',
        MAIN_HEADING_TEXT: 'Ready to build beyond limits?',
        DESCRIPTION: 'Choose your components, review the total, and make your next PC your own.',
        CTA_BUTTON_MAIN: 'Start Building',
        SIGN_IN_TEXT: 'Sign in to create and save your build.',
      },
      FOOTER: {
        BRAND: { main: 'PC', highlighted: 'Architect' },
        DESCRIPTION: 'Your vision. Your components. Your PC.',
        NAV_LABEL: 'Footer',
        LINKS: [
          { href: '/', label: 'Home' },
          { href: '/dashboard', label: 'Start Building' },
          { href: '/login', label: 'Log In' },
          { href: '/signup', label: 'Sign Up' },
        ],
      },
      HOW_IT_WORKS: {
        EYEBROW_TEXT: 'FROM IDEA TO CONFIGURATION',
        MAIN_HEADING_TEXT: 'How It Works',
        DESCRIPTION: 'Three steps to a build that starts with your choices.',
        STEPS: [
          {
            iconName: 'Cpu',
            title: 'Choose your components',
            description: 'Sign in and pick parts across eight categories, from the processor to the cooling system.',
          },
          {
            iconName: 'Calculator',
            title: 'Review your build',
            description: 'Check your selected models and see the total price update as you add or replace parts.',
          },
          {
            iconName: 'Save',
            title: 'Give it a name. Save it.',
            description: 'Open the save dialog, name your configuration, and save it to your account.',
          },
        ],
      }
    },
    DASHBOARD: {
      SAVE_BUILD_DIALOG: {
        title: 'Save build',
        description: 'Enter the build name',
        placeholder: 'For example: Gaming PC'
      }
    },
  },
  ROUTES: {
    dashboard: '/dashboard'
  }
} as const;
