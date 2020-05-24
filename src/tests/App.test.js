import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testes app.tests.js', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('Shows the home when the router is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const LinkHome = getByText(/Home/i);
    fireEvent.click(LinkHome);
    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('Show the about', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const LinkAbout = getByText(/About/i);
    fireEvent.click(LinkAbout);
    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('Show the Favorite', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );
    const LinkFavorite = getByText(/Favorite Pokémons/i);
    fireEvent.click(LinkFavorite);
    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('Show error', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/naotem']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
