import bcrypt from 'bcrypt';
import { createUser } from '@/app/signup/actions/signupUser';
import { prisma } from '../../../../prisma/prisma';
import { authTestData } from '../testData';
import { appConfig } from '@/config/app.config';

jest.mock('bcrypt');

jest.mock('../../../../prisma/prisma', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn()
    }
  }
}));

describe('createUser', () => {
  it('returns error when email is already taken', async () => {
    (prisma.user.findUnique as jest.Mock).mockResolvedValue(
      authTestData.existingUser
    );

    const result = await createUser(authTestData.valid);

    expect(result).toEqual({
      error: appConfig.ERRORS.SIGN_UP.EMAIL_TAKEN
    });

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: {
        email: authTestData.valid.email
      }
    });

    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it('creates user when email is available', async () => {
    const hashedPassword = 'hashed-password';

    (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

    (bcrypt.hash as jest.Mock).mockResolvedValue(
      hashedPassword
    );

    (prisma.user.create as jest.Mock).mockResolvedValue(
      authTestData.existingUser
    );

    const result = await createUser(authTestData.valid);

    expect(result).toEqual({});

    expect(bcrypt.hash).toHaveBeenCalledWith(
      authTestData.valid.password,
      10
    );

    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: authTestData.valid.name,
        email: authTestData.valid.email,
        password: hashedPassword
      }
    });
  });
});