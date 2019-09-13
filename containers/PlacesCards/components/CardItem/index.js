/* eslint-disable camelcase */
import React, { Component } from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import PropTypes from 'prop-types'
import styled from 'styled-components'

export default class CardItem extends Component {
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
      <BackgroundImageContainer
        source={{ uri: cover_photo }}
        imageStyle={{ borderRadius: 10 }}
      >
        <ItemWithImageContainer transparent pointerEvents='none'>
          {this.renderItem()}
        </ItemWithImageContainer>
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

const TRANSPARENT_LINEAR_BG = ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.8)']
const PURPLE_LINEAR_BG = ['rgb(102,85,118)', 'rgb(123, 102, 142)']

// //
const ItemContainer = styled(LinearGradient).attrs({
  colors: props => props.transparent ? TRANSPARENT_LINEAR_BG : PURPLE_LINEAR_BG
})`
  flex: 1;
  borderRadius: 10;
  margin: 10px;
`

const ItemWithImageContainer = styled(ItemContainer)`
  margin: 0
`

const BackgroundImageContainer = styled.ImageBackground`
  flex: 1;
  margin: 10px;
`

const CardContainer = styled.View.attrs({ pointerEvents: 'none' })`
  flex: 1;
  justifyContent: flex-end;
  padding: 10px;
`

const CardTitle = styled.Text.attrs({ numberOfLines: 3 })`
  color: #FFFFFF;
  fontSize: 34px;
  letter-spacing: -0.3px;
`
