import React, { memo } from "react"
import { StyleSheet } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"
import ROUTES from "@utils/routes"
import Animated from "react-native-reanimated"
import ButtonHeader from "@components/ButtonHeader"
import HeaderTitle from "@components/HeaderTitle"
import HeaderBackGround from "@components/HeaderBackGround"
import SvgMenu from "@svgs/SvgMenu"
import SvgProdemo from "@svgs/SvgProdemo"
import SvgNotification from "@svgs/SvgNotification"
import colors from "@utils/colors"
import MainPageStack from "./MainPageStack"

const Stack = createStackNavigator()

const DrawerStack = memo(({ style }) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.drawerStack, style])}>
      <Stack.Navigator>
        <Stack.Screen
          name={ROUTES.MainPageStack}
          component={MainPageStack}
          options={({ navigation }) => ({
            headerTransparent: true,
            headerTitleAlign: "center",
            headerTitle: () => (
              <HeaderTitle
                children={<SvgProdemo height={19} color={colors.white} />}
              />
            ),
            headerLeft: () => (
              <ButtonHeader
                onPress={() => navigation.openDrawer()}
                children={<SvgMenu />}
              />
            ),
            headerRight: () => (
              <ButtonHeader
                children={<SvgNotification />}
                onPress={() => {
                  navigation.navigate(ROUTES.Notifications)
                }}
              />
            ),
            headerBackground: () => <HeaderBackGround />,
          })}
        />
      </Stack.Navigator>
    </Animated.View>
  )
})

export default DrawerStack

const styles = StyleSheet.create({
  drawerStack: {
    flex: 1,
  },
})
