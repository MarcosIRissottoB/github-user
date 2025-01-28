import React from 'react';
import Link from 'next/link';
import useFetchUsers from '../hooks/useFetchUsers';
import styles from './HomePage.module.css';

const HomePage: React.FC = () => {
  const { users, isLoading, error } = useFetchUsers();

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
      <h1>GitHub Users</h1>
      <ul className={styles.homePage__list}>
        {users.map((user) => (
          <Link
            key={user.id}
            href={`/users/${user.login}`}
            className={styles.homePage__link}
          >
            <li className={styles.homePage__listItem}>
              <img
                src={user.avatar_url}
                alt={user.login}
                className={styles.homePage__avatar}
              />
              <p className={styles.homePage__username}>{user.login}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
