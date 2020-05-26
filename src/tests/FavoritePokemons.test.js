import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testando pagina de favoritos', () => {
  test('teste', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[{ pathname: '/favorites' }]}>
        <App />
      </MemoryRouter>,
    );
    const pokFavoritos = getByText('Favorite pokémons');
    expect(pokFavoritos).toBeInTheDocument();
    const semFavoritos = getByText('No favorite pokemon found');
    expect(semFavoritos).toBeInTheDocument();
  });

  test('teste', () => {
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
