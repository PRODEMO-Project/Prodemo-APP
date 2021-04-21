import React from "react"
import { TouchableOpacity, Text } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import colors from "@utils/colors/index"
import FONTS from "@utils/fonts/index"
import { scaleHeight } from "@utils/size"

const ButtonPrimary = props => {
  const { style, title, titleStyle, onPress, disable } = props
  return (
    <TouchableOpacity
      disable={disable}
      activeOpacity={disable ? 1 : 0.7}
      onPress={onPress}
      style={[styles.buttonPrimacy, style]}
    >
      <Text style={[styles.txtTitle, titleStyle]}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonPrimary

const styles = ScaledSheet.create({
  buttonPrimacy: {
    height: scaleHeight(48),
    borderRadius: scaleHeight(24),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bluePrimary,
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Bold,
    fontSize: scaleHeight(16),
    textTransform: "uppercase",
    color: colors.white,
  },
})
