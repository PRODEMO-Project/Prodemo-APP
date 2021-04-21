import React from "react"
import ContentLoader, { Rect } from "react-content-loader/native"

const SvgLoaderRect = props => (
  <ContentLoader
    width={220}
    height={130}
    viewBox={`0 0 ${props.width || "220"} ${props.height || "130"}`}
    backgroundColor='#f0f0f0'
    foregroundColor='#dedede'
    {...props}
  >
    <Rect
      x='0'
      y='0'
      rx='16'
      ry='16'
      width={props.width || "220"}
      height={props.height || "130"}
    />
  </ContentLoader>
)

export default SvgLoaderRect
