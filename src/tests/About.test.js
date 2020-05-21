import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('About.js component tests', () => {
  test('About page renders Pokédex information in heading element', () => {
    const { getByRole, getByText } = render(<About />);
    const heading = getByRole('heading');
    const headingText = getByText(/about pokédex/i);
    expect(heading).toBeInTheDocument();
    expect(headingText).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('About page render two <p> elements', () => {
    const { queryAllByRole } = render(<About />);
    const paragraphs = queryAllByRole('region');
    expect(paragraphs.length).toBe(2);
  });

  test('About page render img element with correct src', () => {
    const { getByRole } = render(<About />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
