import { parseAuthFormData, validateAuthData } from '@/app/signup/actions/signupValidation';
import { appConfig } from '@/config/app.config';
import { authTestData } from '../testData';

describe('parseAuthFormData', () => {
  it('parses signup form data', () => {
    const formData = new FormData();

    Object.entries(authTestData.valid).forEach(([key, value]) => {
      formData.set(key, value);
    });

    const result = parseAuthFormData(formData);

    expect(result).toEqual(authTestData.valid);
  });

  it('returns undefined for missing fields', () => {
    const formData = new FormData();

    const result = parseAuthFormData(formData);

    expect(result).toEqual({
      name: undefined,
      email: undefined,
      password: undefined
    });
  });
});

describe('validateAuthData', () => {
  it('returns error when email is missing', () => {
    const result = validateAuthData(
      authTestData.missingEmail
    );

    expect(result).toEqual({
      success: false,
      error: appConfig.ERRORS.SIGN_UP.EMAIL_REQUIRED
    });
  });

  it('returns error when email is invalid', () => {
    const result = validateAuthData(
      authTestData.invalidEmail
    );

    expect(result).toEqual({
      success: false,
      error: appConfig.ERRORS.SIGN_UP.EMAIL_INVALID
    });
  });

  it('returns error when password is too short', () => {
    const result = validateAuthData(
      authTestData.shortPassword
    );

    expect(result).toEqual({
      success: false,
      error: appConfig.ERRORS.SIGN_UP.PASSWORD_TOO_SHORT
    });
  });

  it('returns valid data when email and password are valid', () => {
    const result = validateAuthData(
      authTestData.valid
    );

    expect(result).toEqual({
      success: true,
      data: authTestData.valid
    });
  });
});