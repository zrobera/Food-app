// API base URL - adjust this based on your environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Food API endpoints
export const FoodAPI = {
  // Get all foods with optional search
  getAllFoods: async (searchQuery?: string): Promise<any> => {
    const url = searchQuery 
      ? `${API_BASE_URL}/foods?name=${encodeURIComponent(searchQuery)}` 
      : `${API_BASE_URL}/foods`;
      
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch foods');
    }
    return response.json();
  },

  // Get a single food by ID
  getFood: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch food');
    }
    return response.json();
  },

  // Create a new food
  createFood: async (foodData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/foods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });
    if (!response.ok) {
      throw new Error('Failed to create food');
    }
    return response.json();
  },

  // Update a food
  updateFood: async (id: string, foodData: any): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
    });
    if (!response.ok) {
      throw new Error('Failed to update food');
    }
    return response.json();
  },

  // Delete a food
  deleteFood: async (id: string): Promise<any> => {
    const response = await fetch(`${API_BASE_URL}/foods/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete food');
    }
    return response.json();
  },
};
