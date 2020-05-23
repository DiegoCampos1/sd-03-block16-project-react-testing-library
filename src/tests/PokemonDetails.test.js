import React from 'react';
import {
  render, fireEvent,
} from '@testing-library/react';
import pokemons from '../data';
import { PokemonDetails } from '../components';
import {
  readFavoritePokemonIds,
  updateFavoritePokemons,
} from '../services/pokedexService';


test('product details', () => {
  const {
    name, id, foundAt, summary,
  } = pokemons[0];
  const {
    getByText, queryByText, getAllByRole, getByRole,
  } = render(
    <PokemonDetails
      isPokemonFavoriteById={false}
      match={{ params: { id } }}
      pokemons={pokemons}
      onUpdateFavoritePokemons={(pokemonId, isFavorite) => (
        updateFavoritePokemons(pokemonId, isFavorite)
      )}
    />,
  );

  const title = getByText(`${name} Details`);
  expect(title).toBeInTheDocument();

  const link = queryByText('More details');
  expect(link).toBeFalsy();

  const summaryTitle = getByText('Summary');
  expect(summaryTitle.nodeName).toBe('H2');

  const summaryText = getByText(summary);
  expect(summaryText).toBeInTheDocument();

  const mapSec = getAllByRole('region')[getAllByRole('region').length - 1];
  const sectile = mapSec.querySelector('h2');
  expect(sectile).toBeInTheDocument();
  expect(sectile).toHaveTextContent(`Game Locations of ${name}`);

  const locationFather = mapSec.children[mapSec.childElementCount - 1];
  expect(locationFather.children).toHaveLength(foundAt.length);

  for (let i = 0; i < locationFather.childElementCount; i += 1) {
    const location = locationFather.children[i];
    const locationImg = location.querySelector('img');
    const locationTitle = location.querySelector('p');
    expect(locationImg).toBeInTheDocument();
    expect(locationTitle).toBeInTheDocument();

    expect(locationImg).toHaveAttribute('src', foundAt[i].map);
    expect(locationImg).toHaveAttribute('alt', `${name} location`);
    expect(locationTitle).toHaveTextContent(foundAt[i].location);
  }

  const forms = getByRole('form');
  const label = forms.querySelector('label');
  expect(label).toHaveTextContent('Pokémon favoritado?');

  const checkbox = getByRole('checkbox');
  expect(readFavoritePokemonIds()).toHaveLength(0);
  fireEvent.click(checkbox);
  expect(readFavoritePokemonIds()).toHaveLength(1);
  expect(readFavoritePokemonIds()[0]).toBe(id);

  fireEvent.click(checkbox);
  expect(readFavoritePokemonIds()).toHaveLength(0);
});
