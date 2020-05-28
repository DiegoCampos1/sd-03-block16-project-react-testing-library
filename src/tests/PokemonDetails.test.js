import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

afterEach(cleanup);

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Testes do arquivo PokemonDetails.js', () => {
  it('Deve conter mais informações sobre apenas o pokémon selecionado', () => {
    const { getByText, queryByText, getAllByAltText } = renderWithRouter(<App />);

    const pokemonLink = queryByText(/More details/i);
    expect(pokemonLink).toBeInTheDocument();
    expect(pokemonLink).toHaveAttribute('href', '/pokemons/25');
    fireEvent.click(pokemonLink);
    const clickDetails = getByText(/Pikachu Details/i);
    expect(clickDetails).toHaveTextContent('Pikachu Details');

    const notPokemonLink = queryByText(/More details/i);
    expect(notPokemonLink).not.toBeInTheDocument();

    const sumaryText = queryByText(/Summary/i);
    expect(sumaryText).toBeInTheDocument();

    const resumeText = queryByText(/This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat./i);
    expect(resumeText).toBeInTheDocument();

    const gameLocations = queryByText(/Game Locations of Pikachu/i);
    expect(gameLocations).toBeInTheDocument();

    const KantoViridianForest = queryByText(/Kanto Viridian Forest/i);
    expect(KantoViridianForest).toBeInTheDocument();
    const KantoRoute = getAllByAltText(/Pikachu location/i)[0];
    expect(KantoRoute).toBeInTheDocument();
    expect(KantoRoute.src).toEqual('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');

    const KantoPowerPlant = queryByText(/Kanto Power Plant/i);
    expect(KantoPowerPlant).toBeInTheDocument();
    const CeladonCity = getAllByAltText(/Pikachu location/i)[1];
    expect(CeladonCity).toBeInTheDocument();
    expect(CeladonCity.src).toEqual('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const Pokemonfavoritado = queryByText(/Pokémon favoritado?/i);
    expect(Pokemonfavoritado).toBeInTheDocument();
  });
});
