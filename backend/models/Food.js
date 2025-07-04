const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Food name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Food price is required'],
      min: [0, 'Price cannot be negative'],
    },
    image: {
      type: String,
      required: [true, 'Food image URL is required'],
    },
    rating: {
      type: Number,
      min: [0, 'Rating must be at least 0'],
      max: [5, 'Rating cannot be more than 5'],
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    restaurant: {
      name: {
        type: String,
        required: [true, 'Restaurant name is required'],
        trim: true,
      },
      logo: {
        type: String,
        required: [true, 'Restaurant logo URL is required'],
      },
      status: {
        type: String,
        enum: ['Open Now', 'Closed'],
        required: [true, 'Restaurant status is required'],
      },
    },
  },
  {
    timestamps: true,
  }
);

// Create a text index for search functionality
foodSchema.index({ name: 'text', description: 'text', 'restaurant.name': 'text' });

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
