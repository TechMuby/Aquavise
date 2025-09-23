"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Fish, Mail, Lock } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isDemoLoading, setIsDemoLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication process
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes, accept any email/password combination
    if (email && password) {
      window.location.href = "/dashboard"
    } else {
      setIsLoading(false)
      // In a real app, you'd show validation errors here
    }
  }

  const handleDemoLogin = async () => {
    setIsDemoLoading(true)
    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1000))
    window.location.href = "/dashboard"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/images/aquavise-logo.jpeg"
              alt="AquaVise Logo"
              width={100}
              height={60}
              className="object-contain"
              priority
            />
          </div>
          <p className="text-muted-foreground text-balance">Smart aquaculture monitoring with AI-powered insights</p>
        </div>

        <Card className="backdrop-blur-sm bg-card/80 border-border/50 shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-2xl font-semibold">Welcome Back</CardTitle>
            <CardDescription className="text-muted-foreground">
              Access your aquaculture monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full h-12 text-base font-medium" size="lg">
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Signing In...
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or try demo</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/50 border border-border/50">
                <Fish className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Demo Environment</p>
                  <p className="text-xs text-muted-foreground">Explore with simulated sensor data</p>
                </div>
              </div>

              <Button
                onClick={handleDemoLogin}
                disabled={isDemoLoading}
                variant="outline"
                className="w-full h-12 text-base font-medium bg-transparent"
                size="lg"
              >
                {isDemoLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-foreground border-t-transparent" />
                    Connecting...
                  </div>
                ) : (
                  "Demo Account"
                )}
              </Button>
            </div>

            <div className="text-center text-xs text-muted-foreground">
              This demo showcases AquaVise monitoring capabilities with simulated data
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <p>Monitoring water quality • Optimizing aquaculture • Powered by AI</p>
        </div>
      </div>
    </div>
  )
}
