import ButtonHeader from '@components/ButtonHeader'
import colors from '@utils/colors'
import FONTS from '@utils/fonts'
import { scaleHeight, scaleWidth } from '@utils/size'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import React, { useContext, useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Alert,
  Share,
  Platform,
  Linking,
} from 'react-native'
import moment from 'moment'
import { StorageContext } from '@context/StorageContext'
import useServerFunctions from '@hooks/useServerFunctions'
import HTML from 'react-native-render-html'
import SvgShare from '@svgs/SvgShare'
import Config from 'react-native-config'
import SvgCalendar from '@svgs/MainPage/SvgCalendar'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import SvgLocation from '@svgs/SvgLocation'
import WebView from 'react-native-webview'
import iframe from '@native-html/iframe-plugin'
import { getBottomSpace } from 'react-native-iphone-x-helper'
import SvgAdd from '@svgs/SvgAdd'
import SvgRemove from '@svgs/SvgRemove'
import RNCalendarEvents from 'react-native-calendar-events'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ReportTab from '@components/ReportTab'
import SvgAvatar from '@svgs/Menu/SvgAvatar'
import SvgProdemo from '@svgs/SvgProdemo'
import SvgLink from '@svgs/SvgLink'

function EventSingle({ navigation, route }) {
  const { GETrequest } = useServerFunctions()
  const { userOptions, labelLang, saveEvent, deleteEvent } = useContext(
    StorageContext
  )
  const [isSaved, setIsSaved] = useState(false)
  const [savedId, setSavedId] = useState('')
  const [event, setEvent] = useState({
    id: '',
    title: '',
    description: null,
    link: '',
    address: '',
    created_by_type: '',
    created_by_name: '',
    date: '',
    cover: null,
    latitude: 0,
    longitude: 0,
  })

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${labelLang.ShareLink}: ${Config.BASE_URL}/events/${
          route.params.country || userOptions.country_str
        }/${event.id}`,
        url: `${labelLang.ShareLink}: ${Config.BASE_URL}/events/${
          route.params.country || userOptions.country_str
        }/${event.id}`,
      })
    } catch (error) {
      console.log(error)
    }
  }

  const {
    title,
    description,
    date,
    event_type,
    id,
    created_by_type,
    created_by_name,
    link,
  } = event

  useEffect(() => {
    if (userOptions !== null) {
      const fetchEvent = (country, id) => {
        GETrequest(
          country,
          userOptions.language,
          `events/${id}`,
          `firebase_token_id=${userOptions.id}`
        )
          .then(event => {
            setEvent(event)
            userOptions.country_str !== route.params.country &&
              !route.params.event &&
              Alert.alert(
                labelLang.Events.AlertTitle,
                labelLang.Events.AlertMessage
              )
          })
          .catch(err => console.log(err))
      }

      route.params.event
        ? setEvent(route.params.event)
        : fetchEvent(route.params.country, route.params.id)
    }
  }, [userOptions])

  const addRemoveCalendar = () => {
    const alertTitle = isSaved
      ? labelLang.Events.RemoveFromCalendarTitle
      : labelLang.Events.AddToCalendarTitle
    const alertSubTitle = isSaved
      ? labelLang.Events.RemoveFromCalendarSub
      : labelLang.Events.AddToCalendarSub

    function addRemoveEvent() {
      RNCalendarEvents.checkPermissions()
        .then(data => {
          if (data === 'undetermined') {
            RNCalendarEvents.requestPermissions()
              .then(data => {
                if (data === 'authorized') {
                  addRemoveCalendar()
                }
              })
              .catch(err => console.log(err))
          } else if (data === 'denied') {
            Alert.alert(
              labelLang.Events.CheckPermissions,
              labelLang.Events.PermissionInstructions
            )
          } else {
            if (isSaved) {
              RNCalendarEvents.removeEvent(savedId)
                .then(async result => {
                  deleteEvent(`event_${id}`).catch(err => console.log(err))
                  setIsSaved(false)
                })
                .catch(err => console.log(err))
            } else {
              RNCalendarEvents.findCalendars()
                .then(data => {
                  const primaryCal = data.filter(cal => cal.isPrimary)
                  const startDate = moment(date).toISOString()
                  const endDate = moment(date).add(2, 'h').toISOString()
                  RNCalendarEvents.saveEvent(title, {
                    calendarId: primaryCal[0].id,
                    startDate: startDate,
                    endDate: endDate,
                  })
                    .then(result => {
                      saveEvent(`event_${id}`, result)
                        .then(() => {
                          setIsSaved(true)
                          setSavedId(result)
                        })
                        .catch(err => console.log(err))
                    })
                    .catch(err => console.log(err))
                })
                .catch(err => console.log(err))
            }
          }
        })
        .catch(err => console.log(err))
    }

    Alert.alert(alertTitle, alertSubTitle, [
      {
        text: labelLang.SignIn.Cancel,
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => addRemoveEvent(),
      },
    ])
  }

  useEffect(() => {
    async function checkEvents() {
      const eventOpt = await AsyncStorage.getItem(`event_${id}`)
      return eventOpt
    }
    checkEvents()
      .then(opt => {
        const id = event.id
        if (opt != null) {
          setIsSaved(true)
          setSavedId(opt)
        }
      })
      .catch(err => err)
  }, [event])

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

  const renderMap = () => {
    if (event.address) {
      return (
        <>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            loadingEnabled={true}
            showsIndoorLevelPicker={false}
            initialRegion={{
              latitude: Number(event.latitude),
              longitude: Number(event.longitude),
              latitudeDelta: 0.0012,
              longitudeDelta: 0,
            }}
          >
            <Marker
              coordinate={{
                latitude: Number(event.latitude),
                longitude: Number(event.longitude),
              }}
            >
              <SvgLocation height={30} width={30} />
            </Marker>
          </MapView>
          <TouchableOpacity
            style={styles.openOnMapsContainer}
            onPress={() => {
              Linking.openURL(
                `https://www.google.com/maps/search/?api=1&query=${event.latitude},${event.longitude}`
              )
            }}
          >
            <Text style={styles.openOnMaps}>{labelLang.Events.OpenOnMaps}</Text>
          </TouchableOpacity>
        </>
      )
    }
  }

  if (userOptions === null) {
    return false
  }

  return (
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
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              marginBottom: scaleHeight(10),
            }}
          >
            <Text style={styles.eventType}>{event_type?.name}</Text>
            <View style={{ flexDirection: 'row' }}>
              {created_by_type === 'User' && (
                <SvgAvatar
                  fill='white'
                  width={15}
                  style={{ marginRight: 10 }}
                />
              )}
              <Text style={styles.eventType}>
                {created_by_type === 'User' ? (
                  created_by_name
                ) : (
                  <SvgProdemo color='white' width={90} height={13.5} />
                )}
              </Text>
            </View>
          </View>
          <View style={styles.infoContainer}>
            <View>
              <View style={styles.locationContainer}>
                <SvgCalendar style={styles.pin} color='#e56353' />
                <Text style={styles.location}>
                  {moment(date).locale(userOptions.language).format('LLL')}
                </Text>
                <TouchableOpacity onPress={addRemoveCalendar}>
                  {isSaved ? (
                    <SvgRemove style={styles.addEvent} fill='white' />
                  ) : (
                    <SvgAdd style={styles.addEvent} fill='white' />
                  )}
                </TouchableOpacity>
              </View>
              {renderLink()}
            </View>
            <Text style={styles.hour}>
              {date &&
                moment(date)
                  .locale(userOptions.language)
                  .format('D MMM')
                  .toUpperCase()}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.eventContainer}
      >
        {renderMap()}
        <View style={styles.eventContent}>
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
        </View>
      </ScrollView>
      <ReportTab type='Event' id={event.id} />
    </View>
  )
}

export default EventSingle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.pageBackGround,
  },
  map: {
    width: '100%',
    height: scaleHeight(175),
    marginBottom: scaleHeight(16),
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
  eventType: {
    fontFamily: FONTS.HIND.Regular,
    fontWeight: '600',
    fontSize: scaleHeight(15),
    lineHeight: scaleHeight(22),
    paddingBottom: scaleHeight(8),
    color: colors.white,
  },
  pin: {
    marginRight: scaleWidth(5),
    marginBottom: scaleHeight(3),
  },
  link: {
    marginLeft: scaleWidth(3.5),
    marginRight: scaleWidth(9),
  },
  addEvent: {
    marginLeft: scaleWidth(12),
    marginBottom: scaleHeight(3),
  },
  location: {
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleHeight(14),
    color: colors.white,
  },
  hour: {
    fontFamily: FONTS.HIND.SemiBold,
    color: colors.white,
    fontSize: scaleHeight(25),
  },
  svgNotification: {
    width: scaleWidth(50),
    height: scaleWidth(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventContainer: {
    padding: scaleWidth(15),
  },
  eventContent: {
    paddingBottom:
      Platform.OS === 'ios'
        ? getBottomSpace() + scaleHeight(35)
        : scaleHeight(35),
  },
  coverImage: {
    width: '100%',
    height: scaleHeight(200),
    borderRadius: scaleWidth(14),
  },
  openOnMapsContainer: {
    position: 'absolute',
    top: scaleHeight(150),
    right: 5,
  },
  openOnMaps: {
    color: colors.bluePrimary,
    fontFamily: FONTS.HIND.SemiBold,
    fontSize: scaleWidth(12),
    textDecorationLine: 'underline',
  },
})
