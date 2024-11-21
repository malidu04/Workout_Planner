const express = require("express");
const {
    createEntry,
    updateEntry,
    deleteEntry,
    getEntries,
    getMealsAndRoutines,
} = require("../controllers/entry.js");

const router = express.Router();

router.post("/", createEntry);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);
router.get("/:userId", getEntries);
router.get("/fetchMealsAndRoutines/:id", getMealsAndRoutines);

module.exports = router;