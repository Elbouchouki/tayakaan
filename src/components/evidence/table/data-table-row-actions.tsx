"use client"

import { DotsHorizontalIcon } from "@radix-ui/react-icons"
import { Row } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit2, Trash2Icon } from "lucide-react"
import { toast } from "sonner"
import { useStore } from "@/hooks/use-store"
import useEvidenceStore from "@/store/evidenceStore"
import { Evidence } from "@/types"
import { cn } from "@/lib/utils"
import useLangStore from "@/store/langagueStore"

interface DataTableRowActionsProps<TData> {
  row: Row<TData>
}

export function DataTableRowActions<TData>({
  row
}: DataTableRowActionsProps<TData>) {


  const evidenceStore = useStore(useEvidenceStore, state => state)
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="w-4 h-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={
        langStore?.rtl ? "start" : "end"
      }>
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl
          })}
          onClick={() => {
            evidenceStore?.setEditModalEvidence(row.original as Evidence)
            evidenceStore?.setEditModalOpen(true)
          }}>
          <span className={cn("flex flex-row items-center whitespace-nowrap gap-2", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <Edit2 className="w-4 h-4" />
            {
              dict?.edit || "Edit"
            }
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className={cn("flex flex-row items-center", {
            "flex-row-reverse": langStore?.rtl
          })}
          onClick={() => {
            evidenceStore?.removeEvidence(row.original as Evidence)
            toast.success("Evidence deleted successfully")
          }}>
          <span className={cn("flex flex-row items-center whitespace-nowrap gap-2", {
            "flex-row-reverse": langStore?.rtl
          })}>
            <Trash2Icon className="w-4 h-4" />
            <span>
              {
                dict?.delete || "Delete"
              }
            </span>
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}