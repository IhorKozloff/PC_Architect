'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export type LoginState = { error?: string }

export async function loginAction(
  _prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> {
  const email = String(formData.get('email')).trim();
  const password = String(formData.get('password')).trim();

  if (!email || !password) {
    return { error: 'Enter email and password' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/dashboard'
    });

  } catch (error) {
    if (error instanceof AuthError) {
      if (error.type === 'CredentialsSignin') {
        return { error: 'Invalid email or password' };
      }
      return { error: 'Authirization error' };
    }
    throw error;
  }
  return {};
}