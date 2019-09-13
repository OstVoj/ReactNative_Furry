import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'
import PropTypes from 'prop-types'

TextButton.propTypes = {
  onPress: PropTypes.func,
  black: PropTypes.bool,
  white: PropTypes.bool
}

export function TextButton ({ children, white, black, ...rest }) {
  return (
    <ButtonWrapper {...rest}>
      <ButtonText {...{ white, black, children }} />
    </ButtonWrapper>
  )
}

// //
const ButtonWrapper = styled.TouchableOpacity`
  padding: 0 5px;
`
const ButtonText = styled.Text`
  color: ${props => props.theme.colors.grey85};
  font-size: 16px;
  font-weight: bold;
  font-family: Inter UI;
  
  ${is('white')`
    color: ${props => props.theme.colors.white};
  `}
  ${is('black')`
    color: ${props => props.theme.colors.black};
  `}
`
