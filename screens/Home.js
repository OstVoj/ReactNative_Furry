import React, { Component } from 'react'
import SwipeUpDown from 'react-native-swipe-up-down'
import styled from 'styled-components'

import NavBar from '../components/NavBar'
import { PhotoShootModal } from 'src/components/PhotoShoot/Modal'
import { PhotoShoot } from 'src/components/PhotoShoot/index'
import { PlacesCards } from '../containers/PlacesCards'

export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showCamera: false,
      swipeableAreaBackground: false,
      showInputField: true
    }

    this.__onToggleCamera = () => {
      this.setState(previousState => ({
        showCamera: !previousState.showCamera
      }))
    }
  }

  onPictureTaken = (data) => {
    console.info('Home -> onPictureTaken', { data })
    this.setState({ showCamera: false })
  }

  onSwipeUp = () => {
    this.props.verticalSwipeActive(false)
    this.setState({
      swipeableAreaBackground: true,
      showInputField: false
    })
  }
  onSwipeDown = () => {
    this.props.verticalSwipeActive(true)
    this.setState({
      swipeableAreaBackground: false,
      showInputField: true
    })
  }

  render () {
    const { showCamera } = this.state

    return (
      <>
        <Container>
          <PlacesCards withFeedSwiper slideModalFromLeft fullScreen />

          <NavContainer>
            <NavBar onItemPress={this.props.onNavigate} />
          </NavContainer>
        </Container>
        <SwipeUpDown
          animation='easeInEaseOut'
          itemMini={
            <SwipeUpMiniContainer
              onStartShouldSetResponder={() => { this.onSwipeUp() }}
            />
          } // Pass props component when collapsed
          itemFull={
            <SwipeUpFullContainer>
              <PhotoShoot />
            </SwipeUpFullContainer>
          } // Pass props component when show full
          onShowMini={() => { this.onSwipeDown() }}
          onShowFull={() => { this.onSwipeUp() }}
          // onMoveDown={() => { this.onSwipeDown() }}
          // onMoveUp={() => { this.onSwipeUp() }}
          disablePressToShow // Press item mini to show full
          style={{
            height: 20,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            backgroundColor: this.state.swipeableAreaBackground ? '#000' : 'transparent'
          }} // style for swipe
        />
        <PhotoShootModal {...{
          isVisible: showCamera,
          onPictureTaken: this.onPictureTaken,
          onClose: this.__onToggleCamera
        }} />
      </>
    )
  }
}

const Container = styled.View`
  flex: 1;
`

const SwipeUpMiniContainer = styled.View`
  width: 100%;
  height: 20px;
  borderTopLeftRadius: 0;
  background-color: #000;
`

const SwipeUpFullContainer = styled.View`
  backgroundColor: #FFF;
  width: 100%;
  height: 100%;
`

const NavContainer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 82px;
  background-color: rgba(22, 24, 25, 0.5);
`
