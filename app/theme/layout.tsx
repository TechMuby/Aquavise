import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <SidebarNav>{children}</SidebarNav>
}
