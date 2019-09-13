import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
})

export default function FfwLogo () {
  return (
    <View style={styles.container}>
      <Image source={require('./icons/logo.png')} />
    </View>
  )
}
