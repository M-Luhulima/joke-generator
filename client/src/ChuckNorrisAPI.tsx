import axios from "axios";

interface ChuckNorrisJokeResponse {
  value: string;
}
// should go to backend
// get request for a random joke optionally with category
export const getChuckNorrisJoke = async (
  category: string | null = null
): Promise<string> => {
  const url = category
    ? `https://api.chucknorris.io/jokes/random?category=${encodeURIComponent(
        category
      )}`
    : "https://api.chucknorris.io/jokes/random";
  const response = await axios.get<ChuckNorrisJokeResponse>(url);
  return response.data.value;
};

// get request to get a list of categories
export const getChuckNorrisCategories = async (): Promise<string[]> => {
  const response = await axios.get<string[]>(
    "https://api.chucknorris.io/jokes/categories"
  );
  return response.data;
};
