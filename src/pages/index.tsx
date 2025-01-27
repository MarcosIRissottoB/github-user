import React from 'react';
import useFetchUsers from '../hooks/useFetchUsers';

const HomePage: React.FC = () => {
  const { users, isLoading, error } = useFetchUsers();

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
      <h1>GitHub Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <img src={user.avatar_url} alt={user.login} width={50} />
            <p>{user.login}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
