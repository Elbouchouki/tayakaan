"use client"

import { AssessmentObjectives, ObjectiveTypes } from "@/types"
import ObjectiveItemHeader from "./objective-accordination-item"
import { AccordionContent, AccordionItem } from "@/components/ui/accordion"
import { useState } from "react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import { cn } from "@/lib/utils"
import Editor from "@/components/editor"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { GET_OBJECTIVE_TYPES } from "@/mock"
import { ContentState, EditorState } from 'draft-js';

type ObjectiveItemProps = {
  objective: AssessmentObjectives
  item_index: string
  openedCollapsible: string
  setOpenedCollapsible: (value: string) => void
  checkChanged: () => void
}

const ObjectiveItem = ({
  objective, item_index, openedCollapsible, setOpenedCollapsible, checkChanged
}: ObjectiveItemProps) => {

  const [choice, setChoice] = useState<ObjectiveTypes | undefined>(objective.choices as ObjectiveTypes | undefined)

  const langStore = useStore(useLangStore, state => state)

  const dict = langStore?.getDictionary()

  const [editorState, setEditorState] = useState<EditorState>(
    () => EditorState.createWithContent(ContentState.createFromText(objective.explination || ""))
  );

  const handleChoice = (value: ObjectiveTypes) => {
    setChoice(value)
    objective.choices = value
    checkChanged()
  }

  const handleEditorChange = (value: EditorState) => {
    setEditorState(value)
    objective.explination = value.getCurrentContent().getPlainText()
    checkChanged()

  }

  return (
    <AccordionItem value={item_index} className={cn("border rounded-md hover:border-black dark:hover:border-white", {
      "border-black dark:border-white": item_index == openedCollapsible
    })}>
      <ObjectiveItemHeader choice={choice} objective={objective} item_index={item_index} openedCollapsible={openedCollapsible} setOpenedCollapsible={setOpenedCollapsible} />
      <AccordionContent className="px-6">
        <div className={cn("py-2 text-justify border-b ", {
          "text-right": langStore?.rtl
        })}>
          {objective.objective}
        </div>
        <div className="my-3">
          <RadioGroup value={choice} defaultValue="" className={cn("flex flex-col flex-wrap gap-2 sm:flex-row", {
            "items-end sm:flex-row-reverse": langStore?.rtl
          })}>
            {
              GET_OBJECTIVE_TYPES(langStore?.lang).map((item, index) => (
                <div key={index} className="flex flex-row items-center gap-2">
                  <Label htmlFor={item.label}>{item.label}</Label>
                  <RadioGroupItem onClick={() => handleChoice(item.value)} value={item.value} id={item.value} />
                </div>
              ))
            }
          </RadioGroup>
        </div>
        {
          choice === "Not Applicable" || choice === "Compensating Control" ? <div className="flex flex-col gap-2 py-3">
            <h4 className={cn("font-semibold", {
              "text-right": langStore?.rtl
            })}>
              {
                dict?.explanation || "Explanation"
              }
            </h4>
            <Editor
              editorState={editorState}
              setEditorState={handleEditorChange}
            />
          </div>
            : null
        }
      </AccordionContent>
    </AccordionItem>
  )
}
export default ObjectiveItem