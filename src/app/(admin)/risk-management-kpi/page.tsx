'use client'

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import OperationalRiskTable from "@/components/risk-management-kpi/table";
import { ControlPerformanceChart } from "@/components/risk-management-kpi/control-performance-chart";
import { OpenIssueChart } from "@/components/risk-management-kpi/open-issue-chart";
import RiskMap from "@/components/risk-management-kpi/risk-by-map";
import { RiskByTypeChart } from "@/components/risk-management-kpi/risk-by-type-chart";
import Link from "next/link";
import PageWrapper from "@/components/page-wrapper";


export default function RiskAssessment() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col max-w-full h-full gap-4 grow' >
      <div className="w-full border-b py-2 gap-2 flex flex-col sm:flex-row ">
        <div className={cn("flex flex-row grow py-2 gap-2 items-center w-full", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.riskManagementKPI className="inline-block w-5 h-5 mr-2" />
          <h1 className="text-xl font-semibold">
            Risk Management KPI
          </h1>
        </div>
        <div className="flex justify-end">
          {/* <AddTagDialogButton /> */}
        </div>
      </div>
      <div>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mb-4">
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3 className="text-l">Operational Risk</h3>
            <div>
              <OperationalRiskTable />
            </div>
            <Link className="text-sky-600  underline" href="/risk-register">Click here for more info...</Link>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3 className="text-l">Control Performance</h3>
            <div>
              <ControlPerformanceChart />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3 className="text-l">Open Issues</h3>
            <div>
              <OpenIssueChart />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3 className="text-l">Risk by Type</h3>
            <div className="w-full h-full">
              <RiskByTypeChart />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 justify-center">
            <h3 className="text-l">Risk by Map</h3>
            <div className="w-full h-full overflow-x-scroll">
              <RiskMap />
            </div>
          </div>
        </div>
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}