import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Have Link Home in navBar', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = getByText('Home');
  fireEvent.click(homeLink);
  expect(getByText(/Encountered pokémons/i));
});
test('should have About Link on home page and it redirects to About Page ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = getByText(/About/);
  fireEvent.click(aboutLink);
  expect(getByText(/About Pokédex/i));
});

test('should have Favorite Pokemons Link on home page and it redirects to Favorites Page ', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favoritesLink = getByText(/Favorite Pokémons/);
  fireEvent.click(favoritesLink);
  expect(getByText(/Favorite pokémons/));
});
