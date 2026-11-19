'use server';

import { categoryIdToDbType, Component } from '@/lib/types';
import { prisma } from '../../../prisma/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { appConfig } from '@/config/app.config';

export type SaveBuildFromState = {
  status: 'idle' | 'success' | 'error',
  message?: string
};

export async function saveBuildAction(
  _prevState: SaveBuildFromState,
  formData: FormData
): Promise<SaveBuildFromState> {
  const name = String(formData.get('name') ?? '').trim();
  const componentIds = String(formData.get('componentIds'))
    .split(',')
    .map((id) => id.trim())
    .filter(Boolean);

  const result = await saveBuild(name, componentIds);

  if (!result.success) {
    return {
      status: 'error',
      message: result.error
    };
  }

  return {
    status: 'success',
    message: 'Сборка успешно сохранена'
  };
}

export async function saveBuild(
  name: string,
  componentIds: string[]
): Promise<{ success: true; buildId: string } | { success: false; error: string }> {
  const session = await auth();

  if (!session?.user.id) {
    return { success: false, error: appConfig.ERRORS.SAVE_BUILD.SIGN_IN_REQUIRED };
  }

  const trimmedName = name.trim();

  if (!trimmedName) {
    return { success: false, error: appConfig.ERRORS.SAVE_BUILD.NAME_REQUIRED };
  }

  if (componentIds.length === 0) {
    return { success: false, error: appConfig.ERRORS.SAVE_BUILD.COMPONENTS_REQUIRED };
  }

  try {
    const components = await prisma.component.findMany({
      where: { id: { in: componentIds } }
    });

    if (components.length !== componentIds.length) {
      return { success: false, error: appConfig.ERRORS.SAVE_BUILD.COMPONENTS_NOT_FOUND };
    }

    const totalPrice = components.reduce((s, c) => s + c.price, 0);
    const build = await prisma.$transaction(
      async (tx) => {
        const newBuild = await tx.build.create({
          data: {
            name: trimmedName,
            totalPrice,
            userId: session.user.id
          }
        });

        await tx.buildComponent.createMany({
          data: componentIds.map(componentId => ({
            buildId: newBuild.id,
            componentId
          }))
        });

        return newBuild;
      }
    );

    revalidatePath('/dashboard');
    revalidatePath('/builds');

    return { success: true, buildId: build.id };
  } catch (error) {
    return { success: false, error: appConfig.ERRORS.SAVE_BUILD.SAVE_FAILED };
  }
}

export async function getComponentsByCategory(categoryId: string): Promise<Component[]> {
  const dbType = categoryIdToDbType[categoryId];

  if (!dbType) {
    return [];
  }

  const components = await prisma.component.findMany({
    where: { type: dbType },
    orderBy: { price: 'asc' }
  });

  return components.map(c => ({
    id: c.id,
    type: c.type,
    name: c.name,
    price: c.price,
    socket: c.socket
  }));
}
