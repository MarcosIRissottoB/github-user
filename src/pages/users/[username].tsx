import React from 'react';
import { GetServerSideProps } from 'next';
import { GithubRepo, GithubUser } from '@/types/github';
import styles from './UserDetailPage.module.css';
import createGitHubService from '@/services/githubService';
import { handleError } from '@/errors/handleError';
import { useUsers } from '@/context/UsersContext';
import CustomError from '@/components/Error';
import Card from '@/components/Card';
import httpAdapter from '@/http/httpAdapter';

type UserDetailPageProps = {
  user: GithubUser | null;
  repos: GithubRepo[] | [];
  error?: { message: string } | null;
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

  if (error) {
    return (
      <CustomError
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

  if (!user) {
    return (
      <div className={styles.userDetailPage__noUser}>
        <h2>No se encontró el usuario.</h2>
        <button
          onClick={handleBack}
          className={styles.userDetailPage__backButton}
        >
          Volver
        </button>
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
      </div>
      <div className={styles.userDetailPage__container}>
        <Card>
          <Card.Image src={user.avatar_url} alt={user.login} />
          <Card.Title>{user.login}</Card.Title>
          <Card.Actions>
            <button
              className={`${styles.userDetailPage__favoriteButton} ${
                favorites.has(user.id) ? styles.favorite : ''
              }`}
              onClick={() => toggleFavorite(user.id)}
            >
              {favorites.has(user.id)
                ? '❤️ Quitar de favoritos'
                : '🤍 Agregar a favoritos'}
            </button>
          </Card.Actions>
        </Card>
        {repos && repos.length > 0 ? (
          <div className={styles.userDetailPage__repos}>
            <h2>Repositorio(s):</h2>
            <ul>
              {repos.map((repo) => (
                <li key={repo.id}>* {repo.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No hay repositorios disponibles.</div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;
  const githubService = createGitHubService(httpAdapter);

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
      unknownMessage: 'Ha ocurrido un error inesperado al obtener el usuario.',
    });

    return {
      props: {
        user: null,
        repos: [],
        error: serializableError,
      },
    };
  }
};

export default UserDetailPage;
