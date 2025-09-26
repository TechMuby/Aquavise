import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"

export default function PaymentsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarNav>{children}</SidebarNav>
}
