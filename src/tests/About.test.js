import React from 'react';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

describe('Informações sobre a pokedex', () => {
  afterEach(cleanup);

  test('Contem um Header', () => {
    const { getByText } = render(<About />);

    const heading = getByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Contem dois parágrafos', () => {
    const { getAllByRole } = render(<About />);

    const paragraphs = getAllByRole('region');
    expect(paragraphs).toHaveLength(2);
  });

  test('Contem imagem', () => {
    const { getByRole } = render(<About />);

    const image = getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
