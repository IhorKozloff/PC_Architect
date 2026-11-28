'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Component, ComponentCategory } from '@/lib/types';
import { cn } from '@/lib/utils';
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
    <Table className="block text-foreground md:table md:table-fixed">
      <TableHeader className="sr-only bg-background/60 md:not-sr-only md:table-header-group">
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="w-24 px-4 text-xs text-muted-foreground">Component</TableHead>
          <TableHead className="w-32 text-xs text-muted-foreground">Type</TableHead>
          <TableHead className="text-xs text-muted-foreground">Model</TableHead>
          <TableHead className="w-28 text-xs text-muted-foreground">Price</TableHead>
          <TableHead className="w-28 px-4 text-right text-xs text-muted-foreground">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="block bg-background/60 md:table-row-group">
        {
          components.map(category => {
            const Icon = iconMap[category.icon];
            const selected = selectedByCategory[category.id];

            return (
              <TableRow key={category.id} className={cn(
                'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-border p-4 hover:bg-accent/5 motion-reduce:transition-none md:table-row md:p-0',
                selected && 'bg-primary/5 hover:bg-primary/10'
              )}>
                <TableCell className="hidden px-4 py-5 md:table-cell">
                  <div className="flex size-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </div>
                </TableCell>
                <TableCell className="col-span-2 min-w-0 whitespace-normal p-0 font-medium text-accent md:p-2">{category.name}</TableCell>
                <TableCell className="col-span-2 min-w-0 whitespace-normal break-words p-0 text-foreground md:p-2">{selected?.name ?? '-'}</TableCell>
                <TableCell className="min-w-0 whitespace-normal break-words p-0 font-mono text-accent md:p-2"><span className="mr-2 text-xs text-muted-foreground md:hidden">Price:</span>{selected?.price ?? '-'}</TableCell>
                <TableCell className="p-0 text-right md:px-4 md:py-2">
                  <Dialog
                    open={openCategoryId === category.id}
                    onOpenChange={(open) => setOpenCategoryId(open ? category.id : null)}
                  >
                    <DialogTrigger
                      render={
                        <Button size="sm" className="h-10 w-22 px-2 motion-reduce:transition-none">
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
      <TableFooter className="block border-border bg-background/80 md:table-footer-group">
        <TableRow className="block hover:bg-transparent md:table-row">
          <TableCell colSpan={5} className="block whitespace-normal p-5 md:table-cell md:p-6">
            <p className="text-sm font-medium text-muted-foreground">Build price:</p>
            <p className="mt-2 break-words font-mono text-3xl font-semibold tracking-tight text-primary">
              {new Intl.NumberFormat('ru-Ru').format(totalPrice)}
            </p>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
