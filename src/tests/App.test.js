import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { cleanup, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('shows the Pokédex when the route is `/`', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

test('shows the Home link when the route is `/` and your destination page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const home = getByText(/Home/i);
  expect(home).toBeInTheDocument();
  fireEvent.click(home);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/');
});

test('shows the `About` link when the route is `/` and your destination page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const about = getByText(/About/i);
  expect(about).toBeInTheDocument();
  fireEvent.click(about);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/about');
});

test('shows the `Favorite Pokémons` link when the route is `/` and your destination page', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favoritePokemons = getByText(/Favorite Pokémons/i);
  expect(favoritePokemons).toBeInTheDocument();
  fireEvent.click(favoritePokemons);
  const pathname = history.location.pathname;
  expect(pathname).toBe('/favorites');
});

test('shows the `Not Found` if a incorrect link is digited', () => {
  const { getByText, history } = renderWithRouter(<App />);
  history.push('/marcob');
  const pageNotFound = getByText(/Page requested not found/i);
  expect(pageNotFound).toBeInTheDocument();
});
