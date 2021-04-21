import React from "react"
import { View, ImageBackground, TouchableOpacity, Text } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { scaleHeight, scaleWidth } from "@utils/size"
import FONTS from "@utils/fonts/index"
import colors from "@utils/colors"

const TopicItem = props => {
  const { image_url, title } = props.item
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
      <View style={[styles.topicItem]}>
        {image_url !== "" && (
          <ImageBackground source={{ uri: image_url }} style={styles.bgImage}>
            <View style={styles.bgOpacity} />
            <Text style={styles.txtTitle}>{title}</Text>
          </ImageBackground>
        )}
      </View>
    </TouchableOpacity>
  )
}
export default TopicItem

const styles = ScaledSheet.create({
  topicItem: {
    width: scaleWidth(200),
    height: scaleHeight(130),
    marginRight: scaleWidth(16),
    borderRadius: scaleWidth(16),
    overflow: "hidden",
  },
  bgOpacity: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: colors.bluePrimary,
    opacity: 0.5,
  },
  bgImage: {
    flex: 1,
    height: "100%",
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Bold,
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(20),
    paddingHorizontal: scaleWidth(5),
    marginBottom: scaleWidth(10),
    color: colors.white,
    textAlign: "center",
  },
})
