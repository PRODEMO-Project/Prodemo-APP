import React from "react"
import { View, Text, StyleSheet, Image } from "react-native"
import { widthScreen, heightScreen } from "@utils/dimensions"
import FONTS from "@utils/fonts/index"
import colors from "@utils/colors"
import { scaleHeight } from "@utils/size"

const WalkThroughScreen = props => {
  const { Svg, description, description1 } = props
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.svg}>
          <Image source={Svg} style={styles.imageSvg}/>
        </View>
      </View>
      <View style={styles.bottomContent}>
        <Text style={styles.txtTitle}>{description1}</Text>
        <Text style={styles.txtDescription}>{description}</Text>
      </View>
    </View>
  )
}

export default WalkThroughScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  svg: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  txtTitle: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: "600",
    fontSize: scaleHeight(24),
    color: colors.bluePrimary,
    textAlign: "center",
    marginTop: scaleHeight(24),
    lineHeight: scaleHeight(32),
  },
  txtDescription: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(18),
    lineHeight: scaleHeight(24),
    color: colors.semiBlack,
    textAlign: "center",
    marginTop: scaleHeight(14),
  },
  content: {
    alignItems: "center",
    height: "55%",
  },
  bottomContent: {
    width: widthScreen * 0.85,
    marginTop: scaleHeight(52),
  },
  imageSvg: {
    resizeMode: 'contain',
    width: widthScreen / 1.2,
    height: heightScreen / 3
  }
})
