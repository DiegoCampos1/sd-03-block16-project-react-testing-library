import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import About from '../components/About';

afterEach(cleanup);

test('testing information about Pokedex', () => {
  const { getByText, getByRole, queryAllByRole } = renderWithRouter(<About />);

  const heading = getByRole('heading');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');

  const pokedexText = getByText('About Pokédex');
  expect(pokedexText).toBeInTheDocument();

  const paragraphs = queryAllByRole('region');
  expect(paragraphs.length).toBe(2);

  const img = getByRole('img');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
