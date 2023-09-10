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
import usePolicyStore from "@/store/policyStore"
import PolicyForm, { policyFormSchema } from "@/components/policies/policy-form"
import useLangStore from "@/store/langagueStore";


const AddPolicyDialogButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const policyStore = useStore(usePolicyStore, state => state)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  function onSubmit(data: z.infer<typeof policyFormSchema>) {
    policyStore?.addPolicy({
      reference: data.reference,
      name: data.name,
      description: data.description ?? "",
      content: "",
      id: Math.random().toString(36).substr(2, 9),
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
    setOpen(false)
    toast.success(
      dict?.policyAddedSuccessfully || "Policy added successfully"
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
              dict?.addPolicy || "Add Policy"
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
              dict?.addPolicy || "Add Policy"
            }</DialogTitle>
          <DialogDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewPolicyToTheSystem || "Add new policy to the system."
            }
          </DialogDescription>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <PolicyForm onSubmit={onSubmit} formType="add" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddPolicyDialogButton