import React, { PureComponent, Fragment } from 'react'
import { View, Image, TextInput, StyleSheet, Platform } from 'react-native'
import debounce from 'lodash.debounce'
import { connect } from 'react-redux'

import api from '../../api'
import SearchResults from './components/SearchResults'
import { isArray, log } from 'src/utils/fn'
import { geoLocationCoordsSelector } from 'src/components/GeoLocation/selectors'

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state)
})

@connect(mapStateToProps)
class SearchInput extends PureComponent {
  state = {
    value: '',
    showResults: false,
    results: [],
    totalItems: -1,
    page: 1,
    showProfileModal: false,
    placeId: 0
  }

  __handleDebouncedSearch = debounce(async () => {
    const { value, page } = this.state
    const { userLocation } = this.props

    try {
      const response = await api.index({
        route: 'businesses',
        query: {
          search: value,
          page,
          ...userLocation
        }
      })

      const responseSuccess = response && isArray(response.data)

      if (responseSuccess) {
        this.setState({
          results: page === 1 ? response.data : this.state.results.concat(response.data),
          totalItems: response.total,
          error: null
        })
      } else { // todo treat error response correctly
        log.error('SERVER ERROR', response)
        this.setState({
          error: response.error
        })
      }
    } catch (e) {
      log.error('SERVER ERROR', e)
    }
  }, 1000)

  __onChangeText = text => {
    this.setState({ value: text, page: 1 }, this.__handleDebouncedSearch)
  }

  __closeModal = () => this.setState({
    showResults: false
  })

  __openProfileModal = placeId => () => this.setState({
    placeId
  }, () => this.setState({
    showProfileModal: true
  }))

  __closeProfileModal = () => this.setState({
    showProfileModal: false
  })

  __handleFocus = () => this.setState({
    showResults: true
  })

  handleOnLoadMore = () => {
    const { results, totalItems } = this.state
    const isMoreItemsToLoad = results.length < totalItems

    if (!isMoreItemsToLoad) {
      return
    }

    this.setState(({ page }) => ({
      page: page + 1
    }), this.__handleDebouncedSearch)
  }

  render () {
    const {
      value,
      showResults,
      results,
      placeId,
      showProfileModal
    } = this.state

    return (
      <Fragment>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={this.__onChangeText}
            onFocus={this.__handleFocus}
          />

          <Image
            source={require('./icons/magnifier.png')}
            style={styles.icon}
          />
        </View>

        <SearchResults
          visible={showResults}
          value={value}
          placeId={placeId}
          onChange={this.__onChangeText}
          close={this.__closeModal}
          results={results}
          openProfileModal={this.__openProfileModal}
          closeProfileModal={this.__closeProfileModal}
          showProfileModal={showProfileModal}
          onLoadMore={this.handleOnLoadMore}
        />
      </Fragment>
    )
  }
}

export default SearchInput

const styles = StyleSheet.create({
  container: {
    flex: 0,
    position: 'relative'
  },
  input: {
    height: 40,
    backgroundColor: '#ffffff',
    marginTop: 12,
    borderRadius: 6,
    padding: 5,
    paddingRight: 30,
    ...Platform.select({
      ios: {
        shadowOffset: { height: 2 },
        shadowColor: 'black',
        shadowOpacity: 0.15
      },
      android: {
        elevation: 2
      }
    })
  },
  icon: {
    position: 'absolute',
    right: 14,
    top: 23
  }
})
