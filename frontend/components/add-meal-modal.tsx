"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useFoodApi } from "@/hooks/use-food-api"

interface AddMealModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

export default function AddMealModal({ isOpen, onClose, onSuccess }: AddMealModalProps) {
  const [formData, setFormData] = useState({
    food_name: "",
    food_rating: "",
    food_image: "",
    food_ingredients: "",
    restaurant_name: "",
    restaurant_logo: "",
    restaurant_status: "Open Now" as "Open Now" | "Closed",
    price: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.food_name.trim()) {
      newErrors.food_name = "Food name is required"
    }

    if (
      !formData.food_rating ||
      isNaN(Number(formData.food_rating)) ||
      Number(formData.food_rating) < 0 ||
      Number(formData.food_rating) > 5
    ) {
      newErrors.food_rating = "Rating must be a number between 0 and 5"
    }

    if (!formData.restaurant_name.trim()) {
      newErrors.restaurant_name = "Restaurant name is required"
    }

    if (!formData.price || isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      newErrors.price = "Price must be a valid positive number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const { createFood } = useFoodApi()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Convert form data to match the backend API structure
      const foodData = {
        name: formData.food_name,
        price: Number(formData.price),
        image: formData.food_image,
        rating: Number(formData.food_rating),
        description: formData.food_ingredients,
        restaurant: {
          name: formData.restaurant_name,
          logo: formData.restaurant_logo,
          status: formData.restaurant_status
        }
      }

      const result = await createFood(foodData)
      
      if (result) {
        onSuccess()
        setFormData({
          food_name: "",
          food_rating: "",
          food_image: "",
          food_ingredients: "",
          restaurant_name: "",
          restaurant_logo: "",
          restaurant_status: "Open Now",
          price: "",
        })
        setErrors({})
      }
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : "Network error. Please try again." })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] my-8 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-orange-500">Add a meal</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 px-1">
          <div>
            <Label htmlFor="food_name">Food name</Label>
            <Input
              id="food_name"
              name="food_name"
              placeholder="Food name is required"
              value={formData.food_name}
              onChange={(e) => handleInputChange("food_name", e.target.value)}
              className={errors.food_name ? "border-red-500" : ""}
            />
            {errors.food_name && <p className="text-red-500 text-sm mt-1">{errors.food_name}</p>}
          </div>

          <div>
            <Label htmlFor="food_rating">Food rating</Label>
            <Input
              id="food_rating"
              name="food_rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="0-5"
              value={formData.food_rating}
              onChange={(e) => handleInputChange("food_rating", e.target.value)}
              className={errors.food_rating ? "border-red-500" : ""}
            />
            {errors.food_rating && <p className="text-red-500 text-sm mt-1">{errors.food_rating}</p>}
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className={errors.price ? "border-red-500" : ""}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>

          <div>
            <Label htmlFor="food_image">Food image</Label>
            <Input
              id="food_image"
              name="food_image"
              placeholder="https://res.cloudinary.com/dw6jcvkln/image/upload/..."
              value={formData.food_image}
              onChange={(e) => handleInputChange("food_image", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="food_ingredients">Food ingredients</Label>
            <Textarea
              id="food_ingredients"
              name="food_ingredients"
              placeholder="List the main ingredients"
              value={formData.food_ingredients}
              onChange={(e) => handleInputChange("food_ingredients", e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="restaurant_name">Restaurant name</Label>
            <Input
              id="restaurant_name"
              name="restaurant_name"
              placeholder="Restaurant name is required"
              value={formData.restaurant_name}
              onChange={(e) => handleInputChange("restaurant_name", e.target.value)}
              className={errors.restaurant_name ? "border-red-500" : ""}
            />
            {errors.restaurant_name && <p className="text-red-500 text-sm mt-1">{errors.restaurant_name}</p>}
          </div>

          <div>
            <Label htmlFor="restaurant_logo">Restaurant logo URL</Label>
            <Input
              id="restaurant_logo"
              name="restaurant_logo"
              placeholder="https://res.cloudinary.com/dw6jcvkln/image/upload/..."
              value={formData.restaurant_logo}
              onChange={(e) => handleInputChange("restaurant_logo", e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="restaurant_status">Restaurant status</Label>
            <Select
              value={formData.restaurant_status}
              onValueChange={(value: "Open Now" | "Closed") => handleInputChange("restaurant_status", value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open Now">Open Now</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <input type="hidden" name="restaurant_status" value={formData.restaurant_status} />
          </div>

          {errors.submit && <p className="text-red-500 text-sm">{errors.submit}</p>}

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            >
              {isSubmitting ? "Adding..." : "Add"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
