import AsyncStorage from '@react-native-async-storage/async-storage'

const getStorageData = async () => {
  try {
    let value = await AsyncStorage.getItem('@user_options')
    if (value !== null) {
      return JSON.parse(value)
    } else {
      return {
        language: 'en',
        country: null,
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export default getStorageData
