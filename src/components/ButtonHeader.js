import React, { memo, useCallback } from "react"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import SvgBackArrow from "@svgs/SvgBackArrow"
import { scaleHeight, scaleWidth } from "@utils/size"
import ROUTES from "@utils/routes"

const ButtonHeader = memo(props => {
  const { children, onPress } = props
  const navigation = useNavigation()

  const onPressButton = useCallback(() => {
    if (onPress) {
      onPress()
    } else {
      navigation.canGoBack()
        ? navigation.goBack()
        : navigation.replace(ROUTES.DrawerNavigator)
    }
  }, [navigation, props])
  const btnStyle = {
    width: scaleWidth(50),
    height: scaleHeight(50),
    justifyContent: "center",
    alignItems: "center",
  }
  return (
    <TouchableOpacity style={btnStyle} onPress={onPressButton}>
      {children ? children : <SvgBackArrow />}
    </TouchableOpacity>
  )
})
export default ButtonHeader
