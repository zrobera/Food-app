const Food = require('../models/Food');

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res, next) => {
  try {
    const { name } = req.query;
    let query = {};

    // Search by name if provided
    if (name) {
      query = { $text: { $search: name } };
    }

    const foods = await Food.find(query);
    
    res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single food
// @route   GET /api/foods/:id
// @access  Public
const getFood = async (req, res, next) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        error: 'Food not found',
      });
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new food
// @route   POST /api/foods
// @access  Public
const createFood = async (req, res, next) => {
  try {
    const food = await Food.create(req.body);

    res.status(201).json({
      success: true,
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update food
// @route   PUT /api/foods/:id
// @access  Public
const updateFood = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        success: false,
        error: 'Food not found',
      });
    }

    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete food
// @route   DELETE /api/foods/:id
// @access  Public
const deleteFood = async (req, res, next) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        success: false,
        error: 'Food not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFoods,
  getFood,
  createFood,
  updateFood,
  deleteFood,
};
