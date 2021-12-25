import React, {useEffect, useState} from 'react'
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import {useDebouncedValue} from '../hooks/useDebouncedValue'

interface Props {
  onDebounce: (value: string) => void
  style?: StyleProp<ViewStyle>
}

export const SearchInput = ({style, onDebounce}: Props) => {
  const [textValue, setTextValue] = useState('')
  const debauncedValue = useDebouncedValue(textValue, 1000)

  useEffect(() => {
    onDebounce(debauncedValue)
  }, [debauncedValue])

  return (
    <View style={[styles.container, style]}>
      <View style={styles.textBackground}>
        <TextInput
          placeholder="Search pokemon"
          style={[styles.textInput, Platform.OS === 'android' ? {top: 2} : {}]}
          autoCapitalize="none"
          autoCorrect={false}
          value={textValue}
          onChangeText={setTextValue}
        />
        <Icon color="#5856D6" size={30} name="search-outline" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  textBackground: {
    flexDirection: 'row',
    backgroundColor: '#f3f1f3',
    borderRadius: 50,
    height: 40,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
  },
})
