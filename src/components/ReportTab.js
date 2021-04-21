import colors from '@utils/colors'
import fonts from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import React, { useState, useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal'
import ButtonPrimary from './ButtonPrimary'
import TextInputHealer from './TextInputHealer'
import Toast from 'react-native-toast-message'
import useCreateEvent from '@hooks/useCreateEvent'
import { StorageContext } from '@context/StorageContext'
import useSurveyFunctions from '@hooks/useSurveyFunctions'
import { getBottomSpace } from 'react-native-iphone-x-helper'

function ReportTab(props) {
  const { labelLang } = useContext(StorageContext)
  const { id, type } = props
  const { reportSurvey } = useSurveyFunctions()
  const { reportEvent } = useCreateEvent()
  const [visible, setVisible] = useState(false)
  const [reportMessage, setReportMessage] = useState(null)

  const openCloseModal = () => {
    setVisible(visible ? false : true)
  }

  const changeReportMessage = text => {
    setReportMessage(text)
  }

  const sendReportMessage = async () => {
    try {
      type === 'Event'
        ? await reportEvent(reportMessage, id)
        : await reportSurvey(reportMessage, id)
      openCloseModal()
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: labelLang.Report.MessageSent,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.4} onPress={openCloseModal}>
        <View style={styles.border}></View>
        <View style={styles.content}>
          <Text style={styles.text}>{labelLang.Report.Title}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationIn='fadeIn'
        animationOut='fadeOut'
        isVisible={visible}
        backdropOpacity={0.35}
        hideModalContentWhileAnimating={true}
        backdropTransitionOutTiming={0}
        onBackdropPress={openCloseModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.reportText}>{labelLang.Report.TextTop}</Text>
          <TextInputHealer
            placeholder={labelLang.Report.Type}
            multiline
            style={styles.textInput}
            onChangeText={changeReportMessage}
          />
          <ButtonPrimary
            onPress={sendReportMessage}
            style={{ backgroundColor: colors.red }}
            title={labelLang.Report.Send}
          />
        </View>
      </Modal>
    </View>
  )
}

export default ReportTab

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
  },
  reportText: {
    color: colors.black,
    textAlign: 'center',
    paddingBottom: scaleHeight(16),
    paddingHorizontal: scaleWidth(3),
  },
  border: {
    height: scaleHeight(1),
    width: scaleWidth(343),
    marginHorizontal: scaleWidth(16),
    backgroundColor: colors.bluePrimary,
  },
  content: {
    height: scaleHeight(45) + getBottomSpace(),
    paddingBottom: getBottomSpace(),
    backgroundColor: colors.pageBackGround,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: scaleWidth(11.5),
    fontFamily: fonts.HIND.SemiBold,
    color: colors.bluePrimary,
  },
  modalContainer: {
    width: scaleWidth(250),
    backgroundColor: colors.pageBackGround,
    borderRadius: scaleWidth(5),
    padding: scaleWidth(16),
    alignSelf: 'center',
  },
  textInput: {
    width: '100%',
    height: scaleHeight(100),
    borderRadius: 4,
    alignItems: 'flex-start',
    backgroundColor: colors.white,
    paddingHorizontal: 10,
    marginBottom: scaleHeight(16),
  },
})
