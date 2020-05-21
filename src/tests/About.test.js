import React from 'react';
import { cleanup, render } from '@testing-library/react';
import About from '../components/About';

const takeType = (element) => Object.values(element)[0].type;

describe('About', () => {
  afterEach(cleanup);

  describe('information about pokedex', () => {
    test('should exist', () => {
      const { getByText } = render(<About />);
      const aboutText1 = getByText('This application simulates a Pokédex, ' +
        'a digital encliclopedia containing all Pokémons');
      const aboutText2 = getByText('One can filter Pokémons by type, ' +
        'and see more details for each one of them');

      expect(aboutText1).toBeInTheDocument();
      expect(aboutText2).toBeInTheDocument();

      expect(takeType(aboutText1)).toBe('p');
      expect(takeType(aboutText2)).toBe('p');
    });

    test('should have an h2 heading with the About Pokédex text', () => {
      const { getByText } = render(<About />);
      const h2 = getByText('About Pokédex');
      expect(h2).toBeInTheDocument();
      expect(takeType(h2)).toBe('h2');
    });

    test('if have an imgae with the correct src', () => {
      const { getByAltText } = render(<About />);
      const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86' +
        '/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      expect(getByAltText('Pokédex')).toBeInTheDocument();
      expect(getByAltText('Pokédex')).toHaveAttribute('src', src);
    });
  });
});
