import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import App from '../App';
import data from '../data';
import { Pokemon } from '../components';

afterEach(cleanup);

test('Correct Pokemon display', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  expect(getByTestId('pokemon-name').innerHTML).toBe(data[0].name);
  expect(getByTestId('pokemonType').innerHTML).toBe(data[0].type);
  expect(getByTestId('pokemon-weight').innerHTML).toBe(`Average weight:${data[0].averageWeight.value}${data[0].averageWeight.measurementUnit}`);
});

test('Pokemon Image', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const source = data[0].image;
  expect(getByAltText(`${data[0].name} sprite`)).toHaveAttribute('src', source);
});

test('Details Link', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const detailsElement = getByText(/More details/i);
  expect(detailsElement.getAttribute('href')).toBe(`/pokemons/${data[0].id}`);
});

test('Favorite Image', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <Pokemon
        pokemon={data[0]}
        isFavorite
      />
    </MemoryRouter>,
  );

  expect(getByAltText(`${data[0].name} is marked as favorite`)).toHaveAttribute('src', '/star-icon.svg');
});
