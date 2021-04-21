import React, { memo, useEffect, useState, useContext } from 'react'
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import ROUTES from '@utils/routes'
import DrawerStack from '@navigation/DrawerStack'
import * as Animated from 'react-native-reanimated'
import colors from '@utils/colors'
import { scaleHeight, scaleWidth } from '@utils/size'
import SvgAvatar from '@svgs/Menu/SvgAvatar'
import FONTS from '@utils/fonts'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import DrawerItem from '@components/DrawerItem'
import SvgCarer from '@svgs/SvgProdemo'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StorageContext } from '@context/StorageContext'
import { LoginContext } from '@context/LoginContext'

const Drawer = createDrawerNavigator()

const DrawerNavigator = memo(props => {
  const { loggedUser, signOut, username } = useContext(LoginContext)
  const { labelLang } = useContext(StorageContext)
  const [progress, setProgress] = React.useState(new Animated.Value(0))
  const [tabActive, setTabActive] = useState(0)
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.75],
  })
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 0],
  })
  const SCREENS = [
    { id: 0, label: labelLang.Menu.Home },
    { id: 1, label: labelLang.Menu.Articles },
    { id: 2, label: labelLang.Menu.Events, hasChildren: true },
    { id: 8, label: labelLang.Menu.AddEvent, small: true },
    { id: 7, label: labelLang.Menu.Surveys, hasChildren: true },
    { id: 5, label: labelLang.Menu.AddSurvey, small: true },
    { id: 3, label: labelLang.Menu.Info },
    { id: 4, label: labelLang.Menu.Settings },
    {
      id: 6,
      label: loggedUser ? labelLang.Menu.Logout : labelLang.Menu.SignIn,
    },
  ]

  const animatedStyle = {
    borderTopWidth: borderRadius,
    transform: [{ scale }],
  }

  const onNavigate = (key, props) => {
    switch (key) {
      case 0:
        props.navigation.navigate(ROUTES.MainPage)
        break
      case 1:
        props.navigation.navigate(ROUTES.ArticleList)
        break
      case 2:
        props.navigation.navigate(ROUTES.EventsTopNavigator)
        break
      case 3:
        props.navigation.navigate(ROUTES.ProjectInfos)
        break
      case 4:
        props.navigation.navigate(ROUTES.Settings)
        break
      case 5:
        props.navigation.navigate(ROUTES.AddSurvey)
        break
      case 8:
        props.navigation.navigate(ROUTES.AddEvent)
        break
      case 6:
        if (loggedUser) {
          signOut().catch(err => console.log(err))
        } else {
          props.navigation.navigate(ROUTES.SignInStack)
        }
        break
      case 7:
        props.navigation.navigate(ROUTES.SurveysTopNavigator)
        break
    }
  }

  const DrawerContent = props => {
    useEffect(() => {
      setProgress(props.progress)
    }, [])
    const insets = useSafeAreaInsets()
    return (
      <>
        <DrawerContentScrollView
          {...props}
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: getBottomSpace(),
          }}
        >
          <View
            style={[
              styles.headerMenu,
              { marginBottom: loggedUser ? scaleHeight(34) : scaleHeight(54) },
            ]}
          >
            <SvgCarer style={styles.svgCarer} height={50} width={200} />
          </View>
          {loggedUser && (
            <View style={styles.usernameContainer}>
              <SvgAvatar style={{ marginRight: 10 }} />
              <Text style={styles.username}>
                {labelLang.Profile.Welcome} {username}
              </Text>
            </View>
          )}
          {SCREENS.map((item, index) => {
            const { id, label } = item
            return (
              <DrawerItem
                hasChildren={item.hasChildren ? true : false}
                small={item.small ? true : false}
                key={index}
                tabChose={id}
                tabActive={tabActive}
                label={label}
                onPress={() => {
                  setTabActive(id)
                  onNavigate(id, props)
                }}
              />
            )
          })}
        </DrawerContentScrollView>
        <View
          style={[
            styles.footer,
            { bottom: Platform.OS === 'ios' ? insets.bottom : scaleHeight(24) },
          ]}
        >
          <Image
            style={styles.flagBottom}
            source={require('@assets/MainPage/europeFlag.png')}
          />
          <Text style={styles.bottomText}>{labelLang.Menu.Footer}</Text>
        </View>
      </>
    )
  }

  return (
    <View style={styles.container}>
      <Drawer.Navigator
        initialRouteName={ROUTES.MainPage}
        drawerType='slide'
        overlayColor='transparent'
        drawerStyle={styles.drawerStyles}
        contentContainerStyle={styles.contentContainerDrawer}
        drawerContentOptions={{
          activeBackgroundColor: 'transparent',
          activeTintColor: 'white',
          inactiveTintColor: 'white',
        }}
        sceneContainerStyle={styles.sceneContainerStyle}
        drawerContent={props => {
          return <DrawerContent {...props} />
        }}
      >
        <Drawer.Screen name={ROUTES.DrawerStack}>
          {props => <DrawerStack {...props} style={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  )
})
export default DrawerNavigator

const styles = StyleSheet.create({
  stack: {
    flex: 1,
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  svgCarer: {
    position: 'absolute',
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  drawerStyles: {
    flex: 1,
    width: '75%',
    backgroundColor: 'transparent',
  },
  drawerItem: {
    alignItems: 'flex-start',
    marginBottom: scaleHeight(10),
  },
  drawerLabel: {
    color: colors.semiBlack,
    fontFamily: FONTS.HIND.Regular,
    fontSize: scaleHeight(16),
    lineHeight: scaleHeight(24),
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  contentContainerStyle: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: scaleWidth(38),
    marginTop: scaleHeight(60),
  },
  usernameContainer: {
    marginBottom: scaleHeight(20),
    marginHorizontal: scaleWidth(38),
    flexDirection: 'row',
  },
  username: {
    color: colors.bluePrimary,
    fontFamily: FONTS.HIND.Regular,
  },
  svgHoverLine: {
    position: 'absolute',
    left: 0,
  },
  avatar: {
    width: scaleWidth(20),
    height: scaleWidth(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleWidth(10),
  },
  contentContainerDrawer: {
    flex: 1,
  },
  sceneContainerStyle: {
    backgroundColor: 'transparent',
  },
  flagBottom: {
    borderRadius: 8,
    width: scaleWidth(80),
    height: scaleHeight(60),
  },
  footer: {
    width: scaleWidth(300),
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    marginBottom: scaleHeight(5),
    marginHorizontal: scaleWidth(25),
  },
  bottomText: {
    fontSize: scaleWidth(11.5),
    width: '50%',
    color: colors.classicBlue,
    marginLeft: scaleWidth(8),
  },
})
