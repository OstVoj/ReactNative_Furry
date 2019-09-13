import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { Bubbles } from 'react-native-loader'
import Mapbox from '@mapbox/react-native-mapbox-gl'
import Autocomplete from 'react-native-autocomplete-input'

import fetch from 'cross-fetch'
import api from 'ffw/api'
import { log } from 'src/utils/fn'

import { geoLocationCoordsSelector } from 'src/components/GeoLocation/selectors'

const mapStateToProps = state => ({
  userLocation: geoLocationCoordsSelector(state)
})

const accessToken = 'pk.eyJ1IjoidGVjaGllZG9kIiwiYSI6ImNqbW5vYWMwZzB3MGQzcWxiYzF3YnpydXEifQ.RNtj2DNEAdFWvRShLmhvGQ'
Mapbox.setAccessToken(accessToken)

@connect(mapStateToProps)
export class CreateBusiness extends React.PureComponent {
  state = {
    name: null,
    address: null,
    coordinates: null,
    isSubmitting: false,
    searchedAddresses: null
  }

  onUpdateName = name => this.setState({ name })

  onUpdateAddress = address => {
    this.setState({ address })
    fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=5&access_token=' + accessToken)
      .then((response) => response.json())
      .then((responseJson) => {
        if (!responseJson.features) {
          this.setState({
            searchedAddresses: null
          })
          return
        }
        if (responseJson.features.length > 0) {
          this.setState({
            searchedAddresses: responseJson.features
          })
        }
      })
  }

  onSelectAddress = address => {
    this.setState({
      searchedAddresses: null,
      address: address.place_name,
      coordinates: address.center
    })
  }

  renderAddressItem = item => {
    return (
      <AutoCompleteTouchableOpacity onPress={() => this.onSelectAddress(item)}>
        <AutoCompleteText>{item.place_name}</AutoCompleteText>
      </AutoCompleteTouchableOpacity>
    )
  }

  setAddressFromCoordinates = () => {
    const { coordinates } = this.state
    if (coordinates) {
      fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/' + coordinates[0] + ',' + coordinates[1] + '.json?access_token=' + accessToken)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.features.length > 0) {
            this.setState({
              address: responseJson.features[0].place_name
            })
          }
        })
    }
  }

  onMapRegionIsChanging = async () => {
    const coordinates = await this.refs.mapView.getCenter()
    this.setState({
      coordinates
    })
  }

  onMapRegionDidChange = () => {
    this.setAddressFromCoordinates()
  }

  createBusiness = async () => {
    const { name, address, coordinates } = this.state
    const { onCreateBusiness } = this.props
    if (name && address) {
      this.setState({ isSubmitting: true })
      const data = {
        name,
        address,
        lat: coordinates[1],
        lng: coordinates[0]
      }
      try {
        const response = await api.create({
          route: `businesses`,
          data
        })

        this.setState({ isSubmitting: false })

        if (!response.errors) {
          onCreateBusiness(response)
        } else {
          log.error('SERVER ERROR', response)
          // TODO: treat error
        }
      } catch (e) {
        this.setState({ isSubmitting: false })
        log.error('SERVER ERROR', e)
      }
    }
  }

  renderAnnotation = () => {
    const { coordinates } = this.state
    return (
      coordinates && <Mapbox.PointAnnotation
        key='pointAnnotation'
        id='pointAnnotation'
        coordinate={[coordinates[0], coordinates[1]]}
        title='user location'
      >
        <AnnotationFillView />
      </Mapbox.PointAnnotation>
    )
  }

  render () {
    const { name, address, coordinates, isSubmitting, searchedAddresses } = this.state
    const { userLocation } = this.props

    return (
      <ContainerView>
        <Mapbox.MapView
          styleURL={Mapbox.StyleURL.Street}
          zoomLevel={16}
          centerCoordinate={coordinates ? [coordinates[0], coordinates[1]] : [userLocation.lng, userLocation.lat]}
          showUserLocation
          logoEnabled={false}
          style={{ flex: 1 }}
          onRegionIsChanging={this.onMapRegionIsChanging}
          onRegionDidChange={this.onMapRegionDidChange}
          ref='mapView'
        >
          {this.renderAnnotation()}
        </Mapbox.MapView>
        <ContentContainer>
          <NameInputText
            returnKeyType='done'
            placeholder='Name'
            onChangeText={this.onUpdateName}
            value={name}
          />
          <Autocomplete
            data={searchedAddresses || []}
            autoCapitalize='none'
            placeholder='Address'
            autoCorrect={false}
            defaultValue={address}
            onChangeText={this.onUpdateAddress}
            renderItem={this.renderAddressItem}
            inputContainerStyle={{
              height: 40,
              backgroundColor: '#ffffff',
              borderRadius: 6,
              paddingRight: 5,
              paddingLeft: 5,
              borderWidth: 0,
              marginTop: 20
            }}
            listContainerStyle={{
              borderWidth: 0
            }}
          />
          <CreateBusinessButton onPress={this.createBusiness}>
            {isSubmitting ? (
              <Bubbles size={5} color='#FFFFFF' />
            ) : (
              <CreateBusinessButtonText>CREATE BUSINESS</CreateBusinessButtonText>
            )}
          </CreateBusinessButton>
        </ContentContainer>
      </ContainerView>
    )
  }
}

const ContainerView = styled.View`
  flex: 1;
`
const CreateBusinessButton = styled.TouchableOpacity`
  opacity: ${props => props.dsiabled ? 0.5 : 1};
  width: 100%;
  align-self: center;
  align-items: center;
  justify-content: center;
  padding: 7px;
  margin: 15px 0;
  background-color: #2a464e;
  height: 40px;
  border-radius: 5px;
  flex-direction: row;
`

const CreateBusinessButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-family: Inter UI;
  font-weight: bold;
  margin-right: 10px;
`

const ContentContainer = styled.View`
  width: 100%;
  top: 0;
  left: 0;
  position: absolute;
  paddingHorizontal: 15px;
  zIndex: 2;
  paddingTop: 50px;
`

const NameInputText = styled.TextInput.attrs({ placeholderTextColor: '#afb1b2' })`
  width: 100%;
  height: 40px;
  backgroundColor: #ffffff;
  margin-top: 20px;
  border-radius: 6px;
  padding: 5px 5px 5px 5px;
`

const AnnotationFillView = styled.View`
  width: 20px;
  height: 20px;
  borderRadius: 10px;
  border: 5px solid white;
  backgroundColor: black;
`
const AutoCompleteTouchableOpacity = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  height: 40px;
`

const AutoCompleteText = styled.Text`
  color: #000;
  text-align: left;
  font-family: Inter UI;
  font-weight: bold;
  margin-left: 10px;
`
