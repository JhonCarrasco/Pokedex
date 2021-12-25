module.exports = {
  root: true,
  extends: '@react-native-community',
  plugins: ['react-hooks'],
  rules: {
    semi: ['error', 'never'],
    'react-hooks/exhaustive-deps': 'warn',
  },
}
