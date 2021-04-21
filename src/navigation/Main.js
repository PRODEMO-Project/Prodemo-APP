import React, { useContext, useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AppLoading } from 'expo'
import { useFonts } from 'expo-font'
import { navigationRef } from './NavigationService'
import ROUTES from '@utils/routes'
import IntroScreen from '@screens/IntroScreen'
import DrawerNavigator from './DrawerNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProjectInfos from '@screens/ProjectInfos'
import HeaderTitle from '@components/HeaderTitle'
import ButtonHeader from '@components/ButtonHeader'
import HeaderBackGround from '@components/HeaderBackGround'
import Settings from '@screens/Settings'
import SvgNotification from '@svgs/SvgNotification'
import { scaleWidth } from '@utils/size'
import colors from '@utils/colors'
import Notifications from '@screens/Notifications'
import EventSingle from '@screens/EventSingle'
import ArticleSingle from '@screens/ArticleSingle'
import ArticleList from '@screens/ArticleList'
import { StorageContext } from '@context/StorageContext'
import messaging from '@react-native-firebase/messaging'
import Config from 'react-native-config'
import WhyVoting from '@screens/IntroScreen/WhyVoting'
import WalkThrough from '@screens/WalkThrough'
import SignInStack from './SignInStack'
import Profile from '@screens/Profile'
import AddEvent from '@screens/AddEvent'
import Toast from 'react-native-toast-message'
import SurveySingle from '@screens/SurveySingle'
import AddSurvey from '@screens/AddSurvey'

const Stack = createStackNavigator()

const Main = ({ navigation }) => {
  const { userOptions, setNotificationStatus } = useContext(StorageContext)
  const [initialRoute, setInitialRoute] = useState(null)
  let [fontsLoaded] = useFonts({
    'Hind-Bold': require('@fonts/Hind-Bold.ttf'),
    'Hind-SemiBold': require('@fonts/Hind-SemiBold.ttf'),
    'Hind-Regular': require('@fonts/Hind-Regular.ttf'),
    'Hind-Medium': require('@fonts/Hind-Medium.ttf'),
    'Hind-Light': require('@fonts/Hind-Light.ttf'),
  })

  messaging().onMessage(async remoteMessage => {
    setNotificationStatus(true)
  })

  useEffect(() => {
    const getData = async () => {
      try {
        let value = await AsyncStorage.getItem('@user_options')
        if (!JSON.parse(value)?.country) {
          setInitialRoute(ROUTES.WalkThrough)
        } else {
          setInitialRoute(ROUTES.DrawerNavigator)
        }
      } catch (e) {
        return e
      }
    }
    getData().catch(err => console.log(err))
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }

  if (initialRoute === null) {
    return false
  }

  const linking = {
    prefixes: [Config.BASE_URL, 'prodemo://'],
    config: {
      screens: {
        [ROUTES.EventListMap]: 'events',
        [ROUTES.ArticleList]: 'articles',
        [ROUTES.ArticleSingle]: 'articles/:country/:id',
        [ROUTES.EventSingle]: 'events/:country/:id',
        [ROUTES.SurveySingle]: 'surveys/:country/:id',
        [ROUTES.SignInStack]: {
          screens: {
            [ROUTES.ResetPasswordSuccess]:
              '/api/v1/:country/:lang/users/confirmation',
            [ROUTES.ResetPassword]:
              '/api/v1/:country/:lang/users/password/edit',
          },
        },
      },
    },
  }

  return (
    <NavigationContainer
      linking={initialRoute !== ROUTES.WalkThrough && linking}
      ref={navigationRef}
    >
      <Stack.Navigator headerMode={'screen'} initialRouteName={initialRoute}>
        <Stack.Screen
          name={ROUTES.DrawerNavigator}
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.WalkThrough}
          component={WalkThrough}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.IntroScreen}
          component={IntroScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.ProjectInfos}
          component={ProjectInfos}
          options={{
            headerTitle: () => <HeaderTitle title={'Info'} />,
            headerLeft: () => <ButtonHeader />,
            headerBackground: () => <HeaderBackGround />,
          }}
        />
        <Stack.Screen
          name={ROUTES.SignInStack}
          component={SignInStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.Settings}
          component={Settings}
          options={({ navigation }) => ({
            headerTitle: () => <HeaderTitle title={'Settings'} />,
            headerLeft: () => <ButtonHeader />,
            headerRight: () => (
              <ButtonHeader
                children={
                  <>
                    <SvgNotification />
                  </>
                }
                onPress={() => {
                  navigation.navigate(ROUTES.Notifications)
                }}
              />
            ),
            headerBackground: () => <HeaderBackGround />,
          })}
        />
        <Stack.Screen
          name={ROUTES.Notifications}
          component={Notifications}
          options={{
            headerTitle: () => <HeaderTitle title={'Notifications'} />,
            headerLeft: () => <ButtonHeader />,
            headerBackground: () => <HeaderBackGround />,
          }}
        />
        <Stack.Screen
          name={ROUTES.EventSingle}
          component={EventSingle}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.ArticleList}
          component={ArticleList}
          options={{
            headerTransparent: true,
            headerTitle: () => <HeaderTitle title={`Articles`} />,
            headerLeft: () => <ButtonHeader />,
            headerBackground: () => <HeaderBackGround />,
          }}
        />
        <Stack.Screen
          name={ROUTES.ArticleSingle}
          component={ArticleSingle}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.SurveySingle}
          component={SurveySingle}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTES.AddEvent}
          component={AddEvent}
          options={{
            headerTransparent: true,
            headerTitle: () => <HeaderTitle title={`AddEvent`} />,
            headerLeft: () => <ButtonHeader />,
            headerBackground: () => <HeaderBackGround />,
          }}
        />
        <Stack.Screen
          name={ROUTES.AddSurvey}
          component={AddSurvey}
          options={{
            headerTransparent: true,
            headerTitle: () => <HeaderTitle title={`AddSurvey`} />,
            headerLeft: () => <ButtonHeader />,
            headerBackground: () => <HeaderBackGround />,
          }}
        />
      </Stack.Navigator>
      <Toast ref={ref => Toast.setRef(ref)} />
    </NavigationContainer>
  )
}

export default Main
