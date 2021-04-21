import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import colors from '@utils/colors'
import { scaleHeight, scaleWidth } from '@utils/size'
import FONTS from '@utils/fonts'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import moment from 'moment'
import { StorageContext } from '@context/StorageContext'

const ArticleItem = props => {
  const { userOptions } = useContext(StorageContext)
  const { img, title, description, date, onPress } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={styles.container}
    >
      <Image source={{ uri: img }} style={styles.img} />
      <View style={styles.contentView}>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text style={styles.txtDescription}>{description}</Text>
        <Text style={styles.txtDate}>
          {moment(date).locale(userOptions.language).format('LL')}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

export default ArticleItem

const styles = ScaledSheet.create({
  container: {
    backgroundColor: colors.white,
    width: scaleWidth(279),
    borderRadius: scaleWidth(8),
    marginRight: scaleWidth(24),
    marginVertical: scaleHeight(24),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  img: {
    width: scaleWidth(279),
    height: scaleHeight(170),
    borderRadius: scaleWidth(8),
    overflow: 'hidden',
  },
  contentView: {
    marginHorizontal: scaleWidth(16),
    marginTop: scaleHeight(10),
    marginBottom: scaleHeight(12),
  },
  txtTitle: {
    paddingTop: scaleHeight(10),
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    fontSize: scaleHeight(20),
    lineHeight: scaleHeight(26),
    color: colors.black,
  },
  txtDescription: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(25),
    color: colors.dimGray,
    marginBottom: scaleHeight(40),
  },
  txtDate: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    fontSize: scaleHeight(12),
    lineHeight: scaleHeight(16),
    textTransform: 'uppercase',
    color: colors.silverChalice,
    position: 'absolute',
    bottom: scaleHeight(0),
    right: scaleWidth(0),
  },
  flexDirection: {
    flexDirection: 'row',
    marginTop: scaleHeight(16),
    justifyContent: 'center',
  },
})
