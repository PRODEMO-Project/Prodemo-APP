import React, { useState, useEffect, useContext } from 'react'
import auth from '@react-native-firebase/auth'
import useSignFunctions from '@hooks/useSignFunctions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageContext } from './StorageContext'
import useServerFunctions from '@hooks/useServerFunctions'

const LoginContext = React.createContext()

function LoginContextProvider(props) {
  const { userOptions } = useContext(StorageContext)
  const { PUTrequest, GETrequest } = useServerFunctions()
  const { serverSignUp, serverSignOut } = useSignFunctions()
  const [loggedUser, setLoggedUser] = useState(null)
  const [token, setToken] = useState(null)
  const [username, setUsername] = useState(null)
  const [userEmail, setUserEmail] = useState(null)
  const [userPass, setUserPass] = useState(null)
  const [userRegion, setUserRegion] = useState(null)
  const [userId, setUserId] = useState(null)
  const [tempUser, setTempUser] = useState(null)

  useEffect(() => {
    async function checkLogin() {
      try {
        const user = await AsyncStorage.getItem('@user_login')
        const response = await GETrequest(userOptions.country_str, userOptions.language, 'event_types', '', JSON.parse(user).bearer)
        if (user && response?.response?.status !== 401) {
          setUserId(JSON.parse(user).user_id)
          setUserRegion(JSON.parse(user).region_id)
          setUsername(JSON.parse(user).username)
          setToken(JSON.parse(user).authorization)
          setLoggedUser(true)
        }
        if (response?.response?.status === 401) {
          await AsyncStorage.removeItem("@user_login")
        }
      } catch (error) {
        console.log(error)
      }
    }
    checkLogin()
  }, [userOptions])

  useEffect(() => {
    userId && userOptions &&
      PUTrequest(
        userOptions.country_str,
        userOptions.language,
        `user_id=${userId ? userId : ''}`
      )
  }, [userId])

  function onAuthStateChanged(user) {
    if (user) {
      user
        .getIdToken(true)
        .then(token => setToken(token))
        .catch(err => console.log(err))
    }
  }

  async function signOut() {
    try {
      const status = await serverSignOut()
      if (status === 204) {
        await AsyncStorage.removeItem('@user_login')
        setUserId(null)
        setUserRegion(null)
        setUsername(null)
        setToken(null)
        setLoggedUser(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function signIn(social = true) {
    try {
      let serverData
      if (social) {
        const userToken = await auth().currentUser.getIdToken()
        serverData = await serverSignUp({
          id_token: userToken,
        })
      } else {
        serverData = await serverSignUp({
          email: userEmail,
          password: userPass,
        })
      }
      if (serverData.headers) {
        await AsyncStorage.setItem(
          '@user_login',
          JSON.stringify({
            username: serverData.data.nickname,
            bearer: serverData.headers.authorization,
            region_id: serverData.data.region_id,
            user_id: serverData.data.id,
          })
        )
        setUserId(serverData.data.id)
        setUserRegion(serverData.data.region_id)
        setUsername(serverData.data.nickname)
        setToken(serverData.headers.authorization)
        setLoggedUser(true)
        return serverData
      }

      if (
        serverData.response?.status === 422 ||
        serverData.response?.status === 401
      ) {
        return serverData.response
      } else {
        return false
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function signUp(social = true) {
    try {
      let serverData
      if (social) {
        const userToken = await auth().currentUser.getIdToken(true)
        serverData = await serverSignUp({
          id_token: userToken,
          nickname: username,
          region_id: userRegion,
          privacy: true,
        })
      } else {
        serverData = await serverSignUp(
          {
            email: userEmail,
            password: userPass,
            password_confirmation: userPass,
            nickname: username,
            region_id: userRegion,
            privacy: true,
          },
          false
        )
      }

      if (serverData.response?.status === 422) {
        return serverData.response.status
      }

      await AsyncStorage.setItem(
        '@user_login',
        JSON.stringify({
          username: serverData.data.nickname,
          bearer: serverData.headers.authorization,
          region_id: userRegion,
          user_id: serverData.data.id,
        })
      )
      setUserId(serverData.data.id)
      setUserRegion(userRegion)
      setUsername(serverData.data.nickname)
      setToken(serverData.headers.authorization)
      setLoggedUser(true)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    auth().onAuthStateChanged(onAuthStateChanged)
  }, [])

  return (
    <LoginContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        username,
        setUsername,
        userEmail,
        setUserEmail,
        userPass,
        setUserPass,
        userRegion,
        setUserRegion,
        userId,
        signUp,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  )
}

export { LoginContextProvider, LoginContext }
