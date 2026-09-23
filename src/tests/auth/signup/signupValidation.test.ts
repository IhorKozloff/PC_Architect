import { parseSignupFormData, validateSignupData } from '@/app/signup/actions/signupValidation';
import { appConfig } from '@/config/app.config';
import { signupTestData } from './testData';

describe('parseSignupFormData', () => {
  it('parses signup form data', () => {
    const formData = new FormData();

    Object.entries(signupTestData.valid).forEach(([key, value]) => {
      formData.set(key, value);
    });

    const result = parseSignupFormData(formData);

    expect(result).toEqual(signupTestData.valid);
  });

  it('returns undefined for missing fields', () => {
    const formData = new FormData();

    const result = parseSignupFormData(formData);

    expect(result).toEqual({
      name: undefined,
      email: undefined,
      password: undefined
    });
  });
});

describe('validateSignupData', () => {
  it('returns error when email is missing', () => {
    const result = validateSignupData(
      signupTestData.missingEmail
    );

    expect(result).toEqual({
      success: false,
      error: appConfig.ERRORS.SIGN_UP.EMAIL_REQUIRED
    });
  });

  it('returns error when email is invalid', () => {
    const result = validateSignupData(
      signupTestData.invalidEmail
    );

    expect(result).toEqual({
      success: false,
      error: appConfig.ERRORS.SIGN_UP.EMAIL_INVALID
    });
  });

  it('returns error when password is too short', () => {
    const result = validateSignupData(
      signupTestData.shortPassword
    );

    expect(result).toEqual({
      success: false,
      error: appConfig.ERRORS.SIGN_UP.PASSWORD_TOO_SHORT
    });
  });

  it('returns valid data when email and password are valid', () => {
    const result = validateSignupData(
      signupTestData.valid
    );

    expect(result).toEqual({
      success: true,
      data: signupTestData.valid
    });
  });
});