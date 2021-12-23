import {useEffect, useState} from 'react'
import {pokemonAPI} from '../api/pokemonAPI'
import {PokemonDetailsResponse} from '../interfaces/pokemonInterfaces'

export const usePokemon = (id: string) => {
  const [isLoading, setIsLoading] = useState(true)
  const [pokemon, setPokemon] = useState<PokemonDetailsResponse>(
    {} as PokemonDetailsResponse,
  )

  const loadPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const resp = await pokemonAPI.get<PokemonDetailsResponse>(url)
    setPokemon(resp.data)
    setIsLoading(false)
  }

  useEffect(() => {
    loadPokemon()
  }, [])

  return {
    isLoading,
    pokemon,
    loadPokemon,
  }
}
