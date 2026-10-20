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

const initialState: SaveBuildFromState = { status: 'idle' };

// export function SaveBuildDialog({
//   open,
//   onOpenChange,
//   selectedByCategory,
//   defaultName,
//   redirectPath
// }: IProps) {
//   const router = useRouter();
//   const formRef = useRef<HTMLFormElement>(null);
//   const { pending } = useFormStatus();

//   const [state, formAction] = useActionState(saveBuildAction, initialState);

//   const componentsIds = useMemo(() => {
//     return Object.values(selectedByCategory)
//       .filter(i => i !== null)
//       .map(i => i.id);
//   }, [selectedByCategory]);

//   useEffect(() => {
//     if (state.status === 'success') {
//       toast.success('Build has been saved!');
//       formRef?.current?.reset();
//       onOpenChange(false);

//       if (redirectPath) {
//         router.push(redirectPath);
//       } else {
//         router.refresh()
//       }
//     }
//   }, [onOpenChange, redirectPath, router, state.status]);

//   const handleOpenChange = (nextOpen: boolean) => {
//     if (!nextOpen) {
//       formRef.current?.reset();
//     };
//     onOpenChange(nextOpen);
//   };

//   return (
//     <Dialog open={open} onOpenChange={handleOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Save build</DialogTitle>
//           <DialogDescription>Input build name</DialogDescription>
//         </DialogHeader>

//         <form ref={formRef} className="space-y-4" action={formAction}>
//           <Input
//             name="name"
//             placeholder="For example: Game PC!"
//             defaultValue={defaultName}
//             required
//           ></Input>
//           <input type={"hidden"} name="componentsIds" value={componentsIds.join(',')}></input>

//           <DialogFooter>
//             <Button type="submit" disabled={pending || componentsIds.length === 0}>
//               {pending ? 'Saving..' : 'Save'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Сохранить сборку</DialogTitle>
          <DialogDescription>Введите название сборки</DialogDescription>
        </DialogHeader>

        <form ref={formRef} action={formAction} className="space-y-4">
          <Input
            name="name"
            placeholder="Например: Игровой ПК"
            defaultValue={defaultName}
            required
          />
          <input type="hidden" name="componentIds" value={componentIds.join(',')} />

          <DialogFooter>
            <Button type="submit" disabled={pending || componentIds.length === 0}>
              {pending ? 'Сохранение..' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}