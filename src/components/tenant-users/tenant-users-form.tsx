
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Tenant, User } from "@/types"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"
import { ROLES } from "@/mock"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"

export const usersformSchema = z.object({
  tenant: z.optional(z.string()),
  firstName: z.string().min(4, {
    message: "First Name must be at least 4 characters.",
  }),
  lastName: z.string().min(4, {
    message: "Last Name must be at least 4 characters.",
  }),
  displayName: z.string().min(4, {
    message: "Display Name must be at least 4 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  avatar: z.string().optional(),
  role: z.string().optional(),
  active: z.boolean().default(false).optional(),
  created_at: z.optional(z.date()),
  updated_at: z.optional(z.date()),
  id: z.string(),
})

type UserFormProps = {
  onSubmit: (data: z.infer<typeof usersformSchema>) => void
  formType: "add" | "edit"
  user?: User
  tenants?: Tenant[]
}

const UserForm = ({ onSubmit, formType, user, tenants }: UserFormProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const FormSchema = z.object({
    tenant: z.optional(z.string()),
    firstName: z.string().min(4, {
      message: dict?.FromSchemaValidation.firstName || "First Name must be at least 4 characters.",
    }),
    lastName: z.string().min(4, {
      message: dict?.FromSchemaValidation.lastName || "Last Name must be at least 4 characters.",
    }),
    displayName: z.string().min(4, {
      message: dict?.FromSchemaValidation.displayName || "Display Name must be at least 4 characters.",
    }),
    email: z.string().email({
      message: dict?.FromSchemaValidation.invalidEmailAddress || "Invalid email address.",
    }),
    avatar: z.string().optional(),
    role: z.string().optional(),
    active: z.boolean().default(false).optional(),
    created_at: z.optional(z.date()),
    updated_at: z.optional(z.date()),
    id: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      displayName: user?.displayName,
      tenant: user?.tenant,
      email: user?.email,
      active: user?.active,
      role: user?.role,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
      id: user?.id ?? Math.random().toString(36).substr(2, 9)
    }
  })

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field, fieldState }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn("flex flex-row items-center gap-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    {
                      dict?.firstName || "First Name"
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "text-right": langStore?.rtl
                      })} placeholder="e.g elbouchouki" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="lastName"
              render={({ field, fieldState }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn("flex flex-row items-center gap-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    {
                      dict?.lastName || "Last Name"
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "text-right": langStore?.rtl
                      })} placeholder="e.g ahmed" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div>
            <FormField
              control={form.control}
              name="displayName"
              render={({ field, fieldState }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn("flex flex-row items-center gap-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    {
                      dict?.displayName || "Display Name"
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "text-right": langStore?.rtl
                      })} placeholder="e.g a.elbouchouki" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn("flex flex-row items-center gap-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    {
                      dict?.email || "Email"
                    }
                  </FormLabel>
                  <FormControl>
                    <Input
                      className={cn({
                        "text-right": langStore?.rtl
                      })} placeholder="e.g ahmed@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div>
          <FormField
            control={form.control}
            name="tenant"
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.tenant || "Tenant"
                  }
                </FormLabel>
                <FormControl>
                  <Select
                    disabled={!tenants || tenants.length === 0}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className={cn("w-full", {
                      "flex-row-reverse": langStore?.rtl
                    })}>
                      <SelectValue
                        placeholder={
                          !tenants || tenants.length === 0 ?
                            dict?.noTenantsAvailable || 'No tenants available'
                            : dict?.selectTenant || 'Select a tenant'
                        } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {
                          tenants?.map((tenant, index) => (
                            <SelectItem
                              className={cn({
                                "justify-end": langStore?.rtl
                              })}
                              key={index} value={tenant.id}>
                              {tenant.name}
                            </SelectItem>
                          ))
                        }
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.role || "Role"
                  }
                  <Badge variant="outline" className="ml-2 text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className={cn("w-full", {
                      "flex-row-reverse": langStore?.rtl
                    })}>
                      <SelectValue placeholder={
                        dict?.selectRole || "Select a role"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        ROLES.map((role, index) => (
                          <SelectItem
                            className={cn({
                              "justify-end": langStore?.rtl
                            })} key={index} value={role.label}>{role.label}</SelectItem>
                        ))
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="active"
            render={({ field }) => (
              <FormItem className={cn("flex flex-row items-start space-y-0 rounded-md pt-2 pb-4 gap-2 ", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="gap-1 leading-none">
                  <FormLabel className={cn("flex flex-row items-center gap-2", {
                    "flex-row-reverse": langStore?.rtl
                  })}>
                    {
                      dict?.enabled || "Enabled"
                    }
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className={cn("mt-3", {
          "flex flex-row-reverse": langStore?.rtl
        })}>
          <Button type="submit">
            {
              formType === "add" ?
                dict?.addTenant || "Add Tenant"
                : dict?.updateTenant || "Update Tenant"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default UserForm