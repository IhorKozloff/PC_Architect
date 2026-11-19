import { Component } from "@/lib/types";

export const categories: Record<string, Component | null> = {
  cpu: {
    id: '111',
    name: '1111',
    price: 1,
    type: 'cpu',
    socket: null,
  },
  ram: {
    id: '222',
    name: '2221',
    price: 2,
    type: 'ram',
    socket: null,
  }
};

export const defaultBuildName = 'My Gaming PC';
export const buildName = 'PC Gaming!';