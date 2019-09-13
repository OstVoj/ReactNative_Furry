import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FeedSwiper from '@nart/react-native-swiper'
import DeckSwiper from 'react-native-deck-swiper'
import GestureRecognizer from 'react-native-swipe-gestures'

import api from '../../api'
import CardItem from './components/CardItem'
import CardItemFullScreen from './components/CardItemFullScreen'
import { PlacesProfileModal } from 'src/containers/PlaceProfile/Modal'
import { log } from 'src/utils/fn'
import { geoLocationCoordsSelector } from 'src/components/GeoLocation/selectors'

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state)
})

@connect(mapStateToProps)
export class PlacesCards extends Component {
  static propTypes = {
    userLocation: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    coords: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    withFeedSwiper: PropTypes.bool,
    slideModalFromLeft: PropTypes.bool,
    fullScreen: PropTypes.bool
  }
  static defaultProps = {
    userLocation: { lat: 0, lng: 0 },
    coords: null,
    withFeedSwiper: false,
    slideModalFromLeft: false,
    fullScreen: false
  }

  state = {
    modalVisible: false,
    placeId: 0,
    items: [],
    loading: false,
    page: 1,
    totalItems: -1,
    error: null,
    refreshing: false,
    cardIndex: 0
  }

  constructor (props) {
    super(props)

    this.swiperRef = React.createRef()
  }

  componentDidMount () {
    this.fetchPlaces()
  }

  __setModalVisible = (visible) => this.setState(() => ({ modalVisible: visible }))

  __closeModal = () => this.__setModalVisible(false)

  __openModal = placeId => {
    this.setState({
      placeId
    }, () => this.__setModalVisible(true))
  }

  fetchPlaces = async () => {
    const { page } = this.state
    const { coords, userLocation } = this.props
    const queryCoords = coords || userLocation

    this.setState({ loading: true })

    try {
      const response = await api.index({
        route: 'explore',
        query: {
          page,
          ...queryCoords
        }
      })

      this.setState({
        items: page === 1 ? response.data : this.state.items.concat(response.data),
        totalItems: response.meta.total,
        error: null,
        loading: false,
        refreshing: false
      })
    } catch (error) {
      // TODO: treat error response correctly
      log.error('SERVER ERROR', error)

      this.setState({
        error,
        loading: false
      })
    }
  }

  handleLoadMore = () => {
    const { items, totalItems } = this.state
    const isMoreItemsToLoad = items.length < totalItems

    if (!isMoreItemsToLoad) {
      return
    }

    this.setState(({ page }) => ({
      page: page + 1
    }), this.fetchPlaces)
  }

  onSwipeRight = () => {
    const { items, cardIndex } = this.state
    const { id } = items[cardIndex]

    this.__openModal(id)
  }

  onSwipeUp = () => this.swiperRef.current.swipeTop()

  onSwipeDown = () => this.swiperRef.current.swipeBack()

  onSwiped = (index) => this.setState({ cardIndex: index })

  onIndexChanged = (index) => {
    const { items } = this.state
    this.setState({ cardIndex: index })

    if (index === items.length - 1) {
      this.handleLoadMore()
    }
  }

  renderCardViewItems = (item) => {
    const { fullScreen, userLocation } = this.props
    const cardProps = {
      ...{
        onPress: this.__openModal,
        userLocation,
        key: item.id
      },
      ...item
    }

    return fullScreen ? <CardItemFullScreen {...cardProps} /> : <CardItem {...cardProps} />
  }

  getSwiper = () => {
    const { withFeedSwiper } = this.props

    if (withFeedSwiper) {
      return this.getFeedSwiper()
    }

    return this.getCardsSwiper()
  }

  getFeedSwiper = () => (
    <FeedSwiper
      key={this.state.items.length}
      horizontal={false}
      showsPagination={false}
      index={this.state.cardIndex}
      loop={false}
      onIndexChanged={this.onIndexChanged}
      automaticallyAdjustContentInsets
    >
      {
        this.state.items.map((item) => (
          <SwiperContainer onSwipeRight={this.onSwipeRight} key={item.id}>
            {this.renderCardViewItems(item)}
          </SwiperContainer>
        ))
      }
    </FeedSwiper>
  )

  getCardsSwiper = () => (
    <SwiperContainer
      onSwipeUp={this.onSwipeUp}
      onSwipeDown={this.onSwipeDown}
    >
      <DeckSwiper
        cardIndex={this.state.cardIndex}
        ref={this.swiperRef}
        cards={this.state.items}
        keyExtractor={item => item.id}
        cardVerticalMargin={0}
        stackSize={3}
        cardStyle={styles.card}
        renderCard={this.renderCardViewItems}
        onSwipedAll={this.handleLoadMore}
        onSwiped={this.onSwiped}
        horizontalSwipe={false}
        animateCardOpacity
      />
    </SwiperContainer>
  )

  render () {
    const { style, slideModalFromLeft } = this.props
    const { modalVisible, placeId } = this.state

    return (
      <Container style={style}>
        <PlacesProfileModal
          slideFromLeft={slideModalFromLeft}
          isVisible={modalVisible}
          placeId={placeId}
          onClose={this.__closeModal}
        />
        {this.getSwiper()}
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: 'auto',
    height: 'auto'
  }
})

const Container = styled.View`
  flex: 1;
`

const SwiperContainer = styled(GestureRecognizer)`
  flex: 1;
`
