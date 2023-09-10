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
import useUserStore from "@/store/userStore"
import UserForm, { usersformSchema } from "@/components/tenant-users/tenant-users-form"
import { ROLES } from "@/mock"
import useTenantStore from "@/store/tenantStore"
import useLangStore from "@/store/langagueStore"

const EditUserDialog = ({
  className,
}: {
  className?: string
}) => {

  const userStore = useStore(useUserStore, state => state)
  const tenantStore = useStore(useTenantStore, state => state)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  function onSubmit(data: z.infer<typeof usersformSchema>) {
    userStore?.updateUser({
      firstName: data.firstName,
      lastName: data.lastName,
      displayName: data.displayName,
      email: data.email,
      active: data.active || false,
      role: data.role || "",
      id: data.id,
      avatar: data.avatar ?? "/avatars/avatar1.png",
      tenant: data.tenant ?? "",
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
    userStore?.setEditModalOpen(false)
    userStore?.setEditModalUser(undefined)
    toast.success(
      dict?.userUpdatedSuccessfully || "User updated successfully"
    )
  }

  return (
    <Dialog open={userStore?.editModalOpen} onOpenChange={userStore?.setEditModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={cn("flex flex-row gap-1  mr-3", {
            "flex-row-reverse": langStore?.rtl === true,
          })}>
            <span>
              {
                dict?.editUser || "Edit User"
              }
            </span>
            <span>
              {userStore?.editModalUser?.id}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <UserForm user={userStore?.editModalUser} onSubmit={onSubmit} formType="edit" tenants={tenantStore?.tenants} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditUserDialog