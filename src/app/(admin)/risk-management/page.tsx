'use client';

import Footer from "@/components/layout/footer";
import { Icons } from "@/components/icons";
import { useStore } from "@/hooks/use-store";
import useLangStore from "@/store/langagueStore";
import { RiskRatingChart } from "@/components/risk-mamagement/risk-rating-chart";
import RiskHeatMap from "@/components/risk-mamagement/risk-heatmap";
import { ActionPlanChart } from "@/components/risk-mamagement/action-plan-chart";
import { RiskVulnerabilitiesChart } from "@/components/risk-mamagement/risk-vulnerabilities";
import { RiskEntitiesChart } from "@/components/risk-mamagement/risk-entities";
import { cn } from "@/lib/utils";
import PageWrapper from "@/components/page-wrapper";


export default function RiskManagements() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  return (
    <PageWrapper className='flex flex-col max-w-full h-full gap-4 grow' >
      <div className="w-full border-b py-2 gap-2 flex flex-col sm:flex-row ">
        <div className={cn("flex flex-row items-center w-full gap-2 py-2", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <Icons.overview className="inline-block w-5 h-5 mr-2" />
          <h1 className="text-xl font-semibold">
            Risk Management
          </h1>
        </div>
        <div className="flex justify-end">
          {/* <AddTagDialogButton /> */}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="rounded-full border-2 h-[160px] w-[160px] border-orange-400 text-orange-400 flex justify-center items-center text-4xl">
              38.4%
            </div>
            <h3 className="text-l">% Risk Threshold</h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="rounded-full border-2 h-[160px] w-[160px] border-blue-600 text-blue-600 flex justify-center items-center text-4xl">389</div>
            <h3 className="text-l">Risk Threshold</h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="rounded-full border-2 h-[160px] w-[160px] border-orange-400 text-orange-400 flex justify-center items-center text-4xl">86.7%</div>
            <h3 className="text-l">Rist Analysis Progress</h3>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="rounded-full border-2 h-[160px] w-[160px] border-blue-600 text-blue-600 flex justify-center items-center text-4xl">55.7%</div>
            <h3 className="text-l">Response Progress For Rist Threshold</h3>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-1 grid-cols-1">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-full text-center border-2 border-blue-600 text-blue-600">
              <h3 className="text-l">Risk Rating Breakdown</h3>
            </div>
            <div>
              <RiskRatingChart />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-full text-center border-2 border-orange-400 text-orange-400">
              <h3 className="text-l">Risk Heat Map</h3>
            </div>
            <div className="w-full h-full overflow-x-scroll">
              <RiskHeatMap />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="w-full text-center border-2 border-blue-600 text-blue-600">
              <h3 className="text-l">Action Plan Breakdown</h3>
            </div>
            <div>
              <ActionPlanChart />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <div className="flex flex-col gap-4">
            <h3 className="text-l">Resk Threshold: Top 5 Vulnerabilities</h3>
            <div>
              <RiskVulnerabilitiesChart />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-l">Resk Threshold: Top 5 Entities</h3>
            <div>
              <RiskEntitiesChart />
            </div>
          </div>
        </div>
      </div>
      <Footer className='mt-3 grow items-end' />
    </PageWrapper>
  )
}