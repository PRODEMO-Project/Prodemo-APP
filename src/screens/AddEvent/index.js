import React, { useCallback, useContext, useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  Text,
  
  Platform,
} from 'react-native'
import { TouchableOpacity} from 'react-native-gesture-handler'
import { scaleHeight, scaleWidth } from '@utils/size'
import FONTS from '@utils/fonts'
import colors from '@utils/colors'
import ButtonPrimary from '@components/ButtonPrimary'
import { StorageContext } from '@context/StorageContext'
import TextInputHealer from '@components/TextInputHealer'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RNPickerSelect from 'react-native-picker-select'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import moment from 'moment'
import useCreateEvent from '@hooks/useCreateEvent'
import { LoginContext } from '@context/LoginContext'
import SignInStack from '@navigation/SignInStack'
import Toast from 'react-native-toast-message'
import ROUTES from '@utils/routes'

const AddEvent = ({ navigation }) => {
  const { getEventTypes, submitEvent } = useCreateEvent()
  const { labelLang, userOptions } = useContext(StorageContext)
  const { loggedUser } = useContext(LoginContext)

  const [eventTypes, setEventTypes] = useState([])
  const [eventType, setEventType] = useState(1)
  const [selDate, setSelDate] = useState(null)
  const [textInputs, setTextInputs] = useState({
    title: '',
    short_desc: '',
    long_desc: '',
    address: '',
    link: '',
  })
  const errors = {
    date: labelLang.Events.CreateEvent.Date,
    address: '',
    translations: {
      title: labelLang.Events.CreateEvent.Title,
      abstract: labelLang.Events.CreateEvent.Abstract,
      description: labelLang.Events.CreateEvent.Description,
    },
  }

  useEffect(() => {
    loggedUser &&
      (async () => {
        try {
          const res = await getEventTypes()
          setEventTypes(res)
        } catch (error) {
          console.log(error)
        }
      })()
  }, [loggedUser])

  const onSubmit = async () => {
    try {
      const response = await submitEvent(eventType, selDate, textInputs)
      if (response.response?.status === 422) {
        const errorField = Object.keys(response.response.data)[0]
        const errorMessage =
          response.response.data[Object.keys(response.response.data)[0]][0]
        Toast.show({
          type: 'error',
          position: 'top',
          text1: `${
            errorField.includes('.')
              ? errors[errorField.split('.')[0]][errorField.split('.')[1]]
              : errors[errorField]
          } ${errorMessage}`,
        })
      } else {
        Toast.show({
          type: 'success',
          position: 'bottom',
          text1: labelLang.Events.CreateEvent.EventCreated,
        })
        navigation.navigate(ROUTES.EventsTopNavigator, {
          screen: ROUTES.EventListUser, params: { new_event: response }
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

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = date => {
    setSelDate(date)
    hideDatePicker()
  }

  if (!loggedUser) {
    return <SignInStack prevScreen={true} />
  }

  if (eventTypes.length === 0) {
    return false
  }

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={16}
      style={styles.container}
    >
      <Text style={styles.txtTitle}>{labelLang.Events.CreateEvent.Header}</Text>
      <TextInputHealer
        name='title'
        style={styles.inputButton}
        onChangeText={text => handleChange(text, 'title')}
        placeholder={`${labelLang.Events.CreateEvent.Title} *`}
      />
      <TouchableOpacity activeOpacity={0.8} onPress={showDatePicker}>
        <TextInputHealer
          style={styles.inputButton}
          editable={false}
          placeholder={
            selDate
              ? moment(selDate).locale(userOptions.language).format('LLL')
              : `${labelLang.Events.CreateEvent.Date} *`
          }
        />
      </TouchableOpacity>
      <TextInputHealer
        name='short_desc'
        style={styles.inputButton}
        onChangeText={text => handleChange(text, 'short_desc')}
        placeholder={`${labelLang.Events.CreateEvent.Abstract} *`}
      />
      <TextInputHealer
        name='long_desc'
        style={styles.inputButtonLong}
        onChangeText={text => handleChange(text, 'long_desc')}
        placeholder={`${labelLang.Events.CreateEvent.Description} *`}
        multiline={true}
      />
      <TextInputHealer
        name='address'
        onChangeText={text => handleChange(text, 'address')}
        style={styles.inputButton}
        placeholder={labelLang.Events.CreateEvent.Address}
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
            value={eventType}
            onValueChange={value => setEventType(value)}
            items={eventTypes}
          />
        }
      />
      <View style={styles.deviceItem}>
        <Text style={styles.content}>
          {labelLang.Events.CreateEvent.SubmitText}
        </Text>
      </View>
      <ButtonPrimary
        onPress={onSubmit}
        style={styles.buttonPrimacy}
        title={labelLang.Events.CreateEvent.Submit}
      />
      <DateTimePickerModal
        is24Hour={true}
        isVisible={isDatePickerVisible}
        mode='datetime'
        locale={userOptions.language}
        headerTextIOS={labelLang.Events.CreateEvent.DatePicker}
        confirmTextIOS={labelLang.Events.CreateEvent.DatePickerConfirm}
        cancelTextIOS={labelLang.Events.CreateEvent.DatePickerCancel}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </KeyboardAwareScrollView>
  )
}

export default AddEvent

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
