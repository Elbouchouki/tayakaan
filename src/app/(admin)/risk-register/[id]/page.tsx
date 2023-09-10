'use client'

import Footer from "@/components/layout/footer"
import PageWrapper from "@/components/page-wrapper"
import { UpdateRiskForm } from "@/components/risk/form"
import { Badge } from "@/components/ui/badge"
import { DialogHeader } from "@/components/ui/dialog"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"
import { CATEGORY, RISK_STATUS } from "@/mock"
import useLangStore from "@/store/langagueStore"
import { riskStore } from "@/store/riskStore"
import { Risk } from "@/types"
import { ChevronLeft, ChevronRight, ShieldQuestion } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useStore } from "zustand"

export default function RiskDataPage() {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const params = useParams()
  const router = useRouter()

  const store = useStore(riskStore, state => state);

  const id = params.id
  const [loading, setLoading] = useState(true)
  const [risk, setRisk] = useState<Risk | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState<boolean>(false)

  useEffect(() => {
    const riskFound = store?.getRiskById(id as string)
    setRisk(riskFound || null)
    if (risk) {
      setLoading(false)
    }
    if (!loading && !riskFound) {
      router.push(`/risk-register`)
    }
  }, [loading, store, risk, id, router])

  const priorityHandler = (risk: Risk) => {
    if (risk.impact * risk.likelihood < 6) {
      return <div className="p-2 text-[black] text-center dark:text-[red] bg-[red] dark:bg-transparent font-medium">Low</div>;
    } else if (risk.impact * risk.likelihood >= 6 && risk.impact * risk.likelihood < 25) {
      return <div className="p-2 text-[black] text-center dark:text-[yellow] bg-[yellow] dark:bg-transparent font-medium">Medium</div>;
    } else {
      return <div className="p-2 text-[black] text-center dark:text-[green] bg-[green] dark:bg-transparent font-medium">High</div>;
    }
  };

  console.log(risk);
  
  const category = CATEGORY.filter(c => c.id === risk?.category)[0]
  
  const subCategory = category?.subCategory?.filter(c => c.id === risk?.subcategory)[0]

  const riskStatus = RISK_STATUS.filter(s => s.id === risk?.riskStatus)[0]

  if (loading || risk === null) {
    return <Skeleton className='w-screen h-screen' />
  } else return (
    <PageWrapper className="flex grow flex-col w-full h-full gap-4">
      <div className={cn('flex grow flex-col w-full h-full gap-4')}>
        <div className="w-full border-b py-2 gap-2 flex flex-col sm:flex-row">
          <div className={cn("flex flex-col sm:flex-row grow py-2 gap-3 items-start sm:items-center sm:justify-between justify-start w-full", {
            "items-end": langStore?.rtl
          })}>
            <div className={cn("flex flex-row items-center gap-3", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <ShieldQuestion className="inline-block w-5 h-5 mr-2" />
              <h1 className="text-xl font-semibold">
                {risk.riskName}
              </h1>
            </div>
            <div className={cn("flex flex-row items-center gap-3", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <h1>{risk.owner}</h1>
              {priorityHandler(risk)}
              <p className="text-[12px]">{risk.dateRaised.toUTCString()}</p>
            </div>
          </div>
        </div>
        <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <h2 className="text-[20px]">Description</h2>
          <p>{risk.description}</p>
        </div>
        <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <h2 className="text-[20px]">Consequences</h2>
          <p>{risk.consequences}</p>
        </div>
        <div className={cn("flex flex-col border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <h2 className="text-[20px]">Risk Levels</h2>
          <div className={cn("flex flex-row flex-wrap gap-5 mt-5", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <Badge>Impact: {risk.impact}</Badge>
            <Badge>Probability: {risk.likelihood}</Badge>
            <Badge>Priority: {risk.impact * risk.likelihood}</Badge>
          </div>
        </div>
        <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <h2 className="text-[20px]">Affected Asset</h2>
          <p>{risk.affectedAsset}</p>
        </div>
        <div className={cn("grid md:grid-cols-2 grid-cols-1 gap-3 border-[1px] p-2", {
          "items-end": langStore?.rtl
        })}>
          <div className={cn("flex flex-col gap-3 border-[1px] p-2", {
            "items-end": langStore?.rtl
          })}>
            <h2>Category</h2>
            <div className={cn("flex flex-row gap-2 p-2", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <p>{category.value}</p>
              {langStore.rtl ? <ChevronLeft /> : <ChevronRight />}
              <p>{subCategory?.value}</p>
            </div>
          </div>
          <div className={cn("flex flex-col h-full gap-3 border-[1px] p-2", {
            "items-end md:order-first": langStore?.rtl
          })}>
            <h2>Risk Status</h2>
            <p>{riskStatus.value}</p>
          </div>
        </div>
        <div className={cn("flex", {
          "justify-end": langStore?.rtl
        })}>
          <UpdateRiskForm risk={risk} />
        </div>
        <Footer className='mt-3 grow items-end' />
      </div>
    </PageWrapper>
  )
}