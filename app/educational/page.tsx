"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen, Play, HelpCircle, Clock, User, Search, Star } from "lucide-react"

interface Guide {
  id: string
  title: string
  description: string
  category: "beginner" | "intermediate" | "advanced"
  duration: string
  author: string
  rating: number
  image: string
  content: string
}

interface Video {
  id: string
  title: string
  description: string
  category: "beginner" | "intermediate" | "advanced"
  duration: string
  views: number
  thumbnail: string
  url: string
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: "general" | "feeding" | "diseases" | "equipment"
}

const sampleGuides: Guide[] = [
  {
    id: "1",
    title: "Getting Started with Catfish Farming",
    description: "Complete beginner's guide to starting your catfish farming business",
    category: "beginner",
    duration: "15 min read",
    author: "Dr. Adebayo Ogundimu",
    rating: 4.8,
    image: "/catfish-farming-guide.jpg",
    content: "This comprehensive guide covers everything you need to know about starting catfish farming...",
  },
  {
    id: "2",
    title: "Water Quality Management",
    description: "Essential techniques for maintaining optimal water conditions",
    category: "intermediate",
    duration: "20 min read",
    author: "Prof. Funmi Adeyemi",
    rating: 4.9,
    image: "/water-quality-guide.jpg",
    content: "Water quality is crucial for successful aquaculture. Learn about pH, dissolved oxygen...",
  },
  {
    id: "3",
    title: "Advanced Fish Breeding Techniques",
    description: "Professional breeding methods for maximum productivity",
    category: "advanced",
    duration: "30 min read",
    author: "Dr. Emeka Nwosu",
    rating: 4.7,
    image: "/fish-breeding-guide.jpg",
    content: "Advanced breeding techniques including selective breeding, hormone induction...",
  },
]

const sampleVideos: Video[] = [
  {
    id: "1",
    title: "Pond Construction Basics",
    description: "Step-by-step guide to building your first fish pond",
    category: "beginner",
    duration: "12:45",
    views: 15420,
    thumbnail: "/pond-construction-video.jpg",
    url: "#",
  },
  {
    id: "2",
    title: "Fish Disease Prevention",
    description: "How to prevent common fish diseases in your farm",
    category: "intermediate",
    duration: "18:30",
    views: 8750,
    thumbnail: "/disease-prevention-video.jpg",
    url: "#",
  },
  {
    id: "3",
    title: "Automated Feeding Systems",
    description: "Setting up and managing automated feeding equipment",
    category: "advanced",
    duration: "25:15",
    views: 5230,
    thumbnail: "/automated-feeding-video.jpg",
    url: "#",
  },
]

const sampleFAQs: FAQ[] = [
  {
    id: "1",
    question: "How often should I feed my fish?",
    answer:
      "Fish should typically be fed 2-3 times daily, depending on their size and species. Fingerlings require more frequent feeding (3-4 times) while adult fish can be fed twice daily. Always observe your fish and adjust feeding frequency based on their appetite and water temperature.",
    category: "feeding",
  },
  {
    id: "2",
    question: "What is the ideal water temperature for catfish?",
    answer:
      "Catfish thrive in water temperatures between 26-30°C (79-86°F). Temperatures below 20°C can slow growth and make fish susceptible to diseases, while temperatures above 35°C can cause stress and reduce oxygen levels in the water.",
    category: "general",
  },
  {
    id: "3",
    question: "How do I know if my fish are sick?",
    answer:
      "Common signs of sick fish include: loss of appetite, unusual swimming behavior, visible spots or lesions, gasping at the surface, cloudy eyes, or abnormal coloration. If you notice these symptoms, isolate affected fish and consult with an aquaculture veterinarian.",
    category: "diseases",
  },
  {
    id: "4",
    question: "What equipment do I need to start fish farming?",
    answer:
      "Essential equipment includes: pond or tanks, water pumps, aeration systems, feeding equipment, water testing kits, nets, and basic tools. Start with the basics and gradually add more sophisticated equipment as your farm grows.",
    category: "equipment",
  },
]

export default function EducationalPage() {
  const { t } = useTranslation("common")
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<"all" | "beginner" | "intermediate" | "advanced">("all")
  const [faqCategory, setFaqCategory] = useState<"all" | "general" | "feeding" | "diseases" | "equipment">("all")

  const filteredGuides = sampleGuides.filter((guide) => {
    const matchesSearch = guide.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || guide.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const filteredVideos = sampleVideos.filter((video) => {
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || video.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const filteredFAQs = sampleFAQs.filter((faq) => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = faqCategory === "all" || faq.category === faqCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "beginner":
        return "bg-green-100 text-green-800"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800"
      case "advanced":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Educational Content</h1>
          <p className="text-muted-foreground">Learn aquaculture best practices through guides, videos, and FAQs</p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search educational content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={categoryFilter} onValueChange={(value: any) => setCategoryFilter(value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="guides" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="videos">Videos</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={guide.image || "/placeholder.svg"}
                      alt={guide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge className={getCategoryColor(guide.category)}>
                      {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{guide.rating}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">{guide.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{guide.description}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{guide.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{guide.author}</span>
                    </div>
                  </div>

                  <Button className="w-full">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Read Guide
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map((video) => (
              <Card key={video.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <div className="bg-white/90 rounded-full p-3">
                        <Play className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <Badge className={getCategoryColor(video.category)}>
                      {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{video.views.toLocaleString()} views</span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                  </div>

                  <Button className="w-full">
                    <Play className="h-4 w-4 mr-2" />
                    Watch Video
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Find answers to common aquaculture questions</CardDescription>
                </div>
                <Select value={faqCategory} onValueChange={(value: any) => setFaqCategory(value)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="feeding">Feeding</SelectItem>
                    <SelectItem value="diseases">Diseases</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="space-y-2">
                {filteredFAQs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center gap-3 text-left">
                        <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                        <span>{faq.question}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pl-8">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
