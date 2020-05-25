import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('About.js tests', () => {
  test('Renders h2 heading with correct text', () => {
    const { getByText } = render(<About />);
    const h2element = getByText(/About Pokédex/i);
    expect(h2element).toBeInTheDocument();
    expect(h2element.tagName).toBe('H2');
  });

  test('About page contains two <p> elements', () => {
    render(<About />);
    const pElements = document.getElementsByTagName('p');
    expect(pElements.length).toBe(2);
  });

  test('About page contains image with correct source', () => {
    const { getByAltText } = render(<About />);
    const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(getByAltText(/Pokédex/i).src).toBe(src);
  });
});
