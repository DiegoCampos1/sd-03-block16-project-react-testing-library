import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('test file App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('check if button `home` exist and redirect to path `/`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLinkText = getByText(/home/i);
    expect(homeLinkText).toBeInTheDocument();
    fireEvent.click(homeLinkText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('check if button `about` exist and redirect to path `/about`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const aboutLinkText = getByText(/about/i);
    expect(aboutLinkText).toBeInTheDocument();
    fireEvent.click(aboutLinkText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('check if button `Favorite Pokémons` exist and redirect to path `/favorites`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const favoriteLinkText = getByText(/favorite pokémons/i);
    expect(favoriteLinkText).toBeInTheDocument();
    fireEvent.click(favoriteLinkText);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
});
