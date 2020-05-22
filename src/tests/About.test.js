import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import About from '../components/About';

describe('Tests Requisito 2', () => {
  test('Show about information pokédex', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    const aboutTitle = getByText('About Pokédex');
    expect(aboutTitle).toBeInTheDocument();
  });

  test('Show about information pokédex', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    const aboutP = container.querySelectorAll('p');
    expect(aboutP.length).toBe(2);
  });

  test('Show image with Pokemon', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/about']}>
        <About />
      </MemoryRouter>,
    );

    const aboutIMG = container.querySelector('img');
    expect(aboutIMG.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
