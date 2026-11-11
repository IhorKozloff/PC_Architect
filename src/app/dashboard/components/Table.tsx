'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Component, ComponentCategory } from '@/lib/types';
import { Box, Cpu, Fan, HardDrive, MemoryStick, Monitor, Plus, Server, Zap } from 'lucide-react';
import { useState } from 'react';
import { AddComponentDialogContent } from './AddComponentDialogContent';

const iconMap: Record<ComponentCategory['icon'], React.ElementType> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan
};
interface IProps {
  components: CategoryRow[];
  selectedByCategory: Record<string, Component | null>;
  onSelectedComponent: (categoryId: string, component: Component | null) => void;
};
type CategoryRow = {
  id: string;
  name: string;
  icon: string;
}

export function TableParts({
  components,
  selectedByCategory,
  onSelectedComponent
}: IProps) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const totalPrice = Object.values(selectedByCategory).reduce((sum, c) => sum + (c?.price ?? 0), 0);

  return (
    <Table className="block text-slate-200 md:table md:table-fixed">
      <TableHeader className="sr-only bg-[#0c0f16]/60 md:not-sr-only md:table-header-group">
        <TableRow className="border-white/10 hover:bg-transparent">
          <TableHead className="w-24 px-4 text-xs text-slate-400">Component</TableHead>
          <TableHead className="w-32 text-xs text-slate-400">Type</TableHead>
          <TableHead className="text-xs text-slate-400">Model</TableHead>
          <TableHead className="w-28 text-xs text-slate-400">Price</TableHead>
          <TableHead className="w-28 px-4 text-right text-xs text-slate-400">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="block md:table-row-group">
        {
          components.map(category => {
            const Icon = iconMap[category.icon];
            const selected = selectedByCategory[category.id];

            return (
              <TableRow key={category.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-white/10 p-4 hover:bg-white/[0.02] motion-reduce:transition-none md:table-row md:p-0">
                <TableCell className="hidden px-4 py-5 md:table-cell">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-violet-400/25 bg-violet-400/10 text-violet-300">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </div>
                </TableCell>
                <TableCell className="col-span-2 min-w-0 whitespace-normal p-0 font-medium text-violet-200 md:p-2">{category.name}</TableCell>
                <TableCell className="col-span-2 min-w-0 whitespace-normal break-words p-0 text-slate-300 md:p-2">{selected?.name ?? '-'}</TableCell>
                <TableCell className="min-w-0 whitespace-normal break-words p-0 font-mono text-cyan-300 md:p-2"><span className="mr-2 text-xs text-slate-400 md:hidden">Price:</span>{selected?.price ?? '-'}</TableCell>
                <TableCell className="p-0 text-right md:px-4 md:py-2">
                  <Dialog
                    open={openCategoryId === category.id}
                    onOpenChange={(open) => setOpenCategoryId(open ? category.id : null)}
                  >
                    <DialogTrigger
                      render={
                        <Button variant="outline" size="sm" className="h-10 border-violet-400/30 bg-violet-400/10 px-3 text-violet-200 hover:bg-violet-400/20 focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none">
                          <Plus aria-hidden="true" className="mr-1 size-4" />
                          {selected ? 'Change' : 'Add'}
                        </Button>
                      }
                    />
                    <AddComponentDialogContent
                      categoryId={category.id}
                      categoryName={category.name}
                      onSelect={
                        (c) => {
                          onSelectedComponent(category.id, c);
                          setOpenCategoryId(null);
                        }
                      }
                    />
                  </Dialog>
                </TableCell>
              </TableRow>
            );
          })
        }
      </TableBody>
      <TableFooter className="block border-white/10 bg-[#0c0f16]/60 md:table-footer-group">
        <TableRow className="block hover:bg-transparent md:table-row">
          <TableCell colSpan={5} className="block whitespace-normal p-5 md:table-cell md:p-6">
            <p className="text-sm font-medium text-slate-400">Build price:</p>
            <p className="mt-2 break-words font-mono text-3xl font-semibold tracking-tight text-cyan-300">
              {new Intl.NumberFormat('ru-Ru').format(totalPrice)}
            </p>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
