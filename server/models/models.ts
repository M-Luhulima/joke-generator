import mongoose from "mongoose";

// Schema for favorite jokes
const favoriteJokeSchema = new mongoose.Schema({
  joke: String,
});

// Model for favorite jokes
const FavoriteJoke = mongoose.model("FavoriteJoke", favoriteJokeSchema);

export default FavoriteJoke;
