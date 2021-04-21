import * as React from 'react'
import Svg, { Path } from 'react-native-svg'

interface Props {
  color?: string;
}

function SvgComponent(props: Props) {
  return (
    <Svg width={24} height={24} viewBox='0 0 24 24' fill='none' {...props}>
      <Path
        d='M2.3,11.3c0.3-1.8,2-3,3.8-3l3.5,0c0.6,0,1.1-0.5,1.1-1.1v0c0-0.6-0.5-1.1-1.1-1.1L6.3,6c-3.2,0-6,2.3-6.3,5.5
        C-0.3,15,2.5,18,6,18h3.7c0.6,0,1.1-0.5,1.1-1.1v0c0-0.6-0.5-1.1-1.1-1.1H6C3.7,15.7,1.9,13.7,2.3,11.3z M8.4,13.2h7.2
        c0.7,0,1.2-0.5,1.2-1.2v0c0-0.7-0.5-1.2-1.2-1.2H8.4c-0.7,0-1.2,0.5-1.2,1.2v0C7.2,12.7,7.7,13.2,8.4,13.2z M17.7,6l-3.3,0
        c-0.6,0-1.1,0.5-1.1,1.1v0c0,0.6,0.5,1.1,1.1,1.1l3.5,0c1.8,0,3.5,1.2,3.8,3c0.4,2.4-1.4,4.4-3.7,4.4h-3.7c-0.6,0-1.1,0.5-1.1,1.1v0
        c0,0.6,0.5,1.1,1.1,1.1H18c3.5,0,6.3-3,6-6.5C23.7,8.3,20.9,6,17.7,6z'
        fill={props.color ? props.color : 'white'}
      />
    </Svg>
  )
}

const SvgLink = React.memo(SvgComponent)
export default SvgLink
