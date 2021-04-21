import React, { useContext, useState } from 'react'
import { Text, TouchableOpacity, Alert } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import colors from '@utils/colors'
import { scaleHeight, scaleWidth } from '@utils/size'
import FONTS from '@utils/fonts/index'
import ROUTES from '@utils/routes'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import SvgLock from '@svgs/ForgotPassword/SvgLock'
import TextInputHealer from '@components/TextInputHealer'
import SvgEmail from '@svgs/SignUp/SvgEmail'
import ButtonPrimary from '@components/ButtonPrimary'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import useServerFunctions from '@hooks/useServerFunctions'
import { StorageContext } from '@context/StorageContext'

const ForgotPassword = ({ navigation }) => {
  const { POSTrequest } = useServerFunctions()
  const { userOptions, labelLang } = useContext(StorageContext)
  const [userEmail, setUserEmail] = useState()

  const onSendEmail = async () => {
    try {
      const result = await POSTrequest(
        userOptions.country_str,
        userOptions.language,
        'users/password',
        {
          email: userEmail,
        }
      )
      if (result.email) {
        Alert.alert(
          labelLang.ForgotPassword.ConfirmationSent,
          `${labelLang.ForgotPassword.Confirmation_1} ${result.email} ${labelLang.ForgotPassword.Confirmation_2}`
        )
        navigation.replace(ROUTES.MainPage)
      } else {
        Alert.alert(
          labelLang.SignIn.NoInfoTitle,
          `${labelLang.ForgotPassword.Wrong_1} ${userEmail} ${labelLang.ForgotPassword.Wrong_2}`
        )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSignUp = () => {
    navigation.replace(ROUTES.SignUp)
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
    >
      <SvgLock />
      <Text style={styles.txtForgotPassword}>
        {labelLang.SignIn.ForgotPassword}
      </Text>
      <Text style={styles.txtWorry}>{labelLang.ForgotPassword.Text}</Text>
      <TextInputHealer
        style={styles.txtInput2}
        svg={<SvgEmail />}
        placeholder={labelLang.SignIn.Email}
        value={userEmail}
        onChangeText={text => setUserEmail(text)}
      />
      <ButtonPrimary
        onPress={onSendEmail}
        style={styles.signUp}
        title={labelLang.ForgotPassword.SendEmail}
      />
      <TouchableOpacity onPress={onSignUp} style={styles.SignUpView}>
        <Text style={styles.txtSignUp}>{labelLang.SignIn.NotAccount}</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  )
}

export default ForgotPassword

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtForgotPassword: {
    fontFamily: FONTS.HIND.semiBold,
    fontWeight: '600',
    fontSize: scaleHeight(24),
    lineHeight: scaleHeight(32),
    color: colors.bluePrimary,
    textAlign: 'center',
    marginTop: scaleHeight(35),
  },
  signUp: {
    paddingHorizontal: scaleWidth(40),
    alignSelf: 'center',
    marginTop: scaleHeight(10),
  },
  txtWorry: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(24),
    color: colors.dimGray,
    textAlign: 'center',
    marginTop: scaleHeight(4),
    marginHorizontal: scaleWidth(50),
  },
  SignUpView: {
    position: 'absolute',
    alignSelf: 'center',
    // width: scaleWidth(200),
    paddingLeft: 10,
    paddingRight: 10,
    height: scaleHeight(22.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bluePrimary,
    borderRadius: scaleWidth(15),
    bottom: getBottomSpace() + scaleHeight(20),
  },
  txtInput2: {
    margin: scaleWidth(28),
  },
  txtSignUp: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '600',
    marginTop: scaleHeight(3),
    fontSize: scaleHeight(12),
    color: colors.white,
    textTransform: 'uppercase',
  },
})
