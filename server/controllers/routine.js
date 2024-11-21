const Routine = require("../models/Routine.js");
const User = require("../models/User.js");

// Create Routine
const createRoutine = async (req, res, next) => {
    const newRoutine = new Routine(req.body);

    try {
        const savedRoutine = await newRoutine.save();

        try {
            const user = await User.findById(savedRoutine.author);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            user.routines.push(savedRoutine._id);
            await user.save();
        } catch (error) {
            return res.status(500).json({ message: `Error updating user: ${error.message}` });
        }

        res.status(201).json(savedRoutine);
    } catch (error) {
        next(error);
    }
};

// Update Routine
const updateRoutine = async (req, res, next) => {
    try {
        const routine = await Routine.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(routine);
    } catch (error) {
        next(error);
    }
};

// Delete Routine
const deleteRoutine = async (req, res, next) => {
    try {
        await Routine.findByIdAndDelete(req.params.id);
        res.status(200).json("The routine has been deleted");
    } catch (error) {
        next(error);
    }
};

// Get Routines
const getRoutines = async (req, res, next) => {
    const userId = req.params.userId;

    try {
        const routines = await Routine.find({ author: userId });
        res.status(200).json(routines);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createRoutine,
    updateRoutine,
    deleteRoutine,
    getRoutines,
};
 