import React from 'react';
import styles from './UserList.module.css';
import UserItem from '@/components/UserItem';

interface User {
  id: number;
  login: string;
  avatar_url: string;
}

interface UserListProps {
  users: User[];
  favorites: Set<number>;
  toggleFavorite: (userId: number) => void;
}

const UserList: React.FC<UserListProps> = React.memo(
  ({ users, favorites, toggleFavorite }) => {
    if (!users || users.length === 0) {
      return <h3 className={styles.userList__emptyMessage}>No hay usuarios</h3>;
    }

    return (
      <ul className={styles.userList}>
        {users.map((user) => (
          <UserItem
            key={user.id}
            id={user.id}
            login={user.login}
            avatar_url={user.avatar_url}
            isFavorite={favorites.has(user.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </ul>
    );
  }
);

UserList.displayName = 'UserList'; // Para facilitar el debug en React DevTools

export default UserList;
