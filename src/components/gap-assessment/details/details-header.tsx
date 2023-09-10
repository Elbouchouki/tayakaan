
"use client"
import { Control } from "@/types"
import { Icons } from "@/components/icons";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import useLangStore from "@/store/langagueStore";
import { useStore } from "@/hooks/use-store";

const DetailsHeader = ({ control }: {
  control: Control | undefined
}) => {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  const updatedAt = new Date((control?.updatedAt as Date | string | number) || "").toLocaleDateString()
  return (
    <div className="flex-col w-full">
      <Card className="rounded-md">
        <CardHeader >
          <div className={cn("w-full flex flex-row gap-4 flex-wrap", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <div className={cn("flex flex-row items-center gap-2 text-xs font-semibold", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <Icons.controls className="w-4 h-4" />
              <span>
                {control?.id}
              </span>
            </div>
            <div className={cn("flex flex-row items-center gap-2 text-xs font-semibold", {
              "flex-row-reverse": langStore?.rtl
            })}>
              <Icons.calendar className="w-4 h-4 " />
              <span className={cn("flex flex-row gap-1", {
                "flex-row-reverse": langStore?.rtl
              })}>
                <span>
                  {
                    dict?.lastUpdate || "Last Update"
                  }
                </span>
                <span>
                  {updatedAt}
                </span>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className={cn("w-full font-semibold text-justify", {
            "text-right": langStore?.rtl
          })}>
            {control?.question}
          </div>
        </CardContent>
        <CardFooter>
          <div className={cn("flex flex-row w-full pt-2 border-t", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <div className={cn("flex flex-col gap-3 md:flex-row ", {
              "md:flex-row-reverse": langStore?.rtl
            })}>
              <div className={cn("flex flex-col sm:flex-row gap-1.5 text-sm items-start sm:items-center", {
                "sm:flex-row-reverse items-end": langStore?.rtl
              })}>
                <span className="font-semibold">
                  {
                    dict?.maturityLevel || "Maturity Level"
                  }
                </span>
                <span className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    control?.maturity?.id !== "Unanswered" ?
                      <Badge className={control?.maturity?.color}>
                        {control?.maturity?.id}
                      </Badge>
                      : null
                  }
                  <span>{control?.maturity?.label}</span>
                </span>
              </div>
              <Separator className="hidden md:flex" orientation="vertical" />
              <div className={cn("flex flex-col sm:flex-row gap-1.5 text-sm items-start sm:items-center", {
                "sm:flex-row-reverse items-end": langStore?.rtl
              })}>
                <span className="font-semibold">
                  {
                    dict?.targetMaturityLevel || "Target Maturity Level"
                  }
                </span>
                <span className={cn("flex flex-row items-center gap-2", {
                  "flex-row-reverse": langStore?.rtl
                })}>
                  {
                    control?.targetMaturity?.id !== "Unanswered" ?
                      <Badge className={control?.targetMaturity?.color}>
                        {control?.targetMaturity?.id}
                      </Badge>
                      : null
                  }
                  <span>{control?.targetMaturity?.label}</span>
                </span>
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
export default DetailsHeader