import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

function SvgComponent(props) {
  return (
    <Svg width={20} height={20} viewBox='0 0 527 527' fill='#0f4c81' {...props}>
      <Path d='M263.5 0C118.2 0 0 118.2 0 263.5S118.2 527 263.5 527 527 408.8 527 263.5 408.8 0 263.5 0zm185.6 390.3c-43.5-22.3-111-48.9-185.6-48.9S121.4 368 77.9 390.3c-.6.3-1.2.6-1.8 1-26-38-39.7-82-39.7-127.8 0-125.3 101.9-227.2 227.2-227.2 125.3 0 227.2 101.9 227.2 227.2 0 45.8-13.7 89.8-39.7 127.8l-2-1zm-78.9-190.8c0 58.9-47.8 106.7-106.7 106.7-58.9 0-106.7-47.8-106.7-106.7 0-58.9 47.8-106.7 106.7-106.7 58.9 0 106.7 47.8 106.7 106.7z' />
    </Svg>
  )
}

const SvgAvatar = React.memo(SvgComponent)
export default SvgAvatar
