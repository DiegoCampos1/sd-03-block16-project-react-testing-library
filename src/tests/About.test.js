import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testes do arquivo About.js', () => {
  test('Componente deve conter os textos...', () => {
    const { getByText } = renderWithRouter(<About />);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
    const paragraph1 = getByText(
      'This application simulates a Pokédex, a digital encliclopedia containing all Pokémons',
    );
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(paragraph2).toBeInTheDocument();
  });

  test('Componente deve conter a imagem especifica', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const altImg = getByAltText('Pokédex');
    expect(altImg).toBeInTheDocument();
    const image = altImg.src;
    expect(image).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
