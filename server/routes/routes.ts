import express from "express";
import FavoriteJoke from "../models/models";

const router = express.Router();

// Get all favorite jokes
router.get("/", async (_req, res) => {
  try {
    const favoriteJokes = await FavoriteJoke.find();
    res.json(favoriteJokes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Add a new favorite joke
router.post("/", async (req, res) => {
  try {
    const { joke } = req.body;
    const favoriteJoke = new FavoriteJoke({ joke });
    await favoriteJoke.save();
    res.json(favoriteJoke);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

// Remove a favorite joke
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const favoriteJoke = await FavoriteJoke.findById(id);
    if (!favoriteJoke) {
      return res.status(404).send("Favorite joke not found");
    }
    await favoriteJoke.deleteOne();
    res.send("Favorite joke removed");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});

export default router;
