'use client';

import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { ComponentCard } from './ComponentCard';
import { Component } from '@/lib/types';
import { getComponentsByCategory } from '../actions';

interface IProps {
  categoryId: string;
  categoryName: string;
  onSelect: (component: Component) => void;
}

export function AddComponentDialogContent({ categoryId, categoryName, onSelect }: IProps) {
  const [components, setComponents] = useState<Component[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFn = async () => {
      const data = await getComponentsByCategory(categoryId);
      setComponents(data);
      setLoading(false);
    };

    getFn();
  }, [categoryId]);

  return (
    <DialogContent className="flex max-h-[85svh] w-[calc(100%-2rem)] max-w-4xl flex-col overflow-hidden border border-white/10 bg-[#111621] text-slate-100 ring-0 sm:max-w-4xl motion-reduce:animate-none [&_[data-slot=dialog-close]]:text-slate-400 [&_[data-slot=dialog-close]]:hover:bg-white/10 [&_[data-slot=dialog-close]]:focus-visible:ring-cyan-300/60">
      <DialogHeader className="border-b border-white/10 pb-4 pr-8">
        <DialogTitle className="text-xl leading-snug font-semibold tracking-tight">Add component - {categoryName}</DialogTitle>
      </DialogHeader>
      <div className="mx-1 min-h-0 min-w-0 flex-1 overflow-y-auto px-1 pb-1">
        {
          components.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {
                components.map((c) => (
                  <ComponentCard
                    key={c.id}
                    name={c.name}
                    price={c.price}
                    onClick={() => onSelect(c)}
                  />
                ))
              }
            </div>
          ) : (
            <p className="py-8 text-center text-sm text-slate-400">
              {loading ? 'Loading' : 'No data!'}
            </p>
          )
        }
      </div>
    </DialogContent>
  );
}
