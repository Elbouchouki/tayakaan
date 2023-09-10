"use client"

import { Icons } from "@/components/icons";
import AddLabelDialogButton from "@/components/label/add-label-dialog";
import { DataTable } from "@/components/label/table/data-table";
import Footer from "@/components/layout/footer";
import PageWrapper from "@/components/page-wrapper";
import { useStore } from "@/hooks/use-store";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";


export default function Labels() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col w-full h-full gap-4' >
      <div className={cn("flex flex-col w-full gap-2 py-2 border-b sm:flex-row", {
        "sm:flex-row-reverse": langStore?.rtl,
      })}>
        <div className="flex flex-col grow">
          <h1 className={
            cn("text-xl font-semibold grow gap-2 flex flex-row items-center", {
              "flex-row-reverse": langStore?.rtl
            })
          }>
            <Icons.labels className="inline-block w-4 h-4" />
            <span>
              {
                dict?.labels || "Labels"
              }
            </span>
          </h1>
          <h3 className={cn("text-sm text-muted-foreground", {
            "text-right": langStore?.rtl
          })}>
            {
              dict?.labelsAreVariablesThatAreUsedInYourPolicies || "Labels are variables that are used in your policies"
            }
          </h3>
        </div>
        <div className="flex justify-end">
          <AddLabelDialogButton />
        </div>
      </div>
      <div className="h-full flex flex-col overflow-x-scroll pr-3  p-1">
        <DataTable />
        <Footer className='mt-3 grow items-end' />
      </div>
    </PageWrapper>
  )
}