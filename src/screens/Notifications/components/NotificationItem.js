import { Text, TouchableOpacity } from 'react-native'
import SvgActive from '@svgs/Notification/SvgActive'
import React, { useContext } from 'react'
import { ScaledSheet } from 'react-native-size-matters'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import colors from '@utils/colors'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import moment from 'moment'
import { StorageContext } from '@context/StorageContext'
import SvgEvent from '@svgs/Notification/SvgEvent'
import SvgArticle from '@svgs/Notification/SvgArticle'
import ROUTES from '@utils/routes'
import SvgSurvey from '@svgs/Notification/SvgSurvey'

const NotificationItem = props => {
  const { userOptions } = useContext(StorageContext)
  const { id, type, des, active, time, title, navigation, country } = props

  const pressNotification = (id, type) => {
    switch (type) {
      case 'Article':
        navigation.navigate(ROUTES.ArticleSingle, { country, id })
        break
      case 'Event':
        navigation.navigate(ROUTES.EventSingle, { country, id })
        break
      case 'Survey':
        navigation.navigate(ROUTES.SurveySingle, { country, id })
        break
      default:
        break
    }
    // Se type === evento
    // navigation.replace(ROUTES.Event, {{id: id}})
    // Se type === articolo
    // navigation.replace(ROUTES.Article, {{id: id}})
  }

  const showIcon = type => {
    if (type === 'Article') {
      return <SvgArticle style={styles.avatar} />
    } else if (type === 'Event') {
      return <SvgEvent style={styles.avatar} />
    } else {
      return <SvgSurvey style={styles.avatar} />
    }
  }

  return (
    <TouchableOpacity
      key={id}
      style={styles.item}
      onPress={() => pressNotification(id, type)}
    >
      {showIcon(type)}
      <Text style={styles.type}>{des}</Text>
      <Text style={styles.des}>{title}</Text>
      <Text style={styles.time}>{`${moment(time)
        .locale(userOptions.language)
        .fromNow()}`}</Text>
      {active && <SvgActive style={styles.svgActive} />}
    </TouchableOpacity>
  )
}

export default NotificationItem

const styles = ScaledSheet.create({
  title: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    fontSize: scaleHeight(17),
    color: colors.bluePrimary,
  },
  item: {
    marginHorizontal: scaleWidth(16),
    backgroundColor: colors.white,
    paddingLeft: scaleWidth(80),
    paddingRight: scaleWidth(30),
    paddingTop: scaleHeight(20),
    paddingBottom: scaleHeight(16),
    borderRadius: scaleWidth(16),
    marginBottom: scaleHeight(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  avatar: {
    position: 'absolute',
    top: scaleHeight(33),
    left: scaleWidth(16),
  },
  type: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '600',
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(20),
    color: colors.semiBlack,
  },
  des: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    lineHeight: scaleHeight(25),
  },
  time: {
    fontSize: scaleHeight(14),
    fontFamily: FONTS.HIND.Regular,
    color: colors.dimGray,
    marginTop: scaleHeight(8),
    lineHeight: scaleHeight(20),
  },
  svgActive: {
    position: 'absolute',
    top: scaleHeight(50),
  },
  contentContainerStyle: {
    paddingTop: scaleHeight(16),
    paddingBottom: getBottomSpace(),
  },
})
