import User from "../models/User.js";

export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updateUser);
    } catch (error) {
        next (error);
    }
};

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByAndDelete(req.params.id);
        res.status(200).json("User has been deleted.");
    } catch (error) {
        next(error);
    }
};

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).populate('posts');
        res.status(200).json(user);
    } catch (error) {
        next (error);
    }
};

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        next (error);
    }
};