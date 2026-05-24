// components/ui/status-badge.tsx
import { cn } from "@/lib/utils"

const responseStyles: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-800",
  Disable: "bg-red-100 text-red-800",
  //   Pending: "bg-yellow-100 text-yellow-800",
  //   Draft:   "bg-gray-100 text-gray-800",
}

export function ResponseBadge({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        responseStyles[status] ?? "bg-gray-100 text-gray-800"
      )}
    >
      {status}
    </span>
  )
}
