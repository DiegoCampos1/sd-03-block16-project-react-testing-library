import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('NotFound.js component tests', () => {
  test('NotFound page renders Pokédex information in heading element', () => {
    const { getByRole, getByText, getByLabelText } = render(<NotFound />);
    const heading = getByRole('heading');
    const headingEmoji = getByLabelText('Crying emoji');
    const headingText = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
    expect(headingEmoji).toBeInTheDocument();
    expect(headingText).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('NotFound page render img element with correct src', () => {
    const { getByAltText } = render(<NotFound />);
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
