"use client"

import * as z from "zod"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import useLabelStore from "@/store/labelStore"
import LabelForm, { labelFormSchema } from "@/components/label/label-form"
import useLangStore from "@/store/langagueStore";

const AddLabelDialogButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const labelStore = useStore(useLabelStore, state => state)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit(data: z.infer<typeof labelFormSchema>) {
    labelStore?.addLabel({
      key: data.key,
      value: data.value,
      id: Math.random().toString(36).substr(2, 9),
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
    setOpen(false)
    toast.success(
      dict?.labelAddedSuccessfully || "Label added successfully"
    )
  }

  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl
        })} >
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addLabel || "Add Label"
            }
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addLabel || "Add Label"
            }
          </DialogTitle>
          <DialogDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewLabelToTheSystem || "Add new label to the system."
            }
          </DialogDescription>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <LabelForm onSubmit={onSubmit} formType="add" />
        </div>
      </DialogContent>
    </Dialog>



  )
}
export default AddLabelDialogButton