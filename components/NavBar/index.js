import React from 'react'
import styled from 'styled-components'

import NavBarIcon from './NavBarIcon'

import ProfileIcon from './icons/profile-new.png'
import HomeIcon from './icons/home.png'
import ExploreIcon from './icons/explore-new.png'

export default function NavBar ({ onItemPress }) {
  const onProfilePress = () => onItemPress('profile')
  const onExplorePress = () => onItemPress('explore')

  return (
    <Container>
      <NavBarIcon onPress={onProfilePress} icon={ProfileIcon} />
      <NavBarIcon icon={HomeIcon} active />
      <NavBarIcon onPress={onExplorePress} icon={ExploreIcon} />
    </Container>
  )
}

const Container = styled.View`
  flexDirection: row;
  justifyContent: center;
  align-content: flex-start;
`
