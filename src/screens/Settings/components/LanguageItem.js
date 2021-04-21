import React, { useState } from "react"
import { View, Text } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { scaleHeight, scaleWidth } from "@utils/size"
import colors from "@utils/colors"
const LanguageItem = props => {
  const { lang, selected } = props
  return (
    <View
      style={[
        styles.languageItem,
        {
          backgroundColor: selected ? "darkgray" : colors.silverChaliceOpacity,
        },
      ]}
    >
      <Text
        style={[
          styles.langText,
          {
            color: selected ? "white" : "rgba(0,0,0,0.4)",
          },
        ]}
      >
        {lang}
      </Text>
    </View>
  )
}
export default LanguageItem

const styles = ScaledSheet.create({
  languageItem: {
    height: scaleHeight(30),
    marginRight: scaleWidth(16),
    marginBottom: scaleHeight(17),
    borderRadius: scaleWidth(15),
    justifyContent: "center",
  },
  langText: {
    fontWeight: "400",
    paddingHorizontal: scaleWidth(16),
  },
})
