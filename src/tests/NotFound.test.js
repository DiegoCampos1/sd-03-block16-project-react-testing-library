import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test of the NotFound page', () => {
  afterEach(cleanup);
  test('Testing if there is a h2 title in the page', () => {
    const { getByText } = render(<NotFound />);
    const notFoundTitle = getByText(/Page requested not found/i);
    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Testing if there is a image in the page', () => {
    const { getByAltText } = render(<NotFound />);
    const srcNotFoundImg = getByAltText('Pikachu crying because the page requested was not found');
    expect(srcNotFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
