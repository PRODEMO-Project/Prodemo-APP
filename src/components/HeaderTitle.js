import React, { memo, useContext } from 'react'
import FONTS from '@utils/fonts'
import { StyleSheet, Text, View } from 'react-native'
import colors from '@utils/colors'
import { scaleHeight } from '@utils/size'
import { StorageContext } from '@context/StorageContext'

const HeaderTitle = memo(props => {
  const { labelLang } = useContext(StorageContext)
  const { title, children, preTitle } = props
  return children ? (
    <Text style={styles.title}>{children}</Text>
  ) : (
    <Text style={styles.title}>
      {preTitle && `${preTitle} `}
      {labelLang.Menu[title]}
    </Text>
  )
})

export default HeaderTitle

const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    fontSize: scaleHeight(16),
    color: colors.white,
  },
})
