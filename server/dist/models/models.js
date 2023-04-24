"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// Schema for favorite jokes
const favoriteJokeSchema = new mongoose_1.default.Schema({
    joke: String,
});
// Model for favorite jokes
const FavoriteJoke = mongoose_1.default.model("FavoriteJoke", favoriteJokeSchema);
exports.default = FavoriteJoke;
