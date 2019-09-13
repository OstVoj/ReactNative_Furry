import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { CloseButton } from 'src/components/Buttons/Close'

ModalCloseIcon.propTypes = {
  onPress: PropTypes.func
}

export function ModalCloseIcon ({ onPress, style }) {
  return (
    <CloseIconContainer {...{ style }}>
      <CloseButton {...{ onPress }} />
    </CloseIconContainer>
  )
}

// //
const CloseIconContainer = styled.View`
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 3;
`
