"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Languages,
  DollarSign,
  Palette,
  Phone,
  Menu,
  LogOut,
  FileText,
  MapPin,
  ShoppingCart,
  BookOpen,
  Zap,
} from "lucide-react"
import Image from "next/image"

const navigation = [
  {
    name: "navigation.dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "navigation.languages",
    href: "/languages",
    icon: Languages,
  },
  {
    name: "navigation.marketPrices",
    href: "/market-prices",
    icon: DollarSign,
  },
  {
    name: "navigation.colour",
    href: "/theme",
    icon: Palette,
  },
  {
    name: "navigation.contact",
    href: "/contact",
    icon: Phone,
  },
  {
    name: "navigation.farmRecords",
    href: "/farm-records",
    icon: FileText,
  },
  {
    name: "navigation.nearbyFarmers",
    href: "/nearby-farmers",
    icon: MapPin,
  },
  {
    name: "navigation.payments",
    href: "/payments",
    icon: ShoppingCart,
  },
  {
    name: "navigation.educational",
    href: "/educational",
    icon: BookOpen,
  },
  {
    name: "navigation.energyMonitoring",
    href: "/energy-monitoring",
    icon: Zap,
  },
]

interface SidebarNavProps {
  children: React.ReactNode
}

export function SidebarNav({ children }: SidebarNavProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { t } = useTranslation("common")

  const handleLogout = () => {
    window.location.href = "/"
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image src="/images/aquavise-logo.jpeg" alt="AquaVise" width={60} height={20} className="object-contain" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{t(item.name)}</span>
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-3">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          {t("navigation.logout")}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-border lg:bg-card">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-card border border-border"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
