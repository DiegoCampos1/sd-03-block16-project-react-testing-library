import React from 'react';
import { render } from '@testing-library/react';
import { About } from '../components';

test('informations about the pokedex', () => {
  const { getByText, getByRole } = render(<About />);
  const about = getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons');
  expect(about).toBeInTheDocument();
  const title = getByText('About Pokédex');
  expect(title).toBeInTheDocument();
  expect(title.nodeName).toBe('H2');
  const paragraphs = document.querySelectorAll('p');
  expect(paragraphs.length).toBe(2);
  const img = getByRole('img');
  expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
