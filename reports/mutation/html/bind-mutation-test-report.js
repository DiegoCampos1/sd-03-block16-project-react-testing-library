document.querySelector('mutation-test-report-app').report = {"files":{"/home/fernando/Desktop/sd-03-block16-project-react-testing-library/src/components/Pokedex.js":{"language":"javascript","mutants":[{"id":"1","location":{"end":{"column":33,"line":30},"start":{"column":28,"line":30}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"0","location":{"end":{"column":56,"line":12},"start":{"column":51,"line":12}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"3","location":{"end":{"column":17,"line":50},"start":{"column":12,"line":50}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"4","location":{"end":{"column":46,"line":54},"start":{"column":25,"line":54}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Survived"},{"id":"5","location":{"end":{"column":23,"line":59},"start":{"column":14,"line":59}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"2","location":{"end":{"column":51,"line":47},"start":{"column":46,"line":47}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"6","location":{"end":{"column":36,"line":74},"start":{"column":14,"line":74}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"7","location":{"end":{"column":29,"line":86},"start":{"column":12,"line":86}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"}],"source":"import React from 'react';\nimport PropTypes from 'prop-types';\n\nimport { isPokemonFavoriteByIdType, pokemonType } from '../types';\nimport Button from './Button';\nimport Pokemon from './Pokemon';\nimport './pokedex.css';\n\nclass Pokedex extends React.Component {\n  constructor(props) {\n    super(props);\n    this.state = { pokemonIndex: 0, filteredType: 'all' };\n  }\n\n  filterPokemons(filteredType) {\n    this.setState({ filteredType, pokemonIndex: 0 });\n  }\n\n  nextPokemon(numberOfPokemons) {\n    this.setState((state) => (\n      { pokemonIndex: (state.pokemonIndex + 1) % numberOfPokemons }\n    ));\n  }\n\n  fetchFilteredPokemons() {\n    const { pokemons } = this.props;\n    const { filteredType } = this.state;\n\n    return pokemons.filter((pokemon) => {\n      if (filteredType === 'all') return true;\n      return pokemon.type === filteredType;\n    });\n  }\n\n  fetchPokemonTypes() {\n    const { pokemons } = this.props;\n\n    return [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];\n  }\n\n  renderPokemonButtonsPanel() {\n    const pokemonTypes = this.fetchPokemonTypes();\n\n    return (\n      <div className=\"pokedex-buttons-panel\">\n        <Button\n          onClick={() => this.filterPokemons('all')}\n          className=\"filter-button\"\n        >\n          {`All`}\n        </Button>\n        {pokemonTypes.map((type) => (\n          <Button\n            dataTestId={`pokemon-type-button`}\n            key={type}\n            onClick={() => this.filterPokemons(type)}\n            className=\"filter-button\"\n          >\n            {`${type}`}\n          </Button>\n        ))}\n      </div>\n    );\n  }\n\n  render() {\n    const { isPokemonFavoriteById } = this.props;\n    const filteredPokemons = this.fetchFilteredPokemons();\n    const { pokemonIndex } = this.state;\n    const pokemon = filteredPokemons[pokemonIndex];\n\n    return (\n      <div className=\"pokedex\">\n        <h2>{`Encountered pokémons`}</h2>\n        <Pokemon\n          pokemon={pokemon}\n          isFavorite={isPokemonFavoriteById[pokemon.id]}\n        />\n        {this.renderPokemonButtonsPanel()}\n        <Button\n          dataTestId=\"next-pokemon\"\n          className=\"pokedex-button\"\n          onClick={() => this.nextPokemon(filteredPokemons.length)}\n          disabled={filteredPokemons.length <= 1}\n        >\n          {`Próximo pokémon`}\n        </Button>\n      </div>\n    );\n  }\n}\n\nPokedex.propTypes = {\n  isPokemonFavoriteById: isPokemonFavoriteByIdType.isRequired,\n  pokemons: PropTypes.arrayOf(pokemonType.isRequired).isRequired,\n};\n\nexport default Pokedex;\n"}},"schemaVersion":"1.0","thresholds":{"high":80,"low":60,"break":null}};