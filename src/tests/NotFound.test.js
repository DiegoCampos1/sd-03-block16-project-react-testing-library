import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound.js tests', () => {
  test('Renders heading with correct tag and text', () => {
    const { getByText } = render(<NotFound />);
    const heading = getByText(/Page requested not found/i);
    expect(getByText(/😭/i)).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('Renders correct image', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toBe(src);
  });
});
