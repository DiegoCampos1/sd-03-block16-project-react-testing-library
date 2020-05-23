import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './testRenderService';
import NotFound from '../components/NotFound';

describe('Testing NotFound file', () => {
  afterEach(cleanup);
  test('Page request not found', () => {
    const { getByRole, getByText, getByAltText } = renderWithRouter(<NotFound />);

    const containH2 = getByRole('heading');
    expect(containH2).toBeInTheDocument();

    const textH2 = getByText('Page requested not found');
    expect(textH2).toBeInTheDocument();

    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
