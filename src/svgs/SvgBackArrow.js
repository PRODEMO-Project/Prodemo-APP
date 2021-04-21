import * as React from "react"
import Svg, { Path } from "react-native-svg"

interface Props {
  color?: string;
}

function SvgComponent(props: Props) {
  return (
    <Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
      <Path
        d='M11.12,2.58L9.94,1.4L3.34,8l6.6,6.6l1.18-1.18L5.7,8L11.12,2.58z'
        fill={props.color ? props.color : "#FFF"}
      />
    </Svg>
  )
}

const SvgBackArrow = React.memo(SvgComponent)
export default SvgBackArrow
