import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import renderWithRouter from './Services';

describe('6. Testes do arquivo Pokemon.js', () => {
  const testPokemon = { name: 'Raichu', type: 'Electric', averageWeight: { value: '30.0', measurementUnit: 'kg' }, id: 26, image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_2c_026.png', moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Raichu_(Pok%C3%A9mon)' };

  test('6.1 - Deve ser retornado um card com as informações de determinado pokémon;', () => {
    const { getByTestId } = renderWithRouter(<Pokemon pokemon={testPokemon} />);
    // 6.2 -  O nome correto do pokémon deve aparecer na tela;
    expect(getByTestId('pokemon-name')).toHaveTextContent(testPokemon.name);
    expect(getByTestId('pokemonType')).toHaveTextContent(testPokemon.type);
    // 6.3 - O peso médio do pokémon deve ser exibido com um texto no formato Average
    // weight: <value> <measurementUnit>, onde <value> e <measurementUnit> são,
    // respectivamente, o peso médio do pokémon e sua unidade de medida;
    expect(getByTestId('pokemon-weight')).toHaveTextContent(`Average weight:${testPokemon.averageWeight.value}${testPokemon.averageWeight.measurementUnit}`);
  });

  test('6.4 - A imagem deve conter um atributo src com a URL da imagem do pokémon. A imagem deverá ter também um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;', () => {
    const { getByRole } = renderWithRouter(<Pokemon pokemon={testPokemon} />);
    const pokePic = getByRole('img');
    expect(pokePic.src).toBe(`${testPokemon.image}`);
    expect(pokePic.alt).toBe(`${testPokemon.name} sprite`);
  });

  test('6.5 - O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon. O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido;', () => {
    const { getByRole } = renderWithRouter(<Pokemon pokemon={testPokemon} />);
    const detailsLink = getByRole('link');
    expect(detailsLink.href).toContain(`/pokemons/${testPokemon.id}`);
  });

  test('6.6 - Ao clicar no link de navegação do pokémon, a aplicação deve ser redirecionada para a página de detalhes de pokémon. A URL exibida no navegador deve mudar para /pokemons/<id>, onde <id> é o id do pokémon cujos detalhes se deseja ver;', () => {
    const { getByText, history } = renderWithRouter(<Pokemon pokemon={testPokemon} />);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(getByText('More details'));
    expect(history.location.pathname).toBe(`/pokemons/${testPokemon.id}`);
  });

  test('6.7 - Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon pokemon={testPokemon} isFavorite />);
    expect(getAllByRole('img')[1].src).toContain('/star-icon.svg');
    expect(getAllByRole('img')[1].alt).toBe(`${testPokemon.name} is marked as favorite`);
  });
});
