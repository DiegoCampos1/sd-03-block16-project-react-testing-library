import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('tests About.js', () => {
  test('shows About Pokédex page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    const heading = getByText('About Pokédex');

    expect(heading).toBeInTheDocument();
  });

  test('About Pokédex has 2 `p` tags', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    const paragraphs = container.querySelectorAll('p');

    expect(paragraphs.length).toBe(2);
  });

  test('About Pokédex has 2 `p` tags', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    const img = container.querySelector('img');

    expect(img.src).toBe(
      'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
