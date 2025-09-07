function SearchBar({ value, onChange, onSubmit, placeholder }) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.();
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default SearchBar;
