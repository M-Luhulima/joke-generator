import React, { useState, useEffect } from "react";
import {
  getChuckNorrisJoke,
  getChuckNorrisCategories,
} from "./ChuckNorrisAPI";
import axios from "axios";
import "./App.css";
import ChuckNorrisJoke from "./components/ChuckNorrisJoke";
import chucknorris from "../src/img/chucknorris.jpg";
import CategorySelector from "./components/CategorySelector";
import FavoriteJokes from "./components/FavoriteJokes";

interface FavoriteJoke {
  id: string;
  joke: string;
}

const App: React.FC = () => {
  // define state variables
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<
    { value: string; label: string }[]
  >([]);
  const [favoriteJokes, setFavoriteJokes] = useState<FavoriteJoke[]>([]);

  // use useEffect to fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getChuckNorrisCategories();
      setCategories(
        categories.map((category) => ({
          value: category,
          label: category,
        }))
      );
    };

    fetchCategories();
  }, []);

  // handle functions > props to child components
  const handleGetJoke = async () => {
    setLoading(true);
    const newJoke = await getChuckNorrisJoke(selectedCategory);
    setJoke(newJoke);
    setLoading(false);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);
    setJoke("");
  };

  const handleSaveJoke = async () => {
    // check if joke is not an empty string and already in the fj array
    if (joke !== "" && !favoriteJokes.some((fj) => fj.joke === joke)) {
      try {
        const response = await axios.post<{ id: string }>(
          "http://localhost:5000/api/favorite-jokes",
          { joke }
        );
        setFavoriteJokes([...favoriteJokes, { id: response.data.id, joke }]);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleGetFavoriteJokes = async () => {
    try {
      const response = await axios.get<FavoriteJoke[]>(
        "http://localhost:5000/api/favorite-jokes"
      );
      setFavoriteJokes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteJoke = async (jokeToDelete: FavoriteJoke) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/favorite-jokes/${jokeToDelete.id}`
      );
      setFavoriteJokes(favoriteJokes.filter((fj) => fj.id !== jokeToDelete.id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="container">
      <h1 className="container__title">Chuck Norris Jokes</h1>
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategorySelect={handleCategorySelect}
        handleGetJoke={handleGetJoke}
      />
      {loading ? (
        <p>Loading...</p>
      ) : joke !== "" ? (
        <ChuckNorrisJoke joke={joke} onSave={handleSaveJoke} />
      ) : null}
      <FavoriteJokes
        favoriteJokes={favoriteJokes}
        handleDeleteJoke={handleDeleteJoke}
        handleGetFavoriteJokes={handleGetFavoriteJokes}
      />
      <img className="image" src={chucknorris} alt="Chuck Norris" />
    </main>
  );
};

export default App;
