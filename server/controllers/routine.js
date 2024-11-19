import Routine from "../models/Routine.js"
import User from "../models/User.js"

export const createRoutine = async (req, res, next) => {

    const newRoutine =  new Routine(req.body);
    try {
        const savedRoutine = await newRoutine.save();

        try {
            const user = await User.findById(savedRoutine.author);
            User.routines.push(savedRoutine._id);
            await User.save();
        }
        catch (error) {
            next (error)
        }
    res.status(200).json(savedRoutine);
} catch (error) {
        next (error);
    }
}

export const updateRoutine = async (req, res, next) => {
    try {
        const routine = await Routine.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(routine);
    } catch (error) {
        next (error);
    }
}

export const deleteRoutine = async (req, res, next) => {
    try {
        await Routine.findByIdAndDelete(req.params.id);
        res.status(200).json("the routine has been deleted");
    } catch (error) {
        next (error);
    }
}

export const getRoutines = async (req, res, next ) => {
    const userId = req.params.userId;

    try {
        const routines = await Routine.find({ author: userId });
        res.status(200).json(routines);
    } catch (error) {
        next (error);
    }
}