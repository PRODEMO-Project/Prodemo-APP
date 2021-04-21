import * as React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

function SvgComponent(props) {
  return (
    <Svg height={40} width={40} viewBox='0 0 512 512' {...props}>
      <Circle cx={256} cy={256} r={256} fill='#00c48c' />
      <Path
        d='M154.8 118h202.3c10.2 0 18.4 8.2 18.4 18.4v248.3c0 10.2-8.2 18.4-18.4 18.4H154.8c-10.2 0-18.4-8.2-18.4-18.4V136.4c0-10.1 8.3-18.4 18.4-18.4z'
        fill='#0f4c81'
      />
      <Path d='M154.8 324.2V136.4h202.3v248.3H215.4l-60.6-60.5z' fill='#fff' />
      <Path
        d='M215.4 324.2v60.6l-60.6-60.6h60.6zM210 145.6v-36.8h92v36.8c0 10.2-8.2 18.4-18.4 18.4h-55.2c-10.1 0-18.4-8.2-18.4-18.4z'
        fill='#bfbfbf'
      />
      <Path
        d='M237.6 182.4h73.6c5.1 0 9.2 4.1 9.2 9.2s-4.1 9.2-9.2 9.2h-73.6c-5.1 0-9.2-4.1-9.2-9.2s4.1-9.2 9.2-9.2zM191.6 182.4H210v18.4h-18.4v-18.4zM191.6 219.2H210v18.4h-18.4v-18.4zM191.6 256H210v18.4h-18.4V256zM191.6 292.8H210v18.4h-18.4v-18.4zM237.6 219.2h55.2c5.1 0 9.2 4.1 9.2 9.2s-4.1 9.2-9.2 9.2h-55.2c-5.1 0-9.2-4.1-9.2-9.2s4.1-9.2 9.2-9.2zM237.6 256H256c5.1 0 9.2 4.1 9.2 9.2s-4.1 9.2-9.2 9.2h-18.4c-5.1 0-9.2-4.1-9.2-9.2s4.1-9.2 9.2-9.2zM237.6 292.8h73.6c5.1 0 9.2 4.1 9.2 9.2s-4.1 9.2-9.2 9.2h-73.6c-5.1 0-9.2-4.1-9.2-9.2s4.1-9.2 9.2-9.2zM237.6 329.6h55.2c5.1 0 9.2 4.1 9.2 9.2s-4.1 9.2-9.2 9.2h-55.2c-5.1 0-9.2-4.1-9.2-9.2s4.1-9.2 9.2-9.2z'
        fill='#00c48c'
      />
    </Svg>
  )
}

const SvgSurvey = React.memo(SvgComponent)
export default SvgSurvey
