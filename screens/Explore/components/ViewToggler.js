import React from 'react'
import styled from 'styled-components'
import is from 'styled-is'

import { IconGrid } from 'src/components/Icons/Grid'
import { IconMapMarker } from 'src/components/Icons/MapMarker'

export default function ViewToggler ({ onToggle, view = 'list' }) {
  const onMapView = () => onToggle('map')
  const onListView = () => onToggle('list')

  return (
    <ToggleContainer>
      <ViewToggleButton onPress={onMapView} isActive={view === 'map'} left>
        <IconMapMarker fill='#fff' size={25} />
      </ViewToggleButton>

      <ViewToggleButton onPress={onListView} isActive={view === 'list'} right>
        <IconGrid fill='#fff' size={25} />
      </ViewToggleButton>
    </ToggleContainer>
  )
}

// //
const ToggleContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`
const ViewToggleButton = styled.TouchableOpacity`
  background-color: #9ce4fa;
  padding: 10px 20px;
  
  ${is('isActive')`
    background-color: #4ed4fa;
  `};
  ${is('left')`
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  `};
  ${is('right')`
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  `};
`
