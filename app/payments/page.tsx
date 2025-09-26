"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Package, Wrench, Star, Search, Plus, Minus } from "lucide-react"

interface Product {
  id: string
  name: string
  category: "feed" | "fingerlings" | "equipment"
  price: number
  unit: string
  description: string
  supplier: string
  rating: number
  inStock: boolean
  image: string
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Premium Floating Pellets",
    category: "feed",
    price: 8500,
    unit: "25kg bag",
    description: "High-protein floating pellets for catfish and tilapia. 42% protein content.",
    supplier: "AquaFeed Nigeria",
    rating: 4.8,
    inStock: true,
    image: "/fish-feed-pellets.jpg",
  },
  {
    id: "2",
    name: "Catfish Fingerlings",
    category: "fingerlings",
    price: 25,
    unit: "per piece",
    description: "Healthy 6-8cm catfish fingerlings from certified hatchery.",
    supplier: "Lagos Hatchery",
    rating: 4.6,
    inStock: true,
    image: "/catfish-fingerlings.jpg",
  },
  {
    id: "3",
    name: "Automatic Fish Feeder",
    category: "equipment",
    price: 45000,
    unit: "unit",
    description: "Solar-powered automatic feeder with timer and portion control.",
    supplier: "AquaTech Solutions",
    rating: 4.5,
    inStock: true,
    image: "/automatic-fish-feeder.jpg",
  },
  {
    id: "4",
    name: "Tilapia Fingerlings",
    category: "fingerlings",
    price: 30,
    unit: "per piece",
    description: "Fast-growing tilapia fingerlings, 5-7cm size.",
    supplier: "Ogun Aquaculture",
    rating: 4.7,
    inStock: false,
    image: "/tilapia-fingerlings.jpg",
  },
  {
    id: "5",
    name: "Water Quality Test Kit",
    category: "equipment",
    price: 12000,
    unit: "kit",
    description: "Complete water testing kit for pH, ammonia, nitrite, and dissolved oxygen.",
    supplier: "AquaTest Pro",
    rating: 4.4,
    inStock: true,
    image: "/water-test-kit.jpg",
  },
  {
    id: "6",
    name: "Sinking Pellets",
    category: "feed",
    price: 7800,
    unit: "25kg bag",
    description: "Nutritious sinking pellets for bottom feeders. 38% protein content.",
    supplier: "FeedMaster Ltd",
    rating: 4.3,
    inStock: true,
    image: "/sinking-fish-pellets.jpg",
  },
]

interface CartItem extends Product {
  quantity: number
}

export default function PaymentsPage() {
  const { t } = useTranslation("common")
  const [products, setProducts] = useState<Product[]>(sampleProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState<"all" | "feed" | "fingerlings" | "equipment">("all")
  const [activeTab, setActiveTab] = useState("marketplace")

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  const addToCart = (product: Product) => {
    const existingItem = cart.find((item) => item.id === product.id)
    if (existingItem) {
      setCart(cart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  const updateQuantity = (id: string, change: number) => {
    setCart(
      cart
        .map((item) => {
          if (item.id === id) {
            const newQuantity = Math.max(0, item.quantity + change)
            return newQuantity === 0 ? null : { ...item, quantity: newQuantity }
          }
          return item
        })
        .filter(Boolean) as CartItem[],
    )
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "feed":
        return <Package className="h-4 w-4" />
      case "fingerlings":
        return <ShoppingCart className="h-4 w-4" />
      case "equipment":
        return <Wrench className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "feed":
        return "bg-green-100 text-green-800"
      case "fingerlings":
        return "bg-blue-100 text-blue-800"
      case "equipment":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Payments & E-Marketplace</h1>
          <p className="text-muted-foreground">Purchase feed, fingerlings, and equipment for your aquaculture farm</p>
        </div>
        <div className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          <span className="font-medium">{cart.length} items</span>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="cart">Shopping Cart ({cart.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="space-y-6">
          {/* Search and Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <Select value={categoryFilter} onValueChange={(value: any) => setCategoryFilter(value)}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="feed">Feed</SelectItem>
                    <SelectItem value="fingerlings">Fingerlings</SelectItem>
                    <SelectItem value="equipment">Equipment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">{product.supplier}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>

                  <Badge className={getCategoryColor(product.category)}>
                    {getCategoryIcon(product.category)}
                    <span className="ml-1">{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</span>
                  </Badge>

                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">₦{product.price.toLocaleString()}</span>
                      <span className="text-sm text-muted-foreground ml-1">/{product.unit}</span>
                    </div>
                    <Button onClick={() => addToCart(product)} disabled={!product.inStock} size="sm">
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="cart" className="space-y-6">
          {cart.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground mb-4">Add some products from the marketplace to get started</p>
                <Button onClick={() => setActiveTab("marketplace")}>Browse Marketplace</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Shopping Cart</CardTitle>
                    <CardDescription>{cart.length} items in your cart</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">{item.supplier}</p>
                          <p className="text-sm font-medium">
                            ₦{item.price.toLocaleString()} / {item.unit}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button size="sm" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>₦{getTotalPrice().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span>₦2,500</span>
                      </div>
                      <div className="border-t pt-2">
                        <div className="flex justify-between font-semibold text-lg">
                          <span>Total</span>
                          <span>₦{(getTotalPrice() + 2500).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full" size="lg">
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Payment Methods</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Bank Transfer</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Mobile Money</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Cash on Delivery</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
