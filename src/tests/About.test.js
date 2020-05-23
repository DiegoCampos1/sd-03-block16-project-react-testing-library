import React from 'react';
import { render } from '@testing-library/react'; // render in a container x
import About from '../components/About';

describe('file About.js', () => {
  test('h2 heading with About Pokédex text', () => {
    const { getByText } = render(<About />);
    const h2Heading = getByText('About Pokédex');
    expect(h2Heading).toBeInTheDocument();
    expect(h2Heading.tagName).toBe('H2');
  });

  test('Holding 2 paragraphs with Pokédex text', () => {
    render(<About />);
    const twoParagraphs = document.querySelectorAll('p');
    expect(twoParagraphs.length).toBe(2);
  });

  test('Pokédex image', () => {
    const { getByAltText } = render(<About />);
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
