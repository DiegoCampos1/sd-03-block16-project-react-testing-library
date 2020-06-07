import React from 'react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Component About tests', () => {
  test('Verify information in the About page', () => {
    const { getByText } = renderWithRouter(<About />, { route: '/about' });
    const heading = getByText('About Pokédex');

    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('Verify paragraph amount in the About page', () => {
    const { container } = renderWithRouter(<About />, { route: '/about' });
    const paragraph = container.querySelectorAll('P');

    expect(paragraph.length).toBe(2);
  });

  test('Verify the img tag and the source in the About page', () => {
    const { container } = renderWithRouter(<About />, { route: '/about' });
    const img = container.querySelector('IMG');
    const url = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(url);
  });
});
