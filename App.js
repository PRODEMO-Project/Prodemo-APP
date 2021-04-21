import 'react-native-gesture-handler'
import React from 'react'
import { LogBox, StatusBar } from 'react-native'
import { enableScreens } from 'react-native-screens'
import 'moment/locale/it'
import 'moment/locale/fr'
import 'moment/locale/pt'
import 'moment/locale/de'
import 'moment/locale/ro'
import 'moment/locale/bg'
import 'moment/locale/pl'
import 'moment/locale/es'
import Main from '@navigation/Main'
import { StorageContextProvider } from '@context/StorageContext'
import { LoginContextProvider } from '@context/LoginContext'

enableScreens()
LogBox.ignoreAllLogs()

function App() {
  return (
    <StorageContextProvider>
      <LoginContextProvider>
        <StatusBar barStyle='light-content' />
        <Main />
      </LoginContextProvider>
    </StorageContextProvider>
  )
}

export default App
