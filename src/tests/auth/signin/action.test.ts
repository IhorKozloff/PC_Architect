import { authTestData } from '../testData';
import { loginAction } from '@/app/login/actions';
import { appConfig } from '@/config/app.config';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

jest.mock('@/auth', () => ({
  signIn: jest.fn()
}));

jest.mock('next-auth', () => ({
  AuthError: class MockAuthError extends Error {
    type: string;

    constructor(type: string) {
      super(type);
      this.type = type;
    }
  }
}));

const mockSignIn = jest.mocked(signIn);

function createFormData(data: {
  email?: string;
  password?: string;
}) {
  const formData = new FormData();

  if (data.email !== undefined) {
    formData.set('email', data.email);
  }

  if (data.password !== undefined) {
    formData.set('password', data.password);
  }

  return formData;
}

describe('loginAction', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns validation error for invalid email', async () => {
    const formData = createFormData(authTestData.invalidEmail);

    const result = await loginAction(null, formData);

    expect(result).toEqual({
      error: expect.any(String)
    });

    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it('returns validation error for short password', async () => {
    const formData = createFormData(authTestData.shortPassword);

    const result = await loginAction(null, formData);

    expect(result).toEqual({
      error: expect.any(String)
    });

    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it('returns validation error when email is missing', async () => {
    const formData = createFormData(authTestData.missingEmail);

    const result = await loginAction(null, formData);

    expect(result).toEqual({
      error: expect.any(String)
    });

    expect(mockSignIn).not.toHaveBeenCalled();
  });

  it('calls signIn with valid credentials', async () => {
    const formData = createFormData(authTestData.valid);

    await loginAction(null, formData);

    expect(mockSignIn).toHaveBeenCalledWith('credentials', {
      email: authTestData.valid.email,
      password: authTestData.valid.password,
      redirectTo: '/dashboard'
    });
  });

  it('returns error for invalid credentials', async () => {
    const formData = createFormData(authTestData.valid);

    mockSignIn.mockRejectedValue(
      new AuthError('CredentialsSignin')
    );

    const result = await loginAction(null, formData);

    expect(result).toEqual({
      error: appConfig.ERRORS.SIGN_IN.INVALID_EMAIL_OR_PASSWORD
    });
  });

  it('returns authorization error for another AuthError', async () => {
    const formData = createFormData(authTestData.valid);

    mockSignIn.mockRejectedValue(
      new AuthError('Configuration')
    );

    const result = await loginAction(null, formData);

    expect(result).toEqual({
      error: appConfig.ERRORS.SIGN_IN.AUTHORIZATION_ERROR
    });
  });
});