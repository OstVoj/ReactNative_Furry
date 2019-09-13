import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 30,
    paddingHorizontal: 15
  },
  itemContainer: {
    alignItems: 'center'
  },
  item: {
    fontSize: 12,
    color: '#2a464e',
    lineHeight: 20
  }
})

export default function NavBar ({ onItemPress }) {
  const onHomePress = () => onItemPress('home')

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onHomePress}>
        <View style={styles.itemContainer}>
          <Image source={require('./icons/home.png')} />

          <Text style={styles.item}>Home</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
