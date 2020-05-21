import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import App from '../App';
import { FavoritePokemons } from '../components';

afterEach(cleanup);

describe('Testes do arquivo FavoritePokemons.js', () => {
  it('Caso a pessoa não tenha pokémons favoritos', () => {
    const { getByText, queryByText } = render(<FavoritePokemons pokemons={[]} />);
    const notFavorite = getByText(/No favorite pokemon found/i);
    expect(notFavorite).toBeInTheDocument();

    expect(queryByText('Encountered pokémons')).toBeNull();
  });

  it('Caso a pessoa tenha pokémons favoritos', () => {
    const { getByTestId, queryByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>, { route: '/favorites' },
    );
    const notFavorite = getByTestId(/pokemon-name/i);
    expect(notFavorite).toBeInTheDocument();
    expect(queryByText('Pikachu')).not.toBeNull();
  });
});
