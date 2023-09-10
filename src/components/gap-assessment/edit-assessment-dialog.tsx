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
import AssessmentForm from "@/components/gap-assessment/assessment-form"
import useAssessmentScopeStore from "@/store/assessmentScopeStore"
import useLangStore from "@/store/langagueStore"
import { controlSchema } from "@/types"

const EditAssessmentDialog = ({
  className,
}: {
  className?: string
}) => {

  const assessmentStore = useStore(useAssessmentScopeStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()


  const FormSchema = z.object({
    id: z.string(),
    name: z.string().min(4, {
      message: "Name must be at least 4 characters.",
    }),
    description: z.string().min(4, {
      message: "Description must be at least 4 characters.",
    }),
    reportingFrom: z.date({
      required_error: "Reporting from is required"
    }),
    reportingTo: z.date({
      required_error: "Reporting to is required"
    }),
    controls: z.array(controlSchema).optional(),
    status: z.enum(["planned", "in-progress", "completed"], {
      required_error: "Status is required"
    }).optional(),
    type: z.enum(["internal", "external", "both"], {
      required_error: "Type is required"
    }),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    assessmentStore?.updateAssessmentScope({
      id: data?.id ?? Math.random().toString(36).substr(2, 9),
      name: data?.name ?? "",
      description: data?.description ?? "",
      status: data?.status,
      type: data?.type ?? "",
      reportingFrom: data?.reportingFrom ?? "",
      reportingTo: data?.reportingTo ?? ""
    })
    assessmentStore?.setEditModalOpen(false)
    assessmentStore?.setEditModalAssessmentScope(undefined)
    toast.success(dict?.assessmentUpdatedSuccessful || "Assessment scope updated successfully")
  }

  return (
    <Dialog open={assessmentStore?.editModalOpen} onOpenChange={assessmentStore?.setEditModalOpen}>
      <DialogContent >
        <DialogHeader>
          <DialogTitle>
            <span>
              {
                dict?.updateAssessment || "Update assessment scope"
              }
            </span>
            <span>
              {" " + assessmentStore?.editModalAssessmentScope?.id}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)}>
          <AssessmentForm assessmentScope={assessmentStore?.editModalAssessmentScope} onSubmit={onSubmit} formType="edit" />
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default EditAssessmentDialog