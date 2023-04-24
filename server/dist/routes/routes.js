"use strict";
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
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../models/models"));
const router = express_1.default.Router();
// Get all favorite jokes
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favoriteJokes = yield models_1.default.find();
        res.json(favoriteJokes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
// Add a new favorite joke
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { joke } = req.body;
        const favoriteJoke = new models_1.default({ joke });
        yield favoriteJoke.save();
        res.json(favoriteJoke);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}));
// Remove a favorite joke
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const favoriteJoke = yield models_1.default.findById(id);
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
exports.default = router;
