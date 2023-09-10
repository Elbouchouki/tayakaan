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
import { DataTableToolbar } from "@/components/tenant/table/data-table-toolbar"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { DataTableRowActions } from "@/components/tenant/table/data-table-row-actions"
import { Tenant } from "@/types"
import { useStore } from "@/hooks/use-store"
import useTenantStore from "@/store/tenantStore"
import { Badge } from "@/components/ui/badge"
import EditTenantDialog from "../edit-tenant-dialog"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"


export function DataTable<TData, TValue>(
) {

  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const tenantStore = useStore(useTenantStore, state => state)
  const data = (tenantStore?.tenants ?? []) as TData[]

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns: ColumnDef<Tenant>[] = [
    {
      id: "reference",
      accessorKey: "reference",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.reference || "Reference"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("reference") !== undefined &&
          <Badge variant="outline" >
            {row.getValue("reference")}
          </Badge>
        }
      </div>,
      filterFn: "includesString"
    },
    {
      id: "name",
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.name || "Name"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("name")}
      </div>,
      filterFn: "includesString"
    },
    {
      id: "contact_email",
      accessorKey: "contact_email",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.contactEmail || "Contact Email"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("contact_email")}
      </div>,
      filterFn: "includesString"
    },
    {
      id: "actions",
      cell: ({ row }) => <DataTableRowActions row={row} />,
    },
  ]

  const [globalFilter, setGlobalFilter] = React.useState<string>("")


  const columnOrder = [
    "reference",
    "name",
    "contact_email",
    "actions"
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
      <EditTenantDialog />
    </div>
  )
}