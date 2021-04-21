import React, {
  memo,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react"
import { FlatList, Platform, Text } from "react-native"
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper"
import keyExtractor from "@utils/keyExtractor"
import FONTS from "@utils/fonts/index"
import { ScaledSheet } from "react-native-size-matters"
import { scaleHeight, scaleWidth } from "@utils/size"
import colors from "@utils/colors"
import NotificationItem from "./components/NotificationItem"
import { StorageContext } from "@context/StorageContext"
import useServerFunctions from "@hooks/useServerFunctions"

const Notifications = memo(({ navigation }) => {
  const [notificationData, setNotificationData] = useState(null)
  const { userOptions, setNotificationStatus, labelLang } = useContext(
    StorageContext
  )
  const { GETrequest } = useServerFunctions()

  useEffect(() => {
    const fetchNotifications = async () => {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await GETrequest(
        userOptions.country_str,
        userOptions.language,
        "notifications",
        `firebase_token_id=${userOptions.id}`,
        user && JSON.parse(user).bearer
      )
      return response
    }
    fetchNotifications()
      .then(r => {
        // data = data.filter( el => !b.find(y => el.data.id === y.data.id && el.data.type === y.data.type ))
        //r = [...new Set(r.map( x =>  x["data"]["id"] && x["data"]["type"] ))]
        const filteredArr = r.reduce((acc, current) => {
          const x = acc.find(item => item.data.id === current.data.id && item.data.type === current.data.type);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, []);
        setNotificationData(filteredArr)
        setNotificationStatus(false)
      })
      .catch(err => console.log(err))
  }, [])

  const renderItem = useCallback(({ item }) => {
    const { body, sent_at, read_at, data, display_title, country_str } = item
    return (
      <NotificationItem
        id={data.id}
        title={display_title}
        type={data.type}
        des={body}
        active={read_at ? false : true}
        time={sent_at}
        country={country_str}
        navigation={navigation}
      />
    )
  }, [])

  if (!notificationData) {
    return false
  }

  return (
    <>
      {notificationData.length !== 0 ? (
        <FlatList
          bounces={true}
          showsVerticalScrollIndicator={false}
          data={notificationData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.contentContainerStyle}
        />
      ) : (
        <Text style={styles.noNotifications}>{labelLang.NoNotifications}</Text>
      )}
    </>
  )
})
export default Notifications

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBackGround,
  },
  noNotifications: {
    fontSize: scaleWidth(16),
    color: colors.black,
    textAlign: "center",
    paddingTop: scaleHeight(16),
  },
  header: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: scaleWidth(24),
    borderBottomRightRadius: scaleWidth(24),
    height:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(72)
        : scaleHeight(72),
    paddingTop: Platform.OS === "ios" ? getStatusBarHeight() : 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titleHeader: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: "500",
    fontSize: scaleHeight(16),
    color: colors.semiBlack,
  },
  btnClose: {
    position: "absolute",
    top:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(28)
        : scaleHeight(28),
    left: scaleWidth(16),
  },
  btnOption: {
    position: "absolute",
    top:
      Platform.OS === "ios"
        ? getStatusBarHeight() + scaleHeight(28)
        : scaleHeight(28),
    right: scaleWidth(16),
  },
  contentContainerStyle: {
    paddingTop: scaleHeight(16),
    paddingBottom: getBottomSpace(),
  },
})
