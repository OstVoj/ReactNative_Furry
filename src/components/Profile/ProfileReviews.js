import React from 'react'
import {
  ImageBackground,
  TouchableOpacity,
  View,
  Text
} from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import styled from 'styled-components'
import is from 'styled-is'

import { MainFont } from 'src/components/Profile/ui'
import { PlacesProfileModal } from 'src/containers/PlaceProfile/Modal'

export class ProfileReviews extends React.PureComponent {
  static propTypes = {
    openPlaceModalOnReviewTap: PropTypes.bool,
    profile: PropTypes.object
  }
  state = {
    modalVisible: false,
    placeId: null
  }

  closePlaceProfileModal = () => this.setState(() => ({ modalVisible: false }))

  openPlaceProfileModal = placeId => () => this.setState({
    placeId,
    modalVisible: true
  })

  renderReview = (review, index) => {
    if (!review || !review.comment) {
      return null
    }
    const { imageUrl, comment, keywords = [], business_id: businessId } = review
    const { openPlaceModalOnReviewTap } = this.props

    const reviewHasImage = imageUrl
    const reviewCardProps = {
      key: index,
      ...(openPlaceModalOnReviewTap && {
        as: TouchableOpacity,
        onPress: this.openPlaceProfileModal(businessId)
      })
    }

    return (
      <ReviewCard {...reviewCardProps}>
        {
          reviewHasImage && (
            <View>
              <ImageBackground
                source={{ uri: imageUrl }}
                resizeMode='cover'
                style={{ height: 250 }}
              >
                <LinearGradient
                  style={{ height: 250 }}
                  colors={['rgba(255, 255, 255, 0)', 'rgba(247, 248, 250, 1)']}
                  locations={[0.6, 1]}
                />
              </ImageBackground>
            </View>
          )
        }

        <ReviewCommentContainer {...{ reviewHasImage }}>
          <ReviewMessageContainer>
            <ReviewMessage>{comment}</ReviewMessage>
          </ReviewMessageContainer>
          <ReviewKeywordsContainer>
            {!!keywords.length && (
              <Text>{keywords.map(({ keyword }) => `${keyword} `)}</Text>
            )}
          </ReviewKeywordsContainer>
        </ReviewCommentContainer>
      </ReviewCard>
    )
  }

  render = () => {
    const { images = [], reviews = [] } = this.props.profile
    const { modalVisible, placeId } = this.state

    if (reviews && reviews.length <= 0) {
      return null
    }

    let imageIndex = 1

    const reviewWithImg = reviews.map(rev => {
      const reviewHasImage = rev.images && rev.images.length > 0

      if (reviewHasImage) {
        return {
          ...rev,
          imageUrl: rev.images[0].url
        }
      }

      if (imageIndex < images.length) {
        imageIndex++

        return {
          ...rev,
          imageUrl: images[imageIndex - 1].url
        }
      }

      return rev
    })

    return (
      <ReviewContainer>
        {reviewWithImg.map(this.renderReview)}

        <PlacesProfileModal
          isVisible={modalVisible}
          placeId={placeId}
          onClose={this.closePlaceProfileModal}
        />
      </ReviewContainer>
    )
  }
}

// //
const ReviewCard = styled.View`
  margin: 0;
  margin-top: 15px;
  border-width: 1px;
  border-color: #dfd6d4;
  border-radius: 5px;
`
const ReviewCommentContainer = styled.View`
  padding: 10px;
  background-color: #f8f9fb;
  flexDirection: column;
  
  ${is('reviewHasImage')`
    padding-top: 0px;
    padding-bottom: 20px;
  `};
`
const ReviewContainer = styled.View`
  marginBottom: 30px;
`

const ReviewMessageContainer = styled.View`
  flex: 1;
`

const ReviewMessage = styled(MainFont)`
  color: #2c3033;
  flex: 1;
`

const ReviewKeywordsContainer = styled.View`
  flex: 1;
`
