'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Tag } from "@/types"
import useLangStore from "@/store/langagueStore"
import { useStore } from "@/hooks/use-store"
import { cn } from "@/lib/utils"

export const tagFormSchema = z.object({
  name: z.string().min(4, {
    message: "Name must be at least 4 characters.",
  }),
  created_at: z.optional(z.date()),
  updated_at: z.optional(z.date()),
  id: z.string(),
})

type TagFormProps = {
  onSubmit: (data: z.infer<typeof tagFormSchema>) => void
  formType: "add" | "edit"
  tag?: Tag
}

const TagForm = ({ onSubmit, formType, tag }: TagFormProps) => {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const FormSchema = z.object({
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    created_at: z.optional(z.date()),
    updated_at: z.optional(z.date()),
    id: z.string(),
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: tag?.name,
      created_at: tag?.created_at,
      updated_at: tag?.updated_at,
      id: tag?.id ?? Math.random().toString(36).substr(2, 9)
    }
  })

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
        <div>
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
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
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder={
                    dict?.name || "Name"
                  } {...field} />
                </FormControl>
                <FormDescription className={cn({
                  "text-right": langStore?.rtl
                })}>
                  {
                    dict?.thisIsTheNameOfTheTag || "This is the name of the tag"
                  }
                </FormDescription>
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
                dict?.addTag || "Add Tag"
                : dict?.updateTag || "Update Tag"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default TagForm