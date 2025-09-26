"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Zap,
  TrendingUp,
  TrendingDown,
  Battery,
  Sun,
  Wind,
  Droplets,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
} from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface EnergyDevice {
  id: string
  name: string
  type: "pump" | "aerator" | "heater" | "lighting" | "feeder"
  status: "active" | "idle" | "maintenance"
  powerConsumption: number
  efficiency: number
  location: string
}

interface EnergyData {
  time: string
  consumption: number
  cost: number
  renewable: number
}

interface Alert {
  id: string
  type: "high_consumption" | "device_failure" | "efficiency_drop" | "maintenance_due"
  message: string
  severity: "low" | "medium" | "high"
  timestamp: string
  device?: string
}

const sampleDevices: EnergyDevice[] = [
  {
    id: "1",
    name: "Main Water Pump",
    type: "pump",
    status: "active",
    powerConsumption: 2.5,
    efficiency: 87,
    location: "Pond A",
  },
  {
    id: "2",
    name: "Aerator System 1",
    type: "aerator",
    status: "active",
    powerConsumption: 1.8,
    efficiency: 92,
    location: "Pond B",
  },
  {
    id: "3",
    name: "Water Heater",
    type: "heater",
    status: "idle",
    powerConsumption: 0.0,
    efficiency: 78,
    location: "Nursery Tank",
  },
  {
    id: "4",
    name: "LED Lighting",
    type: "lighting",
    status: "active",
    powerConsumption: 0.5,
    efficiency: 95,
    location: "Indoor Facility",
  },
  {
    id: "5",
    name: "Automatic Feeder",
    type: "feeder",
    status: "active",
    powerConsumption: 0.3,
    efficiency: 88,
    location: "Pond C",
  },
]

const energyData: EnergyData[] = [
  { time: "00:00", consumption: 3.2, cost: 0.48, renewable: 0.0 },
  { time: "04:00", consumption: 2.8, cost: 0.42, renewable: 0.0 },
  { time: "08:00", consumption: 4.5, cost: 0.68, renewable: 1.2 },
  { time: "12:00", consumption: 5.8, cost: 0.87, renewable: 2.8 },
  { time: "16:00", consumption: 6.2, cost: 0.93, renewable: 3.1 },
  { time: "20:00", consumption: 4.9, cost: 0.74, renewable: 1.5 },
]

const monthlyData = [
  { month: "Jan", consumption: 1250, cost: 187.5, renewable: 320 },
  { month: "Feb", consumption: 1180, cost: 177.0, renewable: 380 },
  { month: "Mar", consumption: 1320, cost: 198.0, renewable: 450 },
  { month: "Apr", consumption: 1280, cost: 192.0, renewable: 520 },
  { month: "May", consumption: 1450, cost: 217.5, renewable: 680 },
  { month: "Jun", consumption: 1520, cost: 228.0, renewable: 750 },
]

const deviceTypeData = [
  { name: "Pumps", value: 45, color: "#3b82f6" },
  { name: "Aerators", value: 30, color: "#10b981" },
  { name: "Heaters", value: 15, color: "#f59e0b" },
  { name: "Lighting", value: 7, color: "#8b5cf6" },
  { name: "Feeders", value: 3, color: "#ef4444" },
]

const sampleAlerts: Alert[] = [
  {
    id: "1",
    type: "high_consumption",
    message: "Main Water Pump consuming 15% above normal levels",
    severity: "medium",
    timestamp: "2 hours ago",
    device: "Main Water Pump",
  },
  {
    id: "2",
    type: "maintenance_due",
    message: "Aerator System 1 scheduled for maintenance in 3 days",
    severity: "low",
    timestamp: "1 day ago",
    device: "Aerator System 1",
  },
  {
    id: "3",
    type: "efficiency_drop",
    message: "Water Heater efficiency dropped to 78%",
    severity: "medium",
    timestamp: "3 hours ago",
    device: "Water Heater",
  },
]

export default function EnergyMonitoringPage() {
  const { t } = useTranslation("common")
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h")
  const [selectedDevice, setSelectedDevice] = useState<string>("all")

  const totalConsumption = sampleDevices.reduce((sum, device) => sum + device.powerConsumption, 0)
  const averageEfficiency = sampleDevices.reduce((sum, device) => sum + device.efficiency, 0) / sampleDevices.length
  const activeDevices = sampleDevices.filter((device) => device.status === "active").length
  const currentCost = totalConsumption * 0.15 // $0.15 per kWh

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "idle":
        return "bg-yellow-100 text-yellow-800"
      case "maintenance":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "pump":
        return <Droplets className="h-5 w-5" />
      case "aerator":
        return <Wind className="h-5 w-5" />
      case "heater":
        return <Thermometer className="h-5 w-5" />
      case "lighting":
        return <Sun className="h-5 w-5" />
      case "feeder":
        return <Battery className="h-5 w-5" />
      default:
        return <Zap className="h-5 w-5" />
    }
  }

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "medium":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Energy Monitoring</h1>
          <p className="text-muted-foreground">
            Monitor and optimize energy consumption across your aquaculture operations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Consumption</p>
                <p className="text-2xl font-bold">{totalConsumption.toFixed(1)} kW</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingDown className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">-8% from yesterday</span>
                </div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Cost</p>
                <p className="text-2xl font-bold">${currentCost.toFixed(2)}/hr</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-red-500" />
                  <span className="text-sm text-red-600">+3% from yesterday</span>
                </div>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Devices</p>
                <p className="text-2xl font-bold">
                  {activeDevices}/{sampleDevices.length}
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">All systems operational</span>
                </div>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Battery className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Efficiency</p>
                <p className="text-2xl font-bold">{averageEfficiency.toFixed(1)}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-600">+2% from last week</span>
                </div>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Energy Consumption (24h)</CardTitle>
                <CardDescription>Real-time energy usage and renewable generation</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={energyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="consumption"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#3b82f6"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="renewable"
                      stackId="2"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Consumption by Device Type</CardTitle>
                <CardDescription>Energy distribution across different equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={deviceTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {deviceTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {deviceTypeData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-sm">
                        {item.name}: {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trends</CardTitle>
              <CardDescription>Energy consumption, costs, and renewable generation over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="consumption" fill="#3b82f6" name="Consumption (kWh)" />
                  <Bar dataKey="renewable" fill="#10b981" name="Renewable (kWh)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Device Status</CardTitle>
                  <CardDescription>Monitor individual device performance and energy consumption</CardDescription>
                </div>
                <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter devices" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Devices</SelectItem>
                    <SelectItem value="pump">Pumps</SelectItem>
                    <SelectItem value="aerator">Aerators</SelectItem>
                    <SelectItem value="heater">Heaters</SelectItem>
                    <SelectItem value="lighting">Lighting</SelectItem>
                    <SelectItem value="feeder">Feeders</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleDevices
                  .filter((device) => selectedDevice === "all" || device.type === selectedDevice)
                  .map((device) => (
                    <div key={device.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 p-2 rounded-lg">{getDeviceIcon(device.type)}</div>
                        <div>
                          <h3 className="font-semibold">{device.name}</h3>
                          <p className="text-sm text-muted-foreground">{device.location}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Power</p>
                          <p className="font-semibold">{device.powerConsumption} kW</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Efficiency</p>
                          <div className="flex items-center gap-2">
                            <Progress value={device.efficiency} className="w-16" />
                            <span className="text-sm font-medium">{device.efficiency}%</span>
                          </div>
                        </div>
                        <Badge className={getStatusColor(device.status)}>
                          {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Cost Analysis</CardTitle>
                <CardDescription>Energy costs and savings over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} name="Cost ($)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Renewable Energy</CardTitle>
                <CardDescription>Solar and renewable energy contribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Solar Generation Today</span>
                    <span className="text-lg font-bold">12.5 kWh</span>
                  </div>
                  <Progress value={65} className="h-2" />
                  <p className="text-sm text-muted-foreground">65% of daily consumption covered by renewable sources</p>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <Sun className="h-8 w-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Solar Panels</p>
                      <p className="text-lg font-bold text-green-600">8.2 kW</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <Wind className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Wind Turbine</p>
                      <p className="text-lg font-bold text-blue-600">4.3 kW</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Efficiency Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions to optimize energy consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Optimize Pump Schedule</h4>
                    <p className="text-sm text-blue-700">Running pumps during off-peak hours could save $45/month</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-green-900">Upgrade Aerator System</h4>
                    <p className="text-sm text-green-700">
                      New high-efficiency aerators could reduce consumption by 20%
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-900">Heater Maintenance</h4>
                    <p className="text-sm text-yellow-700">
                      Water heater efficiency has dropped - schedule maintenance
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Energy Alerts</CardTitle>
              <CardDescription>Recent alerts and notifications about energy consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sampleAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start gap-3 p-4 border rounded-lg">
                    {getAlertIcon(alert.severity)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{alert.message}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{alert.timestamp}</span>
                        </div>
                      </div>
                      {alert.device && <p className="text-sm text-muted-foreground mt-1">Device: {alert.device}</p>}
                    </div>
                    <Button variant="outline" size="sm">
                      Resolve
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
