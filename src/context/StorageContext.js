import React, { useState, useEffect } from "react"
import getStorageData from "@utils/storage"
import LABELS from "@utils/labels"
import _ from "lodash/fp/object"
import AsyncStorage from "@react-native-async-storage/async-storage"

const StorageContext = React.createContext()

function StorageContextProvider(props) {
  const [userOptions, setUserOptions] = useState(null)
  const [labelsLang, setLabelsLang] = useState("en")
  const [notificationStatus, setNotificationStatus] = useState(false)

  const labelLang = _.merge(LABELS.en, LABELS[labelsLang])

  useEffect(() => {
    getStorageData()
      .then(data => {
        setUserOptions(data)
        data.language && setLabelsLang(data.language)
      })
      .catch(err => console.log(err))
  }, [])

  const storeData = async value => {
    try {
      await AsyncStorage.setItem(
        "@user_options",
        JSON.stringify({
          ...userOptions,
          ...value,
        })
      )
    } catch (e) {
      console.log(e)
    }
  }

  const saveEvent = async (label, value) => {
    try {
      await AsyncStorage.setItem(label, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  const deleteEvent = async label => {
    try {
      await AsyncStorage.removeItem(label)
    } catch (e) {
      console.log(e)
    }
  }

  const changeUserOptions = data => {
    data.language && setLabelsLang(data.language)
    setUserOptions(prev => ({
      ...prev,
      ...data,
    }))
  }

  return (
    <StorageContext.Provider
      value={{
        userOptions,
        changeUserOptions,
        storeData,
        labelLang,
        notificationStatus,
        setNotificationStatus,
        saveEvent,
        deleteEvent,
      }}
    >
      {props.children}
    </StorageContext.Provider>
  )
}

export { StorageContextProvider, StorageContext }
