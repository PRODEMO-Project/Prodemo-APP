import React, { memo } from "react"
import { View } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import colors from "@utils/colors"
import { scaleWidth } from "@utils/size"

const HeaderBackGround = memo(() => {
  return <View style={styles.headerBackground} />
})

export default HeaderBackGround

const styles = ScaledSheet.create({
  headerBackground: {
    flex: 1,
    backgroundColor: colors.bluePrimary,
    borderBottomLeftRadius: scaleWidth(16),
    borderBottomRightRadius: scaleWidth(16),
    overflow: "hidden",
  },
})
