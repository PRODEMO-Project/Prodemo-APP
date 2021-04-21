import React, { memo, useState, useEffect, useContext } from "react"
import {
  View,
  Text,
  LogBox,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context"
import colors from "@utils/colors"
import FONTS from "@utils/fonts/index"
import { scaleHeight, scaleWidth } from "@utils/size"
import CountryItem from "@screens/IntroScreen/components/CountryItem"
import LanguageItem from "@screens/IntroScreen/components/LanguageItem"
import ROUTES from "@utils/routes"
import { getBottomSpace } from "react-native-iphone-x-helper"
import Info from "@svgs/IntroScreen/Info"
import { StorageContext } from "@context/StorageContext"
import LABELS from "@utils/labels"
import { COUNTRIES, LANGUAGES } from "@utils/data"
import SvgProdemo from "@svgs/SvgProdemo"

let languages = []

for (lang in LANGUAGES) {
  languages.push(LANGUAGES[lang])
}

const IntroScreen = memo(({ navigation }) => {
  const { changeUserOptions, labelLang, storeData } = useContext(StorageContext)
  const [topicData, setTopicData] = useState(COUNTRIES)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [appOptions, setAppOptions] = useState({
    language: "en",
  })

  const insets = useSafeAreaInsets()

  useEffect(() => {
    LogBox.ignoreAllLogs()
  }, [])

  useEffect(() => {
    if (appOptions && appOptions.country) {
      storeData(appOptions)
        .then(() => {
          changeUserOptions(appOptions)
          navigation.replace(ROUTES.DrawerNavigator)
        })
        .catch(err => console.log(err))
    }
  }, [appOptions])

  const renderCountryItem = () => {
    return topicData.map((item, index) => {
      const { img, country, country_str } = item
      return (
        <CountryItem
          img={img}
          key={index}
          onPress={e => {
            setAppOptions(prev => ({
              ...prev,
              country: country,
              country_str: country_str,
              countryImg: img,
            }))
          }}
        />
      )
    })
  }

  const languageSwitch = (index, item) => {
    const lang = Object.keys(LANGUAGES).find(key => LANGUAGES[key] === item)
    setSelectedIndex(index)
    changeUserOptions({ language: lang })
    setAppOptions(prev => ({
      ...prev,
      language: lang,
    }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentStyle}>
        <SvgProdemo width={300} height={75} style={styles.txtHi} />
        <Text style={styles.txtToday}>{labelLang.IntroSettings.AppLang}</Text>
        <FlatList
          data={languages}
          numColumns={3}
          bounces={false}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            const selected = index === selectedIndex ? true : false
            return (
              <TouchableOpacity
                style={{ width: "33%" }}
                activeOpacity={1}
                onPress={() => languageSwitch(index, item)}
              >
                <LanguageItem lang={item} selected={selected} />
              </TouchableOpacity>
            )
          }}
        />
        <Text style={styles.txtToday}>
          {labelLang.IntroSettings.ChooseCountry}
        </Text>
        <View style={{ flexDirection: "row" }}>{renderCountryItem()}</View>
      </View>
      <View
        style={[
          styles.footer,
          { bottom: Platform.OS === "ios" ? insets.bottom + scaleHeight(15) : scaleHeight(24) },
        ]}
      >
        <Image
          style={styles.flagBottom}
          source={require("@assets/MainPage/europeFlag.png")}
        />
        <Text style={styles.bottomText}>{LABELS.en.Menu.Footer}</Text>
        <Info
          color={colors.circle}
          style={{ position: "absolute", right: 0 }}
          onPress={() => navigation.navigate(ROUTES.ProjectInfos)}
        />
      </View>
    </SafeAreaView>
  )
})
export default IntroScreen

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  txtHi: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(24),
    lineHeight: scaleHeight(38),
    color: colors.semiBlack,
    marginLeft: scaleWidth(24),
    marginBottom: scaleHeight(20),
  },
  txtToday: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(22),
    lineHeight: scaleHeight(30),
    color: colors.silverChalice,
    marginLeft: scaleWidth(24),
    marginBottom: scaleHeight(20),
  },
  bottomText: {
    fontSize: 13,
    width: "50%",
    color: colors.classicBlue,
    marginLeft: scaleWidth(8),
  },
  contentContainerStyle: {
    paddingLeft: scaleWidth(16),
    marginBottom: scaleHeight(24),
  },
  contentContainerFlatList: {
    paddingBottom: scaleHeight(80),
  },
  flagBottom: {
    borderRadius: 8,
  },
  footer: {
    width: scaleWidth(327),
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: scaleHeight(0),
    marginLeft: scaleWidth(16),
  },
  title: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "500",
    fontSize: scaleHeight(17),
    color: colors.bluePrimary,
  },
  btnClose: {
    position: "absolute",
    left: scaleWidth(16),
  },
  btnOption: {
    position: "absolute",
    bottom: scaleHeight(11),
    right: scaleWidth(16),
  },
  svgCarer: {
    position: "absolute",
    bottom: scaleHeight(11),
  },
  contentStyle: {
    paddingTop: scaleHeight(21),
    paddingBottom: getBottomSpace() + scaleHeight(90),
  },
})
