'use client'

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { DataTable } from "@/components/risk-register/table/data-table";
import { riskStore } from "@/store/riskStore";
import AddRiskDialogButton from "@/components/risk-register/add-risk-dialog";
import PageWrapper from "@/components/page-wrapper";


export default function RiskRegister() {

  const store = useStore(riskStore, state => state)
  const risks = store?.risks

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  // const avgCtrlScore = risks?.map(risk => risk.avgControlScore);
  const impactScore = risks?.map(risk => risk.impact);

  return (
    <PageWrapper className='flex flex-col w-full h-full gap-4 overflow-x-hidden px-4' >
      <div className="w-full border-b py-2 gap-2 flex flex-col sm:flex-row">
        <div className={cn("flex flex-row grow py-2 gap-2 items-center w-full", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.riskRegister className="inline-block w-5 h-5 mr-2" />
          <h1 className="text-xl font-semibold">
            Risk Register
          </h1>
        </div>
        <div className="flex justify-end">
          <AddRiskDialogButton />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid sm:grid-cols-3 grid-cols-1 gap-4">
          <div className="flex flex-col gap-3 border-[1px] p-2">
            <h2>Avg. Overall Risk Score</h2>
            <p>{((impactScore?.reduce((prev, curr) => (prev + curr)) ?? 0) / (impactScore?.length ?? 1)).toFixed(2)}</p>
          </div>
          <div className="flex flex-col gap-3 border-[1px] p-2">
            <h2>Avg. Control Score</h2>
            {/* <p>{((avgCtrlScore?.reduce((prev, curr) => (prev + curr)) ?? 0) / (avgCtrlScore?.length ?? 1)).toFixed(2)}</p> */}
          </div>
          <div className="flex flex-col gap-3 border-[1px] p-2">
            <h2>Accepted Solutions</h2>
            <p>3</p>
          </div>
        </div>
        <DataTable />
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}