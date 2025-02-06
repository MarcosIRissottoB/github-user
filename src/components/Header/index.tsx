import React, { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import useSearchUsers from '@/hooks/useSearchUsers';
import { useUsers } from '@/context/UsersContext';
import Search from '../Search';

const Header: React.FC = () => {
  const [query, setQuery] = useState('');
  const { searchUsers, isLoading, error } = useSearchUsers();
  const { setUsers } = useUsers();

  const handleSearch = async () => {
    if (query.length > 2) {
      const { data } = await searchUsers(query);
      setUsers(data || []);
    } else if (query.length === 0) {
      setUsers([]);
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.header__title}>
        <h1 className={styles.header__title}>GITHUB USERS</h1>
      </Link>
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
