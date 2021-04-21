import React, { useContext } from "react"
import { TouchableOpacity, Text, Image } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { scaleHeight, scaleWidth } from "@utils/size"
import colors from "@utils/colors"
import FONTS from "@utils/fonts"
import moment from "moment"
import { StorageContext } from "@context/StorageContext"
import { getStatusBarHeight } from "react-native-iphone-x-helper"

const TrendListItem = props => {
  const { userOptions } = useContext(StorageContext)
  const { image_url, title, abstract, date } = props.item
  return (
    <TouchableOpacity
      onPress={props.onPress}
      activeOpacity={0.6}
      style={styles.container}
    >
      <Image source={{ uri: image_url }} style={styles.img} />
      <Text style={styles.txtTitle}>{title}</Text>
      <Text style={styles.txtAbstract}>{abstract}</Text>
      <Text style={styles.txtDate}>{`${moment(date)
        .locale(userOptions.language)
        .format("LL")}`}</Text>
    </TouchableOpacity>
  )
}

export default TrendListItem

const styles = ScaledSheet.create({
  container: {
    paddingVertical: scaleHeight(16),
    paddingLeft: scaleWidth(105),
    paddingRight: scaleWidth(16),
    borderRadius: scaleWidth(8),
    backgroundColor: colors.white,
    marginHorizontal: scaleWidth(24),
    marginBottom: scaleHeight(16),
    width: scaleWidth(327),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  img: {
    width: scaleWidth(72),
    height: "100%",
    borderRadius: scaleWidth(8),
    shadowColor: "rgba(0, 0, 0, 0.1)",
    shadowRadius: scaleHeight(25),
    shadowOffset: { width: 0, height: 2 },
    marginRight: scaleWidth(17),
    position: "absolute",
    top: scaleHeight(16),
    left: scaleWidth(16),
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "500",
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(22),
    color: colors.semiBlack,
  },
  txtAbstract: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "500",
    fontSize: scaleHeight(13),
    lineHeight: scaleHeight(18),
    color: colors.dimGray,
    marginBottom: scaleHeight(10),
  },
  txtDate: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "500",
    fontSize: scaleHeight(12),
    lineHeight: scaleHeight(16),
    textTransform: "uppercase",
    color: colors.silverChalice,
    alignSelf: "flex-end",
    marginBottom: scaleHeight(-4),
  },
})
