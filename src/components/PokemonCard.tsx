import {useNavigation} from '@react-navigation/native'
import React, {useEffect, useRef, useState} from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native'
import {getImageColors} from '../helpers/getColors'
import {SimplePokemon} from '../interfaces/pokemonInterfaces'
import {FadeInImage} from './FadeInImage'

const windowWidth = Dimensions.get('window').width

interface Props {
  pokemon: SimplePokemon
}

export const PokemonCard = ({pokemon}: Props) => {
  const navigation = useNavigation<any>()
  const [bgColor, setBgColor] = useState('grey')
  const isMounted = useRef(true) // controlar la sobrecarga de subscripciones para el cambio de estado

  useEffect(() => {
    getPictureColor(pokemon.picture)

    return () => {
      isMounted.current = false
    }
  }, [])

  const getPictureColor = async (url: string) => {
    if (!isMounted.current) {
      return
    }

    const [background = bgColor] = await getImageColors(url)
    setBgColor(background)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate('PokemonScreen', {
          simplePokemon: pokemon,
          color: bgColor,
        })
      }>
      <View style={[styles.cardContainer, {backgroundColor: bgColor}]}>
        <View>
          <Text style={styles.name}>
            {pokemon.name}
            {'\n#' + pokemon.id}
          </Text>
        </View>
        <View style={styles.pokebolaContainer}>
          <Image
            source={require('../assets/pokebola-blanca.png')}
            style={styles.pokebola}
          />
        </View>

        <FadeInImage uri={pokemon.picture} style={styles.pokemonImage} />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 10,
    backgroundColor: 'red',
    height: 120,
    marginBottom: 25,
    borderRadius: 10,
    width: windowWidth * 0.4,
  },
  name: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    top: 20,
    left: 10,
  },
  pokebola: {
    width: 100,
    height: 100,
    right: -25,
    bottom: -25,
  },
  pokemonImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    right: -8,
    bottom: -5,
  },
  pokebolaContainer: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 0,
    right: 0,
    overflow: 'hidden',
    opacity: 0.5,
  },
})
