import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './testRenderService';
import About from '../components/About';


describe('Testing About file', () => {
  afterEach(cleanup);
  test('pag about display information on Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedex = getByText('This application simulates a Pokédex, a digital encliclopedia containing all Pokémons');

    expect(pokedex).toBeInTheDocument();
  });

  test('contain heading with text About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const aboutPokedexText = getByText('About Pokédex');

    expect(aboutPokedexText).toBeInTheDocument();
  });

  test('contain paragraph on Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph = document.querySelectorAll('p');
    expect(paragraph.length).toBe(2);
  });

  test('testing if it contains image Pokédex', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const imagePokedex = getByAltText('Pokédex');

    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
