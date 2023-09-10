'use client'

import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { DialogHeader } from "../ui/dialog"
import { Button } from "../ui/button"
import { Risk, RiskForm, tagSchema } from "@/types"
import { cn } from "@/lib/utils"
import { Form } from "../ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { RiskRegisterFormBody } from "@/components/risk-register/risk-form"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { riskStore } from "@/store/riskStore"
import { toast } from "sonner"

export const UpdateRiskForm = ({ risk, className }: { risk: Risk, className?: string }) => {

  const langStore = useStore(useLangStore, state => state)
  const riskStoreTools = useStore(riskStore, state => state)
  const dict = langStore?.getDictionary()

  const form = useForm<z.infer<typeof RiskForm>>({
    resolver: zodResolver(RiskForm),
    defaultValues: {
      riskName: risk?.riskName || "",
      description: risk?.description || "",
      consequences: risk?.consequences || "",
      affectedAsset: risk?.affectedAsset || "",
      dateRaised: risk?.dateRaised || new Date(Date.now()),
      riskStatus: risk?.riskStatus || "",
      impact: risk?.impact || 1,
      likelihood: risk?.likelihood || 1,
      category: risk?.category || undefined,
      subcategory: risk?.subcategory || undefined,
      owner: risk?.owner || "",
      id: risk?.id || Math.random().toString(),
      tags: risk?.tags || []
    }
  })

  const FormSchema = z.object({
    id: z.string(),
    riskName: z.string().min(4, {
      message: "Risk Name must be at least 4 characters.",
    }),
    description: z.string().min(4, {
      message: "description must be at least 4 characters.",
    }),
    consequences: z.string().min(4, {
      message: "Consequences must be at least 4 characters."
    }),
    dateRaised: z.date(),
    affectedAsset: z.string().min(4, {
      message: "Affect Asset must be at least 4 characters."
    }),
    category: z.string(),
    subcategory: z.string(),
    riskStatus: z.string(),
    impact: z.coerce.number(),
    likelihood: z.coerce.number(),
    owner: z.string().min(2, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 2 characters.",
    }),
    tags: z.array(tagSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    riskStoreTools?.updateRisk({
      id: data?.id ?? Math.random().toString(),
      riskName: data?.riskName ?? "",
      description: data?.description ?? "",
      consequences: data?.consequences ?? "",
      affectedAsset: data?.affectedAsset || "",
      category: data?.category ?? undefined,
      subcategory: data?.subcategory ?? undefined,
      riskStatus: data?.riskStatus ?? "",
      impact: data?.impact ?? 1,
      likelihood: data?.likelihood ?? 1,
      updatedDate: new Date(Date.now()),
      dateRaised: data?.dateRaised ?? new Date(Date.now()),
      owner: data?.owner ?? "",
      tags: data?.tags || []
    })
    riskStoreTools?.setEditModalOpen(false)
    riskStoreTools?.setEditModalRisk(undefined)
    toast.success("Risk updated successfully")
  }

  return (
    <Dialog open={riskStoreTools?.editModalOpen} onOpenChange={riskStoreTools?.setEditModalOpen}>
      <DialogTrigger asChild>
        <Button className="w-[260px]">Update Risk</Button>
      </DialogTrigger>
      <DialogContent className="w-screen">
        <DialogHeader>
          <DialogTitle>Update {risk.riskName}</DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)} >
          <Form {...form}>
            <form className="w-full h-[480px] overflow-y-auto px-4" onSubmit={form.handleSubmit(onSubmit)}>
              <RiskRegisterFormBody form={form} risk={risk} />
              <div className={cn("w-full flex mt-2 flex-row-reverse gap-2 justify-end", {
                "flex-row": langStore?.rtl
              })}>
                <Button type="button" variant="ghost" onClick={() => {
                  form.reset()
                  riskStoreTools?.setEditModalOpen(false)
                  riskStoreTools?.setEditModalRisk(undefined)
                }}>
                  {
                    dict?.cancel || "Cancel"
                  }
                </Button>
                <Button type="submit" variant="outline">
                  {
                    "Update Risk"
                  }
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}