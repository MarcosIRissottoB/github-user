import React, { useState } from 'react';
import styles from './Header.module.css';
import useSearchUsers from '@/hooks/useSearchUsers';
import { GithubUser } from '@/types/github';
import Search from '@/components/search';

interface HeaderProps {
  onSearchResults: (users: GithubUser[] | []) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchResults }) => {
  const [query, setQuery] = useState('');
  const { searchUsers, isLoading, error } = useSearchUsers();

  const handleSearch = async () => {
    if (query.length > 2) {
      const { data } = await searchUsers(query);
      onSearchResults(data);
    } else if (query.length === 0) {
      onSearchResults([]);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>GITHUB USERS</h1>
      <Search
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
        isLoading={isLoading}
        error={!!error}
      />
    </header>
  );
};

export default Header;
