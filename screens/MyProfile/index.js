import React, { PureComponent } from 'react'
import { TouchableWithoutFeedback, Image } from 'react-native'
import Drawer from 'react-native-drawer'
import GestureRecognizer from 'react-native-swipe-gestures'
import styled from 'styled-components'

import { UserProfile } from 'src/containers/UserProfile'
import SettingsDrawer from 'src/components/SettingsDrawer'

export default class MyProfile extends PureComponent {
  constructor (props) {
    super(props)

    this.drawerRef = React.createRef()
  }

  openDrawer = () => {
    this.drawerRef.current.open()
  }

  closeDrawer = () => {
    this.drawerRef.current.close()
  }

  render () {
    return (
      <Drawer
        ref={this.drawerRef}
        type='overlay'
        content={<SettingsDrawer closeDrawer={this.closeDrawer} />}
      >
        <SwipableContainer onSwipeRight={this.openDrawer} onSwipeLeft={this.closeDrawer}>
          <TouchableWithoutFeedback onPress={this.openDrawer}>
            <SettingsContainer>
              <Image source={require('./icons/gear.png')} style={{ height: 25, width: 25 }} />
            </SettingsContainer>
          </TouchableWithoutFeedback>

          <UserProfile />
        </SwipableContainer>
      </Drawer>
    )
  }
}

const SwipableContainer = styled(GestureRecognizer)`
  flex: 1;
`

const SettingsContainer = styled.View`
  position: absolute;
  top: 30px;
  left: 15px;
  zIndex: 2;
  alignItems: center;
`
