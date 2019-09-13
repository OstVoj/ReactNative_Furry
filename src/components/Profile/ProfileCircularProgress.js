import React from 'react'
import styled from 'styled-components'
import { Dimensions } from 'react-native'

import AnimatedNumber from 'ffw/components/AnimatedNumber'
import { AnimatedCircularProgress } from 'ffw/components/AnimatedCircularProgress'

export function ProfileCircularProgress ({ rating, pause }) {
  rating = Math.round(rating) // TODO: remove when server sends integer

  return (
    <ProfileCircularProgressContainer>
      <AnimatedCircularProgress
        size={window.width - 100}
        width={30}
        prefill={0}
        fill={rating}
        tintColor='#4CD964'
        backgroundColor='#cdccd4'
        endGradColor='#88d2d6'
        startGradColor='#8bcf8d'
        pause={pause}
        rotation={0}
        lineCap='round'
      />

      <CircularProgressNumberContainer>
        <ProfileAnimatedNumber
          countBy={2}
          value={rating}
          formatter={__formatRatingPercent}
          pause={pause}
        />
      </CircularProgressNumberContainer>
    </ProfileCircularProgressContainer>
  )
}

// //
const window = Dimensions.get('window')

const ProfileCircularProgressContainer = styled.View`
  align-self: center;
  margin: 20px 20px 20px;
`
const CircularProgressNumberContainer = styled.View`
  position: absolute;
  width: ${window.width - 160};
  height: ${window.width - 160};
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: ${(window.width - 160) / 2};
  top: 30px;
  left: 30px;
`
const ProfileAnimatedNumber = styled(AnimatedNumber)`
  font-size: 60;
  color: #2c2f32;
  font-family: 'Inter UI';
  font-weight: bold
`

function __formatRatingPercent (val) {
  return val + '%'
}
