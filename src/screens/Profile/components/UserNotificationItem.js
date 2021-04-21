import React from 'react';
import { View, Text } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { scaleHeight, scaleWidth } from '@utils/size';
import FONTS from '@utils/fonts';
import colors from '@utils/colors';

const UserNotificationItem = (props) => {
  const { Svg, imgDoctors, title, doctorName, time } = props;
  return (
    <View style={styles.container}>
      <View style={styles.svg}>{Svg}</View>
      <Text style={styles.txtTitle}>{title}</Text>
      <View style={styles.btmView}>
        <Text style={styles.doctorName}>{doctorName}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

export default UserNotificationItem;

const styles = ScaledSheet.create({
  container: {
    width: scaleWidth(343),
    height: scaleHeight(96),
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: scaleWidth(16),
    backgroundColor: colors.orange,
    borderRadius: scaleWidth(16),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(16),
  },
  svg: {
    width: scaleWidth(55),
    height: scaleWidth(55),
    borderRadius: scaleWidth(55),
    backgroundColor: colors.blueAccent,
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: scaleWidth(2),
    borderColor: colors.classicBlue,
  },
  txtTitle: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    fontSize: scaleHeight(18),
    lineHeight: scaleHeight(22),
    color: colors.white,
    position: 'absolute',
    paddingLeft: scaleWidth(90),
    top: scaleHeight(21),
  },
  doctorName: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(18),
    color: colors.white,
    fontWeight: '600',
  },
  time: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(18),
    color: colors.white,
    fontWeight: '600',
  },
  btmView: {
    marginTop: scaleHeight(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    bottom: scaleHeight(22),
    paddingLeft: scaleWidth(90),
    paddingRight: scaleWidth(20),
  },
});
