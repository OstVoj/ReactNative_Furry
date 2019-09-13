import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import NavBar from '../../components/NavBar'
import ViewToggler from '../../components/ViewToggler'
import { PlacesCards } from '../../../../containers/PlacesCards'

export default class ListView extends Component {
  static propTypes = {
    onNavigate: PropTypes.func,
    onViewChange: PropTypes.func,
    view: PropTypes.oneOf(['map', 'list']),
    coords: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }
  static defaultProps = {
    onNavigate: () => {},
    onViewChange: () => {},
    view: 'map',
    coords: { lat: 0, lng: 0 }
  }

  render () {
    const {
      onNavigate,
      onViewChange,
      view,
      coords
    } = this.props

    return (
      <ListViewContainer>
        <NavBar onItemPress={onNavigate} />

        <ViewTogglerContainer>
          <ViewToggler onToggle={onViewChange} view={view} />
        </ViewTogglerContainer>

        <PlacesCards
          style={{ marginTop: 28 }}
          coords={coords}
        />
      </ListViewContainer>
    )
  }
}

const ListViewContainer = styled.View`
  background-color: #ffffff;
  flex: 1;
  backgroundColor: #E9DBD9
`

const ViewTogglerContainer = styled.View`
  paddingHorizontal: 30
`
