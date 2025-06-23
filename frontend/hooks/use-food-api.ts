import { useState } from 'react';
import { FoodAPI } from '../lib/api';

export function useFoodApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all foods with optional search
  const getAllFoods = async (searchQuery?: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await FoodAPI.getAllFoods(searchQuery);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
      throw err;
    }
  };

  // Get a single food by ID
  const getFood = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await FoodAPI.getFood(id);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
      throw err;
    }
  };

  // Create a new food
  const createFood = async (foodData: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await FoodAPI.createFood(foodData);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
      throw err;
    }
  };

  // Update a food
  const updateFood = async (id: string, foodData: any) => {
    setLoading(true);
    setError(null);
    try {
      const result = await FoodAPI.updateFood(id, foodData);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
      throw err;
    }
  };

  // Delete a food
  const deleteFood = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await FoodAPI.deleteFood(id);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      setLoading(false);
      throw err;
    }
  };

  return {
    loading,
    error,
    getAllFoods,
    getFood,
    createFood,
    updateFood,
    deleteFood,
  };
}
