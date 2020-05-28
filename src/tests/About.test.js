import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Tests of the About file', () => {
  test('The About page should have a heading text', () => {
    const { getByText } = render(<About />);
    const titleAbout = getByText('About Pokédex');
    expect(titleAbout).toBeInTheDocument();
  });

  test('The About page should have two paragraphs talking about pokedex', () => {
    const { getByText } = render(<About />);
    const paragraphOne = getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons');
    const paragraphTwo = getByText('One can filter Pokémons by type, and see more details for each one of them');
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('The About page should have a specific image', () => {
    const SRC = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { getByAltText } = render(<About />);
    const pokedexImage = getByAltText('Pokédex');
    expect(pokedexImage.src).toBe(SRC);
  });
});

