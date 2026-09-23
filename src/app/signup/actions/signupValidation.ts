import { appConfig, MIN_PASSWORD_LENGTH } from '@/config/app.config';
import { SignupData, ValidationResult } from '../types/signupTypes';

export function parseSignupFormData(formData: FormData): SignupData {
  return {
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString()
  };
};

export function validateSignupData(
  data: SignupData
): ValidationResult {
  const { email, password } = data;

  if (!email) {
    return {
      success: false,
      error: appConfig.ERRORS.SIGN_UP.EMAIL_REQUIRED
    };
  }

  if (!appConfig.AUTH.EMAIL_REGEX.test(email)) {
    return {
      success: false,
      error: appConfig.ERRORS.SIGN_UP.EMAIL_INVALID
    };
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return {
      success: false,
      error: appConfig.ERRORS.SIGN_UP.PASSWORD_TOO_SHORT
    };
  }

  return {
    success: true,
    data: {
      name: data.name,
      email,
      password
    }
  };
}