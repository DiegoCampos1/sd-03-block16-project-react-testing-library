import React from 'react';
import {
  render, fireEvent,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import pokemons from '../data';
import { Pokemon } from '../components';


test('should ', () => {
  const {
    name, averageWeight: { value, measurementUnit }, image, id, type,
  } = pokemons[0];
  const history = createMemoryHistory();
  const { getByText, getByTestId, getByRole } = render(
    <Router history={history}>
      <Pokemon pokemon={pokemons[0]} isFavorite={false} />
    </Router>,
  );
  const poke = document.querySelector('.pokemon');
  expect(poke).toBeInTheDocument();
  const pName = getByTestId('pokemon-name');
  expect(pName.textContent).toBe(name);

  const peso = getByTestId('pokemon-weight');
  expect(peso).toHaveTextContent(`Average weight:${value + measurementUnit}`);

  const pokType = getByTestId('pokemonType');
  expect(pokType).toHaveTextContent(type);

  const img = getByRole('img');
  expect(img).toHaveAttribute('src', image);
  expect(img).toHaveAttribute('alt', `${name} sprite`);

  const link = getByRole('link');
  expect(link).toHaveAttribute('href', `/pokemons/${id}`);
  const button = getByText('More details');

  fireEvent.click(button);
  expect(history.location.pathname).toBe(`/pokemons/${id}`);
});

test('fav Pokemon', () => {
  const { name } = pokemons[0];
  const history = createMemoryHistory();
  const { getByAltText } = render(
    <Router history={history}>
      <Pokemon pokemon={pokemons[0]} isFavorite />
    </Router>,
  );

  const favIcon = getByAltText(`${name} is marked as favorite`);
  expect(favIcon).toBeInTheDOM();
  expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
});
