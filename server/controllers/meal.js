


export const createMeal = async (req, res, next) => {
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

export const updateMeal = async (req, res, next ) => {
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

