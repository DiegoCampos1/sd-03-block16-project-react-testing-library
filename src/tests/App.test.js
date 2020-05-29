import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

afterEach(cleanup);

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('showing the Pokédex on route / ', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const textBasicRoute = getByText('Encountered pokémons');
  expect(textBasicRoute).toBeInTheDocument();
});

test('Home, About and Favorite navigation routes', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeRoute = getByText(/Home/i);
  expect(homeRoute).toBeInTheDocument();
  expect(homeRoute).toHaveAttribute('href', '/');

  const aboutRoute = getByText(/About/i);
  expect(aboutRoute).toBeInTheDocument();
  expect(aboutRoute).toHaveAttribute('href', '/about');
  fireEvent.click(aboutRoute);
  const aboutText = getByText(/About Pokédex/i);
  expect(aboutText).toBeInTheDocument();

  const favoritePokemomRoute = getByText(/Favorite/i);
  expect(favoritePokemomRoute).toBeInTheDocument();
  expect(favoritePokemomRoute).toHaveAttribute('href', '/favorites');
  fireEvent.click(favoritePokemomRoute);
  const FavoriteText = getByText('Favorite Pokémons');
  expect(FavoriteText).toBeInTheDocument();
});

test('Nonexistent Page ', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/forcedError' });
  const ErrorPage = getByText(/not found/i);
  expect(ErrorPage).toBeInTheDocument();
});
