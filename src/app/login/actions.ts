'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { parseAuthFormData, validateAuthData } from '../signup/actions/signupValidation';
import { appConfig } from '@/config/app.config';

export type LoginState = { error?: string }

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {

  const authData = parseAuthFormData(formData);
  const validationResult = validateAuthData(authData);

  if (!validationResult.success) {
    return {
      error: validationResult.error
    };
  }

  try {
    await signIn('credentials', {
      email: validationResult.data.email,
      password: validationResult.data.password,
      redirectTo: '/dashboard'
    });

  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: appConfig.ERRORS.SIGN_IN.INVALID_EMAIL_OR_PASSWORD };
      }
      return { error: appConfig.ERRORS.SIGN_IN.AUTHORIZATION_ERROR };
    }
    throw error;
  }
  return {};
}