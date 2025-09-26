"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Palette, Check, Monitor, Sun, Moon } from "lucide-react"

interface Theme {
  id: string
  name: string
  description: string
  preview: {
    background: string
    card: string
    text: string
    accent: string
  }
  cssClass: string
}

const themes: Theme[] = [
  {
    id: "light",
    name: "Light Theme",
    description: "Clean and bright interface perfect for daytime use",
    preview: {
      background: "#fefefe",
      card: "#ffffff",
      text: "#0f172a",
      accent: "#0ea5e9",
    },
    cssClass: "light",
  },
  {
    id: "blue",
    name: "Ocean Blue",
    description: "Calming blue tones inspired by aquatic environments",
    preview: {
      background: "#0f172a",
      card: "#1e293b",
      text: "#e2e8f0",
      accent: "#3b82f6",
    },
    cssClass: "blue-theme",
  },
  {
    id: "green",
    name: "Aqua Green",
    description: "Fresh green palette reflecting natural water systems",
    preview: {
      background: "#0c1910",
      card: "#1a2e1a",
      text: "#dcfce7",
      accent: "#10b981",
    },
    cssClass: "green-theme",
  },
]

export default function ThemePage() {
  const [selectedTheme, setSelectedTheme] = useState("light")
  const [isApplying, setIsApplying] = useState(false)

  useEffect(() => {
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem("aquavise-theme") || "light"
    setSelectedTheme(savedTheme)
    applyThemeToDocument(savedTheme)
  }, [])

  const applyThemeToDocument = (themeId: string) => {
    const html = document.documentElement

    // Remove existing theme classes
    html.classList.remove("light", "blue-theme", "green-theme")

    // Apply new theme
    const theme = themes.find((t) => t.id === themeId)
    if (theme) {
      if (themeId === "light") {
        html.classList.remove("dark")
      } else {
        html.classList.add("dark")
      }

      if (theme.cssClass !== "light") {
        html.classList.add(theme.cssClass)
      }
    }
  }

  const handleThemeChange = async (themeId: string) => {
    if (themeId === selectedTheme) return

    setIsApplying(true)

    // Simulate theme application process
    await new Promise((resolve) => setTimeout(resolve, 800))

    setSelectedTheme(themeId)
    applyThemeToDocument(themeId)

    // Save to localStorage
    localStorage.setItem("aquavise-theme", themeId)

    setIsApplying(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Palette className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold">Colour Themes</h1>
            <Badge variant="outline" className="text-xs">
              Customization
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">Personalize your AquaVise experience with different color themes</p>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Available Themes
            </CardTitle>
            <CardDescription>Choose a color theme that suits your preference and working environment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {themes.map((theme) => {
                const isSelected = selectedTheme === theme.id
                const isCurrentlyApplying = isApplying && selectedTheme !== theme.id

                return (
                  <div
                    key={theme.id}
                    className={`relative rounded-lg border-2 transition-all cursor-pointer hover:shadow-lg ${
                      isSelected ? "border-primary shadow-md" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleThemeChange(theme.id)}
                  >
                    {/* Theme Preview */}
                    <div
                      className="h-32 rounded-t-lg relative overflow-hidden"
                      style={{ backgroundColor: theme.preview.background }}
                    >
                      <div
                        className="absolute top-3 left-3 right-3 h-6 rounded"
                        style={{ backgroundColor: theme.preview.card }}
                      />
                      <div
                        className="absolute top-12 left-3 right-12 h-4 rounded"
                        style={{ backgroundColor: theme.preview.accent, opacity: 0.8 }}
                      />
                      <div
                        className="absolute top-20 left-3 right-8 h-3 rounded"
                        style={{ backgroundColor: theme.preview.text, opacity: 0.6 }}
                      />
                      <div
                        className="absolute top-25 left-3 right-16 h-3 rounded"
                        style={{ backgroundColor: theme.preview.text, opacity: 0.4 }}
                      />

                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-primary rounded-full p-1">
                          <Check className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Theme Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-foreground">{theme.name}</h3>
                        {isSelected && (
                          <Badge variant="default" className="bg-primary">
                            Active
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground">{theme.description}</p>

                      {/* Color Palette */}
                      <div className="flex gap-2 mt-3">
                        <div
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: theme.preview.background }}
                          title="Background"
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: theme.preview.card }}
                          title="Card"
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: theme.preview.accent }}
                          title="Accent"
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-border"
                          style={{ backgroundColor: theme.preview.text }}
                          title="Text"
                        />
                      </div>
                    </div>

                    {isCurrentlyApplying && theme.id !== selectedTheme && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          Applying theme...
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>Additional customization options for your theme experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Sun className="h-5 w-5 text-orange-500" />
                <div>
                  <h4 className="font-medium">Auto Light Mode</h4>
                  <p className="text-sm text-muted-foreground">Automatically switch to light theme during daytime</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Moon className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium">Auto Dark Mode</h4>
                  <p className="text-sm text-muted-foreground">Automatically switch to dark theme during nighttime</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div className="flex items-center gap-3">
                <Palette className="h-5 w-5 text-purple-500" />
                <div>
                  <h4 className="font-medium">Custom Theme</h4>
                  <p className="text-sm text-muted-foreground">Create your own custom color theme</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Coming Soon
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-accent/50 border border-border/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Palette className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">Theme Persistence</h4>
              <p className="text-sm text-muted-foreground">
                Your selected theme is automatically saved and will be remembered across sessions. The theme applies to
                all pages in your AquaVise dashboard for a consistent experience.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
