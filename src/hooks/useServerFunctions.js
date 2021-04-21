import messaging from '@react-native-firebase/messaging'
import { StorageContext } from '@context/StorageContext'
import { useContext, useEffect, useState } from 'react'
import Config from 'react-native-config'
import axios from 'axios'
import { LoginContext } from '@context/LoginContext'

function useServerFunctions() {
  const {
    userOptions,
    storeData,
    changeUserOptions,
    setNotificationStatus,
  } = useContext(StorageContext)
  const [token, setToken] = useState(null)
  const baseUrl = `${Config.BASE_URL}/api/v1`

  useEffect(() => {
    userOptions && getFirebaseToken()
  }, [userOptions])

  useEffect(() => {
    if (token && userOptions && !userOptions.token) {
      storeData({ token: token }).catch(err => console.log(err))
    }
  }, [userOptions, token])

  const getFirebaseToken = () => {
    // Get Firebase Token
    messaging()
      .getToken()
      .then(token => {
        setToken(token)
      })
      .catch(err => console.log(err))

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      storeData({ token: token }).catch(err => console.log(err))
      setToken(token)
      PUTrequest(
        userOptions.country_str,
        userOptions.language,
        `token=${token}`
      )
    })
  }

  const GETrequest = async (
    country,
    lang,
    endURL,
    params = '',
    bearer = false
  ) => {
    console.log(`${baseUrl}/${country}/${lang}/${endURL}?${params}`)
    try {
      const response = await axios.get(
        `${baseUrl}/${country}/${lang}/${endURL}?${params}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: bearer && bearer,
          },
        }
      )
      return response.data
    } catch (error) {
      console.log('GET error: ', error)
      return error
    }
  }

  const DELETErequest = async (country, lang, endURL, bearer) => {
    try {
      const response = await axios.delete(
        `${baseUrl}/${country}/${lang}/${endURL}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: bearer,
          },
        }
      )
      return response
    } catch (error) {
      console.log(error)
    }
  }

  const POSTrequest = async (country, lang, endURL, params, bearer = false) => {
    console.log(`${baseUrl}/${country}/${lang}/${endURL}`)
    try {
      const response = await axios.post(
        `${baseUrl}/${country}/${lang}/${endURL}`,
        params,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: bearer && bearer,
          },
        }
      )
      if (response.headers.authorization) {
        return response
      } else {
        return response.data
      }
    } catch (error) {
      console.log('POST error: ', error)
      return error
    }
  }

  const PUTrequest = async (country, lang, params = '') => {
    console.log(
      `${baseUrl}/${country}/${lang}/firebase_tokens/${userOptions.id}?${params}`
    )
    try {
      const response = await axios.put(
        `${baseUrl}/${country}/${lang}/firebase_tokens/${userOptions.id}?`,
        params
      )
      return response.data
    } catch (error) {
      console.log('PUT error: ', error)
      return error
    }
  }

  //Init Firebase notifications
  async function requestNotificationPermission() {
    const authStatus = await messaging().requestPermission()
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL

    POSTrequest(
      userOptions.country_str,
      userOptions.language,
      `firebase_tokens?token=${token}`,
      {
        token: token,
        enabled: enabled,
      }
    )
      .then(data => {
        storeData({ id: data.id })
          .then(() => {
            changeUserOptions({
              id: data.id,
              notification: enabled,
            })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  function checkNotificationStatus() {
    GETrequest(
      userOptions.country_str,
      userOptions.language,
      `notifications/${userOptions.id}/badge`
    )
      .then(res => setNotificationStatus(res))
      .catch(err => console.log(err))
  }

  return {
    requestNotificationPermission,
    POSTrequest,
    DELETErequest,
    PUTrequest,
    GETrequest,
    checkNotificationStatus,
  }
}

export default useServerFunctions
