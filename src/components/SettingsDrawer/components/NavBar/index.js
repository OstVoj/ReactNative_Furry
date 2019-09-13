import React from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 30
  },
  itemContainer: {
    alignItems: 'center'
  },
  item: {
    fontSize: 12,
    color: '#665576',
    lineHeight: 20
  }
})

export default function NavBar ({ onItemPress }) {
  const onProfilePress = () => onItemPress('profile')

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onProfilePress}>
        <View style={styles.itemContainer}>
          <Image source={require('ffw/components/NavBar/icons/profile.png')} />

          <Text style={styles.item}>My Settings</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
