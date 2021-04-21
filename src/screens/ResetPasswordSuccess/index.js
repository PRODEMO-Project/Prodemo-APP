import React, { memo, useCallback, useEffect, useContext } from "react"
import { View, Text } from "react-native"
import { ScaledSheet } from "react-native-size-matters"
import colors from "@utils/colors"
import { scaleHeight, scaleWidth } from "@utils/size"
import FONTS from "@utils/fonts/index"
import ButtonPrimary from "@components/ButtonPrimary"
import ROUTES from "@utils/routes"
import SvgLockSuccess from "@svgs/ResetPasswordSuccess/SvgLockSuccess"
import useServerFunctions from "@hooks/useServerFunctions"
import { StorageContext } from "@context/StorageContext"

const ResetPasswordSuccess = memo(({ navigation, route }) => {
  const { GETrequest } = useServerFunctions()
  const { userOptions, labelLang } = useContext(StorageContext)

  useEffect(() => {
    route.params?.confirmation_token &&
      GETrequest(
        userOptions.country_str,
        userOptions.language,
        `users/confirmation`,
        `confirmation_token=${route.params.confirmation_token}`
      ).catch(err => console.log(err))
  }, [])

  const onBackHome = useCallback(() => {
    route.params.pass
      ? navigation.replace(ROUTES.SignIn)
      : navigation.navigate(ROUTES.MainPage)
  }, [navigation])

  return (
    <View style={styles.container}>
      <SvgLockSuccess style={styles.svg} />
      <Text style={styles.txtCongratulations}>
        {route.params.pass
          ? labelLang.EmailPasswordSuccess.Password
          : labelLang.EmailPasswordSuccess.Email}
      </Text>
      <Text style={styles.txtDescription}>
        {route.params.pass
          ? labelLang.EmailPasswordSuccess.PasswordText
          : labelLang.EmailPasswordSuccess.EmailText}
      </Text>
      <ButtonPrimary
        onPress={onBackHome}
        style={styles.buttonPrimary}
        title={
          route.params.pass
            ? labelLang.SignIn.SignIn
            : labelLang.EmailPasswordSuccess.BackHome
        }
      />
    </View>
  )
})

export default ResetPasswordSuccess

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtCongratulations: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: "600",
    lineHeight: scaleHeight(32),
    fontSize: scaleHeight(24),
    color: colors.bluePrimary,
    textAlign: "center",
    marginTop: scaleHeight(22),
  },
  txtDescription: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(24),
    color: colors.dimGray,
    textAlign: "center",
    marginTop: scaleHeight(12),
    marginHorizontal: scaleWidth(60),
  },
  buttonPrimary: {
    width: scaleWidth(235),
    alignSelf: "center",
    marginTop: scaleHeight(32),
  },
})
