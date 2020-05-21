import React from 'react';
import { render, cleanup } from '@testing-library/react';

import NotFound from '../components/NotFound';

const takeType = (element) => Object.values(element)[0].type;

describe('Not found', () => {
  afterEach(cleanup);

  test('have message Page requested not found 😭', () => {
    const { getByText } = render(<NotFound />);
    const h2 = getByText('Page requested not found');
    const span = getByText('😭');

    expect(h2).toBeInTheDocument();
    expect(span).toBeInTheDocument();

    expect(takeType(h2)).toBe('h2');
    expect(takeType(span)).toBe('span');

    expect(h2).toContainElement(span);
  });

  test('should show an specific image', () => {
    const { getByAltText } = render(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', src);
  });
});
