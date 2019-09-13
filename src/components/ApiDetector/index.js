import React from 'react'
import { connect } from 'react-redux'
import { Picker } from 'react-native-picker-dropdown'
import styled from 'styled-components'

import { AppLoading } from 'src/components/AppLoading'
import {
  apiDetectorSelector,
  apiDetectorServersSelector
} from 'src/components/ApiDetector/selectors'
import { apiServerDetectRequest } from 'src/components/ApiDetector/actions'
import { isArray } from 'src/utils/fn'
import { AppContainer } from 'src/components/UI/AppContainer'
import api from 'ffw/api'

const mapStateToProps = state => ({
  isApiDetected: apiDetectorSelector(state).isApiDetected,
  isFetching: apiDetectorSelector(state).isFetching,
  servers: apiDetectorServersSelector(state)
})
const mapDispatchToProps = {
  apiServerDetectRequest
}

@connect(
  mapStateToProps,
  mapDispatchToProps
)
export class ApiDetector extends React.PureComponent {
  static defaultProps = {
    children: null
  }
  state = {
    apiServer: null
  }

  componentDidMount () {
    this.props.apiServerDetectRequest()
  }

  onApiServerChange = apiServer => {
    console.log(apiServer)
    api.setUrl(apiServer)
    this.setState({ apiServer })
  }

  renderServersList = () => {
    const { apiServer } = this.state
    const { servers } = this.props
    const defaultItems = [{ label: 'tap to select', url: '' }]

    return (
      <ServersListContainer>
        <Title>Please select an API Server</Title>
        <ApiServerPicker
          selectedValue={apiServer}
          onValueChange={this.onApiServerChange}
        >
          {defaultItems.concat(servers).map(({ label, url }) => (
            <Picker.Item {...{ label, value: url, key: `${url}` }} />
          ))}
        </ApiServerPicker>
      </ServersListContainer>
    )
  }

  render () {
    const {
      isApiDetected,
      isFetching,
      servers,
      children
    } = this.props
    const { apiServer } = this.state

    const showLoading = isFetching || !isApiDetected
    const showServerList = isApiDetected && isArray(servers) && servers.length > 0 && !apiServer

    return showLoading
      ? <AppLoading />
      : showServerList
        ? <AppContainer>{this.renderServersList()}</AppContainer>
        : children
  }
}

// //

const ServersListContainer = styled.View`
  align-items: center;
  justify-content: center;
  margin: auto 0;
  background-color: ${props => props.theme.colors.white};
  padding: 20px 10px;
  border-radius: 5px;
`
const ApiServerPicker = styled(Picker)`
  width: 100%;
  flex: 1;
  margin-top: 2px;
`
const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${props => props.theme.colors.black};
`
