import React, { Component } from 'react'
import {
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window')

export default class SliderEntry extends Component {
  onPress = () => {
    this.props.onPress(this.props.data)
  }

  render () {
    const { data: { name } } = this.props

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={this.onPress}
      >
        <LinearGradient colors={['#4fd5fb', '#03f3cd']} style={styles.textContainer}>
          <Text style={styles.text} numberOfLines={2}>
            { name }
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    )
  }
}

const itemBorderRadius = 15
const itemHorizontalMargin = 10

const styles = StyleSheet.create({
  slideInnerContainer: {
    paddingHorizontal: itemHorizontalMargin,
    width: width * 0.8,
    paddingBottom: 18
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    height: 150,
    padding: itemBorderRadius,
    borderRadius: itemBorderRadius
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  }
})
