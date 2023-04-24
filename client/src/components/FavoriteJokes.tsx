import { FC, useState } from "react";

interface FavoriteJokesProps {
  favoriteJokes: { id: string; joke: string }[];
  handleDeleteJoke: (jokeToDelete: { id: string; joke: string }) => void;
  handleGetFavoriteJokes: () => void;
}

// add: clear list (useState)
// for delete: check useState?

const FavoriteJokes: FC<FavoriteJokesProps> = ({
  favoriteJokes,
  handleDeleteJoke,
  handleGetFavoriteJokes,
}) => {
  const [toggledJokeId, setToggledJokeId] = useState<string | null>(null);

  const handleToggleJoke = (jokeId: string) => {
    setToggledJokeId(jokeId === toggledJokeId ? null : jokeId);
  };

  return (
    <section className="favorites">
      <h2 className="favorites__title">Favorite Jokes</h2>
      <button
        className="favorites__button button"
        onClick={handleGetFavoriteJokes}
      >
        Get Favorite Jokes
      </button>
      <ul className="favorites__list">
        {/* iterate through favorite jokes and render an li for each joke */}
        {favoriteJokes.map((joke) => (
          <li key={joke.id} className="favorites__item">
            <div onClick={() => handleToggleJoke(joke.id)}>{joke.joke}</div>
            {/* delete doesn't work yet */}
            {/* show delete button on toggle */}
            {joke.id === toggledJokeId && (
              <button
                className="favorites__delete button"
                onClick={() => handleDeleteJoke(joke)}
              >
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FavoriteJokes
