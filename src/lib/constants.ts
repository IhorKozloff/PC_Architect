import { appConfig } from '@/config/app.config';
import { ComponentCategory } from './types';

const categoryNames = appConfig.TEXT.LANDING.COMPONENTS.CATEGORY_NAMES;

export const componentCategories: ComponentCategory[] = [
  { id: 'cpu', name: categoryNames.cpu, icon: 'Cpu' },
  { id: 'gpu', name: categoryNames.gpu, icon: 'Monitor' },
  { id: 'motherboard', name: categoryNames.motherboard, icon: 'Server' },
  { id: 'ram', name: categoryNames.ram, icon: 'MemoryStick' },
  { id: 'storage', name: categoryNames.storage, icon: 'HardDrive' },
  { id: 'psu', name: categoryNames.psu, icon: 'Zap' },
  { id: 'case', name: categoryNames.case, icon: 'Box' },
  { id: 'cooling', name: categoryNames.cooling, icon: 'Fan' },
];