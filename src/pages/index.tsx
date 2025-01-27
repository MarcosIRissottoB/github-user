import React from 'react';
import useFetchUsers from '../hooks/useFetchUsers';

const HomePage: React.FC = () => {
  const { users, isLoading, error } = useFetchUsers();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching users: {error}</div>;
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
