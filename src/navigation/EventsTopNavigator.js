import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ROUTES from '@utils/routes'
import Animated from 'react-native-reanimated'
import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import EventListMap from '@screens/EventListMap'
import EventListCalendar from '@screens/EventListCalendar'
import { StorageContext } from '@context/StorageContext'
import EventListUser from '@screens/EventListUser'
import SvgAdd from '@svgs/SvgAdd'
import { LoginContext } from '@context/LoginContext'

const Tab = createMaterialTopTabNavigator()

const EventsTopNavigator = ({ navigation, style }) => {
  const { loggedUser } = useContext(LoginContext)
  const { labelLang } = useContext(StorageContext)

  return (
    <Animated.View style={StyleSheet.flatten([styles.drawerStack, style])}>
      <Tab.Navigator
        backBehavior='none'
        swipeEnabled={Platform.OS === 'ios' ? true : false}
        tabBarOptions={{
          activeTintColor: colors.semiBlack,
          inactiveTintColor: colors.silverChalice,
          activeBackgroundColor: colors.white,
          inactiveBackgroundColor: colors.white,
          labelStyle: {
            fontFamily: FONTS.HIND.Regular,
            fontSize: scaleHeight(12),
            textTransform: 'uppercase',
          },
          style: {
            marginTop:
              Platform.OS === 'ios'
                ? getStatusBarHeight() + scaleHeight(87.5)
                : scaleHeight(86),
            position: 'absolute',
            alignSelf: 'center',
            width: scaleWidth(343),
            borderRadius: scaleHeight(16),
            height: scaleHeight(48),
            backgroundColor: colors.white,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.12,
            shadowRadius: 2.22,
            elevation: 3,
          },
          indicatorStyle: {
            width: scaleWidth(32),
            height: scaleHeight(4),
            alignSelf: 'center',
            marginLeft: loggedUser ? scaleWidth(41) : scaleWidth(69.5),
            borderTopRightRadius: scaleWidth(200),
            borderTopLeftRadius: scaleWidth(200),
            backgroundColor: colors.bluePrimary,
          },
        }}
      >
        <Tab.Screen
          name={ROUTES.EventListMap}
          component={EventListMap}
          options={{
            tabBarLabel: labelLang.Events.Map,
          }}
        />
        <Tab.Screen
          name={ROUTES.EventListCalendar}
          component={EventListCalendar}
          options={{
            tabBarLabel: labelLang.Events.Calendar,
          }}
        />
        {loggedUser && (
          <Tab.Screen
            name={ROUTES.EventListUser}
            component={EventListUser}
            options={{
              tabBarLabel: labelLang.Events.User,
            }}
          />
        )}
      </Tab.Navigator>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(ROUTES.AddEvent)}
      >
        <SvgAdd fill={colors.bluePrimary} bg='white' width={40} height={40} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default EventsTopNavigator

const styles = StyleSheet.create({
  drawerStack: {
    flex: 1,
  },
  addButton: {
    width: scaleWidth(43.5),
    height: scaleWidth(43.5),
    backgroundColor: colors.bluePrimary,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: scaleHeight(35),
    right: scaleWidth(15),
    borderRadius: scaleWidth(25),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
