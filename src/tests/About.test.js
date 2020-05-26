import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('', () => {
  const { getByText, getByRole } = render(
    <MemoryRouter initialEntries={[{ pathname: '/about' }]}>
      <App />
    </MemoryRouter>,
  );
  expect(getByText('About Pokédex')).toBeInTheDocument();
  const n1 = getByText(/Simula um Pokédex,/);
  const n2 = getByText(/filtra Pokémons por tipo/);

  expect(n1).toBeInTheDocument();

  expect(n2).toBeInTheDocument();

  const imagem = getByRole('img');
  expect(imagem.src).toMatch('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
