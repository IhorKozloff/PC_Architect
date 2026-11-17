'use client';

import { Component } from '@/lib/types';
import { saveBuildAction, SaveBuildFromState } from '../actions';
import { useActionState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { appConfig } from '@/config/app.config';

const initialState: SaveBuildFromState = { status: 'idle' };

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
}

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath
}: Props) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();
  const [state, formAction] = useActionState(saveBuildAction, initialState);

  const componentIds = useMemo(() => Object
    .values(selectedByCategory)
    .filter((componnet): componnet is Component => componnet !== null)
    .map((component) => component.id)
  , [selectedByCategory]);

  useEffect(() => {
    if (state.status === 'success') {
      toast.success('Сборка сохранена');
      formRef.current?.reset();

      onOpenChange(false);

      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.refresh();
      }
    }
  }, [onOpenChange, redirectPath, router, state.status]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formRef.current?.reset();
    }

    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[85svh] overflow-y-auto border border-white/10 bg-[#111621] text-slate-100 ring-0 motion-reduce:animate-none [&_[data-slot=dialog-title]]:text-xl [&_[data-slot=dialog-title]]:leading-snug [&_[data-slot=dialog-description]]:text-slate-400 [&_[data-slot=dialog-close]]:text-slate-400 [&_[data-slot=dialog-close]]:hover:bg-white/10 [&_[data-slot=dialog-close]]:focus-visible:ring-cyan-300/60">
        <DialogHeader className="pr-8">
          <DialogTitle>{appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.title}</DialogTitle>
          <DialogDescription>{appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.description}</DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          <Input
            aria-label="Build name"
            className="h-11 border-white/15 bg-[#0c0f16] text-slate-100 placeholder:text-slate-500 focus-visible:border-cyan-300 focus-visible:ring-cyan-300/25 motion-reduce:transition-none"
            name="name"
            placeholder={appConfig.TEXT.DASHBOARD.SAVE_BUILD_DIALOG.placeholder}
            defaultValue={defaultName}
            required
          />
          <input type="hidden" name="componentIds" value={componentIds.join(',')} />

          <DialogFooter className="border-white/10 bg-[#0c0f16]/60" id="save-build-modal-window">
            <Button className="h-11 bg-[#8B5CF6] px-5 text-white hover:bg-[#7C3AED] focus-visible:border-cyan-300 focus-visible:ring-cyan-300/60 motion-reduce:transition-none" type="submit" disabled={pending || componentIds.length === 0}>
              {pending ? 'Processing..' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
