import { useContext } from 'react'
import axios from 'axios'
import { StorageContext } from '@context/StorageContext'
import Config from 'react-native-config'
import useServerFunctions from '@hooks/useServerFunctions'
import AsyncStorage from '@react-native-async-storage/async-storage'

function useCreateEvent() {
  const { userOptions } = useContext(StorageContext)
  const { GETrequest, POSTrequest } = useServerFunctions()

  const reportEvent = async (message, eventId) => {
    const body = {
      message: message,
      violable_type: 'Event',
      violable_id: eventId,
    }
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await POSTrequest(
        userOptions.country_str,
        userOptions.language,
        'violation_reports',
        body,
        user && JSON.parse(user).bearer
      )
      return response
    } catch (error) {
      return error
    }
  }

  const getUserEvents = async () => {
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await GETrequest(
        userOptions.country_str,
        userOptions.language,
        'events/my',
        '',
        JSON.parse(user).bearer
      )
      return response
    } catch (error) {
      return error
    }
  }

  const getEventTypes = async () => {
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await GETrequest(
        userOptions.country_str,
        userOptions.language,
        'event_types',
        '',
        JSON.parse(user).bearer
      )
      return response
    } catch (error) {
      return error
    }
  }

  const submitEvent = async (eventType, selDate, textInputs) => {
    const body = {
      date: selDate,
      event_type_id: eventType,
      address: textInputs.address === '' ? null : textInputs.address,
      link: textInputs.link === '' ? null : textInputs.link,
      translations_attributes: [
        {
          locale: userOptions.language,
          description: textInputs.long_desc,
          title: textInputs.title,
          abstract: textInputs.short_desc,
        },
      ],
    }
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await POSTrequest(
        userOptions.country_str,
        userOptions.language,
        'events',
        body,
        JSON.parse(user).bearer
      )
      return response
    } catch (error) {
      return error
    }
  }

  return { getEventTypes, submitEvent, getUserEvents, reportEvent }
}

export default useCreateEvent
