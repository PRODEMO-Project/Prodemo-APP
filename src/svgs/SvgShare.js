import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <>
      <Svg width={16} height={16} viewBox='0 0 16 16' fill='none' {...props}>
        <Path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M12.05,11.31c-0.61,0-1.16,0.24-1.57,0.62L4.75,8.59c0.04-0.18,0.07-0.37,0.07-0.56S4.79,7.65,4.75,7.47
          l5.66-3.3c0.43,0.4,1,0.65,1.64,0.65c1.33,0,2.41-1.08,2.41-2.41S13.38,0,12.05,0S9.64,1.08,9.64,2.41c0,0.19,0.03,0.38,0.07,0.56
          l-5.66,3.3c-0.43-0.4-1-0.65-1.64-0.65C1.08,5.62,0,6.7,0,8.03s1.08,2.41,2.41,2.41c0.63,0,1.2-0.25,1.64-0.65l5.72,3.34
          C9.73,13.3,9.7,13.48,9.7,13.65c0,1.29,1.05,2.35,2.35,2.35s2.35-1.05,2.35-2.35S13.34,11.31,12.05,11.31z'
          fill='#fff'
        />
      </Svg>
    </>
  )
}

const SvgShare = React.memo(SvgComponent)
export default SvgShare
