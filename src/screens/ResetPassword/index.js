import React, { useState, useContext } from "react"
import { Text, Alert } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import colors from "@utils/colors"
import { scaleHeight, scaleWidth } from "@utils/size"
import FONTS from "@utils/fonts/index"
import TextInputHealer from "@components/TextInputHealer"
import SvgLock from "@svgs/SignIn/SvgLock"
import ButtonPrimary from "@components/ButtonPrimary"
import ROUTES from "@utils/routes"
import SvgSettingPassword from "@svgs/ResetPassword/SvgSettingPassword"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { StorageContext } from "@context/StorageContext"
import Config from "react-native-config"
import axios from "axios"

const ResetPassword = ({ navigation, route }) => {
  const { userOptions, labelLang } = useContext(StorageContext)
  const [password, setPassword] = useState(null)
  const [rePassword, setRePassword] = useState(null)
  const baseUrl = `${Config.BASE_URL}/api/v1`

  const onGoBack = () => {
    navigation.goBack()
  }

  const onResetPassword = async () => {
    if (password == null || rePassword == null || password !== rePassword) {
      setPassword(null)
      setRePassword(null)
      Alert.alert(
        labelLang.SignIn.NoInfoTitle,
        labelLang.ResetPassword.ErrorText
      )
    } else {
      try {
        const response = await axios.put(
          `${baseUrl}/${userOptions.country_str}/${userOptions.language}/users/password`,
          {
            reset_password_token: route.params.reset_password_token,
            password: password,
            password_confirmation: rePassword,
          }
        )
        response.status === 200 &&
          navigation.replace(ROUTES.ResetPasswordSuccess, { pass: true })
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <KeyboardAwareScrollView
      extraHeight={scaleHeight(100)}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      bounces={false}
    >
      <SvgSettingPassword style={styles.svg} />
      <Text style={styles.txtResetPassword}>
        {labelLang.ResetPassword.Title}
      </Text>
      <Text style={styles.txtPlease}>{labelLang.ResetPassword.Text}</Text>
      <TextInputHealer
        style={styles.txtInput}
        svg={<SvgLock />}
        placeholder={labelLang.SignIn.Password}
        secure={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TextInputHealer
        style={styles.txtInput1}
        svg={<SvgLock />}
        placeholder={labelLang.ResetPassword.RePassword}
        secure={true}
        value={rePassword}
        onChangeText={text => setRePassword(text)}
      />
      <ButtonPrimary
        onPress={onResetPassword}
        style={styles.buttonPrimary}
        title={labelLang.ResetPassword.Button}
      />
    </KeyboardAwareScrollView>
  )
}

export default ResetPassword

const styles = ScaledSheet.create({
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    paddingBottom: scaleHeight(24),
    justifyContent: "center",
    paddingTop: scaleHeight(80),
  },
  svg: {
    marginLeft: scaleWidth(-25),
  },
  txtResetPassword: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: "600",
    lineHeight: scaleHeight(32),
    fontSize: scaleHeight(24),
    color: colors.bluePrimary,
    textAlign: "center",
    marginTop: scaleHeight(22),
  },
  txtPlease: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(24),
    marginTop: scaleHeight(4),
    color: colors.dimGray,
    textAlign: "center",
  },
  txtInput: {
    marginTop: scaleHeight(32),
  },
  txtInput1: {
    marginTop: scaleHeight(16),
  },
  buttonPrimary: {
    width: scaleWidth(295),
    alignSelf: "center",
    marginTop: scaleHeight(32),
  },
})
