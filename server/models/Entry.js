const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema(
    {
        data: { type: Date, required: true },
        routines: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Routine'
            }
        ],
        meals: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Meal'
            }
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Entry", EntrySchema);
