"use client"


import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useState } from "react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import { RiskRegisterFormBody } from "@/components/risk-register/risk-form"
import useAssessmentScopeStore from "@/store/assessmentScopeStore";
import useLangStore from "@/store/langagueStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RiskForm } from "@/types";
import { riskStore } from "@/store/riskStore";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"


const AddRiskDialogButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const riskStoreTools = useStore(riskStore, state => state)
  const risk = riskStoreTools?.editModalRisk;
  const langStore = useStore(useLangStore, state => state)
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

  function onSubmit(data: z.infer<typeof RiskForm>) {
    riskStoreTools?.addRisk({
      id: Math.random().toString(),
      riskName: data?.riskName,
      consequences: data?.consequences,
      description: data?.description,
      category: data?.category,
      subcategory: data?.subcategory,
      riskStatus: data?.riskStatus,
      affectedAsset: data?.affectedAsset,
      impact: data?.impact,
      updatedDate: new Date(Date.now()),
      likelihood: data?.likelihood,
      dateRaised: new Date(Date.now()),
      owner: data?.owner,
      tags: data.tags,
    })
    riskStoreTools?.setEditModalOpen(false)
    riskStoreTools?.setEditModalRisk(undefined)
    setOpen(false)
    toast.success("Risk Added successfully")
  }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn("flex flex-row items-center gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>AddRisk</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-screen">
        <DialogHeader>
          <DialogTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {"Add Risk"}
          </DialogTitle>
        </DialogHeader>
        <div className={cn("w-full", className)} >
          <Form {...form}>
            <form className="w-full h-[480px] overflow-y-auto" onSubmit={form.handleSubmit(onSubmit)} >
                  <RiskRegisterFormBody form={form} risk={risk} />
                  <div className={cn("w-full flex mt-2 flex-row-reverse gap-2 justify-end", {
                    "flex-row": langStore?.rtl
                  })}>
                    <Button type="button" variant="ghost" onClick={() => {
                        form.reset()
                        setOpen(false)
                      }}>
                      {
                        dict?.cancel || "Cancel"
                      }
                    </Button>
                    <Button type="submit" variant="outline">
                      {
                        "Create"
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
export default AddRiskDialogButton