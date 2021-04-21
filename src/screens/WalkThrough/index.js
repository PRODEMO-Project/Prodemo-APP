import React, { memo, useCallback, useContext, useState } from "react"
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native"
import colors from "@utils/colors"
import FONTS from "@utils/fonts/index"
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper"
import { scaleHeight, scaleWidth } from "@utils/size"
import { useNavigation } from "@react-navigation/native"
import ROUTES from "@utils/routes"
import WalkThroughScreen from "@screens/WalkThrough/components/WalkThroughScreen"
import SvgTriangleRight from "@svgs/WalkThrough/SvgTriangleRight"
import SvgTriangleLeft from "@svgs/WalkThrough/SvgTriangleLeft"
import { heightScreen } from "@utils/dimensions"
import AppIntroSlider from "react-native-app-intro-slider"
import SvgDoctor1 from "@svgs/WalkThrough/SvgDoctor1"
import SvgDoctor2 from "@svgs/WalkThrough/SvgDoctor2"
import SvgDoctor3 from "@svgs/WalkThrough/SvgDoctor3"
import SvgProdemo from "@svgs/SvgProdemo"
import { StorageContext } from "@context/StorageContext"

const WalkThrough = memo(() => {
  const { labelLang } = useContext(StorageContext)
  const [id, setID] = useState(0)
  const { navigate } = useNavigation()

  const DATA = [
    {
      id: "0",
      Svg: require("@assets/WalkThrough/WalkThrough-01.png"),
      description1: labelLang.WalkThrough.TitleFirst,
      description: labelLang.WalkThrough.ContentFirst,
    },
    {
      id: "1",
      Svg: require("@assets/WalkThrough/WalkThrough-02.png"),
      description1: labelLang.WalkThrough.TitleSecond,
      description: labelLang.WalkThrough.ContentSecond,
    },
    {
      id: "2",
      Svg: require("@assets/WalkThrough/WalkThrough-03.png"),
      description1: labelLang.WalkThrough.TitleThird,
      description: labelLang.WalkThrough.ContentThird,
    },
  ]

  const onSignIn = useCallback(() => {
    navigate(ROUTES.IntroScreen)
  }, [navigate])

  const onDone = useCallback(() => {
    navigate(ROUTES.IntroScreen)
  }, [navigate])

  const renderPrevButton = useCallback(() => {
    return (
      <View style={styles.prevButton}>
        <SvgTriangleLeft fill={colors.bluePrimary} />
      </View>
    )
  }, [])

  const renderNextButton = useCallback(() => {
    return (
      <View style={styles.nextButton}>
        <SvgTriangleRight fill={colors.bluePrimary} />
      </View>
    )
  }, [])

  const renderDoneButton = useCallback(() => {
    return (
      <View style={styles.doneButton}>
        <Text style={styles.txtGetStarted}>
          {labelLang.WalkThrough.GetStarted}
        </Text>
      </View>
    )
  }, [])

  const renderItem = useCallback(({ item }) => {
    const { Svg, description, description1 } = item
    return (
      <WalkThroughScreen
        Svg={Svg}
        description={description}
        description1={description1}
      />
    )
  }, [])

  return (
    <View style={styles.container}>
      <SvgProdemo style={styles.svgCarer} color={colors.bluePrimary} />
      <AppIntroSlider
        key={id}
        data={DATA}
        renderItem={renderItem}
        showPrevButton={true}
        showNextButton={true}
        showDoneButton={true}
        renderPrevButton={renderPrevButton}
        renderNextButton={renderNextButton}
        renderDoneButton={renderDoneButton}
        onDone={onDone}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
      />
      <TouchableOpacity onPress={onSignIn} style={styles.skipView}>
        <Text style={styles.txtSkip}>{labelLang.WalkThrough.Skip}</Text>
      </TouchableOpacity>
    </View>
  )
})

export default WalkThrough

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backGround,
  },
  content: {
    flex: 1,
    backgroundColor: colors.backGround,
  },
  txtSkip: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "600",
    fontSize: 12,
    color: colors.bluePrimary,
    textTransform: "uppercase",
  },
  svgCarer: {
    left: scaleWidth(24),
    top:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(36)
        : scaleHeight(36),
  },
  skipView: {
    position: "absolute",
    alignItems: "flex-end",
    justifyContent: "center",
    right: scaleWidth(24),
    top:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(24)
        : scaleHeight(24),
    width: scaleWidth(48),
    height: scaleHeight(48),
  },
  dotStyle: {
    width: scaleWidth(8),
    height: scaleWidth(4),
    backgroundColor: colors.platinum,
    marginBottom: heightScreen * 0.65,
  },
  activeDotStyle: {
    backgroundColor: colors.bluePrimary,
    width: scaleWidth(20),
    height: scaleHeight(4),
    marginBottom: heightScreen * 0.65,
  },
  prevButton: {
    width: scaleWidth(48),
    height: scaleWidth(48),
    borderRadius: scaleWidth(16),
    justifyContent: "center",
    alignItems: "center",
    left: 18,
    bottom: getBottomSpace(),
  },
  nextButton: {
    width: scaleWidth(48),
    height: scaleWidth(48),
    borderRadius: scaleWidth(16),
    justifyContent: "center",
    alignItems: "center",
    right: 18,
    bottom: getBottomSpace(),
  },
  doneButton: {
    height: scaleWidth(48),
    borderRadius: scaleWidth(24),
    justifyContent: "center",
    alignItems: "center",
    right: 18,
    bottom: getBottomSpace(),
  },
  txtGetStarted: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: "600",
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(26),
    textTransform: "uppercase",
    textAlign: "center",
    color: colors.bluePrimary,
  },
})
