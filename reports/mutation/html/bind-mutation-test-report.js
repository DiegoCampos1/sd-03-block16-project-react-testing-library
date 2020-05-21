document.querySelector('mutation-test-report-app').report = {"files":{"/home/raphael/sd-03-block16-project-react-testing-library/src/App.js":{"language":"javascript","mutants":[{"id":"1","location":{"end":{"column":54,"line":97},"start":{"column":47,"line":97}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"2","location":{"end":{"column":70,"line":98},"start":{"column":51,"line":98}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"},{"id":"0","location":{"end":{"column":48,"line":96},"start":{"column":42,"line":96}},"mutatorName":"StringLiteral","replacement":"\"\"","status":"Killed"}],"source":"import React, { Component } from 'react';\nimport { Switch, Route, Link } from 'react-router-dom';\n\nimport {\n  About,\n  FavoritePokemons,\n  NotFound,\n  Pokedex,\n  PokemonDetails,\n} from './components';\n\nimport {\n  readFavoritePokemonIds,\n  updateFavoritePokemons,\n} from './services/pokedexService';\n\nimport pokemons from './data';\n\nimport './App.css';\n\nclass App extends Component {\n  static setIsPokemonFavoriteById() {\n    const favoritePokemonIds = readFavoritePokemonIds();\n    const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {\n      acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);\n      return acc;\n    }, {});\n\n    return isPokemonFavorite;\n  }\n\n  constructor(props) {\n    super(props);\n    this.state = { isPokemonFavoriteById: App.setIsPokemonFavoriteById() };\n  }\n\n  onUpdateFavoritePokemons(pokemonId, isFavorite) {\n    updateFavoritePokemons(pokemonId, isFavorite);\n\n    this.setState(({ isPokemonFavoriteById: App.setIsPokemonFavoriteById() }));\n  }\n\n  renderPokedex() {\n    const { isPokemonFavoriteById } = this.state;\n\n    return (\n      <Pokedex\n        pokemons={pokemons}\n        isPokemonFavoriteById={isPokemonFavoriteById}\n      />\n    );\n  }\n\n  renderPokemonDetails(match) {\n    const { isPokemonFavoriteById } = this.state;\n\n    return (\n      <PokemonDetails\n        isPokemonFavoriteById={isPokemonFavoriteById}\n        match={match}\n        pokemons={pokemons}\n        onUpdateFavoritePokemons={(pokemonId, isFavorite) => (\n          this.onUpdateFavoritePokemons(pokemonId, isFavorite)\n        )}\n      />\n    );\n  }\n\n  renderRoutes() {\n    const { isPokemonFavoriteById } = this.state;\n    const favoritePokemons = pokemons.filter(({ id }) => isPokemonFavoriteById[id]);\n\n    return (\n      <Switch>\n        <Route\n          exact\n          path=\"/\"\n          render={({ match }) => this.renderPokedex(match)}\n        />\n        <Route\n          path=\"/pokemons/:id\"\n          render={({ match }) => this.renderPokemonDetails(match)}\n        />\n        <Route path=\"/favorites\" render={() => <FavoritePokemons pokemons={favoritePokemons} />} />\n        <Route path=\"/about\" component={About} />\n        <Route component={NotFound} />\n      </Switch>\n    );\n  }\n\n  render() {\n    return (\n      <div className=\"App\">\n        <h1>Pokédex</h1>\n        <nav>\n          <Link className=\"link\" to=\"/\">{`Home`}</Link>\n          <Link className=\"link\" to=\"/about\">{`About`}</Link>\n          <Link className=\"link\" to=\"/favorites\">{`Favorite Pokémons`}</Link>\n        </nav>\n        {this.renderRoutes()}\n      </div>\n    );\n  }\n}\n\nexport default App;\n"}},"schemaVersion":"1.0","thresholds":{"high":80,"low":60,"break":null}};