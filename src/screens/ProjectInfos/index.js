import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import React, { useContext, useEffect } from 'react'
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  Linking,
  BackHandler,
} from 'react-native'
import { StorageContext } from '@context/StorageContext'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'

const ProjectInfos = ({ navigation }) => {
  const { labelLang } = useContext(StorageContext)

  useEffect(() => {
    const backAction = () => {
      navigation.goBack()
    }
    BackHandler.addEventListener('hardwareBackPress', backAction)
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backAction)
    }
  }, [])

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Image
        style={styles.logo}
        source={require('@assets/ProjectInfos/prodemo-logo-big.png')}
      />
      <Text style={styles.txtTitle}>{labelLang.Info.TheProject}</Text>
      <Text style={styles.txtContent}>{labelLang.Info.Description}</Text>
      <Text style={styles.txtTitle}>{labelLang.Info.ProjPartners}</Text>
      <View style={styles.partners}>
        <View style={styles.touchImg}>
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL('https://www.uniroma1.it/it/')}
          >
            <Image
              style={styles.partner}
              source={require('@assets/ProjectInfos/prodemo-partner_sapienza.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.touchImg}>
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL('https://www.progeu.org/')}
          >
            <Image
              style={styles.partner}
              source={require('@assets/ProjectInfos/prodemo-partner_progeu.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.touchImg}>
          <TouchableWithoutFeedback
            onPress={() =>
              Linking.openURL('https://www.programmaintegra.it/wp/')
            }
          >
            <Image
              style={styles.partner}
              source={require('@assets/ProjectInfos/prodemo-partner_integra.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.touchImg}>
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL('https://www.demsoc.org/')}
          >
            <Image
              style={styles.partner}
              source={require('@assets/ProjectInfos/prodemo-partner_democsoc.png')}
            />
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.touchImg}>
          <TouchableWithoutFeedback
            onPress={() => Linking.openURL('https://www.ces.uc.pt/en')}
          >
            <Image
              style={styles.partner}
              source={require('@assets/ProjectInfos/prodemo-partner_ces.png')}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: scaleWidth(250),
    height: scaleHeight(250),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: scaleHeight(15),
  },
  partners: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: scaleHeight(20),
  },
  touchImg: {
    marginVertical: scaleHeight(15),
  },
  partner: {
    width: scaleWidth(150),
    height: scaleHeight(50),
    resizeMode: 'contain',
  },
  txtTitle: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(22),
    lineHeight: scaleHeight(30),
    color: colors.silverChalice,
    marginTop: scaleHeight(15),
  },
  txtContent: {
    fontFamily: FONTS.HIND.Regular,
    marginTop: scaleHeight(15),
    fontSize: scaleHeight(14),
    lineHeight: scaleHeight(20),
  },
  container: {
    marginHorizontal: scaleWidth(24),
  },
})

export default ProjectInfos
