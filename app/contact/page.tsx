"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Phone, Mail, Globe, MapPin, Users, Heart, ExternalLink, MessageCircle } from "lucide-react"

const contactInfo = {
  website: "https://aquavise.vercel.app/",
  email: "aquavisecompany@gmail.com",
  phone: "+234 8077 060 272‬, ‪+234 9029 757 732‬",
  address: "Lagos, Nigeria",
}

const socialLinks = [
  {
    name: "Twitter",
    url: "https://twitter.com/aquavise",
    icon: "🐦",
    description: "Follow us for updates and aquaculture tips",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/mubarak-erinfolami-409a96256/",
    icon: "💼",
    description: "Connect with our professional network",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/aquavise",
    icon: "📘",
    description: "Join our community of fish farmers",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/aquavise?igsh=MWlieHZvYjR5czAybA== ",
    icon: "📸",
    description: "See our latest aquaculture innovations",
  },
  {
    name: "YouTube",
    url: "https://youtu.be/c5QH1XPR25E?si=lAmiPg1Cr42zlAbs",
    icon: "📺",
    description: "Watch tutorials and product demos",
  },
]

const teamMembers = [
  {
    name: "Mubarak Erinfolami",
    role: "Founder & CEO",
    expertise: "Embedded System and IoT Engineer",
    description: "20+ years in sustainable aquaculture systems",
  },
  {
    name: "Fazat Olubori",
    role: "Co-Founder and CFO",
    expertise: "Project Manager",
    description: "Expert in smart monitoring technologies",
  },
  {
    name: "Ajibade Ifeoluwa",
    role: "Co-Founder and CTO",
    expertise: "Ai and Software Developer",
    description: "Commercial aquaculture specialist",
  },
]

export default function ContactPage() {
  const handleLinkClick = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <Phone className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-semibold">Contact</h1>
            <Badge variant="outline" className="text-xs">
              Get in Touch
            </Badge>
          </div>
          <p className="text-muted-foreground mt-2">Connect with the AquaVise team and community</p>
        </div>
      </header>

      <main className="px-6 py-6 space-y-6">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Get in Touch
              </CardTitle>
              <CardDescription>Reach out to us for support, partnerships, or inquiries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                <Globe className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Website</p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sm text-muted-foreground hover:text-primary"
                    onClick={() => handleLinkClick(contactInfo.website)}
                  >
                    {contactInfo.website}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Phone</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-muted-foreground">{contactInfo.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Social Media
              </CardTitle>
              <CardDescription>Follow us on social media for updates and community engagement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {socialLinks.map((social) => (
                <div
                  key={social.name}
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors cursor-pointer"
                  onClick={() => handleLinkClick(social.url)}
                >
                  <span className="text-xl flex-shrink-0">{social.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{social.name}</p>
                      <ExternalLink className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">{social.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* About Us Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              About AquaVise
            </CardTitle>
            <CardDescription>Our mission and the team behind smart aquaculture monitoring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="prose prose-sm max-w-none text-muted-foreground">
              <p className="text-base leading-relaxed">
                AquaVise is revolutionizing aquaculture through intelligent monitoring systems that combine IoT sensors,
                AI analytics, and real-time data processing. Our mission is to empower fish farmers across Nigeria and
                beyond with the tools they need to optimize their operations, reduce losses, and increase profitability.
              </p>

              <p className="text-base leading-relaxed">
                Founded in 2024, we've been working closely with local fish farmers to understand their challenges and
                develop solutions that are both technologically advanced and practically applicable. Our systems monitor
                water quality parameters, predict potential issues, and provide actionable insights to help farmers make
                informed decisions.
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-semibold mb-4">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-accent/30 border border-border/50">
                  <h4 className="font-medium mb-2">Innovation</h4>
                  <p className="text-sm text-muted-foreground">
                    Continuously advancing aquaculture technology for better outcomes
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/30 border border-border/50">
                  <h4 className="font-medium mb-2">Sustainability</h4>
                  <p className="text-sm text-muted-foreground">
                    Promoting environmentally responsible farming practices
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-accent/30 border border-border/50">
                  <h4 className="font-medium mb-2">Community</h4>
                  <p className="text-sm text-muted-foreground">
                    Supporting local farmers and building stronger food systems
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Section */}
        <Card>
          <CardHeader>
            <CardTitle>Meet Our Team</CardTitle>
            <CardDescription>The experts behind AquaVise's innovative solutions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                  <p className="text-primary font-medium text-sm mb-1">{member.role}</p>
                  <p className="text-muted-foreground text-sm mb-2">{member.expertise}</p>
                  <p className="text-xs text-muted-foreground">{member.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Section */}
        <div className="bg-accent/50 border border-border/50 rounded-lg p-6">
          <div className="text-center">
            <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Need Support?</h3>
            <p className="text-muted-foreground mb-4 max-w-2xl mx-auto">
              Our support team is here to help you get the most out of your AquaVise system. Whether you need technical
              assistance, have questions about features, or want to provide feedback, we're just a message away.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button onClick={() => handleLinkClick("mailto:aquavisecompany@gmail.com")}>
                <Mail className="h-4 w-4 mr-2" />
                Email Support
              </Button>
              <Button variant="outline" onClick={() => handleLinkClick("tel:+2348077060272")}>
                <Phone className="h-4 w-4 mr-2" />
                Call Us
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
