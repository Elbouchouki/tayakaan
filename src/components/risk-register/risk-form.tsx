"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {  Category, Risk, RiskForm, tagSchema } from "@/types"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { Textarea } from "@/components/ui/textarea"
import { ar, enUS } from 'date-fns/locale';
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"
import { CATEGORY, RISK_STATUS } from "@/mock"
import useTagStore from "@/store/tagStore"
import Multiselect from "multiselect-react-dropdown"

type RiskFormProps = {
  onSubmit: (data: z.infer<typeof RiskForm>) => void
  formType: "add" | "edit"
  risk?: Risk
}

export const RiskRegisterFormBody = (
  { form, risk }: {
    form: any, risk: Risk | undefined
  }) => {
    
  const langStore = useStore(useLangStore, state => state)
  const tagStore = useStore(useTagStore, state => state)
  const dict = langStore?.getDictionary()

  const [likelihood, setLikelihood] = useState<number>(risk?.likelihood ?? 1)
  const [impact, setImpact] = useState<number>(risk?.impact ?? 1)
  const [riskScore, setRiskScore] = useState<number>(impact * likelihood)
  const [category, setCategory] = useState<Category | null>(
    CATEGORY.filter(c => c.id === form.formState.defaultValues.category)[0]
    ?? null
  )

  return (
    <div className="flex flex-col w-full gap-4 overflow-y-auto">
      <div>
        <FormField
          control={form.control}
          name="searchMasterRiskList"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-row gap-2 flex-row-reverse justify-end items-center"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Search Master Risk List?"}
              </FormLabel>
              <FormControl className="mt-0">
                <Switch
                  className="mt-0"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="riskName"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Risk Name"}
              </FormLabel>
              <FormControl>
                <Input
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={"Enter Risk Name..."} {...field} />
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
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={
                    dict?.description || "Enter A Description..."
                  } {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="consequences"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                Consequences
              </FormLabel>
              <FormControl>
                <Textarea
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={
                    dict?.description || "Enter A Consequences..."
                  } {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="owner"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Risk Owner"}
              </FormLabel>
              <FormControl>
                <Input
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={"Enter Risk Owner's Name..."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="affectedAsset"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Affected Asset"}
              </FormLabel>
              <FormControl>
                <Input
                  className={cn({
                    "text-right": langStore?.rtl
                  })}
                  placeholder={"Enter affected by risk..."} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div>
        <FormField
          control={form.control}
          name="category"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Categoty"}
              </FormLabel>
              <Select onValueChange={(id) => {
                setCategory(CATEGORY.filter(c => c.id === id)[0])
                return field.onChange(id)
              }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {CATEGORY.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.value}</SelectItem>
                  )) || null}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {category && <div>
        <FormField
          control={form.control}
          name="subcategory"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Subcategoty"}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a subcategory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className={`${category ? "block" : "hidden" }`}>
                  {category?.subCategory?.map((c) => (
                    <SelectItem key={c.id} value={c.id.toString()}>{c.value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>}
      <div>
        <FormField
          control={form.control}
          name="riskStatus"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Risk Status"}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {RISK_STATUS.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.value}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field, fieldState }) => (
            <FormItem
              className="w-full flex flex-col mt-4"
            >
              <FormLabel className={cn({
                "text-right": langStore?.rtl
              })}>
                {"Tags"}
              </FormLabel>
                <Multiselect
                  className="text-primary"
                  style={{ optionContainer: {
                    backgroundColor:  'white'
                  }}}
                  {...field}
                  selectedValues={field.value}
                  onSelect={(selectedList, selectedItem) => {
                    field.onChange(selectedList)
                  }}
                  displayValue="name"
                  options={tagStore?.tags}
                />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-1 gap-3">
        <div className="grid grid-col gap-4 col-span-5">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="impact"
              render={({ field, fieldState }) => (
                <FormItem
                  className="w-full flex flex-col"
                >
                  <FormLabel className={cn({
                    "text-right": langStore?.rtl
                  })}>
                    Impact
                  </FormLabel>
                  <FormControl>
                    <Slider onValueChange={(val) => {
                      setImpact(val[0])
                      setRiskScore(val[0] * likelihood)
                      field.onChange(val[0])
                    }} defaultValue={[field.value]} min={1} max={5} step={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full flex flex-row justify-between ietms-center text-[10px]">
              <span>Rare</span>
              <span>Unlikely</span>
              <span>Reasonably Possible</span>
              <span>Likely</span>
              <span>Almost Certain</span>
            </div>
          </div>
          <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="likelihood"
                render={({ field, fieldState }) => (
                  <FormItem
                    className="w-full flex flex-col"
                  >
                    <FormLabel className={cn({
                      "text-right": langStore?.rtl
                    })}>
                      Probability
                    </FormLabel>
                    <FormControl>
                      <Slider onValueChange={(val) => {
                        setLikelihood(val[0])
                        setRiskScore(val[0] * impact)
                        field.onChange(val[0])
                      }} defaultValue={[field.value]} min={1} max={5} step={1} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-row justify-between ietms-center text-[10px]">
                <span>Rare</span>
                <span>Unlikely</span>
                <span>Reasonably Possible</span>
                <span>Likely</span>
                <span>Almost Certain</span>
              </div>
          </div>
        </div>
        <div>
          <h3 className="text-[14px]">Inherent Risk Score</h3>
          <span>{riskScore}</span>
        </div>
      </div>
    </div>
  )
}

const AssessmentForm = ({ onSubmit, formType, risk }: RiskFormProps) => {

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

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      riskName: risk?.riskName || "",
      description: risk?.description || "",
      consequences: risk?.consequences || "",
      affectedAsset: risk?.affectedAsset || "",
      dateRaised: risk?.dateRaised || new Date(Date.now()),
      riskStatus: risk?.riskStatus || "",
      impact: risk?.impact || 1,
      likelihood: risk?.likelihood || 1,
      category: risk?.category || "",
      subcategory: risk?.subcategory || "",
      owner: risk?.owner || "",
      id: risk?.id || Math.random().toString(),
      tags: risk?.tags || [],
    }
  })

  return (
    <Form  {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
        <RiskRegisterFormBody form={form} risk={risk} />
        <div className="mt-3">
          <Button type="submit">
            {
              formType === "add" ?
                "Add Risk"
                : "Update Risk"
            }
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default AssessmentForm