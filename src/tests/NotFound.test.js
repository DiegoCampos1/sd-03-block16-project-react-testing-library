import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('404 not found', () => {
  const { getByText } = render(<NotFound />);
  const heading = getByText('Page requested not found');
  expect(heading).toBeInTheDocument();
  expect(heading.nodeName).toBe('H2');

  const img = document.querySelector('img');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
