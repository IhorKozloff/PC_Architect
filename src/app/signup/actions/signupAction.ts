'use server';

import { redirect } from 'next/navigation';
import { SignupState } from '../types/signupTypes';
import { parseAuthFormData, validateAuthData } from './signupValidation';
import { createUser } from './signupUser';

export async function signupAction(
  _prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> {
  const signupData = parseAuthFormData(formData);

  const validationResult = validateAuthData(signupData);

  if (!validationResult.success) {
    return {
      error: validationResult.error
    };
  }

  const createUserResult = await createUser(
    validationResult.data
  );

  if (createUserResult.error) {
    return createUserResult;
  }

  redirect('/login');
}