import {useEffect, useRef, useState} from 'react'
import {pokemonAPI} from '../api/pokemonAPI'
import {
  PokemonPaginatedResponse,
  Result,
  SimplePokemon,
} from '../interfaces/pokemonInterfaces'

export const usePokemonPaginated = () => {
  const [simplePokemonList, setSimplePokemonList] = useState<SimplePokemon[]>(
    [],
  )
  const [isLoading, setIsLoading] = useState(true)
  const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')

  const loadPokemons = async () => {
    const resp = await pokemonAPI.get<PokemonPaginatedResponse>(
      nextPageUrl.current,
    )
    nextPageUrl.current = resp.data.next

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

    setSimplePokemonList([...simplePokemonList, ...newPokemonList])
    setIsLoading(false)
  }

  useEffect(() => {
    loadPokemons()
  }, [])

  return {
    isLoading,
    simplePokemonList,
    loadPokemons,
  }
}
