'use server';

import { redirect } from 'next/navigation';
import { prisma } from '../../../prisma/prisma';
import bcrypt from 'bcrypt';

const MIN_PASSWORD_LENGTH = 8;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type SignupState = {
  error?: string;
};

export async function signupAction(
  _prevState: SignupState | null,
  formData: FormData
): Promise<SignupState> {
  console.log([...formData.entries()]);
  const name = formData.get('name') as string | undefined;
  const email = formData.get('email') as string | undefined;
  const password = formData.get('password') as string | undefined;
  console.log('---------------')
  console.log({
    email,
    name,
    password
  });
  console.log('---------------')

  if (!email) {
    return { error: 'Enter an email!' };
  }

  if (!EMAIL_REGEX.test(email)) {
    return { error: 'Email format is not valid!' };
  }

  if (!password || password.length < MIN_PASSWORD_LENGTH) {
    return { error: `The password must contain at least ${MIN_PASSWORD_LENGTH} characters.` };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return { error: 'The email is already taken.' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });
  redirect('/login');
}