import {useEffect, useState} from 'react'
import {pokemonAPI} from '../api/pokemonAPI'
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces'

export const usePokemonSearch = () => {
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  )
  const [isFetching, setIsFetching] = useState(true)

  const loadPokemons = async () => {
    const resp = await pokemonAPI.get<PokemonPaginatedResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=1200',
    )

    mapPokemonList(resp.data.results)
  }

  const mapPokemonList = (pokemontList: Result[]) => {
    const newPokemonList: SimplePokemon[] = pokemontList.map(({name, url}) => {
      // "https://pokeapi.co/api/v2/pokemon/15/"
      const urlParts = url.split('/')
      const id = urlParts[urlParts.length - 2]
      const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

      return {id, name, picture}
    })

    setSimplePokemonList(newPokemonList)
    setIsFetching(false)
  }

  useEffect(() => {
    loadPokemons()
  }, [])

  return {
    isFetching,
    simplePokemonList,
  }
}
