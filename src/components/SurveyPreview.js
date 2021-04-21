import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import React, { useContext } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { StorageContext } from '@context/StorageContext'
import SvgProdemo from '@svgs/SvgProdemo'
import SvgAvatar from '@svgs/Menu/SvgAvatar'

function SurveyPreview(props) {
  const { labelLang } = useContext(StorageContext)
  const {
    title,
    votes_number,
    approved,
    survey_options,
    created_by_type,
    created_by_name,
  } = props.survey
  return (
    <View style={[styles.container, props.style]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.surveyTitle}>{title}</Text>
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
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.surveyInfo}>
          {`${survey_options.length} ${labelLang.Surveys.Answers}`}
        </Text>
        <Text style={styles.surveyInfo}>
          {votes_number === 1
            ? `${votes_number} ${labelLang.Surveys.Vote}`
            : `${votes_number} ${labelLang.Surveys.Votes}`}
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

export default SurveyPreview

const styles = StyleSheet.create({
  bgSvg: {
    padding: scaleWidth(3),
    backgroundColor: colors.bluePrimary,
    borderRadius: scaleWidth(3),
  },
  createdBy: {
    flexDirection: 'row',
    position: 'absolute',
    top: scaleHeight(8),
    right: scaleWidth(0),
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
  container: {
    backgroundColor: colors.white,
    padding: scaleWidth(16),
    paddingVertical: scaleWidth(14),
    marginBottom: scaleHeight(14),
    width: scaleWidth(343),
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
  surveyTitle: {
    width: '61%',
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(20),
    lineHeight: scaleHeight(30),
    color: colors.black,
  },
  surveyInfo: {
    fontFamily: FONTS.HIND.Regular,
    color: colors.dimGray,
    fontSize: scaleHeight(16),
  },
})
