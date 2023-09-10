"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DataTablePagination } from "@/components/data-table-pagination"
import { DataTableToolbar } from "./data-table-toolbar"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import EditAssessmentDialog from "@/components/risk-register/edit-risk-dialog"

import { useStore } from "@/hooks/use-store"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"
import { Risk, Tag } from "@/types"
import { DataTableRowActions } from "./data-table-row-actions"
import { riskStore } from "@/store/riskStore"
import { CATEGORY, RISK_STATUS } from "@/mock"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { useEffect, useState } from "react"

export function DataTable<TData, TValue>(
) {
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const riskStoreTools = useStore(riskStore, state => state);

  const [risks, setRisks] = useState<Risk[]>([])

  const categorySelecter = () => {
    const category = CATEGORY[Math.floor(Math.random() * CATEGORY.length)]
    return [category.id ?? "", category.subCategory?.[Math.floor(Math.random() * category.subCategory?.length)].id ?? ""]
  }

  useEffect(() => {
    setRisks(riskStoreTools?.risks.map((risk) => {
      [risk.category, risk.subcategory] = categorySelecter()
      return risk
    }) ?? [])
  }, [riskStoreTools?.risks])


  const data = risks as TData[];

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const riskScoreUiHandler = (row: any) => {
    const risk: Risk = row.original;
    if (risk.impact * risk.likelihood < 6) {
      return <TableCell className="text-[black] text-center dark:text-[red] bg-[red] dark:bg-transparent font-medium w-full">Low</TableCell>;
    } else if (risk.impact * risk.likelihood >= 6 && risk.impact * risk.likelihood < 25) {
      return <TableCell className="text-[black] text-center dark:text-[yellow] bg-[yellow] dark:bg-transparent font-medium w-full">Medium</TableCell>;
    } else return <TableCell className="text-[black] text-center dark:text-[green] bg-[green] dark:bg-transparent font-medium w-full">High</TableCell>;
  };

  const categoryHandler = (id: string) => {
    if (id.length == 0) return ""
    return CATEGORY.filter(c => c.id === id)[0].value;
  }

  const subcategoryHandler = (cid: string, subcid: string) => {
    if (cid.length == 0) return ""
    return CATEGORY.filter(c => c.id === cid)[0].subCategory?.filter(c => c.id === subcid)[0].value;
  }

  const riskStatusHandler = (id: string) => {
    return RISK_STATUS.filter(s => s.id === id)[0].value
  }

  const tagsHandler = (tags: Tag[]) => {
    if (!tags?.length) return ""
    return tags.map(tag => (<Badge key={tag.id}>{tag.name}</Badge>))
  }

  const columns: ColumnDef<Risk>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "riskName",
      accessorKey: "riskName",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Risk Name"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(row.getValue("riskName"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "description",
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Description"} />
      ),
      cell: ({ row }) => <div className={cn("text-left max-w-[250px] text-ellipsis overflow-hidden whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(row.getValue("description"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "owner",
      accessorKey: "owner",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Owner"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(row.getValue("owner"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "priority",
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Priority"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center items-center text-center whitespace-nowrap"} >
        {(riskScoreUiHandler(row))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "impact",
      accessorKey: "impact",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Impact"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center items-center text-center whitespace-nowrap"} >
        {(row.getValue("impact"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "likelihood",
      accessorKey: "likelihood",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Likelihood"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center items-center text-center whitespace-nowrap"} >
        {(row.getValue("likelihood"))}
      </div>,
      filterFn: "includesStringSensitive"

    },

    {
      id: "category",
      accessorKey: "category",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Category"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(categoryHandler(row.getValue("category")))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "subcategory",
      accessorKey: "subcategory",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Subcategory"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(subcategoryHandler(row.getValue("category"), row.getValue("subcategory")))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "riskStatus",
      accessorKey: "riskStatus",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Risk Status"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {(riskStatusHandler(row.getValue("riskStatus")))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "tags",
      accessorKey: "tags",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Tags"} />
      ),
      cell: ({ row }) => <div className={"flex justify-center gap-2 items-center text-center whitespace-nowrap"} >
        {tagsHandler(row.getValue("tags"))}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "dateRaised",
      accessorKey: "dateRaised",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Date Raised"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {((row.getValue("dateRaised") as Date).toUTCString())}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "updatedDate",
      accessorKey: "updatedDate",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Updated Date"} />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {((row.getValue("updatedDate") as Date).toUTCString())}
      </div>,
      filterFn: "includesStringSensitive"

    },
    {
      id: "actions",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={"Actions"} />
      ),
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ]

  const [globalFilter, setGlobalFilter] = React.useState<string>("")

  const columnOrder = [
    "select",
    "riskName",
    "description",
    "owner",
    "impact",
    "likelihood",
    "priority",
    "category",
    "subcategory",
    "riskStatus",
    "tags",
    "dateRaised",
    "updatedDate"
  ]
  const table = useReactTable<any>({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5
      }
    },
    state: {
      columnOrder: langStore?.rtl ? columnOrder.reverse() : columnOrder,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter
    },
    onGlobalFilterChange: setGlobalFilter,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const handleGlobalFilter = (s: string) => {
    setGlobalFilter(s)
  }

  return (
    <div className="px-4 py-3 space-y-4 dark:border bg-card">
      <DataTableToolbar globalFilter={globalFilter} setGlobalFilter={handleGlobalFilter} table={table} />
      <div className="border rounded-md ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody >
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {
                    dict?.noResultsFound || "No results found"
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <EditAssessmentDialog />
    </div>
  )
}