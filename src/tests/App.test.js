import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';


describe('Testes do arquivo App.js', () => {
  test('renders a reading with the text `Pokédex`', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const pathname = history.location.pathname;
    expect(pathname).toBe('/');
    const pokedexText = getByText('Encountered pokémons');
    expect(pokedexText).toBeInTheDocument();
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  test('Testando conjunto de links', () => {
    const { getByText, history } = renderWithRouter(<App />);
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
    const aboutLink = getByText('About');
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = getByText('Favorite Pokémons');
    expect(favoriteLink).toBeInTheDocument();
    fireEvent.click(homeLink);
    let pathname = history.location.pathname;
    expect(pathname).toBe('/');
    fireEvent.click(aboutLink);
    pathname = history.location.pathname;
    expect(pathname).toBe('/about');
    fireEvent.click(favoriteLink);
    pathname = history.location.pathname;
    expect(pathname).toBe('/favorites');
  });

  test('Testando url inexistente', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/nuncanemvi');
    const notFound = getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});

