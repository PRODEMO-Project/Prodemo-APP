import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg width={16} height={16} viewBox='0 0 20 20' fill='#0C7221' {...props}>
      <Path d='M10,0C4.5,0,0,4.5,0,10s4.5,10,10,10s10-4.5,10-10S15.5,0,10,0z M11,11H6c-0.6,0-1-0.4-1-1v0c0-0.6,0.4-1,1-1h3h5c0.6,0,1,0.4,1,1v0c0,0.6-0.4,1-1,1H11z' />
    </Svg>
  )
}

const SvgRemove = React.memo(SvgComponent)
export default SvgRemove
