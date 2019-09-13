/* eslint-disable camelcase */
import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class CardItemFullScreen extends Component {
  static propTypes = {
    name: PropTypes.string,
    id: PropTypes.number.isRequired,
    cover_photo: PropTypes.string
  }

  static defaultProps = {
    name: '',
    cover_photo: null
  }

  __onPress = () => {
    const { onPress, id } = this.props

    if (onPress) {
      onPress(id)
    }

    return false
  }

  renderItem = () => {
    const { name } = this.props
    const nameFixed = String(name).replace(/\\u0026/g, '&')

    return (
      <CardContainer>
        <CardTitle>{nameFixed}</CardTitle>
      </CardContainer>
    )
  }

  renderImage = () => {
    const { cover_photo } = this.props

    if (!cover_photo) {
      return (
        <ItemContainer>
          {this.renderItem()}
        </ItemContainer>
      )
    }

    return (
      <BackgroundImageContainer source={{ uri: cover_photo }}>
        <ItemContainer transparent pointerEvents='none'>
          {this.renderItem()}
        </ItemContainer>
      </BackgroundImageContainer>
    )
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={this.__onPress}>
        {this.renderImage()}
      </TouchableWithoutFeedback>
    )
  }
}

const TRANSPARENT_BG = ['rgba(22, 24, 35, 0.3)', 'rgba(22, 24, 35, 0.3)']
const PURPLE_LINEAR_BG = ['rgb(102,85,118)', 'rgb(123, 102, 142)']

// //
const ItemContainer = styled(LinearGradient).attrs({
  colors: props => props.transparent ? TRANSPARENT_BG : PURPLE_LINEAR_BG
})`
  flex: 1;
`

const BackgroundImageContainer = styled.ImageBackground`
  flex: 1;
`

const CardContainer = styled.View.attrs({ pointerEvents: 'none' })`
  flex: 1;
  justifyContent: flex-end;
  padding: 0 15px 150px 15px;
`

const CardTitle = styled.Text.attrs({ numberOfLines: 3 })`
  color: #FFFFFF;
  fontSize: 34px;
  letter-spacing: -0.3px;
`
