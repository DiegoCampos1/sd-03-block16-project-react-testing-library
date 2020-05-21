import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { NotFound } from '../components';

afterEach(cleanup);

describe('Testes do arquivo NotFound.js', () => {
  it('A página deve conter um heading h2 com o texto Page requested not found 😭', () => {
    const { getByText, getByAltText } = render(<NotFound />);
    const notFound = getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();

    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(img.src).toEqual(imgSrc);
  });
});
