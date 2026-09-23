import { prisma } from '../../../../prisma/prisma';
import bcrypt from 'bcrypt';
import { SignupState, ValidSignupData } from '../types/signupTypes';
import { appConfig } from '@/config/app.config';

export async function createUser({
  name,
  email,
  password
}: ValidSignupData): Promise<SignupState> {
  const existingUser = await prisma.user.findUnique({
    where: { email }
  });

  if (existingUser) {
    return {
      error: appConfig.ERRORS.SIGN_UP.EMAIL_TAKEN
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword
    }
  });

  return {};
}