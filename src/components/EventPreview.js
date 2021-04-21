import SvgLocation from '@svgs/SvgLocation'
import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import React, { useContext } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import moment from 'moment'
import { StorageContext } from '@context/StorageContext'
import SvgCalendar from '@svgs/MainPage/SvgCalendar'
import SvgAvatar from '@svgs/Menu/SvgAvatar'
import SvgProdemo from '@svgs/SvgProdemo'

function EventPreview(props) {
  const { labelLang, userOptions } = useContext(StorageContext)
  const {
    title,
    abstract,
    address,
    date,
    approved,
    created_by_type,
    created_by_name,
  } = props.event

  const renderAddress = () => {
    if (address) {
      return (
        <View style={styles.locationContainer}>
          {address !== '' && <SvgLocation style={styles.pin} />}
          <Text numberOfLines={1} style={styles.location}>
            {address}
          </Text>
        </View>
      )
    }
  }

  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.title} numberOfLines={1}>
        {title !== '' ? title : labelLang.Events.NoEvents}
      </Text>
      <Text style={styles.description}>{abstract}</Text>
      <View style={styles.createdBy}>
        {created_by_type === 'User' && (
          <SvgAvatar
            fill={colors.dimGray}
            width={15}
            style={{ marginRight: 10 }}
          />
        )}
        <Text style={styles.username}>
          {created_by_type === 'User'
            ? created_by_name
            : created_by_type === 'AdminUser' && (
                <View style={styles.bgSvg}>
                  <SvgProdemo color={colors.white} width={90} height={13.5} />
                </View>
              )}
        </Text>
      </View>
      <View style={styles.infoContainer}>
        <View>
          <View style={styles.dateContainer}>
            {date && (
              <>
                <SvgCalendar
                  style={styles.calendar}
                  color='#e56353'
                  width={19}
                />
                <Text style={styles.location}>
                  {moment(date).locale(userOptions.language).format('LLL')}
                </Text>
              </>
            )}
          </View>
          {renderAddress()}
        </View>
        <Text style={styles.hour}>
          {date &&
            moment(date)
              .locale(userOptions.language)
              .format('D MMM')
              .toUpperCase()}
        </Text>
      </View>
      {props.disabled && (
        <View style={styles.disabled}>
          <Text
            style={[
              styles.status,
              {
                color: approved === false ? colors.red : colors.bluePrimary,
              },
            ]}
          >
            {approved === false
              ? labelLang.Events.EventStatusRejected
              : labelLang.Events.EventStatusPending}
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  bgSvg: {
    padding: scaleWidth(4),
    backgroundColor: colors.bluePrimary,
    borderRadius: scaleWidth(3),
  },
  createdBy: {
    position: 'absolute',
    top: scaleHeight(24),
    right: scaleWidth(16),
    flexDirection: 'row',
  },
  username: {
    color: colors.dimGray,
    fontFamily: FONTS.HIND.SemiBold,
  },
  disabled: {
    backgroundColor: colors.white,
    opacity: 0.75,
    width: scaleWidth(343),
    bottom: 0,
    top: 0,
    position: 'absolute',
    borderRadius: scaleWidth(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  status: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleWidth(16),
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: scaleHeight(15),
  },
  calendar: {
    marginLeft: scaleWidth(-2.5),
    marginRight: scaleWidth(5),
    marginBottom: scaleHeight(3),
  },
  container: {
    backgroundColor: 'white',
    width: scaleWidth(343),
    padding: scaleWidth(16),
    borderRadius: scaleWidth(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  title: {
    width: '61%',
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(20),
    lineHeight: scaleHeight(30),
    color: colors.black,
  },
  description: {
    fontFamily: FONTS.HIND.Regular,
    color: colors.black,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pin: {
    marginRight: scaleWidth(9),
    marginBottom: scaleHeight(3),
  },
  location: {
    fontFamily: FONTS.HIND.Light,
    color: colors.dimGray,
    width: scaleWidth(120),
  },
  hour: {
    fontFamily: FONTS.HIND.Regular,
    color: colors.dimGray,
    fontSize: scaleHeight(25),
  },
})

export default EventPreview
