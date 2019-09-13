import React from 'react'
import Svg, { Path } from 'react-native-svg'

export function IconMapMarker ({ fill, size = 96, ...rest }) {
  return (
    <Svg
      viewBox='0 0 33.468 33.468'
      width={size}
      height={size}
      {...rest}
    >
      <Path
        {...{ fill }}
        d='M16.734 0C9.375 0 3.408 5.966 3.408 13.325c0 11.076 13.326 20.143 13.326 20.143S30.06 23.734 30.06 13.324C30.06 5.965 24.093 0 16.734 0zm0 19.676a6.353 6.353 0 1 1 6.352-6.351 6.352 6.352 0 0 1-6.352 6.351z'
      />
    </Svg>
  )
}
