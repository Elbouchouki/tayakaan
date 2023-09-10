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
import { DataTableToolbar } from "@/components/tenant-users/table/data-table-toolbar"
import { DataTableColumnHeader } from "@/components/data-table-column-header"
import { DataTableRowActions } from "@/components/tenant-users/table/data-table-row-actions"
import { User } from "@/types"
import { useStore } from "@/hooks/use-store"
import useUserStore from "@/store/userStore"
import { Badge } from "@/components/ui/badge"
import EditUserDialog from "@/components/tenant-users/edit-tenant-users-dialog"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import useLangStore from "@/store/langagueStore"
import { cn } from "@/lib/utils"

export function DataTable<TData, TValue>(
) {

  const userStore = useStore(useUserStore, state => state)
  const data = (userStore?.users ?? []) as TData[]
  const langStore = useStore(useLangStore, state => state)
  const dict = langStore?.getDictionary()

  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  const columns: ColumnDef<User>[] = [
    {
      id: "avatar",
      accessorKey: "avatar",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title="" />
      ),
      cell: ({ row }) =>
        <div className="flex justify-center items-center">
          <Avatar>
            <AvatarImage className="w-9 h-9" src={row.getValue("avatar")} alt={`${row.getValue("firstName")}'s avatar`} />
            <AvatarFallback>
              {`${(row.getValue("firstName") as string)[0]}${(row.getValue("lastName") as string)[0]}`}
            </AvatarFallback>
          </Avatar>
        </div>
      ,
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: "firstName",
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.firstName || "First Name"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("firstName")}
      </div>,
      filterFn: "includesString"
    },
    {
      id: "lastName",
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.lastName || "Last Name"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("lastName")}
      </div>,
      filterFn: "includesString"
    },

    {
      id: "email",
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.email || "Email"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {row.getValue("email")}
      </div>,
      filterFn: "includesString"
    },
    {
      id: "active",
      accessorKey: "active",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.active || "Active"
        } />
      ),
      cell: ({ row }) => <div className={cn("text-left whitespace-nowrap", {
        "text-right": langStore?.rtl
      })} >
        {
          row.getValue("active") ?
            dict?.enabled || "Enabled"
            : dict?.disabled || "Disabled"
        }
      </div>,
      filterFn: "includesString"
    },
    {
      id: "role",
      accessorKey: "role",
      header: ({ column }) => (
        <DataTableColumnHeader className={cn("text-left whitespace-nowrap", {
          "text-right": langStore?.rtl
        })} column={column} title={
          dict?.role || "Role"
        } />
      ),
      cell: ({ row }) => <div className={cn("lg:whitespace-normal whitespace-nowrap flex gap-1 flex-wrap justify-start", {
        "flex-row-reverse": langStore?.rtl
      })} >
        <Badge variant="outline" >
          {row.getValue("role")}
        </Badge>
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
    "avatar",
    "firstName",
    "lastName",
    "email",
    "active",
    "role",
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
                    dict?.noResultsFound || "No Results found"
                  }
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
      <EditUserDialog />
    </div>
  )
}