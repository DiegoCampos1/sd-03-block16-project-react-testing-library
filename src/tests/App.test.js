import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Routes', () => {
  afterEach(cleanup);
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });
  test('navigating from home to home page', () => {
    const { getByText, queryByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    const homeTitle = queryByText('Encountered pokémons');
    expect(homeTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/');
  });

  test('navigating from home to about page', () => {
    const { getByText, queryByText, history } = renderWithRouter(<App />);
    const aboutLink = getByText('About');
    fireEvent.click(aboutLink);
    const aboutTitle = queryByText('About Pokédex');
    expect(aboutTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/about');
  });

  test('navigating from home to favorites page', () => {
    const { getByText, queryByText, history } = renderWithRouter(<App />);
    const favoriteLink = getByText('Favorite Pokémons');
    fireEvent.click(favoriteLink);
    const favoriteTitle = queryByText('Favorite pokémons');
    expect(favoriteTitle).toBeInTheDocument();
    expect(history.location.pathname).toBe('/favorites');
  });

  test('navigating from home to not found page', () => {
    const { getByText, history } = renderWithRouter(<App />, { route: '/test' });
    const notFoundPage = getByText(/Page requested not found/i);
    expect(notFoundPage).toBeInTheDocument();
    expect(history.location.pathname).toBe('/test');
  });
});
