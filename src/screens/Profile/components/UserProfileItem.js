import React from 'react';
import { ScaledSheet } from 'react-native-size-matters';
import { scaleHeight, scaleWidth } from '@utils/size';
import { Text, View } from 'react-native';
import colors from '@utils/colors';
import FONTS from '@utils/fonts';


const UserProfileItem = (props) => {
  const { style, title, Svg, parameter, unitOfMeasure } = props;
  return (
    <View style={[styles.container, style]}>
      <View style={styles.flexRow}>
        <Text style={styles.txtTitle}>{title}</Text>
        <View style={styles.svgView}>{Svg}</View>
      </View>
      <Text style={styles.txtParameter}>
        {parameter} {''}
        {unitOfMeasure ? (
          <Text style={styles.txtUnitOfMeasure}>{unitOfMeasure}</Text>
        ) : null}
      </Text>
    </View>
  );
};

export default UserProfileItem;

const styles = ScaledSheet.create({
  container: {
    width: scaleWidth(170),
    height: scaleHeight(104),
    paddingHorizontal: scaleWidth(24),
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtTitle: {
    fontFamily: FONTS.HIND.regular,
    fontSize: scaleHeight(18),
    lineHeight: scaleHeight(24),
    color: colors.semiBlack,
  },
  txtParameter: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(24),
    color: colors.bluePrimary,
    marginTop: scaleHeight(11),
  },
  txtUnitOfMeasure: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    color: colors.dimGray,
  },
  svgView: {
    backgroundColor: colors.pageBackGround,
    borderRadius: scaleWidth(16),
    width: scaleWidth(32),
    height: scaleWidth(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
