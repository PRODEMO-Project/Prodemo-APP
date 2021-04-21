import React, { memo, useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  LogBox,
  FlatList,
  TouchableOpacity,
  BackHandler,
  ActivityIndicator,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import colors from '@utils/colors'
import FONTS from '@utils/fonts/index'
import { scaleHeight, scaleWidth } from '@utils/size'
import CountryItem from '@screens/IntroScreen/components/CountryItem'
import LanguageItem from '@screens/IntroScreen/components/LanguageItem'
import ROUTES from '@utils/routes'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import { CommonActions } from '@react-navigation/native'
import SvgCheck from '@svgs/SvgCheck'
import { StorageContext } from '@context/StorageContext'
import { LoginContext } from '@context/LoginContext'
import useServerFunctions from '@hooks/useServerFunctions'
import { COUNTRIES, LANGUAGES } from '@utils/data'
import TextInputHealer from '@components/TextInputHealer'
import RNPickerSelect from 'react-native-picker-select'
import SvgLocation from '@svgs/SvgLocation'

let languages = []

for (lang in LANGUAGES) {
  languages.push(LANGUAGES[lang])
}

const Settings = memo(({ navigation }) => {
  const { PUTrequest, GETrequest } = useServerFunctions()
  const { userOptions, changeUserOptions, labelLang, storeData } = useContext(
    StorageContext
  )
  const { userRegion, setUserRegion, userId, loggedUser } = useContext(
    LoginContext
  )
  const [topicData, setTopicData] = useState(COUNTRIES)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [appOptions, setAppOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const [isLoadingCountry, setIsLoadingCountry] = useState(false)
  const [regions, setRegions] = useState([])

  const onChangeNotification = () => {
    const enabled = !userOptions.notification
    PUTrequest(
      userOptions.country_str,
      userOptions.language,
      `enabled=${enabled}&user_id=${userId ? userId : ''}`
    )
      .then(() => {
        setAppOptions(prev => ({
          ...prev,
          notification: enabled,
        }))
      })
      .catch(err => console.log(err))
  }
  const viewCheck = userOptions?.notification ? styles.active : styles.inactive

  useEffect(() => {
    LogBox.ignoreAllLogs()
    setSelectedIndex(Object.keys(LANGUAGES).indexOf(userOptions.language))
    const backAction = () => {
      navigation.pop()
    }
    BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction)
    }
  }, [])

  useEffect(() => {
    if (appOptions) {
      storeData(appOptions)
        .then(() => {
          changeUserOptions(appOptions)
        })
        .catch(err => console.log(err))
    }
    GETrequest(userOptions.country_str, userOptions.language, 'regions')
      .then(data => {
        let newArr = [{ label: labelLang.SignUp.ChooseRegion, value: 0 }]
        for (let region of data) {
          newArr.push({ label: region.name, value: region.id })
        }
        setRegions(newArr)
      })
      .catch(err => console.log(err))
  }, [appOptions])

  const renderCountryItem = () => {
    return topicData.map((item, index) => {
      const { img, country, country_str } = item
      return (
        <CountryItem
          img={img}
          key={index}
          onPress={e => {
            setIsLoadingCountry(true)
            PUTrequest(
              country_str,
              userOptions.language,
              `user_id=${userId ? userId : ''}`
            )
              .then(() => {
                changeUserOptions({ country_str: country_str })
                setAppOptions(prev => ({
                  ...prev,
                  country: country,
                  country_str: country_str,
                  countryImg: img,
                }))

                setIsLoadingCountry(false)
              })
              .catch(err => console.log(err))
          }}
        />
      )
    })
  }

  const languageSwitch = (index, item) => {
    setIsLoading(true)
    const lang = Object.keys(LANGUAGES).find(key => LANGUAGES[key] === item)
    PUTrequest(userOptions.country_str, lang, `user_id=${userId ? userId : ''}`)
      .then(() => {
        setSelectedIndex(index)
        setAppOptions(prev => ({
          ...prev,
          language: lang,
        }))
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }

  const changeUserRegion = region => {
    setUserRegion(region)
    PUTrequest(
      userOptions.country_str,
      userOptions.language,
      `region_id=${region}&user_id=${userId ? userId : ''}`
    )
      .then(() => {
        setAppOptions(prev => ({
          ...prev,
          region_id: region,
        }))
      })
      .catch(err => console.log(err))
  }

  if (selectedIndex === null) {
    return false
  }

  return (
    <>
      <View style={styles.contentStyle}>
        <Text style={styles.title}>{labelLang.IntroSettings.AppLang}</Text>
        {isLoading && (
          <View style={styles.loaderLang}>
            <ActivityIndicator size='large' color='#0000ff' />
          </View>
        )}
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
                activeOpacity={1}
                style={{ width: '33%' }}
                onPress={() => languageSwitch(index, item)}
              >
                <LanguageItem lang={item} selected={selected} />
              </TouchableOpacity>
            )
          }}
        />
        <Text style={styles.title}>
          {labelLang.IntroSettings.ChangeCountry}
        </Text>
        <View style={{ flexDirection: 'row', marginBottom: scaleHeight(40) }}>
          {isLoadingCountry && (
            <View style={styles.loaderCountry}>
              <ActivityIndicator size='large' color='#0000ff' />
            </View>
          )}
          {renderCountryItem()}
        </View>
        {loggedUser && (
          <TextInputHealer
            style={styles.txtInput2}
            svg={
              <SvgLocation
                fill='#6D5F6F'
                width={16}
                style={{ marginBottom: -4 }}
              />
            }
            component={
              <RNPickerSelect
                style={styles}
                placeholder={{}}
                value={userRegion}
                onValueChange={value => changeUserRegion(value)}
                items={regions}
              />
            }
          />
        )}
        <Text style={styles.title}>{labelLang.Menu.Notifications}</Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={onChangeNotification}
          style={styles.deviceItem}
        >
          <View style={[styles.viewCheck, viewCheck]}>
            {userOptions?.notification ? <SvgCheck /> : null}
          </View>
          <Text style={styles.content}>
            {userOptions?.notification
              ? labelLang.IntroSettings.Deactivate
              : labelLang.IntroSettings.Activate}{' '}
            {labelLang.Menu.Notifications.toLowerCase()}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
})
export default Settings

const styles = ScaledSheet.create({
  txtInput2: {
    width: scaleWidth(343),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
    marginBottom: scaleHeight(34),
  },
  inputIOS: {
    width: scaleWidth(320),
    height: scaleHeight(48),
    color: colors.semiBlack,
  },
  inputAndroid: {
    width: scaleWidth(290),
    height: scaleHeight(48),
    color: colors.semiBlack,
  },
  loaderLang: {
    position: 'absolute',
    left: scaleWidth(16),
    right: scaleWidth(16),
    top: scaleHeight(70),
    height: scaleHeight(130),
    justifyContent: 'center',
    backgroundColor: colors.pageBackGround,
    borderRadius: scaleWidth(16),
    opacity: 0.65,
    zIndex: 99,
  },
  loaderCountry: {
    position: 'absolute',
    left: scaleWidth(16),
    right: scaleWidth(14),
    top: scaleHeight(0),
    height: scaleHeight(70),
    justifyContent: 'center',
    backgroundColor: colors.pageBackGround,
    borderRadius: scaleWidth(8),
    opacity: 0.65,
    zIndex: 99,
  },
  deviceItem: {
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scaleWidth(16),
    flexDirection: 'row',
    backgroundColor: colors.white,
    marginBottom: scaleHeight(24),
    marginHorizontal: scaleWidth(16),
    borderRadius: scaleWidth(8),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  active: {
    backgroundColor: colors.blueAccent,
  },
  inactive: {
    borderWidth: scaleWidth(1),
    borderColor: '#B3B3B3',
  },
  title: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(22),
    lineHeight: scaleHeight(30),
    color: colors.silverChalice,
    marginLeft: scaleWidth(24),
    marginBottom: scaleHeight(20),
  },
  content: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '300',
    fontSize: scaleHeight(18),
    color: colors.silverChalice,
  },
  contentContainerStyle: {
    paddingLeft: scaleWidth(16),
    marginBottom: scaleHeight(24),
  },
  contentStyle: {
    paddingTop: scaleHeight(21),
    paddingBottom: getBottomSpace() + scaleHeight(90),
  },
  viewCheck: {
    width: scaleWidth(24),
    height: scaleWidth(24),
    borderRadius: scaleWidth(12),
    position: 'absolute',
    right: scaleWidth(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
