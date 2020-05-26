import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from './Services';
import App from '../App';
import pokemons from '../data';

describe('5. Testes do arquivo Pokedex.js', () => {
  afterEach(cleanup);

  test('5.1 - Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(<App />);
    // O botão deve conter o texto Próximo pokémon
    const botProx = getByTestId('next-pokemon');
    expect(botProx).toHaveTextContent('Próximo pokémon');
    let pokeAtual = getByTestId('pokemon-name');
    fireEvent.click(botProx);
    let proxPokemon = getByTestId('pokemon-name');
    // while (proxPokemon != /Pikachu/) {
    pokeAtual = proxPokemon;
    // Cliques sucessivos no botão devem mostrar o próximo pokémon da lista;
    fireEvent.click(botProx);
    proxPokemon = getByTestId('pokemon-name');
    expect(proxPokemon).not.toHaveTextContent(pokeAtual);
    //  }
  });

  test('5.2 - A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getByText, getAllByText } = renderWithRouter(<App />);
    const heading = getByText('Encountered pokémons');

    expect(getAllByText('More details').length).toBe(1);
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });

  test('5.3 - A Pokédex deve conter botões de filtro', () => {
    const { getByText, getByTestId, getAllByTestId } = renderWithRouter(<App />);
    // A partir da seleção de um botão de tipo, a Pokédex deve circular
    // somente pelos pokémons daquele tipo;
    const buttonTypes = getAllByTestId('pokemon-type-button');
    fireEvent.click(buttonTypes[4]);
    expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');
    fireEvent.click(getByTestId('next-pokemon'));
    expect(getByTestId('pokemonType')).toHaveTextContent('Psychic');

    // 5.4 - A Pokédex deve conter um botão para resetar o filtro
    fireEvent.click(getByText('All'));
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
  });

  test('5.5 - A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonTypes = getAllByTestId('pokemon-type-button');
    expect(buttonTypes.length).toBe(7);
    expect(buttonTypes[0]).toHaveTextContent('Electric');
    expect(buttonTypes[3]).toHaveTextContent('Poison');
  });

  test('5.6 - O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByTestId, getAllByText } = renderWithRouter(<App />);
    const butNext = (getByTestId('next-pokemon'));
    pokemons.forEach((poke) => {
      const tyPoke = getAllByText(poke.type)[0];
      const lisType = pokemons.filter((pokemon) => pokemon.type === tyPoke);
      if ((lisType.length) > 1) {
        expect((butNext).not.hasAttribute('disabled'));
      } else {
        expect((butNext).hasAttribute('disabled'));
      }
    });
  });
});
