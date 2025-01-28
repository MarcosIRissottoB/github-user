import React from 'react';
import { GetServerSideProps } from 'next';
import { GithubRepo, GithubUser } from '@/types/github';
import styles from './UserDetailPage.module.css';
import { fetchGithubUser, fetchGithubRepos } from '@/services/githubService';

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
      <h1 className={styles.userDetailPage__header}>Detalle del Usuario</h1>
      <div className={styles.userDetailPage__container}>
        <div className={styles.userDetailPage__profile}>
          <img
            src={user.avatar_url}
            alt={user.login}
            className={styles.userDetailPage__avatar}
          />
          <h1 className={styles.userDetailPage__username}>{user.login}</h1>
          {user.id && (
            <p className={styles.userDetailPage__info}>ID: {user.id}</p>
          )}
          <a
            href={user.html_url}
            className={styles.userDetailPage__link}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver perfil en GitHub
          </a>
        </div>

        {repos && repos.length > 0 ? (
          <div className={styles.userDetailPage__repos}>
            <h2>Repositorio(s):</h2>
            <ul className={styles.userDetailPage__reposList}>
              {repos.map((repo) => (
                <li key={repo.id} className={styles.userDetailPage__repo}>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.userDetailPage__repoLink}
                  >
                    {repo.name}
                  </a>
                  <span className={styles.userDetailPage__repoId}>
                    {`(ID: ${repo.id})`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.userDetailPage__noRepos}>
            <h2>El usuario no tiene repositorios públicos.</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { username } = context.query;

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
    const user = await fetchGithubUser(username);
    const repos = await fetchGithubRepos(username);

    return {
      props: {
        user,
        repos,
        error: null,
      },
    };
  } catch (err) {
    return {
      props: {
        user: null,
        repos: [],
        error: err instanceof Error ? err.message : 'Error desconocido.',
      },
    };
  }
};

export default UserDetailPage;
