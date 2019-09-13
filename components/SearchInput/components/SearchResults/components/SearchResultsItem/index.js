/* eslint-disable camelcase */
import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native'

export default class SearchResultsItem extends Component {
  renderImage () {
    const { cover_photo } = this.props

    if (!cover_photo) {
      return <LinearGradient colors={['#b9cfc2', '#536976']} style={styles.cover} />
    }

    return (
      <Image
        source={{ uri: cover_photo }}
        style={[styles.cover, { resizeMode: 'cover' }]}
      />
    )
  }

  render () {
    const { name } = this.props

    return (
      <View style={styles.searchResultsItem}>
        {this.renderImage()}

        <Text style={styles.title}>{name}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchResultsItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16
  },
  cover: {
    flex: 0.5,
    width: '100%',
    height: 80,
    marginRight: 16,
    backgroundColor: '#000'
  },
  title: {
    flex: 0.5
  }
})
