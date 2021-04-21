import auth from "@react-native-firebase/auth"
import { LoginManager, AccessToken } from "react-native-fbsdk"
import { appleAuth } from "@invertase/react-native-apple-authentication"
import { GoogleSignin } from "@react-native-community/google-signin"
import useServerFunctions from "@hooks/useServerFunctions"
import { StorageContext } from "@context/StorageContext"
import { useContext } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

GoogleSignin.configure({
  webClientId:
    "499594900707-9v0s973iosvhrkm9ejohofargnvui8qd.apps.googleusercontent.com",
})

function useSignFunctions() {
  const { POSTrequest, DELETErequest } = useServerFunctions()
  const { userOptions } = useContext(StorageContext)

  async function appleLogin() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw "Apple Sign-In failed - no identify token returned"
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    )

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential)
  }

  async function facebookLogin() {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions([
      "public_profile",
      "email",
    ])

    if (result.isCancelled) {
      throw "User cancelled the login process"
    }

    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken()

    if (!data) {
      throw "Something went wrong obtaining access token"
    }

    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken
    )

    // Sign-in the user with the credential
    return auth().signInWithCredential(facebookCredential)
  }

  async function googleLogin() {
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential

    return auth().signInWithCredential(googleCredential)
  }

  async function serverSignOut() {
    try {
      auth().signOut()
      const user = await AsyncStorage.getItem("@user_login")
      const delRes = await DELETErequest(
        userOptions.country_str,
        userOptions.language,
        "users/sign_out",
        user.bearer
      )
      return delRes.status
    } catch (error) {
      console.log(error)
    }
  }

  async function serverSignUp(data, signIn = true) {
    try {
      const response = await POSTrequest(
        userOptions.country_str,
        userOptions.language,
        signIn ? "users/sign_in" : "users",
        data
      )
      return response
    } catch (error) {
      return error
    }
  }

  return {
    appleLogin,
    facebookLogin,
    googleLogin,
    serverSignUp,
    serverSignOut,
  }
}

export default useSignFunctions
