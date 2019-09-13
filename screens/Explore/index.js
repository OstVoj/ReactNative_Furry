import React, { Component } from 'react'
import PropTypes from 'prop-types'

import ListView from './containers/ListView'
import MapView from './containers/MapView'

export default class Explore extends Component {
  static propTypes = {
    onViewUpdate: PropTypes.func,
    view: PropTypes.oneOf(['map', 'list'])
  }
  static defaultProps = {
    onViewUpdate: () => {},
    view: 'map'
  }

  state = {
    centerCoords: null
  }

  onRegionChange = ({ lat, lng }) => {
    this.setState({ centerCoords: { lat, lng } })
  }

  render () {
    const {
      onViewUpdate,
      view
    } = this.props

    const { centerCoords } = this.state

    if (view === 'list') {
      return (
        <ListView
          onViewChange={onViewUpdate}
          onNavigate={this.props.onNavigate}
          view={view}
          coords={centerCoords}
        />
      )
    }

    return (
      <MapView
        onViewChange={onViewUpdate}
        onNavigate={this.props.onNavigate}
        onRegionChange={this.onRegionChange}
        view={view}
      />
    )
  }
}
