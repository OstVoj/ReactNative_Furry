import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

CloseButton.propTypes = {
  onPress: PropTypes.func
}

export function CloseButton ({ onPress, style }) {
  return (
    <CloseButtonTouchable {...{ onPress, style }}>
      <CloseImage source={require('src/assets/icons/close.png')} />
    </CloseButtonTouchable>
  )
}

// //
const CloseButtonTouchable = styled.TouchableOpacity`
  position: relative;
  height: 30px;
  width: 30px;
  justify-content: center;
`
const CloseImage = styled.Image`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`
