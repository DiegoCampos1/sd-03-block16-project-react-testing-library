import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('tests App.js', () => {
  test('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('redirect to `/` when click in the link Home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const home = getByText('Home');

    fireEvent.click(home);

    expect(getByText('Pokédex')).toBeInTheDocument();
  });

  test('redirect to `/about` when click in the link About', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const about = getByText('About');

    fireEvent.click(about);

    expect(getByText('About Pokédex')).toBeInTheDocument();
  });

  test('redirect to `/favorite` when click in the link Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const favorite = getByText('Favorite Pokémons');

    fireEvent.click(favorite);

    expect(getByText('Favorite pokémons')).toBeInTheDocument();
  });

  test('redirect to Not Found page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/not-found']}>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
});
