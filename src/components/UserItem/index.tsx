import React from 'react';
import Link from 'next/link';
import Card from '@/components/Card';
import styles from './UserItem.module.css';

interface UserItemProps {
  id: number;
  login: string;
  avatar_url: string;
  isFavorite: boolean;
  onToggleFavorite: (userId: number) => void;
}

const UserItem: React.FC<UserItemProps> = ({
  id,
  login,
  avatar_url,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <li className={styles.userItem}>
      <Card className={styles.userItem__card}>
        <Link href={`/users/${login}`} className={styles.userItem__link}>
          <Card.Image src={avatar_url} alt={login} />
          <Card.Title>{login}</Card.Title>
        </Link>
        <Card.Actions>
          <button
            className={`${styles.userItem__favoriteButton} ${
              isFavorite ? styles.favorite : ''
            }`}
            onClick={() => onToggleFavorite(id)}
            aria-label={`${
              isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'
            } para ${login}`}
          >
            {isFavorite ? '❤️ Quitar de favoritos' : '🤍 Agregar a favoritos'}
          </button>
        </Card.Actions>
      </Card>
    </li>
  );
};

export default UserItem;
