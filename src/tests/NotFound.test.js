import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import Notfound from '../components/NotFound';

describe('Tests Requisito 4', () => {
  test('Notfound', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <Notfound />
      </MemoryRouter>,
    );

    const notfound = getByText(/Page requested not found/i);
    expect(notfound).toBeInTheDocument();
  });

  test('Show image', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about']}>
        <Notfound />
      </MemoryRouter>,
    );

    const aboutIMG = container.querySelector('img');
    expect(aboutIMG.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
