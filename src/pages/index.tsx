import React, { useEffect } from 'react';
import useFetchUsers from '@/hooks/useFetchUsers';
import styles from './HomePage.module.css';
import { useUsers } from '@/context/UsersContext';
import Error from '@/components/Error';
import UserList from '@/components/UserList';
import Header from '@/components/header';

const HomePage: React.FC = () => {
  const { users, setUsers, favorites, toggleFavorite } = useUsers();
  const { users: initialUsers, isLoading, error } = useFetchUsers();

  useEffect(() => {
    if (initialUsers && initialUsers.length > 0 && initialUsers !== users) {
      setUsers(initialUsers);
    }
  }, [initialUsers, users, setUsers]);

  const handleBack = () => {
    setUsers([]);
    window.location.reload();
  };

  if (isLoading) {
    return <div className={styles.homePage__loading}>Loading...</div>;
  }

  if (error) {
    return (
      <Error
        title="Oops, ocurrió un error"
        message={
          error.message ||
          'Por favor, verifica los datos o inténtalo más tarde.'
        }
        onRetry={handleBack}
        retryLabel="Volver"
      />
    );
  }

  return (
    <div className={styles.homePage}>
      <Header />
      <UserList
        users={users}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
};

export default HomePage;
