import React from 'react';
import { cleanup, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Not Found Page', () => {
  afterEach(cleanup);

  test('Contem heading', () => {
    const { getByText } = render(<NotFound />);

    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  test('Contem imagem', () => {
    const { getAllByRole } = render(<NotFound />);

    const image = getAllByRole('img')[1];
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
