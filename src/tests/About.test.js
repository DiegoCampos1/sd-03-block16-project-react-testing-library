import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

describe('Informações sobre a pokedex', () => {
  test('Contem um Header', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Contem dois parágrafos', () => {
    const { getAllByRole } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    const paragraphs = getAllByRole('region');
    expect(paragraphs).toHaveLength(2);
  });

  test('Contem imagem', () => {
    const { getByRole } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
