import React, { useContext } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import ROUTES from '@utils/routes'
import Animated from 'react-native-reanimated'
import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { StorageContext } from '@context/StorageContext'
import { LoginContext } from '@context/LoginContext'
import SurveyList from '@screens/SurveyList'
import SurveyListUser from '@screens/SurveyListUser'
import SvgAdd from '@svgs/SvgAdd'

const Tab = createMaterialTopTabNavigator()

const SurveysTopNavigator = ({ style, navigation }) => {
  const { loggedUser } = useContext(LoginContext)
  const { labelLang } = useContext(StorageContext)

  return (
    <Animated.View style={StyleSheet.flatten([styles.drawerStack, style])}>
      <Tab.Navigator
        backBehavior='none'
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
            shadowColor: 'transparent',
          },
          indicatorStyle: {
            width: scaleWidth(32),
            height: scaleHeight(4),
            alignSelf: 'center',
            marginLeft: loggedUser ? scaleWidth(69.5) : scaleWidth(155),
            borderTopRightRadius: scaleWidth(200),
            borderTopLeftRadius: scaleWidth(200),
            backgroundColor: colors.bluePrimary,
          },
        }}
      >
        <Tab.Screen
          name={ROUTES.SurveyList}
          component={SurveyList}
          options={{
            tabBarLabel: labelLang.Surveys.List,
          }}
        />
        {loggedUser && (
          <Tab.Screen
            name={ROUTES.SurveyListUser}
            component={SurveyListUser}
            options={{
              tabBarLabel: labelLang.Surveys.User,
            }}
          />
        )}
      </Tab.Navigator>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate(ROUTES.AddSurvey)}
      >
        <SvgAdd fill={colors.bluePrimary} bg='white' width={40} height={40} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default SurveysTopNavigator

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
    right: scaleWidth(25),
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
