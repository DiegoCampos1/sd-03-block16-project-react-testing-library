import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import data from '../data';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

test('testing whether card with infos appears', () => {
  const { getByText } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);
  const text = getByText('More details');
  expect(text).toBeInTheDocument();
});

test('testing whether card shows pokemon infos', () => {
  const { getByText } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);
  const text = getByText('Pikachu');
  expect(text).toBeInTheDocument();
});

test('testing whether card shows pokemon type', () => {
  const { getByTestId } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);
  const type = getByTestId('pokemonType');
  expect(type.textContent).toBe('Electric');
});

test('testing whether card shows pokemon weight', () => {
  const { getByText } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);
  const text = getByText(/Average/);
  expect(text.textContent).toBe(`Average weight:${data[0].averageWeight.value}${data[0].averageWeight.measurementUnit}`);
});

test('testing whether card shows pokemon pic', () => {
  const { getByRole } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);
  const img = getByRole('img');
  expect(img.src).toBe(data[0].image);
});

test('testing whether card shows pokemon image alt', () => {
  const { getByAltText } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);
  const alt = getByAltText(`${data[0].name} sprite`);
  expect(alt).toBeInTheDocument();
});

test('testing whether card shows link', () => {
  const { getByRole } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);
  const link = getByRole('link');
  expect(link).toBeInTheDocument();
  expect(link.href).toBe(`http://localhost/pokemons/${data[0].id}`);
});

test('testing whether link works', () => {
  const { getByRole, history } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite={false} />);
  const link = getByRole('link');
  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${data[0].id}`);
});

test('testing whether link works', () => {
  const { getByAltText, getByRole } = renderWithRouter(<Pokemon pokemon={data[0]} isFavorite />);
  const link = getByRole('link');
  fireEvent.click(link);
  const star = getByAltText(/marked as favorite/);
  expect(star).toBeInTheDocument();
  expect(star.alt).toBe(`${data[0].name} is marked as favorite`);
  expect(star.src).toBe('http://localhost/star-icon.svg');
});
