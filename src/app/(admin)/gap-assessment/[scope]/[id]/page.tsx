"use client"

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/hooks/use-store";
import { Control } from "@/types";
import { ArrowLeft, Info } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DetailsHeader from "@/components/gap-assessment/details/details-header";
import DetailsInfo from "@/components/gap-assessment/details/details-info";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ObjectiveItem from "@/components/gap-assessment/details/objective-item";
import { Accordion } from "@/components/ui/accordion";
import Editor from "@/components/editor";
import useLangStore from "@/store/langagueStore";
import { cn } from "@/lib/utils";
import { ContentState, EditorState } from "draft-js";
import { toast } from "sonner";
import useAssessmentScopeStore from "@/store/assessmentScopeStore";
import PageWrapper from "@/components/page-wrapper";


export default function GapAssessmentDetails() {

  const params = useParams()
  const router = useRouter()
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const assessmentStore = useStore(useAssessmentScopeStore, state => state)

  const [loading, setLoading] = useState(true)
  const [control, setControl] = useState<Control | null>(null)
  const [backupControl, setBackupControl] = useState<Control | null>(null)

  const [openedCollapsible, setOpenedCollapsible] = useState<string>("")

  const [editorStateRemed, setEditorStateRemed] = useState<EditorState>(
    () => EditorState.createEmpty(),
  );
  const [editorStateNotes, setEditorStateNotes] = useState<EditorState>(
    () => EditorState.createEmpty(),
  );
  const [editorStatePolicies, setEditorStatePolicies] = useState<EditorState>(
    () => EditorState.createEmpty(),
  );
  const [editorStateProc, setEditorStateProc] = useState<EditorState>(
    () => EditorState.createEmpty(),
  );
  const [editorStateStand, setEditorStateStand] = useState<EditorState>(
    () => EditorState.createEmpty(),
  );

  let tab1Elements = [
    {
      label: dict?.informations || "Informations",
      value: "informations"
    }, {
      label: dict?.remediationPlan || "Remediation Plan",
      value: "remediation-plan"
    }, {
      label: dict?.notes || "Notes",
      value: "notes"
    }
  ]

  let tab2Elements = [
    {
      label: dict?.policies || "Policies",
      value: "policies"
    }, {
      label: dict?.standard || "Standards",
      value: "standard"
    }, {
      label: dict?.procedures || "Procedures",
      value: "procedures"
    }
  ]

  const [reRender, setReRender] = useState<number>(1)

  const [changed, setChanged] = useState<boolean>(false)

  const checkChanged = () => {
    const original = backupControl?.Assessments?.map((item) => ({
      choices: item?.choices,
      explination: item?.explination
    }))
    const current = control?.Assessments?.map((item) => (
      {
        choices: item?.choices,
        explination: item?.explination
      }
    ))
    if (JSON.stringify(original) !== JSON.stringify(current)) {
      setChanged(true)
      return
    }
    const remed = editorStateRemed.getCurrentContent().getPlainText()
    if (remed.length > 0 && remed !== backupControl?.remediationPlanText) {
      setChanged(true)
      return
    }
    const notes = editorStateNotes.getCurrentContent().getPlainText()
    if (notes.length > 0 && notes !== backupControl?.notesText) {
      setChanged(true)
      return
    }
    const policies = editorStatePolicies.getCurrentContent().getPlainText()
    if (policies.length > 0 && policies !== backupControl?.policiesText) {
      setChanged(true)
      return
    }
    const proc = editorStateProc.getCurrentContent().getPlainText()
    if (proc.length > 0 && proc !== backupControl?.proceduresText) {
      setChanged(true)
      return
    }
    const stand = editorStateStand.getCurrentContent().getPlainText()
    if (stand.length > 0 && stand !== backupControl?.standardsText) {
      setChanged(true)
      return
    }
    setChanged(false)
  }

  const saveChanges = () => {
    setBackupControl(JSON.parse(JSON.stringify((control))))
    if (control) {
      assessmentStore?.updateControlByScopeAndId(params.scope as string, params.id as string, control)
    }
    toast.success(dict?.changesSavedCuccessfully || "Changes saved successfully")
    setChanged(false)
  }

  const discardChanges = () => {
    setControl(JSON.parse(JSON.stringify((backupControl))))
    setEditorStateRemed(EditorState.createWithContent(ContentState.createFromText(backupControl?.remediationPlanText || "")))
    setEditorStateNotes(EditorState.createWithContent(ContentState.createFromText(backupControl?.notesText || "")))
    setEditorStatePolicies(EditorState.createWithContent(ContentState.createFromText(backupControl?.policiesText || "")))
    setEditorStateProc(EditorState.createWithContent(ContentState.createFromText(backupControl?.proceduresText || "")))
    setEditorStateStand(EditorState.createWithContent(ContentState.createFromText(backupControl?.standardsText || "")))
    setChanged(false)
    setReRender(reRender + 1)
  }

  useEffect(() => {
    const controlFound = assessmentStore?.getControlByScopeAndId(params.scope as string, params.id as string)
    setControl(controlFound || null)
    setBackupControl(JSON.parse(JSON.stringify((controlFound) || null)))
    if (assessmentStore) {
      setLoading(false)
    }
    if (!loading && !controlFound) {
      router.back()
    }
  }, [loading, params.id, router, assessmentStore, params.scope])


  if (loading || control === null) {
    return <Skeleton className='w-screen h-screen' />
  } else {
    return (
      <PageWrapper className='flex flex-col h-full max-w-full gap-4 grow' >
        <div className={cn("w-full border-b py-2 flex flex-row gap-4 ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Button variant="ghost"
            size="sm"
            onClick={() => router.back()}
            className={cn("flex flex-row items-center gap-2", {
              "flex-row-reverse": langStore?.rtl
            })}
          >
            <ArrowLeft className={cn("w-4 h-4", {
              "transform rotate-180": langStore?.rtl
            })} />
            <span>
              {
                dict?.backToAllQuestions || "Back to all questions"
              }
            </span>
          </Button>
        </div>
        <DetailsHeader control={control} />
        <DetailsInfo control={control} />
        <div className="mx-5">
          <Card>
            <CardHeader>
              <CardTitle className={cn("text-sm", {
                "text-right": langStore?.rtl
              })}>
                {
                  dict?.assessmentObjectives || "Assessment Objectives"
                }
              </CardTitle>
              <CardDescription className={cn("flex flex-row gap-2", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <Info className="w-4 h-4 " />
                <div className={cn("text-justify", {
                  "text-right": langStore?.rtl
                })}
                  dangerouslySetInnerHTML={{ __html: dict?.assessmentObjectivesDescription || "" }}
                ></div>
              </CardDescription>
            </CardHeader>
            <CardContent key={reRender}>
              <Accordion value={openedCollapsible} type="single" collapsible className="flex flex-col w-full gap-2">
                {
                  control?.Assessments?.map((objective, index) => {
                    const item_index = `item-${index}`
                    return <ObjectiveItem checkChanged={checkChanged} key={index} objective={objective} item_index={item_index} openedCollapsible={openedCollapsible} setOpenedCollapsible={setOpenedCollapsible} />
                  })
                }
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <Card>
          <Tabs defaultValue="informations" className="w-full">
            <CardHeader>
              <div className={cn("flex flex-row", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <TabsList>
                  {
                    langStore?.rtl ?
                      tab1Elements.reverse().map((item, index) => (
                        <TabsTrigger key={index} value={item.value}>{item.label}</TabsTrigger>
                      ))
                      :
                      tab1Elements.map((item, index) => (
                        <TabsTrigger key={index} value={item.value}>{item.label}</TabsTrigger>
                      ))
                  }
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="informations">
                <div className={cn("text-sm text-justify whitespace-pre-line", {
                  "text-right": langStore?.rtl
                })}>
                  {
                    control.methods ? <div className="flex flex-col gap-4">
                      <span className="font-semibold">
                        {
                          dict?.methodsToComply || "Methods to comply"
                        }
                      </span>
                      <span>{control.methods}</span>
                    </div> : <span>
                      {
                        dict?.noInformationAvailableForThisControl || "No information available for this control"
                      }
                    </span>
                  }
                </div>
              </TabsContent>
              <TabsContent value="remediation-plan">
                <Editor
                  editorState={editorStateRemed}
                  setEditorState={(value) => {
                    setEditorStateRemed(value)
                    control.remediationPlanText = value.getCurrentContent().getPlainText()
                    checkChanged()
                  }}
                />
              </TabsContent>
              <TabsContent value="notes">
                <Editor
                  editorState={editorStateNotes}
                  setEditorState={(value) => {
                    setEditorStateNotes(value)
                    control.notesText = value.getCurrentContent().getPlainText()
                    checkChanged()
                  }}
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <Card>
          <Tabs defaultValue="policies" className="w-full" >
            <CardHeader>
              <div className={cn("flex flex-row", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <TabsList>
                  {
                    langStore?.rtl ?
                      tab2Elements.reverse().map((item, index) => (
                        <TabsTrigger key={index} value={item.value}>{item.label}</TabsTrigger>
                      ))
                      :
                      tab2Elements.map((item, index) => (
                        <TabsTrigger key={index} value={item.value}>{item.label}</TabsTrigger>
                      ))
                  }
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="policies">
                <Editor
                  editorState={editorStatePolicies}
                  setEditorState={(value) => {
                    setEditorStatePolicies(value)
                    control.policiesText = value.getCurrentContent().getPlainText()
                    checkChanged()
                  }}
                />
              </TabsContent>
              <TabsContent value="standard">
                <Editor
                  editorState={editorStateStand}
                  setEditorState={(value) => {
                    setEditorStateStand(value)
                    control.standardsText = value.getCurrentContent().getPlainText()
                    checkChanged()
                  }}
                />
              </TabsContent>
              <TabsContent value="procedures">
                <Editor
                  editorState={editorStateProc}
                  setEditorState={(value) => {
                    setEditorStateProc(value)
                    control.proceduresText = value.getCurrentContent().getPlainText()
                    checkChanged()
                  }}
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
        <div className={cn("fixed flex flex-row gap-1 bottom-5 right-5", {
          "hidden": !changed,
          "flex-row-reverse left-5 right-auto": langStore?.rtl
        })}>
          <Button size="sm" className="shadow-md" onClick={() => saveChanges()}>
            {
              dict?.save || "Save"
            }
          </Button>
          <Button size="sm" variant="secondary" className="shadow-md" onClick={() => discardChanges()}>
            {
              dict?.discard || "Discard"
            }
          </Button>
        </div>
      </PageWrapper >
    )
  }
}