"use client"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Fish, Wheat, Star, Search } from "lucide-react"

interface Contact {
  id: string
  name: string
  type: "farmer" | "buyer"
  specialization: string[]
  location: string
  distance: number
  rating: number
  phone: string
  email: string
  description: string
  verified: boolean
}

const sampleContacts: Contact[] = [
  {
    id: "1",
    name: "Adebayo Fish Farm",
    type: "farmer",
    specialization: ["Catfish", "Tilapia"],
    location: "Ibadan, Oyo State",
    distance: 2.5,
    rating: 4.8,
    phone: "+234 803 123 4567",
    email: "adebayo@fishfarm.com",
    description: "Premium fingerlings and adult fish supplier with 15 years experience",
    verified: true,
  },
  {
    id: "2",
    name: "Lagos Fresh Fish Market",
    type: "buyer",
    specialization: ["Catfish", "Tilapia", "Mackerel"],
    location: "Lagos Island, Lagos State",
    distance: 45.2,
    rating: 4.6,
    phone: "+234 901 234 5678",
    email: "orders@lagosfish.com",
    description: "Large-scale fish buyer for restaurants and markets across Lagos",
    verified: true,
  },
  {
    id: "3",
    name: "Ogun Aquaculture Hub",
    type: "farmer",
    specialization: ["Catfish", "Prawns"],
    location: "Abeokuta, Ogun State",
    distance: 12.8,
    rating: 4.5,
    phone: "+234 805 345 6789",
    email: "info@ogunaqua.ng",
    description: "Modern aquaculture facility with hatchery and processing plant",
    verified: false,
  },
  {
    id: "4",
    name: "Kano Fish Processors",
    type: "buyer",
    specialization: ["Catfish", "Tilapia"],
    location: "Kano, Kano State",
    distance: 650.0,
    rating: 4.3,
    phone: "+234 807 456 7890",
    email: "procurement@kanofish.com",
    description: "Northern Nigeria's largest fish processing and distribution company",
    verified: true,
  },
  {
    id: "5",
    name: "Rivers State Fisheries",
    type: "farmer",
    specialization: ["Tilapia", "Catfish", "Carp"],
    location: "Port Harcourt, Rivers State",
    distance: 320.5,
    rating: 4.7,
    phone: "+234 809 567 8901",
    email: "contact@riversfisheries.ng",
    description: "Government-backed fisheries with sustainable farming practices",
    verified: true,
  },
  {
    id: "6",
    name: "Abuja Premium Seafood",
    type: "buyer",
    specialization: ["Catfish", "Tilapia", "Prawns"],
    location: "Abuja, FCT",
    distance: 180.3,
    rating: 4.4,
    phone: "+234 811 678 9012",
    email: "supply@abujaSeafood.com",
    description: "High-end seafood supplier to hotels and restaurants in Abuja",
    verified: true,
  },
]

export default function NearbyFarmersPage() {
  const { t } = useTranslation("common")
  const [contacts, setContacts] = useState<Contact[]>(sampleContacts)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "farmer" | "buyer">("all")
  const [filterSpecialization, setFilterSpecialization] = useState("all")

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || contact.type === filterType
    const matchesSpecialization =
      filterSpecialization === "all" || contact.specialization.includes(filterSpecialization)

    return matchesSearch && matchesType && matchesSpecialization
  })

  const getTypeColor = (type: string) => {
    return type === "farmer" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Nearby Farmers & Buyers</h1>
          <p className="text-muted-foreground">Connect with local aquaculture farmers and fish buyers</p>
        </div>
      </div>

      {/* Map Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Location Map
          </CardTitle>
          <CardDescription>Interactive map showing nearby farmers and buyers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive map will be integrated here</p>
              <p className="text-sm text-muted-foreground">Showing {filteredContacts.length} contacts in your area</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="farmer">Farmers</SelectItem>
                <SelectItem value="buyer">Buyers</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by fish type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Fish Types</SelectItem>
                <SelectItem value="Catfish">Catfish</SelectItem>
                <SelectItem value="Tilapia">Tilapia</SelectItem>
                <SelectItem value="Prawns">Prawns</SelectItem>
                <SelectItem value="Carp">Carp</SelectItem>
                <SelectItem value="Mackerel">Mackerel</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <Card key={contact.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{contact.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getTypeColor(contact.type)}>
                      {contact.type === "farmer" ? (
                        <Fish className="h-3 w-3 mr-1" />
                      ) : (
                        <Wheat className="h-3 w-3 mr-1" />
                      )}
                      {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                    </Badge>
                    {contact.verified && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{contact.rating}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{contact.description}</p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{contact.location}</span>
                  <span className="text-muted-foreground">({contact.distance} km)</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {contact.specialization.map((spec) => (
                    <Badge key={spec} variant="secondary" className="text-xs">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <Phone className="h-4 w-4 mr-1" />
                  Call
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  <Mail className="h-4 w-4 mr-1" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContacts.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No contacts found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
