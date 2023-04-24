import { FC } from "react";

interface CategorySelectorProps {
  categories: { value: string; label: string }[];
  selectedCategory: string | null;
  handleCategorySelect: (category: string | null) => void;
  handleGetJoke: () => void;
}

const CategorySelector: FC<CategorySelectorProps> = ({
  categories,
  selectedCategory,
  handleCategorySelect,
  handleGetJoke,
}) => {
  // render select to show available categories
  return (
    <section className="categories">
      <select
        className="categories__select"
        value={selectedCategory || ""}
        onChange={(e) => handleCategorySelect(e.target.value || null)}
      >
        <option className="categories__option" value="">
          {" "}
          Select a category{" "}
        </option>
        {/* iterate through categories and render an option element for each category */}
        {categories.map((category) => (
          <option
            className="categories__option"
            key={category.value}
            value={category.value}
          >
            {category.label}
          </option>
        ))}
      </select>
      {/* button is disables if no category is chosen */}
      <button
        className="categories__button button"
        disabled={!selectedCategory}
        onClick={handleGetJoke}
      >
        Get Joke
      </button>
      <button className="categories__random button" onClick={handleGetJoke}>
        Get Random Joke
      </button>
    </section>
  );
};

export default CategorySelector;
