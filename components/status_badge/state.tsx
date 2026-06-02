// components/ui/status-badge.tsx
import { cn } from "@/lib/utils"

const state: Record<string, string> = {
  //   Active: "bg-emerald-100 text-emerald-800",
  //   Disable: "bg-red-100 text-red-800",
  //   Pending: "bg-yellow-100 text-yellow-800",
  //   Draft:   "bg-gray-100 text-gray-800",

  Completed: "bg-emerald-400 text-emerald-950",
  OnProgress: "bg-yellow-400 text-yellow-950",
}

export function State({ status }: { status: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        state[status] ?? "bg-gray-100 text-gray-800"
      )}
    >
      {status}
    </span>
  )
}
