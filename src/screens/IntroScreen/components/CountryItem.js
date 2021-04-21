import React from "react"
import { View, ImageBackground, TouchableOpacity } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { scaleHeight, scaleWidth } from "@utils/size"
import FONTS from "@utils/fonts/index"
import colors from "@utils/colors"

const CountryItem = props => {
  const { svg, img, onPress } = props
  return (
    <TouchableOpacity
      style={[styles.container]}
      activeOpacity={0.6}
      onPress={onPress}
    >
      <View style={[styles.topicItem]}>
        <ImageBackground source={img} style={styles.bgImage}>
          <View style={styles.svg}>{svg}</View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  )
}
export default CountryItem

const styles = ScaledSheet.create({
  container: {
    width: "32%",
    paddingLeft: scaleWidth(16),
  },
  topicItem: {
    width: "100%",
    height: scaleHeight(70),
    borderRadius: scaleWidth(8),
    overflow: "hidden",
  },
  bgImage: {
    flex: 1,
    height: "100%",
    resizeMode: "cover",
  },
  svg: {
    position: "absolute",
    bottom: 0,
    right: scaleWidth(16),
    marginTop: scaleHeight(16),
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Bold,
    fontSize: scaleHeight(21),
    lineHeight: scaleHeight(25),
    color: colors.white,
    marginRight: scaleWidth(16),
    textAlign: "center",
  },
})
