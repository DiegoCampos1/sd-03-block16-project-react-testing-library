import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('tests if home path is right', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const home = getByText('Home');
  fireEvent.click(home);
  const { pathname } = history.location;
  expect(pathname).toBe('/');
});

test('tests if about path is right', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const about = getByText('About');
  fireEvent.click(about);
  const { pathname } = history.location;
  expect(pathname).toBe('/about');
});

test('tests if favorite path is right', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const favorites = getByText('Favorite Pokémons');
  fireEvent.click(favorites);
  const { pathname } = history.location;
  expect(pathname).toBe('/favorites');
});

test('tests non existing page', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/xablau' });
  const pageNotFound = getByText('Page requested not found');
  expect(pageNotFound).toBeInTheDocument();
});

test('testing number of links', () => {
  const { getAllByRole } = renderWithRouter(<App />, { route: '/xablau' });
  const link = getAllByRole('link');
  expect(link.length).toBe(3);
});

test('shows podex', () => {
  const { getByText } = renderWithRouter(<App />);
  const text = getByText(/Encountered/);
  expect(text).toBeInTheDocument();
});
