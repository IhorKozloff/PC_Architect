'use server';

import { categoryIdToDbType, Component } from '@/lib/types';
import { prisma } from '../../../prisma/prisma';

export async function getComponentsByCategory (categoryId: string): Promise<Component[]> {
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