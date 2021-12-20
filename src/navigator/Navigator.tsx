import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'

import {HomeScreen} from '../screens/HomeScreen'
import {View} from 'react-native'

const Stack = createStackNavigator()

export const Navigator = () => {
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'red',
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: {
            // backgroundColor: 'white'
          },
        }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </View>
  )
}
