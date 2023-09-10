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
import useTenantStore from "@/store/tenantStore"
import TenantForm, { tenantFormSchema } from "@/components/tenant/tenant-form"
import useLangStore from "@/store/langagueStore"

const EditTenantDialog = ({
  className,
}: {
  className?: string
}) => {

  const tenantStore = useStore(useTenantStore, state => state)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  function onSubmit(data: z.infer<typeof tenantFormSchema>) {
    tenantStore?.updateTenant({
      reference: data.reference,
      name: data.name,
      contact_email: data.contact_email,
      id: data.id,
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
    tenantStore?.setEditModalOpen(false)
    tenantStore?.setEditModalTenant(undefined)
    toast.success(
      dict?.tenantUpdatedSuccessfully || "Tenant updated successfully"
    )
  }

  return (
    <Dialog open={tenantStore?.editModalOpen} onOpenChange={tenantStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1", {
            "flex-row-reverse": langStore?.rtl,
          })}>
            <span>
              {
                dict?.editTenant || "Edit Tenant"
              }
            </span>
            <span>
              {tenantStore?.editModalTenant?.id}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <TenantForm tenant={tenantStore?.editModalTenant} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditTenantDialog