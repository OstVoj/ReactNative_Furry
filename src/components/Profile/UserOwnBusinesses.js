import React from 'react'
import { FlatList } from 'react-native'
import styled from 'styled-components'

import { PlacesProfileModal } from 'src/containers/PlaceProfile/Modal'
import { ProfileCard } from 'src/components/Profile/ui/ProfileCard'

export class UserOwnBusinesses extends React.PureComponent {
  state = {
    modalVisible: false,
    placeId: null
  }

  closePlaceProfileModal = () => this.setState(() => ({ modalVisible: false }))

  openPlaceProfileModal = placeId => this.setState({
    placeId,
    modalVisible: true
  })

  keyExtractor = item => `${item.id}`;

  renderItem = ({ item }) => (
    <PlaceListItem
      id={item.id}
      name={item.name}
      onItemPress={this.openPlaceProfileModal}
    />
  );

  render () {
    const { profile } = this.props
    const { modalVisible, placeId } = this.state

    return (
      <>
        <Container>
          <Title>Profiles you own</Title>

          <FlatList
            data={profile.ownBusinesses}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        </Container>

        <PlacesProfileModal
          isVisible={modalVisible}
          placeId={placeId}
          onClose={this.closePlaceProfileModal}
        />
      </>
    )
  }
}

class PlaceListItem extends React.PureComponent {
  onPress = () => {
    this.props.onItemPress(this.props.id)
  };

  render () {
    return (
      <PlaceItemContainer onPress={this.onPress}>
        <PlaceItemText>
          {this.props.name}
        </PlaceItemText>
      </PlaceItemContainer>
    )
  }
}

// //
const Container = styled(ProfileCard)``
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.black}
`
const PlaceItemContainer = styled.TouchableOpacity`
  padding: 10px 15px;
`
const PlaceItemText = styled.Text`
  font-size: 18px;
`
