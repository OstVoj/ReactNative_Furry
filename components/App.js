/* eslint-disable no-console */
import React, { Component } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import Swiper from '@nart/react-native-swiper'

import MyProfile from '../screens/MyProfile'
import Home from '../screens/Home'
import Explore from '../screens/Explore'
import { GeoLocation } from 'src/components/GeoLocation'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {},
  pagination: {
    top: '-81%'
  },
  dot: {
    width: 6,
    height: 6
  },
  activeDot: {
    backgroundColor: '#2a464e'
  }
})

export default class FfwApp extends Component {
  state = {
    scrollEnabled: true,
    currentIndex: 1,
    showsPagination: true,
    // currentIndex: 3,
    exploreView: 'map'
    // exploreView: 'list',
  }

  __onNavigate = navigateTo => {
    const next = ['profile', 'home'].includes(navigateTo) && this.state.currentIndex > 0 ? -1 : 1

    this.refs.Swiper.scrollBy(next)
  }

  __setSwiperStyle = () => {
    const {
      currentIndex,
      exploreView
    } = this.state

    this.setState(previousState => {
      const isExploring = currentIndex === 3
      const isHome = currentIndex === 1
      const isMap = exploreView === 'map'

      let showsPagination = true
      let scrollEnabled = !isExploring

      if (isExploring) {
        scrollEnabled = !isMap
      }

      if (isHome) {
        scrollEnabled = false
        showsPagination = false
      }

      return {
        ...previousState,
        scrollEnabled,
        showsPagination
      }
    })
  }

  __updateExploreView = newView => {
    this.setState({
      exploreView: newView
    }, this.__setSwiperStyle)
  }

  __onSwiped = newIndex => {
    this.setState({
      currentIndex: newIndex
    }, this.__setSwiperStyle)
  }

  __onVerticalSwipe = (dataFromHome) => {
    this.setState({
      scrollEnabled: dataFromHome,
      showsPagination: dataFromHome
    })
  }

  componentDidMount () {
    this.__setSwiperStyle()
  }

  render () {
    const {
      currentIndex,
      scrollEnabled,
      showsPagination,
      exploreView
    } = this.state

    return (
      <GeoLocation modal>
        <Swiper
          style={styles.container}
          showsPagination={showsPagination}
          paginationStyle={styles.pagination}
          activeDotStyle={styles.activeDot}
          dotStyle={styles.dot}
          index={currentIndex}
          loop={false}
          width={width}
          height={height}
          ref='Swiper'
          scrollEnabled={scrollEnabled}
          onIndexChanged={this.__onSwiped}
        >
          <MyProfile />

          <Home onNavigate={this.__onNavigate} verticalSwipeActive={this.__onVerticalSwipe} />

          <Explore view={exploreView} onNavigate={this.__onNavigate} onViewUpdate={this.__updateExploreView} />
        </Swiper>
      </GeoLocation>
    )
  }
}
