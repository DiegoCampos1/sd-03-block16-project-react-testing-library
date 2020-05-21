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
  
    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  test('redirect to `/` when click in the link Home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>,
    );

    const home = getByText(/Home/i);

    fireEvent(home);
  
    expect(getByText(/Pokédex/i)).toBeInTheDocument();
  });

  test('redirect to `/about` when click in the link About', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/about']}>
        <App />
      </MemoryRouter>,
    );

    const about = getByText(/About/i);

    fireEvent(about);
  
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('redirect to `/favorite` when click in the link Favorite Pokémons', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/favorite']}>
        <App />
      </MemoryRouter>,
    );

    const favorite = getByText(/Favorite Pokémons/i);

    fireEvent(favorite);
  
    expect(getByText(/Favorite pokémons/i)).toBeInTheDocument();
  });

  test('redirect to Not Found page', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/not-found']}>
        <App />
      </MemoryRouter>,
    );
  
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
})
