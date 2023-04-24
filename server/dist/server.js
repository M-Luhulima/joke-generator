"use strict";
// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import favoriteJokeRoutes from "../routes/routes";
// import connectDB from "../database/connection";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dotenv.config();
// const app = express();
// const port: string = process.env.PORT || "5000";
// //middleware config
// app.use(cors());
// app.use(express.json());
// // Connect to the database
// connectDB();
// // Load favorite joke routes
// app.use("/api/favorite-jokes", favoriteJokeRoutes);
// app.listen(port, () => {
//   console.log(`Server connected to http://localhost:${port}`);
// });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || "5000";
//middleware config
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// const mongoPassword = encodeURIComponent(<string>process.env.MONGODB_PASSWORD);
mongoose_1.default
    .connect(`mongodb+srv://maudyluhulima:${process.env.MONGODB_PASSWORD}@joke-generator.dfhuaxz.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));
// Create a schema for the favorite jokes
const favoriteJokeSchema = new mongoose_1.default.Schema({
    joke: String,
});
// Create a model for the favorite jokes
const FavoriteJoke = mongoose_1.default.model("FavoriteJoke", favoriteJokeSchema);
// Routes
app.get('/', (_req, res) => {
    try {
        res.json("Get Request");
    }
    catch (error) {
        res.json(error);
    }
});
app.get("/api/favorite-jokes", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favoriteJokes = yield FavoriteJoke.find();
        res.json(favoriteJokes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
app.post("/api/favorite-jokes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { joke } = req.body;
        const favoriteJoke = new FavoriteJoke({ joke });
        yield favoriteJoke.save();
        res.json(favoriteJoke);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
app.delete("/api/favorite-jokes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const favoriteJoke = yield FavoriteJoke.findById(id);
        if (!favoriteJoke) {
            return res.status(404).send("Favorite joke not found");
        }
        yield favoriteJoke.deleteOne();
        res.send("Favorite joke removed");
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
app.listen(port, () => {
    console.log(`Server connected to http://localhost:${port}`);
});
