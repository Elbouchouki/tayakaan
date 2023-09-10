"use client"

import { Skeleton } from "@/components/ui/skeleton";
import { useStore } from "@/hooks/use-store";
import useFramworkStore from "@/store/framworkStore";
import { Framework } from "@/types";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Footer from "@/components/layout/footer"
import BackButton from "@/components/back-button";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { AlertTriangleIcon } from "lucide-react";
import NoArabicAlert from "@/components/no-arabic-alert";
import PageWrapper from "@/components/page-wrapper";

export default function FrameworksDetails() {

  const params = useParams()
  const router = useRouter()
  const frameworkStore = useStore(useFramworkStore, state => state)

  const [loading, setLoading] = useState(true)
  const [framework, setFramework] = useState<Framework | null>(null)

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  useEffect(() => {
    const frameworkFound = frameworkStore?.frameworks.find(framework => framework.id === params.id)
    setFramework(frameworkFound || null)
    if (frameworkStore) {
      setLoading(false)
    }
    if (!loading && !frameworkFound) {
      router.push(`/frameworks`)
    }
  }, [loading, frameworkStore, params.id, router])


  if (loading || framework === null) {
    return <Skeleton className='w-screen h-screen' />
  } else {
    return (
      <PageWrapper className='flex flex-col w-full h-full gap-4 px-2 ' >
        <div className={cn("flex flex-row w-full gap-4 py-2 border-b ", {
          "flex-row-reverse": langStore?.rtl
        })}>
          <BackButton />
          <h1 className={cn("font-semibold text-xm sm:text-lg md:text-xl grow flex flex-row items-center gap-2", {
            "text-right flex-row-reverse": langStore?.rtl
          })}>
            <span>
              {
                dict?.framework || "Framewrok"
              }
            </span>
            <span>{" - "}</span>
            <span>
              {framework.name}
            </span>
          </h1>
        </div>
        {
          langStore?.lang === "ar" ? <NoArabicAlert /> : null
        }
        <div className='flex flex-col w-full h-full gap-4 mt-5'>
          <h2 className="font-semibold text-md ">About {framework.name}</h2>
          <p className="text-sm text-justify text-muted-foreground indent-8 ">
            {framework.description}
          </p>
          <h2 className="font-semibold text-md ">Additional Informations</h2>
          <p className="flex flex-col gap-4 text-sm text-justify text-muted-foreground" dangerouslySetInnerHTML={{ __html: framework.additional_information }} >
          </p>
          <Footer className='flex items-end mt-3 grow' />
        </div>
      </PageWrapper>
    )
  }

}