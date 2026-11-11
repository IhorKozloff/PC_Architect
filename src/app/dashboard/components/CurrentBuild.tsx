'use client';

import { Button } from '@/components/ui/button';
import { Component } from '@/lib/types';
import { useCallback, useState } from 'react';
import { TableParts } from './Table';
import { componentCategories } from '@/lib/constants';
import { SaveBuildDialog } from './SaveBuildDialog';

export function CurrentBuild() {
  const [selectedByCategory, setSelectedByCategory] = useState<Record<string, Component | null>>({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);

  const onSelectedComponent = useCallback((categoryId: string, component: Component | null) => {
    setSelectedByCategory(prev => {
      return {
        ...prev,
        [categoryId]: component
      }
    })
  }, []);

  return (
    <>
      <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <p className="mb-3 font-mono text-xs tracking-[0.18em] text-cyan-300">YOUR VISION. YOUR COMPONENTS.</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">Create your build</h1>
        </div>
        <Button className="h-11 bg-[#8B5CF6] px-6 text-white shadow-lg shadow-violet-500/20 hover:bg-[#7C3AED] focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none" onClick={() => setSaveDialogOpen(true)}>Build</Button>
      </div>
      <div className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#111621] shadow-xl shadow-black/10">
        <TableParts
          components={componentCategories}
          onSelectedComponent={onSelectedComponent}
          selectedByCategory={selectedByCategory}
        />
        <SaveBuildDialog
          open={saveDialogOpen}
          onOpenChange={setSaveDialogOpen}
          selectedByCategory={selectedByCategory}
        ></SaveBuildDialog>
      </div>
    </>
  );
}
