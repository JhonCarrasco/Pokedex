import React, {useEffect, useState} from 'react'
import {Dimensions, FlatList, Platform, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {Loading} from '../components/Loading'
import {PokemonCard} from '../components/PokemonCard'
import {SearchInput} from '../components/SearchInput'
import {usePokemonSearch} from '../hooks/usePokemonSearch'
import {SimplePokemon} from '../interfaces/pokemonInterfaces'
import {globalStyles} from '../theme/appTheme'

const {width: widthScreen} = Dimensions.get('screen')

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets()
  const {isFetching, simplePokemonList} = usePokemonSearch()

  const [filteredPokemons, setFilteredPokemons] = useState<SimplePokemon[]>([])
  const [term, setTerm] = useState('')

  useEffect(() => {
    if (term.length === 0) {
      return setFilteredPokemons([])
    }

    // filtrar por ID o Palabra clave
    if (isNaN(Number(term))) {
      setFilteredPokemons(
        simplePokemonList.filter(poke =>
          poke.name.toLowerCase().includes(term.toLowerCase()),
        ),
      )
    } else {
      // setFilteredPokemons([simplePokemonList.find(poke => poke.id === term)!])
      const pokemonById = simplePokemonList.find(poke => poke.id === term)
      setFilteredPokemons(pokemonById ? [pokemonById] : [])
    }
  }, [term])

  if (isFetching) {
    return <Loading />
  }
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
      }}>
      <SearchInput
        onDebounce={value => setTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: widthScreen - 40,
          top: Platform.OS === 'ios' ? top : top + 30,
        }}
      />

      <FlatList
        data={filteredPokemons}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        ListHeaderComponent={
          <Text
            style={[
              globalStyles.title,
              globalStyles.globalMargin,
              {
                marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
                paddingBottom: 10,
              },
            ]}>
            {term}
          </Text>
        }
      />
    </View>
  )
}
