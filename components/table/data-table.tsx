"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsUpDown,
  ChevronUp,
  ChevronDown,
  Search,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ColumnDef<T> {
  key: keyof T
  label: string
  sortable?: boolean
  className?: string
  render?: (value: T[keyof T], row: T) => React.ReactNode // custom cell renderer
}

export interface DataTableProps<T> {
  data: T[]
  columns: ColumnDef<T>[]
  pageSize?: number
  searchable?: boolean
  searchPlaceholder?: string
  emptyMessage?: string
  className?: string
  actions?: (row: T) => React.ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = "Search...",
  emptyMessage = "No records found.",
  className,
  actions,
}: DataTableProps<T>) {
  const [query, setQuery] = React.useState("")
  const [sortKey, setSortKey] = React.useState<keyof T | null>(null)
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc")
  const [page, setPage] = React.useState(1)

  // ── Filter ─────────────────────────────────────────────────────────────────
  const filtered = React.useMemo(() => {
    if (!query.trim()) return data
    const q = query.toLowerCase()
    return data.filter((row) =>
      Object.values(row).some((v) =>
        String(v ?? "")
          .toLowerCase()
          .includes(q)
      )
    )
  }, [data, query])

  // ── Sort ───────────────────────────────────────────────────────────────────
  const sorted = React.useMemo(() => {
    if (!sortKey) return filtered
    return [...filtered].sort((a, b) => {
      const av = a[sortKey],
        bv = b[sortKey]
      const cmp =
        String(av ?? "") < String(bv ?? "")
          ? -1
          : String(av ?? "") > String(bv ?? "")
            ? 1
            : 0
      return sortDir === "asc" ? cmp : -cmp
    })
  }, [filtered, sortKey, sortDir])

  // ── Paginate ───────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const currentPage = Math.min(page, totalPages)
  const paginated = sorted.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  React.useEffect(() => setPage(1), [query, sortKey, sortDir])

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"))
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const SortIcon = ({ colKey }: { colKey: keyof T }) => {
    if (sortKey !== colKey)
      return <ChevronsUpDown className="h-3 w-3 opacity-40" />
    return sortDir === "asc" ? (
      <ChevronUp className="h-3 w-3" />
    ) : (
      <ChevronDown className="h-3 w-3" />
    )
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Toolbar */}
      {searchable && (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="relative w-full max-w-xs">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <span className="text-sm text-muted-foreground">
            {filtered.length} record{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((col) => (
                <TableHead
                  key={String(col.key)}
                  className={cn("text-xs whitespace-nowrap", col.className)}
                >
                  {col.sortable !== false ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="flex items-center gap-1 transition-colors hover:text-foreground"
                    >
                      {col.label}
                      <SortIcon colKey={col.key} />
                    </button>
                  ) : (
                    col.label
                  )}
                </TableHead>
              ))}
              {actions && (
                <TableHead className="w-30 text-center text-xs">
                  ACTIONS
                </TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-10 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={String(col.key)} className={col.className}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : String(row[col.key] ?? "")}
                    </TableCell>
                  ))}
                  {actions && <TableCell>{actions(row)}</TableCell>}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === currentPage ? "default" : "outline"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setPage(p)}
              >
                {p}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
