import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/Ionicons'
import {TabList} from './TabList'
import {TabSearch} from './TabSearch'

const Tab = createBottomTabNavigator()

export const Tabs = () => {
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#5856D5',
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'rgba(255,255,255,0.82)',
          paddingBottom: 10, //( Platform.OS === 'ios') ? 0 : 10,
          borderWidth: 0,
          elevation: 0,
          height: 60, //( Platform.OS === 'ios') ? 70 : 80,
        },
      }}>
      <Tab.Screen
        name="Navigator"
        component={TabList}
        options={{
          tabBarLabel: 'List',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="list-outline" />
          ),
        }}
      />
      <Tab.Screen
        name="SearchScreen"
        component={TabSearch}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Icon color={color} size={25} name="search-outline" />
          ),
        }}
      />
    </Tab.Navigator>
  )
}
