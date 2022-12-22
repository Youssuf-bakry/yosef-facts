const CategoryFilter = ({ categories, setCategory }) => {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            onClick={() => setCategory("all")}
            className="btn btn-all-categories"
          >
            All
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat.name} className="category">
            <button
              onClick={() => setCategory(cat.name)}
              className="btn btn-category"
              style={{ backgroundColor: cat.color }}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default CategoryFilter;
