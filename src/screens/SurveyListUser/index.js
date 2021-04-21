import React, { useEffect, useState, useRef, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { scaleHeight, scaleWidth } from '@utils/size'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import SurveyPreview from '@components/SurveyPreview'
import ROUTES from '@utils/routes'
import { SpringScrollView } from '@youngtailors/react-native-spring-scrollview'
import { NormalHeader } from '@youngtailors/react-native-spring-scrollview/NormalHeader'
import Modal from 'react-native-modal'
import colors from '@utils/colors'
import { StorageContext } from '@context/StorageContext'
import useSurveyFunctions from '@hooks/useSurveyFunctions'
import fonts from '@utils/fonts'

function SurveyListUser({ navigation, route }) {
  const [visible, setVisible] = useState(false)
  const { userOptions, labelLang } = useContext(StorageContext)
  const [modalText, setModalText] = useState('')
  const scrollView = useRef(null)
  const { getUserSurveys } = useSurveyFunctions()

  const [userSurveys, setUserSurveys] = useState([])

  const openCloseModal = (textModal = null) => {
    textModal && setModalText(textModal)
    setVisible(visible ? false : true)
  }

  useEffect(() => {
    ;(async () => {
      try {
        const surveys = await getUserSurveys()
        setUserSurveys(surveys)
      } catch (error) {
        console.log(error)
      }
    })()
  }, [userOptions])

  useEffect(() => {
    console.log(route?.params?.new_survey)
    route?.params?.new_survey &&
      setUserSurveys(prev => {
        let new_array = [...prev]
        new_array.unshift(route.params.new_survey)
        return new_array
      })
  }, [route.params])

  return (
    <>
      <SpringScrollView
        ref={scrollView}
        refreshHeader={NormalHeader}
        onRefresh={async () => {
          try {
            const surveys = await getUserSurveys()
            setUserSurveys(surveys)
            surveys && scrollView.current.endRefresh()
          } catch (error) {
            console.log(error)
          }
        }}
        showsVerticalScrollIndicator={false}
        contentStyle={styles.mainContainer}
      >
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => navigation.navigate(ROUTES.AddSurvey)}
          style={styles.surveyContainer}
        >
          <Text numberOfLines={1} style={[styles.txtTitle, { color: 'white' }]}>
            {labelLang.Menu.AddSurvey}
          </Text>
        </TouchableOpacity>
        {userSurveys.map((survey, index) => {
          if (survey.approved) {
            return (
              <TouchableOpacity
                key={index}
                style={styles.eventPreview}
                onPress={() => {
                  survey.title !== '' &&
                    navigation.navigate(ROUTES.SurveySingle, {
                      survey: survey,
                      update: setUserSurveys,
                    })
                }}
              >
                <SurveyPreview survey={survey} />
              </TouchableOpacity>
            )
          } else if (survey.approved === false) {
            return (
              <TouchableOpacity
                key={index}
                style={styles.eventPreview}
                onPress={() =>
                  openCloseModal(survey.approved_or_rejected_message)
                }
              >
                <SurveyPreview survey={survey} disabled />
              </TouchableOpacity>
            )
          } else {
            return (
              <SurveyPreview
                style={styles.eventPreview}
                key={index}
                survey={survey}
                disabled
              />
            )
          }
        })}
      </SpringScrollView>
      <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={visible}
        backdropOpacity={0.35}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        onBackdropPress={() => openCloseModal()}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalMessage}>{modalText}</Text>
        </View>
      </Modal>
    </>
  )
}

export default SurveyListUser

const styles = StyleSheet.create({
  surveyContainer: {
    height: scaleWidth(60),
    width: scaleWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: scaleWidth(16),
    marginBottom: scaleHeight(17),
  },
  txtTitle: {
    fontFamily: fonts.HIND.SemiBold,
    fontWeight: '500',
    fontSize: scaleHeight(20),
    color: colors.oldBurgundy,
    marginTop: scaleHeight(2.5),
  },
  modalContainer: {
    width: scaleWidth(250),
    alignSelf: 'center',
  },
  modalMessage: {
    backgroundColor: colors.pageBackGround,
    borderRadius: 7.5,
    padding: scaleWidth(10),
    marginBottom: scaleHeight(10),
  },
  eventPreview: {
    marginBottom: scaleHeight(16),
  },
  mainContainer: {
    alignItems: 'center',
    paddingBottom: getBottomSpace(),
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(150)
        : scaleHeight(150),
  },
})
