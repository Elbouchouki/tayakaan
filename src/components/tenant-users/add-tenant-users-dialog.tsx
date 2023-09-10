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
import useUserStore from "@/store/userStore"
import UserForm, { usersformSchema } from "@/components/tenant-users/tenant-users-form"
import useTenantStore from "@/store/tenantStore";
import useLangStore from "@/store/langagueStore";


const AddUserDialogButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const userStore = useStore(useUserStore, state => state)
  const tenantStore = useStore(useTenantStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  function onSubmit(data: z.infer<typeof usersformSchema>) {
    userStore?.addUser({
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
    setOpen(false)
    toast.success(
      dict?.userAddedSuccessfully || "User added successfully"
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
              dict?.addUser || "Add User"
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
              dict?.addUser || "Add User"
            }
          </DialogTitle>
          <DialogDescription className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addNewTenantUserToTheSystem || "Add new user to the system"
            }
          </DialogDescription>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <UserForm onSubmit={onSubmit} formType="add" tenants={tenantStore?.tenants} />
        </div>
      </DialogContent>
    </Dialog>



  )
}
export default AddUserDialogButton