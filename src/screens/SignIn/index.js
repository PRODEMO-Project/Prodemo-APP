import React, { useContext } from 'react'
import { View, Text, TouchableOpacity, Platform, Alert } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import colors from '@utils/colors'
import FONTS from '@utils/fonts/index'
import SvgLock from '@svgs/SignIn/SvgLock'
import SvgLine from '@svgs/SignIn/SvgLine'
import ROUTES from '@utils/routes'
import ButtonPrimary from '@components/ButtonPrimary'
import TextInputHealer from '@components/TextInputHealer'
import { scaleHeight, scaleWidth } from '@utils/size'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SvgProdemo from '@svgs/SvgProdemo'
import useSignFunctions from '@hooks/useSignFunctions'
import { LoginContext } from '@context/LoginContext'
import { StorageContext } from '@context/StorageContext'
import SvgEmail from '@svgs/SignUp/SvgEmail'

const SignIn = ({ nav, prevScreen = false }) => {
  const navigation = nav.navigation
  const { appleLogin, facebookLogin, googleLogin } = useSignFunctions()
  const { signIn, userEmail, setUserEmail, userPass, setUserPass } = useContext(
    LoginContext
  )
  const { labelLang } = useContext(StorageContext)

  const onSignUp = () => {
    navigation.navigate(ROUTES.SignUp, {
      prevScreen: prevScreen ? true : false,
    })
  }

  const onForgotPassword = () => {
    navigation.navigate(ROUTES.ForgotPassword)
  }

  const onPress = async () => {
    try {
      const res = await signIn(false)
      if (res.status === 422) {
        navigation.navigate(ROUTES.SignUp, { mail: true, prevScreen: true })
      } else if (!res || res.status === 401) {
        Alert.alert(labelLang.SignIn.NoInfoTitle, res.data.error, [
          {
            text: labelLang.SignIn.Cancel,
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: labelLang.SignIn.SignUp,
            onPress: () =>
              navigation.navigate(ROUTES.SignUp, {
                prevScreen: prevScreen ? true : false,
              }),
          },
          { cancelable: true },
        ])
      } else {
        !prevScreen && navigation.navigate(ROUTES.MainPage)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.container}
    >
      <SvgProdemo
        width={300}
        height={75}
        style={[
          styles.txtWelcome,
          {
            marginTop:
              prevScreen && Platform.OS === 'ios'
                ? scaleHeight(60)
                : getStatusBarHeight() + scaleHeight(20),
            marginBottom:
              prevScreen && Platform.OS === 'ios'
                ? scaleHeight(60)
                : getStatusBarHeight() + scaleHeight(20),
          },
        ]}
      />
      <View>
        <TextInputHealer
          svg={<SvgEmail />}
          placeholder={labelLang.SignIn.Email}
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
        />
        <TextInputHealer
          style={styles.txtInput2}
          svg={<SvgLock />}
          placeholder={labelLang.SignIn.Password}
          secure={true}
          value={userPass}
          onChangeText={text => setUserPass(text)}
        />
        <View style={styles.signInView}>
          <ButtonPrimary
            onPress={onPress}
            style={styles.signIn}
            title={labelLang.SignIn.SignIn}
          />
        </View>
        <TouchableOpacity
          onPress={onForgotPassword}
          style={styles.forgotPasswordView}
        >
          <Text style={styles.txtForgotPassword}>
            {labelLang.SignIn.ForgotPassword}
          </Text>
        </TouchableOpacity>
        <View style={styles.lineView}>
          <SvgLine />
          <Text style={styles.txtOr}>{labelLang.SignIn.Or}</Text>
          <SvgLine />
        </View>
        <ButtonPrimary
          onPress={async () => {
            try {
              await facebookLogin()
              const res = await signIn()
              if (res.status === 422) {
                navigation.navigate(ROUTES.SignUp, {
                  mail: true,
                  prevScreen: prevScreen ? true : false,
                })
              } else if (res.status === 401) {
                Alert.alert(labelLang.SignIn.NoInfoTitle, res.data.error)
              } else {
                !prevScreen && navigation.navigate(ROUTES.MainPage)
              }
            } catch (error) {
              console.log(error)
            }
          }}
          style={styles.facebook}
          title={labelLang.SignIn.SignFacebook}
        />
        {Platform.OS !== 'ios' ? (
          <ButtonPrimary
            onPress={async () => {
              try {
                await googleLogin()
                const res = await signIn()
                if (res.status === 422) {
                  navigation.navigate(ROUTES.SignUp, {
                    mail: true,
                    prevScreen: prevScreen ? true : false,
                  })
                } else {
                  !prevScreen && navigation.navigate(ROUTES.MainPage)
                }
              } catch (error) {
                console.log(error)
              }
            }}
            style={styles.google}
            title={labelLang.SignIn.SignGoogle}
          />
        ) : (
          <ButtonPrimary
            onPress={async () => {
              try {
                await appleLogin()
                const res = await signIn()
                if (res.status === 422) {
                  navigation.navigate(ROUTES.SignUp, {
                    mail: true,
                    prevScreen: prevScreen ? true : false,
                  })
                } else {
                  !prevScreen && navigation.navigate(ROUTES.MainPage)
                }
              } catch (error) {
                console.log(error)
              }
            }}
            style={styles.apple}
            title={labelLang.SignIn.SignApple}
          />
        )}
        <TouchableOpacity onPress={onSignUp} style={styles.SignUpView}>
          <Text style={styles.txtSignUp}>{labelLang.SignIn.NotAccount}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default SignIn

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  svgHeart: {
    top: scaleHeight(56),
    left: scaleWidth(40),
  },
  svgHumanView: {
    height: scaleHeight(177),
    width: scaleHeight(177),
    borderRadius: scaleHeight(177) / 2,
    backgroundColor: colors.secondRed,
    position: 'absolute',
    top: scaleHeight(15),
    right: -scaleHeight(177) / 2,
  },
  svgHuman: {
    marginTop: scaleHeight(30),
    marginLeft: -scaleWidth(40),
  },
  txtWelcome: {
    alignSelf: 'center',
    marginTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(0)
        : scaleHeight(80),
  },
  txtInput2: {
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(24),
  },
  signIn: {
    width: scaleWidth(221),
    height: scaleHeight(48),
  },
  signInView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordView: {
    marginTop: scaleHeight(20),
    alignSelf: 'center',
    width: scaleWidth(200),
    height: scaleHeight(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtForgotPassword: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '600',
    fontSize: scaleHeight(12),
    color: colors.bluePrimary,
    textTransform: 'uppercase',
  },
  txtOr: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(12.5),
    color: colors.bluePrimary,
  },
  lineView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scaleWidth(40),
    alignItems: 'center',
    marginTop: scaleHeight(25),
  },
  facebook: {
    width: scaleWidth(295),
    alignSelf: 'center',
    marginTop: scaleHeight(15),
    backgroundColor: colors.classicBlue,
  },
  google: {
    width: scaleWidth(295),
    backgroundColor: colors.secondRed,
    alignSelf: 'center',
    marginTop: scaleHeight(15),
  },
  apple: {
    width: scaleWidth(295),
    backgroundColor: colors.black1,
    alignSelf: 'center',
    marginTop: scaleHeight(15),
  },
  SignUpView: {
    alignSelf: 'center',
    // width: scaleWidth(200),
    paddingLeft: 10,
    paddingRight: 10,
    height: scaleHeight(22.5),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bluePrimary,
    borderRadius: scaleWidth(15),
    marginTop: scaleHeight(50),
  },
  txtSignUp: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '600',
    fontSize: scaleHeight(12),
    marginTop: scaleHeight(3),
    color: colors.white,
    textTransform: 'uppercase',
  },
})
