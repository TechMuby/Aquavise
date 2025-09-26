import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Energy Monitoring - AquaVise",
  description: "Monitor and optimize energy consumption for your aquaculture operations",
}

export default function EnergyMonitoringLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
