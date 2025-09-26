"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, Fish, MapPin, Phone, Search, TrendingUp, TrendingDown, RefreshCw } from "lucide-react"

interface MarketPrice {
  id: string
  fishType: string
  pricePerKg: number
  location: string
  contactBuyer: string
  phone: string
  lastUpdated: string
  trend: "up" | "down" | "stable"
  availability: "high" | "medium" | "low"
}

const sampleMarketData: MarketPrice[] = [
  {
    id: "1",
    fishType: "Catfish (Clarias)",
    pricePerKg: 1200,
    location: "Lagos Island",
    contactBuyer: "Adebayo Fish Market",
    phone: "+234 803 123 4567",
    lastUpdated: "2 hours ago",
    trend: "up",
    availability: "high",
  },
  {
    id: "2",
    fishType: "Tilapia",
    pricePerKg: 800,
    location: "Ibadan",
    contactBuyer: "Ogundimu Ventures",
    phone: "+234 805 987 6543",
    lastUpdated: "1 hour ago",
    trend: "stable",
    availability: "medium",
  },
  {
    id: "3",
    fishType: "Mackerel (Titus)",
    pricePerKg: 2500,
    location: "Port Harcourt",
    contactBuyer: "Rivers Fish Hub",
    phone: "+234 807 456 7890",
    lastUpdated: "30 minutes ago",
    trend: "down",
    availability: "low",
  },
  {
    id: "4",
    fishType: "Croaker Fish",
    pricePerKg: 1800,
    location: "Abuja",
    contactBuyer: "Capital Fish Market",
    phone: "+234 809 234 5678",
    lastUpdated: "45 minutes ago",
    trend: "up",
    availability: "high",
  },
  {
    id: "5",
    fishType: "Sardine",
    pricePerKg: 1500,
    location: "Kano",
    contactBuyer: "Northern Fish Co.",
    phone: "+234 802 345 6789",
    lastUpdated: "1.5 hours ago",
    trend: "stable",
    availability: "medium",
  },
  {
    id: "6",
    fishType: "Snapper",
    pricePerKg: 3200,
    location: "Lagos Mainland",
    contactBuyer: "Premium Seafood Ltd",
    phone: "+234 806 678 9012",
    lastUpdated: "20 minutes ago",
    trend: "up",
    availability: "low",
  },
]

export default function MarketPricesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [marketData, setMarketData] = useState<MarketPrice[]>(sampleMarketData)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const filteredData = marketData.filter(
    (item) =>
      item.fishType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.contactBuyer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate API call to refresh data
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate price fluctuations
    const updatedData = marketData.map((item) => ({
      ...item,
      pricePerKg: Math.round(item.pricePerKg * (0.95 + Math.random() * 0.1)),
      lastUpdated: "Just now",
      trend: Math.random() > 0.5 ? (Math.random() > 0.5 ? "up" : "down") : ("stable" as "up" | "down" | "stable"),
    }))

    setMarketData(updatedData)
    setIsRefreshing(false)
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-400" />
    }
  }

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case "high":
        return (
          <Badge variant="default" className="bg-green-500">
            High
          </Badge>
        )
      case "medium":
        return <Badge variant="secondary">Medium</Badge>
      case "low":
        return <Badge variant="destructive">Low</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DollarSign className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-semibold">Market Prices</h1>
              <Badge variant="outline" className="text-xs">
                Live Market Data
              </Badge>
            </div>
            <Button onClick={handleRefresh} disabled={isRefreshing} variant="outline" size="sm">
              {isRefreshing ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  Refreshing...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </div>
              )}
            </Button>
          </div>
          <p className="text-muted-foreground mt-2">Real-time fish market prices across Nigeria</p>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Fish className="h-5 w-5 text-primary" />
              Current Market Prices
            </CardTitle>
            <CardDescription>
              Live pricing data from major fish markets. Prices are updated regularly throughout the day.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search fish type, location, or buyer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fish Type</TableHead>
                    <TableHead>Price per Kg</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact Buyer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Availability</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.fishType}</TableCell>
                      <TableCell className="font-semibold">₦{item.pricePerKg.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {item.location}
                        </div>
                      </TableCell>
                      <TableCell>{item.contactBuyer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Phone className="h-3 w-3 text-muted-foreground" />
                          {item.phone}
                        </div>
                      </TableCell>
                      <TableCell>{getAvailabilityBadge(item.availability)}</TableCell>
                      <TableCell>{getTrendIcon(item.trend)}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{item.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredData.length === 0 && (
              <div className="text-center py-8">
                <Fish className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or refresh the data</p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Average Price</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ₦
                {Math.round(
                  marketData.reduce((sum, item) => sum + item.pricePerKg, 0) / marketData.length,
                ).toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Per kilogram</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Active Markets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{new Set(marketData.map((item) => item.location)).size}</div>
              <p className="text-xs text-muted-foreground mt-1">Locations tracked</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Fish Varieties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{marketData.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Types available</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-accent/50 border border-border/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <DollarSign className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">Firebase Integration Ready</h4>
              <p className="text-sm text-muted-foreground">
                This page is prepared for real-time market data integration with Firebase. Connect your Firebase
                database to display live pricing from actual fish markets and enable real-time updates.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
