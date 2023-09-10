"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Evidence } from "@/types"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"

export const evidenceFormSchema = z.object({
  reference: z.optional(z.string()),
  name: z.string().min(4, {
    message: "Name must be at least 2 characters.",
  }),
  content: z.optional(z.string()),
  description: z.optional(z.string()),
  created_at: z.optional(z.date()),
  updated_at: z.optional(z.date()),
  id: z.string(),
})

type EvidenceFormProps = {
  onSubmit: (data: z.infer<typeof evidenceFormSchema>) => void
  formType: "add" | "edit"
  evidence?: Evidence
}

const EvidenceForm = ({ onSubmit, formType, evidence }: EvidenceFormProps) => {


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
      reference: evidence?.reference,
      name: evidence?.name,
      content: evidence?.content,
      description: evidence?.description,
      created_at: evidence?.created_at,
      updated_at: evidence?.updated_at,
      id: evidence?.id ?? Math.random().toString(36).substr(2, 9)
    }
  })

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full gap-3">
        <div>
          <FormField
            control={form.control}
            name="reference"
            render={({ field, fieldState }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.reference || "Reference"
                    }
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder="ref-123" {...field} />
                </FormControl>
                <FormDescription
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                >
                  {
                    dict?.thisIsTheReferenceForTheEvidence || "This is the reference for the evidence."
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
                className="flex flex-col w-full"
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
                  })} placeholder="ahmed" {...field} />
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
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.description || "Description"
                    }
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} placeholder="description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.content || "Content"
                    }
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Textarea

                    className={cn({
                      "text-right": langStore?.rtl
                    })}
                    placeholder="content..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <FormField
            name="content"
            render={({ field }) => (
              <FormItem
                className="flex flex-col w-full"
              >
                <FormLabel className={cn("flex flex-row items-center gap-2", {
                  "text-right flex-row-reverse": langStore?.rtl
                })}>
                  <span>
                    {
                      dict?.attachement || "Attachement"
                    }
                  </span>
                  <Badge variant="outline" className="text-xs">
                    {
                      dict?.optional || "Optional"
                    }
                  </Badge>
                </FormLabel>
                <FormControl>
                  <Input className={cn({
                    "text-right": langStore?.rtl
                  })} id="picture" type="file" />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className={cn("mt-3", {
          "flex flex-row-reverse": langStore?.rtl
        })}>
          <Button type="submit">
            {
              formType === "add" ? "Add Evidence" : "Update Evidence"
            }
          </Button>
        </div>


      </form>
    </Form>
  )
}
export default EvidenceForm