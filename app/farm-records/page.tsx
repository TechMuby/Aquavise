"use client"

import type React from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Fish, Wheat, AlertTriangle, Plus } from "lucide-react"

interface FarmRecord {
  id: string
  date: string
  type: "stock" | "feed" | "mortality" | "harvest"
  fishType: string
  quantity: number
  unit: string
  notes: string
  location: string
}

const sampleRecords: FarmRecord[] = [
  {
    id: "1",
    date: "2024-01-15",
    type: "stock",
    fishType: "Catfish",
    quantity: 500,
    unit: "fingerlings",
    notes: "New batch from Ogun State hatchery",
    location: "Pond A",
  },
  {
    id: "2",
    date: "2024-01-16",
    type: "feed",
    fishType: "Catfish",
    quantity: 25,
    unit: "kg",
    notes: "Premium floating pellets",
    location: "Pond A",
  },
  {
    id: "3",
    date: "2024-01-18",
    type: "mortality",
    fishType: "Catfish",
    quantity: 12,
    unit: "fish",
    notes: "Possible oxygen deficiency overnight",
    location: "Pond A",
  },
  {
    id: "4",
    date: "2024-01-20",
    type: "harvest",
    fishType: "Tilapia",
    quantity: 150,
    unit: "kg",
    notes: "Market ready size, sold to local buyers",
    location: "Pond B",
  },
]

export default function FarmRecordsPage() {
  const { t } = useTranslation("common")
  const [records, setRecords] = useState<FarmRecord[]>(sampleRecords)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: "",
    fishType: "",
    quantity: "",
    unit: "",
    notes: "",
    location: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newRecord: FarmRecord = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      type: formData.type as FarmRecord["type"],
      fishType: formData.fishType,
      quantity: Number(formData.quantity),
      unit: formData.unit,
      notes: formData.notes,
      location: formData.location,
    }
    setRecords([newRecord, ...records])
    setFormData({ type: "", fishType: "", quantity: "", unit: "", notes: "", location: "" })
    setShowForm(false)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "stock":
        return <Fish className="h-4 w-4" />
      case "feed":
        return <Wheat className="h-4 w-4" />
      case "mortality":
        return <AlertTriangle className="h-4 w-4" />
      case "harvest":
        return <CalendarDays className="h-4 w-4" />
      default:
        return <Fish className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      stock: "default",
      feed: "secondary",
      mortality: "destructive",
      harvest: "outline",
    } as const
    return variants[type as keyof typeof variants] || "default"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Farm Records & Logs</h1>
          <p className="text-muted-foreground">Track fish stock, feed usage, mortality, and harvest data</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Record
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New Farm Record</CardTitle>
            <CardDescription>Record fish stock, feed usage, mortality, or harvest data</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Record Type</Label>
                  <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select record type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="stock">Fish Stock</SelectItem>
                      <SelectItem value="feed">Feed Usage</SelectItem>
                      <SelectItem value="mortality">Mortality</SelectItem>
                      <SelectItem value="harvest">Harvest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fishType">Fish Type</Label>
                  <Input
                    id="fishType"
                    value={formData.fishType}
                    onChange={(e) => setFormData({ ...formData, fishType: e.target.value })}
                    placeholder="e.g., Catfish, Tilapia"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="Enter quantity"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit">Unit</Label>
                  <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">Kilograms (kg)</SelectItem>
                      <SelectItem value="fish">Fish Count</SelectItem>
                      <SelectItem value="fingerlings">Fingerlings</SelectItem>
                      <SelectItem value="bags">Bags</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g., Pond A, Tank 1"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes or observations..."
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit">Save Record</Button>
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Farm Records</CardTitle>
          <CardDescription>View and manage your farm activity logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Fish Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium">{new Date(record.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={getTypeBadge(record.type)} className="gap-1">
                        {getTypeIcon(record.type)}
                        {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{record.fishType}</TableCell>
                    <TableCell>
                      {record.quantity} {record.unit}
                    </TableCell>
                    <TableCell>{record.location}</TableCell>
                    <TableCell className="max-w-xs truncate" title={record.notes}>
                      {record.notes}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Fish className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Stock</p>
                <p className="text-2xl font-bold">488</p>
                <p className="text-xs text-muted-foreground">fingerlings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <Wheat className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Feed Used</p>
                <p className="text-2xl font-bold">25</p>
                <p className="text-xs text-muted-foreground">kg this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Mortality</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">fish this month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-accent" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Harvested</p>
                <p className="text-2xl font-bold">150</p>
                <p className="text-xs text-muted-foreground">kg this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
