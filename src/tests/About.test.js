import React from 'react';
// import { render, fireEvent, getAllByText, queryByText } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('Página about deve exibir infos sobre Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);

  const heading = getByText('About Pokédex');
  expect(heading).toBeInTheDocument();
});

test('About deve conter 2 parágrafos', () => {
  // const { getByText } =
  renderWithRouter(<About />);

  const parag = document.querySelectorAll('p');

  expect(parag.length).toBe(2);
});

test('About deve conter uma imagem', () => {
  const { getByAltText } = renderWithRouter(<About />);

  const img = getByAltText('Pokédex');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
