'use server';

import { categoryIdToDbType, Component } from '@/lib/types';
import { prisma } from '../../../prisma/prisma';
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';

export type SaveBuildFromState = {
  status: 'idle' | 'success' | 'error',
  message?: string,
};

export async function saveBuildAction(
  prevState: SaveBuildFromState,
  formData: FormData
) {
  const name = String(formData.get('name') ?? '').trim();
  const componentsIds = String(formData.get('componentsIds') ?? '')
    .split('.')
    .map((id) => id.trim())
    .filter(Boolean);

  const result = await saveBuild(name, componentsIds);
}

export async function saveBuild(
  name: string,
  componentsIds: string[]
): Promise<{ success: boolean, buildId: string } | { success: boolean, error: string }> {
  const session = await auth();

  if (!session?.user.id) {
    return { success: false, error: 'Please log in!' };
  };

  const trimedName = name.trim();

  if (!trimedName) {
    return { success: false, error: 'Please input a build name!' };
  };

  if (componentsIds.length === 0) {
    return { success: false, error: 'Add minimum ine component!' };
  };
  const components = await prisma.component.findMany({
    where: {
      id: { in: componentsIds }
    }
  });
  if (components.length !== componentsIds.length) {
    return { success: false, error: 'Some components not found!' };
  };

  const totalPrice = components.reduce((s, c) => {
    return s + c.price;
  }, 0);

  try {
    const build = await prisma.$transaction(
      async (tx) => {
        const newBuild = await tx.build.create({
          data: {
            name: trimedName,
            totalPrice,
            userId: session.user.id
          }
        });

        await tx.buildComponent.createMany({
          data: componentsIds.map(componentId => ({
            buildId: newBuild.id,
            componentId
          }))
        });

        return newBuild;
      }
    );
    revalidatePath('/dashboard')
    revalidatePath('/builds')

    return { success: true, buildId: build.id };
  } catch (error) {
    return { success: false, error: 'Failed to save the build!' };
  }
}

export async function getComponentsByCategory(categoryId: string): Promise<Component[]> {
  const dbType = categoryIdToDbType[categoryId];

  if (!dbType) {
    return [];
  };

  const components = await prisma.component.findMany({
    where: {
      type: dbType
    },
    orderBy: {
      price: 'asc'
    },
  });

  return components.map(i => ({
    id: i.id,
    name: i.name,
    type: i.type,
    price: i.price,
    socket: i.socket
  }));
};