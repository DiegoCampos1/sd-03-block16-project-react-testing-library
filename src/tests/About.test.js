import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('all tests About.js', () => {
  test('shows About Pokedex page', () => {
    const { getByText } = renderWithRouter(<About />, { route: '/about' });

    const heading = getByText('About Pokédex');

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('About Pokedex page with 2 p tags', () => {
    const { container } = renderWithRouter(<About />, { route: '/about' });

    const paragraphs = container.querySelectorAll('P');

    expect(paragraphs.length).toBe(2);
  });

  test('About Pokedex page with img tag', () => {
    const { container } = renderWithRouter(<About />, { route: '/about' });

    const img = container.querySelector('IMG');

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
