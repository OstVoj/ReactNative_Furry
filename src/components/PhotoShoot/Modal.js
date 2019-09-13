import React from 'react'
import { Modal } from 'react-native'

import { ModalCloseIcon } from 'src/components/Modal/CloseIcon'
import { PhotoShoot } from 'src/components/PhotoShoot/index'

export function PhotoShootModal ({ onClose, onPictureTaken, isVisible }) {
  return (
    <Modal
      animationIn='zoomInDown'
      animationOut='zoomOutUp'
      visible={isVisible}
      onRequestClose={onClose}
    >
      <ModalCloseIcon onPress={onClose} />

      <PhotoShoot {...{ onPictureTaken }} />
    </Modal>

  )
}
