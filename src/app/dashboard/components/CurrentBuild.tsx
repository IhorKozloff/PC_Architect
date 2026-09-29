'use client'

import { TypographyH1 } from "@/components/ui/typography-h1";
import { Component } from "@/lib/types"
import { useState } from "react"

export function CurrentBuild () {
  const [selectedByCategory, setSelectedByCategory] = useState<Record<string, Component>>({});
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  
  return (
    <>
    <div className="flex justify-between mb-8">
      <TypographyH1>Create your build</TypographyH1>
      
    </div>
    </>
  )
}