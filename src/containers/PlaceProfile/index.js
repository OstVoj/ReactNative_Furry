import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'

import api from 'ffw/api'
import { Profile } from 'src/components/Profile'
import { ProfileCircularProgress } from 'src/components/Profile/ProfileCircularProgress'
import { log } from 'src/utils/fn'
import { PlaceReqOwnershipButton } from 'src/containers/PlaceReqOwnership/Button'

export class PlaceProfile extends React.PureComponent {
  static propTypes = {
    placeId: PropTypes.number
  }

  state = {
    place: null,
    pause: false,
    loadingPlaceDetails: null,
    loadingPlacePosts: null,
    posts: []
  }
  _parallaxViewRef = null

  componentDidMount () {
    this.loadPlaceDetails(this.props.placeId)
    this.loadPlacePosts(this.props.placeId)
  }

  loadPlaceDetails = async placeId => {
    const { loadingPlaceDetails } = this.state

    if (!placeId || loadingPlaceDetails) {
      return
    }

    this.setState({ loadingPlaceDetails: true })

    try {
      const response = await api.show({
        route: `businesses`,
        id: placeId
      })

      this.setState({ place: response })
    } catch (error) {
      // TODO: treat error correctly
      log.error('SERVER ERROR', error)
    }

    this.setState({ loadingPlaceDetails: false })
  }

  loadPlacePosts = async placeId => {
    const { loadingPlacePosts } = this.state

    if (!placeId || loadingPlacePosts) {
      return
    }

    this.setState({ loadingPlacePosts: true })
    try {
      const response = await api.index({
        route: 'active-business-posts',
        query: {
          'business_id': placeId
        }
      })
      this.setState({ posts: response.data, loadingPlacePosts: false })
    } catch (error) {
      log.error('SERVER ERROR', error)
      // TODO: treat error correctly
    }
  }

  foregroundContent = () => {
    const { place, pause } = this.state
    const rating = place.score

    return (
      <>
        <ProfileCircularProgress {...{ pause, rating }} />

        <PlaceForegroundContainer>
          <PlaceName>{place.name}</PlaceName>
          <PlaceStatus>Open Now</PlaceStatus>
        </PlaceForegroundContainer>
      </>
    )
  }

  onFeedbackSent = async data => {
    this.setState(({ place }) => ({
      place: {
        ...place,
        score: 0,
        reviews: place.reviews.concat(data)
      },
      pause: true
    }), () => {
      setTimeout(() => {
        this.setState(({ place }) => ({
          place: {
            ...place,
            score: data.place_score ? Math.ceil(data.place_score) : 80 // todo fix this when api will be ready
          },
          pause: false
        }))
      }, 2000)

      this._parallaxViewRef.ref.current.refs.ScrollView.getNode().scrollTo({ y: 0 })
    })
  }

  onOwnershipRequested = async data => {
    log('onOwnershipRequested', data)
  }

  onPostSent = async data => {
    this.loadPlacePosts(this.state.place.id)
  }

  render () {
    const { place, loadingPlaceDetails, posts, loadingPlacePosts } = this.state
    return (
      <Profile
        type='place'
        loading={loadingPlaceDetails === null ? true : loadingPlaceDetails}
        loadingPosts={loadingPlacePosts === null ? true : loadingPlacePosts}
        profile={place}
        posts={posts}
        foregroundContent={this.foregroundContent}
        onFeedbackSent={this.onFeedbackSent}
        onPostSent={this.onPostSent}
        getParallaxViewRef={ref => (this._parallaxViewRef = ref)}
        {...(place && {
          stickyHeaderText: place.name,
          backgroundImageProps: {
            source: place.cover_photo_url
              ? { uri: place.cover_photo_url }
              : require('src/assets/images/bg.png')
          }
        })}
      >
        <PlaceReqOwnershipButton {...{
          onOwnershipRequested: this.onOwnershipRequested,
          place,
          style: {
            alignSelf: 'center',
            marginTop: 50
          }
        }} />
      </Profile>
    )
  }
}

// //
const window = Dimensions.get('window')

const PlaceForegroundContainer = styled.View`
  flex-direction: column;
  margin: 20px 20px 0;
  max-width: ${window.width - 40}px;
`
const PlaceName = styled.Text.attrs({ numberOfLines: 2, ellipsizeMode: 'tail' })`
  color: #222;
  font-size: 23px;
  font-weight: bold;
  text-align: left;
  font-family: 'Inter UI';
  width: ${window.width - 60};
`
const PlaceStatus = styled.Text`
  color: #4CD964;
  font-size: 20px;
  line-height: 25px;
`
