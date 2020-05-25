import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('FavoritePokemons.js tests', () => {
  test('Renders correct message when there are no favorites', () => {
    const { getByText } = render(<FavoritePokemons pokemons={[]} />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('Does not render cards of unfavorite pokemons', () => {
    const { queryByText } = render(<FavoritePokemons pokemons={[]} />);
    expect(queryByText(/More details/i)).not.toBeInTheDocument();
  });

  test('Renders all favorited pokemons', () => {
    const { getByText, queryByText } = renderWithRouter(<App />);
    let details = getByText(/More details/i);
    const home = getByText(/Home/i);
    const favPage = getByText(/Favorite Pokémons/i);

    fireEvent.click(details);

    let favorite = queryByText(/Pokémon favoritado?/i);

    fireEvent.click(favorite);
    fireEvent.click(home);

    const fireType = queryByText(/Fire/i);

    fireEvent.click(fireType);

    details = getByText(/More details/i);

    fireEvent.click(details);

    favorite = getByText(/Pokémon favoritado?/i);

    fireEvent.click(favorite);
    fireEvent.click(favPage);

    expect(getByText(/Pikachu/i)).toBeInTheDocument();
    expect(getByText(/Charmander/i)).toBeInTheDocument();
  });
});
