"use client"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Label } from "@/types"
import { Badge } from "@/components/ui/badge"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"

export const labelFormSchema = z.object({
  key: z.string().min(4, {
    message: "Key must be at least 4 characters.",
  }),
  value: z.string().min(4, {
    message: "Value must be at least 4 characters.",
  }),
  created_at: z.optional(z.date()),
  updated_at: z.optional(z.date()),
  id: z.string(),
})

type LabelFormProps = {
  onSubmit: (data: z.infer<typeof labelFormSchema>) => void
  formType: "add" | "edit"
  label?: Label
}

const LabelForm = ({ onSubmit, formType, label }: LabelFormProps) => {


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const FormSchema = z.object({
    key: z.string().min(4, {
      message: dict?.FromSchemaValidation.key || "Key must be at least 4 characters.",
    }),
    value: z.string().min(4, {
      message: dict?.FromSchemaValidation.value || "Value must be at least 4 characters.",
    }),
    created_at: z.optional(z.date()),
    updated_at: z.optional(z.date()),
    id: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      key: label?.key,
      value: label?.value,
      created_at: label?.created_at,
      updated_at: label?.updated_at,
      id: label?.id ?? Math.random().toString(36).substr(2, 9)
    }
  })

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
        <div>
          <FormField
            control={form.control}
            name="key"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.key || "Key"
                    }
                  </span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {
                      dict?.required || "Required"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder="e.g. policy_label_security_email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="value"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.value || "Value"
                    }
                  </span>
                  <Badge variant="outline" className="ml-2 text-xs">
                    {
                      dict?.required || "Required"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder="e.g. security@test.org" {...field} />
                </FormControl>
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
                dict?.addLabel || "Add Label"

                : dict?.updateLabel || "Update Label"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default LabelForm