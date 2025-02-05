import React from 'react';
import styles from './Search.module.css';

const Search: React.FC<{
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => Promise<void>;
  isLoading: boolean;
  error: boolean;
}> = ({ query, setQuery, handleSearch, isLoading, error }) => {
  return (
    <div>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Buscar usuarios..."
          className={styles.search__Input}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="button"
          className={styles.search__Button}
          onClick={handleSearch}
          disabled={query.length < 3 || isLoading}
        >
          {isLoading ? (
            <p className={styles.search__loading}>Buscando...</p>
          ) : (
            'Buscar'
          )}
        </button>
      </div>
      {error && (
        <p className={styles.search__error}>Error al buscar usuarios</p>
      )}
    </div>
  );
};

export default Search;
