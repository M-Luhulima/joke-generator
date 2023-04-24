import { FC } from "react";

interface ChuckNorrisJokeProps {
  joke: string;
  onSave: () => void;
}

const ChuckNorrisJoke: FC<ChuckNorrisJokeProps> = ({ joke, onSave }) => {
  return (
    <section className="joke">
      <p>{joke}</p>
      <button className="joke__button button" onClick={onSave}>
        Save Joke
      </button>
    </section>
  );
};

export default ChuckNorrisJoke;
