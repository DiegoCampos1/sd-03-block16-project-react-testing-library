import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('Tests About', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter initialEntries={[{ pathname: '/about' }]}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('About Pokédex')).toBeInTheDocument();
  const p1 = getByText(/This application simulates a Pokédex,/);
  const p2 = getByText(/One can filter Pokémons by type/);
  expect(p1).toBeInTheDocument();
  expect(p2).toBeInTheDocument();
  const image = getByRole('img');
  expect(image.src).toMatch('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
