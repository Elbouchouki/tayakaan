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
import { AssessmentFormBody } from "@/components/gap-assessment/assessment-form"
import useAssessmentScopeStore from "@/store/assessmentScopeStore";
import useLangStore from "@/store/langagueStore";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { FRAMWORK_MOCK } from "@/mock";
import { controlSchema } from "@/types";
import { Checkbox } from "../ui/checkbox";
import useFrameworkStore from "@/store/framworkStore";
import useControlStore from "@/store/controlStore";

const AddAssessmentDialogButton = ({
  className
}: {
  className?: string
}) => {

  const [open, setOpen] = useState(false);
  const assessmentStore = useStore(useAssessmentScopeStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const [stepper, setStepper] = useState<"details" | "frameworks" | "controls" | "review">("details")
  const frameworkStore = useStore(useFrameworkStore, state => state)
  const controlStore = useStore(useControlStore, state => state)

  const tabs = [
    {
      name: "details",
      label: dict?.details || "Details"
    }, {
      name: "frameworks",
      label: dict?.frameworks || "Frameworks"
    }, {
      name: "controls",
      label: dict?.controls || "Controls"
    }, {
      name: "review",
      label: dict?.review || "Review"
    }
  ]

  const FormSchema = z.object({
    name: z.string().min(4, {
      message: dict?.FromSchemaValidation.name || "Name must be at least 4 characters.",
    }),
    description: z.string().min(4, {
      message: dict?.FromSchemaValidation.description || "Description must be at least 4 characters.",
    }),
    reportingFrom: z.date({
      required_error: dict?.FromSchemaValidation.reportingFrom || "Reporting from is required"
    }),
    reportingTo: z.date({
      required_error: dict?.FromSchemaValidation.reportingTo || "Reporting to is required"
    }),
    controls: z.array(controlSchema).optional(),
    status: z.enum(["planned", "in-progress", "completed"], {
      required_error: dict?.FromSchemaValidation.status || "Status is required"
    }).optional(),
    type: z.enum(["internal", "external", "both"], {
      required_error: dict?.FromSchemaValidation.type || "Type is required"
    }),
    framworks: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: dict?.FromSchemaValidation.framework || "You have to select at least one framework.",
    }),
    controlsCheck: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: dict?.FromSchemaValidation.controls || "You have to select at least control.",
    })
  })

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      framworks: [],
      controlsCheck: []
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const controls = JSON.parse(JSON.stringify(controlStore?.getControls(data?.controlsCheck)))

    assessmentStore?.addAssessmentScope({
      id: Math.random().toString(36).substr(2, 9),
      name: data?.name ?? "",
      description: data?.description ?? "",
      status: data?.status ?? "planned",
      type: data?.type ?? "",
      reportingFrom: data?.reportingFrom ?? "",
      reportingTo: data?.reportingTo ?? "",
      controls: controls
    })
    setOpen(false)
    toast.success(dict?.assessmentAddedSuccessfully || "Assessment scope added successfully")
  }


  return (

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className={cn("flex flex-row gap-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <PlusCircle className="w-4 h-4" />
          <span>
            {
              dict?.addAssessment || "Add assessment scope"
            }
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle className={cn({
            "text-right mr-3": langStore?.rtl
          })}>
            {
              dict?.addAssessment || "Add assessment scope"
            }
          </DialogTitle>
        </DialogHeader>

        <div className={cn("w-full", className)} >
          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <Tabs value={stepper} >
                <TabsList className="w-full flex flex-row justify-around">
                  {
                    langStore?.rtl ?
                      tabs.reverse().map((tab, index) => (
                        <TabsTrigger key={index} className="cursor-default" value={tab.name} >{tab.label}</TabsTrigger>

                      ))
                      :
                      tabs.map((tab, index) => (
                        <TabsTrigger key={index} className="cursor-default" value={tab.name} >{tab.label}</TabsTrigger>

                      ))
                  }
                </TabsList>
                <TabsContent value="details" className="w-full flex flex-col gap-3">
                  <AssessmentFormBody form={form} />
                  <div className={cn("w-full flex flex-row-reverse gap-2 justify-end", {
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
                    <Button type="button" variant="outline" onClick={async () => {
                      await form.trigger()
                      if (
                        !form.getFieldState("name")?.invalid &&
                        !form.getFieldState("description")?.invalid &&
                        !form.getFieldState("type")?.invalid &&
                        !form.getFieldState("reportingFrom")?.invalid &&
                        !form.getFieldState("reportingTo")?.invalid
                      ) {
                        form.clearErrors()
                        setStepper("frameworks")
                      }
                    }}>
                      {
                        dict?.next || "Next"
                      }
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="frameworks" className="w-full flex flex-col gap-3">
                  <div className="flex flex-col max-h-96 overflow-y-scroll px-4">
                    <FormField
                      control={form.control}
                      name="framworks"
                      render={({ field, fieldState }) => (
                        <FormItem
                          className="w-full flex flex-col"
                        >
                          <FormLabel className={cn({
                            "text-right": langStore?.rtl
                          })}>
                            {
                              dict?.frameworks || "Frameworks"
                            }
                          </FormLabel>
                          <FormMessage />
                          {
                            FRAMWORK_MOCK.map((framework, index) => (
                              <FormField
                                key={framework.id}
                                control={form.control}
                                name="framworks"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={framework.id}
                                      className="flex flex-row items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(framework.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, framework.id])
                                              : field.onChange(
                                                field?.value?.filter(
                                                  (value) => value !== framework.id
                                                )
                                              )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {framework.name}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))
                          }
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className={cn("w-full flex flex-row-reverse gap-2 justify-end", {
                    "flex-row": langStore?.rtl
                  })}>
                    <Button type="button" variant="outline" onClick={() => {
                      setStepper("details")
                    }}>
                      {
                        dict?.previous || "Previous"
                      }
                    </Button>
                    <Button type="button" variant="outline" onClick={async () => {
                      await form.trigger("framworks")
                      if (
                        !form.getFieldState("framworks")?.invalid
                      ) {
                        form.clearErrors()
                        const controls = frameworkStore?.getFrameworksControls(form.getValues("framworks")).map((control) => control.id) || []
                        console.log("controls", controls)
                        form.setValue("controlsCheck", [...controls])
                        setStepper("controls")
                      }
                    }}>
                      {
                        dict?.next || "Next"
                      }
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="controls" className="w-full flex flex-col gap-3">
                  <div className="flex flex-col max-h-96 overflow-y-scroll px-4">
                    <FormField
                      control={form.control}
                      name="controlsCheck"
                      render={({ field, fieldState }) => (
                        <FormItem
                          className="w-full flex flex-col"
                        >
                          <FormLabel className={cn({
                            "text-right": langStore?.rtl
                          })}>
                            {
                              dict?.controls || "Controls"
                            }
                          </FormLabel>
                          <FormMessage />
                          {
                            frameworkStore?.getFrameworksControls(form.getValues("framworks"))?.map((control, index) => (
                              <FormField
                                key={control.id}
                                control={form.control}
                                name="controlsCheck"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={control.id}
                                      className="flex flex-row items-center space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(control.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, control.id])
                                              : field.onChange(
                                                field?.value?.filter(
                                                  (value) => value !== control.id
                                                )
                                              )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {control.name}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))
                          }
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className={cn("w-full flex flex-row-reverse gap-2 justify-end", {
                    "flex-row": langStore?.rtl
                  })}>
                    <Button type="button" variant="outline" onClick={() => setStepper("frameworks")}>
                      {
                        dict?.previous || "Previous"
                      }
                    </Button>
                    <Button type="button" variant="outline" onClick={async () => {
                      await form.trigger("controlsCheck")
                      if (
                        !form.getFieldState("controlsCheck")?.invalid
                      ) {
                        form.clearErrors()
                        setStepper("review")
                      }
                    }}>
                      {
                        dict?.next || "Next"
                      }
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="review" className="w-full flex flex-col gap-3">
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full  flex flex-row gap-2">
                      <div className="w-full  flex flex-col gap-1">
                        <div className="text-base font-semibold">
                          {
                            dict?.name || "Name"
                          }
                        </div>
                        <div className="text-sm">{form.getValues("name")}</div>
                      </div>
                      <div className="w-full  flex flex-col gap-1">
                        <div className="text-base font-semibold">
                          {
                            dict?.type || "Type"
                          }
                        </div>
                        <div className="text-sm">{form.getValues("type")}</div>
                      </div>
                    </div>
                    <div className="w-full  flex flex-row gap-2">
                      <div className="w-full  flex flex-col gap-1">
                        <div className="text-base font-semibold">
                          {
                            dict?.from || "From"
                          }
                        </div>
                        <div className="text-sm">{(form.getValues("reportingFrom") as Date | undefined)?.toLocaleDateString()}</div>
                      </div>
                      <div className="w-full  flex flex-col gap-1">
                        <div className="text-base font-semibold">
                          {
                            dict?.to || "To"
                          }
                        </div>
                        <div className="text-sm">{(form.getValues("reportingTo") as Date | undefined)?.toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="w-full  flex flex-col gap-1">
                      <div className="text-base font-semibold">
                        {
                          dict?.description || "Description"
                        }
                      </div>
                      <div className="text-sm">{form.getValues("description")}</div>
                    </div>
                    <div className="w-full  flex flex-col gap-1">
                      <div className="text-base font-semibold">
                        {
                          dict?.controls || "Controls"
                        }
                      </div>
                      <div className="text-sm flex flex-row gap-1">
                        <span>{(form.getValues("controlsCheck") as string[]).length}</span>
                        <span>
                          {
                            dict?.controlsToBeAssessed || "Controls to be assessed"
                          }
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={cn("w-full flex flex-row-reverse gap-2 justify-end", {
                    "flex-row": langStore?.rtl
                  })}>
                    <Button type="button" variant="outline" onClick={() => setStepper("controls")}>
                      {
                        dict?.previous || "Previous"
                      }
                    </Button>
                    <Button type="submit">
                      {
                        dict?.addAssessment || "Add assessment scope"
                      }
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export default AddAssessmentDialogButton