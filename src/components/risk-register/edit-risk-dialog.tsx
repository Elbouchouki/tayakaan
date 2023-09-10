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
import AssessmentForm from "@/components/risk-register/risk-form"
import useLangStore from "@/store/langagueStore"
import { RiskForm, tagSchema } from "@/types"
import { riskStore } from "@/store/riskStore"

const EditRiskDialog = ({
  className,
}: {
  className?: string
}) => {

  const riskStoreTools = useStore(riskStore, state => state);
  const data = (riskStoreTools?.risks ?? []);

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


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
      <DialogContent >
        <DialogHeader>
          <DialogTitle>
            <span>
              {"Update risk"}
            </span>
            <span>
              {" " + riskStoreTools?.editModalRisk?.id}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full h-[480px] overflow-y-auto", className)}>
          <AssessmentForm risk={riskStoreTools?.editModalRisk} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditRiskDialog