"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
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

interface DeleteMealModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  food: Food
}

export default function DeleteMealModal({ isOpen, onClose, onSuccess, food }: DeleteMealModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const { deleteFood } = useFoodApi()

  const handleDelete = async () => {
    setIsDeleting(true)
    setError("")

    try {
      const result = await deleteFood(food._id)
      
      if (result) {
        onSuccess()
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Network error. Please try again.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-red-600">Delete Meal</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-gray-600 mb-4">
            Are you sure you want to delete "{food.food_name}"? This action cannot be undone.
          </p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex gap-3">
            <Button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
            <Button variant="outline" onClick={onClose} disabled={isDeleting} className="flex-1">
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
