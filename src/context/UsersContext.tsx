import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { GithubUser } from '@/types/github';

type UsersContextType = {
  users: GithubUser[];
  favorites: Set<number>;
  setUsers: React.Dispatch<React.SetStateAction<GithubUser[]>>;
  toggleFavorite: (userId: number) => void;
};

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [users, setUsers] = useState<GithubUser[]>([]);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = useCallback((userId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(userId)) {
        newFavorites.delete(userId);
      } else {
        newFavorites.add(userId);
      }
      return newFavorites;
    });
  }, []);

  const value = useMemo(
    () => ({
      users,
      favorites,
      setUsers,
      toggleFavorite,
    }),
    [users, favorites]
  );

  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error('useUsers debe ser usado dentro de un UsersProvider');
  }
  return context;
};
