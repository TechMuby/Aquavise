"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, LanguagesIcon, Globe } from "lucide-react"

const languages = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇺🇸",
    description: "Default language for AquaVise interface",
  },
  {
    code: "yo",
    name: "Yoruba",
    nativeName: "Yorùbá",
    flag: "🇳🇬",
    description: "Yoruba language support for Nigerian users",
  },
  {
    code: "ha",
    name: "Hausa",
    nativeName: "Hausa",
    flag: "🇳🇬",
    description: "Hausa language support for Northern Nigeria",
  },
  {
    code: "ig",
    name: "Igbo",
    nativeName: "Igbo",
    flag: "🇳🇬",
    description: "Igbo language support for Eastern Nigeria",
  },
]

export default function LanguagesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [isChanging, setIsChanging] = useState(false)

  const handleLanguageChange = async (languageCode: string) => {
    if (languageCode === selectedLanguage) return

    setIsChanging(true)

    // Simulate language change process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setSelectedLanguage(languageCode)
    setIsChanging(false)

    // In a real app, this would update the app's language context
    // and potentially save to localStorage or user preferences
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <LanguagesIcon className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold">Languages</h1>
            <Badge variant="outline" className="text-xs">
              Multi-language Support
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">Choose your preferred language for the AquaVise interface</p>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              Available Languages
            </CardTitle>
            <CardDescription>
              Select your preferred language. The interface will be updated to reflect your choice.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {languages.map((language) => {
                const isSelected = selectedLanguage === language.code
                const isCurrentlyChanging = isChanging && selectedLanguage !== language.code

                return (
                  <div
                    key={language.code}
                    className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${
                      isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{language.flag}</span>
                        <div>
                          <h3 className="font-semibold text-foreground">{language.nativeName}</h3>
                          <p className="text-sm text-muted-foreground">{language.name}</p>
                        </div>
                      </div>

                      {isSelected && (
                        <div className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-primary" />
                          <Badge variant="default" className="bg-primary">
                            Active
                          </Badge>
                        </div>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground mt-3">{language.description}</p>

                    {isCurrentlyChanging && language.code !== selectedLanguage && (
                      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <div className="flex items-center gap-2 text-sm">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                          Switching language...
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
            <CardTitle>Language Settings</CardTitle>
            <CardDescription>Additional language preferences and settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <h4 className="font-medium">Auto-detect Language</h4>
                <p className="text-sm text-muted-foreground">Automatically detect language based on browser settings</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <h4 className="font-medium">Regional Format</h4>
                <p className="text-sm text-muted-foreground">Date, time, and number formatting preferences</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg border border-border">
              <div>
                <h4 className="font-medium">Translation Quality</h4>
                <p className="text-sm text-muted-foreground">Help improve translations by providing feedback</p>
              </div>
              <Button variant="outline" size="sm">
                Contribute
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-accent/50 border border-border/50 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <LanguagesIcon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-medium mb-1">Coming Soon</h4>
              <p className="text-sm text-muted-foreground">
                We're working on adding more Nigerian languages and improving translation quality. Your feedback helps
                us prioritize which languages to add next.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
