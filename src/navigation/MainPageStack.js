import React, { memo } from 'react'
import { StyleSheet } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ROUTES from '@utils/routes'
import Animated from 'react-native-reanimated'
import MainPage from '@screens/MainPage'
import EventsTopNavigator from './EventsTopNavigator'
import Profile from '@screens/Profile'
import SignInStack from './SignInStack'
import SurveysTopNavigator from './SurveysTopNavigator'

const Tab = createBottomTabNavigator()

const MainPageStack = memo(({ style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.drawerStack, style])}>
      <Tab.Navigator
        screenOptions={{ gestureEnabled: false, tabBarVisible: false }}
      >
        <Tab.Screen name={ROUTES.MainPage} component={MainPage} />
        <Tab.Screen
          name={ROUTES.EventsTopNavigator}
          component={EventsTopNavigator}
        />
        <Tab.Screen
          name={ROUTES.SurveysTopNavigator}
          component={SurveysTopNavigator}
        />
        <Tab.Screen
          name={ROUTES.Profile}
          component={Profile}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={ROUTES.SignInStack}
          component={SignInStack}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </Animated.View>
  )
})

export default MainPageStack

const styles = StyleSheet.create({
  drawerStack: {
    flex: 1,
  },
})
