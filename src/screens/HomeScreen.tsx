import React from 'react'
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {usePokemonPaginated} from '../hooks/usePokemonPaginated'
import {globalStyles} from '../theme/appTheme'
import {PokemonCard} from '../components/PokemonCard'

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets()

  const {isLoading, simplePokemonList, loadPokemons} = usePokemonPaginated()

  return (
    <>
      <Image
        source={require('../assets/pokebola.png')}
        style={globalStyles.pokebolaBG}
      />

      <View style={{alignItems: 'center'}}>
        <FlatList
          data={simplePokemonList}
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
                  top: top + 20,
                  marginBottom: top + 20,
                  paddingBottom: 10,
                },
              ]}>
              Pokedex
            </Text>
          }
          /* Infinite scroll */
          onEndReached={loadPokemons}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            <ActivityIndicator style={{height: 100}} color="black" size={30} />
          }
          // ListFooterComponentStyle={{backgroundColor: 'grey'}}
        />
      </View>
    </>
  )
}
