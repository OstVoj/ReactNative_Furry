import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, Platform, PanResponder, TouchableWithoutFeedback } from 'react-native'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import LinearGradient from 'react-native-linear-gradient'
import Carousel from 'react-native-snap-carousel'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import api from '../../../../api'

import SearchInput from '../../../../components/SearchInput'
import SliderEntry from '../../../../components/SliderEntry'

import ViewToggler from '../../components/ViewToggler'

import PlaceCategory from './components/PlaceCategory'
import { PlacesProfileModal } from 'src/containers/PlaceProfile/Modal'
import { log } from 'src/utils/fn'
import { geoLocationCoordsSelector } from 'src/components/GeoLocation/selectors'

const { geolocation } = navigator
const { width, height } = Dimensions.get('window')

const drawer = {
  width: 60,
  gradients: ['rgba(233, 219, 217, 1)', 'rgba(233, 219, 217, 0)']
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    width,
    height,
    top: 0,
    left: 0,
    position: 'absolute',
    paddingHorizontal: 15,
    zIndex: 2,
    paddingTop: 50
  },
  viewToggler: {
    marginTop: 5,
    paddingHorizontal: 15
  },
  carouselContainer: {
    position: 'absolute',
    bottom: 0,
    flex: 1
  },
  carouselTitle: {
    fontSize: 36,
    lineHeight: 38,
    color: '#665576'
  },
  drawer: {
    width: drawer.width,
    height,
    top: 0,
    left: 0,
    position: 'absolute',
    zIndex: 3
  },
  drawerGradient: {
    width: drawer.width,
    height
  },
  annotationName: {
    backgroundColor: '#fff',
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: 150
  },
  annotationNameText: {
    textAlign: 'center'
  },
  annotationContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 15
  },
  annotationFill: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#2a464e',
    transform: [{ scale: 0.6 }]
  }
})

/**
 * Access Token
 */
Mapbox.setAccessToken('pk.eyJ1IjoidGVjaGllZG9kIiwiYSI6ImNqbW5vYWMwZzB3MGQzcWxiYzF3YnpydXEifQ.RNtj2DNEAdFWvRShLmhvGQ')

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state)
})

@connect(mapStateToProps)
export default class MapView extends Component {
  static propTypes = {
    onNavigate: PropTypes.func,
    onRegionChange: PropTypes.func,
    userLocation: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    onViewChange: PropTypes.func,
    view: PropTypes.oneOf(['map', 'list'])
  }
  static defaultProps = {
    onNavigate: () => {},
    onRegionChange: () => {},
    userLocation: { lat: 0, lng: 0 },
    onViewChange: () => {},
    view: 'map'
  }

  state = {
    carouselItems: [],
    places: [],
    currentIndex: 0,
    modalVisible: false
  }

  __panResponder = PanResponder.create({
    // Ask to be the responder:
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      // The most recent move distance is gestureState.move{X,Y}

      // The accumulated gesture distance since becoming responder is
      // gestureState.d{x,y}
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (evt, gestureState) => {
      this.props.onNavigate('home')
      // The user has released all touches while this view is the
      // responder. This typically means a gesture has succeeded
    },
    onShouldBlockNativeResponder: (evt, gestureState) => {
      // Returns whether this component should block native components from becoming the JS
      // responder. Returns true by default. Is currently only supported on android.
      return true
    }
  })

  constructor (props) {
    super(props)

    if (Platform.OS === 'ios') {
      geolocation.requestAuthorization()
    }
  }

  __onCategoryChange = index => {
    this.setState({
      currentIndex: index
    }, this.__fetchPlaces)
  }

  __onRegionDidChange = mapData => {
    if (mapData) {
      const { coordinates } = mapData.geometry
      const [lng, lat] = coordinates

      this.props.onRegionChange({ lat, lng })
    }

    this.__fetchPlaces(mapData)
  }

  __fetchPlaces = async (mapData) => {
    const coords = {
      lat: 0,
      lng: 0
    }

    if (mapData) {
      const { coordinates } = mapData.geometry
      const [ lng, lat ] = coordinates

      coords.lat = lat
      coords.lng = lng
    } else {
      const { userLocation: { lat, lng } } = this.props

      coords.lat = lat
      coords.lng = lng
    }

    try {
      const response = await api.index({
        route: 'businesses',
        query: {
          ...coords
        }
      })

      if (!response || !Array.isArray(response.data)) {
        return
      }

      this.setState({ places: response.data })
    } catch (error) {
      // TODO: handle error correctly
      log.error('SERVER ERROR', error)
    }
  }

  __fetchCarouselItems = async () => {
    // const response = await api.index({
    //   route: 'route-toward-endpoint-without-version',
    //   query: {} // Search params go here
    // })

    this.setState(previousState => ({
      ...previousState,
      // carouselItems: response
      carouselItems: require('./data/dummy').default
    }))
  }

  __setModalVisible = (visible) => this.setState(() => ({ modalVisible: visible }))

  __closeModal = () => this.__setModalVisible(false)

  __openModal = placeId => () => {
    this.setState({
      placeId
    }, () => this.__setModalVisible(true))
  }

  componentDidMount () {
    this.__fetchPlaces()

    this.__fetchCarouselItems()
  }

  renderAnnotations = () => {
    return this.state.places.map(place => (
      <Mapbox.PointAnnotation
        id={String(place.id)}
        key={String(place.id)}
        coordinate={[place.lng, place.lat]}
        title={String(place.name)}
      >
        <View style={styles.annotationName}>
          <Text numberOfLines={3} style={styles.annotationNameText}>{place.name}</Text>
        </View>
        <TouchableWithoutFeedback style={styles.annotationContainer} onPress={this.__openModal(place.id)}>
          <View style={styles.annotationContainer}>
            <View style={styles.annotationFill} />
          </View>
        </TouchableWithoutFeedback>
        {/* <Mapbox.Callout title={place.name} /> */}
      </Mapbox.PointAnnotation>
    ))
  }

  __carouselItemPressed = (item) => {
    this.__openModal(item.id)
  }

  renderCarouselItemA = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        even={1}
        parallax
        parallaxProps={parallaxProps}
        onPress={this.__carouselItemPressed}
      />
    )
  }

  renderCarouselItem = ({ itemIndex, currentIndex, item, animatedValue }) => {
    return (
      <PlaceCategory
        {...item}
        index={itemIndex}
        currentIndex={currentIndex}
        animatedValue={animatedValue}
      />
    )
  }

  render () {
    const {
      carouselItems,
      placeId
    } = this.state

    const {
      userLocation,
      onViewChange,
      view
    } = this.props

    // const contentWidth = Math.round(width / 2)
    // const contentOffset = (width - contentWidth) / 2

    return (
      <View style={styles.container}>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={16}
          centerCoordinate={[userLocation.lng, userLocation.lat]}
          showUserLocation
          logoEnabled={false}
          style={styles.container}
          onRegionDidChange={this.__onRegionDidChange}
        >{this.renderAnnotations()}</Mapbox.MapView>

        <View style={styles.contentContainer} pointerEvents='box-none'>
          <SearchInput />
          <View style={styles.viewToggler}>
            <ViewToggler onToggle={onViewChange} view={view} />
          </View>

          {/* <View style={styles.carouselContainer}>
            <View style={{ marginBottom: 15, paddingHorizontal: 15 }}>
              <Text style={styles.carouselTitle}>Find places near you</Text>
            </View>

            <SideSwipe
              index={currentIndex}
              itemWidth={contentWidth}
              style={{ width }}
              data={carouselItems}
              contentOffset={contentOffset}
              onIndexChange={this.__onCategoryChange}
              renderItem={this.renderCarouselItem}
            />
          </View> */}
          <View style={{ position: 'absolute', bottom: 20, flex: 1 }}>
            <Carousel
              data={carouselItems}
              renderItem={this.renderCarouselItemA}
              sliderWidth={width}
              itemWidth={width * 0.8}
              firstItem={1}
              inactiveSlideScale={1}
            />
          </View>
        </View>

        <View style={styles.drawer} pointerEvents='box-only' {...this.__panResponder.panHandlers}>
          <LinearGradient
            style={styles.drawerGradient}
            colors={drawer.gradients}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        </View>

        <PlacesProfileModal
          isVisible={this.state.modalVisible}
          placeId={placeId}
          onClose={this.__closeModal}
        />
      </View>
    )
  }
}
