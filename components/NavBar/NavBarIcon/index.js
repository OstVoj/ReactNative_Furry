import React from 'react'
import { Image, TouchableWithoutFeedback } from 'react-native'
import styled from 'styled-components'

export default function NavBarIcon ({ icon, onPress, active }) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <IconContainer active={active}>
          <Image source={icon} width={10} />
        </IconContainer>
      </Container>
    </TouchableWithoutFeedback>
  )
}

const Container = styled.View`
  paddingHorizontal: 20px;
  paddingBottom: 15px;
`

const IconContainer = styled.View`
  paddingTop: 15px;
  borderStyle: solid;
  borderTopColor: ${props => props.active ? '#FFF' : 'transparent'};
  borderTopWidth: 3px;
`
