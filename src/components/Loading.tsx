import React from 'react'
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native'

export const Loading = () => {
  return (
    <View style={styles.activityContainer}>
      <ActivityIndicator color="#5856D6" size={30} />
      <Text style={styles.text}>Cargando...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#5856D6',
  },
})
