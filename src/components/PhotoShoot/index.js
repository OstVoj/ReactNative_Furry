import React from 'react'
import Camera, { RNCamera } from 'react-native-camera'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Dimensions } from 'react-native'
import is from 'styled-is'

import { CameraButton } from 'src/components/Buttons/Camera'
import { ModalCloseIcon } from 'src/components/Modal/CloseIcon'

export class PhotoShoot extends React.PureComponent {
  static propTypes = {
    onPictureTaken: PropTypes.func,
    onCancel: PropTypes.func
  }
  static defaultProps = {
    onPictureTaken: () => {}
  }

  state = {
    photoUri: null,
    photoBase64: null
  }

  _camera = null

  takePicture = async () => {
    if (!this._camera) {
      return
    }
    const options = { quality: 0.8, base64: true, fixOrientation: true }
    const data = await this._camera.takePictureAsync(options)

    this.setState({
      photoUri: data.uri,
      photoBase64: data.base64
    })
  }

  handleOnPressRetake = () => this.setState({ photoUri: null, photoBase64: null })

  handleOnPressAccept = () => this.props.onPictureTaken(this.state)

  render () {
    const { onCancel } = this.props
    const { photoUri } = this.state

    return (
      <PhotoShootContainer>
        {onCancel && <ModalCloseIcon onPress={onCancel} />}
        {
          photoUri ? (
            <PhotoBackground source={{ uri: photoUri }} resizeMode='cover'>
              <ButtonsContainer>
                <Button left onPress={this.handleOnPressRetake}>
                  <ButtonText>Retake</ButtonText>
                </Button>

                <Button accent right onPress={this.handleOnPressAccept}>
                  <ButtonText>Accept</ButtonText>
                </Button>
              </ButtonsContainer>
            </PhotoBackground>
          ) : (
            <PhotoBackground
              as={RNCamera}
              ref={ref => (this._camera = ref)}
              aspect={Camera.constants.Aspect.fill}
              permissionDialogTitle='Permission to use camera'
              permissionDialogMessage='We need your permission to use your camera phone'
            >
              <ButtonsContainer>
                <CameraButton onPress={this.takePicture} />
              </ButtonsContainer>
            </PhotoBackground>
          )
        }
      </PhotoShootContainer>
    )
  }
}

// //
const window = Dimensions.get('window')

const PhotoShootContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`
const PhotoBackground = styled.ImageBackground`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  height: ${window.height};
  width: ${window.width};
`
const ButtonsContainer = styled.View`
  flex-direction: row;
  flex: 1;
  position: absolute;
  bottom: 0;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`
const Button = styled.TouchableOpacity`
  padding: 12px 15px;
  background-color: #9ce4fa;
  align-items: center;
  align-self: center;
  
  ${is('accent')`
      background-color: #4ed4fa;
  `}
  ${is('left')`
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
  `};
  ${is('right')`
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
  `};
`
const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
`
