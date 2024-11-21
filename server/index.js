const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const entryRoute = require("./routes/entries");
const routineRoute = require("./routes/routines");
const mealRoute = require("./routes/meals");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7700;

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("Connected to mongoDB");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

app.get('/', (req, res) => {
    res.send('Hello from Express!');
});

app.use(cookieParser());
app.use(express.json());
app.use(helmet());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(morgan("common"));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/entries", entryRoute);
app.use("/api/routines", routineRoute);
app.use("/api/meals", mealRoute);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
    connect();
});
