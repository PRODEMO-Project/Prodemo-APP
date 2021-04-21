import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={22} height={22} viewBox='0 0 22 22' fill='none' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M3.4,11c0,0.9-0.8,1.7-1.7,1.7S0,11.9,0,11s0.8-1.7,1.7-1.7S3.4,10.1,3.4,11z M11,9.3c-0.9,0-1.7,0.8-1.7,1.7
        s0.8,1.7,1.7,1.7s1.7-0.8,1.7-1.7S11.9,9.3,11,9.3z M20.3,9.3c-0.9,0-1.7,0.8-1.7,1.7s0.8,1.7,1.7,1.7S22,11.9,22,11
        S21.2,9.3,20.3,9.3z'
        fill='#969696'
      />
    </Svg>
  )
}

const SvgDots = React.memo(SvgComponent)
export default SvgDots
