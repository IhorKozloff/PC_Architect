'use client'

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Component, ComponentCategory } from "@/lib/types";
import { Box, Cpu, Fan, HardDrive, MemoryStick, Monitor, Plus, Server, Zap } from "lucide-react";
import { useState } from "react";

const iconMap: Record<ComponentCategory['icon'], React.ElementType> = {
  Cpu,
  Monitor,
  Server,
  MemoryStick,
  HardDrive,
  Zap,
  Box,
  Fan
}
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Component</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Model</TableHead>
          <TableHead>Price</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {
          components.map(category => {
            const Icon = iconMap[category.icon];
            const selected = selectedByCategory[category.id];

            return (
              <TableRow key={category.id} className='my-2'>
                <TableCell>
                  <div className="flex tems-center">
                    <Icon className="h-5 w-5 mr-1" />
                  </div>
                </TableCell>
                <TableCell className='font-bold'>{category.name}</TableCell>
                <TableCell>{selected?.name ?? '-'}</TableCell>
                <TableCell>{selected?.price ?? '-'}</TableCell>
                <TableCell className='text-right'>
                  <Dialog
                    open={openCategoryId === category.id}
                    onOpenChange={(open) => setOpenCategoryId(open ? category.id : null)}
                  >
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Plus className='h-4 w-4 mr-1' />
                        {selected ? 'Изменить' : 'Добавить'}
                      </Button>
                    </DialogTrigger>
                    <AddComponentDialogContent
                      categoryId={category.id}
                      categoryName={category.name}
                      onSelect={
                        (c) => {
                          onSelectedComponent(category.id, c);
                          setOpenCategoryId(null)
                        }
                      }
                    />
                  </Dialog>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>
            <p className="font-medium">Цена сборки:</p>
            <p className="font-large text-gray500">
              {new Intl.NumberFormat('ru-Ru').format(totalPrice)}
            </p>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}