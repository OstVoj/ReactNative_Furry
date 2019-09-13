import React from 'react'
import styled from 'styled-components'
import is, { isNot } from 'styled-is'

export function InputText ({ fluid, ...rest }) {
  return (
    <InputContainer {...{ fluid }}>
      <InputText$$ {...rest} />
    </InputContainer>
  )
}

const InputText$$ = styled.TextInput.attrs({
  underlineColorAndroid: 'transparent'
})`
  height: 45px;
  flex: 1;
  padding: 0 15px;
`

const InputContainer = styled.View`
  background-color: ${props => props.theme.colors.white};
  border-radius: 5px;
  height: 45px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  
  ${is('fluid')`
    flex: 1;
  `}
  ${isNot('fluid')`
    width: 70%;
  `}
`
