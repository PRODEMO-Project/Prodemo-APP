import React, {
  memo,
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef,
} from 'react'
import {
  View,
  Text,
  ScrollView,
  LogBox,
  TouchableOpacity,
  Image,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import colors from '@utils/colors'
import FONTS from '@utils/fonts/index'
import { scaleHeight, scaleWidth } from '@utils/size'
import TopicItem from '@screens/MainPage/components/TopicItem'
import ROUTES from '@utils/routes'
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper'
import EventPreview from '@components/EventPreview'
import { StorageContext } from '@context/StorageContext'
import useServerFunctions from '@hooks/useServerFunctions'
import messaging from '@react-native-firebase/messaging'
import SvgLoaderRect from '@svgs/Loaders/SvgLoaderRect'
import { SpringScrollView } from '@youngtailors/react-native-spring-scrollview'
import moment from 'moment'

const MainPage = memo(({ navigation }) => {
  const { userOptions, labelLang, notificationStatus } = useContext(
    StorageContext
  )
  const {
    requestNotificationPermission,
    checkNotificationStatus,
    GETrequest,
  } = useServerFunctions()
  const [topicData, setTopicData] = useState([])
  const [lastEvents, setLastEvents] = useState([])

  useEffect(() => {
    function handleNotification(remoteMessage) {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification
        )
        const id = remoteMessage.data.id
        const locale = userOptions.country_str
        switch (remoteMessage.data.type) {
          case 'Survey':
            navigation.navigate(ROUTES.SurveySingle, {
              country: locale,
              id: id,
            })
            break
          case 'Event':
            navigation.navigate(ROUTES.EventSingle, { country: locale, id: id })
            break
          case 'Article':
            navigation.navigate(ROUTES.ArticleSingle, {
              country: locale,
              id: id,
            })
            break
          default:
            break
        }
      } else {
        checkNotificationStatus()
      }
    }
    LogBox.ignoreAllLogs()

    messaging()
      .getInitialNotification()
      .then(remoteMessage => handleNotification(remoteMessage))
      .catch(err => console.log(err))

    messaging().onNotificationOpenedApp(remoteMessage =>
      handleNotification(remoteMessage)
    )
  }, [])

  const getEvents = () => {
    const fetchEvents = async () => {
      try {
        const response = await GETrequest(
          userOptions.country_str,
          userOptions.language,
          'events'
        )
        return response
      } catch (error) {
        console.log(error)
      }
    }
    fetchEvents()
      .then(data => {
        if (data != []) {
          const eventsAfterToday = data.filter(event =>
            moment().isBefore(event.date)
          )
          let lastEvents = eventsAfterToday.splice(0, 3).reverse()
          setLastEvents(lastEvents)
        }
      })
      .catch(err => console.log(err))
  }

  const getArticles = () => {
    const fetchArticles = async () => {
      try {
        const response = await GETrequest(
          userOptions.country_str,
          userOptions.language,
          'articles'
        )
        return response
      } catch (error) {
        console.log(error)
      }
    }
    fetchArticles()
      .then(data => {
        if (data.length !== 0) {
          let lastArticles = data.splice(0, 3)
          setTopicData(lastArticles)
        }
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getEvents()
    getArticles()
  }, [notificationStatus])

  useEffect(() => {
    if (userOptions) {
      if (!userOptions.id) {
        requestNotificationPermission()
      }
      getEvents()
      getArticles()
    }
  }, [userOptions])

  const onEventList = useCallback(() => {
    navigation.navigate(ROUTES.EventsTopNavigator)
  }, [navigation])

  const onAddEvent = useCallback(() => {
    navigation.navigate(ROUTES.AddEvent)
  }, [navigation])

  const onSurveyList = useCallback(() => {
    navigation.navigate(ROUTES.SurveysTopNavigator)
  }, [navigation])

  const onAddSurvey = useCallback(() => {
    navigation.navigate(ROUTES.AddSurvey)
  }, [navigation])

  const onPressArticle = item => {
    navigation.navigate(ROUTES.ArticleSingle, { article: item })
  }

  const renderTopicItem = () => {
    if (topicData.length === 0) {
      return (
        <>
          <SvgLoaderRect style={styles.loaderArticle} />
          <SvgLoaderRect style={styles.loaderArticle} />
        </>
      )
    }
    return (
      <>
        {topicData.map((item, index) => (
          <TopicItem
            item={item}
            key={index}
            onPress={() => onPressArticle(item)}
          />
        ))}
        <TopicItem
          item={{ cover: '', title: labelLang.Home.ReadMore }}
          onPress={() => navigation.navigate(ROUTES.ArticleList)}
        />
      </>
    )
  }

  const scrollView = useRef(null)

  return (
    <View style={styles.container}>
      <SpringScrollView
        ref={scrollView}
        onRefresh={() => {
          getEvents()
          getArticles()
          setTimeout(() => {
            scrollView.current.endRefresh()
          }, 500)
        }}
        showsVerticalScrollIndicator={false}
        contentStyle={styles.contentStyle}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image style={styles.littleFlag} source={userOptions?.countryImg} />
          <Text style={styles.txtHi}>
            {labelLang.Countries[userOptions?.country]}
          </Text>
        </View>
        <Text style={styles.txtToday}>{labelLang.Home.ReadLastArticles}</Text>
        <ScrollView
          horizontal={true}
          bounces={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        >
          {renderTopicItem()}
        </ScrollView>
        <Text style={styles.txtToday}>{labelLang.Home.GetInvolved}</Text>
        {lastEvents.length !== 0 ? (
          <>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onSurveyList()}
                style={styles.surveyContainer}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.txtTitle, { color: 'white' }]}
                >
                  {labelLang.Home.ExploreSurveys}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.75}
                style={styles.addSurvey}
                onPress={() => onAddSurvey()}
              >
                <Text style={styles.addSurveyText}>
                  {labelLang.Surveys.AddSurvey.Add}
                </Text>
              </TouchableOpacity> */}
            </View>
          </>
        ) : (
          <>
            <SvgLoaderRect
              style={styles.eventListContainer}
              width={scaleWidth(343)}
              height={scaleHeight(60)}
            />
          </>
        )}

        {lastEvents.length !== 0 ? (
          <>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onEventList()}
                style={[styles.eventContainer]}
              >
                <Text
                  numberOfLines={1}
                  style={[styles.txtTitle, { color: 'white' }]}
                >
                  {labelLang.Home.ExploreEvents}
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity
                activeOpacity={0.6}
                onPress={() => onAddEvent()}
                style={styles.addEvent}
              >
                <Text style={styles.addEventText}>
                  {labelLang.Surveys.AddSurvey.Add}
                </Text>
              </TouchableOpacity> */}
            </View>
            {lastEvents.map((event, index) => (
              <TouchableOpacity
                key={index}
                style={styles.eventListContainer}
                onPress={() =>
                  navigation.navigate(ROUTES.EventSingle, { event: event })
                }
              >
                <EventPreview event={event} />
              </TouchableOpacity>
            ))}
          </>
        ) : (
          <>
            <SvgLoaderRect
              style={styles.eventListContainer}
              width={scaleWidth(343)}
              height={scaleHeight(60)}
            />
            <SvgLoaderRect
              style={styles.eventListContainer}
              width={scaleWidth(343)}
              height={scaleHeight(120)}
            />
          </>
        )}
      </SpringScrollView>
    </View>
  )
})
export default MainPage

const styles = ScaledSheet.create({
  loaderArticle: {
    marginRight: scaleWidth(16),
  },
  container: {
    flex: 1,
    backgroundColor: colors.pageBackGround,
    marginTop:
      Platform.OS === 'ios'
        ? getStatusBarHeight() + scaleHeight(40)
        : scaleHeight(40),
  },
  littleFlag: {
    marginLeft: scaleWidth(24),
    width: scaleWidth(30),
    height: scaleHeight(20),
    borderRadius: scaleWidth(2),
    marginBottom: scaleHeight(5),
    marginTop: scaleHeight(20),
  },
  txtHi: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '600',
    fontSize: scaleHeight(24),
    color: colors.semiBlack,
    textTransform: 'uppercase',
    marginLeft: scaleWidth(10),
    marginTop: scaleHeight(20),
  },
  textNo: {
    fontFamily: FONTS.HIND.Bold,
    fontWeight: '700',
    fontSize: scaleWidth(16),
    color: colors.black,
    marginLeft: scaleWidth(24),
  },
  txtToday: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(22),
    lineHeight: scaleHeight(30),
    color: colors.silverChalice,
    marginHorizontal: scaleWidth(24),
    marginTop: scaleHeight(20),
    marginVertical: scaleHeight(14),
  },
  eventContainer: {
    height: scaleWidth(60),
    width: scaleWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bluePrimary,
    borderRadius: scaleWidth(16),
    marginLeft: scaleWidth(16),
    marginBottom: scaleHeight(17),
  },
  addEvent: {
    height: scaleWidth(60),
    width: scaleWidth(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.bluePrimary,
    borderRadius: scaleWidth(16),
    marginLeft: scaleWidth(15),
    marginBottom: scaleHeight(17),
  },
  addEventText: {
    color: colors.white,
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleWidth(14),
  },
  surveyContainer: {
    height: scaleWidth(60),
    width: scaleWidth(343),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: scaleWidth(16),
    marginLeft: scaleWidth(16),
    marginBottom: scaleHeight(17),
  },
  addSurvey: {
    height: scaleWidth(60),
    width: scaleWidth(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.green,
    borderRadius: scaleWidth(16),
    marginLeft: scaleWidth(15),
    marginBottom: scaleHeight(17),
  },
  addSurveyText: {
    color: colors.white,
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleWidth(14),
  },
  eventListContainer: {
    borderRadius: scaleWidth(16),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(17),
  },
  serviceItem: {
    height: scaleWidth(60),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: scaleWidth(16),
    marginHorizontal: scaleWidth(16),
    marginBottom: scaleHeight(17),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.12,
    shadowRadius: 2.22,
    elevation: 3,
  },
  txtTitle: {
    fontFamily: FONTS.HIND.SemiBold,
    fontWeight: '500',
    fontSize: scaleHeight(20),
    color: colors.oldBurgundy,
    marginTop: scaleHeight(2.5),
  },
  contentContainerStyle: {
    paddingLeft: scaleWidth(16),
    marginBottom: scaleHeight(10),
  },
  contentContainerFlatList: {
    paddingBottom: scaleHeight(80),
  },
  header: {
    backgroundColor: colors.classicBlue,
    borderBottomLeftRadius: scaleWidth(16),
    borderBottomRightRadius: scaleWidth(16),
    height: getStatusBarHeight() + scaleHeight(55),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '500',
    fontSize: scaleHeight(17),
    color: colors.bluePrimary,
  },
  btnClose: {
    position: 'absolute',
    bottom: scaleHeight(11),
    left: scaleWidth(16),
  },
  btnOption: {
    position: 'absolute',
    bottom: scaleHeight(11),
    right: scaleWidth(16),
  },
  svgCarer: {
    position: 'absolute',
    bottom: scaleHeight(11),
  },
  flexWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  contentStyle: {
    paddingTop: scaleHeight(21),
    paddingBottom: getBottomSpace(),
  },
})
