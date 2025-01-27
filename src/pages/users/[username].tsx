import React from 'react';
import { useRouter } from 'next/router';
import useFetchUser from '@/hooks/useFetchUser';

const UserDetailPage: React.FC = () => {
  const router = useRouter();
  const { username } = router.query;
  const { user, isLoading, error } = useFetchUser(username as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div
        style={{
          color: 'white',
          padding: '10px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontSize: '18px' }}>Oops, ocurrió un error</h2>
        <p>Por favor, verifica los datos o inténtalo más tarde.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Detalles del Usuario</h1>
      {user && (
        <div>
          <img src={user.avatar_url} alt={user.login} width={150} />
          <h2>{user.login}</h2>
          <p>ID: {user.id}</p>
          <p>
            URL:{' '}
            <a href={user.html_url} target="_blank" rel="noreferrer">
              {user.html_url}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
