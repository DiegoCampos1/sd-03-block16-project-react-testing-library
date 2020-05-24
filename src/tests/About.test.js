import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

test('About page shows Pokedex information', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const pokedexP1 = getByText(
    'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons',
  );
  const pokedexP2 = getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
  expect(pokedexP1).toBeInTheDocument();
  expect(pokedexP2).toBeInTheDocument();
});

test('About page title has `About Pokédex` text', () => {
  const { getByText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const pageTitle = getByText('About Pokédex');
  expect(pageTitle).toBeInTheDocument();
});

test('About page shows the right Pokédex image', () => {
  const { getByAltText } = render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );
  const img = getByAltText('Pokédex');
  const imageSource = img.src;
  expect(imageSource).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
