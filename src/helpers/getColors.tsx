import ImageColors from 'react-native-image-colors'

export const getImageColors = async (uri: string) => {
  const colors = await ImageColors.getColors(uri, {fallback: 'grey'})

  let background

  switch (colors.platform) {
    case 'android':
      // android result properties
      background = colors.dominant
      break
    // case 'web':
    //     // web result properties
    //     const lightVibrantColor = colors.lightVibrant
    //     break
    case 'ios':
      // iOS result properties
      background = colors.background
      break
    default:
      throw new Error('Unexpected platform key')
  }

  return [background]
}
