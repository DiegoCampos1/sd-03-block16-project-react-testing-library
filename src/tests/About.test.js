import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

const renderWithMemoryRouter = (component, initialHistoy) => {
  return (render(
    <MemoryRouter initialEntries={initialHistoy}>
      {component}
    </MemoryRouter>
  ));
}

describe('About', () => {
  afterEach(cleanup);

  describe('information about pokedex', () => {
    test('should exist', () => {
      const { getByText } = render(<About />);
      const aboutText1 = 'This application simulates a Pokédex, ' +
        'a digital encliclopedia containing all Pokémons';
      const aboutText2 = 'One can filter Pokémons by type, ' +
        'and see more details for each one of them';
      expect(getByText(aboutText1)).toBeInTheDocument();
      expect(getByText(aboutText2)).toBeInTheDocument();
    });

    test('should have an h2 heading with the About Pokédex text', () => {
      const { getByText } = render(<About />);
      const h2 = getByText('About Pokédex');
      const h2Keys = Object.keys(h2);
      expect(h2).toBeInTheDocument();
      expect(h2[h2Keys[0]].type).toBe('h2');
    });
  });
});