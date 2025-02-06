import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserDetailPage from '@/pages/users/[username]';
import { useUsers } from '@/context/UsersContext';
import { mockGithubUser } from '@/mocks/mockGithubUser';

jest.mock('@/context/UsersContext', () => ({
  useUsers: jest.fn(),
}));

describe('UserDetailPage Component', () => {
  let favoritesMock: Set<number>;
  let toggleFavoriteMock: jest.Mock;

  beforeEach(() => {
    favoritesMock = new Set();
    toggleFavoriteMock = jest.fn();

    (useUsers as jest.Mock).mockReturnValue({
      favorites: favoritesMock,
      toggleFavorite: toggleFavoriteMock,
    });
  });

  it('debe mostrar un mensaje de error si los datos contienen un error', () => {
    const errorMessage = {
      message: 'Hubo un problema al cargar los datos del usuario',
    };

    render(<UserDetailPage user={null} repos={[]} error={errorMessage} />);

    expect(screen.getByText(/oops, ocurrió un error/i)).toBeInTheDocument();
    expect(screen.getByText(errorMessage.message)).toBeInTheDocument();
  });

  it('debe cambiar el estado del botón de favorito según el estado del usuario en favoritos', () => {
    render(<UserDetailPage user={mockGithubUser} repos={[]} />);

    const favoriteButton = screen.getByRole('button', {
      name: /🤍 agregar a favoritos/i,
    });
    expect(favoriteButton).toBeInTheDocument();

    fireEvent.click(favoriteButton);

    expect(toggleFavoriteMock).toHaveBeenCalledTimes(1);
    expect(toggleFavoriteMock).toHaveBeenCalledWith(mockGithubUser.id);
  });

  it('debe mostrar "❤️ Quitar Favorito" si el usuario ya está en favoritos', () => {
    favoritesMock.add(mockGithubUser.id);

    render(<UserDetailPage user={mockGithubUser} repos={[]} />);

    const favoriteButton = screen.getByRole('button', {
      name: /❤️ quitar de favoritos/i,
    });
    expect(favoriteButton).toBeInTheDocument();
  });

  it('debe ejecutar correctamente la función de "Volver" al presionar el botón', () => {
    const mockBack = jest
      .spyOn(window.history, 'back')
      .mockImplementation(() => {});

    render(<UserDetailPage user={mockGithubUser} repos={[]} />);

    const backButton = screen.getByRole('button', { name: /volver/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);

    mockBack.mockRestore();
  });
});
