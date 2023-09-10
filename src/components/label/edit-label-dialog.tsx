"use client"


import * as z from "zod"

import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import useLabelStore from "@/store/labelStore"
import LabelForm, { labelFormSchema } from "@/components/label/label-form"
import useLangStore from "@/store/langagueStore"

const EditLabelDialog = ({
  className,
}: {
  className?: string
}) => {

  const labelStore = useStore(useLabelStore, state => state)


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  function onSubmit(data: z.infer<typeof labelFormSchema>) {
    labelStore?.updateLabel({
      key: data.key,
      value: data.value,
      id: data.id,
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
    labelStore?.setEditModalOpen(false)
    labelStore?.setEditModalLabel(undefined)
    toast.success(
      dict?.labelUpdatedSuccessfully || "Label updated successfully"
    )
  }

  return (
    <Dialog open={labelStore?.editModalOpen} onOpenChange={labelStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1 mr-3", {
            "flex-row-reverse": langStore?.rtl === true,
          })}>
            <span>
              {
                dict?.editLabel || "Edit Label"
              }
            </span>
            <span> {labelStore?.editModalLabel?.id}</span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <LabelForm label={labelStore?.editModalLabel} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditLabelDialog