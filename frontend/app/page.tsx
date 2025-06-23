"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MapPin, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AddMealModal from "@/components/add-meal-modal"
import EditMealModal from "@/components/edit-meal-modal"
import DeleteMealModal from "@/components/delete-meal-modal"
import Footer from "@/components/footer"
import { useFoodApi } from "@/hooks/use-food-api"

interface Food {
  _id: string
  food_name: string
  food_rating: number
  food_image: string
  food_ingredients: string
  restaurant_name: string
  restaurant_logo: string
  restaurant_status: "Open Now" | "Closed"
  price: number
}

export default function HomePage() {
  const [foods, setFoods] = useState<Food[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedFood, setSelectedFood] = useState<Food | null>(null)
  const [loading, setLoading] = useState(true)

  const { getAllFoods, loading: apiLoading } = useFoodApi()

  // Fetch foods from your Express.js backend
  const fetchFoods = async () => {
    try {
      const result = await getAllFoods()
      if (result && result.data) {
        // Map backend data structure to frontend Food interface
        const mappedFoods = result.data.map((food: any) => ({
          _id: food._id,
          food_name: food.name,
          food_rating: food.rating,
          food_image: food.image,
          food_ingredients: food.description,
          restaurant_name: food.restaurant?.name || '',
          restaurant_logo: food.restaurant?.logo || '',
          restaurant_status: food.restaurant?.status || 'Open Now',
          price: food.price
        }))
        setFoods(mappedFoods)
      } else {
        setFoods([])
      }
    } catch (error) {
      console.error("Failed to fetch foods:", error)
      setFoods([])
    } finally {
      setLoading(false)
    }
  }

  // Search foods by name
  const searchFoods = async () => {
    setLoading(true)
    try {
      const result = await getAllFoods(searchTerm)
      if (result && result.data) {
        // Map backend data structure to frontend Food interface
        const mappedFoods = result.data.map((food: any) => ({
          _id: food._id,
          food_name: food.name,
          food_rating: food.rating,
          food_image: food.image,
          food_ingredients: food.description,
          restaurant_name: food.restaurant?.name || '',
          restaurant_logo: food.restaurant?.logo || '',
          restaurant_status: food.restaurant?.status || 'Open Now',
          price: food.price
        }))
        setFoods(mappedFoods)
      } else {
        setFoods([])
      }
    } catch (error) {
      console.error("Failed to search foods:", error)
      setFoods([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFoods()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      searchFoods()
    } else {
      fetchFoods()
    }
  }

  const handleAddFood = () => {
    setIsAddModalOpen(true)
  }

  const handleEditFood = (food: Food) => {
    setSelectedFood(food)
    setIsEditModalOpen(true)
  }

  const handleDeleteFood = (food: Food) => {
    setSelectedFood(food)
    setIsDeleteModalOpen(true)
  }

  const onFoodAdded = () => {
    fetchFoods()
    setIsAddModalOpen(false)
  }

  const onFoodUpdated = () => {
    fetchFoods()
    setIsEditModalOpen(false)
    setSelectedFood(null)
  }

  const onFoodDeleted = () => {
    fetchFoods()
    setIsDeleteModalOpen(false)
    setSelectedFood(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🍽️</span>
          </div>
          <span className="font-bold text-xl text-gray-800">FoodHaven</span>
        </div>
        <Button onClick={handleAddFood} className="bg-orange-500 hover:bg-orange-600 text-white px-6">
          Add Food
        </Button>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
          <div className="text-white">
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">Are you starving?</h1>
            <p className="text-lg mb-8 opacity-90">Within a few clicks, find meals that are accessible near you</p>

            {/* Search Form */}
            <div className="bg-white rounded-lg p-4 shadow-lg">
              <Tabs defaultValue="delivery" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="delivery" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Delivery
                  </TabsTrigger>
                  <TabsTrigger value="pickup" className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Pickup
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="delivery">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      placeholder="What do you like to eat today?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                      id="search-bar"
                    />
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                      Find Food
                    </Button>
                  </form>
                </TabsContent>
                <TabsContent value="pickup">
                  <form onSubmit={handleSearch} className="flex gap-2">
                    <Input
                      placeholder="What do you like to eat today?"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                      id="search-bar"
                    />
                    <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                      Find Food
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="w-80 h-80 mx-auto">
              <img
                src="/placeholder.svg?height=320&width=320"
                alt="Delicious food bowl"
                className="w-full h-full object-cover rounded-full shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Featured Meals</h2>
            <Button onClick={handleAddFood} className="bg-orange-500 hover:bg-orange-600 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Food
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading meals...</p>
            </div>
          ) : foods.length === 0 ? (
            <div className="text-center py-8">
              <div className="empty-state-message text-gray-500">
                No items available. Add some delicious meals to get started!
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {foods.map((food) => (
                <Card key={food._id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="relative">
                    <img
                      src={food.food_image || "/placeholder.svg?height=200&width=300"}
                      alt={food.food_name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-orange-500 text-white">${food.price || "12.99"}</Badge>
                    </div>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleEditFood(food)
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleDeleteFood(food)
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <img
                        src={food.restaurant_logo || "/placeholder.svg?height=24&width=24"}
                        alt={food.restaurant_name}
                        className="w-6 h-6 rounded"
                      />
                      <span className="restaurant-name text-sm font-medium text-gray-600">{food.restaurant_name}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{food.food_name}</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <span className="restaurant-rating text-orange-500">★</span>
                        <span className="text-sm font-medium">{food.food_rating}</span>
                      </div>
                      <Badge
                        variant={food.restaurant_status === "Open Now" ? "default" : "secondary"}
                        className={`restaurant-status ${
                          food.restaurant_status === "Open Now"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {food.restaurant_status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">{food.food_ingredients}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Button variant="outline" className="px-8">
              View More
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Modals */}
      <AddMealModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onSuccess={onFoodAdded} />

      {selectedFood && (
        <EditMealModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedFood(null)
          }}
          onSuccess={onFoodUpdated}
          food={selectedFood}
        />
      )}

      {selectedFood && (
        <DeleteMealModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedFood(null)
          }}
          onSuccess={onFoodDeleted}
          food={selectedFood}
        />
      )}
    </div>
  )
}
