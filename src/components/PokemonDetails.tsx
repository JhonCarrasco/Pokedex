import React from 'react'
import {ScrollView, StyleSheet, Text, View} from 'react-native'
import {
  Ability,
  Move,
  PokemonDetailsResponse,
  Stat,
  Type,
} from '../interfaces/pokemonInterfaces'
import {FadeInImage} from './FadeInImage'

interface Props {
  pokemon: PokemonDetailsResponse
}

export const PokemonDetails = ({pokemon}: Props) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        {...StyleSheet.absoluteFillObject}, // considera toda la pantalla
      ]}>
      {/* Types */}
      <View style={[styles.container, {marginTop: 370}]}>
        <Text style={styles.title}>Types</Text>
        <View style={{flexDirection: 'row'}}>
          {pokemon.types.map(({slot, type: {name}}: Type) => (
            <Text style={[styles.regularText, {marginRight: 10}]} key={slot}>
              {name}
            </Text>
          ))}
        </View>

        {/* Weight */}
        <Text style={styles.title}>Weight</Text>
        <Text style={styles.regularText}>{`${pokemon.weight} kg`}</Text>
      </View>

      {/* Sprites */}
      <View style={[styles.container, {marginTop: 15}]}>
        <Text style={styles.title}>Sprites</Text>
      </View>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_default}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.front_shiny}
          style={styles.basicSprite}
        />
        <FadeInImage
          uri={pokemon.sprites.back_shiny}
          style={styles.basicSprite}
        />
      </ScrollView>

      {/* Abilities */}
      <View style={styles.container}>
        <Text style={styles.title}>Abilities</Text>
      </View>
      <View style={[styles.container, {flexDirection: 'row'}]}>
        {pokemon.abilities.map(({slot, ability: {name}}: Ability) => (
          <Text style={[styles.regularText, {marginRight: 10}]} key={slot}>
            {name}
          </Text>
        ))}
      </View>

      {/* Moves */}
      <View style={styles.container}>
        <Text style={styles.title}>Moves</Text>
      </View>
      <View
        style={[styles.container, {flexDirection: 'row', flexWrap: 'wrap'}]}>
        {pokemon.moves.map(({move: {name}}: Move, index) => (
          <Text style={[styles.regularText, {marginRight: 10}]} key={index}>
            {name}
          </Text>
        ))}
      </View>

      {/* Stats */}
      <View style={styles.container}>
        <Text style={styles.title}>Stats</Text>
      </View>
      <View style={styles.container}>
        {pokemon.stats.map(({stat: {name}, base_stat}: Stat, index) => (
          <View style={{flexDirection: 'row'}} key={index}>
            <Text
              style={[
                styles.regularText,
                {marginRight: 10, width: 200},
              ]}>{`${name}: `}</Text>
            <Text
              style={[
                styles.regularText,
                {marginRight: 10, fontWeight: 'bold'},
              ]}>
              {base_stat}
            </Text>
          </View>
        ))}
      </View>
      <View
        style={{
          marginBottom: 20,
          alignItems: 'center',
        }}>
        <FadeInImage
          uri={pokemon.sprites.front_default}
          style={styles.basicSprite}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    marginTop: 15,
  },
  regularText: {
    fontSize: 19,
  },
  basicSprite: {
    width: 100,
    height: 100,
  },
})
