import React from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import colors from '@utils/colors'
import { scaleHeight, scaleWidth } from '@utils/size'
import FONTS from '@utils/fonts'
import SvgHoverLine from '@svgs/Menu/SvgHoverLine'

const DrawerItem = props => {
  const { onPress, label, tabChose, tabActive, small, hasChildren } = props
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.container,
        {
          paddingLeft: small ? scaleWidth(60) : scaleWidth(40),
          height: small
            ? scaleHeight(25)
            : hasChildren
            ? scaleHeight(30)
            : scaleHeight(50),
          marginBottom: small ? scaleHeight(10) : scaleHeight(0),
          marginTop: hasChildren ? scaleHeight(10) : scaleHeight(0),
        },
      ]}
    >
      <Text
        style={[
          styles.drawerLabel,
          {
            fontSize: small ? scaleWidth(12) : scaleWidth(16),
            lineHeight: small ? scaleHeight(20) : scaleHeight(24),
          },
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  )
}

export default DrawerItem

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(3),
    justifyContent: 'center',
    height: scaleHeight(50),
  },
  drawerLabel: {
    color: colors.semiBlack,
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  svgHoverLine: {
    position: 'absolute',
    left: 0,
  },
})
