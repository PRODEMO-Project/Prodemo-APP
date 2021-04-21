import ButtonHeader from "@components/ButtonHeader"
import colors from "@utils/colors"
import fonts from "@utils/fonts"
import { scaleHeight, scaleWidth } from "@utils/size"
import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

function WhyVoting({ route }) {
  return (
    <>
      <View style={styles.header}>
        <View style={styles.btnView}>
          <Text style={styles.title}>{route.params.name}</Text>
          <ButtonHeader />
        </View>
      </View>
      <View style={styles.container}>
        <Text>{route.params.name}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.HIND.Regular,
    fontWeight: "500",
    fontSize: scaleHeight(16),
    color: colors.white,
    position: "absolute",
    paddingTop: scaleHeight(4),
    width: "100%",
    textAlign: "center",
  },
  header: {
    paddingTop:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(10)
        : scaleHeight(10),
    paddingBottom: scaleHeight(5),
    backgroundColor: colors.classicBlue,
    borderBottomLeftRadius: scaleWidth(24),
    borderBottomRightRadius: scaleWidth(24),
  },
  btnView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})

export default WhyVoting
