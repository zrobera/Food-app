### Development Path

This project integrates both Path A and Path B approaches:

- **Path A**: Focused on developing a robust backend API with Express.js and MongoDB, with proper structure, validation, and error handling.
- **Path B**: Added a modern frontend using Next.js with components for displaying, searching, and managing food items.

# FoodHaven - Food Delivery App

A full-stack food delivery application with a Node.js/Express backend API and Next.js frontend.

## Project Overview

FoodHaven is a food delivery application that allows users to browse, search, and order food items from various restaurants. The application consists of:

- **Backend API**: Built with Express.js and MongoDB
- **Frontend**: Built with Next.js, React, and Tailwind CSS

## Features

- Browse food items from various restaurants
- Search functionality for finding specific foods
- Add, edit, and delete food items
- Mobile-responsive design
- Restaurant information embedded with food items

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose ODM
- RESTful API architecture
- CORS for cross-origin resource sharing
- Environment-based configuration

### Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS
- Radix UI components
- Custom API hooks

## Project Structure

```
Food-app/
├── backend/              # Express.js backend API
│   ├── config/           # Configuration files
│   ├── controllers/      # API controllers
│   ├── middleware/       # Custom middleware
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   └── server.js         # Entry point
│
├── frontend/             # Next.js frontend application
│   ├── app/              # Next.js app router
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and API service
│   ├── public/           # Static assets
│   └── styles/           # Global styles
│
└── README.md             # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or pnpm

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd Food-app
   ```

2. Set up the backend
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/food-app
   NODE_ENV=development
   ```

4. Set up the frontend
   ```
   cd ../frontend
   npm install
   ```

5. Create a `.env.local` file in the frontend directory:
   ```
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. In a separate terminal, start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## API Endpoints

### Foods

- `GET /api/foods` - Get all food items (with optional search by name)
- `GET /api/foods/:id` - Get a specific food item
- `POST /api/foods` - Create a new food item
- `PUT /api/foods/:id` - Update a food item
- `DELETE /api/foods/:id` - Delete a food item

## Data Models

### Food

```javascript
{
  name: String,          // Name of the food item
  price: Number,         // Price of the food
  image: String,         // URL to the food image
  rating: Number,        // Rating (0-5)
  description: String,   // Description or ingredients
  restaurant: {
    name: String,        // Restaurant name
    logo: String,        // URL to restaurant logo
    status: String       // "Open Now" or "Closed"
  }
}
```
