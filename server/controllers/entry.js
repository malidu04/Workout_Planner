const Entry = require("../models/Entry.js");
const User = require("../models/User.js");
const Routine = require("../models/Routine.js");
const Meal = require("../models/Meal.js");

const createEntry = async (req, res, next) => {
    const newEntry = new Entry(req.body);
    try {
        const savedEntry = await newEntry.save();
        const user = await User.findById(savedEntry.author);
        user.entries.push(savedEntry._id);
        await user.save();
        res.status(200).json(savedEntry);
    } catch (error) {
        next(error);
    }
}

const updateEntry = async (req, res, next) => {
    try {
        const entry = await Entry.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        res.status(200).json(entry);
    } catch (error) {
        next(error);
    }
}

const deleteEntry = async (req, res, next) => {
    try {
        const entry = await Entry.findByIdAndDelete(req.params.id);
        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }
        // Remove the entry from user's entries list
        await User.findByIdAndUpdate(
            entry.author,
            { $pull: { entries: entry._id } },
            { new: true }
        );
        res.status(200).json("The entry has been deleted");
    } catch (error) {
        next(error);
    }
};

const getEntries = async (req, res, next) => {
    const userId = req.params.userId;
    try {
        const entries = await Entry.find({ author: userId })
            .populate('meals', 'name')
            .populate('routines', 'name');
        if (!entries) {
            return res.status(404).json({ message: "No entries found" });
        }
        res.status(200).json(entries); 
    } catch (error) {
        next(error);
    }
};

const getMealsAndRoutines = async (req, res, next) => {
    const userId = req.params.id;
    try {
        const userRoutines = await Routine.find({ author: userId }).select('name').exec();
        const userMeals = await Meal.find({ author: userId }).select('name').exec();
        const result = {
            routines: userRoutines,
            meals: userMeals
        };
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createEntry,
    updateEntry,
    deleteEntry,
    getEntries,
    getMealsAndRoutines
};