import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HomePage from '@/pages';
import { useUsers } from '@/context/UsersContext';
import useFetchUsers from '@/hooks/useFetchUsers';
import '@testing-library/jest-dom';
import { mockGithubUser } from '@/mocks/mockGithubUser';

jest.mock('@/context/UsersContext', () => ({
  useUsers: jest.fn(),
}));

jest.mock('@/hooks/useFetchUsers', () => jest.fn());

describe('HomePage Component', () => {
  let favoritesMock: Set<number>;
  let toggleFavoriteMock: jest.Mock;
  let setUsersMock: jest.Mock;

  beforeEach(() => {
    favoritesMock = new Set();
    toggleFavoriteMock = jest.fn();
    setUsersMock = jest.fn();

    (useUsers as jest.Mock).mockReturnValue({
      users: [mockGithubUser],
      setUsers: setUsersMock,
      favorites: favoritesMock,
      toggleFavorite: toggleFavoriteMock,
    });
  });

  it('debe mostrar un mensaje de "Loading..." mientras los datos son cargados', () => {
    (useFetchUsers as jest.Mock).mockReturnValue({
      users: [],
      isLoading: true,
      error: null,
    });

    render(<HomePage />);

    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  it('debe mostrar un mensaje de error cuando ocurre un problema en la carga de datos', () => {
    (useFetchUsers as jest.Mock).mockReturnValue({
      users: [],
      isLoading: false,
      error: 'Error al cargar los datos',
    });

    render(<HomePage />);

    expect(screen.getByText(/oops, ocurrió un error/i)).toBeInTheDocument();
  });

  it('debe llamar a `toggleFavorite` correctamente al hacer clic en el botón de agregar favorito', async () => {
    (useFetchUsers as jest.Mock).mockReturnValue({
      users: [mockGithubUser],
      isLoading: false,
      error: null,
    });

    render(<HomePage />);

    const buttons = screen.getAllByRole('button', {
      name: /agregar a favoritos/i,
    });

    expect(buttons).toHaveLength(1);

    await userEvent.click(buttons[0]);

    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    // expect(toggleFavoriteMock).toHaveBeenCalledWith(mockGithubUser.id);
  });
});
