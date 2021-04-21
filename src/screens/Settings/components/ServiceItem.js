import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import colors from "@utils/colors"
import FONTS from "@utils/fonts/index"
import { scaleHeight, scaleWidth } from "@utils/size"

const ServiceItem = props => {
  const { svg, title, content, onPress } = props
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={styles.serviceItem}
    >
      <View style={styles.svgView}>{svg}</View>
      <Text style={styles.txtTitle}>{title}</Text>
    </TouchableOpacity>
  )
}

export default ServiceItem

const styles = ScaledSheet.create({
  serviceItem: {
    height: scaleWidth(60),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: scaleWidth(16),
    marginRight: scaleWidth(16),
    marginBottom: scaleHeight(17),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  svgView: {
    width: scaleWidth(48),
    height: scaleWidth(48),
    borderRadius: scaleWidth(12),
    backgroundColor: colors.classicBlue,
    marginLeft: scaleWidth(8),
    justifyContent: "center",
    alignItems: "center",
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "500",
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(26),
    color: colors.oldBurgundy,
    textTransform: "capitalize",
    marginHorizontal: scaleWidth(16),
  },
})
