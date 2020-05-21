import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('testing FavoritesPage', () => {
  test('should render on favorites page and dont have any favorite', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/favorites' }]}>
        <App />
      </MemoryRouter>,
    );
    const favoriteHeader = getByText('Favorite pokémons');
    expect(favoriteHeader).toBeInTheDocument();
    const noFavorites = getByText('No favorite pokemon found');
    expect(noFavorites).toBeInTheDocument();
  });
  test('testing favoriting pokemons', () => {
    const { getByRole, getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/pokemons/25' }]}>
        <App />
      </MemoryRouter>,
    );
    const checkBox = getByRole('checkbox');
    fireEvent.click(checkBox);
    fireEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText(/pikachu/i)).toBeInTheDocument();
  });
});
