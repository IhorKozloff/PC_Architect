import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Component } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTabValue(pathname: string) {
  if (pathname === '/dashboard' || pathname.startsWith('/dashboard')) return 'dashboard';
  if (pathname === '/builds/explore' || pathname.startsWith('/builds/explore')) return 'explore';
  if (pathname === '/builds' || pathname.startsWith('/builds')) return 'builds';

  return null;
}




export const getComponentIds = (selectedByCategory: Record<string, Component | null>) => {
  return Object
    .values(selectedByCategory)
    .filter((componnet): componnet is Component => componnet !== null)
    .map((component) => component.id);
};

export const getComponentIdsString = (ids: string[]) => ids.join(',');