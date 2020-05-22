import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {
  render, cleanup, fireEvent, waitForDomChange,
} from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';
import { Pokedex, FavoritePokemons } from '../components';
import pokemons from '../mockPokemons';
import { firstLocations, nextLocations } from '../mockLocations';
import { generations, generation1 } from '../mockGenerations';

afterEach(cleanup);


describe('Test 21 - about page should display info about pokedex', () => {
  it('21.1 - heading <h2> with text about pokedex', () => {
    const { queryByText } = renderWithRouter(<App />, { route: '/about' });
    const heading = queryByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });
  it('21.2 - two paragraphs with text pokedex', () => {
    const { queryByText } = renderWithRouter(<App />, { route: '/about' });
    const heading = queryByText(/About Pokédex/i);
    expect(heading.tagName).toBe('H2');
    const description = heading.nextSibling;
    let tagPLength = 0;
    description.childNodes.forEach((element) => {
      if (element.tagName === 'P') {
        tagPLength += 1;
        expect(element.tagName).toBe('P');
      }
    });
    expect(tagPLength).toEqual(2);
  });
  it('21.3 - should have right image path', () => {
    const { getByAltText } = renderWithRouter(<App />, { route: '/about' });
    expect(getByAltText(/Pokédex/i).src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
