'use client';

import { Component } from "@/lib/types";
import { SaveBuildFromState } from "../actions";
import { useEffect, useMemo, useRef } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogTitle, DialogContent, DialogDescription, DialogHeader, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";




interface IProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedByCategory: Record<string, Component | null>;
  defaultName?: string;
  redirectPath?: string;
}

const initialState: SaveBuildFromState = { status: 'idle' };

export function SaveBuildDialog({
  open,
  onOpenChange,
  selectedByCategory,
  defaultName,
  redirectPath
}: IProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

  useEffect(() => {

  }, [onOpenChange, redirectPath, router]);
  
  const componentsIds = useMemo(() => {
    return Object.values(selectedByCategory)
      .filter(i => i !== null)
      .map(i => i.id);
  }, [selectedByCategory]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      formRef.current?.reset();
    };
    onOpenChange(nextOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save build</DialogTitle>
          <DialogDescription>Input build name</DialogDescription>
        </DialogHeader>

        <form ref={formRef} className="space-y-4">
          <Input
            name="name"
            placeholder="For example: Game PC!"
            defaultValue={defaultName}
            required
          ></Input>
          <input type={"hidden"} name="componentsIds" value={componentsIds.join(',')}></input>

          <DialogFooter>
            <Button type="submit" disabled={pending || componentsIds.length === 0}>
              {pending ? 'Saving..' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}