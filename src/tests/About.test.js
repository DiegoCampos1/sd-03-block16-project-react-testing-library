import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('Test 1 - about page should display info about pokedex', () => {
  it('1 - heading <h2> with text about pokedex', () => {
    const { queryByText } = renderWithRouter(<App />, { route: '/about' });
    const heading = queryByText(/About Pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });
  it('1.2 - two paragraphs with text pokedex', () => {
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
  it('1.3 - should have right image path', () => {
    const { getByAltText } = renderWithRouter(<App />, { route: '/about' });
    expect(getByAltText(/Pokédex/i).src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
