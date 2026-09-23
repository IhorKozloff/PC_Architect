'use server';

import { redirect } from 'next/navigation';
import { SignupState } from '../types/signupTypes';
import { parseSignupFormData, validateSignupData } from './signupValidation';
import { createUser } from './signupUser';

export async function signupAction(
  _prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> {
  const signupData = parseSignupFormData(formData);

  const validationResult = validateSignupData(signupData);

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