import React, { memo, useState, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import colors from '@utils/colors'
import { scaleHeight, scaleWidth } from '@utils/size'
import FONTS from '@utils/fonts'
import SvgNotification from '@svgs/SvgNotification'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import UserProfileItem from '@screens/Profile/components/UserProfileItem'
import SvgScale from '@svgs/SvgScale'
import UserNotificationItem from '@screens/Profile/components/UserNotificationItem'
import TopicItem from '@screens/MainPage/components/TopicItem'
import SvgFire from '@svgs/SvgFire'
import ROUTES from '@utils/routes'
import SvgMenu from '@svgs/SvgMenu'
import SvgAvatar from '@svgs/Menu/SvgAvatar'
import SvgDoctor from '@svgs/MainPage/SvgDoctor'

const USERDATA = {
  userName: 'Virginia Fowler',
  career: 'Art Director',
  image_url: <SvgAvatar />,
}

const USER_NOTIFICATION_DATA = {
  Svg: <SvgDoctor />,
  title: 'Checking your healthcare',
  doctorName: 'Dr. Ann Carlson',
  time: '8am - 9am',
}

const Profile = memo(({ navigation }) => {
  const [userData, setUserData] = useState(USERDATA)
  const [notiData, setNotiData] = useState(USER_NOTIFICATION_DATA)

  const onMenu = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  const onNotification = useCallback(() => {}, [])

  const onGoalSettings = useCallback(() => {
    navigation.navigate(ROUTES.GoalSettings)
  }, [navigation])

  const onDoctorFavorites = useCallback(() => {}, [])

  const onInsurance = useCallback(() => {
    navigation.navigate(ROUTES.Insurance)
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.btnView}>
          <TouchableOpacity onPress={onMenu} style={styles.svgOption}>
            <SvgMenu />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onNotification}
            style={styles.svgNotification}
          >
            <SvgNotification />
            <View style={styles.numberNotification} />
          </TouchableOpacity>
        </View>
        <Text style={styles.txtUserName}>{userData.userName}</Text>
        <Text style={styles.txtCareer}>{userData.career}</Text>
        <SvgAvatar style={styles.svgAvatar} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
      >
        <View style={styles.userProfile}>
          <UserProfileItem
            title={'Weight'}
            Svg={<SvgScale />}
            parameter={'64'}
            unitOfMeasure={'kg'}
          />
          <View style={styles.lineVertical} />
          <View style={styles.lineHorizontal} />
        </View>
        <UserNotificationItem
          Svg={notiData.Svg}
          title={notiData.title}
          doctorName={notiData.doctorName}
          time={notiData.time}
        />
      </ScrollView>
    </View>
  )
})
export default Profile

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBackGround,
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + scaleHeight(94),
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    paddingBottom: scaleHeight(26),
    backgroundColor: colors.bluePrimary,
    borderBottomLeftRadius: scaleWidth(24),
    borderBottomRightRadius: scaleWidth(24),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtUserName: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '600',
    fontSize: scaleHeight(24),
    lineHeight: scaleHeight(32),
    color: colors.white,
    marginLeft: scaleWidth(32),
    marginTop: scaleHeight(31),
  },
  txtCareer: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '600',
    fontSize: scaleHeight(12),
    lineHeight: scaleHeight(16),
    color: colors.white,
    marginTop: scaleHeight(4),
    marginLeft: scaleWidth(32),
    textTransform: 'uppercase',
  },
  svgAvatar: {
    width: scaleWidth(64),
    height: scaleWidth(64),
    borderRadius: scaleWidth(32),
    position: 'absolute',
    right: scaleWidth(24),
    bottom: scaleHeight(21),
    overflow: 'hidden',
  },
  svgOption: {
    width: scaleWidth(50),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgNotification: {
    width: scaleWidth(50),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberNotification: {
    width: scaleWidth(8),
    height: scaleWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondRed,
    borderRadius: scaleWidth(4),
    position: 'absolute',
    top: 12,
    right: 17,
  },
  userProfile: {
    backgroundColor: colors.white,
    borderRadius: scaleWidth(16),
    marginHorizontal: scaleWidth(16),
    marginTop: scaleHeight(16),
    paddingTop: scaleHeight(16),
    flexWrap: 'wrap',
    flexDirection: 'row',
    height: scaleHeight(208),
    marginBottom: scaleHeight(16),
  },
  lineVertical: {
    width: 1,
    height: scaleHeight(170),
    backgroundColor: colors.pageBackGround,
    alignSelf: 'center',
    position: 'absolute',
    right: scaleWidth(171),
    top: scaleHeight(24),
  },
  lineHorizontal: {
    width: scaleWidth(295),
    left: scaleWidth(24),
    height: 1,
    backgroundColor: colors.pageBackGround,
    alignSelf: 'center',
    position: 'absolute',
  },
})
