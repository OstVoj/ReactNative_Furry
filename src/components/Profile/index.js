import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Dimensions
} from 'react-native'

import ScreenLoader from 'ffw/components/ScreenLoader'
import { ParallaxPictureHeader } from 'src/components/ParallaxPictureHeader'
import { ProfileUserDetails, ProfilePlaceDetails } from 'src/components/Profile/ProfileDetails'
import { ProfileDistance } from 'src/components/Profile/ProfileDistance'
import { ProfileRating } from 'src/components/Profile/ProfileRating'
import { ProfilePhotos } from 'src/components/Profile/ProfilePhotos'
import { ProfilePosts } from 'src/components/Profile/ProfilePosts'
import { ProfilePost } from 'src/components/Profile/ProfilePost'
import { ProfileReviews } from 'src/components/Profile/ProfileReviews'

export class Profile extends React.PureComponent {
  static propTypes = {
    children: PropTypes.any,
    loading: PropTypes.bool,
    openPlaceModalOnReviewTap: PropTypes.bool,
    profile: PropTypes.object,
    onFeedbackSent: PropTypes.func,
    getParallaxViewRef: PropTypes.func,
    type: PropTypes.oneOf(['user', 'place']),
    posts: PropTypes.array
  }
  static defaultProps = {
    loading: false,
    type: 'user',
    posts: []
  }

  state = {

  }

  render () {
    const {
      type,
      children,
      style,
      loading,
      profile,
      onFeedbackSent,
      getParallaxViewRef,
      openPlaceModalOnReviewTap,
      onProfileEdit,
      onPostSent,
      posts,
      ...rest
    } = this.props
    const isUser = type === 'user'
    const attributes = profile && __extractAttributes(profile)

    // todo: remove ProfileTitleText
    return (loading || !profile) ? <ScreenLoader /> : (
      <ProfileContainer {...{ style }}>
        <ProfileTitleText />

        <ParallaxPictureHeader
          getParallaxViewRef={getParallaxViewRef}
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
          paddingHorizontal={PADDING_HORIZONTAL}
          paddingVertical={PADDING_VERTICAL + TITLE_HEIGHT + MARGIN_BOTTOM}
          contentBackgroundColor={BG_COLOR}
          headerBackgroundColor={BG_COLOR}
          backgroundColor={BG_COLOR}
          {...rest}
        >
          {isUser && <ProfileUserDetails user={profile} onProfileEdit={onProfileEdit} />}
          {!isUser && (
            <>
              <ProfileRating {...{ onFeedbackSent, place: profile }} />
              <ProfilePlaceDetails {...{ attributes, place: profile }} />
              <ProfileDistance {...{ attributes, place: profile }} />
              <ProfilePhotos {...{ place: profile }} />
              {!!posts.length && <ProfilePosts {...{ onPostSent, posts }} />}
              <ProfilePost {...{ onPostSent, place: profile }} />
            </>
          )}
          <ProfileReviews {...{ profile, openPlaceModalOnReviewTap }} />
          {children}
        </ParallaxPictureHeader>
      </ProfileContainer>
    )
  }
}

// //
const window = Dimensions.get('window')

const BG_COLOR = '#ffffff'
const PADDING_HORIZONTAL = 20
const PADDING_VERTICAL = 40
const TITLE_HEIGHT = 50
const MARGIN_BOTTOM = 20
const STICKY_HEADER_HEIGHT = 70
const PARALLAX_HEADER_HEIGHT = window.height - PADDING_VERTICAL - TITLE_HEIGHT - MARGIN_BOTTOM

const ProfileContainer = styled.View`
  background-color: ${BG_COLOR};
  flex: 1;
  padding: ${PADDING_VERTICAL / 2}px ${PADDING_HORIZONTAL / 2}px;
`

const ProfileTitleText = styled.Text`
  color: #6e6081;
  text-align: center;
  height: ${TITLE_HEIGHT}px;
`

//

function __extractAttributes ({ attributes = [] } = {}) {
  return attributes.reduce((attrs, placeAttribute) => {
    attrs[ placeAttribute.key ] = placeAttribute.value
    return attrs
  }, {})
}
