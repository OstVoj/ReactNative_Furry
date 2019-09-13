import React, { Component } from 'react'
import { TouchableWithoutFeedback, Dimensions } from 'react-native'
import styled from 'styled-components'

import NavBar from './components/NavBar'

export default class SettingsDrawer extends Component {
  __onNavigate = (navigateTo) => {
    const { onNavigate } = this.props
    onNavigate && onNavigate(navigateTo)
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={this.props.closeDrawer}>
        <Container>
          <InnerContainer>
            <NavBar onItemPress={this.__onNavigate} />
          </InnerContainer>
        </Container>
      </TouchableWithoutFeedback>
    )
  }
}

const { width } = Dimensions.get('window')

const Container = styled.View`
  flex: 1;
`

const InnerContainer = styled.View`
  flex: 1;
  width: ${width / 3};
  paddingHorizontal: 15px;
  backgroundColor: #FFF;
`
