import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Platform,
  TouchableOpacity,
} from 'react-native'
import { scaleHeight, scaleWidth } from '@utils/size'
import FONTS from '@utils/fonts'
import colors from '@utils/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import { StorageContext } from '@context/StorageContext'
import TextInputHealer from '@components/TextInputHealer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from 'react-native-picker-select'
import useSurveyFunctions from '@hooks/useSurveyFunctions'
import { LoginContext } from '@context/LoginContext'
import useServerFunctions from '@hooks/useServerFunctions'
import SignInStack from '@navigation/SignInStack'
import Toast from 'react-native-toast-message'
import ROUTES from '@utils/routes'
import SvgAdd from '@svgs/SvgAdd'

const AddSurvey = ({ navigation }) => {
  const { GETrequest } = useServerFunctions()
  const { getSurveyTypes, submitSurvey } = useSurveyFunctions()
  const { labelLang, userOptions } = useContext(StorageContext)
  const { loggedUser } = useContext(LoginContext)

  const [surveyTypes, setSurveyTypes] = useState([])
  const [surveyType, setSurveyType] = useState(1)
  const [regions, setRegions] = useState([])
  const [regionId, setRegionId] = useState(0)
  const [textInputs, setTextInputs] = useState({
    title: '',
    description: '',
    link: '',
  })
  const [options, setOptions] = useState([
    { description: '' },
    { description: '' },
  ])

  const errors = {
    translations: {
      title: labelLang.Events.CreateEvent.Title,
    },
    survey_options: 'Number of answers',
  }

  useEffect(() => {
    if (loggedUser) {
      GETrequest(userOptions.country_str, userOptions.language, 'regions')
        .then(data => {
          let newArr = [{ label: labelLang.SignUp.ChooseRegion, value: 0 }]
          for (let region of data) {
            newArr.push({ label: region.name, value: region.id })
          }
          setRegions(newArr)
        })
        .catch(err => console.log(err))
      ;(async () => {
        try {
          const res = await getSurveyTypes()
          setSurveyTypes(res)
        } catch (error) {
          console.log(error)
        }
      })()
    }
  }, [loggedUser])

  const onSubmit = async () => {
    try {
      const response = await submitSurvey(
        surveyType,
        textInputs,
        regionId,
        options
      )
      if (response.response?.status === 422) {
        const errorField = Object.keys(response.response.data)[0]
        const errorMessage =
          response.response.data[Object.keys(response.response.data)[0]][0]
        Toast.show({
          type: 'error',
          position: 'top',
          text1: `${
            errorField.includes('.')
              ? errorField.split('.')[2] != undefined
                ? errors[errorField.split('.')[0]][errorField.split('.')[1]][
                    errorField.split('.')[2]
                  ]
                : errors[errorField.split('.')[0]][errorField.split('.')[1]]
              : errors[errorField]
          } ${errorMessage}`,
        })
      } else {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: labelLang.Surveys.AddSurvey.SurveyCreated,
        })
        navigation.navigate(ROUTES.SurveysTopNavigator, {
          screen: ROUTES.SurveyListUser,
          params: { new_survey: response },
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (text, val) => {
    if (val === 'link') {
      const isHttp = new RegExp('^(http|https)://')
      if (!isHttp.test(text)) {
        text = 'http://' + text
      }
    }
    setTextInputs(prev => ({
      ...prev,
      [val]: text,
    }))
  }

  const editOptions = (text, index) => {
    setOptions(prev => {
      let newArr = [...prev]
      newArr[index] = { description: text }
      return newArr
    })
  }

  if (!loggedUser) {
    return <SignInStack prevScreen={true} />
  }

  if (surveyTypes.length === 0) {
    return false
  }

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      style={styles.container}
    >
      <Text style={styles.txtTitle}>{labelLang.Surveys.AddSurvey.Header}</Text>
      <TextInputHealer
        style={styles.inputButton}
        onChangeText={text => handleChange(text, 'title')}
        placeholder={`${labelLang.Events.CreateEvent.Title} *`}
      />
      <TextInputHealer
        style={styles.inputButtonLong}
        onChangeText={text => handleChange(text, 'description')}
        placeholder={`${labelLang.Events.CreateEvent.Description} *`}
        multiline={true}
      />
      <TextInputHealer
        name='link'
        onChangeText={text => handleChange(text, 'link')}
        style={styles.inputButton}
        placeholder={labelLang.Events.CreateEvent.Link}
      />
      <TextInputHealer
        style={styles.inputButton}
        component={
          <RNPickerSelect
            style={styles}
            placeholder={{}}
            value={surveyType}
            onValueChange={value => setSurveyType(value)}
            items={surveyTypes}
          />
        }
      />
      <TextInputHealer
        style={styles.inputButton}
        component={
          <RNPickerSelect
            style={styles}
            placeholder={{}}
            value={regionId}
            onValueChange={value => setRegionId(value)}
            items={regions}
          />
        }
      />
      {options.map((answer, index) => (
        <TextInputHealer
          key={index}
          onChangeText={text => editOptions(text, index)}
          style={styles.inputButton}
          placeholder={labelLang.Surveys.AddSurvey.Answer + ' ' + (index + 1)}
        />
      ))}
      {options.length < 8 && (
        <TouchableOpacity
          style={styles.addAnswer}
          onPress={() => {
            setOptions(prev => {
              let newArr = [...prev]
              newArr.push({ description: '' })
              return newArr
            })
          }}
        >
          <SvgAdd fill={colors.bluePrimary} style={{ marginRight: 10 }} />
          <Text>{labelLang.Surveys.AddSurvey.AddAnswer}</Text>
        </TouchableOpacity>
      )}
      <View style={styles.deviceItem}>
        <Text style={styles.content}>
          {labelLang.Surveys.AddSurvey.SubmitText}
        </Text>
      </View>
      <ButtonPrimary
        onPress={onSubmit}
        style={styles.buttonPrimacy}
        title={labelLang.Events.CreateEvent.Submit}
      />
    </KeyboardAwareScrollView>
  )
}

export default AddSurvey

const styles = StyleSheet.create({
  inputIOS: {
    width: scaleWidth(295),
    height: scaleHeight(48),
    color: colors.semiBlack,
  },
  inputAndroid: {
    width: scaleWidth(275),
    height: scaleHeight(48),
    color: colors.semiBlack,
  },
  deviceItem: {
    width: scaleWidth(295),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
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
    marginHorizontal: scaleWidth(10),
    color: colors.black,
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: Platform.OS === 'ios' ? scaleHeight(70) : scaleHeight(50),
  },
  txtTitle: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(28),
    fontWeight: '700',
    lineHeight: scaleHeight(36),
    marginTop: scaleHeight(36),
    marginHorizontal: scaleWidth(40),
    color: colors.brown,
    marginBottom: scaleHeight(39),
  },
  inputButton: {
    marginBottom: scaleHeight(24),
    paddingHorizontal: scaleWidth(16),
  },
  addAnswer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(24),
    paddingHorizontal: scaleWidth(65),
  },
  inputButtonLong: {
    height: scaleHeight(150),
    marginBottom: scaleHeight(24),
    paddingHorizontal: scaleWidth(16),
    alignItems: 'flex-start',
  },
  buttonPrimacy: {
    width: scaleWidth(295),
    alignSelf: 'center',
    marginVertical: scaleHeight(39),
  },
})
