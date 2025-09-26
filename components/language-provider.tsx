"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import "../lib/i18n"

interface LanguageContextType {
  currentLanguage: string
  changeLanguage: (lang: string) => void
  languages: { code: string; name: string; nativeName: string }[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const languages = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "yo", name: "Yoruba", nativeName: "Yorùbá" },
  { code: "ha", name: "Hausa", nativeName: "Hausa" },
  { code: "ig", name: "Igbo", nativeName: "Igbo" },
]

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation()
  const [currentLanguage, setCurrentLanguage] = useState("en")

  useEffect(() => {
    // Load saved language from localStorage
    const savedLanguage = localStorage.getItem("aquavise-language")
    if (savedLanguage && languages.find((lang) => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage)
      i18n.changeLanguage(savedLanguage)
    }
  }, [i18n])

  const changeLanguage = (lang: string) => {
    setCurrentLanguage(lang)
    i18n.changeLanguage(lang)
    localStorage.setItem("aquavise-language", lang)
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage, languages }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
