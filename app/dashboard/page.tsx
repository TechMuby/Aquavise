"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import {
  Thermometer,
  Droplets,
  Eye,
  Power,
  PowerOff,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Fish,
  Brain,
  BarChart3,
} from "lucide-react"
import Image from "next/image"

interface SensorData {
  temperature: number
  ph: number
  turbidity: number
  timestamp: Date
}

let currentTemp = 28.5 // Start with optimal values
let currentPh = 7.2
let currentTurbidity = 25

const generateDailyTrendData = () => {
  const data = []
  const now = new Date()

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
    data.push({
      time: time.getHours() + ":00",
      temperature: Math.round((Math.random() * (30 - 27) + 27) * 10) / 10,
      ph: Math.round((Math.random() * (7.8 - 6.8) + 6.8) * 10) / 10,
      turbidity: Math.round(Math.random() * (40 - 15) + 15),
    })
  }
  return data
}

const generateWeeklyTrendData = () => {
  const data = []
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  days.forEach((day) => {
    data.push({
      time: day,
      temperature: Math.round((Math.random() * (30 - 27) + 27) * 10) / 10,
      ph: Math.round((Math.random() * (7.8 - 6.8) + 6.8) * 10) / 10,
      turbidity: Math.round(Math.random() * (40 - 15) + 15),
    })
  })
  return data
}

const generateSensorData = (): SensorData => {
  // Temperature: gradual change of ±0.3°C
  currentTemp += (Math.random() - 0.5) * 0.6
  currentTemp = Math.max(26, Math.min(31, currentTemp)) // Keep within reasonable bounds

  // pH: gradual change of ±0.1
  currentPh += (Math.random() - 0.5) * 0.2
  currentPh = Math.max(6.8, Math.min(8.2, currentPh)) // Keep within reasonable bounds

  // Turbidity: gradual change of ±3 NTU
  currentTurbidity += (Math.random() - 0.5) * 6
  currentTurbidity = Math.max(15, Math.min(45, currentTurbidity)) // Keep within reasonable bounds

  return {
    temperature: Math.round(currentTemp * 10) / 10,
    ph: Math.round(currentPh * 10) / 10,
    turbidity: Math.round(currentTurbidity),
    timestamp: new Date(),
  }
}

const getStatusColor = (value: number, min: number, max: number) => {
  if (value < min || value > max) return "destructive"
  if (value < min + (max - min) * 0.2 || value > max - (max - min) * 0.2) return "secondary"
  return "default"
}

const getAIInsights = (data: SensorData) => {
  const insights = []

  if (data.temperature > 30) {
    insights.push("Temperature is elevated - consider increasing water circulation")
  } else if (data.temperature < 26) {
    insights.push("Temperature is low - monitor fish behavior closely")
  }

  if (data.ph < 7.0) {
    insights.push("pH is slightly acidic - check alkalinity levels")
  } else if (data.ph > 8.0) {
    insights.push("pH is elevated - consider water treatment")
  }

  if (data.turbidity > 45) {
    insights.push("High turbidity detected - filtration system check recommended")
  }

  if (insights.length === 0) {
    insights.push("All parameters within optimal ranges - system performing well")
  }

  return insights
}

const isOutOfRange = (data: SensorData) => {
  const alerts = []

  if (data.temperature > 32) {
    alerts.push({ type: "temperature", message: "Temperature too high (>32°C)", value: data.temperature })
  }
  if (data.temperature < 25) {
    alerts.push({ type: "temperature", message: "Temperature too low (<25°C)", value: data.temperature })
  }

  if (data.ph < 6.5) {
    alerts.push({ type: "ph", message: "pH too low (<6.5)", value: data.ph })
  }
  if (data.ph > 8.5) {
    alerts.push({ type: "ph", message: "pH too high (>8.5)", value: data.ph })
  }

  if (data.turbidity > 60) {
    alerts.push({ type: "turbidity", message: "Turbidity too high (>60 NTU)", value: data.turbidity })
  }
  if (data.turbidity < 10) {
    alerts.push({ type: "turbidity", message: "Turbidity too low (<10 NTU)", value: data.turbidity })
  }

  return alerts
}

export default function Dashboard() {
  const [sensorData, setSensorData] = useState<SensorData>(generateSensorData())
  const [aeratorOn, setAeratorOn] = useState(true)
  const [wastewaterPumpOn, setWastewaterPumpOn] = useState(false)
  const [freshwaterPumpOn, setFreshwaterPumpOn] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [dailyTrendData] = useState(generateDailyTrendData())
  const [weeklyTrendData] = useState(generateWeeklyTrendData())

  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(generateSensorData())
      setLastUpdate(new Date())
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const insights = getAIInsights(sensorData)
  const alerts = isOutOfRange(sensorData)

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/aquavise-logo.jpeg"
                  alt="AquaVise"
                  width={60}
                  height={20}
                  className="object-contain"
                />
              </div>
              <Separator orientation="vertical" className="h-6" />
              <Badge variant="outline" className="text-xs">
                <div className="h-2 w-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                Live Demo
              </Badge>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              Last update: {lastUpdate.toLocaleTimeString()}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((alert, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-red-700 dark:text-red-400">Water Quality Alert</p>
                  <p className="text-sm text-red-600 dark:text-red-300">
                    {alert.message} - Current: {alert.value}
                    {alert.type === "temperature" ? "°C" : alert.type === "ph" ? "" : " NTU"}
                  </p>
                </div>
                <Badge variant="destructive" className="bg-red-500 text-white">
                  Critical
                </Badge>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  Temperature
                  {(sensorData.temperature > 32 || sensorData.temperature < 25) && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </CardTitle>
                <Badge variant={getStatusColor(sensorData.temperature, 25, 32)}>
                  {getStatusColor(sensorData.temperature, 25, 32) === "default" ? "Optimal" : "Monitor"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{sensorData.temperature}°C</div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  pH Level
                  {(sensorData.ph < 6.5 || sensorData.ph > 8.5) && <AlertTriangle className="h-4 w-4 text-red-500" />}
                </CardTitle>
                <Badge variant={getStatusColor(sensorData.ph, 6.5, 8.5)}>
                  {getStatusColor(sensorData.ph, 6.5, 8.5) === "default" ? "Optimal" : "Monitor"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{sensorData.ph}</div>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4 text-teal-500" />
                  Turbidity
                  {(sensorData.turbidity > 60 || sensorData.turbidity < 10) && (
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  )}
                </CardTitle>
                <Badge variant={getStatusColor(sensorData.turbidity, 10, 60)}>
                  {getStatusColor(sensorData.turbidity, 10, 60) === "default" ? "Clear" : "Monitor"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{sensorData.turbidity} NTU</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="relative overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Fish className="h-5 w-5 text-primary" />
                  Equipment Control
                </CardTitle>
                <CardDescription>Manage your aquaculture systems</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  {aeratorOn ? (
                    <Power className="h-5 w-5 text-green-500" />
                  ) : (
                    <PowerOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">Aerator System</p>
                    <p className="text-sm text-muted-foreground">{aeratorOn ? "Running" : "Stopped"}</p>
                  </div>
                </div>
                <Button
                  variant={aeratorOn ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setAeratorOn(!aeratorOn)}
                >
                  {aeratorOn ? "Turn Off" : "Turn On"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  {wastewaterPumpOn ? (
                    <Power className="h-5 w-5 text-green-500" />
                  ) : (
                    <PowerOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">Wastewater Pump</p>
                    <p className="text-sm text-muted-foreground">{wastewaterPumpOn ? "Running" : "Stopped"}</p>
                  </div>
                </div>
                <Button
                  variant={wastewaterPumpOn ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setWastewaterPumpOn(!wastewaterPumpOn)}
                >
                  {wastewaterPumpOn ? "Turn Off" : "Turn On"}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  {freshwaterPumpOn ? (
                    <Power className="h-5 w-5 text-green-500" />
                  ) : (
                    <PowerOff className="h-5 w-5 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium">Freshwater Pump</p>
                    <p className="text-sm text-muted-foreground">{freshwaterPumpOn ? "Running" : "Stopped"}</p>
                  </div>
                </div>
                <Button
                  variant={freshwaterPumpOn ? "destructive" : "default"}
                  size="sm"
                  onClick={() => setFreshwaterPumpOn(!freshwaterPumpOn)}
                >
                  {freshwaterPumpOn ? "Turn Off" : "Turn On"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Assistant
              </CardTitle>
              <CardDescription>Intelligent insights and recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Suggestions */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-500" />
                  Current Suggestions
                </h4>
                <div className="space-y-2">
                  {aeratorOn ? (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Aeration system is active - maintaining optimal oxygen levels</p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                      <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">Consider activating aeration to maintain oxygen levels</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Insights */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Eye className="h-4 w-4 text-teal-500" />
                  Real-time Insights
                </h4>
                <div className="space-y-2">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 p-3 rounded-lg bg-accent/50 border border-border/50"
                    >
                      <div className="h-2 w-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm">{insight}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Forecast */}
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-purple-500" />
                  24-Hour Forecast
                </h4>
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-sm text-muted-foreground">
                    Based on current trends: Temperature expected to remain stable, pH levels may fluctuate slightly due
                    to feeding schedule. Recommend monitoring turbidity after next feeding cycle.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Daily/Weekly Trends Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Daily/Weekly Trends
            </CardTitle>
            <CardDescription>Historical sensor data trends and patterns</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="daily">Daily (24h)</TabsTrigger>
                <TabsTrigger value="weekly">Weekly (7d)</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="space-y-4">
                <ChartContainer
                  config={{
                    temperature: {
                      label: "Temperature (°C)",
                      color: "#f97316",
                    },
                    ph: {
                      label: "pH Level",
                      color: "#3b82f6",
                    },
                    turbidity: {
                      label: "Turbidity (NTU)",
                      color: "#14b8a6",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={dailyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={false}
                        name="Temperature (°C)"
                      />
                      <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={3} dot={false} name="pH Level" />
                      <Line
                        type="monotone"
                        dataKey="turbidity"
                        stroke="#14b8a6"
                        strokeWidth={3}
                        dot={false}
                        name="Turbidity (NTU)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>

              <TabsContent value="weekly" className="space-y-4">
                <ChartContainer
                  config={{
                    temperature: {
                      label: "Temperature (°C)",
                      color: "#f97316",
                    },
                    ph: {
                      label: "pH Level",
                      color: "#3b82f6",
                    },
                    turbidity: {
                      label: "Turbidity (NTU)",
                      color: "#14b8a6",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                      <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="temperature"
                        stroke="#f97316"
                        strokeWidth={3}
                        dot={false}
                        name="Temperature (°C)"
                      />
                      <Line type="monotone" dataKey="ph" stroke="#3b82f6" strokeWidth={3} dot={false} name="pH Level" />
                      <Line
                        type="monotone"
                        dataKey="turbidity"
                        stroke="#14b8a6"
                        strokeWidth={3}
                        dot={false}
                        name="Turbidity (NTU)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
