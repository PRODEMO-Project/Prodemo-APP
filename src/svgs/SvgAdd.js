import * as React from 'react'
import Svg, { Path, Circle } from 'react-native-svg'

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox='0 0 20 20' fill='#0C7221' {...props}>
      <Circle
        cx='10'
        cy='10'
        r='8'
        fill={props?.bg ? props.bg : 'transparent'}
      />
      <Path d='M10 0C4.5 0 0 4.5 0 10s4.5 10 10 10 10-4.5 10-10S15.5 0 10 0zm4 11h-3v3c0 .6-.4 1-1 1s-1-.4-1-1v-3H6c-.6 0-1-.4-1-1s.4-1 1-1h3V6c0-.6.4-1 1-1s1 .4 1 1v3h3c.6 0 1 .4 1 1s-.4 1-1 1z' />
    </Svg>
  )
}

const SvgAdd = React.memo(SvgComponent)
export default SvgAdd
