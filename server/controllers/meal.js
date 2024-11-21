const Meal = require("../models/Meal.js");
const User = require("../models/User.js");

const createMeal = async (req, res, next) => {
    const newMeal = new Meal(req.body);
    try {
        const saveMeal = await newMeal.save();

        try {
            const user = await User.findById(saveMeal.author);
            user.meals.push(saveMeal._id);
            await user.save();
        } catch (error) {
            next (error)
        }
        res.status(200).json(newMeal);
    } catch (error) {
        next (error);
    }
};

const updateMeal = async (req, res, next ) => {
    try {
        const meal = await Meal.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(meal);
    } catch (error) {
        next (error);
    }
};

const deleteMeal = async (req, res, next) => {
    try {
        await Meal.findByIdDelete(req.params.id);
        res.status(200).json("the meal has been deleted");
    } catch (error) {
        next (error);
    }
};

const getMeals = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const meals = await Meal.find({ author: userId });
        res.status(200).json(meals);
    } catch (error) {
        next (error);
    }
}

module.exports = {
    createMeal,
    updateMeal,
    getMeals,
    deleteMeal 
}