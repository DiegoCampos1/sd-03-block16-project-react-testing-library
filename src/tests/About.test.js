import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('test file About.js', () => {
  test('Contain a h2 heading with "About Pokédex" text', () => {
    const { getByText } = render(<About />);
    const heading = getByText('About Pokédex');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('Contain 2 paragraphs about Pokédex', () => {
    render(<About />);
    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs.length).toBe(2);
  });

  test('Contain Pokédex image', () => {
    const { getByAltText } = render(<About />);
    const img = getByAltText('Pokédex');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
