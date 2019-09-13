import React from 'react'
import styled from 'styled-components'
import { TouchableOpacity, ActivityIndicator, View } from 'react-native'
import is, { isNot } from 'styled-is'
import PropTypes from 'prop-types'

import theme from 'src/theme'

Button.propTypes = {
  ...TouchableOpacity.propTypes,
  isLoading: PropTypes.bool,
  black: PropTypes.bool
}

export function Button ({ children, black, onPress, isLoading, ...rest }) {
  const buttonWrapperProps = {
    black,
    ...(isLoading ? { as: View } : { onPress }),
    ...rest
  }
  const activityIndicatorColor = black ? theme.colors.white : theme.colors.grey85

  return (
    <ButtonWrapper {...buttonWrapperProps}>
      {isLoading ? (
        <ActivityIndicator size='small' color={activityIndicatorColor} />
      ) : (
        <ButtonText {...{ black, children }} />
      )}
    </ButtonWrapper>
  )
}

// //
const ButtonWrapper = styled.TouchableOpacity`
  margin-bottom: 20px;
  padding: 12px 15px;
  border-radius: 5px;
  background-color: ${props => props.theme.colors.skyBlue};
  align-items: center;

  ${is('fluid')`
    flex: 1;
  `}
  ${isNot('fluid')`
    width: 70%;
  `}
  
  ${is('black')`
    background-color: ${props => props.theme.colors.woodBlue};
  `}
`
const ButtonText = styled.Text`
  color: ${props => props.theme.colors.grey85};
  font-size: 16px;
  font-weight: bold;
  font-family: Inter UI;
  
  ${is('black')`
    color: ${props => props.theme.colors.white};
  `}
`
