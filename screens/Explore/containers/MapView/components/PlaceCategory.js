import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback, ImageBackground, Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 250,
    width: width / 2
  },
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  title: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    paddingBottom: 10,
    paddingHorizontal: 10
  }
})

export default function PlaceCategory ({ id, name, image }) {
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => {}}>
        <ImageBackground source={require('./bg.jpg')} style={styles.background}>
          <View style={styles.title}>
            <Text style={{ color: '#FFFFFF', fontSize: 16, lineHeight: 20 }}>{name}</Text>
          </View>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  )
}
