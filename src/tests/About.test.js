import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

test('A página deve conter um heading h2 com o texto About Pokédex.', () => {
  const { queryAllByRole, getByText } = render(<About />);
  const headH2 = queryAllByRole('heading');
  const headH2Text = getByText('About Pokédex');
  expect(headH2).toHaveLength(1);
  expect(headH2Text).toBeInTheDocument();
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex.', () => {
  const { queryAllByRole } = render(<About />);
  const paragraph = queryAllByRole('region');
  expect(paragraph).toHaveLength(2);
  expect(paragraph).not.toBeNull();
});

test('A página deve conter a seguinte imagem de uma Pokédex: https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
  const { queryByAltText } = render(<About />);
  const pokedex = queryByAltText('Pokédex');
  expect(pokedex.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
