import ButtonHeader from '@components/ButtonHeader'
import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Share,
  Alert,
  Linking
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HTML from 'react-native-render-html'
import { StorageContext } from '@context/StorageContext'
import { LoginContext } from '@context/LoginContext'
import useServerFunctions from '@hooks/useServerFunctions'
import SvgShare from '@svgs/SvgShare'
import Config from 'react-native-config'
import WebView from 'react-native-webview'
import iframe from '@native-html/iframe-plugin'
import useSurveyFunctions from '@hooks/useSurveyFunctions'
import SignInStack from '@navigation/SignInStack'
import SurveyResults from './components/SurveyResults'
import SvgLink from '@svgs/SvgLink'
import SvgProdemo from '@svgs/SvgProdemo'
import SvgAvatar from '@svgs/Menu/SvgAvatar'
import ReportTab from '@components/ReportTab'

function SurveySingle({ navigation, route }) {
  const { loggedUser } = useContext(LoginContext)
  const { voteSurvey } = useSurveyFunctions()
  const { GETrequest } = useServerFunctions()
  const { userOptions, labelLang } = useContext(StorageContext)
  const [isClicked, setIsClicked] = useState(false)

  const [survey, setSurvey] = useState({
    id: '',
    already_voted: null,
    title: '',
    description: null,
    survey_options: [],
    results: [],
    link: '',
  })

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${labelLang.ShareLink}: ${Config.BASE_URL}/surveys/${
          route.params.country || userOptions.country_str
        }/${survey.id}`,
        url: `${labelLang.ShareLink}: ${Config.BASE_URL}/surveys/${
          route.params.country || userOptions.country_str
        }/${survey.id}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const submitAnswer = answerId => {
    Alert.alert(
      'Confirm submission',
      'Are you sure that you want to confirm?',
      [
        {
          text: labelLang.SignIn.Cancel,
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              if (loggedUser) {
                setIsClicked(false)
                const response = await voteSurvey(id, answerId)
                route.params.update && route.params.update(prev => { 
                  let new_array = [...prev].map(obj => obj.id === response.id ? response : obj);
                  return new_array; 
                })
                setSurvey(response)
              } else {
                setIsClicked(true)
              }
            } catch (error) {
              console.log(error)
            }
          },
        },
      ],
      { cancelable: true }
    )
  }

  const {
    title,
    description,
    survey_options,
    survey_type,
    already_voted,
    results,
    link,
    created_by_type,
    created_by_name,
    id,
  } = survey

  useEffect(() => {
    route.params.update && route.params.update(prev => { console.log(prev); return prev; })
  }, [])

  useEffect(() => {
    if (userOptions !== null) {
      const fetchSurvey = async (country, id) => {
        const user = await AsyncStorage.getItem('@user_login')
        GETrequest(
          country,
          userOptions.language,
          `surveys/${id}`,
          `firebase_token_id=${userOptions.id}`,
          user && JSON.parse(user).bearer
        )
          .then(survey => {
            setSurvey(survey)
            userOptions.country_str !== route.params.country &&
              !route.params.survey &&
              Alert.alert(
                labelLang.Article.AlertTitle,
                labelLang.Article.AlertMessage
              )
          })
          .catch(err => console.log(err))
      }

      route.params.survey
        ? setSurvey(route.params.survey)
        : fetchSurvey(route.params.country, route.params.id)
    }
  }, [userOptions])

  const renderLink = () => {
    if (link && link !== '') {
      return (
        <TouchableOpacity
          style={styles.locationContainer}
          onPress={() => {
            Linking.openURL(link)
          }}
        >
          <SvgLink style={styles.link} width={15} height={15} />
          <Text style={styles.location}>{labelLang.Events.CheckLink}</Text>
        </TouchableOpacity>
      )
    }
  }

  if (userOptions === null) {
    return false
  }

  if (isClicked && !loggedUser) {
    return <SignInStack prevScreen={true} />
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.btnView}>
            <ButtonHeader />
            <TouchableOpacity onPress={onShare} style={styles.svgNotification}>
              <SvgShare />
            </TouchableOpacity>
          </View>
          <View style={styles.eventHeaderContainer}>
            <Text style={styles.txtUserName}>{title}</Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <View
                style={{
                  marginVertical: scaleHeight(7),
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  {created_by_type === 'User' && (
                    <SvgAvatar fill='white' width={14} />
                  )}
                  <Text style={styles.eventType}>
                    {created_by_type === 'User' ? (
                      created_by_name
                    ) : (
                      <SvgProdemo color='white' width={90} height={13.5} />
                    )}
                  </Text>
                </View>
                <Text style={styles.location}>{survey_type?.name}</Text>
              </View>
              {renderLink()}
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.eventContainer}
        >
          {description && (
            <HTML
              renderers={{ iframe }}
              source={{ html: description }}
              WebView={WebView}
              renderersProps={{
                iframe: {
                  scalesPageToFit: true,
                },
              }}
              contentWidth={scaleWidth(345)}
            />
          )}
          {already_voted && loggedUser ? (
            <>
              <Text style={styles.pick}>{labelLang.Surveys.AlreadyVoted}</Text>
              <SurveyResults results={results} />
            </>
          ) : (
            survey_options?.length !== 0 && (
              <Text style={styles.pick}>{labelLang.Surveys.PickAnswer}</Text>
            )
          )}
          {!already_voted &&
            survey_options?.map((answer, index) => (
              <TouchableOpacity
                activeOpacity={0.6}
                key={index}
                onPress={() => submitAnswer(answer.id)}
                style={[
                  styles.answer,
                  {
                    marginBottom:
                      survey_options?.length === index + 1
                        ? scaleWidth(40)
                        : scaleWidth(20),
                  },
                ]}
              >
                <Text style={styles.answerText}>{answer.description}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      </View>
      <ReportTab type='Survey' id={survey.id} />
    </>
  )
}

export default SurveySingle

const styles = StyleSheet.create({
  eventType: {
    color: colors.white,
    marginLeft: 7.5,
  },
  container: {
    flex: 1,
    backgroundColor: colors.pageBackGround,
  },
  header: {
    paddingTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(5)
        : scaleHeight(5),
    paddingBottom: scaleHeight(16),
    backgroundColor: colors.bluePrimary,
    borderBottomLeftRadius: scaleWidth(24),
    borderBottomRightRadius: scaleWidth(24),
  },
  link: {
    marginRight: scaleWidth(9),
  },
  pick: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(22),
    lineHeight: scaleHeight(30),
    color: colors.silverChalice,
    marginHorizontal: scaleWidth(16),
    marginVertical: scaleHeight(14),
  },
  answer: {
    backgroundColor: colors.green,
    padding: scaleWidth(16),
    paddingVertical: scaleWidth(14),
    borderRadius: scaleWidth(16),
  },
  answerText: {
    color: colors.white,
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleWidth(13),
    lineHeight: scaleWidth(20),
  },
  btnView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventHeaderContainer: {
    marginTop: scaleHeight(20),
    marginHorizontal: scaleWidth(32),
  },
  infoContainer: {
    marginTop: scaleHeight(-5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtUserName: {
    fontFamily: FONTS.HIND.Bold,
    fontWeight: '600',
    fontSize: scaleHeight(24),
    lineHeight: scaleHeight(31),
    color: colors.white,
  },
  pin: {
    marginRight: scaleWidth(5),
    marginBottom: scaleHeight(3),
  },
  location: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(14),
    color: colors.white,
    marginTop: scaleHeight(5),
  },
  hour: {
    fontFamily: FONTS.HIND.SemiBold,
    color: colors.white,
    fontSize: scaleHeight(30),
  },
  svgNotification: {
    width: scaleWidth(50),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberNotification: {
    width: scaleWidth(8),
    height: scaleWidth(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.secondRed,
    borderRadius: scaleWidth(4),
    position: 'absolute',
    top: 12,
    right: 17,
  },
  eventContainer: {
    padding: scaleWidth(15),
    paddingBottom: scaleHeight(70) + getBottomSpace(),
  },
})
