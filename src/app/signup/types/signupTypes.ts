export type SignupState = {
  error?: string;
};

export type SignupData = {
  name?: string;
  email?: string;
  password?: string;
};

export type ValidSignupData = {
  name?: string;
  email: string;
  password: string;
};

export type ValidationResult =
  | {
    success: true;
    data: ValidSignupData;
  }
  | {
    success: false;
    error: string;
  };