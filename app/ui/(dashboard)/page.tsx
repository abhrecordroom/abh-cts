import React from "react"
import Overview from "@/app/ui/(dashboard)/(admin)/dash_overview/page"
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"

export default function page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="h-full w-full">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <h1 className="text-2xl font-semibold">Correspondence Tracker</h1>
            </div>
          </header>

          {/* Dynamic Content */}
          <div className="p-5">
            <Overview />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
