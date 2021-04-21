import { registerRootComponent } from "expo"
import { Platform } from "react-native"
import messaging from "@react-native-firebase/messaging"
import App from "./App"

if (Platform.OS === "ios") {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Message handled in the background!", remoteMessage)
  })
} else {
  // Register background handler
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log("Message handled in the background!", remoteMessage)
  })
}

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(App)
