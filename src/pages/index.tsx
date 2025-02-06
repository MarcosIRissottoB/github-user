import React, { useEffect } from 'react';
import useFetchUsers from '@/hooks/useFetchUsers';
import styles from './HomePage.module.css';
import { useUsers } from '@/context/UsersContext';
import UserList from '@/components/UserList';
import Header from '@/components/header';
import CustomError from '@/components/Error';

const HomePage: React.FC = () => {
  const { users, setUsers, favorites, toggleFavorite } = useUsers();
  const { data, isLoading, error } = useFetchUsers();

  useEffect(() => {
    if (users.length > 0) {
      return;
    }

    if (data && data.length > 0) {
      setUsers(data);
    }
  }, [users, data, setUsers]);

  const handleBack = () => {
    setUsers([]);
    window.location.reload();
  };

  if (isLoading) {
    return <div className={styles.homePage__loading}>Loading...</div>;
  }

  if (error) {
    return (
      <CustomError
        title="Oops, ocurrió un error"
        message={
          error || 'Por favor, verifica los datos o inténtalo más tarde.'
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
