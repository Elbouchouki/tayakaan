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
import useTenantStore from "@/store/tenantStore"
import TenantForm, { tenantFormSchema } from "@/components/tenant/tenant-form"
import useLangStore from "@/store/langagueStore";


const AddTenantDialogButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const tenantStore = useStore(useTenantStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit(data: z.infer<typeof tenantFormSchema>) {
    tenantStore?.addTenant({
      reference: data.reference,
      name: data.name,
      contact_email: data.contact_email,
      id: Math.random().toString(36).substr(2, 9),
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
    setOpen(false)
    toast.success(
      dict?.tenantAddedSuccessfully || "Tenant added successfully"
    )
  }


  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl === true,
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addTenant || "Add Tenant"
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
              dict?.addTenant || "Add Tenant"
            }
          </DialogTitle>
          <DialogDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewTenantToTheSystem || "Add new tenant to the system"
            }
          </DialogDescription>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <TenantForm onSubmit={onSubmit} formType="add" />
        </div>
      </DialogContent>
    </Dialog>



  )
}
export default AddTenantDialogButton