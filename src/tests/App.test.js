import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
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

test('Renders Pokedex main page when route path is `/`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>,
  );
  const home = getByText('Home');
  expect(home).toBeInTheDocument();

  const about = getByText('About');
  expect(about).toBeInTheDocument();

  const favoritePokemons = getByText('Favorite Pokémons');
  expect(favoritePokemons).toBeInTheDocument();
});
