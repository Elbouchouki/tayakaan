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
import { DataTableToolbar } from "@/components/gap-assessment/details/table/data-table-toolbar"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { Control, MaturityLevel } from "@/types"
import { useStore } from "@/hooks/use-store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import Link from "next/link"
import useLangStore from "@/store/langagueStore"
import { GET_MATURITY_LEVELS } from "@/mock"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"


export function DataTable<TData, TValue>(
  {
    controls
  }: {
    controls: Control[]
  }
) {
  const pathname = usePathname()

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const data = (controls) as TData[]

  const MATURITY_LEVELS = GET_MATURITY_LEVELS(langStore?.lang)

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns: ColumnDef<Control>[] = [
    {
      id: "id",
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="ml-2 lg:whitespace-normal whitespace-nowrap"
          column={column}
          title={
            dict?.controlCode || "Control Code"
          } />
      ),
      cell: ({ row }) => <div className={cn("lg:whitespace-normal whitespace-nowrap", {
        "text-right": langStore?.rtl === true
      })}>
        {row.getValue("id") !== undefined &&
          <Badge variant="outline" >
            {row.getValue("id")}
          </Badge>
        }
      </div>,
      filterFn: "arrIncludesSome",
      enableHiding: false,
    },
    {
      id: "framework",
      accessorKey: "framework",
      header: ({ column }) => (<></>),
      cell: ({ row }) => (<></>),
      enableHiding: false,
      enableSorting: false,
      filterFn: "arrIncludesSome"
    },
    {
      id: "maturityFilter",
      accessorKey: "maturityFilter",
      header: ({ column }) => (<></>),
      cell: ({ row }) => (<></>),
      enableHiding: false,
      enableSorting: false,
    },
    {
      id: "description",
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("lg:whitespace-normal whitespace-nowrap", {
          "text-right": langStore?.rtl === true
        })}
          column={column}
          title={
            dict?.description || "Description"
          }
        />
      ),
      cell: ({ row }) => <div className={cn("lg:whitespace-normal whitespace-nowrap", {
        "text-right": langStore?.rtl === true
      })}>
        {row.getValue("description")}
      </div>,
      filterFn: "includesString"
    }, {
      id: "maturity",
      accessorKey: "maturity",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("lg:whitespace-normal whitespace-nowrap", {
          "text-right": langStore?.rtl === true
        })}
          column={column}
          title={
            dict?.maturity || "Maturity"
          }
        />
      ),
      cell: ({ row }) => <div className={cn("flex flex-row items-start lg:whitespace-normal whitespace-nowrap gap-1", {
        "flex-row-reverse": langStore?.rtl
      })}>
        {(row.getValue("maturity") as MaturityLevel).id !== "Unanswered" ?
          <Badge variant="outline" className={cn("text-white", (row.getValue("maturity") as MaturityLevel).color)}>
            {(row.getValue("maturity") as MaturityLevel).id}
          </Badge> : null
        }
        < span className="whitespace-nowrap" >
          {
            MATURITY_LEVELS.filter((m) => m.id === (row.getValue("maturity") as MaturityLevel).id).map((m) => m.label)[0]
          }
        </span >
      </div >,
      filterFn: "arrIncludesSome"
    }, {
      id: "action",
      accessorKey: "action",
      header: ({ column }) => (<></>),
      cell: ({ row }) => (
        <Link href={`${pathname}/${(row.original as Control).id}`} >
          <Button variant='ghost' className={cn("flex flex-row items-center gap-2", {
            "flex-row-reverse": langStore?.rtl
          })}
          >
            <Icons.view className="w-4 h-4 " />
            <span>
              {
                dict?.view || "View"
              }
            </span>
          </Button>
        </Link>
      ),
      enableHiding: false,
    }
  ]

  const [globalFilter, setGlobalFilter] = React.useState<string>("")


  const columnOrder = [
    "id",
    "framework",
    "maturityFilter",
    "description",
    "maturity",
    "action"
  ]

  const table = useReactTable<any>({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 10
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
    </div>
  )
}