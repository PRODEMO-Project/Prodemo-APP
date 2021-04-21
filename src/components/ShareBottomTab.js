import SvgLinkedin from "@svgs/ShareBottomTab/SvgLinkedin"
import SvgFacebook from "@svgs/ShareBottomTab/SvgFacebook"
import SvgDots from "@svgs/ShareBottomTab/SvgDots"
import SvgWhatsapp from "@svgs/ShareBottomTab/SvgWhatsapp"
import SvgTwitter from "@svgs/ShareBottomTab/SvgTwitter"
import colors from "@utils/colors"
import { widthScreen } from "@utils/dimensions"
import { scaleHeight, scaleWidth } from "@utils/size"
import React from "react"
import { View, StyleSheet, Platform, TouchableOpacity } from "react-native"
import { getBottomSpace } from "react-native-iphone-x-helper"

function TabBarItem({ onPress, Svg }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.tabBarItem}
    >
      {Svg}
    </TouchableOpacity>
  )
}

function ShareBottomTab() {
  return (
    <View style={styles.tabBarView}>
      <TabBarItem Svg={<SvgFacebook />} />
      <TabBarItem Svg={<SvgTwitter />} />
      <TabBarItem Svg={<SvgLinkedin />} />
      <TabBarItem Svg={<SvgWhatsapp />} />
      <TabBarItem Svg={<SvgDots />} />
    </View>
  )
}

export default ShareBottomTab

const styles = StyleSheet.create({
  tabBarView: {
    backgroundColor: colors.white,
    borderTopColor: colors.line,
    width: widthScreen,
    height:
      Platform.OS === "ios"
        ? getBottomSpace() + scaleHeight(50)
        : scaleHeight(56),
    borderTopWidth: 1,
    bottom: 0,
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabBarItem: {
    width: scaleWidth(70),
    height: scaleWidth(50),
    justifyContent: "center",
    alignItems: "center",
  },
})
