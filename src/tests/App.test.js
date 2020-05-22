import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('renders a heading with the text `Pokédex`', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('Verificando link About', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const pageAbout = getByText('About');
  expect(pageAbout).toBeInTheDocument();

  fireEvent.click(pageAbout);

  const pathAbout = history.location.pathname;
  expect(pathAbout).toBe('/about');

  const aboutPokedex = getByText('About Pokédex');
  expect(aboutPokedex).toBeInTheDocument();
});

test('Verificando link Favorites', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const pageFavorites = getByText('Favorite Pokémons');
  expect(pageFavorites).toBeInTheDocument();

  fireEvent.click(pageFavorites);

  const pathFavorites = history.location.pathname;
  expect(pathFavorites).toBe('/favorites');
});

test('Verificando link Home', () => {
  const { getByText, history } = renderWithRouter(<App />);

  const pageHome = getByText('Home');
  expect(pageHome).toBeInTheDocument();

  fireEvent.click(pageHome);

  const pathHome = history.location.pathname;
  expect(pathHome).toBe('/');
});

test('Verificar se uma URL desconhecida exibe a paǵina Not Found', () => {
  const { getByText, history } = renderWithRouter(<App />);

  history.push('/pagina/quenaoexiste');
  const notFound = getByText('Page requested not found');

  expect(notFound).toBeInTheDocument();
});
