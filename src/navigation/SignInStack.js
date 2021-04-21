import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ROUTES from '@utils/routes'
import SignIn from '@screens/SignIn'
import SignUp from '@screens/SignUp'
import ResetPassword from '@screens/ResetPassword'
import ResetPasswordSuccess from '@screens/ResetPasswordSuccess'
import ForgotPassword from '@screens/ForgotPassword'
import ButtonHeader from '@components/ButtonHeader'
import SvgNotification from '@svgs/SvgNotification'
import HeaderBackGround from '@components/HeaderBackGround'
import HeaderTitle from '@components/HeaderTitle'

const Stack = createStackNavigator()

function SignInStack(props) {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
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
    >
      <Stack.Screen name={ROUTES.SignIn} options={ { headerTitle: () => <HeaderTitle title="Sign_in" /> } }>
        {navigation => (
          <SignIn
            prevScreen={props ? props.prevScreen : false}
            nav={navigation}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name={ROUTES.SignUp} options={ { headerTitle: () => <HeaderTitle title="Sign_up" /> } } component={SignUp} />
      <Stack.Screen name={ROUTES.ForgotPassword} options={ { headerTitle: () => <HeaderTitle title="Forgot_password" /> } } component={ForgotPassword} />
      <Stack.Screen name={ROUTES.ResetPassword} options={ { headerTitle: () => <HeaderTitle title="Reset_password" /> } } component={ResetPassword} />
      <Stack.Screen
        name={ROUTES.ResetPasswordSuccess}
        options={ { headerTitle: () => <HeaderTitle title="Reset_password_success" /> } }
        component={ResetPasswordSuccess}
      />
    </Stack.Navigator>
  )
}

export default SignInStack
