import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Pokemon from '../components/Pokemon';
import pokemons from '../data';

const renderWithRouter = (ui, history = createMemoryHistory()) => ({
  ...render(<Router history={history}>{ui}</Router>),
  history,
});

describe('Pokemon', () => {
  afterEach(cleanup);

  test('render a card', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />
    ));
    expect(getByTestId('pokemon-name')).toBeInTheDocument();
    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemon-weight')).toBeInTheDocument();
  });

  test('should render the correct name', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />
    ));
    expect(getByTestId('pokemon-name')).toContainHTML('Pikachu');
  });

  test('should render the correct type', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />
    ));
    expect(getByTestId('pokemonType')).toContainHTML('Electric');
  });

  test('should render the correct average weight message', () => {
    const { getByTestId } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />
    ));
    expect(getByTestId('pokemon-weight')).toContainHTML('Average weight:6.0kg');
  });

  test('should render the correct image', () => {
    const { getByAltText } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />
    ));
    const pikachuImage = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(getByAltText('Pikachu sprite')).toHaveAttribute('src', pikachuImage);
  });

  test('should render an Link', () => {
    const { getByText } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />
    ));
    expect(getByText('More details')).toHaveAttribute('href', '/pokemons/25');
  });

  test('Link should go to details page', () => {
    const { getByText, history } = renderWithRouter((
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />
    ));
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  test('should have an icon on favorited pokemons', () => {
    const { getByAltText } = renderWithRouter((<Pokemon pokemon={pokemons[0]} isFavorite />));
    expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
