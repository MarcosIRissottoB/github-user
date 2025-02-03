import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useFetchUsers from '../hooks/useFetchUsers';
import styles from './HomePage.module.css';
import Header from '@/components/header';
import { useUsers } from '@/context/UsersContext';

const HomePage: React.FC = () => {
  const { users, setUsers, favorites, toggleFavorite } = useUsers();
  const { users: initialUsers, isLoading, error } = useFetchUsers();

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0) {
      setUsers(initialUsers);
    }
  }, [initialUsers, setUsers]);

  if (isLoading) {
    return <div className={styles.homePage__loading}>Loading...</div>;
  }

  if (error) {
    return (
      <div className={styles.homePage__error}>
        <h2 className={styles.homePage__errorTitle}>Oops, ocurrió un error</h2>
        <p className={styles.homePage__errorMessage}>
          Por favor, verifica los datos o inténtalo más tarde.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <Header />
      <ul className={styles.homePage__list}>
        {users.map((user) => (
          <li key={user.id} className={styles.homePage__listItem}>
            <Link
              href={`/users/${user.login}`}
              className={styles.homePage__link}
            >
              <Image
                src={user.avatar_url}
                alt={user.login}
                className={styles.homePage__avatar}
                width={100}
                height={100}
              />
              <p className={styles.homePage__username}>{user.login}</p>
            </Link>
            <button
              className={`${styles.homePage__favoriteButton} ${
                favorites.has(user.id) ? styles.favorite : ''
              }`}
              onClick={() => toggleFavorite(user.id)}
            >
              {favorites.has(user.id)
                ? '❤️ Quitar de favoritos'
                : '🤍 Agregar a favoritos'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
