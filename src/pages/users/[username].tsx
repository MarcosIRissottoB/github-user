import React from 'react';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { GithubRepo, GithubUser } from '@/types/github';
import styles from './UserDetailPage.module.css';
import createGitHubService from '@/services/githubService';
import axiosAdapter from '@/http/axiosAdapter';
import { handleError } from '@/utils/errorHandler';
import { useUsers } from '@/context/UsersContext';

type UserDetailPageProps = {
  user: GithubUser | null;
  repos: GithubRepo[] | [];
  error?: string | null;
};

const UserDetailPage: React.FC<UserDetailPageProps> = ({
  user,
  repos,
  error,
}) => {
  const { favorites, toggleFavorite } = useUsers();

  const handleBack = () => {
    window.history.back();
  };

  const currentDate = new Date().toLocaleDateString();

  if (error) {
    return (
      <div className={styles.userDetailPage__error}>
        <h2 className={styles.userDetailPage__errorTitle}>
          Oops, ocurrió un error
        </h2>
        <p className={styles.userDetailPage__errorMessage}>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.userDetailPage__noUser}>
        <h2>No se encontró el usuario.</h2>
      </div>
    );
  }

  return (
    <div className={styles.userDetailPage}>
      <div className={styles.userDetailPage__top}>
        <button
          onClick={handleBack}
          className={styles.userDetailPage__backButton}
        >
          Volver
        </button>
        <h1 className={styles.userDetailPage__header}>Detalle del Usuario</h1>
        <div></div>
      </div>
      <div className={styles.userDetailPage__container}>
        <div className={styles.userDetailPage__profile}>
          <Image
            src={user.avatar_url}
            alt={user.login}
            className={styles.userDetailPage__avatar}
            width={100}
            height={100}
          />
          <h1 className={styles.userDetailPage__username}>{user.login}</h1>
          <p className={styles.userDetailPage__info}>ID: {user.id}</p>
          <button
            className={`${styles.userDetailPage__favoriteButton} ${
              favorites.has(user.id) ? styles.favorite : ''
            }`}
            onClick={() => toggleFavorite(user.id)}
          >
            {favorites.has(user.id)
              ? '❤️ Quitar Favorito'
              : '🤍 Agregar Favorito'}
          </button>
        </div>
        {repos && repos.length > 0 ? (
          <div className={styles.userDetailPage__repos}>
            <h2>Repositorio(s):</h2>
            <ul>
              {repos.map((repo) => (
                <li key={repo.id}>{repo.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No hay repositorios.</div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  const githubService = createGitHubService(axiosAdapter);

  if (!username || typeof username !== 'string') {
    return {
      props: {
        user: null,
        repos: [],
        error: 'El nombre de usuario no se proporcionó o no es válido.',
      },
    };
  }

  try {
    const user = await githubService.fetchUserDetails(username);
    const repos = await githubService.fetchRepositories(username);
    return {
      props: {
        user: user?.data,
        repos: repos?.data,
        error: null,
      },
    };
  } catch (error) {
    const serializableError = handleError(error, {
      validationMessage: 'Los datos del usuario no son válidos.',
      genericMessage: 'Hubo un problema al obtener los datos del usuario.',
    });

    return {
      props: {
        user: null,
        repos: [],
        error: serializableError.message,
      },
    };
  }
};

export default UserDetailPage;
