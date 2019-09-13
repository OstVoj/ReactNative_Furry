import React from 'react'
import { Modal } from 'react-native'
import CustomizableModal from 'react-native-modal'

import { PlaceProfile } from 'src/containers/PlaceProfile'
import { ModalCloseIcon } from 'src/components/Modal/CloseIcon'
import { ModalContainer } from 'src/components/Modal/ModalContainer'

const ModalComponent = ({ slideFromLeft, isVisible, onClose, children }) => {
  if (slideFromLeft) {
    return (
      <CustomizableModal
        style={{ margin: 0 }}
        animationIn='slideInLeft'
        animationOut='slideOutLeft'
        isVisible={isVisible}
      >
        {children}
      </CustomizableModal>
    )
  }

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={isVisible}
      onRequestClose={onClose}
    >
      {children}
    </Modal>
  )
}

export function PlacesProfileModal ({ slideFromLeft = false, isVisible, placeId, onClose }) {
  return (
    <ModalComponent
      slideFromLeft={slideFromLeft}
      isVisible={isVisible}
      onClose={onClose}
    >
      <ModalContainer>
        <ModalCloseIcon onPress={onClose} />

        <PlaceProfile placeId={placeId} />
      </ModalContainer>
    </ModalComponent>
  )
}
