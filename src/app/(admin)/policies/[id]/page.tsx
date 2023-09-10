"use client"
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/hooks/use-store";
import usePolicyStore from "@/store/policyStore";
import { Policy } from "@/types";
import { FileEdit } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { policyFormSchema } from '@/components/policies/policy-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from 'sonner';
import Footer from "@/components/layout/footer";
import Editor from '@/components/editor';
import { ContentState, EditorState } from 'draft-js';
import useLangStore from "@/store/langagueStore";
import BackButton from "@/components/back-button";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/page-wrapper";


export default function PolicesDetails() {

  const params = useParams()
  const router = useRouter()
  const policyStore = useStore(usePolicyStore, state => state)

  const [loading, setLoading] = useState(true)
  const [policy, setPolicy] = useState<Policy | null>(null)


  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createWithContent(ContentState.createFromText(policy?.content || ""))
  );

  const form = useForm<z.infer<typeof policyFormSchema>>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: {
      reference: policy?.reference,
      name: policy?.name,
      content: policy?.content,
      description: policy?.description,
      created_at: policy?.created_at,
      updated_at: policy?.updated_at,
      id: policy?.id ?? Math.random().toString(36).substr(2, 9)
    }
  })

  useEffect(() => {
    const policyFound = policyStore?.policies.find(policy => policy.id === params.id)
    setPolicy(policyFound || null)
    if (policyStore) {
      setLoading(false)
      form.setValue("reference", policyFound?.reference)
      form.setValue("name", policyFound?.name as string)
      form.setValue("description", policyFound?.description)
      form.setValue("content", policyFound?.content)
      form.setValue("created_at", policyFound?.created_at)
      form.setValue("updated_at", policyFound?.updated_at)
      form.setValue("id", policyFound?.id as string)
    }
    if (!loading && !policyFound) {
      router.push(`/policies`)
    }
  }, [loading, policyStore, params.id, router, form])


  function onSubmit(data: z.infer<typeof policyFormSchema>) {
    policyStore?.updatePolicy({
      reference: data.reference,
      name: data.name,
      description: data.description ?? "",
      content: editorState.getCurrentContent().getPlainText('\u0001'),
      id: data.id,
      created_at: data.created_at ?? new Date(),
      updated_at: data.updated_at ?? new Date(),
    })
    policyStore?.setEditModalOpen(false)
    policyStore?.setEditModalPolicy(undefined)
    toast.success(
      dict?.policyUpdatedSuccessfully || "Policy Updated Successfully"
    )
    router.push(`/policies`)
  }

  if (loading || policy === null) {
    return <Skeleton className='w-screen h-screen' />
  } else {
    return (
      <PageWrapper className='flex flex-col w-full h-full gap-4 px-2 ' >
        <div className={cn("w-full border-b py-2 flex flex-row gap-4 ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <BackButton />
          <div className={cn("text-lg md:text-xl font-semibold grow flex flex-row gap-2 items-center", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <span>
              {
                dict?.policy || "Policy"
              }
            </span>
            <span>
              {" - "}
            </span>
            <span>
              {policy.name}
            </span>
          </div>
        </div>
        <div className='w-full h-full flex flex-col gap-4 justify-start'>
          <Form  {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grow flex flex-col gap-3">
              <div className={cn('flex flex-col sm:flex-row w-full  flex-wrap gap-3', {
                "sm:flex-row-reverse": langStore?.rtl
              })}>
                <div className="w-full  sm:w-[200px] lg:w-[250px] grow lg:grow-0 whitespace-nowrap">
                  <FormField
                    control={form.control}
                    name="reference"
                    render={({ field, fieldState }) => (
                      <FormItem
                        className="w-full flex flex-col"
                      >
                        <FormLabel className={cn({
                          "text-right": langStore?.rtl
                        })}>
                          {
                            dict?.reference || "Reference"
                          }
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={cn({
                              "text-right": langStore?.rtl
                            })}
                            placeholder="ref-123" {...field} />
                        </FormControl>
                        <FormDescription className={cn({
                          "text-right": langStore?.rtl
                        })}>
                          {
                            dict?.thisIsTheReferenceForThePolicy || "This is the reference for the policy."
                          }
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full sm:w-[200px] lg:w-[250px] grow lg:grow-0 whitespace-nowrap">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
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
                          <Input
                            className={cn({
                              "text-right": langStore?.rtl
                            })}
                            placeholder="ahmed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full sm:w-[200px] lg:w-[250px] grow lg:grow-0 whitespace-nowrap">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem
                        className="w-full flex flex-col"
                      >
                        <FormLabel className={cn({
                          "text-right": langStore?.rtl
                        })}>
                          {
                            dict?.description || "Description"
                          }
                        </FormLabel>
                        <FormControl>
                          <Input
                            className={cn({
                              "text-right": langStore?.rtl
                            })}
                            placeholder={
                              dict?.description || "description"
                            } {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem
                      className="w-full flex flex-col"
                    >
                      <FormLabel className={cn({
                        "text-right": langStore?.rtl
                      })}>
                        {
                          dict?.content || "Content"
                        }
                      </FormLabel>
                      <FormControl>
                        <Editor
                          editorState={editorState}
                          setEditorState={setEditorState}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className={cn("mt-3", {
                "flex flex-row-reverse": langStore?.rtl
              })}>
                <Button type="submit" size="sm" className={cn("flex flex-row gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  <FileEdit className="w-4 h-4 " />
                  <span>
                    {
                      dict?.updatePolicy || "Update Policy"
                    }
                  </span>
                </Button>
              </div>
              <Footer className='mt-3 flex grow items-end' />
            </form>
          </Form>
        </div>
      </PageWrapper>
    )
  }

}