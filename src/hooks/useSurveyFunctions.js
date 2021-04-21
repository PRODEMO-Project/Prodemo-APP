import { useContext } from 'react'
import { StorageContext } from '@context/StorageContext'
import useServerFunctions from '@hooks/useServerFunctions'
import AsyncStorage from '@react-native-async-storage/async-storage'

function useSurveyFunctions() {
  const { userOptions } = useContext(StorageContext)
  const { GETrequest, POSTrequest } = useServerFunctions()

  const reportSurvey = async (message, surveyId) => {
    const body = {
      message: message,
      violable_type: 'Survey',
      violable_id: surveyId,
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

  const getSurveys = async (page = 1) => {
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await GETrequest(
        userOptions.country_str,
        userOptions.language,
        'surveys',
        `page=${page}`,
        user && JSON.parse(user).bearer
      )
      return response
    } catch (error) {
      return error
    }
  }

  const getUserSurveys = async () => {
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await GETrequest(
        userOptions.country_str,
        userOptions.language,
        'surveys/my',
        '',
        JSON.parse(user).bearer
      )
      return response
    } catch (error) {
      return error
    }
  }

  const voteSurvey = async (surveyId, answerId) => {
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await GETrequest(
        userOptions.country_str,
        userOptions.language,
        `surveys/${surveyId}/vote`,
        `survey_option_id=${answerId}`,
        JSON.parse(user).bearer
      )
      return response
      return response
    } catch (error) {
      return error
    }
  }

  const getSurveyTypes = async () => {
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await GETrequest(
        userOptions.country_str,
        userOptions.language,
        'survey_types',
        '',
        JSON.parse(user).bearer
      )
      return response
    } catch (error) {
      return error
    }
  }

  const submitSurvey = async (surveyType, textInputs, regionId, options) => {
    const survey_options_attributes = []
    for (let answer of options) {
      answer.description !== '' &&
        survey_options_attributes.push({
          translations_attributes: [
            {
              locale: userOptions.language,
              description: answer.description,
            },
          ],
        })
    }
    const body = {
      survey_type_id: surveyType,
      link: textInputs.link === '' ? null : textInputs.link,
      region_id: regionId,
      translations_attributes: [
        {
          locale: userOptions.language,
          description: textInputs.description,
          title: textInputs.title,
        },
      ],
      survey_options_attributes: survey_options_attributes,
    }
    try {
      const user = await AsyncStorage.getItem('@user_login')
      const response = await POSTrequest(
        userOptions.country_str,
        userOptions.language,
        'surveys',
        body,
        JSON.parse(user).bearer
      )
      return response
    } catch (error) {
      return error
    }
  }

  return {
    getSurveys,
    getUserSurveys,
    voteSurvey,
    getSurveyTypes,
    submitSurvey,
    reportSurvey,
  }
}

export default useSurveyFunctions
