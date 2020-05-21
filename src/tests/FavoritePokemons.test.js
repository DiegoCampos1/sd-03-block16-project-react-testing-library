import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

const renderWithRouter = (
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

describe('Favorite Pokémons', () => {
  afterEach(cleanup);

  test('No favorite pokemon found', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('No card of on none favorited pokémons', () => {
    const { queryByText } = render(<FavoritePokemons pokemons={[]} />);
    expect(queryByText('No favorite pokemon found')).toBeInTheDocument();
    expect(queryByText('More details')).not.toBeInTheDocument();
  });

  test('No card of no favorited pokemons', () => {
    const { queryByText } = renderWithRouter((
      <FavoritePokemons pokemons={pokemons.slice(0, -1)} />
    ));
    expect(queryByText('No favorite pokemon found')).not.toBeInTheDocument();
    expect(queryByText('Dragonair')).not.toBeInTheDocument();
  });

  test('should show card of favorited pokemons', () => {
    const { queryByText } = renderWithRouter((
      <FavoritePokemons pokemons={pokemons.slice(-3)} />
    ));
    expect(queryByText('No favorite pokemon found')).not.toBeInTheDocument();
    expect(queryByText('Dragonair')).toBeInTheDocument();
    expect(queryByText('Rapidash')).toBeInTheDocument();
    expect(queryByText('Snorlax')).toBeInTheDocument();
  });
});
