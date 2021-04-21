import React, { memo, useState, useEffect, useContext } from 'react'
import {
  View,
  Text,
  Platform,
  Alert,
  TouchableOpacity,
  Linking,
  Image,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import colors from '@utils/colors'
import { getHeightByPercent, scaleHeight, scaleWidth } from '@utils/size'
import FONTS from '@utils/fonts/index'
import TextInputHealer from '@components/TextInputHealer'
import SvgUser from '@svgs/SignIn/SvgUser'
import SvgLock from '@svgs/SignIn/SvgLock'
import SvgEmail from '@svgs/SignUp/SvgEmail'
import ButtonPrimary from '@components/ButtonPrimary'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import ROUTES from '@utils/routes'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { widthScreen } from '@utils/dimensions'
import { StorageContext } from '@context/StorageContext'
import { LoginContext } from '@context/LoginContext'
import useServerFunctions from '@hooks/useServerFunctions'
import RNPickerSelect from 'react-native-picker-select'
import SvgLocation from '@svgs/SvgLocation'
import SvgCheck from '@svgs/SvgCheck'

const SignUp = ({ navigation, route }) => {
  const { GETrequest } = useServerFunctions()
  const { userOptions, labelLang } = useContext(StorageContext)
  const {
    username,
    setUsername,
    userRegion,
    setUserRegion,
    userEmail,
    setUserEmail,
    userPass,
    setUserPass,
    signUp,
  } = useContext(LoginContext)
  const [regions, setRegions] = useState([])
  const [checkbox, setCheckbox] = useState(false)
  const viewCheck = checkbox ? styles.active : styles.inactive

  useEffect(() => {
    GETrequest(userOptions.country_str, userOptions.language, 'regions')
      .then(data => {
        let newArr = [{ label: labelLang.SignUp.ChooseRegion, value: 0 }]
        for (let region of data) {
          newArr.push({ label: region.name, value: region.id })
        }
        setRegions(newArr)
      })
      .catch(err => console.log(err))
  }, [])

  const onSignUp = async () => {
    if (route.params?.mail) {
      if (!username || username === '' || !checkbox) {
        Alert.alert(
          labelLang.SignUp.ValidationErrorTitle,
          labelLang.SignUp.ValidationErrorMessage
        )
      } else {
        try {
          await signUp()
          !route.params?.prevScreen && navigation.navigate(ROUTES.MainPage)
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      if (
        !username ||
        username === '' ||
        !userEmail ||
        !userPass ||
        !checkbox ||
        [...userPass].length < 6
      ) {
        Alert.alert(
          labelLang.SignUp.ValidationErrorTitle,
          [...userPass].length < 6
            ? labelLang.SignUp.PasswordShort
            : labelLang.SignUp.ValidationErrorMessage
        )
      } else {
        try {
          const result = await signUp(false)
          if (result === 422) {
            Alert.alert(
              labelLang.SignUp.ValidationErrorTitle,
              labelLang.SignUp.ValidationErrorMessage
            )
          } else if (!result) {
            !route.params?.prevScreen && navigation.navigate(ROUTES.MainPage)
          }
        } catch (error) {
          console.log(error)
        }
      }
    }
  }

  const onCheckPrivacy = () => {
    setCheckbox(!checkbox)
  }

  return (
    <View style={styles.container}>
      <View style={styles.svgView} />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Image
          source={require('@assets/SignUp/ImgSignUp.png')}
          style={styles.svg}
        />
        <View style={[styles.contentView]}>
          <Text style={styles.txtJoin}>{labelLang.SignUp.JoinTitle}</Text>
          <Text style={styles.txtVacation}>{labelLang.SignUp.JoinMessage}</Text>
          <TextInputHealer
            style={styles.txtInput1}
            svg={<SvgUser />}
            placeholder={labelLang.SignUp.Username}
            value={username}
            onChangeText={text => setUsername(text)}
          />
          {!route.params?.mail && (
            <>
              <TextInputHealer
                style={styles.txtInput2}
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
            </>
          )}
          <TextInputHealer
            style={styles.txtInput2}
            svg={
              <SvgLocation
                fill='#6D5F6F'
                width={16}
                style={{ marginBottom: -4 }}
              />
            }
            component={
              <RNPickerSelect
                style={styles}
                placeholder={{}}
                value={userRegion}
                onValueChange={value => setUserRegion(value)}
                items={regions}
              />
            }
          />
          <View style={styles.deviceItem}>
            <TouchableOpacity activeOpacity={0.6} onPress={onCheckPrivacy}>
              <View style={[styles.viewCheck, viewCheck]}>
                {checkbox ? <SvgCheck fill='#fff' /> : null}
              </View>
            </TouchableOpacity>
            <Text style={styles.content}>{labelLang.SignUp.Policy_1} </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(labelLang.SignUp.Policy_Url)}
            >
              <Text
                style={[styles.content, { textDecorationLine: 'underline' }]}
              >
                {labelLang.SignUp.Policy_2}
              </Text>
            </TouchableOpacity>
          </View>
          <ButtonPrimary
            onPress={onSignUp}
            style={styles.signUp}
            title={labelLang.SignIn.SignUp}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  )
}

export default SignUp

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop:
      Platform.OS === 'ios' ? getStatusBarHeight() + 0 : scaleHeight(10),
  },
  inputIOS: {
    width: scaleWidth(295),
    height: scaleHeight(48),
    color: colors.semiBlack,
  },
  inputAndroid: {
    width: scaleWidth(245),
    height: scaleHeight(48),
    color: colors.semiBlack,
  },
  svg: {
    alignSelf: 'center',
    marginTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(40)
        : scaleHeight(40),
    marginBottom: scaleHeight(-3),
  },
  contentView: {
    backgroundColor: colors.white,
    borderTopRightRadius: scaleWidth(24),
    borderTopLeftRadius: scaleWidth(24),
    flex: 1,
  },
  txtJoin: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '600',
    fontSize: scaleHeight(24),
    lineHeight: scaleHeight(32),
    color: colors.bluePrimary,
    marginLeft: scaleWidth(25),
    marginTop: scaleHeight(29),
  },
  txtVacation: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(15),
    lineHeight: scaleHeight(24),
    color: colors.semiBlack,
    marginHorizontal: scaleWidth(25),
    marginTop: scaleHeight(4),
  },
  txtInput1: {
    marginTop: scaleHeight(27),
  },
  txtInput2: {
    marginTop: scaleHeight(16),
  },
  signUp: {
    width: scaleWidth(295),
    alignSelf: 'center',
    marginTop: scaleHeight(24),
  },
  txtOr: {
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    color: colors.dimGray,
  },
  lineView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: scaleWidth(40),
    alignItems: 'center',
    marginTop: scaleHeight(17),
  },
  bottomView: {
    flexDirection: 'row',
    marginHorizontal: scaleWidth(40),
    marginTop: scaleHeight(15),
    justifyContent: 'space-between',
  },
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + scaleHeight(24),
  },
  svgView: {
    backgroundColor: colors.bluePrimary,
    position: 'absolute',
    width: widthScreen,
    height: getHeightByPercent(56),
  },
  deviceItem: {
    width: scaleWidth(295),
    height: scaleHeight(48),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: scaleHeight(16),
  },
  active: {
    backgroundColor: colors.blueAccent,
  },
  inactive: {
    borderWidth: scaleWidth(1),
    borderColor: '#B3B3B3',
  },
  content: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '300',
    fontSize: scaleHeight(12.5),
    marginTop: scaleHeight(2),
  },
  viewCheck: {
    marginHorizontal: scaleWidth(16),
    width: scaleWidth(16),
    height: scaleWidth(16),
    borderRadius: scaleWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
})
