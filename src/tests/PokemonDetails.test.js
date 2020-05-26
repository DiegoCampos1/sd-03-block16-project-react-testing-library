import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { PokemonDetails } from '../components';
import renderWithRouter from './Services';
import pokemons from '../data';
import App from '../App';

describe('7. Testes do arquivo PokemonDetails.js', () => {
  const favoritesById = { 4: false, 10: false, 78: false, 143: false, 148: false, 151: true };
  const match = { params: { id: 151 } };

  test('7.1 - Deve conter mais informações sobre apenas o pokémon selecionado;', () => {
    const { getAllByTestId, getByText } = render((
      <PokemonDetails
        match={match}
        pokemons={pokemons}
        isPokemonFavoriteById={favoritesById}
        onUpdateFavoritePokemons={() => true}
      />
    ));
    expect(getByText('Mew Details')).toBeInTheDocument();
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('7.2 - A página deve conter um texto <name> Details, onde <name> é o nome do pokémon;', () => {
    const { getByText } = render((
      <PokemonDetails
        match={match}
        pokemons={pokemons}
        isPokemonFavoriteById={favoritesById}
        onUpdateFavoritePokemons={() => true}
      />
    ));
    const pokeDetails = pokemons.find((p) => (p.id === match.params.id));
    expect(getByText(`${pokeDetails.name} Details`)).toBeInTheDocument();
  });

  test('7.3 - O pokémon exibido na página de detalhes não deve conter um link de navegação para exibir detalhes deste pokémon;', () => {
    const { queryByText, queryByRole } = render((
      <PokemonDetails
        match={match}
        pokemons={pokemons}
        isPokemonFavoriteById={favoritesById}
        onUpdateFavoritePokemons={() => true}
      />
    ));
    expect(queryByText('More Details')).not.toBeInTheDocument();
    expect(queryByRole('Link')).not.toBeInTheDocument();
  });

  test('7.4 - A seção de detalhes deve conter um heading h2 com o texto Summary;', () => {
    const { getAllByRole } = render((
      <PokemonDetails
        match={match}
        pokemons={pokemons}
        isPokemonFavoriteById={favoritesById}
        onUpdateFavoritePokemons={() => true}
      />
    ));
    expect(getAllByRole('heading')[1]).toHaveTextContent('Summary');
  });

  test('7.5 - A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado', () => {
    const { getAllByRole, getByText } = render((
      <PokemonDetails
        match={match}
        pokemons={pokemons}
        isPokemonFavoriteById={favoritesById}
        onUpdateFavoritePokemons={() => true}
      />
    ));
    expect(getAllByRole('region')[1]).toBeInTheDocument();
    expect(getByText(/Apparently, it appears only to those/i)).toBeInTheDocument();
  });

  test('7.6 - A página de detalhes deve exibir uma seção com os mapas com as localizações do pokémon', () => {
    const { getAllByRole, getByText, getAllByAltText } = render((
      <PokemonDetails
        match={match}
        pokemons={pokemons}
        isPokemonFavoriteById={favoritesById}
        onUpdateFavoritePokemons={() => true}
      />
    ));
    const pokeDetails = pokemons.find((p) => (p.id === match.params.id));
    // A seção de detalhes deve conter um heading h2 com o te xto Game Locations of
    // <name>, onde <name> é o nome do pokémon exibido;
    const header3 = getAllByRole('heading')[2];
    expect(header3.tagName).toBe('H2');
    expect(header3).toHaveTextContent(`Game Locations of ${pokeDetails.name}`);
    // A seção de detalhes deve exibir todas as localizações do pokémon;
    // Cada localização deve exibir o nome da localização e uma imagem do mapa da localização;
    const pokeLocations = pokeDetails.foundAt;
    pokeLocations.forEach((loc, index) => {
      expect(getByText(loc.location).toBeInTheDocument);
      expect(getAllByAltText(`${pokeDetails.name} location`)[index]).toBeInTheDocument();
      // A imagem da localização deve ter um atributo src com a URL da localização;
      // A imagem da localização deve ter um atributo alt com o texto <name>
      // location, onde <name> é o nome do pokémon.
      expect(getAllByRole('img')[index + 2].src).toBe(loc.map);
      expect(getAllByRole('img')[index + 2].alt).toBe(`${pokeDetails.name} location`);
    });
  });

  test('7.7 - A página de detalhes deve permitir favoritar um pokémon', () => {
    // A página deve conter um checkbox que permita favoritar um pokémon. Cliques
    // no checkbox devem, alternadadamente, adicionar e remover o pokémon da lista de favoritos;
    // O label do checkbox deve ser `Pokémon favoritado?`.
    const { queryByAltText, getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    const pokeFav = getByText(/favoritado/i);
    expect(pokeFav).toHaveTextContent('Pokémon favoritado');
    fireEvent.click(pokeFav);
    expect(queryByAltText(/is marked as favorite/i)).toBeInTheDocument();
    fireEvent.click(pokeFav);
    expect(queryByAltText(/is marked as favorite/i)).not.toBeInTheDocument();
  });
});
