
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Policy } from "@/types"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"

export const policyFormSchema = z.object({
  reference: z.optional(z.string()),
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  content: z.optional(z.string()),
  description: z.optional(z.string()),
  created_at: z.optional(z.date()),
  updated_at: z.optional(z.date()),
  id: z.string(),
})

type PolicyFormProps = {
  onSubmit: (data: z.infer<typeof policyFormSchema>) => void
  formType: "add" | "edit"
  policy?: Policy
  showOptionnals?: boolean
}

const PolicyForm = ({ onSubmit, formType, policy, showOptionnals = true }: PolicyFormProps) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const FormSchema = z.object({
    reference: z.optional(z.string()),
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    content: z.optional(z.string()),
    description: z.optional(z.string()),
    created_at: z.optional(z.date()),
    updated_at: z.optional(z.date()),
    id: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      reference: policy?.reference,
      name: policy?.name,
      description: policy?.description,
      created_at: policy?.created_at,
      updated_at: policy?.updated_at,
      id: policy?.id ?? Math.random().toString(36).substr(2, 9)
    }
  })


  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
        <div>
          <FormField
            control={form.control}
            name="reference"
            render={({ field, fieldState }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.reference || "Reference"
                  }
                  {showOptionnals === true ? <Badge variant="outline" className="ml-2 text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge> : null}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="ref-123" {...field} />
                </FormControl>
                <FormDescription className={cn({
                  "text-right": langStore?.rtl
                })}>
                  {
                    dict?.thisIsTheReferenceForThePolicy || "This is the reference for the policy."
                  }
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn({
                  "text-right": langStore?.rtl
                })}>
                  {
                    dict?.name || "Name"
                  }
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="ahmed" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem
                className="w-full flex flex-col"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  {
                    dict?.description || "Description"
                  }
                  {showOptionnals === true ? <Badge variant="outline" className="ml-2 text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge> : null}
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder={
                      dict?.description || "description"
                    } {...field} />
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
                dict?.addPolicy || "Add Policy"
                : dict?.updatePolicy || "Update Policy"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default PolicyForm